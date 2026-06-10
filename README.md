# CloudTopia V2

CloudTopia is a multilingual agency website and CMS built with Next.js, Payload CMS, PostgreSQL, TypeScript, and Tailwind CSS. Content comes from Payload tables in a local or production Postgres database, with static dictionaries as a safe public-site fallback. Production runs on **Supabase Postgres + Supabase Storage**; local development uses a plain local Postgres.

## Stack

| Area | Tech |
| --- | --- |
| Website | Next.js 16 App Router, React 19, TypeScript |
| CMS | Payload CMS 3, custom admin dashboard |
| Database | PostgreSQL through `@payloadcms/db-postgres` and `pg` (Supabase in production) |
| Media storage | Supabase Storage (S3-compatible) via `@payloadcms/storage-s3`; local disk in dev |
| Styling | Tailwind CSS, custom Payload admin CSS |
| Content | Payload pages, projects, media, FAQs, site design, site dictionaries |

## Supabase Topology (production)

Supabase exposes two endpoints — use the right one per task:

- **Runtime (app + `/admin`)** → transaction pooler on **port 6543** (PgBouncer). Append `?pgbouncer=true&sslmode=require` to `DATABASE_URL`.
- **Migrate / seed** → direct connection on **port 5432**. Append `?sslmode=require`.

The pg pools attach `ssl: { rejectUnauthorized: false }` automatically for any non-localhost `DATABASE_URL`. Media uploads go to a Supabase Storage bucket when the `S3_*` env vars are set (see `.env.example`); otherwise Media falls back to local disk. Full steps are in [DEPLOYMENT.md](./DEPLOYMENT.md).

## Local Development

1. Install dependencies:

```bash
npm install --legacy-peer-deps
```

2. Create a local Postgres database:

```bash
createdb payload_db
```

3. Create `.env.local` from the template:

```bash
cp .env.example .env.local
```

The development fallback is `postgres://127.0.0.1:5432/payload_db`, so local development works with the default Homebrew/Postgres user once that database exists. Production still requires explicit `DATABASE_URL` and `PAYLOAD_SECRET`.

4. Run migrations and seed content:

```bash
npm run payload:migrate
npm run seed:payload
```

5. Start the app:

```bash
npm run dev
```

Open the public site at `http://localhost:3000` and the CMS at `http://localhost:3000/admin`.

## Useful Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js and Payload dev server |
| `npm run build` | Build the production app |
| `npm run start` | Start the production build |
| `npm run lint` | Run ESLint |
| `npm run test:smoke` | Run local integration smoke tests |
| `npm run payload:migrate` | Apply Payload migrations to Postgres (use the direct 5432 URL) |
| `npm run payload:migrate:status` | Check which migrations have run |
| `npm run seed:payload:local-api` | Seed via Payload Local API (schema-safe, admin-editable — preferred) |
| `npm run seed:payload` | Raw-SQL seeder (emergency fallback only — can drift from schema) |
| `npm run payload:types` | Regenerate Payload type definitions |

## Data Flow

- Payload collections live in `collections/`.
- Payload config and local Postgres adapter live in `payload.config.ts`.
- Shared CMS environment behavior lives in `lib/cms/env.ts`.
- The public site reads Payload data through `lib/cms/content.ts`.
- `/api/site-data` exposes the same public bundle for development checks.
- If Postgres is unavailable, the public site falls back to static dictionaries in `lib/i18n/translations/`.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel plus database deployment steps.
