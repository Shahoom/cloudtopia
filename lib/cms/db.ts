import 'server-only'
import { Pool, type QueryResultRow } from 'pg'
import { getDatabaseUrl, isDatabaseConfigured as hasDatabaseUrl } from './env.ts'

let pool: Pool | null = null

export function isDatabaseConfigured() {
  return hasDatabaseUrl()
}

export function getDatabasePool() {
  const databaseUrl = getDatabaseUrl()

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured.')
  }

  if (!pool) {
    pool = new Pool({
      connectionString: databaseUrl,
      max: 2,
      idleTimeoutMillis: 15_000,
      connectionTimeoutMillis: 30_000,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10_000,
    })
  }

  return pool
}

export async function queryDatabase<T extends QueryResultRow = QueryResultRow>(query: string, values: unknown[] = []) {
  const result = await getDatabasePool().query<T>(query, values)
  return result.rows
}
