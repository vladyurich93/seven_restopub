import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { ContactsPageContent } from "@/components/PageContent";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Контакти Seven Restopub: адреси, телефони, Instagram і маршрути.",
  alternates: {
    canonical: "/contacts",
  },
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
      <ContactsPageContent />
      <ContactSection />
    </>
  );
}
