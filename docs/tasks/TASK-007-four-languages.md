# 4 Languages (EN / RU / TH / HE)

**Priority:** P1
**Phase:** 7
**Status:** Done (14 Sep 2026) — every content type (services, locations,
about, process, projects, journal, homepage, contact, UI shell) now has a
complete translation in RU/TH/HE. Verified: `npx astro check` clean,
`npm run build` produces all 182 pages with correct `lang`/`dir` attributes
(Hebrew renders `dir="rtl"` throughout), full QA suite (link check, JSON-LD
validation) passes.

`proposal.md` explicitly warns against machine translation ("preserve
meaning, tone, terminology and search intent per language"). This pass was
done by Claude (the coding assistant), not a hired human translator — it
aims for natural, idiomatic, domain-appropriate language rather than a
literal/MT-style pass, but **a native-speaker review before launch is still
recommended** before presenting it as final professional translation (the
same posture as the legal pages' "not legal advice" caveat). Tracked
separately from `TASK-004-core-pages.md` (English-only core pages).

## Scope / translation backlog, in priority order

1. **Services (13 pages × RU/TH/HE)** — highest commercial value.
2. **Primary locations (4 × RU/TH/HE)** — Koh Phangan, Koh Samui, Koh Tao,
   Bali.
3. **About, Process (1 × RU/TH/HE each)** — referenced from every page.
4. **Secondary locations (7), Projects (6), Journal articles (6) ×
   RU/TH/HE.**

## How translations plug in (already built)

Each content type has `src/content/<type>/en.ts` (canonical) plus empty
`ru.ts`/`th.ts`/`he.ts` siblings with the same shape. **A locale's page for
a given item is only generated once its translation file has a complete
entry for that slug** — partial-page translations aren't supported, to
avoid ever serving mixed-language content under a `/ru/`/`/th/`/`/he/` URL.
Adding a complete entry makes the page, its `hreflang` alternates, and every
internal link to it appear automatically — no code changes needed. See
`README.md` "Content model & the translation gating pattern" for the exact
mechanism.

## Already done

- `src/i18n/dictionary.ts` — navigation, footer, forms, cookie banner: 100%
  translated, all 4 languages.
- `src/content/home/{ru,th,he}.ts` — homepage hero/why-us/process overview:
  100% translated.
- Contact page: fully translatable already (it's dictionary-only content),
  live in all 4 languages today.
- True Hebrew RTL (`dir="rtl"`, logical CSS properties, `<bdi>` around
  numbers/emails) and Thai ICU-safe line-breaking (`line-break: strict`,
  IBM Plex Sans Thai) are both implemented and don't need per-page work —
  they apply automatically once a page is translated.
