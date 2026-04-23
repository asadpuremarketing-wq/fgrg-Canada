"use client";

import { OrganizationJsonLd, WebSiteJsonLd, LocalBusinessJsonLd, DonateActionJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { pagesContent } from "@/content/pages";
import { siteConfig } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { VideoHero } from "@/components/video-hero";
import { ProgramCards } from "@/components/program-cards";
import { Milestones } from "@/components/milestones";
import { FocusTabs } from "@/components/focus-tabs";
import {
  ArrowUpRight,
  ShieldCheck,
  Users,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const TRUST_ITEMS = [
  { icon: ShieldCheck,   label: "CRA Registered Charity" },
  { icon: Users,         label: "Community Driven" },
  { icon: MapPin,        label: "Canada-Based Programs" },
  { icon: CheckCircle2,  label: "100% Transparent" },
];

export default function HomePage() {
  const home = pagesContent.home;
  const focusTabItems = [
    { title: home.whoWeAre.heading,           body: home.whoWeAre.body[0] },
    { title: home.focusAreas[0]?.heading ?? "", body: home.focusAreas[0]?.body[0] ?? "" },
    { title: home.focusAreas[1]?.heading ?? "", body: home.focusAreas[1]?.body[0] ?? "" },
    { title: home.transparency.heading,       body: home.transparency.body[0] },
  ];

  return (
    <div className="space-y-0">
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <LocalBusinessJsonLd />
      <DonateActionJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", url: siteConfig.siteUrl }]} />

      {/* ── 1. Cinematic Hero ── */}
      <VideoHero
        eyebrow="Serving Communities with Integrity"
        title="Impactful Change, Rooted in Compassion"
        description="FGRF Canada is dedicated to poverty relief, education, and community support across Canada - strengthening communities with integrity and compassion."
        primaryCta={{ label: "Donate Now", href: "/donate" }}
        secondaryCta={{ label: "View Our Programs", href: "/programs" }}
        videoSrc={home.hero.videoSrc}
        videoPoster="/images/hero-cinematic.jpeg"
      />

      {/* ── 2. Trust Bar ── */}
      <section
        className="border-b py-10"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f5fafa 100%)",
          borderColor: "rgba(25,175,175,0.12)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
          >
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-center gap-2.5 group cursor-default"
              >
                <item.icon
                  size={15}
                  className="text-brand-teal shrink-0 group-hover:scale-110 transition-transform duration-200"
                />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 group-hover:text-brand-navy transition-colors duration-200">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. The Mission ── */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(160deg, #ffffff 0%, #f0fafa 45%, #f8fcff 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 xl:gap-28 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                className="absolute -top-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(25,175,175,0.14), transparent 70%)",
                }}
              />
              <div className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/impact-water.jpg"
                  alt="FGRF Canada community impact"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(10,15,29,0.45) 100%)",
                  }}
                />
              </div>

              {/* Floating stat */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 rounded-3xl p-6 md:p-8"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.10)",
                }}
              >
                <span
                  className="block text-4xl font-display font-bold mb-1.5"
                  style={{ color: "#19AFAF" }}
                >
                  100%
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-navy opacity-60">
                  Donation Transparency
                </span>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <span className="eyebrow">Our Purpose</span>
                <h2 className="text-brand-navy">{home.introduction.title}</h2>
                <p
                  className="text-2xl leading-relaxed font-display italic"
                  style={{ color: "#64748b" }}
                >
                  &ldquo;We believe every Canadian community thrives when compassion meets action.&rdquo;
                </p>
              </div>

              <div className="space-y-5 text-lg leading-relaxed" style={{ color: "#475569" }}>
                {home.whoWeAre.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <Link
                href="/about"
                className="group inline-flex items-center gap-3 font-bold text-lg text-brand-navy"
              >
                <span
                  className="border-b-2 pb-0.5 transition-colors duration-300"
                  style={{ borderColor: "#19AFAF" }}
                >
                  Discover Our Story
                </span>
                <ArrowUpRight
                  size={20}
                  className="text-brand-teal group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. Programs ── */}
      <section
        style={{
          background:
            "linear-gradient(180deg, #f5fafa 0%, #eef6f6 50%, #f0f4ff 100%)",
        }}
      >
        <ProgramCards
          title="Our Charitable Programs"
          intro="FGRF Canada designs and implements structured programs aimed at addressing essential needs and improving quality of life for communities across Canada."
          cards={home.programsShowcase.cards}
        />
      </section>

      {/* ── 5. Impact Metrics ── */}
      <div className="px-4 py-4">
        <Milestones
          title={home.milestones.title}
          intro={home.milestones.intro}
          items={home.milestones.items}
        />
      </div>

      {/* ── 6. Focus Tabs ── */}
      <section
        style={{
          background:
            "linear-gradient(160deg, #fafcff 0%, #f0fafa 50%, #fafcff 100%)",
        }}
      >
        <FocusTabs
          title="Areas of Strategic Focus"
          intro="We target our efforts toward critical needs that empower individuals and stabilize communities across Canada."
          items={focusTabItems}
        />
      </section>

      {/* ── 7. CTA Banner ── */}
      <section className="px-4 pb-20 pt-6">
        <motion.div
          whileHover={{ scale: 0.995 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden text-center"
          style={{
            background:
              "linear-gradient(145deg, #062840 0%, #0e507b 50%, #093d60 100%)",
          }}
        >
          <Image
            src="/images/hero-cinematic.jpeg"
            alt=""
            fill
            className="object-cover opacity-10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Radial teal glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(25,175,175,0.13) 0%, transparent 70%)",
            }}
          />
          {/* Top edge line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(25,175,175,0.5), transparent)",
            }}
          />

          <div className="relative z-10 px-8 py-20 md:py-28 space-y-10">
            <div className="space-y-5 max-w-3xl mx-auto">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] border"
                style={{
                  borderColor: "rgba(25,175,175,0.3)",
                  background: "rgba(25,175,175,0.08)",
                  color: "#4dd9d9",
                }}
              >
                Make a Difference
              </span>
              <h2
                className="!leading-tight"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: "white",
                }}
              >
                Ready to Create Lasting Change?
              </h2>
              <p className="text-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Your contribution directly funds food security, emergency relief,
                and education for Canadians in need.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                href="/donate"
                className="btn-primary w-full sm:w-auto"
                style={{
                  background: "#19AFAF",
                  boxShadow: "0 16px 40px rgba(25,175,175,0.4)",
                }}
              >
                Become a Monthly Donor
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-semibold text-base transition-colors duration-300 w-full sm:w-auto justify-center"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                <span
                  className="border-b pb-0.5 transition-colors group-hover:border-white/50"
                  style={{ borderColor: "rgba(255,255,255,0.2)" }}
                >
                  Partner with Us
                </span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
