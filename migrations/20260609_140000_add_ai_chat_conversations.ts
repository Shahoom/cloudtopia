import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    begin
      if not exists (select 1 from pg_type where typname = 'enum_ai_chat_conversations_language') then
        create type "public"."enum_ai_chat_conversations_language" as enum ('ar', 'en', 'unknown');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_ai_chat_conversations_status') then
        create type "public"."enum_ai_chat_conversations_status" as enum ('active', 'completed');
      end if;
    end $$;

    create table if not exists "ai_chat_conversations" (
      "id" serial primary key not null,
      "session_id" varchar not null,
      "language" "enum_ai_chat_conversations_language" default 'unknown',
      "country" varchar,
      "page_url" varchar,
      "transcript_text" text,
      "messages" jsonb,
      "message_count" numeric default 0,
      "lead_captured" boolean default false,
      "status" "enum_ai_chat_conversations_status" default 'active' not null,
      "source" varchar default 'ai_chatbot',
      "started_at" timestamp(3) with time zone,
      "ended_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone default now() not null,
      "updated_at" timestamp(3) with time zone default now() not null
    );

    create index if not exists "ai_chat_conversations_session_id_idx" on "ai_chat_conversations" using btree ("session_id");
    create index if not exists "ai_chat_conversations_created_at_idx" on "ai_chat_conversations" using btree ("created_at");
    create index if not exists "ai_chat_conversations_status_idx" on "ai_chat_conversations" using btree ("status");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    drop table if exists "ai_chat_conversations";
    drop type if exists "public"."enum_ai_chat_conversations_status";
    drop type if exists "public"."enum_ai_chat_conversations_language";
  `)
}
