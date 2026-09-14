# 4 Languages (EN / RU / TH / HE)

**Priority:** P1
**Phase:** 7
**Status:** Partial — UI shell + homepage + contact fully translated; 3 of
13 services now translated to Russian (14 Sep 2026: architecture,
villa-design, construction) as full entries, verified in a production
build. 10 services remain in RU; all 13 remain in TH/HE; locations/about/
process/projects/journal untouched in any of the three languages.

`proposal.md` explicitly warns against machine translation ("preserve
meaning, tone, terminology and search intent per language"), so this is a
professional human-translation effort, tracked deliberately separately from
`TASK-004-core-pages.md` (which is "done" for English only).

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
