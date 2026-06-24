type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-seven-accent">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-4xl font-black leading-[0.95] text-white md:text-6xl">{title}</h2>
      {description ? <p className="mt-5 text-lg leading-8 text-seven-muted">{description}</p> : null}
    </div>
  );
}
