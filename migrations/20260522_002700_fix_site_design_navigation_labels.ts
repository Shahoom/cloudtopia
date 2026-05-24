import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    alter table "site_design"
      add column if not exists "navigation_labels_home" varchar,
      add column if not exists "navigation_labels_services" varchar,
      add column if not exists "navigation_labels_projects" varchar,
      add column if not exists "navigation_labels_labs" varchar,
      add column if not exists "navigation_labels_about" varchar,
      add column if not exists "navigation_labels_blog" varchar,
      add column if not exists "navigation_labels_contact" varchar;

    update "site_design"
    set
      "navigation_labels_home" = coalesce("navigation_labels_home", "nav_home_label", 'Home'),
      "navigation_labels_services" = coalesce("navigation_labels_services", "nav_services_label", 'Services'),
      "navigation_labels_projects" = coalesce("navigation_labels_projects", "nav_projects_label", 'Projects'),
      "navigation_labels_labs" = coalesce("navigation_labels_labs", "nav_labs_label", 'Labs'),
      "navigation_labels_about" = coalesce("navigation_labels_about", "nav_about_label", 'About'),
      "navigation_labels_blog" = coalesce("navigation_labels_blog", "nav_blog_label", 'Blog'),
      "navigation_labels_contact" = coalesce("navigation_labels_contact", "nav_contact_label", 'Contact')
    where "key" = 'default';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    alter table "site_design"
      drop column if exists "navigation_labels_home",
      drop column if exists "navigation_labels_services",
      drop column if exists "navigation_labels_projects",
      drop column if exists "navigation_labels_labs",
      drop column if exists "navigation_labels_about",
      drop column if exists "navigation_labels_blog",
      drop column if exists "navigation_labels_contact";
  `)
}
