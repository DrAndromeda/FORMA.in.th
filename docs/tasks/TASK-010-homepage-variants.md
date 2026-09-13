# Homepage/Menu Variant Exploration (3 options, pick one)

**Priority:** P1
**Status:** Not started

From the merged Part 2 addendum in `proposal.md` (§50 in the original
`proposal(NEW2).md`). A genuinely new, sizeable piece of work — not a
tweak to the existing homepage.

## Scope

Build three fully separate homepage variants, each a complete page with
its own menu, hero, section composition and visual style, all drawing from
the same underlying content files (no new content model needed — layout,
components and styling differ, not the data):

- [ ] **`/v1/` — Editorial.** Architecture-magazine style: large
      typography, full-bleed imagery, white space, minimal 5-item menu
      (Projects, Architecture & Design, Construction & Build, Koh Phangan,
      Journal).
- [ ] **`/v2/` — Premium/dark.** Dark mode, parallax, gold/olive accents,
      mega-menu with all 13 services, "confident and technical" tone.
- [ ] **`/v3/` — Local Expert.** Light, warm tropical palette, natural
      textures, geo-first flat menu (Villa Design on KP, Build Your Villa,
      Interior & Landscape, Portfolio, Why Koh Phangan?, Blog & Guides).

## After building

- [ ] Compare all three (internally, or with the client) against the same
      criteria — premium feel, conversion clarity, SEO/content fit.
- [ ] Pick one.
- [ ] Delete the other two variant routes and their now-unused
      components — don't leave dead routes/variants in the shipped site.
- [ ] If the chosen variant's menu differs from what's live today, fold
      that into the same navigation decision `TASK-009-fix-audit-findings.md`
      raises — don't decide the nav twice.

## Acceptance criteria

- [ ] All three variants build and are reachable at their routes during
      the comparison period.
- [ ] A decision is recorded (in this file, or `NOTES.md`) on which was
      chosen and why.
- [ ] Only the chosen variant remains in the codebase once decided.
