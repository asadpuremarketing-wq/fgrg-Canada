import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  companyWebsite?: unknown;
};

type RateEntry = {
  count: number;
  expiresAt: number;
};

const rateStore = new Map<string, RateEntry>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = rateStore.get(key);

  if (!entry || entry.expiresAt < now) {
    rateStore.set(key, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  rateStore.set(key, entry);
  return false;
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  // For strict production-grade rate limits in serverless, use a shared store such as Upstash Redis.
  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const name = asString(payload.name);
  const email = asString(payload.email);
  const message = asString(payload.message);
  const honeypot = asString(payload.companyWebsite);

  if (honeypot.length > 0) {
    return NextResponse.json({ message: "Thank you. Your message was received." }, { status: 200 });
  }

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ error: "Name must be between 2 and 120 characters." }, { status: 400 });
  }

  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (message.length < 10 || message.length > 4000) {
    return NextResponse.json(
      { error: "Message must be between 10 and 4000 characters." },
      { status: 400 },
    );
  }

  // Intentionally no storage and no external transmission of submitted data in this version.
  return NextResponse.json({ message: "Thank you. Your message was received." }, { status: 200 });
}
