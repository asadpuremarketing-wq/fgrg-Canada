import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: pagesContent.programs.title,
  description: pagesContent.programs.subtitle,
  path: "/programs",
});

const PROGRAM_AREAS = [
  { accentBar: "card-accent-bar-blue", iconBg: "icon-circle-blue" },
  { accentBar: "card-accent-bar-green", iconBg: "icon-circle-green" },
  { accentBar: "card-accent-bar-teal", iconBg: "icon-circle-sky" },
];

const APPROVAL_STEPS = [
  "Board review and approval of program design and budget",
  "Regulatory compliance checks against CRA Charities Directorate guidance",
  "Confirmation of available funding before program launch",
  "Ongoing monitoring and reporting to the Board",
];

export default function ProgramsPage() {
  const page = pagesContent.programs;
  const programSections = page.sections.slice(0, 3);
  const complianceSection = page.sections[3];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteConfig.siteUrl}/` },
          { name: "Our Programs", url: `${siteConfig.siteUrl}/programs` },
        ]}
      />
      <PageShell
        title={page.title}
        subtitle={page.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
        visualSrc="/og.jpg"
        visualAlt="FGRF Canada program activities photo"
      >
        {/* Program cards */}
        <Section tone="neutral" className="space-y-6 rounded-3xl border border-slate-200 p-6 md:p-8">
          <h2>Program Areas</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {programSections.map((section, i) => {
              const cfg = PROGRAM_AREAS[i % PROGRAM_AREAS.length];
              return (
                <article key={section.heading} className="surface-card flex flex-col overflow-hidden">
                  <div className={`card-accent-bar ${cfg.accentBar}`} aria-hidden="true" />
                  <div className="flex flex-1 flex-col p-6">
                    <span className={`icon-circle ${cfg.iconBg} mb-4`} aria-hidden="true" />
                    <h3 className="leading-snug">{section.heading}</h3>
                    <p className="mt-2 flex-1 text-sm text-slate-600">{section.body[0]}</p>
                    <p className="mt-4 text-xs italic text-slate-500">
                      Subject to Board approval, regulatory compliance, and available funding.
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* Approval process */}
        <Section tone="white" className="surface-card space-y-4 p-7">
          <h2>Program Approval Process</h2>
          <p className="text-slate-700">
            All FGRF Canada programs go through a structured review process to ensure compliance, quality, and alignment with our charitable purposes.
          </p>
          <ol className="space-y-3">
            {APPROVAL_STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <span
                  className="icon-circle icon-circle-blue shrink-0 font-semibold text-sm"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="text-sm text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* Compliance note */}
        {complianceSection && (
          <Section tone="blue" className="rounded-2xl border border-blue-200 bg-blue-50 p-6 space-y-2">
            <h2 className="text-xl">{complianceSection.heading}</h2>
            {complianceSection.body.map((paragraph) => (
              <p key={paragraph} className="text-slate-700">{paragraph}</p>
            ))}
          </Section>
        )}
      </PageShell>
    </>
  );
}
