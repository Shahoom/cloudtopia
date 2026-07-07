// ─────────────────────────────────────────────────────────────────────────────
// CloudTopia Solution Finder — Recommendation Templates
// Add new templates here. The engine picks the highest-scoring match.
// ─────────────────────────────────────────────────────────────────────────────

export type RecommendationTemplate = {
  /** Unique id for this template */
  id: string
  /**
   * Match rules. Each provided field contributes to the score.
   * Priority: industry + projectType + goal (100) > projectType + goal (70)
   *         > projectType alone (40) > fallback (10)
   */
  match: {
    industry?: string | string[]
    projectType?: string | string[]
    goal?: string | string[]
  }
  /** Higher = preferred when multiple templates match equally */
  priority: number
  package: { en: string; ar: string }
  packageSubtitle: { en: string; ar: string }
  personalizedIntro: { en: string; ar: string }
  recommendedServices: { en: string[]; ar: string[] }
  keyFeatures: { en: string[]; ar: string[] }
  techStack: string[]
  /** Used in result screen and WhatsApp message */
  deliveryApproach: { en: string; ar: string }
  route: string
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

export const RECOMMENDATION_TEMPLATES: RecommendationTemplate[] = [

  // ── 1. Real Estate Website + Leads ────────────────────────────────────────
  {
    id: 'real-estate-website-leads',
    match: { industry: 'real-estate', projectType: ['business-website', 'landing-page'], goal: 'get-more-leads' },
    priority: 100,
    package: { en: 'Real Estate Digital Presence + CRM Starter', ar: 'حضور رقمي عقاري + CRM مبدئي' },
    packageSubtitle: { en: 'Website · Lead Capture · CRM Follow-up', ar: 'موقع · استقبال العملاء · متابعة CRM' },
    personalizedIntro: {
      en: 'Because you selected Real Estate with a focus on leads, CloudTopia recommends a website that showcases properties clearly, captures buyer and renter inquiries via WhatsApp, and connects those leads to a simple CRM follow-up flow.',
      ar: 'بما أنك اخترت قطاع العقارات مع التركيز على زيادة العملاء المحتملين، نوصي بموقع يعرض العقارات بوضوح، يستقبل استفسارات المشترين والمستأجرين عبر واتساب، ويربطهم بنظام متابعة CRM بسيط.',
    },
    recommendedServices: {
      en: ['Website Design & Development', 'Property Listing Pages', 'WhatsApp Lead Capture', 'CRM Starter Setup', 'Google Maps Integration', 'SEO Architecture'],
      ar: ['تصميم وتطوير موقع', 'صفحات عرض العقارات', 'استقبال عملاء عبر واتساب', 'إعداد CRM مبدئي', 'تكامل خرائط Google', 'بنية SEO'],
    },
    keyFeatures: {
      en: ['Property listing & detail pages', 'WhatsApp inquiry buttons', 'Lead capture forms', 'CRM pipeline for agent follow-ups', 'Interactive map integration', 'Mobile-first responsive layout'],
      ar: ['صفحات عرض العقارات وتفاصيلها', 'أزرار استفسار واتساب', 'نماذج استقبال العملاء', 'خط متابعة CRM للوكلاء', 'خرائط تفاعلية', 'تصميم متجاوب للموبايل'],
    },
    techStack: ['Next.js', 'Payload CMS', 'Tailwind CSS', 'Supabase', 'Google Maps API', 'Vercel'],
    deliveryApproach: {
      en: 'Build the website and lead capture flow first, then connect the CRM and agent dashboard.',
      ar: 'نبدأ بالموقع ومسار استقبال العملاء، ثم نربط نظام CRM ولوحة الوكلاء.',
    },
    route: '/services/website-development',
  },

  // ── 2. Real Estate + CRM System ───────────────────────────────────────────
  {
    id: 'real-estate-crm',
    match: { industry: 'real-estate', projectType: 'crm-system' },
    priority: 95,
    package: { en: 'Real Estate CRM Platform', ar: 'منصة CRM العقارية' },
    packageSubtitle: { en: 'Leads · Pipeline · Agent Dashboard', ar: 'العملاء · خط المبيعات · لوحة الوكلاء' },
    personalizedIntro: {
      en: 'For real estate businesses, a dedicated CRM means every lead from WhatsApp, website, or referrals is tracked, assigned to an agent, and followed up automatically — nothing falls through the cracks.',
      ar: 'بالنسبة للشركات العقارية، يعني CRM مخصص أن كل عميل محتمل من واتساب أو الموقع أو الإحالات يُتتبع ويُسند لوكيل ويُتابع تلقائياً — لا يضيع أي عميل.',
    },
    recommendedServices: {
      en: ['CRM Development', 'Lead Pipeline Management', 'Agent Roles & Dashboard', 'WhatsApp Integration', 'Client History & Notes', 'Sales Reports'],
      ar: ['تطوير نظام CRM', 'إدارة خط العملاء المحتملين', 'أدوار الوكلاء ولوحة التحكم', 'تكامل واتساب', 'سجل العملاء والملاحظات', 'تقارير المبيعات'],
    },
    keyFeatures: {
      en: ['Lead intake from website & WhatsApp', 'Sales pipeline stages', 'Agent task assignments', 'Automated follow-up reminders', 'Client activity history', 'Commission & performance reports'],
      ar: ['استقبال العملاء من الموقع وواتساب', 'مراحل خط المبيعات', 'توزيع المهام على الوكلاء', 'تذكيرات متابعة آلية', 'سجل نشاط العملاء', 'تقارير العمولة والأداء'],
    },
    techStack: ['Next.js', 'Payload CMS', 'Supabase', 'PostgreSQL', 'WhatsApp Business API'],
    deliveryApproach: {
      en: 'Start with core lead management, then expand to automation and reporting.',
      ar: 'نبدأ بإدارة العملاء المحتملين الأساسية، ثم نوسع إلى الأتمتة والتقارير.',
    },
    route: '/web-applications',
  },

  // ── 3. Healthcare Website ─────────────────────────────────────────────────
  {
    id: 'healthcare-website',
    match: { industry: 'healthcare', projectType: ['business-website', 'landing-page'] },
    priority: 95,
    package: { en: 'Clinic Digital Presence Package', ar: 'باقة الحضور الرقمي للعيادات' },
    packageSubtitle: { en: 'Trust · Bookings · Patient Inquiries', ar: 'ثقة · حجوزات · استفسارات المرضى' },
    personalizedIntro: {
      en: 'Because you selected Healthcare & Clinics, your solution should focus on building trust, easy appointment booking, clear service presentation, and WhatsApp inquiry handling — all in a clean, professional design.',
      ar: 'بما أنك اخترت العيادات والرعاية الصحية، يجب أن يركز الحل على بناء الثقة، حجز مواعيد سهل، عرض خدمات واضح، وإدارة استفسارات واتساب — بتصميم نظيف واحترافي.',
    },
    recommendedServices: {
      en: ['Clinic Website Design', 'Appointment Booking System', 'Doctor/Service Pages', 'WhatsApp Inquiry Integration', 'Patient Inquiry Forms', 'Mobile-First Design'],
      ar: ['تصميم موقع العيادة', 'نظام حجز مواعيد', 'صفحات الأطباء والخدمات', 'تكامل استفسارات واتساب', 'نماذج استفسار المرضى', 'تصميم أولوية الموبايل'],
    },
    keyFeatures: {
      en: ['Trust-focused homepage', 'Services & doctors pages', 'Appointment booking form', 'WhatsApp inquiry button', 'Patient FAQ section', 'SEO for local clinic searches'],
      ar: ['صفحة رئيسية تبني الثقة', 'صفحات الخدمات والأطباء', 'نموذج حجز مواعيد', 'زر استفسار واتساب', 'قسم أسئلة شائعة للمرضى', 'SEO لبحثات العيادات المحلية'],
    },
    techStack: ['Next.js', 'Payload CMS', 'Tailwind CSS', 'Vercel'],
    deliveryApproach: {
      en: 'Launch the clinic website with booking and inquiry features, then add patient automation if needed.',
      ar: 'نطلق موقع العيادة مع ميزات الحجز والاستفسار، ثم نضيف أتمتة المرضى عند الحاجة.',
    },
    route: '/services/website-development',
  },

  // ── 3b. Healthcare Mobile App / Patient Portal ───────────────────────────
  {
    id: 'healthcare-mobile-app',
    match: { industry: 'healthcare', projectType: 'mobile-app' },
    priority: 98,
    package: { en: 'Clinic Patient App Package', ar: 'باقة تطبيق المرضى للعيادات' },
    packageSubtitle: { en: 'Bookings · Reminders · Patient Flow · Admin', ar: 'حجوزات · تذكيرات · رحلة المريض · إدارة' },
    personalizedIntro: {
      en: 'Because you selected Healthcare & Clinics with a mobile app, your recommendation should focus on appointment booking, patient communication, reminders, doctor or service profiles, and a secure admin flow for clinic staff.',
      ar: 'بما أنك اخترت العيادات والرعاية الصحية مع تطبيق موبايل، يجب أن يركز الحل على حجز المواعيد، تواصل المرضى، التذكيرات، ملفات الأطباء أو الخدمات، ومسار إدارة آمن لفريق العيادة.',
    },
    recommendedServices: {
      en: ['Patient Mobile App', 'Appointment Booking Flow', 'Clinic Admin Dashboard', 'Push Notifications', 'WhatsApp Follow-up', 'Patient Inquiry Management'],
      ar: ['تطبيق موبايل للمرضى', 'مسار حجز المواعيد', 'لوحة إدارة العيادة', 'إشعارات فورية', 'متابعة واتساب', 'إدارة استفسارات المرضى'],
    },
    keyFeatures: {
      en: ['Patient onboarding', 'Appointment booking and rescheduling', 'Doctor and service profiles', 'Reminder notifications', 'Inquiry and follow-up tracking', 'Clinic staff dashboard'],
      ar: ['تسجيل المرضى', 'حجز وإعادة جدولة المواعيد', 'ملفات الأطباء والخدمات', 'إشعارات التذكير', 'تتبع الاستفسارات والمتابعة', 'لوحة لفريق العيادة'],
    },
    techStack: ['React Native / Flutter', 'Next.js', 'Payload CMS', 'PostgreSQL / Supabase', 'WhatsApp Business API'],
    deliveryApproach: {
      en: 'Start with booking, patient profiles, and clinic admin tools, then add reminders, automation, and reporting once the core flow is stable.',
      ar: 'نبدأ بالحجوزات وملفات المرضى وأدوات إدارة العيادة، ثم نضيف التذكيرات والأتمتة والتقارير بعد استقرار المسار الأساسي.',
    },
    route: '/web-applications',
  },

  // ── 4. Restaurant Digital Menu + Ordering ────────────────────────────────
  {
    id: 'restaurant-system',
    match: { industry: 'restaurants', projectType: ['business-system', 'web-application', 'business-website'] },
    priority: 95,
    package: { en: 'Restaurant Ordering & Digital Menu System', ar: 'نظام الطلبات والمنيو الرقمي للمطاعم' },
    packageSubtitle: { en: 'Menu · Orders · Reservations · Admin', ar: 'منيو · طلبات · حجوزات · لوحة إدارة' },
    personalizedIntro: {
      en: 'Because you selected Restaurants & Cafes, we recommend a system that makes your menu, orders, reservations, and customer communication seamless — including WhatsApp ordering and a live admin dashboard.',
      ar: 'بما أنك اخترت المطاعم والمقاهي، نوصي بنظام يجعل المنيو والطلبات والحجوزات والتواصل مع العملاء سلسًا — بما في ذلك الطلب عبر واتساب ولوحة إدارة مباشرة.',
    },
    recommendedServices: {
      en: ['Digital Menu Development', 'WhatsApp Ordering System', 'Table Reservation System', 'Admin Order Dashboard', 'Offers & Promotions Section', 'Branch Information Pages'],
      ar: ['تطوير منيو رقمي', 'نظام طلبات واتساب', 'نظام حجز الطاولات', 'لوحة إدارة الطلبات', 'قسم العروض والتخفيضات', 'صفحات معلومات الفروع'],
    },
    keyFeatures: {
      en: ['QR code digital menu', 'WhatsApp order integration', 'Table reservation system', 'Live order status dashboard', 'Special offers management', 'Instagram-friendly landing page'],
      ar: ['منيو رقمي بـ QR Code', 'تكامل الطلبات عبر واتساب', 'نظام حجز الطاولات', 'لوحة متابعة الطلبات المباشرة', 'إدارة العروض الخاصة', 'صفحة هبوط تناسب انستقرام'],
    },
    techStack: ['Next.js', 'Node.js', 'Supabase', 'WhatsApp Business API', 'Vercel'],
    deliveryApproach: {
      en: 'Start with the digital menu and WhatsApp ordering, then add reservations and admin dashboard.',
      ar: 'نبدأ بالمنيو الرقمي والطلبات عبر واتساب، ثم نضيف الحجوزات ولوحة الإدارة.',
    },
    route: '/web-applications',
  },

  // ── 5. E-commerce Store ───────────────────────────────────────────────────
  {
    id: 'ecommerce-store',
    match: { industry: 'ecommerce', projectType: ['business-website', 'web-application', 'business-system'], goal: 'sell-online' },
    priority: 100,
    package: { en: 'E-commerce Platform Package', ar: 'باقة منصة التجارة الإلكترونية' },
    packageSubtitle: { en: 'Catalog · Orders · Inventory · Customers', ar: 'كتالوج · طلبات · مخزون · عملاء' },
    personalizedIntro: {
      en: 'Because you selected E-commerce with a goal to sell online, your solution should include a product catalog, a seamless checkout or WhatsApp ordering flow, inventory visibility, and a customer management dashboard.',
      ar: 'بما أنك اخترت التجارة الإلكترونية بهدف البيع عبر الإنترنت، يجب أن يشمل الحل كتالوج منتجات، مسار شراء سلس أو طلب عبر واتساب، متابعة المخزون، ولوحة إدارة العملاء.',
    },
    recommendedServices: {
      en: ['Product Catalog & Store', 'Cart & Checkout or WhatsApp Orders', 'Inventory Management', 'Order Dashboard', 'Customer Profiles', 'Payment Integration'],
      ar: ['كتالوج المنتجات والمتجر', 'سلة شراء أو طلبات واتساب', 'إدارة المخزون', 'لوحة الطلبات', 'ملفات العملاء', 'تكامل الدفع'],
    },
    keyFeatures: {
      en: ['Product pages with filters & search', 'Cart & checkout flow', 'WhatsApp order option', 'Inventory tracking', 'Customer order history', 'Analytics dashboard'],
      ar: ['صفحات المنتجات مع الفلاتر والبحث', 'سلة وعملية الشراء', 'خيار الطلب عبر واتساب', 'تتبع المخزون', 'سجل طلبات العميل', 'لوحة تحليلات'],
    },
    techStack: ['Next.js', 'Payload CMS', 'Supabase', 'Stripe / Payment Gateway', 'Vercel'],
    deliveryApproach: {
      en: 'Launch catalog and ordering first, then add inventory management and customer analytics.',
      ar: 'نطلق الكتالوج والطلبات أولاً، ثم نضيف إدارة المخزون وتحليلات العملاء.',
    },
    route: '/web-applications',
  },

  // ── 6. E-commerce Operations System ──────────────────────────────────────
  {
    id: 'ecommerce-operations',
    match: { industry: 'ecommerce', projectType: 'business-system', goal: 'organize-operations' },
    priority: 98,
    package: { en: 'E-commerce Operations System', ar: 'نظام عمليات التجارة الإلكترونية' },
    packageSubtitle: { en: 'Products · Inventory · Orders · Reports', ar: 'منتجات · مخزون · طلبات · تقارير' },
    personalizedIntro: {
      en: 'For an e-commerce business focused on operations, your priority is structured inventory, clean order management, and data visibility — so your team always knows what is in stock, what is ordered, and what needs attention.',
      ar: 'لشركة تجارة إلكترونية تركز على العمليات، أولويتك هي مخزون منظم، إدارة طلبات واضحة، ورؤية كاملة للبيانات — حتى يعرف فريقك دائماً ما هو متوفر، وما تم طلبه، وما يحتاج اهتماماً.',
    },
    recommendedServices: {
      en: ['Inventory Management System', 'Order & Returns Management', 'Customer Management', 'Supplier Module', 'Reports & Analytics Dashboard', 'Role-Based Access'],
      ar: ['نظام إدارة المخزون', 'إدارة الطلبات والإرجاعات', 'إدارة العملاء', 'نظام الموردين', 'لوحة التقارير والتحليلات', 'صلاحيات الأدوار'],
    },
    keyFeatures: {
      en: ['Stock levels & alerts', 'Order status tracking', 'Return & refund management', 'Supplier purchase orders', 'Sales & revenue reports', 'Multi-role team access'],
      ar: ['مستويات المخزون والتنبيهات', 'تتبع حالة الطلبات', 'إدارة الإرجاع والاسترداد', 'طلبات شراء الموردين', 'تقارير المبيعات والإيرادات', 'صلاحيات الفريق المتعدد'],
    },
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Supabase', 'Vercel'],
    deliveryApproach: {
      en: 'Build core inventory and order system first, then add reporting and supplier modules.',
      ar: 'نبني نظام المخزون والطلبات الأساسي أولاً، ثم نضيف التقارير ونظام الموردين.',
    },
    route: '/web-applications',
  },

  // ── 7. Startup MVP Mobile App ─────────────────────────────────────────────
  {
    id: 'startup-mobile-app',
    match: { industry: 'startup', projectType: 'mobile-app', goal: 'launch-product' },
    priority: 100,
    package: { en: 'Startup MVP App Package', ar: 'باقة تطبيق MVP للشركات الناشئة' },
    packageSubtitle: { en: 'Design · Build · Launch · Scale', ar: 'تصميم · بناء · إطلاق · توسع' },
    personalizedIntro: {
      en: 'For a startup launching a mobile app, speed and quality both matter. CloudTopia will help you design a clean MVP, build it on a scalable architecture, and launch it on iOS and Android — ready to onboard users from day one.',
      ar: 'لشركة ناشئة تطلق تطبيقاً للموبايل، السرعة والجودة كلاهما مهمان. ستساعدك CloudTopia على تصميم MVP نظيف، بناؤه على بنية قابلة للتوسع، وإطلاقه على iOS وAndroid — جاهزاً لاستقبال المستخدمين من اليوم الأول.',
    },
    recommendedServices: {
      en: ['App UI/UX Design', 'iOS & Android Development', 'Backend API', 'Admin Dashboard', 'Push Notifications', 'Cloud Deployment & CI/CD'],
      ar: ['تصميم UI/UX للتطبيق', 'تطوير iOS وAndroid', 'API خلفي', 'لوحة إدارة', 'إشعارات فورية', 'نشر سحابي وCI/CD'],
    },
    keyFeatures: {
      en: ['Cross-platform iOS & Android', 'Clean onboarding flow', 'User authentication', 'Admin control panel', 'Push notifications', 'App Store & Play Store submission'],
      ar: ['تطبيق متعدد المنصات iOS وAndroid', 'تدفق تسجيل سلس', 'مصادقة المستخدمين', 'لوحة إدارة', 'إشعارات فورية', 'نشر على App Store وPlay Store'],
    },
    techStack: ['React Native / Flutter', 'Node.js / Laravel', 'PostgreSQL / Supabase', 'Cloud Hosting'],
    deliveryApproach: {
      en: 'Design MVP screens, then build phase by phase — core features first, then secondary screens and admin.',
      ar: 'نصمم شاشات MVP، ثم نبني على مراحل — الميزات الأساسية أولاً، ثم الشاشات الثانوية ولوحة الإدارة.',
    },
    route: '/web-applications',
  },

  // ── 8. Professional Services CRM ─────────────────────────────────────────
  {
    id: 'prof-services-crm',
    match: { industry: 'professional-services', projectType: 'crm-system', goal: 'manage-clients' },
    priority: 100,
    package: { en: 'Professional Services CRM', ar: 'نظام CRM للخدمات المهنية' },
    packageSubtitle: { en: 'Clients · Pipeline · Follow-up · Reports', ar: 'عملاء · خط مبيعات · متابعة · تقارير' },
    personalizedIntro: {
      en: 'For professional service firms — consultants, agencies, or law firms — a CRM helps you track every client relationship, never miss a follow-up, and see exactly where each deal stands in your pipeline.',
      ar: 'لشركات الخدمات المهنية — استشارات، وكالات، أو مكاتب محاماة — يساعدك نظام CRM على تتبع كل علاقة عميل، عدم فوات أي متابعة، ورؤية موقع كل صفقة في خط المبيعات بدقة.',
    },
    recommendedServices: {
      en: ['CRM Development', 'Lead & Deal Pipeline', 'Client Records & History', 'Follow-up Reminders', 'WhatsApp Integration', 'Reports & Analytics'],
      ar: ['تطوير نظام CRM', 'خط العملاء والصفقات', 'سجلات وتاريخ العملاء', 'تذكيرات المتابعة', 'تكامل واتساب', 'تقارير وتحليلات'],
    },
    keyFeatures: {
      en: ['Lead intake & qualification', 'Sales pipeline stages', 'Client notes & documents', 'Automated follow-up reminders', 'WhatsApp & email integration', 'Team performance reports'],
      ar: ['استقبال وتأهيل العملاء المحتملين', 'مراحل خط المبيعات', 'ملاحظات ووثائق العميل', 'تذكيرات متابعة آلية', 'تكامل واتساب والبريد الإلكتروني', 'تقارير أداء الفريق'],
    },
    techStack: ['Next.js', 'Payload CMS', 'Supabase', 'PostgreSQL', 'WhatsApp API'],
    deliveryApproach: {
      en: 'Build the core CRM pipeline first, then add integrations and reporting.',
      ar: 'نبني خط CRM الأساسي أولاً، ثم نضيف التكاملات والتقارير.',
    },
    route: '/web-applications',
  },

  // ── 9. AI Workflow Automation ─────────────────────────────────────────────
  {
    id: 'ai-automation',
    match: { projectType: 'ai-automation' },
    priority: 80,
    package: { en: 'AI Automation Package', ar: 'باقة أتمتة الذكاء الاصطناعي' },
    packageSubtitle: { en: 'AI · Chatbot · Workflows · Reports', ar: 'ذكاء اصطناعي · شات بوت · سير عمل · تقارير' },
    personalizedIntro: {
      en: 'CloudTopia will help you integrate AI into your business — whether that is a customer support chatbot, an AI assistant for your team, automated reports, or intelligent workflows that save hours every day.',
      ar: 'ستساعدك CloudTopia على دمج الذكاء الاصطناعي في عملك — سواء كان ذلك شات بوت لدعم العملاء، أو مساعد ذكاء اصطناعي لفريقك، أو تقارير آلية، أو سير عمل ذكي يوفر ساعات يومياً.',
    },
    recommendedServices: {
      en: ['AI Chatbot Development', 'AI Business Assistant', 'Automated Report Generation', 'AI CRM Assistant', 'WhatsApp AI Integration', 'Workflow Automation Engine'],
      ar: ['تطوير شات بوت ذكاء اصطناعي', 'مساعد أعمال ذكاء اصطناعي', 'توليد تقارير آلية', 'مساعد CRM بالذكاء الاصطناعي', 'تكامل واتساب بالذكاء الاصطناعي', 'محرك أتمتة سير العمل'],
    },
    keyFeatures: {
      en: ['24/7 AI customer support', 'Smart lead qualification', 'Automated report generation', 'AI-powered follow-up sequences', 'WhatsApp AI integration', 'Custom workflow triggers'],
      ar: ['دعم عملاء ذكاء اصطناعي 24/7', 'تأهيل ذكي للعملاء المحتملين', 'توليد تقارير آلي', 'متابعة آلية بالذكاء الاصطناعي', 'تكامل واتساب الذكي', 'محفزات سير عمل مخصصة'],
    },
    techStack: ['OpenAI API', 'LangChain', 'Node.js', 'Supabase', 'WhatsApp Business API'],
    deliveryApproach: {
      en: 'Start with one AI workflow — chatbot or report automation — then expand to full integration.',
      ar: 'نبدأ بسير عمل ذكاء اصطناعي واحد — شات بوت أو أتمتة تقارير — ثم نوسع إلى التكامل الكامل.',
    },
    route: '/web-applications',
  },

  // ── 10. Cloud Infrastructure ──────────────────────────────────────────────
  {
    id: 'cloud-infra',
    match: { projectType: 'cloud-infrastructure' },
    priority: 80,
    package: { en: 'Cloud & Infrastructure Package', ar: 'باقة الحلول السحابية والبنية التحتية' },
    packageSubtitle: { en: 'Hosting · Security · Performance · CI/CD', ar: 'استضافة · أمان · أداء · نشر تلقائي' },
    personalizedIntro: {
      en: 'CloudTopia will set up or migrate your infrastructure to a reliable, secure, and high-performance cloud environment — with automated deployment, backups, monitoring, and Cloudflare protection.',
      ar: 'ستقوم CloudTopia بإعداد أو ترحيل بنيتك التحتية إلى بيئة سحابية موثوقة وآمنة وعالية الأداء — مع نشر آلي، نسخ احتياطي، مراقبة، وحماية Cloudflare.',
    },
    recommendedServices: {
      en: ['Cloud Hosting Setup', 'Deployment & CI/CD Pipelines', 'Database Setup & Management', 'Backup & Disaster Recovery', 'Security Hardening', 'Performance Monitoring'],
      ar: ['إعداد الاستضافة السحابية', 'خطوط النشر وCI/CD', 'إعداد وإدارة قواعد البيانات', 'النسخ الاحتياطي والتعافي من الكوارث', 'تشديد الأمان', 'مراقبة الأداء'],
    },
    keyFeatures: {
      en: ['Zero-downtime deployments', 'Automated SSL & backups', 'DDoS protection via Cloudflare', 'Performance monitoring dashboard', 'Scalable infrastructure design', 'Database optimization'],
      ar: ['نشر بدون توقف', 'SSL تلقائي ونسخ احتياطي', 'حماية DDoS عبر Cloudflare', 'لوحة مراقبة الأداء', 'بنية تحتية قابلة للتوسع', 'تحسين قواعد البيانات'],
    },
    techStack: ['Vercel / VPS', 'Docker', 'PostgreSQL', 'Cloudflare', 'CI/CD Pipelines'],
    deliveryApproach: {
      en: 'Audit current setup, then migrate or build cloud infrastructure in a staged rollout.',
      ar: 'نراجع الوضع الحالي، ثم نرحّل أو نبني البنية السحابية في إطلاق مرحلي.',
    },
    route: '/web-applications',
  },

  // ── 11. Digital Growth / Marketing ───────────────────────────────────────
  {
    id: 'digital-growth',
    match: { projectType: 'digital-growth' },
    priority: 80,
    package: { en: 'Digital Growth Package', ar: 'باقة النمو الرقمي' },
    packageSubtitle: { en: 'SEO · Ads · Social · Leads', ar: 'SEO · إعلانات · سوشيال · عملاء' },
    personalizedIntro: {
      en: 'CloudTopia will help you build a complete digital growth system — from SEO and landing pages to social media management and paid ad campaigns — focused on generating real leads for your business.',
      ar: 'ستساعدك CloudTopia على بناء نظام نمو رقمي متكامل — من SEO وصفحات الهبوط إلى إدارة السوشيال ميديا وحملات الإعلانات المدفوعة — مع التركيز على توليد عملاء حقيقيين لعملك.',
    },
    recommendedServices: {
      en: ['SEO Strategy & Execution', 'Landing Page Development', 'Social Media Management', 'Paid Ads Campaigns (Google / Meta)', 'Lead Generation Systems', 'Monthly Analytics Reports'],
      ar: ['استراتيجية وتنفيذ SEO', 'تطوير صفحات الهبوط', 'إدارة وسائل التواصل الاجتماعي', 'حملات إعلانات مدفوعة (Google / Meta)', 'أنظمة توليد العملاء', 'تقارير تحليلات شهرية'],
    },
    keyFeatures: {
      en: ['SEO-structured website pages', 'Conversion-optimized landing pages', 'Social media content calendar', 'Lead magnet design', 'Google & Meta ad campaigns', 'Monthly performance reports'],
      ar: ['صفحات موقع محسّنة لـ SEO', 'صفحات هبوط محسّنة للتحويل', 'تقويم محتوى السوشيال ميديا', 'تصميم مغناطيس العملاء', 'حملات Google وMeta', 'تقارير أداء شهرية'],
    },
    techStack: ['Next.js', 'Google Ads', 'Meta Ads', 'SEO Tools', 'Analytics'],
    deliveryApproach: {
      en: 'Start with SEO foundations and a landing page, then scale to paid campaigns and social management.',
      ar: 'نبدأ بأسس SEO وصفحة هبوط، ثم نتوسع إلى الحملات المدفوعة وإدارة السوشيال ميديا.',
    },
    route: '/web-applications',
  },

  // ── 12. Logistics Operations Platform ────────────────────────────────────
  {
    id: 'logistics-platform',
    match: { industry: 'logistics', projectType: ['web-application', 'business-system'] },
    priority: 95,
    package: { en: 'Logistics Operations Platform', ar: 'منصة عمليات الشحن والتوصيل' },
    packageSubtitle: { en: 'Tracking · Booking · Dashboard · Notifications', ar: 'تتبع · حجز · لوحة تحكم · إشعارات' },
    personalizedIntro: {
      en: 'For logistics and delivery businesses, a dedicated operations platform means your team can manage bookings, track shipments in real time, notify customers automatically, and access business reports from anywhere.',
      ar: 'لشركات الشحن والتوصيل، تعني منصة العمليات المخصصة أن فريقك يمكنه إدارة الحجوزات، تتبع الشحنات في الوقت الفعلي، إشعار العملاء تلقائياً، والوصول إلى تقارير الأعمال من أي مكان.',
    },
    recommendedServices: {
      en: ['Shipment Tracking System', 'Booking & Request Management', 'Customer Notification Automation', 'Admin & Driver Roles', 'Operations Reports', 'API Integrations'],
      ar: ['نظام تتبع الشحنات', 'إدارة الحجوزات والطلبات', 'أتمتة إشعارات العملاء', 'أدوار المشرف والسائق', 'تقارير العمليات', 'تكاملات API'],
    },
    keyFeatures: {
      en: ['Real-time shipment tracking', 'Booking & pickup management', 'Customer SMS/WhatsApp notifications', 'Driver role & assignments', 'Operations dashboard', 'Revenue & route reports'],
      ar: ['تتبع شحنات فوري', 'إدارة الحجز والاستلام', 'إشعارات SMS/واتساب للعملاء', 'دور السائق والتكليفات', 'لوحة عمليات', 'تقارير الإيرادات والمسارات'],
    },
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Supabase', 'Google Maps API', 'Vercel'],
    deliveryApproach: {
      en: 'Build booking and tracking core, then add driver mobile app and reporting in phase 2.',
      ar: 'نبني نواة الحجز والتتبع، ثم نضيف تطبيق موبايل السائق والتقارير في المرحلة الثانية.',
    },
    route: '/web-applications',
  },

  // ── 13. Education Platform / LMS ─────────────────────────────────────────
  {
    id: 'education-platform',
    match: { industry: 'education', projectType: ['web-application', 'business-system', 'mobile-app'] },
    priority: 95,
    package: { en: 'Education Platform Package', ar: 'باقة المنصة التعليمية' },
    packageSubtitle: { en: 'Courses · Students · Teachers · Dashboard', ar: 'دورات · طلاب · معلمون · لوحة تحكم' },
    personalizedIntro: {
      en: 'For education businesses, your platform should make it easy for students to enroll, access content, and track progress — while giving teachers and admins a clear dashboard to manage courses, classes, and payments.',
      ar: 'لمؤسسات التعليم، يجب أن تجعل منصتك التسجيل وتصفح المحتوى وتتبع التقدم سهلاً للطلاب — مع توفير لوحة تحكم واضحة للمعلمين والمشرفين لإدارة الدورات والفصول والمدفوعات.',
    },
    recommendedServices: {
      en: ['LMS / Course Platform Development', 'Student Portal & Dashboard', 'Teacher/Admin Dashboard', 'Enrollment & Payment System', 'Content Management', 'Progress Tracking'],
      ar: ['تطوير منصة دورات / LMS', 'بوابة ولوحة الطلاب', 'لوحة المعلم/المشرف', 'نظام التسجيل والمدفوعات', 'إدارة المحتوى', 'تتبع التقدم'],
    },
    keyFeatures: {
      en: ['Course catalog & enrollment', 'Video content management', 'Student progress tracking', 'Assignment & quiz system', 'Payment integration', 'Teacher & admin roles'],
      ar: ['كتالوج الدورات والتسجيل', 'إدارة محتوى الفيديو', 'تتبع تقدم الطالب', 'نظام الواجبات والاختبارات', 'تكامل الدفع', 'أدوار المعلم والمشرف'],
    },
    techStack: ['Next.js', 'Payload CMS', 'Supabase', 'Stripe', 'Vercel'],
    deliveryApproach: {
      en: 'Build core course management and student portal first, then add quizzes and payment in phase 2.',
      ar: 'نبني إدارة الدورات وبوابة الطلاب أولاً، ثم نضيف الاختبارات والدفع في المرحلة الثانية.',
    },
    route: '/web-applications',
  },

  // ── 14. Professional Services Website (Trust) ────────────────────────────
  {
    id: 'prof-services-website',
    match: { industry: 'professional-services', projectType: ['business-website', 'landing-page'], goal: 'look-professional' },
    priority: 100,
    package: { en: 'Professional Services Digital Presence', ar: 'الحضور الرقمي للخدمات المهنية' },
    packageSubtitle: { en: 'Trust · Services · Leads · Branding', ar: 'ثقة · خدمات · عملاء · هوية بصرية' },
    personalizedIntro: {
      en: 'For professional service firms, your website is your most important sales tool. CloudTopia will build a trust-focused, conversion-optimized website that clearly presents your services, showcases expertise, and drives qualified consultation requests.',
      ar: 'لشركات الخدمات المهنية، موقعك هو أهم أداة مبيعات. ستبني CloudTopia موقعاً يركز على الثقة والتحويل، يعرض خدماتك بوضوح، ويُبرز خبرتك، ويجذب طلبات استشارة مؤهلة.',
    },
    recommendedServices: {
      en: ['Trust-Focused Website Design', 'Service & Team Pages', 'Case Study Section', 'Consultation Booking', 'WhatsApp Lead Capture', 'SEO Architecture'],
      ar: ['تصميم موقع يبني الثقة', 'صفحات الخدمات والفريق', 'قسم الحالات الدراسية', 'حجز استشارة', 'استقبال عملاء عبر واتساب', 'بنية SEO'],
    },
    keyFeatures: {
      en: ['Professional homepage & about section', 'Detailed service pages', 'Case studies / portfolio section', 'Consultation request forms', 'Client testimonials', 'Blog / insights section'],
      ar: ['صفحة رئيسية ومن نحن احترافية', 'صفحات خدمات مفصلة', 'قسم الحالات الدراسية / المعرض', 'نماذج طلب استشارة', 'آراء العملاء', 'مدونة / قسم رؤى'],
    },
    techStack: ['Next.js', 'Payload CMS', 'Tailwind CSS', 'Vercel'],
    deliveryApproach: {
      en: 'Design and launch the website, then add blog and CRM lead connection in phase 2.',
      ar: 'نصمم وننطلق بالموقع، ثم نضيف المدونة وربط CRM في المرحلة الثانية.',
    },
    route: '/services/website-development',
  },

  // ── 15. General Business Website ─────────────────────────────────────────
  {
    id: 'general-website',
    match: { projectType: ['business-website', 'landing-page'] },
    priority: 40,
    package: { en: 'Digital Presence Package', ar: 'باقة الحضور الرقمي' },
    packageSubtitle: { en: 'Website · SEO · Leads · CMS', ar: 'موقع · SEO · عملاء · نظام إدارة محتوى' },
    personalizedIntro: {
      en: 'CloudTopia will build a professional, conversion-focused website tailored to your business — with clean design, SEO architecture, WhatsApp lead capture, and a CMS for easy content updates.',
      ar: 'ستبني CloudTopia موقعاً احترافياً يركز على التحويل ويناسب عملك — بتصميم نظيف، بنية SEO، استقبال عملاء عبر واتساب، ونظام إدارة محتوى لتحديثات سهلة.',
    },
    recommendedServices: {
      en: ['Website Design & Development', 'SEO Architecture', 'WhatsApp Lead Capture', 'CMS Setup', 'Analytics Integration', 'Speed & Mobile Optimization'],
      ar: ['تصميم وتطوير موقع', 'بنية SEO', 'استقبال عملاء عبر واتساب', 'إعداد نظام إدارة المحتوى', 'تكامل التحليلات', 'تحسين السرعة والموبايل'],
    },
    keyFeatures: {
      en: ['Professional homepage', 'Service pages', 'Lead capture forms', 'WhatsApp CTA button', 'Google Analytics', 'Mobile-first responsive design'],
      ar: ['صفحة رئيسية احترافية', 'صفحات الخدمات', 'نماذج استقبال العملاء', 'زر واتساب للتحويل', 'Google Analytics', 'تصميم متجاوب للموبايل'],
    },
    techStack: ['Next.js', 'Payload CMS', 'Tailwind CSS', 'Vercel'],
    deliveryApproach: {
      en: 'Design and build the website in one focused sprint, then iterate based on performance.',
      ar: 'نصمم وننشئ الموقع في سبرينت واحد مركّز، ثم نطوّره بناءً على الأداء.',
    },
    route: '/services/website-development',
  },

  // ── 16. Custom Web Platform (Fallback) ───────────────────────────────────
  {
    id: 'custom-web-platform',
    match: { projectType: 'web-application' },
    priority: 40,
    package: { en: 'Custom Web Platform Package', ar: 'باقة منصة ويب مخصصة' },
    packageSubtitle: { en: 'Platform · Dashboard · API · Cloud', ar: 'منصة · لوحة تحكم · API · سحابة' },
    personalizedIntro: {
      en: 'CloudTopia will design and build a fully custom web application tailored to your exact business workflows — with role-based access, real-time dashboards, API integrations, and cloud hosting.',
      ar: 'ستصمم CloudTopia وتبني تطبيق ويب مخصصاً تماماً لسير عمل عملك — مع صلاحيات مبنية على الأدوار، لوحات تحكم فورية، تكاملات API، واستضافة سحابية.',
    },
    recommendedServices: {
      en: ['Web Application Development', 'Admin Dashboard', 'User Authentication & Roles', 'API Integrations', 'Database Design', 'Cloud Hosting & Deployment'],
      ar: ['تطوير تطبيق ويب', 'لوحة إدارة', 'مصادقة المستخدمين والأدوار', 'تكاملات API', 'تصميم قاعدة بيانات', 'استضافة ونشر سحابي'],
    },
    keyFeatures: {
      en: ['Role-based access control', 'Real-time data dashboards', 'Third-party API integrations', 'Scalable database design', 'Secure authentication', 'Custom business workflows'],
      ar: ['صلاحيات مبنية على الأدوار', 'لوحات بيانات فورية', 'تكاملات API من طرف ثالث', 'تصميم قاعدة بيانات قابلة للتوسع', 'مصادقة آمنة', 'سير عمل أعمال مخصص'],
    },
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Supabase', 'Vercel'],
    deliveryApproach: {
      en: 'Build core platform features first, then expand with integrations and reporting.',
      ar: 'نبني ميزات المنصة الأساسية أولاً، ثم نوسعها بالتكاملات والتقارير.',
    },
    route: '/web-applications',
  },

  // ── 17. CRM (Fallback) ────────────────────────────────────────────────────
  {
    id: 'crm-general',
    match: { projectType: 'crm-system' },
    priority: 40,
    package: { en: 'CloudTopia CRM Package', ar: 'باقة CloudTopia CRM' },
    packageSubtitle: { en: 'Leads · Sales · WhatsApp · Reports', ar: 'عملاء · مبيعات · واتساب · تقارير' },
    personalizedIntro: {
      en: 'CloudTopia will build a dedicated CRM tailored to your team — with lead management, sales pipeline, WhatsApp integration, client history, and business reports accessible from any device.',
      ar: 'ستبني CloudTopia نظام CRM مخصصاً لفريقك — مع إدارة العملاء المحتملين، خط المبيعات، تكامل واتساب، تاريخ العميل، وتقارير الأعمال من أي جهاز.',
    },
    recommendedServices: {
      en: ['CRM Development', 'Lead Pipeline Management', 'WhatsApp Business Integration', 'Client Profiles & History', 'Follow-up Automation', 'Sales Reports'],
      ar: ['تطوير نظام CRM', 'إدارة خط العملاء', 'تكامل واتساب بيزنس', 'ملفات وتاريخ العملاء', 'أتمتة المتابعة', 'تقارير المبيعات'],
    },
    keyFeatures: {
      en: ['Lead intake & pipeline', 'Client history & notes', 'WhatsApp integration', 'Automated follow-up reminders', 'Team roles & permissions', 'Revenue & conversion reports'],
      ar: ['استقبال العملاء وخط المبيعات', 'تاريخ العميل والملاحظات', 'تكامل واتساب', 'تذكيرات متابعة آلية', 'أدوار وصلاحيات الفريق', 'تقارير الإيرادات والتحويل'],
    },
    techStack: ['Next.js', 'Payload CMS', 'Supabase', 'PostgreSQL', 'WhatsApp Business API'],
    deliveryApproach: {
      en: 'Start with lead management and pipeline, then add automation and integrations.',
      ar: 'نبدأ بإدارة العملاء وخط المبيعات، ثم نضيف الأتمتة والتكاملات.',
    },
    route: '/web-applications',
  },

  // ── 18. Business Systems (Fallback) ──────────────────────────────────────
  {
    id: 'business-systems-general',
    match: { projectType: 'business-system' },
    priority: 40,
    package: { en: 'Business Systems Development Package', ar: 'باقة تطوير أنظمة الأعمال' },
    packageSubtitle: { en: 'Inventory · Orders · Invoices · Workflows', ar: 'مخزون · طلبات · فواتير · سير عمل' },
    personalizedIntro: {
      en: 'CloudTopia will build an internal business system tailored to your operations — covering inventory, orders, invoices, team roles, and daily workflow automation so your business runs with less manual effort.',
      ar: 'ستبني CloudTopia نظام أعمال داخلياً مصمماً لعملياتك — يغطي المخزون والطلبات والفواتير وأدوار الفريق وأتمتة سير العمل اليومي حتى يعمل عملك بجهد يدوي أقل.',
    },
    recommendedServices: {
      en: ['Inventory Management', 'Sales & Order Management', 'Invoice Generation', 'Role-Based Dashboard', 'Reports & Analytics', 'Workflow Automation'],
      ar: ['إدارة المخزون', 'إدارة المبيعات والطلبات', 'إنشاء الفواتير', 'لوحة تحكم مبنية على الأدوار', 'التقارير والتحليلات', 'أتمتة سير العمل'],
    },
    keyFeatures: {
      en: ['Inventory & stock tracking', 'Order & invoice management', 'Role-based team access', 'Business reports & exports', 'Supplier / vendor module', 'Automated workflow triggers'],
      ar: ['تتبع المخزون والمخزون', 'إدارة الطلبات والفواتير', 'وصول الفريق المبني على الأدوار', 'تقارير وصادرات الأعمال', 'نظام الموردين', 'محفزات سير العمل الآلية'],
    },
    techStack: ['Next.js', 'Node.js / Laravel', 'PostgreSQL / MySQL', 'Cloud Hosting'],
    deliveryApproach: {
      en: 'Build core management modules first, then add reporting and workflow automation.',
      ar: 'نبني وحدات الإدارة الأساسية أولاً، ثم نضيف التقارير وأتمتة سير العمل.',
    },
    route: '/web-applications',
  },

  // ── 19. Catch-All Fallback ────────────────────────────────────────────────
  {
    id: 'custom-fallback',
    match: {},
    priority: 1,
    package: { en: 'Custom CloudTopia Solution', ar: 'حل CloudTopia المخصص' },
    packageSubtitle: { en: 'Tailored to your exact needs', ar: 'مصمم وفق احتياجاتك الدقيقة' },
    personalizedIntro: {
      en: 'Based on your answers, CloudTopia will scope a tailored solution across website, app, CRM, cloud, or AI automation — focused on the exact outcome you need.',
      ar: 'بناءً على إجاباتك، ستحدد CloudTopia نطاق حل مخصص عبر الموقع، التطبيق، CRM، السحابة، أو أتمتة الذكاء الاصطناعي — يركز على النتيجة الدقيقة التي تحتاجها.',
    },
    recommendedServices: {
      en: ['Discovery & Technical Scoping', 'UI/UX Design', 'Development', 'Cloud Deployment', 'Post-Launch Support'],
      ar: ['اكتشاف وتحديد النطاق التقني', 'تصميم UI/UX', 'التطوير', 'النشر السحابي', 'الدعم بعد الإطلاق'],
    },
    keyFeatures: {
      en: ['Free discovery session', 'Tailored technical scope', 'Clean modern design', 'Scalable architecture', 'Post-launch support', 'Full code & asset ownership'],
      ar: ['جلسة اكتشاف مجانية', 'نطاق تقني مخصص', 'تصميم حديث ونظيف', 'بنية قابلة للتوسع', 'دعم بعد الإطلاق', 'ملكية كاملة للكود والأصول'],
    },
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Cloud Hosting'],
    deliveryApproach: {
      en: 'Start with a discovery call, then build a phased plan: Presence → System → Automation → AI.',
      ar: 'نبدأ بمكالمة اكتشاف، ثم نبني خطة مرحلية: الحضور الرقمي → النظام → الأتمتة → الذكاء الاصطناعي.',
    },
    route: '/web-applications',
  },
]
