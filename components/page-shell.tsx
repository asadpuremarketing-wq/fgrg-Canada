import type { ReactNode } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";

type PageShellProps = {
  title: string;
  subtitle: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  children: ReactNode;
  visualSrc?: string;
  visualAlt?: string;
};

export function PageShell({
  title,
  subtitle,
  breadcrumbs,
  children,
  visualSrc,
  visualAlt = "",
}: PageShellProps) {
  return (
    <article className="space-y-8 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <PageHeader title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />

        {visualSrc ? (
          <div
            className="overflow-hidden rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.10)] border relative min-h-[220px]"
            style={{ borderColor: "rgba(14,80,123,0.10)" }}
          >
            <Image
              src={visualSrc}
              alt={visualAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 35vw"
              quality={80}
              priority
            />
            {/* Subtle overlay for visual polish */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(180deg, transparent 50%, rgba(6,40,64,0.25) 100%)" }}
            />
          </div>
        ) : (
          <div
            className="rounded-3xl border border-slate-200/80 p-8 flex flex-col justify-center"
            style={{ background: "linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0fdf9 100%)" }}
          >
            <div
              className="w-10 h-10 rounded-2xl mb-4 flex items-center justify-center"
              style={{ background: "rgba(25,175,175,0.1)", color: "#19AFAF" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h2 className="text-lg text-brand-navy font-bold mb-2">Structured Information</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              This page presents information in a clear and accessible format.
            </p>
          </div>
        )}
      </div>

      {children}
    </article>
  );
}
