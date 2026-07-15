import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { IndustryPageShell } from '../components/industry/detail/IndustryPageShell.tsx'
import { healthcareDefinition } from '../lib/industries/definitions/healthcare.ts'
import type { Locale } from '../lib/i18n/config.ts'
import type { EffectiveIndustrySeo } from '../lib/industries/resolve-industry-seo.ts'
import {
  validateIndustryPageDefinition,
} from '../lib/industries/validate-industry-pages.ts'
import {
  rhythmFingerprint,
  type IndustryPageDefinition,
  type IndustrySemanticQuestion,
  type IndustrySection,
} from '../lib/industries/types.ts'

const healthcareFingerprint =
  'corridor-split|pressure-field:split-signal|journey-map:linear-route|journey-map:dual-lane|system-blueprint:stacked-layers|service-bridge:capability-stack|constraints:boundary-map|regional-fit:bilingual-operations|faq:editorial-list|closing-cta:framed-close|continuity-of-care'

function effectiveSeo(
  definition: IndustryPageDefinition,
  locale: Locale,
): EffectiveIndustrySeo {
  const alternateLocale = locale === 'en' ? 'ar' : 'en'
  const canonical = locale === 'en'
    ? `https://cloudtopia.net/industries/${definition.slug}`
    : `https://cloudtopia.net/ar/industries/${definition.slug}`
  const alternate = alternateLocale === 'en'
    ? `https://cloudtopia.net/industries/${definition.slug}`
    : `https://cloudtopia.net/ar/industries/${definition.slug}`

  return {
    locale,
    title: definition.locales[locale].seo.title,
    description: definition.locales[locale].seo.description,
    canonical,
    languages: {
      [locale]: canonical,
      [alternateLocale]: alternate,
      'x-default': `https://cloudtopia.net/industries/${definition.slug}`,
    },
    index: true,
    follow: true,
    ogImages: [],
  }
}

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

function assertBilingualRender(definition: IndustryPageDefinition): void {
  for (const locale of ['en', 'ar'] as const) {
    const html = renderToStaticMarkup(
      createElement(IndustryPageShell, {
        locale,
        definition,
        seo: effectiveSeo(definition, locale),
        schema: [],
      }),
    )

    assert.equal((html.match(/<h1\b/gu) ?? []).length, 1)
    assert.equal((html.match(/<main\b/gu) ?? []).length, 0)
    assert.match(html, new RegExp(`data-industry="${definition.slug}"`))
    assert.match(html, new RegExp(`lang|dir="${locale === 'ar' ? 'rtl' : 'ltr'}"`))
    for (const section of definition.locales[locale].sections) {
      assert.match(html, new RegExp(`id="${section.id}"`))
    }
  }
}

test('Healthcare Clinical Pulse is a complete bilingual draft world', () => {
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
    'Digital care that moves with the patient.',
  )
  assert.equal(
    healthcareDefinition.locales.ar.hero.h1,
    'رعاية رقمية تواكب المريض في كل خطوة.',
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
    'Healthcare Digital Systems for Patient Journeys',
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
  assertBilingualRender(healthcareDefinition)
})
