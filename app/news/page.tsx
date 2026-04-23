import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { pagesContent } from "@/content/pages";
import { getAllNewsPosts } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { ArrowUpRight, Calendar, ChevronRight } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: pagesContent.news.title,
  description: pagesContent.news.subtitle,
  path: "/news",
});

// Default thumbnail images cycled across posts
const POST_THUMBNAILS = [
  "/images/news-1.jpg",
  "/images/news-2.jpg",
  "/images/news-3.jpg",
  "/images/volunteers-community.jpeg",
  "/images/community-support.jpg",
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPage() {
  const page = pagesContent.news;
  const posts = await getAllNewsPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Homepage", url: `${siteConfig.siteUrl}/` },
          { name: "News & Updates", url: `${siteConfig.siteUrl}/news` },
        ]}
      />
      <PageShell
        title={page.title}
        subtitle={page.subtitle}
        breadcrumbs={[{ label: "Homepage", href: "/" }, { label: page.title }]}
        visualSrc="/images/community-support.jpg"
        visualAlt="FGRF Canada community news and updates"
      >
        <div className="space-y-10">

          {/* ── Featured post ── */}
          {featured && (
            <Link
              href={`/news/${featured.slug}`}
              className="group block rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                border: "1px solid rgba(25,175,175,0.15)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              }}
            >
              <div className="grid lg:grid-cols-[1fr_420px] items-stretch">
                {/* Text side */}
                <div
                  className="p-8 md:p-12 space-y-6 flex flex-col justify-center"
                  style={{ background: "linear-gradient(145deg, #0e507b 0%, #093d60 100%)" }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]"
                      style={{ background: "rgba(25,175,175,0.12)", color: "#4dd9d9", border: "1px solid rgba(25,175,175,0.25)" }}
                    >
                      Latest
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar size={12} />
                      {formatDate(featured.date)}
                    </span>
                  </div>
                  <h2
                    className="!text-2xl md:!text-3xl group-hover:text-brand-teal transition-colors duration-300"
                    style={{ color: "white", lineHeight: 1.25 }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {featured.excerpt}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 text-sm font-bold"
                    style={{ color: "#19AFAF" }}
                  >
                    {page.readMoreLabel}
                    <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </span>
                </div>
                {/* Photo side */}
                <div className="relative min-h-[220px] lg:min-h-0">
                  <Image
                    src={POST_THUMBNAILS[0]}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(270deg, transparent 60%, rgba(14,80,123,0.6) 100%)" }}
                  />
                </div>
              </div>
            </Link>
          )}

          {/* ── Rest of posts ── */}
          {rest.length > 0 && (
            <div className="space-y-5">
              <h3
                className="!text-base font-bold uppercase tracking-[0.18em]"
                style={{ color: "#19AFAF", fontSize: "0.75rem" }}
              >
                {page.listingHeading}
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, idx) => (
                  <Link
                    key={post.slug}
                    href={`/news/${post.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      background: "white",
                      border: "1px solid rgba(25,175,175,0.1)",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={POST_THUMBNAILS[(idx + 1) % POST_THUMBNAILS.length]}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(180deg, transparent 40%, rgba(6,40,64,0.45) 100%)" }}
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-5 space-y-2">
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar size={11} />
                        {formatDate(post.date)}
                      </span>
                      <h3
                        className="!text-sm font-bold leading-snug flex-1 group-hover:text-brand-teal transition-colors duration-200"
                        style={{ color: "#0e507b" }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#64748b" }}>
                        {post.excerpt}
                      </p>
                      <span
                        className="mt-2 inline-flex items-center gap-1 text-xs font-bold"
                        style={{ color: "#19AFAF" }}
                      >
                        {page.readMoreLabel}
                        <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 && (
            <div
              className="rounded-2xl p-16 text-center"
              style={{ background: "linear-gradient(160deg, #f8fafc 0%, #f0fafa 100%)", border: "1px solid rgba(25,175,175,0.1)" }}
            >
              <p className="text-slate-500">No updates yet. Check back soon.</p>
            </div>
          )}
        </div>
      </PageShell>
    </>
  );
}
