import { sql } from '@payloadcms/db-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "template" varchar DEFAULT 'content' NOT NULL,
      ADD COLUMN IF NOT EXISTS "public_path" varchar,
      ADD COLUMN IF NOT EXISTS "hero_badge" varchar,
      ADD COLUMN IF NOT EXISTS "hero_title" varchar,
      ADD COLUMN IF NOT EXISTS "hero_title_highlight" varchar,
      ADD COLUMN IF NOT EXISTS "hero_description" varchar,
      ADD COLUMN IF NOT EXISTS "hero_primary_label" varchar,
      ADD COLUMN IF NOT EXISTS "hero_primary_href" varchar,
      ADD COLUMN IF NOT EXISTS "hero_secondary_label" varchar,
      ADD COLUMN IF NOT EXISTS "hero_secondary_href" varchar,
      ADD COLUMN IF NOT EXISTS "cta_label" varchar,
      ADD COLUMN IF NOT EXISTS "cta_href" varchar,
      ADD COLUMN IF NOT EXISTS "cta_secondary_label" varchar,
      ADD COLUMN IF NOT EXISTS "cta_secondary_href" varchar,
      ADD COLUMN IF NOT EXISTS "editor_notes" varchar;

    CREATE INDEX IF NOT EXISTS "pages_template_idx" ON "pages" USING btree ("template");
    CREATE INDEX IF NOT EXISTS "pages_status_idx" ON "pages" USING btree ("status");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "pages_template_idx";
    DROP INDEX IF EXISTS "pages_status_idx";

    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "template",
      DROP COLUMN IF EXISTS "public_path",
      DROP COLUMN IF EXISTS "hero_badge",
      DROP COLUMN IF EXISTS "hero_title",
      DROP COLUMN IF EXISTS "hero_title_highlight",
      DROP COLUMN IF EXISTS "hero_description",
      DROP COLUMN IF EXISTS "hero_primary_label",
      DROP COLUMN IF EXISTS "hero_primary_href",
      DROP COLUMN IF EXISTS "hero_secondary_label",
      DROP COLUMN IF EXISTS "hero_secondary_href",
      DROP COLUMN IF EXISTS "cta_label",
      DROP COLUMN IF EXISTS "cta_href",
      DROP COLUMN IF EXISTS "cta_secondary_label",
      DROP COLUMN IF EXISTS "cta_secondary_href",
      DROP COLUMN IF EXISTS "editor_notes";
  `)
}
