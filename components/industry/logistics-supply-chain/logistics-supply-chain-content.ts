import type { Locale } from '@/lib/i18n/config'

/**
 * Bilingual microcopy for the ported Logistick sections that are NOT driven by
 * the IndustryPageDefinition (hero, service-bridge, and FAQ come from the
 * definition). Arabic is authored MSA — the brand reads كلاود توبيا in prose,
 * and CTAs use the plural imperative.
 *
 * Framing: CloudTopia ENGINEERS logistics systems. Stats are structural facts
 * about the approach and this page (languages, delivery stages, build paths,
 * owned handoffs). Radial dials are explicitly labeled as illustrative targets
 * an operator configures — never fabricated CloudTopia performance guarantees.
 * There is no working shipment tracker: the visibility panel is a static,
 * illustrative example of the UIs CloudTopia builds.
 */

type IconKey =
  | 'warehouse'
  | 'route'
  | 'radar'
  | 'plug'
  | 'boxes'
  | 'truck'
  | 'ship'
  | 'plane'
  | 'gauge'
  | 'scan'
  | 'map'
  | 'shield'
  | 'layers'
  | 'eye'
  | 'refresh'
  | 'headset'
  | 'clock'
  | 'users'

type LogisticsPillar = {
  id: string
  index: string
  icon: IconKey
  title: string
  subtitle: string
}

type LogisticsSubFeature = {
  id: string
  icon: IconKey
  title: string
  subtitle: string
}

type LogisticsDomain = {
  id: string
  icon: IconKey
  label: string
  lead: string
  features: readonly string[]
}

type LogisticsStat = {
  id: string
  value: number
  prefix?: string
  suffix?: string
  label: string
}

type LogisticsRadial = {
  id: string
  percent: number
  label: string
}

type LogisticsStep = {
  id: string
  title: string
  subtitle: string
}

type LogisticsValue = {
  id: string
  icon: IconKey
  title: string
  subtitle: string
}

type LogisticsTrackStatus = {
  id: string
  label: string
  state: string
  done: boolean
}

type LogisticsGuarantee = {
  id: string
  icon: IconKey
  title: string
  subtitle: string
}

type LogisticsRegion = {
  id: string
  label: string
  title: string
  note: string
  /** Percentage coordinates on the abstract footprint canvas. */
  x: number
  y: number
}

type LogisticsPlan = {
  id: string
  plan: string
  meta: string
  features: readonly string[]
  popular: boolean
  badge?: string
}

type LogisticsContent = {
  skip: string
  industries: string
  breadcrumb: string

  heroKicker: string
  heroSecondaryCta: string
  heroTrustLabel: string
  heroTrust: readonly string[]
  heroPanelLabel: string
  heroPanelSummary: string
  /** Alt for the hero backdrop photo (the page's LCP image). */
  heroImageAlt: string

  pillarsEyebrow: string
  pillarsTitle: string
  pillarsIntro: string
  pillars: readonly LogisticsPillar[]

  aboutEyebrow: string
  aboutTitle: string
  aboutLead: string
  aboutSubFeatures: readonly LogisticsSubFeature[]
  aboutChecklist: readonly string[]
  aboutCta: string
  aboutBadgeValue: string
  aboutBadgeLabel: string
  aboutPanelLabel: string
  aboutPanelStatuses: readonly LogisticsTrackStatus[]
  /** Alt for the expertise-section photo above the shipment-record panel. */
  aboutImageAlt: string

  domainsEyebrow: string
  domainsTitle: string
  domainsIntro: string
  domainsTabsLabel: string
  domainsLeadLabel: string
  domains: readonly LogisticsDomain[]

  statsLabel: string
  statsNote: string
  stats: readonly LogisticsStat[]
  radialsLabel: string
  radialsNote: string
  radials: readonly LogisticsRadial[]

  workflowEyebrow: string
  workflowTitle: string
  workflowIntro: string
  workflowRegionLabel: string
  steps: readonly LogisticsStep[]

  valuesEyebrow: string
  valuesTitle: string
  valuesIntro: string
  values: readonly LogisticsValue[]

  showcaseEyebrow: string
  showcaseTitle: string
  showcaseIntro: string
  showcaseNote: string
  showcaseCapabilities: readonly LogisticsSubFeature[]
  showcasePanelLabel: string
  showcaseShipmentLabel: string
  showcaseShipmentId: string
  showcaseEtaLabel: string
  showcaseEtaValue: string
  showcaseStatuses: readonly LogisticsTrackStatus[]
  /** Alt for the visibility-section photo above the illustrative tracking card. */
  showcaseImageAlt: string

  guaranteesTitle: string
  guarantees: readonly LogisticsGuarantee[]

  pricingEyebrow: string
  pricingTitle: string
  pricingIntro: string
  pricingTabProject: string
  pricingTabRetainer: string
  pricingTabsLabel: string
  pricingProject: readonly LogisticsPlan[]
  pricingRetainer: readonly LogisticsPlan[]
  pricingCta: string
  pricingFootnote: string

  marqueeLabel: string
  marqueeWords: readonly string[]

  servicePathsEyebrow: string
  learnMore: string
  contextualAction: string

  mapEyebrow: string
  mapTitle: string
  mapIntro: string
  mapCanvasLabel: string
  mapContactLabel: string
  mapContactTitle: string
  mapContactBody: string
  mapContactCta: string
  regions: readonly LogisticsRegion[]

  faqEyebrow: string

  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
  ctaSecondaryTitle: string
  ctaSecondaryNote: string
  ctaSecondaryButton: string

  newTab: string
}

export const logisticsLandingCopy = {
  en: {
    skip: 'Skip to logistics industry content',
    industries: 'Industries',
    breadcrumb: 'Breadcrumb',

    heroKicker: 'Logistics & supply-chain engineering',
    heroSecondaryCta: 'See the build paths',
    heroTrustLabel: 'Engineered around',
    heroTrust: ['One reconciled record', 'Shipment visibility', 'Bilingual by design'],
    heroPanelLabel: 'Control-tower rail',
    heroPanelSummary: 'One order, tracked from capture to proof of delivery.',
    heroImageAlt:
      'A conveyor line running the length of an automated distribution warehouse, past marked floor lanes and numbered picking bays.',

    pillarsEyebrow: 'What we build',
    pillarsTitle: 'Four capability pillars for supply-chain teams',
    pillarsIntro:
      'CloudTopia engineers the systems a logistics operation runs on—each one recorded, reconcilable, and owned.',
    pillars: [
      {
        id: 'wms-oms',
        index: '01',
        icon: 'warehouse',
        title: 'Order & warehouse systems',
        subtitle: 'OMS and WMS builds that keep promised, physical, and in-transit inventory in agreement.',
      },
      {
        id: 'tms-routing',
        index: '02',
        icon: 'route',
        title: 'Transport & route optimization',
        subtitle: 'TMS, carrier selection, load and route planning with explainable, reviewable results.',
      },
      {
        id: 'tracking',
        index: '03',
        icon: 'radar',
        title: 'Tracking & telemetry',
        subtitle: 'Shipment tracking and fleet telemetry feeding one control-tower view.',
      },
      {
        id: 'integration',
        index: '04',
        icon: 'plug',
        title: 'EDI & API integrations',
        subtitle: 'Bounded integrations to carriers, ERPs, and partners over EDI and modern APIs.',
      },
    ],

    aboutEyebrow: 'Our expertise',
    aboutTitle: 'A track record building the systems behind the network.',
    aboutLead:
      'CloudTopia designs and delivers the software that plans, records, and shows a supply chain—so operators, drivers, and customers all read the same shipment truth.',
    aboutSubFeatures: [
      {
        id: 'integration-first',
        icon: 'plug',
        title: 'Integration-first',
        subtitle: 'We connect the WMS, ERP, and carriers you already run before adding anything new.',
      },
      {
        id: 'visibility',
        icon: 'eye',
        title: 'Visibility by design',
        subtitle: 'One reconciled record powers every operator, driver, and customer view.',
      },
    ],
    aboutChecklist: [
      'Order, inventory, WMS, TMS, and tracking on one model',
      'Explainable route and fleet optimization a planner can override',
      'Exception queues with named owners and a return path',
      'Bilingual operator, driver, and customer interfaces',
    ],
    aboutCta: 'Map your order-to-delivery flow',
    aboutBadgeValue: '6',
    aboutBadgeLabel: 'Recorded stages from order to reconciliation',
    aboutPanelLabel: 'Shipment record',
    aboutPanelStatuses: [
      { id: 'order', label: 'Order captured', state: 'Recorded', done: true },
      { id: 'inventory', label: 'Inventory allocated', state: 'Reserved', done: true },
      { id: 'dispatch', label: 'Dispatched', state: 'Planned', done: true },
      { id: 'transit', label: 'In transit', state: 'Tracked', done: false },
      { id: 'delivery', label: 'Proof of delivery', state: 'Pending', done: false },
    ],
    aboutImageAlt:
      'An automated guided vehicle carrying a loaded parts rack across a warehouse floor.',

    domainsEyebrow: 'Solution domains',
    domainsTitle: 'The domains we engineer for logistics',
    domainsIntro:
      'Each domain is a buildable system with the real feature bullets we deliver—pick where the first reconcilable flow lives.',
    domainsTabsLabel: 'Logistics solution domains',
    domainsLeadLabel: 'What this domain covers',
    domains: [
      {
        id: 'warehouse',
        icon: 'boxes',
        label: 'Warehouse systems',
        lead: 'WMS and inventory systems that keep the physical count and the record reconciled to one location and owner.',
        features: [
          'Receiving, put-away, pick, pack, and dispatch tasks',
          'Cycle counts and reconciliation against physical stock',
          'Location, bin, and lot/serial tracking',
          'Barcode and handheld-ready warehouse flows',
        ],
      },
      {
        id: 'fleet',
        icon: 'truck',
        label: 'Fleet & transport',
        lead: 'TMS, dispatch, and fleet systems that turn orders into defensible dispatch decisions and optimized routes.',
        features: [
          'Carrier selection, rating, and manifest generation',
          'Route, load, and fleet optimization with overrides',
          'Driver mobile app for tasks and proof of delivery',
          'Telematics ingestion for live fleet position',
        ],
      },
      {
        id: 'freight',
        icon: 'ship',
        label: 'Freight & customs',
        lead: 'Freight and documentation systems that prepare records and documents while authorities keep clearance.',
        features: [
          'Shipment, container, and consignment records',
          'Document preparation and status tracking',
          'Partner and forwarder data exchange',
          'Cost, duty, and charge capture for reconciliation',
        ],
      },
      {
        id: 'last-mile',
        icon: 'map',
        label: 'Last-mile & delivery',
        lead: 'Last-mile systems that plan delivery windows, capture proof, and keep customers informed.',
        features: [
          'Delivery windows, routing, and re-attempts',
          'Customer tracking pages and notifications',
          'Proof of delivery, signature, and photo capture',
          'Returns and failed-delivery exception handling',
        ],
      },
      {
        id: 'control-tower',
        icon: 'radar',
        label: 'Control-tower analytics',
        lead: 'Dashboards and analytics that surface exceptions, SLAs, and network performance on one view.',
        features: [
          'Live shipment status and exception queues',
          'SLA, on-time, and dwell-time monitoring',
          'Network and cost performance dashboards',
          'Alerting before a customer has to ask',
        ],
      },
    ],

    statsLabel: 'How this engagement is built',
    statsNote:
      'These describe our approach and this page—not client outcomes or performance guarantees.',
    stats: [
      { id: 'languages', value: 2, label: 'Operating languages, built in from day one' },
      { id: 'stages', value: 4, label: 'Delivery stages from discovery to launch' },
      { id: 'paths', value: 4, label: 'Connected build paths into real CloudTopia services' },
      { id: 'ownership', value: 100, suffix: '%', label: 'Handoffs designed with a named owner and next action' },
    ],
    radialsLabel: 'A control tower is configured around your targets',
    radialsNote:
      'Illustrative targets an operator defines per network—these are example dials, not a CloudTopia performance guarantee.',
    radials: [
      { id: 'visibility', percent: 95, label: 'On-time visibility target' },
      { id: 'automation', percent: 70, label: 'Manual steps automated' },
    ],

    workflowEyebrow: 'How we deliver',
    workflowTitle: 'A delivery path built for moving networks',
    workflowIntro:
      'We move from context to launch in owned stages, so operations, partners, and customers can follow every handoff. Watch each stage light up in sequence.',
    workflowRegionLabel: 'CloudTopia logistics delivery stages',
    steps: [
      {
        id: 'discovery',
        title: 'Discovery & flow mapping',
        subtitle: 'Map the lane, systems, carriers, and the owners each record depends on.',
      },
      {
        id: 'design',
        title: 'Architecture & integration design',
        subtitle: 'Design the layers and the EDI/API integrations around the systems you already run.',
      },
      {
        id: 'build',
        title: 'Build & integrate',
        subtitle: 'Engineer the flows and the reconciled record, then connect carriers behind sandboxes.',
      },
      {
        id: 'launch',
        title: 'Deploy & optimize',
        subtitle: 'Release the scoped flow, watch it on the control tower, and improve on evidence.',
      },
    ],

    valuesEyebrow: 'Why teams choose CloudTopia',
    valuesTitle: 'What keeps a logistics platform dependable',
    valuesIntro:
      'These strengths keep an operation credible long after the first shipment.',
    values: [
      {
        id: 'scalability',
        icon: 'layers',
        title: 'Scales with volume',
        subtitle: 'Cloud-native systems that grow with shipment volume without losing traceability.',
      },
      {
        id: 'visibility',
        icon: 'eye',
        title: 'Shipment visibility',
        subtitle: 'One reconciled record drives every operator, driver, and customer view.',
      },
      {
        id: 'integration',
        icon: 'plug',
        title: 'Integration-first',
        subtitle: 'EDI and API connections to the carriers, ERPs, and partners you already use.',
      },
      {
        id: 'security',
        icon: 'shield',
        title: 'Security & access',
        subtitle: 'Role-based access, encryption, and audit trails engineered into the foundation.',
      },
      {
        id: 'flexibility',
        icon: 'refresh',
        title: 'Flexible delivery',
        subtitle: 'Start with one lane or warehouse and expand once it reconciles end to end.',
      },
      {
        id: 'observability',
        icon: 'gauge',
        title: 'Observability',
        subtitle: 'Monitoring and alerts that surface exceptions before a customer feels them.',
      },
    ],

    showcaseEyebrow: 'Shipment visibility',
    showcaseTitle: 'The tracking experiences we build',
    showcaseIntro:
      'CloudTopia engineers the shipment-tracking and control-tower interfaces your operators and customers rely on—one reconciled status, reflected everywhere.',
    showcaseNote:
      'Illustrative example of a UI CloudTopia builds. Not a live tracker for any carrier.',
    showcaseCapabilities: [
      {
        id: 'global-ops',
        icon: 'radar',
        title: 'One status model',
        subtitle: 'Carrier scans and telemetry reconciled into a single shipment timeline.',
      },
      {
        id: 'notifications',
        icon: 'scan',
        title: 'Proactive alerts',
        subtitle: 'Exceptions surface on the control tower before a customer has to ask.',
      },
      {
        id: 'customer-view',
        icon: 'eye',
        title: 'Customer tracking',
        subtitle: 'Bilingual tracking pages that read from the same reconciled record.',
      },
    ],
    showcasePanelLabel: 'Illustrative tracking UI',
    showcaseShipmentLabel: 'Shipment',
    showcaseShipmentId: 'CT-482170',
    showcaseEtaLabel: 'Estimated delivery',
    showcaseEtaValue: 'Example window',
    showcaseStatuses: [
      { id: 'picked', label: 'Picked & packed', state: 'Done', done: true },
      { id: 'dispatched', label: 'Dispatched from hub', state: 'Done', done: true },
      { id: 'transit', label: 'Out for delivery', state: 'Active', done: true },
      { id: 'delivered', label: 'Delivered', state: 'Pending', done: false },
    ],
    showcaseImageAlt:
      'A circular sortation carousel feeding parcels onto a conveyor line in a distribution center.',

    guaranteesTitle: 'How we commit to delivery',
    guarantees: [
      {
        id: 'support',
        icon: 'headset',
        title: 'SLA-backed support',
        subtitle: 'Agreed response and monitoring once your system is live.',
      },
      {
        id: 'onboarding',
        icon: 'clock',
        title: 'Fast, scoped onboarding',
        subtitle: 'We start with one reconcilable flow so value lands early.',
      },
      {
        id: 'team',
        icon: 'users',
        title: 'Dedicated delivery team',
        subtitle: 'A named engineering team that learns your operation.',
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
          'Flow, system, and carrier mapping',
          'Integration and data inventory',
          'Exception and ownership model',
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
          'Core flow: order to dispatch or delivery',
          'One reconciled shipment record',
          'One validated carrier integration',
          'Operator console and tracking view',
        ],
      },
      {
        id: 'scale-harden',
        plan: 'Scale & Harden',
        meta: 'Growth phase',
        popular: false,
        features: [
          'Performance and control-tower analytics',
          'Expanded carrier and partner integrations',
          'Route and fleet optimization',
          'Bilingual operations rollout',
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
          'Control-tower reporting',
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
          'Peak-season readiness',
        ],
      },
    ],
    pricingCta: 'Discuss this scope',
    pricingFootnote: 'Every engagement starts with one scoped, reconcilable flow.',

    marqueeLabel: 'What we engineer',
    marqueeWords: ['Warehousing', 'Fleet', 'Visibility', 'Integrations', 'Optimization', 'Control Tower'],

    servicePathsEyebrow: 'Paths to implementation',
    learnMore: 'Explore this path',
    contextualAction: 'Explore logistics operations systems',

    mapEyebrow: 'Where we deliver',
    mapTitle: 'Bilingual delivery across the region and beyond',
    mapIntro:
      'CloudTopia builds logistics systems for teams across the GCC, Türkiye, and the wider region—select a point to see how we engage.',
    mapCanvasLabel: 'Illustrative regional delivery footprint',
    mapContactLabel: 'Talk to us',
    mapContactTitle: 'Start with one flow',
    mapContactBody:
      'Reach our engineers on WhatsApp—routed to the nearest CloudTopia team for your region.',
    mapContactCta: 'Talk to our engineers',
    regions: [
      { id: 'gcc', label: 'GCC', title: 'Gulf operations', note: 'Warehouse, fleet, and last-mile systems for Gulf networks.', x: 62, y: 54 },
      { id: 'turkiye', label: 'Türkiye', title: 'Türkiye delivery', note: 'Cross-border and domestic logistics platforms.', x: 50, y: 38 },
      { id: 'mena', label: 'Wider MENA', title: 'Regional reach', note: 'Bilingual control-tower and integration builds.', x: 44, y: 60 },
    ],

    faqEyebrow: 'Decision questions',

    ctaEyebrow: 'Start building',
    ctaTitle: 'Ready to give your network one reconciled view?',
    ctaSubtitle: 'Bring one flow and the teams that own it. We will turn it into a buildable brief.',
    ctaButton: 'Map your order-to-delivery flow',
    ctaSecondaryTitle: 'Talk to our engineers',
    ctaSecondaryNote: 'A short call to scope the first reconcilable flow.',
    ctaSecondaryButton: 'Discuss with the team',

    newTab: '(opens in new tab)',
  },
  ar: {
    skip: 'تخطَّ إلى محتوى قطاع اللوجستيات',
    industries: 'القطاعات',
    breadcrumb: 'مسار التنقل',

    heroKicker: 'هندسة اللوجستيات وسلاسل الإمداد',
    heroSecondaryCta: 'اطّلعوا على مسارات البناء',
    heroTrustLabel: 'مهندَس حول',
    heroTrust: ['سجل واحد مطابَق', 'رؤية الشحنات', 'ثنائي اللغة بالتصميم'],
    heroPanelLabel: 'مسار برج التحكم',
    heroPanelSummary: 'طلب واحد، متتبَّع من الالتقاط حتى إثبات التسليم.',
    heroImageAlt:
      'خط ناقل يمتد على طول مستودع توزيع آلي، بمحاذاة مسارات أرضية محدَّدة ومنصات انتقاء مرقَّمة.',

    pillarsEyebrow: 'ما الذي نبنيه',
    pillarsTitle: 'أربع ركائز قدرات لفرق سلاسل الإمداد',
    pillarsIntro:
      'تهندس كلاود توبيا الأنظمة التي تعمل عليها العملية اللوجستية—كل منها مسجَّل وقابل للمطابقة وذو مالك واضح.',
    pillars: [
      {
        id: 'wms-oms',
        index: '٠١',
        icon: 'warehouse',
        title: 'أنظمة الطلبات والمستودعات',
        subtitle: 'بناء أنظمة الطلبات والمستودعات لإبقاء المخزون الموعود والفعلي وقيد النقل متطابقاً.',
      },
      {
        id: 'tms-routing',
        index: '٠٢',
        icon: 'route',
        title: 'النقل وتحسين المسارات',
        subtitle: 'إدارة النقل واختيار الناقل وتخطيط الحمولة والمسار بنتائج قابلة للتفسير والمراجعة.',
      },
      {
        id: 'tracking',
        index: '٠٣',
        icon: 'radar',
        title: 'التتبع والقياس عن بُعد',
        subtitle: 'تتبع الشحنات وقياسات الأسطول تغذّي رؤية برج تحكم واحدة.',
      },
      {
        id: 'integration',
        index: '٠٤',
        icon: 'plug',
        title: 'التكاملات الإلكترونية والبرمجية',
        subtitle: 'تكاملات محدودة النطاق مع الناقلين وأنظمة الموارد والشركاء عبر التبادل الإلكتروني وواجهات البرمجة.',
      },
    ],

    aboutEyebrow: 'خبرتنا',
    aboutTitle: 'سجل حافل في بناء الأنظمة خلف الشبكة.',
    aboutLead:
      'تصمم كلاود توبيا وتسلّم البرمجيات التي تخطط وتسجل وتُظهر سلسلة الإمداد—ليقرأ المشغّلون والسائقون والعملاء حقيقة الشحنة نفسها.',
    aboutSubFeatures: [
      {
        id: 'integration-first',
        icon: 'plug',
        title: 'التكامل أولاً',
        subtitle: 'نربط نظام المستودعات والموارد والناقلين الذين تشغّلونهم قبل إضافة أي جديد.',
      },
      {
        id: 'visibility',
        icon: 'eye',
        title: 'الرؤية بالتصميم',
        subtitle: 'سجل واحد مطابَق يغذّي كل واجهة للمشغّل والسائق والعميل.',
      },
    ],
    aboutChecklist: [
      'الطلبات والمخزون والمستودعات والنقل والتتبع على نموذج واحد',
      'تحسين مسار وأسطول قابل للتفسير يستطيع المخطِّط تجاوزه',
      'قوائم استثناءات بمالكين محددين ومسار عودة',
      'واجهات ثنائية اللغة للمشغّل والسائق والعميل',
    ],
    aboutCta: 'لنرسم رحلة الطلب حتى التسليم',
    aboutBadgeValue: '٦',
    aboutBadgeLabel: 'مراحل مسجَّلة من الطلب إلى المطابقة',
    aboutPanelLabel: 'سجل الشحنة',
    aboutPanelStatuses: [
      { id: 'order', label: 'التقاط الطلب', state: 'مسجَّل', done: true },
      { id: 'inventory', label: 'تخصيص المخزون', state: 'محجوز', done: true },
      { id: 'dispatch', label: 'تم الإرسال', state: 'مخطَّط', done: true },
      { id: 'transit', label: 'أثناء النقل', state: 'متتبَّع', done: false },
      { id: 'delivery', label: 'إثبات التسليم', state: 'معلَّق', done: false },
    ],
    aboutImageAlt: 'مركبة موجَّهة آلياً تنقل رفَّ قطع محمَّلاً عبر أرضية مستودع.',

    domainsEyebrow: 'مجالات الحلول',
    domainsTitle: 'المجالات التي نهندسها للوجستيات',
    domainsIntro:
      'كل مجال نظام قابل للبناء بنقاط الخصائص الحقيقية التي نسلّمها—اختاروا أين يعيش أول مسار قابل للمطابقة.',
    domainsTabsLabel: 'مجالات حلول اللوجستيات',
    domainsLeadLabel: 'ما يغطيه هذا المجال',
    domains: [
      {
        id: 'warehouse',
        icon: 'boxes',
        label: 'أنظمة المستودعات',
        lead: 'أنظمة إدارة المستودعات والمخزون التي تبقي الجرد الفعلي والسجل مطابَقين لموقع ومالك واحد.',
        features: [
          'مهام الاستلام والتخزين والتجهيز والتغليف والإرسال',
          'الجرد الدوري والمطابقة مع المخزون الفعلي',
          'تتبع المواقع والأرفف والدُفعات والأرقام التسلسلية',
          'مسارات مستودع جاهزة للباركود والأجهزة اليدوية',
        ],
      },
      {
        id: 'fleet',
        icon: 'truck',
        label: 'الأسطول والنقل',
        lead: 'أنظمة النقل والإرسال والأسطول التي تحوّل الطلبات إلى قرارات إرسال قابلة للدفاع ومسارات محسّنة.',
        features: [
          'اختيار الناقل والتسعير وإنشاء بيانات الشحن',
          'تحسين المسار والحمولة والأسطول مع إمكانية التجاوز',
          'تطبيق جوال للسائق للمهام وإثبات التسليم',
          'استقبال القياس عن بُعد لموقع الأسطول الحي',
        ],
      },
      {
        id: 'freight',
        icon: 'ship',
        label: 'الشحن والجمارك',
        lead: 'أنظمة الشحن والتوثيق التي تجهّز السجلات والمستندات بينما تحتفظ الجهات بالتخليص.',
        features: [
          'سجلات الشحنات والحاويات والإرساليات',
          'تجهيز المستندات وتتبع حالتها',
          'تبادل بيانات الشركاء ووكلاء الشحن',
          'التقاط التكاليف والرسوم للمطابقة',
        ],
      },
      {
        id: 'last-mile',
        icon: 'map',
        label: 'الميل الأخير والتسليم',
        lead: 'أنظمة الميل الأخير التي تخطط نوافذ التسليم وتلتقط الإثبات وتُبقي العملاء على اطلاع.',
        features: [
          'نوافذ التسليم والتوجيه وإعادة المحاولات',
          'صفحات تتبع للعملاء وإشعارات',
          'التقاط إثبات التسليم والتوقيع والصور',
          'معالجة المرتجعات واستثناءات التسليم الفاشل',
        ],
      },
      {
        id: 'control-tower',
        icon: 'radar',
        label: 'تحليلات برج التحكم',
        lead: 'لوحات وتحليلات تُظهر الاستثناءات ومستويات الخدمة وأداء الشبكة على واجهة واحدة.',
        features: [
          'حالة شحنات حية وقوائم استثناءات',
          'مراقبة مستوى الخدمة والالتزام بالمواعيد وزمن المكوث',
          'لوحات أداء الشبكة والتكلفة',
          'تنبيه قبل أن يضطر العميل للسؤال',
        ],
      },
    ],

    statsLabel: 'كيف يُبنى هذا التعاون',
    statsNote:
      'تصف هذه الأرقام منهجنا وهذه الصفحة، لا نتائج عملاء ولا ضمانات أداء.',
    stats: [
      { id: 'languages', value: 2, label: 'لغتا تشغيل مدمجتان منذ اليوم الأول' },
      { id: 'stages', value: 4, label: 'مراحل تسليم من الاكتشاف إلى الإطلاق' },
      { id: 'paths', value: 4, label: 'مسارات بناء مترابطة إلى خدمات كلاود توبيا الحقيقية' },
      { id: 'ownership', value: 100, suffix: '٪', label: 'تسليمات مصممة بمالك محدد وخطوة تالية' },
    ],
    radialsLabel: 'يُضبط برج التحكم حول أهدافكم',
    radialsNote:
      'أهداف توضيحية يحددها المشغّل لكل شبكة—هذه أمثلة مؤشرات، لا ضمان أداء من كلاود توبيا.',
    radials: [
      { id: 'visibility', percent: 95, label: 'هدف الرؤية في الموعد' },
      { id: 'automation', percent: 70, label: 'خطوات يدوية مؤتمتة' },
    ],

    workflowEyebrow: 'كيف ننفّذ',
    workflowTitle: 'مسار تسليم مبني لشبكات متحركة',
    workflowIntro:
      'ننتقل من السياق إلى الإطلاق عبر مراحل مملوكة، ليتمكن التشغيل والشركاء والعملاء من متابعة كل تسليم. تابعوا إضاءة كل مرحلة بالتسلسل.',
    workflowRegionLabel: 'مراحل تسليم اللوجستيات لدى كلاود توبيا',
    steps: [
      {
        id: 'discovery',
        title: 'الاكتشاف ورسم المسار',
        subtitle: 'نرسم الخط والأنظمة والناقلين والمالكين الذين يعتمد عليهم كل سجل.',
      },
      {
        id: 'design',
        title: 'الهندسة وتصميم التكامل',
        subtitle: 'نصمم الطبقات وتكاملات التبادل الإلكتروني وواجهات البرمجة حول الأنظمة التي تشغّلونها.',
      },
      {
        id: 'build',
        title: 'البناء والتكامل',
        subtitle: 'نهندس المسارات والسجل المطابَق، ثم نربط الناقلين خلف بيئات تجريبية.',
      },
      {
        id: 'launch',
        title: 'الإطلاق والتحسين',
        subtitle: 'نطلق المسار المحدد، ونراقبه على برج التحكم، ونحسّنه بناءً على الأدلة.',
      },
    ],

    valuesEyebrow: 'لماذا تختار الفرق كلاود توبيا',
    valuesTitle: 'ما الذي يُبقي المنصة اللوجستية موثوقة',
    valuesIntro:
      'تُبقي هذه النقاط العملية جديرة بالثقة بعد أول شحنة بوقت طويل.',
    values: [
      {
        id: 'scalability',
        icon: 'layers',
        title: 'تتوسع مع الحجم',
        subtitle: 'أنظمة سحابية تنمو مع حجم الشحنات دون فقدان قابلية التتبع.',
      },
      {
        id: 'visibility',
        icon: 'eye',
        title: 'رؤية الشحنات',
        subtitle: 'سجل واحد مطابَق يقود كل واجهة للمشغّل والسائق والعميل.',
      },
      {
        id: 'integration',
        icon: 'plug',
        title: 'التكامل أولاً',
        subtitle: 'اتصالات إلكترونية وبرمجية بالناقلين وأنظمة الموارد والشركاء الذين تستخدمونهم.',
      },
      {
        id: 'security',
        icon: 'shield',
        title: 'الأمان والوصول',
        subtitle: 'وصول بحسب الأدوار وتشفير وسجلات تدقيق مهندَسة في الأساس.',
      },
      {
        id: 'flexibility',
        icon: 'refresh',
        title: 'تسليم مرن',
        subtitle: 'ابدؤوا بخط أو مستودع واحد ثم توسّعوا بعد أن يتطابق من طرف إلى طرف.',
      },
      {
        id: 'observability',
        icon: 'gauge',
        title: 'قابلية المراقبة',
        subtitle: 'مراقبة وتنبيهات تُظهر الاستثناءات قبل أن يشعر بها العميل.',
      },
    ],

    showcaseEyebrow: 'رؤية الشحنات',
    showcaseTitle: 'تجارب التتبع التي نبنيها',
    showcaseIntro:
      'تهندس كلاود توبيا واجهات تتبع الشحنات وبرج التحكم التي يعتمد عليها مشغّلوكم وعملاؤكم—حالة واحدة مطابَقة، تنعكس في كل مكان.',
    showcaseNote:
      'مثال توضيحي لواجهة تبنيها كلاود توبيا. ليست متتبِّعاً حياً لأي ناقل.',
    showcaseCapabilities: [
      {
        id: 'global-ops',
        icon: 'radar',
        title: 'نموذج حالة واحد',
        subtitle: 'مسح الناقل والقياس عن بُعد مطابَقان في خط زمن شحنة واحد.',
      },
      {
        id: 'notifications',
        icon: 'scan',
        title: 'تنبيهات استباقية',
        subtitle: 'تظهر الاستثناءات على برج التحكم قبل أن يضطر العميل للسؤال.',
      },
      {
        id: 'customer-view',
        icon: 'eye',
        title: 'تتبع العميل',
        subtitle: 'صفحات تتبع ثنائية اللغة تقرأ من السجل المطابَق نفسه.',
      },
    ],
    showcasePanelLabel: 'واجهة تتبع توضيحية',
    showcaseShipmentLabel: 'الشحنة',
    showcaseShipmentId: 'CT-482170',
    showcaseEtaLabel: 'التسليم المتوقع',
    showcaseEtaValue: 'نافذة مثال',
    showcaseStatuses: [
      { id: 'picked', label: 'تم التجهيز والتغليف', state: 'مكتمل', done: true },
      { id: 'dispatched', label: 'أُرسلت من المركز', state: 'مكتمل', done: true },
      { id: 'transit', label: 'خارج للتسليم', state: 'نشط', done: true },
      { id: 'delivered', label: 'تم التسليم', state: 'معلَّق', done: false },
    ],
    showcaseImageAlt: 'دوّار فرز دائري يغذّي خط ناقل بالطرود داخل مركز توزيع.',

    guaranteesTitle: 'كيف نلتزم بالتسليم',
    guarantees: [
      {
        id: 'support',
        icon: 'headset',
        title: 'دعم مدعوم بمستوى خدمة',
        subtitle: 'استجابة ومراقبة متفق عليهما بعد تشغيل نظامكم.',
      },
      {
        id: 'onboarding',
        icon: 'clock',
        title: 'انطلاق سريع ومحدد',
        subtitle: 'نبدأ بمسار واحد قابل للمطابقة لتصل القيمة مبكراً.',
      },
      {
        id: 'team',
        icon: 'users',
        title: 'فريق تسليم مخصص',
        subtitle: 'فريق هندسي محدد يتعلّم عمليتكم.',
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
          'رسم المسار والأنظمة والناقلين',
          'جرد التكاملات والبيانات',
          'نموذج الاستثناءات والملكية',
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
          'المسار الأساسي: من الطلب إلى الإرسال أو التسليم',
          'سجل شحنة واحد مطابَق',
          'تكامل ناقل موثوق واحد',
          'لوحة مشغّل وواجهة تتبع',
        ],
      },
      {
        id: 'scale-harden',
        plan: 'التوسع والتحصين',
        meta: 'مرحلة النمو',
        popular: false,
        features: [
          'الأداء وتحليلات برج التحكم',
          'توسيع تكاملات الناقلين والشركاء',
          'تحسين المسار والأسطول',
          'إطلاق تشغيل ثنائي اللغة',
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
          'تقارير برج التحكم',
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
          'الجاهزية لمواسم الذروة',
        ],
      },
    ],
    pricingCta: 'ناقشوا هذا النطاق',
    pricingFootnote: 'يبدأ كل تعاون بمسار واحد محدد وقابل للمطابقة.',

    marqueeLabel: 'ما الذي نهندسه',
    marqueeWords: ['المستودعات', 'الأسطول', 'الرؤية', 'التكاملات', 'التحسين', 'برج التحكم'],

    servicePathsEyebrow: 'مسارات التنفيذ',
    learnMore: 'استكشفوا هذا المسار',
    contextualAction: 'استكشفوا أنظمة عمليات اللوجستيات',

    mapEyebrow: 'أين نسلّم',
    mapTitle: 'تسليم ثنائي اللغة عبر المنطقة وخارجها',
    mapIntro:
      'تبني كلاود توبيا أنظمة لوجستية لفرق عبر دول الخليج وتركيا والمنطقة الأوسع—اختاروا نقطة لتروا كيف نتعاون.',
    mapCanvasLabel: 'نطاق تسليم إقليمي توضيحي',
    mapContactLabel: 'تحدثوا إلينا',
    mapContactTitle: 'ابدؤوا بمسار واحد',
    mapContactBody:
      'تواصلوا مع مهندسينا عبر واتساب—موجَّه إلى أقرب فريق كلاود توبيا لمنطقتكم.',
    mapContactCta: 'تحدثوا إلى مهندسينا',
    regions: [
      { id: 'gcc', label: 'الخليج', title: 'عمليات الخليج', note: 'أنظمة مستودعات وأسطول وميل أخير لشبكات الخليج.', x: 62, y: 54 },
      { id: 'turkiye', label: 'تركيا', title: 'تسليم في تركيا', note: 'منصات لوجستية عابرة للحدود ومحلية.', x: 50, y: 38 },
      { id: 'mena', label: 'المنطقة الأوسع', title: 'وصول إقليمي', note: 'بناء برج تحكم وتكاملات ثنائي اللغة.', x: 44, y: 60 },
    ],

    faqEyebrow: 'أسئلة القرار',

    ctaEyebrow: 'ابدؤوا البناء',
    ctaTitle: 'مستعدون لمنح شبكتكم رؤية واحدة مطابَقة؟',
    ctaSubtitle: 'أحضروا مساراً واحداً والفرق التي تملكه، وسنحوّله إلى موجز قابل للبناء.',
    ctaButton: 'لنرسم رحلة الطلب حتى التسليم',
    ctaSecondaryTitle: 'تحدثوا إلى مهندسينا',
    ctaSecondaryNote: 'مكالمة قصيرة لتحديد نطاق أول مسار قابل للمطابقة.',
    ctaSecondaryButton: 'ناقشوا مع الفريق',

    newTab: '(يفتح في تبويب جديد)',
  },
} as const satisfies Record<Locale, LogisticsContent>

export type { IconKey, LogisticsDomain, LogisticsRegion, LogisticsTrackStatus }
