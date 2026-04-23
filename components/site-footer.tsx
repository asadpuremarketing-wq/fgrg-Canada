import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { NewsletterForm } from "@/components/newsletter-form";

const NAV_GROUPS = [
  {
    label: "Organisation",
    links: [
      { label: "About Us",   href: "/about" },
      { label: "Our Mission", href: "/mission" },
      { label: "Governance", href: "/governance" },
    ],
  },
  {
    label: "Get Involved",
    links: [
      { label: "Programs",    href: "/programs" },
      { label: "Volunteer",   href: "/get-involved" },
      { label: "Donate",      href: "/donate" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "News & Updates",     href: "/news" },
      { label: "Contact Us",         href: "/contact" },
      { label: "Brand Guidelines",   href: "/brand" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "Twitter / X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 relative overflow-hidden" style={{
      background: "linear-gradient(160deg, #062840 0%, #0e507b 55%, #093d60 100%)",
    }}>
      {/* Top glow accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 10%, rgba(25,175,175,0.35) 50%, transparent 90%)" }}
      />

      {/* Ambient blob */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(25,175,175,0.07) 0%, transparent 70%)" }}
      />

      {/* ── Newsletter bar ── */}
      <div
        className="mx-auto w-full max-w-7xl px-6 pt-14 sm:px-8 lg:px-10"
      >
        <div
          className="flex flex-col gap-6 rounded-2xl px-8 py-8 sm:flex-row sm:items-center sm:justify-between"
          style={{
            background: "rgba(25,175,175,0.07)",
            border: "1px solid rgba(25,175,175,0.14)",
          }}
        >
          <div className="space-y-1 shrink-0">
            <p className="text-sm font-bold text-white">Stay in the loop</p>
            <p className="text-xs text-slate-400">
              Updates on our programs, impact reports, and ways to help.
            </p>
          </div>
          <div className="w-full sm:max-w-sm">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 pt-16 pb-12 sm:px-8 md:grid-cols-[1.7fr_1fr_1fr_1fr] lg:px-10">

        {/* Brand column */}
        <div className="space-y-5">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center group">
            <div className="relative h-14 w-40 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/Logo.png"
                alt={siteConfig.shortName}
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </div>
          </Link>

          <p className="max-w-[22rem] text-sm leading-relaxed text-slate-400">
            Providing compassionate relief and sustainable development across communities in Canada and beyond.
          </p>

          {/* Registration badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-800/50 bg-emerald-950/50 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            Charitable Registration{" "}
            {siteConfig.registrationStatus === "registered" ? "Active" : "Pending"}
          </span>

          {/* Contact info */}
          <div className="space-y-2 pt-1 text-sm text-slate-400">
            {[
              {
                icon: (
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                ),
                value: siteConfig.address,
              },
              {
                icon: (
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                ),
                value: siteConfig.phone,
              },
              {
                icon: (
                  <>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </>
                ),
                value: siteConfig.email,
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 mt-0.5"
                  style={{ color: "#19AFAF" }}
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
                <span>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex gap-2 pt-1">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="footer-social-link flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <h3
              className="mb-5 text-[11px] font-bold uppercase tracking-[0.15em]"
              style={{ color: "#475569" }}
            >
              {group.label}
            </h3>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-brand-teal transition-all duration-300 overflow-hidden" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Faizan Global Relief Foundation Canada. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use",   href: "/terms" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-slate-600 transition-colors duration-200 hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
