import type { IndustryPageDefinition } from '@/lib/industries/types'

export const healthcareDefinition = {
  slug: 'healthcare',
  contentVersion: 'release-a-published-1',
  publicationStatus: 'published',
  updatedAt: '2026-07-16',
  world: {
    id: 'clinical-pulse',
    theme: {
      canvas: '#F3FAF8',
      surface: '#FFFFFF',
      elevatedSurface: '#E4F3F0',
      ink: '#0B2B2A',
      mutedInk: '#355C59',
      accent: '#087F73',
      accentInk: '#FFFFFF',
      signal: '#E86262',
      line: '#5F918A',
      focus: '#E86262',
      displayTreatment: 'clinical',
      radiusMode: 'soft',
      motifDensity: 'quiet',
      sceneTreatment: 'pulse-corridor',
    },
    heroScene: 'healthcare-pulse',
    heroTreatment: 'corridor-split',
    signatureComposition: {
      id: 'continuity-of-care',
      name: {
        en: 'Continuity of care',
        ar: 'استمرارية الرعاية',
      },
      sectionIds: ['patient-journey', 'continuity-of-care', 'clinic-system'],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'healthcare-pulse' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/healthcare/en.jpg',
      width: 1200,
      height: 630,
    },
    {
      kind: 'og-image',
      locale: 'ar',
      publicPath: '/og/industries/healthcare/ar.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'Healthcare Digital Systems & Patient Journeys',
        description:
          'CloudTopia designs bilingual healthcare websites, patient booking journeys, clinic-governed portals, and workflow systems for connected, role-aware care.',
      },
      breadcrumbLabel: 'Healthcare',
      hero: {
        worldLabel: 'Clinical Pulse',
        eyebrow: 'Healthcare systems',
        h1: 'Healthcare digital systems that move with the patient.',
        intro:
          'CloudTopia designs bilingual healthcare digital systems that connect patient-facing websites, appointment booking, clinic-governed portals, and workflow operations—from discovery and booking through the visit and follow-up.',
        primaryCta: {
          label: 'Map your patient journey',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore patient-facing web applications',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'Patient and clinic pathways meet at booking, the visit, and follow-up while responsibilities remain explicit.',
        sceneStages: [
          { id: 'discovery', label: 'Care discovery', state: 'Patient' },
          { id: 'doctor-selection', label: 'Doctor selection', state: 'Choice' },
          { id: 'booking', label: 'Booking', state: 'Shared' },
          { id: 'preparation', label: 'Visit preparation', state: 'Ready' },
          { id: 'visit', label: 'Visit', state: 'Shared' },
          { id: 'results', label: 'Approved instructions', state: 'Clinic' },
          { id: 'follow-up', label: 'Follow-up', state: 'Shared' },
        ],
      },
      sections: [
        {
          id: 'health-access-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'Where trust meets access',
          title: 'The patient experience begins before the appointment.',
          intro:
            'Patients need a clear path to the right service, while clinic teams need each request to arrive with enough context for the next responsible action.',
          signals: [
            {
              id: 'access-friction',
              label: 'Access can fragment early',
              description:
                'Services, doctors, locations, and booking instructions often live in separate places, leaving the patient to assemble the path.',
            },
            {
              id: 'trust-clarity',
              label: 'Trust depends on approved information',
              description:
                'Service descriptions, preparation guidance, and contact routes need a named clinic owner and a visible review path.',
            },
            {
              id: 'handoff-visibility',
              label: 'Handoffs need responsible roles',
              description:
                'A digital request is useful only when the receiving team, required information, and next action are explicit.',
            },
          ],
        },
        {
          id: 'patient-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'The patient route',
          title: 'One journey, from discovery to follow-up.',
          intro:
            'The system should support a patient through an understandable sequence without presenting clinical decisions as automated advice.',
          stages: [
            {
              id: 'discovery',
              label: 'Discover the right service',
              description:
                'The patient finds an approved service description, location, and route to ask or book.',
              actor: 'Patient',
            },
            {
              id: 'doctor-selection',
              label: 'Review doctor and service options',
              description:
                'The patient compares clinic-provided information and chooses an appropriate booking route.',
              actor: 'Patient',
            },
            {
              id: 'booking',
              label: 'Submit a booking request',
              description:
                'The request captures only the agreed details and enters a clinic-owned confirmation process.',
              actor: 'Patient and booking team',
            },
            {
              id: 'preparation',
              label: 'Receive approved preparation guidance',
              description:
                'The clinic provides the confirmed location, required documents, and approved instructions for the visit.',
              actor: 'Clinic team',
            },
            {
              id: 'visit',
              label: 'Attend the visit',
              description:
                'The patient arrives with the confirmed appointment context while clinical work stays within clinic systems and roles.',
              actor: 'Patient and care team',
            },
            {
              id: 'results',
              label: 'Receive approved results or instructions',
              description:
                'The clinic decides which information can be shared, through which channel, and with which access conditions.',
              actor: 'Authorized clinic team',
            },
            {
              id: 'follow-up',
              label: 'Continue with the agreed next step',
              description:
                'A follow-up request, reminder, or clinic contact keeps the next action visible without replacing professional judgment.',
              actor: 'Patient and clinic team',
            },
          ],
        },
        {
          id: 'continuity-of-care',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'Signature composition',
          title: 'Continuity appears where patient and staff lanes meet.',
          intro:
            'The experience is designed as two coordinated lanes: what the patient sees and what the clinic team must own behind each visible step.',
          stages: [
            {
              id: 'request',
              label: 'Service request',
              description: 'The patient chooses a clear route and provides the agreed request details.',
              actor: 'Patient',
            },
            {
              id: 'review',
              label: 'Request review',
              description: 'A named clinic role checks the request and identifies the appropriate next action.',
              actor: 'Clinic coordinator',
            },
            {
              id: 'booking',
              label: 'Booking confirmation',
              description: 'Both lanes share one confirmed appointment state and preparation message.',
              actor: 'Patient and booking team',
            },
            {
              id: 'visit',
              label: 'Visit handoff',
              description: 'The digital journey hands over to the care team under clinic-defined access rules.',
              actor: 'Care team',
            },
            {
              id: 'instructions',
              label: 'Approved information',
              description: 'The clinic selects and releases the information appropriate to the patient journey.',
              actor: 'Authorized clinic role',
            },
            {
              id: 'follow-up',
              label: 'Follow-up ownership',
              description: 'The patient sees the next route and the clinic retains ownership of the response.',
              actor: 'Patient and clinic team',
            },
          ],
          lanes: [
            {
              id: 'patient-lane',
              label: 'Patient lane',
              stageIds: ['request', 'booking', 'visit', 'instructions', 'follow-up'],
            },
            {
              id: 'clinic-lane',
              label: 'Clinic team lane',
              stageIds: ['review', 'booking', 'visit', 'instructions', 'follow-up'],
            },
          ],
        },
        {
          id: 'clinic-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'A buildable boundary',
          title: 'A care journey is a connected set of owned layers.',
          intro:
            'The exact scope can begin small, but each layer should have approved inputs, a named handoff, and an outcome the clinic can review.',
          layers: [
            {
              id: 'public-experience',
              label: 'Public care experience',
              description:
                'A bilingual website explains approved services, doctors, locations, and the next route for each patient need.',
              inputs: ['Approved service content', 'Doctor profiles', 'Clinic locations'],
              handoff: 'An informed service or booking request',
              outcome: 'A clearer route into the clinic',
            },
            {
              id: 'appointment-layer',
              label: 'Appointment and preparation layer',
              description:
                'Booking requests, confirmation states, and preparation messages follow clinic-defined rules and ownership.',
              inputs: ['Available booking routes', 'Required request fields', 'Approved instructions'],
              handoff: 'A confirmed or reviewed appointment request',
              outcome: 'A visible next step for patient and staff',
            },
            {
              id: 'role-aware-operations',
              label: 'Role-aware clinic operations',
              description:
                'Clinic roles see only the work and information assigned to their responsibility in the agreed process.',
              inputs: ['Role map', 'Request states', 'Escalation responsibilities'],
              handoff: 'An owned clinic work item',
              outcome: 'A traceable operational responsibility',
            },
            {
              id: 'approved-integrations',
              label: 'Approved system connections',
              description:
                'Connections are scoped to the interfaces, fields, and access methods made available by the clinic and its providers.',
              inputs: ['Approved interface documentation', 'Field ownership', 'Access decisions'],
              handoff: 'A bounded data exchange',
              outcome: 'A connected journey within agreed system limits',
            },
          ],
        },
        {
          id: 'healthcare-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'Paths to implementation',
          title: 'Choose the capabilities that support the journey.',
          intro:
            'The final combination depends on the patient route, clinic responsibilities, existing systems, and the smallest complete handoff worth improving first.',
          serviceIds: [
            'website-development',
            'web-applications',
            'business-systems-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'website-development',
              label: 'Healthcare website development',
            },
            {
              serviceId: 'web-applications',
              label: 'Patient-facing web applications',
            },
            {
              serviceId: 'business-systems-development',
              label: 'Clinic workflow systems',
            },
            {
              serviceId: 'content-creation',
              label: 'Approved bilingual care content',
            },
          ],
          relatedIndustryIds: ['education', 'government-public-sector'],
          industryAnchors: [
            {
              industryId: 'education',
              label: 'Explore role-based education journeys',
            },
            {
              industryId: 'government-public-sector',
              label: 'Explore public-service journeys',
            },
          ],
        },
        {
          id: 'privacy-role-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Evidence and responsibility',
          title: 'The design makes clinic-owned boundaries visible.',
          intro:
            'The page describes a proposed operating model, not medical advice or a guarantee. Final permissions, content, integrations, and clinical decisions remain with authorized owners.',
          items: [
            {
              id: 'permission-design',
              label: 'Permission design',
              responsibility:
                'The clinic names roles, approves access levels, and decides which patient information belongs in each step.',
              dependency: 'An approved role and information-access map.',
              recovery: 'Pause the affected route and return the access decision to the clinic owner.',
            },
            {
              id: 'content-ownership',
              label: 'Clinical content ownership',
              responsibility:
                'Authorized clinic reviewers approve service descriptions, preparation guidance, and patient instructions.',
              dependency: 'Named English and Arabic content owners with a review path.',
              recovery: 'Withdraw or revise content that no longer has current owner approval.',
            },
            {
              id: 'source-systems',
              label: 'Source-system boundaries',
              responsibility:
                'The clinic and its providers confirm available interfaces, fields, and operating constraints.',
              dependency: 'Current provider documentation and approved access.',
              recovery: 'Keep the step manual or isolated until the connection is confirmed.',
            },
            {
              id: 'clinical-boundary',
              label: 'Clinical decision boundary',
              responsibility:
                'Qualified professionals retain diagnosis, treatment, and patient-specific advice responsibilities.',
              dependency: 'A clinic-approved escalation and contact route.',
              recovery: 'Direct the patient to the clinic team instead of presenting an automated clinical conclusion.',
            },
          ],
        },
        {
          id: 'regional-care-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'Built for bilingual care',
          title: 'Arabic and English are operating languages, not a final translation step.',
          intro:
            'Service naming, booking guidance, role ownership, and patient messages are authored for each language while preserving one shared journey structure.',
          items: [
            {
              id: 'service-language',
              label: 'Native service language',
              description:
                'Service names and care explanations are written for how patients search, understand, and act in each language.',
            },
            {
              id: 'booking-instructions',
              label: 'Localized booking instructions',
              description:
                'Dates, locations, required documents, and next-step messages remain readable in right-to-left and left-to-right contexts.',
            },
            {
              id: 'content-governance',
              label: 'Bilingual content ownership',
              description:
                'Named clinic owners review both versions so one language does not become an outdated copy of the other.',
            },
          ],
        },
        {
          id: 'healthcare-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'Decision questions',
          title: 'What healthcare teams usually need to decide first.',
          intro:
            'A useful first scope is one complete patient journey with named content, system, and operational owners.',
          items: [
            {
              id: 'existing-systems',
              question: 'Can the patient journey connect with our existing clinic systems?',
              answer:
                'It can be designed around the interfaces and access methods your clinic and providers confirm. We map the required fields, responsible systems, and manual fallback before defining a connection.',
            },
            {
              id: 'medical-advice',
              question: 'Does the digital journey provide diagnosis or medical advice?',
              answer:
                'No. It supports access, information, requests, and clinic-approved communication while diagnosis, treatment, and patient-specific advice remain with qualified professionals.',
            },
            {
              id: 'privacy-ownership',
              question: 'Who owns privacy and permission decisions?',
              answer:
                'The clinic owns role, access, retention, and information-sharing decisions. The system design makes those decisions explicit and implements the approved boundary.',
            },
            {
              id: 'bilingual-delivery',
              question: 'Can Arabic and English journeys be designed together?',
              answer:
                'Yes. Both languages share stable journey steps while service wording, instructions, labels, and reading direction are authored and reviewed for each audience.',
            },
            {
              id: 'starting-point',
              question: 'Where should a healthcare organization begin?',
              answer:
                'Begin with one high-value patient journey, identify every handoff and owner, then define the smallest system boundary that supports that route from entry to follow-up.',
            },
          ],
        },
        {
          id: 'healthcare-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'Choose the first journey',
          title: 'Make the next patient step the starting point.',
          intro:
            'Bring one patient route, the teams who own it, and the systems it touches. We will turn that context into a bounded digital-system brief.',
          decisionCopy:
            'Start with one complete journey rather than a list of disconnected features.',
          primary: {
            label: 'Map your patient journey',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore patient-facing web applications',
            serviceId: 'web-applications',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'حلول رقمية للرعاية الصحية ورحلة المريض',
        description:
          'تصمم كلاود توبيا مواقع رعاية صحية ثنائية اللغة، ورحلات حجز المرضى، والبوابات الآمنة، وأنظمة تشغيل العيادات لرعاية مترابطة واضحة المسؤوليات.',
      },
      breadcrumbLabel: 'الرعاية الصحية',
      hero: {
        worldLabel: 'نبض الرعاية',
        eyebrow: 'أنظمة الرعاية الصحية',
        h1: 'أنظمة الرعاية الصحية الرقمية التي تواكب المريض.',
        intro:
          'تصمم كلاود توبيا أنظمة رعاية صحية رقمية ثنائية اللغة تربط مواقع المرضى وحجز المواعيد والبوابات الآمنة وسير عمل العيادات، من اكتشاف الخدمة والحجز إلى الزيارة والمتابعة.',
        primaryCta: {
          label: 'لنرسم رحلة المريض لديكم',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشف تطبيقات الويب الموجهة للمرضى',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'يلتقي مسارا المريض والعيادة عند الحجز والزيارة والمتابعة، مع بقاء المسؤوليات واضحة في كل نقطة.',
        sceneStages: [
          { id: 'discovery', label: 'اكتشاف الرعاية', state: 'المريض' },
          { id: 'doctor-selection', label: 'اختيار الطبيب', state: 'الاختيار' },
          { id: 'booking', label: 'الحجز', state: 'مشترك' },
          { id: 'preparation', label: 'الاستعداد للزيارة', state: 'جاهز' },
          { id: 'visit', label: 'الزيارة', state: 'مشترك' },
          { id: 'results', label: 'التعليمات المعتمدة', state: 'العيادة' },
          { id: 'follow-up', label: 'المتابعة', state: 'مشترك' },
        ],
      },
      sections: [
        {
          id: 'health-access-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'حيث تلتقي الثقة بسهولة الوصول',
          title: 'تبدأ تجربة المريض قبل موعده.',
          intro:
            'يحتاج المريض إلى مسار واضح نحو الخدمة المناسبة، ويحتاج فريق العيادة إلى طلب يحمل سياقاً كافياً لتحديد الإجراء التالي والمسؤول عنه.',
          signals: [
            {
              id: 'access-friction',
              label: 'قد يتشتت الوصول منذ البداية',
              description:
                'تتوزع الخدمات والأطباء والمواقع وتعليمات الحجز أحياناً بين قنوات متعددة، فيضطر المريض إلى تجميع المسار بنفسه.',
            },
            {
              id: 'trust-clarity',
              label: 'الثقة تحتاج إلى معلومات معتمدة',
              description:
                'تحتاج أوصاف الخدمات وتعليمات الاستعداد وقنوات التواصل إلى مالك واضح داخل العيادة ومسار مراجعة معلوم.',
            },
            {
              id: 'handoff-visibility',
              label: 'التسليمات تحتاج إلى أدوار مسؤولة',
              description:
                'لا يصبح الطلب الرقمي مفيداً إلا حين يكون الفريق المستلم والمعلومات المطلوبة والإجراء التالي واضحاً.',
            },
          ],
        },
        {
          id: 'patient-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'مسار المريض',
          title: 'رحلة واحدة من اكتشاف الخدمة إلى المتابعة.',
          intro:
            'يدعم النظام المريض عبر تسلسل مفهوم من الخطوات، من دون تقديم القرارات السريرية على أنها نصائح آلية.',
          stages: [
            {
              id: 'discovery',
              label: 'اكتشاف الخدمة المناسبة',
              description:
                'يجد المريض وصفاً معتمداً للخدمة وموقعها والمسار المناسب للاستفسار أو الحجز.',
              actor: 'المريض',
            },
            {
              id: 'doctor-selection',
              label: 'مراجعة خيارات الطبيب والخدمة',
              description:
                'يقارن المريض المعلومات التي توفرها العيادة ويختار مسار الحجز المناسب.',
              actor: 'المريض',
            },
            {
              id: 'booking',
              label: 'إرسال طلب الحجز',
              description:
                'يجمع الطلب التفاصيل المتفق عليها فقط، ثم يدخل في عملية تأكيد تملكها العيادة.',
              actor: 'المريض وفريق الحجز',
            },
            {
              id: 'preparation',
              label: 'استلام تعليمات الاستعداد المعتمدة',
              description:
                'ترسل العيادة الموقع المؤكد والمستندات المطلوبة والتعليمات المعتمدة للزيارة.',
              actor: 'فريق العيادة',
            },
            {
              id: 'visit',
              label: 'حضور الزيارة',
              description:
                'يصل المريض بسياق الموعد المؤكد، بينما يبقى العمل السريري ضمن أنظمة العيادة وأدوارها.',
              actor: 'المريض وفريق الرعاية',
            },
            {
              id: 'results',
              label: 'استلام النتائج أو التعليمات المعتمدة',
              description:
                'تحدد العيادة المعلومات التي يمكن مشاركتها والقناة المناسبة وشروط الوصول إليها.',
              actor: 'فريق العيادة المخول',
            },
            {
              id: 'follow-up',
              label: 'متابعة الخطوة المتفق عليها',
              description:
                'يبقي طلب المتابعة أو التذكير أو التواصل مع العيادة الإجراء التالي واضحاً من دون استبدال الحكم المهني.',
              actor: 'المريض وفريق العيادة',
            },
          ],
        },
        {
          id: 'continuity-of-care',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'التكوين المميز',
          title: 'تظهر استمرارية الرعاية عند التقاء مساري المريض والفريق.',
          intro:
            'تُصمم التجربة كمسارين متناسقين: ما يراه المريض، وما يجب أن يملكه فريق العيادة خلف كل خطوة ظاهرة.',
          stages: [
            {
              id: 'request',
              label: 'طلب الخدمة',
              description: 'يختار المريض مساراً واضحاً ويرسل تفاصيل الطلب المتفق عليها.',
              actor: 'المريض',
            },
            {
              id: 'review',
              label: 'مراجعة الطلب',
              description: 'يراجع دور محدد في العيادة الطلب ويحدد الإجراء المناسب التالي.',
              actor: 'منسق العيادة',
            },
            {
              id: 'booking',
              label: 'تأكيد الحجز',
              description: 'يتشارك المساران حالة موعد مؤكدة ورسالة استعداد واحدة.',
              actor: 'المريض وفريق الحجز',
            },
            {
              id: 'visit',
              label: 'تسليم الزيارة',
              description: 'تنتقل الرحلة الرقمية إلى فريق الرعاية وفق قواعد الوصول التي تعتمدها العيادة.',
              actor: 'فريق الرعاية',
            },
            {
              id: 'instructions',
              label: 'المعلومات المعتمدة',
              description: 'تختار العيادة المعلومات الملائمة لرحلة المريض وتجيز مشاركتها.',
              actor: 'دور مخول في العيادة',
            },
            {
              id: 'follow-up',
              label: 'ملكية المتابعة',
              description: 'يرى المريض المسار التالي وتحتفظ العيادة بمسؤولية الاستجابة.',
              actor: 'المريض وفريق العيادة',
            },
          ],
          lanes: [
            {
              id: 'patient-lane',
              label: 'مسار المريض',
              stageIds: ['request', 'booking', 'visit', 'instructions', 'follow-up'],
            },
            {
              id: 'clinic-lane',
              label: 'مسار فريق العيادة',
              stageIds: ['review', 'booking', 'visit', 'instructions', 'follow-up'],
            },
          ],
        },
        {
          id: 'clinic-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'نطاق قابل للبناء',
          title: 'رحلة الرعاية مجموعة مترابطة من الطبقات ذات الملكية الواضحة.',
          intro:
            'يمكن أن يبدأ النطاق صغيراً، لكن كل طبقة تحتاج إلى مدخلات معتمدة وتسليم محدد ونتيجة تستطيع العيادة مراجعتها.',
          layers: [
            {
              id: 'public-experience',
              label: 'تجربة الرعاية العامة',
              description:
                'يوضح موقع ثنائي اللغة الخدمات المعتمدة والأطباء والمواقع والمسار التالي لكل احتياج.',
              inputs: ['محتوى الخدمات المعتمد', 'ملفات الأطباء', 'مواقع العيادات'],
              handoff: 'طلب خدمة أو حجز أكثر وضوحاً',
              outcome: 'مسار أوضح للدخول إلى العيادة',
            },
            {
              id: 'appointment-layer',
              label: 'طبقة المواعيد والاستعداد',
              description:
                'تتبع طلبات الحجز وحالات التأكيد ورسائل الاستعداد قواعد العيادة ومسؤولياتها.',
              inputs: ['مسارات الحجز المتاحة', 'حقول الطلب المطلوبة', 'التعليمات المعتمدة'],
              handoff: 'طلب موعد مؤكد أو خاضع للمراجعة',
              outcome: 'خطوة تالية ظاهرة للمريض والفريق',
            },
            {
              id: 'role-aware-operations',
              label: 'تشغيل العيادة بحسب الأدوار',
              description:
                'يرى كل دور العمل والمعلومات المرتبطة بمسؤوليته فقط ضمن العملية المتفق عليها.',
              inputs: ['خريطة الأدوار', 'حالات الطلب', 'مسؤوليات التصعيد'],
              handoff: 'مهمة مملوكة داخل العيادة',
              outcome: 'مسؤولية تشغيلية قابلة للتتبع',
            },
            {
              id: 'approved-integrations',
              label: 'روابط الأنظمة المعتمدة',
              description:
                'يقتصر الربط على الواجهات والحقول وطرق الوصول التي تتيحها العيادة ومزودوها.',
              inputs: ['توثيق الواجهات المعتمد', 'ملكية الحقول', 'قرارات الوصول'],
              handoff: 'تبادل بيانات محدود النطاق',
              outcome: 'رحلة مترابطة ضمن حدود الأنظمة المتفق عليها',
            },
          ],
        },
        {
          id: 'healthcare-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'اختاروا القدرات التي تخدم الرحلة.',
          intro:
            'يتحدد المزيج النهائي بحسب مسار المريض ومسؤوليات العيادة والأنظمة الحالية وأصغر تسليم متكامل يستحق التحسين أولاً.',
          serviceIds: [
            'website-development',
            'web-applications',
            'business-systems-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'website-development',
              label: 'تطوير مواقع الرعاية الصحية',
            },
            {
              serviceId: 'web-applications',
              label: 'تطبيقات ويب موجهة للمرضى',
            },
            {
              serviceId: 'business-systems-development',
              label: 'أنظمة سير عمل العيادات',
            },
            {
              serviceId: 'content-creation',
              label: 'محتوى رعاية ثنائي اللغة ومعتمد',
            },
          ],
          relatedIndustryIds: ['education', 'government-public-sector'],
          industryAnchors: [
            {
              industryId: 'education',
              label: 'استكشف رحلات التعليم متعددة الأدوار',
            },
            {
              industryId: 'government-public-sector',
              label: 'استكشف رحلات الخدمات العامة',
            },
          ],
        },
        {
          id: 'privacy-role-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'الأدلة والمسؤوليات',
          title: 'يجعل التصميم الحدود التي تملكها العيادة مرئية.',
          intro:
            'تصف الصفحة نموذج تشغيل مقترحاً، لا نصيحة طبية ولا ضماناً. تبقى الصلاحيات والمحتوى والربط والقرارات السريرية لدى أصحاب الاختصاص المخولين.',
          items: [
            {
              id: 'permission-design',
              label: 'تصميم الصلاحيات',
              responsibility:
                'تحدد العيادة الأدوار ومستويات الوصول ومعلومات المريض التي تنتمي إلى كل خطوة.',
              dependency: 'خريطة معتمدة للأدوار والوصول إلى المعلومات.',
              recovery: 'إيقاف المسار المتأثر وإعادة قرار الوصول إلى مالكه في العيادة.',
            },
            {
              id: 'content-ownership',
              label: 'ملكية المحتوى السريري',
              responsibility:
                'يعتمد مراجعون مخولون في العيادة أوصاف الخدمات وتعليمات الاستعداد ورسائل المرضى.',
              dependency: 'أصحاب محتوى محددون للعربية والإنجليزية مع مسار مراجعة.',
              recovery: 'سحب المحتوى أو مراجعته حين لا يعود مستنداً إلى اعتماد حالي.',
            },
            {
              id: 'source-systems',
              label: 'حدود الأنظمة المصدرية',
              responsibility:
                'تؤكد العيادة ومزودوها الواجهات والحقول وقيود التشغيل المتاحة.',
              dependency: 'توثيق حالي من المزود وصلاحية وصول معتمدة.',
              recovery: 'إبقاء الخطوة يدوية أو معزولة حتى يتأكد الربط.',
            },
            {
              id: 'clinical-boundary',
              label: 'حدود القرار السريري',
              responsibility:
                'يحتفظ المختصون المؤهلون بمسؤولية التشخيص والعلاج والنصيحة الخاصة بالمريض.',
              dependency: 'مسار تصعيد وتواصل تعتمده العيادة.',
              recovery: 'توجيه المريض إلى فريق العيادة بدلاً من عرض استنتاج سريري آلي.',
            },
          ],
        },
        {
          id: 'regional-care-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'رعاية تعمل باللغتين',
          title: 'العربية والإنجليزية لغتا تشغيل، وليستا خطوة ترجمة أخيرة.',
          intro:
            'تُصاغ أسماء الخدمات وتعليمات الحجز وملكية الأدوار ورسائل المرضى لكل لغة، مع الحفاظ على بنية رحلة مشتركة.',
          items: [
            {
              id: 'service-language',
              label: 'لغة خدمة طبيعية',
              description:
                'تُكتب أسماء الخدمات وشروحات الرعاية وفق الطريقة التي يبحث ويفهم ويتصرف بها المرضى في كل لغة.',
            },
            {
              id: 'booking-instructions',
              label: 'تعليمات حجز موطنة',
              description:
                'تبقى التواريخ والمواقع والمستندات المطلوبة ورسائل الخطوة التالية مقروءة في السياقين العربي والإنجليزي.',
            },
            {
              id: 'content-governance',
              label: 'ملكية المحتوى باللغتين',
              description:
                'يراجع أصحاب مسؤولية محددون في العيادة النسختين حتى لا تصبح إحداهما نسخة قديمة من الأخرى.',
            },
          ],
        },
        {
          id: 'healthcare-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'أسئلة القرار',
          title: 'ما الذي تحتاج فرق الرعاية إلى حسمه أولاً؟',
          intro:
            'النطاق الأول المفيد هو رحلة مريض مكتملة، مع تحديد أصحاب المحتوى والأنظمة والمسؤوليات التشغيلية.',
          items: [
            {
              id: 'existing-systems',
              question: 'هل يمكن ربط رحلة المريض بأنظمة العيادة الحالية؟',
              answer:
                'يمكن تصميمها حول الواجهات وطرق الوصول التي تؤكدها العيادة ومزودوها. نرسم الحقول المطلوبة والأنظمة المسؤولة والمسار اليدوي البديل قبل تحديد الربط.',
            },
            {
              id: 'medical-advice',
              question: 'هل تقدم الرحلة الرقمية تشخيصاً أو نصيحة طبية؟',
              answer:
                'لا. تدعم الوصول والمعلومات والطلبات والتواصل الذي تعتمده العيادة، بينما يبقى التشخيص والعلاج والنصيحة الخاصة بالمريض لدى المختصين المؤهلين.',
            },
            {
              id: 'privacy-ownership',
              question: 'من يملك قرارات الخصوصية والصلاحيات؟',
              answer:
                'تملك العيادة قرارات الأدوار والوصول والاحتفاظ بالمعلومات ومشاركتها. يجعل تصميم النظام هذه القرارات صريحة وينفذ الحدود المعتمدة.',
            },
            {
              id: 'bilingual-delivery',
              question: 'هل يمكن تصميم الرحلتين العربية والإنجليزية معاً؟',
              answer:
                'نعم. تشترك اللغتان في خطوات رحلة ثابتة، بينما تُصاغ أوصاف الخدمات والتعليمات والعناوين واتجاه القراءة وتُراجع لكل جمهور.',
            },
            {
              id: 'starting-point',
              question: 'من أين تبدأ مؤسسة الرعاية الصحية؟',
              answer:
                'ابدؤوا برحلة مريض ذات قيمة واضحة، وحددوا كل تسليم وصاحبه، ثم ارسموا أصغر نطاق نظام يدعم المسار من نقطة الدخول حتى المتابعة.',
            },
          ],
        },
        {
          id: 'healthcare-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'اختاروا الرحلة الأولى',
          title: 'اجعلوا الخطوة التالية للمريض نقطة البداية.',
          intro:
            'أحضروا مسار مريض واحداً والفرق التي تملكه والأنظمة التي يمر بها، وسنحوّل هذا السياق إلى موجز نظام رقمي محدد النطاق.',
          decisionCopy:
            'ابدؤوا برحلة مكتملة واحدة، لا بقائمة خصائص منفصلة.',
          primary: {
            label: 'لنرسم رحلة المريض لديكم',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: 'استكشف تطبيقات الويب الموجهة للمرضى',
            serviceId: 'web-applications',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
