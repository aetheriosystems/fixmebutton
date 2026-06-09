import { getAllGuides } from "@/lib/guides";
import { SITE_URL } from "@/lib/constants";

export async function GET() {
  const guides = getAllGuides();
  const baseUrl = SITE_URL;

  const urls = [
    { loc: baseUrl, priority: "1.0", changefreq: "weekly" },
    { loc: `${baseUrl}/guides`, priority: "0.9", changefreq: "weekly" },
    { loc: `${baseUrl}/pricing`, priority: "0.7", changefreq: "monthly" },
  ];

  for (const guide of guides) {
    urls.push({
      loc: `${baseUrl}/guides/${guide.category}/${guide.slug}`,
      priority: "0.8",
      changefreq: "monthly",
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
