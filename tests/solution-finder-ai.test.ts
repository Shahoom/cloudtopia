import assert from 'node:assert/strict'
import test from 'node:test'
import { AIChatLeads } from '../collections/AIChatLeads.ts'
import { SolutionFinderLeads } from '../collections/SolutionFinderLeads.ts'
import { generateRecommendation } from '../components/solution-finder/recommendationEngine.ts'
import {
  getBusinessGoalOptionsForIndustry,
  getProjectTypeOptionsForIndustry,
} from '../components/solution-finder/solutionFinderData.ts'
import { deriveSolutionFinderCountryHint } from '../lib/solution-finder/countryHint.ts'
import { buildAIRecommendationRequestPayload, buildFallbackAIRecommendation, normalizeAIRecommendation } from '../lib/solution-finder/aiRecommendation.ts'
import { buildSolutionFinderLead } from '../lib/solution-finder/leadService.ts'

test('solution finder leads are grouped with chatbot leads in Payload CRM', () => {
  assert.equal(AIChatLeads.admin?.group, 'CRM')
  assert.equal(SolutionFinderLeads.slug, 'solution-finder-leads')
  assert.equal(SolutionFinderLeads.admin?.group, 'CRM')
})

test('builds a Payload-ready solution finder lead from wizard and recommendation data', () => {
  const lead = buildSolutionFinderLead({
    name: 'Sara',
    phone: '+968 9000 0000',
    email: 'SARA@Example.COM',
    country: 'Oman',
    industry: 'healthcare',
    projectType: 'web-application',
    businessGoal: 'manage-clients',
    budget: '3000-7000',
    timeline: '1-3-months',
    recommendedPackage: 'Clinic Digital Presence Package',
    recommendedRoute: '/services/web-applications',
    locale: 'en',
    source: 'solution-finder',
  })

  assert.equal(lead.name, 'Sara')
  assert.equal(lead.email, 'sara@example.com')
  assert.equal(lead.source, 'solution-finder')
  assert.equal(lead.status, 'new')
  assert.equal(lead.recommendedPackage, 'Clinic Digital Presence Package')
})

test('fallback AI recommendation returns localized roadmap details without API access', () => {
  const fallback = buildFallbackAIRecommendation({
    locale: 'ar',
    deterministicRecommendation: {
      packageTitle: 'نظام CRM للعيادات',
      personalizedIntro: 'توصية أساسية',
      recommendedServices: ['CRM', 'لوحة تحكم'],
      keyFeatures: ['متابعة العملاء', 'تقارير'],
      deliveryApproach: 'نبدأ بالنطاق الأساسي.',
      estimatedTimeline: 'من شهر إلى 3 أشهر',
      budgetRange: 'من 3,000 إلى 7,000 دولار',
    },
    answers: {
      country: 'Oman',
      industry: 'healthcare',
      projectType: 'crm-system',
      businessGoal: 'manage-clients',
    },
  })

  assert.equal(fallback.source, 'fallback')
  assert.match(fallback.summary, /نظام CRM للعيادات/)
  assert.ok(fallback.roadmap.length >= 3)
  assert.ok(fallback.nextQuestions.length >= 3)
})

test('normalizes incomplete AI recommendation payloads', () => {
  const normalized = normalizeAIRecommendation(
    {
      summary: 'Short summary',
      roadmap: ['Discovery'],
    },
    buildFallbackAIRecommendation({
      locale: 'en',
      deterministicRecommendation: {
        packageTitle: 'Web App',
        personalizedIntro: 'Fallback intro',
        recommendedServices: ['Dashboard'],
        keyFeatures: ['Reports'],
        deliveryApproach: 'Start small.',
        estimatedTimeline: '1 month',
        budgetRange: '$1,000 - $3,000',
      },
      answers: {},
    }),
  )

  assert.equal(normalized.summary, 'Short summary')
  assert.ok(normalized.roadmap.length >= 3)
  assert.ok(normalized.nextQuestions.length >= 3)
})

test('healthcare choices narrow project type and business goal logic', () => {
  const healthcareProjects = getProjectTypeOptionsForIndustry('healthcare').map((option) => option.id)
  assert.deepEqual(healthcareProjects, [
    'business-website',
    'web-application',
    'crm-system',
    'mobile-app',
    'ai-automation',
    'not-sure',
  ])
  assert.ok(!healthcareProjects.includes('digital-growth'))
  assert.ok(!healthcareProjects.includes('cloud-infrastructure'))

  const healthcareMobileGoals = getBusinessGoalOptionsForIndustry('healthcare', 'mobile-app').map((option) => option.id)
  assert.ok(healthcareMobileGoals.includes('manage-clients'))
  assert.ok(healthcareMobileGoals.includes('launch-product'))
  assert.ok(!healthcareMobileGoals.includes('sell-online'))
})

test('healthcare mobile app recommendation stays industry-specific', () => {
  const recommendation = generateRecommendation(
    {
      industry: 'healthcare',
      projectType: 'mobile-app',
      businessGoal: 'manage-clients',
      description: 'We need a patient app for appointment booking, reminders, doctor profiles, and follow-up messages.',
    },
    'en',
  )

  assert.equal(recommendation.templateId, 'healthcare-mobile-app')
  assert.match(recommendation.packageTitle, /Clinic|Patient|Healthcare/i)
  assert.doesNotMatch(recommendation.packageTitle, /Startup/i)
})

test('solution finder country hint comes from headers or landing page URL', () => {
  assert.equal(
    deriveSolutionFinderCountryHint({
      headerCountryCode: 'OM',
      pageUrl: 'https://cloudtopia.co/services/web-applications',
    }),
    'Oman',
  )

  assert.equal(
    deriveSolutionFinderCountryHint({
      pageUrl: 'https://cloudtopia.co/ar/saudi-arabia?utm_source=test',
    }),
    'Saudi Arabia',
  )
})

test('AI recommendation request payload carries labels description and country context', () => {
  const requestPayload = buildAIRecommendationRequestPayload({
    locale: 'en',
    deterministicRecommendation: {
      packageTitle: 'Clinic Patient App Package',
      personalizedIntro: 'Healthcare mobile app intro.',
      recommendedServices: ['Patient Mobile App', 'Clinic Admin Dashboard'],
      keyFeatures: ['Appointment booking', 'Patient reminders'],
      deliveryApproach: 'Start with the booking flow.',
      estimatedTimeline: '1 - 3 months',
      budgetRange: '$3,000 - $7,000',
    },
    answers: {
      country: 'Oman',
      industry: 'healthcare',
      projectType: 'mobile-app',
      businessGoal: 'manage-clients',
      budget: '3000-7000',
      timeline: '1-3-months',
      description: 'We need booking, reminders, doctor profiles, patient follow-up, and a clinic dashboard.',
    },
  })

  assert.equal(requestPayload.market.country, 'Oman')
  assert.equal(requestPayload.selectedAnswers.industry.label, 'Healthcare & Clinics')
  assert.equal(requestPayload.selectedAnswers.projectType.label, 'Mobile App')
  assert.equal(requestPayload.projectDescription.hasDescription, true)
  assert.match(requestPayload.projectDescription.summary, /booking/)
  assert.deepEqual(requestPayload.projectDescription.detectedNeeds.slice(0, 3), ['booking', 'reminders', 'dashboard'])
})

test('Payload CRM lead stores expanded AI recommendation fields', () => {
  const lead = buildSolutionFinderLead(
    {
      name: 'Sara',
      phone: '+968 9000 0000',
      country: 'Oman',
      industry: 'healthcare',
      projectType: 'mobile-app',
      businessGoal: 'manage-clients',
      recommendedPackage: 'Clinic Patient App Package',
      locale: 'en',
      source: 'solution-finder',
    },
    {
      source: 'fallback',
      summary: 'Clinic app summary',
      roadmap: ['Scope', 'Build', 'Launch'],
      nextQuestions: ['Question?'],
      countryAdvice: 'Oman-specific patient UX.',
      budgetAdvice: 'Keep phase one focused.',
      whatsappOpening: 'Hello CloudTopia, I want a clinic app.',
    },
  )

  assert.equal(lead.aiSource, 'fallback')
  assert.equal(lead.aiCountryAdvice, 'Oman-specific patient UX.')
  assert.equal(lead.aiBudgetAdvice, 'Keep phase one focused.')
  assert.equal(lead.aiWhatsappOpening, 'Hello CloudTopia, I want a clinic app.')
  assert.match(lead.selectedAnswerSummary, /healthcare/)
})
