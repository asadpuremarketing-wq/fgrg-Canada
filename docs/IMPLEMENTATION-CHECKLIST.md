# Implementation Checklist

This checklist maps requirements to implementation file paths.

## Routes and Page Structure

- Homepage route: `app/page.tsx`
- About route: `app/about/page.tsx`
- Mission route: `app/mission/page.tsx`
- Programs route: `app/programs/page.tsx`
- Governance route: `app/governance/page.tsx`
- Get involved route: `app/get-involved/page.tsx`
- Donate route: `app/donate/page.tsx`
- Donate placeholder routes: `app/donate/stripe/page.tsx`, `app/donate/canadahelps/page.tsx`
- News listing + post routes: `app/news/page.tsx`, `app/news/[slug]/page.tsx`
- Contact route: `app/contact/page.tsx`
- Privacy route: `app/privacy/page.tsx`
- Terms route: `app/terms/page.tsx`

## Centralized Content Files

- Core page copy: `content/pages.ts`
- Governance documents entries: `content/documents.ts`
- News post markdown: `content/news/*.md`

## Compliance Scanner

- Banned-term scanner utility: `lib/compliance.ts`
- Development warning on page content: `content/pages.ts`
- Development warning on governance docs: `content/documents.ts`
- Development warning on news markdown: `lib/news.ts`

## Security Headers and CSP

- Global headers + CSP report-only: `next.config.js`
- CSP report intake endpoint: `app/api/csp-report/route.ts`

## Contact API and Anti-spam

- Form UI + honeypot field: `components/contact-form.tsx`
- Contact page integration: `app/contact/page.tsx`
- Backend validation + honeypot + rate limiting: `app/api/contact/route.ts`

## Governance Documents System

- Typed data model and entries: `content/documents.ts`
- Render grouped cards and download links: `app/governance/page.tsx`
- Placeholder downloadable files: `public/documents/annual-financial-statements-2025.txt`, `public/documents/annual-report-2025.txt`

## Donation Placeholder Flow

- Main donate options linking to route placeholders: `app/donate/page.tsx`
- Placeholder pages: `app/donate/stripe/page.tsx`, `app/donate/canadahelps/page.tsx`

## Accessibility

- Skip-to-content link: `components/skip-to-content.tsx`
- Main landmark target id: `app/layout.tsx` (`id="main-content"`)
- Visible focus states: `app/globals.css`
- Semantic headings and one H1 per page: route files under `app/**/page.tsx`
- Contact form labels/error associations: `components/contact-form.tsx`

## SEO

- Site URL source of truth: `lib/site.ts`
- Metadata defaults + OG/Twitter image: `app/layout.tsx`
- Per-page canonical/OG metadata helper: `lib/metadata.ts`
- Breadcrumb JSON-LD component: `components/json-ld.tsx`
- Organization JSON-LD on homepage: `app/page.tsx`
- Robots: `app/robots.ts`
- Sitemap including dynamic news entries: `app/sitemap.ts`
