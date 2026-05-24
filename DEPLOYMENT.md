# Deployment Guide - CloudTopia V2

This project deploys as one Next.js app with Payload CMS mounted under `/admin` and Payload API routes under `/api`. The database is PostgreSQL, not Supabase.

## Recommended Production Shape

| Layer | Recommendation |
| --- | --- |
| App hosting | Vercel |
| Database | Managed PostgreSQL such as Neon, Railway, Render, or a self-managed Postgres server |
| File uploads | Current setup uses local/public uploads; for multi-instance production, move Payload media storage to persistent object storage |
| Domains | `cloudtopia.net` and optional `www.cloudtopia.net` |

## Required Environment Variables

Set these in the hosting provider before building:

```env
DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
PAYLOAD_SECRET=use-a-long-random-production-secret
OPENAI_API_KEY=optional-for-auto-translation
OPENAI_TRANSLATION_MODEL=gpt-5.2
```

`DATABASE_URL` and `PAYLOAD_SECRET` are mandatory in production. The local development fallback is intentionally disabled when `NODE_ENV=production`.

## Vercel Deployment

1. Create a production Postgres database.
2. Copy the database connection string into Vercel as `DATABASE_URL`.
3. Add a strong `PAYLOAD_SECRET`.
4. Push the repository to GitHub.
5. Import the repository in Vercel.
6. Use the default install and build commands:

```bash
npm install --legacy-peer-deps
npm run build
```

7. After the first deployment, run Payload migrations against the production database from a trusted machine:

```bash
DATABASE_URL="postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require" \
PAYLOAD_SECRET="your-production-secret" \
npm run payload:migrate
```

8. Seed initial content if the production database is empty:

```bash
DATABASE_URL="postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require" \
PAYLOAD_SECRET="your-production-secret" \
npm run seed:payload
```

9. Visit `/admin`, create the first admin user, and verify the dashboard health checks.

## Database Migration Notes

- Migrations live in `migrations/`.
- Check local status with `npm run payload:migrate:status`.
- Apply migrations with `npm run payload:migrate`.
- Do not point production at the local fallback database URL.
- Back up the production database before running new migrations.

## Post-Deployment Checklist

- Public routes load for `en`, `ar`, and `tr`.
- `/admin` opens and allows login.
- Dashboard shows local/production database as online.
- Migrations show as run.
- Seeded records exist for pages, site content, site design, projects, media, and FAQs.
- `https://cloudtopia.net/sitemap.xml` and `https://cloudtopia.net/robots.txt` load.
- Forms and contact CTAs point to the right production destinations.
- Media upload/storage strategy is persistent before multiple server instances are used.
