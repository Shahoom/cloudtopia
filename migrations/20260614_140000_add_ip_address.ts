import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Capture visitor IP on every interaction record (chatbot conversations,
// solution-finder leads, chatbot leads, contact inquiries). Additive + idempotent.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    alter table "ai_chat_conversations" add column if not exists "ip_address" varchar;
    alter table "solution_finder_leads" add column if not exists "ip_address" varchar;
    alter table "ai_chat_leads" add column if not exists "ip_address" varchar;
    alter table "contact_inquiries" add column if not exists "ip_address" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    alter table "ai_chat_conversations" drop column if exists "ip_address";
    alter table "solution_finder_leads" drop column if exists "ip_address";
    alter table "ai_chat_leads" drop column if exists "ip_address";
    alter table "contact_inquiries" drop column if exists "ip_address";
  `)
}
