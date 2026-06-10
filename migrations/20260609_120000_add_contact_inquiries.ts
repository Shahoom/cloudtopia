import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    begin
      if not exists (select 1 from pg_type where typname = 'enum_contact_inquiries_source') then
        create type "public"."enum_contact_inquiries_source" as enum ('contact-form', 'article-sidebar', 'pricing-page', 'other');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_contact_inquiries_locale') then
        create type "public"."enum_contact_inquiries_locale" as enum ('en', 'ar');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_contact_inquiries_status') then
        create type "public"."enum_contact_inquiries_status" as enum ('new', 'contacted', 'qualified', 'won', 'lost');
      end if;
    end $$;

    create table if not exists "contact_inquiries" (
      "id" serial primary key not null,
      "name" varchar,
      "email" varchar,
      "phone" varchar,
      "company" varchar,
      "country" varchar,
      "service" varchar,
      "budget" varchar,
      "timeline" varchar,
      "message" text not null,
      "source" "enum_contact_inquiries_source" default 'contact-form',
      "locale" "enum_contact_inquiries_locale" default 'en',
      "page_url" varchar,
      "status" "enum_contact_inquiries_status" default 'new' not null,
      "notes" text,
      "created_at" timestamp(3) with time zone default now() not null,
      "updated_at" timestamp(3) with time zone default now() not null
    );

    create index if not exists "contact_inquiries_created_at_idx" on "contact_inquiries" using btree ("created_at");
    create index if not exists "contact_inquiries_email_idx" on "contact_inquiries" using btree ("email");
    create index if not exists "contact_inquiries_status_idx" on "contact_inquiries" using btree ("status");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    drop table if exists "contact_inquiries";
    drop type if exists "public"."enum_contact_inquiries_status";
    drop type if exists "public"."enum_contact_inquiries_locale";
    drop type if exists "public"."enum_contact_inquiries_source";
  `)
}
