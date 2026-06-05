import type { AILeadSignal, ChatLocale } from './types.ts'
import { buildWhatsappHandoff, resolveWhatsappContact } from './whatsapp.ts'

const countryPatterns = [
  'Oman',
  'Saudi Arabia',
  'UAE',
  'United Arab Emirates',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Turkey',
  'Türkiye',
  'Iraq',
  'Syria',
  'Jordan',
  'Lebanon',
  'عمان',
  'السعودية',
  'الإمارات',
  'الامارات',
  'قطر',
  'الكويت',
  'البحرين',
  'تركيا',
  'العراق',
  'سوريا',
  'الأردن',
  'الاردن',
  'لبنان',
]

const servicePatterns = [
  'website',
  'landing page',
  'ecommerce',
  'e-commerce',
  'crm',
  'erp',
  'dashboard',
  'portal',
  'web app',
  'automation',
  'chatbot',
  'موقع',
  'متجر',
  'نظام',
  'لوحة',
  'crm',
  'erp',
  'أتمتة',
  'اتمتة',
  'شات بوت',
]

const buyingIntentPatterns = [
  'need',
  'want',
  'build',
  'cost',
  'price',
  'budget',
  'quote',
  'consultation',
  'contact',
  'start',
  'company',
  'أريد',
  'اريد',
  'أحتاج',
  'احتاج',
  'تكلفة',
  'السعر',
  'الميزانية',
  'استشارة',
  'تواصل',
  'شركة',
  'ابدأ',
]

export function detectLanguage(text: string, fallback: ChatLocale = 'unknown'): ChatLocale {
  if (/[\u0600-\u06FF]/.test(text)) return 'ar'
  if (/[a-zA-Z]/.test(text)) return 'en'
  return fallback
}

export function extractLeadSignals(latestMessage: string, locale: ChatLocale, pageUrl?: string | null): AILeadSignal {
  const normalized = latestMessage.toLowerCase()
  const country = countryPatterns.find((item) => normalized.includes(item.toLowerCase())) ?? null
  const serviceMatches = servicePatterns.filter((item) => normalized.includes(item.toLowerCase()))
  const intentMatches = buyingIntentPatterns.filter((item) => normalized.includes(item.toLowerCase()))
  const hasContact = /(\+?\d[\d\s().-]{6,}\d)|([^\s@]+@[^\s@]+\.[^\s@]+)/.test(latestMessage)
  const contact = resolveWhatsappContact({ country, pageUrl })

  let confidence = 0
  if (serviceMatches.length > 0) confidence += 0.35
  if (intentMatches.length > 0) confidence += 0.25
  if (country) confidence += 0.15
  if (hasContact) confidence += 0.15
  if (/budget|price|cost|تكلفة|السعر|الميزانية|\$|usd|ريال|درهم/i.test(latestMessage)) confidence += 0.1
  confidence = Math.min(0.95, Number(confidence.toFixed(2)))

  const serviceInterest = serviceMatches.length > 0 ? summarizeServiceInterest(serviceMatches) : null
  const isPotentialLead = confidence >= 0.45
  const language = locale === 'unknown' ? detectLanguage(latestMessage) : locale
  const whatsapp =
    contact.number && isPotentialLead
      ? buildWhatsappHandoff({
          language,
          country,
          businessType: null,
          serviceNeeded: serviceInterest,
          budgetRange: null,
          timeline: null,
          summary: latestMessage.slice(0, 800),
          pageUrl: pageUrl ?? null,
        })
      : null

  return {
    isPotentialLead,
    confidence,
    serviceInterest,
    country,
    suggestedWhatsappNumber: contact.number ?? whatsapp?.number ?? null,
    whatsappUrl: whatsapp?.url ?? null,
  }
}

function summarizeServiceInterest(matches: string[]) {
  const unique = Array.from(new Set(matches))
  if (unique.some((item) => /crm|erp|نظام/i.test(item))) return 'CRM / ERP / Business system'
  if (unique.some((item) => /dashboard|portal|web app|لوحة/i.test(item))) return 'Web app / dashboard'
  if (unique.some((item) => /automation|chatbot|أتمتة|اتمتة|شات/i.test(item))) return 'AI automation'
  if (unique.some((item) => /ecommerce|e-commerce|متجر/i.test(item))) return 'E-commerce website'
  return 'Website / Digital Presence'
}
