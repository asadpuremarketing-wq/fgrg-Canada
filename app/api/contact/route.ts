import { NextResponse } from "next/server";
import { sanitize, hasControlChars, isValidEmail, isSpam } from "@/lib/sanitize";

// ── Types ─────────────────────────────────────────────────────────────────────
type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  subject?: unknown;
  companyWebsite?: unknown; // Honeypot - bots fill this; humans leave it empty
  _t?: unknown;             // Timing token - should be >3s after page load
};

// ── Rate limiting (per-IP, in-memory) ────────────────────────────────────────
// For multi-region serverless production, replace with Upstash Redis.
type RateEntry = { count: number; expiresAt: number };
const rateStore = new Map<string, RateEntry>();
const RATE_LIMIT_WINDOW_MS = 60_000;  // 1-minute window
const RATE_LIMIT_MAX = 3;             // Stricter than before: 3 submissions/min

// Clean up expired entries to prevent memory leaks
function pruneRateStore() {
  const now = Date.now();
  for (const [key, entry] of rateStore.entries()) {
    if (entry.expiresAt < now) rateStore.delete(key);
  }
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  pruneRateStore();
  const entry = rateStore.get(key);

  if (!entry || entry.expiresAt < now) {
    rateStore.set(key, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

function getClientKey(request: Request): string {
  // Prefer X-Real-IP (set by trusted reverse proxy) over X-Forwarded-For
  const realIP = (request.headers as Headers).get("x-real-ip");
  if (realIP) return realIP.trim();
  const forwarded = (request.headers as Headers).get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

// ── Generic safe error response ───────────────────────────────────────────────
function badRequest(msg: string) {
  return NextResponse.json({ error: msg }, { status: 400 });
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(request: Request) {

  // ── 1. Origin check (CSRF mitigation) ──────────────────────────────────────
  const origin = (request.headers as Headers).get("origin");
  const host   = (request.headers as Headers).get("host");
  if (origin && host && !origin.includes(host)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  // ── 2. Content-Type guard ──────────────────────────────────────────────────
  const contentType = (request.headers as Headers).get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return badRequest("Content-Type must be application/json.");
  }

  // ── 3. Edge rate limiting ──────────────────────────────────────────────────
  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // ── 4. Parse body ──────────────────────────────────────────────────────────
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return badRequest("Invalid request body.");
  }

  // ── 5. Honeypot check ─────────────────────────────────────────────────────
  if (asString(payload.companyWebsite).length > 0) {
    // Silently accept so bots don't know they were caught
    return NextResponse.json({ message: "Thank you. Your message was received." });
  }

  // ── 6. Timing token check (anti-spam: form filled in <2s = bot) ───────────
  const submittedAt = Number(asString(payload._t));
  if (submittedAt && Date.now() - submittedAt < 2_000) {
    return NextResponse.json({ message: "Thank you. Your message was received." });
  }

  // ── 7. Extract and trim fields ────────────────────────────────────────────
  const rawName    = asString(payload.name).trim();
  const rawEmail   = asString(payload.email).trim().toLowerCase();
  const rawMessage = asString(payload.message).trim();
  const rawSubject = asString(payload.subject).trim();

  // ── 8. Control character check ────────────────────────────────────────────
  if ([rawName, rawEmail, rawMessage, rawSubject].some(hasControlChars)) {
    return badRequest("Input contains invalid characters.");
  }

  // ── 9. Field length validation ────────────────────────────────────────────
  if (rawName.length < 2 || rawName.length > 100) {
    return badRequest("Name must be between 2 and 100 characters.");
  }
  if (rawMessage.length < 10 || rawMessage.length > 3000) {
    return badRequest("Message must be between 10 and 3000 characters.");
  }
  if (rawSubject.length > 200) {
    return badRequest("Subject must not exceed 200 characters.");
  }

  // ── 10. Email validation ──────────────────────────────────────────────────
  if (!isValidEmail(rawEmail)) {
    return badRequest("Please provide a valid email address.");
  }

  // ── 11. Injection / XSS sanitization ─────────────────────────────────────
  const name    = sanitize(rawName);
  const message = sanitize(rawMessage);
  const subject = sanitize(rawSubject);

  // If sanitization removed too much, the input was likely an attack
  if (name.length < 2) {
    return badRequest("Name contains invalid content.");
  }
  if (message.length < 10) {
    return badRequest("Message contains invalid content.");
  }

  // ── 12. Spam content check ────────────────────────────────────────────────
  if (isSpam(message) || isSpam(subject)) {
    // Silently accept to not reveal the filter
    return NextResponse.json({ message: "Thank you. Your message was received." });
  }

  // ── 13. Accept submission ─────────────────────────────────────────────────
  // Data is validated and sanitized. In production, send to an email service
  // (e.g. Resend, SendGrid) or write to a secure database here.
  // Intentionally no external transmission in this version per governance policy.

  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] Submission accepted", { name, email: rawEmail, subject });
  }

  return NextResponse.json(
    { message: "Thank you for reaching out. We will respond as soon as possible." },
    { status: 200 }
  );
}

// Only POST is allowed on this route
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
