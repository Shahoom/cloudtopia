#!/usr/bin/env node
/**
 * Sync the LOCAL dev database schema from prod (Payload redesign plan,
 * Phase 1). A drifted local DB made `payload migrate:create` generate wrong
 * full-schema diffs (it asked whether prod tables were "new"); after this
 * sync, the generator diffs against reality again.
 *
 * DESTRUCTIVE for the local `public` schema only. Refuses to touch any
 * non-local target.
 *
 * Usage:
 *   PROD_DATABASE_URL="postgres://...:5432/postgres" npm run db:sync-local
 *   (local target read from DATABASE_URL in .env/.env.local)
 */
import { spawnSync } from 'node:child_process'

const prod = process.env.PROD_DATABASE_URL
const local = process.env.DATABASE_URL

if (!prod || !local) {
  console.error('Need PROD_DATABASE_URL (source) and DATABASE_URL (local target).')
  process.exit(1)
}
const localHost = new URL(local.replace(/^postgres(ql)?:/, 'http:')).hostname
if (!/^(localhost|127\.0\.0\.1)$/.test(localHost)) {
  console.error(`Refusing: DATABASE_URL host is "${localHost}", not localhost.`)
  process.exit(1)
}

const sh = (cmd, args, opts = {}) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit', ...opts })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

console.log('1/3 Dumping prod schema (schema-only, public)…')
sh('pg_dump', ['--schema-only', '--schema=public', '--no-owner', '--no-privileges', '-f', '/tmp/ct-prod-schema.sql', prod])

console.log('2/3 Resetting local public schema…')
sh('psql', [local, '-v', 'ON_ERROR_STOP=1', '-c', 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;'])

console.log('3/3 Applying prod schema locally…')
sh('psql', [local, '-v', 'ON_ERROR_STOP=1', '-f', '/tmp/ct-prod-schema.sql'])

console.log('\nDone. Local schema now matches prod. Reseed content with your seed scripts if needed;')
console.log('`payload migrate:create` will now generate correct diffs.')
