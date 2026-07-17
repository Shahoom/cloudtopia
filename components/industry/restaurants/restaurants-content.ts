import type { Locale } from '@/lib/i18n/config'

/**
 * Bilingual microcopy for the ported Foodking sections that are NOT driven by
 * the IndustryPageDefinition (hero h1/intro/primaryCta, the service-bridge, and
 * the FAQ come from restaurants.ts). Arabic is authored MSA — the brand reads
 * كلاود توبيا in prose and CTAs use the plural imperative.
 *
 * Framing rule: CloudTopia ENGINEERS restaurant & food-service platforms
 * (online ordering, digital menus, POS, delivery/logistics, reservations,
 * loyalty). It is NOT a restaurant. Stats describe the approach and this page —
 * never fabricated covers, ratings, prices, or client outcomes.
 */

export type RestaurantsHeroPillar = {
  id: string
  tag: string
  headline: string
  note: string
  deviceTitle: string
  deviceRows: readonly string[]
}

type RestaurantsIconItem = {
  id: string
  label: string
}

type RestaurantsFeature = {
  id: string
  title: string
  body: string
}

type RestaurantsTab = {
  id: string
  label: string
  panelTitle: string
  panelBody: string
  points: readonly string[]
}

type RestaurantsStep = {
  id: string
  number: string
  title: string
  body: string
}

type RestaurantsStat = {
  id: string
  value: number
  suffix?: string
  label: string
}

type RestaurantsContent = {
  skip: string
  industries: string
  breadcrumb: string

  heroKicker: string
  heroBackTitle: string
  heroSecondaryCta: string
  heroRegionLabel: string
  heroDotLabel: string
  heroPrev: string
  heroNext: string
  heroTrustLabel: string
  heroTrust: readonly string[]
  heroPillars: readonly RestaurantsHeroPillar[]

  categoryEyebrow: string
  categoryTitle: string
  categoryIntro: string
  categoryRegionLabel: string
  categoryPrev: string
  categoryNext: string
  categories: readonly RestaurantsIconItem[]

  chooseEyebrow: string
  chooseTitle: string
  chooseIntro: string
  choose: readonly RestaurantsFeature[]

  aboutEyebrow: string
  aboutTitle: string
  aboutBody: string
  aboutPoints: readonly RestaurantsFeature[]
  aboutStatsNote: string
  aboutStats: readonly RestaurantsStat[]

  tabsEyebrow: string
  tabsTitle: string
  tabsIntro: string
  tabsLabel: string
  tabs: readonly RestaurantsTab[]

  processEyebrow: string
  processTitle: string
  processIntro: string
  steps: readonly RestaurantsStep[]

  marqueeLabel: string
  marqueeWords: readonly string[]

  guaranteesEyebrow: string
  guaranteesTitle: string
  guaranteesIntro: string
  guarantees: readonly RestaurantsFeature[]
  supportTitle: string
  supportBody: string
  supportCta: string

  servicePathsEyebrow: string
  learnMore: string
  restaurantQrAction: string

  faqEyebrow: string

  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
}

export const restaurantsLandingCopy = {
  en: {
    skip: 'Skip to restaurant industry content',
    industries: 'Industries',
    breadcrumb: 'Breadcrumb',

    heroKicker: 'Restaurant platform engineering',
    heroBackTitle: 'Restaurant tech',
    heroSecondaryCta: 'See the build paths',
    heroRegionLabel: 'Restaurant platforms CloudTopia builds',
    heroDotLabel: 'Show platform',
    heroPrev: 'Previous platform',
    heroNext: 'Next platform',
    heroTrustLabel: 'Engineered around',
    heroTrust: ['Every branch and service mode', 'Bilingual by design', 'Owned handoffs, no dead ends'],
    heroPillars: [
      {
        id: 'ordering',
        tag: 'Online ordering & delivery apps',
        headline: 'Ordering that reaches the right branch',
        note: 'Web and app ordering flows that carry the guest choice all the way to an accepted, routed order.',
        deviceTitle: 'Guest order',
        deviceRows: ['Order received', 'Routed to branch', 'Accepted by front of house'],
      },
      {
        id: 'pos-kds',
        tag: 'POS & kitchen display',
        headline: 'The kitchen sees exactly what was accepted',
        note: 'Point-of-sale and kitchen display connections that follow the states your equipment and providers confirm.',
        deviceTitle: 'Kitchen display',
        deviceRows: ['Ticket #4821 fired', 'On the line', 'Ready for pass'],
      },
      {
        id: 'reservations',
        tag: 'Reservations & table management',
        headline: 'Tables and covers under one owner',
        note: 'Reservation and table flows that distinguish a request from a confirmed, owned booking.',
        deviceTitle: 'Table plan',
        deviceRows: ['Request submitted', 'Confirmed for 7:30', 'Assigned to section 2'],
      },
      {
        id: 'loyalty',
        tag: 'Loyalty & guest CRM',
        headline: 'Return signals your team can act on',
        note: 'Loyalty, feedback, and CRM built on clear consent, ownership, and a route back to the guest.',
        deviceTitle: 'Guest profile',
        deviceRows: ['Consent recorded', 'Reward eligible', 'Follow-up queued'],
      },
    ],

    categoryEyebrow: 'What we build',
    categoryTitle: 'One platform, every part of the service journey',
    categoryIntro:
      'CloudTopia engineers the connected capabilities a restaurant runs on — each one recorded, owned, and branch-aware.',
    categoryRegionLabel: 'Restaurant capabilities CloudTopia delivers',
    categoryPrev: 'Previous capabilities',
    categoryNext: 'Next capabilities',
    categories: [
      { id: 'online-ordering', label: 'Online ordering' },
      { id: 'delivery-dispatch', label: 'Delivery dispatch' },
      { id: 'pos-integration', label: 'POS integration' },
      { id: 'reservations', label: 'Reservations' },
      { id: 'loyalty', label: 'Loyalty & CRM' },
      { id: 'kitchen-display', label: 'Kitchen display' },
      { id: 'analytics', label: 'Branch analytics' },
      { id: 'qr-menu', label: 'QR digital menus' },
    ],

    chooseEyebrow: 'Why CloudTopia',
    chooseTitle: 'Built for how restaurants actually run',
    chooseIntro:
      'The systems behind service have to hold up at peak, across branches, and in two languages. These are the strengths we engineer in from the start.',
    choose: [
      {
        id: 'integrations',
        title: 'Rapid delivery & POS integrations',
        body: 'We connect the ordering, delivery, and point-of-sale providers you already use, scoped to the fields and states each one confirms.',
      },
      {
        id: 'reliability',
        title: 'Reliability at peak service',
        body: 'Systems engineered to stay responsive through the rush, with monitoring that surfaces exceptions before the floor feels them.',
      },
      {
        id: 'payments',
        title: 'Secure payments',
        body: 'Payment flows built on approved providers and encryption, so checkout and wallets stay trustworthy on every order.',
      },
      {
        id: 'multi-branch',
        title: 'Scalable across branches',
        body: 'One structure that grows from a single location to a multi-branch group, with menus, prices, and hours owned locally.',
      },
    ],

    aboutEyebrow: 'Our expertise',
    aboutTitle: 'We build the software behind the counter, not the menu on it',
    aboutBody:
      'CloudTopia designs and engineers the digital systems restaurants and food-service groups run on. From menu discovery to kitchen handoff to the loyalty follow-up, we connect what the guest does with what your teams own — while every price, item, and preparation rule stays under the operator’s approval.',
    aboutPoints: [
      {
        id: 'integration-depth',
        title: 'Integration depth',
        body: 'Ordering, delivery, POS, and kitchen systems connected around the interfaces your providers actually support.',
      },
      {
        id: 'support',
        title: 'Support that stays',
        body: 'Launch is the start. We monitor, patch, and extend the platform as branches and service modes grow.',
      },
    ],
    aboutStatsNote:
      'These describe our approach and this page — not covers served, ratings, or client outcomes.',
    aboutStats: [
      { id: 'platforms', value: 4, label: 'Core platforms across the service journey' },
      { id: 'capabilities', value: 8, label: 'Connected capabilities we deliver' },
      { id: 'languages', value: 2, label: 'Operating languages, built in from day one' },
    ],

    tabsEyebrow: 'Platform modules',
    tabsTitle: 'Pick a capability, see what CloudTopia builds',
    tabsIntro:
      'Each module is a system we engineer around your branches, providers, and service modes — combined into one connected journey.',
    tabsLabel: 'Platform module',
    tabs: [
      {
        id: 'ordering',
        label: 'Online ordering',
        panelTitle: 'Ordering & digital menus',
        panelBody:
          'Branch-aware web and app ordering with digital and QR menus, carrying the guest selection through to an explicit acceptance.',
        points: [
          'Branch, service-mode, and menu routing',
          'QR and digital menus with an owned content source',
          'Submission distinguished from a confirmed order',
        ],
      },
      {
        id: 'pos-kds',
        label: 'POS & kitchen',
        panelTitle: 'POS & kitchen display',
        panelBody:
          'Point-of-sale and kitchen display connections that move an accepted order into the states your equipment and process support.',
        points: [
          'Connections scoped to confirmed provider interfaces',
          'Accepted work visible on the kitchen line',
          'A manual or existing-process fallback by design',
        ],
      },
      {
        id: 'delivery',
        label: 'Delivery & logistics',
        panelTitle: 'Delivery & dispatch',
        panelBody:
          'Dispatch and logistics flows that record who owns each handoff from the pass to the guest, including exceptions.',
        points: [
          'Routing across in-house and partner delivery',
          'Named ownership for every handoff and exception',
          'Guest updates mapped to approved operating states',
        ],
      },
      {
        id: 'loyalty',
        label: 'Loyalty & CRM',
        panelTitle: 'Loyalty & guest CRM',
        panelBody:
          'Loyalty, feedback, and guest CRM engineered on clear consent, ownership, and a documented route back to the guest.',
        points: [
          'Consent and preferences captured explicitly',
          'Rewards and feedback tied to a real guest profile',
          'Return signals reviewed by a named team',
        ],
      },
    ],

    processEyebrow: 'How we work',
    processTitle: 'From first branch to a platform that scales',
    processIntro:
      'We move from context to launch in owned stages, so front-of-house, kitchen, and operations can follow every handoff.',
    steps: [
      {
        id: 'discovery',
        number: '01',
        title: 'Discovery & audit',
        body: 'We map one branch and one complete service journey — menus, service modes, providers, and the owners each record depends on.',
      },
      {
        id: 'build',
        number: '02',
        title: 'Build & integrate',
        body: 'We engineer the flows and connect ordering, POS, and delivery providers behind the interfaces they confirm.',
      },
      {
        id: 'launch',
        number: '03',
        title: 'Launch & train',
        body: 'We release the scoped journey with your team, so front-of-house and kitchen own the states from day one.',
      },
      {
        id: 'scale',
        number: '04',
        title: 'Support & scale',
        body: 'We monitor, patch, and extend — adding branches, service modes, and capabilities as the group grows.',
      },
    ],

    marqueeLabel: 'Restaurant technology CloudTopia builds',
    marqueeWords: [
      'Online ordering',
      'Kitchen display',
      'Loyalty & CRM',
      'QR menus',
      'Delivery dispatch',
      'POS integration',
      'Reservations',
      'Branch analytics',
    ],

    guaranteesEyebrow: 'What you can rely on',
    guaranteesTitle: 'Capabilities we stand behind',
    guaranteesIntro:
      'Not slogans — the engineering commitments that keep a restaurant platform dependable long after launch.',
    guarantees: [
      {
        id: 'reliability',
        title: 'Reliability at peak',
        body: 'Architecture and monitoring designed to hold up through the busiest service windows.',
      },
      {
        id: 'integrations',
        title: 'Fast provider integrations',
        body: 'Ordering, delivery, and POS connections scoped to what each provider confirms.',
      },
      {
        id: 'payments',
        title: 'Secure payments',
        body: 'Encryption and approved payment providers engineered into the foundation.',
      },
      {
        id: 'support',
        title: 'Dedicated support',
        body: 'A team that stays past launch to patch, extend, and scale the platform.',
      },
    ],
    supportTitle: 'Talk to the team that builds it',
    supportBody:
      'Bring one branch and one service journey. We will shape it into a bounded, buildable brief.',
    supportCta: 'Message us on WhatsApp',

    servicePathsEyebrow: 'Paths to implementation',
    learnMore: 'Explore this path',
    restaurantQrAction: 'Explore restaurant QR menu systems',

    faqEyebrow: 'Service questions',

    ctaEyebrow: 'Start building',
    ctaTitle: 'Launch your restaurant’s digital ordering in weeks, not seasons',
    ctaSubtitle:
      'Bring one branch, one guest journey, and the providers it touches. We will turn it into a practical, bounded system brief.',
    ctaButton: 'Tune your service journey',
  },
  ar: {
    skip: 'تخطَّ إلى محتوى قطاع المطاعم',
    industries: 'القطاعات',
    breadcrumb: 'مسار التنقل',

    heroKicker: 'هندسة منصات المطاعم',
    heroBackTitle: 'تقنية المطاعم',
    heroSecondaryCta: 'اطّلعوا على مسارات البناء',
    heroRegionLabel: 'منصات المطاعم التي تبنيها كلاود توبيا',
    heroDotLabel: 'اعرضوا المنصة',
    heroPrev: 'المنصة السابقة',
    heroNext: 'المنصة التالية',
    heroTrustLabel: 'مهندَس حول',
    heroTrust: ['كل فرع ونمط خدمة', 'ثنائي اللغة بالتصميم', 'تسليمات مملوكة بلا طرق مسدودة'],
    heroPillars: [
      {
        id: 'ordering',
        tag: 'تطبيقات الطلب والتوصيل عبر الإنترنت',
        headline: 'طلب يصل إلى الفرع الصحيح',
        note: 'مسارات طلب عبر الويب والتطبيق تنقل اختيار الضيف حتى طلب مقبول وموجَّه.',
        deviceTitle: 'طلب الضيف',
        deviceRows: ['تم استلام الطلب', 'موجَّه إلى الفرع', 'مقبول من الاستقبال'],
      },
      {
        id: 'pos-kds',
        tag: 'نقاط البيع وشاشة المطبخ',
        headline: 'يرى المطبخ ما تم قبوله بالضبط',
        note: 'روابط نقاط البيع وشاشة المطبخ تتبع الحالات التي تؤكدها معداتكم ومزودوكم.',
        deviceTitle: 'شاشة المطبخ',
        deviceRows: ['التذكرة #4821 قيد التحضير', 'على خط الإعداد', 'جاهزة للتمرير'],
      },
      {
        id: 'reservations',
        tag: 'الحجوزات وإدارة الطاولات',
        headline: 'الطاولات والحجوزات تحت مالك واحد',
        note: 'مسارات حجز وطاولات تميّز بين الطلب والحجز المؤكد المملوك.',
        deviceTitle: 'مخطط الطاولات',
        deviceRows: ['تم إرسال الطلب', 'مؤكد للساعة 7:30', 'مخصص للقسم 2'],
      },
      {
        id: 'loyalty',
        tag: 'الولاء وإدارة علاقات الضيوف',
        headline: 'إشارات عودة يستطيع فريقكم التصرف بناءً عليها',
        note: 'ولاء وآراء وإدارة علاقات مبنية على موافقة واضحة وملكية ومسار عودة إلى الضيف.',
        deviceTitle: 'ملف الضيف',
        deviceRows: ['تم تسجيل الموافقة', 'مؤهل للمكافأة', 'المتابعة في قائمة الانتظار'],
      },
    ],

    categoryEyebrow: 'ما الذي نبنيه',
    categoryTitle: 'منصة واحدة لكل جزء من رحلة الخدمة',
    categoryIntro:
      'تهندس كلاود توبيا القدرات المترابطة التي يعمل عليها المطعم — كل منها مسجَّل وذو مالك واضح ويراعي الفرع.',
    categoryRegionLabel: 'قدرات المطاعم التي تقدمها كلاود توبيا',
    categoryPrev: 'القدرات السابقة',
    categoryNext: 'القدرات التالية',
    categories: [
      { id: 'online-ordering', label: 'الطلب عبر الإنترنت' },
      { id: 'delivery-dispatch', label: 'توجيه التوصيل' },
      { id: 'pos-integration', label: 'تكامل نقاط البيع' },
      { id: 'reservations', label: 'الحجوزات' },
      { id: 'loyalty', label: 'الولاء وإدارة العلاقات' },
      { id: 'kitchen-display', label: 'شاشة المطبخ' },
      { id: 'analytics', label: 'تحليلات الفروع' },
      { id: 'qr-menu', label: 'قوائم رقمية بـ QR' },
    ],

    chooseEyebrow: 'لماذا كلاود توبيا',
    chooseTitle: 'مبنية على طريقة عمل المطاعم فعلاً',
    chooseIntro:
      'يجب أن تصمد الأنظمة خلف الخدمة وقت الذروة، عبر الفروع، وباللغتين. هذه هي نقاط القوة التي نهندسها من البداية.',
    choose: [
      {
        id: 'integrations',
        title: 'تكاملات سريعة للتوصيل ونقاط البيع',
        body: 'نربط مزودي الطلب والتوصيل ونقاط البيع الذين تستخدمونهم أصلاً، بحسب الحقول والحالات التي يؤكدها كل منهم.',
      },
      {
        id: 'reliability',
        title: 'موثوقية وقت الذروة',
        body: 'أنظمة مهندَسة لتبقى سريعة الاستجابة خلال الزحام، مع مراقبة تُظهر الاستثناءات قبل أن تشعر بها الصالة.',
      },
      {
        id: 'payments',
        title: 'مدفوعات آمنة',
        body: 'مسارات دفع مبنية على مزودين معتمدين وتشفير، ليبقى الدفع والمحافظ جديرة بالثقة في كل طلب.',
      },
      {
        id: 'multi-branch',
        title: 'قابلة للتوسّع عبر الفروع',
        body: 'بنية واحدة تنمو من موقع واحد إلى مجموعة متعددة الفروع، مع ملكية محلية للقوائم والأسعار والساعات.',
      },
    ],

    aboutEyebrow: 'خبرتنا',
    aboutTitle: 'نبني البرمجيات خلف الكاونتر، لا القائمة التي عليه',
    aboutBody:
      'تصمم كلاود توبيا وتهندس الأنظمة الرقمية التي تعمل عليها المطاعم ومجموعات خدمات الطعام. من اكتشاف القائمة إلى تسليم المطبخ إلى متابعة الولاء، نربط ما يفعله الضيف بما تملكه فرقكم — مع بقاء كل سعر وصنف وقاعدة تحضير تحت اعتماد المشغّل.',
    aboutPoints: [
      {
        id: 'integration-depth',
        title: 'عمق التكامل',
        body: 'أنظمة الطلب والتوصيل ونقاط البيع والمطبخ مترابطة حول الواجهات التي يدعمها مزودوكم فعلاً.',
      },
      {
        id: 'support',
        title: 'دعم يبقى معكم',
        body: 'الإطلاق هو البداية. نراقب المنصة ونصلحها ونوسّعها مع نمو الفروع وأنماط الخدمة.',
      },
    ],
    aboutStatsNote:
      'تصف هذه الأرقام منهجنا وهذه الصفحة، لا عدد الطاولات المخدومة ولا التقييمات ولا نتائج العملاء.',
    aboutStats: [
      { id: 'platforms', value: 4, label: 'منصات أساسية عبر رحلة الخدمة' },
      { id: 'capabilities', value: 8, label: 'قدرات مترابطة نقدمها' },
      { id: 'languages', value: 2, label: 'لغتا تشغيل مدمجتان منذ اليوم الأول' },
    ],

    tabsEyebrow: 'وحدات المنصة',
    tabsTitle: 'اختاروا قدرة، وشاهدوا ما تبنيه كلاود توبيا',
    tabsIntro:
      'كل وحدة نظام نهندسه حول فروعكم ومزوديكم وأنماط خدمتكم — مجموعة في رحلة واحدة مترابطة.',
    tabsLabel: 'وحدة المنصة',
    tabs: [
      {
        id: 'ordering',
        label: 'الطلب عبر الإنترنت',
        panelTitle: 'الطلب والقوائم الرقمية',
        panelBody:
          'طلب عبر الويب والتطبيق يراعي الفرع مع قوائم رقمية وقوائم QR، ينقل اختيار الضيف حتى قبول صريح.',
        points: [
          'توجيه بحسب الفرع ونمط الخدمة والقائمة',
          'قوائم QR ورقمية بمصدر محتوى مملوك',
          'تمييز الإرسال عن الطلب المؤكد',
        ],
      },
      {
        id: 'pos-kds',
        label: 'نقاط البيع والمطبخ',
        panelTitle: 'نقاط البيع وشاشة المطبخ',
        panelBody:
          'روابط نقاط البيع وشاشة المطبخ تنقل الطلب المقبول إلى الحالات التي تدعمها معداتكم وعمليتكم.',
        points: [
          'روابط بحسب واجهات المزود المؤكدة',
          'العمل المقبول مرئي على خط المطبخ',
          'مسار يدوي أو مسار العملية الحالية بالتصميم',
        ],
      },
      {
        id: 'delivery',
        label: 'التوصيل واللوجستيات',
        panelTitle: 'التوصيل والتوجيه',
        panelBody:
          'مسارات توجيه ولوجستيات تسجّل من يملك كل تسليم من التمرير إلى الضيف، بما في ذلك الاستثناءات.',
        points: [
          'توجيه عبر التوصيل الداخلي والشريك',
          'ملكية محددة لكل تسليم واستثناء',
          'رسائل الضيف مرتبطة بحالات تشغيل معتمدة',
        ],
      },
      {
        id: 'loyalty',
        label: 'الولاء وإدارة العلاقات',
        panelTitle: 'الولاء وإدارة علاقات الضيوف',
        panelBody:
          'ولاء وآراء وإدارة علاقات مهندَسة على موافقة واضحة وملكية ومسار موثق للعودة إلى الضيف.',
        points: [
          'التقاط الموافقة والتفضيلات صراحةً',
          'مكافآت وآراء مرتبطة بملف ضيف حقيقي',
          'إشارات عودة يراجعها فريق محدد',
        ],
      },
    ],

    processEyebrow: 'كيف نعمل',
    processTitle: 'من الفرع الأول إلى منصة تتوسّع',
    processIntro:
      'ننتقل من السياق إلى الإطلاق عبر مراحل مملوكة، ليتمكن الاستقبال والمطبخ والتشغيل من متابعة كل تسليم.',
    steps: [
      {
        id: 'discovery',
        number: '٠١',
        title: 'الاكتشاف والتدقيق',
        body: 'نرسم فرعاً واحداً ورحلة خدمة مكتملة — القوائم وأنماط الخدمة والمزودين والمالكين الذين يعتمد عليهم كل سجل.',
      },
      {
        id: 'build',
        number: '٠٢',
        title: 'البناء والتكامل',
        body: 'نهندس المسارات ونربط مزودي الطلب ونقاط البيع والتوصيل خلف الواجهات التي يؤكدونها.',
      },
      {
        id: 'launch',
        number: '٠٣',
        title: 'الإطلاق والتدريب',
        body: 'نطلق الرحلة المحددة مع فريقكم، ليملك الاستقبال والمطبخ الحالات منذ اليوم الأول.',
      },
      {
        id: 'scale',
        number: '٠٤',
        title: 'الدعم والتوسّع',
        body: 'نراقب ونصلح ونوسّع — بإضافة فروع وأنماط خدمة وقدرات مع نمو المجموعة.',
      },
    ],

    marqueeLabel: 'تقنية المطاعم التي تبنيها كلاود توبيا',
    marqueeWords: [
      'الطلب عبر الإنترنت',
      'شاشة المطبخ',
      'الولاء وإدارة العلاقات',
      'قوائم QR',
      'توجيه التوصيل',
      'تكامل نقاط البيع',
      'الحجوزات',
      'تحليلات الفروع',
    ],

    guaranteesEyebrow: 'ما يمكنكم الاعتماد عليه',
    guaranteesTitle: 'قدرات نقف خلفها',
    guaranteesIntro:
      'ليست شعارات — بل التزامات هندسية تُبقي منصة المطعم موثوقة بعد الإطلاق بوقت طويل.',
    guarantees: [
      {
        id: 'reliability',
        title: 'موثوقية وقت الذروة',
        body: 'بنية ومراقبة مصممة للصمود خلال أكثر أوقات الخدمة ازدحاماً.',
      },
      {
        id: 'integrations',
        title: 'تكاملات سريعة مع المزودين',
        body: 'روابط طلب وتوصيل ونقاط بيع بحسب ما يؤكده كل مزود.',
      },
      {
        id: 'payments',
        title: 'مدفوعات آمنة',
        body: 'تشفير ومزودو دفع معتمدون مهندَسون في الأساس.',
      },
      {
        id: 'support',
        title: 'دعم مخصص',
        body: 'فريق يبقى بعد الإطلاق للإصلاح والتوسيع وتنمية المنصة.',
      },
    ],
    supportTitle: 'تحدثوا مع الفريق الذي يبنيها',
    supportBody:
      'أحضروا فرعاً واحداً ورحلة خدمة واحدة، وسنحوّلها إلى موجز محدد النطاق قابل للبناء.',
    supportCta: 'راسلونا عبر واتساب',

    servicePathsEyebrow: 'مسارات التنفيذ',
    learnMore: 'استكشفوا هذا المسار',
    restaurantQrAction: 'استكشفوا أنظمة قوائم QR للمطاعم',

    faqEyebrow: 'أسئلة الخدمة',

    ctaEyebrow: 'ابدؤوا البناء',
    ctaTitle: 'أطلقوا الطلب الرقمي لمطعمكم في أسابيع، لا مواسم',
    ctaSubtitle:
      'أحضروا فرعاً واحداً ورحلة ضيف واحدة والمزودين الذين تمر بهم، وسنحوّلها إلى موجز نظام عملي محدد النطاق.',
    ctaButton: 'اضبطوا إيقاع تجربة ضيوفكم',
  },
} as const satisfies Record<Locale, RestaurantsContent>
