import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Defensive, idempotent reconciliation for solution_finder_leads.
//
// On some environments the table was first created by the raw-SQL fallback in
// lib/solution-finder/leadService.ts (before the 20260605 migration), which did
// NOT include an `updated_at` column. Payload's ORM expects `updated_at` on
// every collection, so its writes fail against such a table and leads are lost.
//
// This migration adds `updated_at` (and `created_at` for completeness) only if
// they are missing. On a fresh Supabase DB where the 20260605 migration already
// created these correctly, the ADD COLUMN IF NOT EXISTS clauses are no-ops.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    alter table "solution_finder_leads"
      add column if not exists "created_at" timestamptz not null default now();

    alter table "solution_finder_leads"
      add column if not exists "updated_at" timestamptz not null default now();
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // No-op: dropping updated_at would break Payload ORM writes, and this is a
  // defensive reconciliation rather than a structural change to revert.
}
