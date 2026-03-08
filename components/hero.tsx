import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  imageSrc: string;
  imageAlt: string;
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
}: HeroProps) {
  return (
    <section
      className="relative flex min-h-[600px] w-full items-center overflow-hidden rounded-[2rem] bg-[var(--color-fgrf-navy)] shadow-[var(--shadow-lg)]"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--color-fgrf-teal)]/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[var(--color-fgrf-teal)]/10 blur-3xl" aria-hidden="true" />

      {/* Background Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-right opacity-90 mix-blend-overlay sm:opacity-100 sm:mix-blend-normal"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-fgrf-navy)] via-[var(--color-fgrf-navy)]/95 to-[var(--color-fgrf-navy)]/10 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-fgrf-navy)] via-transparent to-transparent sm:hidden" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-8">
          {/* Eyebrow pill */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.1em] text-teal-200 backdrop-blur-sm">
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 opacity-80" aria-hidden="true">
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 1.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11z" />
            </svg>
            {eyebrow}
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-display drop-shadow-sm">
            {title}
          </h1>

          <p className="text-lg leading-8 text-white max-w-xl">
            {description}
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-[var(--brand-primary)] shadow-[0_4px_14px_rgba(255,255,255,0.25)] transition hover:bg-slate-50 hover:shadow-[0_6px_20px_rgba(255,255,255,0.3)] active:translate-y-0"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5 text-[var(--brand-accent)]" aria-hidden="true">
                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-2.09C4.045 12.51 2 10.262 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.762-2.045 5.01-3.885 6.63a22.049 22.049 0 01-2.582 2.09 20.5 20.5 0 01-1.162.682l-.019.01-.005.003h-.002a.739.739 0 01-.69 0l-.002-.001z" />
              </svg>
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {secondaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2 opacity-90">
            <span className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true">
                <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.85 5.35a.75.75 0 00-1.2-.9l-2.8 3.73-1.18-1.18a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.13-.08l3.36-4.48z" clipRule="evenodd" />
              </svg>
              Canada Not-for-Profit
            </span>
            <span className="h-3.5 w-px bg-white/20" aria-hidden="true" />
            <span className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true">
                <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.85 5.35a.75.75 0 00-1.2-.9l-2.8 3.73-1.18-1.18a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.13-.08l3.36-4.48z" clipRule="evenodd" />
              </svg>
              Community-Driven
            </span>
            <span className="h-3.5 w-px bg-white/20" aria-hidden="true" />
            <span className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true">
                <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.85 5.35a.75.75 0 00-1.2-.9l-2.8 3.73-1.18-1.18a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.13-.08l3.36-4.48z" clipRule="evenodd" />
              </svg>
              Transparency
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
