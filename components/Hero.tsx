import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { LocationPicker } from "./LocationPicker";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-seven-background">
      <Image
        src="/images/gallery/gallery-15.jpg"
        alt={siteConfig.slogan}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[52%_38%] md:object-[54%_44%] lg:object-[70%_48%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.72)_0%,rgba(17,17,17,0.42)_48%,rgba(17,17,17,0.08)_100%)] lg:bg-[linear-gradient(90deg,rgba(17,17,17,0.78)_0%,rgba(17,17,17,0.48)_34%,rgba(17,17,17,0.08)_58%,rgba(17,17,17,0)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0)_0%,rgba(17,17,17,0.03)_34%,rgba(17,17,17,0.64)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(183,225,77,0.08),transparent_28%),radial-gradient(circle_at_78%_72%,rgba(201,113,74,0.1),transparent_36%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-seven-background to-transparent md:h-36" />
      <div className="container-shell relative z-10 grid min-h-[100svh] items-center gap-10 pb-12 pt-24 md:pb-16 md:pt-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(390px,0.82fr)] lg:pt-32 xl:grid-cols-[minmax(0,0.88fr)_minmax(460px,0.82fr)]">
        <div className="min-w-0 max-w-5xl">
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
        <div className="group relative hidden min-h-[600px] overflow-hidden rounded-[8px] premium-border shadow-[0_28px_80px_rgba(0,0,0,0.38)] lg:block xl:min-h-[640px]">
          <Image
            src="/images/hero/hero-02.jpg"
            alt="Гості на терасі Seven Restopub"
            fill
            sizes="38vw"
            priority
            className="object-cover object-[52%_38%] transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0),rgba(17,17,17,0.04)_64%,rgba(17,17,17,0.16))]" />
        </div>
      </div>
    </section>
  );
}
