/**
 * One-off: create Arabic translations for every English blog post that does not
 * yet have an Arabic sibling (paired by shared slug). Uses OpenAI to translate
 * the human-readable text fields and the Lexical rich-text body while preserving
 * structure, then inserts a proper `ar` row (slug = the English slug), copies the
 * author/tag relationships, and lets a follow-up SQL pass build the version rows.
 *
 * Pure `pg` + `openai` — no Payload bootstrap (avoids the local loader issues).
 *
 * Run:
 *   DATABASE_URL="<supabase direct 5432>" OPENAI_API_KEY="sk-..." \
 *   [TRANSLATE_MODEL=gpt-4.1] [ONLY_IDS=1,2] \
 *     node --import tsx scripts/ops-translate-blog-ar.ts
 */
import { Client } from 'pg'
import OpenAI from 'openai'

const DATABASE_URL = process.env.DATABASE_URL
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const MODEL = process.env.TRANSLATE_MODEL || 'gpt-4.1'
const ONLY_IDS = (process.env.ONLY_IDS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
  .map(Number)

if (!DATABASE_URL || !OPENAI_API_KEY) {
  console.error('Set DATABASE_URL and OPENAI_API_KEY')
  process.exit(1)
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

// Human-readable scalar text columns to translate (everything else is copied).
const TRANSLATE_COLS = [
  'title',
  'subtitle',
  'excerpt',
  'short_excerpt',
  'seo_meta_title',
  'seo_meta_description',
  'seo_og_title',
  'seo_og_description',
  'seo_twitter_title',
  'seo_twitter_description',
  'featured_image_alt',
  'seo_focus_keyword',
  'cta_title',
  'cta_description',
  'cta_button_text',
  'lead_magnet_title',
] as const

const CONST_COLS: Record<string, string> = {
  locale: 'ar',
  status: 'published',
  _status: 'published',
}
// Null these for AR: derived/anchored to EN content and would otherwise be stale.
const NULL_COLS = new Set(['table_of_contents'])

type Col = { name: string; udt: string; isEnum: boolean }

function collectLexicalTexts(node: unknown, out: string[]): void {
  if (!node || typeof node !== 'object') return
  const n = node as Record<string, unknown>
  if (typeof n.text === 'string' && n.text.trim()) out.push(n.text as string)
  const children = Array.isArray(n.children) ? n.children : null
  if (children) for (const c of children) collectLexicalTexts(c, out)
  if (n.root) collectLexicalTexts(n.root, out)
}

function applyLexicalTexts(node: unknown, queue: string[]): void {
  if (!node || typeof node !== 'object') return
  const n = node as Record<string, unknown>
  if (typeof n.text === 'string' && n.text.trim()) {
    const next = queue.shift()
    if (typeof next === 'string') n.text = next
  }
  const children = Array.isArray(n.children) ? n.children : null
  if (children) for (const c of children) applyLexicalTexts(c, queue)
  if (n.root) applyLexicalTexts(n.root, queue)
}

const SYSTEM_PROMPT = [
  'You are a professional English-to-Arabic translator for CloudTopia, a software, cloud and AI agency.',
  'Translate each string to natural, fluent Modern Standard Arabic for a tech-savvy business audience.',
  'Keep brand and product names and common tech acronyms as written in Arabic tech media (CloudTopia, Shopify, CRM, ERP, SEO, API, SaaS, B2B, AI, etc.) — transliterate or keep Latin where that is the natural convention.',
  'Do NOT translate URLs, code, or placeholders. Preserve numbers, punctuation intent, and tone.',
  'Translate marketing copy idiomatically (not word-for-word). For meta titles/descriptions keep them concise and compelling.',
  'Return ONLY a JSON object of the form {"t": ["...", "..."]} where t has EXACTLY the same number of items, in the same order, as the input array.',
].join(' ')

async function translateBatch(strings: string[]): Promise<string[]> {
  if (strings.length === 0) return []
  const res = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: JSON.stringify({ strings }) },
    ],
  })
  const raw = res.choices?.[0]?.message?.content || '{}'
  const parsed = JSON.parse(raw)
  const t = parsed.t || parsed.translations || parsed.strings
  if (!Array.isArray(t) || t.length !== strings.length) {
    throw new Error(`translation length mismatch: got ${Array.isArray(t) ? t.length : 'n/a'}, want ${strings.length}`)
  }
  return t.map((x) => String(x))
}

// Translate in chunks so very long bodies stay within output limits.
async function translateAll(strings: string[]): Promise<string[]> {
  const CHUNK = 60
  if (strings.length <= CHUNK) return translateBatch(strings)
  const out: string[] = []
  for (let i = 0; i < strings.length; i += CHUNK) {
    out.push(...(await translateBatch(strings.slice(i, i + CHUNK))))
  }
  return out
}

async function main() {
  const db = new Client({
    connectionString: DATABASE_URL,
    ssl: /localhost|127\.0\.0\.1/.test(DATABASE_URL!) ? undefined : { rejectUnauthorized: false },
  })
  await db.connect()

  // Column metadata (exclude id; sequence assigns it).
  const colRes = await db.query<{ column_name: string; data_type: string; udt_name: string }>(
    `SELECT column_name, data_type, udt_name FROM information_schema.columns
     WHERE table_schema='public' AND table_name='blog_posts' AND column_name <> 'id'
     ORDER BY ordinal_position`,
  )
  const cols: Col[] = colRes.rows.map((r) => ({
    name: r.column_name,
    udt: r.udt_name,
    isEnum: r.data_type === 'USER-DEFINED',
  }))

  // English posts with no Arabic sibling (by shared slug).
  const targetRes = await db.query<{ id: number }>(
    `SELECT e.id FROM public.blog_posts e
     WHERE e.locale = 'en'
       AND NOT EXISTS (SELECT 1 FROM public.blog_posts a WHERE a.locale='ar' AND a.slug = e.slug)
       ${ONLY_IDS.length ? 'AND e.id = ANY($1)' : ''}
     ORDER BY e.id`,
    ONLY_IDS.length ? [ONLY_IDS] : [],
  )
  const ids = targetRes.rows.map((r) => r.id)
  console.log(`Translating ${ids.length} English posts to Arabic: [${ids.join(', ')}]`)

  let done = 0
  const newIds: number[] = []
  for (const enId of ids) {
    try {
      const { rows } = await db.query(`SELECT * FROM public.blog_posts WHERE id = $1`, [enId])
      const en = rows[0] as Record<string, any>

      // Build the ordered string list: scalar fields, then content body texts.
      const scalarFields = TRANSLATE_COLS.filter((c) => typeof en[c] === 'string' && en[c].trim())
      const scalarStrings = scalarFields.map((c) => en[c] as string)

      const content = en.content ? (typeof en.content === 'string' ? JSON.parse(en.content) : en.content) : null
      const bodyTexts: string[] = []
      if (content) collectLexicalTexts(content, bodyTexts)

      const allStrings = [...scalarStrings, ...bodyTexts]
      const translated = await translateAll(allStrings)

      const scalarTranslations: Record<string, string> = {}
      scalarFields.forEach((c, i) => (scalarTranslations[c] = translated[i]))
      const bodyTranslations = translated.slice(scalarStrings.length)

      let translatedContent = content
      if (content) {
        translatedContent = JSON.parse(JSON.stringify(content))
        applyLexicalTexts(translatedContent, [...bodyTranslations])
      }

      // Build INSERT ... SELECT with overrides.
      const params: any[] = []
      const selectExprs = cols.map((col) => {
        if (col.name in CONST_COLS) {
          params.push(CONST_COLS[col.name])
          return col.isEnum ? `$${params.length}::text::public."${col.udt}"` : `$${params.length}::text`
        }
        if (NULL_COLS.has(col.name)) return 'NULL'
        if (col.name === 'content') {
          params.push(JSON.stringify(translatedContent))
          return `$${params.length}::jsonb`
        }
        if ((TRANSLATE_COLS as readonly string[]).includes(col.name) && col.name in scalarTranslations) {
          params.push(scalarTranslations[col.name])
          return `$${params.length}::text`
        }
        return `b."${col.name}"`
      })
      params.push(enId)
      const enIdParam = `$${params.length}`

      const colList = cols.map((c) => `"${c.name}"`).join(', ')
      const insertSql = `INSERT INTO public.blog_posts (${colList})
        SELECT ${selectExprs.join(', ')} FROM public.blog_posts b WHERE b.id = ${enIdParam}
        RETURNING id`
      const ins = await db.query(insertSql, params)
      const newId = ins.rows[0].id as number
      newIds.push(newId)

      // Copy author + tag relationships (skip related-post and media rels).
      await db.query(
        `INSERT INTO public.blog_posts_rels ("order", parent_id, path, authors_id, blog_tags_id)
         SELECT "order", $1, path, authors_id, blog_tags_id
         FROM public.blog_posts_rels
         WHERE parent_id = $2 AND (authors_id IS NOT NULL OR blog_tags_id IS NOT NULL)`,
        [newId, enId],
      )

      done++
      console.log(`  ✓ en#${enId} → ar#${newId}  "${String(scalarTranslations.title || en.title).slice(0, 40)}"`)
    } catch (err) {
      console.log(`  ✗ en#${enId} FAILED: ${String((err as Error)?.message).slice(0, 240)}`)
    }
  }

  console.log(`\nInserted ${done}/${ids.length} Arabic posts. New ids: [${newIds.join(', ')}]`)
  await db.end()
  process.exit(done === ids.length ? 0 : 1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
