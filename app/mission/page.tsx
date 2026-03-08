import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: pagesContent.mission.title,
  description: pagesContent.mission.subtitle,
  path: "/mission",
});

export default function MissionPage() {
  const page = pagesContent.mission;
  const purposes = page.sections[1]?.body ?? [];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteConfig.siteUrl}/` },
          { name: "Our Mission & Charitable Purposes", url: `${siteConfig.siteUrl}/mission` },
        ]}
      />
      <PageShell
        title={page.title}
        subtitle={page.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Mission" }]}
        visualSrc="/og.jpg"
        visualAlt="FGRF Canada mission work photo"
      >
        {/* Mission statement */}
        <Section tone="white" className="surface-card space-y-3 p-7">
          <h2>{page.sections[0]?.heading}</h2>
          {page.sections[0]?.body.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed">{paragraph}</p>
          ))}
        </Section>

        {/* Charitable purposes */}
        <Section tone="neutral" className="space-y-6 rounded-3xl border border-slate-200 p-6 md:p-8">
          <h2>{page.sections[1]?.heading}</h2>
          <ol className="space-y-4" aria-label="Charitable purposes">
            {purposes.map((purpose, i) => (
              <li key={purpose} className="surface-card flex items-start gap-4 p-5">
                <span
                  className={`icon-circle shrink-0 font-semibold text-sm ${i % 4 === 0 ? "icon-circle-blue" :
                    i % 4 === 1 ? "icon-circle-green" :
                      i % 4 === 2 ? "icon-circle-sky" :
                        "icon-circle-amber"
                    }`}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-slate-700">{purpose}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* Legal compliance */}
        <Section tone="blue" className="rounded-2xl border border-blue-200 bg-blue-50 p-6 space-y-3">
          <h2 className="text-xl">{page.sections[2]?.heading}</h2>
          {page.sections[2]?.body.map((paragraph) => (
            <p key={paragraph} className="text-slate-700">{paragraph}</p>
          ))}
        </Section>
      </PageShell>
    </>
  );
}
