import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

/**
 * Generic Open Graph card generator for Industry Worlds.
 * Palette-driven (no photo dependency) so every world gets an on-brand
 * 1200x630 en/ar card. Add a world's config below and run:
 *   node scripts/generate-industry-og.mjs <slug>   (omit slug = all configured)
 */
const CONFIGS = {
  fintech: {
    bg: ['#f8f7fe', '#ece9fc'],
    panel: ['#1c0e3f', '#4925a5'],
    accent: '#46208f',
    ink: '#110e34',
    detailColor: '#4a4670',
    eyebrow: { en: 'CLOUDTOPIA · FINTECH SYSTEMS', ar: 'أنظمة التقنية المالية' },
    title: {
      en: ['Fintech platforms', 'engineered for trust'],
      ar: ['منصات مالية', 'مبنية على الثقة'],
    },
    detail: {
      en: 'Payments · Core banking · Lending · Integrations',
      ar: 'المدفوعات · الأنظمة البنكية · الإقراض · التكاملات',
    },
  },
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const root = process.cwd()
const requested = process.argv[2]
const slugs = requested ? [requested] : Object.keys(CONFIGS)

for (const slug of slugs) {
  const cfg = CONFIGS[slug]
  if (!cfg) {
    console.error(`No OG config for "${slug}" — add one to generate-industry-og.mjs`)
    process.exitCode = 1
    continue
  }
  const outputRoot = join(root, 'public/og/industries', slug)
  await mkdir(outputRoot, { recursive: true })

  for (const locale of ['en', 'ar']) {
    const rtl = locale === 'ar'
    const dir = rtl ? 'rtl' : 'ltr'
    const textX = rtl ? 1128 : 72
    const titleSize = rtl ? 52 : 46
    const t = cfg.title[locale]
    const panelRight = !rtl // LTR: dark panel on the right; RTL: mirror to the left

    const svg = Buffer.from(`
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${cfg.bg[0]}"/><stop offset="1" stop-color="${cfg.bg[1]}"/></linearGradient>
          <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${cfg.panel[0]}"/><stop offset="1" stop-color="${cfg.panel[1]}"/></linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)"/>
        <path d="M${panelRight ? 760 : 0} 0 H${panelRight ? 1200 : 440} V630 H${panelRight ? 900 : 0} C${panelRight ? 800 : 340} 430 ${panelRight ? 820 : 340} 200 ${panelRight ? 760 : 440} 0Z" fill="url(#panel)"/>
        <circle cx="${panelRight ? 1010 : 190}" cy="150" r="230" fill="#ffffff" opacity="0.06"/>
        <circle cx="${panelRight ? 1090 : 110}" cy="520" r="180" fill="${cfg.accent}" opacity="0.18"/>
        <rect x="${rtl ? 808 : 72}" y="70" width="320" height="38" rx="19" fill="${cfg.accent}"/>
        <text x="${rtl ? 968 : 232}" y="95" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-weight="700" font-size="15" letter-spacing="1.2" direction="${dir}">${esc(cfg.eyebrow[locale])}</text>
        <text x="${textX}" y="200" text-anchor="start" fill="${cfg.ink}" font-family="Arial, sans-serif" font-weight="800" font-size="${titleSize}" direction="${dir}" unicode-bidi="embed">
          <tspan x="${textX}" dy="0">${esc(t[0])}</tspan>
          <tspan x="${textX}" dy="66">${esc(t[1])}</tspan>
        </text>
        <rect x="${rtl ? 608 : 72}" y="360" width="520" height="2" fill="${cfg.accent}" opacity="0.7"/>
        <text x="${textX}" y="410" text-anchor="start" fill="${cfg.detailColor}" font-family="Arial, sans-serif" font-weight="600" font-size="22" direction="${dir}" unicode-bidi="embed">${esc(cfg.detail[locale])}</text>
        <g transform="translate(${rtl ? 1090 : 72} 500)">
          <circle cx="24" cy="24" r="24" fill="${cfg.ink}"/>
          <path d="M13 24h22M24 13v22" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
          <text x="${rtl ? -18 : 63}" y="33" text-anchor="${rtl ? 'end' : 'start'}" fill="${cfg.ink}" font-family="Arial, sans-serif" font-size="30" font-weight="800">CloudTopia</text>
        </g>
        <rect x="0" y="616" width="1200" height="14" fill="${cfg.accent}"/>
      </svg>
    `)

    await sharp(svg)
      .resize(1200, 630)
      .jpeg({ quality: 90, progressive: true, chromaSubsampling: '4:4:4' })
      .toFile(join(outputRoot, `${locale}.jpg`))
    console.log(`wrote public/og/industries/${slug}/${locale}.jpg`)
  }
}
