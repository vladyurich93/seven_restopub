import { siteConfig } from "@/data/siteConfig";
import { BookingButton } from "./BookingModal";
import { LocationPickerButton } from "./LocationPicker";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-seven-background md:min-h-[760px] min-[1201px]:min-h-[100svh]">
      <img
        src="/images/gallery/gallery-20.jpg"
        alt={siteConfig.slogan}
        sizes="100vw"
        loading="eager"
        className="absolute inset-0 block h-full w-full object-cover object-[52%_46%] opacity-95 md:object-[58%_45%] min-[1201px]:object-[72%_45%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.82)_0%,rgba(15,15,15,0.54)_44%,rgba(15,15,15,0.12)_100%)] min-[1201px]:bg-[linear-gradient(90deg,rgba(15,15,15,0.86)_0%,rgba(15,15,15,0.58)_32%,rgba(15,15,15,0.16)_58%,rgba(15,15,15,0.02)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,15,15,0.46)_0%,rgba(15,15,15,0.04)_34%,rgba(15,15,15,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(183,225,77,0.075),transparent_30%),radial-gradient(circle_at_78%_74%,rgba(201,113,74,0.11),transparent_38%)]" />
      <div className="cinematic-vignette absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-seven-background via-seven-background/70 to-transparent md:h-44" />
      <div className="container-shell relative z-10 grid min-h-[100svh] items-center gap-8 pb-14 pt-24 md:min-h-[760px] md:items-end md:pb-16 md:pt-28 min-[1201px]:min-h-[100svh] min-[1201px]:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.72fr)] min-[1201px]:items-center min-[1201px]:gap-10 min-[1201px]:pb-14 min-[1201px]:pt-28 xl:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.76fr)] xl:gap-14 [@media_(min-width:1024px)_and_(max-height:780px)]:gap-7 [@media_(min-width:1024px)_and_(max-height:780px)]:pb-8 [@media_(min-width:1024px)_and_(max-height:780px)]:pt-24">
        <div className="min-w-0 max-w-4xl">
          <p className="mb-5 inline-flex rounded-full bg-black/28 px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-seven-green premium-border md:text-sm [@media_(min-width:1024px)_and_(max-height:780px)]:mb-3 [@media_(min-width:1024px)_and_(max-height:780px)]:py-1.5 [@media_(min-width:1024px)_and_(max-height:780px)]:text-xs">Modern Ukrainian Restopub</p>
          <h1 className="luxury-hero-title max-w-4xl font-display text-[clamp(3.1rem,12vw,6.5rem)] font-black leading-[0.88] text-white md:text-[clamp(3.35rem,7.2vw,4.8rem)] min-[1201px]:max-w-5xl min-[1201px]:text-[clamp(4.55rem,6.5vw,6.65rem)] [@media_(min-width:1024px)_and_(max-height:780px)]:text-[clamp(3.85rem,5.35vw,5.55rem)]">
            Місце для зустрічей, смаку та живих емоцій
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-seven-cream/78 md:text-xl [@media_(min-width:1024px)_and_(max-height:780px)]:mt-4 [@media_(min-width:1024px)_and_(max-height:780px)]:max-w-xl [@media_(min-width:1024px)_and_(max-height:780px)]:text-base [@media_(min-width:1024px)_and_(max-height:780px)]:leading-7">
            Друзі, футбол, український крафт, comfort food, коктейлі, тераса, музика і теплі вечори без зайвого приводу.
          </p>
          <div className="mt-7 flex flex-wrap gap-2 [@media_(min-width:1024px)_and_(max-height:780px)]:mt-5">
            {["Крафт", "Футбол", "Бургери", "Коктейлі", "Кальян", "Тераса"].map((item) => (
              <span key={item} className="rounded-full bg-black/28 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white premium-border [@media_(min-width:1024px)_and_(max-height:780px)]:px-3 [@media_(min-width:1024px)_and_(max-height:780px)]:py-1.5">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row [@media_(min-width:1024px)_and_(max-height:780px)]:mt-6">
            <BookingButton className="min-h-14 px-8 text-base [@media_(min-width:1024px)_and_(max-height:780px)]:min-h-12 [@media_(min-width:1024px)_and_(max-height:780px)]:px-7 [@media_(min-width:1024px)_and_(max-height:780px)]:text-sm" />
            <LocationPickerButton className="min-h-14 bg-black/30 px-8 text-base premium-border hover:bg-seven-green hover:text-seven-background [@media_(min-width:1024px)_and_(max-height:780px)]:min-h-12 [@media_(min-width:1024px)_and_(max-height:780px)]:px-7 [@media_(min-width:1024px)_and_(max-height:780px)]:text-sm" />
          </div>
        </div>
        <div className="group relative hidden min-h-[460px] overflow-hidden rounded-[8px] premium-border shadow-[0_28px_80px_rgba(0,0,0,0.38)] min-[1201px]:block xl:min-h-[580px] [@media_(min-width:1201px)_and_(max-height:780px)]:min-h-[430px] [@media_(min-width:1201px)_and_(max-height:680px)]:min-h-[360px]">
          <img
            src="/images/hero/hero-02.jpg"
            alt="Гості на терасі Seven Restopub"
            sizes="38vw"
            loading="eager"
            className="absolute inset-0 block h-full w-full object-cover object-[52%_38%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0),rgba(17,17,17,0.04)_64%,rgba(17,17,17,0.16))]" />
        </div>
      </div>
    </section>
  );
}
