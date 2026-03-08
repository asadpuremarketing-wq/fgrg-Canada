type MilestonesProps = {
  title: string;
  intro: string;
  items: string[];
};

export function Milestones({ title, intro, items }: MilestonesProps) {
  return (
    <section className="section-tone-blue space-y-6 rounded-3xl border border-slate-200 p-6 md:p-8">
      <div className="space-y-2">
        <h2>{title}</h2>
        <p className="max-w-3xl text-slate-600">{intro}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <article
            key={item}
            className="surface-card group flex flex-col gap-3 p-6"
          >
            {/* Number row */}
            <div className="flex items-center gap-3">
              <span
                className="stat-number text-[1.8rem]"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="flex h-3 w-3 shrink-0 rounded-full bg-blue-200"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-base leading-snug">{item}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
