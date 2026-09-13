import type { Service } from '../../lib/types';

/** Russian translations, keyed by service slug. Falls back to English until populated. */
export const servicesRuContent: Partial<Record<string, Service['translations']['en']>> = {};
