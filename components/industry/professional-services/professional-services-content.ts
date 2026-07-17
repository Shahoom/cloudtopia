import type { Locale } from '@/lib/i18n/config'

/**
 * Bilingual microcopy for the ported "Showbiz" sections that are NOT driven by
 * the IndustryPageDefinition (hero, service-bridge, and FAQ come from the
 * definition). Arabic is authored MSA — the brand reads كلاود توبيا in prose,
 * CTAs are plural-imperative.
 *
 * Framing: CloudTopia ENGINEERS professional-services systems. Stats and pie
 * metrics are structural facts about the approach and this page (languages,
 * delivery stages, build paths, owned handoffs, engineering focus split) —
 * never fabricated client outcomes, awards, or performance guarantees.
 */

type ProServItem = {
  id: string
  title: string
  subtitle: string
}

type ProServPieMetric = {
  id: string
  value: number
  title: string
  subtitle: string
}

type ProServApproachBlock = {
  id: string
  badge: string
  title: string
  body: string
  imageAlt: string
}

type ProServTab = {
  id: string
  label: string
  heading: string
  body: string
  points: readonly string[]
}

type ProServPattern = {
  id: string
  filterId: string
  title: string
  subtitle: string
  imageAlt: string
}

type ProServStat = {
  id: string
  value: number
  suffix?: string
  label: string
}

type ProServStep = {
  id: string
  title: string
  subtitle: string
}

type ProfessionalServicesContent = {
  skip: string
  industries: string
  breadcrumb: string

  heroKicker: string
  heroScrollHint: string
  heroTimebarLabel: string
  heroTrustLabel: string
  heroImageAlt: string
  heroTrust: readonly string[]
  heroSlides: readonly { id: string; keyword: string; subhead: string }[]

  featuresEyebrow: string
  featuresTitle: string
  featuresIntro: string
  features: readonly ProServItem[]

  approachEyebrow: string
  approachTitle: string
  approachIntro: string
  approach: readonly ProServApproachBlock[]

  servicesEyebrow: string
  servicesTitle: string
  servicesIntro: string
  services: readonly ProServItem[]

  metricsEyebrow: string
  metricsTitle: string
  metricsIntro: string
  metricsNote: string
  metricsRegionLabel: string
  metrics: readonly ProServPieMetric[]

  tabsEyebrow: string
  tabsTitle: string
  tabsIntro: string
  tabsLabel: string
  tabs: readonly ProServTab[]

  galleryEyebrow: string
  galleryTitle: string
  galleryIntro: string
  galleryFilterLabel: string
  galleryAllLabel: string
  galleryFilters: readonly { id: string; label: string }[]
  patterns: readonly ProServPattern[]

  statsLabel: string
  statsNote: string
  stats: readonly ProServStat[]

  modulesEyebrow: string
  modulesTitle: string
  modulesIntro: string
  modulesRegionLabel: string
  modules: readonly ProServStep[]

  servicePathsEyebrow: string
  learnMore: string
  webAppAction: string

  faqEyebrow: string

  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
  ctaImageAlt: string

  newTab: string
}

export const professionalServicesLandingCopy = {
  en: {
    skip: 'Skip to professional-services industry content',
    industries: 'Industries',
    breadcrumb: 'Breadcrumb',

    heroKicker: 'Professional-services engineering',
    heroScrollHint: 'Scroll to explore the platform',
    heroTimebarLabel: 'Hero highlight progress',
    heroTrustLabel: 'Engineered around',
    heroImageAlt:
      'People on the curved balconies of a warm, open office atrium, looking out over the floors below.',
    heroTrust: ['Owned engagement rail', 'Permissioned client portals', 'Bilingual by design'],
    heroSlides: [
      {
        id: 'platforms',
        keyword: 'Platforms',
        subhead: 'We build the systems professional firms run on.',
      },
      {
        id: 'engagements',
        keyword: 'Engagements',
        subhead: 'From first enquiry to final report on one owned rail.',
      },
      {
        id: 'clarity',
        keyword: 'Clarity',
        subhead: 'Scope, deliver, and bill with a status every side can see.',
      },
    ],

    featuresEyebrow: 'What we build',
    featuresTitle: 'Six capabilities behind an expert-led firm',
    featuresIntro:
      'CloudTopia engineers the core systems a professional firm needs to turn expertise into a clear, trackable engagement.',
    features: [
      {
        id: 'practice',
        title: 'Practice & matter management',
        subtitle: 'One workspace for engagements, matters, tasks, and resourcing across the team.',
      },
      {
        id: 'portals',
        title: 'Secure client portals',
        subtitle: 'Scoped, permissioned portals so each client sees only their status, files, and approvals.',
      },
      {
        id: 'automation',
        title: 'Document & workflow automation',
        subtitle: 'Proposals, contracts, and approvals generated and routed from structured data.',
      },
      {
        id: 'time-billing',
        title: 'Time-tracking & billing',
        subtitle: 'Recorded time and fee models that produce invoices reconciled to the work.',
      },
      {
        id: 'crm',
        title: 'CRM & intake pipelines',
        subtitle: 'One intake and pipeline so enquiries become qualified, owned opportunities.',
      },
      {
        id: 'analytics',
        title: 'Analytics & reporting',
        subtitle: 'Utilization, pipeline, and delivery dashboards on the same reconciled record.',
      },
    ],

    approachEyebrow: 'Our approach',
    approachTitle: 'We deliver a high-performance engagement system',
    approachIntro:
      'Two principles keep a professional-services platform credible long after launch.',
    approach: [
      {
        id: 'one-rail',
        badge: 'Architecture',
        title: 'One owned engagement rail, not scattered tools',
        body: 'Intake, proposals, delivery, time, and billing sit on one reconciled rail with a named owner and next action at every stage. Status stops disappearing between inboxes, drives, and chats.',
        imageAlt:
          'The curved glass atrium of a modern office building, its walkways wrapping a single open core.',
      },
      {
        id: 'separated',
        badge: 'Delivery',
        title: 'Client material separated and permissioned',
        body: 'Firm knowledge, client materials, permissions, and retention rules are separated by design, so each client sees only what has been shared and the firm keeps its internal working files private.',
        imageAlt:
          'Two people walking through the open lobby of a modern professional office building.',
      },
    ],

    servicesEyebrow: 'Concrete offerings',
    servicesTitle: 'The systems we build for professional firms',
    servicesIntro:
      'Each offering is a buildable module you can start narrow and expand, connected to the tools your firm keeps.',
    services: [
      {
        id: 'client-portal',
        title: 'Client & engagement portals',
        subtitle: 'Bilingual portals for status, shared documents, approvals, and client requests.',
      },
      {
        id: 'project-system',
        title: 'Project & resource management',
        subtitle: 'Engagements, tasks, milestones, and capacity tracked in one shared workspace.',
      },
      {
        id: 'billing-system',
        title: 'Time & billing systems',
        subtitle: 'Time capture, fee models, invoicing, and reconciliation connected to delivery.',
      },
      {
        id: 'proposal-crm',
        title: 'Proposal & CRM pipelines',
        subtitle: 'Intake, qualification, proposal generation, and pipeline in one owned flow.',
      },
      {
        id: 'knowledge',
        title: 'Knowledge bases',
        subtitle: 'Structured, searchable firm knowledge with roles, review, and retention rules.',
      },
      {
        id: 'integrations',
        title: 'Integrations & managed support',
        subtitle: 'Bounded links to accounting, e-signature, and identity, with ongoing support.',
      },
    ],

    metricsEyebrow: 'Where engineering effort goes',
    metricsTitle: 'How a professional-services build splits',
    metricsIntro:
      'A representative platform concentrates engineering across three areas. These proportions describe our approach — not a client outcome.',
    metricsNote:
      'Illustrative of how we scope a build; each engagement’s split is set with you.',
    metricsRegionLabel: 'Engineering focus proportions',
    metrics: [
      {
        id: 'portals',
        value: 35,
        title: 'Client & engagement portals',
        subtitle: 'Permissioned portals, status, approvals, and the shared client experience.',
      },
      {
        id: 'delivery',
        value: 35,
        title: 'Project & resource management',
        subtitle: 'Engagement workspace, tasks, milestones, and resourcing across the team.',
      },
      {
        id: 'revenue',
        value: 30,
        title: 'Time, billing & CRM',
        subtitle: 'Time capture, invoicing, and the proposal-to-pipeline revenue path.',
      },
    ],

    tabsEyebrow: 'How we work',
    tabsTitle: 'Solution areas, one connected model',
    tabsIntro:
      'Whether you start with intake, delivery, or billing, each area plugs into the same reconciled engagement rail.',
    tabsLabel: 'Solution areas',
    tabs: [
      {
        id: 'discovery',
        label: 'Discovery',
        heading: 'Map the engagement before we build',
        body: 'We map one high-value flow with the people, tools, and records it touches, so scope is set on evidence, not guesswork.',
        points: [
          'Flow, handoff, and owner mapping',
          'Tool and data inventory',
          'Permission and retention map',
          'Risk and dependency register',
        ],
      },
      {
        id: 'build',
        label: 'Build',
        heading: 'Engineer the owned rail',
        body: 'We build the portal, workspace, or billing module with roles, status, and traceability from the first commit.',
        points: [
          'Client portal and roles',
          'Project and resource workspace',
          'Document and workflow automation',
          'Time capture and fee models',
        ],
      },
      {
        id: 'integrate',
        label: 'Integrate',
        heading: 'Connect what you keep',
        body: 'We connect accounting, e-signature, and identity behind validated interfaces, with a manual fallback until access is confirmed.',
        points: [
          'Accounting and invoicing links',
          'E-signature and approvals',
          'Identity and single sign-on',
          'Reconciliation and audit trail',
        ],
      },
      {
        id: 'support',
        label: 'Support',
        heading: 'Operate and expand',
        body: 'After launch we monitor, maintain, and add reconcilable modules so the platform grows without a risky rebuild.',
        points: [
          'Monitoring and fixes',
          'Incremental module delivery',
          'Bilingual content operations',
          'Reporting and utilization insight',
        ],
      },
    ],

    galleryEyebrow: 'Pattern archetypes',
    galleryTitle: 'Example solution patterns',
    galleryIntro:
      'Representative system patterns we build for professional firms. These are architecture archetypes, not claimed client work.',
    galleryFilterLabel: 'Filter example patterns by system type',
    galleryAllLabel: 'All',
    galleryFilters: [
      { id: 'portals', label: 'Portals' },
      { id: 'automation', label: 'Automation' },
      { id: 'crm', label: 'CRM' },
      { id: 'analytics', label: 'Analytics' },
    ],
    patterns: [
      {
        id: 'client-workspace',
        filterId: 'portals',
        title: 'Client workspace portal',
        subtitle: 'Scoped status, documents, and approvals per client.',
        imageAlt: 'Client workspace portal pattern (placeholder pending imagery)',
      },
      {
        id: 'proposal-engine',
        filterId: 'automation',
        title: 'Proposal & contract engine',
        subtitle: 'Documents generated and routed from structured data.',
        imageAlt: 'Proposal and contract automation pattern (placeholder pending imagery)',
      },
      {
        id: 'intake-pipeline',
        filterId: 'crm',
        title: 'Intake & pipeline board',
        subtitle: 'Qualified enquiries with a named owner and stage.',
        imageAlt: 'Intake and pipeline board pattern (placeholder pending imagery)',
      },
      {
        id: 'utilization-dashboard',
        filterId: 'analytics',
        title: 'Utilization dashboard',
        subtitle: 'Capacity, billable time, and delivery in one view.',
        imageAlt: 'Utilization dashboard pattern (placeholder pending imagery)',
      },
      {
        id: 'approval-flow',
        filterId: 'automation',
        title: 'Approval & e-signature flow',
        subtitle: 'Routed approvals with a traceable record.',
        imageAlt: 'Approval and e-signature flow pattern (placeholder pending imagery)',
      },
      {
        id: 'knowledge-hub',
        filterId: 'portals',
        title: 'Knowledge & document hub',
        subtitle: 'Searchable firm knowledge with roles and retention.',
        imageAlt: 'Knowledge and document hub pattern (placeholder pending imagery)',
      },
    ],

    statsLabel: 'How this engagement is built',
    statsNote:
      'These describe our approach and this page — not client outcomes or performance guarantees.',
    stats: [
      {
        id: 'languages',
        value: 2,
        label: 'Operating languages, built in from day one',
      },
      {
        id: 'capabilities',
        value: 6,
        label: 'Core capabilities on one connected platform',
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
        label: 'Engagement stages designed with a named owner',
      },
    ],

    modulesEyebrow: 'Delivery modules',
    modulesTitle: 'The engagement, built in owned stages',
    modulesIntro:
      'We move from context to launch in reconcilable modules, so clients and teams can follow every handoff. Watch each stage light up in sequence.',
    modulesRegionLabel: 'CloudTopia professional-services delivery stages',
    modules: [
      {
        id: 'discover',
        title: 'Discover & scope',
        subtitle: 'Map one flow, its tools, records, and the owner each step depends on.',
      },
      {
        id: 'build',
        title: 'Build the rail',
        subtitle: 'Engineer the portal, workspace, or billing module with roles and traceability.',
      },
      {
        id: 'integrate',
        title: 'Integrate & reconcile',
        subtitle: 'Connect the tools you keep behind validated interfaces, then reconcile.',
      },
      {
        id: 'support',
        title: 'Launch & support',
        subtitle: 'Release the scoped flow, report on it, and expand module by module.',
      },
    ],

    servicePathsEyebrow: 'Paths to implementation',
    learnMore: 'Explore this path',
    webAppAction: 'Explore client portals and engagement web applications',

    faqEyebrow: 'Decision questions',

    ctaEyebrow: 'Start building',
    ctaTitle: 'Ready to build the system your firm runs on?',
    ctaSubtitle: 'Bring one engagement flow and the people who own it. We will turn it into a buildable brief.',
    ctaButton: 'Structure your client engagement journey',
    ctaImageAlt:
      'A glass-walled office atrium with people moving between its upper floors.',

    newTab: '(opens in new tab)',
  },
  ar: {
    skip: 'تخطَّ إلى محتوى قطاع الخدمات المهنية',
    industries: 'القطاعات',
    breadcrumb: 'مسار التنقل',

    heroKicker: 'هندسة الخدمات المهنية',
    heroScrollHint: 'مرّروا لاستكشاف المنصة',
    heroTimebarLabel: 'تقدّم عرض البطل',
    heroTrustLabel: 'مهندَس حول',
    heroImageAlt:
      'أشخاص على شرفات منحنية في بهو مكتبي مفتوح بألوان دافئة، يطلّون على الطوابق أدناه.',
    heroTrust: ['مسار ارتباط ذو ملكية', 'بوابات عملاء مصرَّح بها', 'ثنائي اللغة بالتصميم'],
    heroSlides: [
      {
        id: 'platforms',
        keyword: 'منصّات',
        subhead: 'نبني الأنظمة التي تعمل عليها الشركات المهنية.',
      },
      {
        id: 'engagements',
        keyword: 'ارتباطات',
        subhead: 'من أول استفسار إلى التقرير النهائي على مسار واحد ذي ملكية.',
      },
      {
        id: 'clarity',
        keyword: 'وضوح',
        subhead: 'حدّدوا النطاق ونفّذوا وافوتروا بحالة يراها كل طرف.',
      },
    ],

    featuresEyebrow: 'ما الذي نبنيه',
    featuresTitle: 'ست قدرات خلف شركة يقودها الخبراء',
    featuresIntro:
      'تهندس كلاود توبيا الأنظمة الأساسية التي تحتاجها الشركة المهنية لتحويل الخبرة إلى ارتباط واضح وقابل للتتبع.',
    features: [
      {
        id: 'practice',
        title: 'إدارة الممارسة والملفات',
        subtitle: 'مساحة عمل واحدة للارتباطات والملفات والمهام والموارد عبر الفريق.',
      },
      {
        id: 'portals',
        title: 'بوابات عملاء آمنة',
        subtitle: 'بوابات محددة ومصرَّح بها ليرى كل عميل حالته وملفاته واعتماداته فقط.',
      },
      {
        id: 'automation',
        title: 'أتمتة المستندات ومسارات العمل',
        subtitle: 'مقترحات وعقود واعتمادات تُنشأ وتُوجَّه من بيانات منظمة.',
      },
      {
        id: 'time-billing',
        title: 'تتبع الوقت والفوترة',
        subtitle: 'وقت مسجل ونماذج أتعاب تنتج فواتير مطابَقة للعمل.',
      },
      {
        id: 'crm',
        title: 'إدارة العلاقات ومسارات الاستقبال',
        subtitle: 'استقبال ومسار مبيعات واحد لتصبح الاستفسارات فرصاً مؤهلة ذات مالك.',
      },
      {
        id: 'analytics',
        title: 'التحليلات والتقارير',
        subtitle: 'لوحات الاستغلال والمسار والتنفيذ على سجل مطابَق واحد.',
      },
    ],

    approachEyebrow: 'منهجنا',
    approachTitle: 'نسلّم نظام ارتباط عالي الأداء',
    approachIntro:
      'مبدآن يُبقيان منصة الخدمات المهنية جديرة بالثقة بعد الإطلاق بوقت طويل.',
    approach: [
      {
        id: 'one-rail',
        badge: 'الهندسة',
        title: 'مسار ارتباط واحد ذو ملكية، لا أدوات متفرقة',
        body: 'يقع الاستقبال والمقترحات والتنفيذ والوقت والفوترة على مسار مطابَق واحد بمالك محدد وخطوة تالية في كل مرحلة. تتوقف الحالة عن الضياع بين البريد والأقراص والمحادثات.',
        imageAlt:
          'بهو زجاجي منحنٍ في مبنى مكاتب حديث، تلتفّ ممراته حول نواة مفتوحة واحدة.',
      },
      {
        id: 'separated',
        badge: 'التسليم',
        title: 'مواد العميل منفصلة ومصرَّح بها',
        body: 'تُفصل معرفة الشركة ومواد العميل والصلاحيات وقواعد الاحتفاظ بالتصميم، فلا يرى كل عميل إلا ما جرت مشاركته، وتُبقي الشركة ملفات عملها الداخلية خاصة.',
        imageAlt:
          'شخصان يسيران في بهو مفتوح لمبنى مكاتب مهني حديث.',
      },
    ],

    servicesEyebrow: 'عروض ملموسة',
    servicesTitle: 'الأنظمة التي نبنيها للشركات المهنية',
    servicesIntro:
      'كل عرض وحدة قابلة للبناء تبدؤونها ضيقة ثم توسّعونها، مرتبطة بالأدوات التي تحتفظ بها شركتكم.',
    services: [
      {
        id: 'client-portal',
        title: 'بوابات العملاء والارتباطات',
        subtitle: 'بوابات ثنائية اللغة للحالة والمستندات المشتركة والاعتمادات وطلبات العملاء.',
      },
      {
        id: 'project-system',
        title: 'إدارة المشاريع والموارد',
        subtitle: 'ارتباطات ومهام ومراحل وطاقة متتبَّعة في مساحة عمل مشتركة واحدة.',
      },
      {
        id: 'billing-system',
        title: 'أنظمة الوقت والفوترة',
        subtitle: 'التقاط الوقت ونماذج الأتعاب والفوترة والمطابقة مرتبطة بالتنفيذ.',
      },
      {
        id: 'proposal-crm',
        title: 'مسارات المقترحات وإدارة العلاقات',
        subtitle: 'الاستقبال والتأهيل وإنشاء المقترحات ومسار المبيعات في مسار واحد ذي ملكية.',
      },
      {
        id: 'knowledge',
        title: 'قواعد المعرفة',
        subtitle: 'معرفة شركة منظمة وقابلة للبحث بأدوار ومراجعة وقواعد احتفاظ.',
      },
      {
        id: 'integrations',
        title: 'التكاملات والدعم المُدار',
        subtitle: 'روابط محدودة مع المحاسبة والتوقيع الإلكتروني والهوية، مع دعم مستمر.',
      },
    ],

    metricsEyebrow: 'أين يذهب الجهد الهندسي',
    metricsTitle: 'كيف يتوزع بناء الخدمات المهنية',
    metricsIntro:
      'تركّز المنصة النموذجية الجهد الهندسي على ثلاثة مجالات. تصف هذه النسب منهجنا، لا نتيجة عميل.',
    metricsNote:
      'توضيح لطريقة تحديد نطاق البناء؛ يُحدَّد توزيع كل ارتباط معكم.',
    metricsRegionLabel: 'نسب التركيز الهندسي',
    metrics: [
      {
        id: 'portals',
        value: 35,
        title: 'بوابات العملاء والارتباطات',
        subtitle: 'بوابات مصرَّح بها والحالة والاعتمادات وتجربة العميل المشتركة.',
      },
      {
        id: 'delivery',
        value: 35,
        title: 'إدارة المشاريع والموارد',
        subtitle: 'مساحة عمل الارتباط والمهام والمراحل والموارد عبر الفريق.',
      },
      {
        id: 'revenue',
        value: 30,
        title: 'الوقت والفوترة وإدارة العلاقات',
        subtitle: 'التقاط الوقت والفوترة ومسار الإيراد من المقترح إلى المبيعات.',
      },
    ],

    tabsEyebrow: 'كيف نعمل',
    tabsTitle: 'مجالات الحلول، بنموذج واحد مترابط',
    tabsIntro:
      'سواء بدأتم بالاستقبال أو التنفيذ أو الفوترة، يتصل كل مجال بمسار الارتباط المطابَق نفسه.',
    tabsLabel: 'مجالات الحلول',
    tabs: [
      {
        id: 'discovery',
        label: 'الاكتشاف',
        heading: 'نرسم الارتباط قبل البناء',
        body: 'نرسم مساراً واحداً ذا قيمة عالية بالأشخاص والأدوات والسجلات التي يمر بها، ليُحدَّد النطاق على أدلة لا تخمين.',
        points: [
          'رسم المسار والتسليم والمالك',
          'جرد الأدوات والبيانات',
          'خريطة الصلاحيات والاحتفاظ',
          'سجل المخاطر والاعتماديات',
        ],
      },
      {
        id: 'build',
        label: 'البناء',
        heading: 'نهندس المسار ذا الملكية',
        body: 'نبني البوابة أو مساحة العمل أو وحدة الفوترة بأدوار وحالة وقابلية تتبع من أول سطر برمجي.',
        points: [
          'بوابة العميل والأدوار',
          'مساحة عمل المشاريع والموارد',
          'أتمتة المستندات ومسارات العمل',
          'التقاط الوقت ونماذج الأتعاب',
        ],
      },
      {
        id: 'integrate',
        label: 'التكامل',
        heading: 'نربط ما تحتفظون به',
        body: 'نربط المحاسبة والتوقيع الإلكتروني والهوية خلف واجهات موثوقة، مع مسار يدوي بديل حتى يتأكد الوصول.',
        points: [
          'روابط المحاسبة والفوترة',
          'التوقيع الإلكتروني والاعتمادات',
          'الهوية والدخول الموحد',
          'المطابقة وسجل التدقيق',
        ],
      },
      {
        id: 'support',
        label: 'الدعم',
        heading: 'نشغّل ونوسّع',
        body: 'بعد الإطلاق نراقب ونصون ونضيف وحدات قابلة للمطابقة لتنمو المنصة دون إعادة بناء محفوفة بالمخاطر.',
        points: [
          'المراقبة والإصلاحات',
          'تسليم الوحدات تدريجياً',
          'تشغيل محتوى ثنائي اللغة',
          'التقارير ورؤية الاستغلال',
        ],
      },
    ],

    galleryEyebrow: 'نماذج أولية للأنماط',
    galleryTitle: 'أمثلة على أنماط الحلول',
    galleryIntro:
      'أنماط أنظمة تمثيلية نبنيها للشركات المهنية. هذه نماذج هندسية أولية، لا عمل عملاء مُدّعى.',
    galleryFilterLabel: 'تصفية أمثلة الأنماط حسب نوع النظام',
    galleryAllLabel: 'الكل',
    galleryFilters: [
      { id: 'portals', label: 'البوابات' },
      { id: 'automation', label: 'الأتمتة' },
      { id: 'crm', label: 'إدارة العلاقات' },
      { id: 'analytics', label: 'التحليلات' },
    ],
    patterns: [
      {
        id: 'client-workspace',
        filterId: 'portals',
        title: 'بوابة مساحة عمل العميل',
        subtitle: 'حالة ومستندات واعتمادات محددة لكل عميل.',
        imageAlt: 'نمط بوابة مساحة عمل العميل (عنصر نائب بانتظار الصور)',
      },
      {
        id: 'proposal-engine',
        filterId: 'automation',
        title: 'محرك المقترحات والعقود',
        subtitle: 'مستندات تُنشأ وتُوجَّه من بيانات منظمة.',
        imageAlt: 'نمط أتمتة المقترحات والعقود (عنصر نائب بانتظار الصور)',
      },
      {
        id: 'intake-pipeline',
        filterId: 'crm',
        title: 'لوحة الاستقبال والمسار',
        subtitle: 'استفسارات مؤهلة بمالك ومرحلة واضحين.',
        imageAlt: 'نمط لوحة الاستقبال والمسار (عنصر نائب بانتظار الصور)',
      },
      {
        id: 'utilization-dashboard',
        filterId: 'analytics',
        title: 'لوحة الاستغلال',
        subtitle: 'الطاقة والوقت القابل للفوترة والتنفيذ في واجهة واحدة.',
        imageAlt: 'نمط لوحة الاستغلال (عنصر نائب بانتظار الصور)',
      },
      {
        id: 'approval-flow',
        filterId: 'automation',
        title: 'مسار الاعتماد والتوقيع الإلكتروني',
        subtitle: 'اعتمادات مُوجَّهة بسجل قابل للتتبع.',
        imageAlt: 'نمط مسار الاعتماد والتوقيع الإلكتروني (عنصر نائب بانتظار الصور)',
      },
      {
        id: 'knowledge-hub',
        filterId: 'portals',
        title: 'مركز المعرفة والمستندات',
        subtitle: 'معرفة شركة قابلة للبحث بأدوار واحتفاظ.',
        imageAlt: 'نمط مركز المعرفة والمستندات (عنصر نائب بانتظار الصور)',
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
        id: 'capabilities',
        value: 6,
        label: 'قدرات أساسية على منصة واحدة مترابطة',
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
        label: 'مراحل ارتباط مصممة بمالك محدد',
      },
    ],

    modulesEyebrow: 'وحدات التسليم',
    modulesTitle: 'الارتباط مبنيّ في مراحل ذات ملكية',
    modulesIntro:
      'ننتقل من السياق إلى الإطلاق عبر وحدات قابلة للمطابقة، ليتابع العملاء والفرق كل تسليم. تابعوا إضاءة كل مرحلة بالتسلسل.',
    modulesRegionLabel: 'مراحل تسليم الخدمات المهنية لدى كلاود توبيا',
    modules: [
      {
        id: 'discover',
        title: 'الاكتشاف وتحديد النطاق',
        subtitle: 'نرسم مساراً واحداً وأدواته وسجلاته والمالك الذي تعتمد عليه كل خطوة.',
      },
      {
        id: 'build',
        title: 'بناء المسار',
        subtitle: 'نهندس البوابة أو مساحة العمل أو وحدة الفوترة بأدوار وقابلية تتبع.',
      },
      {
        id: 'integrate',
        title: 'التكامل والمطابقة',
        subtitle: 'نربط الأدوات التي تحتفظون بها خلف واجهات موثوقة، ثم نطابق.',
      },
      {
        id: 'support',
        title: 'الإطلاق والدعم',
        subtitle: 'نطلق المسار المحدد، ونعدّ تقارير عنه، ونوسّعه وحدة بوحدة.',
      },
    ],

    servicePathsEyebrow: 'مسارات التنفيذ',
    learnMore: 'استكشفوا هذا المسار',
    webAppAction: 'استكشفوا بوابات العملاء وتطبيقات ويب الارتباطات',

    faqEyebrow: 'أسئلة القرار',

    ctaEyebrow: 'ابدؤوا البناء',
    ctaTitle: 'مستعدون لبناء النظام الذي تعمل عليه شركتكم؟',
    ctaSubtitle: 'أحضروا مسار ارتباط واحداً والأشخاص الذين يملكونه، وسنحوّله إلى موجز قابل للبناء.',
    ctaButton: 'نظّموا رحلة ارتباط عملائكم',
    ctaImageAlt:
      'بهو مكاتب بجدران زجاجية يتنقل فيه أشخاص بين طوابقه العليا.',

    newTab: '(يفتح في تبويب جديد)',
  },
} as const satisfies Record<Locale, ProfessionalServicesContent>
