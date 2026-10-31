# Asset Inventory

## Present

| Asset | Path | Notes |
|---|---|---|
| Profile photo | `public/profile.jpg` | 400×400 JPEG, 30 KB |
| Resume | `public/Paulson_Alex_Fernandes_Resume.pdf` | 64 KB, created 30 Oct 2026. **Still says "SIH 2025 (Internal)" — update to "SIH 2026 Internal Round"** |
| Favicon | `public/favicon.svg` | PF// mark |
| Social preview | `public/og-image.png` | 1200×630, generated from the site's fonts/colours |
| Fonts | `public/fonts/*.woff` | Space Grotesk, Inter, JetBrains Mono (+ OFL licences) |
| Certificates (6) | `public/certification-images/*.webp` (+ `-thumb.webp`) | Rendered from the original PDFs: 1600 px viewer image + 640 px card thumbnail, ~490 KB total, lazy-loaded |
| Project figure | `public/project-images/ai-malware-feature-importance.webp` | From the AI-Malware-Detector repo (prototype model) |
| Icons | `lucide-react` + `src/components/ui/BrandIcons.tsx` | GitHub, LinkedIn, PF mark |
| Illustrations | `src/components/ui/ProjectVisual.tsx` | Code-drawn SVG motifs per project (not screenshots) |

## Missing

| Needed | For | Priority |
|---|---|---|
| Screenshots: HoneyWatch dashboard + map | Case study gallery | P2 |
| Screenshots: FORGE-X dashboard, case, custody, graph | Case study gallery | P2 |
| Screenshots: AI Malware Detector scan result + PDF report | Case study gallery | P2 |
| Screenshots: VaultX vault + generator | Case study gallery | P2 |
| Screenshots: IPsec VPN Analyzer dashboard | Case study gallery | P2 |
| SIH 1st-place certificate (optional) | Achievements | P3 |
| Research paper PDF | Research section (hidden) | P3 |
| Blog cover images | Blog (hidden) | P3 |

Drop images into `public/project-images/` or `public/certification-images/` (PNG/JPG fine — convert to WebP for size) and reference them in the data files.
