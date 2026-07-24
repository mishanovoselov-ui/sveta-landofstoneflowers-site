import type { APIRoute } from 'astro';

// Endpoint (не .astro-страница): не подпадает под build.format: 'directory',
// поэтому отдаётся как /sitemap.xml без редиректа и без HTML-обёртки.
export const prerender = true;

const site = 'https://landofstoneflowers.com';

const pages = [
  { url: '/', changefreq: 'monthly', priority: '1.0' },
  { url: '/ru/', changefreq: 'monthly', priority: '0.9' },
  { url: '/ja/', changefreq: 'monthly', priority: '0.9' },
];

const alternates = [
  ['en', `${site}/`],
  ['ru', `${site}/ru/`],
  ['ja', `${site}/ja/`],
  ['x-default', `${site}/`],
];

export const GET: APIRoute = () => {
  const now = new Date().toISOString().split('T')[0];

  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${site}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates
  .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`)
  .join('\n')}
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
