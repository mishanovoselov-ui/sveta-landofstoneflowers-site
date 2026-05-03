import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://landofstoneflowers.com',
  output: 'static',
  build: {
    format: 'directory'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'ja'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
