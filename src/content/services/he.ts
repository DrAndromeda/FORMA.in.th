import type { Service } from '../../lib/types';

/** Hebrew translations, keyed by service slug. Falls back to English until populated. */
export const servicesHeContent: Partial<Record<string, Service['translations']['en']>> = {};
