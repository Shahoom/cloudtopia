import type { IndustryPageDefinition } from '@/lib/industries/types'

/**
 * Hand-authored Government & Public-Sector "Industry World".
 *
 * The visible page (components/industry/government-public-sector/
 * GovernmentPublicSectorIndustryPage.tsx) ports the Whitehall (City Government)
 * template look and animations while presenting CloudTopia's expertise BUILDING
 * government systems: citizen-service portals, e-gov & permit/licensing, case
 * management, secure identity, and accessibility-first compliance. This
 * definition drives the hero, the service-bridge link cards, the FAQ, and the
 * JSON-LD / markdown / SEO surfaces. Every other ported visual section pulls its
 * microcopy from government-public-sector-content.ts.
 *
 * Framing rule: CloudTopia ENGINEERS public-service systems — it is NOT a
 * government body. Policy, eligibility, identity, data residency, procurement,
 * and service decisions remain owned by the responsible authority. The design
 * must never imply a government mandate, client, clearance, or guaranteed
 * compliance. Accessibility is paramount (WCAG 2.1 AA and above).
 *
 * The Whitehall template ships only gray dimension placeholders (no usable
 * photos), so the page is intentionally photo-free; og-images are a TODO for the
 * imagery pass.
 */
export const governmentPublicSectorDefinition = {
  slug: 'government-public-sector',
  contentVersion: 'government-whitehall-published-1',
  publicationStatus: 'published',
  updatedAt: '2026-07-17',
  world: {
    id: 'public-service-standard',
    theme: {
      // Derived from the Whitehall palette: brand red accent (#e41e2f) on a
      // navy-ink (#252638) and light-gray surface system. mutedInk is darkened
      // from the template's #696b7e to clear WCAG AA on white.
      canvas: '#F5F5F6',
      surface: '#FFFFFF',
      elevatedSurface: '#F8F8FA',
      ink: '#252638',
      mutedInk: '#565869',
      accent: '#E41E2F',
      accentInk: '#FFFFFF',
      signal: '#252638',
      line: '#E4E4E9',
      focus: '#E41E2F',
      displayTreatment: 'technical',
      radiusMode: 'soft',
      motifDensity: 'medium',
      sceneTreatment: 'service-pass',
    },
    heroScene: 'public-service-standard',
    heroTreatment: 'corridor-split',
    signatureComposition: {
      id: 'service-standard',
      name: {
        en: 'The service standard',
        ar: 'معيار الخدمة',
      },
      sectionIds: [
        'gov-service-journey',
        'gov-platform-system',
        'gov-boundaries',
      ],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'public-service-standard' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/government-public-sector/en.jpg',
      width: 1200,
      height: 630,
    },
    {
      kind: 'og-image',
      locale: 'ar',
      publicPath: '/og/industries/government-public-sector/ar.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'Government & Public-Sector Engineering — Citizen Portals & E-Gov',
        description:
          'CloudTopia engineers bilingual, accessibility-first government systems: citizen-service portals, e-gov and permit/licensing, case management, secure identity, and the security and compliance layers around them.',
      },
      breadcrumbLabel: 'Government & Public Sector',
      hero: {
        worldLabel: 'Public Service Standard',
        eyebrow: 'Public service systems',
        h1: 'We engineer the systems that make public services work.',
        intro:
          'CloudTopia designs and builds bilingual, accessibility-first public-service systems—citizen-service portals, e-gov and permit/licensing, case management, and secure identity—from eligibility through application, case ownership, and a recorded decision.',
        primaryCta: {
          label: 'Review a public service journey',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore public-service system paths',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'Eligibility, application, documents, case ownership, assistance, and completion stay visible on one calm, accessible civic pathway.',
        sceneStages: [
          { id: 'eligibility', label: 'Find service and eligibility', state: 'Clear' },
          { id: 'apply', label: 'Apply and submit documents', state: 'Received' },
          { id: 'route', label: 'Route to a case owner', state: 'Owned' },
          { id: 'track', label: 'Track and request assistance', state: 'Visible' },
          { id: 'complete', label: 'Decision and completion', state: 'Recorded' },
        ],
      },
      sections: [
        {
          id: 'gov-operating-pressure',
          type: 'pressure-field',
          variant: 'constraints-first',
          answers: ['operating-pressure'],
          eyebrow: 'Where public trust is won or lost',
          title: 'A public service is judged by whether people can finish it.',
          intro:
            'Residents decide whether a service is usable in the first few screens, while the teams behind the counter need every request to arrive with the eligibility, documents, and ownership the next decision depends on.',
          signals: [
            {
              id: 'accessibility-gap',
              label: 'Accessibility is a duty, not a feature',
              description:
                'A public service has to work for everyone—assistive technology, keyboard, low bandwidth, and both reading directions—or it excludes the people who need it most.',
            },
            {
              id: 'fragmented-journeys',
              label: 'Journeys break across disconnected systems',
              description:
                'Eligibility, forms, documents, and payment are often stitched across separate tools, so residents stall and staff lose the thread of who applied for what.',
            },
            {
              id: 'ownership-visibility',
              label: 'Cases need a named owner and a visible status',
              description:
                'Applications, exceptions, and appeals need a clear owner, evidence, and a status the resident can see—not a silent queue with no way back.',
            },
          ],
        },
        {
          id: 'gov-service-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'From eligibility to a recorded decision',
          title: 'One accessible path from finding a service to completing it.',
          intro:
            'The system guides a resident through an understandable civic sequence while keeping identity, records, and service decisions inside owned, traceable, auditable states.',
          stages: [
            {
              id: 'eligibility',
              label: 'Find the service and check eligibility',
              description:
                'The resident finds the right service in plain, bilingual language and sees whether they are eligible before starting.',
              actor: 'Resident',
            },
            {
              id: 'apply',
              label: 'Apply and submit documents',
              description:
                'An accessible apply-once form collects details and documents, with validation and assisted-service paths for people who need help.',
              actor: 'Resident and assisted-service staff',
            },
            {
              id: 'route',
              label: 'Route to a case owner',
              description:
                'The application is routed to a named owner with the evidence and rules the decision depends on, inside the authority’s controls.',
              actor: 'Case owners',
            },
            {
              id: 'track',
              label: 'Track status and request assistance',
              description:
                'The resident can see where the request is, what is needed next, and how to get help—without calling to ask.',
              actor: 'Resident and service team',
            },
            {
              id: 'decision',
              label: 'Reach and record a decision',
              description:
                'Approve, request-more, or decline states are produced by rules the authority owns, each with an explanation and an audit record.',
              actor: 'Authority decision owners',
            },
            {
              id: 'complete',
              label: 'Complete and support review',
              description:
                'The service completes with a recorded outcome and a traceable trail authorized reviewers can follow later.',
              actor: 'Authorized reviewers',
            },
          ],
        },
        {
          id: 'gov-platform-system',
          type: 'system-blueprint',
          variant: 'constellation',
          answers: ['buildable-system'],
          eyebrow: 'A buildable boundary',
          title: 'A public-service platform is a connected set of owned layers.',
          intro:
            'Scope can start with one service, but every layer needs approved inputs, a named handoff, and an outcome the authority can reconcile, audit, and review.',
          layers: [
            {
              id: 'service-experience',
              label: 'Citizen & operator experience layer',
              description:
                'Bilingual, WCAG 2.1 AA web and application interfaces guide eligibility, application, and case tracking with plain language and clear status.',
              inputs: ['Approved service content', 'Eligibility & consent copy', 'Accessibility standards'],
              handoff: 'A recorded, consented application',
              outcome: 'A resident who understands the next step and its rule',
            },
            {
              id: 'case-management',
              label: 'Case, permit & licensing layer',
              description:
                'Applications, approvals, inspections, and renewals move through owned workflows with named case owners and evidence.',
              inputs: ['Owned service rules', 'Routing & ownership model', 'Exception definitions'],
              handoff: 'A case with a named owner and status',
              outcome: 'A traceable path to a recorded decision',
            },
            {
              id: 'identity-records',
              label: 'Identity, records & data layer',
              description:
                'Secure sign-in, consent, registries, and reconciled records apply role-based access, retention, and audit trails.',
              inputs: ['Approved identity sources', 'Data-ownership & retention map', 'Access policy'],
              handoff: 'An owned, reconcilable record',
              outcome: 'Records a reviewer and an auditor can trust',
            },
            {
              id: 'security-cloud',
              label: 'Security, cloud & integration layer',
              description:
                'Encryption, monitoring, residency-aware hosting, and bounded integrations keep the platform verifiable and connected within agreed limits.',
              inputs: ['Approved integration interfaces', 'Residency & continuity rules', 'Monitoring policy'],
              handoff: 'A bounded, observed exchange',
              outcome: 'A resilient platform that stays inside its controls',
            },
          ],
        },
        {
          id: 'gov-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'Paths to implementation',
          title: 'Choose the build paths that assemble the service.',
          intro:
            'The final combination depends on the service you prioritize, the systems and registries you already run, and the smallest complete, reconcilable journey worth building first.',
          serviceIds: [
            'web-applications',
            'business-systems-development',
            'website-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'web-applications',
              label: 'Citizen portals and public-service web applications',
            },
            {
              serviceId: 'business-systems-development',
              label: 'Case, permit, licensing, and registry systems',
            },
            {
              serviceId: 'website-development',
              label: 'Accessible public-sector websites and information hubs',
            },
            {
              serviceId: 'content-creation',
              label: 'Bilingual service content and plain-language guidance',
            },
          ],
          relatedIndustryIds: ['healthcare', 'education'],
          industryAnchors: [
            {
              industryId: 'healthcare',
              label: 'Explore clinical care and patient service platforms',
            },
            {
              industryId: 'education',
              label: 'Explore enrollment and learning platforms',
            },
          ],
        },
        {
          id: 'gov-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Evidence and responsibility',
          title: 'The design makes public-sector boundaries explicit.',
          intro:
            'This page describes a proposed engineering model, not a government mandate, a client engagement, a clearance, or a guarantee of compliance. Policy, eligibility, identity, data residency, procurement, and service decisions remain with the responsible authority.',
          items: [
            {
              id: 'authority-ownership',
              label: 'The authority owns policy and decisions',
              responsibility:
                'The platform implements approved rules, records, and workflows, but eligibility, policy, and the final service decision stay with the responsible authority.',
              dependency: 'A named service owner and the approved policy and eligibility rules.',
              recovery: 'Pause the affected journey and return the decision to the service owner before launch.',
            },
            {
              id: 'accessibility-standard',
              label: 'Accessibility must be validated per service',
              responsibility:
                'Every journey is engineered to a WCAG 2.1 AA target, but conformance and assisted-service coverage must be validated per program with the authority.',
              dependency: 'Approved accessibility requirements and an assisted-service plan.',
              recovery: 'Hold a journey behind an accessible fallback until conformance is validated.',
            },
            {
              id: 'data-residency',
              label: 'Identity and data residency',
              responsibility:
                'Identity sources, retention, residency, and access rules must be defined and approved before any record is captured.',
              dependency: 'An approved data-ownership, residency, retention, and access map.',
              recovery: 'Keep the record isolated and access-restricted until its rules are confirmed.',
            },
            {
              id: 'procurement-integration',
              label: 'Procurement and system dependencies',
              responsibility:
                'Integrations to registries, payment, and identity depend on validated access, contracts, and procurement approval.',
              dependency: 'Confirmed system documentation, credentials, and procurement clearance.',
              recovery: 'Hold the step behind a manual or sandboxed path until access is validated.',
            },
          ],
        },
        {
          id: 'gov-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'Built for bilingual public service',
          title: 'Arabic and English are operating languages, not a final translation step.',
          intro:
            'Service wording, eligibility and consent copy, decision explanations, and staff messages are authored for each language while one shared, reconcilable system structure stays constant.',
          items: [
            {
              id: 'bilingual-service',
              label: 'Native civic language',
              description:
                'Eligibility, forms, and status wording is written for how residents read, understand, and act in each language, not translated after the fact.',
            },
            {
              id: 'accessibility-rtl',
              label: 'Accessible in both reading directions',
              description:
                'Contrast, keyboard, assistive-technology support, and layout hold up in right-to-left and left-to-right contexts under a named review owner.',
            },
            {
              id: 'program-dependencies',
              label: 'Program-by-program dependencies',
              description:
                'Registries, identity, payment, residency, and procurement requirements are checked per program before scope is fixed.',
            },
          ],
        },
        {
          id: 'gov-faq',
          type: 'faq',
          variant: 'grouped-questions',
          answers: [],
          eyebrow: 'Decision questions',
          title: 'What public-sector teams usually need to decide first.',
          intro:
            'A useful first scope is one complete, reconcilable service journey—eligibility to a recorded decision—with named policy, data, and operational owners.',
          items: [
            {
              id: 'compliance-role',
              question: 'Does CloudTopia make our service compliant or accredited?',
              answer:
                'No. We engineer the system to a WCAG 2.1 AA accessibility target and to recognised security controls, and we support your accreditation. Certification, licensing, and the final compliance sign-off stay with your authority—the build makes those requirements explicit and traceable.',
            },
            {
              id: 'data-residency',
              question: 'Can data stay within our residency and sovereignty rules?',
              answer:
                'Yes. Hosting and data-handling are designed around the residency, retention, and access rules your authority approves, with those requirements mapped before any record is captured.',
            },
            {
              id: 'legacy-integration',
              question: 'Can this connect to our existing registries and legacy systems?',
              answer:
                'It is designed around the interfaces, fields, and access your systems confirm. We map the required data, responsible systems, reconciliation source, and a manual or sandboxed fallback before committing to a live integration.',
            },
            {
              id: 'accessibility',
              question: 'How is accessibility handled?',
              answer:
                'Accessibility is engineered into every journey—contrast, keyboard, assistive-technology support, plain language, and both reading directions—to a WCAG 2.1 AA target, then validated per service with an assisted-service path for people who need help.',
            },
            {
              id: 'procurement',
              question: 'Can you work within our procurement model?',
              answer:
                'Yes. Engagements are scoped as bounded, buildable phases—starting with one service journey—so the work fits fixed-scope or phased procurement rather than an open-ended program.',
            },
            {
              id: 'starting-point',
              question: 'Where should a public-sector team begin?',
              answer:
                'Begin with one high-value service, identify every handoff, record, and owner it touches, then define the smallest reconcilable, accessible journey that supports it end to end before expanding.',
            },
          ],
        },
        {
          id: 'gov-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'Choose the first service',
          title: 'Make one accessible, reconcilable service the starting point.',
          intro:
            'Bring one service journey, the teams and authorities who own it, and the systems it touches. We will turn that context into a bounded, buildable public-service brief.',
          decisionCopy:
            'Start with one complete, accessible service journey rather than a list of disconnected features.',
          primary: {
            label: 'Review a public service journey',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore public-service web applications',
            serviceId: 'web-applications',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'هندسة الأنظمة الحكومية والقطاع العام — بوابات المواطن والحكومة الرقمية',
        description:
          'تهندس كلاود توبيا أنظمة حكومية ثنائية اللغة تعطي سهولة الوصول أولوية: بوابات خدمة المواطن، والحكومة الرقمية والتصاريح والتراخيص، وإدارة المعاملات، والهوية الآمنة، مع طبقات الأمان والامتثال المحيطة بها.',
      },
      breadcrumbLabel: 'الحكومة والقطاع العام',
      hero: {
        worldLabel: 'معيار الخدمة العامة',
        eyebrow: 'أنظمة الخدمات العامة',
        h1: 'نهندس الأنظمة التي تجعل الخدمات العامة تعمل.',
        intro:
          'تصمم كلاود توبيا وتبني أنظمة خدمات عامة ثنائية اللغة تعطي سهولة الوصول أولوية—بوابات خدمة المواطن، والحكومة الرقمية والتصاريح والتراخيص، وإدارة المعاملات، والهوية الآمنة—من الأهلية حتى التقديم وملكية المعاملة وقرار مسجَّل.',
        primaryCta: {
          label: 'راجعوا رحلة إحدى خدماتكم العامة',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشفوا مسارات أنظمة الخدمة العامة',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'تبقى الأهلية والتقديم والمستندات وملكية المعاملة والمساعدة والإتمام مرئية على مسار خدمة عامة هادئ وسهل الوصول.',
        sceneStages: [
          { id: 'eligibility', label: 'العثور على الخدمة والأهلية', state: 'واضح' },
          { id: 'apply', label: 'التقديم وإرفاق المستندات', state: 'مستلم' },
          { id: 'route', label: 'توجيه المعاملة للمسؤول', state: 'بمالك واضح' },
          { id: 'track', label: 'متابعة الحالة وطلب المساعدة', state: 'مرئي' },
          { id: 'complete', label: 'القرار وإتمام الخدمة', state: 'مسجل' },
        ],
      },
      sections: [
        {
          id: 'gov-operating-pressure',
          type: 'pressure-field',
          variant: 'constraints-first',
          answers: ['operating-pressure'],
          eyebrow: 'حيث تُكسب الثقة العامة أو تُفقد',
          title: 'يُحكم على الخدمة العامة بقدرة الناس على إتمامها.',
          intro:
            'يقرر المقيمون قابلية استخدام الخدمة في الشاشات الأولى، بينما تحتاج الفرق خلف المنصة إلى أن يصل كل طلب حاملاً الأهلية والمستندات والملكية التي يعتمد عليها القرار التالي.',
          signals: [
            {
              id: 'accessibility-gap',
              label: 'سهولة الوصول واجب لا خاصية',
              description:
                'يجب أن تعمل الخدمة العامة للجميع—التقنيات المساعِدة ولوحة المفاتيح والاتصال الضعيف والاتجاهين—وإلا أقصت أكثر من يحتاجونها.',
            },
            {
              id: 'fragmented-journeys',
              label: 'تنكسر الرحلات بين أنظمة منفصلة',
              description:
                'كثيراً ما تتوزع الأهلية والنماذج والمستندات والدفع بين أدوات منفصلة، فيتعثر المقيم ويفقد الموظف تتبع من قدّم على ماذا.',
            },
            {
              id: 'ownership-visibility',
              label: 'المعاملات تحتاج مالكاً محدداً وحالة مرئية',
              description:
                'تحتاج الطلبات والاستثناءات والتظلمات إلى مالك واضح وأدلة وحالة يراها المقيم—لا قائمة صامتة بلا طريق للعودة.',
            },
          ],
        },
        {
          id: 'gov-service-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'من الأهلية إلى قرار مسجَّل',
          title: 'مسار واحد سهل الوصول من إيجاد الخدمة إلى إتمامها.',
          intro:
            'يوجه النظام المقيم عبر تسلسل مدني مفهوم، مع إبقاء الهوية والسجلات وقرارات الخدمة ضمن حالات مملوكة قابلة للتتبع والتدقيق.',
          stages: [
            {
              id: 'eligibility',
              label: 'العثور على الخدمة وفحص الأهلية',
              description:
                'يجد المقيم الخدمة الصحيحة بلغة واضحة ثنائية، ويرى ما إذا كان مؤهلاً قبل البدء.',
              actor: 'المقيم',
            },
            {
              id: 'apply',
              label: 'التقديم وإرفاق المستندات',
              description:
                'يجمع نموذج «قدّم مرة واحدة» سهل الوصول التفاصيل والمستندات، مع تحقق ومسارات خدمة مساندة لمن يحتاج المساعدة.',
              actor: 'المقيم وموظفو الخدمة المساندة',
            },
            {
              id: 'route',
              label: 'توجيه المعاملة إلى مالك',
              description:
                'يُوجَّه الطلب إلى مالك محدد مع الأدلة والقواعد التي يعتمد عليها القرار، ضمن ضوابط الجهة المسؤولة.',
              actor: 'أصحاب المعاملات',
            },
            {
              id: 'track',
              label: 'متابعة الحالة وطلب المساعدة',
              description:
                'يستطيع المقيم رؤية موضع الطلب وما هو مطلوب تالياً وكيفية الحصول على المساعدة—دون الاتصال للسؤال.',
              actor: 'المقيم وفريق الخدمة',
            },
            {
              id: 'decision',
              label: 'الوصول إلى قرار وتسجيله',
              description:
                'تنتج حالات الموافقة أو طلب المزيد أو الرفض عن قواعد تملكها الجهة، ولكل منها تفسير وسجل تدقيق.',
              actor: 'أصحاب قرار الجهة',
            },
            {
              id: 'complete',
              label: 'الإتمام ودعم المراجعة',
              description:
                'تُتمّ الخدمة بنتيجة مسجَّلة ومسار قابل للتتبع يستطيع المراجعون المخولون متابعته لاحقاً.',
              actor: 'المراجعون المخولون',
            },
          ],
        },
        {
          id: 'gov-platform-system',
          type: 'system-blueprint',
          variant: 'constellation',
          answers: ['buildable-system'],
          eyebrow: 'نطاق قابل للبناء',
          title: 'منصة الخدمة العامة مجموعة مترابطة من الطبقات ذات الملكية الواضحة.',
          intro:
            'يمكن أن يبدأ النطاق بخدمة واحدة، لكن كل طبقة تحتاج إلى مدخلات معتمدة وتسليم محدد ونتيجة تستطيع الجهة مطابقتها وتدقيقها ومراجعتها.',
          layers: [
            {
              id: 'service-experience',
              label: 'طبقة تجربة المواطن والموظف',
              description:
                'واجهات ويب وتطبيقات ثنائية اللغة وفق WCAG 2.1 AA توجه الأهلية والتقديم ومتابعة المعاملة بلغة واضحة وحالة ظاهرة.',
              inputs: ['محتوى خدمة معتمد', 'نصوص الأهلية والموافقة', 'معايير سهولة الوصول'],
              handoff: 'طلب مسجَّل وموافَق عليه',
              outcome: 'مقيم يفهم الخطوة التالية وقاعدتها',
            },
            {
              id: 'case-management',
              label: 'طبقة المعاملات والتصاريح والتراخيص',
              description:
                'تتحرك الطلبات والاعتمادات وعمليات التفتيش والتجديدات عبر مسارات مملوكة بأصحاب معاملات محددين وأدلة.',
              inputs: ['قواعد خدمة مملوكة', 'نموذج التوجيه والملكية', 'تعريفات الاستثناءات'],
              handoff: 'معاملة بمالك محدد وحالة',
              outcome: 'مسار قابل للتتبع إلى قرار مسجَّل',
            },
            {
              id: 'identity-records',
              label: 'طبقة الهوية والسجلات والبيانات',
              description:
                'يطبق تسجيل الدخول الآمن والموافقة والسجلات المطابَقة وصولاً حسب الأدوار واحتفاظاً ومسارات تدقيق.',
              inputs: ['مصادر هوية معتمدة', 'خريطة ملكية البيانات والاحتفاظ', 'سياسة الوصول'],
              handoff: 'سجل مملوك قابل للمطابقة',
              outcome: 'سجلات يثق بها المراجع والمدقق',
            },
            {
              id: 'security-cloud',
              label: 'طبقة الأمان والسحابة والتكامل',
              description:
                'يحافظ التشفير والمراقبة والاستضافة المراعية للإقامة والتكاملات المحدودة على منصة قابلة للتحقق ومترابطة ضمن الحدود المتفق عليها.',
              inputs: ['واجهات تكامل معتمدة', 'قواعد الإقامة والاستمرارية', 'سياسة المراقبة'],
              handoff: 'تبادل محدود ومراقَب',
              outcome: 'منصة مرنة تبقى ضمن ضوابطها',
            },
          ],
        },
        {
          id: 'gov-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'اختاروا مسارات البناء التي تجمع الخدمة.',
          intro:
            'يتحدد المزيج النهائي بحسب الخدمة التي تعطونها الأولوية، والأنظمة والسجلات التي تشغّلونها أصلاً، وأصغر رحلة متكاملة قابلة للمطابقة تستحق البناء أولاً.',
          serviceIds: [
            'web-applications',
            'business-systems-development',
            'website-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'web-applications',
              label: 'بوابات المواطن وتطبيقات ويب الخدمة العامة',
            },
            {
              serviceId: 'business-systems-development',
              label: 'أنظمة المعاملات والتصاريح والتراخيص والسجلات',
            },
            {
              serviceId: 'website-development',
              label: 'مواقع قطاع عام سهلة الوصول ومراكز معلومات',
            },
            {
              serviceId: 'content-creation',
              label: 'محتوى خدمة ثنائي اللغة وإرشادات بلغة واضحة',
            },
          ],
          relatedIndustryIds: ['healthcare', 'education'],
          industryAnchors: [
            {
              industryId: 'healthcare',
              label: 'استكشفوا منصات الرعاية السريرية وخدمة المرضى',
            },
            {
              industryId: 'education',
              label: 'استكشفوا منصات التسجيل والتعلّم',
            },
          ],
        },
        {
          id: 'gov-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'الأدلة والمسؤوليات',
          title: 'يجعل التصميم حدود القطاع العام صريحة.',
          intro:
            'تصف الصفحة نموذج هندسة مقترحاً، لا تكليفاً حكومياً ولا ارتباط عميل ولا تصريحاً ولا ضماناً للامتثال. تبقى السياسات والأهلية والهوية وإقامة البيانات والمشتريات وقرارات الخدمة لدى الجهة المسؤولة.',
          items: [
            {
              id: 'authority-ownership',
              label: 'الجهة تملك السياسات والقرارات',
              responsibility:
                'تنفذ المنصة القواعد والسجلات ومسارات العمل المعتمدة، لكن الأهلية والسياسة وقرار الخدمة النهائي تبقى لدى الجهة المسؤولة.',
              dependency: 'مالك خدمة محدد وقواعد السياسة والأهلية المعتمدة.',
              recovery: 'إيقاف الرحلة المتأثرة وإعادة القرار إلى مالك الخدمة قبل الإطلاق.',
            },
            {
              id: 'accessibility-standard',
              label: 'يجب اعتماد سهولة الوصول لكل خدمة',
              responsibility:
                'تُهندَس كل رحلة وفق هدف WCAG 2.1 AA، لكن المطابقة وتغطية الخدمة المساندة يجب اعتمادها لكل برنامج مع الجهة.',
              dependency: 'متطلبات سهولة وصول معتمدة وخطة خدمة مساندة.',
              recovery: 'إبقاء الرحلة خلف بديل سهل الوصول حتى تُعتمد المطابقة.',
            },
            {
              id: 'data-residency',
              label: 'الهوية وإقامة البيانات',
              responsibility:
                'يجب تحديد واعتماد مصادر الهوية والاحتفاظ والإقامة وقواعد الوصول قبل جمع أي سجل.',
              dependency: 'خريطة معتمدة لملكية البيانات والإقامة والاحتفاظ والوصول.',
              recovery: 'إبقاء السجل معزولاً ومقيَّد الوصول حتى تتأكد قواعده.',
            },
            {
              id: 'procurement-integration',
              label: 'المشتريات واعتماديات الأنظمة',
              responsibility:
                'تعتمد التكاملات مع السجلات والدفع والهوية على وصول موثوق وعقود وموافقة مشتريات.',
              dependency: 'توثيق نظام مؤكد وبيانات اعتماد وتصريح مشتريات.',
              recovery: 'إبقاء الخطوة خلف مسار يدوي أو تجريبي حتى يتأكد الوصول.',
            },
          ],
        },
        {
          id: 'gov-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'مصمم لخدمة عامة ثنائية اللغة',
          title: 'العربية والإنجليزية لغتا تشغيل، وليستا خطوة ترجمة أخيرة.',
          intro:
            'تُصاغ نصوص الخدمة والأهلية والموافقة وتفسيرات القرارات ورسائل الموظفين لكل لغة، مع بقاء بنية نظام واحدة قابلة للمطابقة ثابتة.',
          items: [
            {
              id: 'bilingual-service',
              label: 'لغة مدنية طبيعية',
              description:
                'تُكتب صياغة الأهلية والنماذج والحالة وفق طريقة قراءة المقيمين وفهمهم وتصرفهم في كل لغة، لا كترجمة لاحقة.',
            },
            {
              id: 'accessibility-rtl',
              label: 'سهولة الوصول في الاتجاهين',
              description:
                'يصمد التباين ولوحة المفاتيح ودعم التقنيات المساعِدة والتخطيط في السياقين العربي والإنجليزي تحت مالك مراجعة محدد.',
            },
            {
              id: 'program-dependencies',
              label: 'اعتماديات حسب البرنامج',
              description:
                'تُراجَع السجلات والهوية والدفع والإقامة ومتطلبات المشتريات لكل برنامج قبل تثبيت النطاق.',
            },
          ],
        },
        {
          id: 'gov-faq',
          type: 'faq',
          variant: 'grouped-questions',
          answers: [],
          eyebrow: 'أسئلة القرار',
          title: 'ما الذي تحتاج فرق القطاع العام إلى حسمه أولاً؟',
          intro:
            'النطاق الأول المفيد هو رحلة خدمة مكتملة قابلة للمطابقة—من الأهلية إلى قرار مسجَّل—مع تحديد أصحاب السياسة والبيانات والتشغيل.',
          items: [
            {
              id: 'compliance-role',
              question: 'هل تجعل كلاود توبيا خدمتنا ممتثلة أو معتمدة؟',
              answer:
                'لا. نهندس النظام وفق هدف سهولة الوصول WCAG 2.1 AA ووفق ضوابط أمان معترف بها، وندعم اعتمادكم. يبقى الاعتماد والترخيص وإقرار الامتثال النهائي لدى جهتكم، ويجعل البناء تلك المتطلبات صريحة وقابلة للتتبع.',
            },
            {
              id: 'data-residency',
              question: 'هل تبقى البيانات ضمن قواعد الإقامة والسيادة لدينا؟',
              answer:
                'نعم. تُصمَّم الاستضافة ومعالجة البيانات حول قواعد الإقامة والاحتفاظ والوصول التي تعتمدها جهتكم، مع رسم تلك المتطلبات قبل جمع أي سجل.',
            },
            {
              id: 'legacy-integration',
              question: 'هل يمكن الربط بسجلاتنا وأنظمتنا القديمة؟',
              answer:
                'يُصمَّم حول الواجهات والحقول والوصول الذي تؤكده أنظمتكم. نرسم البيانات المطلوبة والأنظمة المسؤولة ومصدر المطابقة والمسار اليدوي أو التجريبي البديل قبل الالتزام بتكامل مباشر.',
            },
            {
              id: 'accessibility',
              question: 'كيف تُعالَج سهولة الوصول؟',
              answer:
                'تُهندَس سهولة الوصول في كل رحلة—التباين ولوحة المفاتيح ودعم التقنيات المساعِدة واللغة الواضحة والاتجاهين—وفق هدف WCAG 2.1 AA، ثم تُعتمد لكل خدمة مع مسار خدمة مساندة لمن يحتاج المساعدة.',
            },
            {
              id: 'procurement',
              question: 'هل يمكنكم العمل ضمن نموذج مشترياتنا؟',
              answer:
                'نعم. تُحدَّد المشاريع كمراحل قابلة للبناء ومحدودة النطاق—تبدأ برحلة خدمة واحدة—لتناسب المشتريات محددة النطاق أو المرحلية بدلاً من برنامج مفتوح.',
            },
            {
              id: 'starting-point',
              question: 'من أين يبدأ فريق القطاع العام؟',
              answer:
                'ابدؤوا بخدمة واحدة ذات قيمة عالية، وحددوا كل تسليم وسجل ومالك تمر بها، ثم ارسموا أصغر رحلة قابلة للمطابقة وسهلة الوصول تدعمها من طرف إلى طرف قبل التوسع.',
            },
          ],
        },
        {
          id: 'gov-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'اختاروا الخدمة الأولى',
          title: 'اجعلوا خدمة واحدة سهلة الوصول وقابلة للمطابقة نقطة البداية.',
          intro:
            'أحضروا رحلة خدمة واحدة، والفرق والجهات التي تملكها، والأنظمة التي تمر بها، وسنحوّل هذا السياق إلى موجز خدمة عامة محدد النطاق قابل للبناء.',
          decisionCopy:
            'ابدؤوا برحلة خدمة واحدة مكتملة وسهلة الوصول، لا بقائمة خصائص منفصلة.',
          primary: {
            label: 'راجعوا رحلة إحدى خدماتكم العامة',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: 'استكشفوا تطبيقات ويب الخدمة العامة',
            serviceId: 'web-applications',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
