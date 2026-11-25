import type { MetadataRoute } from "next";
import { absoluteSiteUrl, publicPages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified until a trustworthy per-page editorial date is available.
  return publicPages.map(({ path }) => ({ url: absoluteSiteUrl(path) }));
}
