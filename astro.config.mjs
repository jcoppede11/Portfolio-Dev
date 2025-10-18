import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://juancoppede.vercel.app',

  integrations: [
    react(),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
    })
  ],
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'es2020'
    }
  },
});