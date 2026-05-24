import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    alter table "payload_locked_documents_rels"
      add column if not exists "pages_id" integer,
      add column if not exists "site_design_id" integer;

    create index if not exists "payload_locked_documents_rels_pages_id_idx"
      on "payload_locked_documents_rels" using btree ("pages_id");

    create index if not exists "payload_locked_documents_rels_site_design_id_idx"
      on "payload_locked_documents_rels" using btree ("site_design_id");

    do $$
    begin
      if not exists (
        select 1
        from pg_constraint
        where conname = 'payload_locked_documents_rels_pages_fk'
      ) then
        alter table "payload_locked_documents_rels"
          add constraint "payload_locked_documents_rels_pages_fk"
          foreign key ("pages_id") references "pages"("id") on delete cascade on update no action;
      end if;
    end $$;

    do $$
    begin
      if not exists (
        select 1
        from pg_constraint
        where conname = 'payload_locked_documents_rels_site_design_fk'
      ) then
        alter table "payload_locked_documents_rels"
          add constraint "payload_locked_documents_rels_site_design_fk"
          foreign key ("site_design_id") references "site_design"("id") on delete cascade on update no action;
      end if;
    end $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    alter table "payload_locked_documents_rels"
      drop constraint if exists "payload_locked_documents_rels_site_design_fk";

    alter table "payload_locked_documents_rels"
      drop constraint if exists "payload_locked_documents_rels_pages_fk";

    drop index if exists "payload_locked_documents_rels_site_design_id_idx";
    drop index if exists "payload_locked_documents_rels_pages_id_idx";

    alter table "payload_locked_documents_rels"
      drop column if exists "site_design_id",
      drop column if exists "pages_id";
  `)
}
