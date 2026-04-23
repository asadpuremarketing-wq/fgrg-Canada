import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd, FaqJsonLd, DonateActionJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { ShieldCheck, CreditCard, ChevronDown, BookOpen } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title:       pagesContent.donate.title,
  description: pagesContent.donate.subtitle,
  path:        "/donate",
  keywords:    ["donate to Canadian charity", "charitable donation Canada", "tax receipt Canada donation", "give to FGRF Canada", "support Canadian nonprofit", "donate Hamilton Ontario"],
});

const TRANSPARENCY_ITEMS = [
  "Governance review supports donation pathway setup.",
  "Compliance checks are applied before activation.",
  "Books and records are maintained under internal controls.",
];

const FAQS = [
  {
    q: "Will I receive a tax receipt?",
    a: (page: typeof pagesContent.donate) => `${page.ifRegisteredBlock} ${page.ifPendingBlock}`,
  },
  {
    q: "How are donations used?",
    a: () => "To support charitable initiatives in Canada aligned with our charitable purposes.",
  },
  {
    q: "Is my donation secure?",
    a: () => "Donations are processed through a compliant Canadian payment provider when enabled.",
  },
];

export default function DonatePage() {
  const page = pagesContent.donate;
  const registrationIsRegistered = siteConfig.registrationStatus === "registered";
  const faqItems = FAQS.map((f) => ({ question: f.q, answer: f.a(page) }));

  return (
    <>
      <FaqJsonLd items={faqItems} />
      <DonateActionJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Homepage", url: `${siteConfig.siteUrl}/` },
          { name: "Donate", url: `${siteConfig.siteUrl}/donate` },
        ]}
      />
      <PageShell
        title={page.title}
        subtitle={page.subtitle}
        breadcrumbs={[{ label: "Homepage", href: "/" }, { label: page.title }]}
        visualSrc="/images/donation-giving.jpeg"
        visualAlt="Charitable giving and donation impact"
      >
        {/* Why give */}
        <div
          className="rounded-3xl p-8 md:p-12 space-y-6"
          style={{ background: "white", border: "1px solid rgba(14,80,123,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>Make an Impact</p>
            <h2 style={{ color: "#0e507b" }}>{page.sections[0].heading}</h2>
          </div>
          <div className="w-12 h-1 rounded-full" style={{ background: "#19AFAF" }} />
          <div className="space-y-4 text-lg leading-relaxed" style={{ color: "#4b5563" }}>
            {page.sections[0].body.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>

        {/* Photo banner */}
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="/images/food-security.jpg"
            alt="Food security support for Canadians in need"
            width={1200}
            height={300}
            className="w-full h-52 object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 flex items-center px-8 md:px-14"
            style={{ background: "linear-gradient(90deg, rgba(6,40,64,0.88) 0%, rgba(14,80,123,0.6) 55%, transparent 100%)" }}
          >
            <div className="space-y-2 max-w-md">
              <p className="text-2xl font-bold" style={{ color: "white" }}>Your gift makes a difference.</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                100% of charitable funds support FGRF Canada programs serving Canadians in need.
              </p>
            </div>
          </div>
        </div>

        {/* Donation options */}
        <div
          className="rounded-3xl p-8 md:p-12 space-y-8"
          style={{ background: "linear-gradient(160deg, #f5f9fc 0%, #eef4f9 100%)", border: "1px solid rgba(14,80,123,0.1)" }}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>Giving Options</p>
            <h2 style={{ color: "#0e507b" }}>{page.donationOptionsHeading}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {page.donationOptions.map((option) => (
              <article
                key={option.href}
                className="rounded-2xl p-7 space-y-4"
                style={{ background: "white", border: "1px solid rgba(14,80,123,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div className="h-11 w-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(14,80,123,0.08)" }}>
                  <CreditCard size={20} style={{ color: "#0e507b" }} />
                </div>
                <div className="space-y-2">
                  <h3 className="!text-base font-bold" style={{ color: "#0e507b" }}>{option.label}</h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>Coming soon - subject to Board approval and regulatory compliance.</p>
                </div>
                <Link
                  href={option.href}
                  className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "rgba(14,80,123,0.08)", color: "#0e507b", border: "1px solid rgba(14,80,123,0.15)" }}
                >
                  View details
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Transparency */}
        <div
          className="rounded-3xl p-8 md:p-10 space-y-6"
          style={{ background: "white", border: "1px solid rgba(14,80,123,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(25,175,175,0.1)" }}>
              <ShieldCheck size={18} style={{ color: "#19AFAF" }} />
            </div>
            <h2 className="!text-xl" style={{ color: "#0e507b" }}>Donation Transparency</h2>
          </div>
          <ul className="space-y-3">
            {TRANSPARENCY_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "#374151" }}>
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#19AFAF" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tax receipts */}
        <div
          className="rounded-3xl p-8 md:p-10 space-y-5"
          style={{ background: "linear-gradient(135deg, #f5f9fc 0%, #eef4f9 100%)", border: "1px solid rgba(14,80,123,0.1)" }}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(14,80,123,0.08)" }}>
              <BookOpen size={18} style={{ color: "#0e507b" }} />
            </div>
            <h2 className="!text-xl" style={{ color: "#0e507b" }}>{page.sections[1].heading}</h2>
          </div>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#4b5563" }}>
            {page.sections[1].body.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div
              className="rounded-xl p-4 text-sm"
              style={registrationIsRegistered
                ? { background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#065f46" }
                : { background: "#f8fafc", border: "1px solid #e2e8f0", color: "#4b5563" }
              }
            >
              {page.ifRegisteredBlock}
            </div>
            <div
              className="rounded-xl p-4 text-sm"
              style={registrationIsRegistered
                ? { background: "#f8fafc", border: "1px solid #e2e8f0", color: "#4b5563" }
                : { background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#92400e" }
              }
            >
              {page.ifPendingBlock}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div
          className="rounded-3xl p-8 md:p-12 space-y-6"
          style={{ background: "white", border: "1px solid rgba(14,80,123,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#19AFAF" }}>Common Questions</p>
            <h2 style={{ color: "#0e507b" }}>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border p-5"
                style={{ borderColor: "rgba(14,80,123,0.1)" }}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold" style={{ color: "#0e507b" }}>
                  {faq.q}
                  <ChevronDown size={16} className="shrink-0 transition-transform duration-200 group-open:rotate-180" style={{ color: "#19AFAF" }} />
                </summary>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "#4b5563" }}>{faq.a(page)}</p>
              </details>
            ))}
          </div>
        </div>
      </PageShell>
    </>
  );
}
