export const LOCALES = ['en', 'ru', 'th', 'he'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const RTL_LOCALES: readonly Locale[] = ['he'];

export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  th: 'ไทย',
  he: 'עברית',
};

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: 'en',
  ru: 'ru',
  th: 'th',
  he: 'he',
};

/** Prefixes a root-relative path with the locale, except for the default locale (en = "/"). */
export function localizePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean === '/' ? '/' : clean}`;
}

export function dirOf(locale: Locale): 'rtl' | 'ltr' {
  return RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
}

/** Extracts the locale from an Astro.currentLocale-style value, defaulting to en. */
export function asLocale(value: string | undefined | null): Locale {
  return (LOCALES as readonly string[]).includes(value ?? '') ? (value as Locale) : DEFAULT_LOCALE;
}
