# Homepage/Menu Variant Exploration (3 options, pick one)

**Priority:** P1
**Status:** Partial — all 3 variants built and live for comparison at
`/v1/`, `/v2/`, `/v3/`; picking one is a brand/taste decision for the
client, not something to decide unilaterally in code.

From the merged Part 2 addendum in `proposal.md` (§50 in the original
`proposal(NEW2).md`). A genuinely new, sizeable piece of work — not a
tweak to the existing homepage.

## Scope

Build three fully separate homepage variants, each a complete page with
its own menu, hero, section composition and visual style, all drawing from
the same underlying content files (no new content model needed — layout,
components and styling differ, not the data):

- [x] **`/v1/` — Editorial.** Architecture-magazine style: large serif
      typography, full-bleed single-image hero (no slider — a magazine
      "cover" feel), generous whitespace, minimal 5-item flat menu
      (Projects, Architecture & Design, Construction & Build, Koh Phangan,
      Journal). Services grouped by their existing `category` field
      (design vs. build/management) rather than inventing new groupings.
- [x] **`/v2/` — Premium/dark.** Dark `ink-900` chrome throughout,
      terracotta/gold accent, mega-menu with all 13 services (styled dark,
      same data as the live site's Header), light content cards on the
      dark page background for contrast, more technical/confident copy
      framing in the hero. Reuses `ServiceGrid`/`ProjectSlider`/
      `ProcessTimeline` as-is — the light-card-on-dark-chrome pattern reads
      as intentional premium contrast, not a styling mismatch.
- [x] **`/v3/` — Local Expert.** Light warm palette (existing stone/olive/
      terracotta tokens, olive-forward), the site's atmosphere background
      animation, geo-first flat menu exactly as specified (Villa Design on
      KP, Build Your Villa → Turnkey Projects, Interior & Landscape →
      Interior Design, Portfolio, Why Koh Phangan? → the Koh Phangan
      location page, Blog & Guides → Journal). Leads with the Koh Phangan
      location page's own intro copy and FAQs rather than inventing new
      "why us" content.

All three reuse the same underlying service/location/project/journal data
— no new content model, exactly as scoped. Verified: all three build
clean, no broken internal links (checked against the full site's link
graph, not just each page in isolation), real images render (8-16 per
page). Marked `noindex` on all three so they don't compete with the live
site for search visibility during comparison.

## After building

- [ ] Compare all three (internally, or with the client) against the same
      criteria — premium feel, conversion clarity, SEO/content fit. **This
      is a brand/taste call for a human, not something decided in code —
      left open deliberately.**
- [ ] Pick one.
- [ ] Delete the other two variant routes and their now-unused
      components — don't leave dead routes/variants in the shipped site.
- [ ] If the chosen variant's menu differs from what's live today, fold
      that into the same navigation decision `TASK-009-fix-audit-findings.md`
      raises (already resolved there as "keep current nav" — revisit only
      if the chosen variant's menu is preferred over that decision).

## Acceptance criteria

- [x] All three variants build and are reachable at their routes during
      the comparison period — confirmed in the production build.
- [ ] A decision is recorded (in this file, or `NOTES.md`) on which was
      chosen and why. **Awaiting a human decision.**
- [ ] Only the chosen variant remains in the codebase once decided.
