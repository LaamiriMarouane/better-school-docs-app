'use client';

import type { ClientManifestResponseDTO } from '@/lib/clientManifest.types';
import {
  getPrivacyUrl,
  getTermsUrl,
  resolveManifestLocale,
} from '@/lib/clientManifestLinks';

type DocsFooterStripProps = {
  manifest: ClientManifestResponseDTO | null;
  lang: string;
};

const labels: Record<
  string,
  { terms: string; privacy: string; support: string; privacyEmail: string }
> = {
  en: {
    terms: 'Terms',
    privacy: 'Privacy',
    support: 'Support',
    privacyEmail: 'Privacy contact',
  },
  fr: {
    terms: 'Conditions',
    privacy: 'Confidentialité',
    support: 'Assistance',
    privacyEmail: 'Contact confidentialité',
  },
  ar: {
    terms: 'الشروط',
    privacy: 'الخصوصية',
    support: 'الدعم',
    privacyEmail: 'تواصل الخصوصية',
  },
};

export function DocsFooterStrip({ manifest, lang }: DocsFooterStripProps) {
  const locale = resolveManifestLocale(lang, manifest);
  const termsUrl = getTermsUrl(manifest, locale);
  const privacyUrl = getPrivacyUrl(manifest, locale);
  const support = manifest?.contact?.supportEmail?.trim();
  const privacyMail = manifest?.contact?.privacyEmail?.trim();
  const L = labels[lang] ?? labels.en;

  if (!termsUrl && !privacyUrl && !support && !privacyMail) return null;

  const linkClass =
    'text-fd-muted-foreground hover:text-fd-foreground text-xs underline-offset-4 hover:underline';

  return (
    <footer className="border-t border-fd-border px-4 py-6 mt-auto">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {termsUrl ? (
          <a href={termsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {L.terms}
          </a>
        ) : null}
        {privacyUrl ? (
          <a href={privacyUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {L.privacy}
          </a>
        ) : null}
        {support ? (
          <a href={`mailto:${support}`} className={linkClass}>
            {L.support}
          </a>
        ) : null}
        {privacyMail ? (
          <a href={`mailto:${privacyMail}`} className={linkClass}>
            {L.privacyEmail}
          </a>
        ) : null}
      </div>
    </footer>
  );
}
