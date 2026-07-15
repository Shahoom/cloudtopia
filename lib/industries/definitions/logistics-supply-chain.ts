import { isolateLtrToken } from '@/lib/industries/text'
import type { IndustryPageDefinition } from '@/lib/industries/types'

const arabicTokens = {
  api: isolateLtrToken('API'),
  sla: isolateLtrToken('SLA'),
  tms: isolateLtrToken('TMS'),
  wms: isolateLtrToken('WMS'),
}

export const logisticsSupplyChainDefinition = {
  slug: 'logistics-supply-chain',
  contentVersion: 'release-a-draft-1',
  updatedAt: '2026-07-16',
  world: {
    id: 'flow-control',
    theme: {
      canvas: '#08141F',
      surface: '#0E2735',
      elevatedSurface: '#143747',
      ink: '#F0F8FC',
      mutedInk: '#B8D3DF',
      accent: '#10A9B6',
      accentInk: '#08141F',
      signal: '#E89B24',
      line: '#577482',
      focus: '#E89B24',
      displayTreatment: 'technical',
      radiusMode: 'square',
      motifDensity: 'dense',
      sceneTreatment: 'route-field',
    },
    heroScene: 'logistics-flow',
    heroTreatment: 'route-field',
    signatureComposition: {
      id: 'exception-control',
      name: {
        en: 'Exception control',
        ar: 'ضبط الاستثناءات',
      },
      sectionIds: [
        'operating-route',
        'exception-control',
        'exception-owners',
        'flow-system',
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
        title: 'Logistics Systems for Order-to-Delivery Visibility',
        description:
          'Design connected logistics workflows for order validation, warehouse handoffs, dispatch, delivery proof, and operator-owned exception recovery.',
      },
      breadcrumbLabel: 'Logistics & Supply Chain',
      hero: {
        worldLabel: 'Flow Control',
        eyebrow: 'Logistics operating systems',
        h1: 'See every handoff from order to proof of delivery.',
        intro:
          'A shared operating route makes order state, responsible owner, exception path, and delivery evidence easier to follow across commercial, warehouse, dispatch, and service teams.',
        primaryCta: {
          label: 'Map your flow and exceptions',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore business systems development',
          serviceId: 'business-systems-development',
        },
        sceneSummary:
          'The main order route stays visible while exceptions branch to a named owner and return through an agreed recovery decision.',
        sceneStages: [
          { id: 'order', label: 'Order received', state: 'Commercial' },
          { id: 'validation', label: 'Order validated', state: 'Control' },
          { id: 'warehouse', label: 'Warehouse handoff', state: 'Warehouse' },
          { id: 'dispatch', label: 'Dispatch release', state: 'Dispatch' },
          { id: 'route', label: 'Delivery route', state: 'Transport' },
          { id: 'exception', label: 'Exception review', state: 'Owner' },
          { id: 'delivery', label: 'Delivery outcome', state: 'Recipient' },
          { id: 'proof', label: 'Proof recorded', state: 'Evidence' },
        ],
      },
      sections: [
        {
          id: 'operating-route',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'Order to proof',
          title: 'The operating route should show who owns the next handoff.',
          intro:
            'Each stage accepts a defined input, records an operating state, and passes responsibility to the next role without hiding exceptions inside a generic status.',
          stages: [
            {
              id: 'order',
              label: 'Receive the order',
              description:
                'The commercial source supplies the agreed customer, item, destination, and service details.',
              actor: 'Order channel',
            },
            {
              id: 'validation',
              label: 'Validate the operating request',
              description:
                'Rules and an assigned operator identify missing, conflicting, or unsupported order details before release.',
              actor: 'Order control',
            },
            {
              id: 'warehouse',
              label: 'Hand over to warehouse work',
              description:
                'The approved request becomes a warehouse task under the inventory and fulfillment process in use.',
              actor: 'Warehouse team',
            },
            {
              id: 'dispatch',
              label: 'Release the dispatch handoff',
              description:
                'Prepared work is assigned to the agreed dispatch route with recipient and destination context.',
              actor: 'Dispatch team',
            },
            {
              id: 'route',
              label: 'Carry the delivery route',
              description:
                'The transport process reports the states its provider and operating model make available.',
              actor: 'Fleet or carrier',
            },
            {
              id: 'delivery',
              label: 'Record the delivery outcome',
              description:
                'The operator records the available completion, retry, refusal, or exception outcome.',
              actor: 'Delivery operator',
            },
            {
              id: 'proof',
              label: 'Attach the approved proof',
              description:
                'The agreed evidence is associated with the order and made available to authorized operational roles.',
              actor: 'Operations control',
            },
          ],
        },
        {
          id: 'exception-control',
          type: 'journey-map',
          variant: 'exception-lane',
          answers: ['operating-pressure'],
          eyebrow: 'Control the break in flow',
          title: 'An exception needs an owner, a decision, and a route back.',
          intro:
            'Stock, address, and delivery-proof issues become manageable work when they enter a visible queue with operator-defined priority and recovery rules.',
          stages: [
            {
              id: 'detect',
              label: 'Detect the exception',
              description: 'A rule or operator records the issue against the affected order and stage.',
              actor: 'System or operator',
            },
            {
              id: 'classify',
              label: 'Classify the operating impact',
              description: 'The issue is grouped by the decision and owner it requires.',
              actor: 'Control team',
            },
            {
              id: 'assign',
              label: 'Assign the responsible owner',
              description: 'A named role accepts the item under the operator-defined service window.',
              actor: 'Exception owner',
            },
            {
              id: 'communicate',
              label: 'Coordinate the affected parties',
              description: 'The approved message and next action reach the relevant internal or customer-facing role.',
              actor: 'Service team',
            },
            {
              id: 'recover',
              label: 'Return or close the route',
              description: 'The owner records the recovery decision and either rejoins the main flow or closes the exception.',
              actor: 'Exception owner',
            },
          ],
          lanes: [
            {
              id: 'main-route',
              label: 'Main operating route',
              stageIds: ['detect', 'classify', 'recover'],
            },
            {
              id: 'exception-route',
              label: 'Exception ownership route',
              stageIds: ['classify', 'assign', 'communicate', 'recover'],
            },
          ],
        },
        {
          id: 'exception-owners',
          type: 'constraints',
          variant: 'owner-register',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Operating evidence',
          title: 'Exception control begins with an owner register.',
          intro:
            'This is a proposed responsibility model, not a claim about carrier performance. Every service window and escalation rule is defined by the operator.',
          items: [
            {
              id: 'stock-owner',
              label: 'Stock exception owner',
              responsibility:
                'Confirm the available stock decision, substitute, split, hold, or cancellation route allowed by the business.',
              dependency: 'Warehouse source data and an operator-defined SLA.',
              recovery: 'Return the order to validation with the approved stock decision.',
            },
            {
              id: 'address-owner',
              label: 'Address exception owner',
              responsibility:
                'Coordinate the customer-facing correction route and confirm the destination change before release.',
              dependency: 'An approved contact method and an operator-defined SLA.',
              recovery: 'Resume dispatch only after the corrected destination is accepted by the responsible role.',
            },
            {
              id: 'proof-owner',
              label: 'Proof exception owner',
              responsibility:
                'Review missing or disputed evidence and select the allowed follow-up route.',
              dependency: 'Provider evidence fields, access rules, and an operator-defined SLA.',
              recovery: 'Record the review outcome and reopen the delivery task when required.',
            },
            {
              id: 'communication-owner',
              label: 'Customer communication owner',
              responsibility:
                'Approve the message, channel, and timing used when an operating exception affects the customer.',
              dependency: 'A named service owner and approved message library.',
              recovery: 'Escalate wording or route decisions before sending an unsupported promise.',
            },
          ],
        },
        {
          id: 'flow-system',
          type: 'system-blueprint',
          variant: 'constellation',
          answers: ['buildable-system'],
          eyebrow: 'A connected control plane',
          title: 'The system connects events without pretending every source is the same.',
          intro:
            'A buildable scope links order, warehouse, dispatch, exception, and proof responsibilities through bounded interfaces and shared operating identifiers.',
          layers: [
            {
              id: 'order-visibility',
              label: 'Order visibility',
              description: 'A shared order identity holds the commercial request and its current accepted state.',
              inputs: ['Order identifier', 'Customer and destination data', 'Requested service'],
              handoff: 'A validated operating request',
              outcome: 'A visible source and next responsibility',
            },
            {
              id: 'warehouse-events',
              label: 'Warehouse events',
              description: 'Available warehouse states are associated with the order without replacing the warehouse source.',
              inputs: ['Warehouse task states', 'Item decisions', 'Operator notes'],
              handoff: 'A releasable or exception-marked fulfillment state',
              outcome: 'A clear dispatch readiness decision',
            },
            {
              id: 'dispatch-handoff',
              label: 'Dispatch handoff',
              description: 'Assignment and route context move to the responsible transport process.',
              inputs: ['Prepared work', 'Destination context', 'Provider assignment fields'],
              handoff: 'An accepted dispatch task',
              outcome: 'A traceable transport responsibility',
            },
            {
              id: 'exception-queue',
              label: 'Exception queue',
              description: 'Issues are classified, assigned, and returned through an explicit recovery decision.',
              inputs: ['Exception type', 'Affected stage', 'Owner and priority rule'],
              handoff: 'An owned exception work item',
              outcome: 'A recorded recovery or closure decision',
            },
            {
              id: 'proof-reporting',
              label: 'Proof and status reporting',
              description: 'Approved evidence and route outcomes support customer service and operational review.',
              inputs: ['Delivery outcome', 'Available evidence', 'Review permissions'],
              handoff: 'An authorized status view',
              outcome: 'A reviewable order-to-proof record',
            },
          ],
        },
        {
          id: 'logistics-service-paths',
          type: 'service-bridge',
          variant: 'route-links',
          answers: [],
          eyebrow: 'Implementation routes',
          title: 'Build the operating route with the right system boundaries.',
          intro:
            'The capability mix follows the source systems, people, provider interfaces, and exception decisions already present in the operation.',
          serviceIds: [
            'business-systems-development',
            'web-applications',
            'website-development',
            'ecommerce-development',
          ],
          serviceAnchors: [
            {
              serviceId: 'business-systems-development',
              label: 'Logistics business systems',
            },
            {
              serviceId: 'web-applications',
              label: 'Operational web applications',
            },
            {
              serviceId: 'website-development',
              label: 'Customer-facing logistics websites',
            },
            {
              serviceId: 'ecommerce-development',
              label: 'Order and fulfillment commerce connections',
            },
          ],
          relatedIndustryIds: ['ecommerce-retail', 'retail'],
          industryAnchors: [
            {
              industryId: 'ecommerce-retail',
              label: 'Explore online order and fulfillment journeys',
            },
            {
              industryId: 'retail',
              label: 'Explore branch, stock, and retail operations',
            },
          ],
        },
        {
          id: 'integration-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: [],
          eyebrow: 'Integration boundaries',
          title: 'Source systems and providers define what can be connected.',
          intro:
            'Warehouse, transport, fleet, and commercial systems remain responsible for the data and capabilities they expose. The workflow must preserve a manual route when an interface is unavailable.',
          items: [
            {
              id: 'wms-boundary',
              label: 'WMS boundary',
              responsibility: 'The warehouse owner confirms available task, stock, and completion states.',
              dependency: 'Current WMS documentation and approved access.',
              recovery: 'Keep warehouse confirmation in the existing process until the interface is approved.',
            },
            {
              id: 'tms-boundary',
              label: 'TMS and fleet boundary',
              responsibility: 'The transport owner confirms assignment, route, and delivery states that can be shared.',
              dependency: 'Provider capability and TMS access decisions.',
              recovery: 'Use the agreed dispatch and status-entry path when provider data is unavailable.',
            },
            {
              id: 'api-boundary',
              label: 'API contract boundary',
              responsibility: 'System owners approve fields, authentication, error handling, and change ownership.',
              dependency: 'An active API contract and responsible technical contacts.',
              recovery: 'Queue or return the work item without presenting an unconfirmed state.',
            },
            {
              id: 'source-quality',
              label: 'Source-data quality',
              responsibility: 'Operational owners define how incomplete or conflicting source data is reviewed.',
              dependency: 'Data ownership and exception classification rules.',
              recovery: 'Route the item to a named owner before releasing the next handoff.',
            },
          ],
        },
        {
          id: 'regional-flow-delivery',
          type: 'regional-fit',
          variant: 'market-path',
          answers: ['regional-delivery'],
          eyebrow: 'Regional operations',
          title: 'Status language and address context belong in the operating design.',
          intro:
            'Arabic and English labels, local address structures, customer messages, and handoff ownership are designed together so the operating meaning remains consistent.',
          items: [
            {
              id: 'status-language',
              label: 'Bilingual status language',
              description: 'Customer-facing states use understandable wording while internal states retain their precise operating meaning.',
            },
            {
              id: 'address-context',
              label: 'Address and destination context',
              description: 'The route captures the fields, landmarks, zones, and contact decisions the operator actually uses.',
            },
            {
              id: 'handoff-ownership',
              label: 'Regional handoff ownership',
              description: 'Commercial, warehouse, dispatch, and service teams agree who accepts and explains each transition.',
            },
          ],
        },
        {
          id: 'logistics-faq',
          type: 'faq',
          variant: 'grouped-questions',
          answers: [],
          eyebrow: 'Operating questions',
          title: 'Questions that shape a useful logistics system scope.',
          intro:
            'The best starting point is one order route, its source systems, and the exceptions that consume the most coordination.',
          items: [
            {
              id: 'existing-systems',
              question: 'Can the workflow connect with our existing WMS, TMS, or commerce platform?',
              answer: 'It can be scoped around the interfaces, fields, and access methods those systems and providers confirm. Each connection keeps a named source owner and fallback route.',
            },
            {
              id: 'exception-priority',
              question: 'How are exception priorities and service windows defined?',
              answer: 'The operator defines the priority model, SLA, responsible role, escalation path, and customer communication rule. The system applies those approved decisions.',
            },
            {
              id: 'carrier-visibility',
              question: 'Will every carrier expose the same delivery states?',
              answer: 'No assumption is made. The design maps the states and evidence each provider makes available, then preserves a manual review path for gaps.',
            },
            {
              id: 'customer-status',
              question: 'Can customers see the same language as the operations team?',
              answer: 'They can share one underlying state model while customer wording remains concise, bilingual, and appropriate to what the operator has confirmed.',
            },
            {
              id: 'starting-point',
              question: 'Where should a logistics team begin?',
              answer: 'Begin with one order-to-proof route, identify every handoff and exception owner, then select the smallest connected scope that makes those responsibilities visible.',
            },
          ],
        },
        {
          id: 'logistics-consultation',
          type: 'closing-cta',
          variant: 'split-close',
          answers: ['decision-close'],
          eyebrow: 'Map the operating truth',
          title: 'Make the exception route part of the system—not an afterthought.',
          intro: 'Bring one order flow, its source systems, and the exceptions that require the most coordination. We will shape them into a bounded system brief.',
          decisionCopy: 'Choose one complete order-to-proof route and name the owner at every break in flow.',
          primary: {
            label: 'Map your flow and exceptions',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore business systems development',
            serviceId: 'business-systems-development',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'أنظمة لوجستية من الطلب إلى إثبات التسليم',
        description:
          'صمموا سير عمل لوجستياً مترابطاً للتحقق من الطلب وتسليمات المستودع والتوزيع وإثبات التسليم ومعالجة الاستثناءات بمسؤوليات واضحة.',
      },
      breadcrumbLabel: 'الخدمات اللوجستية وسلاسل الإمداد',
      hero: {
        worldLabel: 'ضبط التدفق',
        eyebrow: 'أنظمة التشغيل اللوجستية',
        h1: 'رؤية أوضح لكل خطوة من الطلب إلى إثبات التسليم.',
        intro:
          'يجعل المسار التشغيلي المشترك حالة الطلب وصاحب المسؤولية ومسار الاستثناء وإثبات التسليم أوضح للفرق التجارية والمستودع والتوزيع وخدمة العملاء.',
        primaryCta: {
          label: 'لنرسم تدفق العمليات والاستثناءات لديكم',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشف تطوير أنظمة الأعمال',
          serviceId: 'business-systems-development',
        },
        sceneSummary:
          'يبقى مسار الطلب الرئيسي ظاهراً، بينما ينتقل الاستثناء إلى مالك محدد ويعود عبر قرار معالجة متفق عليه.',
        sceneStages: [
          { id: 'order', label: 'استلام الطلب', state: 'تجاري' },
          { id: 'validation', label: 'التحقق من الطلب', state: 'ضبط' },
          { id: 'warehouse', label: 'تسليم المستودع', state: 'المستودع' },
          { id: 'dispatch', label: 'إطلاق التوزيع', state: 'التوزيع' },
          { id: 'route', label: 'مسار التسليم', state: 'النقل' },
          { id: 'exception', label: 'مراجعة الاستثناء', state: 'المالك' },
          { id: 'delivery', label: 'نتيجة التسليم', state: 'المستلم' },
          { id: 'proof', label: 'تسجيل الإثبات', state: 'الإثبات' },
        ],
      },
      sections: [
        {
          id: 'operating-route',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'من الطلب إلى الإثبات',
          title: 'يجب أن يوضح المسار التشغيلي من يملك التسليم التالي.',
          intro:
            'تستقبل كل مرحلة مدخلاً محدداً وتسجل حالة تشغيلية وتنقل المسؤولية إلى الدور التالي، من دون إخفاء الاستثناءات داخل حالة عامة.',
          stages: [
            {
              id: 'order',
              label: 'استلام الطلب',
              description: 'يوفر المصدر التجاري بيانات العميل والصنف والوجهة والخدمة المتفق عليها.',
              actor: 'قناة الطلب',
            },
            {
              id: 'validation',
              label: 'التحقق من الطلب التشغيلي',
              description: 'تكشف القواعد والمشغل المسؤول البيانات الناقصة أو المتعارضة أو غير المدعومة قبل الإطلاق.',
              actor: 'ضبط الطلبات',
            },
            {
              id: 'warehouse',
              label: 'التسليم إلى عمل المستودع',
              description: 'يتحول الطلب المعتمد إلى مهمة مستودع وفق عملية المخزون والتنفيذ المستخدمة.',
              actor: 'فريق المستودع',
            },
            {
              id: 'dispatch',
              label: 'إطلاق تسليم التوزيع',
              description: 'يُسند العمل المجهز إلى مسار التوزيع المتفق عليه مع سياق المستلم والوجهة.',
              actor: 'فريق التوزيع',
            },
            {
              id: 'route',
              label: 'تنفيذ مسار التسليم',
              description: 'تعرض عملية النقل الحالات التي يتيحها المزود ونموذج التشغيل.',
              actor: 'الأسطول أو الناقل',
            },
            {
              id: 'delivery',
              label: 'تسجيل نتيجة التسليم',
              description: 'يسجل المشغل نتيجة الإتمام أو إعادة المحاولة أو الرفض أو الاستثناء المتاحة.',
              actor: 'مشغل التسليم',
            },
            {
              id: 'proof',
              label: 'إرفاق الإثبات المعتمد',
              description: 'يرتبط الإثبات المتفق عليه بالطلب ويُتاح للأدوار التشغيلية المخولة.',
              actor: 'ضبط العمليات',
            },
          ],
        },
        {
          id: 'exception-control',
          type: 'journey-map',
          variant: 'exception-lane',
          answers: ['operating-pressure'],
          eyebrow: 'ضبط انقطاع التدفق',
          title: 'يحتاج الاستثناء إلى مالك وقرار ومسار للعودة.',
          intro:
            'تصبح مشكلات المخزون والعنوان وإثبات التسليم عملاً قابلاً للإدارة حين تدخل قائمة ظاهرة بأولوية وقواعد معالجة يحددها المشغل.',
          stages: [
            {
              id: 'detect',
              label: 'رصد الاستثناء',
              description: 'تسجل قاعدة أو مشغل المشكلة على الطلب والمرحلة المتأثرة.',
              actor: 'النظام أو المشغل',
            },
            {
              id: 'classify',
              label: 'تصنيف الأثر التشغيلي',
              description: 'تُصنف المشكلة بحسب القرار والمالك المطلوبين.',
              actor: 'فريق الضبط',
            },
            {
              id: 'assign',
              label: 'إسناد المالك المسؤول',
              description: 'يتسلم دور محدد المهمة ضمن نافذة الخدمة التي يحددها المشغل.',
              actor: 'مالك الاستثناء',
            },
            {
              id: 'communicate',
              label: 'تنسيق الأطراف المتأثرة',
              description: 'تصل الرسالة المعتمدة والإجراء التالي إلى الدور الداخلي أو المواجه للعميل.',
              actor: 'فريق الخدمة',
            },
            {
              id: 'recover',
              label: 'إعادة المسار أو إغلاقه',
              description: 'يسجل المالك قرار المعالجة ويعيد المهمة إلى التدفق الرئيسي أو يغلق الاستثناء.',
              actor: 'مالك الاستثناء',
            },
          ],
          lanes: [
            {
              id: 'main-route',
              label: 'المسار التشغيلي الرئيسي',
              stageIds: ['detect', 'classify', 'recover'],
            },
            {
              id: 'exception-route',
              label: 'مسار ملكية الاستثناء',
              stageIds: ['classify', 'assign', 'communicate', 'recover'],
            },
          ],
        },
        {
          id: 'exception-owners',
          type: 'constraints',
          variant: 'owner-register',
          answers: ['evidence-and-constraints'],
          eyebrow: 'الدليل التشغيلي',
          title: 'يبدأ ضبط الاستثناءات بسجل للمالكين.',
          intro:
            'هذا نموذج مقترح للمسؤوليات، وليس ادعاءً عن أداء الناقل. يحدد المشغل كل نافذة خدمة وقاعدة تصعيد.',
          items: [
            {
              id: 'stock-owner',
              label: 'مالك استثناء المخزون',
              responsibility: 'يؤكد قرار المخزون أو البديل أو التقسيم أو التعليق أو الإلغاء الذي تسمح به المنشأة.',
              dependency: `بيانات مصدر المستودع واتفاقية ${arabicTokens.sla} يحددها المشغل.`,
              recovery: 'إعادة الطلب إلى التحقق مع قرار المخزون المعتمد.',
            },
            {
              id: 'address-owner',
              label: 'مالك استثناء العنوان',
              responsibility: 'ينسق مسار التصحيح مع العميل ويؤكد تغيير الوجهة قبل الإطلاق.',
              dependency: `طريقة تواصل معتمدة واتفاقية ${arabicTokens.sla} يحددها المشغل.`,
              recovery: 'استئناف التوزيع بعد قبول الوجهة المصححة من الدور المسؤول.',
            },
            {
              id: 'proof-owner',
              label: 'مالك استثناء الإثبات',
              responsibility: 'يراجع الإثبات المفقود أو المختلف عليه ويختار مسار المتابعة المسموح.',
              dependency: `حقول إثبات المزود وقواعد الوصول واتفاقية ${arabicTokens.sla} يحددها المشغل.`,
              recovery: 'تسجيل نتيجة المراجعة وإعادة فتح مهمة التسليم عند الحاجة.',
            },
            {
              id: 'communication-owner',
              label: 'مالك التواصل مع العميل',
              responsibility: 'يعتمد الرسالة والقناة والتوقيت عند تأثير الاستثناء التشغيلي في العميل.',
              dependency: 'مالك خدمة محدد ومكتبة رسائل معتمدة.',
              recovery: 'تصعيد قرار الصياغة أو المسار قبل إرسال وعد غير مدعوم.',
            },
          ],
        },
        {
          id: 'flow-system',
          type: 'system-blueprint',
          variant: 'constellation',
          answers: ['buildable-system'],
          eyebrow: 'مستوى ضبط مترابط',
          title: 'يربط النظام الأحداث من دون افتراض أن كل مصدر يعمل بالطريقة نفسها.',
          intro:
            'يربط النطاق القابل للبناء مسؤوليات الطلب والمستودع والتوزيع والاستثناء والإثبات عبر واجهات محدودة ومعرفات تشغيل مشتركة.',
          layers: [
            {
              id: 'order-visibility',
              label: 'رؤية الطلب',
              description: 'تجمع هوية الطلب المشتركة الطلب التجاري وحالته المقبولة الحالية.',
              inputs: ['معرف الطلب', 'بيانات العميل والوجهة', 'الخدمة المطلوبة'],
              handoff: 'طلب تشغيلي خاضع للتحقق',
              outcome: 'مصدر ومسؤولية تالية واضحان',
            },
            {
              id: 'warehouse-events',
              label: 'أحداث المستودع',
              description: 'ترتبط حالات المستودع المتاحة بالطلب من دون استبدال مصدر المستودع.',
              inputs: ['حالات مهمة المستودع', 'قرارات الصنف', 'ملاحظات المشغل'],
              handoff: 'حالة تنفيذ قابلة للإطلاق أو موسومة باستثناء',
              outcome: 'قرار واضح لجاهزية التوزيع',
            },
            {
              id: 'dispatch-handoff',
              label: 'تسليم التوزيع',
              description: 'ينتقل سياق الإسناد والمسار إلى عملية النقل المسؤولة.',
              inputs: ['العمل المجهز', 'سياق الوجهة', 'حقول إسناد المزود'],
              handoff: 'مهمة توزيع مقبولة',
              outcome: 'مسؤولية نقل قابلة للتتبع',
            },
            {
              id: 'exception-queue',
              label: 'قائمة الاستثناءات',
              description: 'تُصنف المشكلات وتُسند وتعود عبر قرار معالجة صريح.',
              inputs: ['نوع الاستثناء', 'المرحلة المتأثرة', 'المالك وقاعدة الأولوية'],
              handoff: 'مهمة استثناء مملوكة',
              outcome: 'قرار معالجة أو إغلاق مسجل',
            },
            {
              id: 'proof-reporting',
              label: 'تقارير الإثبات والحالة',
              description: 'تدعم الأدلة المعتمدة ونتائج المسار خدمة العميل والمراجعة التشغيلية.',
              inputs: ['نتيجة التسليم', 'الإثبات المتاح', 'صلاحيات المراجعة'],
              handoff: 'عرض حالة مخول',
              outcome: 'سجل قابل للمراجعة من الطلب إلى الإثبات',
            },
          ],
        },
        {
          id: 'logistics-service-paths',
          type: 'service-bridge',
          variant: 'route-links',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'ابنوا المسار التشغيلي بحدود الأنظمة المناسبة.',
          intro:
            'يتبع مزيج القدرات أنظمة المصدر والأشخاص وواجهات المزودين وقرارات الاستثناء الموجودة فعلياً في التشغيل.',
          serviceIds: [
            'business-systems-development',
            'web-applications',
            'website-development',
            'ecommerce-development',
          ],
          serviceAnchors: [
            {
              serviceId: 'business-systems-development',
              label: 'أنظمة أعمال لوجستية',
            },
            {
              serviceId: 'web-applications',
              label: 'تطبيقات ويب تشغيلية',
            },
            {
              serviceId: 'website-development',
              label: 'مواقع لوجستية موجهة للعملاء',
            },
            {
              serviceId: 'ecommerce-development',
              label: 'روابط التجارة بين الطلب والتنفيذ',
            },
          ],
          relatedIndustryIds: ['ecommerce-retail', 'retail'],
          industryAnchors: [
            {
              industryId: 'ecommerce-retail',
              label: 'استكشف رحلات الطلب والتنفيذ عبر الإنترنت',
            },
            {
              industryId: 'retail',
              label: 'استكشف عمليات الفروع والمخزون والتجزئة',
            },
          ],
        },
        {
          id: 'integration-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: [],
          eyebrow: 'حدود الربط',
          title: 'تحدد أنظمة المصدر والمزودون ما يمكن ربطه.',
          intro:
            'تبقى أنظمة المستودع والنقل والأسطول والتجارة مسؤولة عن البيانات والقدرات التي تتيحها. ويحافظ سير العمل على مسار يدوي عند غياب الواجهة.',
          items: [
            {
              id: 'wms-boundary',
              label: `حدود ${arabicTokens.wms}`,
              responsibility: 'يؤكد مالك المستودع حالات المهمة والمخزون والإتمام المتاحة.',
              dependency: `توثيق حالي لنظام ${arabicTokens.wms} وصلاحية وصول معتمدة.`,
              recovery: 'إبقاء تأكيد المستودع في العملية الحالية حتى اعتماد الواجهة.',
            },
            {
              id: 'tms-boundary',
              label: `حدود ${arabicTokens.tms} والأسطول`,
              responsibility: 'يؤكد مالك النقل حالات الإسناد والمسار والتسليم التي يمكن مشاركتها.',
              dependency: `قدرات المزود وقرارات الوصول إلى ${arabicTokens.tms}.`,
              recovery: 'استخدام مسار التوزيع وإدخال الحالة المتفق عليه عند غياب بيانات المزود.',
            },
            {
              id: 'api-boundary',
              label: `حدود عقد ${arabicTokens.api}`,
              responsibility: 'يعتمد مالكو الأنظمة الحقول والمصادقة ومعالجة الأخطاء ومسؤولية التغيير.',
              dependency: `عقد ${arabicTokens.api} فعّال وجهات اتصال تقنية مسؤولة.`,
              recovery: 'تعليق المهمة أو إعادتها من دون عرض حالة غير مؤكدة.',
            },
            {
              id: 'source-quality',
              label: 'جودة بيانات المصدر',
              responsibility: 'يحدد مالكو التشغيل طريقة مراجعة البيانات الناقصة أو المتعارضة.',
              dependency: 'ملكية البيانات وقواعد تصنيف الاستثناءات.',
              recovery: 'توجيه المهمة إلى مالك محدد قبل إطلاق التسليم التالي.',
            },
          ],
        },
        {
          id: 'regional-flow-delivery',
          type: 'regional-fit',
          variant: 'market-path',
          answers: ['regional-delivery'],
          eyebrow: 'تشغيل إقليمي',
          title: 'لغة الحالة وسياق العنوان جزء من التصميم التشغيلي.',
          intro:
            'تُصمم المسميات العربية والإنجليزية وبنية العنوان المحلية ورسائل العملاء وملكية التسليم معاً، ليبقى المعنى التشغيلي متسقاً.',
          items: [
            {
              id: 'status-language',
              label: 'لغة حالة ثنائية',
              description: 'تستخدم الحالات الموجهة للعميل صياغة مفهومة، بينما تحتفظ الحالات الداخلية بمعناها التشغيلي الدقيق.',
            },
            {
              id: 'address-context',
              label: 'سياق العنوان والوجهة',
              description: 'يجمع المسار الحقول والمعالم والمناطق وقرارات التواصل التي يستخدمها المشغل فعلياً.',
            },
            {
              id: 'handoff-ownership',
              label: 'ملكية التسليم الإقليمي',
              description: 'تتفق فرق التجارة والمستودع والتوزيع والخدمة على من يستلم كل انتقال ومن يشرحه.',
            },
          ],
        },
        {
          id: 'logistics-faq',
          type: 'faq',
          variant: 'grouped-questions',
          answers: [],
          eyebrow: 'أسئلة التشغيل',
          title: 'أسئلة تشكل نطاق نظام لوجستي مفيد.',
          intro:
            'أفضل نقطة بداية هي مسار طلب واحد وأنظمة مصدره والاستثناءات التي تستهلك أكبر قدر من التنسيق.',
          items: [
            {
              id: 'existing-systems',
              question: `هل يمكن ربط سير العمل مع ${arabicTokens.wms} أو ${arabicTokens.tms} أو منصة التجارة الحالية؟`,
              answer: 'يمكن تحديد النطاق حول الواجهات والحقول وطرق الوصول التي تؤكدها الأنظمة والمزودون. ويحافظ كل ربط على مالك مصدر ومسار بديل محددين.',
            },
            {
              id: 'exception-priority',
              question: 'كيف تُحدد أولويات الاستثناء ونوافذ الخدمة؟',
              answer: `يحدد المشغل نموذج الأولوية واتفاقية ${arabicTokens.sla} والدور المسؤول ومسار التصعيد وقاعدة التواصل مع العميل. ويطبق النظام القرارات المعتمدة.`,
            },
            {
              id: 'carrier-visibility',
              question: 'هل سيتيح كل ناقل حالات التسليم نفسها؟',
              answer: 'لا نفترض ذلك. يرسم التصميم الحالات والأدلة التي يتيحها كل مزود، ويحافظ على مسار مراجعة يدوي للفجوات.',
            },
            {
              id: 'customer-status',
              question: 'هل يمكن أن يرى العميل لغة الحالة التي يستخدمها فريق التشغيل؟',
              answer: 'يمكن أن يشتركا في نموذج حالة واحد، مع بقاء صياغة العميل موجزة وثنائية اللغة وملائمة لما أكده المشغل.',
            },
            {
              id: 'starting-point',
              question: 'من أين يبدأ فريق الخدمات اللوجستية؟',
              answer: 'ابدؤوا بمسار واحد من الطلب إلى الإثبات، وحددوا كل تسليم ومالك استثناء، ثم اختاروا أصغر نطاق مترابط يجعل تلك المسؤوليات مرئية.',
            },
          ],
        },
        {
          id: 'logistics-consultation',
          type: 'closing-cta',
          variant: 'split-close',
          answers: ['decision-close'],
          eyebrow: 'ارسموا حقيقة التشغيل',
          title: 'اجعلوا مسار الاستثناء جزءاً من النظام، لا فكرة لاحقة.',
          intro: 'أحضروا تدفق طلب واحداً وأنظمة مصدره والاستثناءات التي تحتاج إلى أكبر قدر من التنسيق، وسنحوّلها إلى موجز نظام محدد النطاق.',
          decisionCopy: 'اختاروا مساراً مكتملاً من الطلب إلى الإثبات وحددوا المالك عند كل انقطاع في التدفق.',
          primary: {
            label: 'لنرسم تدفق العمليات والاستثناءات لديكم',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: 'استكشف تطوير أنظمة الأعمال',
            serviceId: 'business-systems-development',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
