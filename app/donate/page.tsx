import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: pagesContent.donate.title,
  description: pagesContent.donate.subtitle,
  path: "/donate",
});

export default function DonatePage() {
  const page = pagesContent.donate;
  const registrationIsRegistered = siteConfig.registrationStatus === "registered";
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Will I receive a tax receipt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${page.ifRegisteredBlock} ${page.ifPendingBlock}`,
        },
      },
      {
        "@type": "Question",
        name: "How are donations used?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To support charitable initiatives in Canada aligned with our charitable purposes.",
        },
      },
      {
        "@type": "Question",
        name: "Is my donation secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Donations are processed through a compliant Canadian payment provider when enabled.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqData} />
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
        visualSrc="/images/governance-1.svg"
        visualAlt="Abstract governance themed background"
      >
      <Section tone="white" className="surface-card space-y-3 p-7">
        <h2>{page.sections[0].heading}</h2>
        {page.sections[0].body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Section>
      <Section tone="neutral" className="surface-card space-y-4 p-7">
        <h2>{page.donationOptionsHeading}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {page.donationOptions.map((option) => (
            <article key={option.href} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="mb-3 inline-flex rounded-xl border border-blue-200 bg-blue-50 p-2">
                <svg className="h-5 w-5 text-blue-800" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M8 11V8a4 4 0 118 0v3m-9 0h10a1 1 0 011 1v7H6v-7a1 1 0 011-1z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>{option.label}</h3>
              <p className="mt-2 text-sm text-slate-700">Coming soon</p>
              <p className="mt-1 text-sm text-slate-600">
                When enabled, payments are routed through a compliant Canadian provider.
              </p>
              <Link href={option.href} className="btn-secondary mt-4">
                View details
              </Link>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="white" className="surface-card space-y-3 p-7">
        <h2>Donation transparency</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-700">
          <li>Governance review supports donation pathway setup.</li>
          <li>Compliance checks are applied before activation.</li>
          <li>Books and records are maintained under internal controls.</li>
        </ul>
      </Section>
      <Section tone="white" className="surface-card space-y-3 p-7">
        <h2>{page.sections[1].heading}</h2>
        {page.sections[1].body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p
          className={`rounded-md px-3 py-2 ${
            registrationIsRegistered ? "border border-emerald-200 bg-emerald-50" : "bg-slate-50"
          }`}
        >
          {page.ifRegisteredBlock}
        </p>
        <p
          className={`rounded-md px-3 py-2 ${
            registrationIsRegistered ? "bg-slate-50" : "border border-amber-200 bg-amber-50"
          }`}
        >
          {page.ifPendingBlock}
        </p>
      </Section>
      <Section tone="neutral" className="surface-card space-y-3 p-7">
        <h2>Frequently Asked Questions</h2>
        <details className="rounded-xl border border-slate-200 bg-white p-4 transition duration-200 ease-in-out open:shadow-sm">
          <summary className="cursor-pointer font-semibold text-slate-900">Will I receive a tax receipt?</summary>
          <p className="mt-3">{page.ifRegisteredBlock}</p>
          <p className="mt-2">{page.ifPendingBlock}</p>
        </details>
        <details className="rounded-xl border border-slate-200 bg-white p-4 transition duration-200 ease-in-out open:shadow-sm">
          <summary className="cursor-pointer font-semibold text-slate-900">How are donations used?</summary>
          <p className="mt-3">
            To support charitable initiatives in Canada aligned with our charitable purposes.
          </p>
        </details>
        <details className="rounded-xl border border-slate-200 bg-white p-4 transition duration-200 ease-in-out open:shadow-sm">
          <summary className="cursor-pointer font-semibold text-slate-900">Is my donation secure?</summary>
          <p className="mt-3">
            Donations are processed through a compliant Canadian payment provider when enabled.
          </p>
        </details>
      </Section>
      </PageShell>
    </>
  );
}
