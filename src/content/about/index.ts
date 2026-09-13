import type { Locale } from '../../lib/i18n';
import { aboutEn } from './en';
import { aboutRu } from './ru';
import { aboutTh } from './th';
import { aboutHe } from './he';

const byLocale: Record<Locale, typeof aboutEn | null> = { en: aboutEn, ru: aboutRu as typeof aboutEn | null, th: aboutTh as typeof aboutEn | null, he: aboutHe as typeof aboutEn | null };

export function isAboutTranslated(locale: Locale): boolean {
  return byLocale[locale] !== null;
}

export function getAboutContent(locale: Locale): typeof aboutEn {
  return byLocale[locale] ?? aboutEn;
}
