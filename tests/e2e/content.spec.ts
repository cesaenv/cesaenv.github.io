import { cv } from '../../cv/data.mjs';
import { expect, test } from '@playwright/test';

test('portada ES: presentación, enlaces y proyecto destacado', async ({ page }) => {
  await page.goto('/es/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Celia\s*Sáenz Villalta, QA Engineer/);
  await expect(page.getByText('Logroño, España').first()).toBeVisible();
  await expect(page.getByTestId('intro').locator('p')).toHaveText(cv.es.profile);
  await expect(page.getByTestId('now')).toContainText('homelab');
  await expect(page.getByTestId('link-github')).toHaveAttribute('href', 'https://github.com/cesaenv');
  await expect(page.getByTestId('link-linkedin')).toHaveAttribute('href', /linkedin\.com\/in\/celia-s/);
  await expect(page.getByTestId('link-email')).toHaveAttribute('href', 'mailto:saenzvillaltacelia@gmail.com');

  const card = page.getByTestId('project-card').filter({ hasText: 'neighborhood-web' });
  await expect(card).toBeVisible();
  await expect(card.getByRole('link', { name: 'Repositorio' })).toHaveAttribute(
    'href',
    'https://github.com/cesaenv/neighborhood-web',
  );
  await expect(card.getByRole('link', { name: 'Web en vivo' })).toHaveAttribute('href', 'https://aldeanuevadecameros.com/');
});

test('portada EN: texto original en inglés', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.getByTestId('intro').locator('p')).toHaveText(cv.en.profile);
  await expect(page.getByTestId('now')).toContainText(
    'Setting up my homelab and trying not to break my first mini PC with local AI models :)',
  );
  await expect(page.getByRole('heading', { name: 'Featured projects' })).toBeVisible();
});

test('sobre mí: formación, experiencia, stack y "Ahora mismo"', async ({ page }) => {
  await page.goto('/es/trayectoria/');
  for (const text of [
    'Máster en Data Science and Machine Learning',
    'Grado en Ingeniería Informática',
    'Trabajo de Fin de Grado',
    'Desarrollo de un frontend para la suite de pruebas',
    'jun. 2025 – actualidad',
    'CI/CD y plataforma',
    'Woodpecker CI',
    'FluxCD',
  ]) {
    await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
  }
  await expect(page.getByTestId('now-section')).toContainText('mini PC');
});

test('contacto: LinkedIn y email visibles, sin formularios', async ({ page }) => {
  await page.goto('/es/contacto/');
  await expect(page.getByRole('link', { name: 'saenzvillaltacelia@gmail.com' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'LinkedIn' }).first()).toBeVisible();
  await expect(page.locator('form')).toHaveCount(0);
});

test('las imágenes tienen texto alternativo', async ({ page }) => {
  for (const path of ['/es/', '/en/projects/', '/es/proyectos/neighborhood-web/']) {
    await page.goto(path);
    for (const img of await page.locator('img').all()) {
      await expect(img, path).toHaveAttribute('alt', /.+/);
    }
  }
});

test('el botón de CV solo aparece si existe el PDF', async ({ page, request }) => {
  for (const [path, pdf] of [
    ['/es/', '/cv/celia-saenz-cv-es.pdf'],
    ['/en/', '/cv/celia-saenz-cv-en.pdf'],
  ]) {
    await page.goto(path);
    const exists = (await request.get(pdf)).status() === 200;
    await expect(page.getByTestId('cv-download')).toHaveCount(exists ? 1 : 0);
    if (exists) await expect(page.getByTestId('cv-download')).toHaveAttribute('href', pdf);
  }
});

test('la web no muestra el nombre de la empresa', async ({ page }) => {
  for (const path of ['/es/', '/en/', '/es/trayectoria/', '/en/background/']) {
    await page.goto(path);
    await expect(page.locator('body'), path).not.toContainText(/arsys|ionos/i);
  }
});
