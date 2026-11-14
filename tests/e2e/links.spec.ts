import { expect, test } from '@playwright/test';

// Rastrea el sitio desde las dos portadas y comprueba que todos los enlaces
// y recursos internos (páginas, imágenes, iconos, CSS) responden 200.
test('no hay enlaces internos rotos', async ({ page, request, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const queue = ['/es/', '/en/', '/404.html'];
  const visited = new Set<string>();
  const assets = new Set<string>();
  const broken: string[] = [];

  while (queue.length) {
    const path = queue.shift()!;
    if (visited.has(path)) continue;
    visited.add(path);

    const response = await page.goto(path);
    if (!response || (response.status() !== 200 && path !== '/404.html')) {
      broken.push(`${path} → ${response?.status()}`);
      continue;
    }

    const urls = await page.evaluate(() => {
      const out: string[] = [];
      document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => out.push('a ' + a.href));
      document.querySelectorAll<HTMLLinkElement>('link[href]').forEach((l) => out.push('r ' + l.href));
      document.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
        out.push('r ' + (img.currentSrc || img.src));
        img.srcset
          ?.split(',')
          .map((s) => s.trim().split(' ')[0])
          .filter(Boolean)
          .forEach((s) => out.push('r ' + new URL(s, location.href).href));
      });
      document.querySelectorAll<HTMLScriptElement>('script[src]').forEach((s) => out.push('r ' + s.src));
      return out;
    });

    for (const entry of urls) {
      const kind = entry.slice(0, 1);
      const url = new URL(entry.slice(2));
      if (url.origin !== origin && !url.href.startsWith('https://cesaenv.github.io/')) continue;
      // /games/ es otro sitio (repositorio de juegos), no forma parte de este build.
      if (url.pathname.startsWith('/games/')) continue;
      // Las URLs absolutas del sitio publicado (canonical, og:image, hreflang) se comprueban en local.
      const local = url.pathname;
      if (kind === 'a' && !/\.[a-z0-9]+$/i.test(local)) {
        if (!visited.has(local)) queue.push(local);
      } else {
        assets.add(local);
      }
    }
  }

  for (const asset of assets) {
    const res = await request.get(asset);
    if (res.status() !== 200) broken.push(`${asset} → ${res.status()}`);
  }

  expect(broken, broken.join('\n')).toEqual([]);
  expect(visited.size).toBeGreaterThanOrEqual(10);
});
