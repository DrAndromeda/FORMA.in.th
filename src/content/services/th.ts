import type { Service } from '../../lib/types';

/** Thai translations, keyed by service slug. Falls back to English until populated. */
export const servicesThContent: Partial<Record<string, Service['translations']['en']>> = {};
