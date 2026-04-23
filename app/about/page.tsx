import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { CheckCircle2, Heart, Users, Target, Shield } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title:       pagesContent.about.title,
  description: pagesContent.about.subtitle,
  path:        "/about",
  keywords:    ["about FGRF Canada", "Canadian charity organization", "nonprofit Hamilton Ontario", "charitable foundation Canada", "who we are FGRF"],
});

const COMMITMENT_ICONS = [Heart, Users, Target, Shield];
const ICON_COLORS = ["#3b82f6", "#10b981", "#0ea5e9", "#f59e0b"];
const ICON_BG    = ["rgba(59,130,246,0.1)", "rgba(16,185,129,0.1)", "rgba(14,165,233,0.1)", "rgba(245,158,11,0.1)"];

const PHOTO_STRIP = [
  { src: "/images/volunteers-community.jpeg", alt: "Volunteers supporting the community" },
  { src: "/images/food-bank.jpg",            alt: "Community food bank program" },
  { src: "/images/education-children.jpeg",   alt: "Education program for youth" },
];

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
        visualSrc="/images/volunteers-community.jpeg"
        visualAlt="FGRF Canada volunteers working together in the community"
      >

        {/* ── Who We Are - 2-col photo + text ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: "white", border: "1px solid rgba(14,80,123,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="grid lg:grid-cols-2">
            {/* Photo */}
            <div className="relative min-h-[280px] lg:min-h-[420px]">
              <Image
                src="/images/community-support.jpg"
                alt="FGRF Canada community support activities"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(6,40,64,0.35) 0%, transparent 60%)" }}
              />
              <div className="absolute bottom-6 left-6">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ background: "rgba(25,175,175,0.9)", color: "white" }}
                >
                  Est. Canada
                </span>
              </div>
            </div>

            {/* Text */}
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>Our Foundation</p>
                <h2 style={{ color: "#0e507b" }}>{page.sections[0]?.heading}</h2>
              </div>
              <div className="w-12 h-1 rounded-full" style={{ background: "#19AFAF" }} />
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4b5563" }}>
                {page.sections[0]?.body.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>

        {/* ── Photo strip ── */}
        <div className="grid grid-cols-3 gap-4">
          {PHOTO_STRIP.map((photo) => (
            <div key={photo.src} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 50%, rgba(6,40,64,0.4) 100%)" }}
              />
            </div>
          ))}
        </div>

        {/* ── What We Stand For ── */}
        <div
          className="rounded-3xl p-8 md:p-12 space-y-8"
          style={{ background: "linear-gradient(160deg, #f5f9fc 0%, #eef4f9 100%)", border: "1px solid rgba(14,80,123,0.1)" }}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>What We Stand For</p>
            <h2 style={{ color: "#0e507b" }}>{page.sections[1]?.heading}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {commitments.map((item, i) => {
              const Icon = COMMITMENT_ICONS[i % COMMITMENT_ICONS.length];
              return (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl p-5 transition-all duration-200 hover:shadow-md"
                  style={{ background: "white", border: "1px solid rgba(14,80,123,0.07)" }}
                >
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: ICON_BG[i % 4] }}
                  >
                    <Icon size={16} style={{ color: ICON_COLORS[i % 4] }} />
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{item}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Independence - photo + text ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: "white", border: "1px solid rgba(14,80,123,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>Independence</p>
                <h2 style={{ color: "#0e507b" }}>{page.sections[2]?.heading}</h2>
              </div>
              <div className="w-12 h-1 rounded-full" style={{ background: "#19AFAF" }} />
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4b5563" }}>
                {page.sections[2]?.body.map((p) => <p key={p}>{p}</p>)}
              </div>
              <div
                className="rounded-2xl p-5 flex items-start gap-4"
                style={{ background: "rgba(25,175,175,0.06)", border: "1px solid rgba(25,175,175,0.18)" }}
              >
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "#19AFAF" }} />
                <p className="text-sm leading-relaxed" style={{ color: "#0e507b" }}>
                  CRA Registered Charity - governed by a Canadian Board of Directors committed to accountability and transparency.
                </p>
              </div>
            </div>
            <div className="relative min-h-[260px] lg:min-h-0">
              <Image
                src="/images/board-meeting.jpg"
                alt="FGRF Canada board governance meeting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(225deg, rgba(6,40,64,0.4) 0%, transparent 60%)" }}
              />
            </div>
          </div>
        </div>

      </PageShell>
    </>
  );
}
