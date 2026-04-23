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
    <header className="relative overflow-hidden rounded-3xl">
      {/* ── Light background with subtle warmth ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #f0fafa 0%, #f8faff 45%, #fafcff 100%)",
        }}
        aria-hidden="true"
      />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(25,175,175,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      {/* Large teal circle - decorative, bleeds off top-right */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(25,175,175,0.15) 0%, rgba(25,175,175,0.04) 55%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Smaller accent blob - bottom-left */}
      <div
        className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(25,175,175,0.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-8 bottom-8 w-1 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #19AFAF 0%, rgba(25,175,175,0.2) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative p-8 sm:p-10 sm:pl-12">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              {breadcrumbs.map((item, index) => (
                <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="font-medium transition-colors duration-200 hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-1 rounded-sm"
                      style={{ color: "#64748b" }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span style={{ color: "#94a3b8" }}>{item.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <svg
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-3 w-3"
                      style={{ color: "#cbd5e1" }}
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L9.19 8 6.22 5.03a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Eyebrow accent */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="h-px w-10"
            style={{ background: "#19AFAF" }}
            aria-hidden="true"
          />
          <span
            className="text-xs font-bold uppercase tracking-[0.22em]"
            style={{ color: "#19AFAF" }}
          >
            FGRF Canada
          </span>
        </div>

        {/* Title */}
        <h1
          className="relative max-w-3xl font-display font-bold"
          style={{
            color: "#0e507b",
            fontSize: "clamp(1.9rem, 4.5vw, 3.25rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className="mt-4 max-w-2xl text-lg leading-relaxed"
          style={{ color: "#475569" }}
        >
          {subtitle}
        </p>
      </div>
    </header>
  );
}
