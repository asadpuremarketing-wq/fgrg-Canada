import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { pagesContent } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title:       pagesContent.contact.title,
  description: pagesContent.contact.subtitle,
  path:        "/contact",
  keywords:    ["contact FGRF Canada", "charity contact Hamilton Ontario", "reach FGRF Canada", "nonprofit contact Canada", "1202 Dunsmure Road Hamilton"],
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
        visualSrc="/images/community-support.jpg"
        visualAlt="FGRF Canada community - connect with us"
      >

        {/* ── Location photo banner ── */}
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="/images/mission-impact.jpeg"
            alt="FGRF Canada offices and community presence"
            width={1200}
            height={320}
            className="w-full h-48 md:h-64 object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(6,40,64,0.55)" }}
          >
            <div className="text-center space-y-2">
              <MapPin size={28} style={{ color: "#19AFAF", margin: "0 auto" }} />
              <p className="font-bold text-white text-lg">Hamilton, Ontario, Canada</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>1202 Dunsmure Road</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Contact info panel */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(25,175,175,0.15)", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
          >
            {/* Photo top */}
            <div className="relative h-40">
              <Image
                src="/images/community-support.jpg"
                alt="FGRF Canada community support"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(6,40,64,0.3) 0%, rgba(14,80,123,0.85) 100%)" }}
              />
              <div className="absolute bottom-5 left-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#4dd9d9" }}>Get in Touch</p>
                <h2 className="!text-xl mt-1" style={{ color: "white" }}>{page.contactHeading}</h2>
              </div>
            </div>

            {/* Info */}
            <div
              className="p-8 space-y-8"
              style={{ background: "linear-gradient(160deg, #062840 0%, #0e507b 100%)" }}
            >
              <div className="space-y-5">
                {page.contactItems.map((item, i) => {
                  const icons = [MapPin, Phone, Mail];
                  const Icon = icons[i % icons.length];
                  return (
                    <div key={item} className="flex items-start gap-3">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: "rgba(25,175,175,0.15)" }}
                      >
                        <Icon size={14} style={{ color: "#19AFAF" }} />
                      </span>
                      <p className="text-sm leading-relaxed pt-1" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</p>
                    </div>
                  );
                })}
              </div>

              {page.sections.map((section) => (
                <div key={section.heading} className="space-y-3 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2">
                    <Clock size={14} style={{ color: "#19AFAF" }} />
                    <h3 className="!text-sm font-bold" style={{ color: "white" }}>{section.heading}</h3>
                  </div>
                  {section.body.map((p) => (
                    <p key={p} className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{p}</p>
                  ))}
                </div>
              ))}

              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                Response timing may vary based on inquiry volume and operational capacity.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </PageShell>
    </>
  );
}
