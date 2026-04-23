"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, siteConfig } from "@/lib/site";
import { Menu, X, Phone } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 56);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change — this is an intentional
  // synchronisation of UI state with the Next.js router.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname === href;
  const navLinks = navItems.filter((i) => i.href !== "/donate");

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]">
      {/* ── Outer wrapper handles the at-top vs scrolled layout ── */}
      <div
        className={`transition-all duration-500 ${
          isScrolled ? "px-4 sm:px-6 pt-3" : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? "rounded-[2rem] px-6 py-3 shadow-[0_4px_32px_rgba(14,80,123,0.18)] border border-white/60"
              : "px-6 sm:px-10 py-4"
          }`}
          style={
            isScrolled
              ? {
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                }
              : {
                  background: "#0e507b",
                }
          }
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative h-14 w-36 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/Logo.png"
                alt={siteConfig.shortName}
                fill
                className="object-contain object-left"
                sizes="144px"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3.5 py-2 text-[13px] font-semibold tracking-wide rounded-xl transition-all duration-200"
                style={{
                  color: isScrolled
                    ? (isActive(item.href) ? "#19AFAF" : "#475569")
                    : (isActive(item.href) ? "#19AFAF" : "rgba(255,255,255,0.85)"),
                }}
              >
                {isActive(item.href) && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: isScrolled ? "rgba(25,175,175,0.08)" : "rgba(255,255,255,0.12)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Phone */}
            <div
              className="hidden lg:flex items-center gap-2 pr-4 border-r"
              style={{ borderColor: isScrolled ? "#e2e8f0" : "rgba(255,255,255,0.2)" }}
            >
              <Phone size={13} style={{ color: "#19AFAF" }} />
              <span
                className="text-[11px] font-bold uppercase tracking-widest"
                style={{ color: isScrolled ? "#64748b" : "rgba(255,255,255,0.7)" }}
              >
                {siteConfig.phone}
              </span>
            </div>

            {/* Donate */}
            <Link
              href="/donate"
              className="hidden md:flex items-center justify-center px-5 py-2.5 text-[13px] font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5"
              style={isScrolled
                ? { background: "#0e507b", color: "white", boxShadow: "0 4px 16px rgba(14,80,123,0.25)" }
                : { background: "#19AFAF", color: "white", boxShadow: "0 4px 16px rgba(25,175,175,0.4)" }
              }
            >
              Donate
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="md:hidden p-2 rounded-xl transition-colors duration-200"
              style={{ color: isScrolled ? "#0e507b" : "white" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full mt-1 left-3 right-3 rounded-[1.75rem] p-6 md:hidden shadow-2xl overflow-hidden border border-white/60"
            style={{
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
            }}
          >
            {/* Teal glow */}
            <div
              className="absolute -top-10 right-1/3 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(25,175,175,0.10), transparent 70%)",
              }}
            />

            <div className="relative grid gap-1.5">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.22 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-[15px] font-semibold transition-all duration-200 ${
                      isActive(item.href)
                        ? "text-brand-teal bg-teal-50 border border-teal-100"
                        : "text-brand-navy hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive(item.href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                    )}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-3 mt-1 border-t border-slate-100">
                <Link
                  href="/donate"
                  className="btn-primary w-full justify-center text-sm !py-3.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
