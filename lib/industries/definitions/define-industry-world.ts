import type { Locale } from '@/lib/i18n/config'
import { industryManifest } from '@/lib/industries/manifest'
import type { CanonicalServiceId } from '@/lib/industries/service-targets'
import type { IndustrySlug } from '@/lib/industries/slugs'
import type {
  IndustryPageDefinition,
  IndustrySceneId,
  IndustrySection,
  IndustrySectionVariant,
  IndustryTheme,
} from '@/lib/industries/types'
import { industries } from '@/lib/seo/industries'

export type LocalizedCopy = Readonly<Record<Locale, string>>

export type IndustryWorldStage = {
  id: string
  label: LocalizedCopy
  description?: LocalizedCopy
  state?: LocalizedCopy
}

export type IndustryWorldSectionKey =
  | 'pressure'
  | 'journey'
  | 'signature-journey'
  | 'sequence'
  | 'system'
  | 'evidence'
  | 'constraints'
  | 'services'
  | 'regional'
  | 'faq'
  | 'close'

type IndustryWorldRhythm = {
  pressure: IndustrySectionVariant<'pressure-field'>
  journey: IndustrySectionVariant<'journey-map'>
  signatureJourney?: IndustrySectionVariant<'journey-map'>
  sequence?: IndustrySectionVariant<'use-case-sequence'>
  system: IndustrySectionVariant<'system-blueprint'>
  services: IndustrySectionVariant<'service-bridge'>
  constraints: IndustrySectionVariant<'constraints'>
  regional: IndustrySectionVariant<'regional-fit'>
  faq: IndustrySectionVariant<'faq'>
  close: IndustrySectionVariant<'closing-cta'>
}

export type IndustryWorldConfig = {
  slug: IndustrySlug
  worldId: string
  worldName: LocalizedCopy
  signatureId: string
  signatureName: LocalizedCopy
  signatureCarrier: IndustryWorldSectionKey
  theme: IndustryTheme
  heroScene: IndustrySceneId
  heroTreatment: IndustryPageDefinition['world']['heroTreatment']
  eyebrow: LocalizedCopy
  promise: LocalizedCopy
  sceneSummary: LocalizedCopy
  stages: readonly [
    IndustryWorldStage,
    IndustryWorldStage,
    IndustryWorldStage,
    ...IndustryWorldStage[],
  ]
  primaryCta: LocalizedCopy
  secondaryCta: LocalizedCopy
  primaryService: CanonicalServiceId
  guardrails: readonly [LocalizedCopy, LocalizedCopy, LocalizedCopy]
  extraFaqs: readonly [
    { question: LocalizedCopy; answer: LocalizedCopy },
    { question: LocalizedCopy; answer: LocalizedCopy },
  ]
  rhythm: IndustryWorldRhythm
  journeyCarrier?: 'journey' | 'signature-journey' | 'sequence'
  evidenceCarrier?: 'evidence' | 'constraints'
  includeEvidence?: boolean
  order: readonly IndustryWorldSectionKey[]
}

const serviceLabels: Record<CanonicalServiceId, LocalizedCopy> = {
  'digital-presence': {
    en: 'Digital presence systems',
    ar: 'أنظمة الحضور الرقمي',
  },
  'website-development': {
    en: 'Websites and landing pages',
    ar: 'المواقع وصفحات الهبوط',
  },
  'ecommerce-development': {
    en: 'E-commerce development',
    ar: 'تطوير التجارة الإلكترونية',
  },
  'web-applications': {
    en: 'Web applications and portals',
    ar: 'تطبيقات الويب والبوابات',
  },
  'business-systems-development': {
    en: 'Business systems development',
    ar: 'تطوير أنظمة الأعمال',
  },
  'app-development': {
    en: 'Mobile application development',
    ar: 'تطوير تطبيقات الجوال',
  },
  'social-media-marketing': {
    en: 'Social media marketing',
    ar: 'التسويق عبر التواصل الاجتماعي',
  },
  'content-creation': {
    en: 'Bilingual content systems',
    ar: 'أنظمة المحتوى ثنائي اللغة',
  },
  'restaurant-qr-menu': {
    en: 'Restaurant QR menu systems',
    ar: 'أنظمة قوائم ⁨QR⁩ للمطاعم',
  },
}

const protectedLtrToken = /(?<!\u2068)\b(CRM|ERP|API|POS|TMS|WMS|SLA|QR|KYC|AML|VAT|PMS|RFI|ROI)\b(?!\u2069)/gu

function localize(value: LocalizedCopy, locale: Locale): string {
  const copy = value[locale]
  return locale === 'ar'
    ? copy.replace(protectedLtrToken, '\u2068$1\u2069')
    : copy
}

function sectionId(slug: IndustrySlug, key: IndustryWorldSectionKey): string {
  return `${slug}-${key}`
}

function stageDescription(
  config: IndustryWorldConfig,
  stage: IndustryWorldStage,
  locale: Locale,
): string {
  if (stage.description) return localize(stage.description, locale)

  return locale === 'ar'
    ? `تتحول مرحلة «${localize(stage.label, locale)}» إلى حالة واضحة بمالك وخطوة تالية ضمن ${localize(config.worldName, locale)}.`
    : `${localize(stage.label, locale)} becomes a visible state with an owner and a next action inside ${localize(config.worldName, locale)}.`
}

function buildSections(
  config: IndustryWorldConfig,
  locale: Locale,
): readonly IndustrySection[] {
  const industry = industries[config.slug]
  const manifest = industryManifest[config.slug]
  const name = localize(industry.name, locale)
  const worldName = localize(config.worldName, locale)
  const journeyCarrier = config.journeyCarrier ?? 'journey'
  const evidenceCarrier = config.evidenceCarrier ?? 'constraints'
  const answers = (
    key: IndustryWorldSectionKey,
    semantic: 'journey' | 'evidence-and-constraints',
  ) => {
    const carrier = semantic === 'journey' ? journeyCarrier : evidenceCarrier
    return carrier === key ? [semantic] as const : []
  }

  const sections: Partial<Record<IndustryWorldSectionKey, IndustrySection>> = {
    pressure: {
      id: sectionId(config.slug, 'pressure'),
      type: 'pressure-field',
      variant: config.rhythm.pressure,
      answers: ['operating-pressure'],
      eyebrow: locale === 'ar' ? 'مجال الضغط' : 'Operating pressure',
      title: locale === 'ar'
        ? `نقاط الاحتكاك التي تبطئ رحلة ${name}`
        : `The friction slowing the ${name} journey`,
      intro: locale === 'ar'
        ? `يبدأ ${worldName} من المشكلات التي يراها العميل والفريق كل يوم، لا من قائمة مزايا منفصلة.`
        : `${worldName} starts with the problems customers and operators meet every day, not an isolated feature list.`,
      signals: industry.problems.map((problem, index) => ({
        id: `pressure-${index + 1}`,
        label: locale === 'ar' ? `إشارة ${index + 1}` : `Signal ${index + 1}`,
        description: localize(problem, locale),
      })),
    },
    journey: {
      id: sectionId(config.slug, 'journey'),
      type: 'journey-map',
      variant: config.rhythm.journey,
      answers: answers('journey', 'journey'),
      eyebrow: locale === 'ar' ? 'خريطة الرحلة' : 'Journey map',
      title: locale === 'ar'
        ? `الرحلة التشغيلية وراء ${worldName}`
        : `The operating journey behind ${worldName}`,
      intro: locale === 'ar'
        ? 'كل مرحلة لها حالة مرئية وتسليم واضح، حتى لا تضيع الرحلة بين القنوات والفرق.'
        : 'Every stage has a visible state and an explicit handoff, so the journey does not disappear between channels and teams.',
      stages: config.stages.map((stage) => ({
        id: stage.id,
        label: localize(stage.label, locale),
        description: stageDescription(config, stage, locale),
      })),
    },
    system: {
      id: sectionId(config.slug, 'system'),
      type: 'system-blueprint',
      variant: config.rhythm.system,
      answers: ['buildable-system'],
      eyebrow: locale === 'ar' ? 'مخطط النظام' : 'System blueprint',
      title: locale === 'ar'
        ? `طبقات قابلة للبناء لقطاع ${name}`
        : `Buildable layers for ${name}`,
      intro: locale === 'ar'
        ? 'يحوّل المخطط احتياجات القطاع إلى واجهات وبيانات ومسؤوليات وتسليمات يمكن تحديد نطاقها.'
        : 'The blueprint turns sector needs into interfaces, data, responsibilities, and handoffs that can be scoped.',
      layers: industry.useCases.map((useCase, index) => ({
        id: `layer-${index + 1}`,
        label: localize(useCase.title, locale),
        description: localize(useCase.description, locale),
        inputs: [
          locale === 'ar' ? 'مدخلات معتمدة' : 'Approved inputs',
          locale === 'ar' ? 'صلاحيات واضحة' : 'Defined access',
        ],
        handoff: locale === 'ar'
          ? `تسليم موثق إلى المرحلة ${Math.min(index + 2, industry.useCases.length)}`
          : `Documented handoff to layer ${Math.min(index + 2, industry.useCases.length)}`,
        outcome: locale === 'ar'
          ? `نتيجة مرئية: ${localize(useCase.title, locale)}`
          : `Visible outcome: ${localize(useCase.title, locale)}`,
      })),
    },
    evidence: {
      id: sectionId(config.slug, 'evidence'),
      type: 'evidence',
      variant: 'annotated-model',
      answers: answers('evidence', 'evidence-and-constraints'),
      eyebrow: locale === 'ar' ? 'نموذج قابل للمراجعة' : 'Reviewable model',
      title: locale === 'ar'
        ? `ما الذي يجب أن يثبته نموذج ${worldName}`
        : `What the ${worldName} model must prove`,
      intro: locale === 'ar'
        ? 'هذه ملاحظات على نموذج تشغيلي مقترح، وليست ادعاءات عن نتائج عميل أو أرقام أداء.'
        : 'These are annotations on a proposed operating model, not claims about client outcomes or performance figures.',
      observations: industry.useCases.slice(0, 3).map((useCase, index) => ({
        id: `observation-${index + 1}`,
        label: localize(useCase.title, locale),
        description: localize(useCase.description, locale),
      })),
    },
    constraints: {
      id: sectionId(config.slug, 'constraints'),
      type: 'constraints',
      variant: config.rhythm.constraints,
      answers: answers('constraints', 'evidence-and-constraints'),
      eyebrow: locale === 'ar' ? 'الحدود والمسؤوليات' : 'Boundaries and ownership',
      title: locale === 'ar'
        ? `حدود تحافظ على مصداقية ${worldName}`
        : `Boundaries that keep ${worldName} credible`,
      intro: locale === 'ar'
        ? 'توضح هذه الحدود ما يملكه النظام، وما يعتمد على مصدر خارجي، وكيف تتم معالجة الاستثناءات.'
        : 'These boundaries state what the system owns, what depends on an external source, and how exceptions are recovered.',
      items: config.guardrails.map((guardrail, index) => ({
        id: `constraint-${index + 1}`,
        label: locale === 'ar' ? `حد ${index + 1}` : `Boundary ${index + 1}`,
        responsibility: localize(guardrail, locale),
        dependency: locale === 'ar'
          ? 'يتطلب مصدراً معتمداً ومالكاً واضحاً قبل الإطلاق.'
          : 'Requires an approved source and a named owner before launch.',
        recovery: locale === 'ar'
          ? 'يُحوّل الاستثناء إلى مراجعة بشرية مع حالة مرئية.'
          : 'Route exceptions to human review with a visible status.',
      })),
    },
    services: {
      id: sectionId(config.slug, 'services'),
      type: 'service-bridge',
      variant: config.rhythm.services,
      answers: [],
      eyebrow: locale === 'ar' ? 'مسارات البناء' : 'Build paths',
      title: locale === 'ar'
        ? `الخدمات التي تبني ${worldName}`
        : `Services that build ${worldName}`,
      intro: locale === 'ar'
        ? 'اربطوا الرحلة بمسار تنفيذ محدد، مع انتقال واضح إلى القطاعات المجاورة عند الحاجة.'
        : 'Connect the journey to a defined delivery path, with clear routes into adjacent industries where useful.',
      serviceIds: manifest.serviceIds,
      serviceAnchors: manifest.serviceIds.map((serviceId) => ({
        serviceId,
        label: localize(serviceLabels[serviceId], locale),
      })),
      relatedIndustryIds: manifest.relatedIndustryIds,
      industryAnchors: manifest.relatedIndustryIds.map((industryId) => ({
        industryId,
        label: localize(industryManifest[industryId].label, locale),
      })),
    },
    regional: {
      id: sectionId(config.slug, 'regional'),
      type: 'regional-fit',
      variant: config.rhythm.regional,
      answers: ['regional-delivery'],
      eyebrow: locale === 'ar' ? 'الملاءمة الإقليمية' : 'Regional delivery',
      title: locale === 'ar'
        ? `${worldName} بالعربية والإنجليزية من البداية`
        : `${worldName}, designed for Arabic and English from day one`,
      intro: locale === 'ar'
        ? 'تُصمم اللغة والاتجاه والمحتوى والتسليم التشغيلي كمسار واحد للأسواق الخليجية.'
        : 'Language, direction, content, and operating handoffs are designed as one path for GCC markets.',
      items: [
        {
          id: 'bilingual-content',
          label: locale === 'ar' ? 'محتوى ثنائي اللغة' : 'Bilingual content',
          description: locale === 'ar'
            ? `صياغة عربية وإنجليزية مستقلة لرحلة ${name}، مع واجهات تراعي اتجاه القراءة.`
            : `Independently authored Arabic and English copy for the ${name} journey, with direction-aware interfaces.`,
        },
        {
          id: 'market-dependencies',
          label: locale === 'ar' ? 'اعتماديات السوق' : 'Market dependencies',
          description: locale === 'ar'
            ? 'تُراجع متطلبات الدفع والبيانات والتكامل والسياسات بحسب السوق قبل تثبيت النطاق.'
            : 'Payment, data, integration, and policy requirements are checked market by market before scope is fixed.',
        },
        {
          id: 'phased-rollout',
          label: locale === 'ar' ? 'إطلاق مرحلي' : 'Phased rollout',
          description: locale === 'ar'
            ? 'يمكن إطلاق المسار الأعلى أولوية أولاً ثم توسيع الفروع والأدوار والتكاملات.'
            : 'The highest-priority path can launch first, then expand across branches, roles, and integrations.',
        },
      ],
    },
    faq: {
      id: sectionId(config.slug, 'faq'),
      type: 'faq',
      variant: config.rhythm.faq,
      answers: [],
      eyebrow: locale === 'ar' ? 'أسئلة تحديد النطاق' : 'Scoping questions',
      title: locale === 'ar'
        ? `أسئلة قبل بناء ${worldName}`
        : `Questions to answer before building ${worldName}`,
      intro: locale === 'ar'
        ? 'توضح الإجابات نقطة البداية والاعتماديات وما ينبغي أن يبقى تحت مراجعة الفريق.'
        : 'The answers clarify the starting point, dependencies, and what must stay under team review.',
      items: [...industry.faqs, ...config.extraFaqs].map((faq, index) => ({
        id: `faq-${index + 1}`,
        question: localize(faq.question, locale),
        answer: localize(faq.answer, locale),
      })),
    },
    close: {
      id: sectionId(config.slug, 'close'),
      type: 'closing-cta',
      variant: config.rhythm.close,
      answers: ['decision-close'],
      eyebrow: locale === 'ar' ? 'قرار الخطوة التالية' : 'Choose the next step',
      title: locale === 'ar'
        ? `حوّلوا ${worldName} إلى نطاق عمل واضح`
        : `Turn ${worldName} into a clear project scope`,
      intro: locale === 'ar'
        ? 'ابدؤوا برحلة واحدة ذات أولوية، ثم حددوا البيانات والمالكين والتكاملات المطلوبة.'
        : 'Start with one priority journey, then define the data, owners, and integrations it requires.',
      decisionCopy: locale === 'ar'
        ? `سنراجع رحلة ${name} الحالية ونحوّلها إلى مخطط تنفيذ وحدود قرار واضحة.`
        : `We will review the current ${name} journey and turn it into an implementation map with clear decision boundaries.`,
      primary: {
        label: localize(config.primaryCta, locale),
        href: `/api/whatsapp?locale=${locale}`,
      },
      secondary: {
        label: localize(config.secondaryCta, locale),
        serviceId: config.primaryService,
      },
    },
  }

  if (config.rhythm.signatureJourney) {
    sections['signature-journey'] = {
      id: sectionId(config.slug, 'signature-journey'),
      type: 'journey-map',
      variant: config.rhythm.signatureJourney,
      answers: answers('signature-journey', 'journey'),
      eyebrow: locale === 'ar' ? 'التكوين المميز' : 'Signature composition',
      title: localize(config.signatureName, locale),
      intro: locale === 'ar'
        ? `يعيد هذا المنظور قراءة مراحل ${worldName} عبر مسارين مترابطين دون إخفاء المحتوى.`
        : `This view reads the ${worldName} stages through two connected lanes without hiding content.`,
      stages: config.stages.map((stage) => ({
        id: stage.id,
        label: localize(stage.label, locale),
        description: stageDescription(config, stage, locale),
      })),
      lanes: [
        {
          id: 'experience-lane',
          label: locale === 'ar' ? 'مسار التجربة' : 'Experience lane',
          stageIds: config.stages.map((stage) => stage.id),
        },
        {
          id: 'operations-lane',
          label: locale === 'ar' ? 'مسار التشغيل' : 'Operations lane',
          stageIds: config.stages.map((stage) => stage.id),
        },
      ],
    }
  }

  if (config.rhythm.sequence) {
    sections.sequence = {
      id: sectionId(config.slug, 'sequence'),
      type: 'use-case-sequence',
      variant: config.rhythm.sequence,
      answers: answers('sequence', 'journey'),
      eyebrow: locale === 'ar' ? 'التكوين المميز' : 'Signature composition',
      title: localize(config.signatureName, locale),
      intro: locale === 'ar'
        ? `يحوّل هذا التسلسل ${worldName} إلى خطوات يراها العميل ويملكها الفريق.`
        : `This sequence turns ${worldName} into customer-visible steps with explicit operational ownership.`,
      steps: config.stages.map((stage, index) => ({
        id: stage.id,
        label: localize(stage.label, locale),
        description: stageDescription(config, stage, locale),
        owner: locale === 'ar' ? `مالك المرحلة ${index + 1}` : `Stage ${index + 1} owner`,
      })),
    }
  }

  return config.order.flatMap((key) => {
    const section = sections[key]
    return section ? [section] : []
  })
}

export function defineIndustryWorld(
  config: IndustryWorldConfig,
): IndustryPageDefinition {
  const industry = industries[config.slug]

  const localizedPage = (locale: Locale) => ({
    seo: {
      title: locale === 'ar'
        ? `أنظمة رقمية لقطاع ${localize(industry.name, locale)} | كلاود توبيا`
        : `${localize(industry.name, locale)} Digital Systems | CloudTopia`,
      description: localize(industry.description, locale),
    },
    breadcrumbLabel: localize(industry.name, locale),
    hero: {
      worldLabel: localize(config.worldName, locale),
      eyebrow: localize(config.eyebrow, locale),
      h1: localize(config.promise, locale),
      intro: localize(industry.description, locale),
      primaryCta: {
        label: localize(config.primaryCta, locale),
        href: `/api/whatsapp?locale=${locale}` as const,
      },
      secondaryCta: {
        label: localize(config.secondaryCta, locale),
        serviceId: config.primaryService,
      },
      sceneSummary: localize(config.sceneSummary, locale),
      sceneStages: config.stages.map((stage) => ({
        id: stage.id,
        label: localize(stage.label, locale),
        ...(stage.state ? { state: localize(stage.state, locale) } : {}),
      })),
    },
    sections: buildSections(config, locale),
  })

  return {
    slug: config.slug,
    contentVersion: '2026.07-worlds-b',
    updatedAt: '2026-07-16',
    world: {
      id: config.worldId,
      theme: config.theme,
      heroScene: config.heroScene,
      heroTreatment: config.heroTreatment,
      signatureComposition: {
        id: config.signatureId,
        name: config.signatureName,
        sectionIds: [sectionId(config.slug, config.signatureCarrier)],
      },
    },
    assets: [{ kind: 'authored-scene', id: config.heroScene }],
    claims: [],
    locales: {
      en: localizedPage('en'),
      ar: localizedPage('ar'),
    },
  }
}
