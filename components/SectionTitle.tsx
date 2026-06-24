import type { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-seven-accent">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-[clamp(2.55rem,8.5vw,4.65rem)] font-black leading-[0.92] text-white md:leading-[0.9]">{title}</h2>
      {description ? <p className="mt-5 text-lg leading-8 text-seven-muted">{description}</p> : null}
    </div>
  );
}
