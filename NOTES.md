# Build Notes

Built from `proposal.md`. This records the decisions made where the brief left room for
judgment, everything flagged `[[VERIFY]]`, what's translated vs. not yet, and the pre-launch
checklist — per proposal.md §24 WORKFLOW's decision rule: choose the most premium,
technically sound, SEO-safe option and keep moving rather than blocking on questions, and
document assumptions here instead.

## Running locally

The main website and the bots are two separate Node projects — install and run each
independently.

### Website (Astro)

```bash
# from the repo root
npm install
npm run dev
```

Opens at **http://localhost:4321** by default. Every language is reachable directly:
`/`, `/ru/`, `/th/`, `/he/` (and e.g. `/services/villa-design/`, `/locations/koh-samui/`).
The dev server hot-reloads on file changes — no restart needed while editing content or
components.

Other useful scripts (repo root):

```bash
npm run build     # production build to ./dist
npm run preview   # serve that production build locally, e.g. http://localhost:4321
npm run check     # astro check — type errors across .astro files
```

The one feature that **won't** work in plain local dev is the contact form's final submit
step, since that's handled by `functions/api/lead.ts`, a Cloudflare Pages Function — the
Astro dev server doesn't run Pages Functions. To test the form end-to-end locally:

```bash
npm install -D wrangler   # Cloudflare's CLI, if not already installed
npm run build
npx wrangler pages dev dist
```

This serves the built site *and* `functions/api/lead.ts` together (Wrangler auto-detects
the `functions/` directory). Create a `.dev.vars` file at the repo root (same keys as
`.env.example`: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) for `wrangler pages dev` to pick up
locally — it's gitignored the same way `.env` is.

### Bots (Telegram / WhatsApp)

Separate project in `bots/` — see `bots/README.md` for full setup. Quick version:

```bash
cd bots
npm install
cp .env.example .env   # fill in TELEGRAM_BOT_TOKEN etc.
npm run telegram        # long-polling, no public URL needed — talk to your bot on Telegram directly
```

WhatsApp's webhook (`npm run whatsapp`) needs a public HTTPS URL for Meta to call, so for
local testing you'd tunnel it (e.g. `npx cloudflared tunnel --url http://localhost:3001` or
ngrok) and point the Meta app's webhook config at that tunnel URL.

## Scope of this pass

The brief (`proposal.md`) specifies a very large production build: 13 services × 11
locations × 4 languages, live Telegram/WhatsApp bots, and a full SEO/performance/a11y
program. Fully translating every page into Russian, Thai and Hebrew to the "10/10 editorial,
never machine-translate" bar the brief itself demands is a professional human-translation
project in its own right — not something to rush. This build prioritizes, in order:

1. A complete, production-quality **architecture** (components, data model, SEO/schema
   plumbing, i18n routing that never serves mismatched-language content) that all future
   content — translated or new — slots into without code changes.
2. **Complete, original English content** for every page type: all 13 services, all 11
   locations, 6 representative projects, 6 journal articles, About, Process, Contact, and
   legal pages.
3. **Full translation** of everything a visitor sees regardless of which page they're on —
   navigation, footer, forms, cookie banner, homepage — in all 4 languages, plus the bots'
   conversational copy.
4. Real **Telegram and WhatsApp intake bots** implementing the exact flow specified, as a
   standalone deployable project (`bots/`).

Item 2 for Russian/Thai/Hebrew (translating all 13 service pages, 11 location pages, 6
project pages, 6 articles, About and Process) is the main thing **not** done in this pass —
see "Translation backlog" below for exactly what's left and how the codebase is already
structured to receive it.

## Key decisions & assumptions

- **Root URL (`/`) is the Services landing page, not a generic "Home."** proposal.md's two
  source tables disagree here — one describes a classic homepage, the other (§24 ROOT PAGE)
  explicitly requires the root to be the master Services overview with nav starting
  "Services," not "Home." Resolved by making `/` serve as both: it has the full rich
  homepage block structure (hero, direct answer, services, projects, process, locations,
  journal, CTA) the first table wants, while the primary nav item is "Services" (linking to
  `/`) per the second table's explicit rule, and there is no separate `/services/` index route.
- **No fabricated projects, testimonials, or team bios.** proposal.md's truth rule forbids
  inventing clients, awards, reviews, or people. The 6 projects in `src/content/projects/`
  are clearly labeled "concept study" / `status: 'concept'` — illustrative of the design
  approach, not claimed as completed, verified commissions. `TrustProof.astro` exists as a
  component but is not used on any page yet, since there is no real testimonial/credential
  data to put in it. About page has no team section for the same reason.
  **Before launch: replace with real project photography/data, or keep the concept-study
  framing explicit if these stay as placeholders.**
- **Contact details are placeholders.** `src/lib/site.ts`'s `CONTACT` object (email, phone,
  address) and `SAME_AS` (social profile links) are marked `[[VERIFY]]` — fill in with the
  studio's real, verified details before launch. `LocalBusiness`/`ProfessionalService`
  schema in `src/lib/schema.ts` uses these same values, so schema will validate but contain
  placeholder data until this is done.
- **Legal pages are functional drafts, not legal advice.** `src/content/legal/en.ts` has
  real, non-generic privacy/terms/cookies/accessibility/editorial-policy content reflecting
  what the site actually does (Telegram-based lead forwarding, no analytics active yet), but
  publish dates, the data-retention period, and governing law/jurisdiction are marked
  `[[VERIFY]]` for a legal reviewer to confirm.
- **Legal pages are English-only,** deliberately: publishing untranslated legal text under a
  `/ru/privacy/`-style URL would be worse than linking to the English original from every
  locale's footer (which is what happens now). Translate once legal counsel has signed off
  on the English text, so translation doesn't need to happen twice.
- **Analytics are not wired up.** No GA4/Yandex Metrica/Meta Pixel script is included yet —
  proposal.md's event list (`page_view`, `cta_click`, `bot_start`, etc.) is documented as a
  goal but there was nothing to actually send events to without real property IDs. The
  cookie consent banner (`CookieConsent.astro`) is fully built and gates consent correctly
  (fires a `forma:consent` DOM event with `{essential, analytics, marketing}`) — wire a real
  analytics loader to listen for that event once accounts exist.
- **Social profile links are empty** (`SAME_AS` in `src/lib/site.ts`) — proposal.md §21 says
  to populate these "once accounts exist." None are assumed to exist yet.

## `[[VERIFY]]` items — grep for this exact string before launch

| File | What to verify |
|---|---|
| `src/lib/site.ts` | Real studio email, phone, WhatsApp number, address; social profile URLs |
| `src/content/legal/en.ts` (×3) | "Last updated" dates for Privacy/Terms/Cookies pages |
| `src/content/legal/en.ts` | Data retention period for unconverted enquiries (Privacy) |
| `src/content/legal/en.ts` | Governing law / jurisdiction (Terms) — needs local legal counsel |

## Content inventory

| Page type | Count | EN | RU | TH | HE |
|---|---|---|---|---|---|
| Homepage | 1 | ✅ | ✅ | ✅ | ✅ |
| Services | 13 | ✅ | — | — | — |
| Locations | 11 (4 primary + 7 Koh Phangan areas) | ✅ | — | — | — |
| Projects (concept studies) | 6 | ✅ | — | — | — |
| Journal articles | 6 | ✅ | — | — | — |
| About | 1 | ✅ | — | — | — |
| Process | 1 | ✅ | — | — | — |
| Contact | 1 | ✅ | ✅ | ✅ | ✅ |
| Locations hub, Projects hub, Journal hub | 3 | ✅ | — | — | — |
| Legal (privacy/terms/cookies/accessibility/editorial-policy) | 5 | ✅ | n/a¹ | n/a¹ | n/a¹ |
| 404 / thank-you | 2 | ✅ | — | ✅ (thank-you) | ✅ (thank-you) |

¹ Legal pages link to the English version from every locale by design — see "Key decisions" above.

**Total pages generated by `npm run build` today: 59** (verified — see `dist/` after a build).

## Translation backlog

To translate a content type, add a complete matching entry to its `ru.ts` / `th.ts` / `he.ts`
file (services, locations, projects) or a new file (about, process) or a new `.md` file
(journal, under `src/content/journal/<locale>/`) — see README.md "Content model" for the
exact mechanism and why partial-page translations aren't supported.

**Progress (14 Sep 2026): 3 of 13 services translated to Russian** —
`architecture`, `villa-design`, `construction` (`src/content/services/ru.ts`).
Full entries, not summaries — every field of `ServiceTranslation` including
`pricingRows`, verified in a production build (`/ru/services/architecture/`
etc. all render correctly, nav/footer correctly fall back to the English
page for the other 10 untranslated services rather than mixing languages).
TH/HE and the remaining 10 services are unstarted.

Recommended order, by SEO/commercial value:

1. **Services (13 pages × 3 languages)** — highest commercial value, primary landing pages.
   RU: 3/13 done (architecture, villa-design, construction) — 10 remain, plus all 13 in TH/HE.
2. **Primary locations (4 × 3)** — Koh Phangan, Koh Samui, Koh Tao, Bali.
3. **About, Process (1 × 3 each)** — referenced from every page's footer/nav.
4. **Secondary locations (7 × 3), Projects (6 × 3), Journal (6 × 3).**

This is a genuine professional translation project (proposal.md explicitly warns against
machine translation for exactly this content) — budget for a native-speaking translator
per language with architecture/real-estate domain familiarity, not a bulk MT pass.

## Bots

See `bots/README.md` in full. Summary: both Telegram (grammY, long-polling) and WhatsApp
(Cloud API webhook) bots implement the exact flow from proposal.md §15 BOT, fully localized
in all 4 languages, sharing one state machine (`bots/shared/flow.ts`). Known gaps before a
high-traffic launch: in-memory session storage (fine for one process, documented swap point
for Redis/KV), no automated tests, and `express`'s transitive `qs` dependency has an open
moderate-severity advisory pending an Express major-version upgrade.

## Critical audit findings (13 Sep 2026)

Found during a live-deployment audit (originally recorded as §44 of what was
`proposal(NEW2).md`, now merged into `proposal.md`). **This audit predates
the "Build FORMA.in.th" rebuild commit** — several findings turned out to
already be fixed by that rebuild when re-checked directly against source.
Don't take this list at face value; two items below have been verified
and struck through, the rest are still open as of this writing. See
`docs/tasks/TASK-009-fix-audit-findings.md` for the up-to-date working copy
of this list.

- **⚠️ `/services/` — not a simple 404 fix.** `proposal.md` §24 ROOT PAGE
  (Part 1, P0) explicitly says *"Do not create competing `/services/`
  hub"* — directly contradicting this audit item, which calls the same
  page's absence a bug. Genuine spec conflict, needs a decision (see
  `TASK-009`), not a silent fix either way.
- **Only 3 of 44 pages are actually translated** (`/`, `/contact/`,
  `/thank-you/`) in RU/TH/HE, despite the UI shell/dictionary being fully
  translated. Matches what the "4 Languages" task already says — flagged
  here too since it's the same underlying gap, seen from the live site.
- **The lead form doesn't work on the current host.** It depends on
  `functions/api/lead.ts`, a Cloudflare Pages Function — those don't run on
  GitHub Pages. Needs either a host with server functions, or the form
  wired to an external form service.
- ~~**Breadcrumbs are broken**~~ — **real bug, now fixed.** This was not
  already fixed by the rebuild — verified live before the fix: every
  service page rendered a duplicate "Services / Services / <name>" crumb
  (`Breadcrumbs.astro` auto-prepends a root "Services" crumb, and
  `ServicePage.astro` was also passing its own identical one). Fixed by
  removing the redundant item in `ServicePage.astro`; confirmed in the
  built HTML afterward. `ProjectPage.astro`/`LocationPage.astro` were
  never affected — their first custom item already points at a different
  path (`/projects/`, `/locations/`), so no duplication there.
- **Mobile menu / dropdown touch behavior untested** on a real device or
  emulator — flagged, not yet verified either way.
- **Live placeholder data**: phone `+66-00-000-0000`, email
  `studio@forma.in.th` (domain not owned), a placeholder `wa.me` number —
  these are correctly marked `[[VERIFY]]` in `src/lib/site.ts` already;
  this is "get real data from the client," not a code fix.
- ~~**Hero slider lacks visual variety**~~ — **verified fixed.**
  `HomePage.astro`'s 4 slides are `hero-villa` (exterior), `architecture`
  (structure), `pool-villa` (pool/landscape) and `interior` — genuinely
  distinct categories, not repeats.
- **Primary navigation structure is under review.** The audit proposes
  replacing the current Home/Services/Projects/About/Process/Locations/
  Journal/Contact top-level nav with the 13 services listed directly (no
  generic labels), moving About/Process/Journal/Projects to the footer
  only, and Locations to a per-service-page "Service Areas" block instead
  of a nav item. **Not yet decided or built** — needs a deliberate call,
  not a silent implementation, since it's a real IA change from what's
  live today.
- **No indicative pricing table on service pages yet** — `proposal.md` (via
  the merged Part 2) requires a per-service "Estimated Investment" table
  with a disclaimer, similar to CreativeLAB's. Not yet added to
  `ServicePage.astro`.
- ~~A three-variant homepage/menu exploration~~ — **rejected (14 Sep
  2026), not pursued.** This came from the merged Part 2 addendum, not
  Part 1's actual spec. All 3 variants were built, compared, and deleted;
  the single homepage already built from Part 1 (`src/templates/HomePage.astro`,
  live at `/`) was kept as-is. See `docs/tasks/TASK-010-homepage-variants.md`.

## Decisions resolving the audit's two open questions (14 Sep 2026)

Both of these were explicitly flagged above as "needs a decision, not a
silent fix." Decided from the architecture, not by splitting the
difference — proposal.md and the audit disagreed, and one of them was
simply wrong about the current implementation in each case.

- **`/services/` — redirect only, no new page.** proposal.md §24 (P0) is
  explicit: root `/` is the *only* Services landing page, and building a
  competing `/services/` hub is expressly forbidden. A redirect isn't a
  competing hub — it's an alias with no content of its own — so it
  resolves the audit's real complaint (an old link, a direct URL guess, or
  a crawler's own convention-guessing 404ing on the term the primary nav
  itself uses) without violating the P0 requirement's intent. Implemented
  as `public/_redirects` (`/services/ → /`, and the three locale
  equivalents), a static edge-redirect file Cloudflare Pages (and Netlify)
  read directly — no new Astro route, no new content.
- **Nav restructure — rejected, current nav kept.** The audit's proposal
  (flatten to 13 top-level service links, move About/Process/Journal/
  Projects to footer-only, move Locations out of nav) solves a problem
  `Header.astro` already solves differently and, on balance, better: the
  existing Services mega-menu already exposes all 13 services (satisfying
  proposal.md's own "expose all 13 services" requirement) without needing
  13 flat top-level items, which would hurt mobile/header scannability.
  Footer-only About/Process also directly conflicts with proposal.md §3
  MENU's own explicit primary-nav list. Moving Locations out of nav would
  remove a legitimate location-first entry point onto the 11 location
  pages already built. The audit's proposal appears to have been written
  without accounting for the mega-menu solution actually in place. No code
  change; `docs/tasks/TASK-009` updated to reflect this as resolved, not
  outstanding.

## Known minor gaps

- **WhatsApp has no deep-link start-parameter equivalent** to Telegram's
  `?start=service_villa-design` — a service/location page's "Start a Project" CTA can only
  pre-fill a `wa.me` text template, which the webhook doesn't yet parse into a preselected
  service. See `bots/README.md`.
- **Breadcrumb parent links** (`src/components/layout/Breadcrumbs.astro`) use plain
  `localizePath()`, not the `*Smart` fallback pattern — in the unlikely case a secondary
  location gets translated before its parent primary location, that one breadcrumb link
  would 404. Not currently reachable (no locations are translated yet), but worth revisiting
  once location translation begins.
- **Lighthouse has been run locally** (mobile, simulated throttling, against an
  `astro preview` build — not yet against the live deployment, since deploy env/DNS
  aren't finalized) on three representative pages: homepage, a service page
  (`/services/villa-design/`), a location page (`/locations/baan-tai/`). Result:
  Accessibility 100, Best Practices 100, SEO 100 on all three; Performance 96-98;
  LCP 1.8-2.6s; zero failing binary audits. Two real bugs found and fixed this way
  (not left as "should be fine architecturally"):
  - Hero slider's non-first slides used native `loading="lazy"`, which does **not**
    defer a same-viewport, `opacity:0`/`position:absolute inset-0` element — fixed by
    deferring via `data-src` + JS hydration on `window.load` (`Hero.astro`).
  - `text-ink-900/50` (used in 11 files) was 3.37:1 against `stone-100`, below the
    4.5:1 WCAG AA minimum — fixed to `/60` (4.58-4.76:1) site-wide.
  - **Render-blocking CSS (~1170ms) — left as-is, deliberately.** Considered forcing
    `build.inlineStylesheets: 'always'` in `astro.config.mjs` to eliminate it, but this
    is a 65-page multi-page (non-SPA) static site: inlining the stylesheet into every
    page means the browser re-downloads the full CSS payload on every navigation
    instead of serving it once from cache, which is a worse trade for a site this size
    with this much shared chrome (header/footer/design system). Kept the default
    (`'auto'`) — a single cacheable external stylesheet across all 65 pages. Re-run
    Lighthouse against the live deployment once real hosting/CDN is in place, since a
    CDN's cache headers change this calculus more than anything else.
  - axe-core has not been run as a separate pass — Lighthouse's own accessibility
    category (which uses axe-core under the hood) is scoring 100/100 on the pages
    tested, so a standalone axe-core CLI pass is lower priority now, not skipped
    outright.
- **Rate limiting on the lead form** (`functions/api/lead.ts`) is a no-op unless a
  `LEAD_RATE_LIMIT_KV` KV namespace is bound in the Cloudflare Pages project — documented
  inline in that file.

## Pre-launch checklist

Derived from proposal.md's own QA tables (§22 QA DOD, §23 QA, Google Webmaster section).

- [ ] Resolve every `[[VERIFY]]` item above.
- [ ] Replace placeholder project data (`src/content/projects/en.ts`) with real projects, or
      keep the "concept study" framing if real photography isn't ready yet.
- [ ] Decide on and implement the translation backlog (see above), or explicitly launch
      English-first with RU/TH/HE as a fast-follow.
- [ ] Set real environment variables (`.env.example` at repo root, `bots/.env.example`) in
      the Cloudflare Pages project and wherever `bots/` is deployed.
- [ ] Verify Telegram bot end-to-end: every step, back/edit/restart, attachments, submit,
      staff-chat delivery, in all 4 languages.
- [ ] Verify WhatsApp bot the same way, once a Meta Business/Cloud API app is approved.
- [x] Run Lighthouse against a local build (mobile, 3 representative pages): Performance
      96-98, Accessibility/Best Practices/SEO 100/100/100, LCP 1.8-2.6s. See "Known minor
      gaps" above.
- [ ] Re-run Lighthouse/PageSpeed against the **deployed** site (mobile + desktop) once
      real hosting/CDN is live — cache headers and real-world network conditions differ
      from a local preview build.
  - [ ] Run axe-core (or similar) as a standalone pass against representative pages;
        confirm 0 critical/serious (Lighthouse's own axe-based a11y category is at 100
        on the 3 pages tested so far, but a dedicated pass gives full severity data).
- [ ] Verify in Google Search Console: sitemap submitted, no canonical/hreflang conflicts,
      structured data valid (Rich Results Test), mobile usability passes.
- [ ] Cross-browser/device pass: latest Chrome/Safari/Firefox, iOS Safari, Android Chrome,
      at 320–430px, 768px, and 1440–1920px.
- [ ] Decide on and wire up analytics (GA4/Yandex Metrica) behind the existing cookie
      consent gate, and PDPA/GDPR review of the Privacy Policy's actual data flows.
- [ ] Legal review of Terms of Service (governing law) and Privacy Policy (retention period).
- [ ] Populate `SAME_AS` social links once official profiles exist (proposal.md §21).
