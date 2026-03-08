import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SkipToContent } from "@/components/skip-to-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import { GlobalGallery } from "@/components/global-gallery";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.shortName,
    template: "%s | FGRF Canada",
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.shortName,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.siteUrl,
    siteName: siteConfig.shortName,
    locale: "en_CA",
    images: [
      {
        url: `${siteConfig.siteUrl}/og.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.shortName} preview image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.shortName,
    description: siteConfig.description,
    images: [`${siteConfig.siteUrl}/og.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <body className={`${inter.variable} ${manrope.variable} bg-slate-50 text-slate-900 antialiased`}>
        <SkipToContent />
        <SiteHeader />
        <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </main>
        <GlobalGallery />
        <SiteFooter />
      </body>
    </html>
  );
}
