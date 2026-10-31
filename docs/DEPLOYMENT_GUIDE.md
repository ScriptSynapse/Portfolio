# Deployment Guide

## Prerequisites

Node.js 20.19+ or 22.12+ and npm.

## First-time setup (existing checkout)

```powershell
# remove files from older versions that break the type-check
powershell -ExecutionPolicy Bypass -File .\cleanup-old-files.ps1
npm install
```

## Development

```bash
npm run dev        # http://localhost:5173
npm run lint
npm run typecheck
```

Add `?boot=1` to replay the boot screen.

## Production build

```bash
npm run build      # tsc -b && vite build → dist/
npm run preview    # serve dist/ locally
```

## Environment

Copy `.env.example` → `.env` (never commit it). All variables are optional:

| Variable | Effect |
|---|---|
| `VITE_FORM_ENDPOINT` | Contact form endpoint (default: existing Formspree form) |
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID` | Save contact messages to Firestore. Deploy `firestore.rules` first: `firebase deploy --only firestore:rules` |

## Deploy to Vercel

1. Import the GitHub repo at vercel.com/new (framework preset **Vite**, build `npm run build`, output `dist`).
2. Add the environment variables in Project → Settings → Environment Variables.
3. Deploy. `vercel.json` rewrites all paths to `index.html` and adds security + cache headers.
4. Add the custom domain `portfolio.paulsonfernandes.tech` in Project → Domains (once confirmed).
5. Submit `https://portfolio.paulsonfernandes.tech/sitemap.xml` in Google Search Console.

## After deploying

- Run Lighthouse (mobile + desktop) and record results in `SEO_AND_PERFORMANCE_REPORT.md`.
- Send a test message through the contact form.
- Share a link on LinkedIn to check the social preview image.
- In Google Cloud, restrict the Firebase browser API key to your domain (the old key is in git history).
