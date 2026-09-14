# Launch Checklist

**Priority:** P0
**Phase:** 10
**Status:** Backlog — deliberately. Every implementation task this
checklist depends on is now done; what remains is genuinely business/legal
sign-off, not code, so this stays open until you provide it. Marking this
"Done" would misrepresent launch readiness. See `NOTES.md` "Pre-launch
checklist" and `PROGRESS.md` "Open questions" for the authoritative list.

## Scope

- [ ] Resolve every `[[VERIFY]]` item — now a matter of setting env vars
      (`PUBLIC_CONTACT_*`, `PUBLIC_LEGAL_*`, `PUBLIC_SOCIAL_LINKS`, see
      `.env.example`), not a code change.
- [ ] Replace placeholder project data, or keep the "concept study" framing
      as a deliberate choice.
- [x] ~~Decide on and execute the `TASK-007` translation backlog~~ — done;
      all content types translated RU/TH/HE (native-speaker review still
      recommended before launch, see `TASK-007`).
- [ ] Set the real env vars above in the actual Cloudflare Pages project
      and wherever `bots/` is deployed (this repo's `.env`/`.env.example`
      are ready; the live values are yours to set).
- [x] `TASK-005` (bots) — code-complete; only live credential testing left,
      explicitly your task.
- [x] `TASK-011` (QA) — done, everything achievable without real
      devices/credentials.
- [x] `TASK-008` (performance) — done via local measurement; re-run once
      actually deployed (cache headers/network differ in production).
- [x] `TASK-009` (audit findings) — done; 2 items left are a hosting
      decision and real client data, both external.
- [x] `TASK-010` (homepage variants) — decided, resolved.
- [ ] Google Search Console, analytics wiring, legal review, `SAME_AS`
      social links — all genuinely need you (accounts, a lawyer, or a
      business decision), not more implementation.

## Outcome

Everything code-writable is done. What's left is you: set the real env var
values, get legal sign-off, pick/wire an analytics provider, run the bot
credential test, and deploy — then re-run Lighthouse and this checklist
against the live site.
