import type { IndustryPageDefinition } from '@/lib/industries/types'

/**
 * Hand-authored Real-Estate "Industry World".
 *
 * The visible page (components/industry/real-estate/RealEstateIndustryPage.tsx)
 * ports the HouseBox template look and animations while presenting CloudTopia's
 * expertise BUILDING real-estate / proptech systems — listing and search
 * platforms, agent and agency portals, property-management and tenant systems,
 * virtual-tour / booking / lead-capture flows, and the map, integration, and
 * data layers around them. This definition drives the hero, the service-bridge
 * link cards, the FAQ, and the JSON-LD / markdown / SEO surfaces. Every other
 * ported visual section pulls its microcopy from real-estate-content.ts.
 *
 * Framing rule: CloudTopia ENGINEERS proptech systems — it is NOT a brokerage,
 * developer, or listing operator. Availability, pricing, ownership, and
 * disclosure data always come from approved property sources; the platform
 * presents and routes them, it never invents them.
 */
export const realEstateDefinition = {
  slug: 'real-estate',
  contentVersion: 'real-estate-housebox-published-1',
  publicationStatus: 'published',
  updatedAt: '2026-07-17',
  world: {
    id: 'listing-registry',
    theme: {
      // Derived from the HouseBox palette: lime-chartreuse accent (#CBCD30) used
      // as fill/highlight only, deep-teal (#073B3A) as the dark counterpart, and
      // near-black ink for all body/heading text on a warm off-white surface set.
      canvas: '#F4F5EC',
      surface: '#FFFFFF',
      elevatedSurface: '#ECEEDD',
      ink: '#081311',
      mutedInk: '#3C4A44',
      accent: '#CBCD30',
      accentInk: '#081311',
      signal: '#073B3A',
      line: '#D8DAC6',
      focus: '#073B3A',
      displayTreatment: 'technical',
      radiusMode: 'soft',
      motifDensity: 'medium',
      sceneTreatment: 'route-field',
    },
    heroScene: 'real-estate-registry',
    heroTreatment: 'route-field',
    signatureComposition: {
      id: 'listing-to-lead',
      name: {
        en: 'From listing to qualified lead',
        ar: 'من العرض إلى عميل مؤهل',
      },
      sectionIds: [
        'real-estate-experience-lanes',
        'real-estate-platform-system',
        'real-estate-discovery-journey',
      ],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'real-estate-registry' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/real-estate/en.jpg',
      width: 1200,
      height: 630,
    },
    {
      kind: 'og-image',
      locale: 'ar',
      publicPath: '/og/industries/real-estate/ar.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'Real Estate & PropTech Software: Listings & CRM',
        description:
          'CloudTopia engineers bilingual real-estate systems: property listing and search platforms, agent and tenant portals, virtual tours, booking, lead capture, and maps.',
      },
      breadcrumbLabel: 'Real Estate',
      hero: {
        worldLabel: 'Listing Registry',
        eyebrow: 'Property discovery systems',
        h1: 'We engineer the property platforms buyers, tenants, and agents rely on.',
        intro:
          'CloudTopia designs and builds bilingual real-estate systems—listing and search platforms, agent and agency portals, property-management and tenant portals, and the virtual-tour, booking, lead-capture, map, and integration layers around them—so every property, inquiry, and viewing keeps its context from first search to agent handoff.',
        primaryCta: {
          label: 'Map your property journey',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore property platform paths',
          serviceId: 'website-development',
        },
        sceneSummary:
          'Location, development, unit, qualified interest, and agent handoff stay visible on one readable property registry.',
        sceneStages: [
          { id: 'explore', label: 'Explore the project', state: 'Located' },
          { id: 'compare', label: 'Filter and compare', state: 'Comparable' },
          { id: 'qualify', label: 'Qualify interest', state: 'Qualified' },
          { id: 'viewing', label: 'Book a viewing', state: 'Scheduled' },
          { id: 'handoff', label: 'Agent handoff', state: 'Owned' },
        ],
      },
      sections: [
        {
          id: 'real-estate-operating-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'Where a property search breaks',
          title: 'A property platform is judged before anyone books a viewing.',
          intro:
            'Buyers and tenants decide whether to trust a property platform in the first few screens, while agents and operators need every inquiry to arrive with the location, budget, and intent the next conversation depends on.',
          signals: [
            {
              id: 'search-friction',
              label: 'Search is where interest is won or lost',
              description:
                'When map, filter, and detail views disagree on what is available, seekers stall on the wrong units and never reach the listings that actually fit them.',
            },
            {
              id: 'listing-integrity',
              label: 'Listings need one trustworthy source',
              description:
                'Availability, price, media, and disclosures only hold up when every listing is recorded once against an approved source and reflected consistently to every view.',
            },
            {
              id: 'lead-context',
              label: 'A lead is only useful with its context',
              description:
                'Inquiries, saved searches, and viewing requests need to reach the right agent with the full history—so nobody re-asks what the seeker already told the platform.',
            },
          ],
        },
        {
          id: 'real-estate-discovery-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'From first search to handoff',
          title: 'One clear path from property discovery to a qualified agent handoff.',
          intro:
            'The system carries a seeker through an understandable property sequence while keeping availability, media rights, and lead ownership inside owned, traceable states.',
          stages: [
            {
              id: 'explore',
              label: 'Explore and search',
              description:
                'A seeker meets projects, areas, and units through map and filter views built on one approved catalog, so what they see reflects what is genuinely offered.',
              actor: 'Buyer or tenant',
            },
            {
              id: 'compare',
              label: 'Filter and compare',
              description:
                'Saved searches, shortlists, and side-by-side comparisons let the seeker narrow options while the platform remembers every preference and view.',
              actor: 'Buyer or tenant',
            },
            {
              id: 'qualify',
              label: 'Qualify interest',
              description:
                'Budget, timing, financing, and requirements are captured through clear forms and tours, turning anonymous interest into a described, routable inquiry.',
              actor: 'Buyer, tenant, and platform',
            },
            {
              id: 'viewing',
              label: 'Book a viewing',
              description:
                'Booking and scheduling flows offer real, confirmable slots and virtual-tour options, each recorded once and reflected to seeker and agent alike.',
              actor: 'Seeker and scheduling system',
            },
            {
              id: 'handoff',
              label: 'Hand off to an agent',
              description:
                'Rules route the qualified inquiry to the right agent by project, area, language, or budget, carrying the full history so no context is lost.',
              actor: 'Agents and operations owners',
            },
            {
              id: 'followup',
              label: 'Follow up and record',
              description:
                'Every conversation, offer, and status change keeps a traceable record so the seeker, the agent, and the operator all see the same current state.',
              actor: 'Agents and platform',
            },
          ],
        },
        {
          id: 'real-estate-experience-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'Signature composition',
          title: 'A listing becomes a lead where the seeker lane meets the operations lane.',
          intro:
            'The experience is designed as two coordinated lanes: what the seeker sees and does, and the catalog, ownership, and routing the agency must hold behind each visible step.',
          stages: [
            {
              id: 'explore',
              label: 'Discovery surface',
              description: 'The seeker browses; the platform serves one approved catalog with rights-cleared media.',
              actor: 'Buyer or tenant',
            },
            {
              id: 'compare',
              label: 'Preferences captured',
              description: 'Saved searches and shortlists are stored against a clear owner and privacy rule.',
              actor: 'Seeker and platform',
            },
            {
              id: 'qualify',
              label: 'Interest described',
              description: 'Both lanes share one qualified inquiry state with the context the agent will read.',
              actor: 'Seeker and operations owners',
            },
            {
              id: 'viewing',
              label: 'Viewing recorded',
              description: 'A single booking event keeps the seeker view and the agent calendar reconciled.',
              actor: 'Seeker and scheduling system',
            },
            {
              id: 'handoff',
              label: 'Lead ownership',
              description: 'Routing assigns a named agent and next action while preserving the full inquiry history.',
              actor: 'Agents and operations owners',
            },
            {
              id: 'followup',
              label: 'Shared record',
              description: 'The seeker sees the outcome; the agency keeps the traceable, reportable record.',
              actor: 'Agents and platform',
            },
          ],
          lanes: [
            {
              id: 'seeker-lane',
              label: 'Seeker lane',
              stageIds: ['explore', 'compare', 'qualify', 'viewing', 'handoff'],
            },
            {
              id: 'operations-lane',
              label: 'Agency operations lane',
              stageIds: ['qualify', 'viewing', 'handoff', 'followup'],
            },
          ],
        },
        {
          id: 'real-estate-platform-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'A buildable boundary',
          title: 'A property platform is a connected set of owned layers.',
          intro:
            'Scope can start with one flow, but every layer needs an approved source, a named handoff, and an outcome the agency can reconcile and report.',
          layers: [
            {
              id: 'discovery-experience',
              label: 'Discovery and search layer',
              description:
                'Bilingual web and application interfaces present projects, listings, and units with map, filter, comparison, and virtual-tour views built on one catalog.',
              inputs: ['Approved property catalog', 'Rights-cleared media', 'Map and location data'],
              handoff: 'A described, routable inquiry',
              outcome: 'A seeker who reaches the units that genuinely fit',
            },
            {
              id: 'listing-catalog',
              label: 'Listing and catalog layer',
              description:
                'Properties, availability, pricing, and disclosures are recorded once against an approved source, versioned, and reflected consistently to every view.',
              inputs: ['Source-of-truth listing data', 'Availability and status rules', 'Disclosure and media ownership'],
              handoff: 'A single authoritative listing record',
              outcome: 'Availability and detail a seeker and agent can trust',
            },
            {
              id: 'lead-operations',
              label: 'Lead, portal, and operations layer',
              description:
                'Agent and agency portals, lead routing, viewing scheduling, and status tracking apply agency-owned rules and keep every inquiry accountable.',
              inputs: ['Routing and assignment rules', 'Agent and role model', 'Scheduling and availability'],
              handoff: 'A routed lead with a named owner',
              outcome: 'A traceable inquiry that reaches the right agent',
            },
            {
              id: 'integration-data',
              label: 'Integration, map, and data layer',
              description:
                'Map and geo search, source-feed synchronisation, payment, electronic-signature, and messaging integrations connect the platform within agreed limits.',
              inputs: ['Validated provider interfaces', 'Geo and mapping services', 'Access and monitoring policy'],
              handoff: 'A bounded, observed data exchange',
              outcome: 'A connected platform that stays inside its controls',
            },
          ],
        },
        {
          id: 'real-estate-service-paths',
          type: 'service-bridge',
          variant: 'route-links',
          answers: [],
          eyebrow: 'Paths to implementation',
          title: 'Choose the build paths that assemble the platform.',
          intro:
            'The final combination depends on the flow you prioritise, the property sources and tools you already use, and the smallest complete, reconcilable handoff worth building first.',
          serviceIds: [
            'website-development',
            'web-applications',
            'business-systems-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'website-development',
              label: 'Property and project marketing websites',
            },
            {
              serviceId: 'web-applications',
              label: 'Listing platforms, portals, and agent applications',
            },
            {
              serviceId: 'business-systems-development',
              label: 'Property-management, CRM, and operations systems',
            },
            {
              serviceId: 'content-creation',
              label: 'Bilingual listing and disclosure content',
            },
          ],
          relatedIndustryIds: ['construction', 'professional-services'],
          industryAnchors: [
            {
              industryId: 'construction',
              label: 'Explore developer and construction systems',
            },
            {
              industryId: 'professional-services',
              label: 'Explore advisory and brokerage platforms',
            },
          ],
        },
        {
          id: 'real-estate-data-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Evidence and responsibility',
          title: 'The design makes property-data boundaries explicit.',
          intro:
            'This page describes a proposed engineering model, not property advice, a valuation, or a listing service. Availability, pricing, ownership, disclosures, and media rights remain with the property source and its authorized owners.',
          items: [
            {
              id: 'source-of-truth',
              label: 'Availability and price come from an approved source',
              responsibility:
                'The platform presents and routes listing data, but availability, pricing, and ownership must originate from a source the agency or developer approves and maintains.',
              dependency: 'A named data source and update owner for every listing field.',
              recovery: 'Label a field as indicative and hold live promises until the source feed is validated.',
            },
            {
              id: 'media-rights',
              label: 'Media, maps, and floor plans need cleared rights',
              responsibility:
                'Photos, tours, maps, and floor plans require explicit usage rights, version ownership, and a responsible party for updates before they are published.',
              dependency: 'Confirmed media rights and a version-ownership map.',
              recovery: 'Withhold unverified media and show an approved placeholder until rights are confirmed.',
            },
            {
              id: 'lead-privacy',
              label: 'Inquiry and personal data',
              responsibility:
                'Seeker contact details, saved searches, and inquiry history need defined ownership, consent, and retention rules before they are captured or routed.',
              dependency: 'An approved consent, ownership, and retention policy.',
              recovery: 'Keep the record access-restricted until its consent and retention rules are confirmed.',
            },
            {
              id: 'integration-access',
              label: 'Source-feed and payment dependencies',
              responsibility:
                'Listing feeds, mapping, payment, and electronic-signature integrations depend on validated provider access, contracts, and market availability.',
              dependency: 'Confirmed provider documentation, credentials, and market approval.',
              recovery: 'Hold the step behind a manual or sandboxed path until provider access is validated.',
            },
          ],
        },
        {
          id: 'real-estate-regional-delivery',
          type: 'regional-fit',
          variant: 'market-path',
          answers: ['regional-delivery'],
          eyebrow: 'Built for bilingual property markets',
          title: 'Arabic and English are operating languages, not a final translation step.',
          intro:
            'Listing wording, area and amenity names, disclosure copy, and agent messages are authored for each language while one shared, reconcilable catalog structure stays constant.',
          items: [
            {
              id: 'bilingual-listings',
              label: 'Native listing language',
              description:
                'Property descriptions, area names, and amenity wording are written for how seekers read and search in each language, not translated after the fact.',
            },
            {
              id: 'localized-disclosures',
              label: 'Localized disclosures and units',
              description:
                'Areas, measurements, currency, and required disclosures stay accurate and readable in right-to-left and left-to-right layouts, under a named review owner.',
            },
            {
              id: 'market-dependencies',
              label: 'Market-by-market dependencies',
              description:
                'Listing sources, mapping coverage, payment rails, and regulatory requirements are checked per market before scope is fixed.',
            },
          ],
        },
        {
          id: 'real-estate-faq',
          type: 'faq',
          variant: 'grouped-questions',
          answers: [],
          eyebrow: 'Decision questions',
          title: 'What real-estate teams usually need to decide first.',
          intro:
            'A useful first scope is one complete, reconcilable flow—search to inquiry, or inquiry to agent handoff—with named data, media, and lead owners.',
          items: [
            {
              id: 'without-live-inventory',
              question: 'Can a property platform launch without live inventory?',
              answer:
                'Yes. The first release can present approved projects and qualify interest, while live availability stays clearly labelled as indicative until a source-feed integration is validated. That lets you launch discovery and lead capture before every system is connected.',
            },
            {
              id: 'existing-sources',
              question: 'Can this connect to our existing listing sources or portals?',
              answer:
                'It is designed around the feeds, fields, and access your sources confirm. We map the required data, the responsible system, the reconciliation source, and a manual or sandboxed fallback before committing to a live integration.',
            },
            {
              id: 'lead-routing',
              question: 'How are agents connected to qualified inquiries?',
              answer:
                'Routing rules can assign by project, area, language, budget, or availability while preserving the full inquiry history, so the receiving agent and the next action are always visible and nothing is re-asked.',
            },
            {
              id: 'virtual-tours',
              question: 'Can you build virtual tours, maps, and booking together?',
              answer:
                'Yes. Map and geo search, virtual-tour embedding, and viewing scheduling are engineered as connected layers on one catalog, so a seeker can search, tour, and book without losing context between them.',
            },
            {
              id: 'data-accuracy',
              question: 'Who owns the accuracy of prices and availability?',
              answer:
                'The property source does. The platform records each field once against an approved source and reflects it consistently, and any field without a validated live feed is presented as indicative rather than guaranteed.',
            },
            {
              id: 'starting-point',
              question: 'Where should a real-estate team begin?',
              answer:
                'Begin with one high-value flow—usually search-to-inquiry or inquiry-to-handoff—identify every listing, media asset, and lead owner it touches, then define the smallest reconcilable catalog boundary that supports it end to end before expanding.',
            },
          ],
        },
        {
          id: 'real-estate-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'Choose the first flow',
          title: 'Make one reconcilable property flow the starting point.',
          intro:
            'Bring one property flow, the agents and sources that own it, and the systems it touches. We will turn that context into a bounded, buildable property-system brief.',
          decisionCopy:
            'Start with one complete, reconcilable flow rather than a list of disconnected features.',
          primary: {
            label: 'Map your property journey',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore property platform websites',
            serviceId: 'website-development',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'أنظمة العقارات: منصات عرض وبوابات وإدارة عملاء',
        description:
          'تبني كلاود توبيا أنظمة عقارية ثنائية اللغة: منصات عرض وبحث عن العقارات، وبوابات للوسطاء والمستأجرين، وجولات افتراضية، وحجوزات، والتقاط عملاء محتملين، وخرائط تفاعلية.',
      },
      breadcrumbLabel: 'العقارات',
      hero: {
        worldLabel: 'سجل العروض العقارية',
        eyebrow: 'أنظمة الرحلة العقارية',
        h1: 'نهندس المنصات العقارية التي يعتمد عليها المشترون والمستأجرون والوسطاء.',
        intro:
          'تصمم كلاود توبيا وتبني أنظمة عقارية ثنائية اللغة—منصات عرض وبحث، وبوابات للوسطاء والوكالات، وبوابات لإدارة العقارات والمستأجرين، وطبقات الجولات الافتراضية والحجز والتقاط العملاء والخرائط والتكامل المحيطة بها—بحيث يحتفظ كل عقار واستفسار ومعاينة بسياقه من أول بحث إلى التسليم للوسيط.',
        primaryCta: {
          label: 'لنرسم رحلتكم العقارية',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشفوا مسارات المنصات العقارية',
          serviceId: 'website-development',
        },
        sceneSummary:
          'يبقى الموقع والمشروع والوحدة والاهتمام المؤهل والتسليم للوسيط مرئياً على سجل عقاري واحد واضح.',
        sceneStages: [
          { id: 'explore', label: 'استكشاف المشروع', state: 'محدد' },
          { id: 'compare', label: 'التصفية والمقارنة', state: 'قابل للمقارنة' },
          { id: 'qualify', label: 'تأهيل الاهتمام', state: 'مؤهل' },
          { id: 'viewing', label: 'حجز المعاينة', state: 'مجدول' },
          { id: 'handoff', label: 'التسليم للوسيط', state: 'بمالك واضح' },
        ],
      },
      sections: [
        {
          id: 'real-estate-operating-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'أين تتعثر الرحلة العقارية',
          title: 'يُحكم على المنصة العقارية قبل أن يحجز أحد معاينة.',
          intro:
            'يقرر المشترون والمستأجرون الثقة بالمنصة العقارية في الشاشات الأولى، بينما يحتاج الوسطاء وفريق التشغيل إلى أن يصل كل استفسار حاملاً الموقع والميزانية والنية التي يعتمد عليها الحوار التالي.',
          signals: [
            {
              id: 'search-friction',
              label: 'عند البحث يُكسب الاهتمام أو يُفقد',
              description:
                'حين تختلف الخريطة والفلاتر وصفحة التفاصيل حول المتوفر، يتعثر الباحث على وحدات غير مناسبة ولا يصل إلى العروض التي تلائمه فعلاً.',
            },
            {
              id: 'listing-integrity',
              label: 'تحتاج العروض إلى مصدر واحد موثوق',
              description:
                'لا تصمد بيانات التوفر والسعر والوسائط والإفصاحات إلا حين يُسجَّل كل عرض مرة واحدة من مصدر معتمد وينعكس باتساق على كل واجهة.',
            },
            {
              id: 'lead-context',
              label: 'العميل المحتمل لا ينفع إلا بسياقه',
              description:
                'تحتاج الاستفسارات وعمليات البحث المحفوظة وطلبات المعاينة إلى الوصول للوسيط المناسب بسجلها الكامل، حتى لا يُعاد سؤال الباحث عمّا أخبر به المنصة أصلاً.',
            },
          ],
        },
        {
          id: 'real-estate-discovery-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'من أول بحث إلى التسليم',
          title: 'مسار واحد واضح من اكتشاف العقار إلى تسليم مؤهل للوسيط.',
          intro:
            'يحمل النظام الباحث عبر تسلسل عقاري مفهوم، مع إبقاء التوفر وحقوق الوسائط وملكية العميل المحتمل ضمن حالات مملوكة قابلة للتتبع.',
          stages: [
            {
              id: 'explore',
              label: 'الاستكشاف والبحث',
              description:
                'يطّلع الباحث على المشاريع والمناطق والوحدات عبر واجهات الخريطة والفلاتر المبنية على كتالوج معتمد واحد، فيعكس ما يراه ما هو معروض فعلاً.',
              actor: 'المشتري أو المستأجر',
            },
            {
              id: 'compare',
              label: 'التصفية والمقارنة',
              description:
                'تتيح عمليات البحث المحفوظة والقوائم المختصرة والمقارنة جنباً إلى جنب تضييق الخيارات، بينما يتذكر النظام كل تفضيل وواجهة اطّلع عليها الباحث.',
              actor: 'المشتري أو المستأجر',
            },
            {
              id: 'qualify',
              label: 'تأهيل الاهتمام',
              description:
                'تُلتقط الميزانية والتوقيت والتمويل والمتطلبات عبر نماذج وجولات واضحة، فيتحول الاهتمام المجهول إلى استفسار موصوف قابل للتوجيه.',
              actor: 'المشتري والمستأجر والمنصة',
            },
            {
              id: 'viewing',
              label: 'حجز المعاينة',
              description:
                'تعرض مسارات الحجز والجدولة مواعيد حقيقية قابلة للتأكيد وخيارات جولة افتراضية، يُسجَّل كل منها مرة واحدة وينعكس للباحث والوسيط معاً.',
              actor: 'الباحث ونظام الجدولة',
            },
            {
              id: 'handoff',
              label: 'التسليم للوسيط',
              description:
                'توجّه القواعد الاستفسار المؤهل إلى الوسيط المناسب بحسب المشروع أو المنطقة أو اللغة أو الميزانية، مع نقل السجل الكامل فلا يضيع أي سياق.',
              actor: 'الوسطاء وأصحاب التشغيل',
            },
            {
              id: 'followup',
              label: 'المتابعة والتسجيل',
              description:
                'يحتفظ كل حوار وعرض وتغيير حالة بسجل قابل للتتبع، ليرى الباحث والوسيط وفريق التشغيل الحالة الراهنة نفسها.',
              actor: 'الوسطاء والمنصة',
            },
          ],
        },
        {
          id: 'real-estate-experience-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'التكوين المميز',
          title: 'يتحول العرض إلى عميل محتمل عند التقاء مسار الباحث بمسار التشغيل.',
          intro:
            'تُصمم التجربة كمسارين متناسقين: ما يراه الباحث ويفعله، والكتالوج والملكية والتوجيه الذي يجب أن تحتفظ به الوكالة خلف كل خطوة ظاهرة.',
          stages: [
            {
              id: 'explore',
              label: 'واجهة الاكتشاف',
              description: 'يتصفح الباحث؛ وتقدم المنصة كتالوجاً معتمداً واحداً بوسائط مُصرَّح باستخدامها.',
              actor: 'المشتري أو المستأجر',
            },
            {
              id: 'compare',
              label: 'التقاط التفضيلات',
              description: 'تُخزَّن عمليات البحث المحفوظة والقوائم المختصرة لدى مالك واضح وبقاعدة خصوصية.',
              actor: 'الباحث والمنصة',
            },
            {
              id: 'qualify',
              label: 'وصف الاهتمام',
              description: 'يتشارك المساران حالة استفسار مؤهل واحدة تحمل السياق الذي سيقرأه الوسيط.',
              actor: 'الباحث وأصحاب التشغيل',
            },
            {
              id: 'viewing',
              label: 'تسجيل المعاينة',
              description: 'يحافظ حدث حجز واحد على تطابق واجهة الباحث مع مفكرة الوسيط.',
              actor: 'الباحث ونظام الجدولة',
            },
            {
              id: 'handoff',
              label: 'ملكية العميل المحتمل',
              description: 'يعيّن التوجيه وسيطاً محدداً وخطوة تالية مع حفظ سجل الاستفسار كاملاً.',
              actor: 'الوسطاء وأصحاب التشغيل',
            },
            {
              id: 'followup',
              label: 'السجل المشترك',
              description: 'يرى الباحث النتيجة، وتحتفظ الوكالة بالسجل القابل للتتبع والتقرير.',
              actor: 'الوسطاء والمنصة',
            },
          ],
          lanes: [
            {
              id: 'seeker-lane',
              label: 'مسار الباحث',
              stageIds: ['explore', 'compare', 'qualify', 'viewing', 'handoff'],
            },
            {
              id: 'operations-lane',
              label: 'مسار تشغيل الوكالة',
              stageIds: ['qualify', 'viewing', 'handoff', 'followup'],
            },
          ],
        },
        {
          id: 'real-estate-platform-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'نطاق قابل للبناء',
          title: 'المنصة العقارية مجموعة مترابطة من الطبقات ذات الملكية الواضحة.',
          intro:
            'يمكن أن يبدأ النطاق بمسار واحد، لكن كل طبقة تحتاج إلى مصدر معتمد وتسليم محدد ونتيجة تستطيع الوكالة مطابقتها والتقرير عنها.',
          layers: [
            {
              id: 'discovery-experience',
              label: 'طبقة الاكتشاف والبحث',
              description:
                'تعرض واجهات الويب والتطبيقات ثنائية اللغة المشاريع والعروض والوحدات بواجهات خريطة وفلاتر ومقارنة وجولات افتراضية مبنية على كتالوج واحد.',
              inputs: ['كتالوج عقاري معتمد', 'وسائط مُصرَّح باستخدامها', 'بيانات الخرائط والمواقع'],
              handoff: 'استفسار موصوف قابل للتوجيه',
              outcome: 'باحث يصل إلى الوحدات التي تلائمه فعلاً',
            },
            {
              id: 'listing-catalog',
              label: 'طبقة العروض والكتالوج',
              description:
                'تُسجَّل العقارات والتوفر والأسعار والإفصاحات مرة واحدة من مصدر معتمد، وتُدار بالإصدارات، وتنعكس باتساق على كل واجهة.',
              inputs: ['بيانات عروض مرجعية', 'قواعد التوفر والحالة', 'ملكية الإفصاحات والوسائط'],
              handoff: 'سجل عرض مرجعي واحد',
              outcome: 'توفر وتفاصيل يثق بها الباحث والوسيط',
            },
            {
              id: 'lead-operations',
              label: 'طبقة العملاء والبوابات والتشغيل',
              description:
                'تطبق بوابات الوسطاء والوكالات وتوجيه العملاء وجدولة المعاينات وتتبع الحالة قواعد تملكها الوكالة وتُبقي كل استفسار قابلاً للمساءلة.',
              inputs: ['قواعد التوجيه والإسناد', 'نموذج الوسيط والأدوار', 'الجدولة والتوفر'],
              handoff: 'عميل محتمل موجَّه بمالك واضح',
              outcome: 'استفسار قابل للتتبع يصل إلى الوسيط المناسب',
            },
            {
              id: 'integration-data',
              label: 'طبقة التكامل والخرائط والبيانات',
              description:
                'تربط الخرائط والبحث الجغرافي ومزامنة مصادر البيانات والدفع والتوقيع الإلكتروني والمراسلة المنصة ضمن الحدود المتفق عليها.',
              inputs: ['واجهات مزودين موثوقة', 'خدمات الخرائط والموقع', 'سياسة الوصول والمراقبة'],
              handoff: 'تبادل بيانات محدود ومراقَب',
              outcome: 'منصة مترابطة تبقى ضمن ضوابطها',
            },
          ],
        },
        {
          id: 'real-estate-service-paths',
          type: 'service-bridge',
          variant: 'route-links',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'اختاروا مسارات البناء التي تجمع المنصة.',
          intro:
            'يتحدد المزيج النهائي بحسب المسار الذي تعطونه الأولوية، والمصادر والأدوات العقارية التي تستخدمونها أصلاً، وأصغر تسليم متكامل قابل للمطابقة يستحق البناء أولاً.',
          serviceIds: [
            'website-development',
            'web-applications',
            'business-systems-development',
            'content-creation',
          ],
          serviceAnchors: [
            {
              serviceId: 'website-development',
              label: 'مواقع تسويق العقارات والمشاريع',
            },
            {
              serviceId: 'web-applications',
              label: 'منصات العرض والبوابات وتطبيقات الوسطاء',
            },
            {
              serviceId: 'business-systems-development',
              label: 'أنظمة إدارة العقارات وعلاقات العملاء والتشغيل',
            },
            {
              serviceId: 'content-creation',
              label: 'محتوى عروض وإفصاحات ثنائي اللغة',
            },
          ],
          relatedIndustryIds: ['construction', 'professional-services'],
          industryAnchors: [
            {
              industryId: 'construction',
              label: 'استكشفوا أنظمة المطورين والإنشاء',
            },
            {
              industryId: 'professional-services',
              label: 'استكشفوا منصات الاستشارة والوساطة',
            },
          ],
        },
        {
          id: 'real-estate-data-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'الأدلة والمسؤوليات',
          title: 'يجعل التصميم حدود البيانات العقارية صريحة.',
          intro:
            'تصف الصفحة نموذج هندسة مقترحاً، لا استشارة عقارية ولا تقييماً ولا خدمة إدراج عروض. يبقى التوفر والسعر والملكية والإفصاحات وحقوق الوسائط لدى مصدر العقار وأصحابه المخولين.',
          items: [
            {
              id: 'source-of-truth',
              label: 'التوفر والسعر يأتيان من مصدر معتمد',
              responsibility:
                'تعرض المنصة بيانات العروض وتوجّهها، لكن التوفر والأسعار والملكية يجب أن تنبع من مصدر تعتمده الوكالة أو المطور وتتولى تحديثه.',
              dependency: 'مصدر بيانات ومالك تحديث محدد لكل حقل في العرض.',
              recovery: 'وسم الحقل بأنه إرشادي وإيقاف الوعود المباشرة حتى يُعتمد مصدر البيانات.',
            },
            {
              id: 'media-rights',
              label: 'الوسائط والخرائط والمخططات تحتاج حقوقاً مُصرَّحة',
              responsibility:
                'تتطلب الصور والجولات والخرائط والمخططات حقوق استخدام صريحة وملكية للإصدار وجهة مسؤولة عن التحديث قبل نشرها.',
              dependency: 'حقوق وسائط مؤكدة وخريطة لملكية الإصدارات.',
              recovery: 'حجب الوسائط غير الموثقة وعرض بديل معتمد حتى تتأكد الحقوق.',
            },
            {
              id: 'lead-privacy',
              label: 'بيانات الاستفسار والبيانات الشخصية',
              responsibility:
                'تحتاج بيانات تواصل الباحث وعمليات البحث المحفوظة وسجل الاستفسار إلى قواعد ملكية وموافقة واحتفاظ محددة قبل التقاطها أو توجيهها.',
              dependency: 'سياسة معتمدة للموافقة والملكية والاحتفاظ.',
              recovery: 'إبقاء السجل مقيَّد الوصول حتى تتأكد قواعد الموافقة والاحتفاظ.',
            },
            {
              id: 'integration-access',
              label: 'اعتماديات مصادر البيانات والدفع',
              responsibility:
                'تعتمد تكاملات مصادر العروض والخرائط والدفع والتوقيع الإلكتروني على وصول موثوق للمزود وعقود وتوفر في السوق.',
              dependency: 'توثيق مزود مؤكد وبيانات اعتماد وموافقة السوق.',
              recovery: 'إبقاء الخطوة خلف مسار يدوي أو تجريبي حتى يتأكد وصول المزود.',
            },
          ],
        },
        {
          id: 'real-estate-regional-delivery',
          type: 'regional-fit',
          variant: 'market-path',
          answers: ['regional-delivery'],
          eyebrow: 'مصمم لأسواق عقارية ثنائية اللغة',
          title: 'العربية والإنجليزية لغتا تشغيل، وليستا خطوة ترجمة أخيرة.',
          intro:
            'تُصاغ نصوص العروض وأسماء المناطق والمرافق ونصوص الإفصاح ورسائل الوسطاء لكل لغة، مع بقاء بنية كتالوج واحدة قابلة للمطابقة ثابتة.',
          items: [
            {
              id: 'bilingual-listings',
              label: 'لغة عروض طبيعية',
              description:
                'تُكتب أوصاف العقارات وأسماء المناطق وصياغة المرافق وفق طريقة قراءة الباحثين وبحثهم في كل لغة، لا كترجمة لاحقة.',
            },
            {
              id: 'localized-disclosures',
              label: 'إفصاحات ووحدات موطنة',
              description:
                'تبقى المساحات والقياسات والعملة والإفصاحات المطلوبة دقيقة ومقروءة في التخطيطين العربي والإنجليزي، تحت مالك مراجعة محدد.',
            },
            {
              id: 'market-dependencies',
              label: 'اعتماديات حسب السوق',
              description:
                'تُراجَع مصادر العروض وتغطية الخرائط وقنوات الدفع والمتطلبات التنظيمية لكل سوق قبل تثبيت النطاق.',
            },
          ],
        },
        {
          id: 'real-estate-faq',
          type: 'faq',
          variant: 'grouped-questions',
          answers: [],
          eyebrow: 'أسئلة القرار',
          title: 'ما الذي تحتاج فرق العقارات إلى حسمه أولاً؟',
          intro:
            'النطاق الأول المفيد هو مسار مكتمل قابل للمطابقة—من البحث إلى الاستفسار، أو من الاستفسار إلى التسليم للوسيط—مع تحديد أصحاب البيانات والوسائط والعملاء المحتملين.',
          items: [
            {
              id: 'without-live-inventory',
              question: 'هل يمكن إطلاق منصة عقارية دون مخزون مباشر؟',
              answer:
                'نعم. يمكن للإصدار الأول عرض المشاريع المعتمدة وتأهيل الاهتمام، مع بقاء التوفر المباشر موسوماً بأنه إرشادي حتى يُعتمد تكامل مصدر البيانات. هذا يتيح إطلاق الاكتشاف والتقاط العملاء قبل ربط كل الأنظمة.',
            },
            {
              id: 'existing-sources',
              question: 'هل يمكن الربط بمصادر العروض أو البوابات الحالية لدينا؟',
              answer:
                'يُصمَّم حول المصادر والحقول والوصول الذي تؤكده مصادركم. نرسم البيانات المطلوبة والنظام المسؤول ومصدر المطابقة والمسار اليدوي أو التجريبي البديل قبل الالتزام بتكامل مباشر.',
            },
            {
              id: 'lead-routing',
              question: 'كيف تُربط الاستفسارات المؤهلة بالوسطاء؟',
              answer:
                'يمكن لقواعد التوجيه الإسناد بحسب المشروع أو المنطقة أو اللغة أو الميزانية أو التوفر مع حفظ سجل الاستفسار كاملاً، فيبقى الوسيط المستلم والخطوة التالية ظاهرين ولا يُعاد سؤال الباحث.',
            },
            {
              id: 'virtual-tours',
              question: 'هل يمكنكم بناء الجولات الافتراضية والخرائط والحجز معاً؟',
              answer:
                'نعم. تُهندَس الخرائط والبحث الجغرافي وتضمين الجولات الافتراضية وجدولة المعاينات كطبقات مترابطة على كتالوج واحد، فيبحث الباحث ويتجول ويحجز دون فقدان السياق بينها.',
            },
            {
              id: 'data-accuracy',
              question: 'من يملك دقة الأسعار والتوفر؟',
              answer:
                'مصدر العقار يملكها. تسجّل المنصة كل حقل مرة واحدة من مصدر معتمد وتعكسه باتساق، وأي حقل بلا مصدر مباشر موثوق يُعرض بوصفه إرشادياً لا مضموناً.',
            },
            {
              id: 'starting-point',
              question: 'من أين يبدأ فريق العقارات؟',
              answer:
                'ابدؤوا بمسار واحد ذي قيمة عالية—غالباً من البحث إلى الاستفسار أو من الاستفسار إلى التسليم—وحددوا كل عرض وأصل وسائط ومالك عميل محتمل يمر به، ثم ارسموا أصغر حدود كتالوج قابلة للمطابقة تدعمه من طرف إلى طرف قبل التوسع.',
            },
          ],
        },
        {
          id: 'real-estate-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'اختاروا المسار الأول',
          title: 'اجعلوا مساراً عقارياً واحداً قابلاً للمطابقة نقطة البداية.',
          intro:
            'أحضروا مساراً عقارياً واحداً، والوسطاء والمصادر الذين يملكونه، والأنظمة التي يمر بها، وسنحوّل هذا السياق إلى موجز نظام عقاري محدد النطاق قابل للبناء.',
          decisionCopy:
            'ابدؤوا بمسار مكتمل واحد قابل للمطابقة، لا بقائمة خصائص منفصلة.',
          primary: {
            label: 'لنرسم رحلتكم العقارية',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: 'استكشفوا مواقع المنصات العقارية',
            serviceId: 'website-development',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
