import type { Metadata } from "next";
import { EventCard } from "@/components/EventCard";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Події",
  description: "Спортивні трансляції, жива музика, стендап, імпровізація та DJ-вечори в Seven Restopub.",
  openGraph: {
    title: "Події Seven Restopub",
    description: "Актуальні події Seven Restopub.",
    type: "website",
    images: [{ url: siteConfig.events[0].image }],
  },
};

export default function EventsPage() {
  return (
    <section className="bg-seven-background pb-24 pt-32 md:pb-28 md:pt-40">
      <div className="container-shell">
        <SectionTitle eyebrow="Events" title="Вечори Seven" description="Футбол, музика, DJ, стендап і спеціальні події — кожен формат має свою енергію." />
        <div className="mt-12 grid items-stretch gap-7 md:grid-cols-2">
          {siteConfig.events.map((event, index) => (
            <div key={event.id} className={index === 0 ? "h-full md:col-span-2" : "h-full"}>
              <EventCard event={event} featured={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
