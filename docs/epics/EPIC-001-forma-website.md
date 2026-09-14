# FORMA.in.th Website

**Priority:** P0
**Status:** Done (implementation) — every task below is complete and
verified (see each task's file for what "verified" means concretely:
Lighthouse runs, axe-core passes, a local `wrangler pages dev` test of
the lead-form pipeline, etc.). What remains before this can actually go
live is real business/legal input from the site owner (contact details,
legal counsel sign-off, analytics accounts, bot credentials for a live
conversation test) — see `PROGRESS.md` "Open questions" for the specific,
current list. None of it is implementation work.

The whole `proposal.md` brief, as one epic. Previously this was split
across 10 separate epic issues (one per roadmap phase); that added
tracking overhead without adding clarity, since it's all one proposal and
one team building it in the same sessions. It's now one epic with large
tasks under it — see `docs/epics/README.md` for why, and
`docs/tasks/TASK-*.md` for the actual breakdown.

## What this covers

A premium architecture/design-build studio website for Koh Phangan:
static-first Astro site, 13 services, projects, locations, journal, 4
languages (EN/RU/TH/HE), Telegram/WhatsApp intake bots, full SEO/GEO,
performance and accessibility to a high bar. Full detail in `proposal.md`
(now a single merged document — see `docs/Proposals.md` for the history
of why it used to be two files, and don't repeat that split).

## Task breakdown

Each of these is a `docs/tasks/TASK-*.md` file, large enough to represent
a real work session rather than a micro-step. Status per task (kept in
sync with each task's own `**Status:**` line — see `docs/tasks/README.md`):

| Task | Status |
|---|---|
| Brand shell & design system | Done |
| Global layout (header/footer/nav) | Done |
| Homepage & service page template | Done |
| Core pages — 13 services + projects + about + process + locations (EN) | Done |
| SEO / schema / hreflang / sitemap / llms.txt | Done |
| Bot integration (Telegram + WhatsApp) | Done (implementation) — live credential testing is the site owner's task |
| 4 languages (EN/RU/TH/HE) | Done — all content types translated; native-speaker review recommended pre-launch |
| Performance optimization (Core Web Vitals) | Done (local measurement) — Lighthouse 96-98 perf, 100 a11y/best-practices/SEO |
| Fix critical audit findings (2026-09-13) | Done — 2 remaining items are a hosting decision and real client data |
| Homepage/menu variant exploration (3 options, pick one) | Done — rejected, kept the single homepage from proposal.md |
| QA & testing | Done — axe-core, browser automation, and static checks all pass |
| Launch checklist | Done (implementation) — remaining items are real business/legal input, not code |

## Notes

- The 2026-09-13 audit findings (`NOTES.md` → "Critical audit findings")
  are resolved: `/services/` redirects to `/` per proposal.md's own root-
  page requirement, breadcrumbs fixed, pricing tables live on all 13
  services, mobile menu interaction verified via browser automation, and
  the lead-form pipeline verified end-to-end (locally) via `wrangler pages
  dev`. Live placeholder contact details remain by design — see
  `PROGRESS.md`.
- The former per-phase epics' full detail wasn't lost — it's preserved in
  each corresponding `docs/tasks/TASK-*.md` file, just recategorized as a
  task instead of a separate epic.
