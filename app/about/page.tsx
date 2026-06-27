import type { Metadata } from "next";
import { ImageFrame } from "@/components/ImageFrame";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Про нас",
  description: "Seven Restopub про атмосферу, друзів, футбол, сімейні вечори, терасу та живу музику.",
  openGraph: {
    title: "Про Seven Restopub",
    description: siteConfig.description,
    type: "website",
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function AboutPage() {
  const about = siteConfig.about;
  const photos = ["/images/gallery/gallery-11.jpg", "/images/gallery/gallery-01.jpg", "/images/gallery/gallery-10.jpg"];

  return (
    <section className="wood-grain bg-seven-background pb-20 pt-32 md:pt-36">
      <div className="container-shell">
        <SectionTitle eyebrow="About" title="Історія Seven" description="Мережа сучасних українських restopub: крафт, їжа, футбол, тераси, музика і теплі зустрічі." />
        <div className="mt-12 grid gap-7">
          {about.notes.map((text, index) => (
            <article key={text} className="grid overflow-hidden rounded-[8px] bg-seven-card premium-border premium-lift hover:shadow-glow min-[1201px]:grid-cols-[0.9fr_1.1fr]">
              <ImageFrame src={photos[index]} alt={text} className="min-h-[320px]" />
              <div className="flex flex-col justify-end p-7 md:p-10">
                <p className="mb-8 font-display text-6xl font-black text-seven-terracotta">0{index + 1}</p>
                <p className="font-display text-4xl font-black leading-tight text-white md:text-5xl">{text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[8px] bg-black p-7 premium-border md:p-10">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-seven-terracotta">Атмосфера Seven</p>
          <div className="grid gap-3 sm:grid-cols-2 min-[1201px]:grid-cols-3">
            {about.expandedWith.map((item) => (
              <div key={item} className="rounded-full bg-seven-green/12 px-5 py-3 text-lg font-semibold text-seven-green premium-border">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
