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
    <article className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <PageHeader title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />
        {visualSrc ? (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[var(--shadow-sm)]">
            <Image
              src={visualSrc}
              alt={visualAlt}
              width={1200}
              height={900}
              className="h-full min-h-[220px] w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 35vw"
              quality={70}
            />
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-8 shadow-[var(--shadow-sm)]">
            <h2 className="text-xl">Structured Information</h2>
            <p className="mt-2 text-slate-700">
              This page presents information in a clear and accessible format.
            </p>
          </div>
        )}
      </div>
      {children}
    </article>
  );
}
