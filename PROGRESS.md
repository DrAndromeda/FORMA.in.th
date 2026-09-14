# PROGRESS.md — FORMA.in.th

Single-page snapshot of where the build stands against `proposal.md`, and
the open questions that need your input to close out. For narrative detail
behind any line here, see `NOTES.md` (decisions, `[[VERIFY]]` items, full
content inventory) and `docs/tasks/TASK-*.md` (one file per board task).

Last updated: 14 Sep 2026.

## Status by task (mirrors the GitHub Projects board)

| # | Task | Status |
|---|---|---|
| 2 | Brand Shell & Design System | ✅ Done |
| 3 | Global Layout (Header/Footer/Nav) | ✅ Done |
| 4 | Homepage & Service Page Template | ✅ Done |
| 5 | Core Pages (13 services + projects + about + process + locations) | ✅ Done — English content; see "Real content" below |
| 6 | Bot Integration (Telegram + WhatsApp) | 🟡 In Progress — code complete, needs **your** live credential testing |
| 7 | SEO / Schema / Hreflang / Sitemap / llms.txt | ✅ Done |
| 8 | 4 Languages (EN/RU/TH/HE) | ✅ Done — all content types translated; see "Translation review" below |
| 9 | Performance Optimization (Core Web Vitals) | ✅ Done (local measurement) — see "Deployed re-test" below |
| 10 | Fix Critical Audit Findings | 🟡 In Progress — most items resolved, see `docs/tasks/TASK-009` |
| 11 | Homepage/Menu Variant Exploration | ✅ Done — rejected, out of scope (see decision log) |
| 12 | QA & Testing | ⚪ Backlog — automated checks pass; see "What's left" below |
| 13 | Launch Checklist | ⚪ Backlog — gated on the open questions below |

## What's fully implemented

- Every page type from `proposal.md`: homepage, 13 service pages, 11
  location pages + hub, 6 project concept studies + hub, 6 journal
  articles + hub, about, process, contact, legal (5 pages), 404.
- All of the above translated into Russian, Thai and Hebrew (Hebrew
  renders `dir="rtl"` correctly) — 182 pages total in the build.
- SEO: schema.org JSON-LD (535 blocks validated), sitemap, hreflang,
  `llms.txt`.
- Telegram + WhatsApp bots: full conversational flow, all 4 languages,
  code-complete and type-checked.
- Performance/accessibility: Lighthouse-verified locally at Performance
  96-98, Accessibility/Best Practices/SEO 100/100/100 on 3 representative
  pages.
- Contact details and legal specifics (governing law, retention period,
  publish dates) are now env-var-configurable (`PUBLIC_*` vars, see
  `.env.example`) rather than hardcoded — set them per environment
  without a code change once real values exist.

## What's deliberately left for you

These aren't gaps in the implementation — they're the specific slice of
work that genuinely requires something only you can provide (a real
credential, a business decision, a legal signature), consistent with
"implement everything that can be implemented, flag only what can't."

### Open questions / inputs needed

1. **Real contact details.** `PUBLIC_CONTACT_EMAIL` / `_PHONE` /
   `_WHATSAPP` / `_ADDRESS_*` env vars are unset, so the site currently
   shows placeholders (`+66-00-000-0000` etc.). Set them in `.env` (local)
   and your hosting provider's dashboard (production) whenever you have
   real numbers — no code change needed.
2. **Social profile links.** `PUBLIC_SOCIAL_LINKS` is empty by your own
   choice (no accounts exist yet) — set it (comma-separated URLs) once
   they do.
3. **Legal specifics — need real legal counsel, not a guess.**
   `PUBLIC_LEGAL_GOVERNING_LAW`, `PUBLIC_LEGAL_RETENTION_PERIOD`,
   `PUBLIC_LEGAL_UPDATED_DATE` are unset, so Terms/Privacy/Cookies still
   show explicit `[[VERIFY: ...]]` text. This is intentional — a governing
   -law clause or a retention period isn't something to invent. Get a
   lawyer's answer, then set the env vars.
4. **Bot live testing (your explicit ask).** Telegram/WhatsApp bots are
   code-complete, type-checked, and have a written test plan
   (`bots/TEST_PLAN.md`) — but need real bot tokens/webhook credentials
   and an actual conversation walkthrough by you before launch.
5. **Real project photography / case-study data.** The 6 projects are
   clearly labeled "concept study" placeholders (proposal.md's truth rule
   forbids inventing real client work). Replace with real projects when
   you have them, or keep the concept-study framing as a deliberate,
   honest choice.
6. **Translation review.** RU/TH/HE content was translated by this
   assistant (AI), not a hired native-speaking translator — natural and
   domain-appropriate by design, but proposal.md recommends a professional
   human pass before launch. Budget for a native-speaker review; don't
   present it as pre-verified professional translation until that happens.
7. **Analytics.** No GA4/Yandex Metrica/Meta Pixel is wired up — the
   cookie-consent gate (`CookieConsent.astro`) fires a `forma:consent`
   event ready for a real analytics loader once you pick a provider and
   have property IDs.
8. **Hosting/deployment.** Site is built and tested locally
   (`astro preview`); it hasn't been deployed anywhere yet. Once you
   confirm the host (Cloudflare Pages is assumed throughout the docs),
   Lighthouse should be re-run against the live URL — a CDN's real cache
   headers and network conditions differ from a local preview build.

### Smaller, non-blocking items

- `docs/tasks/TASK-009` (audit findings) has a couple of items still open
  — see that file for the current list.
- A dedicated axe-core CLI pass (beyond Lighthouse's built-in a11y
  category, already at 100/100 on the pages tested) would give fuller
  severity data before launch.
- Hero slider images are all similar villa-exterior shots — could
  diversify with interior/construction/landscape variety once more
  photography exists.

## How to unblock the rest

Nothing above requires more code. Once you have answers/credentials for
the open questions:
1. Set the relevant `PUBLIC_*` / bot env vars.
2. Run through `bots/TEST_PLAN.md` for both bots.
3. Deploy, then re-run Lighthouse against the live URL.
4. Move `docs/tasks/TASK-012-launch-checklist.md` items off backlog as
   each is resolved, and re-run `scripts/sync-task-status.sh` /
   `scripts/sync-epic-status.sh` to reflect it on the board.
