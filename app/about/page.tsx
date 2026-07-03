import type { Metadata } from "next";
import { AboutPageContent } from "@/components/PageContent";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Про нас",
  description: "Seven Restopub про атмосферу, друзів, футбол, сімейні вечори, терасу та живу музику.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Про Seven Restopub",
    description: siteConfig.description,
    type: "website",
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function AboutPage() {
  return (
    <AboutPageContent />
  );
}
