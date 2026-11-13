import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export function slugOf(project: CollectionEntry<'projects'>) {
  return project.id.split('/').slice(1).join('/');
}

export async function getProjects(lang: Lang) {
  const all = await getCollection('projects', (p) => p.id.startsWith(`${lang}/`));
  return all.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}
