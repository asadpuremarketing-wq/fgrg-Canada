"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { Globe2, Users, Droplets, GraduationCap } from "lucide-react";

type MilestonesProps = {
  title: string;
  intro: string;
  items: string[];
};

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 80 });
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Math.floor(latest)
        );
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

const STAT_ICONS = [Globe2, Users, Droplets, GraduationCap];

export function Milestones({ title, intro, items }: MilestonesProps) {
  const stats = [
    { label: items[0] || "Global Outreach",   value: 50,   suffix: "K+" },
    { label: items[1] || "Families Helped",    value: 120,  suffix: "K+" },
    { label: items[2] || "Clean Water Wells",  value: 1500, suffix: "+"  },
    { label: items[3] || "Educational Grants", value: 250,  suffix: "+"  },
  ];

  return (
    <section
      className="relative overflow-hidden rounded-[2.5rem] text-white"
      style={{
        background:
          "linear-gradient(145deg, #062840 0%, #0e507b 45%, #093d60 100%)",
      }}
    >
      {/* Dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Ambient glow blobs */}
      <div
        className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 h-[500px] w-[500px] rounded-full pointer-events-none animate-glow-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(25,175,175,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 h-[400px] w-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] border"
              style={{
                borderColor: "rgba(25,175,175,0.3)",
                background: "rgba(25,175,175,0.1)",
                color: "#4dd9d9",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
              Our Impact
            </span>
            <h2
              className="!leading-tight"
              style={{
                fontSize: "clamp(2rem,4.5vw,3.5rem)",
                color: "white",
              }}
            >
              {title}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 text-lg leading-relaxed lg:pb-2"
          >
            {intro}
          </motion.p>
        </div>

        {/* Stats grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 rounded-3xl overflow-hidden cursor-default"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Hover gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(25,175,175,0.18) 0%, transparent 65%)",
                  }}
                />

                {/* Top accent line on hover */}
                <div
                  className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(25,175,175,0.8), transparent)",
                  }}
                />

                <div className="relative">
                  {/* Lucide icon */}
                  <div
                    className="mb-5 inline-flex items-center justify-center w-10 h-10 rounded-2xl"
                    style={{
                      background: "rgba(25,175,175,0.12)",
                      color: "#19AFAF",
                    }}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </div>

                  {/* Animated number */}
                  <div
                    className="text-5xl md:text-6xl font-extrabold mb-3 font-display tabular-nums"
                    style={{ color: "#19AFAF", lineHeight: 1 }}
                  >
                    <Counter value={stat.value} />
                    <span>{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <p className="text-slate-400 font-semibold uppercase tracking-widest text-[11px] leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
