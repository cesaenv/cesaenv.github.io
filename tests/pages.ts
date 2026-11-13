// Pares de páginas equivalentes ES/EN que deben existir.
export const pagePairs = [
  { es: '/es/', en: '/en/' },
  { es: '/es/proyectos/', en: '/en/projects/' },
  { es: '/es/trayectoria/', en: '/en/background/' },
  { es: '/es/contacto/', en: '/en/contact/' },
  { es: '/es/proyectos/neighborhood-web/', en: '/en/projects/neighborhood-web/' },
];

export const allPages = pagePairs.flatMap((p) => [p.es, p.en]);
