import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const paths = ['/', '/about/', '/projects/', '/writing/', ...posts.map((post) => `/blog/${post.id}/`)];
  const urls = paths.map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
