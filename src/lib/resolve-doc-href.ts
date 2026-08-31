import type { InferPageType } from 'fumadocs-core/source';
import type { source } from '@/lib/source';

type DocsPage = InferPageType<typeof source>;

function joinPath(...paths: string[]): string {
  const out: string[] = [];
  for (const part of paths.flatMap((p) => p.split('/').filter(Boolean))) {
    if (part === '..') out.pop();
    else if (part !== '.') out.push(part);
  }
  return out.join('/');
}

function linkBaseDir(pagePath: string): string {
  const normalized = pagePath.replace(/\.mdx$/, '');
  if (normalized.endsWith('/index')) {
    return normalized.slice(0, -'/index'.length);
  }
  const parts = normalized.split('/').filter(Boolean);
  parts.pop();
  return parts.join('/');
}

export function resolveDocHref(
  loader: { resolveHref: (href: string, page: DocsPage) => string; getPage: (slugs?: string[], language?: string) => DocsPage | undefined },
  href: string | undefined,
  page: DocsPage,
): string | undefined {
  if (!href) return href;
  if (!href.startsWith('./') && !href.startsWith('../')) return href;

  const resolved = loader.resolveHref(href, page);
  if (!resolved.startsWith('./') && !resolved.startsWith('../')) {
    return resolved;
  }

  const [value, hash] = href.split('#', 2);
  const joined = joinPath(linkBaseDir(page.path), value);
  const target = loader.getPage(joined.split('/').filter(Boolean), page.locale);
  if (!target) return href;

  return hash ? `${target.url}#${hash}` : target.url;
}
