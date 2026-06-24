import { siteConfig } from "@/data/siteConfig";
import { ImageFrame } from "./ImageFrame";
import { LocationPicker } from "./LocationPicker";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-seven-background">
      <ImageFrame
        src="/images/gallery/gallery-03.jpg"
        alt={siteConfig.slogan}
        priority
        className="absolute inset-0 h-full w-full scale-[1.02] motion-safe:animate-[pulse_16s_ease-in-out_infinite] [&_img]:object-[50%_42%] md:[&_img]:object-[58%_48%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.9)_0%,rgba(17,17,17,0.58)_44%,rgba(17,17,17,0.24)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.46)_0%,rgba(17,17,17,0.12)_35%,rgba(17,17,17,0.86)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_34%,rgba(183,225,77,0.16),transparent_30%),radial-gradient(circle_at_78%_72%,rgba(201,113,74,0.22),transparent_36%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-seven-background to-transparent md:h-40" />
      <div className="container-shell relative z-10 flex min-h-[100svh] items-center pb-12 pt-28 md:items-end md:pb-20 md:pt-36">
        <div className="max-w-5xl pt-8 md:pt-0">
          <p className="mb-5 inline-flex rounded-full bg-seven-green/15 px-4 py-2 text-sm font-black uppercase tracking-[0.28em] text-seven-green premium-border">Modern Ukrainian Restopub</p>
          <h1 className="font-display text-[clamp(3.25rem,13vw,7rem)] font-black leading-[0.86] text-white md:max-w-5xl">
            Місце для зустрічей, смаку та живих емоцій
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-seven-muted">
            Друзі, футбол, український крафт, comfort food, коктейлі, тераса, музика і теплі вечори без зайвого приводу.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Крафт", "Футбол", "Бургери", "Коктейлі", "Кальян", "Тераса"].map((item) => (
              <span key={item} className="rounded-full bg-seven-terracotta/20 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white premium-border">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <LocationPicker className="min-h-14 px-8 text-base" />
          </div>
        </div>
      </div>
    </section>
  );
}
