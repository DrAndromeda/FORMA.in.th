# Fix Critical Audit Findings (2026-09-13)

**Priority:** P0
**Status:** Not started

New task, added when merging `proposal(NEW2).md`'s §44 (a dated audit of
the live GitHub Pages deployment) into `proposal.md`. These are concrete,
currently-live defects — not spec interpretation — full detail in
`NOTES.md` → "Critical audit findings (13 Sep 2026)". Listed here so
they're tracked as real work, not just a notes entry nobody picks up.

## Scope

- [ ] Build the `/services/` root landing page (currently 404s) — this is
      `proposal.md` §24 ROOT PAGE's master Services page, not optional.
- [ ] Fix breadcrumbs: the "Services" and category links currently point
      at the homepage instead of their real parent pages.
- [ ] Get the lead form actually working on whatever host this deploys
      to — `functions/api/lead.ts` needs Cloudflare Pages Functions (or an
      equivalent), which plain GitHub Pages doesn't provide.
- [ ] Replace live placeholder contact details: `+66-00-000-0000`,
      `studio@forma.in.th` (unowned domain), the placeholder `wa.me`
      number — with real ones, or clearly mark them `[[VERIFY]]` and keep
      them out of the live build until they're real.
- [ ] Test mobile menu / mega-menu dropdown behavior on a real device or
      emulator (currently unverified either way).
- [ ] Add the indicative-pricing ("Estimated Investment") table to every
      service page, per the merged Part 2 requirement — see
      `proposal.md`'s pricing-table section and its disclaimer wording.
- [ ] Decide on and (if approved) implement the primary-nav restructure the
      audit proposes (13 services listed directly, About/Process/Journal/
      Projects moved to footer-only, Locations moved out of the nav to a
      per-service "Service Areas" block) — **a deliberate IA decision**,
      not a silent change; confirm before building.
- [ ] Add visual variety to the hero slider (currently 4 similar villa
      exterior shots).

## Acceptance criteria

- [ ] `/services/` returns 200 with real content, not a 404.
- [ ] Every breadcrumb link on a representative sample of pages goes to
      its actual parent, verified manually.
- [ ] A real end-to-end form submission is received (Telegram staff chat
      or wherever it's wired to) from the deployed site.
- [ ] No placeholder phone/email/WhatsApp number remains on any live page.
