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

Recommended order, by SEO/commercial value:

1. **Services (13 pages × 3 languages)** — highest commercial value, primary landing pages.
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
- **Lighthouse/PageSpeed and axe-core have not been run** against a live deployment — the
  architecture follows every documented CWV/a11y practice (AVIF + responsive images,
  self-hosted variable fonts, a single preloaded LCP image with matching srcset, minimal
  inlined JS, semantic HTML, visible focus states, `prefers-reduced-motion` respected
  throughout), but actual scores need measuring post-deploy, not assumed.
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
- [ ] Run Lighthouse/PageSpeed against the deployed site (mobile + desktop) and confirm
      LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, Performance ≥ 90.
  - [ ] Run axe-core (or similar) against representative pages; confirm 0 critical/serious.
- [ ] Verify in Google Search Console: sitemap submitted, no canonical/hreflang conflicts,
      structured data valid (Rich Results Test), mobile usability passes.
- [ ] Cross-browser/device pass: latest Chrome/Safari/Firefox, iOS Safari, Android Chrome,
      at 320–430px, 768px, and 1440–1920px.
- [ ] Decide on and wire up analytics (GA4/Yandex Metrica) behind the existing cookie
      consent gate, and PDPA/GDPR review of the Privacy Policy's actual data flows.
- [ ] Legal review of Terms of Service (governing law) and Privacy Policy (retention period).
- [ ] Populate `SAME_AS` social links once official profiles exist (proposal.md §21).
