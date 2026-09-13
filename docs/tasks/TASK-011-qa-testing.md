# QA & Testing

**Priority:** P0
**Phase:** 9
**Status:** Not started

Beyond the automated structural checks already run during the build
(H1/title/meta/canonical/alt present on all pages, 0 broken internal links,
all JSON-LD valid — see `TASK-006-seo-schema.md`), none of the following
has been done yet.

## Scope

- [ ] **Accessibility**: run axe-core (or equivalent) against representative
      pages in every available language; confirm 0 critical/serious issues;
      manual keyboard-navigation and screen-reader pass.
- [ ] **Cross-browser/device**: latest Chrome/Safari/Firefox, iOS Safari,
      Android Chrome, at 320–430px, 768px, and 1440–1920px.
- [ ] **Content QA**: once RU/TH/HE content lands (`TASK-007`), check every
      page in every language for missing copy, wrong language, broken
      translation, heading hierarchy, metadata, schema, alt text, CTA
      destinations.
- [ ] **Forms**: validation, success/error states, spam protection (honeypot
      already implemented — verify it actually blocks a real bot attempt).
- [ ] **Bots**: every service × location × language combination through to
      submit and staff-chat handoff, plus back/edit/restart and attachment
      paths — depends on `TASK-005` having real credentials to test against.
- [ ] Add the ad-hoc QA scripts used to verify earlier tasks (link-check,
      H1/meta/canonical/alt check, JSON-LD validity check) as proper
      committed scripts under `scripts/qa/`, so this becomes a repeatable
      `make` target instead of one-off shell one-liners.

## Outcome

Not started — depends on `TASK-007` (translated content to QA) and
`TASK-005` (bot credentials) being further along first, and on
`TASK-009-fix-audit-findings.md` being resolved first (no point running a
full QA pass against pages with known 404s and broken links).
