import type { SearchKeywordsRecord } from './index'

/**
 * Industry pages (/industries + 12 worlds).
 * Generated from the crafted search-intent workflow; hand-edit freely —
 * this file is the source of truth (the generator is not re-run in CI).
 */
export const industriesSearchKeywords: Record<string, SearchKeywordsRecord> = {
    '/industries': {
    en: {
        heading: "What businesses search for when they land here",
        intro: "Decision-makers rarely search for \"digital solutions\" in the abstract — they search from inside their industry's problems. This page maps those searches, from Oman to the wider Gulf, to the industry worlds we build for.",
        groups: [
            { label: "By what you need", phrases: ["industry specific software solutions", "custom software development for my industry", "business systems tailored to industry workflows", "digital transformation partner for enterprises", "bilingual software company Arabic English"] },
            { label: "By industry", phrases: ["software for healthcare and clinics", "fintech and payments development", "retail and ecommerce systems", "logistics and supply chain software", "software for construction companies", "education platform development"] },
            { label: "By market", phrases: ["software company in Oman", "digital solutions provider GCC", "enterprise software development Saudi Arabia", "IT solutions company Muscat"] },
        ],
    },
    ar: {
        heading: "ما يبحث عنه أصحاب الأعمال قبل الوصول إلى هنا",
        intro: "قلّما يبحث صاحب القرار عن «حلول رقمية» بشكل عام؛ بل ينطلق في بحثه من مشاكل قطاعه اليومية. جمعنا هنا تلك العبارات لتقودك إلى القطاع الأقرب لعملك في عُمان والخليج.",
        groups: [
            { label: "حسب ما تحتاجه", phrases: ["حلول رقمية حسب القطاع", "شركة تطوير أنظمة مخصصة", "أنظمة إدارة أعمال للشركات", "شركة برمجيات ثنائية اللغة عربي انجليزي"] },
            { label: "حسب القطاع", phrases: ["برمجيات للقطاع الصحي", "أنظمة للتجارة والتجزئة", "حلول تقنية للقطاع المالي", "برمجيات لشركات المقاولات", "أنظمة لوجستية وسلاسل إمداد", "منصات تعليمية للمدارس والجامعات"] },
            { label: "حسب السوق", phrases: ["شركة تقنية معلومات في مسقط", "شركة تطوير برمجيات في الخليج", "التحول الرقمي للشركات في السعودية"] },
        ],
    },
    },
    '/industries/construction': {
    en: {
        heading: "The searches that lead contractors here",
        intro: "Construction firms usually arrive after searching for one specific system — bid management, a site app, document control — rather than \"construction technology\". If any of these look familiar, this is the page they lead to.",
        groups: [
            { label: "By system", phrases: ["construction project management software", "bid and tender management system", "document control system for construction projects", "equipment and asset tracking software", "construction ERP for contractors", "BIM document management system"] },
            { label: "By what's breaking", phrases: ["construction daily report app for site engineers", "how to track subcontractor progress", "field reporting app for construction sites", "connect site teams with head office software"] },
            { label: "Local & cost", phrases: ["construction software company in Oman", "custom construction management system cost", "bilingual construction software Arabic English", "construction tech company GCC"] },
        ],
    },
    ar: {
        heading: "ما يكتبه المقاولون في خانة البحث",
        intro: "تصل شركات المقاولات إلى هذه الصفحة غالباً بعد البحث عن نظام محدد: إدارة مناقصات، تطبيق للموقع، أو ضبط للمستندات. هذه أكثر العبارات التي تسبق الوصول إلى هنا.",
        groups: [
            { label: "حسب النظام", phrases: ["برنامج إدارة مشاريع البناء", "نظام إدارة المناقصات والعطاءات", "نظام إدارة مستندات المشاريع الإنشائية", "برنامج حصر وتتبع المعدات", "نظام ERP لشركات المقاولات"] },
            { label: "حسب المشكلة", phrases: ["تطبيق تقارير يومية لمواقع البناء", "متابعة مقاولي الباطن الكترونياً", "ربط موقع العمل بالمكتب الرئيسي", "برنامج مستخلصات المقاولات"] },
            { label: "بحث محلي", phrases: ["شركة برمجة أنظمة مقاولات في عمان", "تكلفة نظام إدارة مشاريع إنشائية", "نظام مقاولات باللغة العربية", "شركة تقنية للمقاولات في الخليج"] },
        ],
    },
    },
    '/industries/ecommerce-retail': {
    en: {
        heading: "If you searched for any of these, you're in the right place",
        intro: "From a first storefront to POS-connected omnichannel retail, these are the searches Gulf merchants type when off-the-shelf platforms stop being enough.",
        groups: [
            { label: "Building the store", phrases: ["ecommerce website development company", "ecommerce PWA development", "product catalog and search development", "Arabic English online store design"] },
            { label: "Running retail", phrases: ["POS system integrated with online store", "retail inventory management system", "order management system for ecommerce", "omnichannel retail platform", "marketplace integration for retailers"] },
            { label: "Costs & comparisons", phrases: ["how much does it cost to build an online store in Saudi Arabia", "online payment gateway integration GCC", "custom ecommerce vs off the shelf platform"] },
        ],
    },
    ar: {
        heading: "عبارات يبحث عنها أصحاب المتاجر",
        intro: "من أول متجر إلكتروني إلى منظومة تجزئة كاملة مرتبطة بنقاط البيع — هذه أكثر العبارات التي يكتبها التجار في الخليج عندما لا تعود المنصات الجاهزة كافية.",
        groups: [
            { label: "إنشاء المتجر", phrases: ["انشاء متجر الكتروني احترافي", "شركة تصميم متاجر الكترونية", "برمجة متجر الكتروني خاص", "تصميم متجر الكتروني عربي انجليزي"] },
            { label: "تشغيل التجزئة", phrases: ["ربط نقاط البيع بالمتجر الالكتروني", "نظام إدارة مخزون للمحلات", "نظام إدارة طلبات للتجارة الالكترونية", "الربط مع منصات التوصيل والأسواق الالكترونية"] },
            { label: "التكلفة والسوق", phrases: ["شركة تجارة الكترونية في عمان", "بوابة دفع الكتروني في السعودية", "افضل شركة لتصميم متجر الكتروني"] },
        ],
    },
    },
    '/industries/education': {
    en: {
        heading: "Searches this page answers",
        intro: "Schools, universities, and training providers search for these when spreadsheets and disconnected tools stop scaling. Every phrase below maps to a system we engineer.",
        groups: [
            { label: "By platform", phrases: ["custom LMS development", "school management system", "student information system development", "virtual classroom platform for schools", "training academy management software"] },
            { label: "By workflow", phrases: ["online enrollment and admissions system", "online exam and assessment platform", "grading and report card system", "parent and teacher portal development"] },
            { label: "Local intent", phrases: ["education software company in Oman", "Arabic learning management system", "e-learning platform development GCC", "custom LMS cost for universities"] },
        ],
    },
    ar: {
        heading: "عمليات البحث التي تجيب عنها هذه الصفحة",
        intro: "تبحث المدارس والجامعات ومراكز التدريب عن هذه العبارات عندما تعجز الجداول والأدوات المتفرقة عن مواكبة النمو. كل عبارة هنا تقابل نظاماً نبنيه فعلاً.",
        groups: [
            { label: "حسب المنصة", phrases: ["تطوير نظام إدارة تعلم LMS", "برنامج إدارة مدرسة متكامل", "نظام معلومات الطلاب", "منصة فصول افتراضية", "برنامج إدارة معهد تدريب"] },
            { label: "حسب العملية", phrases: ["نظام تسجيل وقبول الكتروني", "منصة اختبارات الكترونية", "نظام رصد الدرجات والشهادات", "بوابة أولياء الأمور والمعلمين"] },
            { label: "بحث محلي", phrases: ["شركة برمجيات تعليمية في عمان", "منصة تعليمية باللغة العربية", "تطوير منصة تعليم الكتروني في الخليج", "كم تكلفة تطوير منصة تعليمية"] },
        ],
    },
    },
    '/industries/fintech': {
    en: {
        heading: "What fintech founders and banks search for",
        intro: "Whether you are licensing a wallet in the Gulf or replacing a core ledger, these are the searches that tend to end on this page.",
        groups: [
            { label: "By platform", phrases: ["fintech software development company", "digital wallet app development", "payment platform development", "core banking system development", "lending platform software", "ledger and reconciliation system"] },
            { label: "Trust & compliance", phrases: ["PCI DSS compliant software development", "secure fintech architecture", "open banking API integration", "fintech regulatory sandbox requirements GCC"] },
            { label: "Costs & markets", phrases: ["cost to build a fintech app in Saudi Arabia", "fintech development company Middle East", "payment gateway integration for enterprises", "white label wallet vs custom build"] },
        ],
    },
    ar: {
        heading: "ما يبحث عنه روّاد التقنية المالية والبنوك",
        intro: "سواء كنت تؤسس محفظة رقمية مرخّصة في الخليج أو تستبدل نظاماً مصرفياً قائماً، هذه العبارات هي التي تنتهي عادةً بالوصول إلى هذه الصفحة.",
        groups: [
            { label: "حسب المنصة", phrases: ["شركة تطوير تطبيقات التقنية المالية", "برمجة محفظة الكترونية", "تطوير منصة مدفوعات", "نظام مصرفي أساسي", "نظام إقراض وتمويل رقمي"] },
            { label: "الأمان والامتثال", phrases: ["تطوير أنظمة متوافقة مع PCI DSS", "أمن التطبيقات المالية", "ربط الخدمات المصرفية المفتوحة API", "متطلبات الأمن السيبراني للتطبيقات المالية"] },
            { label: "التكلفة والسوق", phrases: ["كم تكلفة تطوير تطبيق مالي", "شركة تقنية مالية في الخليج", "تطوير حلول دفع في السعودية", "تطوير نظام مدفوعات للشركات"] },
        ],
    },
    },
    '/industries/government-public-sector': {
    en: {
        heading: "Queries this page was built to answer",
        intro: "Public-sector teams search differently — procurement language, accessibility requirements, and citizen-facing outcomes. These are the queries that belong here, across Oman and the wider region.",
        groups: [
            { label: "By system", phrases: ["e-government portal development", "citizen services portal development", "permit and licensing system", "government case management system", "digital identity integration for government"] },
            { label: "Standards & compliance", phrases: ["WCAG accessible government website", "Arabic-first government portal", "secure government software development", "government data residency requirements"] },
            { label: "By market", phrases: ["government website development company in Oman", "public sector digital transformation GCC", "e-services portal development Middle East", "municipal services portal development"] },
        ],
    },
    ar: {
        heading: "استفسارات كُتبت هذه الصفحة للإجابة عنها",
        intro: "تبحث الجهات الحكومية بلغة مختلفة: لغة المناقصات ومتطلبات الوصول وخدمة المواطن. جمعنا هنا العبارات الأقرب إلى ما تكتبه فرق القطاع العام في عُمان والمنطقة.",
        groups: [
            { label: "حسب النظام", phrases: ["تطوير بوابة حكومية الكترونية", "بوابة خدمات المواطنين", "نظام تصاريح وتراخيص الكتروني", "نظام إدارة المعاملات الحكومية", "الربط مع الهوية الرقمية"] },
            { label: "المعايير والامتثال", phrases: ["موقع حكومي متوافق مع معايير الوصول", "بوابة حكومية باللغة العربية أولاً", "أمن الأنظمة الحكومية", "حماية بيانات المستخدمين في الأنظمة الحكومية"] },
            { label: "حسب السوق", phrases: ["شركة تطوير أنظمة حكومية في عمان", "التحول الرقمي للقطاع الحكومي في الخليج", "تطوير الخدمات الالكترونية الحكومية", "بوابة خدمات بلدية الكترونية"] },
        ],
    },
    },
    '/industries/healthcare': {
    en: {
        heading: "What clinics and hospitals search for",
        intro: "Most healthcare providers find this page after searching for one broken step in the patient journey — booking, follow-up, or the website itself.",
        groups: [
            { label: "Patient journey", phrases: ["online appointment booking system for clinics", "patient portal development", "patient follow-up and reminder system", "telemedicine platform development"] },
            { label: "By facility", phrases: ["medical website design", "clinic management software", "dental clinic booking system", "medical center website Arabic English"] },
            { label: "Local intent", phrases: ["healthcare software company in Oman", "clinic website design GCC", "medical app development Saudi Arabia", "bilingual patient booking system"] },
        ],
    },
    ar: {
        heading: "ما تبحث عنه العيادات والمستشفيات",
        intro: "يصل معظم مقدمي الرعاية الصحية إلى هذه الصفحة بعد البحث عن خطوة واحدة متعثرة في رحلة المريض: الحجز، أو المتابعة، أو الموقع نفسه.",
        groups: [
            { label: "رحلة المريض", phrases: ["بوابة المريض الالكترونية", "نظام تذكير المرضى بالمواعيد", "تطوير منصة استشارات طبية عن بعد"] },
            { label: "حسب المنشأة", phrases: ["تصميم موقع مستشفى", "برنامج إدارة عيادة", "نظام حجز لعيادة أسنان"] },
            { label: "بحث محلي", phrases: ["شركة برمجيات طبية في عمان", "تصميم مواقع طبية في الخليج", "تطوير تطبيق طبي في السعودية", "نظام مواعيد ثنائي اللغة للمراكز الطبية"] },
        ],
    },
    },
    '/industries/legal-firms': {
    en: {
        heading: "What law firms search for before they call us",
        intro: "Confidentiality, conflicts, and billable hours shape how legal teams search. These queries — in either language — are the ones this page was written for.",
        groups: [
            { label: "Practice systems", phrases: ["legal case management software", "law firm practice management system", "matter management software", "legal billing and timekeeping software", "conflict of interest check software"] },
            { label: "Clients & documents", phrases: ["secure client portal for law firms", "legal document automation", "e-signature integration for law firms", "contract management system for legal teams"] },
            { label: "Local & bilingual", phrases: ["law firm website design Arabic English", "legal software company GCC", "case management system in Arabic", "secure legal software development"] },
        ],
    },
    ar: {
        heading: "ما تبحث عنه مكاتب المحاماة قبل التواصل معنا",
        intro: "السرية وتعارض المصالح واحتساب الأتعاب بالساعة تحكم طريقة بحث المكاتب القانونية. هذه العبارات هي التي كُتبت هذه الصفحة من أجلها.",
        groups: [
            { label: "أنظمة العمل القانوني", phrases: ["برنامج إدارة قضايا للمحامين", "نظام إدارة مكتب محاماة", "برنامج متابعة الجلسات والقضايا", "برنامج فوترة وحساب أتعاب المحاماة", "نظام فحص تعارض المصالح"] },
            { label: "العملاء والمستندات", phrases: ["بوابة عملاء آمنة لمكتب محاماة", "أتمتة الصياغة القانونية والعقود", "التوقيع الالكتروني للمستندات القانونية", "نظام إدارة العقود للفرق القانونية"] },
            { label: "بحث محلي وثنائي اللغة", phrases: ["تصميم موقع مكتب محاماة", "نظام إدارة قضايا باللغة العربية", "شركة برمجيات قانونية في الخليج", "برنامج محاماة يدعم اللغتين"] },
        ],
    },
    },
    '/industries/logistics-supply-chain': {
    en: {
        heading: "The searches that bring logistics teams here",
        intro: "Freight forwarders, 3PLs, and in-house supply-chain teams across the Gulf tend to search by acronym — TMS, WMS, POD — or by the pain of a shipment nobody can see. Both roads lead here.",
        groups: [
            { label: "By system", phrases: ["transport management system TMS", "warehouse management system WMS", "fleet management software", "shipment tracking system development", "control tower dashboard supply chain", "order and inventory management system"] },
            { label: "By pain point", phrases: ["real time shipment visibility software", "route optimization software for deliveries", "proof of delivery app", "last mile delivery management system"] },
            { label: "Local & cost", phrases: ["logistics software development company GCC", "custom TMS development cost", "logistics tracking system in Oman", "freight forwarding software Middle East"] },
        ],
    },
    ar: {
        heading: "عمليات البحث التي تقود شركات الشحن إلى هنا",
        intro: "شركات الشحن والتخليص والنقل في الخليج تبحث غالباً باسم النظام — إدارة النقل، إدارة المستودعات — أو من واقع شحنة لا يراها أحد. كلا الطريقين يوصل إلى هذه الصفحة.",
        groups: [
            { label: "حسب النظام", phrases: ["نظام إدارة النقل TMS", "نظام إدارة المستودعات WMS", "برنامج إدارة أسطول الشاحنات", "نظام تتبع الشحنات", "نظام إدارة الطلبات والمخزون"] },
            { label: "حسب المشكلة", phrases: ["تتبع الشحنات لحظياً", "برنامج تحسين مسارات التوصيل", "تطبيق إثبات التسليم للسائقين", "نظام إدارة التوصيل للميل الأخير"] },
            { label: "بحث محلي", phrases: ["شركة برمجة أنظمة لوجستية في الخليج", "تكلفة تطوير نظام شحن مخصص", "نظام تتبع شحنات في عمان", "برنامج لشركات الشحن والتخليص"] },
        ],
    },
    },
    '/industries/professional-services': {
    en: {
        heading: "What firms like yours search for",
        intro: "Consultancies, agencies, and advisory firms search for these when client work outgrows email threads and shared drives.",
        groups: [
            { label: "Client-facing", phrases: ["client portal software for consulting firms", "engagement management system", "proposal and quote management software", "CRM for professional services firms"] },
            { label: "Delivery & billing", phrases: ["project management system for agencies", "resource planning software for consultancies", "time tracking and billing software", "knowledge base software for firms"] },
            { label: "Local intent", phrases: ["business systems development company in Oman", "custom software for consulting firm GCC", "bilingual client portal Arabic English", "cost of custom client portal"] },
        ],
    },
    ar: {
        heading: "ما تبحث عنه الشركات المهنية والاستشارية",
        intro: "تبحث شركات الاستشارات والوكالات والمكاتب المهنية عن هذه العبارات عندما يتجاوز حجم عملها رسائل البريد والملفات المشتركة.",
        groups: [
            { label: "واجهة العميل", phrases: ["بوابة عملاء لشركة استشارات", "نظام إدارة علاقات العملاء للشركات المهنية", "برنامج إعداد العروض والمقترحات", "بوابة متابعة المشاريع للعملاء"] },
            { label: "التنفيذ والفوترة", phrases: ["نظام إدارة مشاريع للشركات الاستشارية", "برنامج تخطيط موارد الفرق", "برنامج تتبع ساعات العمل والفوترة", "نظام إدارة معرفة داخلي"] },
            { label: "بحث محلي", phrases: ["شركة تطوير أنظمة أعمال في عمان", "نظام مخصص لشركة استشارية في الخليج", "بوابة عملاء ثنائية اللغة", "كم تكلفة تطوير بوابة عملاء"] },
        ],
    },
    },
    '/industries/real-estate': {
    en: {
        heading: "Searches this page answers",
        intro: "Developers, brokerages, and property managers across the Gulf reach this page from very different starting points — some need a listing portal, others a tenant app or a full PropTech build. If your search looked like any of these, you are reading the right page.",
        groups: [
            { label: "By what you need built", phrases: ["real estate website design with property listings", "property listing portal development", "real estate CRM for brokers", "tenant portal software for property management", "custom proptech development company", "virtual tour integration for real estate website"] },
            { label: "By market & intent", phrases: ["real estate app development company in UAE", "property portal development Saudi Arabia", "bilingual Arabic English real estate website", "real estate software company in Oman", "how much does a property listing website cost"] },
            { label: "Features & integrations", phrases: ["map search for property website", "real estate lead capture and CRM integration", "property booking and viewing scheduling system", "MLS style listing management system"] },
        ],
    },
    ar: {
        heading: "عمليات البحث التي تقود إلى هذه الصفحة",
        intro: "سواء كنت مطوراً عقارياً أو وسيطاً أو شركة إدارة أملاك في الخليج، فالغالب أنك وصلت إلى هنا بعد بحث يشبه أحد هذه الأسئلة — وهذه الصفحة كُتبت لتجيب عنها.",
        groups: [
            { label: "حسب ما تحتاجه", phrases: ["تصميم موقع عقارات", "برنامج ادارة عقارات", "انشاء منصة عقارية مثل البوابات الكبرى", "نظام CRM للوسطاء العقاريين", "تطبيق عقارات للايجار والبيع", "بوابة الكترونية للمستأجرين"] },
            { label: "حسب السوق", phrases: ["شركة تصميم مواقع عقارية في السعودية", "تطوير تطبيق عقاري في الامارات", "شركة برمجة انظمة عقارية في عمان", "موقع عقارات ثنائي اللغة عربي انجليزي"] },
            { label: "التكاليف والمقارنات", phrases: ["كم سعر برنامج ادارة الاملاك", "افضل نظام لادارة العقارات والايجارات", "الفرق بين البوابة العقارية والموقع العادي"] },
        ],
    },
    },
    '/industries/restaurants': {
    en: {
        heading: "If you searched for any of these, you are in the right place",
        intro: "Restaurant owners rarely search for one thing — a menu today, online ordering tomorrow, kitchen screens next quarter. This page covers the whole connected journey, and these are the searches it was built to answer.",
        groups: [
            { label: "Ordering & menus", phrases: ["restaurant website design with online ordering", "QR code menu system for restaurants", "online ordering system without commission fees", "how much does an online ordering system cost in Saudi Arabia", "digital menu with Arabic and English"] },
            { label: "Operations & kitchen", phrases: ["kitchen display system for restaurants", "restaurant management software for multiple branches", "table reservation system for restaurants", "POS integration for restaurant website"] },
            { label: "Guests & loyalty", phrases: ["restaurant loyalty program app", "customer feedback system for restaurants", "restaurant app development company in the Gulf", "WhatsApp ordering for restaurants"] },
        ],
    },
    ar: {
        heading: "ما يبحث عنه أصحاب المطاعم عادةً",
        intro: "من قائمة الطعام الرقمية إلى الطلب أونلاين وشاشات المطبخ وبرامج الولاء — هذه أكثر عمليات البحث التي تقود أصحاب المطاعم في الخليج إلى هذه الصفحة.",
        groups: [
            { label: "الطلب والقوائم", phrases: ["نظام طلبات اون لاين للمطاعم", "منيو الكتروني بالباركود", "تطبيق توصيل خاص بالمطعم بدون عمولة", "كم تكلفة تطبيق مطعم"] },
            { label: "التشغيل والفروع", phrases: ["نظام ادارة مطاعم متكامل", "شاشة مطبخ الكترونية للمطاعم", "نظام حجز طاولات للمطاعم", "ربط نظام الكاشير بالموقع الالكتروني"] },
            { label: "الضيوف والولاء", phrases: ["برنامج نقاط ولاء للمطاعم", "نظام تقييم رضا الزبائن للمطاعم", "استقبال طلبات المطعم عبر الواتساب", "شركة تصميم تطبيقات مطاعم في السعودية"] },
        ],
    },
    },
    '/industries/travel-hospitality': {
    en: {
        heading: "What travel and hospitality teams search for when they need this",
        intro: "Hotels, tour operators, and travel agencies across the GCC and Türkiye arrive here searching for very specific systems — booking engines, PMS integrations, guest apps. These are the queries this page exists to answer.",
        groups: [
            { label: "Booking & reservations", phrases: ["hotel booking engine for own website", "commission-free direct booking system for hotels", "tour booking software for travel agencies", "travel package management system", "how much does a hotel booking website cost"] },
            { label: "Operations & integrations", phrases: ["channel manager integration for hotel website", "property management system for small hotels", "itinerary builder software for tour operators", "hotel website design company in the Gulf"] },
            { label: "Guest experience", phrases: ["guest portal app for hotels", "bilingual Arabic English hotel website", "mobile check-in app for hotels", "guest messaging and upsell platform"] },
        ],
    },
    ar: {
        heading: "عمليات بحث تنتهي عند هذه الصفحة",
        intro: "الفنادق ومنظمو الرحلات ووكالات السفر في الخليج وتركيا يبحثون عن أنظمة محددة جداً: محرك حجز، ربط مع مديري القنوات، تطبيق للنزلاء. إن كان بحثك يشبه ما يلي فقد وجدت ما تبحث عنه.",
        groups: [
            { label: "الحجوزات", phrases: ["محرك حجز فندقي للموقع الخاص", "نظام حجز مباشر للفنادق بدون عمولة", "برنامج حجز رحلات سياحية", "نظام ادارة الباقات السياحية", "كم تكلفة موقع حجز فندقي"] },
            { label: "التشغيل والتكاملات", phrases: ["ربط مدير القنوات بموقع الفندق", "نظام ادارة فندق صغير", "برنامج تصميم برامج سياحية للوكالات", "شركة تصميم مواقع فنادق في الخليج"] },
            { label: "تجربة النزيل", phrases: ["تطبيق خدمات النزلاء في الفندق", "موقع فندق عربي انجليزي", "تسجيل وصول ذاتي للفنادق", "نظام تواصل مع الضيوف قبل الاقامة"] },
        ],
    },
    },
}
