import { NextRequest, NextResponse } from "next/server";

// ── Blocked path prefixes ─────────────────────────────────────────────────────
const BLOCKED_PATHS = [
  "/.env",
  "/.git",
  "/wp-admin",
  "/wp-login",
  "/wp-content",
  "/xmlrpc.php",
  "/phpmyadmin",
  "/.htaccess",
];

// ── Malicious User-Agent substrings (lowercase) ───────────────────────────────
const BLOCKED_UA_STRINGS = [
  "sqlmap",
  "nikto",
  "nessus",
  "masscan",
  "zgrab",
  "libwww-perl",
  "hacktools",
];

// ── In-memory rate limiter (token bucket, per IP per minute) ──────────────────
// Per-edge-worker only — use Upstash Redis for multi-region production.
const buckets: Record<string, { tokens: number; lastRefill: number }> = {};
const BUCKET_CAPACITY = 20;
const REFILL_RATE_PER_MS = 20 / 60_000; // 20 tokens per minute

function consumeToken(ip: string): boolean {
  const now = Date.now();
  const entry = buckets[ip];

  if (!entry) {
    buckets[ip] = { tokens: BUCKET_CAPACITY - 1, lastRefill: now };
    return true;
  }

  // Refill based on elapsed time
  const refilled = Math.floor((now - entry.lastRefill) * REFILL_RATE_PER_MS);
  if (refilled > 0) {
    entry.tokens = Math.min(BUCKET_CAPACITY, entry.tokens + refilled);
    entry.lastRefill = now;
  }

  if (entry.tokens <= 0) return false;
  entry.tokens -= 1;
  return true;
}

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = (request.headers.get("user-agent") ?? "").toLowerCase();

  // 1. Block sensitive paths
  for (const blocked of BLOCKED_PATHS) {
    if (pathname.startsWith(blocked)) {
      return new NextResponse("Not Found", { status: 404 });
    }
  }

  // 2. Block malicious User-Agent strings
  for (const fragment of BLOCKED_UA_STRINGS) {
    if (ua.includes(fragment)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  // 3. Rate-limit API routes
  if (pathname.startsWith("/api/")) {
    const ip = getIP(request);
    if (!consumeToken(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Limit": String(BUCKET_CAPACITY),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }
  }

  // 4. Block oversized bodies on mutating methods
  if (request.method === "POST" || request.method === "PUT" || request.method === "PATCH") {
    const contentLength = parseInt(request.headers.get("content-length") ?? "0", 10);
    if (contentLength > 50_000) {
      return new NextResponse("Payload Too Large", { status: 413 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|og.jpg|robots.txt|sitemap.xml).*)",
  ],
};
