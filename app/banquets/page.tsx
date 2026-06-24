import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { LocationPicker } from "@/components/LocationPicker";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Банкети",
  description: "Банкети від 10 гостей у Seven Restopub: депозит, сервісний збір і cork fee.",
  openGraph: {
    title: "Банкети Seven Restopub",
    description: "Обговоріть банкет у Seven Restopub.",
    type: "website",
    images: [{ url: "/images/gallery/gallery-01.jpg" }],
  },
};

export default function BanquetsPage() {
  const rules = siteConfig.banquetRules;

  return (
    <>
      <section className="bg-seven-background pb-20 pt-36">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionTitle eyebrow="Banquets" title={rules.title} description="Seven підходить для днів народження, корпоративів, командних зустрічей і великих вечорів з друзями." />
          <div className="rounded-[8px] bg-seven-card p-7 premium-border premium-lift hover:shadow-glow md:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[8px] bg-black/35 p-6 premium-border premium-lift">
                <p className="text-sm uppercase tracking-[0.24em] text-seven-muted">Депозит</p>
                <p className="mt-3 font-display text-4xl font-black text-seven-accent">{rules.deposit}</p>
              </div>
              <div className="rounded-[8px] bg-black/35 p-6 premium-border premium-lift">
                <p className="text-sm uppercase tracking-[0.24em] text-seven-muted">Сервісний збір</p>
                <p className="mt-3 font-display text-4xl font-black text-seven-accent">{rules.serviceFee}</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-seven-accent">Cork fee</p>
              <div className="space-y-3 text-lg text-white">
                {rules.corkFee.map((item) => (
                  <p key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-seven-accent" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <LocationPicker label="Обговорити банкет" className="mt-8 min-h-14 w-full text-base" />
          </div>
        </div>
      </section>
    </>
  );
}
