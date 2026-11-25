import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

// Match the existing public redirect destination; this does not change hosting.
export const shouldIndexSite = process.env.SEVEN_PREVIEW_MODE !== "1" && process.env.VERCEL_ENV !== "preview" && process.env.NODE_ENV !== "development";
export const canonicalSiteUrl = "https://www.sevenrestopub.com.ua";
export const publicPages = [
  { path: "/", name: "Головна" },
  { path: "/menu", name: "Меню" },
  { path: "/locations", name: "Локації" },
  { path: "/events", name: "Події" },
  { path: "/banquets", name: "Банкети" },
  { path: "/about", name: "Про нас" },
  { path: "/contacts", name: "Контакти" },
] as const;
export type PublicPagePath = (typeof publicPages)[number]["path"];
export const absoluteSiteUrl = (path: string) => new URL(path, canonicalSiteUrl).toString();

type PageMetadataInput = { title: string; description: string; path: PublicPagePath; image?: string };
export const createPageMetadata = ({ title, description, path, image = siteConfig.ogImage }: PageMetadataInput): Metadata => {
  const url = absoluteSiteUrl(path);
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.brandName}`, description, url,
      siteName: siteConfig.brandName, type: "website", locale: "uk_UA",
      images: [{ url: absoluteSiteUrl(image), width: 1200, height: 630, alt: `${title} | ${siteConfig.brandName}` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.brandName}`, description, images: [absoluteSiteUrl(image)] },
    robots: { index: shouldIndexSite, follow: shouldIndexSite },
  };
};
