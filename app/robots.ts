import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all well-behaved crawlers to index the public site
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",          // Block API endpoints from crawlers
          "/_next/",        // Next.js internals
          "/brand",         // Internal brand guide page
          "/*.json$",       // JSON files
        ],
      },
      {
        // Block GPTBot and other AI training crawlers
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host:    siteConfig.siteUrl,
  };
}
