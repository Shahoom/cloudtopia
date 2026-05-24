import { sql } from '@payloadcms/db-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages" (
      "id" serial PRIMARY KEY NOT NULL,
      "locale" "enum_site_content_locale" DEFAULT 'en' NOT NULL,
      "slug" varchar NOT NULL,
      "title" varchar NOT NULL,
      "status" varchar DEFAULT 'published' NOT NULL,
      "seo" jsonb NOT NULL,
      "sections" jsonb NOT NULL,
      "design" jsonb NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "site_design" (
      "id" serial PRIMARY KEY NOT NULL,
      "key" varchar NOT NULL,
      "theme" jsonb NOT NULL,
      "navigation" jsonb NOT NULL,
      "editable_sections" jsonb NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "pages_locale_slug_idx" ON "pages" USING btree ("locale", "slug");
    CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "site_design_key_idx" ON "site_design" USING btree ("key");
    CREATE INDEX IF NOT EXISTS "site_design_updated_at_idx" ON "site_design" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "site_design_created_at_idx" ON "site_design" USING btree ("created_at");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages" CASCADE;
    DROP TABLE IF EXISTS "site_design" CASCADE;
  `)
}
