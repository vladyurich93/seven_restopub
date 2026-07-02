const siteUrl = "https://sevenrestopub.com.ua";

export const dynamic = "force-dynamic";

const pages = [
  { path: "/", changeFrequency: "weekly", priority: "1.0" },
  { path: "/menu", changeFrequency: "monthly", priority: "0.8" },
  { path: "/locations", changeFrequency: "monthly", priority: "0.8" },
  { path: "/events", changeFrequency: "monthly", priority: "0.8" },
  { path: "/banquets", changeFrequency: "monthly", priority: "0.8" },
  { path: "/about", changeFrequency: "monthly", priority: "0.8" },
  { path: "/contacts", changeFrequency: "monthly", priority: "0.8" },
] as const;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET() {
  const lastModified = new Date().toISOString();
  const urlEntries = pages
    .map(({ path, changeFrequency, priority }) => {
      const url = path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;

      return [
        "  <url>",
        `    <loc>${escapeXml(url)}</loc>`,
        `    <lastmod>${lastModified}</lastmod>`,
        `    <changefreq>${changeFrequency}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
