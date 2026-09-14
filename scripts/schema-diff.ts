/**
 * Print the DDL between two drizzle snapshots written by
 * scripts/schema-snapshot.ts — the committed config ("before") and the
 * working config ("after"). Additive changes only produce no prompts; review
 * the output, then paste it into a hand-named migration.
 *
 *   node scripts/schema-diff.ts /tmp/before.json /tmp/after.json
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const [beforePath, afterPath] = process.argv.slice(2)
if (!beforePath || !afterPath) throw new Error('usage: schema-diff.ts <before.json> <after.json>')

const require = createRequire(import.meta.url)
const { generateMigration } = require('drizzle-kit/api')

async function main() {
  const before = JSON.parse(readFileSync(beforePath, 'utf8'))
  const after = JSON.parse(readFileSync(afterPath, 'utf8'))
  const statements: string[] = await generateMigration(before, after)

  for (const statement of statements) console.log(statement.trim().replace(/;?$/, ';'))
  console.error(`-- ${statements.length} statements`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
