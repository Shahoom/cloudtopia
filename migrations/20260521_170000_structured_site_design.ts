import { sql } from '@payloadcms/db-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_design"
      ADD COLUMN IF NOT EXISTS "brand_name" varchar,
      ADD COLUMN IF NOT EXISTS "brand_tagline" varchar,
      ADD COLUMN IF NOT EXISTS "brand_logo" varchar,
      ADD COLUMN IF NOT EXISTS "colors_dark" varchar,
      ADD COLUMN IF NOT EXISTS "colors_primary" varchar,
      ADD COLUMN IF NOT EXISTS "colors_secondary" varchar,
      ADD COLUMN IF NOT EXISTS "colors_background" varchar,
      ADD COLUMN IF NOT EXISTS "typography_heading" varchar,
      ADD COLUMN IF NOT EXISTS "typography_body" varchar,
      ADD COLUMN IF NOT EXISTS "typography_logo" varchar,
      ADD COLUMN IF NOT EXISTS "radius_card" numeric,
      ADD COLUMN IF NOT EXISTS "radius_control" numeric,
      ADD COLUMN IF NOT EXISTS "motion_enabled" boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS "motion_intensity" varchar,
      ADD COLUMN IF NOT EXISTS "cta_label" varchar,
      ADD COLUMN IF NOT EXISTS "cta_href" varchar,
      ADD COLUMN IF NOT EXISTS "contact_email" varchar,
      ADD COLUMN IF NOT EXISTS "contact_phone" varchar,
      ADD COLUMN IF NOT EXISTS "contact_whatsapp" varchar,
      ADD COLUMN IF NOT EXISTS "social_whatsapp" varchar,
      ADD COLUMN IF NOT EXISTS "social_x" varchar,
      ADD COLUMN IF NOT EXISTS "social_github" varchar,
      ADD COLUMN IF NOT EXISTS "social_instagram" varchar,
      ADD COLUMN IF NOT EXISTS "nav_home_label" varchar,
      ADD COLUMN IF NOT EXISTS "nav_services_label" varchar,
      ADD COLUMN IF NOT EXISTS "nav_projects_label" varchar,
      ADD COLUMN IF NOT EXISTS "nav_labs_label" varchar,
      ADD COLUMN IF NOT EXISTS "nav_about_label" varchar,
      ADD COLUMN IF NOT EXISTS "nav_blog_label" varchar,
      ADD COLUMN IF NOT EXISTS "nav_contact_label" varchar,
      ADD COLUMN IF NOT EXISTS "footer_description" varchar,
      ADD COLUMN IF NOT EXISTS "footer_copyright" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_design"
      DROP COLUMN IF EXISTS "brand_name",
      DROP COLUMN IF EXISTS "brand_tagline",
      DROP COLUMN IF EXISTS "brand_logo",
      DROP COLUMN IF EXISTS "colors_dark",
      DROP COLUMN IF EXISTS "colors_primary",
      DROP COLUMN IF EXISTS "colors_secondary",
      DROP COLUMN IF EXISTS "colors_background",
      DROP COLUMN IF EXISTS "typography_heading",
      DROP COLUMN IF EXISTS "typography_body",
      DROP COLUMN IF EXISTS "typography_logo",
      DROP COLUMN IF EXISTS "radius_card",
      DROP COLUMN IF EXISTS "radius_control",
      DROP COLUMN IF EXISTS "motion_enabled",
      DROP COLUMN IF EXISTS "motion_intensity",
      DROP COLUMN IF EXISTS "cta_label",
      DROP COLUMN IF EXISTS "cta_href",
      DROP COLUMN IF EXISTS "contact_email",
      DROP COLUMN IF EXISTS "contact_phone",
      DROP COLUMN IF EXISTS "contact_whatsapp",
      DROP COLUMN IF EXISTS "social_whatsapp",
      DROP COLUMN IF EXISTS "social_x",
      DROP COLUMN IF EXISTS "social_github",
      DROP COLUMN IF EXISTS "social_instagram",
      DROP COLUMN IF EXISTS "nav_home_label",
      DROP COLUMN IF EXISTS "nav_services_label",
      DROP COLUMN IF EXISTS "nav_projects_label",
      DROP COLUMN IF EXISTS "nav_labs_label",
      DROP COLUMN IF EXISTS "nav_about_label",
      DROP COLUMN IF EXISTS "nav_blog_label",
      DROP COLUMN IF EXISTS "nav_contact_label",
      DROP COLUMN IF EXISTS "footer_description",
      DROP COLUMN IF EXISTS "footer_copyright";
  `)
}
