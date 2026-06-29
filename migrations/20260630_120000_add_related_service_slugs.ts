import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Add the `related_service_slugs` text column to `projects` so projects can be
// tagged (comma/space-separated service & pillar slugs) and surfaced on the
// matching service pages' "Projects we did" section. Additive + idempotent;
// nullable, so existing rows and the runtime SQL (which uses
// `coalesce(p.related_service_slugs, '')`) are unaffected when empty.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    alter table "projects" add column if not exists "related_service_slugs" text;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    alter table "projects" drop column if exists "related_service_slugs";
  `)
}
