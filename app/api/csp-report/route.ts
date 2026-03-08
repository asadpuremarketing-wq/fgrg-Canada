import { NextResponse } from "next/server";

type CspEnvelope = {
  "csp-report"?: {
    "effective-directive"?: string;
    "violated-directive"?: string;
    disposition?: string;
  };
};

export async function POST(request: Request) {
  let report: CspEnvelope | null = null;

  try {
    report = (await request.json()) as CspEnvelope;
  } catch {
    // Ignore malformed report payloads to keep endpoint resilient.
  }

  if (process.env.NODE_ENV !== "production" && report?.["csp-report"]) {
    const summary = {
      effectiveDirective: report["csp-report"]["effective-directive"] ?? "unknown",
      violatedDirective: report["csp-report"]["violated-directive"] ?? "unknown",
      disposition: report["csp-report"].disposition ?? "unknown",
    };
    console.warn("CSP report summary", summary);
  }

  return new NextResponse(null, { status: 204 });
}
