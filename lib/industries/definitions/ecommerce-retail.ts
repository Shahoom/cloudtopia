import type { IndustryPageDefinition } from '@/lib/industries/types'

/**
 * Hand-authored E-commerce & Retail "Industry World".
 *
 * The visible page (components/industry/ecommerce-retail/EcommerceRetailIndustryPage.tsx)
 * ports the Lager storefront template's look & signature interactions (owl
 * caption cascade hero, tabsy hover-swap, stretcher hover-accordion, card
 * bloom) while presenting CloudTopia's expertise BUILDING commerce & retail
 * platforms: storefronts, catalog & search, checkout & payments, inventory/POS,
 * order management, and omnichannel/marketplace integrations.
 *
 * This definition drives the hero, the service-bridge link cards, the FAQ, and
 * the JSON-LD / markdown / SEO surfaces. Every other ported visual section
 * pulls its microcopy from ecommerce-retail-content.ts.
 *
 * Framing rule: CloudTopia ENGINEERS commerce & retail systems — it is NOT a
 * retailer. Prices, tax, availability, and product data always come from
 * operator-approved sources; the platform presents and reconciles them, it does
 * not invent them.
 */
export const ecommerceRetailDefinition = {
  slug: 'ecommerce-retail',
  contentVersion: 'ecommerce-retail-lager-published-1',
  publicationStatus: 'published',
  updatedAt: '2026-07-17',
  world: {
    id: 'catalog-rush',
    theme: {
      // Derived from the Lager palette: a single brand blue (#2e73bb) on a
      // greyscale ink set over white / #f8f8f8 surfaces. Body ink darkened for
      // AA; signal is the darker pressed blue.
      canvas: '#FFFFFF',
      surface: '#FFFFFF',
      elevatedSurface: '#F8F8F8',
      ink: '#33363D',
      mutedInk: '#565961',
      accent: '#2E73BB',
      accentInk: '#FFFFFF',
      signal: '#245A92',
      line: '#E0E0E0',
      focus: '#2E73BB',
      displayTreatment: 'editorial',
      radiusMode: 'square',
      motifDensity: 'medium',
      sceneTreatment: 'service-pass',
    },
    heroScene: 'ecommerce-catalog',
    heroTreatment: 'editorial-pass',
    signatureComposition: {
      id: 'commerce-build-stack',
      name: {
        en: 'The commerce build stack',
        ar: 'رف بناء التجارة',
      },
      sectionIds: [
        'ecommerce-retail-stack',
        'ecommerce-purchase-journey',
        'ecommerce-platform-system',
      ],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'ecommerce-catalog' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/ecommerce-retail/en.jpg',
      width: 1200,
      height: 630,
    },
    {
      kind: 'og-image',
      locale: 'ar',
      publicPath: '/og/industries/ecommerce-retail/ar.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: {
        title: 'E-commerce & Retail Platform Engineering — Storefronts to POS',
        description:
          'CloudTopia engineers bilingual commerce & retail systems: storefronts and PWAs, product catalog and search, checkout and payments, inventory and POS, order management, and omnichannel and marketplace integrations.',
      },
      breadcrumbLabel: 'E-commerce & Retail',
      hero: {
        worldLabel: 'Catalog Rush',
        eyebrow: 'Commerce & retail platform systems',
        h1: 'We build the commerce and retail stack behind the buy button.',
        intro:
          'CloudTopia designs and builds bilingual commerce & retail systems—storefronts and PWAs, product catalog and search, checkout and payments, inventory and POS, order management, and omnichannel and marketplace integrations—from the first product view through fulfillment, returns, and the next repeat purchase.',
        primaryCta: {
          label: 'Map your catalog-to-checkout flow',
          href: '/api/whatsapp?locale=en',
        },
        secondaryCta: {
          label: 'Explore commerce build paths',
          serviceId: 'ecommerce-development',
        },
        sceneSummary:
          'Discovery, product choice, checkout, fulfillment, and the return journey stay visible on one reconciled commerce rail.',
        sceneStages: [
          { id: 'discover', label: 'Discover and search', state: 'Relevant' },
          { id: 'choose', label: 'Choose a product', state: 'Comparable' },
          { id: 'checkout', label: 'Cart and checkout', state: 'Confirmed' },
          { id: 'fulfillment', label: 'Fulfillment', state: 'Trackable' },
          { id: 'return', label: 'Return and repeat', state: 'Retained' },
        ],
      },
      sections: [
        {
          id: 'ecommerce-operating-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'Where the sale is won or lost',
          title: 'A store is judged in the seconds before the buy button.',
          intro:
            'Shoppers decide whether to keep going in the first few screens, while operators need catalog, price, stock, and fulfillment to stay consistent across every channel the customer touches.',
          signals: [
            {
              id: 'discovery-friction',
              label: 'Discovery is where carts are lost first',
              description:
                'When search, filters, and product data are slow or inconsistent, shoppers cannot find or trust the product, and the journey ends before a cart is ever started.',
            },
            {
              id: 'checkout-integrity',
              label: 'Checkout needs one reconciled source of truth',
              description:
                'Price, tax, stock, and payment only hold up when every channel reads the same operator-approved record and each order is written once and reconciled.',
            },
            {
              id: 'omnichannel-visibility',
              label: 'Stock and orders decide the real experience',
              description:
                'Oversells, split shipments, returns, and in-store pickups need visible states, owners, and customer communication—not a silent gap between web, marketplace, and POS.',
            },
          ],
        },
        {
          id: 'ecommerce-purchase-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'From first view to repeat order',
          title: 'One reconciled path from discovery to the return journey.',
          intro:
            'The system carries a shopper through an understandable commerce sequence while keeping catalog, pricing, inventory, and order records consistent, owned, and reconcilable across channels.',
          stages: [
            {
              id: 'discover',
              label: 'Discover and search',
              description:
                'Bilingual catalog, search, and merchandising surface the right products with accurate, operator-approved names, media, and pricing context.',
              actor: 'Shopper',
            },
            {
              id: 'choose',
              label: 'Choose a product',
              description:
                'Product detail, variants, availability, and comparison read from one source so the shopper can decide with information that stays true at checkout.',
              actor: 'Shopper and catalog system',
            },
            {
              id: 'checkout',
              label: 'Cart and checkout',
              description:
                'Cart, pricing, tax presentation, and payment are validated against approved sources and written as a single reconciled order.',
              actor: 'Shopper and payment providers',
            },
            {
              id: 'fulfillment',
              label: 'Fulfillment and delivery',
              description:
                'Inventory, order management, and carrier or store handoffs move the order to the customer with trackable, visible states.',
              actor: 'Operations and fulfillment owners',
            },
            {
              id: 'exception',
              label: 'Returns and exceptions',
              description:
                'Returns, refunds, oversells, and split shipments route to named queues with the evidence and next action to keep the customer informed.',
              actor: 'Operations and support team',
            },
            {
              id: 'return',
              label: 'Repeat and retain',
              description:
                'Accounts, order history, loyalty, and re-purchase journeys bring the customer back to a relationship the operator owns.',
              actor: 'Shopper and CRM system',
            },
          ],
        },
        {
          id: 'ecommerce-retail-stack',
          type: 'use-case-sequence',
          variant: 'operating-matrix',
          answers: [],
          eyebrow: 'Signature composition',
          title: 'The commerce build stack, panel by panel.',
          intro:
            'The platform is assembled as a set of connected build layers—each one can be the starting point, but every layer needs approved inputs, a named owner, and a reconcilable handoff to the next.',
          steps: [
            {
              id: 'storefront',
              label: 'Storefront and PWA experience',
              description:
                'Fast, bilingual web and progressive-web storefronts that render catalog, search, and product detail with approved content and clear states.',
              owner: 'Experience and front-of-store owners',
            },
            {
              id: 'catalog',
              label: 'Catalog, search, and merchandising',
              description:
                'Product information, variants, media, and search relevance are structured and reconciled so every channel reads the same truth.',
              owner: 'Merchandising and catalog owners',
            },
            {
              id: 'checkout',
              label: 'Checkout and payments',
              description:
                'Cart, pricing, tax presentation, and validated payment integrations produce one recorded, reconcilable order.',
              owner: 'Payments and finance owners',
            },
            {
              id: 'operations',
              label: 'Inventory, OMS, and POS',
              description:
                'Stock, order management, and in-store point of sale keep availability and fulfillment consistent between web, marketplace, and store.',
              owner: 'Operations and store owners',
            },
            {
              id: 'omnichannel',
              label: 'Omnichannel and marketplace integrations',
              description:
                'Bounded integrations to marketplaces, carriers, ERPs, and CRM connect the platform without losing its single reconciled record.',
              owner: 'Integration and data owners',
            },
          ],
        },
        {
          id: 'ecommerce-platform-system',
          type: 'system-blueprint',
          variant: 'service-line',
          answers: ['buildable-system'],
          eyebrow: 'A buildable boundary',
          title: 'A commerce platform is a connected set of owned layers.',
          intro:
            'Scope can start with one flow—catalog, checkout, or fulfillment—but every layer needs approved inputs, a named handoff, and an outcome the operator can reconcile and review.',
          layers: [
            {
              id: 'storefront-layer',
              label: 'Storefront and experience layer',
              description:
                'Bilingual web and PWA storefronts render catalog, search, product detail, and checkout with approved content and accessible, fast interfaces.',
              inputs: ['Approved product content', 'Brand and design system', 'Localized copy'],
              handoff: 'A recorded, validated shopper intent',
              outcome: 'A shopper who can find, trust, and buy the product',
            },
            {
              id: 'commerce-core',
              label: 'Catalog, cart, and checkout layer',
              description:
                'Product information, pricing, cart, tax presentation, and payment integrations record each order once against a reconcilable source of truth.',
              inputs: ['Operator-approved catalog and prices', 'Tax and currency rules', 'Validated payment providers'],
              handoff: 'A single authoritative order record',
              outcome: 'Orders and revenue a reviewer can reconcile',
            },
            {
              id: 'operations-core',
              label: 'Inventory, OMS, and POS layer',
              description:
                'Stock, order management, fulfillment, and in-store point of sale keep availability and status consistent across every channel.',
              inputs: ['Stock and warehouse sources', 'Fulfillment and carrier rules', 'Store and POS model'],
              handoff: 'A consistent, trackable order and stock state',
              outcome: 'Availability and fulfillment operators can trust',
            },
            {
              id: 'integration-layer',
              label: 'Omnichannel, integration, and data layer',
              description:
                'Bounded integrations to marketplaces, carriers, ERP, and CRM plus analytics keep the platform connected and observable within agreed limits.',
              inputs: ['Approved provider interfaces', 'Data-ownership and access rules', 'Analytics and event model'],
              handoff: 'A bounded, observed data exchange',
              outcome: 'A connected platform that stays inside its controls',
            },
          ],
        },
        {
          id: 'ecommerce-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'Paths to implementation',
          title: 'Choose the build paths that assemble the platform.',
          intro:
            'The final combination depends on the flow you prioritize, the systems, marketplaces, and providers you already use, and the smallest complete, reconcilable handoff worth building first.',
          serviceIds: [
            'ecommerce-development',
            'business-systems-development',
            'website-development',
            'social-media-marketing',
          ],
          serviceAnchors: [
            {
              serviceId: 'ecommerce-development',
              label: 'Storefronts, checkout, and payments',
            },
            {
              serviceId: 'business-systems-development',
              label: 'Inventory, POS, and order-management systems',
            },
            {
              serviceId: 'website-development',
              label: 'Brand, campaign, and bilingual catalog websites',
            },
            {
              serviceId: 'social-media-marketing',
              label: 'Social commerce, launch campaigns, and retention',
            },
          ],
          relatedIndustryIds: ['retail', 'logistics-supply-chain'],
          industryAnchors: [
            {
              industryId: 'retail',
              label: 'Explore branch, stock, and in-store systems',
            },
            {
              industryId: 'logistics-supply-chain',
              label: 'Explore fulfillment and supply-chain systems',
            },
          ],
        },
        {
          id: 'ecommerce-commerce-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'Evidence and responsibility',
          title: 'The design makes commerce boundaries explicit.',
          intro:
            'This page describes a proposed engineering model, not a store, a price list, or a guarantee of availability. Catalog, pricing, tax, stock, and provider access remain owned by the operator and its authorized systems.',
          items: [
            {
              id: 'data-ownership',
              label: 'Catalog, price, and stock are operator-owned',
              responsibility:
                'The platform presents and reconciles product data, pricing, tax presentation, and availability, but the operator owns the approved source those values come from.',
              dependency: 'A named data owner and an approved source of truth for catalog, price, and stock.',
              recovery: 'Hold the affected listing behind an approved fallback until its source is confirmed.',
            },
            {
              id: 'payment-dependencies',
              label: 'Payment and shipping dependencies',
              responsibility:
                'Payment gateways, carriers, and marketplace connections depend on validated provider access, contracts, and market availability.',
              dependency: 'Confirmed gateway, carrier, and marketplace documentation, credentials, and market approval.',
              recovery: 'Keep the step behind a manual or sandboxed path until provider access is validated.',
            },
            {
              id: 'exception-ownership',
              label: 'Returns and stock exceptions need owners',
              responsibility:
                'Oversells, refunds, returns, and split shipments require visible states, owners, and customer communication defined before launch.',
              dependency: 'Approved exception types, owners, and customer-communication rules.',
              recovery: 'Route unclear cases to a named queue instead of a silent failure at checkout or fulfillment.',
            },
            {
              id: 'compliance-boundary',
              label: 'Payment security is supported, not certified',
              responsibility:
                'The platform can implement approved controls around card and customer data, but PCI scope, certification, and licensing remain with the operator and its providers.',
              dependency: 'A named compliance owner and the approved payment and data requirements.',
              recovery: 'Pause the affected flow and return the decision to the compliance owner before launch.',
            },
          ],
        },
        {
          id: 'ecommerce-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'Built for bilingual commerce',
          title: 'Arabic and English are shopping languages, not a final translation step.',
          intro:
            'Product names, options, search terms, pricing context, and checkout copy are authored for each language while one shared, reconcilable catalog and order structure stays constant.',
          items: [
            {
              id: 'bilingual-catalog',
              label: 'Native bilingual catalog',
              description:
                'Product names, variants, media, and search terms are written and checked independently in Arabic and English so shoppers find and trust the same product in either language.',
            },
            {
              id: 'localized-checkout',
              label: 'Localized checkout and disclosures',
              description:
                'Prices, tax presentation, shipping, and required disclosures stay accurate and readable in right-to-left and left-to-right contexts, under a named review owner.',
            },
            {
              id: 'market-dependencies',
              label: 'Market-by-market dependencies',
              description:
                'Payment gateways, carriers, currency, marketplaces, and regulatory requirements are checked per market before scope is fixed.',
            },
          ],
        },
        {
          id: 'ecommerce-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'Decision questions',
          title: 'What commerce & retail teams usually need to decide first.',
          intro:
            'A useful first scope is one complete, reconcilable flow—catalog to checkout, or checkout to fulfillment—with named catalog, payment, and operations owners.',
          items: [
            {
              id: 'platform-choice',
              question: 'Do you build custom, or on Shopify, Medusa, or a headless stack?',
              answer:
                'Both. We engineer custom commerce platforms and build on or extend headless and hosted stacks such as Shopify, Medusa, or a composable setup. We choose based on your catalog complexity, integrations, and the systems you already run—then keep one reconciled source of truth whichever path we take.',
            },
            {
              id: 'existing-systems',
              question: 'Can this connect to our existing ERP, POS, or marketplaces?',
              answer:
                'It is designed around the interfaces, fields, and access your systems and providers confirm. We map the required data, responsible systems, reconciliation source, and a manual or sandboxed fallback before committing to a live integration with an ERP, POS, carrier, or marketplace.',
            },
            {
              id: 'bilingual-catalog',
              question: 'How should a bilingual catalog be structured?',
              answer:
                'Product names, options, pricing context, media, and search terms are authored and checked independently in Arabic and English over one shared catalog structure, so the same product is findable and accurate in either language.',
            },
            {
              id: 'payments-security',
              question: 'How are payments and card data handled?',
              answer:
                'Payment integrations use validated providers behind their approved flows, with encryption and access controls engineered into the foundation. PCI scope, certification, and licensing stay with your operator and payment providers—the build makes those requirements explicit and traceable.',
            },
            {
              id: 'migration',
              question: 'Can you migrate our current store without losing orders or SEO?',
              answer:
                'Yes. We plan catalog, customer, and order migration with a reconciliation step, preserve URLs with redirects, and keep the old and new systems verifiable against each other before cutover, so history and search equity are not lost.',
            },
            {
              id: 'starting-point',
              question: 'Where should a commerce team begin?',
              answer:
                'Begin with the flow where customers or operators lose the most context—search and catalog, checkout recovery, fulfillment status, or repeat purchase—then define the smallest reconcilable system boundary that supports it end to end before expanding.',
            },
          ],
        },
        {
          id: 'ecommerce-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'Choose the first flow',
          title: 'Make one reconcilable flow the starting point.',
          intro:
            'Bring one commerce flow, the teams, marketplaces, and providers who own it, and the systems it touches. We will turn that context into a bounded, buildable commerce-system brief.',
          decisionCopy:
            'Start with one complete, reconcilable flow—catalog to checkout, or checkout to fulfillment—rather than a list of disconnected features.',
          primary: {
            label: 'Map your catalog-to-checkout flow',
            href: '/api/whatsapp?locale=en',
          },
          secondary: {
            label: 'Explore commerce and storefront development',
            serviceId: 'ecommerce-development',
          },
        },
      ],
    },
    ar: {
      seo: {
        title: 'هندسة منصات التجارة الإلكترونية والتجزئة — من المتجر إلى نقاط البيع',
        description:
          'تهندس كلاود توبيا أنظمة تجارة إلكترونية وتجزئة ثنائية اللغة: متاجر وتطبيقات ويب تقدمية، وكتالوج منتجات وبحث، ودفع وسداد، ومخزون ونقاط بيع، وإدارة طلبات، وتكاملات متعددة القنوات والأسواق.',
      },
      breadcrumbLabel: 'التجارة الإلكترونية والتجزئة',
      hero: {
        worldLabel: 'حركة الكتالوج',
        eyebrow: 'أنظمة منصات التجارة والتجزئة',
        h1: 'نبني منظومة التجارة والتجزئة خلف زر الشراء.',
        intro:
          'تصمم كلاود توبيا وتبني أنظمة تجارة إلكترونية وتجزئة ثنائية اللغة—متاجر وتطبيقات ويب تقدمية، وكتالوج منتجات وبحث، ودفع وسداد، ومخزون ونقاط بيع، وإدارة طلبات، وتكاملات متعددة القنوات والأسواق—من أول عرض للمنتج حتى التجهيز والإرجاع والشراء المتكرر التالي.',
        primaryCta: {
          label: 'لنرسم مسار الكتالوج إلى الدفع',
          href: '/api/whatsapp?locale=ar',
        },
        secondaryCta: {
          label: 'استكشفوا مسارات بناء التجارة',
          serviceId: 'ecommerce-development',
        },
        sceneSummary:
          'يبقى الاكتشاف واختيار المنتج والدفع والتجهيز ورحلة الإرجاع مرئية على مسار تجارة واحد مطابَق.',
        sceneStages: [
          { id: 'discover', label: 'الاكتشاف والبحث', state: 'ملائم' },
          { id: 'choose', label: 'اختيار المنتج', state: 'قابل للمقارنة' },
          { id: 'checkout', label: 'السلة والدفع', state: 'مؤكد' },
          { id: 'fulfillment', label: 'التجهيز', state: 'قابل للتتبع' },
          { id: 'return', label: 'الإرجاع والتكرار', state: 'مستمر' },
        ],
      },
      sections: [
        {
          id: 'ecommerce-operating-pressure',
          type: 'pressure-field',
          variant: 'split-signal',
          answers: ['operating-pressure'],
          eyebrow: 'حيث يُكسب البيع أو يُفقد',
          title: 'يُحكم على المتجر في الثواني التي تسبق زر الشراء.',
          intro:
            'يقرر المتسوقون الاستمرار في الشاشات الأولى، بينما يحتاج فريق التشغيل إلى بقاء الكتالوج والسعر والمخزون والتجهيز متسقاً عبر كل قناة يلمسها العميل.',
          signals: [
            {
              id: 'discovery-friction',
              label: 'الاكتشاف هو أول ما تُفقد عنده السلة',
              description:
                'حين يكون البحث والتصفية وبيانات المنتج بطيئة أو غير متسقة، لا يجد المتسوق المنتج أو لا يثق به، فتنتهي الرحلة قبل أن تبدأ سلة أصلاً.',
            },
            {
              id: 'checkout-integrity',
              label: 'الدفع يحتاج مصدر حقيقة واحداً مطابَقاً',
              description:
                'لا يصمد السعر والضريبة والمخزون والدفع إلا حين تقرأ كل قناة السجل نفسه المعتمد من المشغل، ويُكتب كل طلب مرة واحدة ويُطابَق.',
            },
            {
              id: 'omnichannel-visibility',
              label: 'المخزون والطلبات هي ما يحدد التجربة الحقيقية',
              description:
                'تحتاج المبيعات الزائدة والشحنات المقسّمة والإرجاعات والاستلام من المتجر إلى حالات مرئية ومالكين وتواصل مع العميل، لا فجوة صامتة بين الويب والسوق ونقطة البيع.',
            },
          ],
        },
        {
          id: 'ecommerce-purchase-journey',
          type: 'journey-map',
          variant: 'linear-route',
          answers: ['journey'],
          eyebrow: 'من أول عرض إلى الطلب المتكرر',
          title: 'مسار واحد مطابَق من الاكتشاف إلى رحلة الإرجاع.',
          intro:
            'يقود النظام المتسوق عبر تسلسل تجاري مفهوم، مع إبقاء سجلات الكتالوج والتسعير والمخزون والطلبات متسقة ومملوكة وقابلة للمطابقة عبر القنوات.',
          stages: [
            {
              id: 'discover',
              label: 'الاكتشاف والبحث',
              description:
                'يُظهر الكتالوج والبحث والعرض التجاري ثنائي اللغة المنتجات المناسبة بأسماء ووسائط وسياق سعر دقيق معتمد من المشغل.',
              actor: 'المتسوق',
            },
            {
              id: 'choose',
              label: 'اختيار المنتج',
              description:
                'تُقرأ تفاصيل المنتج والخيارات والتوفر والمقارنة من مصدر واحد ليقرر المتسوق بمعلومات تبقى صحيحة عند الدفع.',
              actor: 'المتسوق ونظام الكتالوج',
            },
            {
              id: 'checkout',
              label: 'السلة والدفع',
              description:
                'تُتحقَّق السلة والتسعير وعرض الضريبة والدفع من مصادر معتمدة وتُكتب كطلب واحد مطابَق.',
              actor: 'المتسوق ومزودو الدفع',
            },
            {
              id: 'fulfillment',
              label: 'التجهيز والتوصيل',
              description:
                'ينقل المخزون وإدارة الطلبات وتسليمات الناقل أو المتجر الطلب إلى العميل بحالات مرئية قابلة للتتبع.',
              actor: 'أصحاب التشغيل والتجهيز',
            },
            {
              id: 'exception',
              label: 'الإرجاع والاستثناءات',
              description:
                'تُوجَّه الإرجاعات والاستردادات والمبيعات الزائدة والشحنات المقسّمة إلى قوائم محددة مع الأدلة والإجراء التالي لإبقاء العميل مطّلعاً.',
              actor: 'فريق التشغيل والدعم',
            },
            {
              id: 'return',
              label: 'التكرار والاحتفاظ',
              description:
                'تعيد الحسابات وسجل الطلبات والولاء ورحلات الشراء المتكرر العميل إلى علاقة يملكها المشغل.',
              actor: 'المتسوق ونظام إدارة العملاء',
            },
          ],
        },
        {
          id: 'ecommerce-retail-stack',
          type: 'use-case-sequence',
          variant: 'operating-matrix',
          answers: [],
          eyebrow: 'التكوين المميز',
          title: 'رف بناء التجارة، لوحة تلو الأخرى.',
          intro:
            'تُجمَّع المنصة كمجموعة من طبقات البناء المترابطة—يمكن أن تكون كل منها نقطة البداية، لكن كل طبقة تحتاج مدخلات معتمدة ومالكاً محدداً وتسليماً قابلاً للمطابقة إلى ما يليها.',
          steps: [
            {
              id: 'storefront',
              label: 'تجربة المتجر وتطبيق الويب التقدمي',
              description:
                'متاجر ويب وتطبيقات ويب تقدمية سريعة ثنائية اللغة تعرض الكتالوج والبحث وتفاصيل المنتج بمحتوى معتمد وحالات واضحة.',
              owner: 'أصحاب التجربة وواجهة المتجر',
            },
            {
              id: 'catalog',
              label: 'الكتالوج والبحث والعرض التجاري',
              description:
                'تُنظَّم معلومات المنتج والخيارات والوسائط وملاءمة البحث وتُطابَق لتقرأ كل قناة الحقيقة نفسها.',
              owner: 'أصحاب العرض التجاري والكتالوج',
            },
            {
              id: 'checkout',
              label: 'الدفع والسداد',
              description:
                'تنتج السلة والتسعير وعرض الضريبة وتكاملات الدفع الموثوقة طلباً واحداً مسجَّلاً قابلاً للمطابقة.',
              owner: 'أصحاب المدفوعات والمالية',
            },
            {
              id: 'operations',
              label: 'المخزون وإدارة الطلبات ونقاط البيع',
              description:
                'يُبقي المخزون وإدارة الطلبات ونقطة البيع في المتجر التوفر والتجهيز متسقاً بين الويب والسوق والمتجر.',
              owner: 'أصحاب التشغيل والمتجر',
            },
            {
              id: 'omnichannel',
              label: 'التكاملات متعددة القنوات والأسواق',
              description:
                'تكاملات محدودة النطاق مع الأسواق والناقلين وأنظمة تخطيط الموارد وإدارة العملاء تربط المنصة دون فقدان سجلها الواحد المطابَق.',
              owner: 'أصحاب التكامل والبيانات',
            },
          ],
        },
        {
          id: 'ecommerce-platform-system',
          type: 'system-blueprint',
          variant: 'service-line',
          answers: ['buildable-system'],
          eyebrow: 'نطاق قابل للبناء',
          title: 'منصة التجارة مجموعة مترابطة من الطبقات ذات الملكية الواضحة.',
          intro:
            'يمكن أن يبدأ النطاق بمسار واحد—كتالوج أو دفع أو تجهيز—لكن كل طبقة تحتاج مدخلات معتمدة وتسليماً محدداً ونتيجة يستطيع المشغل مطابقتها ومراجعتها.',
          layers: [
            {
              id: 'storefront-layer',
              label: 'طبقة المتجر والتجربة',
              description:
                'متاجر ويب وتطبيقات ويب تقدمية ثنائية اللغة تعرض الكتالوج والبحث وتفاصيل المنتج والدفع بمحتوى معتمد وواجهات سريعة سهلة الوصول.',
              inputs: ['محتوى منتج معتمد', 'نظام العلامة والتصميم', 'نصوص موطنة'],
              handoff: 'نية متسوق مسجلة ومتحقَّقة',
              outcome: 'متسوق يستطيع إيجاد المنتج والوثوق به وشراءه',
            },
            {
              id: 'commerce-core',
              label: 'طبقة الكتالوج والسلة والدفع',
              description:
                'تُسجِّل معلومات المنتج والتسعير والسلة وعرض الضريبة وتكاملات الدفع كل طلب مرة واحدة مقابل مصدر حقيقة قابل للمطابقة.',
              inputs: ['كتالوج وأسعار معتمدة من المشغل', 'قواعد الضريبة والعملة', 'مزودو دفع موثوقون'],
              handoff: 'سجل طلب مرجعي واحد',
              outcome: 'طلبات وإيرادات يستطيع المراجع مطابقتها',
            },
            {
              id: 'operations-core',
              label: 'طبقة المخزون وإدارة الطلبات ونقاط البيع',
              description:
                'يُبقي المخزون وإدارة الطلبات والتجهيز ونقطة البيع في المتجر التوفر والحالة متسقاً عبر كل قناة.',
              inputs: ['مصادر المخزون والمستودع', 'قواعد التجهيز والناقل', 'نموذج المتجر ونقطة البيع'],
              handoff: 'حالة طلب ومخزون متسقة قابلة للتتبع',
              outcome: 'توفر وتجهيز يثق بهما فريق التشغيل',
            },
            {
              id: 'integration-layer',
              label: 'طبقة القنوات المتعددة والتكامل والبيانات',
              description:
                'تكاملات محدودة مع الأسواق والناقلين وتخطيط الموارد وإدارة العملاء إضافة إلى التحليلات تُبقي المنصة مترابطة وقابلة للمراقبة ضمن الحدود المتفق عليها.',
              inputs: ['واجهات مزودين معتمدة', 'قواعد ملكية البيانات والوصول', 'نموذج التحليلات والأحداث'],
              handoff: 'تبادل بيانات محدود ومراقَب',
              outcome: 'منصة مترابطة تبقى ضمن ضوابطها',
            },
          ],
        },
        {
          id: 'ecommerce-service-paths',
          type: 'service-bridge',
          variant: 'capability-stack',
          answers: [],
          eyebrow: 'مسارات التنفيذ',
          title: 'اختاروا مسارات البناء التي تجمع المنصة.',
          intro:
            'يتحدد المزيج النهائي بحسب المسار الذي تعطونه الأولوية، والأنظمة والأسواق والمزودين الذين تستخدمونهم أصلاً، وأصغر تسليم متكامل قابل للمطابقة يستحق البناء أولاً.',
          serviceIds: [
            'ecommerce-development',
            'business-systems-development',
            'website-development',
            'social-media-marketing',
          ],
          serviceAnchors: [
            {
              serviceId: 'ecommerce-development',
              label: 'المتاجر والدفع والسداد',
            },
            {
              serviceId: 'business-systems-development',
              label: 'أنظمة المخزون ونقاط البيع وإدارة الطلبات',
            },
            {
              serviceId: 'website-development',
              label: 'مواقع العلامة والحملات وكتالوج ثنائي اللغة',
            },
            {
              serviceId: 'social-media-marketing',
              label: 'التجارة الاجتماعية وحملات الإطلاق والاحتفاظ بالعملاء',
            },
          ],
          relatedIndustryIds: ['retail', 'logistics-supply-chain'],
          industryAnchors: [
            {
              industryId: 'retail',
              label: 'استكشفوا أنظمة الفروع والمخزون والمتاجر',
            },
            {
              industryId: 'logistics-supply-chain',
              label: 'استكشفوا أنظمة التجهيز وسلسلة التوريد',
            },
          ],
        },
        {
          id: 'ecommerce-commerce-boundaries',
          type: 'constraints',
          variant: 'boundary-map',
          answers: ['evidence-and-constraints'],
          eyebrow: 'الأدلة والمسؤوليات',
          title: 'يجعل التصميم حدود التجارة صريحة.',
          intro:
            'تصف الصفحة نموذج هندسة مقترحاً، لا متجراً ولا قائمة أسعار ولا ضماناً للتوفر. يبقى الكتالوج والتسعير والضريبة والمخزون ووصول المزودين مملوكاً للمشغل وأنظمته المخوّلة.',
          items: [
            {
              id: 'data-ownership',
              label: 'الكتالوج والسعر والمخزون مملوكة للمشغل',
              responsibility:
                'تعرض المنصة وتطابق بيانات المنتج والتسعير وعرض الضريبة والتوفر، لكن المشغل يملك المصدر المعتمد الذي تأتي منه هذه القيم.',
              dependency: 'مالك بيانات محدد ومصدر حقيقة معتمد للكتالوج والسعر والمخزون.',
              recovery: 'إبقاء القائمة المتأثرة خلف بديل معتمد حتى يتأكد مصدرها.',
            },
            {
              id: 'payment-dependencies',
              label: 'اعتماديات الدفع والشحن',
              responsibility:
                'تعتمد بوابات الدفع والناقلون واتصالات الأسواق على وصول موثوق للمزود وعقود وتوفر في السوق.',
              dependency: 'توثيق مؤكد للبوابة والناقل والسوق وبيانات اعتماد وموافقة السوق.',
              recovery: 'إبقاء الخطوة خلف مسار يدوي أو تجريبي حتى يتأكد وصول المزود.',
            },
            {
              id: 'exception-ownership',
              label: 'استثناءات الإرجاع والمخزون تحتاج مالكين',
              responsibility:
                'تتطلب المبيعات الزائدة والاستردادات والإرجاعات والشحنات المقسّمة حالات مرئية ومالكين وتواصلاً مع العميل يُحدَّد قبل الإطلاق.',
              dependency: 'أنواع استثناءات ومالكون وقواعد تواصل مع العميل معتمدة.',
              recovery: 'توجيه الحالات غير الواضحة إلى قائمة محددة بدلاً من فشل صامت عند الدفع أو التجهيز.',
            },
            {
              id: 'compliance-boundary',
              label: 'أمان الدفع مدعوم لا معتمَد',
              responsibility:
                'يمكن للمنصة تنفيذ ضوابط معتمدة حول بيانات البطاقات والعملاء، لكن نطاق PCI والاعتماد والترخيص يبقى لدى المشغل ومزوديه.',
              dependency: 'مالك امتثال محدد ومتطلبات الدفع والبيانات المعتمدة.',
              recovery: 'إيقاف المسار المتأثر وإعادة القرار إلى مالك الامتثال قبل الإطلاق.',
            },
          ],
        },
        {
          id: 'ecommerce-regional-delivery',
          type: 'regional-fit',
          variant: 'bilingual-operations',
          answers: ['regional-delivery'],
          eyebrow: 'مصمم لتجارة ثنائية اللغة',
          title: 'العربية والإنجليزية لغتا تسوّق، وليستا خطوة ترجمة أخيرة.',
          intro:
            'تُصاغ أسماء المنتجات والخيارات وعبارات البحث وسياق السعر ونصوص الدفع لكل لغة، مع بقاء بنية كتالوج وطلبات واحدة قابلة للمطابقة ثابتة.',
          items: [
            {
              id: 'bilingual-catalog',
              label: 'كتالوج ثنائي اللغة أصيل',
              description:
                'تُكتب أسماء المنتجات والخيارات والوسائط وعبارات البحث وتُراجع بشكل مستقل بالعربية والإنجليزية ليجد المتسوق المنتج نفسه ويثق به بأي لغة.',
            },
            {
              id: 'localized-checkout',
              label: 'دفع وإفصاحات موطنة',
              description:
                'تبقى الأسعار وعرض الضريبة والشحن والإفصاحات المطلوبة دقيقة ومقروءة في السياقين العربي والإنجليزي، تحت مالك مراجعة محدد.',
            },
            {
              id: 'market-dependencies',
              label: 'اعتماديات حسب السوق',
              description:
                'تُراجَع بوابات الدفع والناقلون والعملة والأسواق والمتطلبات التنظيمية لكل سوق قبل تثبيت النطاق.',
            },
          ],
        },
        {
          id: 'ecommerce-faq',
          type: 'faq',
          variant: 'editorial-list',
          answers: [],
          eyebrow: 'أسئلة القرار',
          title: 'ما الذي تحتاج فرق التجارة والتجزئة إلى حسمه أولاً؟',
          intro:
            'النطاق الأول المفيد هو مسار مكتمل قابل للمطابقة—من الكتالوج إلى الدفع، أو من الدفع إلى التجهيز—مع تحديد أصحاب الكتالوج والدفع والتشغيل.',
          items: [
            {
              id: 'platform-choice',
              question: 'هل تبنون حلاً مخصصاً أم على Shopify أو Medusa أو منصة headless؟',
              answer:
                'كلاهما. نهندس منصات تجارة مخصصة ونبني على منصات headless ومستضافة مثل Shopify أو Medusa أو إعداد مركّب أو نوسّعها. نختار بحسب تعقيد الكتالوج والتكاملات والأنظمة التي تشغّلونها أصلاً، ثم نُبقي مصدر حقيقة واحداً مطابَقاً مهما كان المسار.',
            },
            {
              id: 'existing-systems',
              question: 'هل يمكن ربط ذلك بأنظمة تخطيط الموارد أو نقاط البيع أو الأسواق الحالية؟',
              answer:
                'يُصمَّم حول الواجهات والحقول والوصول الذي تؤكده أنظمتكم ومزودوكم. نرسم البيانات المطلوبة والأنظمة المسؤولة ومصدر المطابقة والمسار اليدوي أو التجريبي البديل قبل الالتزام بتكامل مباشر مع نظام موارد أو نقطة بيع أو ناقل أو سوق.',
            },
            {
              id: 'bilingual-catalog',
              question: 'كيف يُنظَّم كتالوج ثنائي اللغة؟',
              answer:
                'تُصاغ أسماء المنتجات والخيارات وسياق السعر والوسائط وعبارات البحث وتُراجع بشكل مستقل بالعربية والإنجليزية فوق بنية كتالوج مشتركة، ليكون المنتج نفسه قابلاً للإيجاد ودقيقاً بأي لغة.',
            },
            {
              id: 'payments-security',
              question: 'كيف تُعالَج المدفوعات وبيانات البطاقات؟',
              answer:
                'تستخدم تكاملات الدفع مزودين موثوقين خلف مساراتهم المعتمدة، مع تشفير وضوابط وصول مهندَسة في الأساس. يبقى نطاق PCI والاعتماد والترخيص لدى مشغّلكم ومزودي الدفع—ويجعل البناء تلك المتطلبات صريحة وقابلة للتتبع.',
            },
            {
              id: 'migration',
              question: 'هل يمكن ترحيل متجرنا الحالي دون فقدان الطلبات أو تحسين محركات البحث؟',
              answer:
                'نعم. نخطط لترحيل الكتالوج والعملاء والطلبات مع خطوة مطابقة، ونحافظ على الروابط بإعادة توجيه، ونُبقي النظامين القديم والجديد قابلين للتحقق من بعضهما قبل التبديل، حتى لا يُفقد السجل أو قيمة البحث.',
            },
            {
              id: 'starting-point',
              question: 'من أين يبدأ فريق التجارة؟',
              answer:
                'ابدؤوا من المسار الذي يفقد فيه العميل أو الفريق أكثر سياق—البحث والكتالوج أو استعادة الدفع أو حالة التجهيز أو الشراء المتكرر—ثم ارسموا أصغر نطاق نظام قابل للمطابقة يدعمه من طرف إلى طرف قبل التوسع.',
            },
          ],
        },
        {
          id: 'ecommerce-consultation',
          type: 'closing-cta',
          variant: 'framed-close',
          answers: ['decision-close'],
          eyebrow: 'اختاروا المسار الأول',
          title: 'اجعلوا مساراً واحداً قابلاً للمطابقة نقطة البداية.',
          intro:
            'أحضروا مساراً تجارياً واحداً، والفرق والأسواق والمزودين الذين يملكونه، والأنظمة التي يمر بها، وسنحوّل هذا السياق إلى موجز نظام تجارة محدد النطاق قابل للبناء.',
          decisionCopy:
            'ابدؤوا بمسار مكتمل واحد قابل للمطابقة—من الكتالوج إلى الدفع، أو من الدفع إلى التجهيز—لا بقائمة خصائص منفصلة.',
          primary: {
            label: 'لنرسم مسار الكتالوج إلى الدفع',
            href: '/api/whatsapp?locale=ar',
          },
          secondary: {
            label: 'استكشفوا تطوير التجارة والمتاجر',
            serviceId: 'ecommerce-development',
          },
        },
      ],
    },
  },
} as const satisfies IndustryPageDefinition
