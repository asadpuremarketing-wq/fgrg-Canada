"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FocusItem = {
  title: string;
  body: string;
};

type FocusTabsProps = {
  title: string;
  intro: string;
  items: FocusItem[];
};

const TAB_ACCENTS = [
  { bg: "rgba(25,175,175,0.12)",  border: "rgba(25,175,175,0.35)",  dot: "#19AFAF" },
  { bg: "rgba(59,130,246,0.10)",  border: "rgba(59,130,246,0.30)",  dot: "#3b82f6" },
  { bg: "rgba(16,185,129,0.10)",  border: "rgba(16,185,129,0.30)",  dot: "#10b981" },
  { bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.30)",  dot: "#f59e0b" },
];

export function FocusTabs({ title, intro, items }: FocusTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = useMemo(() => items[activeIndex] ?? items[0], [items, activeIndex]);
  const accent = TAB_ACCENTS[activeIndex % TAB_ACCENTS.length];

  return (
    <section className="section-padding px-4">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* ── Header ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <span className="eyebrow">Strategic Focus</span>
            <h2 className="text-brand-navy">{title}</h2>
            <div className="divider-teal" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-slate-500 leading-relaxed lg:pb-2"
          >
            {intro}
          </motion.p>
        </div>

        {/* ── Tabs + Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-[300px_1fr] gap-6 lg:gap-8"
        >
          {/* ── Tab list (vertical on desktop, horizontal scroll on mobile) ── */}
          <div
            role="tablist"
            aria-label="Focus areas"
            className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 lg:self-start"
            style={{ scrollbarWidth: "none" }}
          >
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              const itemAccent = TAB_ACCENTS[index % TAB_ACCENTS.length];
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`focus-panel-${index}`}
                  id={`focus-tab-${index}`}
                  onClick={() => setActiveIndex(index)}
                  className="relative shrink-0 lg:w-full text-left px-5 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 group"
                  style={
                    isActive
                      ? {
                          background: "#0e507b",
                          color: "white",
                          boxShadow: "0 8px 24px rgba(10,15,29,0.2)",
                        }
                      : {
                          background: "white",
                          color: "#475569",
                          border: "1px solid #e2e8f0",
                        }
                  }
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="shrink-0 w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        background: isActive ? itemAccent.dot : "#cbd5e1",
                        boxShadow: isActive ? `0 0 8px ${itemAccent.dot}` : "none",
                      }}
                    />
                    <span className="leading-snug">{item.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Panel ── */}
          <AnimatePresence mode="wait">
            <motion.article
              key={activeIndex}
              role="tabpanel"
              id={`focus-panel-${activeIndex}`}
              aria-labelledby={`focus-tab-${activeIndex}`}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-3xl overflow-hidden"
              style={{
                border: `1px solid ${accent.border}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                minHeight: "280px",
              }}
            >
              {/* Ambient glow top-left */}
              <div
                className="absolute top-0 left-0 w-48 h-48 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${accent.bg}, transparent 70%)`,
                }}
              />

              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(90deg, ${accent.dot}, transparent)` }}
              />

              <div className="relative p-10 md:p-12 space-y-6">
                {/* Label */}
                <span
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                  style={{ background: accent.bg, color: accent.dot, border: `1px solid ${accent.border}` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent.dot }} />
                  Focus Area {activeIndex + 1}
                </span>

                <h3 className="text-brand-navy text-2xl md:text-3xl font-bold font-display leading-tight">
                  {activeItem.title}
                </h3>

                <p className="text-slate-600 text-lg leading-relaxed">
                  {activeItem.body}
                </p>
              </div>
            </motion.article>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
