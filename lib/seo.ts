import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

type PageMetadataInput = {
  title: string;
  description: string;
  path: "/" | `/${string}`;
  image?: string;
};

export const createPageMetadata = ({ title, description, path, image = siteConfig.ogImage }: PageMetadataInput): Metadata => {
  const url = new URL(path, siteConfig.siteUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        "uk-UA": path,
        "x-default": path,
      },
    },
    openGraph: {
      title: `${title} | ${siteConfig.brandName}`,
      description,
      url,
      siteName: siteConfig.brandName,
      type: "website",
      locale: "uk_UA",
      images: [{ url: image, width: 1200, height: 630, alt: `${title} | ${siteConfig.brandName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.brandName}`,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};
