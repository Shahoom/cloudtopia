import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    begin
      if not exists (select 1 from pg_type where typname = 'enum_blog_categories_locale') then
        create type "public"."enum_blog_categories_locale" as enum ('en', 'ar', 'tr');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_tags_locale') then
        create type "public"."enum_blog_tags_locale" as enum ('en', 'ar', 'tr');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_locale') then
        create type "public"."enum_blog_posts_locale" as enum ('en', 'ar', 'tr');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_status') then
        create type "public"."enum_blog_posts_status" as enum ('draft', 'published');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_newsletter_subscribers_status') then
        create type "public"."enum_newsletter_subscribers_status" as enum ('subscribed', 'unsubscribed');
      end if;
    end $$;

    create table if not exists "blog_categories" (
      "id" serial primary key not null,
      "locale" "enum_blog_categories_locale" default 'en' not null,
      "name" varchar not null,
      "slug" varchar not null,
      "description" varchar,
      "image_id" integer,
      "icon" varchar,
      "color" varchar default '#0284c7',
      "seo_meta_title" varchar,
      "seo_meta_description" varchar,
      "seo_keywords" varchar,
      "seo_canonical_url" varchar,
      "seo_og_image_id" integer,
      "seo_no_index" boolean default false,
      "order" numeric default 0,
      "featured" boolean default false,
      "updated_at" timestamp(3) with time zone default now() not null,
      "created_at" timestamp(3) with time zone default now() not null
    );

    create table if not exists "blog_tags" (
      "id" serial primary key not null,
      "locale" "enum_blog_tags_locale" default 'en' not null,
      "name" varchar not null,
      "slug" varchar not null,
      "updated_at" timestamp(3) with time zone default now() not null,
      "created_at" timestamp(3) with time zone default now() not null
    );

    create table if not exists "blog_posts" (
      "id" serial primary key not null,
      "locale" "enum_blog_posts_locale" default 'en' not null,
      "title" varchar not null,
      "slug" varchar not null,
      "excerpt" varchar not null,
      "content" jsonb not null,
      "cover_image_id" integer,
      "category_id" integer,
      "author_id" integer,
      "seo_meta_title" varchar,
      "seo_meta_description" varchar,
      "seo_keywords" varchar,
      "seo_canonical_url" varchar,
      "seo_og_image_id" integer,
      "seo_no_index" boolean default false,
      "status" "enum_blog_posts_status" default 'draft' not null,
      "featured" boolean default false,
      "pinned" boolean default false,
      "published_at" timestamp(3) with time zone,
      "reading_time" numeric default 1,
      "views_count" numeric default 0,
      "table_of_contents" boolean default true,
      "updated_at" timestamp(3) with time zone default now() not null,
      "created_at" timestamp(3) with time zone default now() not null
    );

    create table if not exists "blog_posts_rels" (
      "id" serial primary key not null,
      "order" integer,
      "parent_id" integer not null,
      "path" varchar not null,
      "media_id" integer,
      "blog_tags_id" integer,
      "blog_posts_id" integer
    );

    create table if not exists "newsletter_subscribers" (
      "id" serial primary key not null,
      "email" varchar not null,
      "name" varchar,
      "source" varchar default 'insights',
      "subscribed_at" timestamp(3) with time zone,
      "status" "enum_newsletter_subscribers_status" default 'subscribed' not null,
      "updated_at" timestamp(3) with time zone default now() not null,
      "created_at" timestamp(3) with time zone default now() not null
    );

    do $$
    begin
      if not exists (select 1 from pg_constraint where conname = 'blog_categories_image_id_media_id_fk') then
        alter table "blog_categories"
          add constraint "blog_categories_image_id_media_id_fk"
          foreign key ("image_id") references "media"("id") on delete set null on update no action;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_categories_seo_og_image_id_media_id_fk') then
        alter table "blog_categories"
          add constraint "blog_categories_seo_og_image_id_media_id_fk"
          foreign key ("seo_og_image_id") references "media"("id") on delete set null on update no action;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_cover_image_id_media_id_fk') then
        alter table "blog_posts"
          add constraint "blog_posts_cover_image_id_media_id_fk"
          foreign key ("cover_image_id") references "media"("id") on delete set null on update no action;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_category_id_blog_categories_id_fk') then
        alter table "blog_posts"
          add constraint "blog_posts_category_id_blog_categories_id_fk"
          foreign key ("category_id") references "blog_categories"("id") on delete set null on update no action;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_author_id_authors_id_fk') then
        alter table "blog_posts"
          add constraint "blog_posts_author_id_authors_id_fk"
          foreign key ("author_id") references "authors"("id") on delete set null on update no action;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_seo_og_image_id_media_id_fk') then
        alter table "blog_posts"
          add constraint "blog_posts_seo_og_image_id_media_id_fk"
          foreign key ("seo_og_image_id") references "media"("id") on delete set null on update no action;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_rels_parent_fk') then
        alter table "blog_posts_rels"
          add constraint "blog_posts_rels_parent_fk"
          foreign key ("parent_id") references "blog_posts"("id") on delete cascade on update no action;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_rels_media_fk') then
        alter table "blog_posts_rels"
          add constraint "blog_posts_rels_media_fk"
          foreign key ("media_id") references "media"("id") on delete cascade on update no action;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_rels_blog_tags_fk') then
        alter table "blog_posts_rels"
          add constraint "blog_posts_rels_blog_tags_fk"
          foreign key ("blog_tags_id") references "blog_tags"("id") on delete cascade on update no action;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_rels_blog_posts_fk') then
        alter table "blog_posts_rels"
          add constraint "blog_posts_rels_blog_posts_fk"
          foreign key ("blog_posts_id") references "blog_posts"("id") on delete cascade on update no action;
      end if;
    end $$;

    create unique index if not exists "blog_categories_slug_idx" on "blog_categories" using btree ("slug");
    create index if not exists "blog_categories_locale_idx" on "blog_categories" using btree ("locale");
    create index if not exists "blog_categories_image_idx" on "blog_categories" using btree ("image_id");
    create index if not exists "blog_categories_seo_og_image_idx" on "blog_categories" using btree ("seo_og_image_id");
    create index if not exists "blog_categories_updated_at_idx" on "blog_categories" using btree ("updated_at");
    create index if not exists "blog_categories_created_at_idx" on "blog_categories" using btree ("created_at");

    create unique index if not exists "blog_tags_slug_idx" on "blog_tags" using btree ("slug");
    create index if not exists "blog_tags_locale_idx" on "blog_tags" using btree ("locale");
    create index if not exists "blog_tags_updated_at_idx" on "blog_tags" using btree ("updated_at");
    create index if not exists "blog_tags_created_at_idx" on "blog_tags" using btree ("created_at");

    create unique index if not exists "blog_posts_slug_idx" on "blog_posts" using btree ("slug");
    create index if not exists "blog_posts_locale_idx" on "blog_posts" using btree ("locale");
    create index if not exists "blog_posts_status_idx" on "blog_posts" using btree ("status");
    create index if not exists "blog_posts_published_at_idx" on "blog_posts" using btree ("published_at");
    create index if not exists "blog_posts_cover_image_idx" on "blog_posts" using btree ("cover_image_id");
    create index if not exists "blog_posts_category_idx" on "blog_posts" using btree ("category_id");
    create index if not exists "blog_posts_author_idx" on "blog_posts" using btree ("author_id");
    create index if not exists "blog_posts_seo_og_image_idx" on "blog_posts" using btree ("seo_og_image_id");
    create index if not exists "blog_posts_updated_at_idx" on "blog_posts" using btree ("updated_at");
    create index if not exists "blog_posts_created_at_idx" on "blog_posts" using btree ("created_at");

    create index if not exists "blog_posts_rels_order_idx" on "blog_posts_rels" using btree ("order");
    create index if not exists "blog_posts_rels_parent_idx" on "blog_posts_rels" using btree ("parent_id");
    create index if not exists "blog_posts_rels_path_idx" on "blog_posts_rels" using btree ("path");
    create index if not exists "blog_posts_rels_media_id_idx" on "blog_posts_rels" using btree ("media_id");
    create index if not exists "blog_posts_rels_blog_tags_id_idx" on "blog_posts_rels" using btree ("blog_tags_id");
    create index if not exists "blog_posts_rels_blog_posts_id_idx" on "blog_posts_rels" using btree ("blog_posts_id");

    create unique index if not exists "newsletter_subscribers_email_idx" on "newsletter_subscribers" using btree ("email");
    create index if not exists "newsletter_subscribers_status_idx" on "newsletter_subscribers" using btree ("status");
    create index if not exists "newsletter_subscribers_updated_at_idx" on "newsletter_subscribers" using btree ("updated_at");
    create index if not exists "newsletter_subscribers_created_at_idx" on "newsletter_subscribers" using btree ("created_at");

    alter table "payload_locked_documents_rels"
      add column if not exists "blog_categories_id" integer,
      add column if not exists "blog_tags_id" integer,
      add column if not exists "blog_posts_id" integer,
      add column if not exists "newsletter_subscribers_id" integer;

    create index if not exists "payload_locked_documents_rels_blog_categories_id_idx"
      on "payload_locked_documents_rels" using btree ("blog_categories_id");
    create index if not exists "payload_locked_documents_rels_blog_tags_id_idx"
      on "payload_locked_documents_rels" using btree ("blog_tags_id");
    create index if not exists "payload_locked_documents_rels_blog_posts_id_idx"
      on "payload_locked_documents_rels" using btree ("blog_posts_id");
    create index if not exists "payload_locked_documents_rels_newsletter_subscribers_id_idx"
      on "payload_locked_documents_rels" using btree ("newsletter_subscribers_id");

    do $$
    begin
      if not exists (select 1 from pg_constraint where conname = 'payload_locked_documents_rels_blog_categories_fk') then
        alter table "payload_locked_documents_rels"
          add constraint "payload_locked_documents_rels_blog_categories_fk"
          foreign key ("blog_categories_id") references "blog_categories"("id") on delete cascade on update no action;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'payload_locked_documents_rels_blog_tags_fk') then
        alter table "payload_locked_documents_rels"
          add constraint "payload_locked_documents_rels_blog_tags_fk"
          foreign key ("blog_tags_id") references "blog_tags"("id") on delete cascade on update no action;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'payload_locked_documents_rels_blog_posts_fk') then
        alter table "payload_locked_documents_rels"
          add constraint "payload_locked_documents_rels_blog_posts_fk"
          foreign key ("blog_posts_id") references "blog_posts"("id") on delete cascade on update no action;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'payload_locked_documents_rels_newsletter_subscribers_fk') then
        alter table "payload_locked_documents_rels"
          add constraint "payload_locked_documents_rels_newsletter_subscribers_fk"
          foreign key ("newsletter_subscribers_id") references "newsletter_subscribers"("id") on delete cascade on update no action;
      end if;
    end $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    alter table "payload_locked_documents_rels"
      drop constraint if exists "payload_locked_documents_rels_newsletter_subscribers_fk",
      drop constraint if exists "payload_locked_documents_rels_blog_posts_fk",
      drop constraint if exists "payload_locked_documents_rels_blog_tags_fk",
      drop constraint if exists "payload_locked_documents_rels_blog_categories_fk";

    drop index if exists "payload_locked_documents_rels_newsletter_subscribers_id_idx";
    drop index if exists "payload_locked_documents_rels_blog_posts_id_idx";
    drop index if exists "payload_locked_documents_rels_blog_tags_id_idx";
    drop index if exists "payload_locked_documents_rels_blog_categories_id_idx";

    alter table "payload_locked_documents_rels"
      drop column if exists "newsletter_subscribers_id",
      drop column if exists "blog_posts_id",
      drop column if exists "blog_tags_id",
      drop column if exists "blog_categories_id";

    drop table if exists "blog_posts_rels";
    drop table if exists "newsletter_subscribers";
    drop table if exists "blog_posts";
    drop table if exists "blog_tags";
    drop table if exists "blog_categories";

    drop type if exists "public"."enum_newsletter_subscribers_status";
    drop type if exists "public"."enum_blog_posts_status";
    drop type if exists "public"."enum_blog_posts_locale";
    drop type if exists "public"."enum_blog_tags_locale";
    drop type if exists "public"."enum_blog_categories_locale";
  `)
}
