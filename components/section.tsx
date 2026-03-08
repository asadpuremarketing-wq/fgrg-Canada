import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  tone?: "white" | "neutral" | "blue";
};

export function Section({
  children,
  className = "",
  as = "section",
  tone = "white",
}: SectionProps) {
  const Tag = as;
  const toneClass =
    tone === "neutral"
      ? "section-tone-neutral"
      : tone === "blue"
        ? "section-tone-blue"
        : "section-tone-white";
  return <Tag className={`section-shell ${toneClass} ${className}`.trim()}>{children}</Tag>;
}
