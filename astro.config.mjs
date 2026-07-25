import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://landofstoneflowers.com',
  output: "hybrid",

  build: {
    format: 'directory'
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'ja'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  adapter: cloudflare()
});