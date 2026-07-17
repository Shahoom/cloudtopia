import type { IndustryPageDefinition } from '@/lib/industries/types'

/**
 * Hand-authored FinTech "Industry World".
 *
 * The visible page (components/industry/fintech/FintechIndustryPage.tsx) ports
 * the Paynext template look while presenting CloudTopia's expertise BUILDING
 * fintech systems. This definition drives the hero, the service-bridge link
 * cards, the FAQ, and the JSON-LD / markdown / SEO surfaces. Every other
 * ported visual section pulls its microcopy from fintech-content.ts.
 *
 * Framing rule: CloudTopia engineers payment, banking, and lending platforms —
 * it is NOT a fintech operator. Compliance-related capabilities SUPPORT an
 * approved process; they never certify or authorize it.
 */
export const fintechDefinition = {
  slug: 'fintech',
  contentVersion: 'fintech-paynext-published-1',
  publicationStatus: 'published',
  updatedAt: '2026-07-17',
  world: {
    id: 'trust-ledger',
    theme: {
      // Derived from the Paynext palette: deep-violet accent on a light,
      // faint-violet-tinted surface set.
      canvas: '#F8FAFC',
      surface: '#FFFFFF',
      elevatedSurface: '#F5F3FE',
      ink: '#110E34',
      mutedInk: '#677489',
      accent: '#46208F',
      accentInk: '#FFFFFF',
      signal: '#4925A5',
      line: '#CDD5E0',
      focus: '#46208F',
      displayTreatment: 'technical',
      radiusMode: 'soft',
      motifDensity: 'medium',
      sceneTreatment: 'route-field',
    },
    heroScene: 'fintech-ledger',
    heroTreatment: 'route-field',
    signatureComposition: {
      id: 'trust-boundary-map',
      name: {
        en: 'Trust boundary map',
        ar: 'خريطة حدود الثقة',
      },
      sectionIds: [
        'fintech-trust-boundaries',
        'fintech-onboarding-journey',
        'fintech-platform-system',
      ],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'fintech-ledger' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/fintech/en.jpg',
      width: 1200,
      height: 630,
    },
    {
      kind: 'og-image',
      locale: 'ar',
      publicPath: '/og/industries/fintech/ar.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'FinTech Platform Engineering — Payments, Banking & Ledgers',
        description:
          'CloudTopia engineers bilingual fintech systems: payment and wallet platforms, core banking and ledgers, lending engines, plus the security, integration, and observability layers around them.',
      },
      breadcrumbLabel: 'FinTech',
      hero: {
        worldLabel: 'Trust Ledger',
        eyebrow: 'Financial product systems',
        h1: 'We engineer the fintech platforms your customers trust.',
        intro:
          'CloudTopia designs and builds bilingual fintech systems—payment and wallet platforms, core banking and ledgers, lending engines, and the security, integration, and observability layers around them—from onboarding through every transaction, exception, and audit.',
        primaryCta: {
          label: 'Map your onboarding and transaction flow',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore fintech system paths',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'Identity, consent, account decisions, transactions, and exceptions stay visible on one controlled event rail.',
        sceneStages: [
          { id: 'consent', label: 'Discover and consent', state: 'Declared' },
          { id: 'identity', label: 'Identity review', state: 'Reviewed' },
          { id: 'decision', label: 'Account decision', state: 'Owned' },
          { id: 'transaction', label: 'Transaction', state: 'Recorded' },
          { id: 'exception', label: 'Exception and audit', state: 'Traceable' },
        ],
      },
      sections: [
        {
          id: 'fintech-operating-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'Where trust is won or lost',
          title: 'A financial product is judged before the first transaction.',
          intro:
            'Customers decide whether to trust a financial product in the first few screens, while operators need every request to arrive with the identity, consent, and context the next decision depends on.',
          signals: [
            {
              id: 'onboarding-friction',
              label: 'Onboarding is where trust breaks first',
              description:
                'Identity, consent, and eligibility checks are often stitched across disconnected tools, so customers stall and operators lose the thread of who agreed to what.',
            },
            {
              id: 'transaction-integrity',
              label: 'Money movement needs a provable record',
              description:
                'Balances, transfers, and fees only hold up when every event is recorded once, reconciled, and traceable back to an owner and an approved rule.',
            },
            {
              id: 'exception-visibility',
              label: 'Exceptions decide the real experience',
              description:
                'Failed payments, flagged accounts, and disputes need named queues, evidence, and a documented path back to the main journey—not a silent dead end.',
            },
          ],
        },
        {
          id: 'fintech-onboarding-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'From consent to audit',
          title: 'One controlled path from onboarding to the audit trail.',
          intro:
            'The system supports a customer through an understandable financial sequence while keeping regulated decisions, identity records, and money movement inside owned, traceable states.',
          stages: [
            {
              id: 'consent',
              label: 'Discover and give consent',
              description:
                'The customer meets an approved product explanation and grants explicit, recorded consent before any data or eligibility check begins.',
              actor: 'Customer',
            },
            {
              id: 'identity',
              label: 'Verify identity',
              description:
                'Identity and eligibility evidence is collected through validated provider integrations, with every result stored against a clear owner and retention rule.',
              actor: 'Customer and verification providers',
            },
            {
              id: 'decision',
              label: 'Reach an account decision',
              description:
                'Approve, review, or decline states are produced by rules the institution owns, each with an explanation the customer and operator can read.',
              actor: 'Risk and operations owners',
            },
            {
              id: 'transaction',
              label: 'Move money',
              description:
                'Payments, transfers, and balances are recorded once on the ledger, reconciled against the payment rail, and reflected consistently to every view.',
              actor: 'Customer and ledger system',
            },
            {
              id: 'exception',
              label: 'Resolve exceptions',
              description:
                'Failed, flagged, or disputed events route to a named queue with the evidence and next action required to return the customer to the main journey.',
              actor: 'Operations and compliance-support team',
            },
            {
              id: 'audit',
              label: 'Support review and audit',
              description:
                'Each decision and transaction keeps a traceable record so authorized reviewers can follow what happened, when, and under which approved rule.',
              actor: 'Authorized reviewers',
            },
          ],
        },
        {
          id: 'fintech-trust-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'Signature composition',
          title: 'Trust appears where the customer lane meets the control lane.',
          intro:
            'The experience is designed as two coordinated lanes: what the customer sees and does, and the ownership, evidence, and controls the institution must hold behind each visible step.',
          stages: [
            {
              id: 'consent',
              label: 'Consent capture',
              description: 'The customer grants recorded consent while the system stores who agreed, to what, and when.',
              actor: 'Customer',
            },
            {
              id: 'identity',
              label: 'Identity and eligibility',
              description: 'Verification evidence is bounded to approved providers, fields, and retention rules.',
              actor: 'Verification and risk owners',
            },
            {
              id: 'decision',
              label: 'Account decision',
              description: 'Both lanes share one decision state with an explanation the customer can read.',
              actor: 'Risk and operations owners',
            },
            {
              id: 'transaction',
              label: 'Transaction record',
              description: 'A single recorded event keeps the customer view and the ledger reconciled.',
              actor: 'Customer and ledger system',
            },
            {
              id: 'exception',
              label: 'Exception ownership',
              description: 'A named queue holds the evidence and the documented return path to the journey.',
              actor: 'Operations and compliance-support team',
            },
            {
              id: 'audit',
              label: 'Audit trail',
              description: 'The customer sees the outcome; the institution keeps the traceable record.',
              actor: 'Authorized reviewers',
            },
          ],
          lanes: [
            {
              id: 'customer-lane',
              label: 'Customer lane',
              stageIds: ['consent', 'identity', 'decision', 'transaction', 'exception'],
            },
            {
              id: 'control-lane',
              label: 'Control and compliance lane',
              stageIds: ['identity', 'decision', 'transaction', 'exception', 'audit'],
            },
          ],
        },
        {
          id: 'fintech-platform-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'A buildable boundary',
          title: 'A fintech product is a connected set of owned layers.',
          intro:
            'Scope can start with one flow, but every layer needs approved inputs, a named handoff, and an outcome the institution can reconcile and review.',
          layers: [
            {
              id: 'product-experience',
              label: 'Customer experience layer',
              description:
                'Bilingual web and application interfaces guide onboarding, accounts, and money movement with approved product wording and clear decision states.',
              inputs: ['Approved product content', 'Consent and disclosure copy', 'Decision explanations'],
              handoff: 'A recorded, consented customer request',
              outcome: 'A customer who understands the next step and its rule',
            },
            {
              id: 'ledger-core',
              label: 'Core banking and ledger layer',
              description:
                'Accounts, balances, transactions, and fees are recorded on a reconciled ledger with double-entry integrity and idempotent event handling.',
              inputs: ['Account model', 'Transaction rules', 'Reconciliation sources'],
              handoff: 'A single authoritative transaction record',
              outcome: 'Balances and statements a reviewer can trust',
            },
            {
              id: 'risk-lending',
              label: 'Lending, credit, and decision layer',
              description:
                'Eligibility, scoring, and lending workflows apply institution-owned rules and produce explainable, auditable decision states.',
              inputs: ['Owned decision rules', 'Approved data sources', 'Explanation templates'],
              handoff: 'An explainable decision with an owner',
              outcome: 'A traceable approve, review, or decline outcome',
            },
            {
              id: 'security-integration',
              label: 'Security, integration, and observability layer',
              description:
                'Encryption, role-based access, provider integrations, and monitoring keep the platform verifiable and connected within agreed limits.',
              inputs: ['Approved provider interfaces', 'Access and key policy', 'Monitoring and alert rules'],
              handoff: 'A bounded, observed data exchange',
              outcome: 'A connected platform that stays inside its controls',
            },
          ],
        },
        {
          id: 'fintech-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'Paths to implementation',
          title: 'Choose the build paths that assemble the platform.',
          intro:
            'The final combination depends on the flow you prioritize, the systems and providers you already use, and the smallest complete, reconcilable handoff worth building first.',
          serviceIds: [
            'web-applications',
            'business-systems-development',
            'website-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'web-applications',
              label: 'Fintech web applications and customer portals',
            },
            {
              serviceId: 'business-systems-development',
              label: 'Core banking, ledger, and operations systems',
            },
            {
              serviceId: 'website-development',
              label: 'Fintech product and marketing websites',
            },
            {
              serviceId: 'content-creation',
              label: 'Bilingual financial content and disclosures',
            },
          ],
          relatedIndustryIds: ['professional-services', 'government-public-sector'],
          industryAnchors: [
            {
              industryId: 'professional-services',
              label: 'Explore expertise and advisory platforms',
            },
            {
              industryId: 'government-public-sector',
              label: 'Explore regulated public service platforms',
            },
          ],
        },
        {
          id: 'fintech-trust-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Evidence and responsibility',
          title: 'The design makes regulated boundaries explicit.',
          intro:
            'This page describes a proposed engineering model, not financial advice, a license, or a compliance certification. Approval, risk decisions, licensing, and provider access remain with the institution and its authorized owners.',
          items: [
            {
              id: 'compliance-support',
              label: 'Compliance is supported, not certified',
              responsibility:
                'The platform can implement approved controls, records, and workflows, but the institution and its regulators own certification, licensing, and authorization.',
              dependency: 'A named compliance owner and the approved control requirements.',
              recovery: 'Pause the affected flow and return the decision to the compliance owner before launch.',
            },
            {
              id: 'record-ownership',
              label: 'Identity, consent, and transaction records',
              responsibility:
                'Every regulated record needs explicit ownership, retention, and access rules defined and approved before it is captured.',
              dependency: 'An approved data-ownership, retention, and access map.',
              recovery: 'Keep the record isolated and access-restricted until its rules are confirmed.',
            },
            {
              id: 'provider-dependencies',
              label: 'Payment and verification dependencies',
              responsibility:
                'Payment, KYC, and verification integrations depend on validated provider access, contracts, and market availability.',
              dependency: 'Confirmed provider documentation, credentials, and market approval.',
              recovery: 'Hold the step behind a manual or sandboxed path until provider access is validated.',
            },
            {
              id: 'decision-boundary',
              label: 'Financial decision boundary',
              responsibility:
                'Credit, risk, and eligibility rules are owned by the institution; the system implements and explains them rather than inventing them.',
              dependency: 'Institution-approved decision rules and explanation wording.',
              recovery: 'Route unclear cases to human review instead of presenting an unowned automated decision.',
            },
          ],
        },
        {
          id: 'fintech-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'Built for bilingual finance',
          title: 'Arabic and English are operating languages, not a final translation step.',
          intro:
            'Product wording, consent and disclosure copy, decision explanations, and operator messages are authored for each language while one shared, reconcilable system structure stays constant.',
          items: [
            {
              id: 'bilingual-product',
              label: 'Native financial language',
              description:
                'Account, payment, and lending wording is written for how customers read, understand, and act in each language, not translated after the fact.',
            },
            {
              id: 'regulatory-disclosures',
              label: 'Localized disclosures and consent',
              description:
                'Fees, terms, consent, and required disclosures remain accurate and readable in right-to-left and left-to-right contexts, under a named review owner.',
            },
            {
              id: 'market-dependencies',
              label: 'Market-by-market dependencies',
              description:
                'Payment rails, verification providers, currency, and regulatory requirements are checked per market before scope is fixed.',
            },
          ],
        },
        {
          id: 'fintech-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'Decision questions',
          title: 'What fintech teams usually need to decide first.',
          intro:
            'A useful first scope is one complete, reconcilable flow—onboarding to transaction, or transaction to audit—with named data, decision, and operational owners.',
          items: [
            {
              id: 'compliance-role',
              question: 'Does CloudTopia make our product compliant or licensed?',
              answer:
                'No. We engineer the system and implement the controls, records, and workflows your compliance owner and regulator approve. Licensing, certification, and authorization stay with your institution—the build makes those requirements explicit and traceable.',
            },
            {
              id: 'existing-core',
              question: 'Can this connect to our existing core banking or payment providers?',
              answer:
                'It is designed around the interfaces, fields, and access your providers confirm. We map the required data, responsible systems, reconciliation source, and a manual or sandboxed fallback before committing to a live integration.',
            },
            {
              id: 'security',
              question: 'How is security handled?',
              answer:
                'Security is engineered into the foundation—encryption in transit and at rest, role-based access, key and secret management, and monitoring—scoped to the access policy and standards your institution approves, not added as a later layer.',
            },
            {
              id: 'exception-scoping',
              question: 'How should exception queues be scoped?',
              answer:
                'Start with named exception types, owners, evidence requirements, and a documented return path to the main journey, so failed, flagged, or disputed events never become silent dead ends.',
            },
            {
              id: 'explainable-decisions',
              question: 'Can the product explain financial decisions clearly?',
              answer:
                'Yes. Decision states, required actions, and approved explanations can be designed into each customer and operator view, so an approve, review, or decline outcome is readable and auditable.',
            },
            {
              id: 'starting-point',
              question: 'Where should a fintech team begin?',
              answer:
                'Begin with one high-value flow, identify every handoff, record, and owner it touches, then define the smallest reconcilable system boundary that supports it end to end before expanding.',
            },
          ],
        },
        {
          id: 'fintech-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'Choose the first flow',
          title: 'Make one reconcilable flow the starting point.',
          intro:
            'Bring one financial flow, the teams and providers who own it, and the systems it touches. We will turn that context into a bounded, buildable fintech-system brief.',
          decisionCopy:
            'Start with one complete, reconcilable flow rather than a list of disconnected features.',
          primary: {
            label: 'Map your onboarding and transaction flow',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore fintech web applications',
            serviceId: 'web-applications',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'هندسة منصات التقنية المالية — المدفوعات والبنوك ودفاتر الأستاذ',
        description:
          'تهندس كلاود توبيا أنظمة تقنية مالية ثنائية اللغة: منصات مدفوعات ومحافظ، وبنوك أساسية ودفاتر أستاذ، ومحركات إقراض، مع طبقات الأمان والتكامل والمراقبة المحيطة بها.',
      },
      breadcrumbLabel: 'التقنية المالية',
      hero: {
        worldLabel: 'سجل الثقة',
        eyebrow: 'أنظمة المنتجات المالية',
        h1: 'نهندس منصات التقنية المالية التي يثق بها عملاؤكم.',
        intro:
          'تصمم كلاود توبيا وتبني أنظمة تقنية مالية ثنائية اللغة—منصات مدفوعات ومحافظ، وبنوكاً أساسية ودفاتر أستاذ، ومحركات إقراض، وطبقات الأمان والتكامل والمراقبة المحيطة بها—من التسجيل حتى كل معاملة واستثناء وتدقيق.',
        primaryCta: {
          label: 'لنرسم رحلة العميل من التسجيل إلى المعاملة',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشفوا مسارات أنظمة التقنية المالية',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'تبقى الهوية والموافقة وقرارات الحساب والمعاملات والاستثناءات مرئية على مسار أحداث منضبط واحد.',
        sceneStages: [
          { id: 'consent', label: 'الاكتشاف والموافقة', state: 'معلنة' },
          { id: 'identity', label: 'التحقق من الهوية', state: 'قيد المراجعة' },
          { id: 'decision', label: 'قرار تفعيل الحساب', state: 'بمالك واضح' },
          { id: 'transaction', label: 'المعاملة', state: 'مسجلة' },
          { id: 'exception', label: 'الاستثناء والتدقيق', state: 'قابلة للتتبع' },
        ],
      },
      sections: [
        {
          id: 'fintech-operating-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'حيث تُكسب الثقة أو تُفقد',
          title: 'يُحكم على المنتج المالي قبل المعاملة الأولى.',
          intro:
            'يقرر العملاء الثقة بالمنتج المالي في الشاشات الأولى، بينما يحتاج فريق التشغيل إلى أن يصل كل طلب حاملاً الهوية والموافقة والسياق الذي يعتمد عليه القرار التالي.',
          signals: [
            {
              id: 'onboarding-friction',
              label: 'التسجيل هو أول ما تنكسر عنده الثقة',
              description:
                'كثيراً ما تتوزع عمليات التحقق من الهوية والموافقة والأهلية بين أدوات منفصلة، فيتعثر العميل ويفقد الفريق تتبع من وافق على ماذا.',
            },
            {
              id: 'transaction-integrity',
              label: 'حركة الأموال تحتاج إلى سجل قابل للإثبات',
              description:
                'لا تصمد الأرصدة والتحويلات والرسوم إلا حين يُسجل كل حدث مرة واحدة، ويُطابَق، ويمكن تتبعه إلى مالك وقاعدة معتمدة.',
            },
            {
              id: 'exception-visibility',
              label: 'الاستثناءات هي ما يحدد التجربة الحقيقية',
              description:
                'تحتاج المدفوعات الفاشلة والحسابات المُعلَّمة والنزاعات إلى قوائم محددة وأدلة ومسار موثق للعودة إلى الرحلة الأساسية، لا إلى طريق مسدود صامت.',
            },
          ],
        },
        {
          id: 'fintech-onboarding-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'من الموافقة إلى التدقيق',
          title: 'مسار واحد منضبط من التسجيل إلى سجل التدقيق.',
          intro:
            'يدعم النظام العميل عبر تسلسل مالي مفهوم، مع إبقاء القرارات الخاضعة للتنظيم وسجلات الهوية وحركة الأموال ضمن حالات مملوكة قابلة للتتبع.',
          stages: [
            {
              id: 'consent',
              label: 'الاكتشاف ومنح الموافقة',
              description:
                'يطّلع العميل على شرح معتمد للمنتج ويمنح موافقة صريحة ومسجلة قبل بدء أي جمع للبيانات أو فحص للأهلية.',
              actor: 'العميل',
            },
            {
              id: 'identity',
              label: 'التحقق من الهوية',
              description:
                'تُجمع أدلة الهوية والأهلية عبر تكاملات مزودين موثوقة، وتُخزَّن كل نتيجة لدى مالك واضح وبقاعدة احتفاظ محددة.',
              actor: 'العميل ومزودو التحقق',
            },
            {
              id: 'decision',
              label: 'الوصول إلى قرار الحساب',
              description:
                'تنتج حالات الموافقة أو المراجعة أو الرفض عن قواعد تملكها المؤسسة، ولكل منها تفسير يمكن للعميل والفريق قراءته.',
              actor: 'أصحاب المخاطر والتشغيل',
            },
            {
              id: 'transaction',
              label: 'تحريك الأموال',
              description:
                'تُسجَّل المدفوعات والتحويلات والأرصدة مرة واحدة في دفتر الأستاذ، وتُطابَق مع قناة الدفع، وتنعكس باتساق على كل واجهة.',
              actor: 'العميل ونظام دفتر الأستاذ',
            },
            {
              id: 'exception',
              label: 'معالجة الاستثناءات',
              description:
                'تُوجَّه الأحداث الفاشلة أو المُعلَّمة أو المتنازع عليها إلى قائمة محددة مع الأدلة والإجراء التالي اللازم لإعادة العميل إلى الرحلة الأساسية.',
              actor: 'فريق التشغيل ودعم الامتثال',
            },
            {
              id: 'audit',
              label: 'دعم المراجعة والتدقيق',
              description:
                'يحتفظ كل قرار ومعاملة بسجل قابل للتتبع ليتمكن المراجعون المخولون من معرفة ما حدث ومتى وبأي قاعدة معتمدة.',
              actor: 'المراجعون المخولون',
            },
          ],
        },
        {
          id: 'fintech-trust-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'التكوين المميز',
          title: 'تظهر الثقة عند التقاء مسار العميل بمسار الضبط.',
          intro:
            'تُصمم التجربة كمسارين متناسقين: ما يراه العميل ويفعله، والملكية والأدلة والضوابط التي يجب أن تحتفظ بها المؤسسة خلف كل خطوة ظاهرة.',
          stages: [
            {
              id: 'consent',
              label: 'التقاط الموافقة',
              description: 'يمنح العميل موافقة مسجلة، ويخزّن النظام من وافق وعلى ماذا ومتى.',
              actor: 'العميل',
            },
            {
              id: 'identity',
              label: 'الهوية والأهلية',
              description: 'تُحصر أدلة التحقق ضمن مزودين وحقول وقواعد احتفاظ معتمدة.',
              actor: 'أصحاب التحقق والمخاطر',
            },
            {
              id: 'decision',
              label: 'قرار الحساب',
              description: 'يتشارك المساران حالة قرار واحدة مع تفسير يمكن للعميل قراءته.',
              actor: 'أصحاب المخاطر والتشغيل',
            },
            {
              id: 'transaction',
              label: 'سجل المعاملة',
              description: 'يحافظ حدث مسجل واحد على تطابق واجهة العميل مع دفتر الأستاذ.',
              actor: 'العميل ونظام دفتر الأستاذ',
            },
            {
              id: 'exception',
              label: 'ملكية الاستثناء',
              description: 'تحتفظ قائمة محددة بالأدلة وبمسار العودة الموثق إلى الرحلة.',
              actor: 'فريق التشغيل ودعم الامتثال',
            },
            {
              id: 'audit',
              label: 'سجل التدقيق',
              description: 'يرى العميل النتيجة، وتحتفظ المؤسسة بالسجل القابل للتتبع.',
              actor: 'المراجعون المخولون',
            },
          ],
          lanes: [
            {
              id: 'customer-lane',
              label: 'مسار العميل',
              stageIds: ['consent', 'identity', 'decision', 'transaction', 'exception'],
            },
            {
              id: 'control-lane',
              label: 'مسار الضبط والامتثال',
              stageIds: ['identity', 'decision', 'transaction', 'exception', 'audit'],
            },
          ],
        },
        {
          id: 'fintech-platform-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'نطاق قابل للبناء',
          title: 'المنتج المالي مجموعة مترابطة من الطبقات ذات الملكية الواضحة.',
          intro:
            'يمكن أن يبدأ النطاق بمسار واحد، لكن كل طبقة تحتاج إلى مدخلات معتمدة وتسليم محدد ونتيجة تستطيع المؤسسة مطابقتها ومراجعتها.',
          layers: [
            {
              id: 'product-experience',
              label: 'طبقة تجربة العميل',
              description:
                'توجه واجهات الويب والتطبيقات ثنائية اللغة التسجيل والحسابات وحركة الأموال بصياغة منتج معتمدة وحالات قرار واضحة.',
              inputs: ['محتوى منتج معتمد', 'نصوص الموافقة والإفصاح', 'تفسيرات القرارات'],
              handoff: 'طلب عميل مسجل وموافَق عليه',
              outcome: 'عميل يفهم الخطوة التالية وقاعدتها',
            },
            {
              id: 'ledger-core',
              label: 'طبقة البنك الأساسي ودفتر الأستاذ',
              description:
                'تُسجَّل الحسابات والأرصدة والمعاملات والرسوم في دفتر أستاذ مطابَق، بنزاهة قيد مزدوج ومعالجة أحداث لا تتكرر.',
              inputs: ['نموذج الحساب', 'قواعد المعاملات', 'مصادر المطابقة'],
              handoff: 'سجل معاملة مرجعي واحد',
              outcome: 'أرصدة وكشوف يثق بها المراجع',
            },
            {
              id: 'risk-lending',
              label: 'طبقة الإقراض والائتمان والقرار',
              description:
                'تطبق مسارات الأهلية والتقييم والإقراض قواعد تملكها المؤسسة وتنتج حالات قرار قابلة للتفسير والتدقيق.',
              inputs: ['قواعد قرار مملوكة', 'مصادر بيانات معتمدة', 'قوالب التفسير'],
              handoff: 'قرار قابل للتفسير بمالك واضح',
              outcome: 'نتيجة موافقة أو مراجعة أو رفض قابلة للتتبع',
            },
            {
              id: 'security-integration',
              label: 'طبقة الأمان والتكامل والمراقبة',
              description:
                'يحافظ التشفير والوصول بحسب الأدوار وتكاملات المزودين والمراقبة على منصة قابلة للتحقق ومترابطة ضمن الحدود المتفق عليها.',
              inputs: ['واجهات مزودين معتمدة', 'سياسة الوصول والمفاتيح', 'قواعد المراقبة والتنبيه'],
              handoff: 'تبادل بيانات محدود ومراقَب',
              outcome: 'منصة مترابطة تبقى ضمن ضوابطها',
            },
          ],
        },
        {
          id: 'fintech-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'اختاروا مسارات البناء التي تجمع المنصة.',
          intro:
            'يتحدد المزيج النهائي بحسب المسار الذي تعطونه الأولوية، والأنظمة والمزودين الذين تستخدمونهم أصلاً، وأصغر تسليم متكامل قابل للمطابقة يستحق البناء أولاً.',
          serviceIds: [
            'web-applications',
            'business-systems-development',
            'website-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'web-applications',
              label: 'تطبيقات ويب وبوابات عملاء للتقنية المالية',
            },
            {
              serviceId: 'business-systems-development',
              label: 'أنظمة بنوك أساسية ودفاتر أستاذ وتشغيل',
            },
            {
              serviceId: 'website-development',
              label: 'مواقع منتجات وتسويق للتقنية المالية',
            },
            {
              serviceId: 'content-creation',
              label: 'محتوى مالي وإفصاحات ثنائية اللغة',
            },
          ],
          relatedIndustryIds: ['professional-services', 'government-public-sector'],
          industryAnchors: [
            {
              industryId: 'professional-services',
              label: 'استكشفوا منصات الخبرة والاستشارة',
            },
            {
              industryId: 'government-public-sector',
              label: 'استكشفوا منصات الخدمات العامة المنظَّمة',
            },
          ],
        },
        {
          id: 'fintech-trust-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'الأدلة والمسؤوليات',
          title: 'يجعل التصميم الحدود الخاضعة للتنظيم صريحة.',
          intro:
            'تصف الصفحة نموذج هندسة مقترحاً، لا نصيحة مالية ولا ترخيصاً ولا اعتماد امتثال. يبقى القرار والمخاطر والترخيص ووصول المزودين لدى المؤسسة وأصحاب الاختصاص المخولين.',
          items: [
            {
              id: 'compliance-support',
              label: 'الامتثال مدعوم لا معتمَد',
              responsibility:
                'يمكن للمنصة تنفيذ الضوابط والسجلات ومسارات العمل المعتمدة، لكن الاعتماد والترخيص والتصريح تملكه المؤسسة وجهاتها التنظيمية.',
              dependency: 'مالك امتثال محدد ومتطلبات الضوابط المعتمدة.',
              recovery: 'إيقاف المسار المتأثر وإعادة القرار إلى مالك الامتثال قبل الإطلاق.',
            },
            {
              id: 'record-ownership',
              label: 'سجلات الهوية والموافقة والمعاملات',
              responsibility:
                'يحتاج كل سجل خاضع للتنظيم إلى قواعد صريحة للملكية والاحتفاظ والوصول تُحدد وتُعتمد قبل جمعه.',
              dependency: 'خريطة معتمدة لملكية البيانات والاحتفاظ والوصول.',
              recovery: 'إبقاء السجل معزولاً ومقيَّد الوصول حتى تتأكد قواعده.',
            },
            {
              id: 'provider-dependencies',
              label: 'اعتماديات الدفع والتحقق',
              responsibility:
                'تعتمد تكاملات الدفع والتحقق من الهوية على وصول موثوق للمزود وعقود وتوفر في السوق.',
              dependency: 'توثيق مزود مؤكد وبيانات اعتماد وموافقة السوق.',
              recovery: 'إبقاء الخطوة خلف مسار يدوي أو تجريبي حتى يتأكد وصول المزود.',
            },
            {
              id: 'decision-boundary',
              label: 'حدود القرار المالي',
              responsibility:
                'تملك المؤسسة قواعد الائتمان والمخاطر والأهلية، وينفذها النظام ويفسرها بدلاً من ابتكارها.',
              dependency: 'قواعد قرار وصياغة تفسير تعتمدها المؤسسة.',
              recovery: 'توجيه الحالات غير الواضحة إلى مراجعة بشرية بدلاً من عرض قرار آلي بلا مالك.',
            },
          ],
        },
        {
          id: 'fintech-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'مصمم لتمويل ثنائي اللغة',
          title: 'العربية والإنجليزية لغتا تشغيل، وليستا خطوة ترجمة أخيرة.',
          intro:
            'تُصاغ نصوص المنتج والموافقة والإفصاح وتفسيرات القرارات ورسائل الفريق لكل لغة، مع بقاء بنية نظام واحدة قابلة للمطابقة ثابتة.',
          items: [
            {
              id: 'bilingual-product',
              label: 'لغة مالية طبيعية',
              description:
                'تُكتب صياغة الحسابات والمدفوعات والإقراض وفق طريقة قراءة العملاء وفهمهم وتصرفهم في كل لغة، لا كترجمة لاحقة.',
            },
            {
              id: 'regulatory-disclosures',
              label: 'إفصاحات وموافقات موطنة',
              description:
                'تبقى الرسوم والشروط والموافقة والإفصاحات المطلوبة دقيقة ومقروءة في السياقين العربي والإنجليزي، تحت مالك مراجعة محدد.',
            },
            {
              id: 'market-dependencies',
              label: 'اعتماديات حسب السوق',
              description:
                'تُراجَع قنوات الدفع ومزودو التحقق والعملة والمتطلبات التنظيمية لكل سوق قبل تثبيت النطاق.',
            },
          ],
        },
        {
          id: 'fintech-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'أسئلة القرار',
          title: 'ما الذي تحتاج فرق التقنية المالية إلى حسمه أولاً؟',
          intro:
            'النطاق الأول المفيد هو مسار مكتمل قابل للمطابقة—من التسجيل إلى المعاملة، أو من المعاملة إلى التدقيق—مع تحديد أصحاب البيانات والقرار والتشغيل.',
          items: [
            {
              id: 'compliance-role',
              question: 'هل تجعل كلاود توبيا منتجنا ممتثلاً أو مرخّصاً؟',
              answer:
                'لا. نهندس النظام وننفذ الضوابط والسجلات ومسارات العمل التي يعتمدها مالك الامتثال والجهة التنظيمية لديكم. يبقى الترخيص والاعتماد والتصريح لدى مؤسستكم، ويجعل البناء تلك المتطلبات صريحة وقابلة للتتبع.',
            },
            {
              id: 'existing-core',
              question: 'هل يمكن ربط ذلك بالبنك الأساسي أو مزودي الدفع الحاليين؟',
              answer:
                'يُصمَّم حول الواجهات والحقول والوصول الذي يؤكده مزودوكم. نرسم البيانات المطلوبة والأنظمة المسؤولة ومصدر المطابقة والمسار اليدوي أو التجريبي البديل قبل الالتزام بتكامل مباشر.',
            },
            {
              id: 'security',
              question: 'كيف يُعالَج الأمان؟',
              answer:
                'يُهندَس الأمان في الأساس—تشفير أثناء النقل وفي التخزين، ووصول بحسب الأدوار، وإدارة للمفاتيح والأسرار، ومراقبة—بحسب سياسة الوصول والمعايير التي تعتمدها مؤسستكم، لا كطبقة تُضاف لاحقاً.',
            },
            {
              id: 'exception-scoping',
              question: 'كيف نحدد نطاق قوائم الاستثناءات؟',
              answer:
                'ابدؤوا بأنواع استثناءات محددة ومالكين ومتطلبات إثبات ومسار موثق للعودة إلى الرحلة الأساسية، حتى لا تصبح الأحداث الفاشلة أو المُعلَّمة أو المتنازع عليها طرقاً مسدودة صامتة.',
            },
            {
              id: 'explainable-decisions',
              question: 'هل يمكن للمنتج شرح القرارات المالية بوضوح؟',
              answer:
                'نعم. يمكن تصميم حالات القرار والإجراءات المطلوبة والتفسيرات المعتمدة ضمن واجهات العميل وفريق التشغيل، بحيث تكون نتيجة الموافقة أو المراجعة أو الرفض مقروءة وقابلة للتدقيق.',
            },
            {
              id: 'starting-point',
              question: 'من أين يبدأ فريق التقنية المالية؟',
              answer:
                'ابدؤوا بمسار واحد ذي قيمة عالية، وحددوا كل تسليم وسجل ومالك يمر بها، ثم ارسموا أصغر نطاق نظام قابل للمطابقة يدعمه من طرف إلى طرف قبل التوسع.',
            },
          ],
        },
        {
          id: 'fintech-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'اختاروا المسار الأول',
          title: 'اجعلوا مساراً واحداً قابلاً للمطابقة نقطة البداية.',
          intro:
            'أحضروا مساراً مالياً واحداً، والفرق والمزودين الذين يملكونه، والأنظمة التي يمر بها، وسنحوّل هذا السياق إلى موجز نظام تقنية مالية محدد النطاق قابل للبناء.',
          decisionCopy:
            'ابدؤوا بمسار مكتمل واحد قابل للمطابقة، لا بقائمة خصائص منفصلة.',
          primary: {
            label: 'لنرسم رحلة العميل من التسجيل إلى المعاملة',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: 'استكشفوا تطبيقات ويب التقنية المالية',
            serviceId: 'web-applications',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
