import { expect, test } from '@playwright/test';
import { allPages, pagePairs } from '../pages';

test('la raíz redirige a /es/', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/es\/$/);
});

for (const path of allPages) {
  test(`${path} responde 200 con idioma, título y descripción`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    const lang = path.startsWith('/en/') ? 'en' : 'es';
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page).toHaveTitle(/Celia Sáenz Villalta|neighborhood-web/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{30,}/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og\.png$/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`${path}$`));
    await expect(page.locator('h1')).toHaveCount(1);
  });
}

test('hreflang apunta a la página equivalente', async ({ page }) => {
  for (const pair of pagePairs) {
    await page.goto(pair.es);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', new RegExp(`${pair.en}$`));
    await expect(page.locator('link[hreflang="es"]')).toHaveAttribute('href', new RegExp(`${pair.es}$`));
  }
});

test('una ruta inexistente devuelve 404', async ({ request }) => {
  const response = await request.get('/es/no-existe/');
  expect(response.status()).toBe(404);
});
