/**
 * Backup every blog-posts table (main row + all array/relationship sub-tables)
 * to a single JSON file before any destructive reset. Dumps straight from
 * Postgres so the backup is a faithful, complete copy of the rows. This script
 * NEVER deletes anything.
 *
 * Run:
 *   node --import tsx --env-file=.env.local scripts/ops-backup-blog.ts
 *
 * Output: docs/backups/blog-posts-backup-<ISO-date>.json
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { Client } from 'pg'

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is required (use --env-file=.env.local).')

  const ssl = /supabase|sslmode=require|amazonaws/.test(url) ? { rejectUnauthorized: false } : undefined
  const client = new Client({ connectionString: url, ssl })
  await client.connect()

  // Every table for the blog-posts collection. The LIKE excludes Payload's
  // version tables (named `_blog_posts_v…` with a leading underscore).
  const { rows: tables } = await client.query<{ table_name: string }>(
    `SELECT table_name FROM information_schema.tables
     WHERE table_schema = 'public' AND table_name LIKE 'blog_posts%'
     ORDER BY table_name`,
  )

  const dump: Record<string, unknown[]> = {}
  const counts: Record<string, number> = {}
  for (const { table_name } of tables) {
    const { rows } = await client.query(`SELECT * FROM "${table_name}"`)
    dump[table_name] = rows
    counts[table_name] = rows.length
  }

  // Quick locale split on the main table for a sanity check.
  const main = (dump['blog_posts'] as Array<Record<string, unknown>>) || []
  const byLocale = main.reduce<Record<string, number>>((acc, r) => {
    const loc = String(r.locale ?? 'unknown')
    acc[loc] = (acc[loc] || 0) + 1
    return acc
  }, {})

  await client.end()

  const exportedAt = new Date().toISOString()
  const outDir = path.resolve(process.cwd(), 'docs/backups')
  mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, `blog-posts-backup-${exportedAt.slice(0, 10)}.json`)

  writeFileSync(
    outPath,
    JSON.stringify({ exportedAt, source: 'postgres', tableCounts: counts, mainByLocale: byLocale, tables: dump }, null, 2),
    'utf8',
  )

  console.log('✅ Backup written')
  console.log('   file        :', path.relative(process.cwd(), outPath))
  console.log('   blog_posts  :', counts['blog_posts'] ?? 0, '→ by locale:', byLocale)
  console.log('   all tables  :', counts)
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Backup failed:', err?.message || err)
  process.exit(1)
})
