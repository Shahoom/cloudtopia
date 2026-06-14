import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Per-route SEO overrides table (tab title + meta description + canonical +
// robots) keyed by (route_path, locale). Additive and idempotent — safe on any
// environment. Backs the SEO control center and the getSeoOverride resolver.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    begin
      if not exists (select 1 from pg_type where typname = 'enum_seo_overrides_locale') then
        create type "public"."enum_seo_overrides_locale" as enum ('en', 'ar');
      end if;
    end $$;

    create table if not exists "seo_overrides" (
      "id" serial primary key not null,
      "route_path" varchar not null,
      "locale" "enum_seo_overrides_locale" default 'en' not null,
      "meta_title" varchar,
      "meta_description" text,
      "canonical_url" varchar,
      "no_index" boolean default false,
      "no_follow" boolean default false,
      "created_at" timestamp(3) with time zone default now() not null,
      "updated_at" timestamp(3) with time zone default now() not null
    );

    create unique index if not exists "seo_overrides_route_path_locale_idx" on "seo_overrides" using btree ("route_path", "locale");
    create index if not exists "seo_overrides_route_path_idx" on "seo_overrides" using btree ("route_path");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    drop table if exists "seo_overrides";
    drop type if exists "public"."enum_seo_overrides_locale";
  `)
}
