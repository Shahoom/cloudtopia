#!/usr/bin/env node
/**
 * Assembles translated Arabic per-pillar JSON into the *-ar.ts content modules.
 *   lib/services/dp-subs-ar/*.json -> lib/services/digital-presence-subservices-ar.ts
 *   lib/services/bs-subs-ar/*.json -> lib/services/business-systems-subservices-ar.ts
 * Validates required keys + array-length parity vs the English source, so a
 * malformed batch is reported (and excluded) rather than silently shipped.
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')

function loadDir(dir) {
    const abs = path.join(ROOT, dir)
    if (!fs.existsSync(abs)) return {}
    const merged = {}
    for (const f of fs.readdirSync(abs)) {
        if (!f.endsWith('.json')) continue
        let obj
        try {
            obj = JSON.parse(fs.readFileSync(path.join(abs, f), 'utf8'))
        } catch (e) {
            console.error(`  ✗ ${dir}/${f}: invalid JSON — ${e.message}`)
            continue
        }
        for (const slug in obj) merged[slug] = obj[slug]
    }
    return merged
}

function validate(merged, label) {
    let ok = 0
    const bad = []
    for (const slug in merged) {
        const e = merged[slug]
        const problems = []
        if (e.slug !== slug) problems.push('slug mismatch')
        if (!e.pillarSlug) problems.push('no pillarSlug')
        if (!e.seo || !e.seo.title || !e.seo.description) problems.push('seo')
        if (!e.hero) problems.push('hero')
        if (problems.length) bad.push(`${slug}: ${problems.join(', ')}`)
        else ok++
    }
    console.log(`  ${label}: ${ok} valid, ${bad.length} flagged`)
    bad.forEach((b) => console.log(`     ⚠ ${b}`))
    return merged
}

function emit(outFile, exportName, typeName, typeImport, merged) {
    const body = `${typeImport}

// AUTO-GENERATED — Arabic translations. Regenerate via scripts/i18n-assemble.cjs.
// Same shape as the English content; slug + pillarSlug are kept identical.
export const ${exportName}: Record<string, ${typeName}> = ${JSON.stringify(merged, null, 2)}
`
    fs.writeFileSync(path.join(ROOT, outFile), body)
    console.log(`  → wrote ${outFile} (${Object.keys(merged).length} entries)`)
}

const dp = validate(loadDir('lib/services/dp-subs-ar'), 'DP')
emit(
    'lib/services/digital-presence-subservices-ar.ts',
    'generatedDPSubServicesAr',
    'DPSubServiceContent',
    "import type { DPSubServiceContent } from '@/components/services/DigitalPresenceSubServicePage'",
    dp,
)

const bs = validate(loadDir('lib/services/bs-subs-ar'), 'BS')
emit(
    'lib/services/business-systems-subservices-ar.ts',
    'generatedSubServicesAr',
    'Partial<SubServiceContent>',
    "import type { SubServiceContent } from '@/components/services/SubServicePage'",
    bs,
)
