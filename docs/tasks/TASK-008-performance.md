# Performance Optimization (Core Web Vitals)

**Priority:** P0
**Phase:** 8
**Status:** Partial — architecture follows every documented CWV practice; no live measurement yet

## Scope / what's already in place

- AVIF (WebP fallback via `astro:assets`) responsive images throughout,
  explicit width/height everywhere (no CLS from images).
- A single, correctly preloaded LCP image on the homepage — `<link
  rel="preload" as="image">` with `imagesrcset`/`imagesizes` matching
  exactly what the `<Image>` component itself requests at each viewport.
- Self-hosted variable fonts (Fraunces, Inter, IBM Plex Sans Thai, Heebo)
  via `@fontsource` — no external font-loading requests.
- Minimal JS: no client framework; the few vanilla `<script>` blocks
  (hero slider, mobile menu, cookie consent, project filter/slider) are
  small enough that Astro inlines them directly into the page rather than
  shipping separate bundles.
- CSS-only atmospheric background animation (no canvas/WebGL/video),
  respecting `prefers-reduced-motion`.

## What's left

- **Run Lighthouse/PageSpeed Insights against the actual deployed site**
  (mobile + desktop) and confirm LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1,
  Performance ≥ 90 — none of this has been measured against a live
  deployment yet, only reasoned about from the architecture.
- Re-check budget after RU/TH/HE content lands (`TASK-007`) and after real
  project photography replaces the current placeholder images
  (see `NOTES.md`).
- Diversify the hero slider's imagery (the audit found all 4 slides are
  similar villa-exterior stock shots — add interiors/construction/
  landscape/detail variety).
