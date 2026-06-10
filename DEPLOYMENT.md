# Deployment Guide - CloudTopia V2

This project deploys as one Next.js app with Payload CMS mounted under `/admin` and Payload API routes under `/api`. The database is PostgreSQL. The recommended production database is **Supabase Postgres**, but any managed Postgres (Neon, Railway, Render) works.

## Recommended Production Shape

| Layer | Recommendation |
| --- | --- |
| App hosting | Vercel |
| Database | Supabase Postgres (or another managed Postgres such as Neon, Railway, Render) |
| File uploads | Supabase Storage via the S3-compatible adapter (`@payloadcms/storage-s3`). Vercel's filesystem is read-only at runtime, so local `public/uploads` is dev-only. |
| Domains | `cloudtopia.net` and optional `www.cloudtopia.net` |

## Supabase Connection Topology (read this first)

Supabase exposes two connection endpoints. Use the right one for each task:

| Use | Port | Connection | Why |
| --- | --- | --- | --- |
| **Runtime** (app + `/admin`) | **6543** | Transaction pooler (PgBouncer) | Serverless functions open many short-lived connections; the pooler fans them in. Keep the pg pool `max` small and append `?pgbouncer=true&sslmode=require`. |
| **Migrate / seed** | **5432** | Direct connection | DDL and prepared statements used by `payload:migrate` and the seeders are not supported by PgBouncer's transaction mode. Append `?sslmode=require`. |

The app pool (`payload.config.ts`) and the read pool (`lib/cms/db.ts`) automatically attach `ssl: { rejectUnauthorized: false }` whenever `DATABASE_URL` points at a non-localhost host. Set `?sslmode=disable` only for local Postgres.

## Required Environment Variables

Set these in the hosting provider before building:

```env
# Runtime: Supabase transaction pooler (port 6543)
DATABASE_URL=postgres://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true&sslmode=require
PAYLOAD_SECRET=use-a-long-random-production-secret

# AI / translation (optional)
OPENAI_API_KEY=optional-for-auto-translation
OPENAI_TRANSLATION_MODEL=gpt-5.2

# Media storage — Supabase Storage (S3-compatible). When ALL five are set the
# s3Storage plugin is enabled and Media uploads go to the bucket; otherwise
# Media falls back to local disk (dev only).
S3_BUCKET=cloudtopia-media
S3_REGION=eu-central-1
S3_ENDPOINT=https://<project-ref>.supabase.co/storage/v1/s3
S3_ACCESS_KEY_ID=your-supabase-s3-access-key
S3_SECRET_ACCESS_KEY=your-supabase-s3-secret-key
```

`DATABASE_URL` and `PAYLOAD_SECRET` are mandatory in production. The local development fallback is intentionally disabled when `NODE_ENV=production`.

## Vercel Deployment Runbook

Run schema work against the **direct 5432** URL, then point runtime at the **pooled 6543** URL.

1. Create a production Supabase project (or other managed Postgres).
2. Create the Media storage bucket in Supabase Storage and generate an S3 access key/secret (Storage → S3 Connection). Mark the bucket public-read.
3. Push the repository to GitHub and import it in Vercel.
4. **Migrate the schema** from a trusted machine using the DIRECT (5432) URL:

   ```bash
   DATABASE_URL="postgres://USER:PASSWORD@HOST:5432/postgres?sslmode=require" \
   PAYLOAD_SECRET="your-production-secret" \
   npm run payload:migrate
   ```

5. **Confirm every migration applied** (no `No` rows):

   ```bash
   DATABASE_URL="postgres://USER:PASSWORD@HOST:5432/postgres?sslmode=require" \
   PAYLOAD_SECRET="your-production-secret" \
   npm run payload:migrate:status
   ```

6. **Seed initial content** if the database is empty. Prefer the schema-safe
   Local-API seeder over the raw-SQL one — it goes through Payload, so it stays
   in sync with the collections and the records are admin-editable:

   ```bash
   DATABASE_URL="postgres://USER:PASSWORD@HOST:5432/postgres?sslmode=require" \
   PAYLOAD_SECRET="your-production-secret" \
   npm run seed:payload:local-api
   ```

   > `npm run seed:payload` (raw SQL via `scripts/seed-payload-direct.ts`) is
   > kept for emergencies only. It hardcodes table/column SQL and can drift from
   > the live schema, so it must not be the default path.

7. **Set runtime env vars in Vercel**: `DATABASE_URL` = the POOLED 6543 URL
   (`?pgbouncer=true&sslmode=require`), `PAYLOAD_SECRET`, the `S3_*` vars, and
   `OPENAI_API_KEY` if used.
8. **Deploy** with the default install/build commands:

   ```bash
   npm install --legacy-peer-deps
   npm run build
   ```

9. Visit `/admin`, create the first admin user, and verify the dashboard health checks.

## Database Migration Notes

- Migrations live in `migrations/` and are registered in `migrations/index.ts`.
- Always run migrations against the **direct 5432** connection, not the pooler.
- Check status with `npm run payload:migrate:status`; apply with `npm run payload:migrate`.
- Do not deploy code that expects a table before the matching migration is applied — a fresh deploy will serve traffic against an empty schema until migrations run.
- Back up the production database before running new migrations.
- After changing a collection: re-run `npm run payload:migrate:create`, apply it, then `npm run payload:types`, and commit the generated `payload-types.ts`.

## Post-Deployment Checklist

- Public routes load for `en`, `ar`, and `tr`.
- `/admin` opens and allows login.
- Dashboard shows production database as online.
- `npm run payload:migrate:status` shows all migrations as `Yes` (run).
- Seeded records exist for pages, site content, site design, projects, media, and FAQs.
- A contact-form submission lands in CRM → Contact Inquiries, and an AI chatbot lead lands in CRM → AI Chat Leads (both must persist, not silently 201).
- A Media image upload in `/admin` succeeds and resolves to a `*.supabase.co/storage/...` URL.
- `https://cloudtopia.net/sitemap.xml` and `https://cloudtopia.net/robots.txt` load.
- Forms and contact CTAs point to the right production destinations.
