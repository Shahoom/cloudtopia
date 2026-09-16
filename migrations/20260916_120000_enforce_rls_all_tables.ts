import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

/**
 * Defence-in-depth: enable Row Level Security and revoke public/anon/authenticated
 * privileges on every base table in the `public` and `crm` schemas.
 *
 * Production already has RLS on all these tables (it was applied out-of-band via
 * SQL), so on the live database this migration is a NO-OP — `ENABLE ROW LEVEL
 * SECURITY` on an already-enabled table and `REVOKE` of an absent grant both do
 * nothing and never error. Its purpose is to make a rebuild-from-migrations, a
 * `migrate:fresh`, or a rollback/reapply of the initial schema reproduce that
 * protection, so the `users` and lead tables can never come back without RLS.
 *
 * Safe because the app connects as the `postgres` role, which has BYPASSRLS —
 * enabling RLS with no policy denies only the PostgREST `anon`/`authenticated`
 * roles (which the app never uses), not Payload's own connection.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    declare
      r record;
      principal text;
    begin
      for r in
        select n.nspname as schema_name, c.relname as table_name
        from pg_class c
        join pg_namespace n on n.oid = c.relnamespace
        where c.relkind = 'r'
          and n.nspname in ('public', 'crm')
      loop
        execute format('alter table %I.%I enable row level security', r.schema_name, r.table_name);
        execute format('revoke all privileges on table %I.%I from public', r.schema_name, r.table_name);
        foreach principal in array array['anon', 'authenticated']
        loop
          if exists (select 1 from pg_roles where rolname = principal) then
            execute format('revoke all privileges on table %I.%I from %I', r.schema_name, r.table_name, principal);
          end if;
        end loop;
      end loop;
    end $$;
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Intentionally a no-op: a rollback must never DISABLE RLS and re-expose
  // lead / user tables. Manage RLS forward-only.
}
