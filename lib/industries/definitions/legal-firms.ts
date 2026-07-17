import type { IndustryPageDefinition } from '@/lib/industries/types'

/**
 * Hand-authored Legal & Law-Firms "Industry World".
 *
 * The visible page (components/industry/legal-firms/LegalFirmsIndustryPage.tsx)
 * ports the Regalis (Designesia) template look and animations while presenting
 * CloudTopia's expertise BUILDING legal systems — case/matter management, secure
 * client portals, document automation and e-signature, intake and conflict
 * checks, and billing. This definition drives the hero, the service-bridge link
 * cards, the FAQ, and the JSON-LD / markdown / SEO surfaces; every other ported
 * visual section pulls its microcopy from legal-firms-content.ts.
 *
 * Framing rule: CloudTopia ENGINEERS legal systems — it is NOT a law firm and
 * gives no legal advice. Confidentiality, conflict, and matter boundaries are
 * IMPLEMENTED to the firm's approved rules; the firm and its authorized owners
 * retain the professional relationship, the advice, and every legal decision.
 */
export const legalFirmsDefinition = {
  slug: 'legal-firms',
  contentVersion: 'legal-firms-regalis-published-1',
  publicationStatus: 'published',
  updatedAt: '2026-07-17',
  world: {
    id: 'case-docket',
    theme: {
      // Derived from the Regalis scheme-01 palette: deep navy accent (#213449)
      // and a gold signal (#EAA638) on light, faint blue-grey surfaces.
      canvas: '#EBF0F6',
      surface: '#FFFFFF',
      elevatedSurface: '#DCE4EE',
      ink: '#1A2432',
      mutedInk: '#55606F',
      accent: '#213449',
      accentInk: '#FFFFFF',
      signal: '#EAA638',
      line: '#C7D2DF',
      focus: '#213449',
      displayTreatment: 'editorial',
      radiusMode: 'soft',
      motifDensity: 'medium',
      sceneTreatment: 'service-pass',
    },
    heroScene: 'legal-docket',
    heroTreatment: 'editorial-pass',
    signatureComposition: {
      id: 'confidential-threshold',
      name: {
        en: 'The confidential threshold',
        ar: 'عتبة السرية',
      },
      sectionIds: [
        'legal-matter-journey',
        'legal-confidential-lanes',
        'legal-platform-system',
      ],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'legal-docket' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/legal-firms/en.jpg',
      width: 1200,
      height: 630,
    },
    {
      kind: 'og-image',
      locale: 'ar',
      publicPath: '/og/industries/legal-firms/ar.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'Legal & Law-Firm System Engineering — Matters, Portals & Docs',
        description:
          'CloudTopia engineers bilingual legal systems: case and matter management, secure client portals, document automation and e-signature, intake and conflict checks, and billing—built around your firm’s confidentiality and conflict rules.',
      },
      breadcrumbLabel: 'Legal & Law Firms',
      hero: {
        worldLabel: 'Case Docket',
        eyebrow: 'Legal technology',
        h1: 'We engineer the systems your law firm runs its matters on.',
        intro:
          'CloudTopia designs and builds bilingual legal platforms—case and matter management, secure client portals, document automation and e-signature, intake and conflict checks, and billing—engineered around the confidentiality, conflict, and retention rules your firm approves.',
        primaryCta: {
          label: 'Review your legal client intake',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore legal system paths',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'Public practice information, pre-engagement intake, and authenticated matter communication stay on one controlled path with visible, separated boundaries.',
        sceneStages: [
          { id: 'practice', label: 'Find the practice', state: 'Public' },
          { id: 'suitability', label: 'Initial suitability check', state: 'Screened' },
          { id: 'intake', label: 'Confidential intake', state: 'Controlled' },
          { id: 'consultation', label: 'Consultation decision', state: 'Decided' },
          { id: 'matter', label: 'Matter communication', state: 'Authenticated' },
        ],
      },
      sections: [
        {
          id: 'legal-operating-pressure',
          type: 'pressure-field',
          variant: 'constraints-first',
          answers: ['operating-pressure'],
          eyebrow: 'Where trust and confidentiality are decided',
          title: 'A legal matter is judged before the first billable hour.',
          intro:
            'Prospective clients decide whether to trust a firm in the first conversation, while the firm must keep public information, confidential intake, and privileged matter work inside clearly separated, owned boundaries.',
          signals: [
            {
              id: 'intake-boundary',
              label: 'Intake is where confidentiality breaks first',
              description:
                'Public qualification and confidential detail are often collected through the same unbounded form or inbox, so privileged information lands where it should not and conflict checks come too late.',
            },
            {
              id: 'matter-integrity',
              label: 'Matters need a single, traceable record',
              description:
                'Documents, deadlines, communications, and time entries only hold up when each is recorded once, owned by a named role, and traceable back to the matter and the client it belongs to.',
            },
            {
              id: 'conflict-visibility',
              label: 'Conflicts and deadlines decide the real risk',
              description:
                'A missed conflict check or a silent limitation deadline is a professional-liability event, not a UI nicety—both need named owners, evidence, and an escalation path.',
            },
          ],
        },
        {
          id: 'legal-matter-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'From public enquiry to authenticated matter',
          title: 'One controlled path from first enquiry to the matter file.',
          intro:
            'The system carries a prospective client through an understandable legal sequence while keeping qualification, confidential intake, conflict decisions, and privileged communication inside owned, traceable states.',
          stages: [
            {
              id: 'practice',
              label: 'Find the practice',
              description:
                'The visitor meets approved, public practice-area information with no promise of advice, outcome, or an attorney–client relationship.',
              actor: 'Prospective client',
            },
            {
              id: 'suitability',
              label: 'Check initial suitability',
              description:
                'A bounded, non-privileged screen captures only what is needed to decide whether the enquiry is worth a confidential intake—before any privileged detail is collected.',
              actor: 'Intake team',
            },
            {
              id: 'intake',
              label: 'Open confidential intake',
              description:
                'Once the boundary is crossed with recorded consent, detailed facts and documents flow through an approved, access-controlled channel with clear retention rules.',
              actor: 'Prospective client and intake team',
            },
            {
              id: 'conflict',
              label: 'Run the conflict check',
              description:
                'Parties and matters are checked against the firm’s records so a conflict is surfaced with an owner and an evidence trail before an engagement can be offered.',
              actor: 'Conflicts and risk owners',
            },
            {
              id: 'consultation',
              label: 'Decide on engagement',
              description:
                'Accept, decline, or refer states are produced by rules the firm owns, each with wording the firm has approved and a record of what was communicated.',
              actor: 'Responsible attorney',
            },
            {
              id: 'matter',
              label: 'Run the matter',
              description:
                'Once engaged, documents, deadlines, communications, and time entries live in an authenticated matter workspace that authorized reviewers can follow end to end.',
              actor: 'Matter team and client',
            },
          ],
        },
        {
          id: 'legal-confidential-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'Signature composition',
          title: 'Trust appears where the client lane meets the confidentiality lane.',
          intro:
            'The experience is designed as two coordinated lanes: what the client sees and does, and the confidentiality, conflict, and ownership controls the firm must hold behind each visible step.',
          stages: [
            {
              id: 'practice',
              label: 'Public information',
              description: 'The client reads approved practice information while the firm keeps advice and relationship promises out of it.',
              actor: 'Prospective client',
            },
            {
              id: 'suitability',
              label: 'Non-privileged screen',
              description: 'Only bounded qualification data is captured before the confidential boundary is crossed.',
              actor: 'Intake team',
            },
            {
              id: 'intake',
              label: 'Confidential boundary',
              description: 'Both lanes agree on where privilege begins, with recorded consent and access-controlled storage.',
              actor: 'Client and intake team',
            },
            {
              id: 'conflict',
              label: 'Conflict evidence',
              description: 'The firm holds the conflict record and its evidence; the client sees only a clear next step.',
              actor: 'Conflicts and risk owners',
            },
            {
              id: 'consultation',
              label: 'Engagement decision',
              description: 'One decision state with firm-approved wording is shared across both lanes.',
              actor: 'Responsible attorney',
            },
            {
              id: 'matter',
              label: 'Authenticated matter',
              description: 'The client sees their matter view; the firm keeps the privileged, traceable record.',
              actor: 'Matter team and client',
            },
          ],
          lanes: [
            {
              id: 'client-lane',
              label: 'Client lane',
              stageIds: ['practice', 'suitability', 'intake', 'consultation', 'matter'],
            },
            {
              id: 'confidentiality-lane',
              label: 'Confidentiality and conflict lane',
              stageIds: ['suitability', 'intake', 'conflict', 'consultation', 'matter'],
            },
          ],
        },
        {
          id: 'legal-platform-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'A buildable boundary',
          title: 'A legal platform is a connected set of owned layers.',
          intro:
            'Scope can start with one flow—intake, or a single matter type—but every layer needs approved inputs, a named handoff, and an outcome the firm can review and defend.',
          layers: [
            {
              id: 'client-experience',
              label: 'Client experience and portal layer',
              description:
                'Bilingual public pages and an authenticated client portal guide enquiry, intake, document exchange, and matter updates with firm-approved wording and explicit relationship status.',
              inputs: ['Approved practice content', 'Consent and disclaimer copy', 'Role and access model'],
              handoff: 'A consented, authenticated client request',
              outcome: 'A client who knows their status and the next step',
            },
            {
              id: 'matter-core',
              label: 'Case and matter management layer',
              description:
                'Matters, parties, documents, deadlines, and communications are recorded once, linked to the right client, and tracked with owners, statuses, and an audit trail.',
              inputs: ['Matter and party model', 'Deadline and workflow rules', 'Retention policy'],
              handoff: 'A single authoritative matter record',
              outcome: 'A matter file a reviewer can trust and defend',
            },
            {
              id: 'documents-billing',
              label: 'Document automation, e-signature, and billing layer',
              description:
                'Engagement letters and pleadings are generated from approved templates, signed through an integrated e-signature flow, and tied to time capture and billing without re-keying.',
              inputs: ['Approved document templates', 'E-signature provider access', 'Time and fee rules'],
              handoff: 'An executed document linked to its matter and invoice',
              outcome: 'Traceable documents and bills the firm can reconcile',
            },
            {
              id: 'security-integration',
              label: 'Security, conflict, and integration layer',
              description:
                'Encryption, role-based access, conflict-check data, and bounded integrations keep privileged information verifiable and connected within limits the firm approves.',
              inputs: ['Access and key policy', 'Conflict and records sources', 'Approved provider interfaces'],
              handoff: 'A bounded, access-controlled data exchange',
              outcome: 'A connected platform that stays inside its confidentiality controls',
            },
          ],
        },
        {
          id: 'legal-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'Paths to implementation',
          title: 'Choose the build paths that assemble the platform.',
          intro:
            'The final combination depends on the flow you prioritize, the practice-management tools you already use, and the smallest complete, defensible handoff worth building first.',
          serviceIds: [
            'web-applications',
            'business-systems-development',
            'website-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'web-applications',
              label: 'Client portals and matter-management applications',
            },
            {
              serviceId: 'business-systems-development',
              label: 'Intake, conflict-check, and billing systems',
            },
            {
              serviceId: 'website-development',
              label: 'Law-firm websites and secure intake front doors',
            },
            {
              serviceId: 'content-creation',
              label: 'Bilingual legal content and approved disclaimers',
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
              label: 'Explore regulatory and public filing platforms',
            },
          ],
        },
        {
          id: 'legal-confidential-threshold',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Evidence and responsibility',
          title: 'The design makes the confidential threshold explicit.',
          intro:
            'This page describes a proposed engineering model, not legal advice, a law license, or a promise of any outcome. Advice, professional judgement, conflict clearance, and the attorney–client relationship remain with the firm and its authorized owners.',
          items: [
            {
              id: 'relationship-boundary',
              label: 'No advice, no implied relationship',
              responsibility:
                'Status, consent, and engagement wording are approved by the firm and stay explicit throughout the journey; the platform never implies an attorney–client relationship or gives advice.',
              dependency: 'Firm-approved intake, disclaimer, and engagement wording.',
              recovery: 'Hold the enquiry at the public boundary and route wording questions back to the firm before launch.',
            },
            {
              id: 'confidentiality-ownership',
              label: 'Confidential intake and privilege',
              responsibility:
                'The boundary between public qualification and privileged detail is marked in the design, and confidential data is captured only through the approved, access-controlled channel.',
              dependency: 'An approved data-ownership, retention, and access map.',
              recovery: 'Keep any confidential record isolated and access-restricted until its rules are confirmed.',
            },
            {
              id: 'conflict-clearance',
              label: 'Conflict checks stay the firm’s decision',
              responsibility:
                'The system runs and records conflict checks against firm-owned data, but clearance and the decision to engage remain a professional judgement the firm owns.',
              dependency: 'Firm conflict data, rules, and a named clearance owner.',
              recovery: 'Block engagement until a named owner records conflict clearance.',
            },
            {
              id: 'deadline-ownership',
              label: 'Deadlines and documents have owners',
              responsibility:
                'Every deadline, document, and matter update needs a project-defined role, retention rule, and escalation owner—the system records them, it does not replace professional supervision.',
              dependency: 'Defined roles, retention rules, and escalation ownership.',
              recovery: 'Escalate any unowned deadline or document to the responsible attorney.',
            },
          ],
        },
        {
          id: 'legal-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'Built for bilingual practice',
          title: 'Arabic and English are operating languages, not a final translation step.',
          intro:
            'Practice wording, intake questions, consent and disclaimer copy, and client messages are authored for each language while one shared, defensible matter structure stays constant.',
          items: [
            {
              id: 'bilingual-intake',
              label: 'Native legal language',
              description:
                'Intake questions, status messages, and portal wording are written for how clients read and act in each language—right-to-left and left-to-right—not translated after the fact.',
            },
            {
              id: 'approved-disclaimers',
              label: 'Approved disclaimers and consent',
              description:
                'Relationship, confidentiality, and consent wording stays accurate and readable in both languages under a named review owner at the firm.',
            },
            {
              id: 'jurisdiction-dependencies',
              label: 'Jurisdiction-by-jurisdiction dependencies',
              description:
                'Deadline rules, e-signature acceptance, retention requirements, and court integrations are checked per jurisdiction before scope is fixed.',
            },
          ],
        },
        {
          id: 'legal-faq',
          type: 'faq',
          variant: 'grouped-questions',
          answers: [],
          eyebrow: 'Decision questions',
          title: 'What legal teams usually need to decide first.',
          intro:
            'A useful first scope is one complete, defensible flow—public enquiry to conflict-checked intake, or a single matter type from open to bill—with named data, decision, and supervision owners.',
          items: [
            {
              id: 'gives-advice',
              question: 'Does the platform give legal advice or create a client relationship?',
              answer:
                'No. It presents firm-approved information and captures intake through an approved channel. Status, consent, and engagement wording stay explicit, and the attorney–client relationship, advice, and every legal decision remain with your firm.',
            },
            {
              id: 'confidential-start',
              question: 'Where does confidential intake begin?',
              answer:
                'The design marks the boundary between public qualification and the approved, access-controlled channel used for confidential detail and documents—so privileged information is never collected through an unbounded public form.',
            },
            {
              id: 'existing-pms',
              question: 'Can this connect to our existing practice-management tools?',
              answer:
                'It is designed around the interfaces, fields, and access your tools confirm. We map the required data, responsible systems, and a manual or sandboxed fallback before committing to a live integration with billing, e-signature, or court systems.',
            },
            {
              id: 'conflicts',
              question: 'How are conflict checks handled?',
              answer:
                'The system runs and records conflict checks against your firm-owned data and surfaces results with an owner and an evidence trail. Clearance and the decision to engage stay a professional judgement your firm owns.',
            },
            {
              id: 'security',
              question: 'How is confidentiality and security handled?',
              answer:
                'Security is engineered into the foundation—encryption in transit and at rest, role-based access, key management, and audit trails—scoped to the access policy your firm approves, not added as a later layer.',
            },
            {
              id: 'starting-point',
              question: 'Where should a firm begin?',
              answer:
                'Begin with one high-value flow, identify every handoff, record, deadline, and owner it touches, then define the smallest defensible matter boundary that supports it end to end before expanding.',
            },
          ],
        },
        {
          id: 'legal-consultation',
          type: 'closing-cta',
          variant: 'split-close',
          answers: ['decision-close'],
          eyebrow: 'Choose the first flow',
          title: 'Make one defensible flow the starting point.',
          intro:
            'Bring one legal flow, the people who own confidentiality and conflicts, and the tools it touches. We will turn that context into a bounded, buildable legal-system brief.',
          decisionCopy:
            'Start with one complete, defensible flow rather than a list of disconnected features.',
          primary: {
            label: 'Review your legal client intake',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore client portals and matter apps',
            serviceId: 'web-applications',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'هندسة أنظمة المكاتب القانونية — القضايا والبوابات والمستندات',
        description:
          'تهندس كلاود توبيا أنظمة قانونية ثنائية اللغة: إدارة القضايا والملفات، وبوابات عملاء آمنة، وأتمتة المستندات والتوقيع الإلكتروني، واستقبال العملاء وفحص تعارض المصالح، والفوترة—مبنية حول قواعد السرية وتعارض المصالح التي يعتمدها مكتبكم.',
      },
      breadcrumbLabel: 'المكاتب القانونية',
      hero: {
        worldLabel: 'سجل القضية',
        eyebrow: 'التقنية القانونية',
        h1: 'نهندس الأنظمة التي يدير عليها مكتبكم القانوني قضاياه.',
        intro:
          'تصمم كلاود توبيا وتبني منصات قانونية ثنائية اللغة—إدارة القضايا والملفات، وبوابات عملاء آمنة، وأتمتة المستندات والتوقيع الإلكتروني، واستقبال العملاء وفحص تعارض المصالح، والفوترة—مهندَسة حول قواعد السرية وتعارض المصالح والاحتفاظ التي يعتمدها مكتبكم.',
        primaryCta: {
          label: 'راجعوا مسار استقبال العملاء القانوني',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشفوا مسارات الأنظمة القانونية',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'تبقى المعلومات العامة عن الممارسة، والاستقبال قبل الارتباط، وتواصل القضية الموثق على مسار واحد منضبط بحدود ظاهرة ومنفصلة.',
        sceneStages: [
          { id: 'practice', label: 'تحديد مجال الممارسة', state: 'عام' },
          { id: 'suitability', label: 'التحقق الأولي من الملاءمة', state: 'مفحوص' },
          { id: 'intake', label: 'الاستقبال السري', state: 'منضبط' },
          { id: 'consultation', label: 'قرار الاستشارة', state: 'محسوم' },
          { id: 'matter', label: 'تواصل القضية', state: 'موثق' },
        ],
      },
      sections: [
        {
          id: 'legal-operating-pressure',
          type: 'pressure-field',
          variant: 'constraints-first',
          answers: ['operating-pressure'],
          eyebrow: 'حيث تُحسم الثقة والسرية',
          title: 'يُحكم على القضية القانونية قبل أول ساعة عمل مفوترة.',
          intro:
            'يقرر العملاء المحتملون الثقة بالمكتب في المحادثة الأولى، بينما يجب على المكتب إبقاء المعلومات العامة والاستقبال السري وعمل القضية المشمول بالسرية ضمن حدود منفصلة وواضحة الملكية.',
          signals: [
            {
              id: 'intake-boundary',
              label: 'الاستقبال هو أول ما تنكسر عنده السرية',
              description:
                'كثيراً ما يُجمع التأهيل العام والتفاصيل السرية عبر النموذج أو البريد نفسه بلا حدود، فتصل المعلومات المشمولة بالسرية إلى حيث لا ينبغي، ويأتي فحص تعارض المصالح متأخراً.',
            },
            {
              id: 'matter-integrity',
              label: 'تحتاج القضايا إلى سجل واحد قابل للتتبع',
              description:
                'لا تصمد المستندات والمواعيد والمراسلات وقيود الوقت إلا حين يُسجَّل كل منها مرة واحدة، بمالك محدد، وقابلاً للتتبع إلى القضية والعميل الذي تخصه.',
            },
            {
              id: 'conflict-visibility',
              label: 'تعارض المصالح والمواعيد هما ما يحدد المخاطر الحقيقية',
              description:
                'فوات فحص تعارض المصالح أو موعد تقادم صامت هو حدث مسؤولية مهنية، لا مجرد تفصيل في الواجهة—وكلاهما يحتاج مالكين محددين وأدلة ومسار تصعيد.',
            },
          ],
        },
        {
          id: 'legal-matter-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'من الاستفسار العام إلى القضية الموثقة',
          title: 'مسار واحد منضبط من أول استفسار إلى ملف القضية.',
          intro:
            'يحمل النظام العميل المحتمل عبر تسلسل قانوني مفهوم، مع إبقاء التأهيل والاستقبال السري وقرارات تعارض المصالح والتواصل المشمول بالسرية ضمن حالات مملوكة قابلة للتتبع.',
          stages: [
            {
              id: 'practice',
              label: 'تحديد مجال الممارسة',
              description:
                'يطّلع الزائر على معلومات عامة معتمدة عن مجالات الممارسة، دون وعد باستشارة أو نتيجة أو علاقة مهنية.',
              actor: 'العميل المحتمل',
            },
            {
              id: 'suitability',
              label: 'التحقق من الملاءمة الأولية',
              description:
                'تلتقط شاشة محدودة وغير مشمولة بالسرية فقط ما يلزم لتقرير ما إذا كان الاستفسار يستحق استقبالاً سرياً—قبل جمع أي تفصيل مشمول بالسرية.',
              actor: 'فريق الاستقبال',
            },
            {
              id: 'intake',
              label: 'فتح الاستقبال السري',
              description:
                'بمجرد تجاوز الحد بموافقة مسجلة، تتدفق الوقائع التفصيلية والمستندات عبر قناة معتمدة مضبوطة الوصول بقواعد احتفاظ واضحة.',
              actor: 'العميل المحتمل وفريق الاستقبال',
            },
            {
              id: 'conflict',
              label: 'إجراء فحص تعارض المصالح',
              description:
                'تُفحص الأطراف والقضايا مقابل سجلات المكتب ليظهر أي تعارض بمالك ومسار أدلة قبل عرض الارتباط.',
              actor: 'أصحاب تعارض المصالح والمخاطر',
            },
            {
              id: 'consultation',
              label: 'قرار الارتباط',
              description:
                'تنتج حالات القبول أو الرفض أو الإحالة عن قواعد يملكها المكتب، لكل منها صياغة اعتمدها المكتب وسجل لما جرى إبلاغه.',
              actor: 'المحامي المسؤول',
            },
            {
              id: 'matter',
              label: 'إدارة القضية',
              description:
                'بعد الارتباط، تعيش المستندات والمواعيد والمراسلات وقيود الوقت في مساحة عمل موثقة للقضية يمكن للمراجعين المخولين متابعتها من طرف إلى طرف.',
              actor: 'فريق القضية والعميل',
            },
          ],
        },
        {
          id: 'legal-confidential-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'التكوين المميز',
          title: 'تظهر الثقة عند التقاء مسار العميل بمسار السرية.',
          intro:
            'تُصمم التجربة كمسارين متناسقين: ما يراه العميل ويفعله، وضوابط السرية وتعارض المصالح والملكية التي يجب أن يحتفظ بها المكتب خلف كل خطوة ظاهرة.',
          stages: [
            {
              id: 'practice',
              label: 'المعلومات العامة',
              description: 'يقرأ العميل معلومات ممارسة معتمدة بينما يُبقي المكتب الاستشارة ووعود العلاقة خارجها.',
              actor: 'العميل المحتمل',
            },
            {
              id: 'suitability',
              label: 'شاشة غير سرية',
              description: 'لا تُلتقط سوى بيانات تأهيل محدودة قبل تجاوز حد السرية.',
              actor: 'فريق الاستقبال',
            },
            {
              id: 'intake',
              label: 'حد السرية',
              description: 'يتفق المساران على أين تبدأ السرية، بموافقة مسجلة وتخزين مضبوط الوصول.',
              actor: 'العميل وفريق الاستقبال',
            },
            {
              id: 'conflict',
              label: 'أدلة تعارض المصالح',
              description: 'يحتفظ المكتب بسجل تعارض المصالح وأدلته، ويرى العميل خطوة تالية واضحة فقط.',
              actor: 'أصحاب تعارض المصالح والمخاطر',
            },
            {
              id: 'consultation',
              label: 'قرار الارتباط',
              description: 'تُشارك حالة قرار واحدة بصياغة يعتمدها المكتب عبر المسارين.',
              actor: 'المحامي المسؤول',
            },
            {
              id: 'matter',
              label: 'قضية موثقة',
              description: 'يرى العميل واجهة قضيته، ويحتفظ المكتب بالسجل المشمول بالسرية والقابل للتتبع.',
              actor: 'فريق القضية والعميل',
            },
          ],
          lanes: [
            {
              id: 'client-lane',
              label: 'مسار العميل',
              stageIds: ['practice', 'suitability', 'intake', 'consultation', 'matter'],
            },
            {
              id: 'confidentiality-lane',
              label: 'مسار السرية وتعارض المصالح',
              stageIds: ['suitability', 'intake', 'conflict', 'consultation', 'matter'],
            },
          ],
        },
        {
          id: 'legal-platform-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'نطاق قابل للبناء',
          title: 'المنصة القانونية مجموعة مترابطة من الطبقات ذات الملكية الواضحة.',
          intro:
            'يمكن أن يبدأ النطاق بمسار واحد—الاستقبال، أو نوع قضية واحد—لكن كل طبقة تحتاج إلى مدخلات معتمدة وتسليم محدد ونتيجة يستطيع المكتب مراجعتها والدفاع عنها.',
          layers: [
            {
              id: 'client-experience',
              label: 'طبقة تجربة العميل والبوابة',
              description:
                'توجه صفحات عامة ثنائية اللغة وبوابة عميل موثقة الاستفسار والاستقبال وتبادل المستندات وتحديثات القضية بصياغة يعتمدها المكتب وحالة علاقة صريحة.',
              inputs: ['محتوى ممارسة معتمد', 'نصوص الموافقة وإخلاء المسؤولية', 'نموذج الأدوار والوصول'],
              handoff: 'طلب عميل موافَق عليه وموثق',
              outcome: 'عميل يعرف حالته وخطوته التالية',
            },
            {
              id: 'matter-core',
              label: 'طبقة إدارة القضايا والملفات',
              description:
                'تُسجَّل القضايا والأطراف والمستندات والمواعيد والمراسلات مرة واحدة، وتُربط بالعميل الصحيح، وتُتابع بمالكين وحالات وسجل تدقيق.',
              inputs: ['نموذج القضية والأطراف', 'قواعد المواعيد وسير العمل', 'سياسة الاحتفاظ'],
              handoff: 'سجل قضية مرجعي واحد',
              outcome: 'ملف قضية يثق به المراجع ويدافع عنه',
            },
            {
              id: 'documents-billing',
              label: 'طبقة أتمتة المستندات والتوقيع الإلكتروني والفوترة',
              description:
                'تُنشأ خطابات الارتباط والمذكرات من قوالب معتمدة، وتُوقَّع عبر مسار توقيع إلكتروني متكامل، وتُربط بالتقاط الوقت والفوترة دون إعادة إدخال.',
              inputs: ['قوالب مستندات معتمدة', 'وصول مزود التوقيع الإلكتروني', 'قواعد الوقت والأتعاب'],
              handoff: 'مستند موقّع مرتبط بقضيته وفاتورته',
              outcome: 'مستندات وفواتير قابلة للتتبع يستطيع المكتب مطابقتها',
            },
            {
              id: 'security-integration',
              label: 'طبقة الأمان وتعارض المصالح والتكامل',
              description:
                'يحافظ التشفير والوصول بحسب الأدوار وبيانات فحص تعارض المصالح والتكاملات المحدودة على معلومات مشمولة بالسرية قابلة للتحقق ومترابطة ضمن حدود يعتمدها المكتب.',
              inputs: ['سياسة الوصول والمفاتيح', 'مصادر تعارض المصالح والسجلات', 'واجهات مزودين معتمدة'],
              handoff: 'تبادل بيانات محدود ومضبوط الوصول',
              outcome: 'منصة مترابطة تبقى ضمن ضوابط سريتها',
            },
          ],
        },
        {
          id: 'legal-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'اختاروا مسارات البناء التي تجمع المنصة.',
          intro:
            'يتحدد المزيج النهائي بحسب المسار الذي تعطونه الأولوية، وأدوات إدارة الممارسة التي تستخدمونها أصلاً، وأصغر تسليم متكامل قابل للدفاع يستحق البناء أولاً.',
          serviceIds: [
            'web-applications',
            'business-systems-development',
            'website-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'web-applications',
              label: 'بوابات العملاء وتطبيقات إدارة القضايا',
            },
            {
              serviceId: 'business-systems-development',
              label: 'أنظمة الاستقبال وفحص تعارض المصالح والفوترة',
            },
            {
              serviceId: 'website-development',
              label: 'مواقع المكاتب القانونية وواجهات استقبال آمنة',
            },
            {
              serviceId: 'content-creation',
              label: 'محتوى قانوني وإخلاءات مسؤولية معتمدة ثنائية اللغة',
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
              label: 'استكشفوا منصات الجهات التنظيمية والإيداعات الحكومية',
            },
          ],
        },
        {
          id: 'legal-confidential-threshold',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'الأدلة والمسؤوليات',
          title: 'يجعل التصميم عتبة السرية صريحة.',
          intro:
            'تصف الصفحة نموذج هندسة مقترحاً، لا استشارة قانونية ولا ترخيص محاماة ولا وعداً بأي نتيجة. تبقى الاستشارة والحكم المهني وإجازة تعارض المصالح والعلاقة المهنية لدى المكتب وأصحاب الاختصاص المخولين.',
          items: [
            {
              id: 'relationship-boundary',
              label: 'لا استشارة ولا علاقة ضمنية',
              responsibility:
                'يعتمد المكتب صياغة الحالة والموافقة والارتباط وتبقى صريحة طوال الرحلة؛ ولا توحي المنصة أبداً بعلاقة مهنية ولا تقدم استشارة.',
              dependency: 'صياغة استقبال وإخلاء مسؤولية وارتباط يعتمدها المكتب.',
              recovery: 'إبقاء الاستفسار عند الحد العام وإعادة أسئلة الصياغة إلى المكتب قبل الإطلاق.',
            },
            {
              id: 'confidentiality-ownership',
              label: 'الاستقبال السري والسرية المهنية',
              responsibility:
                'يُحدَّد في التصميم الحد بين التأهيل العام والتفصيل المشمول بالسرية، ولا تُلتقط البيانات السرية إلا عبر القناة المعتمدة مضبوطة الوصول.',
              dependency: 'خريطة معتمدة لملكية البيانات والاحتفاظ والوصول.',
              recovery: 'إبقاء أي سجل سري معزولاً ومقيَّد الوصول حتى تتأكد قواعده.',
            },
            {
              id: 'conflict-clearance',
              label: 'يبقى فحص تعارض المصالح قرار المكتب',
              responsibility:
                'يجري النظام فحوص تعارض المصالح ويسجّلها مقابل بيانات يملكها المكتب، لكن الإجازة وقرار الارتباط يبقيان حكماً مهنياً يملكه المكتب.',
              dependency: 'بيانات وقواعد تعارض المصالح ومالك محدد للإجازة.',
              recovery: 'منع الارتباط حتى يسجّل مالك محدد إجازة تعارض المصالح.',
            },
            {
              id: 'deadline-ownership',
              label: 'للمواعيد والمستندات مالكون',
              responsibility:
                'يحتاج كل موعد ومستند وتحديث قضية إلى دور محدد للمشروع وقاعدة احتفاظ ومالك تصعيد—يسجّلها النظام ولا يحل محل الإشراف المهني.',
              dependency: 'أدوار محددة وقواعد احتفاظ وملكية للتصعيد.',
              recovery: 'تصعيد أي موعد أو مستند بلا مالك إلى المحامي المسؤول.',
            },
          ],
        },
        {
          id: 'legal-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'مصمم لممارسة ثنائية اللغة',
          title: 'العربية والإنجليزية لغتا تشغيل، وليستا خطوة ترجمة أخيرة.',
          intro:
            'تُصاغ نصوص الممارسة وأسئلة الاستقبال ونصوص الموافقة وإخلاء المسؤولية ورسائل العملاء لكل لغة، مع بقاء بنية قضية واحدة قابلة للدفاع ثابتة.',
          items: [
            {
              id: 'bilingual-intake',
              label: 'لغة قانونية طبيعية',
              description:
                'تُكتب أسئلة الاستقبال ورسائل الحالة ونصوص البوابة وفق طريقة قراءة العملاء وتصرفهم في كل لغة—من اليمين ومن اليسار—لا كترجمة لاحقة.',
            },
            {
              id: 'approved-disclaimers',
              label: 'إخلاءات مسؤولية وموافقات معتمدة',
              description:
                'تبقى صياغة العلاقة والسرية والموافقة دقيقة ومقروءة في اللغتين تحت مالك مراجعة محدد في المكتب.',
            },
            {
              id: 'jurisdiction-dependencies',
              label: 'اعتماديات حسب الاختصاص القضائي',
              description:
                'تُراجَع قواعد المواعيد وقبول التوقيع الإلكتروني ومتطلبات الاحتفاظ وتكاملات المحاكم لكل اختصاص قبل تثبيت النطاق.',
            },
          ],
        },
        {
          id: 'legal-faq',
          type: 'faq',
          variant: 'grouped-questions',
          answers: [],
          eyebrow: 'أسئلة القرار',
          title: 'ما الذي تحتاج الفرق القانونية إلى حسمه أولاً؟',
          intro:
            'النطاق الأول المفيد هو مسار مكتمل قابل للدفاع—من الاستفسار العام إلى استقبال مفحوص لتعارض المصالح، أو نوع قضية واحد من الفتح إلى الفوترة—مع تحديد أصحاب البيانات والقرار والإشراف.',
          items: [
            {
              id: 'gives-advice',
              question: 'هل تقدم المنصة استشارة قانونية أو تنشئ علاقة مهنية؟',
              answer:
                'لا. تعرض معلومات يعتمدها المكتب وتلتقط الاستقبال عبر قناة معتمدة. تبقى صياغة الحالة والموافقة والارتباط صريحة، وتبقى العلاقة المهنية والاستشارة وكل قرار قانوني لدى مكتبكم.',
            },
            {
              id: 'confidential-start',
              question: 'أين يبدأ الاستقبال السري؟',
              answer:
                'يوضح التصميم الحد بين التأهيل العام والقناة المعتمدة مضبوطة الوصول المستخدمة للتفاصيل والمستندات السرية—فلا تُجمع المعلومات المشمولة بالسرية أبداً عبر نموذج عام بلا حدود.',
            },
            {
              id: 'existing-pms',
              question: 'هل يمكن ربط ذلك بأدوات إدارة الممارسة الحالية لدينا؟',
              answer:
                'يُصمَّم حول الواجهات والحقول والوصول الذي تؤكده أدواتكم. نرسم البيانات المطلوبة والأنظمة المسؤولة ومساراً يدوياً أو تجريبياً بديلاً قبل الالتزام بتكامل مباشر مع الفوترة أو التوقيع الإلكتروني أو أنظمة المحاكم.',
            },
            {
              id: 'conflicts',
              question: 'كيف تُدار فحوص تعارض المصالح؟',
              answer:
                'يجري النظام فحوص تعارض المصالح ويسجّلها مقابل بيانات يملكها مكتبكم ويظهر النتائج بمالك ومسار أدلة. تبقى الإجازة وقرار الارتباط حكماً مهنياً يملكه مكتبكم.',
            },
            {
              id: 'security',
              question: 'كيف تُعالَج السرية والأمان؟',
              answer:
                'يُهندَس الأمان في الأساس—تشفير أثناء النقل وفي التخزين، ووصول بحسب الأدوار، وإدارة للمفاتيح، وسجلات تدقيق—بحسب سياسة الوصول التي يعتمدها مكتبكم، لا كطبقة تُضاف لاحقاً.',
            },
            {
              id: 'starting-point',
              question: 'من أين يبدأ المكتب؟',
              answer:
                'ابدؤوا بمسار واحد ذي قيمة عالية، وحددوا كل تسليم وسجل وموعد ومالك يمر بها، ثم ارسموا أصغر حد قضية قابل للدفاع يدعمه من طرف إلى طرف قبل التوسع.',
            },
          ],
        },
        {
          id: 'legal-consultation',
          type: 'closing-cta',
          variant: 'split-close',
          answers: ['decision-close'],
          eyebrow: 'اختاروا المسار الأول',
          title: 'اجعلوا مساراً واحداً قابلاً للدفاع نقطة البداية.',
          intro:
            'أحضروا مساراً قانونياً واحداً، ومن يملكون السرية وتعارض المصالح، والأدوات التي يمر بها، وسنحوّل هذا السياق إلى موجز نظام قانوني محدد النطاق قابل للبناء.',
          decisionCopy:
            'ابدؤوا بمسار مكتمل واحد قابل للدفاع، لا بقائمة خصائص منفصلة.',
          primary: {
            label: 'راجعوا مسار استقبال العملاء القانوني',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: 'استكشفوا بوابات العملاء وتطبيقات القضايا',
            serviceId: 'web-applications',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
