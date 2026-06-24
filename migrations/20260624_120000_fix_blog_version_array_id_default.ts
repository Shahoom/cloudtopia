import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Blog draft/publish saves 500'd with:
//   null value in column "id" of relation "_blog_posts_v_version_related_services"
//   violates not-null constraint
//
// The version-snapshot array sub-tables have a `varchar NOT NULL` primary-key
// `id` with no auto-default. Payload normally supplies that id app-side, but when
// it writes a version row without one (e.g. a related-services / source / reference
// / internal-link item added or changed in the editor), the insert fails and the
// entire save dies — so any post that uses those array fields can't be saved or
// published. Give the PK a generated default (24-char hex, matching Payload's id
// style) so a missing id auto-fills instead of crashing the save. Idempotent and
// guarded so it is safe across environments.
const TABLES = [
  '_blog_posts_v_version_related_services',
  '_blog_posts_v_version_external_sources',
  '_blog_posts_v_version_references',
  '_blog_posts_v_version_internal_links_suggestions',
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of TABLES) {
    await db.execute(`
      do $$ begin
        if to_regclass('public.${table}') is not null then
          alter table "${table}" alter column "id"
            set default substr(md5(random()::text || clock_timestamp()::text), 1, 24);
        end if;
      end $$;
    `)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const table of TABLES) {
    await db.execute(`
      do $$ begin
        if to_regclass('public.${table}') is not null then
          alter table "${table}" alter column "id" drop default;
        end if;
      end $$;
    `)
  }
}
