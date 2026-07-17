import type { IndustryPageDefinition } from '@/lib/industries/types'

/**
 * Hand-authored Logistics & Supply-Chain "Industry World".
 *
 * The visible page (components/industry/logistics-supply-chain/
 * LogisticsSupplyChainIndustryPage.tsx) ports the Logistick template look and
 * signature animations while presenting CloudTopia's expertise BUILDING
 * logistics systems: order/inventory, warehouse (WMS), transport (TMS), fleet
 * and route optimization, shipment tracking & visibility, and control-tower
 * dashboards. This definition drives the hero, the service-bridge link cards,
 * the FAQ, and the JSON-LD / markdown / SEO surfaces. Every other ported visual
 * section pulls its microcopy from logistics-supply-chain-content.ts.
 *
 * Framing rule: CloudTopia ENGINEERS the software that plans, records, and
 * shows freight, inventory, and fleets. It is NOT a carrier, broker, or customs
 * authority. Physical operations, carrier contracts, customs clearance, and
 * regulatory approval remain with the operator and its authorized owners; the
 * systems SUPPORT those owned processes, they never perform or certify them.
 */
export const logisticsSupplyChainDefinition = {
  slug: 'logistics-supply-chain',
  contentVersion: 'logistics-logistick-published-1',
  publicationStatus: 'published',
  updatedAt: '2026-07-17',
  world: {
    id: 'control-tower',
    theme: {
      // Derived from the Logistick palette: vivid logistics red accent
      // (#df1118) over a near-black navy-teal ink (#032330) on light neutrals.
      canvas: '#F9FAFA',
      surface: '#FFFFFF',
      elevatedSurface: '#EEEFF1',
      ink: '#032330',
      mutedInk: '#586069',
      accent: '#DF1118',
      accentInk: '#FFFFFF',
      signal: '#032330',
      line: '#DFE2E6',
      focus: '#DF1118',
      displayTreatment: 'technical',
      radiusMode: 'soft',
      motifDensity: 'medium',
      sceneTreatment: 'route-field',
    },
    heroScene: 'logistics-flow',
    heroTreatment: 'route-field',
    signatureComposition: {
      id: 'control-tower-view',
      name: {
        en: 'Control-tower view',
        ar: 'رؤية برج التحكم',
      },
      sectionIds: [
        'logistics-visibility-lanes',
        'logistics-shipment-journey',
        'logistics-platform-system',
      ],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'logistics-flow' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/logistics-supply-chain/en.jpg',
      width: 1200,
      height: 630,
    },
    {
      kind: 'og-image',
      locale: 'ar',
      publicPath: '/og/industries/logistics-supply-chain/ar.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'Logistics & Supply-Chain Software: TMS & WMS',
        description:
          'CloudTopia engineers bilingual logistics systems: order and inventory, warehouse and transport management, route optimization, shipment tracking, and control towers.',
      },
      breadcrumbLabel: 'Logistics & Supply Chain',
      hero: {
        worldLabel: 'Control Tower',
        eyebrow: 'Supply-chain product systems',
        h1: 'We engineer the software that moves your freight, inventory, and fleets.',
        intro:
          'CloudTopia designs and builds bilingual logistics systems—order and inventory, warehouse and transport management, fleet and route optimization, shipment tracking and visibility, and control-tower dashboards—so every shipment, exception, and handoff stays visible from order to proof of delivery.',
        primaryCta: {
          label: 'Map your order-to-delivery flow',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore logistics system paths',
          serviceId: 'business-systems-development',
        },
        sceneSummary:
          'Orders, inventory, shipments, fleet events, and exceptions stay visible on one reconciled control-tower rail.',
        sceneStages: [
          { id: 'order', label: 'Order captured', state: 'Recorded' },
          { id: 'inventory', label: 'Inventory allocated', state: 'Reserved' },
          { id: 'dispatch', label: 'Dispatch & route', state: 'Planned' },
          { id: 'transit', label: 'In transit', state: 'Tracked' },
          { id: 'delivery', label: 'Proof of delivery', state: 'Confirmed' },
        ],
      },
      sections: [
        {
          id: 'logistics-operating-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'Where the chain breaks',
          title: 'A supply chain is only as reliable as its least visible handoff.',
          intro:
            'Every order crosses systems, partners, and warehouses that rarely share one record, so the moment a shipment stalls, the team loses the thread of where it is, who owns it, and what to do next.',
          signals: [
            {
              id: 'visibility-gap',
              label: 'Visibility ends where the next system begins',
              description:
                'Orders, warehouse moves, carrier scans, and delivery events are often stitched across disconnected tools, so no one view answers "where is it, and is it on time?"',
            },
            {
              id: 'inventory-truth',
              label: 'Inventory needs one reconciled truth',
              description:
                'Stock, allocations, and in-transit units only hold up when every movement is recorded once, reconciled against the physical count, and traceable to an owner and a location.',
            },
            {
              id: 'exception-cost',
              label: 'Exceptions decide the real service level',
              description:
                'Delays, failed deliveries, short-shipments, and returns need named queues, evidence, and a documented path back to the plan—not a spreadsheet and a phone call.',
            },
          ],
        },
        {
          id: 'logistics-shipment-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'From order to proof of delivery',
          title: 'One reconciled path from order to delivery and reconciliation.',
          intro:
            'The system carries a shipment through an understandable operational sequence while keeping inventory, ownership, and every status change inside recorded, traceable states.',
          stages: [
            {
              id: 'order',
              label: 'Capture the order',
              description:
                'Orders arrive from channels or partners and are recorded once, validated against inventory and service rules the operator owns.',
              actor: 'Customer and order system',
            },
            {
              id: 'allocate',
              label: 'Allocate inventory',
              description:
                'Stock is reserved against a location and reconciled with the warehouse count, so promised units and physical units stay in agreement.',
              actor: 'Inventory and warehouse owners',
            },
            {
              id: 'fulfil',
              label: 'Pick, pack, and dispatch',
              description:
                'Warehouse tasks and carrier selection produce a labeled, manifested shipment with a single authoritative record and an owner.',
              actor: 'Warehouse and dispatch team',
            },
            {
              id: 'transit',
              label: 'Track in transit',
              description:
                'Carrier scans, fleet telemetry, and milestone events update one shipment record, reflected consistently to every operator and customer view.',
              actor: 'Carriers, fleet, and tracking system',
            },
            {
              id: 'deliver',
              label: 'Confirm delivery',
              description:
                'Proof of delivery, signatures, or exceptions are captured and reconciled against the plan, closing the shipment or opening a named exception.',
              actor: 'Driver and delivery system',
            },
            {
              id: 'reconcile',
              label: 'Reconcile and review',
              description:
                'Costs, performance, and returns are reconciled so authorized reviewers can follow what happened, when, and against which service commitment.',
              actor: 'Operations and finance reviewers',
            },
          ],
        },
        {
          id: 'logistics-visibility-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'Signature composition',
          title: 'Control appears where the physical lane meets the data lane.',
          intro:
            'The operation is modeled as two coordinated lanes: what physically moves through the network, and the record, ownership, and controls the operator must hold behind every visible movement.',
          stages: [
            {
              id: 'order',
              label: 'Order intake',
              description: 'A physical demand becomes one recorded order with a validated promise the operator can keep.',
              actor: 'Customer and order system',
            },
            {
              id: 'allocate',
              label: 'Inventory allocation',
              description: 'The physical count and the reserved record stay reconciled to one location and owner.',
              actor: 'Inventory and warehouse owners',
            },
            {
              id: 'dispatch',
              label: 'Dispatch decision',
              description: 'Both lanes share one shipment state, with the carrier and route the operator selected.',
              actor: 'Dispatch and planning owners',
            },
            {
              id: 'transit',
              label: 'Transit record',
              description: 'Scans and telemetry keep the moving unit and the tracked record in agreement.',
              actor: 'Carriers, fleet, and tracking system',
            },
            {
              id: 'exception',
              label: 'Exception ownership',
              description: 'A named queue holds the evidence and the documented return path to the plan.',
              actor: 'Operations and support team',
            },
            {
              id: 'audit',
              label: 'Reconciliation trail',
              description: 'The customer sees the outcome; the operator keeps the traceable, reviewable record.',
              actor: 'Authorized reviewers',
            },
          ],
          lanes: [
            {
              id: 'physical-lane',
              label: 'Physical movement lane',
              stageIds: ['order', 'allocate', 'dispatch', 'transit', 'exception'],
            },
            {
              id: 'data-lane',
              label: 'Data and control lane',
              stageIds: ['allocate', 'dispatch', 'transit', 'exception', 'audit'],
            },
          ],
        },
        {
          id: 'logistics-platform-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'A buildable boundary',
          title: 'A logistics platform is a connected set of owned layers.',
          intro:
            'Scope can start with one flow—one warehouse, one lane, one carrier—but every layer needs approved inputs, a named handoff, and an outcome the operator can reconcile and review.',
          layers: [
            {
              id: 'order-inventory',
              label: 'Order & inventory layer',
              description:
                'Order capture, allocation, and inventory records keep promised, physical, and in-transit units reconciled across channels and locations.',
              inputs: ['Order channels and rules', 'Inventory and location model', 'Reconciliation counts'],
              handoff: 'A validated order with reserved stock',
              outcome: 'Promised and physical units that agree',
            },
            {
              id: 'warehouse-transport',
              label: 'Warehouse (WMS) & transport (TMS) layer',
              description:
                'Pick, pack, dispatch, carrier selection, and route planning turn an order into a manifested shipment with a single authoritative record.',
              inputs: ['Warehouse task model', 'Carrier and rate rules', 'Route and service constraints'],
              handoff: 'A labeled, manifested shipment',
              outcome: 'A dispatch decision an owner can defend',
            },
            {
              id: 'tracking-visibility',
              label: 'Tracking & visibility layer',
              description:
                'Carrier scans, fleet telemetry, and milestone events feed one shipment timeline and a control-tower view of exceptions and SLAs.',
              inputs: ['Carrier and telematics feeds', 'Milestone and status model', 'SLA and alert rules'],
              handoff: 'One reconciled shipment status',
              outcome: 'A control-tower view a team can act on',
            },
            {
              id: 'integration-observability',
              label: 'Integration & observability layer',
              description:
                'EDI, APIs, provider integrations, monitoring, and audit trails keep the platform connected and verifiable within agreed limits.',
              inputs: ['Approved partner interfaces', 'Access and data policy', 'Monitoring and alert rules'],
              handoff: 'A bounded, observed data exchange',
              outcome: 'A connected platform that stays inside its controls',
            },
          ],
        },
        {
          id: 'logistics-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'Paths to implementation',
          title: 'Choose the build paths that assemble the platform.',
          intro:
            'The final combination depends on the flow you prioritize, the carriers, warehouses, and systems you already use, and the smallest complete, reconcilable handoff worth building first.',
          serviceIds: [
            'business-systems-development',
            'web-applications',
            'ecommerce-development',
            'website-development',
          ],
          serviceAnchors: [
            {
              serviceId: 'business-systems-development',
              label: 'WMS, TMS, and control-tower operations systems',
            },
            {
              serviceId: 'web-applications',
              label: 'Logistics web applications and partner portals',
            },
            {
              serviceId: 'ecommerce-development',
              label: 'Merchant checkout, order intake, and fulfillment integrations',
            },
            {
              serviceId: 'website-development',
              label: 'Logistics product and tracking websites',
            },
          ],
          relatedIndustryIds: ['ecommerce-retail', 'retail'],
          industryAnchors: [
            {
              industryId: 'ecommerce-retail',
              label: 'Explore commerce and fulfilment systems',
            },
            {
              industryId: 'retail',
              label: 'Explore retail and inventory systems',
            },
          ],
        },
        {
          id: 'logistics-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Evidence and responsibility',
          title: 'The design makes operational boundaries explicit.',
          intro:
            'This page describes a proposed engineering model, not a carrier service, a customs authorization, or a compliance certification. Physical operations, carrier contracts, customs clearance, and regulatory approval remain with the operator and its authorized owners.',
          items: [
            {
              id: 'operations-boundary',
              label: 'We build the system, not the fleet',
              responsibility:
                'CloudTopia engineers the software that plans, records, and shows the operation; the physical fleet, warehouse labor, and carrier relationships remain owned and operated by you.',
              dependency: 'A named operations owner and the process the system must support.',
              recovery: 'Hold the affected step behind a manual process until the operational owner confirms it.',
            },
            {
              id: 'carrier-dependencies',
              label: 'Carrier and telematics dependencies',
              responsibility:
                'Tracking, rating, and label integrations depend on validated carrier access, telematics feeds, contracts, and market availability confirmed by you.',
              dependency: 'Confirmed carrier and device documentation, credentials, and coverage.',
              recovery: 'Keep the step behind a manual or sandboxed path until provider access is validated.',
            },
            {
              id: 'customs-compliance',
              label: 'Customs and regulatory boundary',
              responsibility:
                'The platform can prepare documents and records, but customs clearance, licensing, and regulatory decisions are owned by authorities and your compliance team.',
              dependency: 'Approved document requirements and a named compliance owner.',
              recovery: 'Route unclear cases to a human owner instead of presenting an unowned automated decision.',
            },
            {
              id: 'data-ownership',
              label: 'Order, shipment, and location records',
              responsibility:
                'Every operational record needs explicit ownership, retention, and access rules defined and approved before it is captured.',
              dependency: 'An approved data-ownership, retention, and access map.',
              recovery: 'Keep the record isolated and access-restricted until its rules are confirmed.',
            },
          ],
        },
        {
          id: 'logistics-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'Built for bilingual logistics',
          title: 'Arabic and English are operating languages, not a final translation step.',
          intro:
            'Operator consoles, driver and warehouse apps, customer tracking, and partner messages are authored for each language while one shared, reconcilable system structure stays constant.',
          items: [
            {
              id: 'bilingual-operations',
              label: 'Native operational language',
              description:
                'Warehouse, dispatch, and tracking wording is written for how operators and drivers read and act in each language, not translated after the fact.',
            },
            {
              id: 'address-formats',
              label: 'Regional addresses and routing',
              description:
                'Address formats, zones, and routing stay accurate and usable in right-to-left and left-to-right contexts, under a named review owner.',
            },
            {
              id: 'market-dependencies',
              label: 'Market-by-market dependencies',
              description:
                'Carriers, customs requirements, currencies, and last-mile coverage are checked per market before scope is fixed.',
            },
          ],
        },
        {
          id: 'logistics-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'Decision questions',
          title: 'What logistics teams usually need to decide first.',
          intro:
            'A useful first scope is one complete, reconcilable flow—order to dispatch, or dispatch to proof of delivery—with named inventory, tracking, and operational owners.',
          items: [
            {
              id: 'operator-role',
              question: 'Does CloudTopia move freight or operate the fleet?',
              answer:
                'No. We engineer the systems that plan, record, and show your operation—order, inventory, WMS, TMS, tracking, and control-tower dashboards. The physical fleet, warehouse labor, and carrier contracts stay with you; the software supports how you already run.',
            },
            {
              id: 'existing-systems',
              question: 'Can this connect to our existing WMS, ERP, or carriers?',
              answer:
                'It is designed around the interfaces, fields, and access your systems and carriers confirm. We map the required data, responsible systems, reconciliation source, and a manual or sandboxed fallback before committing to a live integration—via EDI or API.',
            },
            {
              id: 'realtime-tracking',
              question: 'How does shipment tracking and visibility work?',
              answer:
                'Carrier scans, telematics, and milestone events feed one shipment record and a control-tower view. We define the status model, SLA rules, and alerting so exceptions surface before a customer has to ask where their order is.',
            },
            {
              id: 'exception-scoping',
              question: 'How should exception handling be scoped?',
              answer:
                'Start with named exception types—delay, failed delivery, short-shipment, return—each with an owner, evidence requirements, and a documented path back to the plan, so nothing becomes a silent spreadsheet.',
            },
            {
              id: 'route-optimization',
              question: 'Can you build fleet and route optimization?',
              answer:
                'Yes. Route planning, load, and fleet optimization are engineered around the constraints and objectives your operations team owns, with explainable results a planner can review and override, not a black box.',
            },
            {
              id: 'starting-point',
              question: 'Where should a logistics team begin?',
              answer:
                'Begin with one high-value flow—one lane, warehouse, or carrier—identify every handoff, record, and owner it touches, then define the smallest reconcilable system boundary that supports it end to end before expanding.',
            },
          ],
        },
        {
          id: 'logistics-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'Choose the first flow',
          title: 'Make one reconcilable flow the starting point.',
          intro:
            'Bring one logistics flow, the teams, carriers, and warehouses that own it, and the systems it touches. We will turn that context into a bounded, buildable supply-chain-system brief.',
          decisionCopy:
            'Start with one complete, reconcilable flow rather than a list of disconnected features.',
          primary: {
            label: 'Map your order-to-delivery flow',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore logistics operations systems',
            serviceId: 'business-systems-development',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'أنظمة اللوجستيات وسلاسل الإمداد والتتبع',
        description:
          'تبني كلاود توبيا أنظمة لوجستيات وسلاسل إمداد ثنائية اللغة: إدارة الطلبات والمخزون والمستودعات والنقل، وتحسين مسارات الأسطول، وتتبع الشحنات، ولوحات تحكم مركزية.',
      },
      breadcrumbLabel: 'اللوجستيات وسلاسل الإمداد',
      hero: {
        worldLabel: 'برج التحكم',
        eyebrow: 'أنظمة منتجات سلاسل الإمداد',
        h1: 'نهندس البرمجيات التي تحرّك شحناتكم ومخزونكم وأساطيلكم.',
        intro:
          'تصمم كلاود توبيا وتبني أنظمة لوجستية ثنائية اللغة—الطلبات والمخزون، وإدارة المستودعات والنقل، وتحسين الأسطول والمسارات، وتتبع الشحنات ورؤيتها، ولوحات أبراج التحكم—لتبقى كل شحنة واستثناء وتسليم مرئية من الطلب حتى إثبات التسليم.',
        primaryCta: {
          label: 'لنرسم رحلة الطلب حتى التسليم',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشفوا مسارات أنظمة اللوجستيات',
          serviceId: 'business-systems-development',
        },
        sceneSummary:
          'تبقى الطلبات والمخزون والشحنات وأحداث الأسطول والاستثناءات مرئية على مسار برج تحكم واحد مطابَق.',
        sceneStages: [
          { id: 'order', label: 'التقاط الطلب', state: 'مسجَّل' },
          { id: 'inventory', label: 'تخصيص المخزون', state: 'محجوز' },
          { id: 'dispatch', label: 'الإرسال والمسار', state: 'مخطَّط' },
          { id: 'transit', label: 'أثناء النقل', state: 'متتبَّع' },
          { id: 'delivery', label: 'إثبات التسليم', state: 'مؤكَّد' },
        ],
      },
      sections: [
        {
          id: 'logistics-operating-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'أين تنكسر السلسلة',
          title: 'سلسلة الإمداد بقوة أضعف تسليم غير مرئي فيها.',
          intro:
            'يعبر كل طلب أنظمة وشركاء ومستودعات نادراً ما تتشارك سجلاً واحداً، فلحظة تعثّر الشحنة يفقد الفريق تتبع أين هي ومن يملكها وما الإجراء التالي.',
          signals: [
            {
              id: 'visibility-gap',
              label: 'الرؤية تنتهي حيث يبدأ النظام التالي',
              description:
                'كثيراً ما تتوزع الطلبات وحركات المستودع ومسح الناقل وأحداث التسليم بين أدوات منفصلة، فلا توجد واجهة واحدة تجيب: أين هي، وهل في الموعد؟',
            },
            {
              id: 'inventory-truth',
              label: 'المخزون يحتاج إلى حقيقة واحدة مطابَقة',
              description:
                'لا تصمد المخزونات والحجوزات والوحدات قيد النقل إلا حين يُسجَّل كل حركة مرة واحدة، وتُطابَق مع الجرد الفعلي، ويمكن تتبعها إلى مالك وموقع.',
            },
            {
              id: 'exception-cost',
              label: 'الاستثناءات هي ما يحدد مستوى الخدمة الحقيقي',
              description:
                'تحتاج التأخيرات والتسليمات الفاشلة والنقص في الشحن والمرتجعات إلى قوائم محددة وأدلة ومسار موثق للعودة إلى الخطة، لا إلى جدول ومكالمة هاتفية.',
            },
          ],
        },
        {
          id: 'logistics-shipment-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'من الطلب إلى إثبات التسليم',
          title: 'مسار واحد مطابَق من الطلب إلى التسليم والمطابقة.',
          intro:
            'يحمل النظام الشحنة عبر تسلسل تشغيلي مفهوم، مع إبقاء المخزون والملكية وكل تغيّر في الحالة ضمن حالات مسجَّلة قابلة للتتبع.',
          stages: [
            {
              id: 'order',
              label: 'التقاط الطلب',
              description:
                'تصل الطلبات من القنوات أو الشركاء وتُسجَّل مرة واحدة، ويُتحقق منها مقابل المخزون وقواعد الخدمة التي يملكها المشغّل.',
              actor: 'العميل ونظام الطلبات',
            },
            {
              id: 'allocate',
              label: 'تخصيص المخزون',
              description:
                'يُحجز المخزون مقابل موقع ويُطابَق مع جرد المستودع، لتبقى الوحدات الموعودة والفعلية متطابقة.',
              actor: 'أصحاب المخزون والمستودع',
            },
            {
              id: 'fulfil',
              label: 'التجهيز والتغليف والإرسال',
              description:
                'تنتج مهام المستودع واختيار الناقل شحنة معنونة ومبيَّنة بسجل مرجعي واحد ومالك واضح.',
              actor: 'فريق المستودع والإرسال',
            },
            {
              id: 'transit',
              label: 'التتبع أثناء النقل',
              description:
                'يحدّث مسح الناقل وقياسات الأسطول وأحداث المراحل سجل شحنة واحداً، ينعكس باتساق على كل واجهة للمشغّل والعميل.',
              actor: 'الناقلون والأسطول ونظام التتبع',
            },
            {
              id: 'deliver',
              label: 'تأكيد التسليم',
              description:
                'يُلتقط إثبات التسليم أو التوقيع أو الاستثناء ويُطابَق مع الخطة، فيُغلق الشحنة أو يفتح استثناءً محدداً.',
              actor: 'السائق ونظام التسليم',
            },
            {
              id: 'reconcile',
              label: 'المطابقة والمراجعة',
              description:
                'تُطابَق التكاليف والأداء والمرتجعات ليتمكن المراجعون المخولون من متابعة ما حدث ومتى ومقابل أي التزام خدمة.',
              actor: 'مراجعو التشغيل والمالية',
            },
          ],
        },
        {
          id: 'logistics-visibility-lanes',
          type: 'journey-map',
          variant: 'dual-lane',
          answers: [],
          eyebrow: 'التكوين المميز',
          title: 'يظهر التحكم عند التقاء المسار المادي بمسار البيانات.',
          intro:
            'تُنمذَج العملية كمسارين متناسقين: ما يتحرك مادياً عبر الشبكة، والسجل والملكية والضوابط التي يجب أن يحتفظ بها المشغّل خلف كل حركة ظاهرة.',
          stages: [
            {
              id: 'order',
              label: 'استقبال الطلب',
              description: 'يتحول الطلب المادي إلى طلب مسجَّل واحد بوعد موثوق يستطيع المشغّل الوفاء به.',
              actor: 'العميل ونظام الطلبات',
            },
            {
              id: 'allocate',
              label: 'تخصيص المخزون',
              description: 'يبقى الجرد الفعلي والسجل المحجوز مطابَقين لموقع ومالك واحد.',
              actor: 'أصحاب المخزون والمستودع',
            },
            {
              id: 'dispatch',
              label: 'قرار الإرسال',
              description: 'يتشارك المساران حالة شحنة واحدة، بالناقل والمسار اللذين اختارهما المشغّل.',
              actor: 'أصحاب الإرسال والتخطيط',
            },
            {
              id: 'transit',
              label: 'سجل النقل',
              description: 'يحافظ المسح والقياسات على تطابق الوحدة المتحركة مع السجل المتتبَّع.',
              actor: 'الناقلون والأسطول ونظام التتبع',
            },
            {
              id: 'exception',
              label: 'ملكية الاستثناء',
              description: 'تحتفظ قائمة محددة بالأدلة وبمسار العودة الموثق إلى الخطة.',
              actor: 'فريق التشغيل والدعم',
            },
            {
              id: 'audit',
              label: 'سجل المطابقة',
              description: 'يرى العميل النتيجة، ويحتفظ المشغّل بالسجل القابل للتتبع والمراجعة.',
              actor: 'المراجعون المخولون',
            },
          ],
          lanes: [
            {
              id: 'physical-lane',
              label: 'مسار الحركة المادية',
              stageIds: ['order', 'allocate', 'dispatch', 'transit', 'exception'],
            },
            {
              id: 'data-lane',
              label: 'مسار البيانات والتحكم',
              stageIds: ['allocate', 'dispatch', 'transit', 'exception', 'audit'],
            },
          ],
        },
        {
          id: 'logistics-platform-system',
          type: 'system-blueprint',
          variant: 'stacked-layers',
          answers: ['buildable-system'],
          eyebrow: 'نطاق قابل للبناء',
          title: 'المنصة اللوجستية مجموعة مترابطة من الطبقات ذات الملكية الواضحة.',
          intro:
            'يمكن أن يبدأ النطاق بمسار واحد—مستودع واحد، خط واحد، ناقل واحد—لكن كل طبقة تحتاج إلى مدخلات معتمدة وتسليم محدد ونتيجة يستطيع المشغّل مطابقتها ومراجعتها.',
          layers: [
            {
              id: 'order-inventory',
              label: 'طبقة الطلبات والمخزون',
              description:
                'يبقي التقاط الطلب والتخصيص وسجلات المخزون الوحدات الموعودة والفعلية وقيد النقل مطابَقة عبر القنوات والمواقع.',
              inputs: ['قنوات الطلب وقواعده', 'نموذج المخزون والمواقع', 'عمليات جرد المطابقة'],
              handoff: 'طلب موثَّق بمخزون محجوز',
              outcome: 'وحدات موعودة وفعلية متطابقة',
            },
            {
              id: 'warehouse-transport',
              label: 'طبقة إدارة المستودعات والنقل',
              description:
                'يحوّل التجهيز والتغليف والإرسال واختيار الناقل وتخطيط المسار الطلب إلى شحنة مبيَّنة بسجل مرجعي واحد.',
              inputs: ['نموذج مهام المستودع', 'قواعد الناقلين والأسعار', 'قيود المسار والخدمة'],
              handoff: 'شحنة معنونة ومبيَّنة',
              outcome: 'قرار إرسال يستطيع المالك الدفاع عنه',
            },
            {
              id: 'tracking-visibility',
              label: 'طبقة التتبع والرؤية',
              description:
                'يغذّي مسح الناقل وقياسات الأسطول وأحداث المراحل خط زمن شحنة واحداً ورؤية برج تحكم للاستثناءات ومستويات الخدمة.',
              inputs: ['تغذيات الناقلين والقياس عن بُعد', 'نموذج المراحل والحالات', 'قواعد الخدمة والتنبيه'],
              handoff: 'حالة شحنة واحدة مطابَقة',
              outcome: 'رؤية برج تحكم يستطيع الفريق التصرف بها',
            },
            {
              id: 'integration-observability',
              label: 'طبقة التكامل والمراقبة',
              description:
                'يحافظ التبادل الإلكتروني وواجهات البرمجة وتكاملات المزودين والمراقبة وسجلات التدقيق على منصة مترابطة وقابلة للتحقق ضمن الحدود المتفق عليها.',
              inputs: ['واجهات شركاء معتمدة', 'سياسة الوصول والبيانات', 'قواعد المراقبة والتنبيه'],
              handoff: 'تبادل بيانات محدود ومراقَب',
              outcome: 'منصة مترابطة تبقى ضمن ضوابطها',
            },
          ],
        },
        {
          id: 'logistics-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'اختاروا مسارات البناء التي تجمع المنصة.',
          intro:
            'يتحدد المزيج النهائي بحسب المسار الذي تعطونه الأولوية، والناقلين والمستودعات والأنظمة التي تستخدمونها أصلاً، وأصغر تسليم متكامل قابل للمطابقة يستحق البناء أولاً.',
          serviceIds: [
            'business-systems-development',
            'web-applications',
            'ecommerce-development',
            'website-development',
          ],
          serviceAnchors: [
            {
              serviceId: 'business-systems-development',
              label: 'أنظمة إدارة المستودعات والنقل وأبراج التحكم',
            },
            {
              serviceId: 'web-applications',
              label: 'تطبيقات ويب وبوابات شركاء للوجستيات',
            },
            {
              serviceId: 'ecommerce-development',
              label: 'تكاملات دفع التجار واستقبال الطلبات وتنفيذها',
            },
            {
              serviceId: 'website-development',
              label: 'مواقع منتجات وتتبع للوجستيات',
            },
          ],
          relatedIndustryIds: ['ecommerce-retail', 'retail'],
          industryAnchors: [
            {
              industryId: 'ecommerce-retail',
              label: 'استكشفوا أنظمة التجارة والتجهيز',
            },
            {
              industryId: 'retail',
              label: 'استكشفوا أنظمة التجزئة والمخزون',
            },
          ],
        },
        {
          id: 'logistics-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'الأدلة والمسؤوليات',
          title: 'يجعل التصميم الحدود التشغيلية صريحة.',
          intro:
            'تصف الصفحة نموذج هندسة مقترحاً، لا خدمة نقل ولا تصريح جمارك ولا اعتماد امتثال. تبقى العمليات المادية وعقود الناقلين والتخليص الجمركي والموافقات التنظيمية لدى المشغّل وأصحاب الاختصاص المخولين.',
          items: [
            {
              id: 'operations-boundary',
              label: 'نبني النظام لا الأسطول',
              responsibility:
                'تهندس كلاود توبيا البرمجيات التي تخطط وتسجل وتُظهر العملية؛ ويبقى الأسطول المادي وعمالة المستودع وعلاقات الناقلين مملوكة ومُشغَّلة لديكم.',
              dependency: 'مالك تشغيل محدد والعملية التي يجب أن يدعمها النظام.',
              recovery: 'إبقاء الخطوة المتأثرة خلف عملية يدوية حتى يؤكدها مالك التشغيل.',
            },
            {
              id: 'carrier-dependencies',
              label: 'اعتماديات الناقلين والقياس عن بُعد',
              responsibility:
                'تعتمد تكاملات التتبع والتسعير والعنونة على وصول ناقل موثوق وتغذيات قياس وعقود وتوفر في السوق تؤكدونها.',
              dependency: 'توثيق ناقل وجهاز مؤكد وبيانات اعتماد وتغطية.',
              recovery: 'إبقاء الخطوة خلف مسار يدوي أو تجريبي حتى يتأكد وصول المزود.',
            },
            {
              id: 'customs-compliance',
              label: 'حدود الجمارك والتنظيم',
              responsibility:
                'يمكن للمنصة تجهيز المستندات والسجلات، لكن التخليص الجمركي والترخيص والقرارات التنظيمية تملكها الجهات وفريق الامتثال لديكم.',
              dependency: 'متطلبات مستندات معتمدة ومالك امتثال محدد.',
              recovery: 'توجيه الحالات غير الواضحة إلى مالك بشري بدلاً من عرض قرار آلي بلا مالك.',
            },
            {
              id: 'data-ownership',
              label: 'سجلات الطلبات والشحنات والمواقع',
              responsibility:
                'يحتاج كل سجل تشغيلي إلى قواعد صريحة للملكية والاحتفاظ والوصول تُحدد وتُعتمد قبل جمعه.',
              dependency: 'خريطة معتمدة لملكية البيانات والاحتفاظ والوصول.',
              recovery: 'إبقاء السجل معزولاً ومقيَّد الوصول حتى تتأكد قواعده.',
            },
          ],
        },
        {
          id: 'logistics-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'مصمم للوجستيات ثنائية اللغة',
          title: 'العربية والإنجليزية لغتا تشغيل، وليستا خطوة ترجمة أخيرة.',
          intro:
            'تُصاغ لوحات المشغّل وتطبيقات السائق والمستودع وتتبع العميل ورسائل الشركاء لكل لغة، مع بقاء بنية نظام واحدة قابلة للمطابقة ثابتة.',
          items: [
            {
              id: 'bilingual-operations',
              label: 'لغة تشغيل طبيعية',
              description:
                'تُكتب صياغة المستودع والإرسال والتتبع وفق طريقة قراءة المشغّلين والسائقين وتصرفهم في كل لغة، لا كترجمة لاحقة.',
            },
            {
              id: 'address-formats',
              label: 'عناوين ومسارات إقليمية',
              description:
                'تبقى صيغ العناوين والمناطق والمسارات دقيقة وقابلة للاستخدام في السياقين العربي والإنجليزي، تحت مالك مراجعة محدد.',
            },
            {
              id: 'market-dependencies',
              label: 'اعتماديات حسب السوق',
              description:
                'تُراجَع الناقلون ومتطلبات الجمارك والعملات وتغطية الميل الأخير لكل سوق قبل تثبيت النطاق.',
            },
          ],
        },
        {
          id: 'logistics-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'أسئلة القرار',
          title: 'ما الذي تحتاج فرق اللوجستيات إلى حسمه أولاً؟',
          intro:
            'النطاق الأول المفيد هو مسار مكتمل قابل للمطابقة—من الطلب إلى الإرسال، أو من الإرسال إلى إثبات التسليم—مع تحديد أصحاب المخزون والتتبع والتشغيل.',
          items: [
            {
              id: 'operator-role',
              question: 'هل تنقل كلاود توبيا الشحنات أو تشغّل الأسطول؟',
              answer:
                'لا. نهندس الأنظمة التي تخطط وتسجل وتُظهر عمليتكم—الطلبات والمخزون وإدارة المستودعات والنقل والتتبع ولوحات أبراج التحكم. يبقى الأسطول المادي وعمالة المستودع وعقود الناقلين لديكم؛ وتدعم البرمجيات طريقة تشغيلكم القائمة.',
            },
            {
              id: 'existing-systems',
              question: 'هل يمكن ربط ذلك بنظام المستودعات أو تخطيط الموارد أو الناقلين الحاليين؟',
              answer:
                'يُصمَّم حول الواجهات والحقول والوصول الذي تؤكده أنظمتكم وناقلوكم. نرسم البيانات المطلوبة والأنظمة المسؤولة ومصدر المطابقة والمسار اليدوي أو التجريبي البديل قبل الالتزام بتكامل مباشر—عبر التبادل الإلكتروني أو واجهات البرمجة.',
            },
            {
              id: 'realtime-tracking',
              question: 'كيف يعمل تتبع الشحنات ورؤيتها؟',
              answer:
                'يغذّي مسح الناقل والقياس عن بُعد وأحداث المراحل سجل شحنة واحداً ورؤية برج تحكم. نحدد نموذج الحالات وقواعد الخدمة والتنبيه لتظهر الاستثناءات قبل أن يضطر العميل للسؤال عن مكان طلبه.',
            },
            {
              id: 'exception-scoping',
              question: 'كيف نحدد نطاق معالجة الاستثناءات؟',
              answer:
                'ابدؤوا بأنواع استثناءات محددة—تأخير، تسليم فاشل، نقص شحن، مرتجع—لكل منها مالك ومتطلبات إثبات ومسار موثق للعودة إلى الخطة، حتى لا يصبح شيء جدولاً صامتاً.',
            },
            {
              id: 'route-optimization',
              question: 'هل يمكنكم بناء تحسين الأسطول والمسارات؟',
              answer:
                'نعم. يُهندَس تخطيط المسار والحمولة وتحسين الأسطول حول القيود والأهداف التي يملكها فريق التشغيل لديكم، بنتائج قابلة للتفسير يستطيع المخطِّط مراجعتها وتجاوزها، لا صندوقاً مغلقاً.',
            },
            {
              id: 'starting-point',
              question: 'من أين يبدأ فريق اللوجستيات؟',
              answer:
                'ابدؤوا بمسار واحد ذي قيمة عالية—خط أو مستودع أو ناقل واحد—وحددوا كل تسليم وسجل ومالك يمر بها، ثم ارسموا أصغر نطاق نظام قابل للمطابقة يدعمه من طرف إلى طرف قبل التوسع.',
            },
          ],
        },
        {
          id: 'logistics-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'اختاروا المسار الأول',
          title: 'اجعلوا مساراً واحداً قابلاً للمطابقة نقطة البداية.',
          intro:
            'أحضروا مساراً لوجستياً واحداً، والفرق والناقلين والمستودعات التي تملكه، والأنظمة التي يمر بها، وسنحوّل هذا السياق إلى موجز نظام سلسلة إمداد محدد النطاق قابل للبناء.',
          decisionCopy:
            'ابدؤوا بمسار مكتمل واحد قابل للمطابقة، لا بقائمة خصائص منفصلة.',
          primary: {
            label: 'لنرسم رحلة الطلب حتى التسليم',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: 'استكشفوا أنظمة عمليات اللوجستيات',
            serviceId: 'business-systems-development',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
