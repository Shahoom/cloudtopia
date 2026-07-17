import type { Locale } from '@/lib/i18n/config'

/**
 * Bilingual microcopy for the ported Lager sections that are NOT driven by the
 * IndustryPageDefinition (hero, service-bridge, and FAQ come from the
 * definition). Arabic is authored MSA — the brand reads كلاود توبيا in prose.
 *
 * Framing: CloudTopia ENGINEERS commerce & retail systems. Stats are structural
 * facts about the approach and this page (languages, delivery stages, build
 * paths, owned handoffs) — never fabricated sales, GMV, or client-outcome
 * metrics. Prices, stock, and product data belong to the operator, never to
 * this page.
 *
 * Imagery: the licensed photo set deliberately carries the omnichannel story
 * this merged world exists to tell — physical retail (hero 1, commerce panel)
 * and online fulfilment (hero 2, operations panel). Alt text describes the
 * scene only; it never names a brand, product, or price. `width`/`height` are
 * the real pixel dimensions of the files on disk.
 */

type EcommerceHeroSlide = {
  id: string
  kicker: string
  title: string
  text: string
  image: string
  imageAlt: string
}

type EcommerceCapability = {
  id: string
  title: string
  subtitle: string
}

type EcommerceSolution = {
  id: string
  eyebrow: string
  title: string
  subtitle: string
}

type EcommercePanel = {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  /** Panel media header. Real photo, real pixel dimensions. */
  image: string
  imageAlt: string
  width: number
  height: number
  items: readonly string[]
}

type EcommerceTab = {
  id: string
  label: string
  headline: string
  description: string
}

type EcommerceStretchPanel = {
  id: string
  label: string
  title: string
  description: string
}

type EcommerceStat = {
  id: string
  value: number
  prefix?: string
  suffix?: string
  label: string
}

type EcommercePhase = {
  id: string
  number: string
  title: string
  body: string
}

type EcommerceContent = {
  skip: string
  industries: string
  breadcrumb: string

  heroKicker: string
  heroPrev: string
  heroNext: string
  heroSlideLabel: string
  heroSecondaryCta: string
  heroSlides: readonly EcommerceHeroSlide[]

  capabilitiesEyebrow: string
  capabilitiesTitle: string
  capabilitiesIntro: string
  capabilities: readonly EcommerceCapability[]

  solutionsEyebrow: string
  solutionsTitle: string
  solutionsIntro: string
  solutionAction: string
  solutions: readonly EcommerceSolution[]

  panelsEyebrow: string
  panelsTitle: string
  panelsIntro: string
  panels: readonly EcommercePanel[]

  tabsyEyebrow: string
  tabsyTitle: string
  tabsyIntro: string
  tabsyHint: string
  tabs: readonly EcommerceTab[]

  stackEyebrow: string
  stackTitle: string
  stackIntro: string
  stackRegionLabel: string
  stackPanels: readonly EcommerceStretchPanel[]

  statsLabel: string
  statsNote: string
  stats: readonly EcommerceStat[]

  methodologyEyebrow: string
  methodologyTitle: string
  methodologyIntro: string
  phases: readonly EcommercePhase[]

  servicePathsEyebrow: string
  learnMore: string
  commerceServiceAction: string

  faqEyebrow: string

  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
  /** The CTA band keeps `hero-warm.jpg`: an abstract blur sitting under a
   *  near-opaque brand duotone, where it reads as texture only. It carries no
   *  information a reader could miss, so it stays genuinely decorative (''). */
  ctaImageAlt: string

  newTab: string
}

/* Licensed photography. Dimensions verified against the files on disk.
 * Physical retail: RETAIL_FLOOR (1800×1350), BOUTIQUE_SHELVES (1800×1201).
 * Online fulfilment: FULFILMENT_FLOOR (1800×1200), STOCK_AISLE (1800×1198). */
const RETAIL_FLOOR = '/images/industries/ecommerce-retail/ecommerce-retail-1.jpg'
const FULFILMENT_FLOOR = '/images/industries/ecommerce-retail/ecommerce-retail-2.jpg'
const STOCK_AISLE = '/images/industries/ecommerce-retail/ecommerce-retail-3.jpg'
const BOUTIQUE_SHELVES = '/images/industries/ecommerce-retail/ecommerce-retail-4.jpg'

export const ecommerceRetailLandingCopy = {
  en: {
    skip: 'Skip to e-commerce & retail industry content',
    industries: 'Industries',
    breadcrumb: 'Breadcrumb',

    heroKicker: 'Commerce & retail engineering',
    heroPrev: 'Previous slide',
    heroNext: 'Next slide',
    heroSlideLabel: 'Hero slides',
    heroSecondaryCta: 'See the build paths',
    heroSlides: [
      {
        id: 'storefront',
        kicker: 'Storefronts & headless commerce',
        title: 'We build the commerce and retail stack behind the buy button.',
        text: 'Fast, bilingual storefronts and PWAs with catalog, search, and a checkout that reads one reconciled source of truth.',
        image: RETAIL_FLOOR,
        imageAlt:
          'A bright, modern retail store floor: clothing rails, a central display table, and a shopper browsing the merchandise.',
      },
      {
        id: 'omnichannel',
        kicker: 'Inventory, POS & omnichannel',
        title: 'One reconciled record across web, marketplace, and store.',
        text: 'Inventory, order management, and point of sale that keep availability and fulfillment consistent on every channel a customer touches.',
        image: FULFILMENT_FLOOR,
        imageAlt:
          'A fulfilment warehouse aisle lined with tall pallet racking, staff crossing the floor in motion blur.',
      },
    ],

    capabilitiesEyebrow: 'What we bring to commerce & retail',
    capabilitiesTitle: 'Six engineering capabilities behind the store',
    capabilitiesIntro:
      'CloudTopia builds the layers a commerce & retail platform runs on—each one recorded, reconcilable, and owned by your team.',
    capabilities: [
      {
        id: 'storefronts',
        title: 'Headless storefronts & PWAs',
        subtitle: 'Fast, bilingual web and progressive-web stores built on modern, composable front ends.',
      },
      {
        id: 'catalog',
        title: 'Catalog, search & merchandising',
        subtitle: 'Product data, variants, and relevant search that stay consistent across every channel.',
      },
      {
        id: 'checkout',
        title: 'Checkout & payments',
        subtitle: 'Cart, tax presentation, and validated payment integrations that record one reconciled order.',
      },
      {
        id: 'operations',
        title: 'Inventory, OMS & POS',
        subtitle: 'Stock, order management, and point of sale that keep availability true web-to-store.',
      },
      {
        id: 'data',
        title: 'Data & personalization',
        subtitle: 'Analytics, recommendations, and loyalty built on the same reconciled event record.',
      },
      {
        id: 'scale',
        title: 'Scale & performance',
        subtitle: 'Cloud-native systems that hold up through peaks and campaigns without losing traceability.',
      },
    ],

    solutionsEyebrow: 'Commerce solution domains',
    solutionsTitle: 'Where a commerce & retail build usually starts',
    solutionsIntro:
      'Four repeatable domains we engineer. Each is a genuine solution taxonomy, not a fixed package—scope is set with you.',
    solutionAction: 'Explore',
    solutions: [
      {
        id: 'storefront-pwa',
        eyebrow: 'Direct-to-consumer',
        title: 'Storefront & PWA',
        subtitle: 'A branded, bilingual store with catalog, search, and checkout on a composable front end.',
      },
      {
        id: 'marketplace',
        eyebrow: 'Multi-seller',
        title: 'Marketplace platforms',
        subtitle: 'Multi-vendor catalogs, seller onboarding, and split orders over one reconciled record.',
      },
      {
        id: 'retail-pos',
        eyebrow: 'In-store',
        title: 'Retail POS & in-store',
        subtitle: 'Point of sale, click-and-collect, and store operations connected to the same stock and orders.',
      },
      {
        id: 'subscription',
        eyebrow: 'Recurring',
        title: 'Subscription & D2C',
        subtitle: 'Recurring billing, subscriptions, and repeat-purchase journeys the operator owns.',
      },
    ],

    panelsEyebrow: 'Two flagship capabilities',
    panelsTitle: 'Commerce platforms and retail operations, engineered together',
    panelsIntro:
      'Most builds combine a customer-facing commerce platform with the retail operations behind it. We engineer both against one source of truth.',
    panels: [
      {
        id: 'commerce-platforms',
        eyebrow: 'Customer-facing',
        title: 'Commerce platforms',
        subtitle: 'Everything the shopper touches, from first search to a confirmed order.',
        image: BOUTIQUE_SHELVES,
        imageAlt:
          'A boutique display table and shelves styled with folded garments, bags, and shoes under pendant lighting.',
        width: 1800,
        height: 1201,
        items: [
          'Headless & composable storefronts',
          'Shopify, Medusa & custom builds',
          'Custom checkout & payments',
          'Product information (PIM) & search',
        ],
      },
      {
        id: 'retail-operations',
        eyebrow: 'Behind the store',
        title: 'Retail operations',
        subtitle: 'Everything the operator runs so availability, orders, and fulfillment stay true.',
        image: STOCK_AISLE,
        imageAlt:
          'Two warehouse staff walking a stock aisle between blue racking, one holding a barcode scanner and the other a clipboard.',
        width: 1800,
        height: 1198,
        items: [
          'Point of sale (POS) & in-store',
          'Inventory & warehouse',
          'Order management (OMS)',
          'Store analytics & reporting',
        ],
      },
    ],

    tabsyEyebrow: 'Explore the commerce disciplines',
    tabsyTitle: 'Hover a discipline to see what we engineer',
    tabsyIntro:
      'Every commerce platform is a set of disciplines. Move across them to see how CloudTopia engineers each one.',
    tabsyHint: 'Hover or focus a discipline',
    tabs: [
      {
        id: 'storefront',
        label: 'Storefront',
        headline: 'Storefronts that load fast and convert in two languages.',
        description: 'Composable, bilingual front ends built for Core Web Vitals and accessible by default.',
      },
      {
        id: 'search',
        label: 'Search',
        headline: 'Search and merchandising that surface the right product.',
        description: 'Relevant search, filters, and merchandising over a reconciled, structured catalog.',
      },
      {
        id: 'payments',
        label: 'Payments',
        headline: 'Checkout and payments that record one reconciled order.',
        description: 'Validated gateways, tax presentation, and a cart engineered around approved sources.',
      },
      {
        id: 'oms',
        label: 'Order management',
        headline: 'Order management that keeps every channel in sync.',
        description: 'One order record from web, marketplace, and store through to fulfillment.',
      },
      {
        id: 'pos',
        label: 'POS',
        headline: 'Point of sale connected to the same stock and orders.',
        description: 'In-store checkout, click-and-collect, and returns on the shared source of truth.',
      },
      {
        id: 'loyalty',
        label: 'Loyalty',
        headline: 'Loyalty and repeat journeys the operator owns.',
        description: 'Accounts, loyalty, and re-purchase flows built on the same reconciled event record.',
      },
    ],

    stackEyebrow: 'The retail stack',
    stackTitle: 'What we build across the commerce & retail stack',
    stackIntro:
      'Each panel is a build layer. Hover or focus one to expand it—every layer connects to the next through a reconcilable handoff.',
    stackRegionLabel: 'Commerce & retail build layers',
    stackPanels: [
      {
        id: 'storefront',
        label: 'Storefront',
        title: 'Storefront & PWA',
        description: 'The bilingual front end shoppers browse, search, and buy on.',
      },
      {
        id: 'checkout',
        label: 'Checkout',
        title: 'Checkout & payments',
        description: 'Cart, tax presentation, and validated payment into one recorded order.',
      },
      {
        id: 'oms',
        label: 'OMS',
        title: 'Order management & inventory',
        description: 'Stock and orders kept consistent from every channel to fulfillment.',
      },
      {
        id: 'pos',
        label: 'POS',
        title: 'In-store POS',
        description: 'Point of sale and click-and-collect on the same source of truth.',
      },
      {
        id: 'personalization',
        label: 'Data',
        title: 'Personalization & analytics',
        description: 'Recommendations, loyalty, and reporting on the reconciled record.',
      },
    ],

    statsLabel: 'How this engagement is built',
    statsNote:
      'These describe our approach and this page—not sales, GMV, or performance guarantees. Your figures come from your data.',
    stats: [
      { id: 'languages', value: 2, label: 'Shopping languages, built in from day one' },
      { id: 'stack', value: 5, label: 'Build layers from storefront to POS' },
      { id: 'paths', value: 5, label: 'Connected build paths into real CloudTopia services' },
      { id: 'ownership', value: 100, suffix: '%', label: 'Handoffs designed with a named owner and next action' },
    ],

    methodologyEyebrow: 'How we deliver',
    methodologyTitle: 'A delivery path from catalog to checkout',
    methodologyIntro:
      'We move from context to launch in owned phases, so merchandising, operations, and finance can follow every handoff.',
    phases: [
      {
        id: 'discovery',
        number: '01',
        title: 'Discovery & scoping',
        body: 'Map the flow, catalog, systems, marketplaces, and the owners each record depends on. Fix the smallest reconcilable first scope.',
      },
      {
        id: 'architecture',
        number: '02',
        title: 'Architecture & data model',
        body: 'Design the storefront, catalog, order, and integration model around one source of truth and the providers you confirm.',
      },
      {
        id: 'build',
        number: '03',
        title: 'Build & integrate',
        body: 'Engineer the storefront, checkout, and operations, and connect validated payment, carrier, and marketplace integrations behind sandboxes.',
      },
      {
        id: 'launch',
        number: '04',
        title: 'Migrate & launch',
        body: 'Migrate catalog, customers, and orders with a reconciliation step, preserve URLs with redirects, and cut over once both systems agree.',
      },
      {
        id: 'scale',
        number: '05',
        title: 'Scale & optimize',
        body: 'Watch the flow with analytics and observability, harden for peaks and campaigns, and improve on real evidence.',
      },
    ],

    servicePathsEyebrow: 'Paths to implementation',
    learnMore: 'Explore this path',
    commerceServiceAction: 'Explore commerce and storefront development',

    faqEyebrow: 'Decision questions',

    ctaEyebrow: 'Start building',
    ctaTitle: 'Ready to build a commerce & retail platform your customers trust?',
    ctaSubtitle: 'Bring one flow and the teams that own it. We will turn it into a bounded, buildable brief.',
    ctaButton: 'Map your catalog-to-checkout flow',
    ctaImageAlt: '',

    newTab: '(opens in new tab)',
  },
  ar: {
    skip: 'تخطَّ إلى محتوى قطاع التجارة الإلكترونية والتجزئة',
    industries: 'القطاعات',
    breadcrumb: 'مسار التنقل',

    heroKicker: 'هندسة التجارة والتجزئة',
    heroPrev: 'الشريحة السابقة',
    heroNext: 'الشريحة التالية',
    heroSlideLabel: 'شرائح العرض',
    heroSecondaryCta: 'اطّلعوا على مسارات البناء',
    heroSlides: [
      {
        id: 'storefront',
        kicker: 'المتاجر والتجارة عديمة الرأس',
        title: 'نبني منظومة التجارة والتجزئة خلف زر الشراء.',
        text: 'متاجر وتطبيقات ويب تقدمية سريعة ثنائية اللغة، بكتالوج وبحث ودفع يقرأ مصدر حقيقة واحداً مطابَقاً.',
        image: RETAIL_FLOOR,
        imageAlt:
          'صالة متجر تجزئة حديثة جيدة الإضاءة: قضبان ملابس وطاولة عرض مركزية ومتسوّقة تتصفّح المعروضات.',
      },
      {
        id: 'omnichannel',
        kicker: 'المخزون ونقاط البيع وتعدد القنوات',
        title: 'سجل واحد مطابَق عبر الويب والسوق والمتجر.',
        text: 'مخزون وإدارة طلبات ونقطة بيع تُبقي التوفر والتجهيز متسقاً على كل قناة يلمسها العميل.',
        image: FULFILMENT_FLOOR,
        imageAlt:
          'ممر في مستودع تجهيز الطلبات تصطف على جانبيه رفوف منصات عالية، وموظفون يعبرون الصالة بحركة ضبابية.',
      },
    ],

    capabilitiesEyebrow: 'ما الذي نقدمه للتجارة والتجزئة',
    capabilitiesTitle: 'ست قدرات هندسية خلف المتجر',
    capabilitiesIntro:
      'تبني كلاود توبيا الطبقات التي تعمل عليها منصة التجارة والتجزئة—كل منها مسجَّل وقابل للمطابقة وذو مالك من فريقكم.',
    capabilities: [
      {
        id: 'storefronts',
        title: 'متاجر عديمة الرأس وتطبيقات ويب تقدمية',
        subtitle: 'متاجر ويب وتطبيقات ويب تقدمية سريعة ثنائية اللغة على واجهات حديثة مركّبة.',
      },
      {
        id: 'catalog',
        title: 'الكتالوج والبحث والعرض التجاري',
        subtitle: 'بيانات منتجات وخيارات وبحث ملائم تبقى متسقة عبر كل قناة.',
      },
      {
        id: 'checkout',
        title: 'الدفع والسداد',
        subtitle: 'سلة وعرض ضريبة وتكاملات دفع موثوقة تسجّل طلباً واحداً مطابَقاً.',
      },
      {
        id: 'operations',
        title: 'المخزون وإدارة الطلبات ونقاط البيع',
        subtitle: 'مخزون وإدارة طلبات ونقطة بيع تُبقي التوفر صحيحاً من الويب إلى المتجر.',
      },
      {
        id: 'data',
        title: 'البيانات والتخصيص',
        subtitle: 'تحليلات وتوصيات وولاء مبنية على سجل الأحداث المطابَق نفسه.',
      },
      {
        id: 'scale',
        title: 'التوسّع والأداء',
        subtitle: 'أنظمة سحابية تصمد في الذروات والحملات دون فقدان قابلية التتبع.',
      },
    ],

    solutionsEyebrow: 'مجالات حلول التجارة',
    solutionsTitle: 'من أين يبدأ بناء التجارة والتجزئة عادةً',
    solutionsIntro:
      'أربعة مجالات متكررة نهندسها. كل منها تصنيف حلول حقيقي، لا حزمة ثابتة—يُحدَّد النطاق معكم.',
    solutionAction: 'استكشفوا',
    solutions: [
      {
        id: 'storefront-pwa',
        eyebrow: 'مباشر للمستهلك',
        title: 'المتجر وتطبيق الويب التقدمي',
        subtitle: 'متجر بعلامة تجارية ثنائي اللغة بكتالوج وبحث ودفع على واجهة مركّبة.',
      },
      {
        id: 'marketplace',
        eyebrow: 'متعدد البائعين',
        title: 'منصات الأسواق',
        subtitle: 'كتالوجات متعددة البائعين وتسجيل بائعين وطلبات مقسّمة فوق سجل واحد مطابَق.',
      },
      {
        id: 'retail-pos',
        eyebrow: 'داخل المتجر',
        title: 'نقاط البيع والتجزئة',
        subtitle: 'نقطة بيع واستلام من المتجر وعمليات متجر مرتبطة بالمخزون والطلبات نفسها.',
      },
      {
        id: 'subscription',
        eyebrow: 'متكرر',
        title: 'الاشتراكات والبيع المباشر',
        subtitle: 'فوترة متكررة واشتراكات ورحلات شراء متكرر يملكها المشغل.',
      },
    ],

    panelsEyebrow: 'قدرتان رئيسيتان',
    panelsTitle: 'منصات التجارة وعمليات التجزئة، مهندَستان معاً',
    panelsIntro:
      'تجمع معظم عمليات البناء منصة تجارة تواجه العميل مع عمليات التجزئة خلفها. نهندس كلتيهما مقابل مصدر حقيقة واحد.',
    panels: [
      {
        id: 'commerce-platforms',
        eyebrow: 'تواجه العميل',
        title: 'منصات التجارة',
        subtitle: 'كل ما يلمسه المتسوق، من أول بحث إلى طلب مؤكد.',
        image: BOUTIQUE_SHELVES,
        imageAlt:
          'طاولة عرض ورفوف في متجر بوتيك مرتّبة بملابس مطوية وحقائب وأحذية تحت إضاءة معلّقة.',
        width: 1800,
        height: 1201,
        items: [
          'متاجر عديمة الرأس ومركّبة',
          'Shopify وMedusa وحلول مخصصة',
          'دفع وسداد مخصص',
          'معلومات المنتج (PIM) والبحث',
        ],
      },
      {
        id: 'retail-operations',
        eyebrow: 'خلف المتجر',
        title: 'عمليات التجزئة',
        subtitle: 'كل ما يديره المشغل ليبقى التوفر والطلبات والتجهيز صحيحاً.',
        image: STOCK_AISLE,
        imageAlt:
          'موظفتان تسيران في ممر مخزون بين رفوف زرقاء، إحداهما تحمل ماسح باركود والأخرى تحمل حافظة أوراق.',
        width: 1800,
        height: 1198,
        items: [
          'نقطة البيع وداخل المتجر',
          'المخزون والمستودع',
          'إدارة الطلبات (OMS)',
          'تحليلات المتجر والتقارير',
        ],
      },
    ],

    tabsyEyebrow: 'استكشفوا تخصصات التجارة',
    tabsyTitle: 'مرّروا فوق تخصص لترَوا ما نهندسه',
    tabsyIntro:
      'كل منصة تجارة مجموعة من التخصصات. تنقلوا بينها لترَوا كيف تهندس كلاود توبيا كلاً منها.',
    tabsyHint: 'مرّروا أو ركّزوا على تخصص',
    tabs: [
      {
        id: 'storefront',
        label: 'المتجر',
        headline: 'متاجر تُحمَّل بسرعة وتحوّل بلغتين.',
        description: 'واجهات مركّبة ثنائية اللغة مبنية لمؤشرات الويب الأساسية وسهلة الوصول بالتصميم.',
      },
      {
        id: 'search',
        label: 'البحث',
        headline: 'بحث وعرض تجاري يُظهران المنتج المناسب.',
        description: 'بحث ملائم وتصفية وعرض تجاري فوق كتالوج مطابَق منظَّم.',
      },
      {
        id: 'payments',
        label: 'المدفوعات',
        headline: 'دفع يسجّل طلباً واحداً مطابَقاً.',
        description: 'بوابات موثوقة وعرض ضريبة وسلة مهندَسة حول مصادر معتمدة.',
      },
      {
        id: 'oms',
        label: 'إدارة الطلبات',
        headline: 'إدارة طلبات تُبقي كل قناة متزامنة.',
        description: 'سجل طلب واحد من الويب والسوق والمتجر حتى التجهيز.',
      },
      {
        id: 'pos',
        label: 'نقطة البيع',
        headline: 'نقطة بيع مرتبطة بالمخزون والطلبات نفسها.',
        description: 'دفع في المتجر واستلام وإرجاعات على مصدر الحقيقة المشترك.',
      },
      {
        id: 'loyalty',
        label: 'الولاء',
        headline: 'ولاء ورحلات تكرار يملكها المشغل.',
        description: 'حسابات وولاء ورحلات شراء متكرر مبنية على سجل الأحداث المطابَق نفسه.',
      },
    ],

    stackEyebrow: 'رف التجزئة',
    stackTitle: 'ما نبنيه عبر منظومة التجارة والتجزئة',
    stackIntro:
      'كل لوحة طبقة بناء. مرّروا أو ركّزوا على واحدة لتتوسع—تتصل كل طبقة بما يليها عبر تسليم قابل للمطابقة.',
    stackRegionLabel: 'طبقات بناء التجارة والتجزئة',
    stackPanels: [
      {
        id: 'storefront',
        label: 'المتجر',
        title: 'المتجر وتطبيق الويب التقدمي',
        description: 'الواجهة ثنائية اللغة التي يتصفح ويبحث ويشتري عليها المتسوق.',
      },
      {
        id: 'checkout',
        label: 'الدفع',
        title: 'الدفع والسداد',
        description: 'سلة وعرض ضريبة ودفع موثوق في طلب واحد مسجَّل.',
      },
      {
        id: 'oms',
        label: 'الطلبات',
        title: 'إدارة الطلبات والمخزون',
        description: 'مخزون وطلبات تبقى متسقة من كل قناة إلى التجهيز.',
      },
      {
        id: 'pos',
        label: 'نقطة البيع',
        title: 'نقطة البيع في المتجر',
        description: 'نقطة بيع واستلام على مصدر الحقيقة نفسه.',
      },
      {
        id: 'personalization',
        label: 'البيانات',
        title: 'التخصيص والتحليلات',
        description: 'توصيات وولاء وتقارير على السجل المطابَق.',
      },
    ],

    statsLabel: 'كيف يُبنى هذا التعاون',
    statsNote:
      'تصف هذه الأرقام منهجنا وهذه الصفحة، لا مبيعات ولا إجمالي قيمة بضائع ولا ضمانات أداء. أرقامكم تأتي من بياناتكم.',
    stats: [
      { id: 'languages', value: 2, label: 'لغتا تسوّق مدمجتان منذ اليوم الأول' },
      { id: 'stack', value: 5, label: 'طبقات بناء من المتجر إلى نقطة البيع' },
      { id: 'paths', value: 5, label: 'مسارات بناء مترابطة إلى خدمات كلاود توبيا الحقيقية' },
      { id: 'ownership', value: 100, suffix: '%', label: 'تسليمات مصممة بمالك محدد وخطوة تالية' },
    ],

    methodologyEyebrow: 'كيف ننفّذ',
    methodologyTitle: 'مسار تسليم من الكتالوج إلى الدفع',
    methodologyIntro:
      'ننتقل من السياق إلى الإطلاق عبر مراحل مملوكة، ليتمكن العرض التجاري والتشغيل والمالية من متابعة كل تسليم.',
    phases: [
      {
        id: 'discovery',
        number: '٠١',
        title: 'الاكتشاف وتحديد النطاق',
        body: 'نرسم المسار والكتالوج والأنظمة والأسواق والمالكين الذين يعتمد عليهم كل سجل، ونثبّت أصغر نطاق أول قابل للمطابقة.',
      },
      {
        id: 'architecture',
        number: '٠٢',
        title: 'الهندسة ونموذج البيانات',
        body: 'نصمم نموذج المتجر والكتالوج والطلبات والتكامل حول مصدر حقيقة واحد والمزودين الذين تؤكدونهم.',
      },
      {
        id: 'build',
        number: '٠٣',
        title: 'البناء والتكامل',
        body: 'نهندس المتجر والدفع والعمليات، ونربط تكاملات الدفع والناقل والسوق الموثوقة خلف بيئات تجريبية.',
      },
      {
        id: 'launch',
        number: '٠٤',
        title: 'الترحيل والإطلاق',
        body: 'نرحّل الكتالوج والعملاء والطلبات مع خطوة مطابقة، ونحافظ على الروابط بإعادة توجيه، ونبدّل حين يتطابق النظامان.',
      },
      {
        id: 'scale',
        number: '٠٥',
        title: 'التوسّع والتحسين',
        body: 'نراقب المسار بالتحليلات وأدوات المراقبة، ونحصّنه للذروات والحملات، ونحسّنه بناءً على أدلة حقيقية.',
      },
    ],

    servicePathsEyebrow: 'مسارات التنفيذ',
    learnMore: 'استكشفوا هذا المسار',
    commerceServiceAction: 'استكشفوا تطوير التجارة والمتاجر',

    faqEyebrow: 'أسئلة القرار',

    ctaEyebrow: 'ابدؤوا البناء',
    ctaTitle: 'مستعدون لبناء منصة تجارة وتجزئة يثق بها عملاؤكم؟',
    ctaSubtitle: 'أحضروا مساراً واحداً والفرق التي تملكه، وسنحوّله إلى موجز محدد النطاق قابل للبناء.',
    ctaButton: 'لنرسم مسار الكتالوج إلى الدفع',
    ctaImageAlt: '',

    newTab: '(يفتح في تبويب جديد)',
  },
} as const satisfies Record<Locale, EcommerceContent>
