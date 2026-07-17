import type { Locale } from '@/lib/i18n/config'

/**
 * Bilingual microcopy for the ported Learnit sections that are NOT driven by
 * the IndustryPageDefinition (hero copy, service-bridge, and FAQ come from the
 * definition). Arabic is authored MSA — the brand reads كلاود توبيا in prose,
 * and CTAs use the plural imperative.
 *
 * Framing: CloudTopia ENGINEERS education & LMS platforms. Counter values are
 * structural facts about the approach and this page (operating languages,
 * capability domains, delivery stages, build paths) — never fabricated
 * enrollment, performance, or client-outcome metrics. No fabricated instructors,
 * student testimonials, named authors, prices, addresses, or events are carried
 * over from the template.
 */

export type EducationStatCard = {
  id: string
  value: number
  suffix?: string
  label: string
}

type EducationTopic = {
  id: string
  title: string
  descriptor: string
}

type EducationSolution = {
  id: string
  title: string
  subtitle: string
  includes: readonly string[]
}

type EducationFeature = {
  id: string
  title: string
  subtitle: string
}

type EducationStat = {
  id: string
  value: number
  suffix?: string
  label: string
}

type EducationPlan = {
  id: string
  plan: string
  meta: string
  features: readonly string[]
  popular: boolean
  badge?: string
}

type EducationContent = {
  skip: string
  industries: string
  breadcrumb: string
  heroKicker: string
  heroSecondaryCta: string
  heroTrustLabel: string
  heroTrust: readonly string[]
  heroPhotoAlt: string
  heroStatCards: readonly EducationStatCard[]

  marqueeLabel: string
  marqueeItems: readonly string[]

  aboutEyebrow: string
  aboutTitle: string
  aboutBody: string
  aboutBadgeValue: number
  aboutBadgeSuffix: string
  aboutBadgeLabel: string
  aboutFeatures: readonly EducationFeature[]
  aboutPhotoMainAlt: string
  aboutPhotoOffsetAlt: string

  topicsEyebrow: string
  topicsTitle: string
  topicsIntro: string
  topics: readonly EducationTopic[]

  solutionsEyebrow: string
  solutionsTitle: string
  solutionsIntro: string
  solutions: readonly EducationSolution[]
  solutionsIncludesLabel: string
  solutionsPrev: string
  solutionsNext: string

  statsLabel: string
  statsNote: string
  stats: readonly EducationStat[]

  previewEyebrow: string
  previewTitle: string
  previewIntro: string
  previewCaption: string
  previewPhotoAlt: string
  previewMockLabels: readonly string[]

  pricingEyebrow: string
  pricingTitle: string
  pricingIntro: string
  pricingTabProject: string
  pricingTabRetainer: string
  pricingTabsLabel: string
  pricingProject: readonly EducationPlan[]
  pricingRetainer: readonly EducationPlan[]
  pricingCta: string
  pricingFootnote: string

  servicePathsEyebrow: string
  learnMore: string
  educationWebAppAction: string

  faqEyebrow: string

  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string

  newTab: string
}

export const educationLandingCopy = {
  en: {
    skip: 'Skip to education industry content',
    industries: 'Industries',
    breadcrumb: 'Breadcrumb',
    heroKicker: 'Education engineering',
    heroSecondaryCta: 'See the build paths',
    heroTrustLabel: 'Engineered around',
    heroTrust: ['Role-aware by design', 'Reconciled records', 'Bilingual and accessible'],
    heroPhotoAlt:
      'A teacher working on a laptop at a desk in front of a chalkboard covered in handwritten equations.',
    heroStatCards: [
      { id: 'patterns', value: 6, label: 'Learning-platform patterns we build' },
      { id: 'paths', value: 4, label: 'Connected build paths into CloudTopia services' },
    ],

    marqueeLabel: 'Technologies and standards we build education systems across',
    marqueeItems: [
      'Next.js',
      'React',
      'Supabase',
      'PostgreSQL',
      'LMS / Moodle',
      'LTI',
      'SCORM / xAPI',
      'Video / WebRTC',
      'Payments',
      'SSO / OAuth',
      'REST & GraphQL',
      'Cloud-native',
    ],

    aboutEyebrow: "CloudTopia's education practice",
    aboutTitle: 'We engineer the system behind the classroom, not the classroom itself.',
    aboutBody:
      'CloudTopia builds the platforms institutions run on—enrollment, learning, assessment, and administration—so learners, teachers, guardians, and staff each get the view they need while one reconciled record holds behind them. We design for the roles, the records, and the languages your institution actually uses.',
    aboutBadgeValue: 100,
    aboutBadgeSuffix: '%',
    aboutBadgeLabel: 'Bilingual by design — Arabic and English',
    aboutFeatures: [
      {
        id: 'accessibility',
        title: 'Accessibility-first builds',
        subtitle: 'Semantic structure, keyboard support, and reduced-motion designed in—so the platform can meet the standards you require.',
      },
      {
        id: 'data-care',
        title: 'Careful learner-data handling',
        subtitle: 'Role-based access, guardian models, and retention rules scoped to the data policy your institution approves.',
      },
    ],
    aboutPhotoMainAlt: 'Students at wooden desks in a classroom, several of them using mobile phones.',
    aboutPhotoOffsetAlt: 'A group of students gathered around a laptop at a desk in a lecture hall.',

    topicsEyebrow: 'Capability domains',
    topicsTitle: 'The domains we cover across a learning platform',
    topicsIntro:
      'A full education platform spans more than courses. These are the domains CloudTopia engineers, connected behind one record.',
    topics: [
      {
        id: 'curriculum',
        title: 'Curriculum & content',
        descriptor: 'Structured courses, lessons, and resources with bilingual authoring.',
      },
      {
        id: 'analytics',
        title: 'Data & analytics',
        descriptor: 'Dashboards and reporting on progress, completion, and outcomes.',
      },
      {
        id: 'integrations',
        title: 'Integrations',
        descriptor: 'Identity, payment, LTI-style, and content connections that stay bounded.',
      },
      {
        id: 'mobile',
        title: 'Mobile learning',
        descriptor: 'Learner and teacher apps for access beyond the desktop.',
      },
      {
        id: 'ai-support',
        title: 'AI-assisted learning',
        descriptor: 'Tutoring, feedback, and content support inside institution-owned rules.',
      },
      {
        id: 'compliance',
        title: 'Accessibility & compliance',
        descriptor: 'WCAG-minded, right-to-left, and role-aware from the first screen.',
      },
    ],

    solutionsEyebrow: 'Solution patterns',
    solutionsTitle: 'The learning systems we build',
    solutionsIntro:
      'Each pattern is a complete, reconcilable system you can start with. Combine them as scope grows behind one shared record.',
    solutions: [
      {
        id: 'lms',
        title: 'Learning management system',
        subtitle: 'Deliver courses and track progress against the enrolled learner.',
        includes: ['Courses & lessons', 'Cohorts & groups', 'Progress tracking', 'Resources & media'],
      },
      {
        id: 'sis',
        title: 'Student information system',
        subtitle: 'Hold the authoritative student record every view reconciles to.',
        includes: ['Student records', 'Enrollment states', 'Transcripts', 'Role-based access'],
      },
      {
        id: 'assessment',
        title: 'Assessment & grading',
        subtitle: 'Submit, grade, and return work with a defensible record.',
        includes: ['Assignments', 'Quizzes & exams', 'Gradebook', 'Feedback & appeals'],
      },
      {
        id: 'classroom',
        title: 'Virtual classroom',
        subtitle: 'Run live and recorded sessions tied to the course and cohort.',
        includes: ['Live sessions', 'Recordings', 'Scheduling', 'Attendance'],
      },
      {
        id: 'enrollment',
        title: 'Admissions & enrollment portal',
        subtitle: 'Move applicants from discovery to a confirmed enrollment.',
        includes: ['Applications', 'Document upload', 'Payment', 'Status updates'],
      },
      {
        id: 'admin',
        title: 'Admin & analytics dashboard',
        subtitle: 'Give administrators oversight without breaking role boundaries.',
        includes: ['Role management', 'Reporting', 'Oversight views', 'Exports'],
      },
    ],
    solutionsIncludesLabel: 'What it includes',
    solutionsPrev: 'Previous solutions',
    solutionsNext: 'Next solutions',

    statsLabel: 'How this engagement is built',
    statsNote:
      'These describe our approach and this page—not enrollment, performance, or client-outcome guarantees.',
    stats: [
      { id: 'languages', value: 2, label: 'Operating languages, built in from day one' },
      { id: 'domains', value: 6, label: 'Capability domains across the platform' },
      { id: 'stages', value: 5, label: 'Connected layers in the platform blueprint' },
      { id: 'ownership', value: 100, suffix: '%', label: 'Handoffs designed with a named owner and next action' },
    ],

    previewEyebrow: 'Platform preview',
    previewTitle: 'The kind of learning experience we engineer',
    previewIntro:
      'A learner opens one dashboard; behind it, enrollment, courses, and grades stay reconciled and role-scoped. The frame below is an illustrative preview, not a specific institution.',
    previewCaption: 'Illustrative preview — no real learner data',
    previewPhotoAlt:
      'A young woman working on a laptop at a desk, an open notebook beside her, in a brightly decorated room.',
    previewMockLabels: ['Enrolled', 'In progress', 'Graded'],

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
          'System and role mapping',
          'Journey and enrollment definition',
          'Integration and data inventory',
          'Risk and dependency register',
        ],
      },
      {
        id: 'build-launch',
        plan: 'Build & Launch',
        meta: 'First release',
        popular: true,
        badge: 'Most common',
        features: [
          'Core flow: enrollment or one course',
          'Role and permission model',
          'Reconciled records and admin console',
          'One validated provider integration',
        ],
      },
      {
        id: 'scale-extend',
        plan: 'Scale & Extend',
        meta: 'Growth phase',
        popular: false,
        features: [
          'Assessment and analytics',
          'Expanded integrations',
          'Virtual classroom and mobile',
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
          'Reporting and analytics',
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
          'Accessibility and content reviews',
        ],
      },
    ],
    pricingCta: 'Discuss this scope',
    pricingFootnote: 'Every engagement starts with one scoped, reconcilable flow.',

    servicePathsEyebrow: 'Paths to implementation',
    learnMore: 'Explore this path',
    educationWebAppAction: 'Explore education web applications and portals',

    faqEyebrow: 'Decision questions',

    ctaEyebrow: 'Start building',
    ctaTitle: 'Ready to build a learning platform your institution can trust?',
    ctaSubtitle: 'Bring one flow and the roles that own it. We will turn it into a buildable brief.',
    ctaButton: 'Map your learning experience',

    newTab: '(opens in new tab)',
  },
  ar: {
    skip: 'تخطَّ إلى محتوى قطاع التعليم',
    industries: 'القطاعات',
    breadcrumb: 'مسار التنقل',
    heroKicker: 'هندسة التعليم',
    heroSecondaryCta: 'اطّلعوا على مسارات البناء',
    heroTrustLabel: 'مهندَس حول',
    heroTrust: ['مراعٍ للأدوار بالتصميم', 'سجلات مطابَقة', 'ثنائي اللغة ومتاح للجميع'],
    heroPhotoAlt: 'معلمة تعمل على حاسوب محمول إلى مكتب أمام سبورة مغطاة بمعادلات مكتوبة بخط اليد.',
    heroStatCards: [
      { id: 'patterns', value: 6, label: 'أنماط منصات تعلّم نبنيها' },
      { id: 'paths', value: 4, label: 'مسارات بناء مترابطة إلى خدمات كلاود توبيا' },
    ],

    marqueeLabel: 'التقنيات والمعايير التي نبني عليها أنظمة التعليم',
    marqueeItems: [
      'Next.js',
      'React',
      'Supabase',
      'PostgreSQL',
      'LMS / Moodle',
      'LTI',
      'SCORM / xAPI',
      'Video / WebRTC',
      'المدفوعات',
      'SSO / OAuth',
      'REST & GraphQL',
      'سحابي أصيل',
    ],

    aboutEyebrow: 'ممارسة كلاود توبيا في التعليم',
    aboutTitle: 'نهندس النظام خلف الفصل، لا الفصل نفسه.',
    aboutBody:
      'تبني كلاود توبيا المنصات التي تعمل عليها المؤسسات—التسجيل والتعلّم والتقييم والإدارة—بحيث يحصل المتعلمون والمعلمون وأولياء الأمور والفريق على الواجهة التي يحتاجونها، مع بقاء سجل واحد مطابَق خلفهم. نصمم للأدوار والسجلات واللغات التي تستخدمها مؤسستكم فعلاً.',
    aboutBadgeValue: 100,
    aboutBadgeSuffix: '%',
    aboutBadgeLabel: 'ثنائي اللغة بالتصميم — العربية والإنجليزية',
    aboutFeatures: [
      {
        id: 'accessibility',
        title: 'بناء يضع إتاحة الوصول أولاً',
        subtitle: 'بنية دلالية ودعم لوحة المفاتيح وتقليل الحركة مصممة من الأساس لتلبي المعايير التي تطلبونها.',
      },
      {
        id: 'data-care',
        title: 'عناية دقيقة ببيانات المتعلمين',
        subtitle: 'وصول بحسب الأدوار ونماذج لولي الأمر وقواعد احتفاظ بحسب سياسة البيانات التي تعتمدها مؤسستكم.',
      },
    ],
    aboutPhotoMainAlt: 'طلاب إلى مقاعد خشبية في فصل دراسي، يستخدم عدد منهم هواتف محمولة.',
    aboutPhotoOffsetAlt: 'مجموعة من الطلاب يتحلقون حول حاسوب محمول إلى طاولة في قاعة محاضرات.',

    topicsEyebrow: 'مجالات القدرات',
    topicsTitle: 'المجالات التي نغطيها عبر منصة التعلّم',
    topicsIntro:
      'منصة التعليم الكاملة أوسع من المقررات. هذه هي المجالات التي تهندسها كلاود توبيا، مترابطة خلف سجل واحد.',
    topics: [
      {
        id: 'curriculum',
        title: 'المنهج والمحتوى',
        descriptor: 'مقررات ودروس وموارد منظمة بتأليف ثنائي اللغة.',
      },
      {
        id: 'analytics',
        title: 'البيانات والتحليلات',
        descriptor: 'لوحات وتقارير عن التقدّم والإتمام والمخرجات.',
      },
      {
        id: 'integrations',
        title: 'التكاملات',
        descriptor: 'ربط الهوية والدفع ومعايير التعلّم والمحتوى ضمن حدود واضحة.',
      },
      {
        id: 'mobile',
        title: 'التعلّم عبر الجوال',
        descriptor: 'تطبيقات للمتعلم والمعلم للوصول خارج سطح المكتب.',
      },
      {
        id: 'ai-support',
        title: 'تعلّم بمساعدة الذكاء الاصطناعي',
        descriptor: 'إرشاد وتغذية راجعة ودعم محتوى ضمن قواعد تملكها المؤسسة.',
      },
      {
        id: 'compliance',
        title: 'إتاحة الوصول والامتثال',
        descriptor: 'مراعٍ لمعايير الوصول ومن اليمين إلى اليسار وللأدوار من أول شاشة.',
      },
    ],

    solutionsEyebrow: 'أنماط الحلول',
    solutionsTitle: 'أنظمة التعلّم التي نبنيها',
    solutionsIntro:
      'كل نمط نظام مكتمل قابل للمطابقة يمكنكم البدء به. اجمعوها مع اتساع النطاق خلف سجل مشترك واحد.',
    solutions: [
      {
        id: 'lms',
        title: 'نظام إدارة التعلّم',
        subtitle: 'قدّموا المقررات وتابعوا التقدّم مقابل المتعلم المسجَّل.',
        includes: ['مقررات ودروس', 'مجموعات ودفعات', 'تتبّع التقدّم', 'موارد ووسائط'],
      },
      {
        id: 'sis',
        title: 'نظام معلومات الطالب',
        subtitle: 'احتفظوا بسجل الطالب المرجعي الذي تطابقه كل واجهة.',
        includes: ['سجلات الطلاب', 'حالات التسجيل', 'كشوف الدرجات', 'وصول بحسب الأدوار'],
      },
      {
        id: 'assessment',
        title: 'التقييم ورصد الدرجات',
        subtitle: 'قدّموا الأعمال وارصدوها وأعيدوها بسجل قابل للدفاع.',
        includes: ['الواجبات', 'اختبارات وامتحانات', 'سجل الدرجات', 'تغذية راجعة وتظلم'],
      },
      {
        id: 'classroom',
        title: 'الفصل الافتراضي',
        subtitle: 'أديروا جلسات مباشرة ومسجلة مرتبطة بالمقرر والمجموعة.',
        includes: ['جلسات مباشرة', 'تسجيلات', 'جدولة', 'الحضور'],
      },
      {
        id: 'enrollment',
        title: 'بوابة القبول والتسجيل',
        subtitle: 'انقلوا المتقدمين من الاكتشاف إلى تسجيل مؤكد.',
        includes: ['الطلبات', 'رفع المستندات', 'الدفع', 'تحديثات الحالة'],
      },
      {
        id: 'admin',
        title: 'لوحة الإدارة والتحليلات',
        subtitle: 'امنحوا الإدارة إشرافاً دون كسر حدود الأدوار.',
        includes: ['إدارة الأدوار', 'التقارير', 'واجهات إشراف', 'تصدير البيانات'],
      },
    ],
    solutionsIncludesLabel: 'ما الذي يتضمنه',
    solutionsPrev: 'الحلول السابقة',
    solutionsNext: 'الحلول التالية',

    statsLabel: 'كيف يُبنى هذا التعاون',
    statsNote:
      'تصف هذه الأرقام منهجنا وهذه الصفحة، لا أرقام تسجيل أو أداء أو ضمانات نتائج للعملاء.',
    stats: [
      { id: 'languages', value: 2, label: 'لغتا تشغيل مدمجتان منذ اليوم الأول' },
      { id: 'domains', value: 6, label: 'مجالات قدرات عبر المنصة' },
      { id: 'stages', value: 5, label: 'طبقات مترابطة في مخطط المنصة' },
      { id: 'ownership', value: 100, suffix: '%', label: 'تسليمات مصممة بمالك محدد وخطوة تالية' },
    ],

    previewEyebrow: 'معاينة المنصة',
    previewTitle: 'نوع تجربة التعلّم التي نهندسها',
    previewIntro:
      'يفتح المتعلم لوحة واحدة؛ وخلفها يبقى التسجيل والمقررات والدرجات مطابَقة ومحددة بحسب الدور. الإطار أدناه معاينة توضيحية، لا مؤسسة بعينها.',
    previewCaption: 'معاينة توضيحية — لا بيانات متعلمين حقيقية',
    previewPhotoAlt: 'شابة تعمل على حاسوب محمول إلى مكتب، وبجانبها دفتر مفتوح، في غرفة زاهية الألوان.',
    previewMockLabels: ['مسجَّل', 'قيد التقدّم', 'مرصود'],

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
          'رسم النظام والأدوار',
          'تحديد الرحلة والتسجيل',
          'جرد التكاملات والبيانات',
          'سجل المخاطر والاعتماديات',
        ],
      },
      {
        id: 'build-launch',
        plan: 'البناء والإطلاق',
        meta: 'أول إصدار',
        popular: true,
        badge: 'الأكثر شيوعاً',
        features: [
          'المسار الأساسي: التسجيل أو مقرر واحد',
          'نموذج الأدوار والصلاحيات',
          'سجلات مطابَقة ولوحة إدارة',
          'تكامل مزود موثوق واحد',
        ],
      },
      {
        id: 'scale-extend',
        plan: 'التوسع والتمديد',
        meta: 'مرحلة النمو',
        popular: false,
        features: [
          'التقييم والتحليلات',
          'توسيع التكاملات',
          'الفصل الافتراضي والجوال',
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
          'تقارير وتحليلات',
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
          'مراجعات إتاحة الوصول والمحتوى',
        ],
      },
    ],
    pricingCta: 'ناقشوا هذا النطاق',
    pricingFootnote: 'يبدأ كل تعاون بمسار واحد محدد وقابل للمطابقة.',

    servicePathsEyebrow: 'مسارات التنفيذ',
    learnMore: 'استكشفوا هذا المسار',
    educationWebAppAction: 'استكشفوا تطبيقات الويب والبوابات للتعليم',

    faqEyebrow: 'أسئلة القرار',

    ctaEyebrow: 'ابدؤوا البناء',
    ctaTitle: 'مستعدون لبناء منصة تعلّم تثق بها مؤسستكم؟',
    ctaSubtitle: 'أحضروا مساراً واحداً والأدوار التي تملكه، وسنحوّله إلى موجز قابل للبناء.',
    ctaButton: 'لنرسم تجربة التعلّم لديكم',

    newTab: '(يفتح في تبويب جديد)',
  },
} as const satisfies Record<Locale, EducationContent>
