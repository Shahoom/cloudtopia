import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    declare
      target text;
      principal text;
      sequence_name text;
    begin
      foreach target in array array['deploy_diag', 'seo_overrides', 'clinictopia_leads']
      loop
        if to_regclass(format('public.%I', target)) is null then
          continue;
        end if;

        execute format('alter table public.%I enable row level security', target);
        execute format('revoke all privileges on table public.%I from public', target);

        foreach principal in array array['anon', 'authenticated']
        loop
          if exists (select 1 from pg_roles where rolname = principal) then
            execute format('revoke all privileges on table public.%I from %I', target, principal);
          end if;
        end loop;

        if exists (
          select 1 from information_schema.columns
          where table_schema = 'public' and table_name = target and column_name = 'id'
        ) then
          select pg_get_serial_sequence(format('public.%I', target), 'id') into sequence_name;
          if sequence_name is not null then
            execute format('revoke all privileges on sequence %s from public', sequence_name);
            foreach principal in array array['anon', 'authenticated']
            loop
              if exists (select 1 from pg_roles where rolname = principal) then
                execute format('revoke all privileges on sequence %s from %I', sequence_name, principal);
              end if;
            end loop;
          end if;
        end if;
      end loop;
    end $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Security hardening is intentionally not reversed by an application rollback.
  await db.execute('select 1;')
}
