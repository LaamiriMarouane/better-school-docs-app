import type { ClientManifestResponseDTO } from '@/lib/clientManifest.types';

function trimSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

export function buildMarketingAbsoluteUrl(
  marketingBaseUrl: string | null | undefined,
  path: string | null | undefined,
): string | null {
  if (!marketingBaseUrl?.trim() || !path?.trim()) return null;
  const base = trimSlash(marketingBaseUrl.trim());
  const p = path.trim().startsWith('/') ? path.trim() : `/${path.trim()}`;
  return `${base}${p}`;
}

export function resolveManifestLocale(
  preferred: string | undefined | null,
  manifest: ClientManifestResponseDTO | null,
): string {
  const pref = (preferred ?? '').split('-')[0]?.toLowerCase() ?? '';
  const supported = manifest?.supportedLocales ?? [];
  if (pref && supported.includes(pref)) return pref;
  const def = manifest?.defaultLocale?.toLowerCase();
  if (def && supported.includes(def)) return def;
  if (supported.length > 0) return supported[0]!;
  if (pref) return pref;
  return 'en';
}

export function getTermsUrl(
  manifest: ClientManifestResponseDTO | null,
  locale: string,
): string | null {
  const paths = manifest?.legalByLocale?.[locale];
  return buildMarketingAbsoluteUrl(
    manifest?.marketingBaseUrl,
    paths?.termsPath,
  );
}

export function getPrivacyUrl(
  manifest: ClientManifestResponseDTO | null,
  locale: string,
): string | null {
  const paths = manifest?.legalByLocale?.[locale];
  return buildMarketingAbsoluteUrl(
    manifest?.marketingBaseUrl,
    paths?.privacyPath,
  );
}
