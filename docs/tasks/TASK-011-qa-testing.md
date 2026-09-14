# QA & Testing

**Priority:** P0
**Phase:** 9
**Status:** Done (everything achievable without real devices/credentials)
— see outcome below.

## Scope

- [x] **Accessibility**: axe-core run via real headless Chrome
      (`scripts/qa/browsercheck.cjs`) against 18 representative pages
      spanning all 4 locales and 6 templates — 0 violations (WCAG 2.1
      A/AA). One real bug found and fixed along the way (PricingTable's
      scrollable region wasn't keyboard-focusable).
- [x] **Cross-viewport**: 375/430/768/1440/1920px tested in Chrome — 0
      horizontal-scroll issues; mobile menu interaction (open, accordion,
      close, focus return, Escape) verified at each mobile/tablet width.
      **Not done**: real Safari/Firefox/iOS/Android device testing — this
      genuinely needs physical devices or BrowserStack-type access this
      environment doesn't have.
- [x] **Content QA**: `scripts/qa/metacheck.cjs` runs across all 182 built
      pages (all 4 locales) — H1/title/meta/canonical/alt all present.
      Translation completeness enforced structurally by the
      translation-gating architecture itself (a locale/slug either has a
      full entry or falls back to English — never partial/mixed content).
- [x] **Forms**: honeypot and field validation verified end-to-end against
      a local `wrangler pages dev` run — see `TASK-009`.
- [x] Ad-hoc QA scripts committed under `scripts/qa/` (`linkcheck.cjs`,
      `metacheck.cjs`, `jsonldcheck.cjs`, `browsercheck.cjs`), wired to
      `npm run qa:*` and `make qa` / `make qa-browser`.
- [ ] **Bots**: every service × location × language combination through to
      submit and staff-chat handoff — genuinely needs `TASK-005`'s real
      credentials, not more code. Left for the user, per their own stated
      division of labor; `bots/TEST_PLAN.md` is ready.

## Outcome

Every QA item that doesn't require a real device or a real bot credential
is done and passing. The one remaining item (live bot conversation
testing) is explicitly the user's own task, not a code gap.
