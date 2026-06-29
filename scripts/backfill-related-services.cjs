// One-off backfill: tag existing projects with relatedServiceSlugs (raw SQL so
// Payload's afterChange auto-translate hook is NOT triggered). Mapping derived
// from the retired WEBSITE_PROJECT_IDS / WEBAPP_PROJECT_IDS maps; each value
// carries the legacy slug + the redesigned-taxonomy slug + its pillar so the
// exact/pillar/category fallbacks all resolve. Idempotent (plain SET).
const fs = require('fs')
const { Pool } = require('pg')

function connStr() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL
  try {
    const env = fs.readFileSync('.env.local', 'utf8')
    const m = env.match(/^\s*DATABASE_URL\s*=\s*(.*)$/m)
    if (m) return m[1].trim().replace(/^["']|["']$/g, '')
  } catch {}
  return 'postgres://127.0.0.1:5432/payload_db'
}

const MAP = {
  'kvaii-logistics': 'business-website-development, corporate-website-development, website-development',
  'ram-sustainable': 'business-website-development, corporate-website-development, website-development',
  'lumma-clinics': 'business-website-development, portfolio-websites, website-development',
  'artucky-ecommerce': 'ecommerce-website-development, ecommerce-development',
  'joory-cafe': 'restaurant-and-hospitality-website-development, restaurant-website-development, website-development',
  'luxury-world-tourism': 'custom-web-application-development, progressive-web-app-development, interactive-web-applications',
  'comics-topia': 'custom-web-application-development, interactive-web-applications',
  'dhofar-tourism': 'custom-web-application-development, progressive-web-app-development, interactive-web-applications',
}

;(async () => {
  const pool = new Pool({ connectionString: connStr(), max: 2 })
  let total = 0
  for (const [id, slugs] of Object.entries(MAP)) {
    // DB ids are locale-prefixed ("en:<slug>" / "ar:<slug>") — tag both rows.
    const r = await pool.query("update projects set related_service_slugs = $1 where id in ('en:' || $2, 'ar:' || $2)", [slugs, id])
    console.log(`  ${id.padEnd(22)} -> ${r.rowCount} row(s)`)
    total += r.rowCount
  }
  const tagged = await pool.query("select count(*)::int n from projects where coalesce(related_service_slugs,'') <> ''")
  const sample = await pool.query("select id, locale, related_service_slugs from projects where id = 'kvaii-logistics' order by locale")
  console.log(`\nupdated ${total} row(s); tagged project-rows now: ${tagged.rows[0].n}`)
  console.log('sample (kvaii-logistics):', JSON.stringify(sample.rows))
  await pool.end()
})().catch((e) => { console.error('BACKFILL ERROR:', e.message); process.exit(1) })
