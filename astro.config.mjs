// @ts-check
import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { routes } from './src/i18n/ui.ts';

const site = 'https://cesaenv.github.io';
const hreflang = { es: 'es', en: 'en' };

/**
 * Devuelve la ruta equivalente de una página en el otro idioma, o null si no existe.
 * @param {string} path
 */
function counterpart(path) {
  for (const pair of Object.values(routes)) {
    for (const [from, to] of [['es', 'en'], ['en', 'es']]) {
      const prefix = pair[/** @type {'es'|'en'} */ (from)];
      if (path === prefix) return { lang: to, path: pair[/** @type {'es'|'en'} */ (to)] };
      // Páginas de proyecto: /es/proyectos/<slug>/ ↔ /en/projects/<slug>/
      if (pair === routes.projects && path.startsWith(prefix)) {
        const slug = path.slice(prefix.length).replace(/\/$/, '');
        if (!existsSync(`src/content/projects/${to}/${slug}.md`)) return null;
        return { lang: to, path: `${pair[/** @type {'es'|'en'} */ (to)]}${slug}/` };
      }
    }
  }
  return null;
}

export default defineConfig({
  site,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      // La raíz solo redirige a /es/ y la 404 no debe indexarse.
      filter: (page) => page !== `${site}/` && !page.endsWith('/404/'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const lang = path.startsWith('/en/') ? 'en' : 'es';
        const other = counterpart(path);
        if (other) {
          item.links = [
            { lang: hreflang[lang], url: item.url },
            { lang: hreflang[/** @type {'es'|'en'} */ (other.lang)], url: `${site}${other.path}` },
          ];
        }
        return item;
      },
    }),
  ],
});
