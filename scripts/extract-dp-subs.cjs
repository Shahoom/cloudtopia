const fs = require('fs')
const root = process.cwd()
const src = fs.readFileSync(root + '/lib/services/digital-presence.ts', 'utf8')

// Slugs that already have their own page (bespoke website services, BS subs, pillars).
const webKeys = [...fs.readFileSync(root + '/lib/services/website-service-content.ts', 'utf8').matchAll(/^\s{4}"([a-z0-9-]+)":\s*\{/gm)].map((m) => m[1])
const bsDir = root + '/lib/services/bs-subs'
const bsFiles = fs.existsSync(bsDir) ? fs.readdirSync(bsDir).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', '')) : []
const exclude = new Set([...webKeys, ...bsFiles, 'odoo-erp-implementation'])

const slugify = (s) =>
    s.toLowerCase().replace(/&/g, 'and').replace(/\([^)]*\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// Pillar blocks: a pillar has `slug` immediately followed by `name` (groups have a
// `tagline` line in between), then a `subServices` array.
const re = /slug:\s*'([^']+)',\s*\n\s*name:\s*t\('([^']+)',[\s\S]*?subServices:\s*\[([\s\S]*?)\]/g
let m
const args = []
const seen = new Set()
while ((m = re.exec(src))) {
    const pillarSlug = m[1]
    const pillarName = m[2]
    exclude.add(pillarSlug)
    const subs = [...m[3].matchAll(/'([^']+)'/g)].map((x) => x[1])
    for (const name of subs) {
        const slug = slugify(name)
        if (!slug || exclude.has(slug) || seen.has(slug)) continue
        seen.add(slug)
        args.push({ slug, service: name, pillarSlug, pillarName })
    }
}

fs.writeFileSync('/tmp/dp-args.json', JSON.stringify(args))
console.log('DP sub-services to generate:', args.length)
const byPillar = {}
args.forEach((a) => { byPillar[a.pillarSlug] = (byPillar[a.pillarSlug] || 0) + 1 })
console.log('per pillar:', JSON.stringify(byPillar))
console.log('sample:', JSON.stringify(args.slice(0, 3)))
