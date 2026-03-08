import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { governanceDocuments, groupDocumentsByCategory } from "@/content/documents";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: pagesContent.governance.title,
  description: pagesContent.governance.subtitle,
  path: "/governance",
});

type GovernancePageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function GovernancePage({ searchParams }: GovernancePageProps) {
  const page = pagesContent.governance;
  const params = await searchParams;
  const documentGroups = groupDocumentsByCategory(governanceDocuments);
  const categories = Object.keys(documentGroups);
  const selectedCategory = categories.includes(params.category ?? "")
    ? (params.category as keyof typeof documentGroups)
    : (categories[0] as keyof typeof documentGroups);
  const visibleDocuments = documentGroups[selectedCategory] ?? [];
  const hasAvailablePolicyDocument = governanceDocuments.some(
    (doc) => doc.category === "Policies" && doc.status === "available",
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteConfig.siteUrl}/` },
          { name: "Governance & Transparency", url: `${siteConfig.siteUrl}/governance` },
        ]}
      />
      <PageShell
        title={page.title}
        subtitle={page.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
        visualSrc="/og.jpg"
        visualAlt="FGRF Canada board meeting photo"
      >
        <Section tone="white" className="surface-card space-y-6 p-7">
          <h2>Governance Framework</h2>
          <p className="max-w-3xl text-slate-700">
            FGRF Canada is governed by an independent Canadian Board of Directors and is committed to regulatory compliance, financial accountability, and public transparency.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="surface-card overflow-hidden flex flex-col">
              <div className="card-accent-bar card-accent-bar-blue" aria-hidden="true" />
              <div className="p-5 flex flex-col gap-2 flex-1">
                <span className="icon-circle icon-circle-blue" aria-hidden="true" />
                <h3>Board of Directors</h3>
                <p className="text-sm text-slate-700">FGRF Canada is governed by a Canadian Board of Directors responsible for strategic oversight, compliance, and fiduciary accountability.</p>
              </div>
            </article>
            <article className="surface-card overflow-hidden flex flex-col">
              <div className="card-accent-bar card-accent-bar-green" aria-hidden="true" />
              <div className="p-5 flex flex-col gap-2 flex-1">
                <span className="icon-circle icon-circle-green" aria-hidden="true" />
                <h3>Financial Accountability</h3>
                <p className="text-sm text-slate-700">We maintain proper books and records in accordance with Canadian accounting standards for not-for-profit organizations.</p>
              </div>
            </article>
            <article className="surface-card overflow-hidden flex flex-col">
              <div className="card-accent-bar card-accent-bar-teal" aria-hidden="true" />
              <div className="p-5 flex flex-col gap-2 flex-1">
                <span className="icon-circle icon-circle-sky" aria-hidden="true" />
                <h3>Compliance Commitment</h3>
                <p className="text-sm text-slate-700">Operations align with the Income Tax Act (Canada), Canada Not-for-profit Corporations Act, and CRA Charities Directorate guidance.</p>
              </div>
            </article>
          </div>
        </Section>
        {page.sections.map((section) => (
          <Section key={section.heading} tone="neutral" className="surface-card space-y-3 p-7">
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Section>
        ))}
        <Section tone="white" className="surface-card space-y-4 p-7">
          <h2>Documents</h2>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Document categories">
            {categories.map((category) => {
              const isActive = category === selectedCategory;
              const href = `/governance?category=${encodeURIComponent(category)}`;
              return (
                <Link
                  key={category}
                  href={href}
                  role="tab"
                  aria-selected={isActive}
                  className={`rounded-md border px-3 py-2 text-sm font-medium ${isActive
                    ? "border-sky-300 bg-sky-100 text-sky-900"
                    : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
                    }`}
                >
                  {category}
                </Link>
              );
            })}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {visibleDocuments.map((item) => (
              <article
                key={`${item.category}-${item.title}-${item.year ?? "na"}`}
                className="surface-card p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${item.status === "available"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-200 text-slate-700"
                      }`}
                  >
                    {item.status === "available" ? "Available" : "Coming soon"}
                  </span>
                </div>
                {item.year ? <p className="mt-1 text-sm text-slate-600">{item.year}</p> : null}
                {item.status === "available" && item.fileUrl ? (
                  <Link
                    href={item.fileUrl}
                    className="btn-secondary mt-3"
                  >
                    Download
                  </Link>
                ) : (
                  <p className="mt-3 text-sm text-slate-600">Upload coming soon</p>
                )}
              </article>
            ))}
            {visibleDocuments.length === 0 ? (
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-5 md:col-span-3">
                <p className="text-sm text-slate-700">No documents listed in this category yet.</p>
              </article>
            ) : null}
          </div>
        </Section>
        <Section tone="neutral" className="surface-card space-y-4 p-7">
          <h2>{page.policiesControlsHeading}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {page.policiesControls.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${hasAvailablePolicyDocument
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                      }`}
                  >
                    {hasAvailablePolicyDocument ? "Available" : "Coming soon"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-700">
                  {hasAvailablePolicyDocument ? "See Policies documents for available files." : item.note}
                </p>
              </article>
            ))}
          </div>
        </Section>
        <Section tone="white" className="surface-card space-y-4 p-7">
          <h2>{page.boardBiosHeading}</h2>
          <p className="text-sm text-slate-700">{page.boardBiosSubtitle}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <article key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-3 h-12 w-12 rounded-full border border-slate-300 bg-white" aria-hidden="true" />
                <h3 className="text-base font-semibold text-slate-900">Board Member (Name)</h3>
                <p className="mt-2 text-sm text-slate-700">Role: To be added</p>
                <p className="mt-1 text-sm text-slate-700">Profile details to be added.</p>
              </article>
            ))}
          </div>
        </Section>
      </PageShell>
    </>
  );
}
