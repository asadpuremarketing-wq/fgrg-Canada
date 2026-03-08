import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getAllNewsPosts, getNewsPostBySlug, renderNewsMarkdown } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

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
    return pageMetadata({
      title: "News",
      description: "News update not found.",
      path: `/news/${slug}`,
    });
  }

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`,
  });
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  const allPosts = await getAllNewsPosts();

  if (!post) {
    notFound();
  }

  const blocks = renderNewsMarkdown(post.content);
  const moreUpdates = allPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <article className="space-y-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Homepage", url: `${siteConfig.siteUrl}/` },
          { name: "News & Updates", url: `${siteConfig.siteUrl}/news` },
          { name: post.title, url: `${siteConfig.siteUrl}/news/${post.slug}` },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <header className="surface-card p-6 sm:p-8">
            <h1>{post.title}</h1>
            <p className="mt-3 text-sm text-slate-600">
              {new Date(post.date).toLocaleDateString("en-CA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-3">{post.excerpt}</p>
          </header>

          <section className="surface-card space-y-4 p-6">
            {blocks.map((block, index) =>
              block.type === "h2" ? (
                <h2 key={`${block.text}-${index}`}>{block.text}</h2>
              ) : (
                <p key={`${block.text}-${index}`}>{block.text}</p>
              ),
            )}
          </section>
        </div>
        <aside className="surface-card h-fit space-y-3 p-5">
          <h2 className="text-lg">More updates</h2>
          <ul className="space-y-3">
            {moreUpdates.map((item) => (
              <li key={item.slug}>
                <Link href={`/news/${item.slug}`} className="btn-tertiary">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}
