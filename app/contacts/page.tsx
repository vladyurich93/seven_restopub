import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { ContactsPageContent } from "@/components/PageContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Контакти",
  description: "Контакти Seven Restopub: адреси, телефони, Instagram і маршрути.",
  path: "/contacts",
});

export default function ContactsPage() {
  return (
    <>
      <ContactsPageContent />
      <ContactSection />
    </>
  );
}
