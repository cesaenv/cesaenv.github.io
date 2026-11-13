// Genera public/cv/celia-saenz-cv-es.pdf y -en.pdf a partir de cv/data.mjs.
// Uso: npm run cv
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { cv, contact } from './data.mjs';

// Inter en pesos fijos: se incrusta como TrueType, que leen bien los visores de PDF y los ATS.
const weights = [400, 500, 600, 700];
const fontFaces = (
  await Promise.all(
    weights.map(async (w) => {
      const data = (await readFile(`node_modules/@fontsource/inter/files/inter-latin-${w}-normal.woff2`)).toString('base64');
      return `@font-face { font-family: 'Inter'; src: url(data:font/woff2;base64,${data}) format('woff2'); font-weight: ${w}; }`;
    }),
  )
).join('\n');

// Reutiliza los iconos de la web para que CV y web sean iguales.
const iconSource = await readFile('src/components/Icon.astro', 'utf8');
const iconPath = (name) => iconSource.match(new RegExp(`${name}:\\s*'([^']+)'`))[1];
const icons = {
  email: `<path fill-rule="evenodd" d="${iconPath('email')}"/>`,
  linkedin: `<path fill-rule="evenodd" d="${iconPath('linkedin')}"/>`,
  github: `<path fill-rule="evenodd" d="${iconPath('github')}"/>`,
  web: '<g fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.7 3.9 5.9 3.9 9.5s-1.3 6.8-3.9 9.5c-2.6-2.7-3.9-5.9-3.9-9.5s1.3-6.8 3.9-9.5Z"/></g>',
};
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;

// Foto de perfil (ya recortada y sin metadatos EXIF).
const photo = (await readFile('cv/foto-perfil.jpg')).toString('base64');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(d) {
  const section = (title, body) => `<section><h2>${esc(title)}</h2>${body}</section>`;

  const experience = d.experience
    .map(
      (e) => `<article class="job">
        <div class="job-head"><h3>${esc(e.title)}${e.company ? ` <span class="company">· ${esc(e.company)}</span>` : ''}</h3><p class="dates">${esc(e.dates)}</p></div>
        <ul>${e.tasks.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      </article>`,
    )
    .join('');

  const education = d.education
    .map((e) => `<div class="item"><h3>${esc(e.title)}</h3><p>${esc(e.place)} · ${esc(e.dates)}</p></div>`)
    .join('');

  const pairs = (rows) =>
    `<dl>${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;

  return `<!doctype html>
<html lang="${d.lang}">
<head>
<meta charset="utf-8">
<title>${esc(d.name)} · ${esc(d.role)} · CV</title>
<meta name="author" content="${esc(d.name)}">
<style>
${fontFaces}
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
:root { --fg: #14213d; --muted: #4f5872; --line: #dcd7c9; --accent: #8a6100; }
html, body { margin: 0; }
body { font-family: Inter, sans-serif; color: var(--fg); font-size: 9.4pt; line-height: 1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 210mm; min-height: 297mm; padding: 15mm 16mm 13mm; }
header { display: flex; align-items: center; gap: 8mm; padding-bottom: 6mm; border-bottom: 1.5pt solid var(--fg); }
h1 { margin: 0; font-size: 30pt; line-height: 1; letter-spacing: -0.035em; font-weight: 700; }
.job-title { margin: 2.2mm 0 0; font-size: 17pt; line-height: 1; letter-spacing: -0.03em; font-weight: 600; color: var(--accent); }
.photo { width: 24mm; height: 32mm; object-fit: cover; border: 0.8pt solid var(--line); flex: none; }
.location { margin: 2.6mm 0 0; color: var(--muted); font-weight: 500; }
.contact { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.8mm; font-size: 8.6pt; }
.contact a { display: flex; align-items: center; gap: 2.2mm; color: var(--fg); text-decoration: none; }
.contact svg { width: 3.6mm; height: 3.6mm; fill: var(--accent); color: var(--accent); flex: none; }
.cols { display: grid; grid-template-columns: 64mm 1fr; gap: 9mm; margin-top: 6mm; }
section { margin-bottom: 5mm; }
h2 { margin: 0 0 2.4mm; color: var(--accent); padding-bottom: 1.4mm; border-bottom: 0.6pt solid var(--line); font-size: 9.4pt; font-weight: 700; letter-spacing: 0.01em; }
h3 { margin: 0; font-size: 9.8pt; font-weight: 600; }
p { margin: 0; }
.profile { font-size: 9.8pt; }
.profile + .profile { margin-top: 2mm; }
.job { margin-bottom: 3.6mm; break-inside: avoid; }
.job-head { display: flex; justify-content: space-between; gap: 4mm; align-items: baseline; }
.company { color: var(--accent); }
.dates { color: var(--muted); white-space: nowrap; font-variant-numeric: tabular-nums; font-size: 8.8pt; }
.job ul { margin: 1.2mm 0 0; padding-left: 4mm; }
.job li { margin-bottom: 0.5mm; }
.job li::marker { color: var(--accent); }
.item { margin-bottom: 2.8mm; }
.item p { color: var(--muted); }
dl { margin: 0; }
dl div { margin-bottom: 1.6mm; }
.langs { list-style: none; margin: 0; padding: 0; display: grid; gap: 1mm; color: var(--muted); }
.langs strong { color: var(--fg); font-weight: 600; }
dt { font-weight: 600; }
dd { margin: 0; color: var(--muted); }
</style>
</head>
<body>
<div class="page">
  <header>
    <img class="photo" src="data:image/jpeg;base64,${photo}" alt="${esc(d.photoAlt)}">
    <div>
      <h1>${esc(d.name)}</h1>
      <p class="job-title">${esc(d.role)}</p>
      <p class="location">${esc(d.location)}</p>
    </div>
  </header>
  <div class="cols">
    <aside>
      <section>
        <h2>${esc(d.contactTitle)}</h2>
        <ul class="contact">
          ${contact.map((c) => `<li><a href="${c.href}">${icon(c.icon)}<span>${esc(c.text)}</span></a></li>`).join('')}
        </ul>
      </section>
      ${section(d.educationTitle, education)}
      ${section(d.skillsTitle, pairs(d.skills))}
      ${section(d.languagesTitle, `<ul class="langs">${d.languages.map(([k, v]) => `<li><strong>${esc(k)}</strong> · ${esc(v)}</li>`).join('')}</ul>`)}
    </aside>
    <main>
      ${section(d.profileTitle, d.profile.map((t) => `<p class="profile">${esc(t)}</p>`).join(''))}
      ${section(d.experienceTitle, experience)}
    </main>
  </div>
</div>
</body>
</html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage();
await mkdir('public/cv', { recursive: true });
await mkdir('cv/preview', { recursive: true });

for (const d of Object.values(cv)) {
  const source = html(d);
  await writeFile(`cv/preview/${d.lang}.html`, source);
  await page.setContent(source, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: `public/cv/${d.file}`, format: 'A4', printBackground: true, tagged: true });
  // Captura para revisar el resultado sin abrir el PDF.
  await page.setViewportSize({ width: 794, height: 1123 });
  await page.screenshot({ path: `cv/preview/${d.lang}.png`, fullPage: true });
  console.log(`public/cv/${d.file}`);
}

await browser.close();
