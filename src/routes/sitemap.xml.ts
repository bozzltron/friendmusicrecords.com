import { APIEvent } from "@solidjs/start/server";
import { artists } from "../data/artists";
import { pressReleases } from "../data/pressReleases";

export async function GET({ request }: APIEvent) {
  const baseUrl = "https://friendmusicrecords.com";
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/artists", priority: "0.9", changefreq: "weekly" },
    { url: "/press", priority: "0.8", changefreq: "weekly" },
    { url: "/about", priority: "0.7", changefreq: "monthly" },
    { url: "/contact", priority: "0.6", changefreq: "monthly" },
  ];

  // Dynamic artist pages
  const artistPages = artists.map((artist) => ({
    url: `/artists/${artist.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: artist.dateJoined || currentDate,
  }));

  // Dynamic press release pages
  const pressPages = pressReleases.map((pr) => ({
    url: `/press/${pr.slug}`,
    priority: "0.7",
    changefreq: "never",
    lastmod: pr.date,
  }));

  const allPages = [...staticPages, ...artistPages, ...pressPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : `<lastmod>${currentDate}</lastmod>`}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=7200",
      "X-Robots-Tag": "noindex", // Prevent indexing the sitemap itself
    },
  });
}

