import type { Locale } from '../../lib/i18n';
import { homeEn } from './en';
import { homeRu } from './ru';
import { homeTh } from './th';
import { homeHe } from './he';

type HomeContent = typeof homeEn;

const byLocale: Record<Locale, Partial<HomeContent>> = { en: homeEn, ru: homeRu, th: homeTh, he: homeHe };

export function getHomeContent(locale: Locale): HomeContent {
  const override = byLocale[locale];
  return {
    whyUsItems: override.whyUsItems ?? homeEn.whyUsItems,
    processSteps: override.processSteps ?? homeEn.processSteps,
  };
}
