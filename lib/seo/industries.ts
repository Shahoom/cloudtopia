export type LocaleKey = 'en' | 'ar'

export type LocalizedText = Record<LocaleKey, string>

export type IndustryData = {
    slug: string
    name: LocalizedText
    heroTitle: LocalizedText
    description: LocalizedText
    problems: LocalizedText[]
    useCases: Array<{
        title: LocalizedText
        description: LocalizedText
    }>
    serviceLinks: Array<{
        label: LocalizedText
        href: string
    }>
    differentiators: LocalizedText[]
    faqs: Array<{
        question: LocalizedText
        answer: LocalizedText
    }>
}

const t = (en: string, ar: string): LocalizedText => ({ en, ar })

const commonDifferentiators = [
    t('Fixed scope and fixed price before development starts.', 'نطاق وسعر ثابتان قبل بدء التطوير.'),
    t('Arabic and English delivery with RTL-aware interfaces.', 'تنفيذ بالعربية والإنجليزية مع واجهات تراعي RTL.'),
    t('Client ownership of code, accounts, content, and data.', 'ملكية كاملة للعميل للكود والحسابات والمحتوى والبيانات.'),
]

const website = { label: t('Websites & Landing Pages', 'مواقع وصفحات هبوط'), href: '/website-design' }
const ecommerce = { label: t('E-commerce Stores', 'متاجر إلكترونية'), href: '/ecommerce-solutions' }
const systems = { label: t('Business Systems', 'أنظمة أعمال'), href: '/business-systems-development' }
const apps = { label: t('Web Applications', 'تطبيقات ويب'), href: '/web-applications' }
const content = { label: t('Content & Growth', 'المحتوى والنمو'), href: '/content-creation' }
const social = { label: t('Social Media Marketing', 'تسويق التواصل الاجتماعي'), href: '/social-media-marketing' }

export const industries: Record<string, IndustryData> = {
    healthcare: {
        slug: 'healthcare',
        name: t('Healthcare', 'الرعاية الصحية'),
        heroTitle: t('Digital systems for clinics, hospitals, and health service teams.', 'أنظمة رقمية للعيادات والمستشفيات وفرق الخدمات الصحية.'),
        description: t('CloudTopia helps healthcare teams modernize appointments, patient communication, service pages, and internal workflows with secure, multilingual platforms.', 'تساعد كلاود توبيا فرق الرعاية الصحية على تحديث المواعيد، تواصل المرضى، صفحات الخدمات، وسير العمل الداخلي عبر منصات آمنة متعددة اللغات.'),
        problems: [
            t('Patients cannot easily understand services, pricing, or booking steps online.', 'يصعب على المرضى فهم الخدمات أو الأسعار أو خطوات الحجز عبر الإنترنت.'),
            t('Front desks lose time to repeated appointment and follow-up tasks.', 'تضيع مكاتب الاستقبال وقتاً في مهام المواعيد والمتابعة المتكررة.'),
            t('Arabic and English content is inconsistent across the patient journey.', 'المحتوى العربي والإنجليزي غير متسق عبر رحلة المريض.'),
        ],
        useCases: [
            { title: t('Patient portals', 'بوابات المرضى'), description: t('Secure access to appointments, forms, and care instructions.', 'وصول آمن للمواعيد والنماذج وتعليمات الرعاية.') },
            { title: t('Appointment booking', 'حجز المواعيد'), description: t('Online scheduling with reminders and internal calendars.', 'جدولة إلكترونية مع تذكيرات وتقويمات داخلية.') },
            { title: t('Clinic websites', 'مواقع العيادات'), description: t('Service pages, doctor profiles, and multilingual SEO content.', 'صفحات خدمات، ملفات أطباء، ومحتوى SEO متعدد اللغات.') },
            { title: t('Admin dashboards', 'لوحات الإدارة'), description: t('Operational views for teams, leads, requests, and reports.', 'عروض تشغيلية للفرق والعملاء المحتملين والطلبات والتقارير.') },
        ],
        serviceLinks: [website, apps, systems, content],
        differentiators: commonDifferentiators,
        faqs: [
            { question: t('Can you build bilingual healthcare pages?', 'هل يمكنكم بناء صفحات صحية ثنائية اللغة؟'), answer: t('Yes. We structure Arabic and English content so service pages, doctor profiles, and booking flows are clear in both languages.', 'نعم. ننظم المحتوى العربي والإنجليزي بحيث تكون صفحات الخدمات وملفات الأطباء ومسارات الحجز واضحة في اللغتين.') },
            { question: t('Do you replace medical systems?', 'هل تستبدلون الأنظمة الطبية؟'), answer: t('We usually build the public website, booking layer, dashboards, or integrations around existing systems rather than forcing a replacement.', 'عادةً نبني الموقع العام، طبقة الحجز، اللوحات، أو التكاملات حول الأنظمة الحالية بدلاً من فرض الاستبدال.') },
        ],
    },
    fintech: {
        slug: 'fintech',
        name: t('FinTech', 'التقنية المالية'),
        heroTitle: t('Secure digital products for finance, payments, and customer operations.', 'منتجات رقمية آمنة للتمويل والمدفوعات وعمليات العملاء.'),
        description: t('We support finance teams with polished product websites, onboarding flows, dashboards, integrations, and explainable customer experiences.', 'ندعم فرق التمويل بمواقع منتجات مصقولة، مسارات انضمام، لوحات، تكاملات، وتجارب عملاء واضحة.'),
        problems: [
            t('Complex products need clearer explanation before users trust them.', 'المنتجات المعقدة تحتاج شرحاً أوضح قبل أن يثق بها المستخدمون.'),
            t('Manual onboarding slows qualified leads and support teams.', 'الانضمام اليدوي يبطئ العملاء المؤهلين وفرق الدعم.'),
            t('Dashboards and integrations need careful access and audit thinking.', 'اللوحات والتكاملات تحتاج تفكيراً دقيقاً في الوصول والتدقيق.'),
        ],
        useCases: [
            { title: t('Product websites', 'مواقع المنتجات'), description: t('Clear positioning, pricing, FAQ, and lead capture.', 'تموضع واضح، أسعار، أسئلة، وجمع عملاء محتملين.') },
            { title: t('Customer onboarding', 'انضمام العملاء'), description: t('Guided forms, document collection, and status tracking.', 'نماذج موجهة، جمع مستندات، وتتبع الحالة.') },
            { title: t('Admin dashboards', 'لوحات الإدارة'), description: t('Role-aware views for customers, requests, and reporting.', 'عروض حسب الصلاحية للعملاء والطلبات والتقارير.') },
            { title: t('Payment integrations', 'تكاملات الدفع'), description: t('Checkout and subscription flows aligned to local markets.', 'مسارات دفع واشتراك متوافقة مع الأسواق المحلية.') },
        ],
        serviceLinks: [website, apps, systems, ecommerce],
        differentiators: commonDifferentiators,
        faqs: [
            { question: t('Do you handle regulated finance work?', 'هل تتعاملون مع أعمال مالية منظمة؟'), answer: t('We build the digital product surfaces and integrations while coordinating with your compliance requirements and specialist advisors.', 'نبني واجهات المنتج الرقمية والتكاملات مع التنسيق مع متطلبات الامتثال ومستشاريكم المتخصصين.') },
            { question: t('Can you support Arabic onboarding?', 'هل تدعمون انضماماً عربياً؟'), answer: t('Yes. We design bilingual flows with field labels, help text, validation, and document steps that work naturally in Arabic and English.', 'نعم. نصمم مسارات ثنائية اللغة بعناوين حقول ونصوص مساعدة وتحقق وخطوات مستندات تعمل طبيعياً بالعربية والإنجليزية.') },
        ],
    },
    'ecommerce-retail': {
        slug: 'ecommerce-retail',
        name: t('E-commerce & Retail', 'التجارة الإلكترونية والتجزئة'),
        heroTitle: t('Commerce systems built for catalogs, checkout, inventory, and growth.', 'أنظمة تجارة للكتالوجات والدفع والمخزون والنمو.'),
        description: t('CloudTopia builds online stores, retail workflows, inventory systems, and growth content for regional and global sellers.', 'تبني كلاود توبيا متاجر إلكترونية، سير عمل للتجزئة، أنظمة مخزون، ومحتوى نمو للبائعين إقليمياً وعالمياً.'),
        problems: [
            t('Stores launch without local payment, tax, or delivery readiness.', 'تنطلق المتاجر دون جاهزية للدفع المحلي أو الضريبة أو التوصيل.'),
            t('Inventory, orders, and customer service live in disconnected tools.', 'المخزون والطلبات وخدمة العملاء موزعة بين أدوات منفصلة.'),
            t('Arabic product content is often weak or missing.', 'محتوى المنتجات العربي غالباً ضعيف أو مفقود.'),
        ],
        useCases: [
            { title: t('Online stores', 'متاجر إلكترونية'), description: t('Catalog, checkout, shipping, and payment setup.', 'كتالوج، دفع، شحن، وإعداد مدفوعات.') },
            { title: t('Inventory tools', 'أدوات المخزون'), description: t('Stock tracking, reorder alerts, and operations dashboards.', 'تتبع المخزون، تنبيهات إعادة الطلب، ولوحات تشغيل.') },
            { title: t('Customer loyalty', 'ولاء العملاء'), description: t('Accounts, offers, email flows, and repeat purchase journeys.', 'حسابات، عروض، رسائل بريدية، ورحلات شراء متكررة.') },
            { title: t('Retail landing pages', 'صفحات هبوط للتجزئة'), description: t('Campaign pages for product drops, branches, and seasonal offers.', 'صفحات حملات للمنتجات والفروع والعروض الموسمية.') },
        ],
        serviceLinks: [ecommerce, systems, website, social],
        differentiators: commonDifferentiators,
        faqs: [
            { question: t('Can you integrate regional payment methods?', 'هل تدمجون طرق دفع إقليمية؟'), answer: t('Yes. We plan checkout around your target market, currency, tax setup, and payment gateway availability.', 'نعم. نخطط الدفع حسب السوق المستهدف والعملة والضريبة وتوفر بوابة الدفع.') },
            { question: t('Can you connect inventory?', 'هل يمكن ربط المخزون؟'), answer: t('Yes. We can connect inventory data to the storefront or build a lightweight stock system if your current tools are not ready.', 'نعم. يمكننا ربط بيانات المخزون بالمتجر أو بناء نظام مخزون خفيف إذا لم تكن أدواتكم جاهزة.') },
        ],
    },
    'real-estate': {
        slug: 'real-estate',
        name: t('Real Estate', 'العقارات'),
        heroTitle: t('Property platforms that turn listings into qualified conversations.', 'منصات عقارية تحول القوائم إلى محادثات مؤهلة.'),
        description: t('We build property websites, listing portals, CRM flows, and lead capture systems for agencies, developers, and property teams.', 'نبني مواقع عقارية، بوابات قوائم، مسارات CRM، وأنظمة جمع عملاء للوكالات والمطورين وفرق العقار.'),
        problems: [
            t('Listings are hard to filter, compare, or trust.', 'يصعب تصفية القوائم أو مقارنتها أو الوثوق بها.'),
            t('Leads arrive without budget, location, or timing context.', 'تصل العملاء المحتملون دون سياق للميزانية أو الموقع أو التوقيت.'),
            t('Teams lose visibility from inquiry to viewing to offer.', 'تفقد الفرق الرؤية من الاستفسار إلى المعاينة إلى العرض.'),
        ],
        useCases: [
            { title: t('Listing portals', 'بوابات قوائم'), description: t('Searchable properties with maps, galleries, and inquiry flows.', 'عقارات قابلة للبحث مع خرائط ومعارض ومسارات استفسار.') },
            { title: t('Developer websites', 'مواقع المطورين'), description: t('Project pages, brochures, floor plans, and lead forms.', 'صفحات مشاريع، كتيبات، مخططات، ونماذج عملاء.') },
            { title: t('Real estate CRM', 'CRM عقاري'), description: t('Lead stages, viewing notes, follow-ups, and agent assignment.', 'مراحل العملاء، ملاحظات المعاينة، المتابعة، وتوزيع الوكلاء.') },
            { title: t('Virtual tour support', 'دعم الجولات الافتراضية'), description: t('Media-rich listing pages that make properties easier to inspect.', 'صفحات قوائم غنية بالوسائط لتسهيل معاينة العقارات.') },
        ],
        serviceLinks: [website, apps, systems, content],
        differentiators: commonDifferentiators,
        faqs: [
            { question: t('Can you build property filters?', 'هل تبنون فلاتر للعقارات؟'), answer: t('Yes. We can add filters for city, community, price, bedrooms, property type, availability, and custom sales criteria.', 'نعم. نضيف فلاتر للمدينة والمنطقة والسعر والغرف والنوع والتوفر ومعايير البيع المخصصة.') },
            { question: t('Can leads go into a CRM?', 'هل يمكن إرسال العملاء إلى CRM؟'), answer: t('Yes. We can connect forms to your existing CRM or build a focused real estate CRM around your sales process.', 'نعم. نربط النماذج بنظامكم الحالي أو نبني CRM عقاري مركز حول عملية البيع.') },
        ],
    },
    education: {
        slug: 'education',
        name: t('Education', 'التعليم'),
        heroTitle: t('Learning platforms and school systems for modern education teams.', 'منصات تعلم وأنظمة مدارس لفرق تعليم حديثة.'),
        description: t('CloudTopia supports schools, course creators, and training businesses with LMS platforms, enrollment flows, portals, and content systems.', 'تدعم كلاود توبيا المدارس وصناع الدورات وشركات التدريب بمنصات LMS، مسارات تسجيل، بوابات، وأنظمة محتوى.'),
        problems: [
            t('Course information is scattered and hard to evaluate.', 'معلومات الدورات متفرقة ويصعب تقييمها.'),
            t('Enrollment and payment workflows are manual.', 'مسارات التسجيل والدفع يدوية.'),
            t('Students and parents lack a clear digital portal.', 'الطلاب والأهالي يفتقرون إلى بوابة رقمية واضحة.'),
        ],
        useCases: [
            { title: t('LMS platforms', 'منصات LMS'), description: t('Lessons, progress, resources, and learner dashboards.', 'دروس، تقدم، موارد، ولوحات للمتعلمين.') },
            { title: t('Course websites', 'مواقع الدورات'), description: t('Programs, instructors, outcomes, and application flows.', 'برامج، مدربون، نتائج، ومسارات تقديم.') },
            { title: t('Student portals', 'بوابات الطلاب'), description: t('Accounts, documents, schedules, and communication.', 'حسابات، مستندات، جداول، وتواصل.') },
            { title: t('Training dashboards', 'لوحات التدريب'), description: t('Operational reporting for cohorts, attendance, and completion.', 'تقارير تشغيلية للدفعات والحضور والإكمال.') },
        ],
        serviceLinks: [apps, website, systems, content],
        differentiators: commonDifferentiators,
        faqs: [
            { question: t('Can you build a custom LMS?', 'هل تبنون LMS مخصصاً؟'), answer: t('Yes. We can build a focused LMS or a lighter portal depending on your course model, team, and launch timeline.', 'نعم. يمكننا بناء LMS مركز أو بوابة أخف حسب نموذج الدورات والفريق وجدول الإطلاق.') },
            { question: t('Can content be bilingual?', 'هل يمكن أن يكون المحتوى ثنائي اللغة؟'), answer: t('Yes. Arabic and English can be first-class content paths with RTL layout and localized course pages.', 'نعم. يمكن أن تكون العربية والإنجليزية مسارات محتوى أساسية مع RTL وصفحات دورات محلية.') },
        ],
    },
    'travel-hospitality': {
        slug: 'travel-hospitality',
        name: t('Travel & Hospitality', 'السفر والضيافة'),
        heroTitle: t('Booking, guest experience, and hospitality websites that feel easy to trust.', 'حجز وتجربة ضيوف ومواقع ضيافة سهلة الثقة.'),
        description: t('We help hotels, restaurants, agencies, and experience providers improve booking, menus, guest communication, and campaign pages.', 'نساعد الفنادق والمطاعم والوكالات ومقدمي التجارب على تحسين الحجز والقوائم وتواصل الضيوف وصفحات الحملات.'),
        problems: [
            t('Guests need clearer availability, offers, and booking steps.', 'الضيوف يحتاجون وضوحاً أكبر للتوفر والعروض وخطوات الحجز.'),
            t('Menus and packages change faster than printed materials.', 'القوائم والباقات تتغير أسرع من المواد المطبوعة.'),
            t('Campaign traffic often lands on generic pages.', 'زيارات الحملات تصل غالباً إلى صفحات عامة.'),
        ],
        useCases: [
            { title: t('Booking engines', 'محركات الحجز'), description: t('Availability, inquiry, payment, and confirmation flows.', 'توفر، استفسار، دفع، وتأكيد.') },
            { title: t('Hotel websites', 'مواقع الفنادق'), description: t('Rooms, amenities, offers, galleries, and local SEO.', 'غرف، مرافق، عروض، معارض، وSEO محلي.') },
            { title: t('QR menus', 'قوائم QR'), description: t('Digital menus with multilingual updates and table-friendly UX.', 'قوائم رقمية بتحديثات متعددة اللغات وتجربة مناسبة للطاولة.') },
            { title: t('Campaign landing pages', 'صفحات هبوط للحملات'), description: t('Offer-specific pages for seasons, events, and packages.', 'صفحات عروض للمواسم والفعاليات والباقات.') },
        ],
        serviceLinks: [website, apps, ecommerce, social],
        differentiators: commonDifferentiators,
        faqs: [
            { question: t('Can you build hotel booking flows?', 'هل تبنون مسارات حجز للفنادق؟'), answer: t('Yes. We can build inquiry-first flows, payment-enabled booking, or connect to existing hospitality tools.', 'نعم. نبني مسارات استفسار أولاً، حجزاً مع دفع، أو نربط أدوات الضيافة الحالية.') },
            { question: t('Can menus be updated without printing?', 'هل يمكن تحديث القوائم دون طباعة؟'), answer: t('Yes. QR menus let your team update items, prices, languages, and availability from an admin panel.', 'نعم. قوائم QR تتيح لفريقكم تحديث الأصناف والأسعار واللغات والتوفر من لوحة إدارة.') },
        ],
    },
    'logistics-supply-chain': {
        slug: 'logistics-supply-chain',
        name: t('Logistics & Supply Chain', 'اللوجستيات وسلاسل الإمداد'),
        heroTitle: t('Operational systems for tracking, inventory, fleets, and delivery visibility.', 'أنظمة تشغيل للتتبع والمخزون والأساطيل ورؤية التوصيل.'),
        description: t('CloudTopia builds dashboards, portals, and workflow tools that help logistics teams reduce manual follow-up and see operations clearly.', 'تبني كلاود توبيا لوحات وبوابات وأدوات سير عمل تساعد فرق اللوجستيات على تقليل المتابعة اليدوية ورؤية العمليات بوضوح.'),
        problems: [
            t('Shipment status is trapped in calls, spreadsheets, or chat messages.', 'حالة الشحنات محصورة في المكالمات أو الجداول أو الرسائل.'),
            t('Inventory and order data are not visible to all teams.', 'بيانات المخزون والطلبات غير مرئية لكل الفرق.'),
            t('Clients need self-service updates instead of repeated support requests.', 'العملاء يحتاجون تحديثات ذاتية بدلاً من طلبات دعم متكررة.'),
        ],
        useCases: [
            { title: t('Tracking portals', 'بوابات تتبع'), description: t('Shipment visibility for clients, staff, and partners.', 'رؤية الشحنات للعملاء والموظفين والشركاء.') },
            { title: t('Warehouse dashboards', 'لوحات المستودعات'), description: t('Stock, orders, exceptions, and operational metrics.', 'مخزون، طلبات، استثناءات، ومؤشرات تشغيل.') },
            { title: t('Fleet tools', 'أدوات الأسطول'), description: t('Driver assignment, status updates, and delivery notes.', 'توزيع السائقين، تحديثات الحالة، وملاحظات التوصيل.') },
            { title: t('API integrations', 'تكاملات API'), description: t('Connect orders, CRM, warehouse, and delivery tools.', 'ربط الطلبات وCRM والمستودع وأدوات التوصيل.') },
        ],
        serviceLinks: [systems, apps, website, ecommerce],
        differentiators: commonDifferentiators,
        faqs: [
            { question: t('Can you build a tracking portal?', 'هل تبنون بوابة تتبع؟'), answer: t('Yes. We can build tracking portals around your current shipment data or create a simple status workflow if no system exists.', 'نعم. نبني بوابات تتبع حول بيانات الشحن الحالية أو ننشئ سير حالة بسيطاً إذا لم يوجد نظام.') },
            { question: t('Can you integrate existing systems?', 'هل تدمجون الأنظمة الحالية؟'), answer: t('Yes. We can connect APIs, spreadsheets, admin tools, and customer portals where stable access is available.', 'نعم. نربط APIs والجداول وأدوات الإدارة وبوابات العملاء عندما يتوفر وصول مستقر.') },
        ],
    },
    'government-public-sector': {
        slug: 'government-public-sector',
        name: t('Government & Public Sector', 'الحكومة والقطاع العام'),
        heroTitle: t('Accessible public service portals and information systems.', 'بوابات خدمات عامة وأنظمة معلومات سهلة الوصول.'),
        description: t('We support public-facing teams with multilingual websites, forms, dashboards, knowledge bases, and secure communication workflows.', 'ندعم الفرق الموجهة للجمهور بمواقع متعددة اللغات ونماذج ولوحات وقواعد معرفة ومسارات تواصل آمنة.'),
        problems: [
            t('Residents and businesses cannot easily find the right service path.', 'لا يستطيع السكان والشركات العثور بسهولة على مسار الخدمة الصحيح.'),
            t('Forms and requests depend on manual routing.', 'النماذج والطلبات تعتمد على التوجيه اليدوي.'),
            t('Accessibility and multilingual clarity are often inconsistent.', 'إمكانية الوصول والوضوح متعدد اللغات غالباً غير متسقين.'),
        ],
        useCases: [
            { title: t('Citizen service portals', 'بوابات خدمات المواطنين'), description: t('Service discovery, forms, status updates, and documents.', 'اكتشاف الخدمات، نماذج، تحديثات حالة، ومستندات.') },
            { title: t('Public websites', 'مواقع عامة'), description: t('Accessible content, announcements, resources, and multilingual pages.', 'محتوى سهل الوصول، إعلانات، موارد، وصفحات متعددة اللغات.') },
            { title: t('Internal dashboards', 'لوحات داخلية'), description: t('Request queues, reporting, and department coordination.', 'قوائم طلبات، تقارير، وتنسيق بين الأقسام.') },
            { title: t('Knowledge bases', 'قواعد معرفة'), description: t('Searchable help content for residents, teams, and partners.', 'محتوى مساعدة قابل للبحث للسكان والفرق والشركاء.') },
        ],
        serviceLinks: [website, apps, systems, content],
        differentiators: commonDifferentiators,
        faqs: [
            { question: t('Do you build accessible public websites?', 'هل تبنون مواقع عامة سهلة الوصول؟'), answer: t('Yes. We design clear navigation, readable content, keyboard-friendly interfaces, and multilingual page structures.', 'نعم. نصمم تنقلاً واضحاً ومحتوى مقروءاً وواجهات ملائمة للوحة المفاتيح وبنى صفحات متعددة اللغات.') },
            { question: t('Can workflows stay modular?', 'هل يمكن أن تبقى مسارات العمل معيارية؟'), answer: t('Yes. We prefer modular service flows so departments can launch the highest-priority paths first and expand later.', 'نعم. نفضل مسارات خدمات معيارية حتى تطلق الأقسام المسارات ذات الأولوية أولاً ثم تتوسع لاحقاً.') },
        ],
    },
}

export const industrySlugs = Object.keys(industries)

export function getIndustry(slug: string): IndustryData | null {
    return industries[slug] || null
}

export function localizedValue(value: LocalizedText, locale: string): string {
    return value[(locale as LocaleKey) || 'en'] || value.en
}
