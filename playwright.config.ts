import { defineConfig, devices } from '@playwright/test';

// Puerto propio para no reutilizar por error el servidor de `npm run dev` (4321).
const port = 4329;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'unit', testDir: './tests/unit' },
    { name: 'e2e', testDir: './tests/e2e', use: { ...devices['Desktop Chrome'] } },
    { name: 'e2e-mobile', testDir: './tests/e2e', testMatch: /navigation\.spec\.ts/, use: { ...devices['Pixel 7'] } },
  ],
  // Sirve el build de producción (dist/), no el servidor de desarrollo.
  webServer: {
    command: `npx astro preview --port ${port}`,
    url: `http://localhost:${port}/es/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
