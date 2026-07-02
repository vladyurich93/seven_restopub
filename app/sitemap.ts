import type { MetadataRoute } from "next";

const siteUrl = "https://sevenrestopub.com.ua";

const routes = [
  "",
  "/locations",
  "/menu",
  "/events",
  "/banquets",
  "/about",
  "/contacts",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
