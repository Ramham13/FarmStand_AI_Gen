export async function GET() {
  const robots = `# Virtual Farm Stand - Robots.txt
# https://farmstand.example.com

User-agent: *
Allow: /

# Sitemaps
Sitemap: https://farmstand.example.com/sitemap.xml

# Disallow admin/private areas
Disallow: /api/
Disallow: /dashboard/
Disallow: /admin/
Disallow: /login/
Disallow: /register/
Disallow: /onboarding/
Disallow: /checkout/
Disallow: /orders/
Disallow: /profile/
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}