/**
 * Replace duplicated article images with fresh, unique Pexels photos.
 *
 * For each replacement: scrape a Pexels search, download a photo not yet used
 * in this run, save it into the article folder (new NN-*.jpg name), upload to
 * R2 under a NEW key (the Vercel image optimizer caches transforms by URL for
 * 31d, so overwriting the old key would keep serving the duplicate), insert a
 * media row, then swap the inline upload nodes (and cover/og/social ids when
 * the cover was the duplicate) in both locales' posts.
 *
 *   node --import tsx --env-file=scratchpad/.sb-env --env-file=.env.local \
 *     scripts/fix-dup-images.ts [--dry]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import pkg from 'pg'

const { Pool } = pkg
const DRY = process.argv.includes('--dry')
const pool = DRY ? null : new Pool({ connectionString: process.env.PG_IMPORT_URL, ssl: { rejectUnauthorized: false }, max: 2 })
const q = async (text: string, params: any[] = []) => (await pool!.query(text, params)).rows

const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  forcePathStyle: true,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID || '', secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '' },
})

// folder → { old file to replace, pexels query, new filename }
const JOBS: { dir: string; folder: string; old: string; query: string; next: string }[] = [
  // batch 2
  { dir: 'content-batch2', folder: 'b2-24-best-whatsapp-chatbot-gulf', old: '01-gulf-whatsapp-business-cover.jpg', query: 'whatsapp phone hand message', next: '01-whatsapp-business-phone.jpg' },
  { dir: 'content-batch2', folder: 'b2-14-best-ecommerce-company-oman', old: '04-ecommerce-orders-packages.jpg', query: 'delivery boxes courier packages', next: '04-delivery-courier-boxes.jpg' },
  { dir: 'content-batch2', folder: 'b2-16-best-erp-oman', old: '04-inventory-orders-workspace.jpg', query: 'warehouse worker tablet inventory', next: '04-warehouse-inventory-tablet.jpg' },
  { dir: 'content-batch2', folder: 'b2-15-best-app-development-gulf', old: '01-cover-gulf-mobile-app.jpg', query: 'mobile app developer smartphone coding', next: '01-cover-mobile-app-coding.jpg' },
  { dir: 'content-batch2', folder: 'b2-18-best-pos-gulf', old: '02-dubai-gulf-business.jpg', query: 'cashier point of sale card terminal', next: '02-pos-card-terminal.jpg' },
  { dir: 'content-batch2', folder: 'b2-17-best-crm-oman', old: '03-arab-sales-team.jpg', query: 'business team meeting laptop office', next: '03-sales-team-meeting.jpg' },
  { dir: 'content-batch2', folder: 'b2-25-best-ai-companies-oman', old: '04-arab-ai-team.jpg', query: 'artificial intelligence robot hand', next: '04-ai-technology-hand.jpg' },
  { dir: 'content-batch2', folder: 'b2-26-best-arabic-auto-reply', old: 'human-agent-handoff.jpg', query: 'call center agent headset', next: '04-call-center-agent.jpg' },
  { dir: 'content-batch2', folder: 'b2-14-best-ecommerce-company-oman', old: '03-mobile-payment-gateway.jpg', query: 'contactless payment nfc phone', next: '03-contactless-payment.jpg' },
  { dir: 'content-batch2', folder: 'b2-24-best-whatsapp-chatbot-gulf', old: '04-arabic-customer-support-handoff.jpg', query: 'customer support chat phone typing', next: '04-support-chat-typing.jpg' },
  { dir: 'content-batch2', folder: 'b2-26-best-arabic-auto-reply', old: 'cover-arabic-customer-support.jpg', query: 'woman headset customer service smiling', next: '01-cover-customer-service.jpg' },
  // batch 1
  { dir: 'content-deliverables', folder: 'p2-07-om-domain-registration', old: '02-registration-documents.jpg', query: 'official documents signing stamp', next: '02-official-documents.jpg' },
  { dir: 'content-deliverables', folder: 'p1-08-choose-web-company-uae', old: '04-uae-agency-contract.jpg', query: 'contract signing pen business', next: '04-contract-signing.jpg' },
  { dir: 'content-deliverables', folder: 'p1-10-source-code-ownership-contract', old: '01-cover-code-contract.jpg', query: 'handshake agreement office deal', next: '01-cover-agreement-handshake.jpg' },
  { dir: 'content-deliverables', folder: 'p2-02-maroof-verification-guide', old: '02-mobile-store-check.jpg', query: 'online shopping phone store app', next: '02-online-store-phone.jpg' },
  { dir: 'content-deliverables', folder: 'p1-09-app-development-cost-saudi', old: '02-native-hybrid-code.jpg', query: 'programming code screen dark', next: '02-code-screen.jpg' },
  { dir: 'content-deliverables', folder: 'p1-10-source-code-ownership-contract', old: '02-code-repository.jpg', query: 'software developer laptop typing code', next: '02-developer-laptop.jpg' },
  { dir: 'content-deliverables', folder: 'p2-01-zatca-phase-2-developers', old: '02-xml-development.jpg', query: 'data code monitor programming', next: '02-data-code-monitor.jpg' },
  { dir: 'content-deliverables', folder: 'p1-05-instagram-vs-website', old: '03-google-search-website.jpg', query: 'google search laptop screen', next: '03-google-search-laptop.jpg' },
  { dir: 'content-deliverables', folder: 'p1-08-choose-web-company-uae', old: '02-uae-price-comparison.jpg', query: 'price comparison calculator documents', next: '02-price-comparison.jpg' },
  { dir: 'content-deliverables', folder: 'p1-09-app-development-cost-saudi', old: '03-app-budget-planning.jpg', query: 'budget planning charts desk', next: '03-budget-planning.jpg' },
  { dir: 'content-deliverables', folder: 'p1-02-app-development-cost-oman', old: '03-app-hosting-servers.jpg', query: 'server room data center', next: '03-server-room.jpg' },
  { dir: 'content-deliverables', folder: 'p1-07-choose-web-company-gulf', old: '03-data-hosting-servers.jpg', query: 'data center corridor blue', next: '03-data-center.jpg' },
  { dir: 'content-deliverables', folder: 'p2-12-zatca-phase-2-api-checklist', old: '04-secure-archive-servers.jpg', query: 'network cables server rack', next: '04-network-servers.jpg' },
  { dir: 'content-deliverables', folder: 'p2-05-payment-gateways-oman', old: '04-gateway-integration.jpg', query: 'secure payment laptop lock', next: '04-secure-payment.jpg' },
  { dir: 'content-deliverables', folder: 'p2-09-mada-apple-pay-tabby-tamara', old: '01-cover-mobile-payment.jpg', query: 'phone tap pay terminal', next: '01-cover-tap-to-pay.jpg' },
  { dir: 'content-deliverables', folder: 'p2-13-launch-online-store-saudi-hub', old: '03-mobile-payment.jpg', query: 'pos terminal contactless card', next: '03-pos-contactless.jpg' },
  { dir: 'content-deliverables', folder: 'p1-08-choose-web-company-uae', old: '03-arabic-rtl-review.jpg', query: 'web design meeting tablet review', next: '03-design-review-tablet.jpg' },
]

const usedPhotoIds = new Set<string>()

// Pexels blocks plain fetches — drive a real Chromium for the search pages.
import { chromium } from 'playwright-core'
import os from 'node:os'
const CHROME = path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing')
let browserRef: any = null
const getBrowser = async () => {
  if (!browserRef) browserRef = await chromium.launch({ executablePath: CHROME, headless: true })
  return browserRef
}

// Fresh context per search (Pexels rate-limits a reused session after ~2
// searches); Unsplash is the fallback source.
async function searchPhoto(query: string): Promise<Buffer> {
  const browser = await getBrowser()
  const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36', locale: 'en-US' })
  const page = await ctx.newPage()
  try {
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 2000))
    // 1) Pexels
    try {
      await page.goto(`https://www.pexels.com/search/${encodeURIComponent(query)}/`, { timeout: 30000, waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(4500)
      const html: string = await page.evaluate(() => document.documentElement.innerHTML)
      const ids = [...new Set([...html.matchAll(/images\.pexels\.com\/photos\/(\d+)\//g)].map((m) => m[1]))]
      for (const id of ids) {
        if (usedPhotoIds.has('px' + id)) continue
        const r = await ctx.request.get(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`).catch(() => null)
        if (!r || !r.ok()) continue
        const buf = Buffer.from(await r.body())
        if (buf.length < 40_000) continue
        usedPhotoIds.add('px' + id)
        console.log(`  [${query}] pexels ${id} (${(buf.length / 1024) | 0}KB)`) 
        return buf
      }
    } catch { /* fall through */ }
    // 2) Unsplash fallback
    await page.goto(`https://unsplash.com/s/photos/${encodeURIComponent(query.replace(/ /g, '-'))}`, { timeout: 30000, waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(4500)
    const html2: string = await page.evaluate(() => document.documentElement.innerHTML)
    const uids = [...new Set([...html2.matchAll(/images\.unsplash\.com\/photo-([0-9a-f-]+)\?/g)].map((m) => m[1]))]
    for (const id of uids) {
      if (usedPhotoIds.has('un' + id)) continue
      const r = await ctx.request.get(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80&fm=jpg`).catch(() => null)
      if (!r || !r.ok()) continue
      const buf = Buffer.from(await r.body())
      if (buf.length < 40_000) continue
      usedPhotoIds.add('un' + id)
      console.log(`  [${query}] unsplash ${id.slice(0, 10)} (${(buf.length / 1024) | 0}KB)`) 
      return buf
    }
    throw new Error(`no photo (pexels+unsplash) for "${query}"`)
  } finally {
    await ctx.close().catch(() => {})
  }
}

function slugOf(dir: string, folder: string): string {
  const fm = readFileSync(path.join(process.cwd(), dir, folder, 'en.md'), 'utf8')
  return fm.match(/^slug:\s*"([^"]+)"/m)?.[1] || folder.replace(/^[pb]\d-\d\d-/, '')
}

async function main() {
  const report: string[] = []
  for (const job of JOBS) {
    const slug = slugOf(job.dir, job.folder)
    const oldKey = `${slug}--${job.old}`
    const newKey = `${slug}--${job.next}`
    const localPath = path.join(process.cwd(), job.dir, job.folder, 'images', job.next)
    try {
      let buf: Buffer
      if (existsSync(localPath)) {
        buf = readFileSync(localPath) // resumable
      } else {
        buf = await searchPhoto(job.query)
        writeFileSync(localPath, buf)
      }
      const meta = await sharp(buf).metadata()
      if (DRY) { report.push(`DRY ${oldKey} → ${newKey} (${meta.width}x${meta.height}, ${(buf.length / 1024) | 0}KB)`); continue }

      await R2.send(new PutObjectCommand({ Bucket: process.env.R2_BUCKET || 'cloudtopia-media', Key: newKey, Body: buf, ContentType: 'image/jpeg' }))

      // media row (reuse the old row's alt)
      const oldRow = await q('SELECT id, alt FROM public.media WHERE filename = $1', [oldKey])
      const alt = oldRow[0]?.alt || slug
      const ins = await q(
        `INSERT INTO public.media (alt, filename, mime_type, filesize, width, height, url) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
        [alt, newKey, 'image/jpeg', buf.length, meta.width || 0, meta.height || 0, `/api/media/file/${newKey}`],
      )
      const newId = ins[0].id
      const newUrl = `/api/media/file/${newKey}`

      // swap inline upload nodes in both locales
      const posts = await q(`SELECT id, content FROM public.blog_posts WHERE slug = $1`, [slug])
      for (const p of posts) {
        const c = typeof p.content === 'string' ? JSON.parse(p.content) : p.content
        let touched = 0
        const walk = (n: any) => {
          if (!n || typeof n !== 'object') return
          if (n.type === 'upload' && n.value && n.value.filename === oldKey) {
            n.value = { id: newId, url: newUrl, alt: n.value.alt || alt, width: meta.width || 0, height: meta.height || 0, filename: newKey, mimeType: 'image/jpeg' }
            touched++
          }
          const ch = Array.isArray(n.children) ? n.children : n.root?.children
          if (Array.isArray(ch)) ch.forEach(walk)
        }
        walk(c)
        if (touched) await q('UPDATE public.blog_posts SET content = $1::jsonb, updated_at = now() WHERE id = $2', [JSON.stringify(c), p.id])
      }

      // cover swap when the duplicate was the cover
      if (oldRow[0]?.id && /^01/.test(job.old)) {
        await q('UPDATE public.blog_posts SET cover_image_id=$1, seo_og_image_id=$1, social_image_id=$1, updated_at=now() WHERE slug=$2 AND cover_image_id=$3', [newId, slug, oldRow[0].id])
      }
      report.push(`✓ ${oldKey} → ${newKey}`)
    } catch (err: any) {
      report.push(`✗ ${oldKey}: ${err.message}`)
    }
  }
  await pool?.end()
  console.log(report.join('\n'))
  const failed = report.filter((r) => r.startsWith('✗')).length
  console.log(`\nreplaced ${report.length - failed}/${JOBS.length} · failed ${failed}`)
  if (failed) process.exit(1)
}

main().catch((e) => { console.error(e); process.exit(1) })
