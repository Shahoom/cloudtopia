import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

/**
 * Adds the `role` column backing the new Users role field (admin | editor).
 * Existing accounts are backfilled as `admin` — the site has always been a
 * single-admin team, so nobody loses access. Hand-written (not generated)
 * because the local dev DB is behind prod and the generator would have
 * produced a wrong full-schema diff; this is the complete delta.
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    begin
      if not exists (select 1 from pg_type where typname = 'enum_users_role') then
        create type public.enum_users_role as enum ('admin', 'editor');
      end if;

      if not exists (
        select 1 from information_schema.columns
        where table_schema = 'public' and table_name = 'users' and column_name = 'role'
      ) then
        alter table public.users
          add column role public.enum_users_role not null default 'admin';
      end if;
    end $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    alter table public.users drop column if exists role;
    drop type if exists public.enum_users_role;
  `)
}
