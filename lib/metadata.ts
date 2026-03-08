import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function pageMetadata(input: PageMetadataInput): Metadata {
  const canonical = `${siteConfig.siteUrl}${input.path}`;
  const ogImageUrl = `${siteConfig.siteUrl}/og.jpg`;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${input.title} | ${siteConfig.shortName}`,
      description: input.description,
      type: "website",
      url: canonical,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.shortName} preview image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} | ${siteConfig.shortName}`,
      description: input.description,
      images: [ogImageUrl],
    },
  };
}
