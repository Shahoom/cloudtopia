/**
 * Import the 20 bilingual articles in content-new-2026/ as PUBLISHED
 * blog_posts, covers on R2, full SEO settings — same pipeline as
 * import-deliverables.ts / import-batch2.ts adapted to this batch's format:
 * ONE article.md per folder (shared frontmatter, AR body, `---`, EN body,
 * trailing editorial-checklist section) and ONE hero image in assets/.
 *
 * Per folder: split locales, drop the checklist + the inline hero markdown
 * line (the cover already renders as the hero), convert markdown → Lexical,
 * append localized "Read also" links, upload the cover to R2 under
 * `<slug>--<file>`, insert both locale rows with staggered published_at.
 *
 *   node --import tsx --env-file=scratchpad/.sb-env --env-file=.env.local \
 *     scripts/import-new2026.ts [--only <folder>] [--dry]
 *
 * Idempotent: skips (slug, locale) rows and media filenames that exist.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
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

const DIR = path.join(process.cwd(), 'content-new-2026')
const AUTHOR_ID = 1 // Mohamad Shahm | محمد شـهم

// Frontmatter categories don't match the site's vocabulary — map to existing
// blog_categories slugs (no new categories needed for this batch).
type Meta = {
  rank: number
  category: string
  tags: string[]
  contentType: string
  serviceFocus: string
  editorPick?: boolean
  related: string[]
}
const META: Record<string, Meta> = {
  '01-erp-implementation-cost-oman': { rank: 1, category: 'pricing', tags: ['oman', 'erp', 'pricing'], contentType: 'guide', serviceFocus: 'business_systems', editorPick: true, related: ['11-hidden-erp-implementation-costs', '12-crm-implementation-plan-oman-smes', '20-website-erp-crm-accounting-integration-map'] },
  '13-whatsapp-business-api-cost': { rank: 2, category: 'pricing', tags: ['whatsapp', 'pricing'], contentType: 'guide', serviceFocus: 'ai', editorPick: true, related: ['07-whatsapp-chatbot-crm-integration', '04-rule-based-vs-ai-chatbot', '01-erp-implementation-cost-oman'] },
  '12-crm-implementation-plan-oman-smes': { rank: 3, category: 'crm-erp', tags: ['crm', 'oman', 'small-business'], contentType: 'guide', serviceFocus: 'business_systems', related: ['01-erp-implementation-cost-oman', '11-hidden-erp-implementation-costs', '07-whatsapp-chatbot-crm-integration'] },
  '09-oman-personal-data-protection-websites-apps': { rank: 4, category: 'regulations', tags: ['oman', 'regulations'], contentType: 'guide', serviceFocus: 'websites', editorPick: true, related: ['14-software-development-contract-mistakes', '16-arabic-website-accessibility-wcag', '17-technical-seo-bilingual-arabic-websites'] },
  '02-shopify-woocommerce-salla-zid': { rank: 5, category: 'e-commerce', tags: ['e-commerce', 'shopify', 'saudi-arabia'], contentType: 'comparison', serviceFocus: 'websites', editorPick: true, related: ['10-migrate-store-to-custom-without-losing-seo', '18-gulf-ecommerce-hosting-peak-seasons', '05-custom-development-vs-no-code'] },
  '11-hidden-erp-implementation-costs': { rank: 6, category: 'crm-erp', tags: ['erp', 'pricing'], contentType: 'guide', serviceFocus: 'business_systems', related: ['01-erp-implementation-cost-oman', '12-crm-implementation-plan-oman-smes', '06-software-requirements-pricing-brief'] },
  '05-custom-development-vs-no-code': { rank: 7, category: 'web-development', tags: ['custom-software', 'small-business'], contentType: 'comparison', serviceFocus: 'websites', related: ['03-native-flutter-react-native', '06-software-requirements-pricing-brief', '19-when-business-needs-customer-portal'] },
  '04-rule-based-vs-ai-chatbot': { rank: 8, category: 'ai-solutions', tags: ['chatbots', 'ai-automation'], contentType: 'comparison', serviceFocus: 'ai', related: ['08-test-arabic-chatbot-gulf-dialects', '07-whatsapp-chatbot-crm-integration', '13-whatsapp-business-api-cost'] },
  '07-whatsapp-chatbot-crm-integration': { rank: 9, category: 'automation', tags: ['whatsapp', 'crm', 'chatbots'], contentType: 'tutorial', serviceFocus: 'ai', related: ['13-whatsapp-business-api-cost', '04-rule-based-vs-ai-chatbot', '12-crm-implementation-plan-oman-smes'] },
  '03-native-flutter-react-native': { rank: 10, category: 'web-development', tags: ['custom-software'], contentType: 'comparison', serviceFocus: 'web_apps', related: ['05-custom-development-vs-no-code', '15-how-to-write-product-requirements-document', '06-software-requirements-pricing-brief'] },
  '10-migrate-store-to-custom-without-losing-seo': { rank: 11, category: 'e-commerce', tags: ['e-commerce', 'website-strategy'], contentType: 'guide', serviceFocus: 'websites', related: ['02-shopify-woocommerce-salla-zid', '17-technical-seo-bilingual-arabic-websites', '18-gulf-ecommerce-hosting-peak-seasons'] },
  '06-software-requirements-pricing-brief': { rank: 12, category: 'guides', tags: ['website-strategy', 'pricing'], contentType: 'guide', serviceFocus: 'websites', related: ['15-how-to-write-product-requirements-document', '14-software-development-contract-mistakes', '01-erp-implementation-cost-oman'] },
  '14-software-development-contract-mistakes': { rank: 13, category: 'guides', tags: ['custom-software', 'website-strategy'], contentType: 'guide', serviceFocus: 'websites', related: ['06-software-requirements-pricing-brief', '15-how-to-write-product-requirements-document', '09-oman-personal-data-protection-websites-apps'] },
  '17-technical-seo-bilingual-arabic-websites': { rank: 14, category: 'digital-presence', tags: ['website-strategy'], contentType: 'guide', serviceFocus: 'websites', related: ['16-arabic-website-accessibility-wcag', '10-migrate-store-to-custom-without-losing-seo', '09-oman-personal-data-protection-websites-apps'] },
  '18-gulf-ecommerce-hosting-peak-seasons': { rank: 15, category: 'cloud-technology', tags: ['hosting', 'e-commerce'], contentType: 'guide', serviceFocus: 'websites', related: ['10-migrate-store-to-custom-without-losing-seo', '02-shopify-woocommerce-salla-zid', '20-website-erp-crm-accounting-integration-map'] },
  '19-when-business-needs-customer-portal': { rank: 16, category: 'business-systems', tags: ['custom-software', 'small-business'], contentType: 'article', serviceFocus: 'web_apps', related: ['20-website-erp-crm-accounting-integration-map', '12-crm-implementation-plan-oman-smes', '05-custom-development-vs-no-code'] },
  '20-website-erp-crm-accounting-integration-map': { rank: 17, category: 'automation', tags: ['erp', 'crm', 'e-commerce'], contentType: 'guide', serviceFocus: 'business_systems', related: ['01-erp-implementation-cost-oman', '19-when-business-needs-customer-portal', '12-crm-implementation-plan-oman-smes'] },
  '15-how-to-write-product-requirements-document': { rank: 18, category: 'guides', tags: ['website-strategy', 'custom-software'], contentType: 'tutorial', serviceFocus: 'web_apps', related: ['06-software-requirements-pricing-brief', '14-software-development-contract-mistakes', '03-native-flutter-react-native'] },
  '16-arabic-website-accessibility-wcag': { rank: 19, category: 'web-development', tags: ['website-strategy'], contentType: 'checklist', serviceFocus: 'websites', related: ['17-technical-seo-bilingual-arabic-websites', '09-oman-personal-data-protection-websites-apps', '05-custom-development-vs-no-code'] },
  '08-test-arabic-chatbot-gulf-dialects': { rank: 20, category: 'ai-solutions', tags: ['chatbots', 'ai-automation'], contentType: 'checklist', serviceFocus: 'ai', related: ['04-rule-based-vs-ai-chatbot', '07-whatsapp-chatbot-crm-integration', '16-arabic-website-accessibility-wcag'] },
}

async function insertRow(table: string, row: Record<string, any>, jsonbCols: string[] = []): Promise<any> {
  const cols = Object.keys(row)
  const params = cols.map((c) => (jsonbCols.includes(c) ? JSON.stringify(row[c]) : row[c]))
  const placeholders = cols.map((c, i) => (jsonbCols.includes(c) ? `$${i + 1}::jsonb` : `$${i + 1}`))
  const sql = `INSERT INTO public.${table} (${cols.map((c) => `"${c}"`).join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING id`
  return (await q(sql, params))[0]
}

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

// AR body, `---`, EN body, trailing checklist section (dropped).
function splitLocales(body: string): { ar: string; en: string } {
  const parts = body.split(/\n---\n/)
  if (parts.length !== 2) throw new Error(`expected 1 locale separator, found ${parts.length - 1}`)
  let [ar, en] = parts
  const checklistIdx = en.indexOf('## قائمة التحقق التحريرية')
  if (checklistIdx !== -1) en = en.slice(0, checklistIdx)
  const clean = (s: string) => s
    .replace(/^\s*# .+\n+/, '') // H1 duplicates the title field
    .replace(/^!\[[^\]]*\]\(\.\/assets\/[^)]*\)\s*$/gm, '') // inline hero = cover dupe
    .trim()
  return { ar: clean(ar), en: clean(en) }
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

async function ensureCover(folder: string, slug: string, altEn: string, dry: boolean) {
  const assetsDir = path.join(DIR, folder, 'assets')
  const file = readdirSync(assetsDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))[0]
  if (!file) throw new Error('no cover asset')
  const localPath = path.join(assetsDir, file)
  const filename = `${slug}--${file.replace(/\.jpeg$/i, '.jpg')}`
  const url = `/api/media/file/${filename}`
  const buf = readFileSync(localPath)
  const meta = await sharp(buf).metadata()
  const mime = /\.png$/i.test(file) ? 'image/png' : /\.webp$/i.test(file) ? 'image/webp' : 'image/jpeg'
  if (dry) return { id: -1, url, width: meta.width || 0, height: meta.height || 0, filename, mime }

  const existing = await q('SELECT id FROM public.media WHERE filename = $1', [filename])
  let id: number
  if (existing.length) {
    id = existing[0].id
  } else {
    id = (await insertRow('media', { alt: altEn || slug, filename, mime_type: mime, filesize: statSync(localPath).size, width: meta.width || 0, height: meta.height || 0, url })).id
  }
  try {
    await R2.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: filename }))
  } catch {
    await R2.send(new PutObjectCommand({ Bucket: R2_BUCKET, Key: filename, Body: buf, ContentType: mime }))
  }
  return { id, url, width: meta.width || 0, height: meta.height || 0, filename, mime }
}

// All categories/tags for this batch already exist — resolve ids by slug.
async function taxonomyIds(dry: boolean): Promise<{ cat: Record<string, number>; tag: Record<string, number> }> {
  const catSlugs = [...new Set(Object.values(META).map((m) => m.category))]
  const tagSlugs = [...new Set(Object.values(META).flatMap((m) => m.tags))]
  const cat: Record<string, number> = {}
  const tag: Record<string, number> = {}
  if (dry) return { cat, tag }
  for (const s of catSlugs) {
    const r = await q('SELECT id FROM public.blog_categories WHERE slug = $1', [s])
    if (!r.length) throw new Error(`missing category: ${s}`)
    cat[s] = r[0].id
  }
  for (const s of tagSlugs) {
    const r = await q('SELECT id FROM public.blog_tags WHERE slug = $1', [s])
    if (!r.length) throw new Error(`missing tag: ${s}`)
    tag[s] = r[0].id
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
  const missing = Object.keys(META).filter((k) => !folders.includes(k))
  if (missing.length) throw new Error(`folders missing on disk: ${missing.join(', ')}`)

  const parsed: Record<string, any> = {}
  for (const folder of folders) {
    const raw = readFileSync(path.join(DIR, folder, 'article.md'), 'utf8')
    const { fm, body } = parseFrontmatter(raw)
    const { ar, en } = splitLocales(body)
    parsed[folder] = { folder, fm, slug: fm.slug, bodies: { ar, en } }
  }

  const { cat, tag } = await taxonomyIds(dry)

  const now = Date.now()
  const publishedAt = (rank: number, locale: string) => {
    const jitter = ((rank * 7919) % 360) * 60_000
    const base = now - 4 * 3600_000 - (rank - 1) * 10 * 3600_000 - jitter
    return new Date(base + (locale === 'ar' ? 4 * 60_000 : 0)).toISOString()
  }

  const report = { inserted: [] as any[], skipped: [] as any[], failed: [] as any[] }

  for (const folder of folders) {
    if (only && folder !== only) continue
    const rec = parsed[folder]
    const meta = META[folder]
    const { fm, slug } = rec

    let cover: any = null
    try {
      cover = await ensureCover(folder, slug, fm.coverImageAltEn, dry)
    } catch (err: any) {
      report.failed.push({ folder, step: 'cover', error: err.message })
      continue
    }

    for (const locale of ['en', 'ar'] as const) {
      try {
        if (!dry) {
          const existing = await q('SELECT id FROM public.blog_posts WHERE slug = $1 AND locale = $2', [slug, locale])
          if (existing.length) { report.skipped.push({ slug, locale, id: existing[0].id }); continue }
        }

        const title = locale === 'ar' ? fm.title : fm.titleEn
        const metaTitle = locale === 'ar' ? fm.metaTitle : fm.metaTitleEn
        const metaDescription = locale === 'ar' ? fm.metaDescription : fm.metaDescriptionEn
        const coverAlt = locale === 'ar' ? fm.coverImageAltAr : fm.coverImageAltEn

        const relatedLinks = meta.related
          .filter((r) => parsed[r])
          .map((r) => `- [${locale === 'ar' ? parsed[r].fm.title : parsed[r].fm.titleEn}](/${locale}/articles/${parsed[r].slug})`)
          .join('\n')
        const readAlso = relatedLinks
          ? `\n\n## ${locale === 'ar' ? 'اقرأ أيضاً' : 'Read also'}\n\n${relatedLinks}\n`
          : ''

        const content = convertMarkdownToLexical({ editorConfig, markdown: rec.bodies[locale] + readAlso })

        const words = plainText(content).split(/\s+/).filter(Boolean).length
        const keywords: string[] = Array.isArray(fm.keywords) ? fm.keywords : []
        const firstPara = plainText({ root: { children: (content?.root?.children || []).filter((n: any) => n.type === 'paragraph').slice(0, 1) } })

        const row: Record<string, any> = {
          locale, slug,
          status: 'published', _status: 'published',
          published_at: publishedAt(meta.rank, locale),
          title,
          excerpt: firstPara.slice(0, 280) || metaDescription,
          short_excerpt: (metaDescription || '').slice(0, 160),
          content,
          reading_time: Math.max(1, Math.ceil(words / 220)),
          word_count: words,
          category_id: cat[meta.category] ?? null,
          author_id: AUTHOR_ID,
          cover_image_id: cover?.id ?? null,
          featured_image_alt: coverAlt || title,
          seo_og_image_id: cover?.id ?? null,
          social_image_id: cover?.id ?? null,
          seo_meta_title: metaTitle || title,
          seo_meta_description: metaDescription || null,
          seo_keywords: keywords.join(', ') || null,
          seo_focus_keyword: keywords[0] || null,
          seo_secondary_keywords: keywords.slice(1).join(', ') || null,
          seo_og_title: metaTitle || title,
          seo_og_description: metaDescription || null,
          seo_no_index: false, seo_no_follow: false,
          seo_article_schema: true, seo_breadcrumb_schema: true,
          content_type: meta.contentType,
          target_audience: 'small_businesses',
          service_focus: meta.serviceFocus,
          difficulty: 'beginner',
          featured: false,
          pinned: false,
          editor_pick: Boolean(meta.editorPick),
          show_c_t_a: true,
          table_of_contents: true,
        }

        if (dry) { report.inserted.push({ slug, locale, rank: meta.rank, words }); continue }
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
    for (const r of report.inserted.sort((a: any, b: any) => a.rank - b.rank)) console.log(`  ${String(r.rank).padStart(2)} ${r.slug} [${r.locale}] words=${r.words}`)
    const thin = report.inserted.filter((r: any) => r.words < 1200)
    if (thin.length) console.log('⚠ thin:', JSON.stringify(thin))
  }
  if (report.failed.length) { console.log('FAILURES:', JSON.stringify(report.failed, null, 2)); process.exit(1) }
}

main().catch((e) => { console.error(e); process.exit(1) })
