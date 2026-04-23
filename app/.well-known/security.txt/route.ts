// security.txt - standard disclosure file (RFC 9116)
// Tells security researchers how to report vulnerabilities responsibly.

export async function GET() {
  const body = [
    "# FGRF Canada Security Policy",
    "# Please report security vulnerabilities responsibly.",
    "",
    "Contact: mailto:info@fgrfcanada.ca",
    "Preferred-Languages: en",
    "Canonical: https://www.fgrfcanada.ca/.well-known/security.txt",
    "Policy: https://www.fgrfcanada.ca/security-policy",
    `Expires: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()}`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
