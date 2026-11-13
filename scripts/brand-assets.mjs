// Genera public/og.png, public/apple-touch-icon.png y public/favicon.ico.
// Uso: node scripts/brand-assets.mjs  (solo hace falta repetirlo si cambia el diseño)
import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const svg = await readFile('public/favicon.svg', 'utf8');
const inter = await readFile('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const fontFace = (name, data) =>
  `@font-face{font-family:'${name}';src:url(data:font/woff2;base64,${data.toString('base64')}) format('woff2');font-weight:100 900}`;
const font = fontFace('Inter', inter);

const og = `<!doctype html><html><head><style>${font}
  html,body{margin:0}
  body{width:1200px;height:630px;background:#0f1a2e;color:#f3eee2;font-family:Inter,sans-serif;display:flex;flex-direction:column;justify-content:center;padding:0 96px;box-sizing:border-box}
  .mark{width:72px;height:72px;margin-bottom:48px}
  h1{font-size:96px;font-weight:750;letter-spacing:-0.045em;line-height:.95;margin:0}
  p{font-size:54px;font-weight:600;letter-spacing:-0.035em;color:#e3b341;margin:16px 0 0}
  .rule{position:absolute;left:96px;right:96px;bottom:72px;height:2px;background:#f3eee2}
</style></head><body>
  <div class="mark">${svg}</div>
  <h1>Celia Sáenz Villalta</h1>
  <p>QA Engineer</p>
  <div class="rule"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ colorScheme: 'light' });

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(og);
await page.screenshot({ path: 'public/og.png' });

async function icon(size) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<!doctype html><style>html,body{margin:0;background:transparent}svg{width:${size}px;height:${size}px;display:block}</style>${svg}`,
  );
  return page.screenshot({ omitBackground: true });
}

await writeFile('public/apple-touch-icon.png', await icon(180));

// favicon.ico con un único PNG de 32x32 dentro.
const png = await icon(32);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([header, png]));

await browser.close();
console.log('og.png, apple-touch-icon.png y favicon.ico generados en public/');
