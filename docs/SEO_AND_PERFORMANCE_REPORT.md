# SEO & Performance Report

## SEO implemented

- Unique titles + descriptions per route (`src/lib/seo.ts`): home, each case study, recruiter, resume, blog posts.
- Canonical URL, Open Graph and Twitter tags updated per route; 1200×630 `og-image.png`.
- JSON-LD `Person` (name, URL, job title, location, university, sameAs, knowsAbout).
- `robots.txt` and `sitemap.xml` (home sections, recruiter, resume, six case studies).
- Semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`); one `h1` per page and no skipped heading levels (verified in browser).
- Descriptive `alt` text on content images; decorative images use `alt=""`.

Note: this is a client-rendered SPA. Google renders JavaScript, but other crawlers and link previews only see `index.html` meta. Pre-rendering (e.g. `vite-plugin-ssr` or a static export) would be the next step if per-page previews matter.

Domain used: `https://portfolio.paulsonfernandes.tech` — **confirm it is final** (see CONTENT_REQUIREMENTS.md).

## Lighthouse

**Not run yet.** Lighthouse could not be installed in the build sandbox. Run it on the deployed site (Chrome DevTools → Lighthouse, mobile + desktop) and record the scores here:

| Category | Mobile | Desktop |
|---|---|---|
| Performance | — | — |
| Accessibility | — | — |
| Best Practices | — | — |
| SEO | — | — |

## Bundle (verification build, minified + gzip)

| Chunk | Gzip | Loaded |
|---|---|---|
| Main (React, Framer Motion, app) | ≈ 86 KB | Initial |
| Three.js globe | ≈ 130 KB | Lazy, after first paint / during boot |
| Case study / recruiter / resume / post views | 4–14 KB each | On navigation |
| CSS | ≈ 13 KB | Initial |
| Fonts | ≈ 165 KB total (WOFF) | Two preloaded |

## Optimisations in place

Route-level code splitting; lazy globe with adaptive quality, DPR cap, off-screen/hidden-tab pause and SVG fallback; reduced-motion short-circuits; self-hosted subset fonts; WebP project images with lazy loading; no Firebase SDK.

## Possible next steps

- Convert fonts to WOFF2 (≈30 % smaller) — needs `woff2_compress`/`fonttools[woff]` with Brotli.
- Defer the globe on mobile until the browser is idle.
- Pre-render HTML for each route.

## Accessibility findings (browser-tested)

| Check | Result |
|---|---|
| Single `h1`, no skipped heading levels (home) | Pass |
| Buttons/links without an accessible name | None found |
| Images missing `alt` | None |
| Keyboard: skip link, palette, filters, tabs (arrow keys), graph & diagram nodes, modals (focus trap/Esc) | Implemented |
| Reduced motion | Boot skipped, globe static, all Framer/CSS motion off |
| Colour contrast | Tokens chosen for WCAG AA body text; verify with Lighthouse/axe |
