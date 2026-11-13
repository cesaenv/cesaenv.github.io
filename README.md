# cesaenv-web

Personal website of Celia Sáenz Villalta. A static site built with [Astro](https://astro.build), available in Spanish (`/es/`) and English (`/en/`).

## Running locally

Requires Node 24 (pinned in `.nvmrc`).

```bash
nvm use
npm install
npx playwright install chromium   # first time only, needed for the tests
npm run dev                        # http://localhost:4321/es/
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with live reload |
| `npm run build` | Type-checks (`astro check`) and generates `dist/` |
| `npm run preview` | Serves `dist/` exactly as it would be published |
| `npm test` | Build + all Playwright tests |
| `npm run test:unit` | Unit tests only (no browser) |
| `npm run test:e2e` | End-to-end and accessibility tests only (needs a previous build) |

## Structure

```
src/
  content/projects/es/*.md   projects in Spanish
  content/projects/en/*.md   projects in English
  assets/projects/           project images
  i18n/ui.ts                 UI texts, per-language routes, education and experience
  data/stack.ts              stack grouped by category
  views/                     content of each page (shared between languages)
  pages/es/, pages/en/       routes; each file only loads its view
public/
  cv/                        CV PDFs go here
tests/
  unit/                      tests without a browser (translations, routes, projects)
  e2e/                       pages, language switcher, links, content, accessibility
```

## Adding a project

Create a file with the same name in each language:

- `src/content/projects/es/my-project.md`
- `src/content/projects/en/my-project.md`

```markdown
---
title: my-project
summary: One or two sentences about what it is.
stack: [TypeScript, Playwright]
repo: https://github.com/cesaenv/my-project        # optional
demo: https://example.com/                         # optional
image: ../../../assets/projects/my-project.jpg     # optional
imageAlt: Description of the image                 # required if there is an image
featured: true                                     # true = shown on the home page
order: 2                                           # order in listings
---

Longer text for the detail page (optional).
```

That's it: the card, the `/en/projects/my-project/` page (and the Spanish one), the sitemap and the language switcher are all generated automatically. If either language is missing, `npm test` fails.

## CV

The CV is generated from `cv/data.mjs` (content in ES and EN) and `cv/build.mjs` (layout):

```bash
npm run cv
```

This creates `public/cv/celia-saenz-cv-es.pdf` and `public/cv/celia-saenz-cv-en.pdf` in A4, plus a preview in `cv/preview/` (ignored by git). The "Download CV" button on the home page and on the Background page only appears if the PDF for that language exists.

The CV is public (it is downloadable from the site): it does not include a phone number, national ID, address or date of birth.

## Changing texts

- Profile (introduction), experience and education: `cv/data.mjs`. Used by both the website and the CV; run `npm run cv` afterwards to regenerate the PDFs.
- "Right now" section and UI texts: `src/i18n/ui.ts`.
- Stack: `src/data/stack.ts`.
- Social image (`public/og.png`) and icons: `npm run brand-assets` regenerates them from `public/favicon.svg`.
