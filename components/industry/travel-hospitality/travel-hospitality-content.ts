import type { Locale } from '@/lib/i18n/config'

/**
 * Bilingual microcopy for the ported Travelite sections that are NOT driven by
 * the IndustryPageDefinition (hero, service-bridge, and FAQ come from the
 * definition). Arabic is authored MSA — the brand reads كلاود توبيا in prose and
 * CTAs use the plural imperative.
 *
 * Framing: CloudTopia ENGINEERS travel and hospitality systems. Stats are
 * structural facts about the approach and this page (languages, journey stages,
 * build paths, owned handoffs) — never fabricated occupancy, revenue, or
 * client-outcome metrics. Rates, availability, and inventory always belong to
 * the operator; this page never invents bookings, prices, or reviews.
 */

type TravelStat = {
  id: string
  value: number
  suffix?: string
  ring: number
  label: string
}

type TravelCapability = {
  id: string
  title: string
  subtitle: string
}

type TravelPillar = {
  id: string
  title: string
  subtitle: string
}

type TravelSolution = {
  id: string
  tag: string
  title: string
  subtitle: string
  image: string
  imageAlt: string
  width: number
  height: number
}

type TravelPattern = {
  id: string
  title: string
  meta: string
  chip: string
  image: string
  imageAlt: string
  width: number
  height: number
}

type TravelBandPoint = {
  id: string
  title: string
  subtitle: string
}

type TravelWalkStep = {
  id: string
  title: string
  subtitle: string
}

type TravelPlan = {
  id: string
  plan: string
  meta: string
  features: readonly string[]
  popular: boolean
  badge?: string
}

type TravelContent = {
  skip: string
  industries: string
  breadcrumb: string

  heroKicker: string
  heroBgAlt: string
  heroCardAlts: readonly [string, string, string]
  heroSecondaryCta: string
  heroTrustLabel: string
  heroTrust: readonly string[]

  statsLabel: string
  statsNote: string
  statsRegionLabel: string
  stats: readonly TravelStat[]

  capsEyebrow: string
  capsTitle: string
  capsIntro: string
  capabilities: readonly TravelCapability[]

  pillarsEyebrow: string
  pillarsTitle: string
  pillarsIntro: string
  pillars: readonly TravelPillar[]

  solutionsEyebrow: string
  solutionsTitle: string
  solutionsIntro: string
  solutions: readonly TravelSolution[]
  solutionsAction: string

  bandEyebrow: string
  bandTitle: string
  bandIntro: string
  bandPoints: readonly TravelBandPoint[]
  bandVideoPosterAlt: string
  bandWatchLabel: string
  bandModalTitle: string
  bandModalIntro: string
  bandModalClose: string
  bandWalkSteps: readonly TravelWalkStep[]

  patternsEyebrow: string
  patternsTitle: string
  patternsIntro: string
  patterns: readonly TravelPattern[]

  storyEyebrow: string
  storyTitle: string
  storyBody: string
  storyImageAlt: string
  storyValuesLabel: string
  storyValues: readonly string[]

  engagementEyebrow: string
  engagementTitle: string
  engagementIntro: string
  engagementTabProject: string
  engagementTabRetainer: string
  engagementTabsLabel: string
  engagementProject: readonly TravelPlan[]
  engagementRetainer: readonly TravelPlan[]
  engagementCta: string
  engagementFootnote: string

  servicePathsEyebrow: string
  learnMore: string
  webAppAction: string

  faqEyebrow: string

  partnersEyebrow: string
  partnersTitle: string
  partnersRegionLabel: string
  partners: readonly string[]

  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
}

export const travelHospitalityLandingCopy = {
  en: {
    skip: 'Skip to travel and hospitality industry content',
    industries: 'Industries',
    breadcrumb: 'Breadcrumb',

    heroKicker: 'Travel & hospitality engineering',
    heroBgAlt: '',
    heroCardAlts: [
      'Rooftop hotel pool CloudTopia designs guest experiences around',
      'Waterfront destination cityscape in a CloudTopia travel platform',
      'Overwater resort villa from a CloudTopia hospitality build',
    ],
    heroSecondaryCta: 'See the build paths',
    heroTrustLabel: 'Engineered around',
    heroTrust: ['Real-time availability', 'Channel-consistent rates', 'Bilingual by design'],

    statsLabel: 'How this engagement is built',
    statsNote:
      'These describe our approach and this page — not occupancy, revenue, or client-outcome guarantees.',
    statsRegionLabel: 'CloudTopia travel and hospitality engagement facts',
    stats: [
      { id: 'languages', value: 2, ring: 100, label: 'Operating languages, built in from day one' },
      { id: 'stages', value: 5, ring: 100, label: 'Guest-journey stages from inspiration to return' },
      { id: 'paths', value: 4, ring: 100, label: 'Connected build paths into real CloudTopia services' },
      { id: 'ownership', value: 100, suffix: '%', ring: 100, label: 'Handoffs designed with a named owner and next action' },
    ],

    capsEyebrow: 'What we engineer',
    capsTitle: 'The systems behind every guest journey',
    capsIntro:
      'CloudTopia builds the connected platform modules a travel or hospitality product runs on — each one recorded, reconcilable, and owned.',
    capabilities: [
      {
        id: 'booking-engine',
        title: 'Booking & reservation engines',
        subtitle: 'Real-time availability, rates, and rules that reserve a room, seat, tour, or package once.',
      },
      {
        id: 'channel-manager',
        title: 'Channel-manager integrations',
        subtitle: 'Bounded connections to channel managers, GDS, and OTAs so inventory stays consistent everywhere.',
      },
      {
        id: 'pms',
        title: 'Property, tour & package management',
        subtitle: 'Operator consoles for properties, tours, and packages that keep the front desk and the record in sync.',
      },
      {
        id: 'itinerary',
        title: 'Itinerary & package builders',
        subtitle: 'Tools that assemble multi-day trips and bundles into one clear, bookable itinerary.',
      },
      {
        id: 'guest-portal',
        title: 'Guest portals & mobile apps',
        subtitle: 'Bilingual web and native apps for check-in, requests, and on-property services around one profile.',
      },
      {
        id: 'payments',
        title: 'Payments & settlement',
        subtitle: 'Validated payment gateways with reconcilable records for deposits, balances, and refunds.',
      },
    ],

    pillarsEyebrow: 'Why build with CloudTopia',
    pillarsTitle: 'Engineering strengths a hospitality platform depends on',
    pillarsIntro:
      'Beyond the modules, these are the properties we engineer into the foundation so the platform holds up through peak season and beyond.',
    pillars: [
      {
        id: 'security',
        title: 'Security & payment safety',
        subtitle: 'Encryption, role-based access, and validated gateways engineered into the foundation.',
      },
      {
        id: 'scalability',
        title: 'Cloud-native scalability',
        subtitle: 'Systems that absorb seasonal peaks and campaign spikes without losing traceability.',
      },
      {
        id: 'integrations',
        title: 'API-led integrations',
        subtitle: 'Bounded connections to PMS, channel managers, GDS, and payment providers.',
      },
      {
        id: 'support',
        title: 'Bilingual, supported delivery',
        subtitle: 'Arabic and English as operating languages, with monitoring and a documented support path.',
      },
    ],

    solutionsEyebrow: 'Solution modules',
    solutionsTitle: 'What CloudTopia builds for travel & hospitality',
    solutionsIntro:
      'Each module is a real system we engineer — pick the one that carries the most guest value first, then connect the rest.',
    solutions: [
      {
        id: 'booking',
        tag: 'Booking',
        title: 'Booking & reservation platforms',
        subtitle: 'Availability, rates, and confirmation on one reconcilable record.',
        image: '/images/industries/travel-hospitality/solution_booking.jpg',
        imageAlt: 'Sailboat by a harbour bridge, an experience CloudTopia makes bookable',
        width: 370,
        height: 297,
      },
      {
        id: 'pms',
        tag: 'Property',
        title: 'Property & PMS platforms',
        subtitle: 'Operator consoles that keep rooms, rates, and the front desk in sync.',
        image: '/images/industries/travel-hospitality/solution_pms.jpg',
        imageAlt: 'Hotel lobby interior a CloudTopia property system supports',
        width: 370,
        height: 297,
      },
      {
        id: 'experiences',
        tag: 'Experiences',
        title: 'Tour & activity platforms',
        subtitle: 'Package builders and activity booking for tours and experiences.',
        image: '/images/industries/travel-hospitality/solution_experiences.jpg',
        imageAlt: 'Surfer on a wave, an activity a CloudTopia platform can schedule',
        width: 370,
        height: 297,
      },
      {
        id: 'guest',
        tag: 'Guest apps',
        title: 'Guest portals & loyalty',
        subtitle: 'Portals and apps for the stay, dining, and the return journey.',
        image: '/images/industries/travel-hospitality/solution_guest.jpg',
        imageAlt: 'Plated dessert representing on-property dining in a guest app',
        width: 770,
        height: 500,
      },
    ],
    solutionsAction: 'Explore hospitality web applications and portals',

    bandEyebrow: 'Why partner with CloudTopia',
    bandTitle: 'A delivery model built for the guest experience',
    bandIntro:
      'We move from context to launch in owned stages, so revenue, operations, and guest-experience teams can follow every handoff — and every live promise depends on a validated source.',
    bandPoints: [
      {
        id: 'source-of-truth',
        title: 'One source of availability',
        subtitle: 'Rates and inventory drawn from your approved property or provider system, not duplicated.',
      },
      {
        id: 'validated-integrations',
        title: 'Validated integrations only',
        subtitle: 'PMS, channel, GDS, and payment connections go live behind sandboxes and reconciliation.',
      },
      {
        id: 'staffed-exceptions',
        title: 'Staffed exception paths',
        subtitle: 'Overbookings, changes, and failed payments route to named queues, never to a dead end.',
      },
      {
        id: 'bilingual-ops',
        title: 'Bilingual operations',
        subtitle: 'Guest-facing and operator-facing copy authored in Arabic and English from the start.',
      },
    ],
    bandVideoPosterAlt: 'Traveller resting by a car on a beach — a CloudTopia guest-journey walkthrough',
    bandWatchLabel: 'See how we build the guest journey',
    bandModalTitle: 'How we build the guest journey',
    bandModalIntro:
      'A short walkthrough of the connected stages CloudTopia engineers — from the first search to the return.',
    bandModalClose: 'Close walkthrough',
    bandWalkSteps: [
      {
        id: 'discover',
        title: 'Discovery & scoping',
        subtitle: 'Map the journey, the property or provider systems, and the owner behind each record.',
      },
      {
        id: 'connect',
        title: 'Connect the source of truth',
        subtitle: 'Design the availability, rate, and reconciliation model against your validated provider access.',
      },
      {
        id: 'build',
        title: 'Build the booking flow',
        subtitle: 'Engineer the booking engine, guest portal, and payment settlement with traceability from the start.',
      },
      {
        id: 'launch',
        title: 'Launch & support',
        subtitle: 'Release the scoped journey, watch it with monitoring, and improve on evidence.',
      },
    ],

    patternsEyebrow: 'Reference patterns',
    patternsTitle: 'Solution patterns we deliver',
    patternsIntro:
      'Common shapes a travel or hospitality build takes — each one starts from one reconcilable flow and grows from there.',
    patterns: [
      {
        id: 'ota',
        title: 'OTA & metasearch marketplace',
        meta: 'Multi-property distribution',
        chip: 'Booking engine + channel APIs',
        image: '/images/industries/travel-hospitality/pattern_tours.jpg',
        imageAlt: 'Hiker overlooking a valley, a destination surfaced in a marketplace',
        width: 370,
        height: 297,
      },
      {
        id: 'hotel-pms',
        title: 'Hotel PMS & direct booking',
        meta: 'Single-property operations',
        chip: 'PMS + guest portal',
        image: '/images/industries/travel-hospitality/pattern_property.jpg',
        imageAlt: 'Eco-lodge interior representing a managed property',
        width: 370,
        height: 297,
      },
      {
        id: 'loyalty',
        title: 'Guest app & loyalty',
        meta: 'Return-journey engagement',
        chip: 'Mobile app + CRM',
        image: '/images/industries/travel-hospitality/pattern_loyalty.jpg',
        imageAlt: 'Couple watching a beach sunset, the return-journey moment',
        width: 370,
        height: 297,
      },
      {
        id: 'revenue',
        title: 'Revenue & distribution hub',
        meta: 'Rates across every channel',
        chip: 'Channel manager + analytics',
        image: '/images/industries/travel-hospitality/pattern_revenue.jpg',
        imageAlt: 'Rooftop pool at a resort, an asset distributed across channels',
        width: 370,
        height: 297,
      },
    ],

    storyEyebrow: 'How we approach travel-tech',
    storyTitle: 'Engineering the whole journey, not a single screen',
    storyBody:
      'CloudTopia treats a hospitality product as one connected system: the guest-facing journey above the horizon and the availability, property data, payment, and communication below it. We start from a single reconcilable flow, keep every promise tied to a validated source, and build so the platform stays honest under real booking pressure.',
    storyImageAlt: 'Laptop, notebook, and phone on a desk — CloudTopia engineering a travel platform',
    storyValuesLabel: 'Principles we build by',
    storyValues: [
      'Availability tied to an approved source',
      'Bilingual content, not late translation',
      'Named owners for every handoff',
      'Validated integrations before live promises',
      'Security and payments in the foundation',
      'One reconcilable flow before expanding',
    ],

    engagementEyebrow: 'Engagement models',
    engagementTitle: 'Ways to build with CloudTopia',
    engagementIntro:
      'We work in fixed-scope projects or ongoing retainers. Each option lists what you get, not a fixed price — scope is set with you.',
    engagementTabProject: 'Project',
    engagementTabRetainer: 'Retainer',
    engagementTabsLabel: 'Engagement model',
    engagementProject: [
      {
        id: 'discovery-sprint',
        plan: 'Discovery Sprint',
        meta: 'Fixed scope',
        popular: false,
        features: [
          'Guest-journey and system mapping',
          'Availability and rate model definition',
          'Integration and provider inventory',
          'Risk and dependency register',
        ],
      },
      {
        id: 'launch-build',
        plan: 'Launch Build',
        meta: 'First release',
        popular: true,
        badge: 'Most common',
        features: [
          'Core flow: search to confirmed booking',
          'One validated property or channel integration',
          'Bilingual guest portal and admin console',
          'Payment settlement and reconciliation',
        ],
      },
      {
        id: 'scale-connect',
        plan: 'Scale & Connect',
        meta: 'Growth phase',
        popular: false,
        features: [
          'Native guest and booking apps',
          'Expanded channel and GDS integrations',
          'Loyalty, upsell, and exception workflows',
          'Bilingual content operations',
        ],
      },
    ],
    engagementRetainer: [
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
          'Seasonal readiness and reporting',
        ],
      },
      {
        id: 'managed-platform',
        plan: 'Managed Platform',
        meta: 'Monthly',
        popular: false,
        features: [
          'Agreed operations and response',
          'Peak-season capacity planning',
          'Periodic security reviews',
          'Channel and rate health checks',
        ],
      },
    ],
    engagementCta: 'Discuss this scope',
    engagementFootnote: 'Every engagement starts with one scoped, reconcilable journey.',

    servicePathsEyebrow: 'Paths to implementation',
    learnMore: 'Explore this path',
    webAppAction: 'Explore hospitality web applications and guest portals',

    faqEyebrow: 'Decision questions',

    partnersEyebrow: 'Integrations',
    partnersTitle: 'The systems a hospitality platform connects to',
    partnersRegionLabel: 'Integration categories CloudTopia works with',
    partners: [
      'Property management systems',
      'Channel managers',
      'Global distribution systems',
      'Payment gateways',
      'Mapping & geolocation',
      'Messaging & notifications',
      'CRM & loyalty',
      'Analytics & reporting',
    ],

    ctaEyebrow: 'Start building',
    ctaTitle: 'Planning a travel or hospitality build?',
    ctaSubtitle: 'Bring one guest journey and the teams that own it. We will turn it into a buildable brief.',
    ctaButton: 'Shape your guest journey',
  },
  ar: {
    skip: 'تخطَّ إلى محتوى قطاع السفر والضيافة',
    industries: 'القطاعات',
    breadcrumb: 'مسار التنقل',

    heroKicker: 'هندسة السفر والضيافة',
    heroBgAlt: '',
    heroCardAlts: [
      'مسبح فندق على السطح تصمم كلاود توبيا تجربة الضيف حوله',
      'مدينة ساحلية كوجهة ضمن منصة سفر من كلاود توبيا',
      'فيلا منتجع فوق الماء من بناء ضيافة لكلاود توبيا',
    ],
    heroSecondaryCta: 'اطّلعوا على مسارات البناء',
    heroTrustLabel: 'مهندَس حول',
    heroTrust: ['توفر لحظي', 'أسعار متسقة عبر القنوات', 'ثنائي اللغة بالتصميم'],

    statsLabel: 'كيف يُبنى هذا التعاون',
    statsNote:
      'تصف هذه الأرقام منهجنا وهذه الصفحة، لا نسب إشغال أو إيرادات أو ضمانات نتائج للعملاء.',
    statsRegionLabel: 'حقائق تعاون السفر والضيافة لدى كلاود توبيا',
    stats: [
      { id: 'languages', value: 2, ring: 100, label: 'لغتا تشغيل مدمجتان منذ اليوم الأول' },
      { id: 'stages', value: 5, ring: 100, label: 'مراحل رحلة الضيف من الإلهام إلى العودة' },
      { id: 'paths', value: 4, ring: 100, label: 'مسارات بناء مترابطة إلى خدمات كلاود توبيا الحقيقية' },
      { id: 'ownership', value: 100, suffix: '%', ring: 100, label: 'تسليمات مصممة بمالك محدد وخطوة تالية' },
    ],

    capsEyebrow: 'ما الذي نهندسه',
    capsTitle: 'الأنظمة خلف كل رحلة ضيف',
    capsIntro:
      'تبني كلاود توبيا وحدات المنصة المترابطة التي يعمل عليها منتج السفر أو الضيافة — كل منها مسجَّل وقابل للمطابقة وذو مالك واضح.',
    capabilities: [
      {
        id: 'booking-engine',
        title: 'محركات الحجز والحجوزات',
        subtitle: 'توفر وأسعار وقواعد لحظية تحجز الغرفة أو المقعد أو الجولة أو الباقة مرة واحدة.',
      },
      {
        id: 'channel-manager',
        title: 'تكاملات مديري القنوات',
        subtitle: 'اتصالات محدودة بمديري القنوات وأنظمة التوزيع ومنصات الحجز ليبقى المخزون متسقاً في كل مكان.',
      },
      {
        id: 'pms',
        title: 'إدارة المنشآت والجولات والباقات',
        subtitle: 'لوحات تشغيل للمنشآت والجولات والباقات تُبقي مكتب الاستقبال والسجل متطابقين.',
      },
      {
        id: 'itinerary',
        title: 'بُناة المسارات والباقات',
        subtitle: 'أدوات تجمع الرحلات متعددة الأيام والحزم في مسار واحد واضح قابل للحجز.',
      },
      {
        id: 'guest-portal',
        title: 'بوابات الضيوف وتطبيقات الجوال',
        subtitle: 'تطبيقات ويب وأصلية ثنائية اللغة لتسجيل الدخول والطلبات وخدمات المنشأة حول ملف واحد.',
      },
      {
        id: 'payments',
        title: 'المدفوعات والتسوية',
        subtitle: 'بوابات دفع موثوقة بسجلات قابلة للمطابقة للعرابين والأرصدة والمستردات.',
      },
    ],

    pillarsEyebrow: 'لماذا البناء مع كلاود توبيا',
    pillarsTitle: 'نقاط قوة هندسية تعتمد عليها منصة الضيافة',
    pillarsIntro:
      'إلى جانب الوحدات، هذه هي الخصائص التي نهندسها في الأساس لتصمد المنصة في الموسم الأعلى وما بعده.',
    pillars: [
      {
        id: 'security',
        title: 'الأمان وسلامة الدفع',
        subtitle: 'تشفير ووصول بحسب الأدوار وبوابات موثوقة مهندَسة في الأساس.',
      },
      {
        id: 'scalability',
        title: 'قابلية توسّع سحابية',
        subtitle: 'أنظمة تستوعب ذروة المواسم وموجات الحملات دون فقدان قابلية التتبع.',
      },
      {
        id: 'integrations',
        title: 'تكاملات تقودها الواجهات',
        subtitle: 'اتصالات محدودة بأنظمة المنشأة ومديري القنوات وأنظمة التوزيع ومزودي الدفع.',
      },
      {
        id: 'support',
        title: 'تسليم ثنائي اللغة ومدعوم',
        subtitle: 'العربية والإنجليزية لغتا تشغيل، مع مراقبة ومسار دعم موثق.',
      },
    ],

    solutionsEyebrow: 'وحدات الحلول',
    solutionsTitle: 'ما الذي تبنيه كلاود توبيا للسفر والضيافة',
    solutionsIntro:
      'كل وحدة نظام حقيقي نهندسه — اختاروا الأكثر قيمة للضيف أولاً، ثم اربطوا البقية.',
    solutions: [
      {
        id: 'booking',
        tag: 'الحجز',
        title: 'منصات الحجز والحجوزات',
        subtitle: 'توفر وأسعار وتأكيد على سجل واحد قابل للمطابقة.',
        image: '/images/industries/travel-hospitality/solution_booking.jpg',
        imageAlt: 'قارب شراعي قرب جسر ميناء، تجربة تجعلها كلاود توبيا قابلة للحجز',
        width: 370,
        height: 297,
      },
      {
        id: 'pms',
        tag: 'المنشأة',
        title: 'منصات المنشأة وأنظمة الإدارة',
        subtitle: 'لوحات تشغيل تُبقي الغرف والأسعار ومكتب الاستقبال متطابقين.',
        image: '/images/industries/travel-hospitality/solution_pms.jpg',
        imageAlt: 'ردهة فندق يدعمها نظام منشأة من كلاود توبيا',
        width: 370,
        height: 297,
      },
      {
        id: 'experiences',
        tag: 'التجارب',
        title: 'منصات الجولات والأنشطة',
        subtitle: 'بُناة باقات وحجز أنشطة للجولات والتجارب.',
        image: '/images/industries/travel-hospitality/solution_experiences.jpg',
        imageAlt: 'راكب أمواج، نشاط يمكن لمنصة كلاود توبيا جدولته',
        width: 370,
        height: 297,
      },
      {
        id: 'guest',
        tag: 'تطبيقات الضيوف',
        title: 'بوابات الضيوف والولاء',
        subtitle: 'بوابات وتطبيقات للإقامة والطعام ورحلة العودة.',
        image: '/images/industries/travel-hospitality/solution_guest.jpg',
        imageAlt: 'طبق حلوى يمثّل الطعام داخل المنشأة في تطبيق الضيف',
        width: 770,
        height: 500,
      },
    ],
    solutionsAction: 'استكشفوا تطبيقات ويب وبوابات الضيافة',

    bandEyebrow: 'لماذا الشراكة مع كلاود توبيا',
    bandTitle: 'نموذج تسليم مبني لتجربة الضيف',
    bandIntro:
      'ننتقل من السياق إلى الإطلاق عبر مراحل مملوكة، ليتابع فريق الإيرادات والتشغيل وتجربة الضيف كل تسليم — ويعتمد كل وعد مباشر على مصدر موثوق.',
    bandPoints: [
      {
        id: 'source-of-truth',
        title: 'مصدر توفر واحد',
        subtitle: 'أسعار ومخزون يُسحبان من نظام منشأتكم أو مزودكم المعتمد، دون تكرار.',
      },
      {
        id: 'validated-integrations',
        title: 'تكاملات موثوقة فقط',
        subtitle: 'تنطلق اتصالات أنظمة المنشأة والقنوات والتوزيع والدفع خلف بيئات تجريبية ومطابقة.',
      },
      {
        id: 'staffed-exceptions',
        title: 'مسارات استثناء يديرها الفريق',
        subtitle: 'يتوجّه الحجز الزائد والتغييرات والمدفوعات الفاشلة إلى قوائم محددة، لا إلى طريق مسدود.',
      },
      {
        id: 'bilingual-ops',
        title: 'تشغيل ثنائي اللغة',
        subtitle: 'تُصاغ نصوص الضيف والمشغل بالعربية والإنجليزية منذ البداية.',
      },
    ],
    bandVideoPosterAlt: 'مسافر يستريح قرب سيارة على شاطئ — جولة رحلة الضيف من كلاود توبيا',
    bandWatchLabel: 'شاهدوا كيف نبني رحلة الضيف',
    bandModalTitle: 'كيف نبني رحلة الضيف',
    bandModalIntro:
      'جولة قصيرة في المراحل المترابطة التي تهندسها كلاود توبيا — من أول بحث إلى العودة.',
    bandModalClose: 'إغلاق الجولة',
    bandWalkSteps: [
      {
        id: 'discover',
        title: 'الاكتشاف وتحديد النطاق',
        subtitle: 'نرسم الرحلة وأنظمة المنشأة أو المزود والمالك خلف كل سجل.',
      },
      {
        id: 'connect',
        title: 'ربط مصدر الحقيقة',
        subtitle: 'نصمم نموذج التوفر والأسعار والمطابقة وفق وصولكم الموثوق للمزود.',
      },
      {
        id: 'build',
        title: 'بناء مسار الحجز',
        subtitle: 'نهندس محرك الحجز وبوابة الضيف وتسوية الدفع بقابلية تتبع من البداية.',
      },
      {
        id: 'launch',
        title: 'الإطلاق والدعم',
        subtitle: 'نطلق الرحلة المحددة، ونراقبها، ونحسّنها بناءً على الأدلة.',
      },
    ],

    patternsEyebrow: 'أنماط مرجعية',
    patternsTitle: 'أنماط الحلول التي نسلّمها',
    patternsIntro:
      'أشكال شائعة يتخذها بناء السفر أو الضيافة — كل منها يبدأ من مسار واحد قابل للمطابقة وينمو منه.',
    patterns: [
      {
        id: 'ota',
        title: 'سوق حجز ومقارنة أسعار',
        meta: 'توزيع متعدد المنشآت',
        chip: 'محرك حجز + واجهات القنوات',
        image: '/images/industries/travel-hospitality/pattern_tours.jpg',
        imageAlt: 'متنزه يطل على وادٍ، وجهة تظهر في سوق حجز',
        width: 370,
        height: 297,
      },
      {
        id: 'hotel-pms',
        title: 'نظام منشأة وحجز مباشر',
        meta: 'تشغيل منشأة واحدة',
        chip: 'نظام إدارة + بوابة ضيف',
        image: '/images/industries/travel-hospitality/pattern_property.jpg',
        imageAlt: 'داخل نزل بيئي يمثّل منشأة مُدارة',
        width: 370,
        height: 297,
      },
      {
        id: 'loyalty',
        title: 'تطبيق ضيف وولاء',
        meta: 'تفاعل رحلة العودة',
        chip: 'تطبيق جوال + إدارة علاقات',
        image: '/images/industries/travel-hospitality/pattern_loyalty.jpg',
        imageAlt: 'ثنائي يشاهد غروب الشاطئ، لحظة رحلة العودة',
        width: 370,
        height: 297,
      },
      {
        id: 'revenue',
        title: 'مركز إيرادات وتوزيع',
        meta: 'أسعار عبر كل قناة',
        chip: 'مدير قنوات + تحليلات',
        image: '/images/industries/travel-hospitality/pattern_revenue.jpg',
        imageAlt: 'مسبح على سطح منتجع، أصل يُوزَّع عبر القنوات',
        width: 370,
        height: 297,
      },
    ],

    storyEyebrow: 'كيف نتعامل مع تقنيات السفر',
    storyTitle: 'هندسة الرحلة كاملة، لا شاشة واحدة',
    storyBody:
      'تتعامل كلاود توبيا مع منتج الضيافة كنظام واحد مترابط: رحلة الضيف فوق الأفق، والتوفر وبيانات المنشأة والدفع والتواصل تحته. نبدأ من مسار واحد قابل للمطابقة، ونبقي كل وعد مرتبطاً بمصدر موثوق، ونبني لتبقى المنصة صادقة تحت ضغط الحجز الحقيقي.',
    storyImageAlt: 'حاسوب ودفتر وهاتف على مكتب — كلاود توبيا تهندس منصة سفر',
    storyValuesLabel: 'مبادئ نبني بها',
    storyValues: [
      'توفر مرتبط بمصدر معتمد',
      'محتوى ثنائي اللغة، لا ترجمة لاحقة',
      'مالكون محددون لكل تسليم',
      'تكاملات موثوقة قبل الوعود المباشرة',
      'الأمان والمدفوعات في الأساس',
      'مسار واحد قابل للمطابقة قبل التوسع',
    ],

    engagementEyebrow: 'نماذج التعاون',
    engagementTitle: 'طرق البناء مع كلاود توبيا',
    engagementIntro:
      'نعمل بمشاريع محددة النطاق أو بعقود متابعة مستمرة. يعرض كل خيار ما تحصلون عليه، لا سعراً ثابتاً — يُحدَّد النطاق معكم.',
    engagementTabProject: 'مشروع',
    engagementTabRetainer: 'متابعة',
    engagementTabsLabel: 'نموذج التعاون',
    engagementProject: [
      {
        id: 'discovery-sprint',
        plan: 'ورشة الاكتشاف',
        meta: 'نطاق محدد',
        popular: false,
        features: [
          'رسم رحلة الضيف والنظام',
          'تحديد نموذج التوفر والأسعار',
          'جرد التكاملات والمزودين',
          'سجل المخاطر والاعتماديات',
        ],
      },
      {
        id: 'launch-build',
        plan: 'بناء الإطلاق',
        meta: 'أول إصدار',
        popular: true,
        badge: 'الأكثر شيوعاً',
        features: [
          'المسار الأساسي: من البحث إلى حجز مؤكد',
          'تكامل منشأة أو قناة موثوق واحد',
          'بوابة ضيف ثنائية اللغة ولوحة إدارة',
          'تسوية دفع ومطابقة',
        ],
      },
      {
        id: 'scale-connect',
        plan: 'التوسع والربط',
        meta: 'مرحلة النمو',
        popular: false,
        features: [
          'تطبيقات جوال للضيوف والحجز',
          'توسيع تكاملات القنوات والتوزيع',
          'مسارات ولاء وعروض واستثناءات',
          'تشغيل محتوى ثنائي اللغة',
        ],
      },
    ],
    engagementRetainer: [
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
          'جاهزية موسمية وتقارير',
        ],
      },
      {
        id: 'managed-platform',
        plan: 'منصة مُدارة',
        meta: 'شهري',
        popular: false,
        features: [
          'تشغيل واستجابة متفق عليهما',
          'تخطيط سعة موسم الذروة',
          'مراجعات أمنية دورية',
          'فحوص صحة القنوات والأسعار',
        ],
      },
    ],
    engagementCta: 'ناقشوا هذا النطاق',
    engagementFootnote: 'يبدأ كل تعاون برحلة واحدة محددة وقابلة للمطابقة.',

    servicePathsEyebrow: 'مسارات التنفيذ',
    learnMore: 'استكشفوا هذا المسار',
    webAppAction: 'استكشفوا تطبيقات ويب وبوابات الضيوف للضيافة',

    faqEyebrow: 'أسئلة القرار',

    partnersEyebrow: 'التكاملات',
    partnersTitle: 'الأنظمة التي تتصل بها منصة الضيافة',
    partnersRegionLabel: 'فئات التكامل التي تعمل معها كلاود توبيا',
    partners: [
      'أنظمة إدارة المنشآت',
      'مديرو القنوات',
      'أنظمة التوزيع العالمية',
      'بوابات الدفع',
      'الخرائط والموقع الجغرافي',
      'الرسائل والإشعارات',
      'إدارة العلاقات والولاء',
      'التحليلات والتقارير',
    ],

    ctaEyebrow: 'ابدؤوا البناء',
    ctaTitle: 'تخطّطون لبناء في السفر أو الضيافة؟',
    ctaSubtitle: 'أحضروا رحلة ضيف واحدة والفرق التي تملكها، وسنحوّلها إلى موجز قابل للبناء.',
    ctaButton: 'صمّموا رحلة ضيوفكم',
  },
} as const satisfies Record<Locale, TravelContent>

export type { TravelStat, TravelSolution, TravelPattern, TravelPlan }
