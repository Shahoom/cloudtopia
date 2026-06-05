import assert from 'node:assert/strict'
import test from 'node:test'
import { extractLeadSignals } from '../lib/ai-chatbot/leadExtractor.ts'
import { resolveChatLocale } from '../lib/ai-chatbot/locale.ts'
import { createMemoryRateLimiter } from '../lib/ai-chatbot/rateLimit.ts'
import { retrieveKnowledge } from '../lib/ai-chatbot/retrieveKnowledge.ts'
import { buildWhatsappHandoff, resolveWhatsappContact } from '../lib/ai-chatbot/whatsapp.ts'

test('uses the site locale before the typed message language', () => {
  assert.equal(resolveChatLocale({ siteLocale: 'ar', latestMessage: 'I need a company website' }), 'ar')
  assert.equal(resolveChatLocale({ siteLocale: 'en', latestMessage: 'أحتاج موقع لشركتي' }), 'en')
  assert.equal(resolveChatLocale({ siteLocale: 'unknown', latestMessage: 'أحتاج موقع لشركتي' }), 'ar')
})

test('routes GCC visitors to the Oman WhatsApp number from country text', () => {
  const contact = resolveWhatsappContact({ country: 'Saudi Arabia', pageUrl: null })

  assert.equal(contact.number, '96895886393')
  assert.equal(contact.region, 'oman')
})

test('routes Turkey-region visitors from page URL when country is unknown', () => {
  const contact = resolveWhatsappContact({ country: null, pageUrl: 'https://cloudtopia.net/ar/tr/services' })

  assert.equal(contact.number, '905011511116')
  assert.equal(contact.region, 'turkey')
})

test('builds localized WhatsApp handoff messages with encoded lead details', () => {
  const handoff = buildWhatsappHandoff({
    language: 'en',
    country: 'Oman',
    businessType: 'Clinic',
    serviceNeeded: 'CRM',
    budgetRange: '$2,000-$5,000',
    timeline: 'This month',
    summary: 'Needs patient follow-up workflow.',
    pageUrl: null,
  })

  assert.equal(handoff.number, '96895886393')
  assert.match(decodeURIComponent(handoff.url), /Project type: CRM/)
  assert.match(decodeURIComponent(handoff.url), /Request summary:\nNeeds patient follow-up workflow\./)
})

test('extracts buying intent and contact routing hints from mixed project messages', () => {
  const lead = extractLeadSignals(
    'I need a custom ERP dashboard in Oman. Budget is around 3000 USD and we want to start next month.',
    'en',
    '/services/business-systems-development',
  )

  assert.equal(lead.isPotentialLead, true)
  assert.equal(lead.country, 'Oman')
  assert.equal(lead.suggestedWhatsappNumber, '96895886393')
  assert.match(lead.serviceInterest ?? '', /ERP|dashboard/i)
  assert.ok(lead.confidence >= 0.6)
  assert.ok(lead.whatsappUrl?.startsWith('https://wa.me/96895886393?text='))
})

test('selects local knowledge according to pricing and lead intent keywords', async () => {
  const knowledge = await retrieveKnowledge({
    latestMessage: 'How much does a CRM cost for a company in Saudi Arabia?',
    pageUrl: '/ar/sa/services/crm-development',
  })

  assert.match(knowledge, /CloudTopia Services/)
  assert.match(knowledge, /Country Contact Routing/)
  assert.match(knowledge, /Pricing Rules/)
  assert.match(knowledge, /Lead Qualification/)
})

test('adds site-generated country and service knowledge from SEO data', async () => {
  const knowledge = await retrieveKnowledge({
    latestMessage: 'I need CRM and payment integration for Saudi Arabia',
    pageUrl: '/ar/sa/services/crm-development',
  })

  assert.match(knowledge, /CloudTopia Country Intelligence/)
  assert.match(knowledge, /Saudi Arabia/)
  assert.match(knowledge, /SAR/)
  assert.match(knowledge, /Mada/)
  assert.match(knowledge, /CloudTopia Service Intelligence/)
  assert.match(knowledge, /CRM Development/)
  assert.match(knowledge, /تطوير أنظمة CRM/)
})

test('includes location-only country knowledge when no landing page exists', async () => {
  const knowledge = await retrieveKnowledge({
    latestMessage: 'We need an ecommerce website in Egypt with local payments',
    pageUrl: '/services/ecommerce-website-development',
  })

  assert.match(knowledge, /Egypt/)
  assert.match(knowledge, /EGP/)
  assert.match(knowledge, /Fawry/)
  assert.match(knowledge, /Vodafone Cash/)
})

test('memory rate limiter enforces minute and hour windows independently', () => {
  const limiter = createMemoryRateLimiter({
    minuteLimit: 2,
    hourLimit: 3,
    now: () => 1_000,
  })

  assert.equal(limiter.check('visitor-1').allowed, true)
  assert.equal(limiter.check('visitor-1').allowed, true)
  const minuteLimited = limiter.check('visitor-1')
  assert.equal(minuteLimited.allowed, false)
  assert.equal(minuteLimited.reason, 'minute')

  const hourlyLimiter = createMemoryRateLimiter({
    minuteLimit: 10,
    hourLimit: 2,
    now: () => 1_000,
  })

  assert.equal(hourlyLimiter.check('visitor-2').allowed, true)
  assert.equal(hourlyLimiter.check('visitor-2').allowed, true)
  const hourLimited = hourlyLimiter.check('visitor-2')
  assert.equal(hourLimited.allowed, false)
  assert.equal(hourLimited.reason, 'hour')
})
