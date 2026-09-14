/**
 * Write the drizzle schema snapshot that payload.config.ts produces, without
 * touching the database schema. Pair with scripts/schema-diff.ts: snapshot the
 * committed config (in a git worktree) and the working config, then diff the
 * two to get exactly the DDL a config change needs.
 *
 *   SNAPSHOT_OUT=/tmp/after.json npx payload --use-swc run scripts/schema-snapshot.ts
 *
 * (Introspecting prod directly doesn't work: the live schema carries enums and
 * columns from retired fields, so drizzle-kit stops on interactive
 * "created or renamed?" prompts.)
 */
import { writeFileSync } from 'node:fs'
import { getPayload } from 'payload'
import config from '../payload.config.ts'

const out = process.env.SNAPSHOT_OUT
if (!out) throw new Error('SNAPSHOT_OUT is required')

const payload = await getPayload({ config })
const adapter: any = payload.db
const { generateDrizzleJson } = adapter.requireDrizzleKit()
writeFileSync(out, JSON.stringify(await generateDrizzleJson(adapter.schema)))
console.log(`snapshot written: ${out} (${Object.keys(adapter.tables || {}).length} tables)`)
process.exit(0)
