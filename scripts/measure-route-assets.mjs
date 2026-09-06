// Deterministic post-build resource inventory for representative routes.
// Usage: npm run measure:routes -- <base-url>
// Visits each path, follows same-origin redirects, parses HTML link/script
// resources, fetches each unique asset with compression, and prints JSON plus
// a readable table of HTML bytes and CSS/JS/font counts + transfer sizes.

const base = process.argv[2]
if (!base) {
  console.error('usage: node scripts/measure-route-assets.mjs <base-url>')
  process.exit(1)
}

const PATHS = [
  '/',
  '/ar',
  '/services/website-development',
  '/projects/lumma-clinics',
  '/articles/ai-automation-for-businesses',
  '/contact',
  '/restaurant-qr-menu',
  '/services/app-development/ios-app-development',
  '/industries/healthcare',
  '/pricing',
]

const origin = new URL(base).origin

async function fetchFollowingSameOrigin(url) {
  let current = url
  for (let hop = 0; hop < 5; hop++) {
    const res = await fetch(current, {
      redirect: 'manual',
      headers: { 'accept-encoding': 'gzip, br', 'user-agent': 'cloudtopia-route-measure' },
    })
    if (res.status >= 300 && res.status < 400) {
      const loc = new URL(res.headers.get('location') ?? '', current)
      if (loc.origin !== origin) return { res, finalUrl: current, external: loc.href }
      current = loc.href
      continue
    }
    return { res, finalUrl: current }
  }
  throw new Error(`too many redirects: ${url}`)
}

function extractAssets(html, pageUrl) {
  const assets = new Set()
  const patterns = [
    /<script[^>]+src="([^"]+)"/g,
    /<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g,
    /<link[^>]+href="([^"]+)"[^>]+rel="stylesheet"/g,
    /<link[^>]+rel="preload"[^>]+href="([^"]+)"[^>]+as="(?:font|script|style)"/g,
    /<link[^>]+as="(?:font|script|style)"[^>]+href="([^"]+)"/g,
  ]
  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      try {
        const url = new URL(match[1], pageUrl)
        if (url.origin === origin) assets.add(url.href)
      } catch { /* ignore malformed */ }
    }
  }
  return [...assets]
}

const classify = (url) => {
  if (/\.css(\?|$)/.test(url)) return 'css'
  if (/\.(?:js|mjs)(\?|$)/.test(url)) return 'js'
  if (/\.(?:woff2?|ttf|otf)(\?|$)/.test(url)) return 'font'
  return 'other'
}

async function transferSize(url) {
  const res = await fetch(url, { headers: { 'accept-encoding': 'gzip, br' } })
  const buf = await res.arrayBuffer()
  return buf.byteLength
}

const results = []
for (const path of PATHS) {
  const target = new URL(path, base).href
  const { res, finalUrl, external } = await fetchFollowingSameOrigin(target)
  if (external) {
    results.push({ path, status: res.status, external })
    continue
  }
  const html = await res.text()
  const assets = extractAssets(html, finalUrl)
  const counts = { css: 0, js: 0, font: 0, other: 0 }
  let assetBytes = 0
  for (const asset of assets) {
    counts[classify(asset)] += 1
    try {
      assetBytes += await transferSize(asset)
    } catch { /* asset fetch failure should not sink the report */ }
  }
  results.push({
    path,
    status: res.status,
    htmlBytes: Buffer.byteLength(html),
    assets: counts,
    uniqueAssetCount: assets.length,
    assetTransferBytes: assetBytes,
  })
}

console.log(JSON.stringify(results, null, 2))

const kb = (n) => `${(n / 1024).toFixed(1)}kB`
console.log('\npath | status | html | css | js | fonts | assets | transfer')
for (const r of results) {
  if (r.external) {
    console.log(`${r.path} | ${r.status} | -> ${r.external}`)
    continue
  }
  console.log(
    `${r.path} | ${r.status} | ${kb(r.htmlBytes)} | ${r.assets.css} | ${r.assets.js} | ${r.assets.font} | ${r.uniqueAssetCount} | ${kb(r.assetTransferBytes)}`,
  )
}
