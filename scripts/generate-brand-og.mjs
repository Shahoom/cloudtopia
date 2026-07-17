import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

/**
 * Brand + services-pillar Open Graph card generator (1200×630 en/ar).
 * Same visual language as generate-industry-og.mjs, one brand palette:
 *   - 'default'            -> public/og/default/<locale>.jpg   (site-wide fallback)
 *   - 'services/<slug>'    -> public/og/services/<slug>/<locale>.jpg
 * Run: node scripts/generate-brand-og.mjs [key]   (omit key = all)
 */
const BRAND = {
  bg: ['#f7f7fe', '#eceafc'],
  panel: ['#131129', '#4736b8'],
  accent: '#6d5ce6',
  ink: '#14122b',
  detailColor: '#4b4869',
}

const CONFIGS = {
  default: {
    eyebrow: { en: 'CLOUDTOPIA · DIGITAL & CLOUD', ar: 'تقنيات رقمية وسحابية' },
    title: {
      en: ['Software, cloud & AI', 'for Gulf businesses'],
      ar: ['برمجيات وسحابة وذكاء', 'اصطناعي لأعمال الخليج'],
    },
    detail: {
      en: 'Websites · E-commerce · Systems · Apps · AI',
      ar: 'مواقع · متاجر · أنظمة · تطبيقات · ذكاء اصطناعي',
    },
  },
  'services/website-development': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['Website development', 'built to perform'], ar: ['تطوير مواقع', 'مصممة لتنجز'] },
    detail: { en: 'Bilingual · SEO-ready · RTL-correct · Fast', ar: 'ثنائية اللغة · جاهزة للسيو · دعم كامل للعربية' },
  },
  'services/app-development': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['App development', 'iOS · Android · Cross'], ar: ['تطوير التطبيقات', 'iOS · Android · متعدد المنصات'] },
    detail: { en: 'Design · Build · Launch · Grow', ar: 'تصميم · بناء · إطلاق · نمو' },
  },
  'services/ecommerce-development': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['E-commerce stores', 'built to convert'], ar: ['متاجر إلكترونية', 'مصممة للبيع'] },
    detail: { en: 'Storefronts · Payments · Inventory · Growth', ar: 'المتاجر · المدفوعات · المخزون · النمو' },
  },
  'services/business-systems-development': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['Business systems', 'that fit your work'], ar: ['أنظمة أعمال', 'مفصّلة على عملك'] },
    detail: { en: 'ERP · CRM · Operations · Reporting', ar: 'ERP · CRM · العمليات · التقارير' },
  },
  'services/business-management-systems': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['Management systems', 'for daily operations'], ar: ['أنظمة إدارة', 'للعمليات اليومية'] },
    detail: { en: 'HR · Inventory · Finance · Projects', ar: 'الموارد البشرية · المخزون · المالية · المشاريع' },
  },
  'services/business-process-automation': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['Process automation', 'that removes busywork'], ar: ['أتمتة العمليات', 'توفّر الجهد المتكرر'] },
    detail: { en: 'Workflows · Integrations · APIs · Bots', ar: 'سير العمل · التكاملات · الواجهات البرمجية' },
  },
  'services/custom-erp-crm-solutions': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['Custom ERP & CRM', 'owned by you'], ar: ['أنظمة ERP وCRM', 'مخصصة ومملوكة لك'] },
    detail: { en: 'Sales · Pipelines · Operations · Data', ar: 'المبيعات · خطوط البيع · العمليات · البيانات' },
  },
  'services/social-media-marketing': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['Social media marketing', 'with real outcomes'], ar: ['تسويق عبر السوشيال', 'بنتائج ملموسة'] },
    detail: { en: 'Strategy · Content · Ads · Reporting', ar: 'استراتيجية · محتوى · إعلانات · تقارير' },
  },
  'services/search-engine-optimization': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['SEO that earns', 'durable traffic'], ar: ['تحسين محركات البحث', 'لزيارات مستدامة'] },
    detail: { en: 'Technical · On-page · Authority · Bilingual', ar: 'تقني · على الصفحة · موثوقية · ثنائي اللغة' },
  },
  'services/answer-engine-optimization': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['AEO — get cited', 'by AI answers'], ar: ['AEO — كن مصدر', 'إجابات الذكاء الاصطناعي'] },
    detail: { en: 'Structure · Schema · Authority', ar: 'بنية · بيانات مهيكلة · موثوقية' },
  },
  'services/generative-engine-optimization': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['GEO — surface inside', 'AI results'], ar: ['GEO — اظهر داخل', 'نتائج الذكاء الاصطناعي'] },
    detail: { en: 'Entities · Content · Recommendations', ar: 'الكيانات · المحتوى · التوصيات' },
  },
  'services/ui-ux-design-branding': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['UI/UX & branding', 'users trust'], ar: ['تصميم واجهات وهوية', 'يثق بها المستخدم'] },
    detail: { en: 'Design systems · Interfaces · Identity', ar: 'أنظمة تصميم · واجهات · هوية بصرية' },
  },
  'services/content-creation': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['Content that sells', 'in two languages'], ar: ['محتوى يبيع', 'بلغتين'] },
    detail: { en: 'Copy · Video · Photography · Campaigns', ar: 'نصوص · فيديو · تصوير · حملات' },
  },
  'services/web-applications': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['Web applications', 'from MVP to scale'], ar: ['تطبيقات ويب', 'من الفكرة إلى النمو'] },
    detail: { en: 'SaaS · Portals · Dashboards · APIs', ar: 'SaaS · بوابات · لوحات تحكم · واجهات' },
  },
  'services/digital-presence': {
    eyebrow: { en: 'CLOUDTOPIA · SERVICES', ar: 'خدمات كلاود توبيا' },
    title: { en: ['A digital presence', 'that gets found'], ar: ['حضور رقمي', 'يصل إليه عملاؤك'] },
    detail: { en: 'Web · SEO · Social · Content', ar: 'الويب · السيو · السوشيال · المحتوى' },
  },
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const root = process.cwd()
const requested = process.argv[2]
const keys = requested ? [requested] : Object.keys(CONFIGS)

for (const key of keys) {
  const cfg = CONFIGS[key]
  if (!cfg) {
    console.error(`No OG config for "${key}" — add one to generate-brand-og.mjs`)
    process.exitCode = 1
    continue
  }
  const outputRoot = join(root, 'public/og', key)
  await mkdir(outputRoot, { recursive: true })

  for (const locale of ['en', 'ar']) {
    const rtl = locale === 'ar'
    const dir = rtl ? 'rtl' : 'ltr'
    const textX = rtl ? 1128 : 72
    const titleSize = rtl ? 52 : 46
    const t = cfg.title[locale]
    const panelRight = !rtl

    const svg = Buffer.from(`
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BRAND.bg[0]}"/><stop offset="1" stop-color="${BRAND.bg[1]}"/></linearGradient>
          <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BRAND.panel[0]}"/><stop offset="1" stop-color="${BRAND.panel[1]}"/></linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)"/>
        <path d="M${panelRight ? 760 : 0} 0 H${panelRight ? 1200 : 440} V630 H${panelRight ? 900 : 0} C${panelRight ? 800 : 340} 430 ${panelRight ? 820 : 340} 200 ${panelRight ? 760 : 440} 0Z" fill="url(#panel)"/>
        <circle cx="${panelRight ? 1010 : 190}" cy="150" r="230" fill="#ffffff" opacity="0.06"/>
        <circle cx="${panelRight ? 1090 : 110}" cy="520" r="180" fill="${BRAND.accent}" opacity="0.18"/>
        <rect x="${rtl ? 808 : 72}" y="70" width="320" height="38" rx="19" fill="${BRAND.accent}"/>
        <text x="${rtl ? 968 : 232}" y="95" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-weight="700" font-size="15" letter-spacing="1.2" direction="${dir}">${esc(cfg.eyebrow[locale])}</text>
        <text x="${textX}" y="200" text-anchor="start" fill="${BRAND.ink}" font-family="Arial, sans-serif" font-weight="800" font-size="${titleSize}" direction="${dir}" unicode-bidi="embed">
          <tspan x="${textX}" dy="0">${esc(t[0])}</tspan>
          <tspan x="${textX}" dy="66">${esc(t[1])}</tspan>
        </text>
        <rect x="${rtl ? 608 : 72}" y="360" width="520" height="2" fill="${BRAND.accent}" opacity="0.7"/>
        <text x="${textX}" y="410" text-anchor="start" fill="${BRAND.detailColor}" font-family="Arial, sans-serif" font-weight="600" font-size="22" direction="${dir}" unicode-bidi="embed">${esc(cfg.detail[locale])}</text>
        <g transform="translate(${rtl ? 1090 : 72} 500)">
          <circle cx="24" cy="24" r="24" fill="${BRAND.ink}"/>
          <path d="M13 24h22M24 13v22" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
          <text x="${rtl ? -18 : 63}" y="33" text-anchor="${rtl ? 'end' : 'start'}" fill="${BRAND.ink}" font-family="Arial, sans-serif" font-size="30" font-weight="800">CloudTopia</text>
        </g>
        <rect x="0" y="616" width="1200" height="14" fill="${BRAND.accent}"/>
      </svg>
    `)

    await sharp(svg)
      .resize(1200, 630)
      .jpeg({ quality: 90, progressive: true, chromaSubsampling: '4:4:4' })
      .toFile(join(outputRoot, `${locale}.jpg`))
    console.log(`wrote public/og/${key}/${locale}.jpg`)
  }
}