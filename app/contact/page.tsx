import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: pagesContent.contact.title,
  description: pagesContent.contact.subtitle,
  path: "/contact",
});

export default function ContactPage() {
  const page = pagesContent.contact;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteConfig.siteUrl}/` },
          { name: "Contact Us", url: `${siteConfig.siteUrl}/contact` },
        ]}
      />
      <PageShell
        title={page.title}
        subtitle={page.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
        visualSrc="/images/community-1.svg"
        visualAlt="Abstract contact visual"
      >
        <Section tone="white" className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-card space-y-3 p-7">
            <h2>{page.contactHeading}</h2>
            {page.contactItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
            {page.sections.map((section) => (
              <div key={section.heading} className="pt-2">
                <h3>{section.heading}</h3>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
            <p className="pt-2 text-sm text-slate-600">
              Response timing may vary based on inquiry volume and operational capacity.
            </p>
          </div>
          <ContactForm />
        </Section>
      </PageShell>
    </>
  );
}
