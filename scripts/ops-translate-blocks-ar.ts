/**
 * Translate the supplementary JSON fields of Arabic blog posts that were copied
 * verbatim from English: `content_blocks` (callouts, stats, inline CTAs, FAQs)
 * and `primary_c_t_a`. Walks the JSON, translates human-readable string values
 * (skipping keys that hold URLs/types/enums), and writes back to both the main
 * row and its latest version record.
 *
 * Run:
 *   DATABASE_URL="<supabase direct>" OPENAI_API_KEY="sk-..." \
 *   [ONLY_IDS=100,101] node --import tsx scripts/ops-translate-blocks-ar.ts
 */
import { Client } from 'pg'
import OpenAI from 'openai'

const DATABASE_URL = process.env.DATABASE_URL
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const MODEL = process.env.TRANSLATE_MODEL || 'gpt-4.1'
const ONLY_IDS = (process.env.ONLY_IDS || '').split(',').map((s) => s.trim()).filter(Boolean).map(Number)

if (!DATABASE_URL || !OPENAI_API_KEY) {
  console.error('Set DATABASE_URL and OPENAI_API_KEY')
  process.exit(1)
}
const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

const SKIP_KEYS = new Set([
  'blockType', 'type', 'url', 'href', 'src', 'icon', 'variant', 'style', 'color',
  'align', 'id', 'anchor', 'slug', 'buttonUrl', 'ctaUrl', 'link', 'image', 'imageUrl',
  'mediaUrl', 'locale', 'target', 'rel', 'format', 'layout', 'position',
])
const URL_RE = /^(https?:\/\/|\/|mailto:|tel:|#)/i
const NUMERIC_RE = /^[\s\d.,%$+\-/x×:()]+$/

function isTranslatable(key: string | null, value: string): boolean {
  if (key && SKIP_KEYS.has(key)) return false
  const v = value.trim()
  if (!v || v.length < 2) return false
  if (URL_RE.test(v)) return false
  if (NUMERIC_RE.test(v)) return false
  return true
}

function collect(value: unknown, key: string | null, out: string[]): void {
  if (typeof value === 'string') {
    if (isTranslatable(key, value)) out.push(value)
    return
  }
  if (Array.isArray(value)) {
    for (const item of value) collect(item, key, out)
    return
  }
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) collect(v, k, out)
  }
}

function apply(value: unknown, key: string | null, queue: string[]): unknown {
  if (typeof value === 'string') {
    if (isTranslatable(key, value)) {
      const next = queue.shift()
      return typeof next === 'string' ? next : value
    }
    return value
  }
  if (Array.isArray(value)) return value.map((item) => apply(item, key, queue))
  if (value && typeof value === 'object') {
    const obj: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) obj[k] = apply(v, k, queue)
    return obj
  }
  return value
}

const SYSTEM_PROMPT = [
  'You are a professional English-to-Arabic translator for CloudTopia, a software, cloud and AI agency.',
  'Translate each string to natural, fluent Modern Standard Arabic for a tech-savvy business audience.',
  'Keep brand/product names and common tech acronyms as written in Arabic tech media (CloudTopia, Shopify, CRM, ERP, SEO, API, SaaS, B2B, AI).',
  'Do NOT translate URLs, code or placeholders. Keep numbers and symbols.',
  'Return ONLY a JSON object {"t": [...]} where t has EXACTLY the same number of items, in the same order, as the input array.',
].join(' ')

async function translateBatch(strings: string[]): Promise<string[]> {
  if (!strings.length) return []
  const res = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: JSON.stringify({ strings }) },
    ],
  })
  const parsed = JSON.parse(res.choices?.[0]?.message?.content || '{}')
  const t = parsed.t || parsed.translations
  if (!Array.isArray(t) || t.length !== strings.length) {
    throw new Error(`length mismatch got ${Array.isArray(t) ? t.length : 'n/a'} want ${strings.length}`)
  }
  return t.map(String)
}

async function main() {
  const db = new Client({
    connectionString: DATABASE_URL,
    ssl: /localhost|127\.0\.0\.1/.test(DATABASE_URL!) ? undefined : { rejectUnauthorized: false },
  })
  await db.connect()

  const { rows } = await db.query(
    `SELECT id, content_blocks FROM public.blog_posts
     WHERE locale='ar' ${ONLY_IDS.length ? 'AND id = ANY($1)' : ''} ORDER BY id`,
    ONLY_IDS.length ? [ONLY_IDS] : [],
  )
  console.log(`Translating blocks for ${rows.length} Arabic posts.`)

  let ok = 0
  for (const row of rows) {
    try {
      const blocks = row.content_blocks ?? null

      const strings: string[] = []
      collect(blocks, 'content_blocks', strings)

      if (!strings.length) {
        ok++
        continue
      }
      const translated = await translateBatch(strings)
      const newBlocks = apply(blocks, 'content_blocks', [...translated])

      await db.query(`UPDATE public.blog_posts SET content_blocks = $1::jsonb WHERE id = $2`, [
        JSON.stringify(newBlocks),
        row.id,
      ])
      await db.query(
        `UPDATE public._blog_posts_v SET version_content_blocks = $1::jsonb WHERE parent_id = $2 AND latest`,
        [JSON.stringify(newBlocks), row.id],
      )
      ok++
      console.log(`  ✓ ar#${row.id} (${strings.length} strings)`)
    } catch (err) {
      console.log(`  ✗ ar#${row.id} FAILED: ${String((err as Error)?.message).slice(0, 200)}`)
    }
  }
  console.log(`\nDone. ${ok}/${rows.length}`)
  await db.end()
  process.exit(ok === rows.length ? 0 : 1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
