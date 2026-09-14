/**
 * Import an article batch through Payload's Local API instead of raw SQL, so
 * every collection hook, version row, image size, duplicate-image check and
 * search-index sync runs exactly as it would for an editor in the admin.
 *
 * Batch format (one folder per article, e.g. content-batch4/b4-01-slug): article.md with shared frontmatter, the
 * Arabic body, a standalone `---`, the English body, and an optional trailing
 * "قائمة التحقق التحريرية" checklist; assets/ holds the cover (frontmatter
 * coverImage) and inline images referenced as ![alt](./assets/<file>) inside
 * either body.
 *
 *   DATABASE_URL=<target> S3_BUCKET=… S3_REGION=auto S3_ENDPOINT=… \
 *   S3_ACCESS_KEY_ID=… S3_SECRET_ACCESS_KEY=… \
 *   npx payload --use-swc run scripts/import-batch-payload.ts -- --dir content-batch4 \
 *     [--only <folder>] [--dry] [--schedule-start 2026-09-16T05:00:00Z --every-days 2]
 *
 * Without --schedule-start every article publishes immediately. With it, the
 * pairs are scheduled in folder order, one pair every --every-days days, and
 * /api/cron/publish-scheduled makes each one live on its date.
 *
 * Idempotent: existing (slug, locale) posts are skipped and images already in
 * the library (same bytes) are reused.
 */
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, mkdtempSync, readFileSync, readdirSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { blogRichTextFeatures } from '../lib/cms/blog-rich-text.ts'

const arg = (name: string) => {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? undefined : process.argv[i + 1]
}
const DRY = process.argv.includes('--dry')
const DIR = path.resolve(process.cwd(), arg('dir') || 'content-batch4')
const ONLY = arg('only')
const SCHEDULE_START = arg('schedule-start')
const EVERY_DAYS = Number(arg('every-days') || 2)
const AUTHOR_ID = 1 // Mohamad Shahm | محمد شـهم
const SKIP_HOOK_SIDE_EFFECTS = { skipBlogPairSync: true, skipCoverMirror: true, skipAutoTranslate: true }

const SERVICE_FOCUS: Record<string, string> = {
  'ai-solutions': 'ai',
  automation: 'automation',
  'crm-erp': 'business_systems',
  'business-systems': 'business_systems',
  'cloud-technology': 'cloud',
  'digital-presence': 'digital_presence',
}

type Frontmatter = Record<string, any>

function parseFrontmatter(raw: string): { fm: Frontmatter; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) throw new Error('missing frontmatter')
  const fm: Frontmatter = {}
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    const v = kv[2].trim()
    if (v.startsWith('[')) {
      try {
        fm[kv[1]] = JSON.parse(v)
      } catch {
        fm[kv[1]] = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
      }
    } else {
      fm[kv[1]] = v.replace(/^"|"$/g, '')
    }
  }
  return { fm, body: raw.slice(m[0].length) }
}

function splitLocales(body: string): { ar: string; en: string } {
  const parts = body.split(/\n---\n/)
  if (parts.length !== 2) throw new Error(`expected exactly one locale separator, found ${parts.length - 1}`)
  let [ar, en] = parts
  const checklist = en.indexOf('## قائمة التحقق التحريرية')
  if (checklist !== -1) en = en.slice(0, checklist)
  const clean = (s: string) => s.replace(/^\s*# .+\n+/, '').trim()
  return { ar: clean(ar), en: clean(en) }
}

const IMAGE_LINE = /^!\[([^\]]*)\]\(\.\/assets\/([^)\s]+)\)\s*$/gm
const UPLOAD_TOKEN = /^@@upload:(-?\d+)@@$/

function plainText(node: any): string {
  if (!node || typeof node !== 'object') return ''
  if (typeof node.text === 'string') return node.text
  const children = Array.isArray(node.children) ? node.children : node.root?.children
  return Array.isArray(children) ? children.map(plainText).join(' ') : ''
}

function replaceUploadTokens(content: any) {
  const children: any[] = content?.root?.children || []
  for (let i = 0; i < children.length; i++) {
    const node = children[i]
    if (node?.type !== 'paragraph') continue
    const match = plainText(node).trim().match(UPLOAD_TOKEN)
    if (!match) continue
    children[i] = { type: 'upload', relationTo: 'media', value: Number(match[1]), fields: null, format: '', version: 3 }
  }
}

async function main() {
  const payload = await getPayload({ config })
  const editorConfig = await editorConfigFactory.fromFeatures({ config: payload.config, features: blogRichTextFeatures as any })
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'ct-import-'))

  const folders = readdirSync(DIR)
    .filter((f) => /^[a-z0-9]+-\d\d-/.test(f) || /^\d\d-/.test(f))
    .filter((f) => existsSync(path.join(DIR, f, 'article.md')))
    .sort()
  if (!folders.length) throw new Error(`no article folders in ${DIR}`)

  const parsed = folders.map((folder) => {
    const { fm, body } = parseFrontmatter(readFileSync(path.join(DIR, folder, 'article.md'), 'utf8'))
    for (const key of ['title', 'titleEn', 'slug', 'category', 'coverImage']) {
      if (!fm[key]) throw new Error(`${folder}: frontmatter "${key}" is missing`)
    }
    return { folder, fm, bodies: splitLocales(body) }
  })

  const categoryIds = new Map<string, number>()
  const categoryId = async (slug: string) => {
    if (!categoryIds.has(slug)) {
      const found = await payload.find({ collection: 'blog-categories' as any, where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true })
      if (!found.docs[0]) throw new Error(`category "${slug}" does not exist`)
      categoryIds.set(slug, Number(found.docs[0].id))
    }
    return categoryIds.get(slug)!
  }

  const tagIds = async (slugs: unknown): Promise<number[]> => {
    if (!Array.isArray(slugs) || !slugs.length) return []
    const found = await payload.find({ collection: 'blog-tags' as any, where: { slug: { in: slugs } }, limit: 50, depth: 0, overrideAccess: true })
    return found.docs.map((d: any) => Number(d.id))
  }

  const mediaIdFor = async (slug: string, folder: string, file: string, alt: string): Promise<number> => {
    const source = path.join(DIR, folder, 'assets', file)
    if (!existsSync(source)) throw new Error(`${folder}: image not found: assets/${file}`)
    if (DRY) return -1
    const contentHash = createHash('md5').update(readFileSync(source)).digest('hex')
    const existing = await payload.find({ collection: 'media', where: { contentHash: { equals: contentHash } }, limit: 1, depth: 0, overrideAccess: true })
    if (existing.docs[0]) return Number(existing.docs[0].id)
    const staged = path.join(tmp, `${slug}--${file.replace(/\.jpeg$/i, '.jpg')}`)
    copyFileSync(source, staged)
    const created = await payload.create({ collection: 'media', data: { alt: alt || slug } as any, filePath: staged, overrideAccess: true })
    return Number(created.id)
  }

  const report = { created: [] as string[], skipped: [] as string[], failed: [] as string[] }
  const now = Date.now()

  for (const [index, rec] of parsed.entries()) {
    if (ONLY && rec.folder !== ONLY) continue
    const { fm, bodies, folder } = rec
    const slug: string = fm.slug

    try {
      const coverFile = path.basename(fm.coverImage)
      const coverId = await mediaIdFor(slug, folder, coverFile, fm.coverImageAltEn || fm.coverImageAltAr)

      // Read-also: batch siblings in the same category first, then neighbours.
      const related = [
        ...parsed.filter((p) => p !== rec && p.fm.category === fm.category),
        ...parsed.filter((p) => p !== rec && p.fm.category !== fm.category),
      ].slice(0, 3)

      for (const locale of ['en', 'ar'] as const) {
        const existing = await payload.find({
          collection: 'blog-posts' as any,
          where: { and: [{ slug: { equals: slug } }, { locale: { equals: locale } }] },
          limit: 1,
          depth: 0,
          overrideAccess: true,
          trash: true,
        } as any)
        if (existing.docs[0]) {
          report.skipped.push(`${slug} [${locale}] exists (id ${existing.docs[0].id})`)
          continue
        }

        let markdown = bodies[locale]
        const images = [...markdown.matchAll(IMAGE_LINE)]
        for (const [line, alt, file] of images) {
          if (file === coverFile) {
            markdown = markdown.replace(line, '')
            continue
          }
          const id = await mediaIdFor(slug, folder, file, alt)
          markdown = markdown.replace(line, `@@upload:${id}@@`)
        }

        const readAlso = related
          .map((p) => `- [${locale === 'ar' ? p.fm.title : p.fm.titleEn}](${locale === 'ar' ? '/ar' : ''}/articles/${p.fm.slug})`)
          .join('\n')
        markdown += `\n\n## ${locale === 'ar' ? 'اقرأ أيضاً' : 'Read also'}\n\n${readAlso}\n`

        const content = convertMarkdownToLexical({ editorConfig, markdown })
        replaceUploadTokens(content)

        const title = locale === 'ar' ? fm.title : fm.titleEn
        const metaTitle = (locale === 'ar' ? fm.metaTitle : fm.metaTitleEn) || title
        const metaDescription = (locale === 'ar' ? fm.metaDescription : fm.metaDescriptionEn) || ''
        const keywords: string[] = (locale === 'ar' ? fm.keywords : fm.keywordsEn) || []
        const firstParagraph = (content.root.children as any[]).find((n) => n.type === 'paragraph' && plainText(n).trim())

        const scheduledAt = SCHEDULE_START
          ? new Date(new Date(SCHEDULE_START).getTime() + index * EVERY_DAYS * 86_400_000 + (locale === 'ar' ? 240_000 : 0)).toISOString()
          : undefined
        const publishedAt = scheduledAt || new Date(now - index * 6 * 3_600_000 + (locale === 'ar' ? 240_000 : 0)).toISOString()

        const data = {
          title,
          slug,
          locale,
          status: scheduledAt ? 'scheduled' : 'published',
          _status: 'published',
          publishedAt,
          scheduledAt,
          excerpt: (plainText(firstParagraph) || metaDescription).slice(0, 280),
          shortExcerpt: metaDescription.slice(0, 160),
          content,
          category: DRY ? undefined : await categoryId(fm.category),
          tags: DRY ? [] : await tagIds(fm.tags),
          author: AUTHOR_ID,
          coverImage: coverId,
          featuredImageAlt: locale === 'ar' ? fm.coverImageAltAr : fm.coverImageAltEn,
          contentType: fm.articleType === 'listicle' ? 'comparison' : 'guide',
          targetAudience: 'small_businesses',
          serviceFocus: SERVICE_FOCUS[fm.category] || 'websites',
          difficulty: 'beginner',
          showCTA: true,
          seo: { metaTitle, metaDescription, focusKeyword: keywords[0], ogImage: coverId },
        }

        if (DRY) {
          const uploads = (content.root.children as any[]).filter((n) => n.type === 'upload').length
          report.created.push(`DRY ${slug} [${locale}] ${data.status} ${publishedAt} · inline images ${uploads}`)
          continue
        }

        const doc = await payload.create({
          collection: 'blog-posts' as any,
          data: data as any,
          draft: false,
          overrideAccess: true,
          context: SKIP_HOOK_SIDE_EFFECTS,
        })
        report.created.push(`${slug} [${locale}] → id ${doc.id} (${data.status})`)
        console.log(`✓ ${slug} [${locale}] → ${doc.id}`)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      report.failed.push(`${folder}: ${message}`)
      console.error(`✗ ${folder}: ${message}`)
    }
  }

  console.log(`\ncreated ${report.created.length} · skipped ${report.skipped.length} · failed ${report.failed.length}`)
  for (const line of [...report.created, ...report.skipped, ...report.failed]) console.log(`  ${line}`)
  process.exit(report.failed.length ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
