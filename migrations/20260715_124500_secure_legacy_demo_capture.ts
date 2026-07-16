import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    declare
      principal text;
      sequence_name text;
    begin
      if to_regclass('public.clinictopia_demo_leads') is not null then
        alter table public.clinictopia_demo_leads enable row level security;
        drop policy if exists "demo leads anon insert" on public.clinictopia_demo_leads;
        revoke all privileges on table public.clinictopia_demo_leads from public;

        foreach principal in array array['anon', 'authenticated']
        loop
          if exists (select 1 from pg_roles where rolname = principal) then
            execute format('revoke all privileges on table public.clinictopia_demo_leads from %I', principal);
          end if;
        end loop;

        select pg_get_serial_sequence('public.clinictopia_demo_leads', 'id') into sequence_name;
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

      if to_regprocedure('public.set_demo_lead_request_meta()') is not null then
        revoke execute on function public.set_demo_lead_request_meta() from public;
        if exists (select 1 from pg_roles where rolname = 'anon') then
          revoke execute on function public.set_demo_lead_request_meta() from anon;
        end if;
        if exists (select 1 from pg_roles where rolname = 'authenticated') then
          revoke execute on function public.set_demo_lead_request_meta() from authenticated;
        end if;
      end if;
    end $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Legacy public write access is intentionally not restored.
  await db.execute('select 1;')
}
