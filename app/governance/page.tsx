import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { governanceDocuments, groupDocumentsByCategory } from "@/content/documents";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { Users, BarChart3, ShieldCheck, Download } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title:       pagesContent.governance.title,
  description: pagesContent.governance.subtitle,
  path:        "/governance",
  keywords:    ["charity governance Canada", "CRA registered charity transparency", "nonprofit board of directors", "charitable accountability Canada", "FGRF Canada governance documents"],
});

type GovernancePageProps = {
  searchParams: Promise<{ category?: string }>;
};

const FRAMEWORK_CARDS = [
  { icon: Users,       bar: "linear-gradient(90deg,#3b82f6,#60a5fa)", bg: "rgba(59,130,246,0.08)",  iconColor: "#1d4ed8", title: "Board of Directors",      body: "FGRF Canada is governed by a Canadian Board of Directors responsible for strategic oversight, compliance, and fiduciary accountability." },
  { icon: BarChart3,   bar: "linear-gradient(90deg,#10b981,#34d399)", bg: "rgba(16,185,129,0.08)", iconColor: "#065f46", title: "Financial Accountability", body: "We maintain proper books and records in accordance with Canadian accounting standards for not-for-profit organizations." },
  { icon: ShieldCheck, bar: "linear-gradient(90deg,#19AFAF,#4dd9d9)", bg: "rgba(25,175,175,0.08)", iconColor: "#0e507b", title: "Compliance Commitment",    body: "Operations align with the Income Tax Act (Canada), Canada Not-for-profit Corporations Act, and CRA Charities Directorate guidance." },
];

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
        visualSrc="/images/board-meeting.jpg"
        visualAlt="FGRF Canada board governance meeting"
      >
        {/* Framework */}
        <div
          className="rounded-3xl p-8 md:p-12 space-y-8"
          style={{ background: "white", border: "1px solid rgba(14,80,123,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>How We Operate</p>
            <h2 style={{ color: "#0e507b" }}>Governance Framework</h2>
            <p style={{ color: "#4b5563" }}>
              FGRF Canada is governed by an independent Canadian Board of Directors and is committed to regulatory compliance, financial accountability, and public transparency.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {FRAMEWORK_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "linear-gradient(160deg, #f5f9fc 0%, #eef4f9 100%)", border: "1px solid rgba(14,80,123,0.07)" }}
                >
                  <div className="h-1 w-full" style={{ background: card.bar }} />
                  <div className="p-6 space-y-4">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                      <Icon size={18} style={{ color: card.iconColor }} />
                    </div>
                    <h3 className="!text-sm font-bold" style={{ color: "#0e507b" }}>{card.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{card.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Governance photo banner */}
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="/images/board-meeting.jpg"
            alt="FGRF Canada board of directors in session"
            width={1200}
            height={320}
            className="w-full h-52 md:h-72 object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 flex items-center px-8 md:px-16"
            style={{ background: "linear-gradient(90deg, rgba(6,40,64,0.85) 0%, rgba(14,80,123,0.6) 50%, transparent 100%)" }}
          >
            <div className="space-y-2 max-w-md">
              <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#4dd9d9" }}>Independent Oversight</p>
              <p className="text-xl md:text-2xl font-bold leading-snug" style={{ color: "white" }}>
                Governed by a Canadian Board of Directors committed to accountability.
              </p>
            </div>
          </div>
        </div>

        {/* Sections from content */}
        {page.sections.map((section) => (
          <div
            key={section.heading}
            className="rounded-3xl p-8 md:p-10 space-y-5"
            style={{ background: "linear-gradient(160deg, #f5f9fc 0%, #eef4f9 100%)", border: "1px solid rgba(14,80,123,0.1)" }}
          >
            <h2 className="!text-xl" style={{ color: "#0e507b" }}>{section.heading}</h2>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#4b5563" }}>
              {section.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        ))}

        {/* Documents */}
        <div
          className="rounded-3xl p-8 md:p-12 space-y-8"
          style={{ background: "white", border: "1px solid rgba(14,80,123,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>Transparency</p>
            <h2 style={{ color: "#0e507b" }}>Documents</h2>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Document categories">
            {categories.map((category) => {
              const isActive = category === selectedCategory;
              return (
                <Link
                  key={category}
                  href={`/governance?category=${encodeURIComponent(category)}`}
                  role="tab"
                  aria-selected={isActive}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
                  style={isActive
                    ? { background: "#0e507b", color: "white" }
                    : { background: "rgba(14,80,123,0.06)", color: "#0e507b", border: "1px solid rgba(14,80,123,0.15)" }
                  }
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
                className="rounded-2xl p-5 space-y-3"
                style={{ background: "linear-gradient(135deg, #f5f9fc, #eef4f9)", border: "1px solid rgba(14,80,123,0.07)" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="!text-sm font-bold" style={{ color: "#0e507b" }}>{item.title}</h3>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={item.status === "available"
                      ? { background: "rgba(16,185,129,0.12)", color: "#065f46" }
                      : { background: "rgba(100,116,139,0.1)", color: "#475569" }
                    }
                  >
                    {item.status === "available" ? "Available" : "Coming soon"}
                  </span>
                </div>
                {item.year ? <p className="text-xs" style={{ color: "#94a3b8" }}>{item.year}</p> : null}
                {item.status === "available" && item.fileUrl ? (
                  <Link
                    href={item.fileUrl}
                    className="inline-flex items-center gap-2 text-xs font-bold transition-colors duration-200 hover:opacity-80"
                    style={{ color: "#0e507b" }}
                  >
                    <Download size={12} /> Download
                  </Link>
                ) : (
                  <p className="text-xs" style={{ color: "#94a3b8" }}>Upload coming soon</p>
                )}
              </article>
            ))}
            {visibleDocuments.length === 0 && (
              <div className="rounded-xl p-5 md:col-span-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <p className="text-sm" style={{ color: "#64748b" }}>No documents listed in this category yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Policies & Controls */}
        <div
          className="rounded-3xl p-8 md:p-12 space-y-8"
          style={{ background: "linear-gradient(160deg, #f5f9fc 0%, #eef4f9 100%)", border: "1px solid rgba(14,80,123,0.1)" }}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>Controls</p>
            <h2 style={{ color: "#0e507b" }}>{page.policiesControlsHeading}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {page.policiesControls.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl p-5 space-y-2"
                style={{ background: "white", border: "1px solid rgba(14,80,123,0.07)" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="!text-sm font-bold" style={{ color: "#0e507b" }}>{item.title}</h3>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={hasAvailablePolicyDocument
                      ? { background: "rgba(16,185,129,0.12)", color: "#065f46" }
                      : { background: "rgba(245,158,11,0.12)", color: "#92400e" }
                    }
                  >
                    {hasAvailablePolicyDocument ? "Available" : "Coming soon"}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "#4b5563" }}>
                  {hasAvailablePolicyDocument ? "See Policies documents for available files." : item.note}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Board bios */}
        <div
          className="rounded-3xl p-8 md:p-12 space-y-8"
          style={{ background: "white", border: "1px solid rgba(14,80,123,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>Leadership</p>
            <h2 style={{ color: "#0e507b" }}>{page.boardBiosHeading}</h2>
            <p className="text-sm" style={{ color: "#64748b" }}>{page.boardBiosSubtitle}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <article
                key={index}
                className="rounded-2xl p-5 space-y-3"
                style={{ background: "linear-gradient(135deg, #f5f9fc, #eef4f9)", border: "1px solid rgba(14,80,123,0.07)" }}
              >
                <div
                  className="h-12 w-12 rounded-full"
                  style={{ background: "rgba(14,80,123,0.1)", border: "2px solid rgba(14,80,123,0.15)" }}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="!text-sm font-bold" style={{ color: "#0e507b" }}>Board Member</h3>
                  <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>Profile to be added</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </PageShell>
    </>
  );
}
