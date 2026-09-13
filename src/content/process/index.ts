import type { Locale } from '../../lib/i18n';
import { processEn } from './en';
import { processRu } from './ru';
import { processTh } from './th';
import { processHe } from './he';

const byLocale: Record<Locale, typeof processEn | null> = {
  en: processEn,
  ru: processRu as typeof processEn | null,
  th: processTh as typeof processEn | null,
  he: processHe as typeof processEn | null,
};

export function isProcessTranslated(locale: Locale): boolean {
  return byLocale[locale] !== null;
}

export function getProcessContent(locale: Locale): typeof processEn {
  return byLocale[locale] ?? processEn;
}
