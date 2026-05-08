'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import type { ClientManifestBrandDTO } from '@/lib/clientManifest.types';

type LogoVariant = 'web' | 'mobile';

function pickLogoSrc(
  brand: ClientManifestBrandDTO | null | undefined,
  variant: LogoVariant,
  isDark: boolean,
): string | null {
  if (!brand) return null;
  if (variant === 'mobile') {
    const a = isDark ? brand.logoMobileDarkUrl : brand.logoMobileLightUrl;
    const b = isDark ? brand.logoMobileLightUrl : brand.logoMobileDarkUrl;
    const c = isDark ? brand.logoWebDarkUrl : brand.logoWebLightUrl;
    const d = isDark ? brand.logoWebLightUrl : brand.logoWebDarkUrl;
    const u = a?.trim() || b?.trim() || c?.trim() || d?.trim() || '';
    return u || null;
  }
  const primary = isDark ? brand.logoWebDarkUrl : brand.logoWebLightUrl;
  const secondary = isDark ? brand.logoWebLightUrl : brand.logoWebDarkUrl;
  const m1 = isDark ? brand.logoMobileDarkUrl : brand.logoMobileLightUrl;
  const m2 = isDark ? brand.logoMobileLightUrl : brand.logoMobileDarkUrl;
  const u =
    primary?.trim() ||
    secondary?.trim() ||
    m1?.trim() ||
    m2?.trim() ||
    '';
  return u || null;
}

export type DocsNavBrandProps = {
  displayName: string;
  brand?: ClientManifestBrandDTO | null;
  /** Nav is usually `web`; use `mobile` for compact assets on small breakpoints if needed. */
  variant?: LogoVariant;
  className?: string;
};

export function DocsNavBrand({
  displayName,
  brand,
  variant = 'web',
  className,
}: DocsNavBrandProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const src = useMemo(
    () => pickLogoSrc(brand, variant, isDark),
    [brand, variant, isDark],
  );

  if (!src) {
    return (
      <span
        className={`font-semibold tracking-tight text-fd-foreground ${className ?? ''}`.trim()}
      >
        {displayName}
      </span>
    );
  }

  const maxW = variant === 'mobile' ? 160 : 180;

  return (
    <span className={['inline-flex', className].filter(Boolean).join(' ')}>
      {/* Same as marketing: manifest URLs may be any CDN; unoptimized avoids host allowlist churn. */}
      <Image
        src={src}
        alt={displayName}
        width={maxW * 2}
        height={56}
        sizes={`${maxW}px`}
        className={[
          'h-7 w-auto object-contain',
          variant === 'mobile' ? 'max-w-[160px]' : 'max-w-[180px]',
        ].join(' ')}
        unoptimized
      />
    </span>
  );
}
