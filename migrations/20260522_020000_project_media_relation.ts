import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    alter table "projects"
      add column if not exists "image_media_id" integer;

    alter table "projects"
      alter column "image" drop not null;

    do $$
    begin
      if not exists (
        select 1
        from pg_constraint
        where conname = 'projects_image_media_id_media_id_fk'
      ) then
        alter table "projects"
          add constraint "projects_image_media_id_media_id_fk"
          foreign key ("image_media_id") references "media"("id") on delete set null;
      end if;
    end $$;

    create index if not exists "projects_image_media_idx" on "projects" ("image_media_id");

    update "projects" p
    set "image_media_id" = m."id"
    from "media" m
    where p."image_media_id" is null
      and p."image" is not null
      and m."url" = p."image";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    alter table "projects" drop constraint if exists "projects_image_media_id_media_id_fk";
    drop index if exists "projects_image_media_idx";
    alter table "projects" drop column if exists "image_media_id";
  `)
}
