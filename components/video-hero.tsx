"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type VideoHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  videoSrc: string;
  videoPoster: string;
};

export function VideoHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  videoSrc,
  videoPoster,
}: VideoHeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale   = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const y       = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, 180]);

  const words = title.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden"
      style={{ background: "#062840" }}
    >
      {/* ── Photo background (always visible) ── */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <Image
          src="/images/volunteers-community.jpeg"
          alt=""
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />

        {/* Video overlays the photo when loaded */}
        <video
          autoPlay
          muted
          loop
          playsInline
          autoPlay={!reducedMotion}
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${videoLoaded && !reducedMotion ? "opacity-100" : "opacity-0"}`}
          poster={videoPoster}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Primary overlay - keeps text legible while photo shows through */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,20,45,0.62) 0%, rgba(6,20,45,0.38) 35%, rgba(6,20,45,0.55) 70%, rgba(6,20,45,0.88) 100%)",
          }}
        />

        {/* Side vignette */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse 90% 100% at 50% 50%, transparent 35%, rgba(6,20,45,0.45) 100%)",
          }}
        />
      </motion.div>

      {/* ── Subtle teal ambient glow ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 58%, rgba(25,175,175,0.10) 0%, transparent 70%)",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-teal-300 text-xs font-bold tracking-[0.22em] uppercase mb-10 backdrop-blur-sm"
            style={{
              borderColor: "rgba(25,175,175,0.35)",
              background: "rgba(25,175,175,0.10)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            {eyebrow}
          </span>
        </motion.div>

        {/* Animated headline */}
        <h1
          className="mb-8"
          style={{
            lineHeight: 1.04,
            color: "white",
            textShadow: "0 2px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-3 last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1.2 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed"
          style={{
            color: "rgba(255,255,255,0.88)",
            textShadow: "0 1px 8px rgba(0,0,0,0.5)",
          }}
        >
          {description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link
            href={primaryCta.href}
            className="btn-primary !bg-brand-teal shadow-2xl w-full sm:w-auto"
            style={{ boxShadow: "0 16px 40px rgba(25,175,175,0.45)" }}
          >
            {primaryCta.label}
          </Link>

          <Link
            href={secondaryCta.href}
            className="group flex items-center gap-3 font-bold text-lg transition-colors duration-300 w-full sm:w-auto justify-center"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            <span className="border-b border-white/35 group-hover:border-teal-400 pb-0.5 transition-colors">
              {secondaryCta.label}
            </span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-brand-teal"
            >
              {">"}
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-white/30 text-[9px] font-bold uppercase tracking-[0.35em]">Scroll</span>
        <div className="relative h-14 w-px overflow-hidden">
          <div
            className="absolute top-0 w-px h-full"
            style={{ background: "linear-gradient(180deg, rgba(25,175,175,0.8), transparent)" }}
          />
          <motion.div
            className="absolute w-px h-6"
            style={{ background: "linear-gradient(180deg, #19AFAF, transparent)" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
