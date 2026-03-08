# Deployment Guide (Vercel)

## Prerequisites

- GitHub repository connected to Vercel
- Vercel account with 2FA enabled
- GitHub account with 2FA enabled

## Deploy from GitHub to Vercel (step-by-step)

1. Push your branch to GitHub.
2. Open Vercel -> **Add New...** -> **Project**.
3. Select/import the GitHub repository.
4. Confirm framework preset is **Next.js** (auto-detected).
5. Keep default build settings:
   - Install command: `npm install`
   - Build command: `next build`
   - Output: Next.js default
6. Click **Deploy**.
7. After first deploy, enable auto-deploys for pushes to your production branch (recommended).

## Environment Variables

- None required at this stage.
- If future integrations are added, configure variables in Vercel Project Settings.

## Custom Domain (`fgrfcanada.ca`) and DNS

1. Open Vercel project -> **Settings** -> **Domains**.
2. Add:
   - `fgrfcanada.ca`
   - `www.fgrfcanada.ca` (optional but recommended)
3. At your DNS provider, add records exactly as shown by Vercel.
4. Wait for verification status to become active in Vercel.
5. Set the preferred primary domain in Vercel.

## HTTPS

- Vercel automatically provisions TLS certificates for verified domains.
- Confirm HTTPS works for both root and `www` domains.
- Optional: configure redirect from `www` to apex (or apex to `www`) in Vercel domain settings.

## Production `siteUrl` update

After final domain confirmation, update:

- `lib/site.ts` -> `siteConfig.siteUrl`

Use the exact primary production URL (including https).  
This ensures canonical metadata, OpenGraph URLs, robots, and sitemap all stay consistent.

## Post-deploy verification URLs

- `https://<domain>/`
- `https://<domain>/sitemap.xml`
- `https://<domain>/robots.txt`
- `https://<domain>/news`
- `https://<domain>/news/annual-report-notice-2026`
- `https://<domain>/contact`
- `https://<domain>/governance`
- `https://<domain>/donate`
- `https://<domain>/donate/stripe`
- `https://<domain>/donate/canadahelps`

Also verify response headers in browser devtools/network:

- security headers present
- report-only CSP present
- pages load and function normally

## Notes

- Current headers/CSP are configured in `next.config.js`.
- CI enforces lint, compliance scan, and build before merge.
