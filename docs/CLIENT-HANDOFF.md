# Client Handoff Guide

This guide is for non-technical stakeholders managing the website after launch.

## What pages exist

- Homepage
- About Us
- Our Mission & Charitable Purposes
- Our Programs
- Governance & Transparency
- Get Involved
- Donate
- News & Updates
- Contact Us
- Privacy Policy
- Terms of Use
- Donate placeholders:
  - `/donate/stripe`
  - `/donate/canadahelps`

## How governance documents are posted

Governance documents are controlled by a simple content file and a documents folder:

- Add/update document entries in: `content/documents.ts`
- Upload corresponding files to: `public/documents/`
- Set each document status:
  - `available` (shows download link)
  - `coming_soon` (shows “Upload coming soon”)

The Governance page groups documents by category and labels each item clearly.

## How News is updated

News posts are Markdown files in:

- `content/news/`

Each file includes:

- title
- date
- excerpt
- body text

The News listing and individual article pages update automatically from these files.

## What “Charitable registration pending” means on the site

It indicates registration status is still pending and the site avoids making claims that depend on completed registration.

The donate page intentionally shows both receipt conditions to stay clear and neutral:

- If registered: receipt language
- If pending: receipt language

## Information still needed from your team

- Final office address
- Final public phone number
- Business Number (BN), if and when registered
- Final logo assets (web + OpenGraph)
- Final brand palette values (if replacing current neutral defaults)

## Key operational notes

- Keep copy factual and neutral.
- Avoid adding prohibited terms or unsupported claims.
- Run the compliance check before publishing updates (`npm run compliance`).
