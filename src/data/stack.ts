import type { Lang } from '../i18n/ui';

export const stackGroups: { label: Record<Lang, string>; items: string[] }[] = [
  { label: { es: 'Lenguajes', en: 'Languages' }, items: ['TypeScript', 'Python', 'Java', 'Go', 'Rust', 'Bash'] },
  { label: { es: 'Testing', en: 'Testing' }, items: ['Playwright', 'Pytest'] },
  {
    label: { es: 'CI/CD y plataforma', en: 'CI/CD and platform' },
    items: ['Woodpecker CI', 'Jenkins', 'Docker', 'Kubernetes', 'k3s', 'FluxCD', 'Helm'],
  },
  { label: { es: 'Datos', en: 'Data' }, items: ['Postgres', 'Kafka', 'Grafana'] },
  { label: { es: 'IA', en: 'AI' }, items: ['Claude', 'MCP'] },
];
