import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Donate via Stripe",
  description: "Stripe donation pathway setup is coming soon.",
  path: "/donate/stripe",
});

export default function DonateStripePage() {
  return (
    <article className="space-y-8">
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
      <section className="surface-card space-y-3 p-7">
        <h2>Status</h2>
        <p>
          This donation pathway is not active yet and is subject to Board approval, regulatory
          compliance, and available funding.
        </p>
      </section>
    </article>
  );
}
