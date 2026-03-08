# Content Editing Workflow

Use this guide to update content safely without touching page component logic.

## 1) Update page copy

- File: `content/pages.ts`
- Update text fields in the relevant section (`home`, `about`, `mission`, etc.).
- Do not modify component files for normal copy updates.

## 2) Update governance documents

- File: `content/documents.ts`
- Add or edit entries with:
  - `category`: `"Annual financial statements" | "Annual reports" | "Policies"`
  - `title`
  - `year` (optional)
  - `fileUrl` (optional, required if `status` is `available`)
  - `status`: `"available" | "coming_soon"`
- If `status` is `available`, place the file in `public/documents/` and set `fileUrl` like:
  - `/documents/example-file.pdf`

## 3) Add news posts

- Folder: `content/news/`
- Create a new `.md` file using this format:

```md
---
title: "Post title"
date: "2026-02-16"
excerpt: "Short excerpt."
---
## Section heading
Paragraph text.
```

- Slug is derived from file name.
- Post appears on `/news` and is available at `/news/<slug>`.

## Compliance Warning (Required)

Do not add banned terms in content:

- global
- international
- worldwide
- overseas
- humanitarian
- disaster
- relief (if used in international context)
- lobbying
- campaign
- partisan
- vote
- convert
- proselytize

After content edits, run:

```bash
npm run compliance
```

The command fails if banned terms are found.
