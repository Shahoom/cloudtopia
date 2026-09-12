/**
 * Import the 24 bilingual deliverable articles (content-deliverables/) into
 * production as PUBLISHED blog_posts, with images on R2 and full SEO settings.
 *
 * Per article folder: parse ar.md + en.md (frontmatter + body + image
 * appendix), upload images to R2 once, create media rows, convert markdown →
 * Lexical, inject inline upload nodes (populated-shape values — the public
 * data layer reads content jsonb raw, no Payload population), append a
 * localized "Read also" section, and insert the two rows with staggered
 * published_at ordered by editorial importance (rank 1 = newest).
 *
 *   node --import tsx --env-file=scratchpad/.sb-env --env-file=.env.local \
 *     scripts/import-deliverables.ts [--only <folder>] [--dry]
 *
 * Idempotent: skips (slug, locale) rows and media filenames that exist.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
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

import pkg from 'pg'
const { Pool } = pkg

// Direct Postgres via the temporary BYPASSRLS import role (session pooler).
const PG_URL = process.env.PG_IMPORT_URL || ''
if (!PG_URL && !process.argv.includes('--dry')) throw new Error('PG_IMPORT_URL required in scratchpad/.sb-env')
const pool = PG_URL ? new Pool({ connectionString: PG_URL, ssl: { rejectUnauthorized: false }, max: 2 }) : null
async function q(text: string, params: any[] = []): Promise<any[]> {
  if (!pool) throw new Error('no db connection in dry mode')
  return (await pool.query(text, params)).rows
}

const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  forcePathStyle: true,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID || '', secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '' },
})
const R2_BUCKET = process.env.R2_BUCKET || 'cloudtopia-media'

const DIR = path.join(process.cwd(), 'content-deliverables')
const AUTHOR_ID = 1 // Mohamad Shahm | محمد شـهم

// ── Editorial metadata: importance rank (1 = newest/most prominent), taxonomy,
// related-article cross-links. Category/tag values are slugs. ──
type Meta = {
  rank: number
  category: 'pricing' | 'regulations' | 'guides'
  tags: string[]
  contentType: string
  serviceFocus: string
  audience: string
  featured?: boolean
  pinned?: boolean
  editorPick?: boolean
  related: string[] // folder names
}
const META: Record<string, Meta> = {
  'p1-01-website-cost-oman':            { rank: 1, category: 'pricing', tags: ['oman', 'pricing', 'website-strategy'], contentType: 'comparison', serviceFocus: 'websites', audience: 'small_businesses', featured: true, pinned: true, related: ['p1-02-app-development-cost-oman', 'p2-14-launch-online-store-oman-hub', 'p1-10-source-code-ownership-contract'] },
  'p1-02-app-development-cost-oman':    { rank: 2, category: 'pricing', tags: ['oman', 'pricing', 'custom-software'], contentType: 'comparison', serviceFocus: 'web_apps', audience: 'small_businesses', featured: true, related: ['p1-01-website-cost-oman', 'p1-09-app-development-cost-saudi', 'p1-07-choose-web-company-gulf'] },
  'p2-14-launch-online-store-oman-hub': { rank: 3, category: 'guides', tags: ['oman', 'e-commerce', 'regulations'], contentType: 'guide', serviceFocus: 'websites', audience: 'small_businesses', editorPick: true, related: ['p2-04-oman-ecommerce-license', 'p2-05-payment-gateways-oman', 'p1-01-website-cost-oman'] },
  'p1-07-choose-web-company-gulf':      { rank: 4, category: 'guides', tags: ['website-strategy', 'custom-software'], contentType: 'guide', serviceFocus: 'websites', audience: 'small_businesses', editorPick: true, related: ['p1-10-source-code-ownership-contract', 'p1-01-website-cost-oman', 'p1-08-choose-web-company-uae'] },
  'p1-03-website-cost-saudi-arabia':    { rank: 5, category: 'pricing', tags: ['saudi-arabia', 'pricing', 'website-strategy'], contentType: 'comparison', serviceFocus: 'websites', audience: 'small_businesses', related: ['p2-13-launch-online-store-saudi-hub', 'p1-09-app-development-cost-saudi', 'p1-01-website-cost-oman'] },
  'p2-13-launch-online-store-saudi-hub':{ rank: 6, category: 'guides', tags: ['saudi-arabia', 'e-commerce', 'regulations'], contentType: 'guide', serviceFocus: 'websites', audience: 'ecommerce', editorPick: true, related: ['p2-02-maroof-verification-guide', 'p2-09-mada-apple-pay-tabby-tamara', 'p2-01-zatca-phase-2-developers'] },
  'p1-04-website-cost-uae':             { rank: 7, category: 'pricing', tags: ['uae', 'pricing', 'website-strategy'], contentType: 'comparison', serviceFocus: 'websites', audience: 'small_businesses', related: ['p1-08-choose-web-company-uae', 'p2-11-freezone-vs-mainland-website', 'p1-03-website-cost-saudi-arabia'] },
  'p1-09-app-development-cost-saudi':   { rank: 8, category: 'pricing', tags: ['saudi-arabia', 'pricing', 'custom-software'], contentType: 'comparison', serviceFocus: 'web_apps', audience: 'startups', related: ['p1-02-app-development-cost-oman', 'p1-03-website-cost-saudi-arabia', 'p1-07-choose-web-company-gulf'] },
  'p1-10-source-code-ownership-contract':{ rank: 9, category: 'guides', tags: ['custom-software', 'website-strategy'], contentType: 'guide', serviceFocus: 'websites', audience: 'founders', related: ['p1-07-choose-web-company-gulf', 'p1-01-website-cost-oman', 'p1-08-choose-web-company-uae'] },
  'p1-05-instagram-vs-website':         { rank: 10, category: 'guides', tags: ['website-strategy', 'small-business'], contentType: 'comparison', serviceFocus: 'digital_presence', audience: 'small_businesses', related: ['p2-10-uae-instagram-trade-licence', 'p1-06-brochure-site-vs-ecommerce', 'p1-01-website-cost-oman'] },
  'p1-06-brochure-site-vs-ecommerce':   { rank: 11, category: 'guides', tags: ['website-strategy', 'e-commerce'], contentType: 'comparison', serviceFocus: 'websites', audience: 'small_businesses', related: ['p1-05-instagram-vs-website', 'p2-14-launch-online-store-oman-hub', 'p1-01-website-cost-oman'] },
  'p1-08-choose-web-company-uae':       { rank: 12, category: 'guides', tags: ['uae', 'website-strategy'], contentType: 'guide', serviceFocus: 'websites', audience: 'small_businesses', related: ['p1-04-website-cost-uae', 'p1-07-choose-web-company-gulf', 'p2-11-freezone-vs-mainland-website'] },
  'p2-05-payment-gateways-oman':        { rank: 13, category: 'regulations', tags: ['oman', 'payments', 'e-commerce'], contentType: 'comparison', serviceFocus: 'websites', audience: 'ecommerce', related: ['p2-14-launch-online-store-oman-hub', 'p2-06-oman-e-invoicing', 'p2-04-oman-ecommerce-license'] },
  'p2-04-oman-ecommerce-license':       { rank: 14, category: 'regulations', tags: ['oman', 'regulations', 'e-commerce'], contentType: 'guide', serviceFocus: 'websites', audience: 'small_businesses', related: ['p2-14-launch-online-store-oman-hub', 'p2-05-payment-gateways-oman', 'p2-07-om-domain-registration'] },
  'p2-01-zatca-phase-2-developers':     { rank: 15, category: 'regulations', tags: ['saudi-arabia', 'regulations', 'erp'], contentType: 'guide', serviceFocus: 'business_systems', audience: 'developers', related: ['p2-12-zatca-phase-2-api-checklist', 'p2-13-launch-online-store-saudi-hub', 'p2-02-maroof-verification-guide'] },
  'p2-09-mada-apple-pay-tabby-tamara':  { rank: 16, category: 'regulations', tags: ['saudi-arabia', 'payments', 'e-commerce'], contentType: 'tutorial', serviceFocus: 'websites', audience: 'ecommerce', related: ['p2-13-launch-online-store-saudi-hub', 'p2-02-maroof-verification-guide', 'p1-03-website-cost-saudi-arabia'] },
  'p2-02-maroof-verification-guide':    { rank: 17, category: 'regulations', tags: ['saudi-arabia', 'regulations', 'e-commerce'], contentType: 'guide', serviceFocus: 'websites', audience: 'ecommerce', related: ['p2-13-launch-online-store-saudi-hub', 'p2-03-saudi-pdpl-for-websites', 'p2-09-mada-apple-pay-tabby-tamara'] },
  'p2-03-saudi-pdpl-for-websites':      { rank: 18, category: 'regulations', tags: ['saudi-arabia', 'regulations'], contentType: 'guide', serviceFocus: 'websites', audience: 'small_businesses', related: ['p2-02-maroof-verification-guide', 'p2-01-zatca-phase-2-developers', 'p2-13-launch-online-store-saudi-hub'] },
  'p2-07-om-domain-registration':       { rank: 19, category: 'regulations', tags: ['oman', 'hosting', 'website-strategy'], contentType: 'guide', serviceFocus: 'websites', audience: 'small_businesses', related: ['p1-01-website-cost-oman', 'p2-04-oman-ecommerce-license', 'p2-08-sa-domain-registration'] },
  'p2-06-oman-e-invoicing':             { rank: 20, category: 'regulations', tags: ['oman', 'regulations', 'erp'], contentType: 'guide', serviceFocus: 'business_systems', audience: 'small_businesses', related: ['p2-01-zatca-phase-2-developers', 'p2-05-payment-gateways-oman', 'p2-14-launch-online-store-oman-hub'] },
  'p2-08-sa-domain-registration':       { rank: 21, category: 'regulations', tags: ['saudi-arabia', 'hosting', 'website-strategy'], contentType: 'guide', serviceFocus: 'websites', audience: 'small_businesses', related: ['p2-07-om-domain-registration', 'p1-03-website-cost-saudi-arabia', 'p2-13-launch-online-store-saudi-hub'] },
  'p2-10-uae-instagram-trade-licence':  { rank: 22, category: 'regulations', tags: ['uae', 'regulations'], contentType: 'guide', serviceFocus: 'digital_presence', audience: 'small_businesses', related: ['p1-05-instagram-vs-website', 'p2-11-freezone-vs-mainland-website', 'p1-04-website-cost-uae'] },
  'p2-11-freezone-vs-mainland-website': { rank: 23, category: 'regulations', tags: ['uae', 'regulations', 'website-strategy'], contentType: 'comparison', serviceFocus: 'websites', audience: 'founders', related: ['p2-10-uae-instagram-trade-licence', 'p1-04-website-cost-uae', 'p1-08-choose-web-company-uae'] },
  'p2-12-zatca-phase-2-api-checklist':  { rank: 24, category: 'regulations', tags: ['saudi-arabia', 'regulations', 'erp'], contentType: 'checklist', serviceFocus: 'business_systems', audience: 'developers', related: ['p2-01-zatca-phase-2-developers', 'p2-13-launch-online-store-saudi-hub', 'p2-06-oman-e-invoicing'] },
}

// Existing tag ids (blog_tags); new slugs are created on the fly.
const KNOWN_TAGS: Record<string, number> = {
  'website-strategy': 1, 'custom-software': 2, 'small-business': 3, 'crm': 4,
  'e-commerce': 52, 'erp': 53, 'whatsapp': 54, 'hosting': 50,
}
const NEW_TAGS: Record<string, string> = {
  oman: 'Sultanate of Oman', 'saudi-arabia': 'Saudi Arabia', uae: 'UAE',
  pricing: 'Pricing', payments: 'Payments', regulations: 'Regulations',
}
const NEW_CATEGORIES: Record<string, string> = { pricing: 'Pricing & Costs', regulations: 'Regulations & Compliance' }
const KNOWN_CATEGORIES: Record<string, number> = { guides: 10 }

// Insert a row from a column→value object; jsonb columns are stringified.
async function insertRow(table: string, row: Record<string, any>, jsonbCols: string[] = []): Promise<any> {
  const cols = Object.keys(row)
  const params = cols.map((c) => (jsonbCols.includes(c) ? JSON.stringify(row[c]) : row[c]))
  const placeholders = cols.map((c, i) => (jsonbCols.includes(c) ? `$${i + 1}::jsonb` : `$${i + 1}`))
  const sql = `INSERT INTO public.${table} (${cols.map((c) => `"${c}"`).join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING id`
  const rows = await q(sql, params)
  return rows[0]
}

// ── Markdown parsing ──
function parseFrontmatter(raw: string): { fm: any; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) return { fm: {}, body: raw }
  const fm: any = {}
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    let v: any = kv[2].trim()
    if (v.startsWith('[')) { try { v = JSON.parse(v.replace(/'/g, '"')) } catch { v = v.slice(1, -1).split(',').map((s: string) => s.trim().replace(/^"|"$/g, '')) } }
    else v = v.replace(/^"|"$/g, '')
    fm[kv[1]] = v
  }
  return { fm, body: raw.slice(m[0].length) }
}

type ImgEntry = { file: string; altAr: string; altEn: string }
// Two appendix styles exist across the deliverables:
//   A) "<!-- الصور المقترحة -->" + numbered blocks with quoted Alt (AR)/(EN)
//   B) "<!-- Suggested images -->" + one bullet per image, unquoted
//      "... Alt AR: <text>. Alt EN: <text>."
function splitImageAppendix(body: string): { body: string; images: ImgEntry[] } {
  const markers = ['<!-- الصور المقترحة -->', '<!-- Suggested images -->']
  const idx = markers.map((m) => body.indexOf(m)).filter((i) => i !== -1).sort((a, b) => a - b)[0]
  if (idx === undefined) return { body, images: [] }
  const appendix = body.slice(idx)
  const images: ImgEntry[] = []
  const chunks = appendix.split(/(?=`images\/)/).slice(1)
  const grab = (chunk: string, lang: 'AR' | 'EN'): string => {
    const quoted = chunk.match(new RegExp(`Alt \\(?${lang}\\)?:\\s*[«"]([^"«»\\n]+)[»"]`))
    if (quoted) return quoted[1].trim()
    const bare = chunk.match(new RegExp(`Alt \\(?${lang}\\)?:\\s*([^\\n]+?)(?=\\s*(?:\\.\\s*Alt\\b|\\n|$))`))
    return (bare?.[1] || '').replace(/\.$/, '').trim()
  }
  for (const chunk of chunks) {
    const file = chunk.match(/^`images\/([^`]+)`/)?.[1]
    if (file) images.push({ file, altAr: grab(chunk, 'AR'), altEn: grab(chunk, 'EN') })
  }
  if (!images.length) {
    // Style C: bullets with no local file path — "Arabic alt: "…" — English
    // alt: "…"" in document order (cover first). File is resolved later by
    // position against the folder's images/ directory.
    for (const bullet of appendix.split(/\n- /).slice(1)) {
      const altAr = bullet.match(/Arabic alt:\s*[«"]([^"«»\n]+)[»"]/)?.[1]?.trim() || ''
      const altEn = bullet.match(/English alt:\s*[«"]([^"«»\n]+)[»"]/)?.[1]?.trim() || ''
      if (altAr || altEn) images.push({ file: '', altAr, altEn })
    }
  }
  return { body: body.slice(0, idx).trimEnd(), images }
}

// Remove the duplicated H1 (rendered from the title field) from the body.
function stripLeadingH1(body: string): string {
  return body.replace(/^\s*# .+\n+/, '')
}

function plainText(content: any): string {
  const out: string[] = []
  const walk = (n: any) => {
    if (!n || typeof n !== 'object') return
    if (typeof n.text === 'string') out.push(n.text)
    const ch = Array.isArray(n.children) ? n.children : n.root?.children
    if (Array.isArray(ch)) ch.forEach(walk)
  }
  walk(content)
  return out.join(' ').replace(/\s+/g, ' ').trim()
}

// Insert upload nodes after the 2nd, 4th, 6th h2 (deterministic placement).
function injectUploads(content: any, uploads: any[]): void {
  const children: any[] = content?.root?.children
  if (!Array.isArray(children) || !uploads.length) return
  const h2Positions: number[] = []
  children.forEach((n, i) => { if (n?.type === 'heading' && n?.tag === 'h2') h2Positions.push(i) })
  const slots = [2, 4, 6].map((nth) => h2Positions[nth - 1]).filter((p) => p !== undefined)
  // Insert from the last slot backwards so earlier indices stay valid.
  const pairs = uploads.slice(0, slots.length).map((u, i) => ({ u, at: slots[i] + 1 })).reverse()
  for (const { u, at } of pairs) children.splice(at, 0, u)
}

function uploadNode(media: { id: number; url: string; width: number; height: number; filename: string; mime: string }, alt: string) {
  return {
    type: 'upload', relationTo: 'media', format: '', version: 3, fields: null,
    value: { id: media.id, url: media.url, alt, width: media.width, height: media.height, filename: media.filename, mimeType: media.mime },
  }
}

async function ensureMedia(folder: string, slug: string, entry: ImgEntry, dry: boolean): Promise<{ id: number; url: string; width: number; height: number; filename: string; mime: string }> {
  const localPath = path.join(DIR, folder, 'images', entry.file)
  const filename = `${slug}--${entry.file}`
  const url = `/api/media/file/${filename}`
  const buf = readFileSync(localPath)
  const meta = await sharp(buf).metadata()
  const width = meta.width || 0
  const height = meta.height || 0
  const mime = entry.file.endsWith('.png') ? 'image/png' : entry.file.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
  if (dry) return { id: -1, url, width, height, filename, mime }

  const existing = await q('SELECT id FROM public.media WHERE filename = $1', [filename])
  let id: number
  if (existing.length) {
    id = existing[0].id
  } else {
    const row = { alt: entry.altEn || entry.altAr || slug, filename, mime_type: mime, filesize: statSync(localPath).size, width, height, url }
    id = (await insertRow('media', row)).id
  }
  try {
    await R2.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: filename }))
  } catch {
    await R2.send(new PutObjectCommand({ Bucket: R2_BUCKET, Key: filename, Body: buf, ContentType: mime }))
  }
  return { id, url, width, height, filename, mime }
}

async function ensureTaxonomy(dry: boolean): Promise<{ cat: Record<string, number>; tag: Record<string, number> }> {
  const cat = { ...KNOWN_CATEGORIES }
  for (const [slug, name] of Object.entries(NEW_CATEGORIES)) {
    if (dry) { cat[slug] = -1; continue }
    const found = await q('SELECT id FROM public.blog_categories WHERE slug = $1', [slug])
    cat[slug] = found.length ? found[0].id : (await insertRow('blog_categories', { name, slug })).id
  }
  const tag = { ...KNOWN_TAGS }
  for (const [slug, name] of Object.entries(NEW_TAGS)) {
    if (dry) { tag[slug] = -1; continue }
    const found = await q('SELECT id FROM public.blog_tags WHERE slug = $1', [slug])
    tag[slug] = found.length ? found[0].id : (await insertRow('blog_tags', { name, slug })).id
  }
  return { cat, tag }
}

async function main() {
  const args = process.argv.slice(2)
  let only: string | undefined
  let dry = false
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--only') only = args[++i]
    else if (args[i] === '--dry') dry = true
  }

  const editorConfig = await editorConfigFactory.fromFeatures({
    config: { collections: [], globals: [] } as any,
    features: ({ defaultFeatures }: any) => [
      ...defaultFeatures, FixedToolbarFeature(), InlineToolbarFeature(),
      UploadFeature({ enabledCollections: ['media'], maxDepth: 1 }),
      BlocksFeature({ blocks: [CodeBlock()] }), EXPERIMENTAL_TableFeature(),
    ],
  })

  const folders = readdirSync(DIR).filter((f) => META[f]).sort()
  if (folders.length !== Object.keys(META).length) {
    const missing = Object.keys(META).filter((k) => !folders.includes(k))
    if (missing.length) throw new Error(`folders missing on disk: ${missing.join(', ')}`)
  }

  // First pass: parse everything (needed for cross-links).
  const parsed: Record<string, any> = {}
  for (const folder of folders) {
    const rec: any = { folder }
    for (const locale of ['ar', 'en'] as const) {
      const raw = readFileSync(path.join(DIR, folder, `${locale}.md`), 'utf8')
      const { fm, body } = parseFrontmatter(raw)
      const { body: cleanBody, images } = splitImageAppendix(body)
      rec[locale] = { fm, body: stripLeadingH1(cleanBody), images }
    }
    rec.slug = rec.en.fm.slug || folder.replace(/^p\d-\d\d-/, '')
    parsed[folder] = rec
  }

  const { cat, tag } = await ensureTaxonomy(dry)

  // published_at schedule: rank 1 newest. ~19h apart with deterministic jitter.
  const now = Date.now()
  const publishedAt = (rank: number, locale: string) => {
    const jitter = ((rank * 7919) % 360) * 60_000 // 0-6h deterministic
    const base = now - 6 * 3600_000 - (rank - 1) * 19 * 3600_000 - jitter
    return new Date(base + (locale === 'ar' ? 4 * 60_000 : 0)).toISOString()
  }

  const report = { inserted: [] as any[], skipped: [] as any[], failed: [] as any[] }

  for (const folder of folders) {
    if (only && folder !== only) continue
    const rec = parsed[folder]
    const meta = META[folder]
    const slug = rec.slug

    // Media: images shared by both locales — ensure once per folder. The
    // canonical file list is the directory itself; appendix entries supply the
    // per-locale alts, matched by filename or by position.
    const diskFiles = readdirSync(path.join(DIR, folder, 'images'))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
    const altFor = (list: ImgEntry[], file: string, i: number, lang: 'altAr' | 'altEn'): string =>
      list.find((e) => e.file === file)?.[lang] || list[i]?.[lang] || ''
    const imageEntries: ImgEntry[] = diskFiles.map((file, i) => ({
      file,
      altAr: altFor(rec.ar.images, file, i, 'altAr') || altFor(rec.en.images, file, i, 'altAr') || rec.ar.fm.coverImageAlt || rec.ar.fm.title,
      altEn: altFor(rec.en.images, file, i, 'altEn') || altFor(rec.ar.images, file, i, 'altEn') || rec.en.fm.coverImageAlt || rec.en.fm.title,
    }))
    const mediaByFile: Record<string, any> = {}
    for (const entry of imageEntries) {
      try {
        mediaByFile[entry.file] = { media: await ensureMedia(folder, slug, entry, dry), entry }
      } catch (err: any) {
        report.failed.push({ folder, step: `media:${entry.file}`, error: err.message })
      }
    }
    const coverFile = imageEntries.find((e) => e.file.startsWith('01-'))
    const cover = coverFile ? mediaByFile[coverFile.file] : null
    const inlineFiles = imageEntries.filter((e) => !e.file.startsWith('01-'))

    for (const locale of ['en', 'ar'] as const) {
      try {
        if (!dry) {
          const existing = await q('SELECT id FROM public.blog_posts WHERE slug = $1 AND locale = $2', [slug, locale])
          if (existing.length) { report.skipped.push({ slug, locale, id: existing[0].id }); continue }
        }

        const lr = rec[locale]
        const fm = lr.fm

        // "Read also" cross-links (localized titles + locale-prefixed URLs).
        const relatedLinks = meta.related
          .filter((r) => parsed[r])
          .map((r) => `- [${parsed[r][locale].fm.title}](/${locale}/articles/${parsed[r].slug})`)
          .join('\n')
        const readAlso = relatedLinks
          ? `\n\n## ${locale === 'ar' ? 'اقرأ أيضاً' : 'Read also'}\n\n${relatedLinks}\n`
          : ''

        const content = convertMarkdownToLexical({ editorConfig, markdown: lr.body + readAlso })
        const uploads = inlineFiles
          .filter((e) => mediaByFile[e.file])
          .map((e) => uploadNode(mediaByFile[e.file].media, locale === 'ar' ? e.altAr || e.altEn : e.altEn || e.altAr))
        injectUploads(content, uploads)

        const words = plainText(content).split(/\s+/).filter(Boolean).length
        const keywords: string[] = Array.isArray(fm.keywords) ? fm.keywords : []
        const firstPara = plainText({ root: { children: (content?.root?.children || []).filter((n: any) => n.type === 'paragraph').slice(0, 1) } })

        const row: Record<string, any> = {
          locale, slug,
          status: 'published', _status: 'published',
          published_at: publishedAt(meta.rank, locale),
          title: fm.title,
          excerpt: firstPara.slice(0, 280) || fm.metaDescription,
          short_excerpt: (fm.metaDescription || '').slice(0, 160),
          content,
          reading_time: Math.max(1, Math.ceil(words / 220)),
          word_count: words,
          category_id: cat[meta.category] ?? null,
          author_id: AUTHOR_ID,
          cover_image_id: cover?.media.id ?? null,
          featured_image_alt: locale === 'ar' ? (cover?.entry.altAr || fm.coverImageAlt) : (cover?.entry.altEn || fm.coverImageAlt),
          seo_og_image_id: cover?.media.id ?? null,
          social_image_id: cover?.media.id ?? null,
          seo_meta_title: fm.metaTitle || fm.title,
          seo_meta_description: fm.metaDescription || null,
          seo_keywords: keywords.join(', ') || null,
          seo_focus_keyword: keywords[0] || null,
          seo_secondary_keywords: keywords.slice(1).join(', ') || null,
          seo_og_title: fm.metaTitle || fm.title,
          seo_og_description: fm.metaDescription || null,
          seo_no_index: false, seo_no_follow: false,
          seo_article_schema: true, seo_breadcrumb_schema: true,
          content_type: meta.contentType,
          target_audience: meta.audience,
          service_focus: meta.serviceFocus,
          difficulty: 'beginner',
          featured: Boolean(meta.featured),
          pinned: Boolean(meta.pinned),
          editor_pick: Boolean(meta.editorPick),
          show_c_t_a: true,
          table_of_contents: true,
        }

        if (dry) { report.inserted.push({ slug, locale, rank: meta.rank, words, images: uploads.length + (cover ? 1 : 0) }); continue }
        const id = (await insertRow('blog_posts', row, ['content'])).id
        if (!id) throw new Error('no id returned')

        const tagIds = meta.tags.map((t) => tag[t]).filter((x) => x != null && x > 0)
        for (let i = 0; i < tagIds.length; i++) {
          await q('INSERT INTO public.blog_posts_rels ("order", parent_id, path, blog_tags_id) VALUES ($1, $2, $3, $4)', [i + 1, id, 'tags', tagIds[i]])
        }
        report.inserted.push({ slug, locale, id, rank: meta.rank })
        console.log(`✓ ${slug} [${locale}] rank ${meta.rank} → id ${id}`)
      } catch (err: any) {
        report.failed.push({ folder, locale, error: err.message })
        console.error(`✗ ${folder} [${locale}]: ${err.message}`)
      }
    }
  }

  await pool?.end()
  console.log(`\ninserted ${report.inserted.length} · skipped ${report.skipped.length} · failed ${report.failed.length}`)
  if (dry) {
    for (const r of report.inserted) console.log(`  ${String(r.rank).padStart(2)} ${r.slug} [${r.locale}] words=${r.words} images=${r.images}`)
    const thin = report.inserted.filter((r: any) => r.images < 4 || r.words < 1200)
    if (thin.length) console.log('⚠ check these:', JSON.stringify(thin))
  }
  if (report.failed.length) { console.log('FAILURES:', JSON.stringify(report.failed, null, 2)); process.exit(1) }
}

main().catch((e) => { console.error(e); process.exit(1) })
