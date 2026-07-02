const baseUrl = "https://sevenrestopub.com.ua";

export const dynamic = "force-dynamic";

const routes = [
  "/",
  "/menu",
  "/locations",
  "/events",
  "/banquets",
  "/about",
  "/contacts",
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
  const urls = routes
    .map((route) => {
      const isHome = route === "/";
      const url = isHome ? `${baseUrl}/` : `${baseUrl}${route}`;

      return [
        "<url>",
        `<loc>${escapeXml(url)}</loc>`,
        `<lastmod>${lastModified}</lastmod>`,
        `<changefreq>${isHome ? "weekly" : "monthly"}</changefreq>`,
        `<priority>${isHome ? "1" : "0.8"}</priority>`,
        "</url>",
      ].join("");
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
