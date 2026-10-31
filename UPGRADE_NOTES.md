# Upgrade notes — F1 telemetry theme → OPERATOR // PORTFOLIO OS

## Before your first build

1. `npm install` — adds `three` and `@types/three` and refreshes `package-lock.json`.
2. `npm run lint && npm run build`.
3. Review the **Content to confirm** list below and update `src/data/*`.

## Content to confirm (nothing was invented — these need your input)

| Item | Where | Status |
|---|---|---|
| Email & LinkedIn | `personal.ts` | Site uses `azurepaulson06@gmail.com` and `/in/paulson-fernandes-754710378`; the resume PDF uses `paulsonfernandes.dev@gmail.com` and `/in/paulson-alex-fernandes754710378`. Pick one. |
| Availability line | `personal.ts` → `availability` | Set to "Open to internships & collaboration" — edit to match what you want. |
| SIH entry | `experience.ts`, `credentials.ts` | Uses the resume wording "Smart India Hackathon 2025 (Internal) — Core Team Member, August 2026". Change if it should read "SIH 2026". |
| Research | `research.ts` | Titles and domains only. Add abstract, methodology, contributions, publication status and DOI when they exist. The SSH paper is linked to HoneyWatch — remove if not applicable. |
| Workshops | `credentials.ts` | None listed (none found in existing data). |
| Burp Suite, Sysmon | `skills.ts` | Not added — not backed by any listed work yet. |
| Certificate images / verify links | `credentials.ts`, `public/certification-images/` | None present; cards show a clean placeholder until added. |
| Launched Global certificate | `credentials.ts` | Added from the resume; date not listed. |
| Project screenshots | `projects.ts` → `figures` | Only the AI Malware Detector feature-importance plot (from its repo) is shown. |

## Data corrections made

* **HoneyWatch GitHub URL fixed** — the old URL ended in a stray hyphen and returned 404.
* **IPsec VPN Analyzer Dashboard added** — listed on the resume with its repo, missing from the old site.
* **VaultX live demo added** — `scriptsynapse.github.io/Secure-Password-Generator/`, documented in its own README.
* **AI Malware Detector description updated** to match the v2 README (MySQL, YARA, sandboxed worker) — the old text described the v1 Flask/SQLite prototype.
* **Removed unverifiable stats** "Technologies 18" and "CTFs / Labs 12"; all metrics are now computed from the data files.
* Case-study content (problem, architecture, implementation, challenges) was written from each project's own README.

## Security fixes

* Deleted stray root `firebase.ts` that **hard-coded the Firebase config** for project `portfolio-18683`. It is still in git history — restrict that API key to your domains in Google Cloud Console and deploy `firestore.rules`.
* Firebase is now Firestore-only, loaded lazily on contact submit, configured exclusively through `VITE_FIREBASE_*`.
* Added `firestore.rules` (create-only, validated fields) and security headers in `vercel.json`.
* All rendered external links pass through `safeUrl()` (https / mailto / same-site only).

## Files

**Removed (F1 / obsolete):** `StartingSequence`, `TelemetryHUD`, `LapIndicator`, `DrsNotification`, `CustomCursor`, `DriverProfile`, `PitWall`, `SkillsTelemetry`, `TechSystems`, `ExperienceTimeline`, `Certifications`, old `Hero`, `TechnicalBackground`, `TelemetrySparkline`, `StatCard`, `StatusDot`, `SectionHeading`, `ProjectCard`, `FormField`, `useDrsEasterEgg`, `useScrollTelemetry`, `data/systems.ts` (F1 machine map; its certifications and "current development" items were moved), unused `src/assets/*`, stray root `Contact.tsx` / `firebase.ts` / `main.tsx` / `vite-env.d.ts` / `firebase-integration.patch`, stale `resume.pdf.placeholder.txt`.

**Kept & adapted:** `useSectionRouting` (URL ↔ section sync, now fixes deep links), `useReducedMotion`, `useCountUp`, `useMagneticHover`, `BrandIcons`, `lib/firebase.ts`, all `data/*` content, resume PDF, profile photo.

**New:** design tokens in `index.css`; `lib/` (ThemeProvider, theme-context, router, url, format); hooks `useActiveSection`, `useDeviceProfile`, `useHotkeys`; components `hero/*`, `sections/{About,Arsenal,RelationshipGraph,Experience,Research,Credentials}`, `project/*`, `resume/ResumeView`, `features/Terminal`, `layout/{CommandPalette,ThemeToggle,NotFound}`, `ui/{primitives,Modal,ProjectIcon}`; data `research.ts`, `credentials.ts`, `site.ts`; `firestore.rules`, `robots.txt`, `sitemap.xml`, new favicon.

## Visual upgrade (v2.1)

* **Boot screen** (`layout/BootScreen.tsx`) — once per session, skippable, real-data log lines, progress tied to real loading. Replay with `?boot=1`.
* **Hero** — larger globe inside a HUD frame (coordinates of the home node, local clock), decrypting name (`ui/ScrambleText.tsx`), typed focus line (`hero/RoleTyper.tsx`), dashboard strip, tools ticker (`ui/Marquee.tsx`).
* **Depth** — drifting aurora + film-grain backdrop, cursor-following spotlight borders on every panel (`lib/spotlight.ts`), giant outlined section numbers.
* **Project banners** — animated illustration per project (`ui/ProjectVisual.tsx`): radar, fingerprint scan, PE hex dump, vault dial, VPN tunnel. These are abstract illustrations, not screenshots.
* **Fonts self-hosted** in `public/fonts` (with OFL licences).

## v2.2

* Name shown as **Paulson Alex Fernandes** everywhere (navbar, hero, titles).
* New **Leadership** section (`sections/Leadership.tsx`) with the SIH 2025 (Internal) Core Team and CIPHATHON 26 roles; the Experience timeline now shows experience + education.
* Achievements reduced to **SIH — 1st place in college** and **AtmOS — Top 10** (add year / event details in `credentials.ts`).
* **Technical arsenal** reorganised for recruiters: most-used tools (counted from projects), every tool at a glance, then a tabbed "proof of use" table.
* More motion: word-by-word headings, parallax section numbers, 3D card tilt, scroll-drawn timeline, animated bars and badges — all disabled under reduced motion.

## v2.3 — dependency clean-up (`npm audit`)

* Removed the `firebase` SDK. The contact form now writes to Firestore through its REST API (`src/lib/firebase.ts`), which needs only `VITE_FIREBASE_API_KEY` and `VITE_FIREBASE_PROJECT_ID`. The same `firestore.rules` apply.
* Removed unused `autoprefixer` and `postcss` (Tailwind v4's Vite plugin does not need them).

## v2.4

* **Build fix:** old F1 files left in an existing checkout break `tsc`. Run `cleanup-old-files.ps1` once (or delete the files listed in it).
* Achievements: AtmOS removed; **Zero-Day Award — Hack-X Club** added (text only). Add the date in `credentials.ts` when known.

## v2.5

* Experience section now shows work experience only; education stays in About and the resume view.

## v2.5

* Removed: Education from the Experience section (still in About and the resume), the "Currently building" panel, and the Research section (plus its data, graph nodes, terminal command and palette entry).
* **Organisation:** Experience and Leadership merged into one section (A · Professional experience, B · Leadership); Skills added to the navbar; section numbers now come from `navigation.ts`; a section tracker on wide screens shows where you are.
* **Motion:** hero parallax on scroll, light beam as each section enters, cursor-following glow, self-typing terminal demo (`whoami`), staggered experience bullets and tool chips.
