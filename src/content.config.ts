import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Un archivo .md por proyecto e idioma: src/content/projects/<es|en>/<slug>.md
// El id resultante es "<idioma>/<slug>".
const projects = defineCollection({
  loader: glob({ pattern: '{es,en}/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string(),
        stack: z.array(z.string()).min(1),
        repo: z.url().optional(),
        demo: z.url().optional(),
        image: image().optional(),
        imageAlt: z.string().optional(),
        featured: z.boolean().default(false),
        order: z.number().default(100),
      })
      .refine((p) => !p.image || p.imageAlt, {
        message: 'imageAlt es obligatorio cuando hay imagen',
        path: ['imageAlt'],
      }),
});

export const collections = { projects };
