import { readdirSync, readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { routes, ui } from '../../src/i18n/ui';
import { stackGroups } from '../../src/data/stack';

const projectsDir = 'src/content/projects';
const slugs = (lang: string) =>
  readdirSync(`${projectsDir}/${lang}`)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .sort();

test('las traducciones de interfaz tienen las mismas claves en ES y EN', () => {
  expect(Object.keys(ui.en).sort()).toEqual(Object.keys(ui.es).sort());
  for (const lang of ['es', 'en'] as const) {
    for (const [key, value] of Object.entries(ui[lang])) {
      expect(value.trim(), `${lang}.${key} vacío`).not.toBe('');
    }
  }
});

test('cada ruta existe en los dos idiomas con su prefijo', () => {
  for (const [key, pair] of Object.entries(routes)) {
    expect(pair.es, key).toMatch(/^\/es\/.*\/$|^\/es\/$/);
    expect(pair.en, key).toMatch(/^\/en\/.*\/$|^\/en\/$/);
  }
});

test('cada proyecto tiene versión en español y en inglés', () => {
  expect(slugs('es').length).toBeGreaterThan(0);
  expect(slugs('en')).toEqual(slugs('es'));
});

test('ningún proyecto marca featured distinto entre idiomas', () => {
  for (const slug of slugs('es')) {
    const featured = (lang: string) =>
      /^featured:\s*true\s*$/m.test(readFileSync(`${projectsDir}/${lang}/${slug}.md`, 'utf8'));
    expect(featured('en'), slug).toBe(featured('es'));
  }
});

test('el stack está agrupado con las categorías acordadas', () => {
  expect(stackGroups.map((g) => g.label.es)).toEqual([
    'Lenguajes',
    'Testing',
    'CI/CD y plataforma',
    'Datos',
    'IA',
  ]);
  expect(stackGroups.flatMap((g) => g.items)).toContain('Playwright');
});
