import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const baseUrl = "https://farmstand.example.com";

export async function GET() {
  // Fetch all active farms for the sitemap
  const farms = await prisma.farm.findMany({
    where: { status: "ACTIVE" },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
    take: 1000,
  });

  // Static pages
  const staticPages = [
    { loc: "/", changefreq: "daily", priority: 1.0 },
    { loc: "/explore", changefreq: "daily", priority: 0.9 },
    { loc: "/categories", changefreq: "weekly", priority: 0.8 },
    { loc: "/register", changefreq: "monthly", priority: 0.5 },
    { loc: "/login", changefreq: "monthly", priority: 0.3 },
  ];

  // Generate farm profile URLs
  const farmPages = farms.map((farm) => ({
    loc: `/farm/${farm.slug}`,
    changefreq: "weekly",
    priority: 0.7,
    lastmod: farm.updatedAt.toISOString().split("T")[0],
  }));

  // Build XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(
  (page) => `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
).join("\n")}
${farmPages.map(
  (page) => `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${page.lastmod}</lastmod>
  </url>`
).join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}