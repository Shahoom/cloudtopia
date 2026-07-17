import type { Locale } from '@/lib/i18n/config'

/**
 * Bilingual microcopy for the ported Regalis sections that are NOT driven by the
 * IndustryPageDefinition (hero, service-bridge, and FAQ come from the
 * definition). Arabic is authored MSA — the brand reads كلاود توبيا in prose and
 * CTAs use the plural imperative.
 *
 * Framing: CloudTopia ENGINEERS legal systems; it is not a law firm and gives no
 * advice. Every "case pattern" is an anonymized example of a system CloudTopia
 * builds, never a real client matter or a fabricated testimonial. Stats are
 * structural facts about the approach and this page (languages, delivery stages,
 * build paths, owned handoffs) — never invented outcomes or client metrics.
 */

type LegalValueCard = {
  id: string
  title: string
  subtitle: string
}

type LegalTab = {
  id: string
  label: string
  body: string
}

type LegalDomain = {
  id: string
  title: string
  description: string
}

type LegalStat = {
  id: string
  value: number
  prefix?: string
  suffix?: string
  label: string
}

type LegalCasePattern = {
  id: string
  category: string
  title: string
  image: string
  width: number
  height: number
  alt: string
}

type LegalStep = {
  id: string
  title: string
  subtitle: string
}

type LegalContent = {
  skip: string
  industries: string
  breadcrumb: string

  heroKicker: string
  heroImageAlt: string
  heroSecondaryCta: string
  heroCapabilitiesLabel: string
  heroCapabilities: readonly string[]
  heroStatValue: number
  heroStatSuffix: string
  heroStatLabel: string

  valuesEyebrow: string
  valuesTitle: string
  valuesIntro: string
  values: readonly LegalValueCard[]

  aboutEyebrow: string
  aboutTitle: string
  aboutIntro: string
  aboutImageAlt: string
  aboutCounterValue: number
  aboutCounterSuffix: string
  aboutCounterLabel: string
  aboutTabsLabel: string
  aboutTabs: readonly LegalTab[]

  domainsEyebrow: string
  domainsTitle: string
  domainsIntro: string
  domainsCta: string
  domains: readonly LegalDomain[]

  statsLabel: string
  statsNote: string
  stats: readonly LegalStat[]

  casesEyebrow: string
  casesTitle: string
  casesIntro: string
  casesRegionLabel: string
  casesPrev: string
  casesNext: string
  cases: readonly LegalCasePattern[]

  deliveryEyebrow: string
  deliveryTitle: string
  deliveryIntro: string
  deliveryImageAlt: string
  deliverySteps: readonly LegalStep[]

  whyEyebrow: string
  whyTitle: string
  whyIntro: string
  why: readonly LegalValueCard[]

  servicePathsEyebrow: string
  learnMore: string
  legalWebAppAction: string

  faqEyebrow: string

  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string

  newTab: string
}

const IMG = '/images/industries/legal-firms'

export const legalFirmsLandingCopy = {
  en: {
    skip: 'Skip to legal industry content',
    industries: 'Industries',
    breadcrumb: 'Breadcrumb',

    heroKicker: 'Legal technology',
    heroImageAlt: 'A woman in a grey blazer holding a clipboard and pen against a dark blue background.',
    heroSecondaryCta: 'See the build paths',
    heroCapabilitiesLabel: 'Engineered around',
    heroCapabilities: [
      'Case & matter management',
      'Secure client portals',
      'Document automation & e-sign',
      'Intake & conflict checks',
    ],
    heroStatValue: 5,
    heroStatSuffix: '',
    heroStatLabel: 'controlled stages from public enquiry to authenticated matter',

    valuesEyebrow: 'Why firms build with us',
    valuesTitle: 'Legal systems engineered for confidentiality first',
    valuesIntro:
      'CloudTopia builds the platforms a firm runs its matters on—each one confidential by design, owned, and defensible under review.',
    values: [
      {
        id: 'confidential',
        title: 'Confidentiality by design',
        subtitle:
          'Public information, confidential intake, and privileged matter work stay on separated boundaries, not stitched through one shared inbox.',
      },
      {
        id: 'workflow-fluency',
        title: 'Legal-workflow fluency',
        subtitle:
          'We speak matters, conflicts, deadlines, and engagement wording—so the system fits how the firm actually works, not a generic CRM.',
      },
      {
        id: 'defensible',
        title: 'Defensible delivery',
        subtitle:
          'Every record, deadline, and handoff has a named owner and an audit trail, so what you built holds up under review.',
      },
    ],

    aboutEyebrow: 'About our legal practice',
    aboutTitle: 'We build the confidential rails your matters travel on.',
    aboutIntro:
      'CloudTopia partners with firms to engineer the intake, matter, document, and billing systems that carry a client from a first enquiry to an authenticated matter file—inside the confidentiality and conflict rules the firm owns.',
    aboutImageAlt: 'A smiling woman in a black robe in a wood-panelled courtroom, with people seated behind her.',
    aboutCounterValue: 4,
    aboutCounterSuffix: '',
    aboutCounterLabel: 'owned platform layers, from portal to security',
    aboutTabsLabel: 'About CloudTopia’s legal practice',
    aboutTabs: [
      {
        id: 'approach',
        label: 'Our approach',
        body: 'We start at the confidential threshold: mark where public qualification ends and privilege begins, then build the smallest complete flow across it—intake, conflict check, and a matter record with a named owner—before expanding.',
      },
      {
        id: 'standards',
        label: 'Our standards',
        body: 'Encryption in transit and at rest, role-based access, retention rules, and audit trails are engineered into the foundation and scoped to the access policy the firm approves—never advice, never an implied relationship.',
      },
      {
        id: 'stack',
        label: 'Our stack',
        body: 'Bilingual web and portal front ends, a matter-management core, document automation with integrated e-signature, and bounded integrations to the billing, e-sign, and practice tools the firm already uses.',
      },
    ],

    domainsEyebrow: 'Solution domains',
    domainsTitle: 'The legal systems we engineer',
    domainsIntro:
      'Six connected domains CloudTopia builds for law firms. Start with one and expand across a shared, defensible matter structure.',
    domainsCta: 'Explore all solution paths',
    domains: [
      {
        id: 'matter-management',
        title: 'Case & matter management',
        description: 'Matters, parties, documents, deadlines, and communications recorded once and owned end to end.',
      },
      {
        id: 'client-intake',
        title: 'Intake & conflict checks',
        description: 'A bounded intake that separates public qualification from privileged detail and runs conflict checks with an owner.',
      },
      {
        id: 'document-automation',
        title: 'Document automation & e-sign',
        description: 'Engagement letters and pleadings generated from approved templates and executed through integrated e-signature.',
      },
      {
        id: 'client-portals',
        title: 'Secure client portals',
        description: 'Authenticated portals for document exchange and matter updates with explicit relationship status.',
      },
      {
        id: 'billing-time',
        title: 'Billing & time tracking',
        description: 'Time capture and billing tied to the matter and its documents, reconcilable without re-keying.',
      },
      {
        id: 'security-compliance',
        title: 'Security & records control',
        description: 'Encryption, role-based access, retention, and audit trails scoped to the policy the firm approves.',
      },
    ],

    statsLabel: 'How this engagement is built',
    statsNote: 'These describe our approach and this page—not client outcomes, case results, or performance guarantees.',
    stats: [
      { id: 'languages', value: 2, label: 'Operating languages, built in from day one' },
      { id: 'domains', value: 6, label: 'Connected legal solution domains you can start from' },
      { id: 'paths', value: 4, label: 'Build paths into real CloudTopia services' },
      { id: 'ownership', value: 100, suffix: '%', label: 'Records and handoffs designed with a named owner' },
    ],

    casesEyebrow: 'Solution patterns',
    casesTitle: 'Example builds, not client matters',
    casesIntro:
      'Anonymized patterns of the systems CloudTopia builds for legal teams. Each is an illustrative build shape—no real client, matter, or outcome is depicted.',
    casesRegionLabel: 'Legal solution patterns carousel',
    casesPrev: 'Previous pattern',
    casesNext: 'Next pattern',
    cases: [
      {
        id: 'injury-intake',
        category: 'Client portal',
        title: 'Personal-injury intake and document portal',
        image: `${IMG}/case_injury.webp`,
        width: 800,
        height: 533,
        alt: 'A person wrapping a bandage around the hand of someone seated in a wheelchair.',
      },
      {
        id: 'defense-matter',
        category: 'Matter management',
        title: 'Criminal-defense matter workspace with deadlines',
        image: `${IMG}/case_criminal.webp`,
        width: 800,
        height: 533,
        alt: 'A man in a light blue shirt resting his handcuffed wrists on a wooden table.',
      },
      {
        id: 'employment-docs',
        category: 'Document automation',
        title: 'Employment-dispute document and evidence pipeline',
        image: `${IMG}/case_employment.webp`,
        width: 800,
        height: 533,
        alt: 'A man in a suit tearing a sheet of paper in half across a desk from a colleague, a laptop in front of him.',
      },
      {
        id: 'property-closing',
        category: 'Secure portal',
        title: 'Property-transaction closing and e-signature room',
        image: `${IMG}/case_realestate.webp`,
        width: 800,
        height: 533,
        alt: 'A hand holding a bunch of keys above a wooden table, beside a small model house.',
      },
      {
        id: 'corporate-billing',
        category: 'Billing & time',
        title: 'Corporate-counsel billing and time-capture system',
        image: `${IMG}/case_corporate.webp`,
        width: 800,
        height: 533,
        alt: 'Two people in suits shaking hands over a café table covered with printed charts, coffee cups and a laptop, seen from above.',
      },
      {
        id: 'records-security',
        category: 'Security & conflicts',
        title: 'Records protection and conflict-check data layer',
        image: `${IMG}/case_security.webp`,
        width: 800,
        height: 533,
        alt: 'A man in a suit holding out both hands beneath a glowing shield-and-checkmark graphic.',
      },
    ],

    deliveryEyebrow: 'How we deliver',
    deliveryTitle: 'A delivery path built for privileged work',
    deliveryIntro:
      'We move from context to launch in owned stages, so supervising attorneys, intake teams, and clients can follow every handoff across the confidential threshold.',
    deliveryImageAlt: 'A person in a navy suit signing a document with a fountain pen at a polished desk, shelves of binders behind them.',
    deliverySteps: [
      {
        id: 'discovery',
        title: 'Discovery & confidentiality mapping',
        subtitle: 'Map the flow, the confidential threshold, the records, and the owner each decision depends on.',
      },
      {
        id: 'design-build',
        title: 'Design & secure build',
        subtitle: 'Engineer the intake, matter, and document flows with access control and audit trails from the first commit.',
      },
      {
        id: 'launch-support',
        title: 'Launch & supervised support',
        subtitle: 'Release the scoped flow, connect approved integrations behind sandboxes, and improve on evidence.',
      },
    ],

    whyEyebrow: 'Why legal firms choose CloudTopia',
    whyTitle: 'Built for firms that cannot afford a leak or a missed deadline',
    whyIntro: 'The engineering commitments that keep a legal platform credible after launch.',
    why: [
      {
        id: 'security',
        title: 'Security & confidentiality',
        subtitle: 'Encryption, role-based access, and audit trails engineered into the foundation, scoped to your policy.',
      },
      {
        id: 'domain',
        title: 'Legal-domain fluency',
        subtitle: 'Matters, conflicts, deadlines, and engagement wording modeled the way a firm actually works.',
      },
      {
        id: 'boundaries',
        title: 'Explicit boundaries',
        subtitle: 'No advice and no implied relationship—status and consent wording stay the firm’s to approve.',
      },
      {
        id: 'integrations',
        title: 'Integration expertise',
        subtitle: 'Bounded connections to billing, e-signature, and practice-management tools you already use.',
      },
      {
        id: 'reliability',
        title: 'Reliable, supervised delivery',
        subtitle: 'Owned handoffs, escalation paths, and support agreements that respect professional supervision.',
      },
      {
        id: 'bilingual',
        title: 'Bilingual by design',
        subtitle: 'Arabic and English as operating languages across intake, portal, and matter communication.',
      },
    ],

    servicePathsEyebrow: 'Paths to implementation',
    learnMore: 'Explore this path',
    legalWebAppAction: 'Explore client portals and matter-management applications',

    faqEyebrow: 'Decision questions',

    ctaEyebrow: 'Start building',
    ctaTitle: 'Ready to build a legal platform your clients—and your firm—can trust?',
    ctaSubtitle: 'Bring one flow and the people who own confidentiality and conflicts. We will turn it into a buildable brief.',
    ctaButton: 'Review your legal client intake',

    newTab: '(opens in new tab)',
  },
  ar: {
    skip: 'تخطَّ إلى محتوى القطاع القانوني',
    industries: 'القطاعات',
    breadcrumb: 'مسار التنقل',

    heroKicker: 'التقنية القانونية',
    heroImageAlt: 'امرأة ترتدي سترة رمادية وتحمل حافظة أوراق وقلماً أمام خلفية زرقاء داكنة.',
    heroSecondaryCta: 'اطّلعوا على مسارات البناء',
    heroCapabilitiesLabel: 'مهندَس حول',
    heroCapabilities: [
      'إدارة القضايا والملفات',
      'بوابات عملاء آمنة',
      'أتمتة المستندات والتوقيع الإلكتروني',
      'الاستقبال وفحص تعارض المصالح',
    ],
    heroStatValue: 5,
    heroStatSuffix: '',
    heroStatLabel: 'مراحل منضبطة من الاستفسار العام إلى القضية الموثقة',

    valuesEyebrow: 'لماذا تبني المكاتب معنا',
    valuesTitle: 'أنظمة قانونية مهندَسة تضع السرية أولاً',
    valuesIntro:
      'تبني كلاود توبيا المنصات التي يدير عليها المكتب قضاياه—كل منها سري بالتصميم، وذو مالك واضح، وقابل للدفاع تحت المراجعة.',
    values: [
      {
        id: 'confidential',
        title: 'السرية بالتصميم',
        subtitle:
          'تبقى المعلومات العامة والاستقبال السري وعمل القضية المشمول بالسرية على حدود منفصلة، لا مجمّعة عبر بريد وارد واحد مشترك.',
      },
      {
        id: 'workflow-fluency',
        title: 'إتقان سير العمل القانوني',
        subtitle:
          'نتحدث بلغة القضايا وتعارض المصالح والمواعيد وصياغة الارتباط—ليناسب النظام طريقة عمل المكتب فعلاً، لا نظام إدارة علاقات عام.',
      },
      {
        id: 'defensible',
        title: 'تسليم قابل للدفاع',
        subtitle:
          'لكل سجل وموعد وتسليم مالك محدد ومسار تدقيق، ليصمد ما بنيتموه تحت المراجعة.',
      },
    ],

    aboutEyebrow: 'عن ممارستنا القانونية',
    aboutTitle: 'نبني المسارات السرية التي تسير عليها قضاياكم.',
    aboutIntro:
      'تشارك كلاود توبيا المكاتب في هندسة أنظمة الاستقبال والقضايا والمستندات والفوترة التي تحمل العميل من أول استفسار إلى ملف قضية موثق—ضمن قواعد السرية وتعارض المصالح التي يملكها المكتب.',
    aboutImageAlt: 'امرأة مبتسمة ترتدي رداءً أسود في قاعة محكمة مكسوّة بالخشب، وخلفها أشخاص جالسون.',
    aboutCounterValue: 4,
    aboutCounterSuffix: '',
    aboutCounterLabel: 'طبقات منصة مملوكة، من البوابة إلى الأمان',
    aboutTabsLabel: 'عن ممارسة كلاود توبيا القانونية',
    aboutTabs: [
      {
        id: 'approach',
        label: 'منهجنا',
        body: 'نبدأ عند عتبة السرية: نحدد أين ينتهي التأهيل العام وأين تبدأ السرية، ثم نبني أصغر مسار مكتمل عبرها—استقبال وفحص تعارض مصالح وسجل قضية بمالك محدد—قبل التوسع.',
      },
      {
        id: 'standards',
        label: 'معاييرنا',
        body: 'يُهندَس التشفير أثناء النقل وفي التخزين، والوصول بحسب الأدوار، وقواعد الاحتفاظ، وسجلات التدقيق في الأساس وبحسب سياسة الوصول التي يعتمدها المكتب—لا استشارة ولا علاقة ضمنية.',
      },
      {
        id: 'stack',
        label: 'حزمتنا التقنية',
        body: 'واجهات ويب وبوابات ثنائية اللغة، ونواة إدارة قضايا، وأتمتة مستندات بتوقيع إلكتروني متكامل، وتكاملات محدودة مع أدوات الفوترة والتوقيع والممارسة التي يستخدمها المكتب أصلاً.',
      },
    ],

    domainsEyebrow: 'مجالات الحلول',
    domainsTitle: 'الأنظمة القانونية التي نهندسها',
    domainsIntro:
      'ستة مجالات مترابطة تبنيها كلاود توبيا للمكاتب القانونية. ابدؤوا بواحد وتوسعوا عبر بنية قضية مشتركة قابلة للدفاع.',
    domainsCta: 'استكشفوا كل مسارات الحلول',
    domains: [
      {
        id: 'matter-management',
        title: 'إدارة القضايا والملفات',
        description: 'قضايا وأطراف ومستندات ومواعيد ومراسلات تُسجَّل مرة واحدة وتُملك من طرف إلى طرف.',
      },
      {
        id: 'client-intake',
        title: 'الاستقبال وفحص تعارض المصالح',
        description: 'استقبال محدود يفصل التأهيل العام عن التفصيل السري ويجري فحص تعارض المصالح بمالك.',
      },
      {
        id: 'document-automation',
        title: 'أتمتة المستندات والتوقيع الإلكتروني',
        description: 'خطابات ارتباط ومذكرات تُنشأ من قوالب معتمدة وتُوقَّع عبر توقيع إلكتروني متكامل.',
      },
      {
        id: 'client-portals',
        title: 'بوابات عملاء آمنة',
        description: 'بوابات موثقة لتبادل المستندات وتحديثات القضية بحالة علاقة صريحة.',
      },
      {
        id: 'billing-time',
        title: 'الفوترة وتتبع الوقت',
        description: 'التقاط وقت وفوترة مرتبطان بالقضية ومستنداتها، قابلان للمطابقة دون إعادة إدخال.',
      },
      {
        id: 'security-compliance',
        title: 'الأمان والتحكم في السجلات',
        description: 'تشفير ووصول بحسب الأدوار واحتفاظ وسجلات تدقيق بحسب السياسة التي يعتمدها المكتب.',
      },
    ],

    statsLabel: 'كيف يُبنى هذا التعاون',
    statsNote: 'تصف هذه الأرقام منهجنا وهذه الصفحة، لا نتائج عملاء ولا نتائج قضايا ولا ضمانات أداء.',
    stats: [
      { id: 'languages', value: 2, label: 'لغتا تشغيل مدمجتان منذ اليوم الأول' },
      { id: 'domains', value: 6, label: 'مجالات حلول قانونية مترابطة يمكن البدء منها' },
      { id: 'paths', value: 4, label: 'مسارات بناء إلى خدمات كلاود توبيا الحقيقية' },
      { id: 'ownership', value: 100, suffix: '%', label: 'سجلات وتسليمات مصممة بمالك محدد' },
    ],

    casesEyebrow: 'أنماط الحلول',
    casesTitle: 'أمثلة بناء، لا قضايا عملاء',
    casesIntro:
      'أنماط مجهّلة الهوية للأنظمة التي تبنيها كلاود توبيا للفرق القانونية. كل منها شكل بناء توضيحي—لا يُصوَّر أي عميل أو قضية أو نتيجة حقيقية.',
    casesRegionLabel: 'دوّار أنماط الحلول القانونية',
    casesPrev: 'النمط السابق',
    casesNext: 'النمط التالي',
    cases: [
      {
        id: 'injury-intake',
        category: 'بوابة عميل',
        title: 'بوابة استقبال ومستندات لقضايا الإصابات الشخصية',
        image: `${IMG}/case_injury.webp`,
        width: 800,
        height: 533,
        alt: 'شخص يلفّ ضمادة حول يد شخص جالس على كرسي متحرك.',
      },
      {
        id: 'defense-matter',
        category: 'إدارة القضايا',
        title: 'مساحة عمل قضايا الدفاع الجنائي مع المواعيد',
        image: `${IMG}/case_criminal.webp`,
        width: 800,
        height: 533,
        alt: 'رجل يرتدي قميصاً أزرق فاتحاً يضع معصميه المقيَّدين بالأصفاد على طاولة خشبية.',
      },
      {
        id: 'employment-docs',
        category: 'أتمتة المستندات',
        title: 'خط مستندات وأدلة لنزاعات العمل',
        image: `${IMG}/case_employment.webp`,
        width: 800,
        height: 533,
        alt: 'رجل ببذلة يمزّق ورقة إلى نصفين عبر مكتب أمام زميلة، وأمامه حاسوب محمول.',
      },
      {
        id: 'property-closing',
        category: 'بوابة آمنة',
        title: 'غرفة إغلاق وتوقيع إلكتروني لمعاملات العقارات',
        image: `${IMG}/case_realestate.webp`,
        width: 800,
        height: 533,
        alt: 'يد تحمل حزمة مفاتيح فوق طاولة خشبية، بجانب منزل مصغّر.',
      },
      {
        id: 'corporate-billing',
        category: 'الفوترة والوقت',
        title: 'نظام فوترة والتقاط وقت للمستشار المؤسسي',
        image: `${IMG}/case_corporate.webp`,
        width: 800,
        height: 533,
        alt: 'شخصان ببذلتين يتصافحان فوق طاولة مقهى مغطاة برسوم بيانية مطبوعة وأكواب قهوة وحاسوب محمول، من زاوية علوية.',
      },
      {
        id: 'records-security',
        category: 'الأمان وتعارض المصالح',
        title: 'طبقة حماية سجلات وبيانات فحص تعارض المصالح',
        image: `${IMG}/case_security.webp`,
        width: 800,
        height: 533,
        alt: 'رجل ببذلة يمدّ كلتا يديه تحت رسم متوهج لدرع بداخله علامة صح.',
      },
    ],

    deliveryEyebrow: 'كيف ننفّذ',
    deliveryTitle: 'مسار تسليم مبني للعمل المشمول بالسرية',
    deliveryIntro:
      'ننتقل من السياق إلى الإطلاق عبر مراحل مملوكة، ليتمكن المحامون المشرفون وفرق الاستقبال والعملاء من متابعة كل تسليم عبر عتبة السرية.',
    deliveryImageAlt: 'شخص ببذلة كحلية يوقّع مستنداً بقلم حبر على مكتب مصقول، وخلفه رفوف من المجلدات.',
    deliverySteps: [
      {
        id: 'discovery',
        title: 'الاكتشاف ورسم السرية',
        subtitle: 'نرسم المسار وعتبة السرية والسجلات والمالك الذي يعتمد عليه كل قرار.',
      },
      {
        id: 'design-build',
        title: 'التصميم والبناء الآمن',
        subtitle: 'نهندس مسارات الاستقبال والقضايا والمستندات بضبط وصول وسجلات تدقيق من أول سطر برمجي.',
      },
      {
        id: 'launch-support',
        title: 'الإطلاق والدعم المشرَف عليه',
        subtitle: 'نطلق المسار المحدد، ونربط التكاملات المعتمدة خلف بيئات تجريبية، ونحسّن بناءً على الأدلة.',
      },
    ],

    whyEyebrow: 'لماذا تختار المكاتب القانونية كلاود توبيا',
    whyTitle: 'مبني لمكاتب لا تحتمل تسريباً ولا فوات موعد',
    whyIntro: 'الالتزامات الهندسية التي تُبقي المنصة القانونية جديرة بالثقة بعد الإطلاق.',
    why: [
      {
        id: 'security',
        title: 'الأمان والسرية',
        subtitle: 'تشفير ووصول بحسب الأدوار وسجلات تدقيق مهندَسة في الأساس وبحسب سياستكم.',
      },
      {
        id: 'domain',
        title: 'إتقان المجال القانوني',
        subtitle: 'القضايا وتعارض المصالح والمواعيد وصياغة الارتباط مصمّمة كما يعمل المكتب فعلاً.',
      },
      {
        id: 'boundaries',
        title: 'حدود صريحة',
        subtitle: 'لا استشارة ولا علاقة ضمنية—تبقى صياغة الحالة والموافقة من اعتماد المكتب.',
      },
      {
        id: 'integrations',
        title: 'خبرة التكامل',
        subtitle: 'روابط محدودة مع أدوات الفوترة والتوقيع الإلكتروني وإدارة الممارسة التي تستخدمونها.',
      },
      {
        id: 'reliability',
        title: 'تسليم موثوق ومشرَف عليه',
        subtitle: 'تسليمات مملوكة ومسارات تصعيد واتفاقيات دعم تحترم الإشراف المهني.',
      },
      {
        id: 'bilingual',
        title: 'ثنائي اللغة بالتصميم',
        subtitle: 'العربية والإنجليزية لغتا تشغيل عبر الاستقبال والبوابة وتواصل القضية.',
      },
    ],

    servicePathsEyebrow: 'مسارات التنفيذ',
    learnMore: 'استكشفوا هذا المسار',
    legalWebAppAction: 'استكشفوا بوابات العملاء وتطبيقات إدارة القضايا',

    faqEyebrow: 'أسئلة القرار',

    ctaEyebrow: 'ابدؤوا البناء',
    ctaTitle: 'مستعدون لبناء منصة قانونية يثق بها عملاؤكم ومكتبكم؟',
    ctaSubtitle: 'أحضروا مساراً واحداً ومن يملكون السرية وتعارض المصالح، وسنحوّله إلى موجز قابل للبناء.',
    ctaButton: 'راجعوا مسار استقبال العملاء القانوني',

    newTab: '(يفتح في تبويب جديد)',
  },
} as const satisfies Record<Locale, LegalContent>

export type { LegalCasePattern }
