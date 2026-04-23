import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title:       pagesContent.programs.title,
  description: pagesContent.programs.subtitle,
  path:        "/programs",
  keywords:    ["charity programs Canada", "food security program", "education support Canada", "community programs Hamilton", "Canadian relief programs", "charitable initiatives"],
});

const PROGRAM_CONFIG = [
  {
    bar: "linear-gradient(90deg, #3b82f6, #60a5fa)",
    bg: "rgba(59,130,246,0.08)",
    color: "#1d4ed8",
    photo: "/images/food-bank.jpg",
    photoAlt: "Community food bank volunteers distributing meals",
  },
  {
    bar: "linear-gradient(90deg, #10b981, #34d399)",
    bg: "rgba(16,185,129,0.08)",
    color: "#065f46",
    photo: "/images/education-class.jpeg",
    photoAlt: "Education program for youth in Canada",
  },
  {
    bar: "linear-gradient(90deg, #19AFAF, #4dd9d9)",
    bg: "rgba(25,175,175,0.08)",
    color: "#0e507b",
    photo: "/images/food-bank.jpg",
    photoAlt: "Community support and care program",
  },
];

const APPROVAL_STEPS = [
  { label: "Board Review", desc: "Board review and approval of program design and budget" },
  { label: "Compliance", desc: "Regulatory compliance checks against CRA Charities Directorate guidance" },
  { label: "Funding", desc: "Confirmation of available funding before program launch" },
  { label: "Monitoring", desc: "Ongoing monitoring and reporting to the Board" },
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
        visualSrc="/images/food-security.jpg"
        visualAlt="FGRF Canada food security program activities"
      >

        {/* ── Program cards with photos ── */}
        <div
          className="rounded-3xl p-8 md:p-12 space-y-8"
          style={{ background: "linear-gradient(160deg, #f5f9fc 0%, #eef4f9 100%)", border: "1px solid rgba(14,80,123,0.1)" }}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>What We Do</p>
            <h2 style={{ color: "#0e507b" }}>Program Areas</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {programSections.map((section, i) => {
              const cfg = PROGRAM_CONFIG[i % PROGRAM_CONFIG.length];
              return (
                <article
                  key={section.heading}
                  className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: "white", border: "1px solid rgba(14,80,123,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                >
                  {/* Photo */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={cfg.photo}
                      alt={cfg.photoAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(180deg, transparent 40%, rgba(6,40,64,0.55) 100%)" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: cfg.bar }} />
                  </div>

                  <div className="flex flex-1 flex-col p-6 space-y-3">
                    <h3 className="!text-base font-bold" style={{ color: "#0e507b" }}>{section.heading}</h3>
                    <p className="flex-1 text-sm leading-relaxed" style={{ color: "#4b5563" }}>{section.body[0]}</p>
                    <p className="text-xs italic pt-2 border-t" style={{ color: "#94a3b8", borderColor: "rgba(14,80,123,0.07)" }}>
                      Subject to Board approval, regulatory compliance, and available funding.
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── Impact banner ── */}
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="/images/volunteers-community.jpeg"
            alt="FGRF Canada volunteers making a difference"
            width={1200}
            height={400}
            className="w-full h-64 md:h-80 object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 flex items-center justify-center text-center px-6"
            style={{ background: "linear-gradient(135deg, rgba(6,40,64,0.75) 0%, rgba(14,80,123,0.65) 100%)" }}
          >
            <div className="space-y-4 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#4dd9d9" }}>Our Commitment</p>
              <p className="text-2xl md:text-3xl font-bold leading-snug" style={{ color: "white" }}>
                Every program is designed to create lasting, measurable change for Canadians in need.
              </p>
            </div>
          </div>
        </div>

        {/* ── Approval process ── */}
        <div
          className="rounded-3xl p-8 md:p-12 space-y-8"
          style={{ background: "white", border: "1px solid rgba(14,80,123,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>Governance</p>
            <h2 style={{ color: "#0e507b" }}>Program Approval Process</h2>
            <p className="text-sm" style={{ color: "#4b5563" }}>
              All programs go through a structured review to ensure compliance, quality, and alignment with our charitable purposes.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {APPROVAL_STEPS.map((step, i) => (
              <div
                key={step.label}
                className="flex items-start gap-4 rounded-2xl p-5"
                style={{ background: "linear-gradient(135deg, #f5f9fc, #eef4f9)", border: "1px solid rgba(14,80,123,0.07)" }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: "#0e507b", color: "white" }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: "#0e507b" }}>{step.label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Compliance note ── */}
        {complianceSection && (
          <div
            className="rounded-3xl p-8 md:p-10 space-y-4"
            style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)", border: "1px solid rgba(59,130,246,0.15)" }}
          >
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#3b82f6" }}>Legal Framework</p>
              <h2 className="!text-xl" style={{ color: "#1e40af" }}>{complianceSection.heading}</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#1e3a5f" }}>
              {complianceSection.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        )}
      </PageShell>
    </>
  );
}
