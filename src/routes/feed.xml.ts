import { pressReleases } from "../data/pressReleases";

const BASE_URL = "https://friendmusicrecords.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const releases = [...pressReleases].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = releases
    .map(
      (pr) => `  <item>
    <title>${escapeXml(pr.title)}</title>
    <link>${BASE_URL}/press/${pr.slug}</link>
    <guid isPermaLink="true">${BASE_URL}/press/${pr.slug}</guid>
    <pubDate>${new Date(pr.date).toUTCString()}</pubDate>
    <description>${escapeXml(pr.excerpt)}</description>
  </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>friend music records</title>
    <link>${BASE_URL}/press</link>
    <description>Latest news and press releases from friend music records. Artist signings, new releases, and label announcements.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=7200",
    },
  });
}
