import type { Locale } from '@/lib/i18n/config'

/**
 * Bilingual microcopy for the ported HouseBox sections that are NOT driven by
 * the IndustryPageDefinition (hero, service-bridge, and FAQ come from the
 * definition). Arabic is authored MSA — the brand reads كلاود توبيا in prose,
 * and CTAs use the plural imperative.
 *
 * Framing: CloudTopia ENGINEERS real-estate / proptech systems. Counters are
 * structural facts about the approach and this page (languages, delivery
 * stages, build paths, owned handoffs) — never fabricated sales, listing, or
 * client-outcome metrics. No fake agents, listings, prices, or testimonials.
 */

type RealEstateHeroSlide = {
  id: string
  image: string
  alt: string
  valueProp: string
}

type RealEstateStat = {
  id: string
  value: number
  suffix?: string
  label: string
}

type RealEstateCapability = {
  id: string
  title: string
  description: string
}

type RealEstateSegment = {
  id: string
  title: string
  description: string
  image: string
  width: number
  height: number
  tag: string
}

type RealEstateSolutionCard = {
  id: string
  title: string
  description: string
  image: string
  width: number
  height: number
  tags: readonly string[]
}

type RealEstateSolutionTab = {
  id: string
  label: string
  card: RealEstateSolutionCard
}

type RealEstateStep = {
  id: string
  title: string
  description: string
}

type RealEstateModule = {
  id: string
  title: string
  description: string
  image: string
  width: number
  height: number
  tag: string
}

type RealEstateApproachBlock = {
  id: string
  badge: string
  title: string
  body: string
  image: string
  width: number
  height: number
  imageAlt: string
}

export type RealEstatePlan = {
  id: string
  plan: string
  meta: string
  features: readonly string[]
  popular: boolean
  badge?: string
}

type RealEstateContent = {
  skip: string
  industries: string
  breadcrumb: string

  heroKicker: string
  heroSlides: readonly RealEstateHeroSlide[]
  heroSecondaryCta: string
  heroSliderLabel: string
  heroPrevLabel: string
  heroNextLabel: string
  heroTrustLabel: string
  heroTrust: readonly string[]

  aboutEyebrow: string
  aboutTitle: string
  aboutBody: string
  aboutImageMainAlt: string
  aboutImageTallAlt: string
  aboutBadge: string
  statsLabel: string
  statsNote: string
  stats: readonly RealEstateStat[]
  aboutCta: string

  capabilitiesEyebrow: string
  capabilitiesTitle: string
  capabilitiesIntro: string
  capabilitiesImageAlt: string
  capabilities: readonly RealEstateCapability[]

  segmentsEyebrow: string
  segmentsTitle: string
  segmentsIntro: string
  segments: readonly RealEstateSegment[]

  solutionsEyebrow: string
  solutionsTitle: string
  solutionsIntro: string
  solutionsTabsLabel: string
  solutions: readonly RealEstateSolutionTab[]
  solutionTagsLabel: string

  processEyebrow: string
  processTitle: string
  processIntro: string
  processRegionLabel: string
  steps: readonly RealEstateStep[]

  modulesEyebrow: string
  modulesTitle: string
  modulesIntro: string
  modulesRegionLabel: string
  modulesPrevLabel: string
  modulesNextLabel: string
  modules: readonly RealEstateModule[]

  approachEyebrow: string
  approachTitle: string
  approach: readonly RealEstateApproachBlock[]

  pricingEyebrow: string
  pricingTitle: string
  pricingIntro: string
  pricingCta: string
  pricingFootnote: string
  plans: readonly RealEstatePlan[]

  servicePathsEyebrow: string
  learnMore: string
  relatedLabel: string

  faqEyebrow: string

  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
  ctaImageAlt: string
}

export const realEstateLandingCopy = {
  en: {
    skip: 'Skip to real-estate industry content',
    industries: 'Industries',
    breadcrumb: 'Breadcrumb',

    heroKicker: 'Real-estate & proptech engineering',
    heroSlides: [
      {
        id: 'search',
        image: '/images/industries/real-estate/hero_1.png',
        alt: 'A two-storey suburban house with gabled roofs and a stone-clad base, its windows lit at dusk beside a double garage.',
        valueProp: 'Listing & search platforms that match seekers to the right unit',
      },
      {
        id: 'portal',
        image: '/images/industries/real-estate/hero_2.png',
        alt: 'A large two-storey house in brick and shingle siding, with a columned front porch and shuttered windows under a cloudy sky.',
        valueProp: 'Agent & agency portals that keep every lead accountable',
      },
      {
        id: 'management',
        image: '/images/industries/real-estate/hero_3.png',
        alt: 'A row of two-storey townhouses with grey siding and white trim, air-conditioning units and shrubs along their front walls.',
        valueProp: 'Management & tenant portals that hold their record',
      },
    ],
    heroSecondaryCta: 'See the build paths',
    heroSliderLabel: 'Real-estate platform value propositions',
    heroPrevLabel: 'Previous slide',
    heroNextLabel: 'Next slide',
    heroTrustLabel: 'Engineered around',
    heroTrust: ['One source of truth', 'Context-preserving leads', 'Bilingual by design'],

    aboutEyebrow: 'CloudTopia x Real Estate',
    aboutTitle: 'We build the systems behind the property experience.',
    aboutBody:
      'CloudTopia engineers the platforms a real-estate business runs on—search and listing, portals and CRM, management and tenant flows—so a seeker moves from first search to agent handoff without losing context, and every listing keeps one trustworthy record.',
    aboutImageMainAlt: 'A two-storey brick-and-shingle house with a columned porch, set back behind a wide lawn.',
    aboutImageTallAlt: 'A living room with a cream sofa beneath a large framed abstract painting, a coffee table stacked with books in front of it.',
    aboutBadge: 'Bilingual by design',
    statsLabel: 'How this engagement is built',
    statsNote:
      'These describe our approach and this page—not listings, sales, or client-outcome guarantees.',
    stats: [
      {
        id: 'platform-types',
        value: 4,
        label: 'Property platform types we engineer',
      },
      {
        id: 'languages',
        value: 2,
        label: 'Operating languages, Arabic and English',
      },
      {
        id: 'ownership',
        value: 100,
        suffix: '%',
        label: 'Handoffs designed with a named owner and next action',
      },
    ],
    aboutCta: 'Explore what we build',

    capabilitiesEyebrow: 'What we build',
    capabilitiesTitle: 'The capabilities behind a property platform',
    capabilitiesIntro:
      'Each capability is a system CloudTopia engineers on one shared catalog—recorded, reconcilable, and owned.',
    capabilitiesImageAlt: 'A blue-grey house at dusk with a teal front door and two garage doors, its windows glowing above a wet driveway.',
    capabilities: [
      {
        id: 'listing-search',
        title: 'Listing & search platforms',
        description: 'Map, filter, and comparison views built on one approved catalog of projects and units.',
      },
      {
        id: 'agent-portals',
        title: 'Agent & agency portals',
        description: 'Role-aware portals and CRM where every inquiry, viewing, and offer stays accountable.',
      },
      {
        id: 'management',
        title: 'Property-management & tenant portals',
        description: 'Tenant, lease, request, and payment flows that hold one traceable record.',
      },
      {
        id: 'tours-booking',
        title: 'Virtual tours & booking',
        description: 'Tour embedding, viewing scheduling, and lead capture connected on the same journey.',
      },
      {
        id: 'map-geo',
        title: 'Map & geo search',
        description: 'Location-first discovery with area, boundary, and point-of-interest search.',
      },
      {
        id: 'integrations',
        title: 'Integrations & data',
        description: 'Source-feed sync, payment, electronic-signature, and messaging within agreed limits.',
      },
    ],

    segmentsEyebrow: 'Who we build for',
    segmentsTitle: 'Systems shaped to how you work',
    segmentsIntro:
      'Brokerages, developers, and proptech teams each need a different first flow—we scope to the one that returns the most.',
    segments: [
      {
        id: 'brokerages',
        title: 'Brokerages & agencies',
        description: 'Listing platforms, agent CRM, and lead routing that keep inquiries in context and owned.',
        image: '/images/industries/real-estate/segment_brokerage.png',
        width: 720,
        height: 410,
        tag: 'Portals & CRM',
      },
      {
        id: 'developers',
        title: 'Developers & master communities',
        description: 'Project and unit showcases, availability, and registration flows for new developments.',
        image: '/images/industries/real-estate/segment_developer.png',
        width: 720,
        height: 410,
        tag: 'Project platforms',
      },
      {
        id: 'proptech',
        title: 'PropTech startups & portals',
        description: 'Search, discovery, and management products built to scale with catalog and traffic.',
        image: '/images/industries/real-estate/segment_proptech.png',
        width: 570,
        height: 640,
        tag: 'Products at scale',
      },
    ],

    solutionsEyebrow: 'Solution patterns',
    solutionsTitle: 'Example builds, not fictional listings',
    solutionsIntro:
      'The same catalog can power different products. Switch between the patterns CloudTopia engineers to see how each one is scoped.',
    solutionsTabsLabel: 'Solution patterns',
    solutionTagsLabel: 'Capabilities',
    solutions: [
      {
        id: 'buyer-portal',
        label: 'Buyer & tenant portals',
        card: {
          id: 'buyer-portal',
          title: 'Buyer & tenant discovery portal',
          description:
            'Search, map, saved searches, and viewing requests on one approved catalog, so seekers reach fitting units and inquiries arrive with context.',
          image: '/images/industries/real-estate/solution_portal.png',
          width: 1440,
          height: 1600,
          tags: ['Map & filter search', 'Saved searches', 'Viewing requests'],
        },
      },
      {
        id: 'agent-crm',
        label: 'Agent CRMs & lead engines',
        card: {
          id: 'agent-crm',
          title: 'Agent CRM & lead-routing engine',
          description:
            'Role-aware pipelines that route qualified inquiries by project, area, or budget while preserving the full history and next action.',
          image: '/images/industries/real-estate/solution_crm.png',
          width: 1440,
          height: 1600,
          tags: ['Lead routing', 'Role-aware pipelines', 'Full history'],
        },
      },
      {
        id: 'listing-platform',
        label: 'Listing & search platforms',
        card: {
          id: 'listing-platform',
          title: 'Listing & search platform',
          description:
            'A source-of-truth catalog with versioned availability, media, and disclosures reflected consistently to every view and every feed.',
          image: '/images/industries/real-estate/solution_listing.png',
          width: 1440,
          height: 1600,
          tags: ['Source of truth', 'Versioned media', 'Consistent views'],
        },
      },
      {
        id: 'management-dashboard',
        label: 'Management & tenant dashboards',
        card: {
          id: 'management-dashboard',
          title: 'Property-management & tenant dashboard',
          description:
            'Lease, request, and payment flows with a traceable record for owners, managers, and tenants across one connected system.',
          image: '/images/industries/real-estate/solution_management.png',
          width: 1440,
          height: 1600,
          tags: ['Leases & requests', 'Payment flows', 'Traceable record'],
        },
      },
    ],

    processEyebrow: 'How we work',
    processTitle: 'A delivery path built for property data',
    processIntro:
      'We move from context to launch in owned stages, so agents, operators, and seekers can follow every handoff. Watch each stage light up in sequence.',
    processRegionLabel: 'CloudTopia real-estate delivery stages',
    steps: [
      {
        id: 'discovery',
        title: 'Discovery & scoping',
        description: 'Map the flow, property sources, media, and the owners each record depends on.',
      },
      {
        id: 'design',
        title: 'Design & UX',
        description: 'Design bilingual search, portal, and management journeys around real decisions.',
      },
      {
        id: 'build',
        title: 'Build & integrate',
        description: 'Engineer the catalog, portals, and connections with traceability from the first commit.',
      },
      {
        id: 'launch',
        title: 'Launch & support',
        description: 'Release the scoped flow, watch it with monitoring, and improve on evidence.',
      },
    ],

    modulesEyebrow: 'Platform modules',
    modulesTitle: 'The modules a property platform is assembled from',
    modulesIntro:
      'Beyond the core flows, these are the modules CloudTopia ships so the platform stays connected, searchable, and accountable.',
    modulesRegionLabel: 'CloudTopia real-estate platform modules',
    modulesPrevLabel: 'Previous module',
    modulesNextLabel: 'Next module',
    modules: [
      {
        id: 'geo-search',
        title: 'Map & geo search',
        description: 'Area, boundary, and point-of-interest search on a location-first map.',
        image: '/images/industries/real-estate/module_1.png',
        width: 500,
        height: 382,
        tag: 'Discovery',
      },
      {
        id: 'saved-alerts',
        title: 'Saved searches & alerts',
        description: 'Persistent searches and notifications when matching units appear.',
        image: '/images/industries/real-estate/module_2.png',
        width: 520,
        height: 368,
        tag: 'Retention',
      },
      {
        id: 'scheduler',
        title: 'Viewing scheduler',
        description: 'Confirmable in-person and virtual-tour slots recorded once for both sides.',
        image: '/images/industries/real-estate/module_3.png',
        width: 520,
        height: 368,
        tag: 'Booking',
      },
      {
        id: 'lead-routing',
        title: 'Lead routing & CRM',
        description: 'Assignment by project, area, language, or budget with the full inquiry history.',
        image: '/images/industries/real-estate/module_4.png',
        width: 520,
        height: 368,
        tag: 'Operations',
      },
    ],

    approachEyebrow: 'Our approach',
    approachTitle: 'How we approach real-estate technology',
    approach: [
      {
        id: 'source-of-truth',
        badge: 'Data',
        title: 'One source of truth, not many copies',
        body: 'Availability, price, media, and disclosures are recorded once against an approved source and reflected consistently to every view and feed. When the source is not yet connected, a field is labelled indicative rather than presented as a guarantee.',
        image: '/images/industries/real-estate/approach_1.png',
        width: 1170,
        height: 550,
        imageAlt: 'An open-plan living room with a wooden floor, a cream sofa and a desk, opening through glazed doors onto a raised second room.',
      },
      {
        id: 'context-preserving',
        badge: 'Leads',
        title: 'Leads that keep their context',
        body: 'Every inquiry, saved search, and viewing request carries its history to the right agent, with a named owner and a clear next action. Nobody re-asks what the seeker already told the platform, and every conversation stays traceable.',
        image: '/images/industries/real-estate/approach_2.png',
        width: 1170,
        height: 550,
        imageAlt: 'A minimal living room with a wall-mounted television, grey armchairs and a round green marble table beside a floating wooden staircase.',
      },
    ],

    pricingEyebrow: 'Engagement models',
    pricingTitle: 'Ways to build with CloudTopia',
    pricingIntro:
      'We work in fixed-scope projects or ongoing partnerships. Each option lists what you get, not a fixed price—scope is set with you.',
    pricingCta: 'Discuss this scope',
    pricingFootnote: 'Every engagement starts with one scoped, reconcilable property flow.',
    plans: [
      {
        id: 'fixed-scope',
        plan: 'Fixed-scope build',
        meta: 'One defined release',
        popular: false,
        features: [
          'Discovery and system mapping',
          'One flow: search to inquiry',
          'Bilingual catalog and listing views',
          'One validated source or map integration',
        ],
      },
      {
        id: 'product-team',
        plan: 'Dedicated product team',
        meta: 'Ongoing delivery',
        popular: true,
        badge: 'Most common',
        features: [
          'Continuous delivery increments',
          'Portals, CRM, and lead routing',
          'Expanding integrations and modules',
          'Roadmap planning with your team',
        ],
      },
      {
        id: 'managed-platform',
        plan: 'Managed platform',
        meta: 'Build and operate',
        popular: false,
        features: [
          'Agreed operations and response',
          'Monitoring and periodic reviews',
          'Capacity and scaling planning',
          'Bilingual content operations',
        ],
      },
    ],

    servicePathsEyebrow: 'Paths to implementation',
    learnMore: 'Explore this path',
    relatedLabel: 'Related industries',

    faqEyebrow: 'Decision questions',

    ctaEyebrow: 'Start building',
    ctaTitle: 'Ready to build a property platform seekers and agents trust?',
    ctaSubtitle: 'Bring one flow and the agents and sources that own it. We will turn it into a buildable brief.',
    ctaButton: 'Map your property journey',
    ctaImageAlt: 'A modern white villa with a dark tiled roof and railed balconies, its windows lit from inside.',
  },
  ar: {
    skip: 'تخطَّ إلى محتوى قطاع العقارات',
    industries: 'القطاعات',
    breadcrumb: 'مسار التنقل',

    heroKicker: 'هندسة العقارات والتقنية العقارية',
    heroSlides: [
      {
        id: 'search',
        image: '/images/industries/real-estate/hero_1.png',
        alt: 'منزل سكني من طابقين بأسقف جمالونية وقاعدة حجرية، تضيء نوافذه عند الغسق بجانب مرآب مزدوج.',
        valueProp: 'منصات عرض وبحث تربط الباحث بالوحدة المناسبة',
      },
      {
        id: 'portal',
        image: '/images/industries/real-estate/hero_2.png',
        alt: 'منزل كبير من طابقين بواجهة من الطوب والقرميد الخشبي، له شرفة أمامية بأعمدة ونوافذ بمصاريع تحت سماء غائمة.',
        valueProp: 'بوابات للوسطاء والوكالات تُبقي كل عميل محتمل قابلاً للمساءلة',
      },
      {
        id: 'management',
        image: '/images/industries/real-estate/hero_3.png',
        alt: 'صف من المنازل المتلاصقة من طابقين بكسوة رمادية وإطارات بيضاء، مع وحدات تكييف وشجيرات أمام جدرانها.',
        valueProp: 'بوابات للإدارة والمستأجرين تحتفظ بسجلها',
      },
    ],
    heroSecondaryCta: 'اطّلعوا على مسارات البناء',
    heroSliderLabel: 'قيم المنصات العقارية',
    heroPrevLabel: 'الشريحة السابقة',
    heroNextLabel: 'الشريحة التالية',
    heroTrustLabel: 'مهندَس حول',
    heroTrust: ['مصدر واحد للحقيقة', 'عملاء محتملون يحفظون السياق', 'ثنائي اللغة بالتصميم'],

    aboutEyebrow: 'كلاود توبيا والعقارات',
    aboutTitle: 'نبني الأنظمة التي تقف خلف التجربة العقارية.',
    aboutBody:
      'تهندس كلاود توبيا المنصات التي تعمل عليها الشركة العقارية—البحث والعرض، والبوابات وإدارة علاقات العملاء، ومسارات الإدارة والمستأجرين—بحيث ينتقل الباحث من أول بحث إلى التسليم للوسيط دون فقدان السياق، ويحتفظ كل عرض بسجل واحد موثوق.',
    aboutImageMainAlt: 'منزل من طابقين بواجهة من الطوب والقرميد الخشبي وشرفة بأعمدة، يقع خلف مسطح أخضر واسع.',
    aboutImageTallAlt: 'غرفة معيشة فيها أريكة كريمية تحت لوحة تجريدية كبيرة مؤطَّرة، وأمامها طاولة قهوة تعلوها كتب مرصوفة.',
    aboutBadge: 'ثنائي اللغة بالتصميم',
    statsLabel: 'كيف يُبنى هذا التعاون',
    statsNote:
      'تصف هذه الأرقام منهجنا وهذه الصفحة، لا عروضاً ولا مبيعات ولا ضمانات نتائج للعملاء.',
    stats: [
      {
        id: 'platform-types',
        value: 4,
        label: 'أنواع منصات عقارية نهندسها',
      },
      {
        id: 'languages',
        value: 2,
        label: 'لغتا تشغيل، العربية والإنجليزية',
      },
      {
        id: 'ownership',
        value: 100,
        suffix: '%',
        label: 'تسليمات مصممة بمالك محدد وخطوة تالية',
      },
    ],
    aboutCta: 'استكشفوا ما نبنيه',

    capabilitiesEyebrow: 'ما الذي نبنيه',
    capabilitiesTitle: 'القدرات التي تقف خلف المنصة العقارية',
    capabilitiesIntro:
      'كل قدرة نظام تهندسه كلاود توبيا على كتالوج مشترك واحد—مسجَّل وقابل للمطابقة وذو مالك واضح.',
    capabilitiesImageAlt: 'منزل رمادي مزرقّ عند الغسق بباب أمامي فيروزي ومرآبين، تتوهج نوافذه فوق ممر مبلَّل.',
    capabilities: [
      {
        id: 'listing-search',
        title: 'منصات العرض والبحث',
        description: 'واجهات خريطة وفلاتر ومقارنة مبنية على كتالوج معتمد واحد للمشاريع والوحدات.',
      },
      {
        id: 'agent-portals',
        title: 'بوابات الوسطاء والوكالات',
        description: 'بوابات وأنظمة إدارة علاقات عملاء تراعي الأدوار، يبقى فيها كل استفسار ومعاينة وعرض قابلاً للمساءلة.',
      },
      {
        id: 'management',
        title: 'بوابات إدارة العقارات والمستأجرين',
        description: 'مسارات للمستأجر والإيجار والطلبات والدفع تحتفظ بسجل واحد قابل للتتبع.',
      },
      {
        id: 'tours-booking',
        title: 'الجولات الافتراضية والحجز',
        description: 'تضمين الجولات وجدولة المعاينات والتقاط العملاء مترابطة على المسار نفسه.',
      },
      {
        id: 'map-geo',
        title: 'الخرائط والبحث الجغرافي',
        description: 'اكتشاف يبدأ بالموقع مع بحث بالمنطقة والحدود ونقاط الاهتمام.',
      },
      {
        id: 'integrations',
        title: 'التكامل والبيانات',
        description: 'مزامنة مصادر البيانات والدفع والتوقيع الإلكتروني والمراسلة ضمن الحدود المتفق عليها.',
      },
    ],

    segmentsEyebrow: 'لمن نبني',
    segmentsTitle: 'أنظمة مصممة على طريقة عملكم',
    segmentsIntro:
      'يحتاج كل من الوكالات والمطورين وفرق التقنية العقارية إلى مسار أول مختلف—نحدد النطاق للمسار الأكثر عائداً.',
    segments: [
      {
        id: 'brokerages',
        title: 'الوكالات والوساطة',
        description: 'منصات عرض وأنظمة إدارة علاقات العملاء للوسطاء وتوجيه العملاء يُبقي الاستفسارات في سياقها ومملوكة.',
        image: '/images/industries/real-estate/segment_brokerage.png',
        width: 720,
        height: 410,
        tag: 'بوابات وإدارة عملاء',
      },
      {
        id: 'developers',
        title: 'المطورون والمجتمعات الكبرى',
        description: 'عرض للمشاريع والوحدات وبيانات التوفر ومسارات تسجيل للمشاريع الجديدة.',
        image: '/images/industries/real-estate/segment_developer.png',
        width: 720,
        height: 410,
        tag: 'منصات مشاريع',
      },
      {
        id: 'proptech',
        title: 'شركات التقنية العقارية والبوابات',
        description: 'منتجات بحث واكتشاف وإدارة مبنية لتتوسع مع الكتالوج وحركة الزوار.',
        image: '/images/industries/real-estate/segment_proptech.png',
        width: 570,
        height: 640,
        tag: 'منتجات قابلة للتوسّع',
      },
    ],

    solutionsEyebrow: 'أنماط الحلول',
    solutionsTitle: 'أمثلة بناء، لا عروضاً وهمية',
    solutionsIntro:
      'يمكن للكتالوج نفسه أن يشغّل منتجات مختلفة. تنقّلوا بين الأنماط التي تهندسها كلاود توبيا لترَوا كيف يُحدَّد نطاق كل منها.',
    solutionsTabsLabel: 'أنماط الحلول',
    solutionTagsLabel: 'القدرات',
    solutions: [
      {
        id: 'buyer-portal',
        label: 'بوابات المشترين والمستأجرين',
        card: {
          id: 'buyer-portal',
          title: 'بوابة اكتشاف للمشترين والمستأجرين',
          description:
            'بحث وخريطة وعمليات بحث محفوظة وطلبات معاينة على كتالوج معتمد واحد، فيصل الباحث إلى وحدات مناسبة وتصل الاستفسارات بسياقها.',
          image: '/images/industries/real-estate/solution_portal.png',
          width: 1440,
          height: 1600,
          tags: ['بحث بالخريطة والفلاتر', 'عمليات بحث محفوظة', 'طلبات معاينة'],
        },
      },
      {
        id: 'agent-crm',
        label: 'أنظمة عملاء الوسطاء',
        card: {
          id: 'agent-crm',
          title: 'نظام علاقات عملاء ومحرك توجيه للوسطاء',
          description:
            'مسارات تراعي الأدوار توجّه الاستفسارات المؤهلة بحسب المشروع أو المنطقة أو الميزانية مع حفظ السجل الكامل والخطوة التالية.',
          image: '/images/industries/real-estate/solution_crm.png',
          width: 1440,
          height: 1600,
          tags: ['توجيه العملاء', 'مسارات تراعي الأدوار', 'سجل كامل'],
        },
      },
      {
        id: 'listing-platform',
        label: 'منصات العرض والبحث',
        card: {
          id: 'listing-platform',
          title: 'منصة عرض وبحث',
          description:
            'كتالوج مصدر للحقيقة بتوفر ووسائط وإفصاحات مُدارة بالإصدارات وتنعكس باتساق على كل واجهة وكل مصدر بيانات.',
          image: '/images/industries/real-estate/solution_listing.png',
          width: 1440,
          height: 1600,
          tags: ['مصدر للحقيقة', 'وسائط بإصدارات', 'واجهات متسقة'],
        },
      },
      {
        id: 'management-dashboard',
        label: 'لوحات الإدارة والمستأجرين',
        card: {
          id: 'management-dashboard',
          title: 'لوحة إدارة عقارات ومستأجرين',
          description:
            'مسارات للإيجار والطلبات والدفع بسجل قابل للتتبع للمُلّاك والمديرين والمستأجرين عبر نظام واحد مترابط.',
          image: '/images/industries/real-estate/solution_management.png',
          width: 1440,
          height: 1600,
          tags: ['إيجارات وطلبات', 'مسارات دفع', 'سجل قابل للتتبع'],
        },
      },
    ],

    processEyebrow: 'كيف نعمل',
    processTitle: 'مسار تسليم مبني للبيانات العقارية',
    processIntro:
      'ننتقل من السياق إلى الإطلاق عبر مراحل مملوكة، ليتمكن الوسطاء والفرق والباحثون من متابعة كل تسليم. تابعوا إضاءة كل مرحلة بالتسلسل.',
    processRegionLabel: 'مراحل التسليم العقاري لدى كلاود توبيا',
    steps: [
      {
        id: 'discovery',
        title: 'الاكتشاف وتحديد النطاق',
        description: 'نرسم المسار ومصادر العقارات والوسائط والمالكين الذين يعتمد عليهم كل سجل.',
      },
      {
        id: 'design',
        title: 'التصميم وتجربة الاستخدام',
        description: 'نصمم رحلات بحث وبوابات وإدارة ثنائية اللغة حول قرارات حقيقية.',
      },
      {
        id: 'build',
        title: 'البناء والتكامل',
        description: 'نهندس الكتالوج والبوابات والتكاملات بقابلية تتبع من أول سطر برمجي.',
      },
      {
        id: 'launch',
        title: 'الإطلاق والدعم',
        description: 'نطلق المسار المحدد، ونراقبه، ونحسّنه بناءً على الأدلة.',
      },
    ],

    modulesEyebrow: 'وحدات المنصة',
    modulesTitle: 'الوحدات التي تُجمَع منها المنصة العقارية',
    modulesIntro:
      'إلى جانب المسارات الأساسية، هذه هي الوحدات التي تسلّمها كلاود توبيا لتبقى المنصة مترابطة وقابلة للبحث والمساءلة.',
    modulesRegionLabel: 'وحدات المنصة العقارية لدى كلاود توبيا',
    modulesPrevLabel: 'الوحدة السابقة',
    modulesNextLabel: 'الوحدة التالية',
    modules: [
      {
        id: 'geo-search',
        title: 'الخرائط والبحث الجغرافي',
        description: 'بحث بالمنطقة والحدود ونقاط الاهتمام على خريطة تبدأ بالموقع.',
        image: '/images/industries/real-estate/module_1.png',
        width: 500,
        height: 382,
        tag: 'الاكتشاف',
      },
      {
        id: 'saved-alerts',
        title: 'عمليات البحث المحفوظة والتنبيهات',
        description: 'عمليات بحث دائمة وتنبيهات عند ظهور وحدات مطابقة.',
        image: '/images/industries/real-estate/module_2.png',
        width: 520,
        height: 368,
        tag: 'الاحتفاظ',
      },
      {
        id: 'scheduler',
        title: 'جدولة المعاينات',
        description: 'مواعيد حضورية وجولات افتراضية قابلة للتأكيد تُسجَّل مرة واحدة للطرفين.',
        image: '/images/industries/real-estate/module_3.png',
        width: 520,
        height: 368,
        tag: 'الحجز',
      },
      {
        id: 'lead-routing',
        title: 'توجيه العملاء وإدارتهم',
        description: 'إسناد بحسب المشروع أو المنطقة أو اللغة أو الميزانية مع سجل الاستفسار الكامل.',
        image: '/images/industries/real-estate/module_4.png',
        width: 520,
        height: 368,
        tag: 'التشغيل',
      },
    ],

    approachEyebrow: 'منهجنا',
    approachTitle: 'كيف نتعامل مع التقنية العقارية',
    approach: [
      {
        id: 'source-of-truth',
        badge: 'البيانات',
        title: 'مصدر واحد للحقيقة، لا نسخ متعددة',
        body: 'يُسجَّل التوفر والسعر والوسائط والإفصاحات مرة واحدة من مصدر معتمد وتنعكس باتساق على كل واجهة ومصدر بيانات. وحين لا يكون المصدر متصلاً بعد، يُوسَم الحقل بأنه إرشادي لا مضمون.',
        image: '/images/industries/real-estate/approach_1.png',
        width: 1170,
        height: 550,
        imageAlt: 'غرفة معيشة مفتوحة بأرضية خشبية وأريكة كريمية ومكتب، تنفتح عبر أبواب زجاجية على غرفة أخرى مرتفعة.',
      },
      {
        id: 'context-preserving',
        badge: 'العملاء المحتملون',
        title: 'عملاء محتملون يحفظون سياقهم',
        body: 'يحمل كل استفسار وعملية بحث محفوظة وطلب معاينة سجله إلى الوسيط المناسب، بمالك محدد وخطوة تالية واضحة. لا يُعاد سؤال الباحث عمّا أخبر به المنصة، ويبقى كل حوار قابلاً للتتبع.',
        image: '/images/industries/real-estate/approach_2.png',
        width: 1170,
        height: 550,
        imageAlt: 'غرفة معيشة بسيطة فيها تلفاز مثبَّت على الجدار وكرسيان رماديان وطاولة مستديرة من الرخام الأخضر بجانب درج خشبي معلَّق.',
      },
    ],

    pricingEyebrow: 'نماذج التعاون',
    pricingTitle: 'طرق البناء مع كلاود توبيا',
    pricingIntro:
      'نعمل بمشاريع محددة النطاق أو بشراكات مستمرة. يعرض كل خيار ما تحصلون عليه، لا سعراً ثابتاً—يُحدَّد النطاق معكم.',
    pricingCta: 'ناقشوا هذا النطاق',
    pricingFootnote: 'يبدأ كل تعاون بمسار عقاري واحد محدد وقابل للمطابقة.',
    plans: [
      {
        id: 'fixed-scope',
        plan: 'بناء محدد النطاق',
        meta: 'إصدار واحد محدد',
        popular: false,
        features: [
          'الاكتشاف ورسم النظام',
          'مسار واحد: من البحث إلى الاستفسار',
          'كتالوج وواجهات عرض ثنائية اللغة',
          'تكامل مصدر أو خريطة موثوق واحد',
        ],
      },
      {
        id: 'product-team',
        plan: 'فريق منتج مخصص',
        meta: 'تسليم مستمر',
        popular: true,
        badge: 'الأكثر شيوعاً',
        features: [
          'تسليم مستمر بزيادات',
          'بوابات وإدارة عملاء وتوجيه',
          'توسيع التكاملات والوحدات',
          'تخطيط خارطة الطريق مع فريقكم',
        ],
      },
      {
        id: 'managed-platform',
        plan: 'منصة مُدارة',
        meta: 'بناء وتشغيل',
        popular: false,
        features: [
          'تشغيل واستجابة متفق عليهما',
          'مراقبة ومراجعات دورية',
          'تخطيط السعة والتوسع',
          'تشغيل محتوى ثنائي اللغة',
        ],
      },
    ],

    servicePathsEyebrow: 'مسارات التنفيذ',
    learnMore: 'استكشفوا هذا المسار',
    relatedLabel: 'قطاعات ذات صلة',

    faqEyebrow: 'أسئلة القرار',

    ctaEyebrow: 'ابدؤوا البناء',
    ctaTitle: 'مستعدون لبناء منصة عقارية يثق بها الباحثون والوسطاء؟',
    ctaSubtitle: 'أحضروا مساراً واحداً والوسطاء والمصادر الذين يملكونه، وسنحوّله إلى موجز قابل للبناء.',
    ctaButton: 'لنرسم رحلتكم العقارية',
    ctaImageAlt: 'فيلا بيضاء حديثة بسقف قرميدي داكن وشرفات بدرابزين، تضيء نوافذها من الداخل.',
  },
} as const satisfies Record<Locale, RealEstateContent>
