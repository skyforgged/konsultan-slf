import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';

const siteUrl = process.env.SITE_URL || 'http://konsultan-slf.lan';

export default defineConfig({
  site: siteUrl,
  markdown: {
    rehypePlugins: [rehypeSlug],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
