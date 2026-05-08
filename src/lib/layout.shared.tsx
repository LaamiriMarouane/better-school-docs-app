import type { ReactNode } from 'react';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
/** Fallback nav title when manifest is unavailable (docs layout passes manifest-driven JSX). */
import { appName } from './shared';
import { i18n } from '@/lib/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

export const i18nUI = defineI18nUI(i18n, {
  en: { displayName: 'English' },
  fr: { 
    displayName: 'Français',
    nextPage: 'Page suivante',
    previousPage: 'Page précédente',
    toc: 'Table des matières',
    lastUpdate: 'Dernière mise à jour'
  },
  ar: { 
    displayName: 'العربية', 
    search: 'بحث',
    nextPage: 'الصفحة التالية',
    previousPage: 'الصفحة السابقة',
    toc: 'جدول المحتويات',
    lastUpdate: 'آخر تحديث'
  },
});

export function baseOptions(navTitle: ReactNode = appName): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: navTitle,
    },
  };
}
