import { siteConfig } from "@/data/siteConfig";
import { ImageFrame } from "./ImageFrame";
import { LocationPicker } from "./LocationPicker";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-seven-background">
      <ImageFrame
        src="/images/hero/hero-02.jpg"
        alt={siteConfig.slogan}
        priority
        className="absolute inset-0 h-full w-full scale-[1.01] [&_img]:object-[54%_18%] md:[&_img]:object-[54%_34%] lg:[&_img]:object-[62%_42%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.94)_0%,rgba(17,17,17,0.68)_42%,rgba(17,17,17,0.28)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.22)_0%,rgba(17,17,17,0.12)_28%,rgba(17,17,17,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(183,225,77,0.14),transparent_28%),radial-gradient(circle_at_78%_72%,rgba(201,113,74,0.24),transparent_36%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-seven-background to-transparent md:h-36" />
      <div className="container-shell relative z-10 flex min-h-[100svh] items-center pb-12 pt-24 md:pb-16 md:pt-28 lg:pt-32">
        <div className="max-w-5xl">
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
