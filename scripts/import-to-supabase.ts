/**
 * Import the styled-MDX blog articles into Supabase (production) as bilingual
 * DRAFT blog_posts, via the Supabase REST API (PostgREST) using the secret key
 * (bypasses RLS). Pure local (no Payload runtime, no MCP) — runs under
 * `node --import tsx --env-file=scratchpad/.sb-env`. Converts each article's
 * bodyMarkdown → Lexical with the blog field's own feature set, then POSTs the
 * main row + tag rels + related_services. Idempotent on (slug, locale).
 *
 *   node --import tsx --env-file=scratchpad/.sb-env scripts/import-to-supabase.ts [--only <slug>] [--dry]
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
import path from 'node:path'
import {
  convertMarkdownToLexical,
  editorConfigFactory,
  EXPERIMENTAL_TableFeature,
  BlocksFeature,
  CodeBlock,
  FixedToolbarFeature,
  InlineToolbarFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'

const URL_BASE = (process.env.SUPABASE_URL || '').replace(/\/$/, '')
const SECRET = process.env.SUPABASE_SECRET || ''
if (!URL_BASE || !SECRET) throw new Error('SUPABASE_URL and SUPABASE_SECRET required (use --env-file=scratchpad/.sb-env).')
const REST = `${URL_BASE}/rest/v1`
const HEADERS = { apikey: SECRET, authorization: `Bearer ${SECRET}`, 'content-type': 'application/json' }

const CAT: Record<string, number> = {
  'ai solutions': 4, 'automation': 3, 'business systems': 2, 'case studies': 9,
  'cloud technology': 5, 'crm & erp': 6, 'digital presence': 8, 'digital transformation': 22,
  'e-commerce': 71, 'guides': 10, 'startup growth': 7, 'web development': 1, 'website strategy': 21,
}
const TAG: Record<string, number> = {
  'ai agents': 51, 'ai automation': 5, 'chatbots': 55, 'cloud': 56, 'conversion': 6, 'crm': 4,
  'custom software': 2, 'dashboards': 8, 'digital transformation': 7, 'e-commerce': 52, 'erp': 53,
  'hosting': 50, 'shopify': 49, 'small business': 3, 'website strategy': 1, 'whatsapp': 54,
}
const AUTHOR_ID = 2

const CONTENT_TYPES = ['guide', 'article', 'case_study', 'checklist', 'comparison', 'tutorial', 'opinion', 'news']
const AUDIENCES = ['startups', 'small_businesses', 'medium_businesses', 'real_estate', 'clinics', 'ecommerce', 'service_companies', 'founders', 'developers']
const SERVICE_FOCUS = ['websites', 'web_apps', 'crm', 'erp', 'automation', 'ai', 'cloud', 'digital_presence', 'business_systems']
const DIFFICULTY = ['beginner', 'intermediate', 'advanced']
const enumOr = (v: unknown, allowed: string[], fb: string | null = null): string | null => {
  const s = String(v ?? '').trim().toLowerCase()
  return allowed.includes(s) ? s : fb
}
const clean = (v: unknown): string | null => {
  const s = typeof v === 'string' ? v.trim() : ''
  return s || null
}

const IMPORT_DIR = path.join(process.cwd(), 'scratchpad', 'import')

// 24-hex opaque id (Payload-style) — random so it never collides across rows or
// across runs (the array sub-tables have a unique PK on `id`).
function rowId(_seed?: string): string {
  return randomBytes(12).toString('hex')
}

function plainText(content: any): string {
  const pieces: string[] = []
  const walk = (n: any) => {
    if (!n || typeof n !== 'object') return
    if (typeof n.text === 'string') pieces.push(n.text)
    const ch = Array.isArray(n.children) ? n.children : n.root?.children
    if (Array.isArray(ch)) ch.forEach(walk)
  }
  walk(content)
  return pieces.join(' ').replace(/\s+/g, ' ').trim()
}

function buildContentBlocks(rec: any): any[] {
  const blocks: any[] = []
  const takeaways = (rec.keyTakeaways || []).map((t: any) => String(t).trim()).filter(Boolean)
  if (takeaways.length) {
    blocks.push({ id: rowId('cb'), blockType: 'calloutBlock', type: 'cloudtopia-note', title: 'Key takeaways', content: takeaways.map((t: string) => `• ${t}`).join('\n') })
  }
  for (const f of rec.faq || []) {
    const q = String(f?.question || '').trim()
    const a = String(f?.answer || '').trim()
    if (q && a) blocks.push({ id: rowId('cb'), blockType: 'faqBlock', question: q, answer: a, includeInSchema: true })
  }
  return blocks
}

async function rest(method: string, url: string, body?: any, prefer?: string): Promise<any> {
  const res = await fetch(url, {
    method,
    headers: prefer ? { ...HEADERS, prefer } : HEADERS,
    body: body != null ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`${method} ${url.replace(URL_BASE, '')} → ${res.status}: ${text.slice(0, 300)}`)
  return text ? JSON.parse(text) : null
}

async function main() {
  const args = process.argv.slice(2)
  let only: string | undefined
  let dry = false
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--only') only = args[++i]
    else if (args[i] === '--dry') dry = true
  }
  if (!existsSync(IMPORT_DIR)) throw new Error(`No import dir at ${IMPORT_DIR}`)

  const editorConfig = await editorConfigFactory.fromFeatures({
    config: { collections: [], globals: [] } as any,
    features: ({ defaultFeatures }: any) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      UploadFeature({ enabledCollections: ['media'], maxDepth: 1 }),
      BlocksFeature({ blocks: [CodeBlock()] }),
      EXPERIMENTAL_TableFeature(),
    ],
  })

  const files = readdirSync(IMPORT_DIR).filter((f) => f.endsWith('.json')).sort().filter((f) => !only || f === `${only}.json`)
  const report = { inserted: [] as any[], skipped: [] as any[], droppedTags: [] as any[], failed: [] as any[] }

  for (const file of files) {
    const rec = JSON.parse(readFileSync(path.join(IMPORT_DIR, file), 'utf8'))
    const slug = rec.slug || file.replace(/\.json$/, '')
    const categoryId = CAT[String(rec.category || '').trim().toLowerCase()] ?? null
    const tagIds: number[] = (rec.tags || [])
      .map((t: string) => ({ t, id: TAG[String(t).trim().toLowerCase()] }))
      .filter((x: any) => { if (x.id == null) report.droppedTags.push({ slug, tag: x.t }); return x.id != null })
      .map((x: any) => x.id)

    const shared = {
      category_id: categoryId,
      author_id: AUTHOR_ID,
      content_type: enumOr(rec.contentType, CONTENT_TYPES),
      target_audience: enumOr(rec.targetAudience, AUDIENCES),
      service_focus: enumOr(rec.serviceFocus, SERVICE_FOCUS),
      difficulty: enumOr(rec.difficulty, DIFFICULTY, 'beginner'),
      featured: Boolean(rec.featured),
      editor_pick: Boolean(rec.editorPick),
      pinned: Boolean(rec.pinned),
      trending: Boolean(rec.trending),
    }

    for (const locale of ['en', 'ar'] as const) {
      const lr = rec[locale]
      try {
        const existing = await rest('GET', `${REST}/blog_posts?slug=eq.${encodeURIComponent(slug)}&locale=eq.${locale}&select=id`)
        if (Array.isArray(existing) && existing.length) { report.skipped.push({ slug, locale, id: existing[0].id }); continue }
        if (dry) { report.inserted.push({ slug, locale, id: -1 }); continue }

        const content = convertMarkdownToLexical({ editorConfig, markdown: lr.bodyMarkdown || '' })
        const words = plainText(content).split(/\s+/).filter(Boolean).length
        const row: Record<string, any> = {
          ...shared,
          locale,
          slug,
          status: 'draft',
          _status: 'draft',
          title: lr.title,
          subtitle: clean(lr.subtitle),
          excerpt: lr.excerpt,
          short_excerpt: clean(lr.shortExcerpt),
          content,
          content_blocks: buildContentBlocks(lr),
          reading_time: Math.max(1, Math.ceil(words / 220)),
          word_count: words,
          seo_meta_title: clean(lr.seo?.metaTitle),
          seo_meta_description: clean(lr.seo?.metaDescription),
          seo_focus_keyword: clean(lr.seo?.focusKeyword),
          seo_secondary_keywords: Array.isArray(lr.seo?.secondaryKeywords) ? lr.seo.secondaryKeywords.join(', ') : null,
          seo_no_index: false,
          seo_no_follow: false,
          show_c_t_a: true,
          cta_title: clean(lr.cta?.title),
          cta_description: clean(lr.cta?.description),
          cta_button_text: clean(lr.cta?.buttonText) || 'Talk to CloudTopia',
          cta_button_url: clean(lr.cta?.buttonUrl) || '/contact',
          table_of_contents: true,
          published_at: null,
        }
        const created = await rest('POST', `${REST}/blog_posts`, row, 'return=representation')
        const id = created?.[0]?.id
        if (!id) throw new Error('no id returned')

        if (tagIds.length) {
          await rest('POST', `${REST}/blog_posts_rels`, tagIds.map((tid, i) => ({ order: i + 1, parent_id: id, path: 'tags', blog_tags_id: tid })))
        }
        const services = (lr.relatedServices || [])
          .map((s: any) => ({ label: clean(s?.label), url: clean(s?.url) }))
          .filter((s: any) => s.label && s.url)
        if (services.length) {
          await rest('POST', `${REST}/blog_posts_related_services`, services.map((s: any, i: number) => ({ _order: i, _parent_id: id, id: rowId('rs'), label: s.label, url: s.url })))
        }
        report.inserted.push({ slug, locale, id })
        console.log(`✓ ${slug} [${locale}] → id ${id}`)
      } catch (err: any) {
        report.failed.push({ slug, locale, error: err?.message || String(err) })
        console.error(`✗ ${slug} [${locale}]: ${err?.message || err}`)
      }
    }
  }

  writeFileSync(path.join(process.cwd(), 'scratchpad', 'sb-import-report.json'), JSON.stringify(report, null, 2))
  console.log(`\ninserted ${report.inserted.length} · skipped ${report.skipped.length} · failed ${report.failed.length} · droppedTags ${report.droppedTags.length}`)
  if (report.failed.length) console.log('FAILURES:', JSON.stringify(report.failed.slice(0, 5)))
}

main().catch((e) => { console.error(e); process.exit(1) })
