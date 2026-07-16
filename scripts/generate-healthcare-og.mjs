import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const imageRoot = join(root, 'public/images/industries/healthcare')
const outputRoot = join(root, 'public/og/industries/healthcare')

const cards = {
  en: {
    direction: 'ltr',
    anchor: 'start',
    textX: 72,
    photoX: 740,
    eyebrow: 'CLOUDTOPIA · HEALTHCARE INDUSTRY',
    title: ['Healthcare digital systems', 'for connected patient journeys'],
    detail: 'Websites · Booking · Secure portals · Clinic operations',
  },
  ar: {
    direction: 'rtl',
    anchor: 'start',
    textX: 1128,
    photoX: 18,
    eyebrow: 'قطاع الرعاية الصحية',
    title: ['أنظمة الرعاية الصحية الرقمية', 'لرحلة مريض مترابطة'],
    detail: 'المواقع · الحجز · البوابات الآمنة · تشغيل العيادات',
  },
}

await mkdir(outputRoot, { recursive: true })

const doctor = await sharp(join(imageRoot, 'hero-doctor.png'))
  .resize({ height: 585, withoutEnlargement: false })
  .png()
  .toBuffer()
const nurse = await sharp(join(imageRoot, 'hero-nurse.png'))
  .resize({ height: 475, withoutEnlargement: false })
  .png()
  .toBuffer()

for (const [locale, card] of Object.entries(cards)) {
  const photoOnRight = locale === 'en'
  const titleSize = locale === 'ar' ? 51 : 44
  const background = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f5fbff"/>
          <stop offset="1" stop-color="#dceef8"/>
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#0b3b65"/>
          <stop offset="1" stop-color="#176fa8"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <circle cx="${photoOnRight ? 1010 : 190}" cy="115" r="360" fill="#ffffff" opacity=".72"/>
      <circle cx="${photoOnRight ? 1070 : 130}" cy="540" r="285" fill="#f7945d" opacity=".16"/>
      <path d="M${photoOnRight ? 710 : 0} 0 H${photoOnRight ? 1200 : 490} V630 H${photoOnRight ? 845 : 0} C${photoOnRight ? 760 : 445} 465 ${photoOnRight ? 765 : 425} 190 ${photoOnRight ? 710 : 490} 0Z" fill="url(#panel)" opacity=".96"/>
      <rect x="${locale === 'en' ? 72 : 790}" y="70" width="338" height="36" rx="18" fill="#f47f4b"/>
      <text x="${locale === 'en' ? 241 : 959}" y="94" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-weight="700" font-size="15" letter-spacing="1.1" direction="${card.direction}">${card.eyebrow}</text>
      <text x="${card.textX}" y="178" text-anchor="${card.anchor}" fill="#0b3b65" font-family="Arial, sans-serif" font-weight="800" font-size="${titleSize}" direction="${card.direction}" unicode-bidi="embed">
        <tspan x="${card.textX}" dy="0">${card.title[0]}</tspan>
        <tspan x="${card.textX}" dy="64">${card.title[1]}</tspan>
      </text>
      <rect x="${locale === 'en' ? 72 : 602}" y="340" width="526" height="2" fill="#f47f4b" opacity=".85"/>
      <text x="${card.textX}" y="392" text-anchor="${card.anchor}" fill="#315d7d" font-family="Arial, sans-serif" font-weight="600" font-size="22" direction="${card.direction}" unicode-bidi="embed">${card.detail}</text>
      <g transform="translate(${locale === 'en' ? 72 : 1000} 494)">
        <circle cx="24" cy="24" r="24" fill="#0b3b65"/>
        <path d="M13 24h22M24 13v22" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <text x="${locale === 'en' ? 63 : -18}" y="33" text-anchor="${locale === 'en' ? 'start' : 'end'}" fill="#0b3b65" font-family="Arial, sans-serif" font-size="30" font-weight="800">CloudTopia</text>
      </g>
      <rect x="0" y="616" width="1200" height="14" fill="#f47f4b"/>
    </svg>
  `)

  const composites = photoOnRight
    ? [
        { input: nurse, left: card.photoX, top: 148 },
        { input: doctor, left: card.photoX + 165, top: 45 },
      ]
    : [
        { input: nurse, left: card.photoX + 205, top: 150 },
        { input: doctor, left: card.photoX, top: 45 },
      ]

  await sharp(background)
    .resize(1200, 630)
    .composite(composites)
    .jpeg({ quality: 90, progressive: true, chromaSubsampling: '4:4:4' })
    .toFile(join(outputRoot, `${locale}.jpg`))
}
