#!/usr/bin/env node
/**
 * Splits the per-pillar EN JSON into translation batches of <= CHUNK entries.
 * Skips pillars already fully present in the AR output dir. Emits batch input
 * files + a manifest (printed as JSON) of remaining work.
 *   in:  <scratchpad>/en-subs/<kind>/<pillar>.json
 *   out: <scratchpad>/en-subs/batches/<kind>__<pillar>__<idx>.json
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SP = process.argv[2] // scratchpad/en-subs dir
const CHUNK = Number(process.argv[3] || 8)
const batchDir = path.join(SP, 'batches')
fs.mkdirSync(batchDir, { recursive: true })

const arDir = { dp: 'lib/services/dp-subs-ar', bs: 'lib/services/bs-subs-ar' }
function alreadyDone(kind) {
    const abs = path.join(ROOT, arDir[kind])
    const done = new Set()
    if (!fs.existsSync(abs)) return done
    for (const f of fs.readdirSync(abs)) {
        if (!f.endsWith('.json')) continue
        try {
            const obj = JSON.parse(fs.readFileSync(path.join(abs, f), 'utf8'))
            for (const slug in obj) done.add(slug)
        } catch {}
    }
    return done
}

const manifest = []
for (const kind of ['dp', 'bs']) {
    const dir = path.join(SP, kind)
    if (!fs.existsSync(dir)) continue
    const done = alreadyDone(kind)
    for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith('.json')) continue
        const pillar = file.replace(/\.json$/, '')
        const all = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'))
        const slugs = Object.keys(all).filter((s) => !done.has(s))
        if (!slugs.length) continue
        for (let i = 0; i < slugs.length; i += CHUNK) {
            const part = slugs.slice(i, i + CHUNK)
            const idx = Math.floor(i / CHUNK) + 1
            const batch = {}
            for (const s of part) batch[s] = all[s]
            const name = `${kind}__${pillar}__${idx}.json`
            fs.writeFileSync(path.join(batchDir, name), JSON.stringify(batch, null, 2))
            manifest.push({
                kind,
                pillar,
                idx,
                slugs: part,
                in: path.join(batchDir, name),
                out: path.join(ROOT, arDir[kind], `${pillar}__${idx}.json`),
            })
        }
    }
}
console.log(JSON.stringify(manifest, null, 2))
