import type { PayloadRequest } from 'payload'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { blogRichTextFeatures } from './blog-rich-text.ts'
import { slugify } from '../blog/utils.ts'

/**
 * POST /api/blog-import
 *
 * "Import & Structure": paste text or upload a .md/.mdx file and get a fully
 * populated DRAFT article. Pipeline:
 *   1. (AI) re-arrange the raw text into Markdown WITHOUT changing the wording
 *      (headings, lists, comparison tables only).
 *   2. (deterministic) Markdown → Lexical via the field's own editor features.
 *   3. (AI) classify + extract: title, SEO, taxonomy (category/tags/author),
 *      editorial selects, CTA, and structured blocks (FAQ, comparison, key
 *      takeaways, pros/cons, stats).
 *   4. Persist as a DRAFT via payload.create/update (server-side handling
 *      reliably fills blocks, arrays, and relationships — unlike client form
 *      dispatch — and draft mode skips required-field validation).
 * Returns the doc id so the editor can open the populated draft for review.
 */

const CONTENT_TYPES = ['guide', 'article', 'case_study', 'checklist', 'comparison', 'tutorial', 'opinion', 'news']
const AUDIENCES = ['startups', 'small_businesses', 'medium_businesses', 'real_estate', 'clinics', 'ecommerce', 'service_companies', 'founders', 'developers']
const SERVICE_FOCUS = ['websites', 'web_apps', 'crm', 'erp', 'automation', 'ai', 'cloud', 'digital_presence', 'business_systems']
const DIFFICULTY = ['beginner', 'intermediate', 'advanced']

let editorConfigPromise: Promise<any> | null = null
function getEditorConfig(req: PayloadRequest) {
  if (!editorConfigPromise) {
    editorConfigPromise = editorConfigFactory.fromFeatures({
      config: req.payload.config,
      features: blogRichTextFeatures as any,
    })
  }
  return editorConfigPromise
}

async function parseBody(req: PayloadRequest): Promise<{ text?: string; id?: string | number }> {
  if (req.data && typeof req.data === 'object') return req.data as any
  try {
    const raw = await req.text?.()
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return {}
}

function parseFrontmatter(text: string): { body: string; fm: Record<string, string> } {
  const m = text.match(/^﻿?---\s*\n([\s\S]*?)\n---\s*\n?/)
  if (!m) return { body: text, fm: {} }
  const fm: Record<string, string> = {}
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.*)\s*$/)
    if (kv) fm[kv[1].toLowerCase()] = kv[2].replace(/^["']|["']$/g, '').trim()
  }
  return { body: text.slice(m[0].length), fm }
}

async function callOpenAI(prompt: string, temperature: number): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured.')
  const model = process.env.AI_MODEL || 'gpt-4o-mini'
  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model, input: prompt, temperature }),
  })
  const payload = await res.json()
  if (!res.ok) throw new Error(payload?.error?.message || 'OpenAI request failed.')
  const text = payload?.output_text || payload?.output?.[0]?.content?.[0]?.text
  if (typeof text !== 'string' || !text.trim()) throw new Error('OpenAI returned no output.')
  return text
}

function stripCodeFence(s: string): string {
  return s.trim().replace(/^```(?:markdown|md)?\s*\n?/i, '').replace(/\n?```$/i, '').trim()
}

function parseJsonLoose(text: string): any {
  let s = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  if (s[0] !== '{') {
    const a = s.indexOf('{')
    const b = s.lastIndexOf('}')
    if (a >= 0 && b > a) s = s.slice(a, b + 1)
  }
  return JSON.parse(s)
}

const STRUCTURE_PROMPT = [
  'You are formatting a CloudTopia blog article. The user pasted raw text below.',
  'Convert it into clean GitHub-Flavored Markdown.',
  'ABSOLUTE RULES — these override everything:',
  "- Do NOT change, rephrase, reword, translate, summarize, shorten, expand, correct, or 'improve' any sentence. Preserve the author's EXACT wording, character for character, in the original language (English or Arabic).",
  '- You may ONLY add structure: "## " / "### " headings where the topic shifts (use the author\'s own words), bullet/numbered lists for clearly enumerated items, a GFM Markdown table for clearly comparative data, and triple-backtick fences for code.',
  '- Do NOT invent content. The page title is rendered separately — do NOT output a top-level "# " H1; start at "## ".',
  'Return ONLY the Markdown — no preamble, no commentary, no wrapping code fence.',
].join('\n')

function metaPrompt(plain: string, opts: {
  language: string
  categories: string[]
  tags: string[]
  authors: string[]
  fmTitle?: string
}) {
  return [
    'You are CloudTopia editorial AI. Based ONLY on the article content below, produce metadata, taxonomy, and supporting blocks as STRICT minified JSON.',
    `Write all human-readable values in ${opts.language}.`,
    'Output EXACTLY these keys:',
    '{"title":string,"subtitle":string,"excerpt":string,"shortExcerpt":string,"metaTitle":string,"metaDescription":string,"focusKeyword":string,"secondaryKeywords":string[],"slug":string,' +
      '"contentType":string,"targetAudience":string,"serviceFocus":string,"difficulty":string,' +
      '"category":string,"tags":string[],"author":string,"ctaTitle":string,"ctaDescription":string,' +
      '"keyTakeaways":string[],"faq":[{"question":string,"answer":string}],' +
      '"comparison":{"title":string,"rows":[{"feature":string,"optionA":string,"optionB":string}]},' +
      '"prosCons":{"pros":string[],"cons":string[]},"stats":[{"number":string,"label":string,"description":string}],"warnings":string[]}',
    'Rules:',
    '- title <= 70 chars; metaTitle <= 60; metaDescription <= 155; shortExcerpt <= 120; excerpt 1-2 sentences. slug = lowercase kebab-case ASCII (transliterate Arabic).',
    `- contentType MUST be one of ${JSON.stringify(CONTENT_TYPES)}.`,
    `- targetAudience MUST be one of ${JSON.stringify(AUDIENCES)}.`,
    `- serviceFocus MUST be one of ${JSON.stringify(SERVICE_FOCUS)}.`,
    `- difficulty MUST be one of ${JSON.stringify(DIFFICULTY)}.`,
    `- category MUST be exactly one value from ${JSON.stringify(opts.categories)} (or "").`,
    `- tags MUST be 0-5 values copied EXACTLY from ${JSON.stringify(opts.tags)}.`,
    `- author MUST be exactly one value from ${JSON.stringify(opts.authors)} (or "").`,
    '- keyTakeaways: 3-5 short bullet takeaways derived from the article. faq: 3-6 question/answer pairs the article answers. comparison/prosCons/stats: ONLY include real data found in the article, otherwise use empty arrays / empty rows. These supporting blocks are derived summaries — they do NOT replace the body.',
    '- ctaTitle/ctaDescription: a short call-to-action relevant to the topic.',
    opts.fmTitle ? `- The author titled it "${opts.fmTitle}" — prefer this title.` : '',
    `Article content:\n${plain.slice(0, 9000)}`,
  ].filter(Boolean).join('\n')
}

function titleField(doc: any): string {
  return doc?.name || doc?.title || doc?.label || doc?.fullName || doc?.slug || ''
}

const oneOf = (v: unknown, allowed: string[]): string | undefined => {
  const s = String(v ?? '').trim().toLowerCase()
  return allowed.includes(s) ? s : undefined
}

// Build a valid contentBlocks array from the AI's constrained structures.
function buildBlocks(meta: any): any[] {
  const blocks: any[] = []
  const txt = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

  const takeaways = Array.isArray(meta.keyTakeaways) ? meta.keyTakeaways.map(txt).filter(Boolean) : []
  if (takeaways.length) {
    blocks.push({
      blockType: 'calloutBlock',
      type: 'cloudtopia-note',
      title: 'Key takeaways',
      content: takeaways.map((t: string) => `• ${t}`).join('\n'),
    })
  }

  const rows = meta?.comparison?.rows
  if (Array.isArray(rows)) {
    const valid = rows
      .map((r: any) => ({ feature: txt(r.feature), optionA: txt(r.optionA), optionB: txt(r.optionB) }))
      .filter((r: any) => r.feature)
    if (valid.length >= 2) {
      blocks.push({ blockType: 'comparisonTableBlock', title: txt(meta.comparison.title) || 'Comparison', rows: valid })
    }
  }

  const pros = Array.isArray(meta?.prosCons?.pros) ? meta.prosCons.pros.map(txt).filter(Boolean) : []
  const cons = Array.isArray(meta?.prosCons?.cons) ? meta.prosCons.cons.map(txt).filter(Boolean) : []
  if (pros.length || cons.length) {
    blocks.push({
      blockType: 'prosConsBlock',
      pros: pros.map((item: string) => ({ item })),
      cons: cons.map((item: string) => ({ item })),
    })
  }

  const stats = Array.isArray(meta.stats) ? meta.stats : []
  for (const s of stats) {
    const statNumber = txt(s.number)
    const statLabel = txt(s.label)
    if (statNumber && statLabel) {
      blocks.push({ blockType: 'statBlock', statNumber, statLabel, description: txt(s.description) })
    }
  }

  const faqs = Array.isArray(meta.faq) ? meta.faq : []
  for (const f of faqs) {
    const question = txt(f.question)
    const answer = txt(f.answer)
    if (question && answer) blocks.push({ blockType: 'faqBlock', question, answer, includeInSchema: true })
  }

  return blocks
}

export async function handleBlogImportEndpoint(req: PayloadRequest): Promise<Response> {
  const { user } = await req.payload.auth({ headers: req.headers })
  if (!user) return Response.json({ error: 'Unauthorized.' }, { status: 401 })

  const { text, id } = await parseBody(req)
  if (!text || !text.trim()) {
    return Response.json({ error: 'Paste some text or choose a .md/.mdx file first.' }, { status: 400 })
  }
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: 'OPENAI_API_KEY is not configured.' }, { status: 503 })
  }

  try {
    const { body, fm } = parseFrontmatter(text.slice(0, 60000))
    const language = /[؀-ۿ]/.test(body) ? 'Arabic' : 'English'

    // 1) Structure → Markdown (verbatim) → 2) Lexical content.
    const markdown = stripCodeFence(await callOpenAI(`${STRUCTURE_PROMPT}\n\n--- RAW TEXT ---\n${body}`, 0.15))
    const editorConfig = await getEditorConfig(req)
    const content: any = convertMarkdownToLexical({ editorConfig, markdown })
    const plain = (function extract(node: any, acc: string[] = []): string[] {
      if (node && typeof node === 'object') {
        if (typeof node.text === 'string') acc.push(node.text)
        if (Array.isArray(node.children)) for (const c of node.children) extract(c, acc)
      }
      return acc
    })(content?.root).join(' ').replace(/\s+/g, ' ').trim()

    // 3) Taxonomy + metadata + blocks.
    const [cats, tags, authors] = await Promise.all([
      req.payload.find({ collection: 'blog-categories' as any, limit: 100, depth: 0, overrideAccess: true, req }),
      req.payload.find({ collection: 'blog-tags' as any, limit: 200, depth: 0, overrideAccess: true, req }),
      req.payload.find({ collection: 'authors' as any, limit: 50, depth: 0, overrideAccess: true, req }),
    ])
    const catByName = new Map<string, any>(cats.docs.map((c: any) => [titleField(c).toLowerCase(), c.id]))
    const tagByName = new Map<string, any>(tags.docs.map((t: any) => [titleField(t).toLowerCase(), t.id]))
    const authorByName = new Map<string, any>(authors.docs.map((a: any) => [titleField(a).toLowerCase(), a.id]))

    const meta = parseJsonLoose(
      await callOpenAI(
        metaPrompt(plain, {
          language,
          categories: [...catByName.keys()],
          tags: [...tagByName.keys()],
          authors: [...authorByName.keys()],
          fmTitle: fm.title,
        }),
        0.4,
      ),
    )

    const title = (fm.title || meta.title || 'Untitled').toString().trim() || 'Untitled'
    // title/slug/excerpt/content are NOT NULL in the DB — guarantee non-empty values.
    const excerptFallback = plain.replace(/\s+/g, ' ').trim().slice(0, 157)
    const safeExcerpt = (fm.excerpt || fm.description || meta.excerpt || '').toString().trim() || excerptFallback || title
    const safeSlug = (fm.slug || meta.slug || '').toString().trim() || slugify(title) || `article-${title.length}`
    const categoryId = meta.category ? catByName.get(String(meta.category).toLowerCase()) ?? null : null
    const tagIds = Array.isArray(meta.tags)
      ? meta.tags.map((t: string) => tagByName.get(String(t).toLowerCase())).filter((x: unknown) => x != null)
      : []
    const aiAuthorId = meta.author ? authorByName.get(String(meta.author).toLowerCase()) ?? null : null
    const fallbackAuthorId = authors.docs[0]?.id ?? null

    const data: Record<string, unknown> = {
      title,
      slug: safeSlug,
      subtitle: (meta.subtitle || '').toString().trim() || undefined,
      excerpt: safeExcerpt,
      shortExcerpt: (meta.shortExcerpt || '').toString().trim() || undefined,
      content,
      contentBlocks: buildBlocks(meta),
      contentType: oneOf(meta.contentType, CONTENT_TYPES),
      targetAudience: oneOf(meta.targetAudience, AUDIENCES),
      serviceFocus: oneOf(meta.serviceFocus, SERVICE_FOCUS),
      difficulty: oneOf(meta.difficulty, DIFFICULTY) || 'beginner',
      category: categoryId ?? undefined,
      tags: tagIds.length ? tagIds : undefined,
      ctaTitle: (meta.ctaTitle || '').toString().trim() || undefined,
      ctaDescription: (meta.ctaDescription || '').toString().trim() || undefined,
      seo: {
        metaTitle: (meta.metaTitle || '').toString().trim() || undefined,
        metaDescription: (meta.metaDescription || '').toString().trim() || undefined,
        focusKeyword: (meta.focusKeyword || '').toString().trim() || undefined,
      },
      status: 'draft',
    }
    // Drop undefined so Payload defaults apply.
    for (const k of Object.keys(data)) if (data[k] === undefined) delete data[k]

    let docId = id
    let created = false
    if (id) {
      const existing = await req.payload.findByID({ collection: 'blog-posts' as any, id, depth: 0, draft: true, overrideAccess: true, req }).catch(() => null)
      // Preserve an author that's already set; never touch the cover image here.
      if (!existing?.author && (aiAuthorId ?? fallbackAuthorId)) data.author = aiAuthorId ?? fallbackAuthorId
      await req.payload.update({ collection: 'blog-posts' as any, id, data, draft: true, overrideAccess: true, req, context: { skipAutoTranslate: true } })
    } else {
      if (aiAuthorId ?? fallbackAuthorId) data.author = aiAuthorId ?? fallbackAuthorId
      const doc = await req.payload.create({ collection: 'blog-posts' as any, data, draft: true, overrideAccess: true, req, context: { skipAutoTranslate: true } })
      docId = doc.id
      created = true
    }

    const filled: string[] = ['content', 'title']
    if (data.slug) filled.push('slug')
    if (data.excerpt) filled.push('excerpt')
    if (data.seo) filled.push('SEO')
    if (categoryId) filled.push('category')
    if (tagIds.length) filled.push(`${tagIds.length} tags`)
    if (data.author) filled.push('author')
    const nBlocks = (data.contentBlocks as any[])?.length || 0
    if (nBlocks) filled.push(`${nBlocks} blocks`)
    if (data.contentType) filled.push('type/audience/focus')

    const warnings: string[] = Array.isArray(meta.warnings) ? meta.warnings : []
    if (!categoryId) warnings.push('No category matched — pick one before publishing.')
    warnings.push('Add a cover image (required to publish) and review, then publish.')

    return Response.json({ id: docId, created, filled, warnings })
  } catch (error: any) {
    return Response.json({ error: error?.message || 'Import failed.' }, { status: 500 })
  }
}
