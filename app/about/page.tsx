import type { Metadata } from "next";
import { AboutPageContent } from "@/components/PageContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Про нас",
  description: "Seven Restopub про атмосферу, друзів, футбол, сімейні вечори, терасу та живу музику.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <AboutPageContent />
  );
}
