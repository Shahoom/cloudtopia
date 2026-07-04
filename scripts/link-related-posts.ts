/**
 * Second pass: wire each imported article's `relatedPosts` relationship from the
 * sibling `/articles/<slug>` links it references (JSON `internalArticleLinks`),
 * resolved within the SAME locale. Runs after the main import, via the Supabase
 * REST API. Idempotent: clears existing relatedPosts rels for the imported
 * posts first, then re-inserts.
 *
 *   node --import tsx --env-file=scratchpad/.sb-env scripts/link-related-posts.ts
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'

const URL_BASE = (process.env.SUPABASE_URL || '').replace(/\/$/, '')
const SECRET = process.env.SUPABASE_SECRET || ''
if (!URL_BASE || !SECRET) throw new Error('SUPABASE_URL and SUPABASE_SECRET required.')
const REST = `${URL_BASE}/rest/v1`
const H = { apikey: SECRET, authorization: `Bearer ${SECRET}`, 'content-type': 'application/json' }
const IMPORT_DIR = path.join(process.cwd(), 'scratchpad', 'import')

async function rest(method: string, url: string, body?: any, prefer?: string): Promise<any> {
  const res = await fetch(url, { method, headers: prefer ? { ...H, prefer } : H, body: body != null ? JSON.stringify(body) : undefined })
  const text = await res.text()
  if (!res.ok) throw new Error(`${method} ${url.replace(URL_BASE, '')} → ${res.status}: ${text.slice(0, 200)}`)
  return text ? JSON.parse(text) : null
}

async function main() {
  if (!existsSync(IMPORT_DIR)) throw new Error(`No import dir at ${IMPORT_DIR}`)
  // slug -> internal sibling slugs
  const links = new Map<string, string[]>()
  for (const f of readdirSync(IMPORT_DIR).filter((x) => x.endsWith('.json'))) {
    const rec = JSON.parse(readFileSync(path.join(IMPORT_DIR, f), 'utf8'))
    const slug = rec.slug || f.replace(/\.json$/, '')
    links.set(slug, Array.isArray(rec.internalArticleLinks) ? rec.internalArticleLinks.filter((s: any) => typeof s === 'string') : [])
  }
  const ourSlugs = new Set(links.keys())

  // (slug,locale) -> id  for the imported posts (id >= 188)
  const posts: Array<{ id: number; slug: string; locale: string }> = await rest('GET', `${REST}/blog_posts?id=gte.188&select=id,slug,locale`)
  const byKey = new Map<string, number>()
  for (const p of posts) byKey.set(`${p.slug}::${p.locale}`, p.id)

  const parentIds = posts.map((p) => p.id)
  // Clear existing relatedPosts rels for our posts (idempotent re-run).
  await rest('DELETE', `${REST}/blog_posts_rels?path=eq.relatedPosts&parent_id=in.(${parentIds.join(',')})`)

  let totalLinks = 0
  const noTargets: string[] = []
  for (const p of posts) {
    const targets = links.get(p.slug) || []
    const rels: any[] = []
    let order = 1
    const seen = new Set<number>()
    for (const t of targets) {
      if (t === p.slug || !ourSlugs.has(t)) continue
      const targetId = byKey.get(`${t}::${p.locale}`)
      if (!targetId || seen.has(targetId)) continue
      seen.add(targetId)
      rels.push({ order: order++, parent_id: p.id, path: 'relatedPosts', blog_posts_id: targetId })
    }
    if (rels.length) {
      await rest('POST', `${REST}/blog_posts_rels`, rels)
      totalLinks += rels.length
    } else {
      noTargets.push(`${p.slug}[${p.locale}]`)
    }
  }
  console.log(`relatedPosts links created: ${totalLinks}`)
  console.log(`posts with no internal sibling links: ${noTargets.length}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
