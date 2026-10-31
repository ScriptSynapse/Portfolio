# Changelog

## 3.0.1 (31 Oct 2026)

- Six certificate images added (rendered from your PDFs), with card thumbnails, a full-size viewer, credential IDs and HackerRank verification links.
- Skill tabs wrap onto two rows instead of overflowing.

## 3.0.0 — OPERATOR v3.0 (31 Oct 2026)

### Added
- **Recruiter mode** (`/recruiter`): one quiet page with contact, resume download, print, projects, experience, leadership, achievements, skills, certifications. Linked from navbar, hero, mobile menu and palette.
- **Blog system** (`data/blog.ts`, `/blog/:slug`) — hidden until a real article is added.
- Case-study **Results & evidence** and **Limitations & future improvements** blocks (FORGE-X test results, AI Malware Detector metrics and their caveat).
- About: technical interests and "Looking for" (career objectives).
- Hero: GitHub and LinkedIn buttons; recruiter-summary link.
- Error boundaries for routes and the 3D globe.
- Per-route SEO meta, 1200×630 Open Graph image, updated sitemap and JSON-LD.
- `/docs`: audit, design system, content requirements, asset inventory, technical docs, SEO/performance, testing, deployment, changelog.

### Changed
- Skills reorganised into 10 categories (Programming, Cybersecurity Tools, Security Operations, Digital Forensics, AI & ML, Networking, Frameworks & Development, Databases, Operating Systems, Cloud & Infrastructure). Levels limited to Familiar / Working knowledge / Proficient; previous "Advanced" entries are shown as Proficient.
- Headline: "Cybersecurity & Digital Forensics Student · AI Security Enthusiast".
- SIH leadership role renamed to **Smart India Hackathon 2026 — Internal Round** (owner-confirmed).
- Certification metric/description no longer says "verified" (no verification links yet).
- Project order: HoneyWatch, FORGE-X, AI Malware Detector, VaultX, IPsec VPN Analyzer.

### Removed (on request)
- ParkPilot project and the live GitHub section.

### Fixed
- Heading hierarchy in the credentials section.

### Not added (by decision / no evidence)
- Research section (kept removed on request).
- Sysmon, Elasticsearch, Kibana (no evidence found).

## 2.5 — 2.0
See `UPGRADE_NOTES.md` (SOC redesign, boot screen, leadership section, Firebase SDK removal, cleanup script).
