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
        // Proporción de la imagen de la tarjeta (16:10 por defecto).
        aspect: z.enum(['16:10', '1:1']).default('16:10'),
        // Lado de la imagen en escritorio.
        mediaSide: z.enum(['left', 'right']).default('left'),
        // Varias imágenes que se muestran en la tarjeta como carrusel automático.
        // Cada diapositiva es una imagen o una demo en vivo (iframe).
        gallery: z
          .array(
            z
              .object({ image: image().optional(), demo: z.url().optional(), alt: z.string() })
              .refine((s) => s.image || s.demo, { message: 'cada diapositiva necesita image o demo' }),
          )
          .optional(),
        featured: z.boolean().default(false),
        order: z.number().default(100),
      })
      .refine((p) => !p.image || p.imageAlt, {
        message: 'imageAlt es obligatorio cuando hay imagen',
        path: ['imageAlt'],
      }),
});

export const collections = { projects };
