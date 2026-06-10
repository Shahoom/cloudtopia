import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    begin
      if not exists (select 1 from pg_type where typname = 'enum_ai_chat_leads_status') then
        create type "public"."enum_ai_chat_leads_status" as enum ('new', 'contacted', 'qualified', 'won', 'lost');
      end if;
    end $$;

    -- Bring ai_chat_leads in line with collections/AIChatLeads.ts: add the CRM
    -- status enum column and internal notes. (The "source" column is already
    -- created by 20260605_150500_add_crm_ai_leads, so it is intentionally NOT
    -- re-added here — that keeps up()/down() symmetric.)
    alter table "ai_chat_leads"
      add column if not exists "status" "enum_ai_chat_leads_status" default 'new' not null,
      add column if not exists "notes" text;

    create index if not exists "ai_chat_leads_status_idx" on "ai_chat_leads" using btree ("status");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    drop index if exists "ai_chat_leads_status_idx";
    alter table "ai_chat_leads"
      drop column if exists "status",
      drop column if exists "notes";
    drop type if exists "public"."enum_ai_chat_leads_status";
  `)
}
