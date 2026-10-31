# Design System — OPERATOR v3.0

## Colour tokens (`src/index.css`)

| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#080B12` | `#F4F7FB` | Page background |
| `--bg-2` | `#111827` | `#E9EEF5` | Alternate section bands |
| `--card` | `#101923` | `#FFFFFF` | Panels and cards |
| `--text` | `#F4F7FB` | `#111827` | Primary text |
| `--text-2` | `#9AA9B9` | `#475467` | Body copy |
| `--text-3` | `#7B8BA0` | `#5D6B7C` | Labels, metadata |
| `--accent` | `#00D4FF` | `#007EAA` | Primary accent, links, focus |
| `--accent-2` | `#38E58B` | `#168A55` | Success, "online", evidence |
| `--accent-3` | `#FF8A3D` | `#D96821` | Highlights, leadership, warnings |
| `--line` / `--line-strong` | blue-grey 12 % / 24 % | ink 10 % / 20 % | Borders |

Tailwind utilities map to these through `@theme inline` (`bg-card`, `text-text-2`, `border-line`, `text-accent` …). Never hard-code hex values in components.

## Typography

| Role | Font | Notes |
|---|---|---|
| Display / headings | Space Grotesk 500–700 | `font-display`, tight tracking |
| Body | Inter 400–600 | 15–18 px body, 1.6 line height |
| Technical labels | JetBrains Mono 400–600 | `label-mono`: 11 px, 0.14em tracking, uppercase |

Self-hosted variable WOFF files in `public/fonts` (Latin subset, SIL OFL), preloaded in `index.html`, `font-display: swap`.

## Spacing & layout

- Container: `max-w-7xl` with 16 / 24 / 32 px gutters (mobile / sm / lg).
- Sections: `py-20 sm:py-28`, alternating `bg-bg-2/30` bands for rhythm.
- Panels: 14 px radius, 1 px border, soft shadow, cursor spotlight border on hover devices.
- Grids collapse to one column below `md`; nothing is just scaled down.

## Components (`src/components/ui`)

`Panel`, `Corners`, `Tag`, `StatusDot`, `Button`/`LinkButton` (URL-validated), `Section`, `SectionHeader` (word reveal + parallax index), `Reveal`, `Modal` (focus trap, Esc, restore focus), `ScrambleText`, `Marquee`, `ProjectIcon`, `ProjectVisual` (abstract animated illustration per project — never presented as a screenshot).

## Motion guidelines

- Framer Motion for entrances (≤ 0.8 s, `cubic-bezier(0.16,1,0.3,1)`), springs for chips and icons.
- Scroll-linked effects are subtle: hero parallax, section number parallax, timeline progress.
- Every animation stops under `prefers-reduced-motion` (`MotionConfig reducedMotion="user"` + CSS override). The boot screen is skipped entirely and the globe renders one static frame.
- No motion on the recruiter page.

## Responsive rules

| Breakpoint | Behaviour |
|---|---|
| < 640 px | Compact hero (summary and fact grid hidden, location/availability line instead), drawer navigation, globe in "lite" quality |
| 640–1023 px | Two-column grids, drawer navigation |
| ≥ 1024 px | Full navigation, hero text + globe side by side |
| ≥ 1536 px | Section tracker on the right edge |
