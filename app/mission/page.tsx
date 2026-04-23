import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title:       pagesContent.mission.title,
  description: pagesContent.mission.subtitle,
  path:        "/mission",
  keywords:    ["charitable purposes Canada", "CRA charity mission", "poverty relief Canada", "community well-being", "charitable objectives Canada", "nonprofit mission statement"],
});

const NUM_COLORS = ["#3b82f6", "#10b981", "#0ea5e9", "#f59e0b"];
const NUM_BG     = ["rgba(59,130,246,0.1)", "rgba(16,185,129,0.1)", "rgba(14,165,233,0.1)", "rgba(245,158,11,0.1)"];

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
        visualSrc="/images/mission-impact.jpeg"
        visualAlt="FGRF Canada mission - community impact"
      >

        {/* ── Mission statement with photo ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: "white", border: "1px solid rgba(14,80,123,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="grid lg:grid-cols-2 items-stretch">
            <div className="relative min-h-[280px] lg:min-h-0 order-last lg:order-first">
              <Image
                src="/images/community-support.jpg"
                alt="Canadian community supported by FGRF Canada"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(6,40,64,0.4) 0%, transparent 65%)" }}
              />
              {/* Overlay quote */}
              <div
                className="absolute bottom-6 left-6 right-6 rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)" }}
              >
                <p className="text-sm font-bold italic" style={{ color: "#0e507b" }}>
                  &ldquo;Strengthening communities across Canada with compassion and integrity.&rdquo;
                </p>
              </div>
            </div>
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>Our Purpose</p>
                <h2 style={{ color: "#0e507b" }}>{page.sections[0]?.heading}</h2>
              </div>
              <div className="w-12 h-1 rounded-full" style={{ background: "#19AFAF" }} />
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4b5563" }}>
                {page.sections[0]?.body.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>

        {/* ── Impact photo strip ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { src: "/images/food-bank.jpg",           alt: "Food bank program" },
            { src: "/images/education-children.jpeg",  alt: "Youth education" },
            { src: "/images/elderly-care.jpg",          alt: "Elderly care support" },
            { src: "/images/volunteers-community.jpeg", alt: "Community volunteers" },
          ].map((photo) => (
            <div key={photo.alt} className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="25vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 50%, rgba(6,40,64,0.45) 100%)" }}
              />
              <p className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-white text-center">{photo.alt}</p>
            </div>
          ))}
        </div>

        {/* ── Charitable purposes ── */}
        <div
          className="rounded-3xl p-8 md:p-12 space-y-8"
          style={{ background: "linear-gradient(160deg, #f5f9fc 0%, #eef4f9 100%)", border: "1px solid rgba(14,80,123,0.1)" }}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>CRA Registered Purposes</p>
            <h2 style={{ color: "#0e507b" }}>{page.sections[1]?.heading}</h2>
          </div>
          <ol className="space-y-3" aria-label="Charitable purposes">
            {purposes.map((purpose, i) => (
              <li
                key={purpose}
                className="flex items-start gap-5 rounded-2xl p-5 transition-all duration-200 hover:shadow-md"
                style={{ background: "white", border: "1px solid rgba(14,80,123,0.07)" }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: NUM_BG[i % 4], color: NUM_COLORS[i % 4] }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-1.5 text-sm leading-relaxed" style={{ color: "#374151" }}>{purpose}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Legal compliance ── */}
        <div
          className="rounded-3xl p-8 md:p-10 space-y-4"
          style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)", border: "1px solid rgba(59,130,246,0.15)" }}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#3b82f6" }}>Legal Framework</p>
            <h2 className="!text-xl" style={{ color: "#1e40af" }}>{page.sections[2]?.heading}</h2>
          </div>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#1e3a5f" }}>
            {page.sections[2]?.body.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </PageShell>
    </>
  );
}
