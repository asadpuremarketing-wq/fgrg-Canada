type HighlightTilesProps = {
  items: string[];
};

export function HighlightTiles({ items }: HighlightTilesProps) {
  return (
    <section className="section-tone-white rounded-3xl border border-slate-200 p-5 shadow-[var(--shadow-sm)]">
      <h2 className="sr-only">Highlights</h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <li
            key={item}
            className="group flex flex-col items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 py-4 text-center transition duration-200 ease-in-out hover:-translate-y-1 hover:border-blue-200 hover:bg-gradient-to-b hover:from-blue-50 hover:to-white hover:shadow-[var(--shadow-sm)]"
          >
            <span
              className="flex h-3 w-3 rounded-full bg-[var(--brand-accent)]"
              aria-hidden="true"
            />
            <span className="text-sm font-semibold leading-snug text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
