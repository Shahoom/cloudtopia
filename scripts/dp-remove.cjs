const fs = require('fs')
const dir = 'lib/services/dp-subs'
const remove = new Set(['ecommerce-development', 'social-media-management'])
let n = 0
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const o = JSON.parse(fs.readFileSync(dir + '/' + f, 'utf8'))
    if (remove.has(o.pillarSlug)) { fs.unlinkSync(dir + '/' + f); n++ }
}
console.log('removed', n, 'e-commerce/social DP files')
