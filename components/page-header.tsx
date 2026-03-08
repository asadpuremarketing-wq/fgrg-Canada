import Link from "next/link";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
};

export function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <header
      className="relative mb-10 overflow-hidden rounded-3xl border border-blue-100/50 p-6 shadow-[var(--shadow-md)] sm:p-9"
      style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1a5f7a 50%, #0f5132 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 left-8 h-40 w-40 rounded-full bg-emerald-400/12 blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-32 w-32 rounded-full bg-sky-300/8 blur-xl" aria-hidden="true" />

      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav aria-label="Breadcrumb" className="relative mb-5">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-blue-200/80">
            {breadcrumbs.map((item, index) => (
              <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                {item.href ? (
                  <Link href={item.href} className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 rounded">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-blue-100/60">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 text-blue-300/50" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L9.19 8 6.22 5.03a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <h1 className="relative max-w-4xl text-white">{title}</h1>
      <p className="relative mt-3 max-w-3xl !text-white font-medium drop-shadow-sm">{subtitle}</p>
    </header>
  );
}
