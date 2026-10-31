# OPERATOR v3.0 — Project Audit

Audit of the current codebase (v2.5) before the v3.0 upgrade. Date: 31 Oct 2026.

## 1. Architecture

| Area | Current state |
|---|---|
| Stack | React 19, TypeScript, Vite 8, Tailwind CSS v4, Framer Motion, Three.js, Lucide |
| Routing | Custom path router (`src/lib/router.ts`): `/` (single-page sections), `/projects/:id` (case studies), `/resume` (print view), 404. Section paths (`/projects`, `/contact`…) deep-link via `useSectionRouting`. Vercel rewrites all paths to `index.html`. |
| Content | Centralised in `src/data/*` (personal, projects, skills, experience, credentials, navigation, site). Components contain no portfolio facts. |
| Styling | CSS custom-property tokens for dark/light in `src/index.css`, mapped to Tailwind via `@theme inline`. Self-hosted variable fonts (Space Grotesk, Inter, JetBrains Mono). |
| Theme | Dark / Light / System, persisted in `localStorage`, applied before first paint by an inline script. |
| 3D | Plain Three.js globe (`hero/NetworkGlobe.tsx`), lazy-loaded; adaptive quality (high / low / SVG fallback), DPR cap, pauses off-screen and in hidden tabs, static frame under reduced motion, WebGL context-loss fallback. Labelled "decorative · not live data". |
| Interactive | Boot screen (once per session, skippable), command palette (Ctrl/⌘+K), terminal with real-data commands, relationship graph, architecture diagrams per project, resume mode. |
| Contact | Validated form → Firestore REST (optional) → Formspree fallback. Honeypot, minimum fill time, 60 s client cooldown, length limits. `firestore.rules` restricts to create-only. |
| SEO | Title/description/OG/Twitter tags, canonical, JSON-LD `Person`, `robots.txt`, `sitemap.xml`. |

## 2. What works (retain)

- Data-driven content model and honest empty states (nothing invented).
- Project case studies with interactive architecture diagrams built from each repo's README.
- Theme system, command palette, terminal, resume mode, boot screen, section tracker.
- Contact form verified end-to-end against a mocked endpoint (success state shown, payload correct).
- Type-check (`tsc -b`) and lint (`oxlint`) clean; no console errors across desktop / tablet / mobile in browser tests.

## 3. Issues found

| # | Issue | Severity | Action |
|---|---|---|---|
| 1 | Old F1 files survive when the ZIP is copied over an existing checkout and break `tsc` | High (build) | `cleanup-old-files.ps1`; delete-then-copy documented |
| 2 | Section headings use `h2`, sub-headings `h3`/`h4`, but the Experience card heading is `h4` under an `h3` sub-heading — fine; Credentials uses an `h3` label above `h3` cards | Low (a11y) | Normalise in v3.0 |
| 3 | No React error boundary — a runtime error in one section blanks the page | Medium | Add error boundary per route + lazy chunk |
| 4 | Largest JS: Three.js chunk ≈130 KB gzip (lazy), main ≈86 KB gzip, shared chunk ≈53 KB gzip | Medium (perf) | Keep globe lazy; consider deferring the globe until idle on mobile |
| 5 | No real project screenshots except one AI Malware Detector figure | High (content) | Needs assets from owner — see CONTENT_REQUIREMENTS.md |
| 6 | No certificate images or verification links; certificate cards say "verified credentials" | Medium (accuracy) | Change wording to "Certifications" until links exist |
| 7 | Email and LinkedIn differ between site and resume PDF | Medium (consistency) | Owner to confirm |
| 8 | Lighthouse / axe not yet run (tools unavailable in the build sandbox) | — | Owner to run locally; results go in SEO_AND_PERFORMANCE_REPORT.md |
| 9 | No OG image for social previews | Low | Generate a branded 1200×630 card |

## 4. Brief vs. current site — decisions (confirmed 31 Oct 2026)

| Brief asks for | Current state | Why it needs confirming |
|---|---|---|
| Research section | Removed on request | **Decision: keep removed** until paper details exist |
| SIH event name | Resume said "SIH 2025 (Internal)" | **Decision: "Smart India Hackathon 2026 — Internal Round"** (update the resume PDF) |
| Blog | None exists | **Decision: system built, section hidden** until a real article exists |
| Headline | Brief proposed "Cybersecurity Engineer …" | **Decision: "Cybersecurity & Digital Forensics Student · AI Security Enthusiast"** |
| Tools: Sysmon, Elasticsearch, Kibana | Not found in any project, resume or internship record | Not added; HTML & CSS added (VaultX, FORGE-X) |

## 5. Verified evidence used

- Resume PDF (`public/Paulson_Alex_Fernandes_Resume.pdf`, 30 Oct 2026).
- READMEs of: HoneyWatch, FORGE-X, AI-Malware-Detector, Secure-Password-Generator (VaultX), IPsec-VPN-Analyzer-Dashboard.
- Certificate image: Hack-X Club Zero-Day Award (owner-supplied; displayed as text only on request).
