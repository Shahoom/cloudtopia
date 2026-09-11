#!/usr/bin/env node
/**
 * Deliberate production migration runner (Payload redesign plan, Phase 1).
 *
 * Deploys no longer run migrations; this script is the ONLY sanctioned path
 * to alter the prod schema. It shows migration status first and requires the
 * operator to type the word "migrate" before anything runs.
 *
 * Usage:
 *   PROD_DATABASE_URL="postgres://...:5432/postgres" npm run migrate:prod
 *   (uses POSTGRES_URL_NON_POOLING or DATABASE_URL if PROD_DATABASE_URL unset)
 */
import { spawnSync } from 'node:child_process'
import { createInterface } from 'node:readline/promises'

const url =
  process.env.PROD_DATABASE_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL

if (!url) {
  console.error('Set PROD_DATABASE_URL (direct 5432 connection) first.')
  process.exit(1)
}

const host = new URL(url.replace(/^postgres(ql)?:/, 'http:')).hostname
console.log(`\nTarget database host: ${host}\n`)

const run = (args) =>
  spawnSync('npx', ['payload', '--use-swc', ...args], {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: url },
  })

console.log('=== Pending migration status ===')
const status = run(['migrate:status'])
if (status.status !== 0) process.exit(status.status ?? 1)

const rl = createInterface({ input: process.stdin, output: process.stdout })
const answer = (await rl.question(`\nType "migrate" to apply pending migrations to ${host}: `)).trim()
rl.close()

if (answer !== 'migrate') {
  console.log('Aborted — nothing was changed.')
  process.exit(0)
}

const result = run(['migrate'])
process.exit(result.status ?? 1)
