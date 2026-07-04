const fs = require('fs')
const path = require('path')
const dir = 'lib/services/dp-subs'
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort() : []
const rec = {}
let issues = 0
for (const f of files) {
    let o
    try { o = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) } catch (e) { issues++; console.log('BAD JSON', f); continue }
    for (const k of ['slug', 'service', 'pillarSlug', 'pillarName', 'seo', 'hero', 'features', 'faqs']) {
        if (!(k in o)) { issues++; console.log('missing', k, 'in', o.slug || f) }
    }
    rec[o.slug || f.replace('.json', '')] = o
}
const ts =
    "import type { DPSubServiceContent } from '@/components/services/DigitalPresenceSubServicePage'\n\n" +
    '// AUTO-GENERATED — Digital Presence sub-services (bespoke geometric-hero design).\n' +
    '// Regenerate via the dp-subservice-content workflow; do not hand-edit.\n\n' +
    'export const generatedDPSubServices: Record<string, DPSubServiceContent> = ' + JSON.stringify(rec, null, 2) + '\n'
fs.writeFileSync('lib/services/digital-presence-subservices.ts', ts)
console.log('DP entries assembled:', Object.keys(rec).length, ' issues:', issues)
