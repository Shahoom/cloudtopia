import type { IndustryPageDefinition } from '@/lib/industries/types'

/**
 * Hand-authored Construction "Industry World".
 *
 * The visible page (components/industry/construction/ConstructionIndustryPage.tsx)
 * ports the Shapen (7xtheme) construction-template look & animations while
 * presenting CloudTopia's expertise BUILDING construction & built-asset systems:
 * project & bid management, field/site apps, BIM/document control, asset &
 * equipment tracking, and client portals. This definition drives the hero, the
 * service-bridge link cards, the FAQ, and the JSON-LD / markdown / SEO surfaces.
 * Every other ported visual section pulls its microcopy from construction-content.ts.
 *
 * Framing rule: CloudTopia ENGINEERS the systems that run a project — it is NOT
 * a contractor, engineer, or certifying authority. The software records
 * decisions and evidence; engineering sign-off, contractual authority, and
 * approvals stay with the licensed owners on the project.
 */
export const constructionDefinition = {
  slug: 'construction',
  contentVersion: 'construction-shapen-published-1',
  publicationStatus: 'published',
  updatedAt: '2026-07-17',
  world: {
    id: 'site-sequence',
    theme: {
      // Derived from the Shapen template palette: warm-amber accent (#F5BF23,
      // fill/highlight only) on white and near-black (#1A1A1A) built-asset bands.
      canvas: '#FFFFFF',
      surface: '#FFFFFF',
      elevatedSurface: '#F6F7F8',
      ink: '#1A1A1A',
      mutedInk: '#4A4A4A',
      accent: '#F5BF23',
      accentInk: '#1A1A1A',
      signal: '#222222',
      line: '#E2E4E7',
      focus: '#1A1A1A',
      displayTreatment: 'technical',
      radiusMode: 'square',
      motifDensity: 'dense',
      sceneTreatment: 'route-field',
    },
    heroScene: 'construction-sequence',
    heroTreatment: 'route-field',
    signatureComposition: {
      id: 'decision-latency',
      name: {
        en: 'Decision latency',
        ar: 'زمن انتظار القرار',
      },
      sectionIds: [
        'construction-project-journey',
        'construction-delivery-lanes',
        'construction-platform-system',
      ],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'construction-sequence' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/construction/en.jpg',
      width: 1200,
      height: 630,
    },
    {
      kind: 'og-image',
      locale: 'ar',
      publicPath: '/og/industries/construction/ar.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'Construction Project & Field Management Systems',
        description:
          'CloudTopia engineers bilingual construction systems: project and bid management, field and site apps, BIM document control, asset tracking, and client portals.',
      },
      breadcrumbLabel: 'Construction',
      hero: {
        worldLabel: 'Site Sequence',
        eyebrow: 'Project delivery systems',
        h1: 'We build the systems that build.',
        intro:
          'CloudTopia designs and builds bilingual construction technology — project and bid management, field and site apps, BIM and document control, asset and equipment tracking, and client portals — so every tender, RFI, approval, and milestone stays visible, owned, and moving.',
        primaryCta: {
          label: 'Map your construction project workflow',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore construction system paths',
          serviceId: 'business-systems-development',
        },
        sceneSummary:
          'Tender, RFI, approval, supply, and milestone states expose who owns each decision and what waits behind it.',
        sceneStages: [
          { id: 'tender', label: 'Prequalify and tender', state: 'Open' },
          { id: 'rfi', label: 'RFI and submittal', state: 'Submitted' },
          { id: 'approval', label: 'Review and approve', state: 'Waiting' },
          { id: 'supply', label: 'Supply and execute', state: 'Released' },
          { id: 'milestone', label: 'Milestone and report', state: 'Recorded' },
        ],
      },
      sections: [
        {
          id: 'construction-operating-pressure',
          type: 'pressure-field',
          variant: 'dense-ledger',
          answers: ['operating-pressure'],
          eyebrow: 'Where projects stall',
          title: 'A project is only as fast as its slowest decision.',
          intro:
            'On a live project, information is scattered across email, spreadsheets, drives, and site radios, so approvals wait, rework grows, and no one can say who owns the next decision or what is blocked behind it.',
          signals: [
            {
              id: 'decision-latency',
              label: 'Waiting is invisible until it hurts',
              description:
                'RFIs, submittals, and approvals sit in inboxes with no owner or due context, so downstream work quietly stops before anyone notices the delay.',
            },
            {
              id: 'document-control',
              label: 'The wrong revision reaches the field',
              description:
                'When drawings, specs, and method statements live in scattered folders, crews build from superseded documents and the cost of rework lands weeks later.',
            },
            {
              id: 'asset-visibility',
              label: 'Plant, materials, and progress drift out of view',
              description:
                'Equipment, deliveries, and milestone status update in disconnected logs, so utilisation, cost, and schedule reporting are always a step behind reality.',
            },
          ],
        },
        {
          id: 'construction-project-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'From tender to handover',
          title: 'One controlled path from tender to a recorded handover.',
          intro:
            'The system carries a package through an understandable project sequence while keeping every RFI, submittal, approval, and supplier handoff inside an owned, dated, traceable state.',
          stages: [
            {
              id: 'tender',
              label: 'Prequalify and tender',
              description:
                'Bidders, packages, and scope are qualified against project-defined criteria, with every submission logged against a clear owner and deadline.',
              actor: 'Commercial and estimating team',
            },
            {
              id: 'rfi',
              label: 'Raise RFIs and submittals',
              description:
                'Questions, shop drawings, and material submittals are raised with references, revisions, and the approver each one is waiting on.',
              actor: 'Site and design coordination',
            },
            {
              id: 'approval',
              label: 'Review and approve',
              description:
                'Approve, revise, or reject states are produced by the reviewers the project appoints, each with a dated decision and a documented reason.',
              actor: 'Consultant and project owners',
            },
            {
              id: 'supply',
              label: 'Supply and execute',
              description:
                'Approved packages release procurement, delivery, and site instruction, with plant and materials tracked against the work they belong to.',
              actor: 'Procurement and site teams',
            },
            {
              id: 'milestone',
              label: 'Record milestones',
              description:
                'Progress, inspections, and quantities are captured on site and reconciled against the programme and the payment application.',
              actor: 'Site engineers and QS',
            },
            {
              id: 'handover',
              label: 'Hand over and archive',
              description:
                'Snags, test packs, and as-built records are closed out and archived so the completed asset keeps a traceable, auditable history.',
              actor: 'Handover and client team',
            },
          ],
        },
        {
          id: 'construction-delivery-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'Signature composition',
          title: 'Progress appears where the client lane meets the site lane.',
          intro:
            'The platform is designed as two coordinated lanes: what the client and consultant see and approve, and the ownership, evidence, and controls the delivery team must hold behind each visible milestone.',
          stages: [
            {
              id: 'tender',
              label: 'Package and scope',
              description: 'A qualified package carries its scope, owner, and deadline into the system.',
              actor: 'Commercial team',
            },
            {
              id: 'rfi',
              label: 'Query and submittal',
              description: 'Each RFI and submittal is bounded to references, revisions, and a named approver.',
              actor: 'Design coordination',
            },
            {
              id: 'approval',
              label: 'Decision state',
              description: 'Both lanes share one dated decision with a documented reason.',
              actor: 'Consultant and owner',
            },
            {
              id: 'supply',
              label: 'Release to site',
              description: 'An approved release ties procurement and plant to the work it belongs to.',
              actor: 'Procurement and site',
            },
            {
              id: 'milestone',
              label: 'Recorded progress',
              description: 'Captured progress reconciles the programme with the payment application.',
              actor: 'Site engineers and QS',
            },
            {
              id: 'handover',
              label: 'Auditable record',
              description: 'The client sees the milestone; the delivery team keeps the traceable record.',
              actor: 'Handover team',
            },
          ],
          lanes: [
            {
              id: 'client-lane',
              label: 'Client and consultant lane',
              stageIds: ['tender', 'approval', 'milestone', 'handover'],
            },
            {
              id: 'site-lane',
              label: 'Site and delivery lane',
              stageIds: ['rfi', 'approval', 'supply', 'milestone', 'handover'],
            },
          ],
        },
        {
          id: 'construction-platform-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'A buildable boundary',
          title: 'A construction platform is a connected set of owned layers.',
          intro:
            'Scope can start with one package or one process, but every layer needs approved inputs, a named handoff, and an outcome the project can reconcile and audit.',
          layers: [
            {
              id: 'field-experience',
              label: 'Field and portal experience layer',
              description:
                'Bilingual web and mobile apps let site teams, subcontractors, and clients raise, track, and approve work with the current revision and a clear next action.',
              inputs: ['Approved drawings and specs', 'Role and permission model', 'Project calendar and packages'],
              handoff: 'A dated, owned request or approval',
              outcome: 'A crew that builds from the right revision',
            },
            {
              id: 'project-controls',
              label: 'Project & bid management layer',
              description:
                'Tender, RFI, submittal, approval, and progress workflows apply project-owned rules and produce dated, auditable decision states.',
              inputs: ['Tender and package structure', 'Approval matrix', 'Programme and milestones'],
              handoff: 'An auditable decision with an owner',
              outcome: 'Approvals a reviewer can trace',
            },
            {
              id: 'document-bim',
              label: 'Document control & BIM layer',
              description:
                'Drawings, models, and documents are versioned, superseded, and distributed so the field, office, and client always reference one source of truth.',
              inputs: ['Naming and revision standard', 'Model and drawing register', 'Distribution rules'],
              handoff: 'A single controlled document set',
              outcome: 'One current source everyone shares',
            },
            {
              id: 'asset-integration',
              label: 'Asset tracking & integration layer',
              description:
                'Equipment, materials, and reporting connect to ERP, accounting, and scheduling tools so utilisation, cost, and progress reconcile against the record.',
              inputs: ['Asset and plant register', 'ERP and cost interfaces', 'Reporting and BI rules'],
              handoff: 'A reconciled progress and cost record',
              outcome: 'Reporting that matches the site',
            },
          ],
        },
        {
          id: 'construction-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'Paths to implementation',
          title: 'Choose the build paths that assemble the platform.',
          intro:
            'The final combination depends on the process you prioritise, the systems and suppliers you already use, and the smallest complete, reconcilable handoff worth building first.',
          serviceIds: [
            'business-systems-development',
            'web-applications',
            'content-creation',
            'website-development',
          ],
          serviceAnchors: [
            {
              serviceId: 'business-systems-development',
              label: 'Project, bid & document-control systems',
            },
            {
              serviceId: 'web-applications',
              label: 'Client portals & site collaboration apps',
            },
            {
              serviceId: 'content-creation',
              label: 'Bilingual project, tender & capability content',
            },
            {
              serviceId: 'website-development',
              label: 'Construction & developer websites',
            },
          ],
          relatedIndustryIds: ['real-estate', 'logistics-supply-chain'],
          industryAnchors: [
            {
              industryId: 'real-estate',
              label: 'Explore property and development systems',
            },
            {
              industryId: 'logistics-supply-chain',
              label: 'Explore supply and delivery systems',
            },
          ],
        },
        {
          id: 'construction-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Evidence and responsibility',
          title: 'The design keeps engineering and contractual authority where it belongs.',
          intro:
            'This page describes a proposed engineering model, not an engineering, certification, or contractual service. Design sign-off, safety approval, and contractual decisions remain with the licensed professionals and owners on the project.',
          items: [
            {
              id: 'authority-boundary',
              label: 'The system records, it does not certify',
              responsibility:
                'The platform captures decisions, evidence, and status; engineering approval, certification, and contractual authority stay with the responsible professionals.',
              dependency: 'Named approvers and the project-owned approval matrix.',
              recovery: 'Route unclear cases to the responsible engineer or owner instead of implying an automated sign-off.',
            },
            {
              id: 'source-data',
              label: 'Permissioned project data',
              responsibility:
                'Project status, safety, certification, and contractual data must come from permissioned source systems with defined ownership and retention.',
              dependency: 'An approved data-ownership, retention, and access map.',
              recovery: 'Hold the affected record access-restricted until its source and rules are confirmed.',
            },
            {
              id: 'handoff-ownership',
              label: 'Every handoff needs an owner',
              responsibility:
                'Each RFI, submittal, approval, and supplier handoff needs a named owner and a dated state before it enters a live workflow.',
              dependency: 'A defined role model and per-process ownership.',
              recovery: 'Keep the step in a draft state until an owner and due context are assigned.',
            },
            {
              id: 'integration-dependency',
              label: 'ERP and provider dependencies',
              responsibility:
                'ERP, accounting, scheduling, and BIM integrations depend on validated interfaces, credentials, and agreed data limits.',
              dependency: 'Confirmed interface documentation and access from each system owner.',
              recovery: 'Hold the integration behind a manual or sandboxed path until access is validated.',
            },
          ],
        },
        {
          id: 'construction-regional-delivery',
          type: 'regional-fit',
          variant: 'market-path',
          answers: ['regional-delivery'],
          eyebrow: 'Built for bilingual sites',
          title: 'Arabic and English are site languages, not a final translation step.',
          intro:
            'Field wording, approval states, document titles, and operator messages are authored for each language while one shared, reconcilable project structure stays constant across the site and the office.',
          items: [
            {
              id: 'bilingual-field',
              label: 'Native site language',
              description:
                'RFIs, checklists, and approvals read the way crews and engineers actually work in each language, not translated after the fact.',
            },
            {
              id: 'localized-documents',
              label: 'Localised documents and records',
              description:
                'Titles, revisions, and reports stay accurate and readable in right-to-left and left-to-right contexts under a named document owner.',
            },
            {
              id: 'market-dependencies',
              label: 'Market-by-market dependencies',
              description:
                'Standards, permitting, ERP systems, and supplier networks are checked per market before scope is fixed.',
            },
          ],
        },
        {
          id: 'construction-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'Decision questions',
          title: 'What construction teams usually need to decide first.',
          intro:
            'A useful first scope is one complete, reconcilable process — tender to approval, or approval to milestone — with named document, decision, and site owners.',
          items: [
            {
              id: 'existing-tools',
              question: 'Can this connect to our existing ERP, accounting, or scheduling tools?',
              answer:
                'It is designed around the interfaces your system owners confirm. We map the required data, responsible system, reconciliation source, and a manual or sandboxed fallback before committing to a live integration with your ERP, accounting, or programme tool.',
            },
            {
              id: 'decision-latency',
              question: 'How is decision latency made visible?',
              answer:
                'Each waiting state shows its owner, the evidence it needs, its due context, and the downstream work that cannot proceed — so an RFI or approval never sits unseen in an inbox.',
            },
            {
              id: 'roles',
              question: 'Can supplier and client views stay separate?',
              answer:
                'Yes. Role-based views expose only the packages, documents, approvals, and milestones each party is permitted to see, so clients, consultants, subcontractors, and site teams each work in the right lane.',
            },
            {
              id: 'authority',
              question: 'Does the system approve or certify the work?',
              answer:
                'No. It records decisions, evidence, and status. Engineering sign-off, safety certification, and contractual authority stay with the licensed professionals and owners; the build makes those decisions explicit, owned, and traceable.',
            },
            {
              id: 'document-control',
              question: 'How does document control stay reliable?',
              answer:
                'Drawings, models, and documents are versioned and superseded against a naming and revision standard, then distributed by rule, so the field, office, and client always reference one current source.',
            },
            {
              id: 'starting-point',
              question: 'Where should a construction team begin?',
              answer:
                'Begin with one high-value process, identify every handoff, document, and owner it touches, then define the smallest reconcilable system boundary that supports it end to end before expanding across the project.',
            },
          ],
        },
        {
          id: 'construction-consultation',
          type: 'closing-cta',
          variant: 'split-close',
          answers: ['decision-close'],
          eyebrow: 'Choose the first process',
          title: 'Make one reconcilable process the starting point.',
          intro:
            'Bring one project process, the teams and suppliers who own it, and the systems it touches. We will turn that context into a bounded, buildable construction-system brief.',
          decisionCopy:
            'Start with one complete, reconcilable process rather than a list of disconnected features.',
          primary: {
            label: 'Map your construction project workflow',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore construction system paths',
            serviceId: 'business-systems-development',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'أنظمة إدارة مشاريع البناء والمواقع والأصول',
        description:
          'تبني كلاود توبيا أنظمة إنشاءات ثنائية اللغة: إدارة المشاريع والمناقصات، وتطبيقات ميدانية للمواقع، وضبط المستندات، وتتبع الأصول والمعدات، وبوابات للعملاء.',
      },
      breadcrumbLabel: 'الإنشاء',
      hero: {
        worldLabel: 'تسلسل المشروع',
        eyebrow: 'أنظمة إدارة رحلة المشروع',
        h1: 'نبني الأنظمة التي تُبنى بها المشاريع.',
        intro:
          'تصمم كلاود توبيا وتبني تقنيات إنشاء ثنائية اللغة — إدارة المشاريع والمناقصات، وتطبيقات الموقع الميدانية، والتحكم في المستندات ونمذجة معلومات البناء، وتتبع الأصول والمعدات، وبوابات العملاء — لتبقى كل مناقصة وطلب معلومات واعتماد ومرحلة واضحة ومملوكة ومتحركة.',
        primaryCta: {
          label: 'لنرسم سير عمل مشاريع الإنشاء لديكم',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشفوا مسارات أنظمة الإنشاء',
          serviceId: 'business-systems-development',
        },
        sceneSummary:
          'تكشف حالات المناقصة وطلب المعلومات والاعتماد والتوريد والمراحل من يملك كل قرار وما ينتظر خلفه.',
        sceneStages: [
          { id: 'tender', label: 'التأهيل والمناقصة', state: 'مفتوح' },
          { id: 'rfi', label: 'طلب المعلومات والتقديم', state: 'مقدم' },
          { id: 'approval', label: 'المراجعة والاعتماد', state: 'بانتظار القرار' },
          { id: 'supply', label: 'التوريد والتنفيذ', state: 'محرر' },
          { id: 'milestone', label: 'المرحلة والتقرير', state: 'مسجل' },
        ],
      },
      sections: [
        {
          id: 'construction-operating-pressure',
          type: 'pressure-field',
          variant: 'dense-ledger',
          answers: ['operating-pressure'],
          eyebrow: 'حيث تتعثر المشاريع',
          title: 'سرعة المشروع لا تتجاوز سرعة أبطأ قرار فيه.',
          intro:
            'في المشروع الحيّ تتوزع المعلومات بين البريد وجداول البيانات والأقراص وأجهزة الموقع، فتنتظر الاعتمادات، وتتراكم إعادة الأعمال، ولا يستطيع أحد أن يقول من يملك القرار التالي أو ما المحجوز خلفه.',
          signals: [
            {
              id: 'decision-latency',
              label: 'الانتظار غير مرئي حتى يؤذي',
              description:
                'تبقى طلبات المعلومات والتقديمات والاعتمادات في صناديق البريد بلا مالك ولا سياق موعد، فيتوقف العمل اللاحق بهدوء قبل أن يلاحظ أحد التأخير.',
            },
            {
              id: 'document-control',
              label: 'وصول المراجعة الخاطئة إلى الموقع',
              description:
                'حين تعيش المخططات والمواصفات وبيانات الطرق في مجلدات متفرقة، ينفّذ العمّال من مستندات ملغاة، وتظهر تكلفة إعادة العمل بعد أسابيع.',
            },
            {
              id: 'asset-visibility',
              label: 'خروج المعدات والمواد والتقدم عن الرؤية',
              description:
                'تُحدَّث المعدات والتوريدات وحالة المراحل في سجلات منفصلة، فتبقى تقارير الاستغلال والتكلفة والجدول متأخرة خطوة عن الواقع.',
            },
          ],
        },
        {
          id: 'construction-project-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'من المناقصة إلى التسليم',
          title: 'مسار واحد منضبط من المناقصة إلى تسليم مسجَّل.',
          intro:
            'يحمل النظام الحزمة عبر تسلسل مشروع مفهوم، مع إبقاء كل طلب معلومات وتقديم واعتماد وتسليم للمورد ضمن حالة مملوكة ومؤرخة قابلة للتتبع.',
          stages: [
            {
              id: 'tender',
              label: 'التأهيل والمناقصة',
              description:
                'يُؤهَّل مقدمو العطاءات والحزم والنطاق وفق معايير يحددها المشروع، وتُسجَّل كل مشاركة لدى مالك واضح وموعد محدد.',
              actor: 'الفريق التجاري وتقدير الكميات',
            },
            {
              id: 'rfi',
              label: 'رفع طلبات المعلومات والتقديمات',
              description:
                'تُرفع الأسئلة ومخططات التنفيذ وتقديمات المواد بمراجعها ونسخها والمعتمِد الذي ينتظره كل منها.',
              actor: 'تنسيق الموقع والتصميم',
            },
            {
              id: 'approval',
              label: 'المراجعة والاعتماد',
              description:
                'تنتج حالات الاعتماد أو التعديل أو الرفض عن المراجعين الذين يعيّنهم المشروع، ولكل منها قرار مؤرخ وسبب موثق.',
              actor: 'الاستشاري وأصحاب المشروع',
            },
            {
              id: 'supply',
              label: 'التوريد والتنفيذ',
              description:
                'تُطلق الحزم المعتمدة الشراء والتوريد وتعليمات الموقع، مع تتبع المعدات والمواد مقابل العمل الذي تخصه.',
              actor: 'فرق المشتريات والموقع',
            },
            {
              id: 'milestone',
              label: 'تسجيل المراحل',
              description:
                'يُلتقط التقدم والفحوصات والكميات في الموقع وتُطابَق مع البرنامج ومستخلص الدفع.',
              actor: 'مهندسو الموقع وحساب الكميات',
            },
            {
              id: 'handover',
              label: 'التسليم والأرشفة',
              description:
                'تُغلق الملاحظات وحزم الاختبار وسجلات البناء الفعلي وتُؤرشف ليحتفظ الأصل المكتمل بتاريخ قابل للتتبع والتدقيق.',
              actor: 'فريق التسليم والعميل',
            },
          ],
        },
        {
          id: 'construction-delivery-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'التكوين المميز',
          title: 'يظهر التقدم عند التقاء مسار العميل بمسار الموقع.',
          intro:
            'تُصمم المنصة كمسارين متناسقين: ما يراه العميل والاستشاري ويعتمده، والملكية والأدلة والضوابط التي يجب أن يحتفظ بها فريق التنفيذ خلف كل مرحلة ظاهرة.',
          stages: [
            {
              id: 'tender',
              label: 'الحزمة والنطاق',
              description: 'تحمل الحزمة المؤهلة نطاقها ومالكها وموعدها إلى النظام.',
              actor: 'الفريق التجاري',
            },
            {
              id: 'rfi',
              label: 'الاستفسار والتقديم',
              description: 'يُحصر كل طلب معلومات وتقديم ضمن مراجع ونسخ ومعتمِد محدد.',
              actor: 'تنسيق التصميم',
            },
            {
              id: 'approval',
              label: 'حالة القرار',
              description: 'يتشارك المساران قراراً واحداً مؤرخاً بسبب موثق.',
              actor: 'الاستشاري والمالك',
            },
            {
              id: 'supply',
              label: 'الإطلاق للموقع',
              description: 'يربط الإطلاق المعتمد المشتريات والمعدات بالعمل الذي تخصه.',
              actor: 'المشتريات والموقع',
            },
            {
              id: 'milestone',
              label: 'تقدم مسجَّل',
              description: 'يطابق التقدم الملتقط البرنامج مع مستخلص الدفع.',
              actor: 'مهندسو الموقع وحساب الكميات',
            },
            {
              id: 'handover',
              label: 'سجل قابل للتدقيق',
              description: 'يرى العميل المرحلة، ويحتفظ فريق التنفيذ بالسجل القابل للتتبع.',
              actor: 'فريق التسليم',
            },
          ],
          lanes: [
            {
              id: 'client-lane',
              label: 'مسار العميل والاستشاري',
              stageIds: ['tender', 'approval', 'milestone', 'handover'],
            },
            {
              id: 'site-lane',
              label: 'مسار الموقع والتنفيذ',
              stageIds: ['rfi', 'approval', 'supply', 'milestone', 'handover'],
            },
          ],
        },
        {
          id: 'construction-platform-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'نطاق قابل للبناء',
          title: 'منصة الإنشاء مجموعة مترابطة من الطبقات ذات الملكية الواضحة.',
          intro:
            'يمكن أن يبدأ النطاق بحزمة واحدة أو عملية واحدة، لكن كل طبقة تحتاج إلى مدخلات معتمدة وتسليم محدد ونتيجة يستطيع المشروع مطابقتها وتدقيقها.',
          layers: [
            {
              id: 'field-experience',
              label: 'طبقة الموقع وبوابة التجربة',
              description:
                'تتيح تطبيقات الويب والجوال ثنائية اللغة لفرق الموقع والمقاولين الفرعيين والعملاء رفع العمل ومتابعته واعتماده بالمراجعة الحالية وخطوة تالية واضحة.',
              inputs: ['مخططات ومواصفات معتمدة', 'نموذج الأدوار والصلاحيات', 'تقويم المشروع والحزم'],
              handoff: 'طلب أو اعتماد مؤرخ بمالك واضح',
              outcome: 'فريق ينفّذ من المراجعة الصحيحة',
            },
            {
              id: 'project-controls',
              label: 'طبقة إدارة المشاريع والمناقصات',
              description:
                'تطبق مسارات المناقصة وطلب المعلومات والتقديم والاعتماد والتقدم قواعد يملكها المشروع وتنتج حالات قرار مؤرخة قابلة للتدقيق.',
              inputs: ['بنية المناقصة والحزم', 'مصفوفة الاعتماد', 'البرنامج والمراحل'],
              handoff: 'قرار قابل للتدقيق بمالك واضح',
              outcome: 'اعتمادات يستطيع المراجع تتبعها',
            },
            {
              id: 'document-bim',
              label: 'طبقة التحكم في المستندات ونمذجة معلومات البناء',
              description:
                'تُدار المخططات والنماذج والمستندات بالنسخ والإلغاء والتوزيع ليرجع الموقع والمكتب والعميل دائماً إلى مصدر واحد موثوق.',
              inputs: ['معيار التسمية والنسخ', 'سجل النماذج والمخططات', 'قواعد التوزيع'],
              handoff: 'مجموعة مستندات واحدة مضبوطة',
              outcome: 'مصدر حالي واحد يشترك فيه الجميع',
            },
            {
              id: 'asset-integration',
              label: 'طبقة تتبع الأصول والتكامل',
              description:
                'تتصل المعدات والمواد والتقارير بأنظمة تخطيط الموارد والمحاسبة والجدولة لتطابق الاستغلال والتكلفة والتقدم مع السجل.',
              inputs: ['سجل الأصول والمعدات', 'واجهات تخطيط الموارد والتكلفة', 'قواعد التقارير وذكاء الأعمال'],
              handoff: 'سجل تقدم وتكلفة مطابَق',
              outcome: 'تقارير تطابق الموقع',
            },
          ],
        },
        {
          id: 'construction-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'اختاروا مسارات البناء التي تجمع المنصة.',
          intro:
            'يتحدد المزيج النهائي بحسب العملية التي تعطونها الأولوية، والأنظمة والموردين الذين تستخدمونهم أصلاً، وأصغر تسليم متكامل قابل للمطابقة يستحق البناء أولاً.',
          serviceIds: [
            'business-systems-development',
            'web-applications',
            'content-creation',
            'website-development',
          ],
          serviceAnchors: [
            {
              serviceId: 'business-systems-development',
              label: 'أنظمة المشاريع والمناقصات والتحكم في المستندات',
            },
            {
              serviceId: 'web-applications',
              label: 'بوابات العملاء وتطبيقات تعاون الموقع',
            },
            {
              serviceId: 'content-creation',
              label: 'محتوى ثنائي اللغة للمشاريع والمناقصات والقدرات',
            },
            {
              serviceId: 'website-development',
              label: 'مواقع شركات الإنشاء والتطوير',
            },
          ],
          relatedIndustryIds: ['real-estate', 'logistics-supply-chain'],
          industryAnchors: [
            {
              industryId: 'real-estate',
              label: 'استكشفوا أنظمة العقارات والتطوير',
            },
            {
              industryId: 'logistics-supply-chain',
              label: 'استكشفوا أنظمة التوريد والتسليم',
            },
          ],
        },
        {
          id: 'construction-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'الأدلة والمسؤوليات',
          title: 'يُبقي التصميم السلطة الهندسية والتعاقدية في موضعها.',
          intro:
            'تصف الصفحة نموذج هندسة مقترحاً، لا خدمة هندسية أو اعتماداً أو خدمة تعاقدية. يبقى اعتماد التصميم وموافقة السلامة والقرارات التعاقدية لدى المهنيين المرخصين وأصحاب المشروع.',
          items: [
            {
              id: 'authority-boundary',
              label: 'النظام يسجّل ولا يعتمد',
              responsibility:
                'يلتقط النظام القرارات والأدلة والحالة؛ ويبقى الاعتماد الهندسي والشهادات والسلطة التعاقدية لدى المهنيين المسؤولين.',
              dependency: 'معتمِدون محددون ومصفوفة اعتماد يملكها المشروع.',
              recovery: 'توجيه الحالات غير الواضحة إلى المهندس أو المالك المسؤول بدلاً من الإيحاء باعتماد آلي.',
            },
            {
              id: 'source-data',
              label: 'بيانات مشروع مصرّح بها',
              responsibility:
                'يجب أن تأتي حالة المشروع وبيانات السلامة والشهادات والعقود من أنظمة مصدر مصرح بها بملكية واحتفاظ محددين.',
              dependency: 'خريطة معتمدة لملكية البيانات والاحتفاظ والوصول.',
              recovery: 'إبقاء وصول السجل المتأثر مقيداً حتى تتأكد مصادره وقواعده.',
            },
            {
              id: 'handoff-ownership',
              label: 'كل تسليم يحتاج مالكاً',
              responsibility:
                'يحتاج كل طلب معلومات وتقديم واعتماد وتسليم للمورد إلى مالك محدد وحالة مؤرخة قبل دخوله مسار عمل حيّ.',
              dependency: 'نموذج أدوار محدد وملكية لكل عملية.',
              recovery: 'إبقاء الخطوة في حالة مسودة حتى يُسنَد مالك وسياق موعد.',
            },
            {
              id: 'integration-dependency',
              label: 'اعتماديات تخطيط الموارد والمزودين',
              responsibility:
                'تعتمد تكاملات تخطيط الموارد والمحاسبة والجدولة ونمذجة معلومات البناء على واجهات موثوقة وبيانات اعتماد وحدود بيانات متفق عليها.',
              dependency: 'توثيق واجهات مؤكد ووصول من مالك كل نظام.',
              recovery: 'إبقاء التكامل خلف مسار يدوي أو تجريبي حتى يتأكد الوصول.',
            },
          ],
        },
        {
          id: 'construction-regional-delivery',
          type: 'regional-fit',
          variant: 'market-path',
          answers: ['regional-delivery'],
          eyebrow: 'مصمم لمواقع ثنائية اللغة',
          title: 'العربية والإنجليزية لغتا موقع، وليستا خطوة ترجمة أخيرة.',
          intro:
            'تُصاغ نصوص الموقع وحالات الاعتماد وعناوين المستندات ورسائل الفريق لكل لغة، مع بقاء بنية مشروع واحدة قابلة للمطابقة ثابتة بين الموقع والمكتب.',
          items: [
            {
              id: 'bilingual-field',
              label: 'لغة موقع طبيعية',
              description:
                'تُقرأ طلبات المعلومات وقوائم الفحص والاعتمادات بالطريقة التي يعمل بها العمال والمهندسون فعلاً في كل لغة، لا كترجمة لاحقة.',
            },
            {
              id: 'localized-documents',
              label: 'مستندات وسجلات موطّنة',
              description:
                'تبقى العناوين والنسخ والتقارير دقيقة ومقروءة في السياقين العربي والإنجليزي تحت مالك مستندات محدد.',
            },
            {
              id: 'market-dependencies',
              label: 'اعتماديات حسب السوق',
              description:
                'تُراجَع المعايير والتصاريح وأنظمة تخطيط الموارد وشبكات الموردين لكل سوق قبل تثبيت النطاق.',
            },
          ],
        },
        {
          id: 'construction-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'أسئلة القرار',
          title: 'ما الذي تحتاج فرق الإنشاء إلى حسمه أولاً؟',
          intro:
            'النطاق الأول المفيد هو عملية مكتملة قابلة للمطابقة — من المناقصة إلى الاعتماد، أو من الاعتماد إلى المرحلة — مع تحديد أصحاب المستندات والقرار والموقع.',
          items: [
            {
              id: 'existing-tools',
              question: 'هل يمكن ربط ذلك بأنظمة تخطيط الموارد أو المحاسبة أو الجدولة الحالية؟',
              answer:
                'يُصمَّم حول الواجهات التي يؤكدها أصحاب الأنظمة لديكم. نرسم البيانات المطلوبة والنظام المسؤول ومصدر المطابقة والمسار اليدوي أو التجريبي البديل قبل الالتزام بتكامل مباشر مع تخطيط الموارد أو المحاسبة أو أداة البرنامج.',
            },
            {
              id: 'decision-latency',
              question: 'كيف يظهر زمن انتظار القرار؟',
              answer:
                'تعرض كل حالة انتظار مالكها والأدلة التي تحتاجها وسياق موعدها والعمل اللاحق الذي لا يمكنه التقدم — فلا يبقى طلب معلومات أو اعتماد دون رؤية في صندوق بريد.',
            },
            {
              id: 'roles',
              question: 'هل يمكن فصل واجهات المورد والعميل؟',
              answer:
                'نعم. تعرض الواجهات حسب الدور فقط الحزم والمستندات والاعتمادات والمراحل المسموح لكل طرف برؤيتها، ليعمل العملاء والاستشاريون والمقاولون الفرعيون وفرق الموقع كلٌّ في مساره الصحيح.',
            },
            {
              id: 'authority',
              question: 'هل يعتمد النظام العمل أو يصدر له شهادة؟',
              answer:
                'لا. يسجّل النظام القرارات والأدلة والحالة. يبقى الاعتماد الهندسي وشهادات السلامة والسلطة التعاقدية لدى المهنيين المرخصين وأصحاب المشروع؛ ويجعل البناء تلك القرارات صريحة ومملوكة وقابلة للتتبع.',
            },
            {
              id: 'document-control',
              question: 'كيف يبقى التحكم في المستندات موثوقاً؟',
              answer:
                'تُدار المخططات والنماذج والمستندات بالنسخ والإلغاء وفق معيار للتسمية والنسخ، ثم تُوزَّع بالقاعدة، ليرجع الموقع والمكتب والعميل دائماً إلى مصدر حالي واحد.',
            },
            {
              id: 'starting-point',
              question: 'من أين يبدأ فريق الإنشاء؟',
              answer:
                'ابدؤوا بعملية واحدة ذات قيمة عالية، وحددوا كل تسليم ومستند ومالك تمر بها، ثم ارسموا أصغر نطاق نظام قابل للمطابقة يدعمها من طرف إلى طرف قبل التوسع عبر المشروع.',
            },
          ],
        },
        {
          id: 'construction-consultation',
          type: 'closing-cta',
          variant: 'split-close',
          answers: ['decision-close'],
          eyebrow: 'اختاروا العملية الأولى',
          title: 'اجعلوا عملية واحدة قابلة للمطابقة نقطة البداية.',
          intro:
            'أحضروا عملية مشروع واحدة، والفرق والموردين الذين يملكونها، والأنظمة التي تمر بها، وسنحوّل هذا السياق إلى موجز نظام إنشاء محدد النطاق قابل للبناء.',
          decisionCopy:
            'ابدؤوا بعملية مكتملة واحدة قابلة للمطابقة، لا بقائمة خصائص منفصلة.',
          primary: {
            label: 'لنرسم سير عمل مشاريع الإنشاء لديكم',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: 'استكشفوا مسارات أنظمة الإنشاء',
            serviceId: 'business-systems-development',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
