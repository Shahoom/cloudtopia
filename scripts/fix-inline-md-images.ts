/**
 * Repair raw `![alt](images/xx.jpg)` markdown lines that survived as literal
 * text nodes inside published posts (the md→lexical conversion left them as
 * text). Per occurrence:
 *   - cover lines (01-*) are removed (the hero already renders the cover)
 *   - if the doc already has an upload node for that file → remove the text
 *     (it was double-referenced by the import's injected node)
 *   - otherwise → replace the paragraph with a proper populated upload node
 * Filenames that were duplicate-swapped map to their replacement key.
 *
 *   node --import tsx --env-file=scratchpad/.sb-env scripts/fix-inline-md-images.ts [--dry]
 */
import pkg from 'pg'

const { Pool } = pkg
const DRY = process.argv.includes('--dry')
const pool = new Pool({ connectionString: process.env.PG_IMPORT_URL, ssl: { rejectUnauthorized: false }, max: 2 })
const q = async (text: string, params: any[] = []) => (await pool.query(text, params)).rows

// old media key → replacement key (the 28 duplicate swaps)
const SWAPS: [string, string, string][] = [
  ['b2-24-best-whatsapp-chatbot-gulf', '01-gulf-whatsapp-business-cover.jpg', '01-whatsapp-business-phone.jpg'],
  ['b2-14-best-ecommerce-company-oman', '04-ecommerce-orders-packages.jpg', '04-delivery-courier-boxes.jpg'],
  ['b2-16-best-erp-oman', '04-inventory-orders-workspace.jpg', '04-warehouse-inventory-tablet.jpg'],
  ['b2-15-best-app-development-gulf', '01-cover-gulf-mobile-app.jpg', '01-cover-mobile-app-coding.jpg'],
  ['b2-18-best-pos-gulf', '02-dubai-gulf-business.jpg', '02-pos-card-terminal.jpg'],
  ['b2-17-best-crm-oman', '03-arab-sales-team.jpg', '03-sales-team-meeting.jpg'],
  ['b2-25-best-ai-companies-oman', '04-arab-ai-team.jpg', '04-ai-technology-hand.jpg'],
  ['b2-26-best-arabic-auto-reply', 'human-agent-handoff.jpg', '04-call-center-agent.jpg'],
  ['b2-14-best-ecommerce-company-oman', '03-mobile-payment-gateway.jpg', '03-contactless-payment.jpg'],
  ['b2-24-best-whatsapp-chatbot-gulf', '04-arabic-customer-support-handoff.jpg', '04-support-chat-typing.jpg'],
  ['b2-26-best-arabic-auto-reply', 'cover-arabic-customer-support.jpg', '01-cover-customer-service.jpg'],
  ['p2-07-om-domain-registration', '02-registration-documents.jpg', '02-official-documents.jpg'],
  ['p1-08-choose-web-company-uae', '04-uae-agency-contract.jpg', '04-contract-signing.jpg'],
  ['p1-10-source-code-ownership-contract', '01-cover-code-contract.jpg', '01-cover-agreement-handshake.jpg'],
  ['p2-02-maroof-verification-guide', '02-mobile-store-check.jpg', '02-online-store-phone.jpg'],
  ['p1-09-app-development-cost-saudi', '02-native-hybrid-code.jpg', '02-code-screen.jpg'],
  ['p1-10-source-code-ownership-contract', '02-code-repository.jpg', '02-developer-laptop.jpg'],
  ['p2-01-zatca-phase-2-developers', '02-xml-development.jpg', '02-data-code-monitor.jpg'],
  ['p1-05-instagram-vs-website', '03-google-search-website.jpg', '03-google-search-laptop.jpg'],
  ['p1-08-choose-web-company-uae', '02-uae-price-comparison.jpg', '02-price-comparison.jpg'],
  ['p1-09-app-development-cost-saudi', '03-app-budget-planning.jpg', '03-budget-planning.jpg'],
  ['p1-02-app-development-cost-oman', '03-app-hosting-servers.jpg', '03-server-room.jpg'],
  ['p1-07-choose-web-company-gulf', '03-data-hosting-servers.jpg', '03-data-center.jpg'],
  ['p2-12-zatca-phase-2-api-checklist', '04-secure-archive-servers.jpg', '04-network-servers.jpg'],
  ['p2-05-payment-gateways-oman', '04-gateway-integration.jpg', '04-secure-payment.jpg'],
  ['p2-09-mada-apple-pay-tabby-tamara', '01-cover-mobile-payment.jpg', '01-cover-tap-to-pay.jpg'],
  ['p2-13-launch-online-store-saudi-hub', '03-mobile-payment.jpg', '03-pos-contactless.jpg'],
  ['p1-08-choose-web-company-uae', '03-arabic-rtl-review.jpg', '03-design-review-tablet.jpg'],
]
const swapMap = new Map<string, string>()
for (const [folder, oldF, newF] of SWAPS) {
  const slug = folder.replace(/^[pb]\d-\d\d-/, '')
  swapMap.set(`${slug}--${oldF}`, `${slug}--${newF}`)
}

const MD_IMG = /^!\[([^\]]*)\]\(images\/([^)]+)\)$/

async function main() {
  const posts = await q(`SELECT id, slug, locale, content, cover_image_id FROM public.blog_posts WHERE status='published' AND content::text LIKE '%](images/%'`)
  console.log('posts to repair:', posts.length)
  let converted = 0, removed = 0
  const mediaCache = new Map<string, any>()
  const getMedia = async (key: string) => {
    if (!mediaCache.has(key)) mediaCache.set(key, (await q('SELECT id, alt, width, height FROM public.media WHERE filename = $1', [key]))[0] || null)
    return mediaCache.get(key)
  }

  for (const post of posts) {
    const c = typeof post.content === 'string' ? JSON.parse(post.content) : post.content
    const children: any[] = c?.root?.children || []
    // existing upload filenames in the doc
    const present = new Set<string>()
    const scan = (n: any) => {
      if (!n || typeof n !== 'object') return
      if (n.type === 'upload' && n.value?.filename) present.add(n.value.filename)
      const ch = Array.isArray(n.children) ? n.children : null
      if (ch) ch.forEach(scan)
    }
    children.forEach(scan)

    let touched = 0
    for (let i = children.length - 1; i >= 0; i--) {
      const node = children[i]
      if (node?.type !== 'paragraph' || !Array.isArray(node.children)) continue
      const text = node.children.map((ch: any) => ch?.text || '').join('').trim()
      const m = text.match(MD_IMG)
      if (!m) continue
      const [, alt, file] = m
      let key = `${post.slug}--${file}`
      key = swapMap.get(key) || key
      const isCover = /^01[-b]|^cover/.test(file)
      if (isCover || present.has(key)) {
        children.splice(i, 1)
        removed++; touched++
        continue
      }
      const media = await getMedia(key)
      if (!media) { console.log(`  ! no media for ${key} (${post.slug} ${post.locale})`); continue }
      children[i] = {
        type: 'upload', relationTo: 'media', format: '', version: 3, fields: null,
        value: { id: media.id, url: `/api/media/file/${key}`, alt: alt || media.alt, width: media.width, height: media.height, filename: key, mimeType: 'image/jpeg' },
      }
      present.add(key)
      converted++; touched++
    }
    if (touched && !DRY) {
      await q('UPDATE public.blog_posts SET content = $1::jsonb, updated_at = now() WHERE id = $2', [JSON.stringify(c), post.id])
    }
    if (touched) console.log(`${DRY ? 'DRY ' : '✓ '}${post.slug} [${post.locale}] fixed ${touched}`)
  }
  await pool.end()
  console.log(`\nconverted→upload: ${converted} · removed(dup/cover): ${removed}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
