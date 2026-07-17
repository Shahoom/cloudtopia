import type { IndustryPageDefinition } from '@/lib/industries/types'

/**
 * Hand-authored Professional-Services "Industry World".
 *
 * The visible page (components/industry/professional-services/
 * ProfessionalServicesIndustryPage.tsx) ports the "Showbiz" corporate
 * multipurpose template look while presenting CloudTopia's expertise BUILDING
 * professional-services systems: client & engagement portals, project/resource
 * management, time & billing, proposal/CRM pipelines, and knowledge bases.
 * This definition drives the hero, the service-bridge link cards, the FAQ, and
 * the JSON-LD / markdown / SEO surfaces. Every other ported visual section
 * pulls its microcopy from professional-services-content.ts.
 *
 * Framing rule: CloudTopia ENGINEERS the systems professional firms run on —
 * it is NOT a professional-services firm. Expertise, outcome, and ROI wording
 * describes the software approach, never fabricated client results.
 */
export const professionalServicesDefinition = {
  slug: 'professional-services',
  contentVersion: 'professional-services-showbiz-published-1',
  publicationStatus: 'published',
  updatedAt: '2026-07-17',
  world: {
    id: 'expertise-architecture',
    theme: {
      // Derived from the Showbiz palette: warm bronze/tan accent (#d29052) on a
      // near-white, cream-tinted surface set. Tan is used for fills, rules, and
      // highlights only; body text stays near-black for AA. accentInk is dark
      // because white on tan fails contrast.
      canvas: '#F7F4EC',
      surface: '#FFFFFF',
      elevatedSurface: '#F1E9DD',
      ink: '#241C10',
      mutedInk: '#57503F',
      accent: '#D29052',
      accentInk: '#2A1B08',
      signal: '#8A6A3E',
      line: '#C9BCA6',
      focus: '#8A5A22',
      displayTreatment: 'editorial',
      radiusMode: 'square',
      motifDensity: 'quiet',
      sceneTreatment: 'pulse-corridor',
    },
    heroScene: 'expertise-architecture',
    heroTreatment: 'editorial-pass',
    signatureComposition: {
      id: 'expertise-model',
      name: {
        en: 'The expertise model',
        ar: 'نموذج الخبرة',
      },
      sectionIds: [
        'professional-services-expertise-lanes',
        'professional-services-engagement-journey',
        'professional-services-platform-system',
      ],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'expertise-architecture' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/professional-services/en.jpg',
      width: 1200,
      height: 630,
    },
    {
      kind: 'og-image',
      locale: 'ar',
      publicPath: '/og/industries/professional-services/ar.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'Professional-Services Systems — Client Portals, Projects & Billing',
        description:
          'CloudTopia engineers bilingual professional-services systems: client and engagement portals, project and resource management, time and billing, proposal and CRM pipelines, and knowledge bases — from first enquiry through delivery and reporting.',
      },
      breadcrumbLabel: 'Professional Services',
      hero: {
        worldLabel: 'Expertise Architecture',
        eyebrow: 'Expert-led service systems',
        h1: 'We build the systems professional firms run on.',
        intro:
          'CloudTopia designs and engineers bilingual professional-services platforms—client and engagement portals, project and resource management, time and billing, proposal and CRM pipelines, and knowledge bases—so a firm’s expertise turns into a clear, trackable client journey from first enquiry to final report.',
        primaryCta: {
          label: 'Structure your client engagement journey',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore expertise system paths',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'Enquiry, scoping, proposal, engagement, delivery, and reporting stay visible on one owned engagement rail.',
        sceneStages: [
          { id: 'enquiry', label: 'Enquiry and intake', state: 'Captured' },
          { id: 'scope', label: 'Scope and proposal', state: 'Agreed' },
          { id: 'engage', label: 'Engagement setup', state: 'Owned' },
          { id: 'deliver', label: 'Delivery and time', state: 'Tracked' },
          { id: 'report', label: 'Reporting and renewal', state: 'Visible' },
        ],
      },
      sections: [
        {
          id: 'professional-services-operating-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'Where the engagement leaks',
          title: 'Expertise is hard to buy when the system is stitched together.',
          intro:
            'Clients judge a firm on how clearly it scopes, delivers, and reports—yet enquiries, proposals, project time, and billing usually live in disconnected tools, so ownership and status disappear between people.',
          signals: [
            {
              id: 'intake-friction',
              label: 'Enquiries stall before they become engagements',
              description:
                'When intake, qualification, and proposals are spread across inboxes and documents, prospects wait, context is lost, and the firm cannot see what is actually in the pipeline.',
            },
            {
              id: 'delivery-visibility',
              label: 'Delivery has no shared, owned status',
              description:
                'Project tasks, resourcing, and client materials scatter across drives and chats, so no one view shows who owns what, what is due, and what the client can see.',
            },
            {
              id: 'time-billing-leak',
              label: 'Time and billing leak between delivery and invoice',
              description:
                'Unrecorded hours, manual timesheets, and disconnected invoicing mean revenue is lost and clients receive bills they cannot reconcile against the work delivered.',
            },
          ],
        },
        {
          id: 'professional-services-engagement-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'From enquiry to renewal',
          title: 'One owned path from first enquiry to the final report.',
          intro:
            'The system carries a client through an understandable engagement while keeping scope, ownership, time, and client materials inside owned, traceable states.',
          stages: [
            {
              id: 'enquiry',
              label: 'Capture the enquiry',
              description:
                'New enquiries arrive through one intake with the context, source, and qualification the next step depends on, instead of scattering across inboxes.',
              actor: 'Prospect and intake owner',
            },
            {
              id: 'scope',
              label: 'Scope and propose',
              description:
                'The problem, approach, deliverables, and boundaries are shaped into an approved proposal the client can read and accept before work begins.',
              actor: 'Engagement lead and client',
            },
            {
              id: 'engage',
              label: 'Set up the engagement',
              description:
                'An accepted proposal becomes a structured engagement with a workspace, roles, resourcing, and a client portal scoped to what each side may see.',
              actor: 'Delivery team',
            },
            {
              id: 'deliver',
              label: 'Deliver and record time',
              description:
                'Tasks, milestones, and hours are tracked against the engagement, so delivery progress and billable time stay reconciled to one record.',
              actor: 'Delivery team and client',
            },
            {
              id: 'bill',
              label: 'Bill and reconcile',
              description:
                'Recorded time and agreed fees produce invoices a client can reconcile against the work, with approvals and exceptions kept traceable.',
              actor: 'Finance and engagement lead',
            },
            {
              id: 'report',
              label: 'Report and renew',
              description:
                'Approved milestones, outcomes, and feedback surface in client-ready reports and feed account planning and renewal without exposing restricted material.',
              actor: 'Account owner and client',
            },
          ],
        },
        {
          id: 'professional-services-expertise-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'Signature composition',
          title: 'Trust appears where the client lane meets the firm lane.',
          intro:
            'The experience is designed as two coordinated lanes: what the client sees and approves, and the ownership, records, and permissions the firm must hold behind each visible step.',
          stages: [
            {
              id: 'enquiry',
              label: 'Enquiry capture',
              description: 'The client makes one clear request while the firm records source, context, and owner.',
              actor: 'Prospect and intake owner',
            },
            {
              id: 'scope',
              label: 'Scope and proposal',
              description: 'Both lanes share one approved scope with deliverables and boundaries the client can read.',
              actor: 'Engagement lead and client',
            },
            {
              id: 'engage',
              label: 'Engagement workspace',
              description: 'A client portal exposes only what is shared; the firm keeps its knowledge and working files separate.',
              actor: 'Delivery team',
            },
            {
              id: 'deliver',
              label: 'Delivery and time',
              description: 'The client sees progress; the firm keeps tasks, resourcing, and billable time reconciled.',
              actor: 'Delivery team and client',
            },
            {
              id: 'bill',
              label: 'Billing record',
              description: 'A single reconciled record keeps the client invoice and the firm ledger aligned.',
              actor: 'Finance and engagement lead',
            },
            {
              id: 'report',
              label: 'Reporting and renewal',
              description: 'The client receives a clear report; the firm keeps the traceable account history.',
              actor: 'Account owner and client',
            },
          ],
          lanes: [
            {
              id: 'client-lane',
              label: 'Client lane',
              stageIds: ['enquiry', 'scope', 'engage', 'deliver', 'report'],
            },
            {
              id: 'firm-lane',
              label: 'Firm and operations lane',
              stageIds: ['scope', 'engage', 'deliver', 'bill', 'report'],
            },
          ],
        },
        {
          id: 'professional-services-platform-system',
          type: 'system-blueprint',
          variant: 'service-line',
          answers: ['buildable-system'],
          eyebrow: 'A buildable boundary',
          title: 'A professional-services platform is a connected set of owned layers.',
          intro:
            'Scope can start with one flow—intake, delivery, or billing—but every layer needs approved inputs, a named handoff, and an outcome the firm can reconcile and report on.',
          layers: [
            {
              id: 'client-experience',
              label: 'Client and engagement portal layer',
              description:
                'Bilingual portals give each client a scoped view of their engagement—status, shared documents, approvals, and requests—separate from the firm’s internal workspace.',
              inputs: ['Approved sharing rules', 'Client roles and permissions', 'Engagement content'],
              handoff: 'A scoped, permissioned client view',
              outcome: 'Clients who can see status and approve without back-and-forth',
            },
            {
              id: 'delivery-core',
              label: 'Project and resource management layer',
              description:
                'Engagements, tasks, milestones, and resourcing are tracked in one workspace so delivery progress and ownership stay visible across the team.',
              inputs: ['Engagement structure', 'Roles and capacity', 'Milestone plan'],
              handoff: 'A tracked engagement with owned tasks',
              outcome: 'One view of who owns what, and what is due',
            },
            {
              id: 'time-billing',
              label: 'Time, billing, and CRM layer',
              description:
                'Time tracking, fee models, invoicing, and a proposal/CRM pipeline connect delivery to revenue so nothing between work and invoice is lost.',
              inputs: ['Fee and rate model', 'Recorded time', 'Approved proposals'],
              handoff: 'A reconciled invoice and pipeline record',
              outcome: 'Billing a client can reconcile against the work',
            },
            {
              id: 'knowledge-integration',
              label: 'Knowledge base, security, and integration layer',
              description:
                'A structured knowledge base, role-based access, and integrations to accounting, e-signature, and identity keep the platform connected within agreed limits.',
              inputs: ['Approved provider interfaces', 'Access and retention policy', 'Knowledge taxonomy'],
              handoff: 'A bounded, permissioned data exchange',
              outcome: 'A connected platform that stays inside its controls',
            },
          ],
        },
        {
          id: 'professional-services-service-paths',
          type: 'service-bridge',
          variant: 'route-links',
          answers: [],
          eyebrow: 'Paths to implementation',
          title: 'Choose the build paths that assemble the platform.',
          intro:
            'The final combination depends on the flow you prioritize, the tools your firm already uses, and the smallest complete, reconcilable handoff worth building first.',
          serviceIds: [
            'web-applications',
            'business-systems-development',
            'website-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'web-applications',
              label: 'Client portals and engagement web applications',
            },
            {
              serviceId: 'business-systems-development',
              label: 'Project, resource, time, and billing systems',
            },
            {
              serviceId: 'website-development',
              label: 'Firm websites and lead-intake pages',
            },
            {
              serviceId: 'content-creation',
              label: 'Bilingual knowledge bases and proposal content',
            },
          ],
          relatedIndustryIds: ['legal-firms', 'construction'],
          industryAnchors: [
            {
              industryId: 'legal-firms',
              label: 'Explore legal practice systems',
            },
            {
              industryId: 'construction',
              label: 'Explore project and contract delivery systems',
            },
          ],
        },
        {
          id: 'professional-services-boundaries',
          type: 'constraints',
          variant: 'owner-register',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Evidence and responsibility',
          title: 'The design keeps ownership and client material explicit.',
          intro:
            'This page describes a proposed engineering model, not professional advice, an outcome guarantee, or a claim of past client work. Expertise, credentials, and results wording stays with the firm and its approved, project-specific evidence.',
          items: [
            {
              id: 'expertise-claims',
              label: 'Expertise and outcome wording is owned by the firm',
              responsibility:
                'Credentials, outcomes, and ROI statements need approved, project-specific evidence from the firm; the platform presents them, it does not invent them.',
              dependency: 'Firm-approved claims, credentials, and evidence.',
              recovery: 'Hold unverified claims out of the live experience until the firm confirms them.',
            },
            {
              id: 'client-separation',
              label: 'Client material stays separated and permissioned',
              responsibility:
                'Client portals must separate firm knowledge, client material, permissions, and retention rules so no client sees another’s data or the firm’s internal working files.',
              dependency: 'An approved data-ownership, permission, and retention map.',
              recovery: 'Keep new material access-restricted until its sharing rules are confirmed.',
            },
            {
              id: 'engagement-ownership',
              label: 'Each engagement stage needs a named owner',
              responsibility:
                'Intake, proposal, approval, delivery, billing, and reporting each require explicit client and team ownership before the flow goes live.',
              dependency: 'A named owner and next action for every stage.',
              recovery: 'Route unowned or unclear stages to human review with a visible status.',
            },
            {
              id: 'finance-dependencies',
              label: 'Billing and integration dependencies',
              responsibility:
                'Invoicing, accounting, e-signature, and identity integrations depend on validated provider access, contracts, and the firm’s finance rules.',
              dependency: 'Confirmed provider access and approved finance rules.',
              recovery: 'Hold the step behind a manual or sandboxed path until access is validated.',
            },
          ],
        },
        {
          id: 'professional-services-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'Built for bilingual firms',
          title: 'Arabic and English are operating languages, not a final translation step.',
          intro:
            'Proposals, portal wording, client reports, and knowledge content are authored for each language while one shared, reconcilable engagement structure stays constant.',
          items: [
            {
              id: 'bilingual-content',
              label: 'Native professional language',
              description:
                'Proposals, engagement wording, and client reports are written for how clients read and decide in each language, with direction-aware, right-to-left interfaces.',
            },
            {
              id: 'client-reporting',
              label: 'Localized reporting and approvals',
              description:
                'Status, deliverables, and approvals stay accurate and readable in Arabic and English, under a named review owner.',
            },
            {
              id: 'market-dependencies',
              label: 'Market-by-market dependencies',
              description:
                'Invoicing, tax, e-signature, and data-residency requirements are checked per market before scope is fixed.',
            },
          ],
        },
        {
          id: 'professional-services-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'Decision questions',
          title: 'What professional firms usually need to decide first.',
          intro:
            'A useful first scope is one complete, reconcilable flow—enquiry to proposal, or delivery to invoice—with named data, delivery, and finance owners.',
          items: [
            {
              id: 'does-it-replace-tools',
              question: 'Does this replace all our current tools at once?',
              answer:
                'No. We start with one high-value flow—usually intake and proposals, or delivery and time—and connect to the tools you keep. The platform grows by adding reconcilable modules, not by a risky big-bang cutover.',
            },
            {
              id: 'expertise-easier-to-buy',
              question: 'How does our expertise become easier to buy?',
              answer:
                'The system makes the problem, your diagnostic approach, deliverables, decisions, boundaries, and next step visible before a proposal, so a prospect understands the engagement and can approve it with less friction.',
            },
            {
              id: 'client-portal-separation',
              question: 'How do client portals keep each client’s data separate?',
              answer:
                'Portals are built around explicit roles, permissions, and retention rules. Firm knowledge, client material, and internal working files are separated, so each client sees only what has been shared with them.',
            },
            {
              id: 'time-billing-connect',
              question: 'Can time tracking connect to our billing and accounting?',
              answer:
                'Yes. Recorded time and agreed fee models produce invoices reconciled to the work, and we map the required data and fallback before committing to an accounting or e-signature integration.',
            },
            {
              id: 'reporting-to-sales',
              question: 'Can delivery reporting connect back to sales and renewal?',
              answer:
                'Approved milestones, feedback, and expansion signals can flow into account planning and renewal without exposing restricted client material, so delivery insight strengthens the next proposal.',
            },
            {
              id: 'where-to-start',
              question: 'Which client flow should a firm build first?',
              answer:
                'Begin with one high-value flow, identify every handoff, record, and owner it touches, then define the smallest reconcilable system boundary that supports it end to end before expanding.',
            },
          ],
        },
        {
          id: 'professional-services-consultation',
          type: 'closing-cta',
          variant: 'split-close',
          answers: ['decision-close'],
          eyebrow: 'Choose the first flow',
          title: 'Make one reconcilable engagement flow the starting point.',
          intro:
            'Bring one engagement flow, the people who own it, and the tools it touches. We will turn that context into a bounded, buildable professional-services system brief.',
          decisionCopy:
            'Start with one complete, reconcilable flow rather than a list of disconnected features.',
          primary: {
            label: 'Structure your client engagement journey',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore client portals and web applications',
            serviceId: 'web-applications',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'أنظمة الخدمات المهنية — بوابات العملاء والمشاريع والفوترة',
        description:
          'تهندس كلاود توبيا أنظمة خدمات مهنية ثنائية اللغة: بوابات عملاء وارتباطات، وإدارة مشاريع وموارد، وتتبع وقت وفوترة، ومسارات مقترحات وإدارة علاقات، وقواعد معرفة—من أول استفسار حتى التنفيذ والتقرير.',
      },
      breadcrumbLabel: 'الخدمات المهنية',
      hero: {
        worldLabel: 'هندسة الخبرة',
        eyebrow: 'أنظمة خدمات يقودها الخبراء',
        h1: 'نبني الأنظمة التي تعمل عليها الشركات المهنية.',
        intro:
          'تصمم كلاود توبيا وتهندس منصات خدمات مهنية ثنائية اللغة—بوابات عملاء وارتباطات، وإدارة مشاريع وموارد، وتتبع وقت وفوترة، ومسارات مقترحات وإدارة علاقات، وقواعد معرفة—لتتحول خبرة الشركة إلى رحلة عميل واضحة وقابلة للتتبع من أول استفسار حتى التقرير النهائي.',
        primaryCta: {
          label: 'نظّموا رحلة ارتباط عملائكم',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشفوا مسارات أنظمة الخبرة',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'يبقى الاستفسار والنطاق والمقترح والارتباط والتنفيذ والتقرير مرئية على مسار ارتباط واحد ذي ملكية واضحة.',
        sceneStages: [
          { id: 'enquiry', label: 'الاستفسار والاستقبال', state: 'ملتقط' },
          { id: 'scope', label: 'النطاق والمقترح', state: 'متفق' },
          { id: 'engage', label: 'إعداد الارتباط', state: 'بمالك واضح' },
          { id: 'deliver', label: 'التنفيذ والوقت', state: 'متتبَّع' },
          { id: 'report', label: 'التقرير والتجديد', state: 'مرئي' },
        ],
      },
      sections: [
        {
          id: 'professional-services-operating-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'أين يتسرب الارتباط',
          title: 'يصعب شراء الخبرة حين يكون النظام مجمَّعاً من أدوات متفرقة.',
          intro:
            'يحكم العملاء على الشركة بوضوح تحديدها للنطاق وتنفيذها وتقاريرها، لكن الاستفسارات والمقترحات ووقت المشاريع والفوترة تعيش عادةً في أدوات منفصلة، فتضيع الملكية والحالة بين الأشخاص.',
          signals: [
            {
              id: 'intake-friction',
              label: 'تتعثر الاستفسارات قبل أن تصبح ارتباطات',
              description:
                'حين تتوزع مراحل الاستقبال والتأهيل والمقترحات بين البريد والمستندات، ينتظر العملاء المحتملون، ويضيع السياق، ولا ترى الشركة ما هو فعلاً في مسار المبيعات.',
            },
            {
              id: 'delivery-visibility',
              label: 'لا حالة مشتركة ذات مالك للتنفيذ',
              description:
                'تتناثر مهام المشروع والموارد ومواد العميل عبر الأقراص والمحادثات، فلا توجد واجهة واحدة تُظهر من يملك ماذا، وما المستحق، وما يمكن للعميل رؤيته.',
            },
            {
              id: 'time-billing-leak',
              label: 'يتسرب الوقت والفوترة بين التنفيذ والفاتورة',
              description:
                'الساعات غير المسجلة والجداول اليدوية والفوترة المنفصلة تعني ضياع الإيراد ووصول فواتير لا يستطيع العميل مطابقتها مع العمل المنجز.',
            },
          ],
        },
        {
          id: 'professional-services-engagement-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'من الاستفسار إلى التجديد',
          title: 'مسار واحد ذو ملكية من أول استفسار إلى التقرير النهائي.',
          intro:
            'يحمل النظام العميل عبر ارتباط مفهوم، مع إبقاء النطاق والملكية والوقت ومواد العميل ضمن حالات مملوكة قابلة للتتبع.',
          stages: [
            {
              id: 'enquiry',
              label: 'التقاط الاستفسار',
              description:
                'تصل الاستفسارات الجديدة عبر استقبال واحد يحمل السياق والمصدر والتأهيل الذي تعتمد عليه الخطوة التالية، بدلاً من تشتتها في البريد.',
              actor: 'العميل المحتمل ومالك الاستقبال',
            },
            {
              id: 'scope',
              label: 'تحديد النطاق والعرض',
              description:
                'تُصاغ المشكلة والمنهج والمخرجات والحدود في مقترح معتمد يستطيع العميل قراءته وقبوله قبل بدء العمل.',
              actor: 'قائد الارتباط والعميل',
            },
            {
              id: 'engage',
              label: 'إعداد الارتباط',
              description:
                'يتحول المقترح المقبول إلى ارتباط منظم بمساحة عمل وأدوار وموارد وبوابة عميل محددة بما يحق لكل طرف رؤيته.',
              actor: 'فريق التنفيذ',
            },
            {
              id: 'deliver',
              label: 'التنفيذ وتسجيل الوقت',
              description:
                'تُتتبَّع المهام والمراحل والساعات مقابل الارتباط، ليبقى تقدم التنفيذ والوقت القابل للفوترة مطابقين لسجل واحد.',
              actor: 'فريق التنفيذ والعميل',
            },
            {
              id: 'bill',
              label: 'الفوترة والمطابقة',
              description:
                'ينتج الوقت المسجل والأتعاب المتفق عليها فواتير يستطيع العميل مطابقتها مع العمل، مع بقاء الاعتمادات والاستثناءات قابلة للتتبع.',
              actor: 'المالية وقائد الارتباط',
            },
            {
              id: 'report',
              label: 'التقرير والتجديد',
              description:
                'تظهر المراحل المعتمدة والنتائج والملاحظات في تقارير جاهزة للعميل وتغذّي تخطيط الحساب والتجديد دون كشف مواد مقيدة.',
              actor: 'مالك الحساب والعميل',
            },
          ],
        },
        {
          id: 'professional-services-expertise-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'التكوين المميز',
          title: 'تظهر الثقة عند التقاء مسار العميل بمسار الشركة.',
          intro:
            'تُصمم التجربة كمسارين متناسقين: ما يراه العميل ويعتمده، والملكية والسجلات والصلاحيات التي يجب أن تحتفظ بها الشركة خلف كل خطوة ظاهرة.',
          stages: [
            {
              id: 'enquiry',
              label: 'التقاط الاستفسار',
              description: 'يقدم العميل طلباً واضحاً واحداً بينما تسجل الشركة المصدر والسياق والمالك.',
              actor: 'العميل المحتمل ومالك الاستقبال',
            },
            {
              id: 'scope',
              label: 'النطاق والمقترح',
              description: 'يتشارك المساران نطاقاً معتمداً واحداً بمخرجات وحدود يستطيع العميل قراءتها.',
              actor: 'قائد الارتباط والعميل',
            },
            {
              id: 'engage',
              label: 'مساحة عمل الارتباط',
              description: 'تُظهر بوابة العميل ما جرت مشاركته فقط، وتُبقي الشركة معرفتها وملفات عملها منفصلة.',
              actor: 'فريق التنفيذ',
            },
            {
              id: 'deliver',
              label: 'التنفيذ والوقت',
              description: 'يرى العميل التقدم، وتُبقي الشركة المهام والموارد والوقت القابل للفوترة مطابقة.',
              actor: 'فريق التنفيذ والعميل',
            },
            {
              id: 'bill',
              label: 'سجل الفوترة',
              description: 'يحافظ سجل مطابَق واحد على مواءمة فاتورة العميل مع دفتر الشركة.',
              actor: 'المالية وقائد الارتباط',
            },
            {
              id: 'report',
              label: 'التقرير والتجديد',
              description: 'يتلقى العميل تقريراً واضحاً، وتحتفظ الشركة بتاريخ الحساب القابل للتتبع.',
              actor: 'مالك الحساب والعميل',
            },
          ],
          lanes: [
            {
              id: 'client-lane',
              label: 'مسار العميل',
              stageIds: ['enquiry', 'scope', 'engage', 'deliver', 'report'],
            },
            {
              id: 'firm-lane',
              label: 'مسار الشركة والتشغيل',
              stageIds: ['scope', 'engage', 'deliver', 'bill', 'report'],
            },
          ],
        },
        {
          id: 'professional-services-platform-system',
          type: 'system-blueprint',
          variant: 'service-line',
          answers: ['buildable-system'],
          eyebrow: 'نطاق قابل للبناء',
          title: 'منصة الخدمات المهنية مجموعة مترابطة من الطبقات ذات الملكية الواضحة.',
          intro:
            'يمكن أن يبدأ النطاق بمسار واحد—استقبال أو تنفيذ أو فوترة—لكن كل طبقة تحتاج إلى مدخلات معتمدة وتسليم محدد ونتيجة تستطيع الشركة مطابقتها وإعداد تقرير عنها.',
          layers: [
            {
              id: 'client-experience',
              label: 'طبقة بوابة العميل والارتباط',
              description:
                'تمنح البوابات ثنائية اللغة كل عميل رؤية محددة لارتباطه—الحالة والمستندات المشتركة والاعتمادات والطلبات—منفصلة عن مساحة عمل الشركة الداخلية.',
              inputs: ['قواعد مشاركة معتمدة', 'أدوار وصلاحيات العميل', 'محتوى الارتباط'],
              handoff: 'رؤية عميل محددة ومصرَّح بها',
              outcome: 'عملاء يرون الحالة ويعتمدون دون مراسلات متكررة',
            },
            {
              id: 'delivery-core',
              label: 'طبقة إدارة المشاريع والموارد',
              description:
                'تُتتبَّع الارتباطات والمهام والمراحل والموارد في مساحة عمل واحدة ليبقى تقدم التنفيذ والملكية مرئيين عبر الفريق.',
              inputs: ['بنية الارتباط', 'الأدوار والطاقة', 'خطة المراحل'],
              handoff: 'ارتباط متتبَّع بمهام مملوكة',
              outcome: 'رؤية واحدة لمن يملك ماذا وما المستحق',
            },
            {
              id: 'time-billing',
              label: 'طبقة الوقت والفوترة وإدارة العلاقات',
              description:
                'يربط تتبع الوقت ونماذج الأتعاب والفوترة ومسار المقترحات وإدارة العلاقات التنفيذَ بالإيراد كي لا يضيع شيء بين العمل والفاتورة.',
              inputs: ['نموذج الأتعاب والأسعار', 'الوقت المسجل', 'المقترحات المعتمدة'],
              handoff: 'فاتورة وسجل مسار مبيعات مطابَقان',
              outcome: 'فوترة يستطيع العميل مطابقتها مع العمل',
            },
            {
              id: 'knowledge-integration',
              label: 'طبقة قاعدة المعرفة والأمان والتكامل',
              description:
                'تُبقي قاعدة معرفة منظمة ووصول بحسب الأدوار وتكاملات مع المحاسبة والتوقيع الإلكتروني والهوية المنصةَ مترابطة ضمن الحدود المتفق عليها.',
              inputs: ['واجهات مزودين معتمدة', 'سياسة الوصول والاحتفاظ', 'تصنيف المعرفة'],
              handoff: 'تبادل بيانات محدود ومصرَّح به',
              outcome: 'منصة مترابطة تبقى ضمن ضوابطها',
            },
          ],
        },
        {
          id: 'professional-services-service-paths',
          type: 'service-bridge',
          variant: 'route-links',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'اختاروا مسارات البناء التي تجمع المنصة.',
          intro:
            'يتحدد المزيج النهائي بحسب المسار الذي تعطونه الأولوية، والأدوات التي تستخدمها شركتكم أصلاً، وأصغر تسليم متكامل قابل للمطابقة يستحق البناء أولاً.',
          serviceIds: [
            'web-applications',
            'business-systems-development',
            'website-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'web-applications',
              label: 'بوابات عملاء وتطبيقات ويب للارتباطات',
            },
            {
              serviceId: 'business-systems-development',
              label: 'أنظمة مشاريع وموارد ووقت وفوترة',
            },
            {
              serviceId: 'website-development',
              label: 'مواقع الشركات وصفحات استقبال العملاء',
            },
            {
              serviceId: 'content-creation',
              label: 'قواعد معرفة ومحتوى مقترحات ثنائية اللغة',
            },
          ],
          relatedIndustryIds: ['legal-firms', 'construction'],
          industryAnchors: [
            {
              industryId: 'legal-firms',
              label: 'استكشفوا أنظمة الممارسة القانونية',
            },
            {
              industryId: 'construction',
              label: 'استكشفوا أنظمة تنفيذ المشاريع والعقود',
            },
          ],
        },
        {
          id: 'professional-services-boundaries',
          type: 'constraints',
          variant: 'owner-register',
          answers: ['evidence-and-constraints'],
          eyebrow: 'الأدلة والمسؤوليات',
          title: 'يبقي التصميم الملكية ومواد العميل صريحة.',
          intro:
            'تصف الصفحة نموذج هندسة مقترحاً، لا نصيحة مهنية ولا ضمان نتيجة ولا ادعاءً بعمل عملاء سابق. تبقى صياغة الخبرة والمؤهلات والنتائج لدى الشركة وأدلتها المعتمدة الخاصة بالمشروع.',
          items: [
            {
              id: 'expertise-claims',
              label: 'صياغة الخبرة والنتائج تملكها الشركة',
              responsibility:
                'تحتاج المؤهلات والنتائج وصياغة العائد إلى أدلة معتمدة خاصة بالمشروع من الشركة؛ تعرضها المنصة ولا تبتكرها.',
              dependency: 'ادعاءات ومؤهلات وأدلة تعتمدها الشركة.',
              recovery: 'إبقاء الادعاءات غير الموثقة خارج التجربة الحية حتى تؤكدها الشركة.',
            },
            {
              id: 'client-separation',
              label: 'تبقى مواد العميل منفصلة ومصرَّحاً بها',
              responsibility:
                'يجب أن تفصل بوابات العملاء بين معرفة الشركة ومواد العميل والصلاحيات وقواعد الاحتفاظ، فلا يرى عميل بيانات آخر أو ملفات الشركة الداخلية.',
              dependency: 'خريطة معتمدة لملكية البيانات والصلاحيات والاحتفاظ.',
              recovery: 'إبقاء المواد الجديدة مقيدة الوصول حتى تتأكد قواعد مشاركتها.',
            },
            {
              id: 'engagement-ownership',
              label: 'كل مرحلة ارتباط تحتاج إلى مالك محدد',
              responsibility:
                'تتطلب مراحل الاستقبال والمقترح والاعتماد والتنفيذ والفوترة والتقرير ملكية صريحة للعميل والفريق قبل تشغيل المسار.',
              dependency: 'مالك محدد وخطوة تالية لكل مرحلة.',
              recovery: 'توجيه المراحل بلا مالك أو غير الواضحة إلى مراجعة بشرية بحالة مرئية.',
            },
            {
              id: 'finance-dependencies',
              label: 'اعتماديات الفوترة والتكامل',
              responsibility:
                'تعتمد تكاملات الفوترة والمحاسبة والتوقيع الإلكتروني والهوية على وصول موثوق للمزود وعقود وقواعد مالية للشركة.',
              dependency: 'وصول مزود مؤكد وقواعد مالية معتمدة.',
              recovery: 'إبقاء الخطوة خلف مسار يدوي أو تجريبي حتى يتأكد الوصول.',
            },
          ],
        },
        {
          id: 'professional-services-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'مصمم للشركات ثنائية اللغة',
          title: 'العربية والإنجليزية لغتا تشغيل، وليستا خطوة ترجمة أخيرة.',
          intro:
            'تُصاغ المقترحات ونصوص البوابة وتقارير العملاء ومحتوى المعرفة لكل لغة، مع بقاء بنية ارتباط واحدة قابلة للمطابقة ثابتة.',
          items: [
            {
              id: 'bilingual-content',
              label: 'لغة مهنية طبيعية',
              description:
                'تُكتب المقترحات وصياغة الارتباط وتقارير العملاء وفق طريقة قراءة العملاء وقرارهم في كل لغة، بواجهات تراعي اتجاه القراءة من اليمين إلى اليسار.',
            },
            {
              id: 'client-reporting',
              label: 'تقارير واعتمادات موطنة',
              description:
                'تبقى الحالة والمخرجات والاعتمادات دقيقة ومقروءة بالعربية والإنجليزية، تحت مالك مراجعة محدد.',
            },
            {
              id: 'market-dependencies',
              label: 'اعتماديات حسب السوق',
              description:
                'تُراجَع متطلبات الفوترة والضريبة والتوقيع الإلكتروني وإقامة البيانات لكل سوق قبل تثبيت النطاق.',
            },
          ],
        },
        {
          id: 'professional-services-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'أسئلة القرار',
          title: 'ما الذي تحتاج الشركات المهنية إلى حسمه أولاً؟',
          intro:
            'النطاق الأول المفيد هو مسار مكتمل قابل للمطابقة—من الاستفسار إلى المقترح، أو من التنفيذ إلى الفاتورة—مع تحديد أصحاب البيانات والتنفيذ والمالية.',
          items: [
            {
              id: 'does-it-replace-tools',
              question: 'هل يستبدل ذلك كل أدواتنا الحالية دفعة واحدة؟',
              answer:
                'لا. نبدأ بمسار واحد ذي قيمة عالية—عادةً الاستقبال والمقترحات، أو التنفيذ والوقت—ونربطه بالأدوات التي تحتفظون بها. تنمو المنصة بإضافة وحدات قابلة للمطابقة، لا بتحول شامل محفوف بالمخاطر.',
            },
            {
              id: 'expertise-easier-to-buy',
              question: 'كيف تصبح خبرتنا أسهل في الشراء؟',
              answer:
                'يوضح النظام المشكلة ومنهج التشخيص والمخرجات والقرارات والحدود والخطوة التالية قبل تقديم المقترح، فيفهم العميل المحتمل الارتباط ويعتمده باحتكاك أقل.',
            },
            {
              id: 'client-portal-separation',
              question: 'كيف تُبقي بوابات العملاء بيانات كل عميل منفصلة؟',
              answer:
                'تُبنى البوابات حول أدوار وصلاحيات وقواعد احتفاظ صريحة. تُفصل معرفة الشركة ومواد العميل والملفات الداخلية، فلا يرى كل عميل إلا ما جرت مشاركته معه.',
            },
            {
              id: 'time-billing-connect',
              question: 'هل يمكن ربط تتبع الوقت بالفوترة والمحاسبة؟',
              answer:
                'نعم. ينتج الوقت المسجل ونماذج الأتعاب المتفق عليها فواتير مطابَقة للعمل، ونرسم البيانات المطلوبة والمسار البديل قبل الالتزام بتكامل محاسبة أو توقيع إلكتروني.',
            },
            {
              id: 'reporting-to-sales',
              question: 'هل يمكن ربط تقارير التنفيذ بالمبيعات والتجديد؟',
              answer:
                'يمكن للمراحل المعتمدة والملاحظات وإشارات التوسع أن تنتقل إلى تخطيط الحساب والتجديد دون كشف مواد العميل المقيدة، فتقوّي رؤية التنفيذ المقترح التالي.',
            },
            {
              id: 'where-to-start',
              question: 'أي مسار من مسارات العملاء تبنيه الشركة أولاً؟',
              answer:
                'ابدؤوا بمسار واحد ذي قيمة عالية، وحددوا كل تسليم وسجل ومالك يمر به، ثم ارسموا أصغر نطاق نظام قابل للمطابقة يدعمه من طرف إلى طرف قبل التوسع.',
            },
          ],
        },
        {
          id: 'professional-services-consultation',
          type: 'closing-cta',
          variant: 'split-close',
          answers: ['decision-close'],
          eyebrow: 'اختاروا المسار الأول',
          title: 'اجعلوا مسار ارتباط واحداً قابلاً للمطابقة نقطة البداية.',
          intro:
            'أحضروا مسار ارتباط واحداً، والأشخاص الذين يملكونه، والأدوات التي يمر بها، وسنحوّل هذا السياق إلى موجز نظام خدمات مهنية محدد النطاق قابل للبناء.',
          decisionCopy:
            'ابدؤوا بمسار مكتمل واحد قابل للمطابقة، لا بقائمة خصائص منفصلة.',
          primary: {
            label: 'نظّموا رحلة ارتباط عملائكم',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: 'استكشفوا بوابات العملاء وتطبيقات الويب',
            serviceId: 'web-applications',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
