/** @type {import('next').NextConfig} */

// ── Security Headers ──────────────────────────────────────────────────────────
// CSP is enforced (not report-only). unsafe-eval is removed; unsafe-inline for
// styles is kept because Next.js injects inline styles during hydration and we
// use inline style props throughout the UI. Scripts use unsafe-inline for
// Next.js hydration bootstrap. Tighten to nonce-based once the app is stable.

const scriptSrc = [
  "'self'",
  "'unsafe-inline'", // Next.js hydration bootstrap; remove after nonce migration
].join(" ");

const styleSrc = [
  "'self'",
  "'unsafe-inline'", // Inline style props used throughout
].join(" ");

const imgSrc = [
  "'self'",
  "data:",
  "blob:",
].join(" ");

const connectSrc = [
  "'self'",
].join(" ");

const csp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  `object-src 'none'`,
  `script-src ${scriptSrc}`,
  `style-src ${styleSrc}`,
  `img-src ${imgSrc}`,
  `font-src 'self' data:`,
  `connect-src ${connectSrc}`,
  `media-src 'self'`,
  `worker-src 'none'`,
  `manifest-src 'self'`,
  `upgrade-insecure-requests`,
  `report-uri /api/csp-report`,
].join("; ");

const securityHeaders = [
  // Force HTTPS for 1 year, include subdomains, enroll in browser preload list
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Deny framing to prevent clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Limit referrer information to origin only on cross-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable all hardware APIs not needed for a charity info site
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "bluetooth=()",
      "accelerometer=()",
      "gyroscope=()",
      "magnetometer=()",
      "ambient-light-sensor=()",
      "autoplay=()",
      "encrypted-media=()",
      "picture-in-picture=(self)",
    ].join(", "),
  },
  // Prevent cross-origin window access
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Restrict cross-origin resource sharing to same-site
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  // Required when COEP is require-corp
  { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
  // Enforce the CSP
  { key: "Content-Security-Policy", value: csp },
  // Report violations (runs alongside enforcing header)
  { key: "Content-Security-Policy-Report-Only", value: csp },
  // Disable DNS prefetching by the browser (privacy + minor security)
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // Disable IE compatibility mode
  { key: "X-UA-Compatible", value: "IE=edge" },
];

const nextConfig = {
  images: {
    qualities: [68, 75, 80, 85, 100],
  },
  async headers() {
    return [
      {
        // Apply security headers to every route
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // API routes: add no-store to prevent caching of sensitive responses
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },

  // Production hardening
  poweredByHeader: false,      // Remove X-Powered-By: Next.js fingerprint
  compress: true,              // Enable gzip/brotli compression
  reactStrictMode: true,       // Catch bugs early

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

module.exports = nextConfig;
