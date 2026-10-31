# Testing Report — 31 Oct 2026

Environment: verification build (esbuild + Tailwind standalone, same source as `vite build`) served locally, tested in headless Chromium (Playwright) with software WebGL. `tsc -b` and `oxlint` run on every change.

## Static checks

| Check | Result |
|---|---|
| `tsc -b` | Pass, 0 errors |
| `oxlint` | Pass, 0 warnings |
| `npm run build` (Vite) | Run on owner's machine — previously failed only because of stale F1 files; fixed by `cleanup-old-files.ps1` |

## Functional tests

| Test | Result |
|---|---|
| Home renders, globe canvas created | Pass |
| Theme switch dark ↔ light, persisted in `localStorage` | Pass |
| Command palette (Ctrl+K) search → opens FORGE-X case study | Pass |
| Deep link `/projects` scrolls to section | Pass |
| Project filter "AI / ML" → correct cards | Pass |
| Terminal commands (`whoami`, `projects`, unknown command) + self-typing demo | Pass |
| Contact validation (4 field errors on empty submit) | Pass |
| Contact submission end-to-end (mocked Formspree) → success state, correct payload | Pass |
| Resume PDF served (`%PDF-` header) | Pass |
| Recruiter page title, content (SIH 2026), no overflow on mobile | Pass |
| Blog and Research sections absent while data is empty/removed | Pass |
| Console errors across all of the above | None |

## Responsive tests

| Viewport | Result |
|---|---|
| 390×844 mobile (touch) | No horizontal overflow; drawer nav; compact hero |
| 820×1180 tablet | No horizontal overflow |
| 1100 / 1280 / 1440 / 1600 desktop | Navbar fits; section tracker from 1536 px |

## Browser compatibility

Tested: Chromium (Playwright). Not tested here: Firefox, Safari (macOS/iOS), Edge — please check on real devices. Features used (CSS `color-mix`, `mask-composite`, WebGL, `IntersectionObserver`) are supported in current versions of all four.

## Known issues / not tested

- Firestore delivery not tested against a real project (no credentials).
- Lighthouse and axe not run (unavailable in the sandbox).
- Real-device GPU performance of the globe not measured.
