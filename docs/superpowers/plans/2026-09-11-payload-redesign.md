# Payload CMS Redesign Plan

**Date:** 2026-09-11 · **Status:** Approved direction — replaces `crm-cms-unification`
**Decision:** The `crm-cms-unification` branch (CRM merge, 92 API routes, /crm UI) is **abandoned**. Do not merge, rebase, or continue it. The CMS stays Payload; this plan redesigns how Payload is operated and experienced rather than replacing it.

## Why (one paragraph)
Every real incident to date was operational, not architectural: migrations run inside the deploy, the local dev DB drifts from prod (which made the migration generator produce wrong diffs), CMS-stored copies shadow code-authored text, bilingual pairing is fragile, and until this week any account was a super-admin. Fixing these five things yields a stable, pleasant CMS at ~5% of the cost of a rewrite.

## Phase 1 — Operational safety (highest value)
1. **Decouple migrations from deploy.** `vercel-build` becomes build-only. New script `npm run migrate:prod` (runs `payload migrate` against `POSTGRES_URL_NON_POOLING`, prints pending list, requires typed confirmation). Deploy order becomes: run migration → verify → push. The deploy can never again alter the prod schema as a side effect.
2. **Local DB parity.** Script `npm run db:sync-local` — `pg_dump --schema-only` from prod + reseed reference rows, so `payload migrate:create` generates correct diffs again (today it asks whether prod tables are "new"). Rule: never hand-write a migration once parity exists.
3. **Upgrade cadence.** Monthly: bump ALL `@payloadcms/*` + `payload` together (version-aligned or the build hard-fails), run smoke + build, deploy. Never partial bumps (the 3.84/3.89 mismatch broke the CLI).

## Phase 2 — Roles & content governance
4. **Extend roles beyond user management.** `admin` = everything; `editor` = content collections only (Blog*, Pages, Media, Authors, SEO fields read-only?). One shared `adminOrEditor` access helper; lead/system collections stay admin-only.
5. **Source-of-truth rules, enforced.** Legal text and hero safety copy live in code (already enforced for privacy/terms via the layout strip). Add a test that fails if a CMS `dictionaryPatch` reintroduces retired keys (pattern exists for `hero.modal.testimonial*`).

## Phase 3 — Admin experience redesign
6. **Dashboard home.** Replace the default collection list with a custom admin dashboard view: draft counts, unpaired AR/EN posts, recent leads, one-click revalidate. (Payload custom views — same mechanism the abandoned CRM branch proved works.)
7. **Bilingual pairing workflow.** A "pair" panel on BlogPosts showing the sibling locale's status inline (draft lookups already fixed to include SQL-imported rows), with create-translation button. Kills the EN⇄AR toggle friction permanently.
8. **Media reliability.** Keep server-side uploads (clientUploads stays OFF — it wrote rows for files that never uploaded). Document the 4.5MB Vercel body cap in the upload UI's description field; large files go through the S3 console.
9. **Collection grouping & pruning.** Audit the 23 collections: group by System / Content / Leads in the sidebar (partially done), archive collections with zero rows and no code references.

## Phase 4 — Publish the drafts
10. The ~36 unpublished drafts (July audit) are the cheapest ranking win the site has. Editorial pass → publish cadence of 2-3/week, wired to the 2026-09 content plan (see keyword research doc).

## Non-goals
- No custom CMS build. No CRM merge. No collection schema rewrites without a migration through the Phase-1 pipeline. No new runtime deps for the dashboard views.

## Order of execution
Phase 1 items 1-2 first (they de-risk everything else) → 4 → 6/7 (biggest daily-use win) → 3/5/8/9 continuous → 10 runs in parallel with the content plan.
