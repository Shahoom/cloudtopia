import { isolateLtrToken } from '@/lib/industries/text'
import type { IndustryPageDefinition } from '@/lib/industries/types'

const arabicTokens = {
  api: isolateLtrToken('API'),
  pos: isolateLtrToken('POS'),
  qr: isolateLtrToken('QR'),
}

export const restaurantsDefinition = {
  slug: 'restaurants',
  contentVersion: 'restaurants-foodking-published-1',
  publicationStatus: 'published',
  updatedAt: '2026-07-17',
  world: {
    id: 'service-rhythm',
    theme: {
      // Ported from the Foodking template palette: brand green (--theme
      // #00813d) on white with a warm cream elevated surface (--bg #f4f1ea),
      // deep-navy ink, and an amber rating signal (--ratting #ff9f0d).
      canvas: '#FFFFFF',
      surface: '#FFFFFF',
      elevatedSurface: '#F4F1EA',
      ink: '#212121',
      mutedInk: '#5C5C5B',
      accent: '#00813D',
      accentInk: '#FFFFFF',
      signal: '#FF9F0D',
      line: '#D9D9D9',
      focus: '#00813D',
      displayTreatment: 'editorial',
      radiusMode: 'soft',
      motifDensity: 'dense',
      sceneTreatment: 'service-pass',
    },
    heroScene: 'restaurant-pass',
    heroTreatment: 'editorial-pass',
    signatureComposition: {
      id: 'the-pass',
      name: {
        en: 'The service pass',
        ar: 'مسار تمرير الخدمة',
      },
      sectionIds: [
        'menu-appetite',
        'the-pass',
        'timing-branch-pressure',
        'restaurant-system',
      ],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'restaurant-pass' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/restaurants/en.jpg',
      width: 1200,
      height: 630,
    },
    {
      kind: 'og-image',
      locale: 'ar',
      publicPath: '/og/industries/restaurants/ar.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'Restaurant Digital Systems for Every Order',
        description:
          'Design connected restaurant journeys across menu discovery, reservations and orders, kitchen handoffs, branch operations, guest feedback, and loyalty.',
      },
      breadcrumbLabel: 'Restaurants',
      hero: {
        worldLabel: 'Service Rhythm',
        eyebrow: 'Restaurant digital systems',
        h1: 'Give every order a smoother rhythm.',
        intro:
          'A well-designed service journey connects what the guest chooses with what front-of-house, kitchen, branch, and marketing teams need to own at every handoff.',
        primaryCta: {
          label: 'Tune your service journey',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore restaurant QR menus',
          serviceId: 'restaurant-qr-menu',
        },
        sceneSummary:
          'The service pass follows the guest from menu and order through preparation, collection or table service, feedback, and branch learning.',
        sceneStages: [
          { id: 'menu', label: 'Menu discovery', state: 'Guest' },
          { id: 'reservation-order', label: 'Reservation or order', state: 'Guest' },
          { id: 'acceptance-routing', label: 'Acceptance and routing', state: 'Front' },
          { id: 'preparation', label: 'Preparation', state: 'Kitchen' },
          { id: 'table-pickup', label: 'Table or pickup', state: 'Service' },
          { id: 'feedback-loyalty', label: 'Feedback and loyalty', state: 'Return' },
          { id: 'branch-learning', label: 'Branch learning', state: 'Operations' },
        ],
      },
      sections: [
        {
          id: 'menu-appetite',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'Before the first order',
          title: 'Appetite meets operational truth at the menu.',
          intro:
            'Guests need enough clarity to choose and act, while each branch needs prices, availability, ordering routes, and service messages to stay under named operational ownership.',
          signals: [
            {
              id: 'discovery-context',
              label: 'Discovery needs branch context',
              description:
                'Location, service mode, hours, cuisine, and the correct menu route should lead the guest to a relevant next action.',
            },
            {
              id: 'menu-clarity',
              label: 'Menu clarity shapes confidence',
              description:
                'Names, descriptions, prices, images, and dietary information need an approved source and a branch-aware update path.',
            },
            {
              id: 'order-handoff',
              label: 'The order creates a live responsibility',
              description:
                'A reservation or order needs an explicit acceptance, routing, preparation, and guest-communication path.',
            },
          ],
        },
        {
          id: 'the-pass',
          type: 'use-case-sequence',
          variant: 'timed-pass',
          answers: ['journey'],
          eyebrow: 'Signature composition',
          title: 'The pass keeps each service handoff in rhythm.',
          intro:
            'The sequence records responsibility rather than promising preparation times. Each restaurant defines its own service rules, states, and escalation path.',
          steps: [
            {
              id: 'menu',
              label: 'Discover the menu',
              description: 'The guest sees the relevant branch, service mode, menu content, and next action.',
              owner: 'Guest experience owner',
            },
            {
              id: 'reservation-order',
              label: 'Reserve or place an order',
              description: 'The guest submits the agreed details through the route available for that branch.',
              owner: 'Guest and front of house',
            },
            {
              id: 'acceptance-routing',
              label: 'Accept and route the request',
              description: 'A named role accepts, rejects, or redirects the request according to branch rules.',
              owner: 'Front of house',
            },
            {
              id: 'preparation',
              label: 'Prepare under kitchen ownership',
              description: 'The kitchen receives the accepted work and records the states the operating process supports.',
              owner: 'Kitchen',
            },
            {
              id: 'table-pickup',
              label: 'Complete table, pickup, or delivery handoff',
              description: 'The responsible service role records the outcome and any exception requiring follow-up.',
              owner: 'Front of house or fulfillment partner',
            },
            {
              id: 'feedback-loyalty-learning',
              label: 'Connect feedback, loyalty, and branch learning',
              description: 'Approved feedback and return signals become inputs for guest communication and branch review.',
              owner: 'Guest service and operations',
            },
          ],
        },
        {
          id: 'timing-branch-pressure',
          type: 'pressure-field',
          variant: 'dense-ledger',
          answers: [],
          eyebrow: 'Front and back of house',
          title: 'Service pressure accumulates between systems and teams.',
          intro:
            'The system should expose the handoff and decision behind each state without inventing a preparation promise or assuming every branch follows the same route.',
          signals: [
            {
              id: 'branch-configuration',
              label: 'Branch configuration changes the route',
              description: 'Menus, service modes, prices, hours, and available channels can differ by location and require local ownership.',
            },
            {
              id: 'acceptance-state',
              label: 'Acceptance must be explicit',
              description: 'A submitted request is not the same as an accepted reservation or order; the guest message should reflect the actual decision.',
            },
            {
              id: 'kitchen-handoff',
              label: 'Kitchen handoff needs a source',
              description: 'Routing depends on the equipment, provider interfaces, and operating process the restaurant confirms.',
            },
            {
              id: 'guest-update',
              label: 'Guest updates need approved meaning',
              description: 'Each visible message should map to an owned operating state and a defined exception route.',
            },
            {
              id: 'branch-learning',
              label: 'Branch learning needs review',
              description: 'Feedback, demand signals, and service exceptions become useful only when a named team reviews and acts on them.',
            },
          ],
        },
        {
          id: 'restaurant-system',
          type: 'system-blueprint',
          variant: 'service-line',
          answers: ['buildable-system'],
          eyebrow: 'The service line',
          title: 'A restaurant system connects guest intent to branch ownership.',
          intro:
            'The buildable boundary can span public content, intake, branch routing, provider connections, and return journeys without replacing operator decisions.',
          layers: [
            {
              id: 'menus-branches',
              label: 'Menus and branches',
              description: 'A structured source connects each branch to its approved menu, prices, service modes, and content.',
              inputs: ['Branch details', 'Menu items and categories', 'Approved prices and descriptions'],
              handoff: 'A relevant guest-facing menu route',
              outcome: 'A clearer choice for the active branch',
            },
            {
              id: 'intake',
              label: 'Reservation and order intake',
              description: 'The guest route collects the agreed information and distinguishes submission from acceptance.',
              inputs: ['Guest selection', 'Branch and service mode', 'Required contact details'],
              handoff: 'A reviewable reservation or order request',
              outcome: 'An explicit acceptance decision',
            },
            {
              id: 'kitchen-connection',
              label: 'Point-of-sale and kitchen connection',
              description: 'Connections follow the fields, states, and access methods confirmed by the restaurant and its providers.',
              inputs: ['Provider documentation', 'Routing rules', 'Branch equipment decisions'],
              handoff: 'An accepted work item in the supported process',
              outcome: 'A visible operational responsibility',
            },
            {
              id: 'campaigns',
              label: 'Campaign and guest communication',
              description: 'Approved offers and service messages stay aligned with branch context and available routes.',
              inputs: ['Campaign brief', 'Audience and branch scope', 'Approved offer terms'],
              handoff: 'A branch-aware guest message',
              outcome: 'A traceable route from message to action',
            },
            {
              id: 'loyalty-feedback',
              label: 'Loyalty, feedback, and branch review',
              description: 'Return signals are collected under clear consent, ownership, and operational review rules.',
              inputs: ['Guest preference decision', 'Feedback route', 'Branch review ownership'],
              handoff: 'An approved return or review signal',
              outcome: 'A visible input for guest service and branch learning',
            },
          ],
        },
        {
          id: 'restaurant-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'Implementation paths',
          title: 'Build the guest journey around the restaurant you actually operate.',
          intro:
            'The right mix depends on branch structure, service modes, content ownership, current providers, and the first complete journey selected for improvement.',
          serviceIds: [
            'restaurant-qr-menu',
            'website-development',
            'ecommerce-development',
            'social-media-marketing',
          ],
          serviceAnchors: [
            {
              serviceId: 'restaurant-qr-menu',
              label: 'Restaurant QR menu systems',
            },
            {
              serviceId: 'website-development',
              label: 'Restaurant website development',
            },
            {
              serviceId: 'ecommerce-development',
              label: 'Ordering and commerce experiences',
            },
            {
              serviceId: 'social-media-marketing',
              label: 'Restaurant social media journeys',
            },
          ],
          relatedIndustryIds: ['retail', 'travel-hospitality'],
          industryAnchors: [
            {
              industryId: 'retail',
              label: 'Explore branch, stock, and loyalty operations',
            },
            {
              industryId: 'travel-hospitality',
              label: 'Explore guest discovery and booking journeys',
            },
          ],
        },
        {
          id: 'operator-owned-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Operator-owned evidence',
          title: 'The restaurant owns the information guests act on.',
          intro:
            'This is a proposed operating model, not a performance claim. Allergen information, prices, availability, preparation rules, and provider capabilities require operator approval.',
          items: [
            {
              id: 'allergen-content',
              label: 'Allergen and dietary information',
              responsibility: 'The restaurant approves item information, wording, review frequency, and the guest escalation route.',
              dependency: 'A named menu owner and a current source for each branch.',
              recovery: 'Remove or hold unclear content and direct the guest to the responsible restaurant team.',
            },
            {
              id: 'price-availability',
              label: 'Price and availability ownership',
              responsibility: 'The restaurant defines the source and update process for prices, items, branch hours, and service modes.',
              dependency: 'Branch ownership and an agreed publishing workflow.',
              recovery: 'Display only the state the operator can support and provide a contact route for uncertainty.',
            },
            {
              id: 'preparation-rules',
              label: 'Preparation and service timing',
              responsibility: 'The operator decides whether and how preparation or readiness guidance is calculated and communicated.',
              dependency: 'Branch process, workload inputs, and an approved guest-message rule.',
              recovery: 'Avoid a time promise and route the guest to the branch when the state cannot be confirmed.',
            },
            {
              id: 'provider-boundary',
              label: 'POS, kitchen, and provider interfaces',
              responsibility: 'The restaurant and provider confirm supported fields, states, authentication, and change ownership.',
              dependency: 'Current provider documentation and approved API access.',
              recovery: 'Keep the handoff in the existing process until the connection and fallback are accepted.',
            },
          ],
        },
        {
          id: 'regional-guest-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'Bilingual guest service',
          title: 'Menus and service messages should feel native to each guest.',
          intro:
            'Arabic and English menu writing, mixed product names, branch content, and guest messages share one operating structure while keeping natural language and reading direction.',
          items: [
            {
              id: 'native-menu-writing',
              label: 'Native menu writing',
              description: 'Item names and descriptions are written for appetite, clarity, and cultural context rather than copied word for word.',
            },
            {
              id: 'mixed-tokens',
              label: 'Mixed names and ordering tokens',
              description: 'Brand names, item codes, numbers, and interface labels remain legible inside both reading directions.',
            },
            {
              id: 'branch-content',
              label: 'Branch-aware content',
              description: 'Each branch owns the relevant menu, service mode, location guidance, and guest contact route.',
            },
            {
              id: 'guest-messages',
              label: 'Guest messages with operating meaning',
              description: 'Confirmation, acceptance, readiness, exception, and follow-up wording map to states the restaurant has approved.',
            },
          ],
        },
        {
          id: 'restaurants-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'Service questions',
          title: 'Questions to answer before tuning the service journey.',
          intro:
            'A useful first scope connects one guest action to a complete branch handoff and a clear owner.',
          items: [
            {
              id: 'menu-ownership',
              question: 'Who should own menu, price, and allergen updates?',
              answer: 'The restaurant assigns named owners and sources for each branch. The system provides the publishing and review route around those approved responsibilities.',
            },
            {
              id: 'pos-connection',
              question: 'Can the journey connect to our POS or kitchen provider?',
              answer: 'It can be scoped around the fields, states, authentication, and access the provider confirms. A manual or existing-process fallback remains part of the design.',
            },
            {
              id: 'preparation-times',
              question: 'Will the system promise preparation or readiness times?',
              answer: 'Only if the restaurant owns an approved method and message for doing so. Otherwise the journey shows a confirmed operating state or directs the guest to the branch.',
            },
            {
              id: 'bilingual-menu',
              question: 'Can Arabic and English menus share one operating structure?',
              answer: 'Yes. They can share item, category, branch, and service identifiers while each language receives its own natural descriptions, labels, and reading direction.',
            },
            {
              id: 'starting-point',
              question: 'Where should a restaurant begin?',
              answer: 'Begin with one branch and one complete service journey—menu to reservation or order, handoff, outcome, and return signal—then expand from what the team learns.',
            },
          ],
        },
        {
          id: 'restaurants-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'Choose the first service pass',
          title: 'Tune the handoffs behind the guest experience.',
          intro: 'Bring one branch, one guest journey, and the systems or providers it touches. We will shape them into a practical, bounded system brief.',
          decisionCopy: 'Start with one complete service pass and make every acceptance, handoff, exception, and return signal explicit.',
          primary: {
            label: 'Tune your service journey',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore restaurant QR menus',
            serviceId: 'restaurant-qr-menu',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'أنظمة رقمية للمطاعم ولكل طلب',
        description:
          'صمموا رحلة مطعم مترابطة من اكتشاف القائمة والحجز والطلب إلى تسليمات المطبخ وتشغيل الفروع وآراء الضيوف والولاء.',
      },
      breadcrumbLabel: 'المطاعم',
      hero: {
        worldLabel: 'إيقاع الخدمة',
        eyebrow: 'أنظمة المطاعم الرقمية',
        h1: 'امنح كل طلب إيقاعاً أكثر سلاسة.',
        intro:
          'تربط رحلة الخدمة المصممة بعناية بين اختيار الضيف وما يجب أن تملكه فرق الاستقبال والمطبخ والفرع والتسويق عند كل تسليم.',
        primaryCta: {
          label: 'اضبطوا إيقاع تجربة ضيوفكم',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: `استكشف قوائم ${arabicTokens.qr} للمطاعم`,
          serviceId: 'restaurant-qr-menu',
        },
        sceneSummary:
          'يتبع مسار الخدمة الضيف من القائمة والطلب إلى التحضير والاستلام أو الطاولة ثم الرأي والولاء وتعلّم الفرع.',
        sceneStages: [
          { id: 'menu', label: 'اكتشاف القائمة', state: 'الضيف' },
          { id: 'reservation-order', label: 'الحجز أو الطلب', state: 'الضيف' },
          { id: 'acceptance-routing', label: 'القبول والتوجيه', state: 'الاستقبال' },
          { id: 'preparation', label: 'التحضير', state: 'المطبخ' },
          { id: 'table-pickup', label: 'الطاولة أو الاستلام', state: 'الخدمة' },
          { id: 'feedback-loyalty', label: 'الرأي والولاء', state: 'العودة' },
          { id: 'branch-learning', label: 'تعلّم الفرع', state: 'التشغيل' },
        ],
      },
      sections: [
        {
          id: 'menu-appetite',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'قبل الطلب الأول',
          title: 'تلتقي الشهية بحقيقة التشغيل عند القائمة.',
          intro:
            'يحتاج الضيف إلى وضوح كافٍ للاختيار والتصرف، ويحتاج كل فرع إلى ملكية محددة للأسعار والتوفر ومسارات الطلب ورسائل الخدمة.',
          signals: [
            {
              id: 'discovery-context',
              label: 'الاكتشاف يحتاج إلى سياق الفرع',
              description: 'يجب أن يقود الموقع ونمط الخدمة والساعات ونوع المطبخ ومسار القائمة الصحيح إلى إجراء مناسب.',
            },
            {
              id: 'menu-clarity',
              label: 'وضوح القائمة يصنع الثقة',
              description: 'تحتاج الأسماء والأوصاف والأسعار والصور والمعلومات الغذائية إلى مصدر معتمد ومسار تحديث يراعي الفروع.',
            },
            {
              id: 'order-handoff',
              label: 'الطلب ينشئ مسؤولية تشغيلية',
              description: 'يحتاج الحجز أو الطلب إلى مسار صريح للقبول والتوجيه والتحضير والتواصل مع الضيف.',
            },
          ],
        },
        {
          id: 'the-pass',
          type: 'use-case-sequence',
          variant: 'timed-pass',
          answers: ['journey'],
          eyebrow: 'التكوين المميز',
          title: 'يحافظ مسار التمرير على إيقاع كل تسليم في الخدمة.',
          intro:
            'يسجل التسلسل المسؤولية ولا يعد بزمن التحضير. يحدد كل مطعم قواعد الخدمة والحالات ومسار التصعيد الخاص به.',
          steps: [
            {
              id: 'menu',
              label: 'اكتشاف القائمة',
              description: 'يرى الضيف الفرع ونمط الخدمة ومحتوى القائمة والإجراء التالي المناسب.',
              owner: 'مالك تجربة الضيف',
            },
            {
              id: 'reservation-order',
              label: 'الحجز أو تقديم الطلب',
              description: 'يرسل الضيف التفاصيل المتفق عليها عبر المسار المتاح لذلك الفرع.',
              owner: 'الضيف وفريق الاستقبال',
            },
            {
              id: 'acceptance-routing',
              label: 'قبول الطلب وتوجيهه',
              description: 'يقبل دور محدد الطلب أو يرفضه أو يعيد توجيهه وفق قواعد الفرع.',
              owner: 'فريق الاستقبال',
            },
            {
              id: 'preparation',
              label: 'التحضير تحت مسؤولية المطبخ',
              description: 'يستلم المطبخ العمل المقبول ويسجل الحالات التي تدعمها عملية التشغيل.',
              owner: 'المطبخ',
            },
            {
              id: 'table-pickup',
              label: 'إتمام تسليم الطاولة أو الاستلام أو التوصيل',
              description: 'يسجل دور الخدمة المسؤول النتيجة وأي استثناء يحتاج إلى متابعة.',
              owner: 'فريق الاستقبال أو شريك التنفيذ',
            },
            {
              id: 'feedback-loyalty-learning',
              label: 'ربط الرأي والولاء وتعلّم الفرع',
              description: 'تصبح الآراء المعتمدة وإشارات العودة مدخلات لتواصل الضيف ومراجعة الفرع.',
              owner: 'خدمة الضيف والتشغيل',
            },
          ],
        },
        {
          id: 'timing-branch-pressure',
          type: 'pressure-field',
          variant: 'dense-ledger',
          answers: [],
          eyebrow: 'بين صالة المطعم والمطبخ',
          title: 'يتراكم ضغط الخدمة بين الأنظمة والفرق.',
          intro:
            'يجب أن يكشف النظام التسليم والقرار خلف كل حالة، من دون اختراع وعد للتحضير أو افتراض أن جميع الفروع تتبع المسار نفسه.',
          signals: [
            {
              id: 'branch-configuration',
              label: 'إعداد الفرع يغير المسار',
              description: 'قد تختلف القوائم وأنماط الخدمة والأسعار والساعات والقنوات بحسب الموقع وتحتاج إلى ملكية محلية.',
            },
            {
              id: 'acceptance-state',
              label: 'يجب أن يكون القبول صريحاً',
              description: 'الطلب المرسل ليس حجزاً أو طلباً مقبولاً بعد، ويجب أن تعكس رسالة الضيف القرار الفعلي.',
            },
            {
              id: 'kitchen-handoff',
              label: 'تسليم المطبخ يحتاج إلى مصدر',
              description: 'يعتمد التوجيه على المعدات وواجهات المزود وعملية التشغيل التي يؤكدها المطعم.',
            },
            {
              id: 'guest-update',
              label: 'رسائل الضيف تحتاج إلى معنى معتمد',
              description: 'يجب أن ترتبط كل رسالة ظاهرة بحالة تشغيل مملوكة ومسار استثناء محدد.',
            },
            {
              id: 'branch-learning',
              label: 'تعلّم الفرع يحتاج إلى مراجعة',
              description: 'لا تصبح الآراء وإشارات الطلب واستثناءات الخدمة مفيدة إلا حين يراجعها فريق محدد ويتصرف بناءً عليها.',
            },
          ],
        },
        {
          id: 'restaurant-system',
          type: 'system-blueprint',
          variant: 'service-line',
          answers: ['buildable-system'],
          eyebrow: 'خط الخدمة',
          title: 'يربط نظام المطعم نية الضيف بملكية الفرع.',
          intro:
            'يمكن أن يشمل النطاق القابل للبناء المحتوى العام والاستقبال وتوجيه الفروع وروابط المزودين ورحلات العودة، من دون استبدال قرارات المشغل.',
          layers: [
            {
              id: 'menus-branches',
              label: 'القوائم والفروع',
              description: 'يربط مصدر منظم كل فرع بقائمته وأسعاره وأنماط خدمته ومحتواه المعتمد.',
              inputs: ['تفاصيل الفرع', 'أصناف القائمة وفئاتها', 'الأسعار والأوصاف المعتمدة'],
              handoff: 'مسار قائمة ملائم للضيف',
              outcome: 'اختيار أوضح للفرع النشط',
            },
            {
              id: 'intake',
              label: 'استقبال الحجز والطلب',
              description: 'يجمع مسار الضيف المعلومات المتفق عليها ويميز بين الإرسال والقبول.',
              inputs: ['اختيار الضيف', 'الفرع ونمط الخدمة', 'بيانات التواصل المطلوبة'],
              handoff: 'طلب حجز أو طلب قابل للمراجعة',
              outcome: 'قرار قبول صريح',
            },
            {
              id: 'kitchen-connection',
              label: `ربط ${arabicTokens.pos} والمطبخ`,
              description: 'تتبع الروابط الحقول والحالات وطرق الوصول التي يؤكدها المطعم ومزودوه.',
              inputs: ['توثيق المزود', 'قواعد التوجيه', 'قرارات معدات الفرع'],
              handoff: 'مهمة مقبولة في العملية المدعومة',
              outcome: 'مسؤولية تشغيلية مرئية',
            },
            {
              id: 'campaigns',
              label: 'الحملات والتواصل مع الضيف',
              description: 'تبقى العروض ورسائل الخدمة المعتمدة متسقة مع سياق الفرع والمسارات المتاحة.',
              inputs: ['موجز الحملة', 'نطاق الجمهور والفرع', 'شروط العرض المعتمدة'],
              handoff: 'رسالة ضيف تراعي الفرع',
              outcome: 'مسار قابل للتتبع من الرسالة إلى الإجراء',
            },
            {
              id: 'loyalty-feedback',
              label: 'الولاء والآراء ومراجعة الفرع',
              description: 'تُجمع إشارات العودة وفق قواعد واضحة للموافقة والملكية والمراجعة التشغيلية.',
              inputs: ['قرار تفضيلات الضيف', 'مسار الرأي', 'ملكية مراجعة الفرع'],
              handoff: 'إشارة عودة أو مراجعة معتمدة',
              outcome: 'مدخل مرئي لخدمة الضيف وتعلّم الفرع',
            },
          ],
        },
        {
          id: 'restaurant-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'ابنوا رحلة الضيف حول المطعم الذي تديرونه فعلياً.',
          intro:
            'يتحدد المزيج المناسب وفق بنية الفروع وأنماط الخدمة وملكية المحتوى والمزودين الحاليين وأول رحلة مكتملة تختارون تحسينها.',
          serviceIds: [
            'restaurant-qr-menu',
            'website-development',
            'ecommerce-development',
            'social-media-marketing',
          ],
          serviceAnchors: [
            {
              serviceId: 'restaurant-qr-menu',
              label: `أنظمة قوائم ${arabicTokens.qr} للمطاعم`,
            },
            {
              serviceId: 'website-development',
              label: 'تطوير مواقع المطاعم',
            },
            {
              serviceId: 'ecommerce-development',
              label: 'تجارب الطلب والتجارة',
            },
            {
              serviceId: 'social-media-marketing',
              label: 'رحلات المطاعم عبر التواصل الاجتماعي',
            },
          ],
          relatedIndustryIds: ['retail', 'travel-hospitality'],
          industryAnchors: [
            {
              industryId: 'retail',
              label: 'استكشف عمليات الفروع والمخزون والولاء',
            },
            {
              industryId: 'travel-hospitality',
              label: 'استكشف رحلات اكتشاف الضيف والحجز',
            },
          ],
        },
        {
          id: 'operator-owned-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'أدلة يملكها المشغل',
          title: 'يملك المطعم المعلومات التي يتصرف الضيف بناءً عليها.',
          intro:
            'هذا نموذج تشغيل مقترح، وليس ادعاءً عن الأداء. تحتاج معلومات مسببات الحساسية والأسعار والتوفر وقواعد التحضير وقدرات المزود إلى اعتماد المشغل.',
          items: [
            {
              id: 'allergen-content',
              label: 'معلومات مسببات الحساسية والأنظمة الغذائية',
              responsibility: 'يعتمد المطعم معلومات الأصناف وصياغتها ودورية مراجعتها ومسار تصعيد الضيف.',
              dependency: 'مالك قائمة محدد ومصدر حالي لكل فرع.',
              recovery: 'إزالة المحتوى غير الواضح أو تعليقه وتوجيه الضيف إلى فريق المطعم المسؤول.',
            },
            {
              id: 'price-availability',
              label: 'ملكية السعر والتوفر',
              responsibility: 'يحدد المطعم مصدر تحديث الأسعار والأصناف وساعات الفروع وأنماط الخدمة.',
              dependency: 'ملكية الفرع ومسار نشر متفق عليه.',
              recovery: 'عرض الحالة التي يستطيع المشغل دعمها فقط وتوفير مسار تواصل عند عدم اليقين.',
            },
            {
              id: 'preparation-rules',
              label: 'قواعد التحضير وتوقيت الخدمة',
              responsibility: 'يقرر المشغل ما إذا كان سيحسب إرشادات التحضير أو الجاهزية وكيف سيعرضها.',
              dependency: 'عملية الفرع ومدخلات عبء العمل وقاعدة رسالة ضيف معتمدة.',
              recovery: 'تجنب الوعد الزمني وتوجيه الضيف إلى الفرع حين لا يمكن تأكيد الحالة.',
            },
            {
              id: 'provider-boundary',
              label: `واجهات ${arabicTokens.pos} والمطبخ والمزود`,
              responsibility: 'يؤكد المطعم والمزود الحقول والحالات والمصادقة ومسؤولية التغيير المدعومة.',
              dependency: `توثيق حالي من المزود ووصول معتمد إلى ${arabicTokens.api}.`,
              recovery: 'إبقاء التسليم في العملية الحالية حتى قبول الربط والمسار البديل.',
            },
          ],
        },
        {
          id: 'regional-guest-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'خدمة ضيف باللغتين',
          title: 'يجب أن تبدو القوائم ورسائل الخدمة طبيعية لكل ضيف.',
          intro:
            'تشترك كتابة القوائم العربية والإنجليزية وأسماء المنتجات المختلطة ومحتوى الفروع ورسائل الضيوف في بنية تشغيل واحدة، مع الحفاظ على اللغة واتجاه القراءة الطبيعيين.',
          items: [
            {
              id: 'native-menu-writing',
              label: 'كتابة قائمة طبيعية',
              description: 'تُكتب أسماء الأصناف وأوصافها للشهية والوضوح والسياق الثقافي، لا كنسخ حرفي كلمة بكلمة.',
            },
            {
              id: 'mixed-tokens',
              label: 'الأسماء ورموز الطلب المختلطة',
              description: 'تبقى أسماء العلامات ورموز الأصناف والأرقام وعناوين الواجهة مقروءة داخل اتجاهي القراءة.',
            },
            {
              id: 'branch-content',
              label: 'محتوى يراعي الفروع',
              description: 'يملك كل فرع القائمة ونمط الخدمة وإرشادات الموقع ومسار تواصل الضيف ذات الصلة.',
            },
            {
              id: 'guest-messages',
              label: 'رسائل ضيف ذات معنى تشغيلي',
              description: 'ترتبط صياغة التأكيد والقبول والجاهزية والاستثناء والمتابعة بحالات يعتمدها المطعم.',
            },
          ],
        },
        {
          id: 'restaurants-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'أسئلة الخدمة',
          title: 'أسئلة يجب حسمها قبل ضبط رحلة الخدمة.',
          intro:
            'يربط النطاق الأول المفيد إجراءً واحداً للضيف بتسليم مكتمل داخل الفرع ومالك واضح.',
          items: [
            {
              id: 'menu-ownership',
              question: 'من يجب أن يملك تحديثات القائمة والسعر ومسببات الحساسية؟',
              answer: 'يعين المطعم أصحاب مسؤولية ومصادر محددة لكل فرع. ويوفر النظام مسار النشر والمراجعة حول تلك المسؤوليات المعتمدة.',
            },
            {
              id: 'pos-connection',
              question: `هل يمكن ربط الرحلة مع ${arabicTokens.pos} أو مزود المطبخ لدينا؟`,
              answer: 'يمكن تحديد النطاق وفق الحقول والحالات والمصادقة والوصول الذي يؤكده المزود، مع إبقاء مسار يدوي أو مسار العملية الحالية جزءاً من التصميم.',
            },
            {
              id: 'preparation-times',
              question: 'هل سيعد النظام بزمن التحضير أو الجاهزية؟',
              answer: 'فقط إذا كان المطعم يملك طريقة ورسالة معتمدتين لذلك. بخلاف ذلك تعرض الرحلة حالة تشغيل مؤكدة أو توجه الضيف إلى الفرع.',
            },
            {
              id: 'bilingual-menu',
              question: 'هل يمكن أن تشترك القائمتان العربية والإنجليزية في بنية تشغيل واحدة؟',
              answer: 'نعم. يمكنهما مشاركة معرفات الصنف والفئة والفرع والخدمة، مع حصول كل لغة على أوصافها الطبيعية وعناوينها واتجاه قراءتها.',
            },
            {
              id: 'starting-point',
              question: 'من أين يبدأ المطعم؟',
              answer: 'ابدؤوا بفرع واحد ورحلة خدمة مكتملة من القائمة إلى الحجز أو الطلب والتسليم والنتيجة وإشارة العودة، ثم توسعوا بناءً على ما يتعلمه الفريق.',
            },
          ],
        },
        {
          id: 'restaurants-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'اختاروا مسار الخدمة الأول',
          title: 'اضبطوا التسليمات خلف تجربة الضيف.',
          intro: 'أحضروا فرعاً واحداً ورحلة ضيف واحدة والأنظمة أو المزودين الذين تمر بهم، وسنحوّلها إلى موجز نظام عملي ومحدد النطاق.',
          decisionCopy: 'ابدؤوا بمسار خدمة مكتمل واجعلوا كل قبول وتسليم واستثناء وإشارة عودة صريحة.',
          primary: {
            label: 'اضبطوا إيقاع تجربة ضيوفكم',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: `استكشف قوائم ${arabicTokens.qr} للمطاعم`,
            serviceId: 'restaurant-qr-menu',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
