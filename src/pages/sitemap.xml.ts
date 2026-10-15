import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL(import.meta.env.SITE_URL ?? 'http://konsultan-slf.lan')).toString().replace(/\/$/, '');
  const [articles, services] = await Promise.all([
    getCollection('articles'),
    getCollection('services'),
  ]);
  const urls = [
    { loc: `${base}/`, lastmod: undefined },
    { loc: `${base}/articles/`, lastmod: undefined },
    { loc: `${base}/services/`, lastmod: undefined },
    { loc: `${base}/kontak/`, lastmod: undefined },
    ...articles.filter((item) => !item.data.draft).map((item) => ({
      loc: `${base}/articles/${item.data.slug}/`,
      lastmod: item.data.updatedDate ?? item.data.pubDate,
    })),
    ...services.filter((item) => !item.data.draft).map((item) => ({
      loc: `${base}/services/${item.data.slug}/`,
      lastmod: item.data.updatedDate ?? item.data.pubDate,
    })),
  ];
  const body = urls.map(({ loc, lastmod }) =>
    `  <url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}</url>`
  ).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
