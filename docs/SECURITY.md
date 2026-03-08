# Security Notes

This project uses practical security controls suitable for a Next.js App Router deployment on Vercel.

## 2FA Admin Login

- Repository access should require GitHub account 2FA for all maintainers.
- Vercel project/team access should require 2FA for all administrators.
- Any connected content tooling (if added later) should enforce 2FA.

## Firewall / Edge Protection

- Application is hosted on Vercel with platform protections at the edge.
- Security headers are configured globally in `next.config.js`.
- Optional enhancement: enable Vercel WAF/custom rules for additional filtering and abuse controls.

## Anti-spam Controls

- Contact form includes a hidden honeypot field (`companyWebsite`) to detect bot submissions.
- API endpoint applies request validation and an in-memory TTL rate limiter.
- For strict distributed enforcement in production serverless environments, move limiter state to Upstash/Redis.

## Backup Approach

- Source-controlled backups exist in Git history and remote repository snapshots.
- Vercel deployment history provides rollback points.
- If a CMS is added later, schedule dedicated content backups from that CMS datastore.
