# CRA Compliance Specification

This file stores the client specification in repository form for implementation and audit traceability.

## Organization Overview

- Organization name: **Faizan Global Relief Foundation (FGRF) Canada**
- Jurisdiction focus: **Canada only**
- Positioning: professional, transparent, independent Canadian governance, CRA readiness.

## Website Objectives (all 10)

1. Present a clear Canada-only NGO identity and scope.
2. Publish transparent governance and accountability information.
3. Communicate mission and charitable purposes in CRA-safe language.
4. Provide structured updates through a News & Updates system.
5. Offer clear pathways for involvement and donation intent.
6. Keep content editable without touching presentation components.
7. Enforce compliance guardrails against non-allowed language categories.
8. Meet accessibility patterns across page structure and interactions.
9. Implement SEO foundations (metadata, canonical, robots, sitemap, structured data).
10. Implement production-grade security defaults suitable for Vercel/Next.js deployment.

## Website Structure

- `/` (Homepage)
- `/about`
- `/mission`
- `/programs`
- `/governance`
- `/get-involved`
- `/donate`
- `/donate/stripe`
- `/donate/canadahelps`
- `/news`
- `/news/[slug]`
- `/contact`
- `/privacy`
- `/terms`

## Page-by-page Copy (exact text in current implementation)

### Homepage

- Hero eyebrow: `Canada-Focused Organization`
- Hero title: `FGRF Canada`
- Hero body: `FGRF Canada is a Canada-focused charitable organization committed to professional governance, transparent operations, and responsible planning for community benefit.`
- Section: `Who We Are`
  - `FGRF Canada is an independently governed Canadian organization focused on accountability, transparency, and responsible community support planning.`
- Section: `Our Focus in Canada`
  - `We prioritize Canadian community needs through careful program design, documented oversight, and clear accountability standards.`
- Section: `Program Development Approach`
  - `Program planning, implementation timelines, and expansion decisions are subject to Board approval, regulatory compliance, and available funding.`
- Section: `Governance and Transparency`
  - `We maintain internal governance policies, financial controls, and public transparency practices to support CRA readiness and community trust.`

### About

- Title: `About Us`
- Subtitle: `Learn about our Canada-focused operations, governance approach, and organizational standards.`
- `Who We Are` text as above
- `Our Standards`:
  - `We are building with clear governance systems, documented controls, and regulatory readiness at the center of all operations.`

### Mission

- Title: `Our Mission & Charitable Purposes`
- Subtitle: `Our mission and charitable purposes are structured for Canadian compliance, transparency, and measurable public benefit.`
- `Mission`:
  - `Our mission is to provide structured charitable support within Canada through transparent governance, measurable public benefit, and strong stewardship.`
- `Charitable Purposes`:
  - `Our charitable purposes are designed to align with Canadian regulatory expectations and are reviewed through independent Board oversight.`

### Programs

- Title: `Our Programs`
- Subtitle: `Program areas are planned for Canadian communities with governance and compliance safeguards.`
- `Canada-Based Programs`:
  - `Program areas are being developed to address needs within Canada, with clear policy and governance alignment.`
- `Implementation Status`:
  - `Program activities are subject to Board approval, regulatory compliance, and available funding.`

### Governance

- Title: `Governance & Transparency`
- Subtitle: `Independent oversight, clear documentation, and transparent governance practices are central to our operations.`
- `Independent Oversight`:
  - `Governance responsibilities are managed through independent Canadian oversight and structured Board processes.`
- `Transparency Commitments`:
  - `We maintain clear documentation, internal policy controls, and public-facing transparency to support trust and accountability.`
- Documents UI headings:
  - `Documents`
  - Categories: `Annual financial statements`, `Annual reports`, `Policies`
  - Status text: `Upload coming soon` for pending items

### Get Involved

- Title: `Get Involved`
- Subtitle: `Support planning, outreach, and organizational readiness through structured participation in Canada.`
- `Volunteer and Support`:
  - `Community members can support planning, outreach, and operational readiness through structured volunteer opportunities in Canada.`
- `Partnership Approach`:
  - `Collaboration opportunities are reviewed through governance and compliance processes before launch.`

### Donate

- Title: `Donate`
- Subtitle: `Support our planning and organizational readiness through transparent donation pathways.`
- Donation routes:
  - `Donate via Stripe` -> `/donate/stripe`
  - `Donate via CanadaHelps` -> `/donate/canadahelps`
- Conditional receipt wording blocks:
  - `If registered: Official donation receipts may be issued in accordance with CRA requirements.`
  - `If pending: Official donation receipts are not available until registration is approved.`

### Donate Placeholder Pages

- `/donate/stripe`: `Coming soon` + compliance-safe status text
- `/donate/canadahelps`: `Coming soon` + compliance-safe status text

### News

- Title: `News & Updates`
- Subtitle: `View organizational notices, governance updates, and public information releases.`
- Intro: `This page publishes updates related to governance, planning milestones, and community notices in Canada.`
- Sample posts:
  - Annual report publication notice
  - Community workshop planning update
  - Volunteer recruitment notice

### Contact

- Title: `Contact Us`
- Subtitle: `Use the contact information below for general organizational inquiries.`
- Contact items:
  - `Address: Placeholder Address, Canada`
  - `Email: info@fgrfcanada.ca`
  - `Phone: +1 (000) 000-0000`
- Response standard:
  - `We aim to respond to general inquiries in a timely and professional manner.`

### Privacy

- Title: `Privacy Policy`
- Subtitle: `This policy explains our website privacy practices and how information is handled.`

### Terms

- Title: `Terms of Use`
- Subtitle: `These terms describe the conditions for access and use of this website.`

## Technical Requirements

- Next.js App Router + TypeScript
- Tailwind CSS
- Centralized content source files (`content/pages.ts`, `content/news/*.md`, `content/documents.ts`)
- Vercel-compatible security headers and report-only CSP
- API routes:
  - `/api/contact` for validated contact submissions with anti-spam
  - `/api/csp-report` for CSP report-only intake
- SEO defaults:
  - metadata + OpenGraph + Twitter
  - canonical URLs from single `siteUrl`
  - robots + sitemap (+ dynamic news entries)
  - JSON-LD (Organization + Breadcrumbs)

## CRA Compliance Requirements

- Canada-only framing and language.
- No political advocacy, lobbying, campaign, partisan, or voting messaging.
- No religious proselytizing or conversion language.
- No claims of active programs without conditional language.
- Required conditional wording pattern: `subject to Board approval, regulatory compliance, and available funding.`
- Development-time compliance scanner for banned terms in centralized content.

## Design Requirements

- Light UI only.
- Clean, neutral visual language.
- Accessible focus states and semantic heading hierarchy.
- Reusable layout components (`PageHeader`, cards, structured sections).

## Verbatim Client Specification (Captured)

The following is preserved verbatim from the implementation brief available in this repository conversation.

```text
ROLE: You are a senior Next.js engineer building a CRA-ready, Canada-only NGO website for “Faizan Global Relief Foundation (FGRF) Canada”, deployed on Vercel.

STACK (choose and commit):
- Next.js (App Router) + TypeScript
- Tailwind CSS
- next-seo friendly metadata via App Router `metadata` + OpenGraph
- Vercel deployment

NON-NEGOTIABLE COMPLIANCE RULES (site-wide):
- Canada-focused only. Do NOT use “global”, “international”, “worldwide”, “overseas”, “humanitarian aid”, “disaster relief”, or any international program language.
- No political advocacy, lobbying, partisan messaging, or political commentary.
- No religious proselytizing / conversion language. Avoid religious symbolism in primary design.
- Do not claim programs are active unless explicitly stated as operational. Use structured language like “subject to Board approval, regulatory compliance, and available funding.”
- Reflect professionalism, CRA readiness, transparency, and independent Canadian governance.

DESIGN SYSTEM:
- Light UI only (no dark mode). Clean, modern, minimal, generous whitespace.
- Neutral palette (whites, light grays, subtle blue/green accents).
- Clean typography (Inter or system). Strong hierarchy.

ACCESSIBILITY (WCAG 2.1 AA):
- Semantic landmarks: <header>, <nav>, <main>, <footer>
- One H1 per page, logical H2/H3 nesting
- Keyboard navigation + visible focus
- Skip-to-content link (first focusable element)
- Alt text required on all images
- Color contrast meets WCAG AA
(Implement these patterns globally.) Base requirements align with WCAG 2.1 guidance.

SEO + PERFORMANCE:
- Per-page title and meta description
- OpenGraph + Twitter cards
- Canonical URLs
- robots.txt + sitemap.xml support using Next.js App Router conventions
- Fast LCP/CLS: optimized images, lazy-load non-critical

SECURITY (Vercel/Next.js):
- Configure security headers (at minimum: HSTS, X-Content-Type-Options, Referrer-Policy, frame protections) using Next.js/Vercel-supported header configuration.
- Add a Content-Security-Policy plan (start in report-only if needed, then enforce).
(Use official Next.js/Vercel guidance for CSP and security headers.)

SITE MAP (exact top-level nav):
Homepage
About Us
Our Mission & Charitable Purposes
Our Programs (Canada-Based Only)
Governance & Transparency
Get Involved
Donate
News & Updates
Contact Us
Privacy Policy
Terms of Use
```
