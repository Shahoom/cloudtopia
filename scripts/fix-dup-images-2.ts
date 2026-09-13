/**
 * Round 2 of duplicate-image replacement: cross-article exact duplicates found
 * by hashing every file the published posts reference on the CDN (14 groups /
 * 37 files — worst: six Omani listicles sharing one cover). Keeps one file per
 * group and replaces the other 23 with fresh Pexels/Unsplash photos.
 *
 * Every candidate photo is md5-checked against ALL images currently referenced
 * by published posts (plus the ones fetched this run), so a search can't hand
 * back a photo the site already uses.
 *
 *   node --import tsx --env-file=scratchpad/.sb-env --env-file=.env.local \
 *     scripts/fix-dup-images-2.ts [--dry]
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import os from 'node:os'
import sharp from 'sharp'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { chromium } from 'playwright-core'
import pkg from 'pg'

const { Pool } = pkg
const DRY = process.argv.includes('--dry')
const pool = new Pool({ connectionString: process.env.PG_IMPORT_URL, ssl: { rejectUnauthorized: false }, max: 2 })
const q = async (text: string, params: any[] = []) => (await pool.query(text, params)).rows

const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  forcePathStyle: true,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID || '', secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '' },
})

const CACHE_DIR = path.join(process.cwd(), 'scratchpad', 'dup2-images')

// slug + old media filename suffix → search query + new filename suffix
const JOBS: { slug: string; old: string; query: string; next: string }[] = [
  // group: muscat architecture ×4 (keep best-ai-companies-oman--02)
  { slug: 'best-erp-oman', old: '02-muscat-business-architecture.jpg', query: 'muscat oman corniche sea', next: '02-muscat-corniche.jpg' },
  { slug: 'best-software-companies-oman', old: '02-muscat-modern-architecture.jpg', query: 'royal opera house muscat', next: '02-royal-opera-muscat.jpg' },
  { slug: 'best-software-company-muscat', old: '03-muscat-architecture.jpg', query: 'oman fort tower', next: '03-muscat-fort.jpg' },
  // group: identical cover on SIX Omani listicles (keep best-ai-companies-oman--01)
  { slug: 'best-crm-oman', old: '01-cover-omani-sales-crm.jpg', query: 'arab businessman laptop office', next: '01-cover-sales-office-laptop.jpg' },
  { slug: 'best-ecommerce-company-oman', old: '01-cover-omani-merchant-laptop.jpg', query: 'online store owner packing orders', next: '01-cover-store-owner-packing.jpg' },
  { slug: 'best-erp-oman', old: '01-cover-omani-erp-business.jpg', query: 'warehouse manager tablet logistics', next: '01-cover-warehouse-manager.jpg' },
  { slug: 'best-software-companies-oman', old: '01-cover-gulf-business-laptop.jpg', query: 'software team office collaboration', next: '01-cover-software-team.jpg' },
  { slug: 'best-software-company-muscat', old: '01-cover-gulf-business-laptop.jpg', query: 'muscat oman city skyline', next: '01-cover-muscat-skyline.jpg' },
  // group: chatbot interface ×2 (keep best-ai-companies-oman--03)
  { slug: 'best-arabic-auto-reply', old: 'ai-chatbot-phone.jpg', query: 'chat messages smartphone screen', next: 'chatbot-phone-screen.jpg' },
  // group: messaging apps ×2 (keep best-ai-customer-service-saudi--04)
  { slug: 'best-arabic-chatbot', old: '03-omnichannel-messaging-apps.jpg', query: 'social media apps icons phone', next: '03-messaging-apps-icons.jpg' },
  // group: wireframe ×2 (keep best-web-design-muscat--03)
  { slug: 'best-app-development-gulf', old: '04-mobile-ui-prototype.jpg', query: 'mobile app wireframe sketch design', next: '04-app-wireframe-sketch.jpg' },
  // group: dubai skyline ×2 (keep best-software-company-dubai cover)
  { slug: 'best-app-development-gulf', old: '02-dubai-tech-market.jpg', query: 'dubai marina skyscrapers', next: '02-dubai-marina.jpg' },
  // group: riyadh skyline ×3 (keep best-web-design-companies-saudi cover)
  { slug: 'best-app-development-gulf', old: '03-riyadh-tech-market.jpg', query: 'riyadh saudi arabia night city', next: '03-riyadh-night.jpg' },
  { slug: 'best-ecommerce-company-saudi', old: '01-cover-riyadh-ecommerce.jpg', query: 'online shopping boxes credit card laptop', next: '01-cover-online-shopping-boxes.jpg' },
  // group: muttrah ×2 (keep best-software-company-muscat--02)
  { slug: 'best-crm-oman', old: '02-muttrah-business-market.jpg', query: 'oman souq traditional market', next: '02-oman-souq.jpg' },
  // group: dashboard devices ×3 (keep best-crm-oman--04)
  { slug: 'best-erp-oman', old: '03-erp-dashboard-devices.jpg', query: 'business dashboard charts monitor', next: '03-business-dashboard-monitor.jpg' },
  { slug: 'best-web-design-jeddah', old: '04-responsive-dashboard-devices.jpg', query: 'responsive website laptop tablet phone', next: '04-responsive-devices.jpg' },
  // group: al alam palace ×2 (keep best-web-design-muscat--02)
  { slug: 'best-ecommerce-company-oman', old: '02-al-alam-palace-muscat.jpg', query: 'nizwa fort oman heritage', next: '02-nizwa-fort.jpg' },
  // group: software code ×3 (keep best-software-companies-oman--03)
  { slug: 'best-software-companies-saudi', old: '04-software-code.jpg', query: 'programming code monitor dark', next: '04-code-monitor-dark.jpg' },
  { slug: 'best-software-company-muscat', old: '04-software-code-screen.jpg', query: 'developer hands typing laptop', next: '04-developer-typing.jpg' },
  // group: payment receipts ×2 (keep freezone-vs-mainland-website--04)
  { slug: 'zatca-phase-2-developers', old: '01-cover-zatca-integration.jpg', query: 'invoice tax documents calculator desk', next: '01-cover-invoice-tax-desk.jpg' },
  // group: card payment ×2 (keep launch-online-store-oman-hub--03)
  { slug: 'payment-gateways-oman', old: '03-cash-on-delivery.jpg', query: 'cash money payment hands', next: '03-cash-payment-hands.jpg' },
  // group: dubai market ×2 (keep website-cost-uae cover)
  { slug: 'uae-instagram-trade-licence', old: '03-dubai-licensing-market.jpg', query: 'dubai souk gold market', next: '03-dubai-souk.jpg' },
  // round 2b: quality re-picks (first replacement was B/W or showed foreign banknotes)
  { slug: 'best-software-companies-oman', old: '02-royal-opera-muscat.jpg', query: 'muscat oman white buildings daylight', next: '02-muscat-city-daylight.jpg' },
  { slug: 'payment-gateways-oman', old: '03-cash-payment-hands.jpg', query: 'courier delivery package doorstep', next: '03-cod-doorstep-delivery.jpg' },
]

// ── uniqueness guard: md5 of every image published posts reference ──
const knownHashes = new Set<string>()
const md5 = (b: Buffer) => createHash('md5').update(b).digest('hex')

async function loadKnownHashes() {
  const rows = await q(`
    SELECT DISTINCT m.filename FROM public.blog_posts p
    JOIN public.media m ON m.id IN (p.cover_image_id, p.seo_og_image_id, p.social_image_id)
    WHERE p.status='published'
    UNION
    SELECT DISTINCT x[1] FROM public.blog_posts p,
      LATERAL regexp_matches(p.content::text, '"filename":\\s*"([^"]+)"', 'g') x
    WHERE p.status='published'`)
  const files = rows.map((r) => r.filename || r.x?.[0]).filter(Boolean) as string[]
  for (let i = 0; i < files.length; i += 12) {
    await Promise.all(files.slice(i, i + 12).map(async (f) => {
      const r = await fetch('https://media.cloudtopia.net/' + encodeURIComponent(f)).catch(() => null)
      if (r?.status === 200) knownHashes.add(md5(Buffer.from(await r.arrayBuffer())))
    }))
  }
  console.log(`known hashes: ${knownHashes.size} (${files.length} files)`)
}

// ── photo search (Pexels → Unsplash), rejecting already-used photos ──
const usedPhotoIds = new Set<string>()
const CHROME = path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing')
let browserRef: any = null
const getBrowser = async () => {
  if (!browserRef) browserRef = await chromium.launch({ executablePath: CHROME, headless: true })
  return browserRef
}

async function searchPhoto(query: string): Promise<Buffer> {
  const browser = await getBrowser()
  const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36', locale: 'en-US' })
  const page = await ctx.newPage()
  const accept = (buf: Buffer) => buf.length >= 40_000 && !knownHashes.has(md5(buf))
  try {
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 2000))
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
        if (!accept(buf)) continue
        usedPhotoIds.add('px' + id)
        knownHashes.add(md5(buf))
        console.log(`  [${query}] pexels ${id} (${(buf.length / 1024) | 0}KB)`)
        return buf
      }
    } catch { /* fall through */ }
    await page.goto(`https://unsplash.com/s/photos/${encodeURIComponent(query.replace(/ /g, '-'))}`, { timeout: 30000, waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(4500)
    const html2: string = await page.evaluate(() => document.documentElement.innerHTML)
    const uids = [...new Set([...html2.matchAll(/images\.unsplash\.com\/photo-([0-9a-f-]+)\?/g)].map((m) => m[1]))]
    for (const id of uids) {
      if (usedPhotoIds.has('un' + id)) continue
      const r = await ctx.request.get(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80&fm=jpg`).catch(() => null)
      if (!r || !r.ok()) continue
      const buf = Buffer.from(await r.body())
      if (!accept(buf)) continue
      usedPhotoIds.add('un' + id)
      knownHashes.add(md5(buf))
      console.log(`  [${query}] unsplash ${id.slice(0, 10)} (${(buf.length / 1024) | 0}KB)`)
      return buf
    }
    throw new Error(`no unique photo (pexels+unsplash) for "${query}"`)
  } finally {
    await ctx.close().catch(() => {})
  }
}

async function main() {
  mkdirSync(CACHE_DIR, { recursive: true })
  await loadKnownHashes()
  const report: string[] = []
  for (const job of JOBS) {
    const oldKey = `${job.slug}--${job.old}`
    const newKey = `${job.slug}--${job.next}`
    const localPath = path.join(CACHE_DIR, newKey)
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

      const oldRow = await q('SELECT id, alt FROM public.media WHERE filename = $1', [oldKey])
      const alt = oldRow[0]?.alt || job.slug
      const existing = await q('SELECT id FROM public.media WHERE filename = $1', [newKey])
      const newId = existing[0]?.id ?? (await q(
        `INSERT INTO public.media (alt, filename, mime_type, filesize, width, height, url) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
        [alt, newKey, 'image/jpeg', buf.length, meta.width || 0, meta.height || 0, `/api/media/file/${newKey}`],
      ))[0].id
      const newUrl = `/api/media/file/${newKey}`

      const posts = await q(`SELECT id, content FROM public.blog_posts WHERE slug = $1`, [job.slug])
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

      if (oldRow[0]?.id && /^01/.test(job.old)) {
        await q('UPDATE public.blog_posts SET cover_image_id=$1, seo_og_image_id=$1, social_image_id=$1, updated_at=now() WHERE slug=$2 AND cover_image_id=$3', [newId, job.slug, oldRow[0].id])
      }
      report.push(`✓ ${oldKey} → ${newKey}`)
    } catch (err: any) {
      report.push(`✗ ${oldKey}: ${err.message}`)
    }
  }
  await pool.end()
  await browserRef?.close().catch(() => {})
  console.log(report.join('\n'))
  const failed = report.filter((r) => r.startsWith('✗')).length
  console.log(`\nreplaced ${report.length - failed}/${JOBS.length} · failed ${failed}`)
  if (failed) process.exit(1)
}

main().catch((e) => { console.error(e); process.exit(1) })
