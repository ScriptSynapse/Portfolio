# OPERATOR // PORTFOLIO OS — v3.0

Portfolio of **Paulson Alex Fernandes** — Cybersecurity · Digital Forensics · AI / ML · Software Engineering.

> *Securing Systems. Investigating Threats. Building Intelligence.*

A security-operations-centre style portfolio: an interactive 3D network globe, dashboard panels, project case studies with explorable architecture diagrams, a relationship graph, a working terminal, a command palette and a printable resume mode — in dark, light and system themes.

---

Full documentation lives in [`/docs`](docs/) — start with `PROJECT_AUDIT.md` and `CONTENT_REQUIREMENTS.md`.

## Features

| Area | What it does |
|---|---|
| **Boot screen** | "Portfolio OS" boot sequence: progress ring tied to real loading (fonts + 3D chunk), log lines built from real data, decrypting name, shutter reveal. Once per session, skippable with any key/click, never shown with reduced motion. Add `?boot=1` to the URL to replay it |
| **Hero** | Identity, CTAs, a Three.js network globe (decorative, not live data) with an SVG fallback, system-status and operator-metrics panels |
| **Projects** | Category filters, animated cards, dedicated case-study pages (`/projects/<id>`) with problem, solution, interactive architecture diagram, implementation, features, figures and challenges |
| **Technical arsenal** | Skills grouped by domain, each with how it was used and links to the projects that demonstrate it — no percentage bars |
| **Intelligence graph** | Clickable graph of technologies → projects → domains |
| **Experience & leadership** | Internship case card with scroll-drawn progress, plus leadership roles |
| **Credentials vault** | Achievements + certifications with image preview modal and verification links |
| **Contact** | Validated form → Firestore (optional) or Formspree, honeypot + timing + cooldown spam protection |
| **Command palette** | `Ctrl + K` / `⌘ K` — sections, projects, resume, theme, links |
| **Terminal** | `help`, `whoami`, `about`, `projects [id]`, `skills`, `experience`, `certifications`, `contact`, `resume`, `goto`, `theme`, `clear` |
| **Resume mode** | `/resume` — clean HTML resume generated from the same data, print-ready, plus PDF download |
| **Themes** | Dark / Light / System, persisted in `localStorage`, applied before first paint |

Every number on the site (projects, tools, certifications…) is **computed from the data files** — nothing is typed in by hand.

## Tech stack

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · Framer Motion · Three.js · Lucide · Firestore REST API (optional)

Fonts (Space Grotesk, Inter, JetBrains Mono) are self-hosted from `public/fonts` as Latin-subset variable WOFF files (SIL OFL) — no Google Fonts request.

Plain Three.js is used instead of React Three Fiber: the globe is a single self-contained scene, so one dependency is lighter and simpler. The globe is code-split and only downloaded when needed. The contact form talks to Firestore over its REST API, so the Firebase SDK (and its large dependency tree) is not installed.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint       # oxlint
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

Node 20.19+ (or 22.12+) is required by Vite 8.

## Editing content

All content lives in `src/data/` — components never need to change.

| File | Controls |
|---|---|
| `personal.ts` | Name, designation, tagline, bio, education, links, availability, "currently building" |
| `projects.ts` | Projects, categories, case-study content, architecture diagrams, figures, demo links |
| `skills.ts` | Technical arsenal (with usage notes and project links) |
| `experience.ts` | Timeline entries |
| `credentials.ts` | Certifications (add `image` / `credentialUrl`) and achievements |
| `navigation.ts` | Section order and navigation labels |

Assets:

* Resume → `public/Paulson_Alex_Fernandes_Resume.pdf` (path set in `personal.ts`)
* Certificate images → `public/certification-images/` then set `image` in `credentials.ts`
* Project screenshots → `public/project-images/` (WebP recommended) then add to `figures` in `projects.ts`

## Environment configuration

Copy `.env.example` to `.env`. All variables are optional.

| Variable | Purpose |
|---|---|
| `VITE_FORM_ENDPOINT` | Contact-form endpoint. Defaults to the existing Formspree form |
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID` | Enable Firestore delivery of contact messages (collection `contactMessages`) |

Security notes:

* Only `VITE_*` variables reach the browser — never put private secrets in them.
* Firebase web config identifies your project but does not protect it; **deploy `firestore.rules`** (`firebase deploy --only firestore:rules`) before enabling Firestore. The rules allow creating well-formed messages only and block all reads/updates/deletes from the client.
* In Google Cloud Console, restrict the Firebase browser API key to your domains (HTTP referrers).
* `.env` and `.env.*` are git-ignored.

## Deployment (Vercel)

1. Import the repository at vercel.com/new — framework preset **Vite** (build `npm run build`, output `dist`).
2. Add any environment variables from `.env.example` in *Project → Settings → Environment Variables*.
3. Deploy. `vercel.json` rewrites every path to `index.html` (so `/projects/honeywatch` and `/resume` work) and adds security and caching headers.

Any static host works the same way as long as unknown paths fall back to `index.html` (Netlify: `/* /index.html 200`).

## Accessibility & performance

* Semantic landmarks, skip link, visible focus states, labelled controls, focus-trapped dialogs
* Full keyboard support: navigation, palette, filters, timeline, graph and architecture nodes
* `prefers-reduced-motion` respected everywhere — the globe renders a single static frame
* Globe pauses when off-screen or the tab is hidden, caps device-pixel-ratio, reduces detail on small / low-power devices and falls back to SVG without WebGL or with data-saver on
* Light and dark palettes were chosen for WCAG AA text contrast

## Project structure

```text
src/
├── App.tsx                  route switch (home · /projects/:id · /resume)
├── main.tsx
├── index.css                design tokens (dark/light), utilities, print styles
├── data/                    all portfolio content
├── types/portfolio.ts
├── lib/                     theme, router, Firestore REST helper, url helpers
├── hooks/                   active section, section routing, device quality, hotkeys…
└── components/
    ├── layout/              Navbar, ThemeToggle, CommandPalette, Footer, NotFound
    ├── hero/                Hero, GlobeStage, NetworkGlobe (Three.js), GlobeFallback, StatusPanels
    ├── sections/            About, Projects, Arsenal, RelationshipGraph, Experience (+ Leadership cards), Credentials, Contact
    ├── project/             ProjectDetail, ArchitectureDiagram
    ├── resume/              ResumeView
    ├── features/            Terminal
    └── ui/                  primitives (Panel, Tag, Section…), Modal, icons
```

## Author

**Paulson Alex Fernandes** — B.Tech CSE (Cybersecurity and Forensics), MIT World Peace University · GitHub [@ScriptSynapse](https://github.com/ScriptSynapse)

## License

No open-source licence is specified. Unless one is added, public visibility of this repository is not permission to copy or reuse the code or design.
