import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/json-ld";
import { getAllNewsPosts, getNewsPostBySlug, renderNewsMarkdown } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { ArrowLeft, Calendar, ChevronRight } from "lucide-react";

type NewsPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllNewsPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    return pageMetadata({ title: "News", description: "News update not found.", path: `/news/${slug}` });
  }

  return pageMetadata({
    title:         post.title,
    description:   post.excerpt,
    path:          `/news/${post.slug}`,
    type:          "article",
    publishedTime: post.date,
    keywords:      ["FGRF Canada news", "charity update", "Canadian nonprofit update"],
  });
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  const allPosts = await getAllNewsPosts();

  if (!post) notFound();

  const blocks = renderNewsMarkdown(post.content);
  const moreUpdates = allPosts.filter((item) => item.slug !== post.slug).slice(0, 4);

  const formattedDate = new Date(post.date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-8 space-y-8 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Homepage", url: `${siteConfig.siteUrl}/` },
          { name: "News & Updates", url: `${siteConfig.siteUrl}/news` },
          { name: post.title, url: `${siteConfig.siteUrl}/news/${post.slug}` },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`${siteConfig.siteUrl}/news/${post.slug}`}
        datePublished={post.date}
      />

      {/* Back link */}
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:text-brand-teal"
        style={{ color: "#475569" }}
      >
        <ArrowLeft size={15} />
        Back to News
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px] items-start">

        {/* ── Article ── */}
        <article className="space-y-6">

          {/* Header card */}
          <header
            className="rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #062840 0%, #0e507b 100%)",
              border: "1px solid rgba(25,175,175,0.15)",
            }}
          >
            <div className="p-8 md:p-12 space-y-5">
              <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                <Calendar size={13} />
                <span>{formattedDate}</span>
              </div>
              <h1 className="!text-3xl md:!text-4xl !leading-tight" style={{ color: "white" }}>
                {post.title}
              </h1>
              <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                {post.excerpt}
              </p>
              {/* Teal accent bar */}
              <div className="w-12 h-0.5 rounded-full" style={{ background: "#19AFAF" }} />
            </div>
          </header>

          {/* Body */}
          <div
            className="rounded-3xl p-8 md:p-12 space-y-5"
            style={{
              background: "white",
              border: "1px solid rgba(25,175,175,0.1)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
            }}
          >
            {blocks.map((block, index) =>
              block.type === "h2" ? (
                <h2
                  key={`${block.text}-${index}`}
                  className="!text-xl font-bold pt-4 first:pt-0"
                  style={{ color: "#0e507b" }}
                >
                  {block.text}
                </h2>
              ) : (
                <p key={`${block.text}-${index}`} className="leading-relaxed" style={{ color: "#475569" }}>
                  {block.text}
                </p>
              ),
            )}
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside className="space-y-5 lg:sticky lg:top-24">
          {moreUpdates.length > 0 && (
            <div
              className="rounded-2xl p-6 space-y-5"
              style={{
                background: "white",
                border: "1px solid rgba(25,175,175,0.1)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                className="!text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "#19AFAF" }}
              >
                More Updates
              </h3>
              <ul className="space-y-4">
                {moreUpdates.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/news/${item.slug}`}
                      className="group block space-y-1"
                    >
                      <p
                        className="text-xs"
                        style={{ color: "#94a3b8" }}
                      >
                        {new Date(item.date).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}
                      </p>
                      <p
                        className="text-sm font-semibold leading-snug group-hover:text-brand-teal transition-colors duration-200 flex items-start gap-1"
                        style={{ color: "#0e507b" }}
                      >
                        <ChevronRight size={13} className="shrink-0 mt-0.5 text-brand-teal" />
                        {item.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Back to listing */}
          <Link
            href="/news"
            className="flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "rgba(25,175,175,0.07)",
              border: "1px solid rgba(25,175,175,0.18)",
              color: "#19AFAF",
            }}
          >
            <ArrowLeft size={14} />
            All News
          </Link>
        </aside>
      </div>
    </div>
  );
}
