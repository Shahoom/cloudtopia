import type { Locale } from '@/lib/i18n/config'

/**
 * Bilingual microcopy for the ported Whitehall (City Government) sections that
 * are NOT driven by the IndustryPageDefinition (hero, service-bridge, and FAQ
 * come from the definition). Arabic is authored MSA — the brand reads
 * كلاود توبيا in prose and CTAs are plural-imperative.
 *
 * Framing rule: CloudTopia ENGINEERS government & public-sector systems —
 * citizen-service portals, e-gov & permit/licensing, case management, secure
 * identity, and accessibility-first compliance. It is NOT a government body.
 * Every "we" is the engineering practice; policy, eligibility, identity, data
 * residency, and service decisions remain owned by the responsible authority.
 * Stats are structural facts about the approach and this page — never
 * fabricated performance, citizen-count, or client-outcome metrics.
 *
 * The Whitehall template ships only gray dimension placeholders (no real
 * photos), so this page is intentionally photo-free: the look is carried by the
 * navy/red palette, iconography, gradients, and shape motifs. og-images remain
 * a TODO for the imagery pass.
 */

type GovTile = {
  id: string
  title: string
  subtitle: string
}

type GovPillar = {
  id: string
  title: string
  summary: string
  points: readonly string[]
}

type GovNumbered = {
  id: string
  title: string
  text: string
}

type GovStat = {
  id: string
  value: number
  prefix?: string
  suffix?: string
  label: string
}

type GovCatalogItem = {
  id: string
  label: string
}

type GovHeroSlide = {
  id: string
  kicker: string
  title: string
  description: string
}

type GovContent = {
  skip: string
  industries: string
  breadcrumb: string

  heroKicker: string
  heroSecondaryCta: string
  heroTrustLabel: string
  heroTrust: readonly string[]
  heroSlides: readonly GovHeroSlide[]
  carouselLabel: string
  carouselPrev: string
  carouselNext: string
  carouselGoto: string

  capabilitiesEyebrow: string
  capabilitiesTitle: string
  capabilitiesIntro: string
  capabilities: readonly GovTile[]

  practiceEyebrow: string
  practiceTitle: string
  practiceIntro: string
  practiceBody: string
  practicePoints: readonly GovTile[]
  practicePanelEyebrow: string
  practicePanelStatement: string
  practicePanelNote: string

  domainsEyebrow: string
  domainsTitle: string
  domainsIntro: string
  domains: readonly GovTile[]

  pillarsEyebrow: string
  pillarsTitle: string
  pillarsIntro: string
  pillars: readonly GovPillar[]
  pillarPointsLabel: string

  engagementEyebrow: string
  engagementTitle: string
  engagementIntro: string
  engagement: readonly GovNumbered[]

  catalogEyebrow: string
  catalogTitle: string
  catalogIntro: string
  catalog: readonly GovCatalogItem[]
  catalogCtaEyebrow: string
  catalogCtaTitle: string
  catalogCtaText: string
  catalogCtaButton: string

  statsLabel: string
  statsNote: string
  stats: readonly GovStat[]

  complianceEyebrow: string
  complianceTitle: string
  complianceIntro: string
  compliance: readonly GovTile[]

  whyEyebrow: string
  whyTitle: string
  whyIntro: string
  why: readonly GovTile[]

  faqEyebrow: string

  servicePathsEyebrow: string
  learnMore: string
  webAppAction: string

  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string

  newTab: string
}

export const governmentLandingCopy = {
  en: {
    skip: 'Skip to government and public-sector content',
    industries: 'Industries',
    breadcrumb: 'Breadcrumb',

    heroKicker: 'Government & public-sector engineering',
    heroSecondaryCta: 'See the build paths',
    heroTrustLabel: 'Engineered around',
    heroTrust: [
      'Accessibility-first (WCAG 2.1 AA)',
      'Security by design',
      'Bilingual & RTL native',
    ],
    heroSlides: [
      {
        id: 'portals',
        kicker: 'Citizen service portals',
        title: 'One clear path from eligibility to a completed service',
        description:
          'We build portals where people find the right service, apply once, upload documents, and track a request to a recorded decision.',
      },
      {
        id: 'identity',
        kicker: 'Secure identity & data platforms',
        title: 'Identity, consent, and records that stay owned and traceable',
        description:
          'Sign-in, consent, and case records are engineered with role-based access, encryption, and audit trails inside the authority’s controls.',
      },
      {
        id: 'modernization',
        kicker: 'Digital-government modernization',
        title: 'Legacy services, re-platformed one journey at a time',
        description:
          'We move a priority service off brittle systems into an accessible, reconcilable platform without a risky big-bang rewrite.',
      },
    ],
    carouselLabel: 'Public-sector focus areas',
    carouselPrev: 'Previous focus area',
    carouselNext: 'Next focus area',
    carouselGoto: 'Show focus area',

    capabilitiesEyebrow: 'What we build for government',
    capabilitiesTitle: 'Four domains at the core of every public-service build',
    capabilitiesIntro:
      'Most government engagements start in one of these domains, then connect outward as scope is validated.',
    capabilities: [
      {
        id: 'portals',
        title: 'Citizen-service portals',
        subtitle: 'Find-a-service, apply-once journeys with status people can actually follow.',
      },
      {
        id: 'case-permit',
        title: 'Case, permit & licensing systems',
        subtitle: 'Applications, approvals, inspections, and renewals routed to a named owner.',
      },
      {
        id: 'open-data',
        title: 'Open data & GIS',
        subtitle: 'Registries, dashboards, and map-based views built on one reconciled record.',
      },
      {
        id: 'identity-payments',
        title: 'Identity & payments',
        subtitle: 'Secure sign-in, consent, and online payment for fees, bills, and charges.',
      },
    ],

    practiceEyebrow: 'CloudTopia’s public-sector practice',
    practiceTitle: 'We engineer the systems governments run public services on',
    practiceIntro:
      'CloudTopia is a digital and cloud engineering studio, not a government body. We design and build the software behind public services so they are clearer for people and easier to operate for the teams behind the counter.',
    practiceBody:
      'Every build begins with one real service journey and the people, records, and rules it depends on. Policy, eligibility, identity, data residency, and the final service decision always stay with the responsible authority — our work makes those requirements explicit, accessible, and traceable.',
    practicePoints: [
      {
        id: 'delivery-desk',
        title: 'Public-sector delivery desk',
        subtitle: 'A team that maps a service end to end before a single screen is designed.',
      },
      {
        id: 'security-desk',
        title: 'Security & accessibility desk',
        subtitle: 'Access, encryption, and WCAG 2.1 AA reviewed against the standards you approve.',
      },
    ],
    practicePanelEyebrow: 'Our commitment',
    practicePanelStatement:
      'A public service should be understandable in the first screen, usable by everyone, and reconcilable to a recorded decision by the authority that owns it.',
    practicePanelNote:
      'The design must never imply a government mandate, client, clearance, or guaranteed compliance.',

    domainsEyebrow: 'Solution domains',
    domainsTitle: 'The public services we build systems for',
    domainsIntro:
      'These are solution areas CloudTopia engineers toward — not departments we operate. Each connects to the same secure, accessible foundation.',
    domains: [
      {
        id: 'public-safety',
        title: 'Public safety',
        subtitle: 'Reporting, dispatch support, and case intake with clear ownership and evidence.',
      },
      {
        id: 'finance-revenue',
        title: 'Finance & revenue',
        subtitle: 'Tax, fees, and billing on a reconciled ledger with online payment.',
      },
      {
        id: 'transport-mobility',
        title: 'Transport & smart mobility',
        subtitle: 'Permits, parking, and service requests tied to map-based data.',
      },
      {
        id: 'health-social',
        title: 'Health & social care',
        subtitle: 'Eligibility, appointments, and benefit workflows with assisted-service paths.',
      },
      {
        id: 'housing-land',
        title: 'Housing & land registry',
        subtitle: 'Applications, tenancies, and land records with traceable status.',
      },
      {
        id: 'licensing-permits',
        title: 'Licensing & permits',
        subtitle: 'Business, building, and event permits from application to renewal.',
      },
      {
        id: 'education-inclusion',
        title: 'Education & digital inclusion',
        subtitle: 'Enrolment, grants, and access designed for the widest possible audience.',
      },
      {
        id: 'environment-utilities',
        title: 'Environment & utilities',
        subtitle: 'Requests, reporting, and open dashboards for civic services.',
      },
    ],

    pillarsEyebrow: 'Flagship solution pillars',
    pillarsTitle: 'Three platforms behind a modern public service',
    pillarsIntro:
      'Most citizen-facing services are assembled from these three engineered layers. Hover or focus a pillar to see what it covers.',
    pillars: [
      {
        id: 'service-platforms',
        title: 'Digital service platforms',
        summary: 'Accessible citizen and operator experiences for the whole service journey.',
        points: [
          'Find-a-service and eligibility',
          'Apply-once forms & document upload',
          'Case tracking & assisted service',
        ],
      },
      {
        id: 'secure-data',
        title: 'Secure data & interoperability',
        summary: 'Owned records that connect approved systems without losing traceability.',
        points: [
          'Identity, consent & role-based access',
          'Reconciled registries & audit trails',
          'Bounded integrations to approved systems',
        ],
      },
      {
        id: 'govcloud',
        title: 'GovCloud & infrastructure',
        summary: 'Cloud foundations sized for public load, residency, and continuity rules.',
        points: [
          'Data residency & sovereignty options',
          'Scalability for peak civic demand',
          'Monitoring, backup & continuity',
        ],
      },
    ],
    pillarPointsLabel: 'What it covers',

    engagementEyebrow: 'Core engagement capabilities',
    engagementTitle: 'How we modernize a public service safely',
    engagementIntro:
      'These are the capabilities we bring to a modernization program, applied to one service before it expands.',
    engagement: [
      {
        id: 'cloud-migration',
        title: 'Cloud migration',
        text: 'Move a service to a resilient, monitored cloud foundation with residency respected.',
      },
      {
        id: 'legacy-modernization',
        title: 'Legacy modernization',
        text: 'Re-platform brittle systems journey by journey, keeping records reconcilable throughout.',
      },
      {
        id: 'data-ai',
        title: 'Data & AI',
        text: 'Turn reconciled records into dashboards and assistive tools that support — never replace — human decisions.',
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        text: 'Engineer access, encryption, and monitoring to the security standards the authority approves.',
      },
    ],

    catalogEyebrow: 'Citizen-services catalog',
    catalogTitle: 'Digital services we implement for citizens',
    catalogIntro:
      'A working catalog of the online services CloudTopia builds — each one accessible, bilingual, and recorded.',
    catalog: [
      { id: 'tax-bill', label: 'Online tax & bill payment' },
      { id: 'permits', label: 'E-permits & licensing' },
      { id: 'business-reg', label: 'Business registration' },
      { id: 'certificates', label: 'E-certificates' },
      { id: 'grievance', label: 'Grievance / 311 requests' },
      { id: 'appointments', label: 'Appointments & bookings' },
      { id: 'benefits', label: 'Benefits & eligibility' },
      { id: 'verification', label: 'Document verification' },
      { id: 'open-data', label: 'Open data portal' },
    ],
    catalogCtaEyebrow: 'Ready when you are',
    catalogCtaTitle: 'Modernize your citizen services',
    catalogCtaText:
      'Bring one high-priority service and the team that owns it. We will turn it into an accessible, buildable brief.',
    catalogCtaButton: 'Start a public-sector project',

    statsLabel: 'How this engagement is built',
    statsNote:
      'These describe our approach and this page — not citizen counts, service volumes, or performance guarantees.',
    stats: [
      { id: 'languages', value: 2, label: 'Operating languages, built in from day one' },
      { id: 'stages', value: 5, label: 'Delivery stages from discovery to launch' },
      { id: 'paths', value: 4, label: 'Connected build paths into real CloudTopia services' },
      {
        id: 'accessibility',
        value: 100,
        suffix: '%',
        label: 'Journeys designed to a WCAG 2.1 AA accessibility target',
      },
    ],

    complianceEyebrow: 'Standards & compliance',
    complianceTitle: 'The standards we engineer toward',
    complianceIntro:
      'We build to these standards and support the authority’s own accreditation — we do not certify, license, or guarantee compliance on your behalf.',
    compliance: [
      {
        id: 'accessibility',
        title: 'Accessibility (WCAG 2.1 AA)',
        subtitle: 'Contrast, keyboard, and assistive-technology support built into every journey.',
      },
      {
        id: 'security',
        title: 'Security (ISO 27001-aligned)',
        subtitle: 'Access control, encryption, and monitoring aligned to recognised controls.',
      },
      {
        id: 'residency',
        title: 'Data residency & sovereignty',
        subtitle: 'Hosting and data-handling options that respect residency requirements.',
      },
      {
        id: 'assurance',
        title: 'Assurance (SOC 2-aligned controls)',
        subtitle: 'Documented processes and audit trails your reviewers can follow.',
      },
    ],

    whyEyebrow: 'Why government teams choose CloudTopia',
    whyTitle: 'Engineering built for public accountability',
    whyIntro:
      'Public services carry a duty of care. These are the reasons government teams work with us.',
    why: [
      {
        id: 'security-first',
        title: 'Security by design',
        subtitle: 'Controls, encryption, and audit trails engineered into the foundation, not bolted on.',
      },
      {
        id: 'accessibility',
        title: 'Accessibility first',
        subtitle: 'Designed to a WCAG 2.1 AA target so services work for the widest possible public.',
      },
      {
        id: 'bilingual',
        title: 'Bilingual & RTL native',
        subtitle: 'Arabic and English authored as operating languages, not a final translation step.',
      },
      {
        id: 'regional',
        title: 'Regional presence',
        subtitle: 'Delivery from Oman and Türkiye, close to the programs we support.',
      },
    ],

    faqEyebrow: 'Decision questions',

    servicePathsEyebrow: 'Paths to implementation',
    learnMore: 'Explore this path',
    webAppAction: 'Explore public-service web applications and portals',

    ctaEyebrow: 'Start building',
    ctaTitle: 'Ready to make a public service clearer and easier to run?',
    ctaSubtitle: 'Bring one service journey and the team that owns it. We will turn it into a buildable brief.',
    ctaButton: 'Start a public-sector project',

    newTab: '(opens in new tab)',
  },
  ar: {
    skip: 'تخطَّ إلى محتوى القطاع الحكومي والعام',
    industries: 'القطاعات',
    breadcrumb: 'مسار التنقل',

    heroKicker: 'هندسة الأنظمة الحكومية والقطاع العام',
    heroSecondaryCta: 'اطّلعوا على مسارات البناء',
    heroTrustLabel: 'مهندَس حول',
    heroTrust: [
      'سهولة الوصول أولاً (WCAG 2.1 AA)',
      'الأمان بالتصميم',
      'ثنائي اللغة ويدعم الاتجاه من اليمين',
    ],
    heroSlides: [
      {
        id: 'portals',
        kicker: 'بوابات خدمة المواطن',
        title: 'مسار واضح من الأهلية إلى إتمام الخدمة',
        description:
          'نبني بوابات يجد فيها الناس الخدمة الصحيحة، ويقدّمون مرة واحدة، ويرفعون المستندات، ويتابعون الطلب حتى قرار مسجَّل.',
      },
      {
        id: 'identity',
        kicker: 'منصات الهوية والبيانات الآمنة',
        title: 'هوية وموافقة وسجلات تبقى مملوكة وقابلة للتتبع',
        description:
          'يُهندَس تسجيل الدخول والموافقة وسجلات المعاملات بوصول حسب الأدوار وتشفير وسجلات تدقيق ضمن ضوابط الجهة المسؤولة.',
      },
      {
        id: 'modernization',
        kicker: 'تحديث الحكومة الرقمية',
        title: 'خدمات قديمة يُعاد بناؤها رحلةً تلو الأخرى',
        description:
          'ننقل خدمة ذات أولوية من أنظمة هشة إلى منصة سهلة الوصول وقابلة للمطابقة دون إعادة كتابة شاملة محفوفة بالمخاطر.',
      },
    ],
    carouselLabel: 'مجالات تركيز القطاع العام',
    carouselPrev: 'مجال التركيز السابق',
    carouselNext: 'مجال التركيز التالي',
    carouselGoto: 'عرض مجال التركيز',

    capabilitiesEyebrow: 'ما الذي نبنيه للحكومة',
    capabilitiesTitle: 'أربعة مجالات في صميم كل بناء خدمة عامة',
    capabilitiesIntro:
      'تبدأ معظم المشاريع الحكومية في أحد هذه المجالات، ثم تترابط للخارج مع اعتماد النطاق.',
    capabilities: [
      {
        id: 'portals',
        title: 'بوابات خدمة المواطن',
        subtitle: 'رحلات «ابحث عن الخدمة» و«قدّم مرة واحدة» بحالة يستطيع الناس متابعتها فعلاً.',
      },
      {
        id: 'case-permit',
        title: 'أنظمة المعاملات والتصاريح والتراخيص',
        subtitle: 'طلبات واعتمادات وتفتيش وتجديدات موجَّهة إلى مالك محدد.',
      },
      {
        id: 'open-data',
        title: 'البيانات المفتوحة ونظم المعلومات الجغرافية',
        subtitle: 'سجلات ولوحات وعروض قائمة على الخرائط مبنية على سجل مطابَق واحد.',
      },
      {
        id: 'identity-payments',
        title: 'الهوية والمدفوعات',
        subtitle: 'تسجيل دخول آمن وموافقة ودفع إلكتروني للرسوم والفواتير والمستحقات.',
      },
    ],

    practiceEyebrow: 'ممارسة كلاود توبيا للقطاع العام',
    practiceTitle: 'نهندس الأنظمة التي تُدار عليها الخدمات العامة',
    practiceIntro:
      'كلاود توبيا استوديو هندسة رقمية وسحابية، وليست جهة حكومية. نصمم ونبني البرمجيات خلف الخدمات العامة لتكون أوضح للناس وأسهل تشغيلاً للفرق التي تقف خلف المنصة.',
    practiceBody:
      'يبدأ كل بناء برحلة خدمة حقيقية واحدة وبالأشخاص والسجلات والقواعد التي تعتمد عليها. تبقى السياسات والأهلية والهوية وإقامة البيانات وقرار الخدمة النهائي دائماً لدى الجهة المسؤولة — ويجعل عملنا هذه المتطلبات صريحة وسهلة الوصول وقابلة للتتبع.',
    practicePoints: [
      {
        id: 'delivery-desk',
        title: 'مكتب تسليم القطاع العام',
        subtitle: 'فريق يرسم الخدمة من طرف إلى طرف قبل تصميم أي شاشة.',
      },
      {
        id: 'security-desk',
        title: 'مكتب الأمان وسهولة الوصول',
        subtitle: 'الوصول والتشفير ومعيار WCAG 2.1 AA تُراجَع وفق المعايير التي تعتمدونها.',
      },
    ],
    practicePanelEyebrow: 'التزامنا',
    practicePanelStatement:
      'ينبغي أن تكون الخدمة العامة مفهومة في الشاشة الأولى، وقابلة للاستخدام من الجميع، وقابلة للمطابقة إلى قرار مسجَّل لدى الجهة التي تملكها.',
    practicePanelNote:
      'يجب ألا يوحي التصميم بتكليف حكومي أو عميل أو تصريح أو امتثال مضمون.',

    domainsEyebrow: 'مجالات الحلول',
    domainsTitle: 'الخدمات العامة التي نبني لها الأنظمة',
    domainsIntro:
      'هذه مجالات حلول تهندس نحوها كلاود توبيا — لا دوائر نُديرها. يتصل كل منها بالأساس الآمن وسهل الوصول نفسه.',
    domains: [
      {
        id: 'public-safety',
        title: 'السلامة العامة',
        subtitle: 'بلاغات ودعم توجيه واستقبال معاملات بملكية واضحة وأدلة.',
      },
      {
        id: 'finance-revenue',
        title: 'المالية والإيرادات',
        subtitle: 'ضرائب ورسوم وفوترة على دفتر أستاذ مطابَق مع دفع إلكتروني.',
      },
      {
        id: 'transport-mobility',
        title: 'النقل والتنقل الذكي',
        subtitle: 'تصاريح ومواقف وطلبات خدمة مرتبطة ببيانات قائمة على الخرائط.',
      },
      {
        id: 'health-social',
        title: 'الصحة والرعاية الاجتماعية',
        subtitle: 'أهلية ومواعيد ومسارات منافع مع مسارات خدمة مساندة.',
      },
      {
        id: 'housing-land',
        title: 'الإسكان وسجل الأراضي',
        subtitle: 'طلبات وإيجارات وسجلات أراضٍ بحالة قابلة للتتبع.',
      },
      {
        id: 'licensing-permits',
        title: 'التراخيص والتصاريح',
        subtitle: 'تصاريح الأعمال والبناء والفعاليات من التقديم إلى التجديد.',
      },
      {
        id: 'education-inclusion',
        title: 'التعليم والشمول الرقمي',
        subtitle: 'تسجيل ومنح ووصول مصمَّم لأوسع جمهور ممكن.',
      },
      {
        id: 'environment-utilities',
        title: 'البيئة والمرافق',
        subtitle: 'طلبات وتقارير ولوحات مفتوحة للخدمات المدنية.',
      },
    ],

    pillarsEyebrow: 'ركائز الحلول الرئيسية',
    pillarsTitle: 'ثلاث منصات خلف الخدمة العامة الحديثة',
    pillarsIntro:
      'تُجمَّع معظم الخدمات الموجهة للمواطن من هذه الطبقات المهندَسة الثلاث. مرِّروا المؤشر أو انتقلوا بلوحة المفاتيح لرؤية ما تغطيه كل ركيزة.',
    pillars: [
      {
        id: 'service-platforms',
        title: 'منصات الخدمة الرقمية',
        summary: 'تجارب مواطن وموظف سهلة الوصول لرحلة الخدمة كاملة.',
        points: [
          'البحث عن الخدمة والأهلية',
          'نماذج «قدّم مرة واحدة» ورفع المستندات',
          'متابعة المعاملة والخدمة المساندة',
        ],
      },
      {
        id: 'secure-data',
        title: 'البيانات الآمنة وقابلية التشغيل البيني',
        summary: 'سجلات مملوكة تربط الأنظمة المعتمدة دون فقدان قابلية التتبع.',
        points: [
          'الهوية والموافقة والوصول حسب الأدوار',
          'سجلات مطابَقة ومسارات تدقيق',
          'تكاملات محدودة النطاق مع الأنظمة المعتمدة',
        ],
      },
      {
        id: 'govcloud',
        title: 'السحابة الحكومية والبنية التحتية',
        summary: 'أسس سحابية مقاسة للحمل العام وقواعد الإقامة والاستمرارية.',
        points: [
          'خيارات إقامة البيانات والسيادة',
          'قابلية توسّع لذروة الطلب المدني',
          'مراقبة ونسخ احتياطي واستمرارية',
        ],
      },
    ],
    pillarPointsLabel: 'ما الذي تغطيه',

    engagementEyebrow: 'قدرات التعاون الأساسية',
    engagementTitle: 'كيف نحدّث خدمة عامة بأمان',
    engagementIntro:
      'هذه القدرات التي نقدمها لبرنامج التحديث، مطبَّقة على خدمة واحدة قبل توسّعها.',
    engagement: [
      {
        id: 'cloud-migration',
        title: 'الانتقال إلى السحابة',
        text: 'ننقل الخدمة إلى أساس سحابي مرن ومراقَب مع احترام إقامة البيانات.',
      },
      {
        id: 'legacy-modernization',
        title: 'تحديث الأنظمة القديمة',
        text: 'نعيد بناء الأنظمة الهشة رحلةً تلو الأخرى مع إبقاء السجلات قابلة للمطابقة طوال الوقت.',
      },
      {
        id: 'data-ai',
        title: 'البيانات والذكاء الاصطناعي',
        text: 'نحوّل السجلات المطابَقة إلى لوحات وأدوات مساعِدة تدعم القرارات البشرية ولا تحل محلها.',
      },
      {
        id: 'cybersecurity',
        title: 'الأمن السيبراني',
        text: 'نهندس الوصول والتشفير والمراقبة وفق معايير الأمان التي تعتمدها الجهة المسؤولة.',
      },
    ],

    catalogEyebrow: 'كتالوج خدمات المواطن',
    catalogTitle: 'خدمات رقمية ننفّذها للمواطنين',
    catalogIntro:
      'كتالوج عملي للخدمات الإلكترونية التي تبنيها كلاود توبيا — كل منها سهل الوصول وثنائي اللغة ومسجَّل.',
    catalog: [
      { id: 'tax-bill', label: 'دفع الضرائب والفواتير إلكترونياً' },
      { id: 'permits', label: 'التصاريح والتراخيص الإلكترونية' },
      { id: 'business-reg', label: 'تسجيل الأعمال' },
      { id: 'certificates', label: 'الشهادات الإلكترونية' },
      { id: 'grievance', label: 'الشكاوى وطلبات 311' },
      { id: 'appointments', label: 'المواعيد والحجوزات' },
      { id: 'benefits', label: 'المنافع والأهلية' },
      { id: 'verification', label: 'التحقق من المستندات' },
      { id: 'open-data', label: 'بوابة البيانات المفتوحة' },
    ],
    catalogCtaEyebrow: 'جاهزون متى استعددتم',
    catalogCtaTitle: 'حدّثوا خدمات المواطن لديكم',
    catalogCtaText:
      'أحضروا خدمة واحدة ذات أولوية والفريق الذي يملكها، وسنحوّلها إلى موجز قابل للبناء وسهل الوصول.',
    catalogCtaButton: 'ابدؤوا مشروعاً للقطاع العام',

    statsLabel: 'كيف يُبنى هذا التعاون',
    statsNote:
      'تصف هذه الأرقام منهجنا وهذه الصفحة، لا أعداد مواطنين ولا أحجام خدمة ولا ضمانات أداء.',
    stats: [
      { id: 'languages', value: 2, label: 'لغتا تشغيل مدمجتان منذ اليوم الأول' },
      { id: 'stages', value: 5, label: 'مراحل تسليم من الاكتشاف إلى الإطلاق' },
      { id: 'paths', value: 4, label: 'مسارات بناء مترابطة إلى خدمات كلاود توبيا الحقيقية' },
      {
        id: 'accessibility',
        value: 100,
        suffix: '%',
        label: 'رحلات مصممة وفق هدف سهولة الوصول WCAG 2.1 AA',
      },
    ],

    complianceEyebrow: 'المعايير والامتثال',
    complianceTitle: 'المعايير التي نهندس نحوها',
    complianceIntro:
      'نبني وفق هذه المعايير وندعم اعتماد الجهة المسؤولة نفسها — لا نمنح اعتماداً ولا ترخيصاً ولا نضمن الامتثال نيابةً عنكم.',
    compliance: [
      {
        id: 'accessibility',
        title: 'سهولة الوصول (WCAG 2.1 AA)',
        subtitle: 'دعم التباين ولوحة المفاتيح والتقنيات المساعِدة مدمج في كل رحلة.',
      },
      {
        id: 'security',
        title: 'الأمان (متوافق مع ISO 27001)',
        subtitle: 'تحكم بالوصول وتشفير ومراقبة متوافقة مع ضوابط معترف بها.',
      },
      {
        id: 'residency',
        title: 'إقامة البيانات والسيادة',
        subtitle: 'خيارات استضافة ومعالجة بيانات تحترم متطلبات الإقامة.',
      },
      {
        id: 'assurance',
        title: 'الضمان (ضوابط متوافقة مع SOC 2)',
        subtitle: 'عمليات موثقة ومسارات تدقيق يستطيع مراجعوكم متابعتها.',
      },
    ],

    whyEyebrow: 'لماذا تختار الفرق الحكومية كلاود توبيا',
    whyTitle: 'هندسة مبنية للمساءلة العامة',
    whyIntro:
      'تحمل الخدمات العامة واجب العناية. هذه أسباب عمل الفرق الحكومية معنا.',
    why: [
      {
        id: 'security-first',
        title: 'الأمان بالتصميم',
        subtitle: 'ضوابط وتشفير وسجلات تدقيق مهندَسة في الأساس، لا مضافة لاحقاً.',
      },
      {
        id: 'accessibility',
        title: 'سهولة الوصول أولاً',
        subtitle: 'مصمَّمة وفق هدف WCAG 2.1 AA لتعمل الخدمات لأوسع جمهور ممكن.',
      },
      {
        id: 'bilingual',
        title: 'ثنائي اللغة وأصيل في الاتجاهين',
        subtitle: 'العربية والإنجليزية مكتوبتان كلغتَي تشغيل، لا كخطوة ترجمة أخيرة.',
      },
      {
        id: 'regional',
        title: 'حضور إقليمي',
        subtitle: 'تسليم من عُمان وتركيا، قريباً من البرامج التي ندعمها.',
      },
    ],

    faqEyebrow: 'أسئلة القرار',

    servicePathsEyebrow: 'مسارات التنفيذ',
    learnMore: 'استكشفوا هذا المسار',
    webAppAction: 'استكشفوا تطبيقات الويب والبوابات للخدمة العامة',

    ctaEyebrow: 'ابدؤوا البناء',
    ctaTitle: 'مستعدون لجعل خدمة عامة أوضح وأسهل تشغيلاً؟',
    ctaSubtitle: 'أحضروا رحلة خدمة واحدة والفريق الذي يملكها، وسنحوّلها إلى موجز قابل للبناء.',
    ctaButton: 'ابدؤوا مشروعاً للقطاع العام',

    newTab: '(يفتح في تبويب جديد)',
  },
} as const satisfies Record<Locale, GovContent>
