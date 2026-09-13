Closes #

<!--
  Use "Closes #123" / "Fixes #123" / "Resolves #123" if this PR finishes the
  issue — GitHub auto-closes it on merge, and this is what moves the board
  card to Done. Use "Part of #123" instead if this is only partial progress
  (it won't auto-close the issue, and the board-status automation only
  reacts to a genuine closing keyword — see docs/WORKFLOW.md §6).
-->

## What changed

<!-- Short description of the change and why. -->

## Screenshots

<!-- Required for any visual/content change. Delete this section if the PR is purely non-visual (config, scripts, docs). -->

## Checklist

- [ ] `npm run check` passes (Astro type check)
- [ ] `npm run build` passes
- [ ] Checked in a browser for any UI/content change (`npm run dev` /
      `npm run preview`) — this is a content-heavy, multilingual, RTL-aware
      site; a type check passing doesn't mean it looks right.
- [ ] If this touches `functions/api/lead.ts` or `bots/`: tested against a
      real request/webhook, not just `tsc --noEmit`.
