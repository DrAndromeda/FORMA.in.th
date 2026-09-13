# Bot Integration (Telegram + WhatsApp)

**Priority:** P1
**Phase:** 5
**Status:** Partial — built and type-checked, not deployed or tested against real accounts

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

Built, `tsc --noEmit` clean (`bots/npm run typecheck`). **Not yet done**:

- Real `TELEGRAM_BOT_TOKEN`/`WHATSAPP_ACCESS_TOKEN` credentials and
  end-to-end testing of every step, in all 4 languages, including
  back/edit/restart and attachments.
- Persistent session storage (currently an in-memory `Map` — fine for one
  process, documented swap point for Redis/KV in `bots/README.md`).
- WhatsApp has no deep-link equivalent to Telegram's `?start=service_...`
  contextual preselect yet.
- `express`'s transitive `qs` dependency has an open moderate-severity
  advisory pending an Express major-version upgrade.

See `bots/README.md` for full detail.
