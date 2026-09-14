// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  base: '/FORMA.in.th',
  site: 'https://drandromeda.github.io',
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'ru', 'th', 'he'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          ru: 'ru',
          th: 'th',
          he: 'he',
        },
      },
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],
});
