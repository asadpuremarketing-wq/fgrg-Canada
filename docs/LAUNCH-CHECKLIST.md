# Launch Checklist

## CRA-safe content checklist

- Confirm all public content is Canada-focused and does not describe international programs.
- Confirm no political advocacy, lobbying, campaign, partisan, or voting language.
- Confirm no religious proselytizing/conversion language.
- Confirm no unverified impact numbers or unsupported claims.
- Confirm program language remains conditional where applicable:
  - `subject to Board approval, regulatory compliance, and available funding.`
- Run `npm run compliance` and resolve any flagged terms before launch.

## Accessibility checklist (WCAG 2.1 AA quick checks)

- Keyboard-only navigation works for header, mobile menu, links, buttons, and form inputs.
- Skip link is first tabbable element and moves focus to `#main-content`.
- One H1 per page with logical H2/H3 hierarchy.
- Contact form labels, required indicators, and inline error messaging are announced.
- Focus indicators are visible on all interactive controls.
- Text and UI contrast meets AA expectations.

## SEO checklist

- Each route has title and description metadata.
- OpenGraph and Twitter defaults are present.
- Canonical URLs use `siteUrl` from `lib/site.ts`.
- `robots.txt` is reachable and points to sitemap.
- `sitemap.xml` includes static routes and news post slugs.
- JSON-LD present:
  - Organization schema on homepage
  - Breadcrumb schema on internal pages
  - FAQ schema on donate page

## Security checklist

- Security headers configured in `next.config.js`.
- CSP is enabled in report-only mode.
- Contact API anti-spam enabled:
  - Honeypot field
  - Input validation
  - Rate limiting
- CI workflow enforces:
  - `npm ci`
  - `npm run lint`
  - `npm run compliance`
  - `npm run build`

## Governance documents checklist

- Update `content/documents.ts` entries (status, fileUrl, year).
- Upload files to `public/documents/` for all entries marked `available`.
- Confirm `/governance` shows correct category, status labels, and links.
- Confirm placeholders remain “Upload coming soon” where no file is available.

## Donation checklist

- Keep donation options as “coming soon” routes until payment integrations are enabled.
- Confirm `/donate/stripe` and `/donate/canadahelps` display neutral placeholder status.
- Keep both receipt condition blocks visible:
  - If registered block
  - If pending block
