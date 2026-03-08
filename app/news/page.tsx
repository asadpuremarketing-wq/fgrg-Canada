import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { pagesContent } from "@/content/pages";
import { getAllNewsPosts } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: pagesContent.news.title,
  description: pagesContent.news.subtitle,
  path: "/news",
});

export default async function NewsPage() {
  const page = pagesContent.news;
  const posts = await getAllNewsPosts();

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
        visualSrc="/images/community-1.svg"
        visualAlt="Abstract neutral media style background"
      >
      <Section tone="white" className="surface-card space-y-3 p-7">
        <h2>{page.latestHeading}</h2>
        <p>{page.intro}</p>
        <p className="text-sm text-slate-600">No political commentary. No partisan messaging.</p>
      </Section>
      <Section tone="neutral" className="space-y-4">
        <h2>{page.listingHeading}</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.slug} className="surface-card p-7">
              <p className="text-sm text-slate-600">
                {new Date(post.date).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h3 className="mt-2">{post.title}</h3>
              <p className="mt-2">{post.excerpt}</p>
              <Link
                href={`/news/${post.slug}`}
                className="btn-secondary mt-4"
              >
                {page.readMoreLabel}
              </Link>
            </article>
          ))}
        </div>
      </Section>
      </PageShell>
    </>
  );
}
