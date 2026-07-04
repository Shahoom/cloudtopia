#!/usr/bin/env node
/**
 * Extracts the English DP + BS sub-service content, grouped by pillar, into
 * per-pillar JSON files that translation subagents read. One file per pillar:
 *   scratchpad/en-subs/dp/<pillar>.json  =  { "<slug>": {full entry}, ... }
 * Prints a manifest (pillar, count) for batching.
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const OUT = process.argv[2] // scratchpad dir for en-subs

function evalGenerated(file, exportName) {
    let src = fs.readFileSync(path.join(ROOT, file), 'utf8')
    src = src.replace(/^import[^\n]*$/m, '')
    src = src.replace(new RegExp('^export const ' + exportName + '[^=]*=\\s*', 'm'), '')
    src = src.replace(/;\s*$/, '').trim()
    return eval('(' + src + ')')
}

function groupByPillar(obj) {
    const byPillar = {}
    for (const slug in obj) {
        const p = obj[slug].pillarSlug
        ;(byPillar[p] ||= {})[slug] = obj[slug]
    }
    return byPillar
}

function writeGroup(kind, byPillar) {
    const dir = path.join(OUT, kind)
    fs.mkdirSync(dir, { recursive: true })
    const manifest = []
    for (const pillar in byPillar) {
        const entries = byPillar[pillar]
        fs.writeFileSync(path.join(dir, pillar + '.json'), JSON.stringify(entries, null, 2))
        manifest.push({ kind, pillar, count: Object.keys(entries).length })
    }
    return manifest
}

const dp = groupByPillar(evalGenerated('lib/services/digital-presence-subservices.ts', 'generatedDPSubServices'))
const bs = groupByPillar(evalGenerated('lib/services/business-systems-subservices.ts', 'generatedSubServices'))

const manifest = [...writeGroup('dp', dp), ...writeGroup('bs', bs)]
manifest.sort((a, b) => b.count - a.count)
console.log('Wrote per-pillar EN JSON to', OUT)
for (const m of manifest) console.log(`  ${m.kind.padEnd(3)} ${m.pillar.padEnd(40)} ${m.count}`)
console.log('TOTAL', manifest.reduce((s, m) => s + m.count, 0))
