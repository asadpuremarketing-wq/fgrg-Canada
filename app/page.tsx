import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { pagesContent } from "@/content/pages";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { VideoHero } from "@/components/video-hero";
import { HighlightTiles } from "@/components/highlight-tiles";
import { ProgramCards } from "@/components/program-cards";
import { Milestones } from "@/components/milestones";
import { FocusTabs } from "@/components/focus-tabs";

export const metadata: Metadata = pageMetadata({
  title: "Homepage",
  description: pagesContent.home.hero.body,
  path: "/",
});

export default function HomePage() {
  const home = pagesContent.home;
  const focusTabItems = [
    { title: home.whoWeAre.heading, body: home.whoWeAre.body[0] },
    { title: home.focusAreas[0]?.heading ?? "", body: home.focusAreas[0]?.body[0] ?? "" },
    { title: home.focusAreas[1]?.heading ?? "", body: home.focusAreas[1]?.body[0] ?? "" },
    { title: home.transparency.heading, body: home.transparency.body[0] },
  ];

  return (
    <div className="space-y-16 pb-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Faizan Global Relief Foundation Canada",
          url: siteConfig.siteUrl,
          email: "info@fgrfcanada.ca",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1202 Dunsmure Road, Hamilton, Ontario",
            addressCountry: "CA",
          },
        }}
      />

      <VideoHero
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        description={home.hero.body}
        primaryCta={{ label: "Donate", href: "/donate" }}
        secondaryCta={{ label: "Learn More", href: "/about" }}
        videoSrc={home.hero.videoSrc}
        videoPoster={home.hero.videoPoster}
      />

      <HighlightTiles items={home.highlightTiles} />

      <ProgramCards
        title={home.programsShowcase.title}
        intro={home.programsShowcase.intro}
        cards={home.programsShowcase.cards}
      />

      <section className="section-tone-white grid items-center gap-6 rounded-3xl border border-slate-200 p-6 shadow-[var(--shadow-sm)] md:grid-cols-2 md:p-8">
        <div className="space-y-4">
          <h2>{home.introduction.title}</h2>
          <p className="max-w-xl text-slate-700">{home.introduction.intro}</p>
          <h3>{home.whoWeAre.heading}</h3>
          {home.whoWeAre.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link href={home.introduction.ctaHref} className="btn-secondary mt-2">
            {home.introduction.ctaLabel}
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src="/images/community-1.svg"
            alt="Abstract community themed background in neutral colors"
            width={1200}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <Milestones
        title={home.milestones.title}
        intro={home.milestones.intro}
        items={home.milestones.items}
      />

      <FocusTabs title={home.focusTabs.title} intro={home.focusTabs.intro} items={focusTabItems} />

      <section className="section-tone-blue overflow-hidden rounded-3xl border border-slate-200 shadow-[var(--shadow-md)]">
        <div className="grid gap-0 md:grid-cols-[1.35fr_1fr]">
          <div className="space-y-4 bg-gradient-to-r from-blue-50 via-white to-emerald-50/30 p-8 md:p-10">
            <h2>{home.governanceCallout.title}</h2>
            <p className="max-w-2xl text-slate-700">
              Governance information is structured for clarity and published as documents become
              available.
            </p>
            <p>{home.governanceCallout.body}</p>
            <p>{home.transparency.body[0]}</p>
            <div className="pt-1">
              <Link href={home.governanceCallout.buttonHref} className="btn-primary">
                {home.governanceCallout.buttonLabel}
              </Link>
            </div>
          </div>
          <div className="min-h-[220px] border-t border-slate-200 md:border-l md:border-t-0">
            <Image
              src="/og.jpg"
              alt="FGRF Canada relief work photo"
              width={1000}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
