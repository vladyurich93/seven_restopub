import { siteConfig } from "@/data/siteConfig";
import { ImageFrame } from "./ImageFrame";
import { LocationPicker } from "./LocationPicker";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <ImageFrame
        src={siteConfig.heroImages[0]}
        alt={siteConfig.slogan}
        priority
        className="absolute inset-0 scale-105 motion-safe:animate-[pulse_12s_ease-in-out_infinite]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-seven-background to-transparent" />
      <div className="container-shell relative z-10 flex min-h-screen items-end pb-14 pt-36 md:pb-20">
        <div className="max-w-5xl">
          <p className="mb-5 inline-flex rounded-full bg-seven-green/15 px-4 py-2 text-sm font-black uppercase tracking-[0.28em] text-seven-green premium-border">Modern Ukrainian Restopub</p>
          <h1 className="font-display text-5xl font-black leading-[0.9] text-white md:text-7xl lg:text-8xl">
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
