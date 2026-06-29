// scripts/dp-prune.cjs — delete DP sub-service content for any slug no longer
// referenced by a pillar in digital-presence.ts, then rebuild the aggregates.
const fs = require('fs')
const { execSync } = require('child_process')

const dpSlugify = (s) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/\([^)]*\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// Read the kept slugs straight from the source file (no TS import needed).
const src = fs.readFileSync('lib/services/digital-presence.ts', 'utf8')
const names = [...src.matchAll(/subServices:\s*\[([\s\S]*?)\]/g)]
  .flatMap((m) => [...m[1].matchAll(/'([^']+)'|"([^"]+)"/g)].map((x) => x[1] || x[2]))
const keep = new Set(names.map(dpSlugify))
console.log('kept slugs:', keep.size)

for (const dir of ['lib/services/dp-subs', 'lib/services/dp-subs-ar']) {
  if (!fs.existsSync(dir)) continue
  let removed = 0
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const slug = f.replace('.json', '')
    if (!keep.has(slug)) { fs.unlinkSync(`${dir}/${f}`); removed++ }
  }
  console.log(`${dir}: removed ${removed}`)
}

// EN aggregate: regenerate from remaining JSONs.
execSync('node scripts/assemble-dp.cjs', { stdio: 'inherit' })

// AR aggregate: filter the existing generated record to kept slugs (preserve
// translations; don't regenerate from the sparser dp-subs-ar set).
const arPath = 'lib/services/digital-presence-subservices-ar.ts'
if (fs.existsSync(arPath)) {
  const arSrc = fs.readFileSync(arPath, 'utf8')
  // Find the object literal's `{` AFTER `export const` so a top-of-file
  // `import type { … }` brace doesn't get mistaken for the record start.
  const jsonStart = arSrc.indexOf('{', arSrc.indexOf('export const'))
  const header = arSrc.slice(0, arSrc.indexOf('export const'))
  const exportLine = arSrc.slice(arSrc.indexOf('export const'), jsonStart)
  const rec = JSON.parse(arSrc.slice(jsonStart, arSrc.lastIndexOf('}') + 1))
  let dropped = 0
  for (const k of Object.keys(rec)) if (!keep.has(k)) { delete rec[k]; dropped++ }
  fs.writeFileSync(arPath, header + exportLine + JSON.stringify(rec, null, 2) + '\n')
  console.log(`AR aggregate: dropped ${dropped}, kept ${Object.keys(rec).length}`)
}
