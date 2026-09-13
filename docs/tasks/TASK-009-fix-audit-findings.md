# Fix Critical Audit Findings (2026-09-13)

**Priority:** P0
**Status:** In progress — several items already verified fixed or resolved
against the current codebase; see notes per item below.

New task, added when merging `proposal(NEW2).md`'s §44 (a dated audit of
an earlier deployment) into `proposal.md`. The audit predates the big
"Build FORMA.in.th" rebuild commit, so **several of its findings turned
out to already be fixed by that rebuild** — verified directly against the
current source before assuming the audit was still accurate. Don't trust
audit text alone; check the code.

## ⚠️ Spec conflict — needs a decision, not a silent fix

`proposal.md` §24 ROOT PAGE (Part 1, P0) says: *"Root URL `/` is master
Services landing... **Do not create competing `/services/` hub."*** The
audit (Part 2 §44.2) separately calls the `/services/` 404 a critical bug
to fix. These directly contradict each other. **Not building `/services/`**
until this is resolved — Part 1 is explicitly still mandatory, and this
isn't Part 2 "raising the bar," it's a real disagreement about URL
structure. Options:
- (a) keep `/` as the only Services landing; treat the audit note as
  superseded — no action needed.
- (b) build `/services/` as a real page and demote `/` to a more
  conventional homepage — a genuine IA change.
- (c) redirect `/services/` → `/` so old links don't 404 without building
  a second hub.

## Scope

- [x] ~~Fix breadcrumbs~~ — **real bug, fixed directly**, not something the
      rebuild already handled. Confirmed live in the built HTML first
      (every service page showed a duplicate "Services / Services /
      <name>" crumb), then fixed the actual cause in `ServicePage.astro`
      (it was passing its own redundant root item on top of
      `Breadcrumbs.astro`'s auto-prepended one) and re-confirmed clean
      output. `ProjectPage.astro`/`LocationPage.astro` were unaffected —
      checked both; their first item already points elsewhere.
- [x] ~~Diversify the hero slider~~ — **verified already correct**:
      `HomePage.astro`'s hero slides are `hero-villa` (exterior), 
      `architecture` (structure/shading), `pool-villa` (pool/landscape),
      `interior` — four genuinely distinct categories, not repeats.
- [ ] **Blocked on the decision above** — root Services page / `/services/`.
- [ ] Add an indicative-pricing table to service pages — **in
      progress/next up**: `BudgetGuidance.astro` currently only lists
      qualitative cost *factors*, not an actual price-range table like
      the one specified in the merged Part 2 (with THB ranges + the
      "indicative, contact us" disclaimer). Needs a real table component.
- [ ] Get the lead form actually working on whatever host this deploys
      to — `functions/api/lead.ts` needs Cloudflare Pages Functions (or an
      equivalent), which plain GitHub Pages doesn't provide. This is a
      hosting decision, not a code bug — the code already assumes
      Cloudflare Pages.
- [ ] Replace live placeholder contact details: `+66-00-000-0000`,
      `studio@forma.in.th` (unowned domain), the placeholder `wa.me`
      number. These are correctly marked `[[VERIFY]]` in
      `src/lib/site.ts` already — this item is "get real data from the
      client," not a code fix.
- [ ] Test mobile menu / mega-menu dropdown behavior on a real device or
      emulator (currently unverified either way).
- [ ] Decide on and (if approved) implement the primary-nav restructure the
      audit proposes (13 services listed directly, About/Process/Journal/
      Projects moved to footer-only, Locations moved out of the nav to a
      per-service "Service Areas" block) — **a deliberate IA decision**,
      not a silent change; confirm before building. Also affects the
      `/services/` decision above — don't decide the nav twice.

## Acceptance criteria

- [ ] The `/services/` question above is explicitly decided (a/b/c), not
      left ambiguous.
- [x] Every breadcrumb link on a representative sample of pages goes to
      its actual parent — verified in source for Service/Project/Location
      templates.
- [ ] Every service page shows a real price-range table with the
      indicative-pricing disclaimer.
- [ ] A real end-to-end form submission is received (Telegram staff chat
      or wherever it's wired to) from the deployed site.
- [ ] No placeholder phone/email/WhatsApp number remains on any live page.
