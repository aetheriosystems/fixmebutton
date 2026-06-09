import { getAllGuides } from "@/lib/guides";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import * as fs from "fs";
import * as path from "path";

export async function GET() {
  const guides = getAllGuides();

  const items = guides
    .map(
      (g) => `    <item>
      <title>${escapeXml(g.title)}</title>
      <link>${SITE_URL}/guides/${g.category}/${g.slug}</link>
      <description>Step-by-step guide: ${escapeXml(g.title)}</description>
      <category>${escapeXml(g.category)}</category>
      <guid>${SITE_URL}/guides/${g.category}/${g.slug}</guid>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
