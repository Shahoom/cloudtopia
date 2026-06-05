import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    begin
      if not exists (select 1 from pg_type where typname = 'enum_ai_chat_leads_language') then
        create type "public"."enum_ai_chat_leads_language" as enum ('ar', 'en', 'unknown');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_solution_finder_leads_locale') then
        create type "public"."enum_solution_finder_leads_locale" as enum ('en', 'ar');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_solution_finder_leads_status') then
        create type "public"."enum_solution_finder_leads_status" as enum ('new', 'contacted', 'qualified', 'won', 'lost');
      end if;
    end $$;

    create table if not exists "ai_chat_leads" (
      "id" serial primary key not null,
      "name" varchar,
      "email" varchar,
      "phone" varchar,
      "country" varchar,
      "business_type" varchar,
      "service_needed" varchar,
      "budget_range" varchar,
      "timeline" varchar,
      "message" text not null,
      "page_url" varchar,
      "language" "enum_ai_chat_leads_language" default 'unknown',
      "source" varchar default 'ai_chatbot',
      "created_at" timestamp(3) with time zone default now() not null,
      "updated_at" timestamp(3) with time zone default now() not null
    );

    create table if not exists "solution_finder_leads" (
      "id" serial primary key not null,
      "name" varchar not null,
      "phone" varchar not null,
      "email" varchar,
      "company" varchar,
      "country" varchar,
      "industry" varchar,
      "project_type" varchar,
      "business_goal" varchar,
      "budget" varchar,
      "timeline" varchar,
      "description" text,
      "contact_method" varchar,
      "want_contact" boolean default true,
      "recommended_package" varchar,
      "recommended_route" varchar,
      "selected_answer_summary" text,
      "ai_source" varchar,
      "ai_summary" text,
      "ai_country_advice" text,
      "ai_budget_advice" text,
      "ai_whatsapp_opening" text,
      "locale" "enum_solution_finder_leads_locale" default 'en',
      "status" "enum_solution_finder_leads_status" default 'new' not null,
      "source" varchar default 'solution-finder',
      "created_at" timestamp(3) with time zone default now() not null,
      "updated_at" timestamp(3) with time zone default now() not null
    );

    create table if not exists "solution_finder_leads_ai_roadmap" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "step" varchar not null
    );

    create table if not exists "solution_finder_leads_ai_next_questions" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "question" varchar not null
    );

    do $$
    begin
      if not exists (
        select 1 from pg_constraint where conname = 'solution_finder_leads_ai_roadmap_parent_id_fk'
      ) then
        alter table "solution_finder_leads_ai_roadmap"
          add constraint "solution_finder_leads_ai_roadmap_parent_id_fk"
          foreign key ("_parent_id") references "public"."solution_finder_leads"("id") on delete cascade on update no action;
      end if;

      if not exists (
        select 1 from pg_constraint where conname = 'solution_finder_leads_ai_next_questions_parent_id_fk'
      ) then
        alter table "solution_finder_leads_ai_next_questions"
          add constraint "solution_finder_leads_ai_next_questions_parent_id_fk"
          foreign key ("_parent_id") references "public"."solution_finder_leads"("id") on delete cascade on update no action;
      end if;
    end $$;

    create index if not exists "ai_chat_leads_created_at_idx" on "ai_chat_leads" using btree ("created_at");
    create index if not exists "ai_chat_leads_phone_idx" on "ai_chat_leads" using btree ("phone");
    create index if not exists "solution_finder_leads_created_at_idx" on "solution_finder_leads" using btree ("created_at");
    create index if not exists "solution_finder_leads_phone_idx" on "solution_finder_leads" using btree ("phone");
    create index if not exists "solution_finder_leads_status_idx" on "solution_finder_leads" using btree ("status");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    drop table if exists "solution_finder_leads_ai_next_questions";
    drop table if exists "solution_finder_leads_ai_roadmap";
    drop table if exists "solution_finder_leads";
    drop table if exists "ai_chat_leads";
    drop type if exists "public"."enum_solution_finder_leads_status";
    drop type if exists "public"."enum_solution_finder_leads_locale";
    drop type if exists "public"."enum_ai_chat_leads_language";
  `)
}
