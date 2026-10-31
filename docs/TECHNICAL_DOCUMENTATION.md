# Technical Documentation

## Architecture

```
index.html ── inline theme script, meta/OG/JSON-LD, font preloads
src/main.tsx ── ThemeProvider → App
src/App.tsx ── boot screen, navbar, palette, section rail, route switch (ErrorBoundary + Suspense), footer
  ├─ Home: Hero · About · Projects · Arsenal · RelationshipGraph · Experience (+Leadership) · Credentials · Blog* · Contact
  ├─ /projects/:id → ProjectDetail (lazy)
  ├─ /recruiter    → RecruiterView (lazy)
  ├─ /resume       → ResumeView (lazy)
  ├─ /blog/:slug   → PostView (lazy, only when posts exist)
  └─ 404           → NotFound
* Blog renders nothing while `data/blog.ts` is empty.
```

## Dependencies

| Package | Purpose |
|---|---|
| react, react-dom 19 | UI |
| framer-motion 12 | Animation, scroll-linked effects |
| three 0.179 | Hero globe (lazy chunk) |
| lucide-react | Icons |
| vite 8, @vitejs/plugin-react, @tailwindcss/vite, tailwindcss 4, typescript 6, oxlint | Tooling |

Removed in v2.3: `firebase`, `autoprefixer`, `postcss` (see CHANGELOG).

## External APIs

| API | Use | Auth | Failure handling |
|---|---|---|---|
| Firestore REST `:commit` | Contact form (optional) | Web API key + `firestore.rules` | Falls back to Formspree |
| Formspree | Contact form | Form ID | Error state with mailto link |

No tokens or secrets are shipped to the browser.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_FORM_ENDPOINT` | No | Contact endpoint (defaults to the existing Formspree form) |
| `VITE_FIREBASE_API_KEY` | No | Enables Firestore delivery |
| `VITE_FIREBASE_PROJECT_ID` | No | Enables Firestore delivery |

## Routing

`src/lib/router.ts` — tiny History-API router; `navigate()`, `goToSection()`, `useRoute()`. Section paths (`/projects`, `/contact` …) are mirrored by `useSectionRouting` with `replaceState`. `vercel.json` rewrites every path to `index.html`.

## Data management

All content lives in `src/data/`:

| File | Content |
|---|---|
| `personal.ts` | Identity, headline, summary, links, interests, objectives |
| `projects.ts` | Projects, case studies, architecture, results, limitations, planned work |
| `skills.ts` | 10 skill categories with evidence links and levels |
| `experience.ts` | Internship, leadership, education (`timeline`, `careerTimeline`, `leadership`) |
| `credentials.ts` | Certifications and achievements |
| `blog.ts` | Blog posts (empty) |
| `navigation.ts` | Section order and numbering |
| `site.ts` | Build date and derived metrics |

Rule: optional fields stay `undefined` when unknown; the UI hides them. No placeholder text is ever rendered.
