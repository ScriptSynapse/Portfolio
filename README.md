# Paulson Fernandes — Portfolio

An original, motorsport-engineering-inspired personal portfolio for a Computer
Science student focused on **Cybersecurity × Software Engineering × AI**.

No official Formula 1 branding, logos, liveries, or copyrighted motorsport
assets are used — every visual (starting lights, blueprint schematic,
telemetry traces, lap indicator) is an original design.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide React

## Getting started

```bash
npm install
npm run dev      # start local dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
```

## Editing content

All editable content lives in `src/data/*.ts` — no component code needs to
change to update copy:

| File | Controls |
|---|---|
| `src/data/personal.ts` | Name, bio, location, education, links, résumé URL, headline stats |
| `src/data/projects.ts` | The Garage — project cards, filters, tech, links |
| `src/data/experience.ts` | Race History — timeline entries |
| `src/data/skills.ts` | System Telemetry — skill categories & levels |
| `src/data/systems.ts` | Machine Architecture nodes, Trophy Cabinet certifications, Pit Wall items |
| `src/data/navigation.ts` | Nav / lap-indicator section labels |

Fields wrapped in `[ADD ...]` are intentional placeholders — real company
names, certifications, dates, and credential links were **not invented** and
should be filled in with verified information before publishing.

### Résumé

Drop your PDF at `public/resume.pdf` — the "Download Résumé" button already
points there.

### Contact form

The Team Radio contact form validates input client-side and submits to a
Formspree endpoint (`https://formspree.io/f/mnjewjyp`) that's already wired
in as the default in `src/components/sections/Contact.tsx` — forwarding to
`paulsonfernandes.dev@gmail.com`. No `.env` setup is required for this to
work out of the box.

To point it at a different endpoint later (a different Formspree form,
Web3Forms, EmailJS relay, or your own API), set `VITE_FORM_ENDPOINT` in a
`.env` file (see `.env.example`) — it overrides the default when present.
Formspree requires confirming one real test submission (via the email it
sends you) before it starts forwarding automatically.

## Notable interactions

- **Starting-light intro** plays once per browser session (`sessionStorage`),
  is skipped automatically under `prefers-reduced-motion`, and takes ~1.5–2s.
- **DRS easter egg** — press D R S on desktop to briefly speed up ambient
  telemetry animation.
- Custom cursor, card tilt/reveal, and background telemetry are desktop-only
  and gracefully degrade to tap-accessible content on touch devices.
- Everything respects `prefers-reduced-motion`.

## Accessibility & performance

- Semantic landmarks, heading hierarchy, visible focus states, keyboard
  navigable menu and filters.
- Reduced-motion users get a static, fully functional experience.
- No large images/video — visuals are CSS/SVG/Tailwind driven.
