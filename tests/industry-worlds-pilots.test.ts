import assert from 'node:assert/strict'
import test from 'node:test'

import { healthcareDefinition } from '../lib/industries/definitions/healthcare.ts'
import { logisticsSupplyChainDefinition } from '../lib/industries/definitions/logistics-supply-chain.ts'
import { restaurantsDefinition } from '../lib/industries/definitions/restaurants.ts'
import { validateIndustryPageDefinition } from '../lib/industries/validate-industry-pages.ts'
import {
  rhythmFingerprint,
  type IndustryPageDefinition,
  type IndustrySemanticQuestion,
  type IndustrySection,
} from '../lib/industries/types.ts'

// Healthcare keeps a full spec-lock: it is the reference world every other
// Industry World is patterned on, so its identity, rhythm, and copy rules are
// pinned exactly. Logistics and Restaurants were deliberately rebuilt from
// their supplied templates, so their volatile content (world id, theme, hero,
// section ids, fingerprint) is no longer pinned — the house copy rules and
// draft contract below still guard them, and
// `industry-worlds-foundation.test.ts` validates all thirteen worlds against
// the complete draft contract together.
const healthcareFingerprint =
  'corridor-split|pressure-field:split-signal|journey-map:linear-route|journey-map:dual-lane|system-blueprint:stacked-layers|service-bridge:capability-stack|constraints:boundary-map|regional-fit:bilingual-operations|faq:editorial-list|closing-cta:framed-close|continuity-of-care'

function assertSemanticAnswersOnce(definition: IndustryPageDefinition): void {
  const expected = [
    'operating-pressure',
    'journey',
    'buildable-system',
    'evidence-and-constraints',
    'regional-delivery',
    'decision-close',
  ] as const satisfies readonly Exclude<
    IndustrySemanticQuestion,
    'sector-promise'
  >[]

  for (const locale of ['en', 'ar'] as const) {
    const answers = definition.locales[locale].sections.flatMap(
      (section) => section.answers,
    )
    for (const answer of expected) {
      assert.equal(
        answers.filter((candidate) => candidate === answer).length,
        1,
        `${definition.slug}/${locale} must answer ${answer} exactly once`,
      )
    }
  }
}

test('Healthcare Clinical Pulse is a complete bilingual published world', () => {
  assert.equal(healthcareDefinition.slug, 'healthcare')
  assert.equal(healthcareDefinition.world.id, 'clinical-pulse')
  assert.deepEqual(healthcareDefinition.world.theme, {
    canvas: '#F3FAF8',
    surface: '#FFFFFF',
    elevatedSurface: '#E4F3F0',
    ink: '#0B2B2A',
    mutedInk: '#355C59',
    accent: '#087F73',
    accentInk: '#FFFFFF',
    signal: '#E86262',
    line: '#5F918A',
    focus: '#E86262',
    displayTreatment: 'clinical',
    radiusMode: 'soft',
    motifDensity: 'quiet',
    sceneTreatment: 'pulse-corridor',
  })
  assert.equal(healthcareDefinition.locales.en.hero.worldLabel, 'Clinical Pulse')
  assert.equal(healthcareDefinition.locales.ar.hero.worldLabel, 'نبض الرعاية')
  assert.equal(
    healthcareDefinition.locales.en.hero.h1,
    'Healthcare digital systems that move with the patient.',
  )
  assert.equal(
    healthcareDefinition.locales.ar.hero.h1,
    'أنظمة الرعاية الصحية الرقمية التي تواكب المريض.',
  )
  assert.equal(
    healthcareDefinition.locales.en.hero.primaryCta.label,
    'Map your patient journey',
  )
  assert.equal(
    healthcareDefinition.locales.ar.hero.primaryCta.label,
    'لنرسم رحلة المريض لديكم',
  )
  assert.equal(
    healthcareDefinition.locales.en.seo.title,
    'Healthcare Digital Systems & Patient Journeys',
  )
  assert.equal(
    healthcareDefinition.locales.ar.seo.title,
    'حلول رقمية للرعاية الصحية ورحلة المريض',
  )

  const expectedSectionIds = [
    'health-access-pressure',
    'patient-journey',
    'continuity-of-care',
    'clinic-system',
    'healthcare-service-paths',
    'privacy-role-boundaries',
    'regional-care-delivery',
    'healthcare-faq',
    'healthcare-consultation',
  ]
  assert.deepEqual(
    healthcareDefinition.locales.en.sections.map((section) => section.id),
    expectedSectionIds,
  )
  assert.deepEqual(
    healthcareDefinition.locales.ar.sections.map((section) => section.id),
    expectedSectionIds,
  )
  assert.equal(rhythmFingerprint(healthcareDefinition), healthcareFingerprint)

  const serviceBridge = healthcareDefinition.locales.en.sections.find(
    (section) => section.type === 'service-bridge',
  )
  assert.ok(serviceBridge)
  assert.deepEqual(serviceBridge.serviceIds, [
    'website-development',
    'web-applications',
    'business-systems-development',
    'content-creation',
  ])
  assert.deepEqual(serviceBridge.relatedIndustryIds, [
    'education',
    'government-public-sector',
  ])

  for (const locale of ['en', 'ar'] as const) {
    const page = healthcareDefinition.locales[locale]
    const faq = page.sections.find((section) => section.type === 'faq')
    assert.ok(faq)
    assert.equal(faq.items.length, 5)
    assert.equal(
      (page.sections as readonly IndustrySection[]).some(
        (section) => section.type === 'signature',
      ),
      false,
    )
    const visibleCopy = JSON.stringify(page)
    assert.doesNotMatch(
      visibleCopy,
      /\b(?:secure|compliant|real-time|innovative|seamless|cutting-edge)\b/iu,
    )
  }

  assertSemanticAnswersOnce(healthcareDefinition)
  assert.deepEqual(
    validateIndustryPageDefinition(healthcareDefinition, { mode: 'draft' }),
    { ok: true, errors: [] },
  )
})

test('Logistics & Supply Chain is a complete bilingual published world', () => {
  assert.equal(logisticsSupplyChainDefinition.slug, 'logistics-supply-chain')
  assert.equal(logisticsSupplyChainDefinition.publicationStatus, 'published')

  for (const locale of ['en', 'ar'] as const) {
    const page = logisticsSupplyChainDefinition.locales[locale]
    const copy = JSON.stringify(page)
    // House style: no unqualified latency promises, no fabricated metrics.
    assert.doesNotMatch(copy, /real-time/iu)
    assert.doesNotMatch(copy, /\b\d+\s*(?:minutes?|mins?|%)/iu)
    const faq = page.sections.find((section) => section.type === 'faq')
    assert.ok(faq)
    assert.ok(faq.items.length >= 4)
  }

  assertSemanticAnswersOnce(logisticsSupplyChainDefinition)
  assert.deepEqual(
    validateIndustryPageDefinition(logisticsSupplyChainDefinition, {
      mode: 'draft',
    }),
    { ok: true, errors: [] },
  )
})

test('Restaurants is a complete bilingual published world', () => {
  assert.equal(restaurantsDefinition.slug, 'restaurants')
  assert.equal(restaurantsDefinition.publicationStatus, 'published')

  for (const locale of ['en', 'ar'] as const) {
    const page = restaurantsDefinition.locales[locale]
    const copy = JSON.stringify(page)
    assert.doesNotMatch(copy, /\b\d+\s*(?:minutes?|mins?|%)/iu)
    assert.doesNotMatch(copy, /\b(?:instant|real-time)\b/iu)
    const faq = page.sections.find((section) => section.type === 'faq')
    assert.ok(faq)
    assert.ok(faq.items.length >= 4)
  }

  assertSemanticAnswersOnce(restaurantsDefinition)
  assert.deepEqual(
    validateIndustryPageDefinition(restaurantsDefinition, { mode: 'draft' }),
    { ok: true, errors: [] },
  )
})
