import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Brand Guidelines",
  description: "Visual brand references for color, typography, and UI patterns.",
  path: "/brand",
});

const swatches = [
  { name: "Primary", hex: "#1E3A8A", bg: "bg-[#1E3A8A]" },
  { name: "Accent", hex: "#3F8C6D", bg: "bg-[#3F8C6D]" },
  { name: "Neutral", hex: "#F3F6FB", bg: "bg-[#F3F6FB]" },
  { name: "Text", hex: "#0F1F33", bg: "bg-[#0F1F33]" },
];

export default function BrandPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Homepage", url: `${siteConfig.siteUrl}/` },
          { name: "Brand Guidelines", url: `${siteConfig.siteUrl}/brand` },
        ]}
      />
      <PageShell
        title="Brand Guidelines"
        subtitle="Reference page for core visual standards and reusable UI patterns."
        breadcrumbs={[{ label: "Homepage", href: "/" }, { label: "Brand Guidelines" }]}
        visualSrc="/images/governance-1.svg"
        visualAlt="Abstract brand visual"
      >
        <Section tone="white" className="surface-card space-y-4 p-7">
          <h2>Color System</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {swatches.map((swatch) => (
              <article key={swatch.name} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className={`h-16 rounded-xl border border-slate-200 ${swatch.bg}`} />
                <h3 className="mt-3 text-base">{swatch.name}</h3>
                <p className="mt-1 text-sm">{swatch.hex}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section tone="neutral" className="surface-card space-y-4 p-7">
          <h2>Typography</h2>
          <p>
            Display and heading font: Manrope. Body font: Inter. This pairing supports a modern,
            professional, and readable NGO style.
          </p>
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-[var(--font-display)] text-3xl font-bold text-slate-900">Heading Sample</p>
            <p className="font-[var(--font-display)] text-2xl font-semibold text-slate-900">
              Section Header Sample
            </p>
            <p>Body text sample for comfortable reading and accessibility.</p>
          </div>
        </Section>

        <Section tone="white" className="surface-card space-y-4 p-7">
          <h2>Button Styles</h2>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="btn-primary">
              Primary Button
            </button>
            <button type="button" className="btn-secondary">
              Secondary Button
            </button>
            <button type="button" className="btn-tertiary">
              Tertiary Link Button
            </button>
          </div>
        </Section>

        <Section tone="neutral" className="surface-card space-y-4 p-7">
          <h2>Card Styles</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="surface-card p-6">
              <h3>Standard Card</h3>
              <p className="mt-2">Rounded corners, soft border, and subtle elevation.</p>
            </article>
            <article className="surface-card p-6">
              <h3>Interactive Card</h3>
              <p className="mt-2">Uses slight hover lift and shadow increase for polish.</p>
            </article>
          </div>
        </Section>
      </PageShell>
    </>
  );
}
