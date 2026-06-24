import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Контакти Seven Restopub: адреси, телефони, Instagram і маршрути.",
  openGraph: {
    title: "Контакти Seven Restopub",
    description: "Адреси, телефони та маршрути до Seven Restopub.",
    type: "website",
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function ContactsPage() {
  return (
    <>
      <section className="bg-seven-background pt-36">
        <div className="container-shell pb-10">
          <SectionTitle eyebrow="Contacts" title="Контакти Seven" description="Адреси, телефони, Instagram і маршрути для кожного закладу." />
        </div>
      </section>
      <ContactSection />
    </>
  );
}
