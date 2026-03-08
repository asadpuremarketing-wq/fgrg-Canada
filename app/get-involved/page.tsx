import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: pagesContent.getInvolved.title,
  description: pagesContent.getInvolved.subtitle,
  path: "/get-involved",
});

const SECTION_CONFIG = [
  { iconBg: "icon-circle-blue", accentBar: "card-accent-bar-blue" },
  { iconBg: "icon-circle-green", accentBar: "card-accent-bar-green" },
  { iconBg: "icon-circle-sky", accentBar: "card-accent-bar-teal" },
];

export default function GetInvolvedPage() {
  const page = pagesContent.getInvolved;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteConfig.siteUrl}/` },
          { name: "Get Involved", url: `${siteConfig.siteUrl}/get-involved` },
        ]}
      />
      <PageShell
        title={page.title}
        subtitle={page.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
        visualSrc="/og.jpg"
        visualAlt="FGRF Canada volunteers photo"
      >
        {/* Involvement cards */}
        <Section tone="neutral" className="space-y-6 rounded-3xl border border-slate-200 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-3">
            {page.sections.map((section, i) => {
              const cfg = SECTION_CONFIG[i % SECTION_CONFIG.length];
              return (
                <article key={section.heading} className="surface-card flex flex-col overflow-hidden">
                  <div className={`card-accent-bar ${cfg.accentBar}`} aria-hidden="true" />
                  <div className="flex flex-1 flex-col p-6">
                    <span className={`icon-circle ${cfg.iconBg} mb-4`} aria-hidden="true" />
                    <h3 className="leading-snug">{section.heading}</h3>
                    <p className="mt-2 flex-1 text-sm text-slate-600">{section.body[0]}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* CTA */}
        <Section tone="white" className="surface-card space-y-4 p-7 text-center">
          <h2 className="text-xl">Ready to connect?</h2>
          <p className="mx-auto max-w-xl text-slate-700">
            Reach out to find out how you can contribute to our charitable mission in Canada.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/contact" className="btn-primary px-7 py-3">
              Contact Us
            </Link>
            <Link href="/donate" className="btn-secondary px-7 py-3">
              Donate
            </Link>
          </div>
        </Section>
      </PageShell>
    </>
  );
}
