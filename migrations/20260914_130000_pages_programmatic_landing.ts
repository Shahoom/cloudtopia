import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

/**
 * Pre-existing drift fix: the Pages collection gained a `programmaticLanding`
 * group (family, target slug, SEO copy, secondary keywords, internal links,
 * FAQs) that was never migrated to production, so every Payload read of
 * `pages` failed with 'relation "pages_programmatic_landing_secondary_keywords"
 * does not exist' — the Pages list/editor in the live admin, and any hook
 * that loads a page. Generated from the config snapshot; additive only.
 */

const NEW_TABLES = ["pages_programmatic_landing_secondary_keywords","pages_programmatic_landing_internal_links","pages_programmatic_landing_faqs"]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
CREATE TYPE "public"."enum_pages_programmatic_landing_internal_links_type" AS ENUM('service', 'industry', 'market', 'pricing', 'contact', 'proof');
CREATE TYPE "public"."enum_pages_programmatic_landing_family" AS ENUM('sub-service', 'industry', 'market');
CREATE TABLE "pages_programmatic_landing_secondary_keywords" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"keyword" varchar NOT NULL
);
CREATE TABLE "pages_programmatic_landing_internal_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"href" varchar NOT NULL,
	"type" "enum_pages_programmatic_landing_internal_links_type"
);
CREATE TABLE "pages_programmatic_landing_faqs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"question" varchar NOT NULL,
	"answer" varchar NOT NULL
);
ALTER TABLE "pages" ADD COLUMN "programmatic_landing_family" "enum_pages_programmatic_landing_family";
ALTER TABLE "pages" ADD COLUMN "programmatic_landing_target_slug" varchar;
ALTER TABLE "pages" ADD COLUMN "programmatic_landing_seo_title" varchar;
ALTER TABLE "pages" ADD COLUMN "programmatic_landing_meta_description" varchar;
ALTER TABLE "pages" ADD COLUMN "programmatic_landing_h1" varchar;
ALTER TABLE "pages" ADD COLUMN "programmatic_landing_intro_copy" varchar;
ALTER TABLE "pages" ADD COLUMN "programmatic_landing_primary_keyword" varchar;
ALTER TABLE "pages" ADD COLUMN "programmatic_landing_schema_notes" varchar;
ALTER TABLE "pages_programmatic_landing_secondary_keywords" ADD CONSTRAINT "pages_programmatic_landing_secondary_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "pages_programmatic_landing_internal_links" ADD CONSTRAINT "pages_programmatic_landing_internal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "pages_programmatic_landing_faqs" ADD CONSTRAINT "pages_programmatic_landing_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "pages_programmatic_landing_secondary_keywords_order_idx" ON "pages_programmatic_landing_secondary_keywords" USING btree ("_order");
CREATE INDEX "pages_programmatic_landing_secondary_keywords_parent_id_idx" ON "pages_programmatic_landing_secondary_keywords" USING btree ("_parent_id");
CREATE INDEX "pages_programmatic_landing_internal_links_order_idx" ON "pages_programmatic_landing_internal_links" USING btree ("_order");
CREATE INDEX "pages_programmatic_landing_internal_links_parent_id_idx" ON "pages_programmatic_landing_internal_links" USING btree ("_parent_id");
CREATE INDEX "pages_programmatic_landing_faqs_order_idx" ON "pages_programmatic_landing_faqs" USING btree ("_order");
CREATE INDEX "pages_programmatic_landing_faqs_parent_id_idx" ON "pages_programmatic_landing_faqs" USING btree ("_parent_id");
`)

  for (const table of NEW_TABLES) {
    await db.execute(`
    do $$
    declare principal text;
    begin
      execute format('alter table public.%I enable row level security', '${table}');
      execute format('revoke all privileges on table public.%I from public', '${table}');
      foreach principal in array array['anon', 'authenticated']
      loop
        if exists (select 1 from pg_roles where rolname = principal) then
          execute format('revoke all privileges on table public.%I from %I', '${table}', principal);
        end if;
      end loop;
    end $$;
    `)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    alter table public."pages" drop column if exists "programmatic_landing_family", drop column if exists "programmatic_landing_target_slug", drop column if exists "programmatic_landing_seo_title", drop column if exists "programmatic_landing_meta_description", drop column if exists "programmatic_landing_h1", drop column if exists "programmatic_landing_intro_copy", drop column if exists "programmatic_landing_primary_keyword", drop column if exists "programmatic_landing_schema_notes";
    drop table if exists public."pages_programmatic_landing_secondary_keywords", public."pages_programmatic_landing_internal_links", public."pages_programmatic_landing_faqs" cascade;
    drop type if exists public."enum_pages_programmatic_landing_internal_links_type", public."enum_pages_programmatic_landing_family";
  `)
}
