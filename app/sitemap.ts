import type { MetadataRoute } from "next";
import { getAllNewsPosts } from "@/lib/news";
import { siteConfig } from "@/lib/site";

// Page-level SEO priority and change frequency
// Higher priority = crawled more often by Google
const PAGE_CONFIG: Record<string, { priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = {
  "/":               { priority: 1.0,  changeFrequency: "weekly"  },
  "/about":          { priority: 0.9,  changeFrequency: "monthly" },
  "/mission":        { priority: 0.9,  changeFrequency: "monthly" },
  "/programs":       { priority: 0.9,  changeFrequency: "monthly" },
  "/get-involved":   { priority: 0.85, changeFrequency: "monthly" },
  "/donate":         { priority: 0.85, changeFrequency: "monthly" },
  "/news":           { priority: 0.8,  changeFrequency: "weekly"  },
  "/governance":     { priority: 0.75, changeFrequency: "monthly" },
  "/contact":        { priority: 0.75, changeFrequency: "yearly"  },
  "/privacy":        { priority: 0.3,  changeFrequency: "yearly"  },
  "/terms":          { priority: 0.3,  changeFrequency: "yearly"  },
  // Exclude /brand (internal) and /donate/stripe + /donate/canadahelps (coming-soon)
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static routes with their SEO config
  const staticEntries: MetadataRoute.Sitemap = Object.entries(PAGE_CONFIG).map(
    ([route, config]) => ({
      url:             `${siteConfig.siteUrl}${route}`,
      lastModified:    now,
      changeFrequency: config.changeFrequency,
      priority:        config.priority,
    })
  );

  // Dynamic news post entries
  const newsPosts = await getAllNewsPosts();
  const newsEntries: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url:             `${siteConfig.siteUrl}/news/${post.slug}`,
    lastModified:    new Date(post.date),
    changeFrequency: "yearly" as const,
    priority:        0.7,
  }));

  return [...staticEntries, ...newsEntries];
}
