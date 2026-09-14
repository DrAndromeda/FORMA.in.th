# Manual test plan — Telegram & WhatsApp intake bots

This is the step-by-step a human needs to run through to actually verify
the bots, since neither can be tested live from here (no real
`TELEGRAM_BOT_TOKEN`/`WHATSAPP_ACCESS_TOKEN` in this environment — see
`bots/README.md` for credential setup). Everything below was verified by
direct code review (see "What was checked" at the bottom) and by
`npm run typecheck`, but **has not been run against a live Telegram/
WhatsApp conversation.** Treat every checkbox as unverified until someone
actually clicks through it.

## Before you start

- [ ] `bots/.env` filled in per `bots/.env.example`, at minimum
      `TELEGRAM_BOT_TOKEN` + `TELEGRAM_STAFF_CHAT_ID` for the Telegram
      pass.
- [ ] `cd bots && npm install && npm run typecheck` passes (should already
      — re-confirm after any edit).
- [ ] You have access to the staff chat (`TELEGRAM_STAFF_CHAT_ID`) to
      confirm submitted leads actually arrive.

## Part 1 — Telegram (`npm run telegram`, long-polling, no public URL needed)

### 1.1 Happy path, English, no attachments

1. Message the bot `/start`. **Expect**: language picker (4 inline
   buttons: English / Русский / ไทย / עברית).
2. Tap **English**. **Expect**: a list of all 13 services as inline
   buttons, 2 per row.
3. Tap any service (e.g. Villa Design). **Expect**: 5 location buttons
   (Koh Phangan / Koh Samui / Koh Tao / Bali / Other).
4. Tap a location. **Expect**: 6 project-type buttons.
5. Tap a project type. **Expect**: a free-text prompt for project
   description.
6. Type a description (a real sentence, not "test"). **Expect**: budget
   prompt, noting it's optional / "skip" works.
7. Type `skip`. **Expect**: timeline prompt.
8. Type `skip`. **Expect**: attachments prompt.
9. Type `skip`. **Expect**: prompt for your name.
10. Type a name. **Expect**: 6 contact-method buttons (Telegram/WhatsApp/
    Email/Phone call — note: only 4 unique methods but Telegram bot's
    `askContactMethod` currently only offers `telegram, whatsapp, email,
    phone` as 4 buttons, 2 per row — confirm all 4 render, not 6; the "6
    project-type" count in step 4 is separate from this 4-item contact
    method list, don't confuse the two when checking).
11. Tap a method. **Expect**: prompt for the actual contact value.
12. Type e.g. an email or phone number. **Expect**: a full review summary
    listing every field you entered.
13. Type `submit`. **Expect**: a thank-you message in English, **and** a
    new message in the staff chat with every field, correctly labeled,
    channel = telegram.
14. **Verify in the staff chat specifically**: service/location/project
    type show as raw slugs (`villa-design`, `koh-phangan`) not display
    labels — this is intentional (`formatLeadForStaff` in
    `shared/flow.ts` uses the slug directly), confirm that's acceptable
    for whoever reads the staff chat, or note it as a follow-up if not.

### 1.2 Back-of-house behaviors

- [ ] **Typing instead of tapping a button** during the service/location/
      project-type/contact-method steps: send plain text instead of
      tapping. **Expect** (post-fix, verify this specifically — this was
      a real bug found and fixed in this review): the bot re-shows the
      *same* choice again, not the language picker.
- [ ] **`/restart` mid-flow**: start a conversation, get partway through
      (e.g. past language selection), send `/restart`. **Expect**: your
      language selection is remembered, and you're taken straight back to
      the service picker (not language selection again).
- [ ] **`/start` mid-flow**: same test but with `/start` instead.
      **Expect**: a full reset — language picker shown again, no memory
      of the previous session.
- [ ] **Deep-link preselect**: message the bot via a link like
      `https://t.me/<bot_username>?start=service_villa-design`. **Expect**
      (post-fix, verify specifically): after picking a language, the bot
      skips straight to the *location* prompt — no service-selection
      screen at all, since `villa-design` is already set. This was a real
      gap found during code review (the preselect was captured by
      `applyStartPayload` but nothing consumed it to skip a step) and
      fixed via a new `advanceFromLanguage()` helper — confirm the fix
      actually behaves this way in a live conversation, since it's only
      been verified by reading the code and `tsc`, not by running it.
- [ ] **Photos/documents during the attachments step**: send 2-3 photos
      and 1 document. **Expect**: an incrementing "N attachment(s)
      received" reply after each, and all of them re-sent to the staff
      chat individually after submit.
- [ ] **Photos sent at the wrong step** (e.g. during "description"):
      **Expect**: silently ignored (`bot.on('message:photo')` returns
      early if `state.step !== 'attachments'`) — confirm this doesn't
      also block the text-based flow from continuing normally.
- [ ] **Review step, "edit"**: at the review screen, type `edit`.
      **Expect**: sent back to service selection, but note **all
      previously entered data is NOT cleared** — going through service →
      location → ... again will overwrite each field as you re-answer,
      but if you then jump straight to `submit` without re-answering every
      step (not currently possible via the UI, but worth confirming there's
      no way to skip), verify no stale data leaks into the final submission.
- [ ] **Review step, "restart"**: type `restart` at the review screen.
      **Expect**: same as `/restart` command — locale kept, sent to
      service selection, all other fields cleared.
- [ ] **Submit with incomplete data**: shouldn't be reachable through the
      normal flow (every required field is collected before review), but
      confirm `isComplete()`'s check actually blocks submission if you
      find any way to reach `review` with a gap (e.g. by exploiting the
      typing-during-a-choice-step behavior before this review's fix).

### 1.3 All 4 languages

Repeat the happy path (§1.1) once each in Russian, Thai and Hebrew,
checking specifically:

- [ ] Every prompt and button label is in the selected language (no
      English leaking through).
- [ ] The "skip" keyword recognition works for that language's actual
      word (`пропустить`, `ข้าม`, `דלג`) — try both the language-specific
      word and confirm the English `skip` does *not* also work
      (currently it does, in every language, since the checks are
      `['skip', 'пропустить', 'ข้าม', 'דלג'].includes(lower)` — decide if
      that's desired flexibility or should be locale-strict).
- [ ] Hebrew specifically: message display direction in the Telegram
      client (Telegram handles RTL rendering itself; this just confirms
      nothing looks reversed or broken).

## Part 2 — WhatsApp (`npm run whatsapp`, needs a public HTTPS URL + a Meta app)

Setup this needs first (see `bots/README.md` §WhatsApp): a Meta developer
app, `WHATSAPP_ACCESS_TOKEN`/`WHATSAPP_PHONE_NUMBER_ID` from it, a chosen
`WHATSAPP_VERIFY_TOKEN`, and a tunnel (ngrok/cloudflared) or real
deployment exposing `/webhook` publicly, registered in the Meta app
dashboard.

### 2.1 Webhook verification

- [ ] In the Meta dashboard, point the webhook URL at
      `https://<your-tunnel-or-domain>/webhook` with your chosen verify
      token. **Expect**: Meta's verification GET request succeeds (green
      checkmark in the dashboard) — this exercises
      `app.get('/webhook', ...)`.

### 2.2 Happy path, English, no attachments

Send a WhatsApp message to the business number, then:

1. **Expect**: a text message with the language prompt and "Reply with a
   number" (1-4), since WhatsApp doesn't get inline buttons for this step
   — confirm the numbered-reply parsing actually works by replying `1`.
2. **Expect**: an interactive **list** message titled with a "Category"
   section (Design/Build/Management/Specialist) — **this is a fix made
   during this review** (the original 13-service single list would have
   been rejected by the Graph API outright, since WhatsApp caps
   interactive lists at 10 rows total). Confirm the list actually renders
   with exactly 4 rows.
3. Tap a category (e.g. "Design"). **Expect**: a second list message with
   just that category's services (Design has 4: Architecture, Villa
   Design, Interior Design, Landscape Design).
4. Tap a service. **Expect**: a list message with 5 locations.
5. Tap a location. **Expect**: a list message with 6 project types.
6. Tap a project type. **Expect**: a text prompt for description.
7. Reply with a description. **Expect**: budget prompt.
8. Reply `skip`. **Expect**: timeline prompt.
9. Reply `skip`. **Expect**: attachments prompt.
10. Reply `skip`. **Expect**: name prompt.
11. Reply with a name. **Expect**: a **button** message (not list) with 3
    options: WhatsApp / Email / Phone call.
12. Tap one. **Expect**: prompt for the contact value.
13. Reply with a value. **Expect**: full review summary as a text message.
14. Reply `submit`. **Expect**: a thank-you message, **and**, only if
    `WHATSAPP_STAFF_FORWARD_CHAT_ID` + `TELEGRAM_BOT_TOKEN` are both set,
    a forwarded message in the Telegram staff chat. **If neither is set**,
    confirm the lead is at least visible in the WhatsApp process's own
    stdout log (`submitLead`'s fallback) — don't treat a missing Telegram
    forward as broken if you haven't configured that forwarding.

### 2.3 Back-of-house behaviors

- [ ] **Send a photo or document during the attachments step**:
      **Expect**: "N attachment(s) received", and confirm
      `getMediaUrl` actually resolves a downloadable URL (log it/check
      manually — these URLs expire, see the known-gaps note in
      `bots/README.md`, so verify promptly after sending).
- [ ] **Send an unsupported message type** (e.g. a voice note) during any
      list/button-driven step: **expect** the bot to just re-send the
      same prompt rather than crash or hang (the code has no explicit
      handling for audio/video/sticker/location message types — falls
      through to the existing "invalid, re-ask" paths by default; confirm
      this is actually true rather than a silent hang, since
      `res.sendStatus(200)` is sent before processing, so a hang wouldn't
      even show up as an HTTP error to Meta).
- [ ] **`restart` at the review step**: same expectations as Telegram's.
- [ ] **`edit` at the review step**: same expectations as Telegram's,
      but verify the category→service two-step re-selection works
      correctly the second time through too.
- [ ] **A message after a completed submission** (`state.step === 'done'`):
      **expect** a fresh language prompt, confirming the session actually
      resets rather than getting stuck.

### 2.4 All 4 languages

Same as Telegram §1.3 — repeat happy path once per language, checking the
same things, plus:

- [ ] The numbered-reply language selection (`1`-`4`) at the very start
      is language-agnostic by design (it's shown before a language is
      known) — confirm the prompt text itself (which is one fixed
      multilingual string, `LANGUAGE_PROMPT`) actually displays legibly
      in a WhatsApp client (no mangled RTL/Thai rendering in the combined
      4-language prompt line).

## Part 3 — Cross-cutting

- [ ] **Session loss on process restart**: start a conversation on either
      channel, get partway through, kill and restart the bot process
      (`Ctrl+C` then `npm run telegram` / `npm run whatsapp` again), then
      send another message. **Expect**: the conversation starts over from
      language selection (in-memory `Map` is empty after restart — this is
      documented, known behavior, not a bug — just confirm it fails
      *gracefully* rather than crashing).
- [ ] **Contextual preselect from the website**: click "Start a Project"
      from a live service page and confirm the resulting link/deep-link
      actually reaches the bot with the right slug in it. **Given the gap
      found in §1.2 above (preselected service is captured but never used
      to skip a prompt), decide whether that's acceptable for launch or
      needs fixing before relying on this feature.**

## What was checked (code review, no live run)

- `npm run typecheck` — 0 errors, both before and after the fixes below.
- Re-read `telegram/bot.ts`, `whatsapp/webhook.ts`, `whatsapp/graph-api.ts`,
  `shared/flow.ts` line by line for logic bugs, not just types.
- **Fixed**: Telegram's `message:text` handler had a `default` case that
  always re-showed the language prompt, even when the pending step was a
  button-driven choice (service/location/projectType/contactMethod) —
  confusing if a user types instead of tapping. Now re-shows the actual
  pending question, matching how the WhatsApp webhook already behaved.
- **Fixed**: WhatsApp's service-selection list had 13 rows across 4
  sections — the Cloud API's interactive list messages cap at 10 rows
  total, so this would have been rejected by Meta's API in production.
  Restructured into a category-picker (4 rows) → services-within-category
  (≤5 rows) two-step selection. Added a guard in `sendList()` itself that
  throws immediately if a future change re-introduces a >10-row list,
  instead of failing silently against the live API.
- **Fixed**: the Telegram deep-link contextual preselect
  (`?start=service_villa-design`) set `state.service` but nothing in the
  flow consumed it — the bot asked for a service anyway, right after the
  user arrived specifically to skip that. Added `advanceFromLanguage()`,
  called after language selection, which skips straight to whichever step
  isn't already filled. WhatsApp has no equivalent deep-link mechanism at
  all yet (documented as a known gap in `bots/README.md` — `wa.me`
  pre-filled text would need actual parsing logic, a separate feature).
- Confirmed `LOCATIONS` (5) and `PROJECT_TYPES` (6) both stay within
  WhatsApp's 10-row list limit as single lists — no restructuring needed
  for those two.
