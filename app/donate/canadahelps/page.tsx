import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Donate via CanadaHelps",
  description: "CanadaHelps donation pathway setup is coming soon.",
  path: "/donate/canadahelps",
});

export default function DonateCanadaHelpsPage() {
  return (
    <article className="space-y-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Homepage", url: `${siteConfig.siteUrl}/` },
          { name: "Donate", url: `${siteConfig.siteUrl}/donate` },
          {
            name: "Donate via CanadaHelps",
            url: `${siteConfig.siteUrl}/donate/canadahelps`,
          },
        ]}
      />
      <PageHeader
        title="Donate via CanadaHelps"
        subtitle="Coming soon"
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Donate", href: "/donate" },
          { label: "Donate via CanadaHelps" },
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
