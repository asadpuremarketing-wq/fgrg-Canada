import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Additional page-specific keywords to merge with site defaults */
  keywords?: string[];
  /** Override OG image. Defaults to /opengraph-image */
  ogImage?: { url: string; width: number; height: number; alt: string };
  /** For news/blog articles */
  type?: "website" | "article";
  /** Article publish date (ISO string) */
  publishedTime?: string;
  /** Article modified date (ISO string) */
  modifiedTime?: string;
  /** noindex pages (e.g. error pages, admin utilities) */
  noIndex?: boolean;
};

export function pageMetadata(input: PageMetadataInput): Metadata {
  const canonical  = `${siteConfig.siteUrl}${input.path}`;
  const ogImage = input.ogImage ?? {
    url:    `${siteConfig.siteUrl}/opengraph-image`,
    width:  1200,
    height: 630,
    alt:    `${siteConfig.shortName} - ${input.title}`,
  };

  const allKeywords = [
    ...siteConfig.keywords,
    ...(input.keywords ?? []),
  ].join(", ");

  return {
    title:       input.title,
    description: input.description,
    keywords:    allKeywords,

    authors:  [{ name: siteConfig.legalName, url: siteConfig.siteUrl }],
    creator:  siteConfig.legalName,
    publisher: siteConfig.legalName,

    robots: input.noIndex
      ? { index: false, follow: false }
      : {
          index:            true,
          follow:           true,
          googleBot: {
            index:               true,
            follow:              true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet":       -1,
          },
        },

    alternates: {
      canonical,
      languages: {
        "en-CA": canonical,
        "en":    canonical,
      },
    },

    // ── Open Graph ──────────────────────────────────────────────────────────
    openGraph: {
      title:       `${input.title} | ${siteConfig.shortName}`,
      description: input.description,
      type:        input.type ?? "website",
      url:         canonical,
      siteName:    siteConfig.name,
      locale:      "en_CA",
      ...(input.type === "article" && {
        publishedTime: input.publishedTime,
        modifiedTime:  input.modifiedTime,
        authors:       [siteConfig.siteUrl],
      }),
      images: [
        {
          url:    ogImage.url,
          width:  ogImage.width,
          height: ogImage.height,
          alt:    ogImage.alt,
          type:   "image/png",
        },
      ],
    },

    // ── Twitter / X card ────────────────────────────────────────────────────
    twitter: {
      card:        "summary_large_image",
      title:       `${input.title} | ${siteConfig.shortName}`,
      description: input.description,
      images:      [ogImage.url],
      ...(siteConfig.social.twitter
        ? { site: siteConfig.social.twitter, creator: siteConfig.social.twitter }
        : {}),
    },

    // ── Geographic / local SEO meta ─────────────────────────────────────────
    other: {
      "geo.region":      `${siteConfig.country}-ON`,
      "geo.placename":   siteConfig.city,
      "geo.position":    `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
      "ICBM":            `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
      "DC.title":        input.title,
      "DC.description":  input.description,
      "DC.language":     "en-CA",
      "DC.publisher":    siteConfig.legalName,
      "DC.coverage":     "Canada",
      "DC.rights":       `Copyright ${new Date().getFullYear()} ${siteConfig.legalName}`,
      "rating":          "general",
      "revisit-after":   "7 days",
      "language":        "English",
      "content-language": "en-CA",
    },
  };
}
