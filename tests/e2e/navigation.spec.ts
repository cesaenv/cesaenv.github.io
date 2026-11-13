import { expect, test } from '@playwright/test';
import { pagePairs } from '../pages';

test.describe('selector de idioma', () => {
  for (const pair of pagePairs) {
    test(`${pair.es} ↔ ${pair.en}`, async ({ page }) => {
      await page.goto(pair.es);
      await page.getByTestId('lang-switch').click();
      await expect(page).toHaveURL(new RegExp(`${pair.en}$`));
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');

      await page.getByTestId('lang-switch').click();
      await expect(page).toHaveURL(new RegExp(`${pair.es}$`));
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    });
  }
});

test('se puede navegar con teclado: el primer Tab lleva a "Saltar al contenido"', async ({ page }) => {
  await page.goto('/es/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Saltar al contenido' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('el tema oscuro es el predeterminado y el botón cambia al claro, que se recuerda', async ({ page }) => {
  await page.goto('/es/');
  const toggle = page.locator('[data-theme-toggle]');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('no hay scroll horizontal', async ({ page }) => {
  for (const path of ['/es/', '/en/background/', '/es/proyectos/neighborhood-web/']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});

test('el texto no toca los bordes de la pantalla', async ({ page }) => {
  for (const path of ['/es/', '/en/projects/', '/es/proyectos/neighborhood-web/', '/en/background/']) {
    await page.goto(path);
    const offenders = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      return [...document.querySelectorAll('main h1, main h2, main h3, main p, main li')]
        .map((el) => ({ el, box: el.getBoundingClientRect() }))
        .filter(({ box }) => box.width > 0 && (box.left < 12 || width - box.right < 12))
        .map(({ el }) => el.textContent?.trim().slice(0, 40));
    });
    expect(offenders, path).toEqual([]);
  }
});
