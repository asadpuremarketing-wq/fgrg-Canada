import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { Heart, Users, Coins, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title:       pagesContent.getInvolved.title,
  description: pagesContent.getInvolved.subtitle,
  path:        "/get-involved",
  keywords:    ["volunteer Canada charity", "donate to charity Canada", "support nonprofit Canada", "charity volunteer Hamilton Ontario", "how to help FGRF Canada"],
});

const CARD_CONFIG = [
  {
    icon: Heart,
    bar: "linear-gradient(90deg, #3b82f6, #60a5fa)",
    bg: "rgba(59,130,246,0.08)",
    iconColor: "#1d4ed8",
    photo: "/images/donation-giving.jpeg",
    photoAlt: "Charitable donation and giving",
  },
  {
    icon: Users,
    bar: "linear-gradient(90deg, #10b981, #34d399)",
    bg: "rgba(16,185,129,0.08)",
    iconColor: "#065f46",
    photo: "/images/volunteers-community.jpeg",
    photoAlt: "Volunteers working together in the community",
  },
  {
    icon: Coins,
    bar: "linear-gradient(90deg, #19AFAF, #4dd9d9)",
    bg: "rgba(25,175,175,0.08)",
    iconColor: "#0e507b",
    photo: "/images/community-support.jpg",
    photoAlt: "Community support and sponsorship",
  },
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
        visualSrc="/images/volunteers-community.jpeg"
        visualAlt="FGRF Canada volunteers making a difference in communities"
      >

        {/* ── Full-width photo banner ── */}
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="/images/volunteers-community.jpeg"
            alt="Community volunteers working together"
            width={1200}
            height={480}
            className="w-full h-64 md:h-96 object-cover"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(6,40,64,0.8) 0%, rgba(14,80,123,0.5) 50%, transparent 100%)" }}
          />
          <div className="absolute inset-0 flex items-end p-8 md:p-14">
            <div className="space-y-3 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#4dd9d9" }}>Join Us</p>
              <h2 className="!text-2xl md:!text-4xl !leading-tight" style={{ color: "white" }}>
                Together we can make a lasting difference in Canada.
              </h2>
            </div>
          </div>
        </div>

        {/* ── Involvement cards with photos ── */}
        <div
          className="rounded-3xl p-8 md:p-12 space-y-8"
          style={{ background: "linear-gradient(160deg, #f5f9fc 0%, #eef4f9 100%)", border: "1px solid rgba(14,80,123,0.1)" }}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>Ways to Help</p>
            <h2 style={{ color: "#0e507b" }}>How You Can Contribute</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {page.sections.map((section, i) => {
              const cfg = CARD_CONFIG[i % CARD_CONFIG.length];
              const Icon = cfg.icon;
              return (
                <article
                  key={section.heading}
                  className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: "white", border: "1px solid rgba(14,80,123,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                >
                  {/* Photo */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={cfg.photo}
                      alt={cfg.photoAlt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(180deg, transparent 30%, rgba(6,40,64,0.5) 100%)" }}
                    />
                    <div className="absolute top-4 left-4">
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
                      >
                        <Icon size={18} style={{ color: cfg.iconColor }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 space-y-3">
                    <h3 className="!text-base font-bold" style={{ color: "#0e507b" }}>{section.heading}</h3>
                    <p className="flex-1 text-sm leading-relaxed" style={{ color: "#4b5563" }}>{section.body[0]}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── Impact photos ── */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
            <Image src="/images/community-support.jpg" alt="Canadian community gathering" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0" style={{ background: "rgba(6,40,64,0.25)" }} />
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
            <Image src="/images/food-security.jpg" alt="Food security initiative" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0" style={{ background: "rgba(6,40,64,0.25)" }} />
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: "white", border: "1px solid rgba(14,80,123,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="grid lg:grid-cols-2 items-center">
            <div className="p-8 md:p-12 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>Take Action</p>
                <h2 className="!text-2xl" style={{ color: "#0e507b" }}>Ready to connect?</h2>
                <p style={{ color: "#4b5563" }}>
                  Reach out to find out how you can contribute to our charitable mission in Canada.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "#0e507b", boxShadow: "0 4px 20px rgba(14,80,123,0.25)" }}
                >
                  Contact Us
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "rgba(25,175,175,0.1)", color: "#0e507b", border: "1px solid rgba(25,175,175,0.3)" }}
                >
                  Donate Now
                </Link>
              </div>
            </div>
            <div className="relative min-h-[240px] lg:min-h-[320px]">
              <Image
                src="/images/mission-impact.jpeg"
                alt="Making a difference together"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(270deg, transparent 60%, white 100%)" }}
              />
            </div>
          </div>
        </div>

      </PageShell>
    </>
  );
}
