"use client";

import { useMemo, useState } from "react";

type FocusItem = {
  title: string;
  body: string;
};

type FocusTabsProps = {
  title: string;
  intro: string;
  items: FocusItem[];
};

export function FocusTabs({ title, intro, items }: FocusTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = useMemo(() => items[activeIndex] ?? items[0], [items, activeIndex]);

  return (
    <section className="section-tone-neutral space-y-6 rounded-3xl border border-slate-200 p-6 md:p-8">
      <div className="space-y-2">
        <h2>{title}</h2>
        <p className="max-w-3xl text-slate-600">{intro}</p>
      </div>

      {/* Tab strip */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Focus areas"
      >
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`focus-panel-${index}`}
            id={`focus-tab-${index}`}
            onClick={() => setActiveIndex(index)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-700 focus-visible:ring-offset-2 ${activeIndex === index
                ? "bg-gradient-to-r from-blue-800 to-emerald-700 text-white shadow-[0_4px_14px_rgba(30,58,138,0.28)]"
                : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200"
              }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Panel */}
      <article
        role="tabpanel"
        id={`focus-panel-${activeIndex}`}
        aria-labelledby={`focus-tab-${activeIndex}`}
        key={activeIndex}
        className="surface-card p-7"
        style={{ animation: "fadeIn 220ms ease-in-out" }}
      >
        <div className="flex items-start gap-4">
          <span
            className="icon-circle icon-circle-blue shrink-0"
            aria-hidden="true"
          />
          <div>
            <h3 className="leading-snug">{activeItem.title}</h3>
            <p className="mt-2">{activeItem.body}</p>
          </div>
        </div>
      </article>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}
