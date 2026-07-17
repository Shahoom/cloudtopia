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
  'ecommerce-retail': {
    bg: ['#f7fafd', '#e7f0fa'],
    panel: ['#152437', '#2E73BB'],
    accent: '#2E73BB',
    ink: '#23262d',
    detailColor: '#4b5563',
    eyebrow: { en: 'CLOUDTOPIA · E-COMMERCE', ar: 'التجارة الإلكترونية' },
    title: {
      en: ['Commerce platforms', 'built to scale'],
      ar: ['منصات تجارة', 'مبنية للنمو'],
    },
    detail: {
      en: 'Storefronts · Catalog · Checkout · Inventory & POS',
      ar: 'المتاجر · الكتالوج · الدفع · المخزون ونقاط البيع',
    },
  },
  education: {
    bg: ['#f5fdf9', '#e4f7ef'],
    panel: ['#0d2f24', '#2EB97E'],
    accent: '#2EB97E',
    pillText: '#0d2f24',
    ink: '#181818',
    detailColor: '#48584f',
    eyebrow: { en: 'CLOUDTOPIA · EDUCATION', ar: 'التعليم' },
    title: {
      en: ['Learning platforms', 'for every role'],
      ar: ['منصات تعليمية', 'لكل دور'],
    },
    detail: {
      en: 'LMS · Student portals · Assessments · Classrooms',
      ar: 'أنظمة التعلّم · بوابات الطلاب · التقييم · الفصول',
    },
  },
  'travel-hospitality': {
    bg: ['#fafdf2', '#f0f7e0'],
    panel: ['#1f2c05', '#86B817'],
    accent: '#86B817',
    pillText: '#1f2c05',
    ink: '#2C3E50',
    detailColor: '#4a5a63',
    eyebrow: { en: 'CLOUDTOPIA · TRAVEL', ar: 'السفر والضيافة' },
    title: {
      en: ['Booking platforms', 'guests can trust'],
      ar: ['منصات حجز', 'يثق بها الضيوف'],
    },
    detail: {
      en: 'Booking engines · Packages · Itineraries · Guest portals',
      ar: 'محركات الحجز · الباقات · خطط الرحلات · بوابات الضيوف',
    },
  },
  restaurants: {
    bg: ['#f4fbf7', '#e3f4ea'],
    panel: ['#04301a', '#00813D'],
    accent: '#00813D',
    ink: '#212121',
    detailColor: '#4a5750',
    eyebrow: { en: 'CLOUDTOPIA · RESTAURANTS', ar: 'المطاعم' },
    title: {
      en: ['Restaurant systems', 'for every order'],
      ar: ['أنظمة مطاعم', 'لكل طلب'],
    },
    detail: {
      en: 'Online ordering · Menus · POS · Delivery · Reservations',
      ar: 'الطلب أونلاين · القوائم · نقاط البيع · التوصيل · الحجوزات',
    },
  },
  'legal-firms': {
    bg: ['#f4f7fb', '#e7edf5'],
    panel: ['#0f1a26', '#213449'],
    accent: '#213449',
    ink: '#1A2432',
    detailColor: '#4c5a6b',
    eyebrow: { en: 'CLOUDTOPIA · LEGAL', ar: 'مكاتب المحاماة' },
    title: {
      en: ['Legal systems', 'built on confidence'],
      ar: ['أنظمة قانونية', 'تحفظ السرية'],
    },
    detail: {
      en: 'Matters · Client portals · Documents · Intake',
      ar: 'القضايا · بوابات العملاء · المستندات · الاستقبال',
    },
  },
  construction: {
    bg: ['#fffdf5', '#fdf4dd'],
    panel: ['#332701', '#F5BF23'],
    accent: '#F5BF23',
    pillText: '#332701',
    ink: '#1A1A1A',
    detailColor: '#54503f',
    eyebrow: { en: 'CLOUDTOPIA · CONSTRUCTION', ar: 'الإنشاءات' },
    title: {
      en: ['Construction systems', 'from tender to handover'],
      ar: ['أنظمة إنشاءات', 'من المناقصة إلى التسليم'],
    },
    detail: {
      en: 'Projects · Tenders · RFIs · Approvals · Site apps',
      ar: 'المشاريع · المناقصات · الاعتمادات · تطبيقات الموقع',
    },
  },
  'professional-services': {
    bg: ['#fbf8f2', '#f5ebdd'],
    panel: ['#2b1d0c', '#D29052'],
    accent: '#D29052',
    pillText: '#2b1d0c',
    ink: '#241C10',
    detailColor: '#574c3d',
    eyebrow: { en: 'CLOUDTOPIA · PRO SERVICES', ar: 'الخدمات المهنية' },
    title: {
      en: ['Client platforms', 'for expert teams'],
      ar: ['منصات عملاء', 'لفرق الخبرة'],
    },
    detail: {
      en: 'Client portals · Projects · Time & billing · Proposals',
      ar: 'بوابات العملاء · المشاريع · الوقت والفوترة · العروض',
    },
  },
  'logistics-supply-chain': {
    bg: ['#fdf6f6', '#fae7e8'],
    panel: ['#2e0508', '#DF1118'],
    accent: '#DF1118',
    ink: '#032330',
    detailColor: '#44555c',
    eyebrow: { en: 'CLOUDTOPIA · LOGISTICS', ar: 'الخدمات اللوجستية' },
    title: {
      en: ['Logistics systems', 'from order to proof'],
      ar: ['أنظمة لوجستية', 'من الطلب إلى الإثبات'],
    },
    detail: {
      en: 'TMS · WMS · Tracking · Fleet · Control tower',
      ar: 'إدارة النقل · المستودعات · التتبع · الأسطول · برج التحكم',
    },
  },
  'government-public-sector': {
    bg: ['#fdf5f6', '#fae7e9'],
    panel: ['#2f070d', '#E41E2F'],
    accent: '#E41E2F',
    ink: '#252638',
    detailColor: '#4e4f5e',
    eyebrow: { en: 'CLOUDTOPIA · PUBLIC SECTOR', ar: 'الحكومة والقطاع العام' },
    title: {
      en: ['Citizen services', 'people can complete'],
      ar: ['خدمات عامة', 'يمكن إتمامها'],
    },
    detail: {
      en: 'Service portals · Licensing · Cases · Accessibility',
      ar: 'بوابات الخدمات · التراخيص · المعاملات · الإتاحة',
    },
  },
  'real-estate': {
    bg: ['#fbfcf2', '#f2f4dc'],
    panel: ['#1d1f08', '#CBCD30'],
    accent: '#CBCD30',
    pillText: '#1d1f08',
    ink: '#081311',
    detailColor: '#485049',
    eyebrow: { en: 'CLOUDTOPIA · REAL ESTATE', ar: 'العقارات' },
    title: {
      en: ['Property platforms', 'that convert'],
      ar: ['منصات عقارية', 'تحقق النتائج'],
    },
    detail: {
      en: 'Listings · Search · Agent portals · Tours · Management',
      ar: 'العروض · البحث · بوابات الوسطاء · الجولات · الإدارة',
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
        <text x="${rtl ? 968 : 232}" y="95" text-anchor="middle" fill="${cfg.pillText || '#ffffff'}" font-family="Arial, sans-serif" font-weight="700" font-size="15" letter-spacing="1.2" direction="${dir}">${esc(cfg.eyebrow[locale])}</text>
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
