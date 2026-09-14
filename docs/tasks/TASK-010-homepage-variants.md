# Homepage/Menu Variant Exploration (3 options, pick one)

**Priority:** P1
**Status:** Done — rejected. Decided (14 Sep 2026): keep the single
homepage already built from `proposal.md` Part 1's actual spec. All 3
variants built, compared, and deleted — see below.

## Decision

This task only existed because a *later* addendum (Part 2, merged in from
the second `proposal(NEW2).md` audit file — see `docs/Proposals.md`
"History") asked for a 3-variant exploration on top of the real spec. Part
1 of `proposal.md` never asked for this — it specifies one homepage, which
was already built correctly (`src/templates/HomePage.astro`, live at `/`).

Explicitly decided to keep that single homepage and not pursue the Part 2
addendum's variant exploration. All three variants (`/v1/` Editorial,
`/v2/` Premium-dark, `/v3/` Local Expert) were built, verified working,
compared, and then deleted in full — no dead routes or unused
variant-specific components left in the codebase.

## What this confirms about the live homepage

No changes needed — `/` already matches the original spec: hero slider,
direct answer, services grid, project slider, process timeline, why-us,
locations, journal, final CTA, with the current full mega-menu nav (see
`TASK-009-fix-audit-findings.md`'s separate, already-resolved nav
decision — unaffected by this task's outcome).

## Original scope (for history — not pursued)

Build three fully separate homepage variants, each with its own menu,
hero, section composition and visual style: an Editorial variant (large
serif type, minimal 5-item menu), a Premium/dark variant (dark chrome,
mega-menu, technical tone), and a Local Expert variant (warm palette,
geo-first menu). All three were built and confirmed working (clean build,
no broken links, real images) before being rejected in favor of the
original single-homepage spec.

## Acceptance criteria

- [x] A decision is recorded — rejected, single homepage from `proposal.md`
      Part 1 kept as-is.
- [x] No variant routes remain in the codebase.
