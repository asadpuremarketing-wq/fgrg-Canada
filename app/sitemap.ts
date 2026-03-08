import type { MetadataRoute } from "next";
import { getAllNewsPosts } from "@/lib/news";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/",
    "/about",
    "/mission",
    "/programs",
    "/governance",
    "/get-involved",
    "/donate",
    "/donate/stripe",
    "/donate/canadahelps",
    "/news",
    "/contact",
    "/privacy",
    "/terms",
    "/brand",
  ];

  const newsPosts = await getAllNewsPosts();
  const newsRoutes = newsPosts.map((post) => `/news/${post.slug}`);
  const routes = [...staticRoutes, ...newsRoutes];

  const now = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
