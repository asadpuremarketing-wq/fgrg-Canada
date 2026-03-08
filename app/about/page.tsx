import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: pagesContent.about.title,
  description: pagesContent.about.subtitle,
  path: "/about",
});

export default function AboutPage() {
  const page = pagesContent.about;
  const commitments = page.sections[1]?.body ?? [];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteConfig.siteUrl}/` },
          { name: "About Us", url: `${siteConfig.siteUrl}/about` },
        ]}
      />
      <PageShell
        title={page.title}
        subtitle={page.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
        visualSrc="/og.jpg"
        visualAlt="FGRF Canada community support photo"
      >
        {/* Who We Are */}
        <Section tone="white" className="surface-card space-y-4 p-7">
          <h2>{page.sections[0]?.heading}</h2>
          {page.sections[0]?.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        {/* Commitments grid */}
        <Section tone="neutral" className="space-y-5 rounded-3xl border border-slate-200 p-6 md:p-8">
          <h2>{page.sections[1]?.heading}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {commitments.map((item, i) => (
              <div key={item} className="surface-card flex items-start gap-4 p-5">
                <span
                  className={`icon-circle shrink-0 ${i % 4 === 0 ? "icon-circle-blue" :
                    i % 4 === 1 ? "icon-circle-green" :
                      i % 4 === 2 ? "icon-circle-sky" :
                        "icon-circle-amber"
                    }`}
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Independent governance */}
        <Section tone="white" className="surface-card space-y-3 p-7">
          <h2>{page.sections[2]?.heading}</h2>
          {page.sections[2]?.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>
      </PageShell>
    </>
  );
}
