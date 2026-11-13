import { cv } from '../../cv/data.mjs';

export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

// Rutas de cada página en cada idioma. El selector de idioma usa este mapa
// para llevar a la página equivalente.
export const routes = {
  home: { es: '/es/', en: '/en/' },
  projects: { es: '/es/proyectos/', en: '/en/projects/' },
  about: { es: '/es/trayectoria/', en: '/en/background/' },
  contact: { es: '/es/contacto/', en: '/en/contact/' },
} as const;
export type RouteKey = keyof typeof routes;

export function projectPath(lang: Lang, slug: string) {
  return `${routes.projects[lang]}${slug}/`;
}

export const site = {
  name: 'Celia Sáenz Villalta',
  github: 'https://github.com/cesaenv',
  linkedin: 'https://www.linkedin.com/in/celia-s%C3%A1enz-villalta-446840325/',
  email: 'saenzvillaltacelia@gmail.com',
  cv: { es: '/cv/celia-saenz-cv-es.pdf', en: '/cv/celia-saenz-cv-en.pdf' },
};

export const ui = {
  es: {
    'meta.homeTitle': 'Celia Sáenz Villalta · QA Engineer',
    'meta.homeDescription':
      'QA Engineer en Logroño. Automatizo pruebas y monto el flujo de CI alrededor. Proyectos, formación y contacto.',
    'meta.projectsTitle': 'Proyectos',
    'meta.projectsDescription': 'Proyectos publicados de Celia Sáenz Villalta.',
    'meta.aboutTitle': 'Trayectoria',
    'meta.aboutDescription': 'Formación, experiencia y stack de Celia Sáenz Villalta, QA Engineer.',
    'meta.contactTitle': 'Contacto',
    'meta.contactDescription': 'Cómo contactar con Celia Sáenz Villalta: LinkedIn, email y GitHub.',
    'skip': 'Saltar al contenido',
    'nav.label': 'Principal',
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.about': 'Trayectoria',
    'nav.contact': 'Contacto',
    'lang.label': 'Idioma',
    'lang.switch': 'Read in English',
    'theme.toggle': 'Cambiar entre tema claro y oscuro',
    'role': 'QA Engineer',
    'location': 'Logroño, España',
    'now.title': 'Ahora mismo',
    'now.text':
      'Montando mi homelab e intentando no romper mi primer mini PC con modelos de IA locales :)',
    'links.label': 'Enlaces',
    'home.featured': 'Proyectos destacados',
    'home.allProjects': 'Ver todos los proyectos',
    'projects.title': 'Proyectos',
    'projects.intro': 'Cosas que he construido y están publicadas.',
    'projects.repo': 'Repositorio',
    'projects.demo': 'Web en vivo',
    'projects.details': 'Detalles',
    'projects.stack': 'Stack',
    'projects.back': 'Volver a proyectos',
    'about.title': 'Trayectoria',
    'about.education': 'Formación',
    'about.experience': 'Experiencia',
    'about.stack': 'Competencias técnicas',
    'about.full': 'Ver trayectoria completa',
    'cv.download': 'Descargar CV (PDF)',
    'contact.title': 'Contacto',
    'contact.intro': 'Si tienes un proyecto, una duda o simplemente quieres charlar de testing, ¡me encantará saber de ti! Escríbeme por LinkedIn o por email:',
    'opens.external': '(se abre en otra web)',
  },
  en: {
    'meta.homeTitle': 'Celia Sáenz Villalta · QA Engineer',
    'meta.homeDescription':
      'QA Engineer based in Logroño, Spain. I automate tests and build the CI flow around them. Projects, background and contact.',
    'meta.projectsTitle': 'Projects',
    'meta.projectsDescription': 'Published projects by Celia Sáenz Villalta.',
    'meta.aboutTitle': 'Background',
    'meta.aboutDescription': 'Education, experience and stack of Celia Sáenz Villalta, QA Engineer.',
    'meta.contactTitle': 'Contact',
    'meta.contactDescription': 'How to reach Celia Sáenz Villalta: LinkedIn, email and GitHub.',
    'skip': 'Skip to content',
    'nav.label': 'Main',
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.about': 'Background',
    'nav.contact': 'Contact',
    'lang.label': 'Language',
    'lang.switch': 'Leer en español',
    'theme.toggle': 'Switch between light and dark theme',
    'role': 'QA Engineer',
    'location': 'Logroño, Spain',
    'now.title': 'Currently',
    'now.text':
      'Setting up my homelab and trying not to break my first mini PC with local AI models :)',
    'links.label': 'Links',
    'home.featured': 'Featured projects',
    'home.allProjects': 'See all projects',
    'projects.title': 'Projects',
    'projects.intro': "Things I've built that are out in the open.",
    'projects.repo': 'Repository',
    'projects.demo': 'Live site',
    'projects.details': 'Details',
    'projects.stack': 'Stack',
    'projects.back': 'Back to projects',
    'about.title': 'Background',
    'about.education': 'Education',
    'about.experience': 'Experience',
    'about.stack': 'Technical skills',
    'about.full': 'See full background',
    'cv.download': 'Download CV (PDF)',
    'contact.title': 'Contact',
    'contact.intro': "If you have a project, a question, or just want to chat about testing, I'd love to hear from you! Message me on LinkedIn or by email:",
    'opens.external': '(opens another site)',
  },
} as const;

export type UiKey = keyof (typeof ui)['es'];

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key];
}

// Formación y experiencia salen del CV (cv/data.mjs) para que web y PDF digan lo mismo.
// La web no muestra el nombre de la empresa.
type CvEntry = { title: string; place?: string; dates: string; tasks?: string[] };

// La presentación de la web es el perfil del CV.
export const profile: Record<Lang, string[]> = { es: cv.es.profile, en: cv.en.profile };

export const education: Record<Lang, CvEntry[]> = {
  es: cv.es.education,
  en: cv.en.education,
};

export const experience: Record<Lang, CvEntry[]> = {
  es: cv.es.experience.map(({ title, company, dates, tasks }) => ({ title, place: company, dates, tasks })),
  en: cv.en.experience.map(({ title, company, dates, tasks }) => ({ title, place: company, dates, tasks })),
};
