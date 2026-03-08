"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    firstMobileLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* ── Top Bar ────────────────────────────────────────── */}
      <div className="bg-[var(--brand-primary)] text-white">
        <div className="mx-auto flex h-10 w-full max-w-7xl items-center justify-between px-4 text-xs font-semibold uppercase tracking-wider sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">24/7 Donation Hotline</span>
            <span className="flex items-center gap-1.5 text-sky-300">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {siteConfig.phone}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline opacity-80">Follow Us On</span>
            <div className="flex gap-2">
              {[
                { label: "Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" },
                { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                { label: "WhatsApp", path: "M12.012 2c5.51 0 9.998 4.498 9.998 10.03 0 1.777-.468 3.518-1.353 5.06l-.16.292 1.44 5.253-5.385-1.413-.284.169A9.97 9.97 0 0112.013 22C6.502 22 2.013 17.502 2.013 11.97A10.02 10.02 0 0112.012 2zM12.013 3.674c-4.57 0-8.293 3.733-8.293 8.32 0 1.5.399 2.96 1.154 4.269l.26.45-1.248 4.5 4.607-1.21.436.258c1.23.731 2.64 1.116 4.07 1.116 4.582 0 8.324-3.733 8.324-8.32 0-4.577-3.742-8.31-8.31-8.31zm4.966 11.23c-.206-.103-1.217-.6-1.406-.67-.189-.068-.326-.102-.463.103-.137.206-.532.669-.652.806-.12.137-.24.155-.446.052-.206-.103-.87-.32-1.656-1.022-.614-.547-1.029-1.224-1.15-1.43-.12-.205-.013-.317.09-.419.093-.092.206-.24.309-.36.103-.12.137-.206.206-.343.069-.137.034-.257-.017-.36-.051-.103-.463-1.115-.635-1.527-.167-.404-.337-.349-.463-.356l-.395-.008c-.137 0-.36.051-.549.257-.189.206-.72.703-.72 1.715 0 1.012.738 1.99 .84 2.127.103.137 1.45 2.213 3.512 3.104 2.062.89 2.48.714 2.943.67.463-.043 1.217-.497 1.389-.978.171-.48.171-.892.12-.977-.052-.086-.189-.137-.395-.24z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-5 w-5 items-center justify-center rounded bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
          ? "border-b border-slate-200/80 bg-white/96 shadow-[0_2px_16px_rgba(15,23,42,0.08)] backdrop-blur-lg"
          : "border-b border-transparent bg-white/80 backdrop-blur-md"
          }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3.5">

            {/* ── Logo / Wordmark ─────────────────────────────── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 rounded-lg"
              aria-label={`${siteConfig.shortName} home`}
            >
              {/* Icon mark */}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] shadow-[0_2px_10px_rgba(25,175,175,0.3)]" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor" />
                </svg>
              </span>
              {/* Wordmark */}
              <span className="text-[1.05rem] font-bold leading-tight tracking-tight text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                {siteConfig.shortName}
              </span>
            </Link>

            {/* ── Desktop nav ─────────────────────────────────── */}
            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
              {navItems
                .filter((item) => item.href !== "/donate")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative rounded-lg px-3 py-1.5 text-sm font-600 font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 ${isActive(item.href)
                      ? "text-[var(--brand-primary)]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                      }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)]" />
                    )}
                  </Link>
                ))}
            </nav>

            {/* ── Donate CTA + mobile toggle ───────────────────── */}
            <div className="flex items-center gap-3">
              <Link
                href="/donate"
                className="btn-primary hidden px-5 py-2 text-sm md:inline-flex"
                aria-label="Donate to FGRF Canada"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-2.09C4.045 12.51 2 10.262 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.762-2.045 5.01-3.885 6.63a22.049 22.049 0 01-2.582 2.09 20.5 20.5 0 01-1.162.682l-.019.01-.005.003h-.002a.739.739 0 01-.69 0l-.002-.001z" />
                </svg>
                Donate
              </Link>
              <button
                type="button"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-primary-nav"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
              >
                {isMenuOpen ? (
                  <>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Close
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 010 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 010 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 010 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    Menu
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile drawer ───────────────────────────────────── */}
        {isMenuOpen && (
          <>
            {/* Lock body scroll */}
            <style jsx global>{`
              body {
                overflow: hidden;
              }
            `}</style>

            <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true">
              {/* Backdrop */}
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsMenuOpen(false)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              {/* Panel */}
              <nav
                id="mobile-primary-nav"
                aria-label="Mobile primary navigation"
                className="absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-slate-200 !bg-white p-6 shadow-2xl"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] shadow-md" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor" />
                      </svg>
                    </span>
                    <span className="text-lg font-bold tracking-tight text-slate-900">{siteConfig.shortName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition active:scale-95"
                    aria-label="Close menu"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <li key={`mobile-${item.href}`}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        onClick={() => setIsMenuOpen(false)}
                        ref={index === 0 ? firstMobileLinkRef : undefined}
                        className={`block rounded-xl px-4 py-3.5 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 ${item.href === "/donate"
                          ? "btn-primary mt-6 w-full justify-center text-center shadow-lg shadow-teal-500/20"
                          : isActive(item.href)
                            ? "bg-[var(--surface-soft-blue)] text-[var(--brand-primary)]"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
}
