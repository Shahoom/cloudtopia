import type { IndustryPageDefinition } from '@/lib/industries/types'

/**
 * Hand-authored Travel & Hospitality "Industry World".
 *
 * The visible page (components/industry/travel-hospitality/
 * TravelHospitalityIndustryPage.tsx) ports the Travelite (ThemeForest) look and
 * animations while presenting CloudTopia's expertise BUILDING travel and
 * hospitality platforms: booking engines, property / tour / package management,
 * itinerary builders, channel-manager integrations, and guest portals. This
 * definition drives the hero, the service-bridge link cards, the FAQ, and the
 * JSON-LD / markdown / SEO surfaces. Every other ported visual section pulls its
 * microcopy from travel-hospitality-content.ts.
 *
 * Framing rule: CloudTopia ENGINEERS guest-experience systems — it is NOT a tour
 * operator, OTA, or hotel. Rates, availability, and booking status always depend
 * on operator-approved property or provider data; the platform surfaces them, it
 * never invents inventory or promises.
 *
 * Palette: the Travelite default variant — lime-green #86B817 accent + amber
 * #FDB714 highlight on white, dark-slate ink #2C3E50. Lime is a fill/accent only;
 * body text stays dark ink for WCAG AA contrast.
 */
export const travelHospitalityDefinition = {
  slug: 'travel-hospitality',
  contentVersion: 'travel-hospitality-travelite-published-1',
  publicationStatus: 'published',
  updatedAt: '2026-07-17',
  world: {
    id: 'guest-journey-atlas',
    theme: {
      canvas: '#FFFFFF',
      surface: '#FFFFFF',
      elevatedSurface: '#F4F7EC',
      ink: '#2C3E50',
      mutedInk: '#5C6B6D',
      accent: '#86B817',
      accentInk: '#1E2B10',
      signal: '#FDB714',
      line: '#DDE3D5',
      focus: '#5F8214',
      displayTreatment: 'editorial',
      radiusMode: 'soft',
      motifDensity: 'medium',
      sceneTreatment: 'service-pass',
    },
    heroScene: 'travel-itinerary',
    heroTreatment: 'editorial-pass',
    signatureComposition: {
      id: 'guest-horizon',
      name: {
        en: 'The guest horizon',
        ar: 'أفق رحلة الضيف',
      },
      sectionIds: [
        'travel-guest-journey',
        'travel-experience-lanes',
        'travel-platform-system',
      ],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'travel-itinerary' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/travel-hospitality/en.jpg',
      width: 1200,
      height: 630,
    },
    {
      kind: 'og-image',
      locale: 'ar',
      publicPath: '/og/industries/travel-hospitality/ar.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'Travel & Hospitality Platform Engineering — Booking, PMS & Guest Apps',
        description:
          'CloudTopia engineers bilingual travel and hospitality systems: booking engines, property, tour, and package management, itinerary builders, channel-manager integrations, and guest portals — from inspiration through the stay and the return.',
      },
      breadcrumbLabel: 'Travel & Hospitality',
      hero: {
        worldLabel: 'Guest Journey Atlas',
        eyebrow: 'Guest experience systems',
        h1: 'We build the digital systems that carry every guest journey.',
        intro:
          'CloudTopia designs and engineers bilingual travel and hospitality platforms — booking engines, property, tour, and package management, itinerary builders, channel-manager integrations, and guest portals — so inspiration, availability, booking, the stay, and the return all move on one connected system.',
        primaryCta: {
          label: 'Shape your guest journey',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore hospitality build paths',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'Inspiration, availability, booking, arrival, and the return stay visible on one connected guest-and-operations rail.',
        sceneStages: [
          { id: 'inspire', label: 'Inspire and discover', state: 'Desired' },
          { id: 'availability', label: 'Check availability', state: 'Current' },
          { id: 'booking', label: 'Book and confirm', state: 'Confirmed' },
          { id: 'stay', label: 'Arrive and stay', state: 'Supported' },
          { id: 'return', label: 'Return and loyalty', state: 'Remembered' },
        ],
      },
      sections: [
        {
          id: 'travel-operating-pressure',
          type: 'pressure-field',
          variant: 'constraints-first',
          answers: ['operating-pressure'],
          eyebrow: 'Where a trip is won or lost',
          title: 'A guest decides before they ever arrive.',
          intro:
            'Travellers judge a property or trip in the first few screens, while operators need every request to arrive with the availability, rate, and guest context the next step depends on — across web, app, and the front desk.',
          signals: [
            {
              id: 'availability-truth',
              label: 'Availability and rates have to be true in real time',
              description:
                'When inventory, prices, and packages are stitched across a booking site, a PMS, and third-party channels, a guest can book a room or seat that is already gone — and trust breaks on the first promise.',
            },
            {
              id: 'fragmented-journey',
              label: 'The journey fragments between systems',
              description:
                'Inspiration, booking, pre-arrival, the stay, and the return often live in disconnected tools, so the guest re-enters details and the operator loses the single thread of who is arriving and what they expect.',
            },
            {
              id: 'exception-recovery',
              label: 'Exceptions decide the real experience',
              description:
                'Failed payments, overbookings, cancellations, and change requests need named queues, evidence, and a staffed path back to a confirmed itinerary — not a silent error or an unanswered inbox.',
            },
          ],
        },
        {
          id: 'travel-guest-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'From inspiration to the return',
          title: 'One connected path from discovery to a remembered stay.',
          intro:
            'The system carries a guest through an understandable journey while keeping availability, property data, payment, and communication inside owned, reconcilable states behind the scenes.',
          stages: [
            {
              id: 'inspire',
              label: 'Inspire and discover',
              description:
                'The guest meets destinations, properties, tours, or packages through bilingual content and search that reflects what the operator actually offers.',
              actor: 'Guest',
            },
            {
              id: 'availability',
              label: 'Check availability and rates',
              description:
                'Real-time availability, rates, and packages are drawn from the connected property system or provider so what the guest sees is what can be booked.',
              actor: 'Guest and property or provider systems',
            },
            {
              id: 'booking',
              label: 'Book, pay, and confirm',
              description:
                'Room, seat, tour, or package is reserved once, paid through a validated gateway, and confirmed with an itinerary both the guest and the operator can trust.',
              actor: 'Guest and booking engine',
            },
            {
              id: 'prearrival',
              label: 'Prepare before arrival',
              description:
                'Consent-based pre-arrival messages, upsells, and check-in details reach the guest with timing the operator owns and a staffed path for questions.',
              actor: 'Operations and guest-experience team',
            },
            {
              id: 'stay',
              label: 'Arrive and stay',
              description:
                'A guest portal or app supports check-in, requests, itinerary changes, and on-property services while keeping the front desk and the record in sync.',
              actor: 'Guest and property team',
            },
            {
              id: 'return',
              label: 'Return and build loyalty',
              description:
                'Post-stay feedback, loyalty, and re-booking are connected to the same guest profile so the next journey starts with context, not a blank form.',
              actor: 'Guest and marketing owners',
            },
          ],
        },
        {
          id: 'travel-experience-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'Signature composition',
          title: 'The experience lives where the guest lane meets the operations lane.',
          intro:
            'Above the guest horizon the traveller sees inspiration, choices, confirmation, and support; below it teams coordinate availability, property data, payment, and communication for every visible step.',
          stages: [
            {
              id: 'inspire',
              label: 'Inspiration and choice',
              description: 'The guest browses and compares while the system reflects only offerings the operator has approved.',
              actor: 'Guest',
            },
            {
              id: 'availability',
              label: 'Availability and rates',
              description: 'Real-time inventory and pricing are bounded to the connected property or provider source.',
              actor: 'Property and revenue owners',
            },
            {
              id: 'booking',
              label: 'Booking and payment',
              description: 'A single reserved record keeps the guest itinerary and the operator ledger reconciled.',
              actor: 'Guest and booking engine',
            },
            {
              id: 'prearrival',
              label: 'Pre-arrival communication',
              description: 'Consent, timing, and messaging ownership sit below the line while the guest sees a clear plan.',
              actor: 'Guest-experience team',
            },
            {
              id: 'stay',
              label: 'On-property support',
              description: 'Requests and changes flow to a named queue and back to a confirmed itinerary.',
              actor: 'Property team',
            },
            {
              id: 'return',
              label: 'Loyalty and return',
              description: 'The guest sees a welcome-back; the operator keeps the profile, history, and consent record.',
              actor: 'Marketing and operations owners',
            },
          ],
          lanes: [
            {
              id: 'guest-lane',
              label: 'Guest lane',
              stageIds: ['inspire', 'availability', 'booking', 'prearrival', 'stay'],
            },
            {
              id: 'operations-lane',
              label: 'Operations and distribution lane',
              stageIds: ['availability', 'booking', 'prearrival', 'stay', 'return'],
            },
          ],
        },
        {
          id: 'travel-platform-system',
          type: 'system-blueprint',
          variant: 'service-line',
          answers: ['buildable-system'],
          eyebrow: 'A buildable boundary',
          title: 'A hospitality product is a connected set of owned layers.',
          intro:
            'Scope can start with one flow — a single booking engine or one guest portal — but every layer needs approved inputs, a named handoff, and an outcome the operator can reconcile and support.',
          layers: [
            {
              id: 'guest-experience',
              label: 'Guest experience layer',
              description:
                'Bilingual web, app, and guest-portal interfaces guide discovery, booking, pre-arrival, and the stay with content and rates the operator approves.',
              inputs: ['Approved property and offer content', 'Bilingual copy and disclosures', 'Rate and package presentation rules'],
              handoff: 'A confirmed, consented booking request',
              outcome: 'A guest who understands their itinerary and the next step',
            },
            {
              id: 'booking-engine',
              label: 'Booking, reservations, and payment layer',
              description:
                'A booking engine reserves rooms, seats, tours, or packages once, applies rules, and settles payment through a validated gateway with a reconcilable record.',
              inputs: ['Availability and rate model', 'Booking and cancellation rules', 'Validated payment gateway'],
              handoff: 'A single authoritative reservation record',
              outcome: 'Confirmations and ledgers an operator can trust',
            },
            {
              id: 'property-distribution',
              label: 'Property, PMS, and distribution layer',
              description:
                'Property, tour, and package management connect to channel managers and provider APIs so inventory and rates stay consistent across every channel.',
              inputs: ['Property or provider system access', 'Channel-manager and GDS interfaces', 'Reconciliation and mapping rules'],
              handoff: 'A bounded, mapped inventory exchange',
              outcome: 'One source of availability across web, app, and channels',
            },
            {
              id: 'platform-foundation',
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
          id: 'travel-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'Paths to implementation',
          title: 'Choose the build paths that assemble the platform.',
          intro:
            'The final combination depends on the journey you prioritize, the property, tour, or provider systems you already use, and the smallest complete, reconcilable handoff worth building first.',
          serviceIds: [
            'web-applications',
            'ecommerce-development',
            'website-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'web-applications',
              label: 'Booking engines and guest-portal web applications',
            },
            {
              serviceId: 'ecommerce-development',
              label: 'Direct booking, packages, and add-on checkout',
            },
            {
              serviceId: 'website-development',
              label: 'Travel and property marketing websites',
            },
            {
              serviceId: 'content-creation',
              label: 'Bilingual destination and property content',
            },
          ],
          relatedIndustryIds: ['restaurants', 'real-estate'],
          industryAnchors: [
            {
              industryId: 'restaurants',
              label: 'Explore dining and on-property ordering',
            },
            {
              industryId: 'real-estate',
              label: 'Explore property listing and viewing systems',
            },
          ],
        },
        {
          id: 'travel-boundaries',
          type: 'constraints',
          variant: 'owner-register',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Evidence and responsibility',
          title: 'The design makes operating boundaries explicit.',
          intro:
            'This page describes a proposed engineering model, not a booking guarantee or a promise of inventory. Rates, availability, provider access, and guest communication remain with the operator and its authorized owners.',
          items: [
            {
              id: 'inventory-source',
              label: 'Availability and rates are operator-owned',
              responsibility:
                'The platform surfaces the availability, rates, and packages the property or provider system confirms; it never invents inventory or fixes prices on its own.',
              dependency: 'A named revenue or property owner and an approved rate and availability source.',
              recovery: 'Fall back to request-to-book or an inquiry state until the live source is confirmed.',
            },
            {
              id: 'provider-access',
              label: 'Property, channel, and payment dependencies',
              responsibility:
                'PMS, channel-manager, GDS, and payment integrations depend on validated provider access, contracts, and market availability before live promises are shown.',
              dependency: 'Confirmed provider documentation, credentials, and market approval.',
              recovery: 'Hold the step behind a manual or sandboxed path until provider access is validated.',
            },
            {
              id: 'guest-communication',
              label: 'Pre-arrival and stay communication',
              responsibility:
                'Pre-arrival, upsell, and stay messages need guest consent, timing ownership, and a staffed recovery path — not automated sends without an owner.',
              dependency: 'An approved consent, timing, and escalation model with a named owner.',
              recovery: 'Pause automated messaging and route the guest to a staffed channel until consent and timing are confirmed.',
            },
            {
              id: 'booking-states',
              label: 'Booking, inquiry, and cancellation states',
              responsibility:
                'Inquiry, request-to-book, confirmed booking, change, and cancellation are distinct states the operator owns; the system reflects and reconciles them rather than blurring them.',
              dependency: 'Operator-approved booking, change, and cancellation policy wording.',
              recovery: 'Keep an unclear booking in a held state with a named owner instead of auto-confirming it.',
            },
          ],
        },
        {
          id: 'travel-regional-delivery',
          type: 'regional-fit',
          variant: 'market-path',
          answers: ['regional-delivery'],
          eyebrow: 'Built for bilingual travel',
          title: 'Arabic and English are operating languages, not a final translation step.',
          intro:
            'Destination and property content, rate and policy wording, pre-arrival messages, and guest-portal copy are authored for each language while one shared, reconcilable system structure stays constant.',
          items: [
            {
              id: 'bilingual-content',
              label: 'Native destination language',
              description:
                'Property descriptions, itineraries, and search terms are written for how travellers read, compare, and book in each language, not translated after the fact.',
            },
            {
              id: 'localized-policy',
              label: 'Localized rates, policy, and disclosures',
              description:
                'Currency, taxes, cancellation terms, and required disclosures stay accurate and readable in right-to-left and left-to-right contexts, under a named review owner.',
            },
            {
              id: 'market-dependencies',
              label: 'Market-by-market dependencies',
              description:
                'Payment gateways, channel and GDS access, currency, and regulatory requirements are checked per market before scope is fixed.',
            },
          ],
        },
        {
          id: 'travel-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'Decision questions',
          title: 'What travel and hospitality teams usually need to decide first.',
          intro:
            'A useful first scope is one complete, reconcilable flow — inspiration to confirmed booking, or booking to the stay — with named availability, payment, and communication owners.',
          items: [
            {
              id: 'inventory-role',
              question: 'Does CloudTopia sell rooms, tours, or seats?',
              answer:
                'No. We engineer the platform that surfaces the availability, rates, and packages your property or provider systems confirm. Inventory, pricing, and booking policy stay with you — the build keeps them accurate, reconciled, and traceable.',
            },
            {
              id: 'existing-pms',
              question: 'Can this connect to our existing PMS, channel manager, or GDS?',
              answer:
                'It is designed around the interfaces, fields, and access your providers confirm. We map the required inventory, rates, responsible systems, reconciliation source, and a manual or request-to-book fallback before committing to a live integration.',
            },
            {
              id: 'inquiry-vs-instant',
              question: 'Can the journey begin with an inquiry instead of instant booking?',
              answer:
                'Yes. Inquiry, request-to-book, and direct booking are different states that can share one clear itinerary, so you can launch with the model your operation supports and add live booking when the source is validated.',
            },
            {
              id: 'guest-app',
              question: 'Do you build the guest mobile app as well as the website?',
              answer:
                'Yes. Booking engines and guest portals can be delivered as bilingual web applications and as native iOS and Android apps that share the same reconciled booking and profile record, so the guest sees one journey across every device.',
            },
            {
              id: 'security',
              question: 'How is payment and guest data handled?',
              answer:
                'Security is engineered into the foundation — encryption in transit and at rest, role-based access, and key management — with payment handled through validated gateways scoped to the standards your operation approves, not added as a later layer.',
            },
            {
              id: 'starting-point',
              question: 'Where should a travel or hospitality team begin?',
              answer:
                'Begin with one high-value flow — a single booking engine, one channel integration, or one guest portal — identify every handoff, record, and owner it touches, then define the smallest reconcilable boundary that supports it end to end before expanding.',
            },
          ],
        },
        {
          id: 'travel-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'Choose the first journey',
          title: 'Make one reconcilable journey the starting point.',
          intro:
            'Bring one guest journey, the teams and providers who own it, and the property, channel, or payment systems it touches. We will turn that context into a bounded, buildable hospitality-system brief.',
          decisionCopy:
            'Start with one complete, reconcilable journey rather than a list of disconnected features.',
          primary: {
            label: 'Shape your guest journey',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore hospitality web applications',
            serviceId: 'web-applications',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'هندسة منصات السفر والضيافة — الحجز وإدارة المنشآت وتطبيقات الضيوف',
        description:
          'تهندس كلاود توبيا أنظمة سفر وضيافة ثنائية اللغة: محركات حجز، وإدارة منشآت وجولات وباقات، وبُناة مسارات رحلات، وتكاملات مع مديري القنوات، وبوابات ضيوف — من الإلهام حتى الإقامة والعودة.',
      },
      breadcrumbLabel: 'السفر والضيافة',
      hero: {
        worldLabel: 'أطلس رحلة الضيف',
        eyebrow: 'أنظمة تجربة الضيف',
        h1: 'نبني الأنظمة الرقمية التي تحمل كل رحلة ضيف.',
        intro:
          'تصمم كلاود توبيا وتهندس منصات سفر وضيافة ثنائية اللغة — محركات حجز، وإدارة منشآت وجولات وباقات، وبُناة مسارات رحلات، وتكاملات مع مديري القنوات، وبوابات ضيوف — لتتحرك مراحل الإلهام والتوفر والحجز والإقامة والعودة على نظام واحد مترابط.',
        primaryCta: {
          label: 'صمّموا رحلة ضيوفكم',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشفوا مسارات بناء الضيافة',
          serviceId: 'web-applications',
        },
        sceneSummary:
          'تبقى مراحل الإلهام والتوفر والحجز والوصول والعودة مرئية على مسار واحد يجمع الضيف والتشغيل.',
        sceneStages: [
          { id: 'inspire', label: 'الإلهام والاكتشاف', state: 'مرغوب' },
          { id: 'availability', label: 'التحقق من التوفر', state: 'محدّث' },
          { id: 'booking', label: 'الحجز والتأكيد', state: 'مؤكد' },
          { id: 'stay', label: 'الوصول والإقامة', state: 'مدعوم' },
          { id: 'return', label: 'العودة والولاء', state: 'محفوظ' },
        ],
      },
      sections: [
        {
          id: 'travel-operating-pressure',
          type: 'pressure-field',
          variant: 'constraints-first',
          answers: ['operating-pressure'],
          eyebrow: 'حيث تُكسب الرحلة أو تُفقد',
          title: 'يقرر الضيف قبل أن يصل.',
          intro:
            'يحكم المسافرون على المنشأة أو الرحلة في الشاشات الأولى، بينما يحتاج المشغل إلى أن يصل كل طلب حاملاً التوفر والسعر وسياق الضيف الذي تعتمد عليه الخطوة التالية — عبر الويب والتطبيق ومكتب الاستقبال.',
          signals: [
            {
              id: 'availability-truth',
              label: 'يجب أن يكون التوفر والأسعار صحيحاً لحظياً',
              description:
                'حين يتوزع المخزون والأسعار والباقات بين موقع حجز ونظام منشأة وقنوات خارجية، قد يحجز الضيف غرفة أو مقعداً لم يعد متاحاً، فتنكسر الثقة عند أول وعد.',
            },
            {
              id: 'fragmented-journey',
              label: 'تتفتت الرحلة بين الأنظمة',
              description:
                'كثيراً ما يعيش الإلهام والحجز وما قبل الوصول والإقامة والعودة في أدوات منفصلة، فيعيد الضيف إدخال بياناته ويفقد المشغل الخيط الواحد لمن سيصل وما يتوقعه.',
            },
            {
              id: 'exception-recovery',
              label: 'الاستثناءات هي ما يحدد التجربة الحقيقية',
              description:
                'تحتاج المدفوعات الفاشلة والحجز الزائد والإلغاءات وطلبات التغيير إلى قوائم محددة وأدلة ومسار يديره الفريق للعودة إلى مسار مؤكد، لا إلى خطأ صامت أو بريد بلا رد.',
            },
          ],
        },
        {
          id: 'travel-guest-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'من الإلهام إلى العودة',
          title: 'مسار واحد مترابط من الاكتشاف إلى إقامة تُحفظ في الذاكرة.',
          intro:
            'يحمل النظام الضيف عبر رحلة مفهومة، مع إبقاء التوفر وبيانات المنشأة والدفع والتواصل ضمن حالات مملوكة قابلة للمطابقة خلف الكواليس.',
          stages: [
            {
              id: 'inspire',
              label: 'الإلهام والاكتشاف',
              description:
                'يلتقي الضيف بالوجهات والمنشآت والجولات والباقات عبر محتوى وبحث ثنائيي اللغة يعكسان ما يقدمه المشغل فعلاً.',
              actor: 'الضيف',
            },
            {
              id: 'availability',
              label: 'التحقق من التوفر والأسعار',
              description:
                'يُسحب التوفر والأسعار والباقات لحظياً من نظام المنشأة أو المزود المتصل، فما يراه الضيف هو ما يمكن حجزه.',
              actor: 'الضيف وأنظمة المنشأة أو المزود',
            },
            {
              id: 'booking',
              label: 'الحجز والدفع والتأكيد',
              description:
                'تُحجز الغرفة أو المقعد أو الجولة أو الباقة مرة واحدة، وتُدفع عبر بوابة موثوقة، وتُؤكد بمسار يثق به الضيف والمشغل.',
              actor: 'الضيف ومحرك الحجز',
            },
            {
              id: 'prearrival',
              label: 'التحضير قبل الوصول',
              description:
                'تصل رسائل ما قبل الوصول والعروض الإضافية وتفاصيل تسجيل الدخول بموافقة الضيف وبتوقيت يملكه المشغل ومسار يديره الفريق للأسئلة.',
              actor: 'فريق التشغيل وتجربة الضيف',
            },
            {
              id: 'stay',
              label: 'الوصول والإقامة',
              description:
                'تدعم بوابة أو تطبيق الضيف تسجيل الدخول والطلبات وتغييرات المسار وخدمات المنشأة مع إبقاء مكتب الاستقبال والسجل متطابقين.',
              actor: 'الضيف وفريق المنشأة',
            },
            {
              id: 'return',
              label: 'العودة وبناء الولاء',
              description:
                'يرتبط تقييم ما بعد الإقامة والولاء وإعادة الحجز بملف الضيف نفسه لتبدأ الرحلة التالية بسياق، لا بنموذج فارغ.',
              actor: 'الضيف وأصحاب التسويق',
            },
          ],
        },
        {
          id: 'travel-experience-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'التكوين المميز',
          title: 'تعيش التجربة حيث يلتقي مسار الضيف بمسار التشغيل.',
          intro:
            'فوق أفق الضيف يرى المسافر الإلهام والخيارات والتأكيد والدعم، وتحته تنسّق الفرق التوفر وبيانات المنشأة والدفع والتواصل لكل خطوة ظاهرة.',
          stages: [
            {
              id: 'inspire',
              label: 'الإلهام والاختيار',
              description: 'يتصفح الضيف ويقارن بينما يعكس النظام ما اعتمده المشغل فقط.',
              actor: 'الضيف',
            },
            {
              id: 'availability',
              label: 'التوفر والأسعار',
              description: 'يُحصر المخزون والتسعير اللحظي ضمن مصدر المنشأة أو المزود المتصل.',
              actor: 'أصحاب المنشأة والإيرادات',
            },
            {
              id: 'booking',
              label: 'الحجز والدفع',
              description: 'يحافظ سجل حجز واحد على تطابق مسار الضيف ودفتر المشغل.',
              actor: 'الضيف ومحرك الحجز',
            },
            {
              id: 'prearrival',
              label: 'التواصل قبل الوصول',
              description: 'تبقى الموافقة والتوقيت وملكية الرسائل تحت الخط بينما يرى الضيف خطة واضحة.',
              actor: 'فريق تجربة الضيف',
            },
            {
              id: 'stay',
              label: 'الدعم في المنشأة',
              description: 'تنتقل الطلبات والتغييرات إلى قائمة محددة وتعود إلى مسار مؤكد.',
              actor: 'فريق المنشأة',
            },
            {
              id: 'return',
              label: 'الولاء والعودة',
              description: 'يرى الضيف ترحيباً بالعودة، ويحتفظ المشغل بالملف والتاريخ وسجل الموافقة.',
              actor: 'أصحاب التسويق والتشغيل',
            },
          ],
          lanes: [
            {
              id: 'guest-lane',
              label: 'مسار الضيف',
              stageIds: ['inspire', 'availability', 'booking', 'prearrival', 'stay'],
            },
            {
              id: 'operations-lane',
              label: 'مسار التشغيل والتوزيع',
              stageIds: ['availability', 'booking', 'prearrival', 'stay', 'return'],
            },
          ],
        },
        {
          id: 'travel-platform-system',
          type: 'system-blueprint',
          variant: 'service-line',
          answers: ['buildable-system'],
          eyebrow: 'نطاق قابل للبناء',
          title: 'منتج الضيافة مجموعة مترابطة من الطبقات ذات الملكية الواضحة.',
          intro:
            'يمكن أن يبدأ النطاق بمسار واحد — محرك حجز واحد أو بوابة ضيف واحدة — لكن كل طبقة تحتاج إلى مدخلات معتمدة وتسليم محدد ونتيجة يستطيع المشغل مطابقتها ودعمها.',
          layers: [
            {
              id: 'guest-experience',
              label: 'طبقة تجربة الضيف',
              description:
                'توجّه واجهات الويب والتطبيق وبوابة الضيف ثنائية اللغة الاكتشاف والحجز وما قبل الوصول والإقامة بمحتوى وأسعار يعتمدها المشغل.',
              inputs: ['محتوى منشأة وعروض معتمد', 'نصوص وإفصاحات ثنائية اللغة', 'قواعد عرض الأسعار والباقات'],
              handoff: 'طلب حجز مؤكد وموافَق عليه',
              outcome: 'ضيف يفهم مساره والخطوة التالية',
            },
            {
              id: 'booking-engine',
              label: 'طبقة الحجز والمدفوعات',
              description:
                'يحجز محرك الحجز الغرف والمقاعد والجولات والباقات مرة واحدة، ويطبق القواعد، ويسوّي الدفع عبر بوابة موثوقة بسجل قابل للمطابقة.',
              inputs: ['نموذج التوفر والأسعار', 'قواعد الحجز والإلغاء', 'بوابة دفع موثوقة'],
              handoff: 'سجل حجز مرجعي واحد',
              outcome: 'تأكيدات ودفاتر يثق بها المشغل',
            },
            {
              id: 'property-distribution',
              label: 'طبقة المنشأة وأنظمة الإدارة والتوزيع',
              description:
                'تتصل إدارة المنشآت والجولات والباقات بمديري القنوات وواجهات المزودين لتبقى الأسعار والمخزون متسقة عبر كل قناة.',
              inputs: ['وصول نظام المنشأة أو المزود', 'واجهات مديري القنوات وأنظمة التوزيع', 'قواعد المطابقة والربط'],
              handoff: 'تبادل مخزون محدود ومربوط',
              outcome: 'مصدر توفر واحد عبر الويب والتطبيق والقنوات',
            },
            {
              id: 'platform-foundation',
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
          id: 'travel-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'اختاروا مسارات البناء التي تجمع المنصة.',
          intro:
            'يتحدد المزيج النهائي بحسب الرحلة التي تعطونها الأولوية، وأنظمة المنشأة أو الجولات أو المزودين التي تستخدمونها أصلاً، وأصغر تسليم متكامل قابل للمطابقة يستحق البناء أولاً.',
          serviceIds: [
            'web-applications',
            'ecommerce-development',
            'website-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'web-applications',
              label: 'محركات حجز وتطبيقات ويب لبوابات الضيوف',
            },
            {
              serviceId: 'ecommerce-development',
              label: 'الحجز المباشر والباقات ودفع الخدمات الإضافية',
            },
            {
              serviceId: 'website-development',
              label: 'مواقع تسويق للسفر والمنشآت',
            },
            {
              serviceId: 'content-creation',
              label: 'محتوى وجهات ومنشآت ثنائي اللغة',
            },
          ],
          relatedIndustryIds: ['restaurants', 'real-estate'],
          industryAnchors: [
            {
              industryId: 'restaurants',
              label: 'استكشفوا الطعام والطلب داخل المنشأة',
            },
            {
              industryId: 'real-estate',
              label: 'استكشفوا أنظمة عرض العقارات والمعاينة',
            },
          ],
        },
        {
          id: 'travel-boundaries',
          type: 'constraints',
          variant: 'owner-register',
          answers: ['evidence-and-constraints'],
          eyebrow: 'الأدلة والمسؤوليات',
          title: 'يجعل التصميم حدود التشغيل صريحة.',
          intro:
            'تصف الصفحة نموذج هندسة مقترحاً، لا ضمان حجز ولا وعداً بمخزون. تبقى الأسعار والتوفر ووصول المزودين وتواصل الضيوف لدى المشغل وأصحاب الاختصاص المخولين.',
          items: [
            {
              id: 'inventory-source',
              label: 'التوفر والأسعار يملكها المشغل',
              responsibility:
                'يعرض النظام التوفر والأسعار والباقات التي يؤكدها نظام المنشأة أو المزود، ولا يبتكر مخزوناً ولا يحدد أسعاراً من تلقاء نفسه.',
              dependency: 'مالك إيرادات أو منشأة محدد ومصدر أسعار وتوفر معتمد.',
              recovery: 'العودة إلى حالة طلب الحجز أو الاستفسار حتى يتأكد المصدر المباشر.',
            },
            {
              id: 'provider-access',
              label: 'اعتماديات المنشأة والقنوات والدفع',
              responsibility:
                'تعتمد تكاملات نظام المنشأة ومديري القنوات وأنظمة التوزيع والدفع على وصول موثوق للمزود وعقود وتوفر في السوق قبل عرض وعود مباشرة.',
              dependency: 'توثيق مزود مؤكد وبيانات اعتماد وموافقة السوق.',
              recovery: 'إبقاء الخطوة خلف مسار يدوي أو تجريبي حتى يتأكد وصول المزود.',
            },
            {
              id: 'guest-communication',
              label: 'التواصل قبل الوصول وأثناء الإقامة',
              responsibility:
                'تحتاج رسائل ما قبل الوصول والعروض والإقامة إلى موافقة الضيف وملكية للتوقيت ومسار معالجة يديره الفريق، لا إرسالاً آلياً بلا مالك.',
              dependency: 'نموذج معتمد للموافقة والتوقيت والتصعيد بمالك محدد.',
              recovery: 'إيقاف الرسائل الآلية وتوجيه الضيف إلى قناة يديرها الفريق حتى تتأكد الموافقة والتوقيت.',
            },
            {
              id: 'booking-states',
              label: 'حالات الحجز والاستفسار والإلغاء',
              responsibility:
                'الاستفسار وطلب الحجز والحجز المؤكد والتغيير والإلغاء حالات متمايزة يملكها المشغل، يعكسها النظام ويطابقها بدلاً من خلطها.',
              dependency: 'صياغة معتمدة من المشغل لسياسة الحجز والتغيير والإلغاء.',
              recovery: 'إبقاء أي حجز غير واضح في حالة معلّقة بمالك محدد بدلاً من تأكيده آلياً.',
            },
          ],
        },
        {
          id: 'travel-regional-delivery',
          type: 'regional-fit',
          variant: 'market-path',
          answers: ['regional-delivery'],
          eyebrow: 'مصمم لسفر ثنائي اللغة',
          title: 'العربية والإنجليزية لغتا تشغيل، وليستا خطوة ترجمة أخيرة.',
          intro:
            'تُصاغ محتويات الوجهات والمنشآت ونصوص الأسعار والسياسات ورسائل ما قبل الوصول ونصوص بوابة الضيف لكل لغة، مع بقاء بنية نظام واحدة قابلة للمطابقة ثابتة.',
          items: [
            {
              id: 'bilingual-content',
              label: 'لغة وجهة طبيعية',
              description:
                'تُكتب أوصاف المنشآت والمسارات وعبارات البحث وفق طريقة قراءة المسافرين ومقارنتهم وحجزهم في كل لغة، لا كترجمة لاحقة.',
            },
            {
              id: 'localized-policy',
              label: 'أسعار وسياسات وإفصاحات موطّنة',
              description:
                'تبقى العملة والضرائب وشروط الإلغاء والإفصاحات المطلوبة دقيقة ومقروءة في السياقين العربي والإنجليزي، تحت مالك مراجعة محدد.',
            },
            {
              id: 'market-dependencies',
              label: 'اعتماديات حسب السوق',
              description:
                'تُراجَع بوابات الدفع ووصول القنوات وأنظمة التوزيع والعملة والمتطلبات التنظيمية لكل سوق قبل تثبيت النطاق.',
            },
          ],
        },
        {
          id: 'travel-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'أسئلة القرار',
          title: 'ما الذي تحتاج فرق السفر والضيافة إلى حسمه أولاً؟',
          intro:
            'النطاق الأول المفيد هو مسار مكتمل قابل للمطابقة — من الإلهام إلى حجز مؤكد، أو من الحجز إلى الإقامة — مع تحديد أصحاب التوفر والدفع والتواصل.',
          items: [
            {
              id: 'inventory-role',
              question: 'هل تبيع كلاود توبيا الغرف أو الجولات أو المقاعد؟',
              answer:
                'لا. نهندس المنصة التي تعرض التوفر والأسعار والباقات التي تؤكدها أنظمة منشأتكم أو مزوديكم. يبقى المخزون والتسعير وسياسة الحجز لديكم، ويجعلها البناء دقيقة ومطابَقة وقابلة للتتبع.',
            },
            {
              id: 'existing-pms',
              question: 'هل يمكن ربط ذلك بنظام المنشأة أو مدير القنوات أو نظام التوزيع الحالي؟',
              answer:
                'يُصمَّم حول الواجهات والحقول والوصول الذي يؤكده مزودوكم. نرسم المخزون والأسعار المطلوبة والأنظمة المسؤولة ومصدر المطابقة ومساراً بديلاً يدوياً أو بطلب حجز قبل الالتزام بتكامل مباشر.',
            },
            {
              id: 'inquiry-vs-instant',
              question: 'هل يمكن أن تبدأ الرحلة بالاستفسار بدلاً من الحجز الفوري؟',
              answer:
                'نعم. الاستفسار وطلب الحجز والحجز المباشر حالات مختلفة يمكن أن تشترك في مسار واحد واضح، فتنطلقون بالنموذج الذي يدعمه تشغيلكم وتضيفون الحجز المباشر حين يتأكد المصدر.',
            },
            {
              id: 'guest-app',
              question: 'هل تبنون تطبيق الضيف إلى جانب الموقع؟',
              answer:
                'نعم. يمكن تسليم محركات الحجز وبوابات الضيوف كتطبيقات ويب ثنائية اللغة وكتطبيقات أصلية على iOS وAndroid تتشارك سجل الحجز والملف نفسه، فيرى الضيف رحلة واحدة عبر كل جهاز.',
            },
            {
              id: 'security',
              question: 'كيف يُعالَج الدفع وبيانات الضيوف؟',
              answer:
                'يُهندَس الأمان في الأساس — تشفير أثناء النقل وفي التخزين، ووصول بحسب الأدوار، وإدارة للمفاتيح — مع معالجة الدفع عبر بوابات موثوقة بحسب المعايير التي يعتمدها تشغيلكم، لا كطبقة تُضاف لاحقاً.',
            },
            {
              id: 'starting-point',
              question: 'من أين يبدأ فريق السفر أو الضيافة؟',
              answer:
                'ابدؤوا بمسار واحد ذي قيمة عالية — محرك حجز واحد أو تكامل قناة واحد أو بوابة ضيف واحدة — وحددوا كل تسليم وسجل ومالك يمر بها، ثم ارسموا أصغر نطاق قابل للمطابقة يدعمه من طرف إلى طرف قبل التوسع.',
            },
          ],
        },
        {
          id: 'travel-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'اختاروا الرحلة الأولى',
          title: 'اجعلوا رحلة واحدة قابلة للمطابقة نقطة البداية.',
          intro:
            'أحضروا رحلة ضيف واحدة، والفرق والمزودين الذين يملكونها، وأنظمة المنشأة أو القنوات أو الدفع التي تمر بها، وسنحوّل هذا السياق إلى موجز نظام ضيافة محدد النطاق قابل للبناء.',
          decisionCopy:
            'ابدؤوا برحلة مكتملة واحدة قابلة للمطابقة، لا بقائمة خصائص منفصلة.',
          primary: {
            label: 'صمّموا رحلة ضيوفكم',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: 'استكشفوا تطبيقات ويب الضيافة',
            serviceId: 'web-applications',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
