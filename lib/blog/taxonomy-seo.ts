type TaxonomyLocale = 'en' | 'ar' | string

type BaseTaxonomyInput = {
  locale: TaxonomyLocale
  slug: string
  name: string
}

export type CategoryTaxonomyInput = BaseTaxonomyInput & {
  description?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
}

export type TagTaxonomyInput = BaseTaxonomyInput & {
  postCount: number
}

export type TaxonomyCopy = {
  title: string
  description: string
  intro: string
}

const ECOMMERCE_CATEGORY: Record<'en' | 'ar', TaxonomyCopy> = {
  en: {
    title: 'E-Commerce Strategy & Growth Articles',
    description:
      'E-commerce strategy articles for Gulf businesses covering store planning, payments, conversion, operations, and sustainable online growth.',
    intro:
      'Explore e-commerce strategy for businesses selling across Oman and the Gulf. This editorial collection covers store planning, local payment methods, product discovery, conversion, fulfilment, platform decisions, and the operating systems behind sustainable online growth. Use it to compare approaches, understand commercial trade-offs, and connect customer experience decisions with the technology required to run a dependable store.',
  },
  ar: {
    title: 'مقالات استراتيجية ونمو التجارة الإلكترونية',
    description:
      'مقالات استراتيجية للتجارة الإلكترونية في الخليج تغطي تخطيط المتجر والمدفوعات والتحويل والعمليات والنمو المستدام عبر الإنترنت.',
    intro:
      'استكشف استراتيجيات التجارة الإلكترونية للشركات التي تبيع في عُمان والخليج. تجمع هذه الصفحة مقالات حول تخطيط المتجر، ووسائل الدفع المحلية، واكتشاف المنتجات، وتحسين التحويل، والتنفيذ والعمليات، واختيار المنصة المناسبة. استخدم هذا المحتوى لمقارنة الخيارات وفهم القرارات التجارية وربط تجربة العميل بالتقنيات اللازمة لتشغيل متجر موثوق وقابل للنمو.',
  },
}

const ECOMMERCE_TAG: Record<'en' | 'ar', TaxonomyCopy> = {
  en: {
    title: 'E-Commerce Development Guides',
    description:
      'Focused e-commerce development guides covering platforms, integrations, performance, payments, and practical implementation decisions.',
    intro:
      'Browse focused e-commerce development guides for teams planning or improving an online store. These resources concentrate on implementation: platform selection, payment and shipping integrations, storefront performance, product data, analytics, and maintainable architecture. They are designed to help business and technical teams turn requirements into a clear build plan while avoiding fragile integrations and unnecessary platform constraints.',
  },
  ar: {
    title: 'أدلة تطوير التجارة الإلكترونية',
    description:
      'أدلة مركزة لتطوير التجارة الإلكترونية تغطي المنصات والتكاملات والأداء والمدفوعات وقرارات التنفيذ العملية.',
    intro:
      'تصفّح أدلة مركزة لتطوير المتاجر الإلكترونية للفرق التي تخطط لإطلاق متجر أو تحسين متجر قائم. تركز هذه الموارد على التنفيذ: اختيار المنصة، وربط الدفع والشحن، وتحسين أداء الواجهة، وتنظيم بيانات المنتجات، والتحليلات، والبنية القابلة للصيانة. تساعد الأدلة الفرق التجارية والتقنية على تحويل المتطلبات إلى خطة بناء واضحة وتجنب التكاملات الهشة والقيود غير الضرورية.',
  },
}

function activeLocale(locale: TaxonomyLocale): 'en' | 'ar' {
  return locale === 'ar' ? 'ar' : 'en'
}

export function buildCategoryTaxonomyCopy(input: CategoryTaxonomyInput): TaxonomyCopy {
  const locale = activeLocale(input.locale)
  const special = input.slug === 'e-commerce' ? ECOMMERCE_CATEGORY[locale] : null

  if (locale === 'ar') {
    const fallbackDescription = `مقالات ورؤى حول ${input.name} تساعد الشركات في عُمان والخليج على فهم الخيارات، واتخاذ قرارات أوضح، وربط الاستراتيجية بالتنفيذ.`
    const fallbackIntro = `تجمع صفحة ${input.name} مقالات استراتيجية وأدلة عملية للشركات في عُمان والخليج. يغطي المحتوى القرارات الأساسية، والخيارات التقنية والتجارية، وأثرها على تجربة العميل والعمليات والنمو. ابدأ بالمقالات الأقرب إلى هدفك، ثم انتقل إلى الأدلة المرتبطة لفهم البدائل والتكاليف والمخاطر وخطوات التنفيذ قبل اختيار الحل المناسب لفريقك.`

    return {
      title: input.metaTitle || special?.title || `استراتيجيات ورؤى ${input.name}`,
      description: input.metaDescription || special?.description || input.description || fallbackDescription,
      intro: input.description || special?.intro || fallbackIntro,
    }
  }

  const fallbackDescription = `${input.name} strategy and practical insights for businesses in Oman and the Gulf, connecting commercial decisions with clear implementation guidance.`
  const fallbackIntro = `${input.name} is an editorial hub for businesses in Oman and across the Gulf. It brings together strategic articles and practical guidance on the decisions, technology, operations, and customer experience behind this topic. Start with the article closest to your goal, then follow the related resources to compare options, understand costs and risks, and prepare a clearer implementation brief for your team.`

  return {
    title: input.metaTitle || special?.title || `${input.name} Strategy & Insights`,
    description: input.metaDescription || special?.description || input.description || fallbackDescription,
    intro: input.description || special?.intro || fallbackIntro,
  }
}

export function buildTagTaxonomyCopy(input: TagTaxonomyInput): TaxonomyCopy {
  const locale = activeLocale(input.locale)
  const special = input.slug === 'e-commerce' ? ECOMMERCE_TAG[locale] : null

  if (locale === 'ar') {
    const description = `موارد وأدلة عملية حول ${input.name} للشركات في عُمان والخليج، مع تركيز على قرارات التنفيذ والتقنيات والنتائج التشغيلية.`
    const intro = `تجمع صفحة ${input.name} موارد مركزة ومقالات تطبيقية مرتبطة بهذا الموضوع. استخدمها لفهم متطلبات التنفيذ، ومقارنة الأساليب والأدوات، ومعرفة الأسئلة التي يجب طرحها قبل بدء المشروع. يربط كل دليل بين احتياجات الأعمال والقرارات التقنية حتى يتمكن فريقك من تحديد نطاق أوضح، وتجنب التعقيد غير الضروري، والانتقال من الفكرة إلى خطة قابلة للتنفيذ.`

    return {
      title: special?.title || `موارد وأدلة ${input.name}`,
      description: special?.description || description,
      intro: special?.intro || intro,
    }
  }

  const description = `${input.name} resources and practical implementation guides for Gulf businesses, covering technical choices, delivery considerations, and business outcomes.`
  const intro = `This ${input.name} collection brings together focused resources and implementation-oriented articles. Use it to understand delivery requirements, compare approaches and tools, and identify the questions worth answering before a project begins. Each guide connects business needs with technical decisions so your team can define a clearer scope, avoid unnecessary complexity, and move from an initial idea to a practical plan.`

  return {
    title: special?.title || `${input.name} Resources & Implementation Guides`,
    description: special?.description || description,
    intro: special?.intro || intro,
  }
}
