# Homepage & Service Page Template

**Priority:** P0
**Phase:** 3
**Status:** Done

The homepage and the reusable service-page template both 13 services are
built from. (Note: `proposal.md` §24 ROOT PAGE requires the *root* `/` to
double as the master Services landing page — the audit found `/services/`
itself 404s; see `TASK-009-fix-audit-findings.md`.)

## Scope

- Reusable block components: `Hero` (cinematic slider, LCP-optimized first
  slide), `DirectAnswer`, `EditorialIntro`, `ServiceGrid`, `SplitImageText`,
  `ProjectSlider`/`ProjectMosaic`, `ProcessTimeline`, `WhyUs`,
  `MaterialsBlock`, `BudgetGuidance`, `FAQAccordion` (with FAQPage schema),
  `LocationBlock`, `JournalCards`, `CTABanner`.
- `HomePage.astro` template composing all of the above.
- `ServicePage.astro` template: H1 → 40–60 word direct answer → intro →
  scope → materials → process → deliverables → budget guidance → related
  projects → FAQ → related services → CTA, with Service schema.

## Outcome

Both templates done and in use. See `src/templates/HomePage.astro`,
`src/templates/ServicePage.astro`, `src/components/blocks/`.

**Not yet done** (added by the merged Part 2 of `proposal.md`): an
indicative pricing/"Estimated Investment" table on every service page —
see `NOTES.md` audit findings.
