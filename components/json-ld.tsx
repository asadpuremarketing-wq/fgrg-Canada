import { siteConfig } from "@/lib/site";

// ── Generic JSON-LD injector ──────────────────────────────────────────────────
type JsonLdProps = { data: Record<string, unknown> };

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────
type BreadcrumbItem = { name: string; url: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type":    "ListItem",
          position:   index + 1,
          name:       item.name,
          item:       item.url,
        })),
      }}
    />
  );
}

// ── Organization (NGO / Charity) ──────────────────────────────────────────────
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context":      "https://schema.org",
        "@type":         ["Organization", "NGO"],
        "@id":           `${siteConfig.siteUrl}/#organization`,
        name:            siteConfig.name,
        legalName:       siteConfig.legalName,
        alternateName:   siteConfig.shortName,
        url:             siteConfig.siteUrl,
        logo: {
          "@type":       "ImageObject",
          url:           `${siteConfig.siteUrl}/images/Logo.png`,
          width:         200,
          height:        200,
        },
        image:           `${siteConfig.siteUrl}/opengraph-image`,
        description:     siteConfig.description,
        email:           siteConfig.email,
        telephone:       siteConfig.phone,
        address: {
          "@type":           "PostalAddress",
          streetAddress:     siteConfig.address,
          addressLocality:   siteConfig.city,
          addressRegion:     "ON",
          postalCode:        siteConfig.postalCode,
          addressCountry:    siteConfig.country,
        },
        geo: {
          "@type":     "GeoCoordinates",
          latitude:    siteConfig.geo.latitude,
          longitude:   siteConfig.geo.longitude,
        },
        areaServed: {
          "@type": "Country",
          name:    "Canada",
        },
        foundingLocation: {
          "@type":          "Place",
          name:             "Hamilton, Ontario, Canada",
          addressCountry:   "CA",
        },
        knowsAbout: [
          "Poverty relief",
          "Community support",
          "Education",
          "Food security",
          "Canadian charitable programs",
        ],
        ...(siteConfig.social.facebook  ? { sameAs: [siteConfig.social.facebook] } : {}),
      }}
    />
  );
}

// ── WebSite (enables Sitelinks search box in Google) ─────────────────────────
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context":    "https://schema.org",
        "@type":       "WebSite",
        "@id":         `${siteConfig.siteUrl}/#website`,
        url:           siteConfig.siteUrl,
        name:          siteConfig.name,
        description:   siteConfig.description,
        publisher: {
          "@id": `${siteConfig.siteUrl}/#organization`,
        },
        inLanguage: "en-CA",
        copyrightYear: new Date().getFullYear(),
        copyrightHolder: {
          "@id": `${siteConfig.siteUrl}/#organization`,
        },
      }}
    />
  );
}

// ── Local Business / Charity Location ────────────────────────────────────────
// Helps Google Maps, local pack, and local search results.
export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context":      "https://schema.org",
        "@type":         ["LocalBusiness", "NGO"],
        "@id":           `${siteConfig.siteUrl}/#localbusiness`,
        name:            siteConfig.name,
        image:           `${siteConfig.siteUrl}/opengraph-image`,
        url:             siteConfig.siteUrl,
        telephone:       siteConfig.phone,
        email:           siteConfig.email,
        address: {
          "@type":           "PostalAddress",
          streetAddress:     siteConfig.address,
          addressLocality:   siteConfig.city,
          addressRegion:     "ON",
          postalCode:        siteConfig.postalCode,
          addressCountry:    siteConfig.country,
        },
        geo: {
          "@type":     "GeoCoordinates",
          latitude:    siteConfig.geo.latitude,
          longitude:   siteConfig.geo.longitude,
        },
        openingHoursSpecification: {
          "@type":     "OpeningHoursSpecification",
          dayOfWeek:   ["Monday","Tuesday","Wednesday","Thursday","Friday"],
          opens:       "09:00",
          closes:      "17:00",
        },
        priceRange:     "Free",
        currenciesAccepted: "CAD",
        paymentAccepted: "Credit Card, Cheque",
        areaServed:      "Canada",
        serviceArea: {
          "@type":     "Country",
          name:        "Canada",
        },
      }}
    />
  );
}

// ── News Article ──────────────────────────────────────────────────────────────
type ArticleJsonLdProps = {
  title:       string;
  description: string;
  url:         string;
  datePublished: string;
  dateModified?: string;
  imageUrl?:   string;
};

export function ArticleJsonLd({
  title, description, url, datePublished, dateModified, imageUrl,
}: ArticleJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@context":        "https://schema.org",
        "@type":           "Article",
        headline:          title,
        description,
        url,
        datePublished,
        dateModified:      dateModified ?? datePublished,
        image:             imageUrl ?? `${siteConfig.siteUrl}/opengraph-image`,
        author: {
          "@type": "Organization",
          name:    siteConfig.name,
          url:     siteConfig.siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name:    siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url:     `${siteConfig.siteUrl}/opengraph-image`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":   url,
        },
        inLanguage: "en-CA",
      }}
    />
  );
}

// ── FAQ Page ──────────────────────────────────────────────────────────────────
type FaqItem = { question: string; answer: string };

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  return (
    <JsonLd
      data={{
        "@context":   "https://schema.org",
        "@type":      "FAQPage",
        mainEntity:   items.map((item) => ({
          "@type": "Question",
          name:    item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text:    item.answer,
          },
        })),
      }}
    />
  );
}

// ── Donate Action ─────────────────────────────────────────────────────────────
export function DonateActionJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type":    "DonateAction",
        agent: {
          "@type": "Organization",
          name:    siteConfig.name,
        },
        recipient: {
          "@type": "NGO",
          name:    siteConfig.name,
          url:     siteConfig.siteUrl,
        },
        url: `${siteConfig.siteUrl}/donate`,
        description: "Support FGRF Canada's charitable programs serving Canadians in need.",
      }}
    />
  );
}
