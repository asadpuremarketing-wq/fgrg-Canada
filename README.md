# FGRF Canada Website

This repository contains the Next.js App Router website for FGRF Canada.  
It is designed for a professional, Canada-focused public presence with CRA-safe content guardrails, governance transparency, and deployment readiness on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation commands

```bash
npm run compliance
npm run lint
npm run build
```

Notes:
- `npm run lint` already includes the compliance check.
- There is currently no dedicated unit/integration test suite in this repo.

## Edit content

- Main page copy: `content/pages.ts`
- Governance documents: `content/documents.ts` + files in `public/documents/`
- News posts: `content/news/*.md`

Detailed workflow: `docs/CONTENT-EDITING.md`

## Deployment

Vercel deployment instructions: `docs/DEPLOYMENT.md`  
Launch and handoff documents are in `docs/`.
