import type { PayloadRequest } from 'payload'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { blogRichTextFeatures } from './blog-rich-text.ts'
import { calculateReadingTime, extractLexicalPlainText, slugify } from '../blog/utils.ts'

/**
 * POST /api/blog-import
 *
 * "Import & Structure": takes pasted text or an uploaded .md/.mdx file and:
 *   1. (AI) re-arranges it into clean Markdown WITHOUT changing the wording —
 *      adds headings, lists, and a comparison table only where the content
 *      already implies them. Never rewrites/rephrases.
 *   2. (deterministic) converts that Markdown → Payload Lexical using the SAME
 *      editor features as the field (so tables/code/lists render).
 *   3. (AI) fills the metadata from the content: title, excerpt, SEO, and picks
 *      the best Category + Tags from the existing taxonomy.
 * The client writes the result into the form fields; nothing saves until Save.
 */

type ImportResult = {
  content: unknown
  title: string
  slug: string
  excerpt: string
  shortExcerpt: string
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  secondaryKeywords: string[]
  categoryId: number | string | null
  tagIds: Array<number | string>
  readingTime: number
  warnings: string[]
}

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

async function parseBody(req: PayloadRequest): Promise<{ text?: string; fileName?: string }> {
  if (req.data && typeof req.data === 'object') return req.data as any
  try {
    const raw = await req.text?.()
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return {}
}

// Very small YAML-frontmatter reader: only flat `key: value` lines + simple
// inline `[a, b]` / `a, b` tag lists. Enough to honor .md/.mdx front matter.
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
  '- Do NOT change, rephrase, reword, translate, summarize, shorten, expand, correct, or "improve" any sentence. Preserve the author\'s EXACT wording, character for character, in their original language (English or Arabic).',
  '- You may ONLY add structure: insert "## " / "### " headings where the topic clearly shifts (use the author\'s own words as the heading), turn clearly enumerated items into "- " bullet or "1." numbered lists, convert clearly comparative/side-by-side data into a GFM Markdown table, and wrap code in triple-backtick fences.',
  '- Do NOT invent headings, table rows, or any content not present in the text. When unsure, leave it as plain paragraphs.',
  '- The page title is rendered separately — do NOT output a top-level "# " H1. Start headings at "## ".',
  'Return ONLY the Markdown — no preamble, no commentary, and do not wrap the whole output in a code fence.',
].join('\n')

function metadataPrompt(plain: string, categories: string[], tags: string[], language: string, fm: Record<string, string>) {
  return [
    'You are CloudTopia editorial SEO AI. Based ONLY on the article content below, produce metadata.',
    `Write all human-readable values in ${language}.`,
    'Return ONLY minified JSON with EXACTLY these keys:',
    '{"title":string,"excerpt":string,"shortExcerpt":string,"metaTitle":string,"metaDescription":string,"focusKeyword":string,"secondaryKeywords":string[],"slug":string,"category":string,"tags":string[],"warnings":string[]}',
    'Rules: title <= 70 chars; metaTitle <= 60; metaDescription <= 155; shortExcerpt <= 120; excerpt 1-2 sentences. slug = lowercase kebab-case ASCII (transliterate Arabic).',
    `category MUST be exactly one value copied from this list (or "" if none fit): ${JSON.stringify(categories)}`,
    `tags MUST be 0-4 values copied EXACTLY from this list: ${JSON.stringify(tags)}`,
    fm.title ? `The author already titled it: "${fm.title}" — prefer this title.` : '',
    'warnings: short notes (e.g. missing comparison data, very short content) or [].',
    `Article content:\n${plain.slice(0, 8000)}`,
  ].filter(Boolean).join('\n')
}

function titleField(doc: any): string {
  return doc?.name || doc?.title || doc?.label || doc?.slug || ''
}

export async function handleBlogImportEndpoint(req: PayloadRequest): Promise<Response> {
  const { user } = await req.payload.auth({ headers: req.headers })
  if (!user) return Response.json({ error: 'Unauthorized.' }, { status: 401 })

  const { text } = await parseBody(req)
  if (!text || !text.trim()) {
    return Response.json({ error: 'Paste some text or choose a .md/.mdx file first.' }, { status: 400 })
  }
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: 'OPENAI_API_KEY is not configured.' }, { status: 503 })
  }

  try {
    const { body, fm } = parseFrontmatter(text.slice(0, 60000))
    const isArabic = /[؀-ۿ]/.test(body)
    const language = isArabic ? 'Arabic' : 'English'

    // 1) AI: raw text → structured markdown (wording preserved verbatim).
    const markdown = stripCodeFence(await callOpenAI(`${STRUCTURE_PROMPT}\n\n--- RAW TEXT ---\n${body}`, 0.15))

    // 2) Deterministic: markdown → Lexical with the field's own features.
    const editorConfig = await getEditorConfig(req)
    const content = await convertMarkdownToLexical({ editorConfig, markdown })
    const plain = extractLexicalPlainText(content)

    // 3) AI: metadata + best-match category/tags from the existing taxonomy.
    const [catRes, tagRes] = await Promise.all([
      req.payload.find({ collection: 'blog-categories' as any, limit: 100, depth: 0, overrideAccess: true, req }),
      req.payload.find({ collection: 'blog-tags' as any, limit: 200, depth: 0, overrideAccess: true, req }),
    ])
    const catByName = new Map<string, any>()
    catRes.docs.forEach((c: any) => catByName.set(titleField(c).toLowerCase(), c.id))
    const tagByName = new Map<string, any>()
    tagRes.docs.forEach((t: any) => tagByName.set(titleField(t).toLowerCase(), t.id))

    const meta = parseJsonLoose(
      await callOpenAI(
        metadataPrompt(plain, [...catByName.keys()].map((k) => k), [...tagByName.keys()].map((k) => k), language, fm),
        0.4,
      ),
    )

    const title = (fm.title || meta.title || '').toString().trim() || 'Untitled'
    const excerpt = (fm.excerpt || fm.description || meta.excerpt || '').toString().trim()
    const slug = (fm.slug || meta.slug || slugify(title) || '').toString().trim()

    const categoryId = meta.category ? (catByName.get(String(meta.category).toLowerCase()) ?? null) : null
    const tagIds = Array.isArray(meta.tags)
      ? meta.tags.map((t: string) => tagByName.get(String(t).toLowerCase())).filter((x: unknown) => x != null)
      : []

    const result: ImportResult = {
      content,
      title,
      slug,
      excerpt,
      shortExcerpt: (meta.shortExcerpt || '').toString().trim(),
      metaTitle: (meta.metaTitle || '').toString().trim(),
      metaDescription: (meta.metaDescription || '').toString().trim(),
      focusKeyword: (meta.focusKeyword || '').toString().trim(),
      secondaryKeywords: Array.isArray(meta.secondaryKeywords) ? meta.secondaryKeywords : [],
      categoryId,
      tagIds,
      readingTime: calculateReadingTime(content),
      warnings: [
        ...(Array.isArray(meta.warnings) ? meta.warnings : []),
        ...(categoryId == null ? ['Could not auto-pick a Category — choose one before publishing.'] : []),
      ],
    }

    return Response.json({ result })
  } catch (error: any) {
    return Response.json({ error: error?.message || 'Import failed.' }, { status: 500 })
  }
}
