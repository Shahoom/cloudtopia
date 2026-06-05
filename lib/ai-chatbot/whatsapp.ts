import type { AILeadInput, ChatLocale, WhatsappContact } from './types.ts'

const DEFAULT_TURKEY_WHATSAPP = '905011511116'
const DEFAULT_OMAN_WHATSAPP = '96895886393'

const gccCountryPatterns = [
  'oman',
  'saudi',
  'saudi arabia',
  'uae',
  'united arab emirates',
  'qatar',
  'kuwait',
  'bahrain',
  'gcc',
  'gulf',
  'عمان',
  'السعودية',
  'سعودية',
  'الإمارات',
  'الامارات',
  'قطر',
  'الكويت',
  'البحرين',
  'الخليج',
]

const turkeyRegionPatterns = [
  'turkey',
  'türkiye',
  'turkiye',
  'iraq',
  'syria',
  'jordan',
  'lebanon',
  'تركيا',
  'العراق',
  'سوريا',
  'الأردن',
  'الاردن',
  'لبنان',
]

const gccUrlPatterns = [
  '/ar/sa',
  '/saudi-arabia',
  '/ar/ae',
  '/uae',
  '/united-arab-emirates',
  '/ar/om',
  '/oman',
  '/ar/qa',
  '/qatar',
  '/ar/kw',
  '/kuwait',
  '/ar/bh',
  '/bahrain',
]

const turkeyUrlPatterns = ['/turkey', '/tr', '/ar/tr', '/iraq', '/syria', '/jordan', '/lebanon']

export function getCloudTopiaWhatsappNumbers() {
  return {
    turkey: normalizePhone(process.env.NEXT_PUBLIC_CLOUDTOPIA_TR_WHATSAPP) || DEFAULT_TURKEY_WHATSAPP,
    oman: normalizePhone(process.env.NEXT_PUBLIC_CLOUDTOPIA_OMAN_WHATSAPP) || DEFAULT_OMAN_WHATSAPP,
  }
}

export function normalizePhone(value: string | null | undefined) {
  return value?.replace(/[^\d]/g, '') || ''
}

export function resolveWhatsappContact({
  country,
  pageUrl,
}: {
  country?: string | null
  pageUrl?: string | null
}): WhatsappContact {
  const numbers = getCloudTopiaWhatsappNumbers()
  const normalizedCountry = country?.toLowerCase().trim() || ''
  const normalizedUrl = pageUrl?.toLowerCase() || ''

  if (gccCountryPatterns.some((pattern) => normalizedCountry.includes(pattern))) {
    return { number: numbers.oman, region: 'oman' }
  }

  if (turkeyRegionPatterns.some((pattern) => normalizedCountry.includes(pattern))) {
    return { number: numbers.turkey, region: 'turkey' }
  }

  if (gccUrlPatterns.some((pattern) => normalizedUrl.includes(pattern))) {
    return { number: numbers.oman, region: 'oman' }
  }

  if (turkeyUrlPatterns.some((pattern) => normalizedUrl.includes(pattern))) {
    return { number: numbers.turkey, region: 'turkey' }
  }

  return { number: null, region: 'unknown' }
}

export function buildWhatsappHandoff(
  lead: Pick<
    AILeadInput,
    'country' | 'businessType' | 'serviceNeeded' | 'budgetRange' | 'timeline' | 'pageUrl' | 'language'
  > & {
    summary: string
  },
) {
  const contact = resolveWhatsappContact({ country: lead.country, pageUrl: lead.pageUrl })
  const number = contact.number || getCloudTopiaWhatsappNumbers().oman
  const message = buildWhatsappMessage(lead)

  return {
    number,
    region: contact.region,
    message,
    url: `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
  }
}

function display(value: string | null | undefined, locale: ChatLocale) {
  if (value?.trim()) return value.trim()
  return locale === 'ar' ? 'غير مذكور' : 'Not provided'
}

export function buildWhatsappMessage(
  lead: Pick<
    AILeadInput,
    'country' | 'businessType' | 'serviceNeeded' | 'budgetRange' | 'timeline' | 'language'
  > & {
    summary: string
  },
) {
  const locale = lead.language === 'ar' ? 'ar' : 'en'

  if (locale === 'ar') {
    return [
      'مرحبًا CloudTopia، أريد الاستفسار عن خدمة:',
      '',
      `نوع المشروع: ${display(lead.serviceNeeded, locale)}`,
      `الدولة: ${display(lead.country, locale)}`,
      `نوع النشاط: ${display(lead.businessType, locale)}`,
      `الميزانية التقريبية: ${display(lead.budgetRange, locale)}`,
      `الوقت المتوقع للبدء: ${display(lead.timeline, locale)}`,
      '',
      'ملخص الطلب:',
      lead.summary.trim(),
    ].join('\n')
  }

  return [
    'Hello CloudTopia, I want to ask about:',
    '',
    `Project type: ${display(lead.serviceNeeded, locale)}`,
    `Country: ${display(lead.country, locale)}`,
    `Business type: ${display(lead.businessType, locale)}`,
    `Estimated budget: ${display(lead.budgetRange, locale)}`,
    `Timeline: ${display(lead.timeline, locale)}`,
    '',
    'Request summary:',
    lead.summary.trim(),
  ].join('\n')
}
