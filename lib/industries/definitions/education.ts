import type { IndustryPageDefinition } from '@/lib/industries/types'

/**
 * Hand-authored Education "Industry World".
 *
 * The visible page (components/industry/education/EducationIndustryPage.tsx)
 * ports the Learnit (Gramentheme) education-template look while presenting
 * CloudTopia's expertise BUILDING education & LMS platforms — course delivery,
 * student/teacher portals, enrollment, assessments & grading, virtual
 * classrooms, and admin dashboards. This definition drives the hero, the
 * service-bridge link cards, the FAQ, and the JSON-LD / markdown / SEO
 * surfaces. Every other ported visual section pulls its microcopy from
 * education-content.ts.
 *
 * Framing rule: CloudTopia ENGINEERS learning systems — it is NOT a school,
 * academy, or accreditation body. Accreditation, certification, and
 * learning-outcome wording always SUPPORT an institution-approved process;
 * the platform never certifies or awards it.
 */
export const educationDefinition = {
  slug: 'education',
  contentVersion: 'education-learnit-published-1',
  publicationStatus: 'published',
  updatedAt: '2026-07-17',
  world: {
    id: 'learning-constellation',
    theme: {
      // Derived from the Learnit palette: single mint-green accent (#2eb97e)
      // on white and cool-grey surfaces. `accent` keeps the template mint for
      // fills/highlights; `signal` is the AA-safe deep emerald used for text.
      canvas: '#FFFFFF',
      surface: '#FFFFFF',
      elevatedSurface: '#EEF2F3',
      ink: '#181818',
      mutedInk: '#5A5A5A',
      accent: '#2EB97E',
      accentInk: '#0B231A',
      signal: '#157A4F',
      line: '#E5E5E5',
      focus: '#157A4F',
      displayTreatment: 'editorial',
      radiusMode: 'soft',
      motifDensity: 'medium',
      sceneTreatment: 'pulse-corridor',
    },
    heroScene: 'education-constellation',
    heroTreatment: 'corridor-split',
    signatureComposition: {
      id: 'one-journey-many-roles',
      name: {
        en: 'One journey, many roles',
        ar: 'رحلة واحدة، أدوار متعددة',
      },
      sectionIds: [
        'education-role-lanes',
        'education-learning-journey',
        'education-platform-system',
      ],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'education-constellation' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/education/en.jpg',
      width: 1200,
      height: 630,
    },
    {
      kind: 'og-image',
      locale: 'ar',
      publicPath: '/og/industries/education/ar.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'Education Platform Engineering — LMS, Enrollment & Assessment',
        description:
          'CloudTopia engineers bilingual education systems: learning management platforms, student and teacher portals, enrollment and admissions, assessment and grading, virtual classrooms, and admin dashboards.',
      },
      breadcrumbLabel: 'Education',
      hero: {
        worldLabel: 'Learning Constellation',
        eyebrow: 'Learning and enrollment systems',
        h1: 'We build the education platforms your learners and staff rely on.',
        intro:
          'CloudTopia designs and builds bilingual education systems—learning management, student and teacher portals, enrollment and admissions, assessment and grading, virtual classrooms, and admin dashboards—from the first application through every lesson, submission, and record.',
        primaryCta: {
          label: 'Map your learning experience',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore education platform paths',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'Discovery, enrollment, learning, assessment, and completion stay connected on one journey while every role keeps only the view it is permitted to see.',
        sceneStages: [
          { id: 'discover', label: 'Discover a program', state: 'Understood' },
          { id: 'enroll', label: 'Apply and enroll', state: 'Confirmed' },
          { id: 'learn', label: 'Learn', state: 'Active' },
          { id: 'assess', label: 'Assess progress', state: 'Visible' },
          { id: 'complete', label: 'Complete', state: 'Recorded' },
        ],
      },
      sections: [
        {
          id: 'education-operating-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'Where learning platforms strain',
          title: 'An education platform is judged by more than its content.',
          intro:
            'Learners decide whether a program feels manageable in the first few screens, while institutions need enrollment, teaching, and assessment to stay connected across many roles without records drifting apart.',
          signals: [
            {
              id: 'onboarding-friction',
              label: 'Enrollment is where learners drop first',
              description:
                'Discovery, application, document collection, payment, and status updates are often split across disconnected tools, so applicants stall and staff lose track of who reached which step.',
            },
            {
              id: 'role-fragmentation',
              label: 'Many roles need one consistent record',
              description:
                'Learners, teachers, guardians, and administrators each need their own view, yet enrollment, progress, and grades must stay reconciled behind them—not copied between spreadsheets.',
            },
            {
              id: 'assessment-integrity',
              label: 'Assessment and completion must be defensible',
              description:
                'Submissions, grades, and completion states only hold up when each is recorded once, owned by a named role, and given a clear correction path when something is disputed.',
            },
          ],
        },
        {
          id: 'education-learning-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'From discovery to completion',
          title: 'One connected path from a first visit to a recorded result.',
          intro:
            'The system carries a learner through an understandable sequence while keeping enrollment decisions, learning activity, and assessment records inside owned, traceable states.',
          stages: [
            {
              id: 'discover',
              label: 'Discover a program',
              description:
                'A prospective learner meets an approved program description, requirements, and outcomes, with enough clarity to decide whether to apply.',
              actor: 'Prospective learner',
            },
            {
              id: 'enroll',
              label: 'Apply and enroll',
              description:
                'Application, document upload, eligibility checks, and payment are collected in one flow, with each step stored against a clear owner and status.',
              actor: 'Learner and admissions team',
            },
            {
              id: 'learn',
              label: 'Learn and participate',
              description:
                'Courses, lessons, resources, and virtual classrooms are delivered to the learner while teachers manage cohorts, materials, and communication.',
              actor: 'Learner and teacher',
            },
            {
              id: 'assess',
              label: 'Assess and grade',
              description:
                'Assignments, quizzes, and exams are submitted, graded, and returned with feedback, each recorded once and owned by a named teacher or examiner.',
              actor: 'Teacher and examiner',
            },
            {
              id: 'complete',
              label: 'Complete and record',
              description:
                'Progress, results, and completion states are reconciled into an institution-owned record the learner and administrators can trust.',
              actor: 'Administration',
            },
            {
              id: 'support',
              label: 'Support and review',
              description:
                'Questions, corrections, and appeals route to a named queue with the evidence and next action needed to return the learner to the main journey.',
              actor: 'Support and academic-review team',
            },
          ],
        },
        {
          id: 'education-role-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'Signature composition',
          title: 'One journey stays consistent while each role sees only its lane.',
          intro:
            'The experience is designed as coordinated lanes: what the learner does and sees, and the ownership, evidence, and controls the institution holds behind each visible step.',
          stages: [
            {
              id: 'discover',
              label: 'Program discovery',
              description: 'The learner reads an approved description while the institution owns its accuracy and version.',
              actor: 'Learner',
            },
            {
              id: 'enroll',
              label: 'Enrollment and eligibility',
              description: 'Applications and documents are bounded to approved fields, roles, and retention rules.',
              actor: 'Admissions owners',
            },
            {
              id: 'learn',
              label: 'Teaching and learning',
              description: 'Both lanes share one cohort and content model with role-appropriate views.',
              actor: 'Learner and teacher',
            },
            {
              id: 'assess',
              label: 'Assessment record',
              description: 'A single recorded submission and grade keeps the learner view and the gradebook reconciled.',
              actor: 'Teacher and learner',
            },
            {
              id: 'complete',
              label: 'Completion ownership',
              description: 'Results roll up into an institution-owned record with a defined correction path.',
              actor: 'Administration',
            },
            {
              id: 'support',
              label: 'Support and appeal trail',
              description: 'The learner sees the outcome; the institution keeps the traceable review record.',
              actor: 'Academic-review team',
            },
          ],
          lanes: [
            {
              id: 'learner-lane',
              label: 'Learner lane',
              stageIds: ['discover', 'enroll', 'learn', 'assess', 'complete'],
            },
            {
              id: 'institution-lane',
              label: 'Institution and staff lane',
              stageIds: ['enroll', 'learn', 'assess', 'complete', 'support'],
            },
          ],
        },
        {
          id: 'education-platform-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'A buildable boundary',
          title: 'A learning platform is a connected set of owned layers.',
          intro:
            'Scope can start with one flow—enrollment or a single course experience—but every layer needs approved inputs, a named handoff, and a record the institution can reconcile and review.',
          layers: [
            {
              id: 'experience-layer',
              label: 'Learner and staff experience layer',
              description:
                'Bilingual web and application interfaces guide discovery, enrollment, learning, and teaching with role-appropriate dashboards and clear status.',
              inputs: ['Approved program content', 'Role and permission model', 'Accessibility requirements'],
              handoff: 'A recorded, role-scoped action',
              outcome: 'A learner or teacher who understands the next step',
            },
            {
              id: 'enrollment-layer',
              label: 'Enrollment and student-information layer',
              description:
                'Applications, documents, eligibility, payment, and the student record are captured once and kept consistent across every downstream view.',
              inputs: ['Application forms', 'Eligibility rules', 'Payment and document sources'],
              handoff: 'A single authoritative student record',
              outcome: 'Enrollment states an administrator can trust',
            },
            {
              id: 'learning-layer',
              label: 'Course delivery and virtual-classroom layer',
              description:
                'Courses, lessons, resources, cohorts, and live or recorded classrooms are delivered and tracked against the enrolled learner.',
              inputs: ['Course and curriculum model', 'Content and media', 'Classroom and scheduling rules'],
              handoff: 'A tracked learning activity',
              outcome: 'Delivery and progress a teacher can follow',
            },
            {
              id: 'assessment-layer',
              label: 'Assessment, grading, and completion layer',
              description:
                'Assignments, quizzes, exams, gradebooks, and completion rules apply institution-owned criteria and produce defensible, correctable results.',
              inputs: ['Assessment and rubric rules', 'Owned grading criteria', 'Completion and appeal policy'],
              handoff: 'An owned, correctable result',
              outcome: 'A traceable grade and completion state',
            },
            {
              id: 'admin-integration-layer',
              label: 'Admin, analytics, integration, and security layer',
              description:
                'Administrator dashboards, reporting, role-based access, and integrations to identity, payment, and content providers keep the platform observable and connected within agreed limits.',
              inputs: ['Approved provider interfaces', 'Access and data policy', 'Reporting requirements'],
              handoff: 'A bounded, observed data exchange',
              outcome: 'A connected platform that stays inside its controls',
            },
          ],
        },
        {
          id: 'education-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'Paths to implementation',
          title: 'Choose the build paths that assemble the platform.',
          intro:
            'The final combination depends on the flow you prioritize, the systems you already use, and the smallest complete, reconcilable handoff worth building first.',
          serviceIds: [
            'web-applications',
            'business-systems-development',
            'website-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'web-applications',
              label: 'Learning platforms, portals, and student apps',
            },
            {
              serviceId: 'business-systems-development',
              label: 'Enrollment, student-information, and admin systems',
            },
            {
              serviceId: 'website-development',
              label: 'Program, admissions, and prospectus websites',
            },
            {
              serviceId: 'content-creation',
              label: 'Bilingual course and program content',
            },
          ],
          relatedIndustryIds: ['healthcare', 'government-public-sector'],
          industryAnchors: [
            {
              industryId: 'healthcare',
              label: 'Explore patient journey and clinic platforms',
            },
            {
              industryId: 'government-public-sector',
              label: 'Explore public-service and citizen platforms',
            },
          ],
        },
        {
          id: 'education-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Evidence and responsibility',
          title: 'The design makes academic boundaries explicit.',
          intro:
            'This page describes a proposed engineering model, not accreditation, certification, or an academic guarantee. Curriculum, grading criteria, accreditation, and outcome wording remain with the institution and its authorized owners.',
          items: [
            {
              id: 'accreditation-support',
              label: 'Accreditation is supported, not awarded',
              responsibility:
                'The platform can implement approved programs, records, and workflows, but accreditation, certification, and outcome claims are owned by the institution and its accrediting bodies.',
              dependency: 'A named academic owner and the approved program and outcome wording.',
              recovery: 'Hold outcome or certificate wording until the academic owner confirms it.',
            },
            {
              id: 'role-access',
              label: 'Learner, guardian, teacher, and admin access',
              responsibility:
                'Each role needs explicit access, visibility, and consent rules—especially where minors and guardians are involved—defined and approved before data is captured.',
              dependency: 'An approved role, permission, and consent map.',
              recovery: 'Keep sensitive views restricted until role rules are confirmed.',
            },
            {
              id: 'assessment-ownership',
              label: 'Assessment and completion records',
              responsibility:
                'Grades, results, and completion states require clear ownership, a source of truth, and a documented correction or appeal path.',
              dependency: 'Institution-approved grading, completion, and appeal policy.',
              recovery: 'Route disputed results to human academic review instead of an unowned automated state.',
            },
            {
              id: 'provider-dependencies',
              label: 'Identity, payment, and content dependencies',
              responsibility:
                'Integrations to identity, payment, video, and content providers depend on validated access, contracts, and availability.',
              dependency: 'Confirmed provider documentation, credentials, and approval.',
              recovery: 'Hold the step behind a manual or sandboxed path until provider access is validated.',
            },
          ],
        },
        {
          id: 'education-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'Built for bilingual learning',
          title: 'Arabic and English are learning languages, not a final translation step.',
          intro:
            'Program content, enrollment forms, learner and teacher messages, and assessment wording are authored for each language while one shared, reconcilable system structure stays constant.',
          items: [
            {
              id: 'bilingual-learning',
              label: 'Native learning language',
              description:
                'Course, enrollment, and assessment wording is written for how learners and staff read and act in each language, not translated after the fact.',
            },
            {
              id: 'rtl-experience',
              label: 'Right-to-left by design',
              description:
                'Dashboards, gradebooks, forms, and reading views remain correct and legible in right-to-left and left-to-right contexts, under a named review owner.',
            },
            {
              id: 'regional-requirements',
              label: 'Institution-by-institution requirements',
              description:
                'Academic calendars, grading scales, payment methods, and reporting requirements are checked per institution before scope is fixed.',
            },
          ],
        },
        {
          id: 'education-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'Decision questions',
          title: 'What education teams usually need to decide first.',
          intro:
            'A useful first scope is one complete, reconcilable flow—discovery to enrollment, or a single course from delivery to grade—with named data, role, and academic owners.',
          items: [
            {
              id: 'accreditation-role',
              question: 'Does CloudTopia accredit our programs or issue certificates?',
              answer:
                'No. We engineer the system and implement the programs, records, and workflows your academic owner approves. Accreditation, certification, and outcome claims stay with your institution—the build makes those requirements explicit and traceable.',
            },
            {
              id: 'multiple-roles',
              question: 'How do multiple education roles share one journey?',
              answer:
                'The journey keeps shared milestones consistent while each role—learner, guardian, teacher, administrator—receives only its tasks, evidence, and permitted views, all reconciled behind one record.',
            },
            {
              id: 'enrollment-first',
              question: 'Can enrollment launch before a full learning platform?',
              answer:
                'Yes. Discovery, application, document collection, payment, and status communication can launch first, then connect to the course-delivery and assessment layers as scope expands.',
            },
            {
              id: 'existing-tools',
              question: 'Can this connect to our existing LMS, SIS, or video tools?',
              answer:
                'It is designed around the interfaces, fields, and access your providers confirm. We map the required data, responsible systems, source of truth, and a manual or sandboxed fallback before committing to a live integration.',
            },
            {
              id: 'data-and-minors',
              question: 'How is learner data—especially for minors—handled?',
              answer:
                'Access, visibility, consent, and retention are engineered into the foundation with role-based controls and a guardian model where needed, scoped to the data policy your institution approves.',
            },
            {
              id: 'accessibility',
              question: 'Is the platform accessible?',
              answer:
                'Accessibility is engineered in—semantic structure, keyboard support, focus states, reduced-motion, and bilingual right-to-left layouts—so the platform can meet the standards your institution requires.',
            },
          ],
        },
        {
          id: 'education-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'Choose the first flow',
          title: 'Make one reconcilable flow the starting point.',
          intro:
            'Bring one learning flow, the roles and teams who own it, and the systems it touches. We will turn that context into a bounded, buildable education-platform brief.',
          decisionCopy:
            'Start with one complete, reconcilable flow rather than a list of disconnected features.',
          primary: {
            label: 'Map your learning experience',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore education web applications',
            serviceId: 'web-applications',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'هندسة منصات التعليم — أنظمة التعلّم والتسجيل والتقييم',
        description:
          'تهندس كلاود توبيا أنظمة تعليم ثنائية اللغة: منصات إدارة تعلّم، وبوابات للطلاب والمعلمين، وتسجيل وقبول، وتقييم ورصد درجات، وفصول افتراضية، ولوحات إدارة.',
      },
      breadcrumbLabel: 'التعليم',
      hero: {
        worldLabel: 'كوكبة التعلّم',
        eyebrow: 'أنظمة التعلّم والتسجيل',
        h1: 'نبني منصات التعليم التي يعتمد عليها متعلّموكم وفريقكم.',
        intro:
          'تصمم كلاود توبيا وتبني أنظمة تعليم ثنائية اللغة—إدارة تعلّم، وبوابات للطلاب والمعلمين، وتسجيلاً وقبولاً، وتقييماً ورصد درجات، وفصولاً افتراضية، ولوحات إدارة—من أول طلب التحاق حتى كل درس وتسليم وسجل.',
        primaryCta: {
          label: 'لنرسم تجربة التعلّم لديكم',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشفوا مسارات منصات التعليم',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'يبقى الاكتشاف والتسجيل والتعلّم والتقييم والإتمام مترابطة في رحلة واحدة، بينما يحتفظ كل دور بالواجهة المصرح له بها فقط.',
        sceneStages: [
          { id: 'discover', label: 'اكتشاف البرنامج', state: 'مفهوم' },
          { id: 'enroll', label: 'التقديم والتسجيل', state: 'مؤكد' },
          { id: 'learn', label: 'التعلّم', state: 'نشط' },
          { id: 'assess', label: 'تقييم التقدّم', state: 'مرئي' },
          { id: 'complete', label: 'الإتمام', state: 'مسجل' },
        ],
      },
      sections: [
        {
          id: 'education-operating-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'أين تتعثر منصات التعلّم',
          title: 'يُحكم على منصة التعليم بأكثر من محتواها.',
          intro:
            'يقرر المتعلمون سهولة البرنامج في الشاشات الأولى، بينما تحتاج المؤسسة إلى بقاء التسجيل والتدريس والتقييم مترابطة عبر أدوار متعددة دون أن تتباعد السجلات.',
          signals: [
            {
              id: 'onboarding-friction',
              label: 'التسجيل هو أول ما يتسرب عنده المتعلمون',
              description:
                'كثيراً ما يتوزع الاكتشاف والتقديم وجمع المستندات والدفع وتحديث الحالة بين أدوات منفصلة، فيتعثر المتقدم ويفقد الفريق تتبع من وصل إلى أي خطوة.',
            },
            {
              id: 'role-fragmentation',
              label: 'تحتاج أدوار متعددة إلى سجل واحد متسق',
              description:
                'يحتاج المتعلمون والمعلمون وأولياء الأمور والإدارة إلى واجهة خاصة بكل منهم، مع بقاء التسجيل والتقدّم والدرجات متطابقة خلفها لا منسوخة بين الجداول.',
            },
            {
              id: 'assessment-integrity',
              label: 'يجب أن يكون التقييم والإتمام قابلين للدفاع',
              description:
                'لا تصمد التسليمات والدرجات وحالات الإتمام إلا حين يُسجَّل كل منها مرة واحدة، بمالك محدد، ومع مسار تصحيح واضح عند أي اعتراض.',
            },
          ],
        },
        {
          id: 'education-learning-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'من الاكتشاف إلى الإتمام',
          title: 'مسار واحد مترابط من أول زيارة إلى نتيجة مسجلة.',
          intro:
            'يحمل النظام المتعلم عبر تسلسل مفهوم، مع إبقاء قرارات التسجيل ونشاط التعلّم وسجلات التقييم ضمن حالات مملوكة قابلة للتتبع.',
          stages: [
            {
              id: 'discover',
              label: 'اكتشاف البرنامج',
              description:
                'يطّلع المتعلم المحتمل على وصف معتمد للبرنامج ومتطلباته ومخرجاته بوضوح يكفي لاتخاذ قرار التقديم.',
              actor: 'المتعلم المحتمل',
            },
            {
              id: 'enroll',
              label: 'التقديم والتسجيل',
              description:
                'يُجمع الطلب ورفع المستندات وفحص الأهلية والدفع في مسار واحد، وتُخزَّن كل خطوة لدى مالك وحالة واضحين.',
              actor: 'المتعلم وفريق القبول',
            },
            {
              id: 'learn',
              label: 'التعلّم والمشاركة',
              description:
                'تُقدَّم المقررات والدروس والموارد والفصول الافتراضية للمتعلم، بينما يدير المعلمون المجموعات والمواد والتواصل.',
              actor: 'المتعلم والمعلم',
            },
            {
              id: 'assess',
              label: 'التقييم ورصد الدرجات',
              description:
                'تُقدَّم الواجبات والاختبارات القصيرة والامتحانات وتُرصد وتُعاد مع التغذية الراجعة، ويُسجَّل كل منها مرة واحدة بمالك محدد.',
              actor: 'المعلم والممتحن',
            },
            {
              id: 'complete',
              label: 'الإتمام والتسجيل',
              description:
                'يُطابَق التقدّم والنتائج وحالات الإتمام في سجل تملكه المؤسسة يثق به المتعلم والإدارة.',
              actor: 'الإدارة',
            },
            {
              id: 'support',
              label: 'الدعم والمراجعة',
              description:
                'تُوجَّه الأسئلة والتصحيحات والتظلمات إلى قائمة محددة مع الأدلة والإجراء التالي اللازم لإعادة المتعلم إلى الرحلة الأساسية.',
              actor: 'فريق الدعم والمراجعة الأكاديمية',
            },
          ],
        },
        {
          id: 'education-role-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'التكوين المميز',
          title: 'تبقى الرحلة الواحدة متسقة بينما يرى كل دور مساره فقط.',
          intro:
            'تُصمم التجربة كمسارات متناسقة: ما يفعله المتعلم ويراه، والملكية والأدلة والضوابط التي تحتفظ بها المؤسسة خلف كل خطوة ظاهرة.',
          stages: [
            {
              id: 'discover',
              label: 'اكتشاف البرنامج',
              description: 'يقرأ المتعلم وصفاً معتمداً بينما تملك المؤسسة دقته ونسخته.',
              actor: 'المتعلم',
            },
            {
              id: 'enroll',
              label: 'التسجيل والأهلية',
              description: 'تُحصر الطلبات والمستندات ضمن حقول وأدوار وقواعد احتفاظ معتمدة.',
              actor: 'أصحاب القبول',
            },
            {
              id: 'learn',
              label: 'التدريس والتعلّم',
              description: 'يتشارك المساران نموذج مجموعة ومحتوى واحداً بواجهات مناسبة لكل دور.',
              actor: 'المتعلم والمعلم',
            },
            {
              id: 'assess',
              label: 'سجل التقييم',
              description: 'يحافظ تسليم ودرجة مسجلان مرة واحدة على تطابق واجهة المتعلم مع سجل الدرجات.',
              actor: 'المعلم والمتعلم',
            },
            {
              id: 'complete',
              label: 'ملكية الإتمام',
              description: 'تتجمع النتائج في سجل تملكه المؤسسة مع مسار تصحيح محدد.',
              actor: 'الإدارة',
            },
            {
              id: 'support',
              label: 'مسار الدعم والتظلم',
              description: 'يرى المتعلم النتيجة، وتحتفظ المؤسسة بسجل المراجعة القابل للتتبع.',
              actor: 'فريق المراجعة الأكاديمية',
            },
          ],
          lanes: [
            {
              id: 'learner-lane',
              label: 'مسار المتعلم',
              stageIds: ['discover', 'enroll', 'learn', 'assess', 'complete'],
            },
            {
              id: 'institution-lane',
              label: 'مسار المؤسسة والفريق',
              stageIds: ['enroll', 'learn', 'assess', 'complete', 'support'],
            },
          ],
        },
        {
          id: 'education-platform-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'نطاق قابل للبناء',
          title: 'منصة التعلّم مجموعة مترابطة من الطبقات ذات الملكية الواضحة.',
          intro:
            'يمكن أن يبدأ النطاق بمسار واحد—التسجيل أو تجربة مقرر واحد—لكن كل طبقة تحتاج إلى مدخلات معتمدة وتسليم محدد وسجل تستطيع المؤسسة مطابقته ومراجعته.',
          layers: [
            {
              id: 'experience-layer',
              label: 'طبقة تجربة المتعلم والفريق',
              description:
                'توجه واجهات الويب والتطبيقات ثنائية اللغة الاكتشاف والتسجيل والتعلّم والتدريس بلوحات مناسبة لكل دور وحالة واضحة.',
              inputs: ['محتوى برنامج معتمد', 'نموذج أدوار وصلاحيات', 'متطلبات إتاحة الوصول'],
              handoff: 'إجراء مسجل محدد الدور',
              outcome: 'متعلم أو معلم يفهم الخطوة التالية',
            },
            {
              id: 'enrollment-layer',
              label: 'طبقة التسجيل ومعلومات الطالب',
              description:
                'تُلتقط الطلبات والمستندات والأهلية والدفع وسجل الطالب مرة واحدة وتبقى متسقة عبر كل واجهة لاحقة.',
              inputs: ['نماذج التقديم', 'قواعد الأهلية', 'مصادر الدفع والمستندات'],
              handoff: 'سجل طالب مرجعي واحد',
              outcome: 'حالات تسجيل تثق بها الإدارة',
            },
            {
              id: 'learning-layer',
              label: 'طبقة تقديم المقررات والفصول الافتراضية',
              description:
                'تُقدَّم المقررات والدروس والموارد والمجموعات والفصول المباشرة أو المسجلة وتُتابَع مقابل المتعلم المسجَّل.',
              inputs: ['نموذج المقرر والمنهج', 'المحتوى والوسائط', 'قواعد الفصول والجدولة'],
              handoff: 'نشاط تعلّم متتبَّع',
              outcome: 'تقديم وتقدّم يستطيع المعلم متابعته',
            },
            {
              id: 'assessment-layer',
              label: 'طبقة التقييم ورصد الدرجات والإتمام',
              description:
                'تطبق الواجبات والاختبارات والامتحانات وسجلات الدرجات وقواعد الإتمام معايير تملكها المؤسسة وتنتج نتائج قابلة للدفاع والتصحيح.',
              inputs: ['قواعد التقييم والمعايير', 'معايير رصد مملوكة', 'سياسة الإتمام والتظلم'],
              handoff: 'نتيجة مملوكة قابلة للتصحيح',
              outcome: 'درجة وحالة إتمام قابلتان للتتبع',
            },
            {
              id: 'admin-integration-layer',
              label: 'طبقة الإدارة والتحليلات والتكامل والأمان',
              description:
                'تحافظ لوحات الإدارة والتقارير والوصول بحسب الأدوار والتكاملات مع مزودي الهوية والدفع والمحتوى على منصة قابلة للمراقبة ومترابطة ضمن الحدود المتفق عليها.',
              inputs: ['واجهات مزودين معتمدة', 'سياسة الوصول والبيانات', 'متطلبات التقارير'],
              handoff: 'تبادل بيانات محدود ومراقَب',
              outcome: 'منصة مترابطة تبقى ضمن ضوابطها',
            },
          ],
        },
        {
          id: 'education-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'اختاروا مسارات البناء التي تجمع المنصة.',
          intro:
            'يتحدد المزيج النهائي بحسب المسار الذي تعطونه الأولوية، والأنظمة التي تستخدمونها أصلاً، وأصغر تسليم متكامل قابل للمطابقة يستحق البناء أولاً.',
          serviceIds: [
            'web-applications',
            'business-systems-development',
            'website-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'web-applications',
              label: 'منصات تعلّم وبوابات وتطبيقات للطلاب',
            },
            {
              serviceId: 'business-systems-development',
              label: 'أنظمة تسجيل ومعلومات طلاب وإدارة',
            },
            {
              serviceId: 'website-development',
              label: 'مواقع البرامج والقبول والدليل الأكاديمي',
            },
            {
              serviceId: 'content-creation',
              label: 'محتوى مقررات وبرامج ثنائي اللغة',
            },
          ],
          relatedIndustryIds: ['healthcare', 'government-public-sector'],
          industryAnchors: [
            {
              industryId: 'healthcare',
              label: 'استكشفوا منصات رحلة المريض والعيادات',
            },
            {
              industryId: 'government-public-sector',
              label: 'استكشفوا منصات الخدمة العامة والمواطنين',
            },
          ],
        },
        {
          id: 'education-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'الأدلة والمسؤوليات',
          title: 'يجعل التصميم الحدود الأكاديمية صريحة.',
          intro:
            'تصف الصفحة نموذج هندسة مقترحاً، لا اعتماداً ولا شهادة ولا ضماناً أكاديمياً. يبقى المنهج ومعايير الرصد والاعتماد وصياغة المخرجات لدى المؤسسة وأصحاب الاختصاص المخولين.',
          items: [
            {
              id: 'accreditation-support',
              label: 'الاعتماد مدعوم لا ممنوح',
              responsibility:
                'يمكن للمنصة تنفيذ البرامج والسجلات ومسارات العمل المعتمدة، لكن الاعتماد والشهادات وادعاءات المخرجات تملكها المؤسسة وجهات الاعتماد.',
              dependency: 'مالك أكاديمي محدد وصياغة برنامج ومخرجات معتمدة.',
              recovery: 'تعليق صياغة المخرجات أو الشهادات حتى يؤكدها المالك الأكاديمي.',
            },
            {
              id: 'role-access',
              label: 'وصول المتعلم وولي الأمر والمعلم والإدارة',
              responsibility:
                'يحتاج كل دور إلى قواعد صريحة للوصول والرؤية والموافقة—خاصة عند وجود قُصَّر وأولياء أمور—تُحدد وتُعتمد قبل جمع البيانات.',
              dependency: 'خريطة معتمدة للأدوار والصلاحيات والموافقة.',
              recovery: 'إبقاء الواجهات الحساسة مقيَّدة حتى تتأكد قواعد الأدوار.',
            },
            {
              id: 'assessment-ownership',
              label: 'سجلات التقييم والإتمام',
              responsibility:
                'تحتاج الدرجات والنتائج وحالات الإتمام إلى ملكية واضحة ومصدر حقيقة ومسار موثق للتصحيح أو التظلم.',
              dependency: 'سياسة رصد وإتمام وتظلم تعتمدها المؤسسة.',
              recovery: 'توجيه النتائج المتنازع عليها إلى مراجعة أكاديمية بشرية بدلاً من حالة آلية بلا مالك.',
            },
            {
              id: 'provider-dependencies',
              label: 'اعتماديات الهوية والدفع والمحتوى',
              responsibility:
                'تعتمد تكاملات الهوية والدفع والفيديو والمحتوى على وصول موثوق وعقود وتوفر.',
              dependency: 'توثيق مزود مؤكد وبيانات اعتماد وموافقة.',
              recovery: 'إبقاء الخطوة خلف مسار يدوي أو تجريبي حتى يتأكد وصول المزود.',
            },
          ],
        },
        {
          id: 'education-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'مصمم لتعلّم ثنائي اللغة',
          title: 'العربية والإنجليزية لغتا تعلّم، وليستا خطوة ترجمة أخيرة.',
          intro:
            'تُصاغ محتويات البرامج ونماذج التسجيل ورسائل المتعلمين والمعلمين وصياغة التقييم لكل لغة، مع بقاء بنية نظام واحدة قابلة للمطابقة ثابتة.',
          items: [
            {
              id: 'bilingual-learning',
              label: 'لغة تعلّم طبيعية',
              description:
                'تُكتب صياغة المقررات والتسجيل والتقييم وفق طريقة قراءة المتعلمين والفريق وتصرفهم في كل لغة، لا كترجمة لاحقة.',
            },
            {
              id: 'rtl-experience',
              label: 'من اليمين إلى اليسار بالتصميم',
              description:
                'تبقى اللوحات وسجلات الدرجات والنماذج وواجهات القراءة صحيحة ومقروءة في السياقين العربي والإنجليزي، تحت مالك مراجعة محدد.',
            },
            {
              id: 'regional-requirements',
              label: 'متطلبات تختلف بحسب المؤسسة',
              description:
                'تُراجَع التقويمات الأكاديمية وسلالم الدرجات وطرق الدفع ومتطلبات التقارير لكل مؤسسة قبل تثبيت النطاق.',
            },
          ],
        },
        {
          id: 'education-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'أسئلة القرار',
          title: 'ما الذي تحتاج فرق التعليم إلى حسمه أولاً؟',
          intro:
            'النطاق الأول المفيد هو مسار مكتمل قابل للمطابقة—من الاكتشاف إلى التسجيل، أو مقرر واحد من التقديم إلى الدرجة—مع تحديد أصحاب البيانات والأدوار والاختصاص الأكاديمي.',
          items: [
            {
              id: 'accreditation-role',
              question: 'هل تعتمد كلاود توبيا برامجنا أو تصدر شهادات؟',
              answer:
                'لا. نهندس النظام وننفذ البرامج والسجلات ومسارات العمل التي يعتمدها مالككم الأكاديمي. يبقى الاعتماد والشهادات وادعاءات المخرجات لدى مؤسستكم، ويجعل البناء تلك المتطلبات صريحة وقابلة للتتبع.',
            },
            {
              id: 'multiple-roles',
              question: 'كيف تشترك أدوار التعليم المتعددة في رحلة واحدة؟',
              answer:
                'تحافظ الرحلة على مراحل مشتركة متسقة، بينما يتلقى كل دور—متعلم وولي أمر ومعلم وإدارة—مهامه وأدلته وواجهاته المصرح بها فقط، وكلها متطابقة خلف سجل واحد.',
            },
            {
              id: 'enrollment-first',
              question: 'هل يمكن إطلاق التسجيل قبل منصة تعلّم كاملة؟',
              answer:
                'نعم. يمكن إطلاق الاكتشاف والتقديم وجمع المستندات والدفع وتواصل الحالة أولاً، ثم ربطها بطبقتي تقديم المقررات والتقييم مع اتساع النطاق.',
            },
            {
              id: 'existing-tools',
              question: 'هل يمكن الربط بأنظمة إدارة التعلّم أو معلومات الطلاب أو أدوات الفيديو الحالية؟',
              answer:
                'يُصمَّم حول الواجهات والحقول والوصول الذي يؤكده مزودوكم. نرسم البيانات المطلوبة والأنظمة المسؤولة ومصدر الحقيقة والمسار اليدوي أو التجريبي البديل قبل الالتزام بتكامل مباشر.',
            },
            {
              id: 'data-and-minors',
              question: 'كيف تُعالَج بيانات المتعلمين، خاصة القُصَّر؟',
              answer:
                'يُهندَس الوصول والرؤية والموافقة والاحتفاظ في الأساس بضوابط حسب الأدوار ونموذج لولي الأمر عند الحاجة، بحسب سياسة البيانات التي تعتمدها مؤسستكم.',
            },
            {
              id: 'accessibility',
              question: 'هل المنصة متاحة للجميع؟',
              answer:
                'تُهندَس إتاحة الوصول من الأساس—بنية دلالية ودعم لوحة المفاتيح وحالات التركيز وتقليل الحركة وتخطيطات ثنائية اللغة من اليمين إلى اليسار—لتلبي المعايير التي تطلبها مؤسستكم.',
            },
          ],
        },
        {
          id: 'education-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'اختاروا المسار الأول',
          title: 'اجعلوا مساراً واحداً قابلاً للمطابقة نقطة البداية.',
          intro:
            'أحضروا مساراً تعليمياً واحداً، والأدوار والفرق التي تملكه، والأنظمة التي يمر بها، وسنحوّل هذا السياق إلى موجز منصة تعليم محدد النطاق قابل للبناء.',
          decisionCopy:
            'ابدؤوا بمسار مكتمل واحد قابل للمطابقة، لا بقائمة خصائص منفصلة.',
          primary: {
            label: 'لنرسم تجربة التعلّم لديكم',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: 'استكشفوا تطبيقات ويب التعليم',
            serviceId: 'web-applications',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
