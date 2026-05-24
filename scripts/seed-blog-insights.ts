import { Client } from 'pg'
import { getDatabaseUrl } from '../lib/cms/env.ts'
import { loadLocalEnv, upsertAuthors, upsertBlogSeeds, upsertMedia } from './seed-payload-direct.ts'

async function main() {
  loadLocalEnv()
  const databaseUrl = getDatabaseUrl()

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is missing. Set it before running seed:blog.')
  }

  const client = new Client({ connectionString: databaseUrl })
  await client.connect()

  try {
    await client.query('begin')
    await upsertMedia(client)
    await upsertAuthors(client)
    await upsertBlogSeeds(client)
    await client.query('commit')
    console.log('Blog insights seed complete.')
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
