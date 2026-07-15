import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://pohrebni-sluzba-janata.netlify.app',
  integrations: [sitemap()],
  build: { format: 'directory' },
  vite: { ssr: { noExternal: ['cheerio'] } }
});
