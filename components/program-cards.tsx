import Link from "next/link";

type ProgramCard = {
  title: string;
  excerpt: string;
  complianceNote: string;
  href: string;
};

type ProgramCardsProps = {
  title: string;
  intro: string;
  cards: ProgramCard[];
};

const CARD_ACCENTS = [
  { bar: "card-accent-bar-blue", iconBg: "icon-circle-blue" },
  { bar: "card-accent-bar-green", iconBg: "icon-circle-green" },
  { bar: "card-accent-bar-teal", iconBg: "icon-circle-sky" },
];

export function ProgramCards({ title, intro, cards }: ProgramCardsProps) {
  return (
    <section className="section-tone-neutral space-y-6 rounded-3xl border border-slate-200 p-6 md:p-8">
      <div className="space-y-2">
        <h2>{title}</h2>
        <p className="max-w-3xl text-slate-600">{intro}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((card, i) => {
          const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
          return (
            <article
              key={card.title}
              className="surface-card flex flex-col overflow-hidden"
            >
              {/* Accent top bar */}
              <div className={`card-accent-bar ${accent.bar}`} aria-hidden="true" />
              <div className="flex flex-1 flex-col p-7">
                {/* Icon Circle (Empty) */}
                <span className={`icon-circle ${accent.iconBg} mb-4`} aria-hidden="true" />
                <h3 className="leading-snug">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{card.excerpt}</p>
                <p className="mt-3 text-xs text-slate-500 italic">{card.complianceNote}</p>
                <Link
                  href={card.href}
                  className="btn-tertiary mt-4 inline-flex items-center gap-1 group"
                >
                  Learn more
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
