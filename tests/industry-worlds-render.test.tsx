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

function decodeHtml(value: string): string {
  return value
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&amp;', '&')
}

test('the world shell is an RTL, HTML-first document region with stable coordinates', () => {
  const html = renderToStaticMarkup(
    <IndustryPageShell
      locale="ar"
      definition={definition}
      seo={seo}
      schema={schema}
    >
      <section id="clinic-system" aria-labelledby="clinic-system-title">
        <h2 id="clinic-system-title">نظام العيادة</h2>
      </section>
    </IndustryPageShell>,
  )

  assert.equal((html.match(/<main\b/g) || []).length, 0)
  assert.equal((html.match(/<h1\b/g) || []).length, 1)
  assert.match(html, /dir="rtl"/)
  assert.match(html, /href="#clinic-system"/)
  assert.match(html, /data-industry="healthcare"/)
  assert.match(html, /data-locale="ar"/)
  assert.match(html, /href="#industry-world-content"/)
  assert.match(html, /id="industry-world-content"/)
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
