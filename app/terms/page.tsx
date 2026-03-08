import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: pagesContent.terms.title,
  description: pagesContent.terms.subtitle,
  path: "/terms",
});

export default function TermsPage() {
  const page = pagesContent.terms;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Homepage", url: `${siteConfig.siteUrl}/` },
          { name: "Terms of Use", url: `${siteConfig.siteUrl}/terms` },
        ]}
      />
      <PageShell
        title={page.title}
        subtitle={page.subtitle}
        breadcrumbs={[{ label: "Homepage", href: "/" }, { label: page.title }]}
        visualSrc="/images/governance-1.svg"
        visualAlt="Abstract terms and governance visual"
      >
        <Section tone="neutral" className="surface-card space-y-4 p-7">
          <h2>Table of contents</h2>
          <ul className="space-y-2">
            {page.sections.map((section) => (
              <li key={section.heading}>
                <a href={`#${section.heading.toLowerCase().replace(/\s+/g, "-")}`} className="btn-tertiary">
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </Section>
        {page.sections.map((section, index) => (
          <Section
            key={section.heading}
            tone={index % 2 === 0 ? "white" : "neutral"}
            className="surface-card space-y-3 p-7"
          >
            <h2 id={section.heading.toLowerCase().replace(/\s+/g, "-")}>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Section>
        ))}
      </PageShell>
    </>
  );
}
