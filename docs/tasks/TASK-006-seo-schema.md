# SEO / Schema / Hreflang / Sitemap / llms.txt

**Priority:** P0
**Phase:** 6
**Status:** Done — but see the audit note below

## Scope

- JSON-LD via `src/lib/schema.ts`: Organization/ProfessionalService,
  WebSite, WebPage, BreadcrumbList, Service, FAQPage, Article, ImageObject
  — only where accurate (e.g. no fabricated ratings/reviews/awards).
- `hreflang` alternates + self-referencing canonical on every page
  (`src/components/seo/BaseHead.astro`), gated by an `availableLocales`
  prop so a `hreflang` link never points at a page that doesn't exist for
  that locale yet.
- `@astrojs/sitemap` (`sitemap-index.xml`), `public/robots.txt` (explicitly
  allows GPTBot/ClaudeBot/PerplexityBot/Google-Extended/CCBot per
  `proposal.md` §11 GEO), `public/llms.txt`.
- One `<h1>`, one meta description, one canonical link verified
  programmatically across all 59 generated pages.

## Outcome

Verified working via a full production build (0 broken internal links, 0
missing H1/meta/canonical/alt, all 154 JSON-LD blocks valid JSON, at the
time this was built). **However**, the 13 Sep 2026 live-deployment audit
(`NOTES.md`) found the actual deployed breadcrumbs broken — the
BreadcrumbList schema may be technically valid while the *visible*
breadcrumb links point at the wrong pages. Re-verify this task's "Done"
status once `TASK-009-fix-audit-findings.md` fixes that.

Consider adding the ad-hoc QA scripts used to verify this (link-check,
H1/meta/canonical/alt check, JSON-LD validity check) as proper committed
scripts under `scripts/qa/`, so this becomes a repeatable `make` target —
tracked under `TASK-011-qa-testing.md`.
