# Bot Integration (Telegram + WhatsApp)

**Priority:** P1
**Phase:** 5
**Status:** Done (implementation) — built, type-checked, and code-reviewed
line by line (14 Sep 2026: found and fixed 3 real bugs — see below). The
lead-form pipeline this bot integration shares with
(`functions/api/lead.ts`) was verified end-to-end against a local
`wrangler pages dev` run: honeypot rejection, field validation, and the
Telegram-delivery code path all confirmed working correctly (delivery
itself fails safely with a fake token, proving the full pipeline executes
— see `docs/tasks/TASK-009`). **What's left is explicitly the user's own
stated task, not more code:** a real conversation walkthrough with real
`TELEGRAM_BOT_TOKEN`/`WHATSAPP_ACCESS_TOKEN` credentials.
`bots/TEST_PLAN.md` is the exact manual test to run once those exist.

Structured project-intake bots (not generic AI chat) implementing:
`Language → Service → Location → Project Type → Description → Budget
(optional) → Timeline (optional) → Photos/files → Contact → Review/Edit →
Submit → Human handoff` — see `proposal.md` §15 BOT.

## Scope

- `bots/shared/flow.ts` — channel-agnostic state machine, in parity with
  the site's 13 services / locations.
- `bots/shared/i18n.ts` — full bot copy in EN/RU/TH/HE.
- `bots/telegram/` — a grammY bot, long-polling, inline keyboards for
  choice steps, deep-link contextual preselect (`?start=service_<slug>`).
- `bots/whatsapp/` — an Express webhook against the WhatsApp Cloud API,
  interactive list/button messages, numbered-reply fallback for language
  selection.
- The website's own lead form → `functions/api/lead.ts` (a Cloudflare Pages
  Function, not part of this bot codebase) forwards to the same Telegram
  staff chat.

## Outcome / what's left

Built, `tsc --noEmit` clean (`bots/npm run typecheck`).

### Bugs found and fixed in this review (14 Sep 2026)

- **Telegram**: typing plain text instead of tapping a button during a
  choice step (service/location/projectType/contactMethod) fell through
  to a `default` case that always re-showed the *language* prompt —
  confusing, and silently discarded the user's place in the flow. Now
  re-shows the actual pending question.
- **WhatsApp**: the service-selection list had 13 rows across 4 sections
  — WhatsApp's interactive list messages cap at **10 rows total**, a real
  Cloud API constraint, not a soft UI limit. This would have been
  rejected outright by the Graph API in production. Restructured into a
  category-picker (4 rows) → services-within-category (≤5 rows) two-step
  selection, and added a guard in `sendList()` that now throws immediately
  if this class of bug reoccurs, instead of failing silently against the
  live API later.
- **Telegram**: the deep-link contextual preselect
  (`?start=service_villa-design`) set `state.service` but nothing
  consumed it — the bot asked for a service anyway. Added
  `advanceFromLanguage()` to skip any already-filled step.

None of these three were caught by `tsc` — all found by reading the actual
conversation logic, not just type-checking it.

### Still not done — needs real credentials/testing, not more code review

- Real `TELEGRAM_BOT_TOKEN`/`WHATSAPP_ACCESS_TOKEN` and a real live
  conversation through every step, in all 4 languages — **`bots/TEST_PLAN.md`
  is the exact checklist to run**, written during this review so the next
  person with real credentials doesn't have to reconstruct it.
- Persistent session storage (currently an in-memory `Map` — fine for one
  process, documented swap point for Redis/KV in `bots/README.md`).
- WhatsApp has no deep-link equivalent to Telegram's `?start=service_...`
  contextual preselect at all yet (a different, larger feature — parsing
  a `wa.me` pre-filled text template — not a bug fix).
- `express`'s transitive `qs` dependency has an open moderate-severity
  advisory pending an Express major-version upgrade.

See `bots/README.md` for full detail.
