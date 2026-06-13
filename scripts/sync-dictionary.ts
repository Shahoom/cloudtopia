/**
 * Publishes copy that is served from the i18n dictionary
 * (lib/i18n/translations/{en,ar}.ts) into the live CMS — SAFELY.
 *
 * Two places have to agree or a change won't show on the site:
 *   1. site_content.dictionary  — the base dictionary per locale
 *   2. pages.sections.dictionaryPatch — each route stores a patch that
 *      deep-merges OVER the base at read time (lib/cms/page-structure.ts
 *      mergePageIntoDictionary). For the home page that patch carries the whole
 *      `home` object, so FAQ / finalCTA / hero copy lives here too.
 *
 * SAFETY MODEL (important — content is also edited directly in Supabase):
 *   - This script DEEP-MERGES the static dictionary over what is already in the
 *     DB. It never DROPS a key/section that exists only in the DB, so edits made
 *     by other sessions or the Payload admin to OTHER keys are preserved.
 *   - On `pages` it only rewrites `sections.dictionaryPatch` / `sections.content`
 *     — it does NOT touch the hero/cta columns, the `seo` column, or other
 *     `sections` keys, so structured admin edits survive.
 *   - Caveat: a key that exists in BOTH the TS files and the DB is overwritten
 *     with the TS value (that is the whole point of "publish from source"). If
 *     you only need to change one subtree (e.g. the home FAQ), prefer a targeted
 *     jsonb_set rather than this whole-dictionary republish.
 *
 * Local:   npm run sync:dictionary
 * Prod:    DATABASE_URL="<prod direct connection>" npm run sync:dictionary
 *
 * Reads go through unstable_cache(..., { revalidate: 60, tags:
 * ['cms-dictionary'] }), so the change is live within ~60s (or next deploy).
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Client } from 'pg'
import { ar } from '../lib/i18n/translations/ar.ts'
import { en } from '../lib/i18n/translations/en.ts'
import { getDatabaseUrl } from '../lib/cms/env.ts'
import { buildDictionaryPatch } from '../lib/cms/page-structure.ts'
import { loadLocalEnv } from './seed-payload-direct.ts'

type Locale = 'en' | 'ar'

const dictionaries = { en, ar } as const
const locales: Locale[] = ['en', 'ar']

// Keep in sync with pageSlugs in seed-payload-direct.ts.
const pageSlugs = [
  '/', 'services', 'projects', 'labs', 'about', 'contact', 'blog',
  'website-design', 'ecommerce-solutions', 'business-systems-development',
  'restaurant-qr-menu', 'content-creation', 'social-media-marketing',
  'web-applications', 'privacy', 'terms',
]

/** Recursively merges `source` over `target`. Objects merge key-by-key; arrays
 *  and scalars in `source` replace. Keys present only in `target` are kept — so
 *  this never deletes existing DB content. */
function deepMerge(target: any, source: any): any {
  if (source === null || typeof source !== 'object' || Array.isArray(source)) return source
  const base = target && typeof target === 'object' && !Array.isArray(target) ? target : {}
  const out: Record<string, any> = { ...base }
  for (const key of Object.keys(source)) out[key] = deepMerge(base[key], source[key])
  return out
}

async function syncSiteContent(client: Client) {
  for (const locale of locales) {
    const res = await client.query<{ dictionary: any }>(
      'select dictionary from site_content where locale = $1 limit 1',
      [locale],
    )
    const existing = res.rows[0]?.dictionary ?? {}
    const merged = deepMerge(existing, dictionaries[locale])
    await client.query(
      `insert into site_content (locale, dictionary, updated_at, created_at)
       values ($1, $2, now(), now())
       on conflict (locale)
       do update set dictionary = excluded.dictionary, updated_at = now()`,
      [locale, JSON.stringify(merged)],
    )
    console.log(`Merged site_content dictionary for "${locale}".`)
  }
}

async function syncPages(client: Client) {
  for (const locale of locales) {
    const dictionary = dictionaries[locale] as any
    let touched = 0
    for (const slug of pageSlugs) {
      const patch = buildDictionaryPatch(slug, dictionary)
      if (!patch || Object.keys(patch).length === 0) continue

      const res = await client.query<{ sections: any }>(
        'select sections from pages where locale = $1 and slug = $2 limit 1',
        [locale, slug],
      )
      const sections = res.rows[0]?.sections
      if (!sections) continue // never create rows here; full structure is seed:payload's job

      const next = { ...sections }
      next.dictionaryPatch = deepMerge(sections.dictionaryPatch ?? {}, patch)
      if (sections.content) next.content = deepMerge(sections.content, patch)

      await client.query(
        'update pages set sections = $3::jsonb, updated_at = now() where locale = $1 and slug = $2',
        [locale, slug, JSON.stringify(next)],
      )
      touched += 1
    }
    console.log(`Merged dictionaryPatch into ${touched} page records for "${locale}".`)
  }
}

async function main() {
  loadLocalEnv()
  const databaseUrl = getDatabaseUrl()
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is missing. Set it before running sync:dictionary.')
  }

  const client = new Client({ connectionString: databaseUrl })
  await client.connect()
  try {
    await client.query('begin')
    await syncSiteContent(client)
    await syncPages(client)
    await client.query('commit')
    console.log('Dictionary sync complete (deep-merge; no existing keys dropped).')
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    await client.end()
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
