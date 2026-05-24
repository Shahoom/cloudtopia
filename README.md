# CloudTopia V2

CloudTopia is a multilingual agency website and local CMS built with Next.js, Payload CMS, PostgreSQL, TypeScript, and Tailwind CSS. Supabase has been removed from the app source; content now comes from Payload tables in a local or production Postgres database, with static dictionaries as a safe public-site fallback.

## Stack

| Area | Tech |
| --- | --- |
| Website | Next.js 16 App Router, React 19, TypeScript |
| CMS | Payload CMS 3, custom admin dashboard |
| Database | PostgreSQL through `@payloadcms/db-postgres` and `pg` |
| Styling | Tailwind CSS, custom Payload admin CSS |
| Content | Payload pages, projects, media, FAQs, site design, site dictionaries |

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
| `npm run payload:migrate` | Apply Payload migrations to Postgres |
| `npm run payload:migrate:status` | Check which migrations have run |
| `npm run seed:payload` | Seed local Payload tables from existing site content |
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
