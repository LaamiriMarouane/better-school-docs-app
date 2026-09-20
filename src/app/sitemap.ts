import { source } from '@/lib/source';
import type { MetadataRoute } from 'next';
import { i18n } from '@/lib/i18n';

const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || 'https://doc.hikmaedu.com'
).replace(/\/+$/, '');

function absoluteUrl(page: { url: string; locale?: string }): string {
  const path = page.url.startsWith('/') ? page.url : `/${page.url}`;
  if (/^\/(en|fr|ar)(\/|$)/.test(path)) {
    return `${SITE_URL}${path}`;
  }
  const locale = page.locale || i18n.defaultLanguage;
  return `${SITE_URL}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = i18n.languages;
  const docPages = source.getPages().map((page) => ({
    url: absoluteUrl(page),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.slugs.length === 0 ? 1 : 0.8,
  }));

  const localeHomes = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}/docs`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  const seen = new Set<string>();
  return [...localeHomes, ...docPages].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
