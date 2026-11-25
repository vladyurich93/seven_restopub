import type { MetadataRoute } from "next";
import { absoluteSiteUrl, shouldIndexSite } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return { rules: shouldIndexSite ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" }, sitemap: absoluteSiteUrl("/sitemap.xml") };
}
