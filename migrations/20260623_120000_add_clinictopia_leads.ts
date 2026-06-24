import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Adds the ClinicTopia demo leads collection (clinic.cloudtopia.net sign-ins).
// Additive + idempotent — creates only the new table/enums, touches nothing else.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    begin
      if not exists (select 1 from pg_type where typname = 'enum_clinictopia_leads_language') then
        create type "public"."enum_clinictopia_leads_language" as enum ('ar', 'en');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_clinictopia_leads_status') then
        create type "public"."enum_clinictopia_leads_status" as enum ('new', 'contacted', 'qualified', 'won', 'lost');
      end if;
    end $$;

    create table if not exists "clinictopia_leads" (
      "id" serial primary key not null,
      "name" varchar,
      "email" varchar,
      "phone" varchar,
      "ip_address" varchar,
      "language" "enum_clinictopia_leads_language" default 'ar',
      "timezone" varchar,
      "screen" varchar,
      "user_agent" text,
      "page_url" varchar,
      "source" varchar default 'clinictopia-demo',
      "product" varchar default 'ClinicTopia',
      "status" "enum_clinictopia_leads_status" default 'new' not null,
      "notes" text,
      "created_at" timestamp(3) with time zone default now() not null,
      "updated_at" timestamp(3) with time zone default now() not null
    );

    create index if not exists "clinictopia_leads_created_at_idx" on "clinictopia_leads" using btree ("created_at");
    create index if not exists "clinictopia_leads_email_idx" on "clinictopia_leads" using btree ("email");
    create index if not exists "clinictopia_leads_status_idx" on "clinictopia_leads" using btree ("status");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    drop table if exists "clinictopia_leads";
    drop type if exists "public"."enum_clinictopia_leads_status";
    drop type if exists "public"."enum_clinictopia_leads_language";
  `)
}
