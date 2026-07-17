import type { Locale } from '@/lib/i18n/config'

/**
 * Bilingual microcopy for the ported Shapen (construction) sections that are NOT
 * driven by the IndustryPageDefinition (hero, service-bridge, and FAQ come from
 * the definition). Arabic is authored MSA — the brand reads كلاود توبيا in prose.
 *
 * Framing: CloudTopia ENGINEERS construction & built-asset systems. Numbers are
 * structural facts about the approach and this page (languages, delivery stages,
 * build paths, owned handoffs) or relative delivery focus — never fabricated
 * performance, project counts, or client-outcome metrics. Project cards are
 * illustrative solution archetypes, NOT named client work.
 */

type ConstructionCard = {
  id: string
  title: string
  subtitle: string
}

type ConstructionStat = {
  id: string
  value: number
  suffix?: string
  label: string
}

type ConstructionSkill = {
  id: string
  label: string
  value: number
}

type ConstructionService = {
  id: string
  title: string
  subtitle: string
}

type ConstructionCapability = {
  id: string
  title: string
  subtitle: string
}

type ConstructionFilter = {
  id: string
  label: string
}

type ConstructionProject = {
  id: string
  sector: string
  sectorLabel: string
  title: string
  subtitle: string
}

type ConstructionMissionArea = {
  id: string
  label: string
  detail: string
}

type ConstructionContent = {
  skip: string
  industries: string
  breadcrumb: string
  newTab: string

  heroKicker: string
  heroSecondaryCta: string
  heroTrustLabel: string
  heroTrust: readonly string[]
  heroSceneLabel: string
  heroSceneCaption: string

  specializationEyebrow: string
  specializationTitle: string
  specializationWatermark: string
  specializationIntro: string
  specialization: readonly ConstructionCard[]

  aboutEyebrow: string
  aboutTitle: string
  aboutWatermark: string
  aboutBody: readonly string[]
  aboutHighlights: readonly ConstructionCard[]

  valueEyebrow: string
  valueTitle: string
  valueWatermark: string
  valueIntro: string
  statsNote: string
  stats: readonly ConstructionStat[]
  skillsLabel: string
  skillsNote: string
  skills: readonly ConstructionSkill[]

  servicesEyebrow: string
  servicesTitle: string
  servicesWatermark: string
  servicesIntro: string
  services: readonly ConstructionService[]

  capabilitiesEyebrow: string
  capabilitiesTitle: string
  capabilitiesIntro: string
  capabilities: readonly ConstructionCapability[]

  callUsEyebrow: string
  callUsTitle: string
  callUsBody: string
  callUsButton: string

  projectsEyebrow: string
  projectsTitle: string
  projectsWatermark: string
  projectsIntro: string
  projectFilterLabel: string
  projectFilters: readonly ConstructionFilter[]
  projects: readonly ConstructionProject[]
  projectsNote: string

  missionEyebrow: string
  missionTitle: string
  missionWatermark: string
  missionIntro: string
  missionAreas: readonly ConstructionMissionArea[]
  missionAsideTitle: string
  missionAsideBody: string
  missionButton: string

  servicePathsEyebrow: string
  learnMore: string
  constructionSystemsAction: string

  faqEyebrow: string

  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
}

export const constructionLandingCopy = {
  en: {
    skip: 'Skip to construction industry content',
    industries: 'Industries',
    breadcrumb: 'Breadcrumb',
    newTab: '(opens in new tab)',

    heroKicker: 'Construction technology',
    heroSecondaryCta: 'See the build paths',
    heroTrustLabel: 'Engineered around',
    heroTrust: ['One current revision', 'Owned, dated decisions', 'Bilingual by design'],
    heroSceneLabel: 'Live project sequence',
    heroSceneCaption: 'Every state shows an owner and what waits behind it.',

    specializationEyebrow: 'What we build',
    specializationTitle: 'Three systems that carry a project',
    specializationWatermark: 'Welcome',
    specializationIntro:
      'CloudTopia engineers the platforms a construction project runs on — each one owned, dated, and reconcilable from tender to handover.',
    specialization: [
      {
        id: 'project-field',
        title: 'Project & field management',
        subtitle:
          'Tender, RFI, approvals, inspections, and progress in one owned system that keeps every decision moving.',
      },
      {
        id: 'document-bim',
        title: 'Document control & BIM',
        subtitle:
          'Versioned drawings, models, and documents distributed from a single source of truth to the field and the office.',
      },
      {
        id: 'asset-integration',
        title: 'Asset tracking & integration',
        subtitle:
          'Plant, materials, and reporting reconciled with your ERP, accounting, and programme so the numbers match the site.',
      },
    ],

    aboutEyebrow: 'Our practice',
    aboutTitle: 'A construction-technology practice, not a contractor',
    aboutWatermark: 'About',
    aboutBody: [
      'CloudTopia builds software for the people who deliver the built environment — contractors, developers, project management consultants, and the site and commercial teams around them.',
      'We digitise the project lifecycle from preconstruction through handover, keeping engineering sign-off, safety approval, and contractual authority exactly where they belong: with the licensed professionals and owners on the project.',
    ],
    aboutHighlights: [
      {
        id: 'who',
        title: 'Who we build for',
        subtitle: 'Contractors, developers, and PMCs delivering commercial, infrastructure, and residential work.',
      },
      {
        id: 'what',
        title: 'What we digitise',
        subtitle: 'Tender, RFI and approval flows, document control, field inspections, and asset reporting.',
      },
      {
        id: 'how',
        title: 'How we hand off',
        subtitle: 'Every workflow ships with a named owner, a dated state, and an auditable record.',
      },
    ],

    valueEyebrow: 'How this engagement is built',
    valueTitle: 'Structure you can count on',
    valueWatermark: 'Value',
    valueIntro:
      'These describe our approach and this page — not project counts, performance, or client outcomes.',
    statsNote: 'Structural facts about the build, not guarantees.',
    stats: [
      { id: 'languages', value: 2, label: 'Operating languages, built in from day one' },
      { id: 'stages', value: 6, label: 'Project stages from tender to handover' },
      { id: 'paths', value: 4, label: 'Connected build paths into real CloudTopia services' },
      { id: 'ownership', value: 100, suffix: '%', label: 'Handoffs designed with a named owner and dated state' },
    ],
    skillsLabel: 'Where we focus',
    skillsNote: 'Relative emphasis across a typical construction build — not a performance score.',
    skills: [
      { id: 'project-controls', label: 'Project & document control', value: 92 },
      { id: 'field-apps', label: 'Field & mobile apps', value: 88 },
      { id: 'integration', label: 'ERP & systems integration', value: 85 },
      { id: 'data-bi', label: 'Data, BI & reporting', value: 80 },
      { id: 'bim', label: 'BIM & model coordination', value: 74 },
    ],

    servicesEyebrow: 'Our services',
    servicesTitle: 'What we build for construction',
    servicesWatermark: 'Services',
    servicesIntro:
      'Four core offerings that combine into a platform scoped to the process you prioritise first.',
    services: [
      {
        id: 'project-bid',
        title: 'Project & bid management systems',
        subtitle: 'Tender, RFI, submittal, approval, and progress workflows with dated, auditable decision states.',
      },
      {
        id: 'field-apps',
        title: 'Field, site & inspection apps',
        subtitle: 'Mobile-first apps for inspections, QA/QC, snagging, and daily reporting from the current revision.',
      },
      {
        id: 'bim-docs',
        title: 'BIM & document control',
        subtitle: 'Versioned drawings and models distributed by rule so the field and office share one source.',
      },
      {
        id: 'asset-erp',
        title: 'Asset tracking & ERP integration',
        subtitle: 'Plant, materials, cost, and progress reconciled with the systems you already run.',
      },
    ],

    capabilitiesEyebrow: 'Capability depth',
    capabilitiesTitle: 'Nine things we build into a construction platform',
    capabilitiesIntro:
      'The deeper toolkit that fills out a project system as scope grows from one process to the whole lifecycle.',
    capabilities: [
      { id: 'bim', title: 'BIM coordination', subtitle: 'Model registers, clash context, and controlled distribution.' },
      { id: 'estimating', title: 'Cost & estimating tools', subtitle: 'Structured pricing, quantities, and budget reconciliation.' },
      { id: 'safety', title: 'Safety & compliance apps', subtitle: 'Permits, inductions, and inspection records with owners.' },
      { id: 'procurement', title: 'Procurement & subcontractors', subtitle: 'Packages, orders, and subcontractor handoffs tracked to work.' },
      { id: 'scheduling', title: 'Scheduling & programme', subtitle: 'Milestones and progress tied to the payment application.' },
      { id: 'iot', title: 'IoT & site monitoring', subtitle: 'Sensor and plant feeds surfaced into one operational view.' },
      { id: 'documents', title: 'Document control', subtitle: 'Naming, revisions, supersede rules, and distribution logs.' },
      { id: 'dashboards', title: 'Dashboards & BI', subtitle: 'Reporting that reconciles cost, progress, and schedule.' },
      { id: 'inspections', title: 'Mobile inspections', subtitle: 'On-site checklists, evidence capture, and snag close-out.' },
    ],

    callUsEyebrow: "Let's work together",
    callUsTitle: "Let's build your construction platform",
    callUsBody:
      'Bring one project process and the teams that own it. We will scope a bounded, buildable first phase with you.',
    callUsButton: 'Talk to us',

    projectsEyebrow: 'Solution patterns',
    projectsTitle: 'Illustrative build patterns by sector',
    projectsWatermark: 'Projects',
    projectsIntro:
      'Filter example system archetypes by sector. These are illustrative capability patterns — not named client work.',
    projectFilterLabel: 'Filter build patterns by sector',
    projectFilters: [
      { id: '*', label: 'All' },
      { id: 'commercial', label: 'Commercial' },
      { id: 'infrastructure', label: 'Infrastructure' },
      { id: 'residential', label: 'Residential' },
      { id: 'institutional', label: 'Institutional' },
      { id: 'industrial', label: 'Industrial' },
      { id: 'renovation', label: 'Renovation' },
    ],
    projects: [
      { id: 'tower-bim', sector: 'commercial', sectorLabel: 'Commercial', title: 'Commercial tower', subtitle: 'BIM coordination & document-control platform' },
      { id: 'mixed-tender', sector: 'commercial', sectorLabel: 'Commercial', title: 'Mixed-use development', subtitle: 'Tender & bid management workflow' },
      { id: 'highway-dash', sector: 'infrastructure', sectorLabel: 'Infrastructure', title: 'Highway package', subtitle: 'Progress & cost reporting dashboard' },
      { id: 'bridge-inspect', sector: 'infrastructure', sectorLabel: 'Infrastructure', title: 'Bridge works', subtitle: 'Inspection & QA evidence capture' },
      { id: 'community-portal', sector: 'residential', sectorLabel: 'Residential', title: 'Residential community', subtitle: 'Client portal & handover system' },
      { id: 'villa-snag', sector: 'residential', sectorLabel: 'Residential', title: 'Villa programme', subtitle: 'Snagging & as-built archiving' },
      { id: 'hospital-qa', sector: 'institutional', sectorLabel: 'Institutional', title: 'Hospital build', subtitle: 'QA/QC & inspection app' },
      { id: 'campus-milestone', sector: 'institutional', sectorLabel: 'Institutional', title: 'School campus', subtitle: 'Programme & milestone reporting' },
      { id: 'plant-asset', sector: 'industrial', sectorLabel: 'Industrial', title: 'Industrial plant', subtitle: 'Asset & equipment tracking' },
      { id: 'fitout-rfi', sector: 'renovation', sectorLabel: 'Renovation', title: 'Office fit-out', subtitle: 'RFI & submittal workflow' },
      { id: 'refurb-docs', sector: 'renovation', sectorLabel: 'Renovation', title: 'Refurbishment', subtitle: 'As-built document control' },
    ],
    projectsNote: 'Every pattern is an illustration of a buildable system, not a claim of a specific delivered project.',

    missionEyebrow: 'Our engagement',
    missionTitle: 'What we digitise across the lifecycle',
    missionWatermark: 'Mission',
    missionIntro:
      'Pick a starting process; the platform expands across the project lifecycle from one reconcilable boundary.',
    missionAreas: [
      { id: 'precon', label: 'Preconstruction & tender management', detail: 'Qualify bidders and packages against project-defined criteria.' },
      { id: 'rfi', label: 'RFI, submittal & approval workflows', detail: 'Route decisions to named approvers with dated states.' },
      { id: 'docs', label: 'Document & drawing control', detail: 'Version, supersede, and distribute against one standard.' },
      { id: 'field', label: 'Field inspections, QA/QC & snagging', detail: 'Capture evidence and close snags from the current revision.' },
      { id: 'assets', label: 'Asset, plant & materials tracking', detail: 'Tie equipment and deliveries to the work they belong to.' },
      { id: 'reporting', label: 'Progress, cost & payment reporting', detail: 'Reconcile the programme with the payment application.' },
      { id: 'portals', label: 'Client & consultant portals', detail: 'Give each party only the lane it is permitted to see.' },
      { id: 'handover', label: 'Handover & as-built archiving', detail: 'Close out test packs and keep an auditable history.' },
    ],
    missionAsideTitle: 'Where do we start?',
    missionAsideBody:
      'Bring one high-value process and the systems it touches. We will define the smallest reconcilable boundary and a buildable first phase.',
    missionButton: 'Book a discovery call',

    servicePathsEyebrow: 'Paths to implementation',
    learnMore: 'Explore this path',
    constructionSystemsAction: 'Explore project, bid & business systems development',

    faqEyebrow: 'Decision questions',

    ctaEyebrow: 'Start building',
    ctaTitle: 'Ready to keep every project decision visible and moving?',
    ctaSubtitle: 'Bring one process and the teams that own it. We will turn it into a buildable brief.',
    ctaButton: 'Map your construction project workflow',
  },
  ar: {
    skip: 'تخطَّ إلى محتوى قطاع الإنشاء',
    industries: 'القطاعات',
    breadcrumb: 'مسار التنقل',
    newTab: '(يفتح في تبويب جديد)',

    heroKicker: 'تقنيات الإنشاء',
    heroSecondaryCta: 'اطّلعوا على مسارات البناء',
    heroTrustLabel: 'مهندَس حول',
    heroTrust: ['مراجعة حالية واحدة', 'قرارات مملوكة ومؤرخة', 'ثنائي اللغة بالتصميم'],
    heroSceneLabel: 'تسلسل مشروع حيّ',
    heroSceneCaption: 'تعرض كل حالة مالكها وما ينتظر خلفها.',

    specializationEyebrow: 'ما الذي نبنيه',
    specializationTitle: 'ثلاثة أنظمة تحمل المشروع',
    specializationWatermark: 'مرحباً',
    specializationIntro:
      'تهندس كلاود توبيا المنصات التي يعمل عليها مشروع الإنشاء — كل منها مملوك ومؤرخ وقابل للمطابقة من المناقصة إلى التسليم.',
    specialization: [
      {
        id: 'project-field',
        title: 'إدارة المشروع والموقع',
        subtitle:
          'المناقصة وطلبات المعلومات والاعتمادات والفحوصات والتقدم في نظام واحد مملوك يبقي كل قرار متحركاً.',
      },
      {
        id: 'document-bim',
        title: 'التحكم في المستندات ونمذجة معلومات البناء',
        subtitle:
          'مخططات ونماذج ومستندات مُدارة بالنسخ وموزعة من مصدر واحد موثوق إلى الموقع والمكتب.',
      },
      {
        id: 'asset-integration',
        title: 'تتبع الأصول والتكامل',
        subtitle:
          'معدات ومواد وتقارير مطابَقة مع تخطيط الموارد والمحاسبة والبرنامج لتطابق الأرقام الموقع.',
      },
    ],

    aboutEyebrow: 'ممارستنا',
    aboutTitle: 'ممارسة تقنية إنشاء، لا مقاول',
    aboutWatermark: 'نبذة',
    aboutBody: [
      'تبني كلاود توبيا برمجيات لمن ينفّذون البيئة المبنية — المقاولون والمطورون واستشاريو إدارة المشاريع وفرق الموقع والفرق التجارية المحيطة بهم.',
      'نرقمن دورة حياة المشروع من ما قبل الإنشاء حتى التسليم، مع إبقاء الاعتماد الهندسي وموافقة السلامة والسلطة التعاقدية حيث يجب أن تكون تماماً: لدى المهنيين المرخصين وأصحاب المشروع.',
    ],
    aboutHighlights: [
      {
        id: 'who',
        title: 'لمن نبني',
        subtitle: 'مقاولون ومطورون واستشاريو إدارة مشاريع ينفّذون أعمالاً تجارية وبنية تحتية وسكنية.',
      },
      {
        id: 'what',
        title: 'ما الذي نرقمنه',
        subtitle: 'مسارات المناقصة وطلب المعلومات والاعتماد، والتحكم في المستندات، وفحوصات الموقع، وتقارير الأصول.',
      },
      {
        id: 'how',
        title: 'كيف نسلّم',
        subtitle: 'يصدر كل مسار عمل بمالك محدد وحالة مؤرخة وسجل قابل للتدقيق.',
      },
    ],

    valueEyebrow: 'كيف يُبنى هذا التعاون',
    valueTitle: 'بنية يمكنكم الاعتماد عليها',
    valueWatermark: 'القيمة',
    valueIntro:
      'تصف هذه الأرقام منهجنا وهذه الصفحة — لا عدد مشاريع ولا أداءً ولا نتائج عملاء.',
    statsNote: 'حقائق بنيوية عن البناء، لا ضمانات.',
    stats: [
      { id: 'languages', value: 2, label: 'لغتا تشغيل مدمجتان منذ اليوم الأول' },
      { id: 'stages', value: 6, label: 'مراحل مشروع من المناقصة إلى التسليم' },
      { id: 'paths', value: 4, label: 'مسارات بناء مترابطة إلى خدمات كلاود توبيا الحقيقية' },
      { id: 'ownership', value: 100, suffix: '%', label: 'تسليمات مصممة بمالك محدد وحالة مؤرخة' },
    ],
    skillsLabel: 'أين نركّز',
    skillsNote: 'تركيز نسبي عبر مشروع إنشاء نموذجي — لا درجة أداء.',
    skills: [
      { id: 'project-controls', label: 'التحكم في المشاريع والمستندات', value: 92 },
      { id: 'field-apps', label: 'التطبيقات الميدانية والجوال', value: 88 },
      { id: 'integration', label: 'تكامل تخطيط الموارد والأنظمة', value: 85 },
      { id: 'data-bi', label: 'البيانات وذكاء الأعمال والتقارير', value: 80 },
      { id: 'bim', label: 'نمذجة معلومات البناء وتنسيق النماذج', value: 74 },
    ],

    servicesEyebrow: 'خدماتنا',
    servicesTitle: 'ما الذي نبنيه للإنشاء',
    servicesWatermark: 'الخدمات',
    servicesIntro:
      'أربعة عروض أساسية تتجمع في منصة محددة النطاق وفق العملية التي تعطونها الأولوية أولاً.',
    services: [
      {
        id: 'project-bid',
        title: 'أنظمة إدارة المشاريع والمناقصات',
        subtitle: 'مسارات المناقصة وطلب المعلومات والتقديم والاعتماد والتقدم بحالات قرار مؤرخة قابلة للتدقيق.',
      },
      {
        id: 'field-apps',
        title: 'تطبيقات الموقع والفحص الميدانية',
        subtitle: 'تطبيقات تعمل بالجوال أولاً للفحوصات وضبط الجودة والملاحظات والتقارير اليومية من المراجعة الحالية.',
      },
      {
        id: 'bim-docs',
        title: 'نمذجة معلومات البناء والتحكم في المستندات',
        subtitle: 'مخططات ونماذج مُدارة بالنسخ وموزعة بالقاعدة ليتشارك الموقع والمكتب مصدراً واحداً.',
      },
      {
        id: 'asset-erp',
        title: 'تتبع الأصول وتكامل تخطيط الموارد',
        subtitle: 'معدات ومواد وتكلفة وتقدم مطابَقة مع الأنظمة التي تشغّلونها أصلاً.',
      },
    ],

    capabilitiesEyebrow: 'عمق القدرات',
    capabilitiesTitle: 'تسعة عناصر نبنيها في منصة الإنشاء',
    capabilitiesIntro:
      'مجموعة الأدوات الأعمق التي تكمل نظام المشروع مع اتساع النطاق من عملية واحدة إلى دورة الحياة كاملة.',
    capabilities: [
      { id: 'bim', title: 'تنسيق نمذجة معلومات البناء', subtitle: 'سجلات النماذج وسياق التعارضات والتوزيع المضبوط.' },
      { id: 'estimating', title: 'أدوات التكلفة والتقدير', subtitle: 'تسعير منظم وكميات ومطابقة الميزانية.' },
      { id: 'safety', title: 'تطبيقات السلامة والامتثال', subtitle: 'تصاريح وتعريفات وسجلات فحص بمالكين.' },
      { id: 'procurement', title: 'المشتريات والمقاولون الفرعيون', subtitle: 'حزم وأوامر وتسليمات مقاولين مرتبطة بالعمل.' },
      { id: 'scheduling', title: 'الجدولة والبرنامج', subtitle: 'مراحل وتقدم مرتبطة بمستخلص الدفع.' },
      { id: 'iot', title: 'إنترنت الأشياء ومراقبة الموقع', subtitle: 'تدفقات الحساسات والمعدات في عرض تشغيلي واحد.' },
      { id: 'documents', title: 'التحكم في المستندات', subtitle: 'قواعد التسمية والنسخ والإلغاء وسجلات التوزيع.' },
      { id: 'dashboards', title: 'لوحات المعلومات وذكاء الأعمال', subtitle: 'تقارير تطابق التكلفة والتقدم والجدول.' },
      { id: 'inspections', title: 'الفحوصات بالجوال', subtitle: 'قوائم فحص في الموقع والتقاط أدلة وإغلاق الملاحظات.' },
    ],

    callUsEyebrow: 'لنعمل معاً',
    callUsTitle: 'لنبنِ منصة الإنشاء الخاصة بكم',
    callUsBody:
      'أحضروا عملية مشروع واحدة والفرق التي تملكها، وسنحدد معكم مرحلة أولى محددة وقابلة للبناء.',
    callUsButton: 'تواصلوا معنا',

    projectsEyebrow: 'أنماط الحلول',
    projectsTitle: 'أنماط بناء توضيحية حسب القطاع',
    projectsWatermark: 'المشاريع',
    projectsIntro:
      'صفّوا نماذج الأنظمة التوضيحية حسب القطاع. هذه أنماط قدرات توضيحية — لا أعمال عملاء مسمّاة.',
    projectFilterLabel: 'تصفية أنماط البناء حسب القطاع',
    projectFilters: [
      { id: '*', label: 'الكل' },
      { id: 'commercial', label: 'تجاري' },
      { id: 'infrastructure', label: 'بنية تحتية' },
      { id: 'residential', label: 'سكني' },
      { id: 'institutional', label: 'مؤسسي' },
      { id: 'industrial', label: 'صناعي' },
      { id: 'renovation', label: 'تجديد' },
    ],
    projects: [
      { id: 'tower-bim', sector: 'commercial', sectorLabel: 'تجاري', title: 'برج تجاري', subtitle: 'منصة تنسيق نمذجة معلومات البناء والتحكم في المستندات' },
      { id: 'mixed-tender', sector: 'commercial', sectorLabel: 'تجاري', title: 'تطوير متعدد الاستخدامات', subtitle: 'مسار إدارة المناقصات والعطاءات' },
      { id: 'highway-dash', sector: 'infrastructure', sectorLabel: 'بنية تحتية', title: 'حزمة طريق سريع', subtitle: 'لوحة تقارير التقدم والتكلفة' },
      { id: 'bridge-inspect', sector: 'infrastructure', sectorLabel: 'بنية تحتية', title: 'أعمال جسر', subtitle: 'فحص والتقاط أدلة الجودة' },
      { id: 'community-portal', sector: 'residential', sectorLabel: 'سكني', title: 'مجتمع سكني', subtitle: 'بوابة عميل ونظام تسليم' },
      { id: 'villa-snag', sector: 'residential', sectorLabel: 'سكني', title: 'برنامج فلل', subtitle: 'ملاحظات وأرشفة بناء فعلي' },
      { id: 'hospital-qa', sector: 'institutional', sectorLabel: 'مؤسسي', title: 'بناء مستشفى', subtitle: 'تطبيق ضبط جودة وفحص' },
      { id: 'campus-milestone', sector: 'institutional', sectorLabel: 'مؤسسي', title: 'حرم مدرسي', subtitle: 'تقارير البرنامج والمراحل' },
      { id: 'plant-asset', sector: 'industrial', sectorLabel: 'صناعي', title: 'منشأة صناعية', subtitle: 'تتبع الأصول والمعدات' },
      { id: 'fitout-rfi', sector: 'renovation', sectorLabel: 'تجديد', title: 'تجهيز مكتبي', subtitle: 'مسار طلب المعلومات والتقديم' },
      { id: 'refurb-docs', sector: 'renovation', sectorLabel: 'تجديد', title: 'إعادة تأهيل', subtitle: 'التحكم في مستندات البناء الفعلي' },
    ],
    projectsNote: 'كل نمط توضيح لنظام قابل للبناء، وليس ادعاءً بمشروع محدد منفّذ.',

    missionEyebrow: 'تعاوننا',
    missionTitle: 'ما الذي نرقمنه عبر دورة الحياة',
    missionWatermark: 'الرسالة',
    missionIntro:
      'اختاروا عملية للبدء؛ تتوسع المنصة عبر دورة حياة المشروع من حدٍّ واحد قابل للمطابقة.',
    missionAreas: [
      { id: 'precon', label: 'ما قبل الإنشاء وإدارة المناقصات', detail: 'تأهيل مقدمي العطاءات والحزم وفق معايير يحددها المشروع.' },
      { id: 'rfi', label: 'مسارات طلب المعلومات والتقديم والاعتماد', detail: 'توجيه القرارات إلى معتمِدين محددين بحالات مؤرخة.' },
      { id: 'docs', label: 'التحكم في المستندات والمخططات', detail: 'النسخ والإلغاء والتوزيع وفق معيار واحد.' },
      { id: 'field', label: 'فحوصات الموقع وضبط الجودة والملاحظات', detail: 'التقاط الأدلة وإغلاق الملاحظات من المراجعة الحالية.' },
      { id: 'assets', label: 'تتبع الأصول والمعدات والمواد', detail: 'ربط المعدات والتوريدات بالعمل الذي تخصه.' },
      { id: 'reporting', label: 'تقارير التقدم والتكلفة والدفع', detail: 'مطابقة البرنامج مع مستخلص الدفع.' },
      { id: 'portals', label: 'بوابات العملاء والاستشاريين', detail: 'منح كل طرف المسار المسموح له برؤيته فقط.' },
      { id: 'handover', label: 'التسليم وأرشفة البناء الفعلي', detail: 'إغلاق حزم الاختبار والاحتفاظ بتاريخ قابل للتدقيق.' },
    ],
    missionAsideTitle: 'من أين نبدأ؟',
    missionAsideBody:
      'أحضروا عملية واحدة عالية القيمة والأنظمة التي تمر بها، وسنحدد أصغر حدٍّ قابل للمطابقة ومرحلة أولى قابلة للبناء.',
    missionButton: 'احجزوا جلسة استكشاف',

    servicePathsEyebrow: 'مسارات التنفيذ',
    learnMore: 'استكشفوا هذا المسار',
    constructionSystemsAction: 'استكشفوا تطوير أنظمة المشاريع والمناقصات والأعمال',

    faqEyebrow: 'أسئلة القرار',

    ctaEyebrow: 'ابدؤوا البناء',
    ctaTitle: 'مستعدون لإبقاء كل قرار في المشروع واضحاً ومتحركاً؟',
    ctaSubtitle: 'أحضروا عملية واحدة والفرق التي تملكها، وسنحوّلها إلى موجز قابل للبناء.',
    ctaButton: 'لنرسم سير عمل مشاريع الإنشاء لديكم',
  },
} as const satisfies Record<Locale, ConstructionContent>
