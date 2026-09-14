export const SITE_URL = 'https://forma.in.th';
export const SITE_NAME = 'FORMA';
export const SITE_LEGAL_NAME = 'FORMA Design & Build Studio';

/**
 * Contact details — overridable at build time via `PUBLIC_CONTACT_*` env vars (see
 * `.env.example`), so real studio information can be set per-environment (e.g. in the
 * Cloudflare Pages dashboard) without a source-code edit. Falls back to placeholders
 * when unset — [[VERIFY]] before launch if you see these defaults in production.
 * See NOTES.md "Entity data to verify".
 */
export const CONTACT = {
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || 'karma8chakra@gmail.com',
  phone: import.meta.env.PUBLIC_CONTACT_PHONE || '+66 80 870 5704',
  whatsapp: import.meta.env.PUBLIC_CONTACT_WHATSAPP || '+66 80 870 5704',
  telegram: import.meta.env.PUBLIC_CONTACT_TELEGRAM || 'https://t.me/formaisland_bot',
  addressLocality: import.meta.env.PUBLIC_CONTACT_ADDRESS_LOCALITY || 'Koh Phangan',
  addressRegion: import.meta.env.PUBLIC_CONTACT_ADDRESS_REGION || 'Surat Thani',
  addressCountry: import.meta.env.PUBLIC_CONTACT_ADDRESS_COUNTRY || 'TH',
};

/**
 * Social profile URLs (schema.org `sameAs`) — set `PUBLIC_SOCIAL_LINKS` (comma-separated)
 * once official accounts exist (proposal.md §21 SOCIAL). Empty by default, which is valid.
 */
export const SAME_AS: string[] = (import.meta.env.PUBLIC_SOCIAL_LINKS ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

/**
 * Legal specifics that require real legal counsel, not an invented default —
 * overridable via `PUBLIC_LEGAL_*` env vars once confirmed. Falls back to an explicit
 * [[VERIFY]] marker (never a guessed value) so a page can never silently ship with
 * fabricated legal content. See `src/content/legal/en.ts`.
 */
export const LEGAL = {
  updatedDate: import.meta.env.PUBLIC_LEGAL_UPDATED_DATE || '[[VERIFY: publish date before launch]]',
  retentionPeriod: import.meta.env.PUBLIC_LEGAL_RETENTION_PERIOD || '[[VERIFY: specific retention period before launch]]',
  governingLaw:
    import.meta.env.PUBLIC_LEGAL_GOVERNING_LAW ||
    '[[VERIFY: governing law and jurisdiction to be confirmed with local legal counsel before launch]]',
};

export const OG_IMAGE_KEY = 'hero-villa';
