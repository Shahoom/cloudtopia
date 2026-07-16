import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    begin
      if not exists (select 1 from pg_type where typname = 'enum_hasm_erp_leads_language') then
        create type "public"."enum_hasm_erp_leads_language" as enum ('ar', 'en');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_hasm_erp_leads_status') then
        create type "public"."enum_hasm_erp_leads_status" as enum ('new', 'contacted', 'qualified', 'won', 'lost');
      end if;
    end $$;

    create table if not exists "public"."hasm_erp_leads" (
      "id" serial primary key not null,
      "name" varchar not null,
      "email" varchar not null,
      "phone" varchar not null,
      "ip_address" varchar,
      "language" "public"."enum_hasm_erp_leads_language" default 'ar' not null,
      "timezone" varchar,
      "screen" varchar,
      "user_agent" text,
      "accept_language" varchar,
      "page_url" varchar,
      "referrer" varchar,
      "utm_source" varchar,
      "utm_medium" varchar,
      "utm_campaign" varchar,
      "utm_term" varchar,
      "utm_content" varchar,
      "consent_at" timestamp(3) with time zone not null,
      "consent_version" varchar not null,
      "submission_id" varchar not null,
      "source" varchar default 'hasm-public-demo' not null,
      "product" varchar default 'Hasm ERP' not null,
      "status" "public"."enum_hasm_erp_leads_status" default 'new' not null,
      "notes" text,
      "created_at" timestamp(3) with time zone default now() not null,
      "updated_at" timestamp(3) with time zone default now() not null
    );

    create unique index if not exists "hasm_erp_leads_submission_id_idx" on "public"."hasm_erp_leads" using btree ("submission_id");
    create index if not exists "hasm_erp_leads_created_at_idx" on "public"."hasm_erp_leads" using btree ("created_at");
    create index if not exists "hasm_erp_leads_email_idx" on "public"."hasm_erp_leads" using btree ("email");
    create index if not exists "hasm_erp_leads_ip_created_idx" on "public"."hasm_erp_leads" using btree ("ip_address", "created_at");
    create index if not exists "hasm_erp_leads_status_idx" on "public"."hasm_erp_leads" using btree ("status");

    alter table "public"."hasm_erp_leads" enable row level security;
    revoke all privileges on table "public"."hasm_erp_leads" from public;
    revoke all privileges on sequence "public"."hasm_erp_leads_id_seq" from public;

    do $$
    begin
      if exists (select 1 from pg_roles where rolname = 'anon') then
        revoke all privileges on table "public"."hasm_erp_leads" from anon;
        revoke all privileges on sequence "public"."hasm_erp_leads_id_seq" from anon;
      end if;
      if exists (select 1 from pg_roles where rolname = 'authenticated') then
        revoke all privileges on table "public"."hasm_erp_leads" from authenticated;
        revoke all privileges on sequence "public"."hasm_erp_leads_id_seq" from authenticated;
      end if;
    end $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    drop table if exists "public"."hasm_erp_leads";
    drop type if exists "public"."enum_hasm_erp_leads_status";
    drop type if exists "public"."enum_hasm_erp_leads_language";
  `)
}
