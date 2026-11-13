import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { allPages } from '../pages';

for (const theme of ['dark', 'light'] as const) {
  test.describe(`accesibilidad (tema ${theme})`, () => {
    for (const path of allPages) {
      test(path, async ({ page }) => {
        await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
        await page.goto(path);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
          .analyze();
        const summary = results.violations.map(
          (v) => `${v.impact} ${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(' ')).join(', ')})`,
        );
        expect(summary, summary.join('\n')).toEqual([]);
      });
    }
  });
}
