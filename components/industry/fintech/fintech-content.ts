import type { Locale } from '@/lib/i18n/config'

/**
 * Bilingual microcopy for the ported Paynext sections that are NOT driven by
 * the IndustryPageDefinition (hero, service-bridge, and FAQ come from the
 * definition). Arabic is authored MSA — the brand reads كلاود توبيا in prose.
 *
 * Framing: CloudTopia ENGINEERS fintech systems. Stats are structural facts
 * about the approach and this page (languages, delivery stages, build paths,
 * owned handoffs) — never fabricated performance or client-outcome metrics.
 */

type FintechCard = {
  id: string
  title: string
  subtitle: string
  image: string
  width: number
  height: number
}

export type FintechFeatureCard = {
  id: string
  title: string
  subtitle: string
  layout: 'single' | 'single-accent' | 'stack'
  image?: string
  width?: number
  height?: number
  accent?: string
  accentWidth?: number
  accentHeight?: number
  stack?: readonly { src: string; width: number; height: number }[]
}

type FintechStep = {
  id: string
  title: string
  subtitle: string
}

type FintechStat = {
  id: string
  value: number
  prefix?: string
  suffix?: string
  label: string
}

type FintechValue = {
  id: string
  title: string
  subtitle: string
}

type FintechApproachBlock = {
  id: string
  badge: string
  title: string
  body: string
  image: string
  width: number
  height: number
  imageAlt: string
}

type FintechPlan = {
  id: string
  plan: string
  meta: string
  features: readonly string[]
  popular: boolean
  badge?: string
}

type FintechContent = {
  skip: string
  industries: string
  breadcrumb: string
  heroKicker: string
  heroImageAlt: string
  heroThumbOneAlt: string
  heroThumbTwoAlt: string
  heroSecondaryCta: string
  heroTrustLabel: string
  heroTrust: readonly string[]

  servicesEyebrow: string
  servicesTitle: string
  servicesIntro: string
  services: readonly FintechCard[]

  featuresEyebrow: string
  featuresTitle: string
  featuresIntro: string
  features: readonly FintechFeatureCard[]

  workflowEyebrow: string
  workflowTitle: string
  workflowIntro: string
  workflowRegionLabel: string
  steps: readonly FintechStep[]

  statsLabel: string
  statsNote: string
  stats: readonly FintechStat[]

  valuesEyebrow: string
  valuesTitle: string
  valuesIntro: string
  values: readonly FintechValue[]

  approachEyebrow: string
  approach: readonly FintechApproachBlock[]

  pricingEyebrow: string
  pricingTitle: string
  pricingIntro: string
  pricingTabProject: string
  pricingTabRetainer: string
  pricingTabsLabel: string
  pricingProject: readonly FintechPlan[]
  pricingRetainer: readonly FintechPlan[]
  pricingCta: string
  pricingFootnote: string

  servicePathsEyebrow: string
  learnMore: string
  fintechWebAppAction: string

  faqEyebrow: string

  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string

  newTab: string
}

export const fintechLandingCopy = {
  en: {
    skip: 'Skip to fintech industry content',
    industries: 'Industries',
    breadcrumb: 'Breadcrumb',
    heroKicker: 'FinTech engineering',
    heroImageAlt: 'Fintech account dashboard interface CloudTopia engineers',
    heroThumbOneAlt: 'Payment confirmation card from a CloudTopia fintech build',
    heroThumbTwoAlt: 'Transaction analytics snippet from a CloudTopia fintech build',
    heroSecondaryCta: 'See the build paths',
    heroTrustLabel: 'Engineered around',
    heroTrust: ['Security-first architecture', 'Reconciled ledgers', 'Bilingual by design'],

    servicesEyebrow: 'What we build',
    servicesTitle: 'The financial systems behind the product',
    servicesIntro:
      'CloudTopia engineers the core platforms a fintech product runs on—each one recorded, reconcilable, and owned.',
    services: [
      {
        id: 'payments',
        title: 'Payment & wallet systems',
        subtitle: 'Secure payment flows, wallets, and balances recorded once and reflected everywhere.',
        image: '/images/industries/fintech/card_img_6.webp',
        width: 715,
        height: 372,
      },
      {
        id: 'core-banking',
        title: 'Core banking & ledger platforms',
        subtitle: 'Accounts, double-entry ledgers, and statements a reviewer can reconcile and trust.',
        image: '/images/industries/fintech/card_img_7.webp',
        width: 715,
        height: 292,
      },
      {
        id: 'lending',
        title: 'Lending & credit engines',
        subtitle: 'Eligibility, scoring, and repayment workflows with explainable, auditable decisions.',
        image: '/images/industries/fintech/card_img_8.webp',
        width: 536,
        height: 267,
      },
    ],

    featuresEyebrow: 'Engineering strengths',
    featuresTitle: 'The layers that make a fintech platform hold up',
    featuresIntro:
      'Beyond the core flows, these are the engineering layers we build so the platform stays secure, connected, and observable.',
    features: [
      {
        id: 'security',
        title: 'Multi-layer security & encryption',
        subtitle: 'Encryption in transit and at rest, role-based access, and key management in the foundation.',
        layout: 'single-accent',
        image: '/images/industries/fintech/card_img_3.webp',
        width: 715,
        height: 508,
        accent: '/images/industries/fintech/card_mini_img_1.svg',
        accentWidth: 88,
        accentHeight: 96,
      },
      {
        id: 'analytics',
        title: 'Real-time analytics & dashboards',
        subtitle: 'Operational and customer dashboards built on the same reconciled event record.',
        layout: 'single',
        image: '/images/industries/fintech/card_img_5.webp',
        width: 938,
        height: 494,
      },
      {
        id: 'scalability',
        title: 'Cloud-native scalability',
        subtitle: 'Systems that scale with transaction volume without losing traceability.',
        layout: 'single',
        image: '/images/industries/fintech/card_img_6.webp',
        width: 715,
        height: 372,
      },
      {
        id: 'integrations',
        title: 'Open-banking & API integrations',
        subtitle: 'Bounded integrations to payment rails, verification, and open-banking providers.',
        layout: 'stack',
        stack: [
          { src: '/images/industries/fintech/card_img_4_1.webp', width: 828, height: 150 },
          { src: '/images/industries/fintech/card_img_4_2.webp', width: 968, height: 154 },
          { src: '/images/industries/fintech/card_img_4_3.webp', width: 1056, height: 184 },
        ],
      },
      {
        id: 'observability',
        title: 'Observability & alerting',
        subtitle: 'Monitoring, audit trails, and alerts that surface exceptions before customers feel them.',
        layout: 'single-accent',
        image: '/images/industries/fintech/card_img_7.webp',
        width: 715,
        height: 292,
        accent: '/images/industries/fintech/card_mini_img_2.svg',
        accentWidth: 110,
        accentHeight: 105,
      },
    ],

    workflowEyebrow: 'How we deliver',
    workflowTitle: 'A delivery path built for regulated money',
    workflowIntro:
      'We move from context to launch in owned stages, so compliance owners, operators, and customers can follow every handoff. Watch each stage light up in sequence.',
    workflowRegionLabel: 'CloudTopia fintech delivery stages',
    steps: [
      {
        id: 'discovery',
        title: 'Discovery & scoping',
        subtitle: 'Map the flow, systems, providers, and the owners each record depends on.',
      },
      {
        id: 'architecture',
        title: 'Architecture & compliance mapping',
        subtitle: 'Design the layers and controls around the requirements your compliance owner approves.',
      },
      {
        id: 'build',
        title: 'Secure build',
        subtitle: 'Engineer the flows and the ledger with security and traceability from the first commit.',
      },
      {
        id: 'integrate',
        title: 'Integrate & test',
        subtitle: 'Connect validated providers behind sandboxes, then reconcile and test every path.',
      },
      {
        id: 'launch',
        title: 'Launch & optimize',
        subtitle: 'Release the scoped flow, watch it with observability, and improve on evidence.',
      },
    ],

    statsLabel: 'How this engagement is built',
    statsNote:
      'These describe our approach and this page—not client outcomes or performance guarantees.',
    stats: [
      {
        id: 'languages',
        value: 2,
        label: 'Operating languages, built in from day one',
      },
      {
        id: 'stages',
        value: 5,
        label: 'Delivery stages from discovery to launch',
      },
      {
        id: 'paths',
        value: 4,
        label: 'Connected build paths into real CloudTopia services',
      },
      {
        id: 'ownership',
        value: 100,
        suffix: '%',
        label: 'Handoffs designed with a named owner and next action',
      },
    ],

    valuesEyebrow: 'Engineering principles',
    valuesTitle: 'The foundation of every fintech build',
    valuesIntro:
      'These principles keep a financial platform credible long after launch.',
    values: [
      {
        id: 'security-compliance',
        title: 'Security & compliance',
        subtitle: 'Controls, encryption, and records engineered to the standards your institution approves.',
      },
      {
        id: 'reliability',
        title: 'Reliability & integrity',
        subtitle: 'Reconciled ledgers and idempotent events so every balance holds up under review.',
      },
      {
        id: 'scalability',
        title: 'Scalability',
        subtitle: 'Cloud-native systems that grow with volume while staying traceable.',
      },
      {
        id: 'transparency',
        title: 'Transparency',
        subtitle: 'Explainable decisions and audit trails your reviewers can actually follow.',
      },
    ],

    approachEyebrow: 'Our approach',
    approach: [
      {
        id: 'security-first',
        badge: 'Architecture',
        title: 'Security-first architecture, not a bolt-on',
        body: 'We design encryption, role-based access, key management, and audit trails into the foundation of the platform. Security is a property of how the system is built, not a layer added before launch.',
        image: '/images/industries/fintech/vision_card_img.webp',
        width: 624,
        height: 415,
        imageAlt: 'Security architecture layers of a CloudTopia fintech platform',
      },
      {
        id: 'compliance-ready',
        badge: 'Delivery',
        title: 'Compliance-ready delivery your reviewers can follow',
        body: 'Every handoff, record, and decision is documented with an owner and an evidence path. We implement the controls your compliance team approves so authorized reviewers can trace what happened and under which rule.',
        image: '/images/industries/fintech/mission_card_img.webp',
        width: 624,
        height: 415,
        imageAlt: 'Compliance-ready delivery workflow of a CloudTopia fintech build',
      },
    ],

    pricingEyebrow: 'Engagement models',
    pricingTitle: 'Ways to build with CloudTopia',
    pricingIntro:
      'We work in fixed-scope projects or ongoing retainers. Each option lists what you get, not a fixed price—scope is set with you.',
    pricingTabProject: 'Project',
    pricingTabRetainer: 'Retainer',
    pricingTabsLabel: 'Engagement model',
    pricingProject: [
      {
        id: 'discovery-sprint',
        plan: 'Discovery Sprint',
        meta: 'Fixed scope',
        popular: false,
        features: [
          'System and compliance mapping',
          'Flow and journey definition',
          'Integration and data inventory',
          'Risk and dependency register',
        ],
      },
      {
        id: 'mvp-build',
        plan: 'MVP Build',
        meta: 'First release',
        popular: true,
        badge: 'Most common',
        features: [
          'Core flow: onboarding to transaction',
          'Security baseline and role model',
          'Reconciled ledger and admin console',
          'One validated provider integration',
        ],
      },
      {
        id: 'scale-harden',
        plan: 'Scale & Harden',
        meta: 'Growth phase',
        popular: false,
        features: [
          'Performance and observability',
          'Expanded provider integrations',
          'Exception and audit workflows',
          'Bilingual content operations',
        ],
      },
    ],
    pricingRetainer: [
      {
        id: 'support-retainer',
        plan: 'Support Retainer',
        meta: 'Monthly',
        popular: false,
        features: [
          'Monitoring, fixes, and updates',
          'Minor enhancements each cycle',
          'Dependency and security patches',
          'Shared delivery backlog',
        ],
      },
      {
        id: 'product-partner',
        plan: 'Product Partner',
        meta: 'Monthly',
        popular: true,
        badge: 'Most flexible',
        features: [
          'Continuous delivery increments',
          'Roadmap planning with your team',
          'Ongoing integration expansion',
          'Observability and reporting',
        ],
      },
      {
        id: 'managed-platform',
        plan: 'Managed Platform',
        meta: 'Monthly',
        popular: false,
        features: [
          'Agreed operations and response',
          'Periodic security reviews',
          'Capacity and scaling planning',
          'Compliance-support workflows',
        ],
      },
    ],
    pricingCta: 'Discuss this scope',
    pricingFootnote: 'Every engagement starts with one scoped, reconcilable flow.',

    servicePathsEyebrow: 'Paths to implementation',
    learnMore: 'Explore this path',
    fintechWebAppAction: 'Explore fintech web applications and portals',

    faqEyebrow: 'Decision questions',

    ctaEyebrow: 'Start building',
    ctaTitle: 'Ready to build a fintech product your customers can trust?',
    ctaSubtitle: 'Bring one flow and the teams that own it. We will turn it into a buildable brief.',
    ctaButton: 'Map your onboarding and transaction flow',

    newTab: '(opens in new tab)',
  },
  ar: {
    skip: 'تخطَّ إلى محتوى قطاع التقنية المالية',
    industries: 'القطاعات',
    breadcrumb: 'مسار التنقل',
    heroKicker: 'هندسة التقنية المالية',
    heroImageAlt: 'واجهة لوحة حساب مالي تهندسها كلاود توبيا',
    heroThumbOneAlt: 'بطاقة تأكيد دفع من بناء تقنية مالية لكلاود توبيا',
    heroThumbTwoAlt: 'مقتطف تحليلات معاملات من بناء تقنية مالية لكلاود توبيا',
    heroSecondaryCta: 'اطّلعوا على مسارات البناء',
    heroTrustLabel: 'مهندَس حول',
    heroTrust: ['بنية تعطي الأمان أولوية', 'دفاتر أستاذ مطابَقة', 'ثنائي اللغة بالتصميم'],

    servicesEyebrow: 'ما الذي نبنيه',
    servicesTitle: 'الأنظمة المالية خلف المنتج',
    servicesIntro:
      'تهندس كلاود توبيا المنصات الأساسية التي يعمل عليها المنتج المالي—كل منها مسجَّل وقابل للمطابقة وذو مالك واضح.',
    services: [
      {
        id: 'payments',
        title: 'أنظمة المدفوعات والمحافظ',
        subtitle: 'مسارات دفع ومحافظ وأرصدة آمنة تُسجَّل مرة واحدة وتنعكس في كل مكان.',
        image: '/images/industries/fintech/card_img_6.webp',
        width: 715,
        height: 372,
      },
      {
        id: 'core-banking',
        title: 'منصات البنوك الأساسية ودفاتر الأستاذ',
        subtitle: 'حسابات ودفاتر قيد مزدوج وكشوف يستطيع المراجع مطابقتها والوثوق بها.',
        image: '/images/industries/fintech/card_img_7.webp',
        width: 715,
        height: 292,
      },
      {
        id: 'lending',
        title: 'محركات الإقراض والائتمان',
        subtitle: 'مسارات أهلية وتقييم وسداد بقرارات قابلة للتفسير والتدقيق.',
        image: '/images/industries/fintech/card_img_8.webp',
        width: 536,
        height: 267,
      },
    ],

    featuresEyebrow: 'نقاط القوة الهندسية',
    featuresTitle: 'الطبقات التي تجعل المنصة المالية تصمد',
    featuresIntro:
      'إلى جانب المسارات الأساسية، هذه هي الطبقات الهندسية التي نبنيها لتبقى المنصة آمنة ومترابطة وقابلة للمراقبة.',
    features: [
      {
        id: 'security',
        title: 'أمان وتشفير متعدد الطبقات',
        subtitle: 'تشفير أثناء النقل وفي التخزين، ووصول بحسب الأدوار، وإدارة مفاتيح في الأساس.',
        layout: 'single-accent',
        image: '/images/industries/fintech/card_img_3.webp',
        width: 715,
        height: 508,
        accent: '/images/industries/fintech/card_mini_img_1.svg',
        accentWidth: 88,
        accentHeight: 96,
      },
      {
        id: 'analytics',
        title: 'تحليلات ولوحات آنية',
        subtitle: 'لوحات تشغيلية وللعملاء مبنية على سجل الأحداث المطابَق نفسه.',
        layout: 'single',
        image: '/images/industries/fintech/card_img_5.webp',
        width: 938,
        height: 494,
      },
      {
        id: 'scalability',
        title: 'قابلية توسّع سحابية',
        subtitle: 'أنظمة تتوسع مع حجم المعاملات دون فقدان قابلية التتبع.',
        layout: 'single',
        image: '/images/industries/fintech/card_img_6.webp',
        width: 715,
        height: 372,
      },
      {
        id: 'integrations',
        title: 'تكاملات الخدمات المصرفية المفتوحة وواجهات البرمجة',
        subtitle: 'تكاملات محدودة النطاق مع قنوات الدفع والتحقق ومزودي الخدمات المصرفية المفتوحة.',
        layout: 'stack',
        stack: [
          { src: '/images/industries/fintech/card_img_4_1.webp', width: 828, height: 150 },
          { src: '/images/industries/fintech/card_img_4_2.webp', width: 968, height: 154 },
          { src: '/images/industries/fintech/card_img_4_3.webp', width: 1056, height: 184 },
        ],
      },
      {
        id: 'observability',
        title: 'المراقبة والتنبيه',
        subtitle: 'مراقبة وسجلات تدقيق وتنبيهات تُظهر الاستثناءات قبل أن يشعر بها العملاء.',
        layout: 'single-accent',
        image: '/images/industries/fintech/card_img_7.webp',
        width: 715,
        height: 292,
        accent: '/images/industries/fintech/card_mini_img_2.svg',
        accentWidth: 110,
        accentHeight: 105,
      },
    ],

    workflowEyebrow: 'كيف ننفّذ',
    workflowTitle: 'مسار تسليم مبني للأموال الخاضعة للتنظيم',
    workflowIntro:
      'ننتقل من السياق إلى الإطلاق عبر مراحل مملوكة، ليتمكن أصحاب الامتثال والفرق والعملاء من متابعة كل تسليم. تابعوا إضاءة كل مرحلة بالتسلسل.',
    workflowRegionLabel: 'مراحل تسليم التقنية المالية لدى كلاود توبيا',
    steps: [
      {
        id: 'discovery',
        title: 'الاكتشاف وتحديد النطاق',
        subtitle: 'نرسم المسار والأنظمة والمزودين والمالكين الذين يعتمد عليهم كل سجل.',
      },
      {
        id: 'architecture',
        title: 'الهندسة ورسم الامتثال',
        subtitle: 'نصمم الطبقات والضوابط حول المتطلبات التي يعتمدها مالك الامتثال لديكم.',
      },
      {
        id: 'build',
        title: 'بناء آمن',
        subtitle: 'نهندس المسارات ودفتر الأستاذ بأمان وقابلية تتبع من أول سطر برمجي.',
      },
      {
        id: 'integrate',
        title: 'التكامل والاختبار',
        subtitle: 'نربط المزودين الموثوقين خلف بيئات تجريبية، ثم نطابق ونختبر كل مسار.',
      },
      {
        id: 'launch',
        title: 'الإطلاق والتحسين',
        subtitle: 'نطلق المسار المحدد، ونراقبه بأدوات المراقبة، ونحسّنه بناءً على الأدلة.',
      },
    ],

    statsLabel: 'كيف يُبنى هذا التعاون',
    statsNote:
      'تصف هذه الأرقام منهجنا وهذه الصفحة، لا نتائج عملاء ولا ضمانات أداء.',
    stats: [
      {
        id: 'languages',
        value: 2,
        label: 'لغتا تشغيل مدمجتان منذ اليوم الأول',
      },
      {
        id: 'stages',
        value: 5,
        label: 'مراحل تسليم من الاكتشاف إلى الإطلاق',
      },
      {
        id: 'paths',
        value: 4,
        label: 'مسارات بناء مترابطة إلى خدمات كلاود توبيا الحقيقية',
      },
      {
        id: 'ownership',
        value: 100,
        suffix: '%',
        label: 'تسليمات مصممة بمالك محدد وخطوة تالية',
      },
    ],

    valuesEyebrow: 'مبادئ الهندسة',
    valuesTitle: 'أساس كل بناء تقنية مالية',
    valuesIntro:
      'تُبقي هذه المبادئ المنصة المالية جديرة بالثقة بعد الإطلاق بوقت طويل.',
    values: [
      {
        id: 'security-compliance',
        title: 'الأمان والامتثال',
        subtitle: 'ضوابط وتشفير وسجلات مهندَسة وفق المعايير التي تعتمدها مؤسستكم.',
      },
      {
        id: 'reliability',
        title: 'الموثوقية والنزاهة',
        subtitle: 'دفاتر أستاذ مطابَقة وأحداث لا تتكرر ليصمد كل رصيد تحت المراجعة.',
      },
      {
        id: 'scalability',
        title: 'قابلية التوسّع',
        subtitle: 'أنظمة سحابية تنمو مع الحجم مع بقائها قابلة للتتبع.',
      },
      {
        id: 'transparency',
        title: 'الشفافية',
        subtitle: 'قرارات قابلة للتفسير وسجلات تدقيق يستطيع مراجعوكم متابعتها فعلاً.',
      },
    ],

    approachEyebrow: 'منهجنا',
    approach: [
      {
        id: 'security-first',
        badge: 'الهندسة',
        title: 'بنية تعطي الأمان أولوية، لا إضافة لاحقة',
        body: 'نصمم التشفير والوصول بحسب الأدوار وإدارة المفاتيح وسجلات التدقيق في أساس المنصة. الأمان خاصية في طريقة بناء النظام، لا طبقة تُضاف قبل الإطلاق.',
        image: '/images/industries/fintech/vision_card_img.webp',
        width: 624,
        height: 415,
        imageAlt: 'طبقات بنية الأمان في منصة تقنية مالية من كلاود توبيا',
      },
      {
        id: 'compliance-ready',
        badge: 'التسليم',
        title: 'تسليم جاهز للامتثال يستطيع مراجعوكم متابعته',
        body: 'يُوثَّق كل تسليم وسجل وقرار بمالك ومسار أدلة. ننفذ الضوابط التي يعتمدها فريق الامتثال لديكم ليتمكن المراجعون المخولون من تتبع ما حدث وبأي قاعدة.',
        image: '/images/industries/fintech/mission_card_img.webp',
        width: 624,
        height: 415,
        imageAlt: 'مسار تسليم جاهز للامتثال في بناء تقنية مالية من كلاود توبيا',
      },
    ],

    pricingEyebrow: 'نماذج التعاون',
    pricingTitle: 'طرق البناء مع كلاود توبيا',
    pricingIntro:
      'نعمل بمشاريع محددة النطاق أو بعقود متابعة مستمرة. يعرض كل خيار ما تحصلون عليه، لا سعراً ثابتاً—يُحدَّد النطاق معكم.',
    pricingTabProject: 'مشروع',
    pricingTabRetainer: 'متابعة',
    pricingTabsLabel: 'نموذج التعاون',
    pricingProject: [
      {
        id: 'discovery-sprint',
        plan: 'ورشة الاكتشاف',
        meta: 'نطاق محدد',
        popular: false,
        features: [
          'رسم النظام والامتثال',
          'تحديد المسار والرحلة',
          'جرد التكاملات والبيانات',
          'سجل المخاطر والاعتماديات',
        ],
      },
      {
        id: 'mvp-build',
        plan: 'بناء النسخة الأولى',
        meta: 'أول إصدار',
        popular: true,
        badge: 'الأكثر شيوعاً',
        features: [
          'المسار الأساسي: من التسجيل إلى المعاملة',
          'خط أساس أمني ونموذج أدوار',
          'دفتر أستاذ مطابَق ولوحة إدارة',
          'تكامل مزود موثوق واحد',
        ],
      },
      {
        id: 'scale-harden',
        plan: 'التوسع والتحصين',
        meta: 'مرحلة النمو',
        popular: false,
        features: [
          'الأداء والمراقبة',
          'توسيع تكاملات المزودين',
          'مسارات الاستثناء والتدقيق',
          'تشغيل محتوى ثنائي اللغة',
        ],
      },
    ],
    pricingRetainer: [
      {
        id: 'support-retainer',
        plan: 'متابعة الدعم',
        meta: 'شهري',
        popular: false,
        features: [
          'مراقبة وإصلاحات وتحديثات',
          'تحسينات صغيرة كل دورة',
          'ترقيعات الاعتماديات والأمان',
          'قائمة تسليم مشتركة',
        ],
      },
      {
        id: 'product-partner',
        plan: 'شريك المنتج',
        meta: 'شهري',
        popular: true,
        badge: 'الأكثر مرونة',
        features: [
          'تسليم مستمر بزيادات',
          'تخطيط خارطة الطريق مع فريقكم',
          'توسيع التكاملات باستمرار',
          'مراقبة وتقارير',
        ],
      },
      {
        id: 'managed-platform',
        plan: 'منصة مُدارة',
        meta: 'شهري',
        popular: false,
        features: [
          'تشغيل واستجابة متفق عليهما',
          'مراجعات أمنية دورية',
          'تخطيط السعة والتوسع',
          'مسارات دعم الامتثال',
        ],
      },
    ],
    pricingCta: 'ناقشوا هذا النطاق',
    pricingFootnote: 'يبدأ كل تعاون بمسار واحد محدد وقابل للمطابقة.',

    servicePathsEyebrow: 'مسارات التنفيذ',
    learnMore: 'استكشفوا هذا المسار',
    fintechWebAppAction: 'استكشفوا تطبيقات الويب والبوابات للتقنية المالية',

    faqEyebrow: 'أسئلة القرار',

    ctaEyebrow: 'ابدؤوا البناء',
    ctaTitle: 'مستعدون لبناء منتج مالي يثق به عملاؤكم؟',
    ctaSubtitle: 'أحضروا مساراً واحداً والفرق التي تملكه، وسنحوّله إلى موجز قابل للبناء.',
    ctaButton: 'لنرسم رحلة العميل من التسجيل إلى المعاملة',

    newTab: '(يفتح في تبويب جديد)',
  },
} as const satisfies Record<Locale, FintechContent>
