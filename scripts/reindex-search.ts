/**
 * Build plugin-search entries for documents that existed before the plugin
 * was installed (or were written by raw SQL, which never fires its hooks).
 * Uses the plugin's own sync with the live config, so entries match what the
 * afterChange hook would have produced. Safe to re-run: existing entries are
 * updated, not duplicated.
 *
 *   DATABASE_URL=<target> npx payload --use-swc run scripts/reindex-search.ts
 */
import { createLocalReq, getPayload } from 'payload'
import config from '../payload.config.ts'
import { searchPluginConfig } from '../lib/cms/search-config.ts'
import { syncDocAsSearchIndex } from '../node_modules/@payloadcms/plugin-search/dist/utilities/syncDocAsSearchIndex.js'

const payload = await getPayload({ config })
const req = await createLocalReq({}, payload)
const pluginConfig = { ...searchPluginConfig, reindexBatchSize: 50, syncDrafts: false }
let failures = 0

for (const collection of searchPluginConfig.collections || []) {
  const hasDrafts = Boolean((payload.collections as any)[collection]?.config?.versions?.drafts)
  let page = 1
  let synced = 0
  try {
    for (;;) {
      const result = await payload.find({
        collection: collection as any,
        page,
        limit: 50,
        depth: 0,
        overrideAccess: true,
        ...(hasDrafts ? { where: { _status: { equals: 'published' } } } : {}),
      })
      for (const doc of result.docs) {
        try {
          await syncDocAsSearchIndex({ collection, doc, locale: undefined, onSyncError: () => failures++, operation: 'update', pluginConfig, req } as any)
          synced++
        } catch (error) {
          failures++
          console.error(`✗ ${collection} ${doc.id}: ${error instanceof Error ? error.message : String(error)}`)
        }
      }
      if (!result.hasNextPage) break
      page++
    }
  } catch (error) {
    failures++
    const cause = (error as any)?.cause?.message || (error instanceof Error ? error.message : String(error))
    console.error(`✗ ${collection}: could not read the collection — ${cause.slice(0, 200)}`)
  }
  console.log(`${collection}: ${synced} synced`)
}

const { totalDocs } = await payload.count({ collection: 'search' as any, overrideAccess: true })
console.log(`search index now holds ${totalDocs} entries · failures ${failures}`)
process.exit(failures ? 1 : 0)
