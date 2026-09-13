# Launch Checklist

**Priority:** P0
**Phase:** 10
**Status:** Not started

The final gate before this goes live — see `NOTES.md` "Pre-launch checklist"
for the authoritative, currently-maintained list. Summarized here so it's
also visible as board work:

## Scope

- [ ] Resolve every `[[VERIFY]]` item (`grep -rn "\[\[VERIFY" src` from the
      repo root): real studio contact details in `src/lib/site.ts`, and
      dates/retention-period/governing-law in `src/content/legal/en.ts`.
- [ ] Replace placeholder project data (`src/content/projects/en.ts`) with
      real projects, or keep the explicit "concept study" framing.
- [ ] Decide on and execute the `TASK-007` translation backlog, or launch
      English-first with RU/TH/HE as a fast-follow — either is a legitimate
      call, but it should be a deliberate decision, not a default.
- [ ] Set real environment variables (`.env.example` at repo root,
      `bots/.env.example`) in the Cloudflare Pages project and wherever
      `bots/` is deployed.
- [ ] `TASK-005` and `TASK-011` (bots + QA) both signed off.
- [ ] `TASK-008` (performance) measured against the live deployment, not
      just architected.
- [ ] `TASK-009` (audit findings) fully resolved and re-verified.
- [ ] `TASK-010` (homepage variants) decided, with only the chosen one
      remaining in the codebase.
- [ ] Google Search Console: sitemap submitted, no canonical/hreflang
      conflicts, structured data valid (Rich Results Test), mobile
      usability passes.
- [ ] Decide on and wire up analytics (GA4/Yandex Metrica) behind the
      existing cookie-consent gate; PDPA/GDPR review of the Privacy
      Policy's actual data flows.
- [ ] Legal review of Terms of Service (governing law) and Privacy Policy
      (retention period).
- [ ] Populate `SAME_AS` social links once official profiles exist
      (`proposal.md` §21).

## Outcome

Not started. This is intentionally the last task to close — everything
above depends on earlier tasks.
