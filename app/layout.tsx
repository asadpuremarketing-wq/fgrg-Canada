import type { Metadata, Viewport } from "next";
import { Open_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import { SkipToContent } from "@/components/skip-to-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollToTop } from "@/components/scroll-to-top";
import { siteConfig } from "@/lib/site";
import { GlobalGallery } from "@/components/global-gallery";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  display:  "swap",
  subsets:  ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  display:  "swap",
  subsets:  ["latin"],
  weight:   ["400", "700", "900"],
});

// ── Viewport / theme ──────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor:         "#0e507b",
  colorScheme:        "light",
  width:              "device-width",
  initialScale:       1,
  maximumScale:       5,
};

// ── Root metadata (inherited/overridden per page) ─────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),

  title: {
    default:  `${siteConfig.shortName} - Charitable Organization`,
    template: "%s | FGRF Canada",
  },
  description: siteConfig.description,
  keywords:    siteConfig.keywords.join(", "),
  authors:     [{ name: siteConfig.legalName, url: siteConfig.siteUrl }],
  creator:     siteConfig.legalName,
  publisher:   siteConfig.legalName,

  // ── Canonical / alternates ────────────────────────────────────────────────
  alternates: {
    canonical: siteConfig.siteUrl,
    languages: {
      "en-CA": siteConfig.siteUrl,
      "en":    siteConfig.siteUrl,
    },
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    title:       `${siteConfig.shortName} - Charitable Organization`,
    description: siteConfig.description,
    type:        "website",
    url:         siteConfig.siteUrl,
    siteName:    siteConfig.name,
    locale:      "en_CA",
    images: [
      {
        url:    `${siteConfig.siteUrl}/opengraph-image`,
        width:  1200,
        height: 630,
        alt:    `${siteConfig.shortName} - Canadian Charitable Organization`,
        type:   "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    title:       `${siteConfig.shortName} - Charitable Organization`,
    description: siteConfig.description,
    images:      [`${siteConfig.siteUrl}/opengraph-image`],
  },

  // ── Crawling & indexing ───────────────────────────────────────────────────
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon:    [
      { url: "/images/Logo.png", type: "image/png" },
    ],
    shortcut: "/images/Logo.png",
    apple:    "/images/Logo.png",
  },

  // ── Manifest ─────────────────────────────────────────────────────────────
  manifest: "/manifest.json",

  // ── Geographic / misc ─────────────────────────────────────────────────────
  other: {
    "geo.region":    "CA-ON",
    "geo.placename": "Hamilton, Ontario, Canada",
    "geo.position":  `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    "ICBM":          `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
    "DC.language":   "en-CA",
    "DC.publisher":  siteConfig.legalName,
    "DC.coverage":   "Canada",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" dir="ltr">
      <head>
        {/* DNS prefetch for fonts (already handled by next/font, belt-and-suspenders) */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body
        className={`${openSans.variable} ${merriweather.variable} text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900`}
      >
        <SkipToContent />
        <SiteHeader />
        <main id="main-content" className="w-full pt-16 pb-8">
          {children}
        </main>
        <GlobalGallery />
        <SiteFooter />
        <ScrollToTop />
      </body>
    </html>
  );
}
