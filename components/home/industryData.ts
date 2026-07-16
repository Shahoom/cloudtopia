export type HomeIndustryLocale = 'en' | 'ar'

export type LocalizedString = Record<HomeIndustryLocale, string>

export type HomeIndustrySlide = {
  id: string
  icon: 'finance' | 'healthcare' | 'education' | 'logistics' | 'travel' | 'real-estate' | 'entertainment' | 'ecommerce' | 'restaurants' | 'startups'
  name: LocalizedString
  description: LocalizedString
  features: Array<{
    title: LocalizedString
    description: LocalizedString
  }>
  exploreHref: string
  caseStudiesHref: string
  visual: {
    label: LocalizedString
    alt: LocalizedString
    metric: LocalizedString
    badge: LocalizedString
    accent: string
    desktopImage: string
    mobileImage: string
    desktopFit?: 'contain' | 'cover'
    mobileFit?: 'contain' | 'cover'
  }
}

const t = (en: string, ar: string): LocalizedString => ({ en, ar })

export const homeIndustrySlides: HomeIndustrySlide[] = [
  {
    id: 'finance',
    icon: 'finance',
    name: t('Finance', 'المالية'),
    description: t(
      'CloudTopia builds secure finance platforms, onboarding flows, customer portals, and AI dashboards that help teams move faster while keeping trust and compliance at the center.',
      'تبني CloudTopia منصات مالية آمنة ومسارات انضمام وبوابات عملاء ولوحات ذكاء اصطناعي تساعد الفرق على العمل بسرعة مع الحفاظ على الثقة والامتثال.',
    ),
    features: [
      { title: t('End-to-end encryption', 'تشفير شامل'), description: t('Protect sensitive customer and transaction data.', 'حماية بيانات العملاء والمعاملات الحساسة.') },
      { title: t('Regulatory workflows', 'مسارات امتثال'), description: t('Structure onboarding, approvals, and audit trails.', 'تنظيم الانضمام والموافقات وسجلات التدقيق.') },
      { title: t('Real-time risk alerts', 'تنبيهات مخاطر فورية'), description: t('Surface suspicious activity and operational exceptions.', 'إظهار النشاط المشبوه والاستثناءات التشغيلية.') },
      { title: t('Fast transactions', 'معاملات سريعة'), description: t('Optimize payment, wallet, and subscription journeys.', 'تحسين رحلات الدفع والمحافظ والاشتراكات.') },
      { title: t('Omnichannel support', 'دعم متعدد القنوات'), description: t('Unify web, mobile, WhatsApp, and support handoff.', 'توحيد الويب والموبايل وواتساب والتحويل للدعم.') },
      { title: t('Scalable infrastructure', 'بنية قابلة للتوسع'), description: t('Design cloud systems ready for growth and reporting.', 'تصميم أنظمة سحابية جاهزة للنمو والتقارير.') },
    ],
    exploreHref: '/industries/fintech',
    caseStudiesHref: '/projects',
    visual: {
      label: t('Finance command center', 'مركز قيادة مالي'),
      alt: t('Illustration of a mobile finance dashboard and secure transaction cards', 'تصميم يوضح لوحة مالية على الموبايل وبطاقات معاملات آمنة'),
      metric: t('Secure onboarding', 'انضمام آمن'),
      badge: t('Fintech OS', 'نظام مالي'),
      accent: 'from-sky-400 to-cyan-300',
      desktopImage: '/images/homepage/Finance.png',
      mobileImage: '/images/homepage/Finance-mobile.jpg',
      desktopFit: 'cover',
      mobileFit: 'contain',
    },
  },
  {
    id: 'healthcare',
    icon: 'healthcare',
    name: t('Healthcare', 'الرعاية الصحية'),
    description: t(
      'We create patient-friendly clinic websites, booking systems, secure portals, and automation that reduce front-desk pressure and improve care communication.',
      'ننشئ مواقع عيادات سهلة للمرضى وأنظمة حجز وبوابات آمنة وأتمتة تقلل ضغط الاستقبال وتحسن تواصل الرعاية.',
    ),
    features: [
      { title: t('Appointment booking', 'حجز المواعيد'), description: t('Online scheduling with reminders and staff visibility.', 'جدولة إلكترونية مع تذكيرات ورؤية للفريق.') },
      { title: t('Patient privacy', 'خصوصية المرضى'), description: t('Secure forms, portals, and role-based access.', 'نماذج وبوابات آمنة وصلاحيات حسب الدور.') },
      { title: t('Telehealth readiness', 'جاهزية الرعاية عن بعد'), description: t('Support remote consultations and follow-up flows.', 'دعم الاستشارات عن بعد ومسارات المتابعة.') },
      { title: t('Insurance integration', 'تكامل التأمين'), description: t('Plan data handoff for claims and approvals.', 'تنظيم نقل البيانات للمطالبات والموافقات.') },
      { title: t('Secure portals', 'بوابات آمنة'), description: t('Give patients and teams a clear digital workspace.', 'توفير مساحة رقمية واضحة للمرضى والفرق.') },
      { title: t('Prescription management', 'إدارة الوصفات'), description: t('Track requests, refills, and patient communication.', 'تتبع الطلبات والتجديدات وتواصل المرضى.') },
    ],
    exploreHref: '/industries/healthcare',
    caseStudiesHref: '/projects',
    visual: {
      label: t('Clinic patient flow', 'رحلة مريض العيادة'),
      alt: t('Illustration of a healthcare appointment app and patient portal', 'تصميم يوضح تطبيق مواعيد صحية وبوابة مريض'),
      metric: t('Patient journey', 'رحلة المريض'),
      badge: t('Care Portal', 'بوابة رعاية'),
      accent: 'from-rose-400 to-sky-300',
      desktopImage: '/images/homepage/Healthcare.png',
      mobileImage: '/images/homepage/Healthcare-mobile.png',
      desktopFit: 'cover',
      mobileFit: 'contain',
    },
  },
  {
    id: 'education',
    icon: 'education',
    name: t('Education', 'التعليم'),
    description: t(
      'CloudTopia helps schools, training teams, and course creators launch learning platforms, student portals, and content systems that make education easier to manage.',
      'تساعد CloudTopia المدارس وفرق التدريب وصناع الدورات على إطلاق منصات تعلم وبوابات طلاب وأنظمة محتوى تجعل التعليم أسهل في الإدارة.',
    ),
    features: [
      { title: t('Learning management', 'إدارة التعلم'), description: t('Courses, lessons, resources, and learner progress.', 'دورات ودروس وموارد وتقدم المتعلمين.') },
      { title: t('Student portal', 'بوابة الطالب'), description: t('Accounts, documents, schedules, and messages.', 'حسابات ومستندات وجداول ورسائل.') },
      { title: t('Course management', 'إدارة الدورات'), description: t('Publish programs, instructors, cohorts, and content.', 'نشر البرامج والمدربين والدفعات والمحتوى.') },
      { title: t('Online assessments', 'اختبارات إلكترونية'), description: t('Quizzes, assignments, scoring, and feedback loops.', 'اختبارات وواجبات وتقييمات ومسارات ملاحظات.') },
      { title: t('Attendance tracking', 'تتبع الحضور'), description: t('Monitor attendance across classes and cohorts.', 'متابعة الحضور عبر الفصول والدفعات.') },
      { title: t('Virtual classrooms', 'فصول افتراضية'), description: t('Connect sessions, recordings, and learning material.', 'ربط الجلسات والتسجيلات والمواد التعليمية.') },
    ],
    exploreHref: '/industries/education',
    caseStudiesHref: '/projects',
    visual: {
      label: t('Learning dashboard', 'لوحة تعلم'),
      alt: t('Illustration of a student learning dashboard and course cards', 'تصميم يوضح لوحة تعلم للطلاب وبطاقات دورات'),
      metric: t('Course progress', 'تقدم الدورات'),
      badge: t('Learning Hub', 'مركز تعلم'),
      accent: 'from-indigo-400 to-violet-300',
      desktopImage: '/images/homepage/Education.png',
      mobileImage: '/images/homepage/Education-mobile.jpg',
      desktopFit: 'cover',
      mobileFit: 'contain',
    },
  },
  {
    id: 'logistics',
    icon: 'logistics',
    name: t('Logistics', 'اللوجستيات'),
    description: t(
      'We build tracking portals, fleet tools, warehouse dashboards, and API integrations that give logistics teams real-time operational visibility.',
      'نبني بوابات تتبع وأدوات أسطول ولوحات مستودعات وتكاملات API تمنح فرق اللوجستيات رؤية تشغيلية فورية.',
    ),
    features: [
      { title: t('Shipment tracking', 'تتبع الشحنات'), description: t('Live status visibility for clients and teams.', 'رؤية مباشرة للحالة للعملاء والفرق.') },
      { title: t('Fleet dashboards', 'لوحات الأسطول'), description: t('Driver assignments, routes, and delivery notes.', 'توزيع السائقين والمسارات وملاحظات التسليم.') },
      { title: t('Warehouse visibility', 'رؤية المستودعات'), description: t('Stock, exceptions, and order flow in one place.', 'المخزون والاستثناءات ومسار الطلبات في مكان واحد.') },
      { title: t('Client portals', 'بوابات العملاء'), description: t('Self-service updates instead of repeated calls.', 'تحديثات ذاتية بدلاً من المكالمات المتكررة.') },
      { title: t('API integrations', 'تكاملات API'), description: t('Connect CRM, orders, delivery, and finance tools.', 'ربط CRM والطلبات والتوصيل والأدوات المالية.') },
      { title: t('Operations reporting', 'تقارير تشغيلية'), description: t('Measure delays, revenue, route health, and SLA.', 'قياس التأخير والإيرادات وصحة المسارات ومستوى الخدمة.') },
    ],
    exploreHref: '/industries/logistics-supply-chain',
    caseStudiesHref: '/projects',
    visual: {
      label: t('Delivery control tower', 'برج تحكم التوصيل'),
      alt: t('Illustration of a logistics tracking dashboard and delivery map', 'تصميم يوضح لوحة تتبع لوجستية وخريطة توصيل'),
      metric: t('Live tracking', 'تتبع مباشر'),
      badge: t('Ops Tower', 'برج عمليات'),
      accent: 'from-blue-400 to-emerald-300',
      desktopImage: '/images/homepage/Logistics.webp',
      mobileImage: '/images/homepage/Logistics-mobile.png',
      desktopFit: 'contain',
      mobileFit: 'contain',
    },
  },
  {
    id: 'travel',
    icon: 'travel',
    name: t('Travel', 'السفر'),
    description: t(
      'CloudTopia designs booking journeys, hotel websites, guest portals, and campaign pages that help travel brands convert attention into confirmed inquiries.',
      'تصمم CloudTopia رحلات حجز ومواقع فنادق وبوابات ضيوف وصفحات حملات تساعد علامات السفر على تحويل الاهتمام إلى استفسارات مؤكدة.',
    ),
    features: [
      { title: t('Booking engines', 'محركات الحجز'), description: t('Availability, inquiries, payments, and confirmations.', 'توفر واستفسارات ومدفوعات وتأكيدات.') },
      { title: t('Guest portals', 'بوابات الضيوف'), description: t('Itineraries, documents, messages, and support.', 'برامج الرحلات والمستندات والرسائل والدعم.') },
      { title: t('Offer landing pages', 'صفحات عروض'), description: t('Seasonal packages with clear conversion flows.', 'باقات موسمية بمسارات تحويل واضحة.') },
      { title: t('Multilingual SEO', 'SEO متعدد اللغات'), description: t('Arabic and English pages for regional demand.', 'صفحات عربية وإنجليزية للطلب الإقليمي.') },
      { title: t('CRM follow-up', 'متابعة CRM'), description: t('Track inquiries from ads, WhatsApp, and forms.', 'تتبع الاستفسارات من الإعلانات وواتساب والنماذج.') },
      { title: t('Experience dashboards', 'لوحات التجارب'), description: t('Manage packages, bookings, teams, and reports.', 'إدارة الباقات والحجوزات والفرق والتقارير.') },
    ],
    exploreHref: '/industries/travel-hospitality',
    caseStudiesHref: '/projects',
    visual: {
      label: t('Travel booking suite', 'مجموعة حجز السفر'),
      alt: t('Illustration of a travel booking interface and itinerary cards', 'تصميم يوضح واجهة حجز سفر وبطاقات برنامج رحلة'),
      metric: t('Guest conversion', 'تحويل الضيوف'),
      badge: t('Booking Suite', 'مجموعة حجز'),
      accent: 'from-amber-300 to-sky-300',
      desktopImage: '/images/homepage/Travel.webp',
      mobileImage: '/images/homepage/Travel-mobile.jpg',
      desktopFit: 'cover',
      mobileFit: 'contain',
    },
  },
  {
    id: 'real-estate',
    icon: 'real-estate',
    name: t('Real Estate', 'العقارات'),
    description: t(
      'We create property websites, listing portals, map search, CRM follow-up, and lead qualification flows for agencies and developers.',
      'ننشىء مواقع عقارية وبوابات قوائم وبحث خرائط ومتابعة CRM ومسارات تأهيل عملاء للوكالات والمطورين.',
    ),
    features: [
      { title: t('Property listings', 'قوائم العقارات'), description: t('Search, filters, maps, galleries, and detail pages.', 'بحث وفلاتر وخرائط ومعارض وصفحات تفاصيل.') },
      { title: t('Lead qualification', 'تأهيل العملاء'), description: t('Capture budget, location, timing, and intent.', 'جمع الميزانية والموقع والتوقيت والنية.') },
      { title: t('Agent CRM', 'CRM للوكلاء'), description: t('Assign leads, view notes, and automate follow-ups.', 'توزيع العملاء وعرض الملاحظات وأتمتة المتابعة.') },
      { title: t('Project microsites', 'مواقع مشاريع'), description: t('Launch pages for developments and campaigns.', 'صفحات إطلاق للمشاريع والحملات.') },
      { title: t('Virtual media', 'وسائط افتراضية'), description: t('Support tours, floor plans, and inspection content.', 'دعم الجولات والمخططات ومحتوى المعاينة.') },
      { title: t('Sales dashboards', 'لوحات مبيعات'), description: t('Track pipeline, viewings, offers, and performance.', 'تتبع خط المبيعات والمعاينات والعروض والأداء.') },
    ],
    exploreHref: '/industries/real-estate',
    caseStudiesHref: '/projects',
    visual: {
      label: t('Listing-to-lead platform', 'منصة من العقار إلى العميل'),
      alt: t('Illustration of a real estate listing app with map and CRM cards', 'تصميم يوضح تطبيق قوائم عقارية مع خريطة وبطاقات CRM'),
      metric: t('Qualified leads', 'عملاء مؤهلون'),
      badge: t('Property CRM', 'CRM عقاري'),
      accent: 'from-emerald-300 to-cyan-300',
      desktopImage: '/images/homepage/Real Estate.webp',
      mobileImage: '/images/homepage/Real Estate - mobile.png',
      desktopFit: 'cover',
      mobileFit: 'contain',
    },
  },
  {
    id: 'entertainment',
    icon: 'entertainment',
    name: t('Entertainment', 'الترفيه'),
    description: t(
      'CloudTopia builds event websites, ticketing flows, fan communities, content hubs, and analytics dashboards for entertainment brands and venues.',
      'تبني CloudTopia مواقع فعاليات ومسارات تذاكر ومجتمعات جماهير ومراكز محتوى ولوحات تحليلات لعلامات الترفيه والوجهات.',
    ),
    features: [
      { title: t('Event websites', 'مواقع فعاليات'), description: t('Promote schedules, artists, venues, and offers.', 'ترويج الجداول والفنانين والمواقع والعروض.') },
      { title: t('Ticketing journeys', 'رحلات التذاكر'), description: t('Move visitors from discovery to booking smoothly.', 'نقل الزوار من الاكتشاف إلى الحجز بسلاسة.') },
      { title: t('Fan communities', 'مجتمعات الجماهير'), description: t('Accounts, updates, rewards, and announcements.', 'حسابات وتحديثات ومكافآت وإعلانات.') },
      { title: t('Content hubs', 'مراكز محتوى'), description: t('Publish media, stories, campaigns, and galleries.', 'نشر الوسائط والقصص والحملات والمعارض.') },
      { title: t('CRM segmentation', 'تقسيم CRM'), description: t('Group leads by interest, city, event, and spend.', 'تقسيم العملاء حسب الاهتمام والمدينة والفعالية والإنفاق.') },
      { title: t('Performance analytics', 'تحليلات الأداء'), description: t('Measure campaigns, attendance, and engagement.', 'قياس الحملات والحضور والتفاعل.') },
    ],
    exploreHref: '/industries',
    caseStudiesHref: '/projects',
    visual: {
      label: t('Event growth hub', 'مركز نمو الفعاليات'),
      alt: t('Illustration of an entertainment event dashboard and ticket cards', 'تصميم يوضح لوحة فعالية ترفيهية وبطاقات تذاكر'),
      metric: t('Audience growth', 'نمو الجمهور'),
      badge: t('Event Engine', 'محرك فعاليات'),
      accent: 'from-fuchsia-400 to-violet-300',
      desktopImage: '/images/homepage/Entertainment.png',
      mobileImage: '/images/homepage/Entertainment-mobile.png',
      desktopFit: 'contain',
      mobileFit: 'contain',
    },
  },
  {
    id: 'ecommerce',
    icon: 'ecommerce',
    name: t('E-commerce', 'التجارة الإلكترونية'),
    description: t(
      'We develop stores, product catalogs, inventory systems, customer dashboards, and AI-assisted growth workflows for sellers ready to scale.',
      'نطور متاجر وكتالوجات منتجات وأنظمة مخزون ولوحات عملاء ومسارات نمو مدعومة بالذكاء الاصطناعي للبائعين الجاهزين للتوسع.',
    ),
    features: [
      { title: t('Product catalogs', 'كتالوجات المنتجات'), description: t('Searchable pages with filters, media, and variants.', 'صفحات قابلة للبحث مع فلاتر ووسائط وخيارات.') },
      { title: t('Checkout flows', 'مسارات الدفع'), description: t('Cart, payments, WhatsApp orders, and confirmations.', 'سلة ومدفوعات وطلبات واتساب وتأكيدات.') },
      { title: t('Inventory control', 'إدارة المخزون'), description: t('Stock alerts, orders, returns, and supplier views.', 'تنبيهات مخزون وطلبات وإرجاعات وعروض موردين.') },
      { title: t('Customer CRM', 'CRM للعملاء'), description: t('Profiles, order history, loyalty, and support notes.', 'ملفات وسجل طلبات وولاء وملاحظات دعم.') },
      { title: t('Growth analytics', 'تحليلات النمو'), description: t('Measure products, channels, campaigns, and revenue.', 'قياس المنتجات والقنوات والحملات والإيرادات.') },
      { title: t('AI recommendations', 'توصيات AI'), description: t('Personalized product, content, and follow-up ideas.', 'أفكار منتجات ومحتوى ومتابعة مخصصة.') },
    ],
    exploreHref: '/industries/ecommerce-retail',
    caseStudiesHref: '/projects',
    visual: {
      label: t('Commerce operating system', 'نظام تشغيل التجارة'),
      alt: t('Illustration of an e-commerce storefront and inventory dashboard', 'تصميم يوضح واجهة متجر إلكتروني ولوحة مخزون'),
      metric: t('Catalog to checkout', 'من الكتالوج إلى الدفع'),
      badge: t('Commerce OS', 'نظام تجارة'),
      accent: 'from-violet-400 to-sky-300',
      desktopImage: '/images/homepage/E-commerce.webp',
      mobileImage: '/images/homepage/E-commerce-mobile.jpg',
      desktopFit: 'cover',
      mobileFit: 'contain',
    },
  },
  {
    id: 'restaurants',
    icon: 'restaurants',
    name: t('Restaurants', 'المطاعم'),
    description: t(
      'CloudTopia helps restaurants and cafes launch QR menus, ordering systems, reservation flows, branch pages, and customer follow-up automation.',
      'تساعد CloudTopia المطاعم والمقاهي على إطلاق قوائم QR وأنظمة طلبات ومسارات حجوزات وصفحات فروع وأتمتة متابعة العملاء.',
    ),
    features: [
      { title: t('QR menus', 'قوائم QR'), description: t('Update items, prices, languages, and availability.', 'تحديث الأصناف والأسعار واللغات والتوفر.') },
      { title: t('Online ordering', 'طلبات إلكترونية'), description: t('WhatsApp, pickup, delivery, and kitchen views.', 'واتساب واستلام وتوصيل وعروض للمطبخ.') },
      { title: t('Reservations', 'الحجوزات'), description: t('Table booking, confirmations, and guest notes.', 'حجز طاولات وتأكيدات وملاحظات ضيوف.') },
      { title: t('Branch pages', 'صفحات الفروع'), description: t('Locations, hours, maps, offers, and local SEO.', 'مواقع وساعات وخرائط وعروض وSEO محلي.') },
      { title: t('Promotions engine', 'محرك العروض'), description: t('Campaign pages for seasonal and social offers.', 'صفحات حملات للعروض الموسمية والاجتماعية.') },
      { title: t('Customer retention', 'احتفاظ العملاء'), description: t('Capture repeat orders and follow-up opportunities.', 'جمع الطلبات المتكررة وفرص المتابعة.') },
    ],
    exploreHref: '/industries/restaurants',
    caseStudiesHref: '/projects',
    visual: {
      label: t('Restaurant order flow', 'مسار طلبات المطعم'),
      alt: t('Illustration of a restaurant QR menu and order dashboard', 'تصميم يوضح قائمة QR للمطعم ولوحة طلبات'),
      metric: t('Menu to order', 'من القائمة إلى الطلب'),
      badge: t('Order Flow', 'مسار طلبات'),
      accent: 'from-orange-300 to-rose-300',
      desktopImage: '/images/homepage/Restaurants.jpg',
      mobileImage: '/images/homepage/Restaurants-mobile.webp',
      desktopFit: 'cover',
      mobileFit: 'contain',
    },
  },
  {
    id: 'startups',
    icon: 'startups',
    name: t('Startups', 'الشركات الناشئة'),
    description: t(
      'We help founders validate ideas, build MVPs, launch SaaS dashboards, connect AI workflows, and create scalable product foundations.',
      'نساعد المؤسسين على اختبار الأفكار وبناء MVP وإطلاق لوحات SaaS وربط مسارات AI وإنشاء أساس منتج قابل للتوسع.',
    ),
    features: [
      { title: t('MVP planning', 'تخطيط MVP'), description: t('Define the smallest valuable version to launch.', 'تحديد أصغر نسخة ذات قيمة للإطلاق.') },
      { title: t('SaaS dashboards', 'لوحات SaaS'), description: t('Accounts, roles, billing paths, and analytics.', 'حسابات وصلاحيات ومسارات دفع وتحليلات.') },
      { title: t('Landing pages', 'صفحات هبوط'), description: t('Position offers and capture early demand.', 'تموضع العروض وجمع الطلب المبكر.') },
      { title: t('AI workflows', 'مسارات AI'), description: t('Automate support, qualification, reports, and tasks.', 'أتمتة الدعم والتأهيل والتقارير والمهام.') },
      { title: t('Cloud deployment', 'نشر سحابي'), description: t('Launch with secure hosting, database, and backups.', 'إطلاق باستضافة وقاعدة بيانات ونسخ آمن.') },
      { title: t('Scale roadmap', 'خريطة توسع'), description: t('Plan phases from prototype to production.', 'تخطيط المراحل من النموذج إلى الإنتاج.') },
    ],
    exploreHref: '/industries',
    caseStudiesHref: '/projects',
    visual: {
      label: t('Startup launch system', 'نظام إطلاق للشركات الناشئة'),
      alt: t('Illustration of a startup MVP dashboard and product roadmap cards', 'تصميم يوضح لوحة MVP وخريطة منتج لشركة ناشئة'),
      metric: t('MVP to scale', 'من MVP إلى التوسع'),
      badge: t('Launch Stack', 'حزمة إطلاق'),
      accent: 'from-cyan-300 to-lime-300',
      desktopImage: '/images/homepage/Startups.png',
      mobileImage: '/images/homepage/Startups-mobile.png',
      desktopFit: 'contain',
      mobileFit: 'contain',
    },
  },
]
