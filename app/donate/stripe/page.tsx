import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { CreditCard, ArrowLeft, Clock } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Donate via Stripe",
  description: "Stripe donation pathway setup is coming soon.",
  path: "/donate/stripe",
});

export default function DonateStripePage() {
  return (
    <article className="space-y-8 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Homepage", url: `${siteConfig.siteUrl}/` },
          { name: "Donate", url: `${siteConfig.siteUrl}/donate` },
          { name: "Donate via Stripe", url: `${siteConfig.siteUrl}/donate/stripe` },
        ]}
      />
      <PageHeader
        title="Donate via Stripe"
        subtitle="Coming soon"
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Donate", href: "/donate" },
          { label: "Donate via Stripe" },
        ]}
      />

      <div
        className="rounded-3xl p-8 md:p-12 space-y-8"
        style={{ background: "white", border: "1px solid rgba(14,80,123,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(14,80,123,0.08)" }}>
            <CreditCard size={28} style={{ color: "#0e507b" }} />
          </div>
          <div>
            <h2 className="!text-xl" style={{ color: "#0e507b" }}>Stripe Payment Gateway</h2>
            <p className="text-sm mt-1" style={{ color: "#64748b" }}>Secure online donations via credit card</p>
          </div>
        </div>

        <div
          className="flex items-start gap-4 rounded-2xl p-6"
          style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }}
        >
          <Clock size={18} className="shrink-0 mt-0.5" style={{ color: "#d97706" }} />
          <div className="space-y-1">
            <p className="text-sm font-semibold" style={{ color: "#92400e" }}>Coming Soon</p>
            <p className="text-sm" style={{ color: "#b45309" }}>
              This donation pathway is not yet active. It is subject to Board approval, regulatory compliance checks, and confirmation of available funding.
            </p>
          </div>
        </div>

        <Link
          href="/donate"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
          style={{ color: "#0e507b" }}
        >
          <ArrowLeft size={15} />
          Back to Donate
        </Link>
      </div>
    </article>
  );
}
