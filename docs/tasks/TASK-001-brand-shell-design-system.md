# Brand Shell & Design System

**Priority:** P0
**Phase:** 1
**Status:** Done

Foundational design tokens and primitives the rest of the site is built on.

## Scope

- Color palette (warm stone base, ink text, olive/terracotta accents) as
  Tailwind v4 `@theme` tokens in `src/styles/global.css`.
- Typography: self-hosted variable fonts — Fraunces (display), Inter
  (Latin body/UI), IBM Plex Sans Thai, Heebo (Hebrew) — via `@fontsource`
  packages, no external font requests.
- Fluid type scale (`clamp()`-based `h1`/`h2`/`h3`), 12/8/4-column responsive
  grid (`.content-grid`), consistent `.wrap` max-width/padding.
- CSS-only "atmosphere" background animation, respecting
  `prefers-reduced-motion`.
- `Button` and `Card`-equivalent UI primitives (`src/components/ui/`).

## Outcome

All of the above is in place and used consistently across every page
template. See `src/styles/global.css` and `src/components/ui/`.
