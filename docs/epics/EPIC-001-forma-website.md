# FORMA.in.th Website

**Priority:** P0
**Status:** In progress — see task breakdown below; several tasks marked
"Done" need re-verification against the 2026-09-13 audit findings in
`NOTES.md` before they're trusted

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
| Core pages — 13 services + projects + about + process + locations (EN) | Done (needs re-check: `/services/` root landing page was missing per the audit) |
| SEO / schema / hreflang / sitemap / llms.txt | Done (needs re-check: breadcrumb links broken per the audit) |
| Bot integration (Telegram + WhatsApp) | Partial |
| 4 languages (EN/RU/TH/HE) | Partial |
| Performance optimization (Core Web Vitals) | Partial |
| Fix critical audit findings (2026-09-13) | Not started |
| Homepage/menu variant exploration (3 options, pick one) | Not started |
| QA & testing | Not started |
| Launch checklist | Not started |

## Notes

- `NOTES.md` → "Critical audit findings (13 Sep 2026)" documents concrete,
  currently-live defects that touch several of the "Done" tasks above
  (404 on `/services/`, broken breadcrumbs, non-functional contact form,
  live placeholder contact details). Don't take a task's "Done" status at
  face value until those are resolved and re-checked against it.
- The former per-phase epics' full detail wasn't lost — it's preserved in
  each corresponding `docs/tasks/TASK-*.md` file, just recategorized as a
  task instead of a separate epic.
