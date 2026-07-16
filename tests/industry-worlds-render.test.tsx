import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { renderToStaticMarkup } from 'react-dom/server'

import {
  IndustryPageShell,
  industryThemeStyle,
} from '../components/industry/detail/IndustryPageShell.tsx'
import { IndustryRelatedLinks } from '../components/industry/detail/IndustryRelatedLinks.tsx'
import { HeroSceneRenderer } from '../components/industry/detail/scenes/HeroSceneRenderer.tsx'
import { PageBreadcrumbs } from '../components/ui/PageBreadcrumbs.tsx'
import type { EffectiveIndustrySeo } from '../lib/industries/resolve-industry-seo.ts'
import type {
  IndustryPageDefinition,
  IndustrySceneId,
  IndustrySection,
  IndustryTheme,
} from '../lib/industries/types.ts'

const theme = {
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
} as const satisfies IndustryTheme

const sections = [
  {
    id: 'clinic-system',
    type: 'system-blueprint',
    variant: 'stacked-layers',
    answers: ['buildable-system'],
    eyebrow: 'نظام قابل للبناء',
    title: 'نظام العيادة',
    intro: 'يربط الطلب بمسؤول واضح وخطوة تالية مرئية.',
    layers: [
      {
        id: 'access',
        label: 'الوصول',
        description: 'تبدأ الرحلة بطلب واضح.',
        inputs: ['طلب المريض'],
        handoff: 'طلب مؤهل',
        outcome: 'خطوة تالية واضحة',
      },
    ],
  },
] as const

type SectionOf<TType extends IndustrySection['type']> = Extract<
  IndustrySection,
  { type: TType }
>

const pressureVariantFixtures = (
  ['split-signal', 'constraints-first', 'dense-ledger'] as const
).map((variant): SectionOf<'pressure-field'> => ({
  id: `pressure-${variant}`,
  type: 'pressure-field',
  variant,
  answers: ['operating-pressure'],
  eyebrow: 'Operating pressure',
  title: `Pressure ${variant}`,
  intro: `Pressure introduction for ${variant}.`,
  signals: [
    {
      id: 'signal-alpha',
      label: 'Signal alpha',
      description: 'A visible pressure signal with an explicit boundary.',
    },
  ],
}))

const journeyVariantFixtures = (
  ['linear-route', 'dual-lane', 'exception-lane'] as const
).map((variant): SectionOf<'journey-map'> => ({
  id: `journey-${variant}`,
  type: 'journey-map',
  variant,
  answers: ['journey'],
  eyebrow: 'Operating journey',
  title: `Journey ${variant}`,
  intro: `Journey introduction for ${variant}.`,
  stages: [
    {
      id: 'stage-request',
      label: 'Request accepted',
      description: 'The request enters an owned route.',
      actor: 'Coordinator',
    },
    {
      id: 'stage-resolution',
      label: 'Next step recorded',
      description: 'The next responsibility remains visible.',
      actor: 'Operator',
    },
  ],
  ...(variant === 'linear-route'
    ? {}
    : {
        lanes: [
          {
            id: 'lane-primary',
            label: 'Primary lane',
            stageIds: ['stage-request'],
          },
          {
            id: 'lane-control',
            label: 'Control lane',
            stageIds: ['stage-resolution'],
          },
        ],
      }),
}))

const systemVariantFixtures = (
  ['stacked-layers', 'constellation', 'service-line'] as const
).map((variant): SectionOf<'system-blueprint'> => ({
  id: `system-${variant}`,
  type: 'system-blueprint',
  variant,
  answers: ['buildable-system'],
  eyebrow: 'System boundary',
  title: `System ${variant}`,
  intro: `System introduction for ${variant}.`,
  layers: [
    {
      id: 'layer-experience',
      label: 'Experience layer',
      description: 'The public experience creates a qualified request.',
      inputs: ['Approved content'],
      handoff: 'Qualified request',
      outcome: 'Visible next step',
    },
  ],
}))

const useCaseVariantFixtures = (
  ['numbered-flow', 'operating-matrix', 'timed-pass'] as const
).map((variant): SectionOf<'use-case-sequence'> => ({
  id: `sequence-${variant}`,
  type: 'use-case-sequence',
  variant,
  answers: ['journey'],
  eyebrow: 'Service sequence',
  title: `Sequence ${variant}`,
  intro: `Sequence introduction for ${variant}.`,
  steps: [
    {
      id: 'step-accept',
      label: 'Accept the request',
      description: 'A named operator accepts the next action.',
      owner: 'Service owner',
    },
  ],
}))

const serviceBridgeVariantFixtures = (
  ['route-links', 'capability-stack'] as const
).map((variant): SectionOf<'service-bridge'> => ({
  id: `services-${variant}`,
  type: 'service-bridge',
  variant,
  answers: [],
  eyebrow: 'Build routes',
  title: `Services ${variant}`,
  intro: `Service introduction for ${variant}.`,
  serviceIds: ['web-applications', 'website-development'],
  serviceAnchors: [
    { serviceId: 'web-applications', label: 'Healthcare web applications' },
    { serviceId: 'website-development', label: 'Healthcare websites' },
  ],
  relatedIndustryIds: ['education', 'government-public-sector'],
  industryAnchors: [
    { industryId: 'education', label: 'Education systems' },
    {
      industryId: 'government-public-sector',
      label: 'Public-sector services',
    },
  ],
}))

const evidenceVariantFixtures = [
  {
    id: 'evidence-verified-project',
    type: 'evidence',
    variant: 'verified-project',
    answers: ['evidence-and-constraints'],
    title: 'Evidence record',
    intro: 'Exact repository evidence fields.',
    projectId: 'kvaii-logistics',
    approval: 'approved',
    provenance: 'CloudTopia project repository',
  },
  {
    id: 'evidence-annotated-model',
    type: 'evidence',
    variant: 'annotated-model',
    answers: ['evidence-and-constraints'],
    title: 'Annotated operating model',
    intro: 'Annotations describe the model without claiming proof.',
    observations: [
      {
        id: 'observation-handoff',
        label: 'Named handoff',
        description: 'A named owner accepts the next step.',
      },
    ],
  },
] as const satisfies readonly SectionOf<'evidence'>[]

const constraintsVariantFixtures = (
  ['boundary-map', 'owner-register'] as const
).map((variant): SectionOf<'constraints'> => ({
  id: `constraints-${variant}`,
  type: 'constraints',
  variant,
  answers: ['evidence-and-constraints'],
  eyebrow: 'Explicit boundaries',
  title: `Constraints ${variant}`,
  intro: `Constraint introduction for ${variant}.`,
  items: [
    {
      id: 'constraint-content',
      label: 'Content ownership',
      responsibility: 'The operator approves domain content.',
      dependency: 'A named content owner.',
      recovery: 'Return the item for review.',
    },
  ],
}))

const regionalVariantFixtures = (
  ['bilingual-operations', 'market-path'] as const
).map((variant): SectionOf<'regional-fit'> => ({
  id: `regional-${variant}`,
  type: 'regional-fit',
  variant,
  answers: ['regional-delivery'],
  eyebrow: 'Regional delivery',
  title: `Regional ${variant}`,
  intro: `Regional introduction for ${variant}.`,
  items: [
    {
      id: 'regional-language',
      label: 'Bilingual operations',
      description: 'English and Arabic content have named owners.',
    },
  ],
}))

const faqVariantFixtures = (
  ['editorial-list', 'grouped-questions'] as const
).map((variant): SectionOf<'faq'> => ({
  id: `faq-${variant}`,
  type: 'faq',
  variant,
  answers: [],
  eyebrow: 'Decision questions',
  title: `FAQ ${variant}`,
  intro: `FAQ introduction for ${variant}.`,
  items: [
    {
      id: 'faq-start',
      question: 'Where should the work begin?',
      answer: 'Begin with one complete operating journey.',
    },
  ],
}))

const closingVariantFixtures = (
  ['framed-close', 'split-close'] as const
).map((variant): SectionOf<'closing-cta'> => ({
  id: `close-${variant}`,
  type: 'closing-cta',
  variant,
  answers: ['decision-close'],
  eyebrow: 'Next decision',
  title: `Close ${variant}`,
  intro: `Closing introduction for ${variant}.`,
  decisionCopy: 'Map one complete journey and its handoffs.',
  primary: {
    label: 'Map the patient journey',
    href: '/api/whatsapp?locale=en',
  },
  secondary: {
    label: 'Explore web applications',
    serviceId: 'web-applications',
  },
}))

const standardVariantFixtures = [
  ...pressureVariantFixtures,
  ...journeyVariantFixtures,
  ...systemVariantFixtures,
  ...useCaseVariantFixtures,
  ...serviceBridgeVariantFixtures,
  ...evidenceVariantFixtures,
  ...constraintsVariantFixtures,
  ...regionalVariantFixtures,
  ...faqVariantFixtures,
  ...closingVariantFixtures,
] as const satisfies readonly IndustrySection[]

const definition = {
  slug: 'healthcare',
  contentVersion: 'render-fixture-v1',
  world: {
    id: 'clinical-pulse',
    theme,
    heroScene: 'healthcare-pulse',
    heroTreatment: 'corridor-split',
    signatureComposition: {
      id: 'continuity-of-care',
      name: { en: 'Continuity of care', ar: 'استمرارية الرعاية' },
      sectionIds: ['clinic-system'],
    },
  },
  assets: [{ kind: 'authored-scene', id: 'healthcare-pulse' }],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'Healthcare systems',
        description: 'A visible healthcare systems description.',
      },
      breadcrumbLabel: 'Healthcare',
      hero: {
        worldLabel: 'Clinical Pulse',
        eyebrow: 'Healthcare',
        h1: 'Make the next patient step clear.',
        intro: 'Map one patient journey before choosing the system boundary.',
        primaryCta: {
          label: 'Map the patient journey',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore web applications',
          serviceId: 'web-applications',
        },
        sceneSummary: 'A patient and staff route converges at care moments.',
        sceneStages: [
          { id: 'discover', label: 'Discover' },
          { id: 'booking', label: 'Booking', state: 'CRM' },
          { id: 'visit', label: 'Visit' },
          { id: 'follow-up', label: 'Follow-up' },
        ],
      },
      sections,
    },
    ar: {
      seo: {
        title: 'أنظمة الرعاية الصحية',
        description: 'وصف ظاهر لأنظمة الرعاية الصحية.',
      },
      breadcrumbLabel: 'الرعاية الصحية',
      hero: {
        worldLabel: 'نبض الرعاية',
        eyebrow: 'الرعاية الصحية',
        h1: 'اجعل الخطوة التالية للمريض أكثر وضوحاً.',
        intro: 'نرسم رحلة المريض أولاً ثم نحدد حدود النظام ومسؤولياته.',
        primaryCta: {
          label: 'لنرسم رحلة المريض',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشف تطبيقات الويب',
          serviceId: 'web-applications',
        },
        sceneSummary: 'مسارا المريض والفريق يلتقيان عند لحظات الرعاية.',
        sceneStages: [
          { id: 'discover', label: 'الاكتشاف' },
          { id: 'booking', label: 'الحجز', state: 'CRM' },
          { id: 'visit', label: 'الزيارة' },
          { id: 'follow-up', label: 'المتابعة' },
        ],
      },
      sections,
    },
  },
} as const satisfies IndustryPageDefinition

const seo = {
  locale: 'ar',
  title: definition.locales.ar.seo.title,
  description: definition.locales.ar.seo.description,
  canonical: 'https://cloudtopia.net/ar/industries/healthcare',
  languages: {
    en: 'https://cloudtopia.net/industries/healthcare',
    ar: 'https://cloudtopia.net/ar/industries/healthcare',
    'x-default': 'https://cloudtopia.net/industries/healthcare',
  },
  index: true,
  follow: true,
  ogImages: [],
} satisfies EffectiveIndustrySeo

const schema = {
  '@context': 'https://schema.org',
  '@graph': [{ '@type': 'WebPage', name: seo.title }],
}

const englishSeo = {
  ...seo,
  locale: 'en',
  title: definition.locales.en.seo.title,
  description: definition.locales.en.seo.description,
  canonical: 'https://cloudtopia.net/industries/healthcare',
} satisfies EffectiveIndustrySeo

function definitionWithEnglishSections(
  nextSections: readonly IndustrySection[],
): IndustryPageDefinition {
  return {
    ...definition,
    locales: {
      ...definition.locales,
      en: {
        ...definition.locales.en,
        sections: nextSections,
      },
    },
  }
}

function renderEnglishSections(nextSections: readonly IndustrySection[]): string {
  return renderToStaticMarkup(
    <IndustryPageShell
      locale="en"
      definition={definitionWithEnglishSections(nextSections)}
      seo={englishSeo}
      schema={schema}
    />,
  )
}

function concreteSectionCopy(section: IndustrySection): string {
  switch (section.type) {
    case 'pressure-field':
      return section.signals[0]?.description ?? ''
    case 'journey-map':
      return section.stages[0]?.description ?? ''
    case 'system-blueprint':
      return section.layers[0]?.handoff ?? ''
    case 'use-case-sequence':
      return section.steps[0]?.description ?? ''
    case 'service-bridge':
      return section.serviceAnchors[0]?.label ?? ''
    case 'evidence':
      return section.variant === 'verified-project'
        ? section.provenance
        : section.observations[0]?.description ?? ''
    case 'constraints':
      return section.items[0]?.responsibility ?? ''
    case 'regional-fit':
      return section.items[0]?.description ?? ''
    case 'faq':
      return section.items[0]?.answer ?? ''
    case 'closing-cta':
      return section.decisionCopy
    case 'signature':
      return section.intro
    default: {
      const exhaustive: never = section
      return exhaustive
    }
  }
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function decodeHtml(value: string): string {
  return value
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&amp;', '&')
}

for (const section of standardVariantFixtures) {
  test(`${section.type}:${section.variant} renders its complete semantic section`, () => {
    const html = renderEnglishSections([section])
    const sectionOpenTag = html.match(
      new RegExp(`<section[^>]*id="${escapeRegex(section.id)}"[^>]*>`),
    )?.[0]

    assert.ok(sectionOpenTag)
    assert.match(sectionOpenTag, /data-industry="healthcare"/)
    assert.match(sectionOpenTag, /data-locale="en"/)
    assert.match(
      html,
      new RegExp(`<h2[^>]*>${escapeRegex(section.title)}<\\/h2>`),
    )
    assert.match(html, new RegExp(escapeRegex(section.intro)))
    assert.match(
      html,
      new RegExp(`data-section-type="${escapeRegex(section.type)}"`),
    )
    assert.match(
      html,
      new RegExp(`data-section-variant="${escapeRegex(section.variant)}"`),
    )
    assert.match(html, new RegExp(escapeRegex(concreteSectionCopy(section))))
  })
}

function fixtureFor(
  type: IndustrySection['type'],
  variant: string,
): IndustrySection {
  const fixture = standardVariantFixtures.find(
    (section) => section.type === type && section.variant === variant,
  )
  assert.ok(fixture, `missing fixture for ${type}:${variant}`)
  return fixture
}

const releaseARecipes = {
  healthcare: [
    ['pressure-field', 'split-signal'],
    ['journey-map', 'linear-route'],
    ['journey-map', 'dual-lane'],
    ['system-blueprint', 'stacked-layers'],
    ['service-bridge', 'capability-stack'],
    ['constraints', 'boundary-map'],
    ['regional-fit', 'bilingual-operations'],
    ['faq', 'editorial-list'],
    ['closing-cta', 'framed-close'],
  ],
  logistics: [
    ['journey-map', 'linear-route'],
    ['journey-map', 'exception-lane'],
    ['constraints', 'owner-register'],
    ['system-blueprint', 'constellation'],
    ['service-bridge', 'route-links'],
    ['constraints', 'boundary-map'],
    ['regional-fit', 'market-path'],
    ['faq', 'grouped-questions'],
    ['closing-cta', 'split-close'],
  ],
  restaurants: [
    ['pressure-field', 'split-signal'],
    ['use-case-sequence', 'timed-pass'],
    ['pressure-field', 'dense-ledger'],
    ['system-blueprint', 'service-line'],
    ['service-bridge', 'capability-stack'],
    ['constraints', 'boundary-map'],
    ['regional-fit', 'bilingual-operations'],
    ['faq', 'editorial-list'],
    ['closing-cta', 'framed-close'],
  ],
} as const satisfies Record<
  string,
  readonly (readonly [IndustrySection['type'], string])[]
>

for (const [pilot, recipeEntries] of Object.entries(releaseARecipes)) {
  test(`${pilot} preserves its full Release A recipe and coordinate order`, () => {
    const recipe = recipeEntries.map(([type, variant]) =>
      fixtureFor(type, variant),
    )
    const html = renderEnglishSections(recipe)
    let previousSectionIndex = -1
    let previousCoordinateIndex = -1

    for (const section of recipe) {
      const sectionNeedle = `id="${section.id}"`
      const coordinateNeedle = `data-coordinate="${section.id}"`
      const sectionIndex = html.indexOf(sectionNeedle)
      const coordinateIndex = html.indexOf(coordinateNeedle)

      assert.equal(html.split(sectionNeedle).length - 1, 1)
      assert.ok(sectionIndex > previousSectionIndex)
      assert.ok(coordinateIndex > previousCoordinateIndex)
      previousSectionIndex = sectionIndex
      previousCoordinateIndex = coordinateIndex
    }
  })
}

test('journey lane membership follows canonical stage order', () => {
  const journey = {
    ...journeyVariantFixtures[1],
    lanes: [
      {
        id: 'lane-reversed-reference',
        label: 'Referenced lane',
        stageIds: ['stage-resolution', 'stage-request'],
      },
    ],
  } as const satisfies SectionOf<'journey-map'>
  const html = renderEnglishSections([journey])
  const laneStart = html.indexOf('data-lane="lane-reversed-reference"')
  const laneEnd = html.indexOf('</section>', laneStart)
  const laneHtml = html.slice(laneStart, laneEnd)

  assert.ok(laneHtml.indexOf('Request accepted') < laneHtml.indexOf('Next step recorded'))
})

test('service bridges expose localized canonical routes and the post-system consultation', () => {
  const html = renderEnglishSections([serviceBridgeVariantFixtures[0]])

  assert.match(html, /href="\/services\/web-applications"/)
  assert.match(html, /href="\/industries\/education"/)
  assert.match(html, /href="\/api\/whatsapp\?locale=en"/)
  assert.match(html, /data-cta-location="post-system"/)
  assert.match(html, /data-cta-intent="industry-consultation"/)
})

test('FAQ questions and answers remain visible in static HTML', () => {
  const html = renderEnglishSections([faqVariantFixtures[0]])

  assert.match(html, />Where should the work begin\?</)
  assert.match(html, />Begin with one complete operating journey\.</)
  assert.doesNotMatch(html, /<details\b/)
})

test('closing actions expose deterministic location and intent analytics', () => {
  const html = renderEnglishSections([closingVariantFixtures[0]])

  assert.equal((html.match(/data-cta-location="closing"/g) || []).length, 2)
  assert.match(html, /data-cta-intent="industry-consultation"/)
  assert.match(html, /data-cta-intent="service:web-applications"/)
})

test('unapproved verified-project proof is omitted from content and coordinates', () => {
  const approved = evidenceVariantFixtures[0]
  const pending = {
    ...approved,
    id: 'evidence-pending',
    title: 'Pending proof must stay hidden',
    provenance: 'Pending provenance must stay hidden',
    approval: 'pending',
  } as const satisfies SectionOf<'evidence'>
  const rejected = {
    ...approved,
    id: 'evidence-rejected',
    title: 'Rejected proof must stay hidden',
    provenance: 'Rejected provenance must stay hidden',
    approval: 'rejected',
  } as const satisfies SectionOf<'evidence'>
  const html = renderEnglishSections([approved, pending, rejected])

  assert.match(html, /href="#evidence-verified-project"/)
  assert.match(html, /CloudTopia project repository/)
  assert.doesNotMatch(html, /evidence-pending/)
  assert.doesNotMatch(html, /Pending proof must stay hidden/)
  assert.doesNotMatch(html, /Pending provenance must stay hidden/)
  assert.doesNotMatch(html, /evidence-rejected/)
  assert.doesNotMatch(html, /Rejected proof must stay hidden/)
  assert.doesNotMatch(html, /Rejected provenance must stay hidden/)
})

test('the empty Release A signature boundary fails explicitly', () => {
  const signature = {
    id: 'custom-signature',
    type: 'signature',
    variant: 'custom-composition',
    answers: [],
    title: 'Custom signature',
    intro: 'A custom signature cannot render in Release A.',
  } as const satisfies SectionOf<'signature'>

  assert.throws(
    () => renderEnglishSections([signature]),
    /Unregistered industry signature section: custom-signature/,
  )
})

test('Release A variants have controlled CSS treatments', () => {
  const css = readFileSync(
    'components/industry/detail/industry-detail.module.css',
    'utf8',
  )
  const releaseAVariants = [
    'split-signal',
    'dense-ledger',
    'linear-route',
    'dual-lane',
    'exception-lane',
    'stacked-layers',
    'constellation',
    'service-line',
    'timed-pass',
    'route-links',
    'capability-stack',
    'boundary-map',
    'owner-register',
    'bilingual-operations',
    'market-path',
    'editorial-list',
    'grouped-questions',
    'framed-close',
    'split-close',
  ] as const

  for (const variant of releaseAVariants) {
    assert.match(
      css,
      new RegExp(`\\[data-section-variant=['"]${variant}['"]\\]`),
      `missing controlled treatment for ${variant}`,
    )
  }
})

test('the world shell is an RTL, HTML-first document region with stable coordinates', () => {
  const html = renderToStaticMarkup(
    <IndustryPageShell
      locale="ar"
      definition={definition}
      seo={seo}
      schema={schema}
    />,
  )

  assert.equal((html.match(/<main\b/g) || []).length, 0)
  assert.equal((html.match(/<h1\b/g) || []).length, 1)
  assert.match(html, /dir="rtl"/)
  assert.match(html, /href="#clinic-system"/)
  assert.match(html, /data-industry="healthcare"/)
  assert.match(html, /data-locale="ar"/)
  assert.match(html, /href="#industry-world-content"/)
  assert.match(html, /id="industry-world-content"/)
  assert.match(html, /<h2[^>]*>نظام العيادة<\/h2>/)
  assert.match(html, /--iw-canvas:#F3FAF8/)
  assert.match(html, /--iw-focus:#E86262/)
  assert.doesNotMatch(html, /--iw-focus-companion:/)
  assert.match(html, /aria-label="مسار التنقل"/)
  assert.match(html, /href="\/ar\/industries"/)
  assert.match(html, /href="\/api\/whatsapp\?locale=ar"/)
  assert.match(html, /href="\/ar\/services\/web-applications"/)
  assert.match(html, /role="group" aria-label="خطوات المتابعة"/)
  assert.match(html, /<figure/)
  assert.match(html, /<figcaption/)
  assert.match(html, /<bdi dir="ltr">CRM<\/bdi>/)
  assert.match(html, /<bdi dir="ltr">01<\/bdi>/)
  assert.match(html, /<bdi dir="ltr">01 \/<\/bdi>/)
  assert.equal((html.match(/data-header-theme=/g) || []).length, 1)
  assert.match(html, /<section[^>]+data-header-theme="light"/)
  assert.equal((html.match(/application\/ld\+json/g) || []).length, 1)
  assert.match(decodeHtml(html), /"@type":"WebPage"/)
})

test('the theme bridge maps exactly the ten authored color tokens', () => {
  assert.deepEqual(industryThemeStyle(theme), {
    '--iw-canvas': '#F3FAF8',
    '--iw-surface': '#FFFFFF',
    '--iw-surface-raised': '#E4F3F0',
    '--iw-ink': '#0B2B2A',
    '--iw-ink-muted': '#355C59',
    '--iw-accent': '#087F73',
    '--iw-accent-ink': '#FFFFFF',
    '--iw-signal': '#E86262',
    '--iw-line': '#5F918A',
    '--iw-focus': '#E86262',
  })
})

test('typed related links remain ordinary localized anchors', () => {
  const html = renderToStaticMarkup(
    <IndustryRelatedLinks
      locale="ar"
      services={[
        { serviceId: 'web-applications', label: 'تطبيقات ويب للرعاية' },
      ]}
      industries={[
        { industryId: 'education', label: 'التعليم' },
      ]}
    />,
  )

  assert.match(html, /href="\/ar\/services\/web-applications"/)
  assert.match(html, /href="\/ar\/industries\/education"/)
  assert.match(html, /data-service="web-applications"/)
  assert.match(html, /data-related-industry="education"/)
})

test('PageBreadcrumbs localizes its default semantic label and preserves overrides', () => {
  const arabic = renderToStaticMarkup(
    <PageBreadcrumbs locale="ar" items={[{ label: 'القطاعات' }]} />,
  )
  const custom = renderToStaticMarkup(
    <PageBreadcrumbs
      locale="en"
      ariaLabel="Industry trail"
      items={[{ label: 'Industries' }]}
    />,
  )

  assert.match(arabic, /aria-label="مسار التنقل"/)
  assert.match(custom, /aria-label="Industry trail"/)
})

const sceneStages = [
  { id: 'order', label: 'Order', state: 'API' },
  { id: 'exception', label: 'Exception' },
  { id: 'service', label: 'Service' },
  { id: 'proof', label: 'Proof' },
]

for (const [sceneId, sceneNumber] of [
  ['healthcare-pulse', '01'],
  ['logistics-flow', '02'],
  ['restaurant-pass', '03'],
] as const satisfies readonly (readonly [IndustrySceneId, string])[]) {
  test(`${sceneId} renders a visible semantic process`, () => {
    const html = renderToStaticMarkup(
      <HeroSceneRenderer
        sceneId={sceneId}
        locale="en"
        summary="A visible operating process with explicit handoffs."
        stages={sceneStages}
      />,
    )

    assert.match(html, /<figure/)
    assert.match(html, /<figcaption/)
    assert.match(html, /<ol/)
    assert.match(html, /<bdi dir="ltr">API<\/bdi>/)
    assert.match(html, new RegExp(`<bdi dir="ltr">${sceneNumber} \/<\\/bdi>`))
    assert.match(html, /A visible operating process with explicit handoffs\./)
    assert.doesNotMatch(html, /\b\d+\s*(?:min|minute|دقيقة)/iu)
  })
}

test('healthcare lane lists expose localized accessible names', () => {
  const html = renderToStaticMarkup(
    <HeroSceneRenderer
      sceneId="healthcare-pulse"
      locale="en"
      summary="Patient and staff pathways."
      stages={sceneStages}
    />,
  )

  assert.match(html, /<ol[^>]+aria-label="Patient lane"/)
  assert.match(html, /<ol[^>]+aria-label="Staff lane"/)
})

test('healthcare fallback stages are not announced as false convergence moments', () => {
  const html = renderToStaticMarkup(
    <HeroSceneRenderer
      sceneId="healthcare-pulse"
      locale="en"
      summary="Patient and staff pathways."
      stages={sceneStages}
    />,
  )

  assert.equal((html.match(/Shared care moment/g) || []).length, 0)
})

test('restaurant seven-stage pass ends with the operations branch-learning owner', () => {
  const html = renderToStaticMarkup(
    <HeroSceneRenderer
      sceneId="restaurant-pass"
      locale="en"
      summary="A complete service pass."
      stages={[
        { id: 'menu', label: 'Menu' },
        { id: 'order', label: 'Reservation or order' },
        { id: 'routing', label: 'Acceptance and routing' },
        { id: 'preparation', label: 'Preparation' },
        { id: 'handoff', label: 'Table or pickup' },
        { id: 'loyalty', label: 'Feedback and loyalty' },
        { id: 'learning', label: 'Branch learning' },
      ]}
    />,
  )

  assert.match(html, /Operations team \/ branch learning/)
  assert.doesNotMatch(html, /Guest<\/span><span[^>]*>Branch learning/)
})

test('world shell sources preserve server, semantic, motion, and CSS constraints', () => {
  const componentPaths = [
    'components/industry/detail/IndustryPageShell.tsx',
    'components/industry/detail/IndustryHero.tsx',
    'components/industry/detail/IndustryRelatedLinks.tsx',
    'components/industry/detail/IndustrySectionRenderer.tsx',
    'components/industry/detail/sections/PressureFieldSection.tsx',
    'components/industry/detail/sections/JourneyMapSection.tsx',
    'components/industry/detail/sections/SystemBlueprintSection.tsx',
    'components/industry/detail/sections/UseCaseSequenceSection.tsx',
    'components/industry/detail/sections/ServiceBridgeSection.tsx',
    'components/industry/detail/sections/EvidenceSection.tsx',
    'components/industry/detail/sections/ConstraintsSection.tsx',
    'components/industry/detail/sections/RegionalFitSection.tsx',
    'components/industry/detail/sections/FaqSection.tsx',
    'components/industry/detail/sections/ClosingCtaSection.tsx',
    'components/industry/detail/scenes/HeroSceneRenderer.tsx',
    'components/industry/detail/scenes/HealthcarePulseScene.tsx',
    'components/industry/detail/scenes/LogisticsFlowScene.tsx',
    'components/industry/detail/scenes/RestaurantPassScene.tsx',
  ] as const
  const componentSource = componentPaths
    .map((path) => readFileSync(path, 'utf8'))
    .join('\n')
  const shellSource = readFileSync(
    'components/industry/detail/IndustryPageShell.tsx',
    'utf8',
  )
  const shellCss = readFileSync(
    'components/industry/detail/industry-detail.module.css',
    'utf8',
  )
  const sceneCss = readFileSync(
    'components/industry/detail/scenes/industry-scenes.module.css',
    'utf8',
  )
  const cssSource = `${shellCss}\n${sceneCss}`

  assert.doesNotMatch(componentSource, /['"]use client['"]/)
  assert.doesNotMatch(componentSource, /<style(?:\s|>)/)
  assert.doesNotMatch(componentSource, /<canvas(?:\s|>)/)
  assert.doesNotMatch(componentSource, /<video(?:\s|>)/)
  assert.doesNotMatch(componentSource, /(?:bg|text|border)-\[\$\{/)
  assert.doesNotMatch(shellSource, /data-header-theme/)
  assert.equal((cssSource.match(/@keyframes\s+/g) || []).length, 1)
  assert.match(cssSource, /animation:[^;]*(?:[1-8]\d{2}|900)ms[^;]*;/)
  assert.match(cssSource, /@media\s*\(prefers-reduced-motion:\s*reduce\)/)
  assert.match(cssSource, /@media\s*\(forced-colors:\s*active\)/)
  assert.match(cssSource, /\.sceneLine[\s\S]*border-color:\s*CanvasText/)
  assert.match(cssSource, /\.sceneSignal[\s\S]*forced-color-adjust:\s*auto/)
  assert.match(cssSource, /box-shadow:\s*0 0 0 5px var\(--iw-ink\);/)
  assert.doesNotMatch(cssSource, /flex-direction:\s*row-reverse/)
  assert.match(
    shellCss,
    /\.world\[dir='rtl'\]\s*{[^}]*--iw-label-spacing:\s*0;/,
  )
  assert.doesNotMatch(
    cssSource,
    /(?:margin|padding|border)-(?:left|right)|(?:^|[;{\s])(?:left|right):/m,
  )
})
