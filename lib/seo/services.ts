import type { LocaleKey, LocalizedText } from './industries'

export type ServiceDetail = {
    slug: string
    categorySlug: string
    name: LocalizedText
    description: LocalizedText
    features: string[]
    outcomes: string[]
    technologies: string[]
    faqs: Array<{
        question: LocalizedText
        answer: LocalizedText
    }>
}

export type ServiceCategory = {
    slug: string
    name: LocalizedText
    description: LocalizedText
    packageNames: string[]
    services: ServiceDetail[]
}

const t = (en: string, ar: string): LocalizedText => ({ en, ar })

const categoryCopy: Record<string, { name: LocalizedText; description: LocalizedText; packageNames: string[] }> = {
    'digital-presence': {
        name: t('Digital Presence', 'الحضور الرقمي'),
        description: t(
            'Websites, stores, content, and maintenance for companies that need a credible online presence.',
            'مواقع ومتاجر ومحتوى وصيانة للشركات التي تحتاج حضوراً رقمياً موثوقاً.'),
        packageNames: ['Basic Web Presence', 'E-commerce Pro', 'Enterprise Digital Hub'],
    },
    'interactive-web-applications': {
        name: t('Interactive Web Applications', 'تطبيقات ويب تفاعلية'),
        description: t(
            'Custom portals, dashboards, SaaS MVPs, booking tools, and mobile-ready application experiences.',
            'بوابات ولوحات وMVP SaaS وأدوات حجز وتجارب تطبيقات جاهزة للجوال.'),
        packageNames: ['MVP Launchpad', 'Growth Accelerator', 'Enterprise Custom App'],
    },
    'mobile-app-development': {
        name: t('Mobile App Development', 'تطوير تطبيقات الجوال'),
        description: t(
            'iOS, Android, cross-platform, PWA, customer, staff, booking, delivery, and app-backend services for mobile-first businesses.',
            'تطبيقات iOS وAndroid ومتعددة المنصات وPWA وتطبيقات عملاء وموظفين وحجز وتوصيل وخلفيات API للشركات التي تعمل من الجوال.'),
        packageNames: ['Mobile App Starter', 'Cross-Platform Launch', 'App Ecosystem'],
    },
    'business-systems-development': {
        name: t('Business Systems Development', 'تطوير أنظمة الأعمال'),
        description: t(
            'CRM, ERP, workflow automation, inventory, sales, HR, finance, and API systems built around operations.',
            'أنظمة CRM وERP وأتمتة ومخزون ومبيعات وموارد بشرية ومالية وAPI مبنية حول العمليات.'),
        packageNames: ['Core Business Automation', 'Integrated Enterprise', 'Custom Ecosystem'],
    },
    'cloud-infrastructure': {
        name: t('Cloud & Infrastructure', 'السحابة والبنية التحتية'),
        description: t(
            'Hosting, migration, deployment, database, backup, security, performance, and scalable cloud architecture.',
            'استضافة وترحيل ونشر وقواعد بيانات ونسخ احتياطي وأمان وأداء وبنية سحابية قابلة للتوسع.'),
        packageNames: ['Cloud Foundation', 'Optimized Cloud', 'Enterprise Cloud'],
    },
    'ai-powered-solutions': {
        name: t('AI-Powered Solutions', 'حلول مدعومة بالذكاء الاصطناعي'),
        description: t(
            'AI assistants, automation, chatbots, content systems, reporting dashboards, NLP, and machine learning support.',
            'مساعدون وأتمتة وروبوتات محادثة وأنظمة محتوى ولوحات تقارير وNLP ودعم تعلم آلي.'),
        packageNames: ['AI Starter', 'Intelligent Automation', 'Custom AI/ML'],
    },
    'digital-growth-support': {
        name: t('Digital Growth Support', 'دعم النمو الرقمي'),
        description: t(
            'SEO, social, paid landing pages, content systems, lead generation, CRO, email automation, and brand support.',
            'SEO وتواصل اجتماعي وصفحات إعلانات وأنظمة محتوى وتوليد عملاء وCRO وأتمتة بريد ودعم هوية.'),
        packageNames: ['SEO Kickstart', 'Growth Engine', 'Full-Stack Digital Marketing'],
    },
}

const serviceGroups: Record<string, Array<[string, string]>> = {
    'digital-presence': [
        ['business-website-development', 'Business Website Development'],
        ['landing-page-design', 'Landing Page Design'],
        ['corporate-website-design', 'Corporate Website Design'],
        ['ecommerce-website-development', 'E-commerce Website Development'],
        ['portfolio-websites', 'Portfolio Websites'],
        ['real-estate-website-development', 'Real Estate Website Development'],
        ['restaurant-website-development', 'Restaurant Website Development'],
        ['educational-website-development', 'Educational Website Development'],
        ['website-redesign', 'Website Redesign'],
        ['website-maintenance', 'Website Maintenance'],
    ],
    'interactive-web-applications': [
        ['custom-web-application-development', 'Custom Web Application Development'],
        ['client-portals', 'Client Portals'],
        ['admin-dashboards', 'Admin Dashboards'],
        ['booking-platforms', 'Booking Platforms'],
        ['internal-business-tools', 'Internal Business Tools'],
        ['saas-mvp-development', 'SaaS MVP Development'],
        ['progressive-web-app-development', 'Progressive Web App Development'],
        ['mobile-app-development', 'Mobile App Development'],
    ],
    'mobile-app-development': [
        ['ios-app-development', 'iOS App Development'],
        ['android-app-development', 'Android App Development'],
        ['cross-platform-app-development', 'Cross-Platform App Development'],
        ['flutter-app-development', 'Flutter App Development'],
        ['react-native-app-development', 'React Native App Development'],
        ['mvp-app-development', 'MVP App Development'],
        ['business-mobile-app-development', 'Business Mobile App Development'],
        ['customer-app-development', 'Customer App Development'],
        ['booking-app-development', 'Booking App Development'],
        ['delivery-order-app-development', 'Delivery & Order App Development'],
        ['app-backend-api-development', 'App Backend & API Development'],
        ['app-store-launch-support', 'App Store Launch Support'],
        ['mobile-app-maintenance', 'Mobile App Maintenance'],
    ],
    'business-systems-development': [
        ['crm-development', 'CRM Development'],
        ['inventory-management-systems', 'Inventory Management Systems'],
        ['sales-management-systems', 'Sales Management Systems'],
        ['order-management-systems', 'Order Management Systems'],
        ['hr-management-systems', 'HR Management Systems'],
        ['accounting-system-integration', 'Accounting System Integration'],
        ['workflow-automation', 'Workflow Automation'],
        ['business-process-automation', 'Business Process Automation'],
        ['supply-chain-management-systems', 'Supply Chain Management Systems'],
        ['custom-api-development', 'Custom API Development & Integration'],
    ],
    'cloud-infrastructure': [
        ['cloud-hosting-setup', 'Cloud Hosting Setup'],
        ['cloud-migration', 'Cloud Migration'],
        ['server-deployment', 'Server Deployment'],
        ['devops-support', 'DevOps Support'],
        ['database-setup', 'Database Setup'],
        ['backup-and-security', 'Backup and Security'],
        ['performance-optimization', 'Performance Optimization'],
        ['scalable-cloud-architecture', 'Scalable Cloud Architecture'],
        ['hybrid-cloud-solutions', 'Hybrid Cloud Solutions'],
        ['cloud-cost-optimization', 'Cloud Cost Optimization'],
    ],
    'ai-powered-solutions': [
        ['ai-chatbots', 'AI Chatbots'],
        ['ai-business-assistants', 'AI Business Assistants'],
        ['ai-automation', 'AI Automation'],
        ['ai-content-systems', 'AI Content Systems'],
        ['ai-crm-assistants', 'AI CRM Assistants'],
        ['ai-website-analyzer', 'AI Website Analyzer'],
        ['ai-reporting-dashboards', 'AI Reporting Dashboards'],
        ['ai-powered-customer-support', 'AI-Powered Customer Support'],
        ['machine-learning-model-development', 'Machine Learning Model Development'],
        ['natural-language-processing-solutions', 'Natural Language Processing Solutions'],
    ],
    'digital-growth-support': [
        ['social-media-management', 'Social Media Management'],
        ['paid-ads-landing-pages', 'Paid Ads Landing Pages'],
        ['brand-identity', 'Brand Identity'],
        ['seo-optimization', 'SEO Optimization'],
        ['content-systems', 'Content Systems'],
        ['lead-generation-systems', 'Lead Generation Systems'],
        ['conversion-rate-optimization', 'Conversion Rate Optimization'],
        ['email-marketing-automation', 'Email Marketing Automation'],
    ],
}

const arabicServiceNames: Record<string, string> = {
    'business-website-development': 'تطوير مواقع الأعمال',
    'landing-page-design': 'تصميم صفحات الهبوط',
    'corporate-website-design': 'تصميم المواقع المؤسسية',
    'ecommerce-website-development': 'تطوير المتاجر الإلكترونية',
    'portfolio-websites': 'مواقع الأعمال والمعارض',
    'real-estate-website-development': 'تطوير المواقع العقارية',
    'restaurant-website-development': 'تطوير مواقع المطاعم',
    'educational-website-development': 'تطوير المواقع التعليمية',
    'website-redesign': 'إعادة تصميم المواقع',
    'website-maintenance': 'صيانة المواقع',
    'custom-web-application-development': 'تطوير تطبيقات ويب مخصصة',
    'client-portals': 'بوابات العملاء',
    'admin-dashboards': 'لوحات الإدارة',
    'booking-platforms': 'منصات الحجز',
    'internal-business-tools': 'أدوات أعمال داخلية',
    'saas-mvp-development': 'تطوير MVP لمنصات SaaS',
    'progressive-web-app-development': 'تطوير تطبيقات ويب تقدمية',
    'mobile-app-development': 'تطوير تطبيقات الجوال',
    'ios-app-development': 'تطوير تطبيقات iOS',
    'android-app-development': 'تطوير تطبيقات أندرويد',
    'cross-platform-app-development': 'تطوير تطبيقات متعددة المنصات',
    'flutter-app-development': 'تطوير تطبيقات Flutter',
    'react-native-app-development': 'تطوير تطبيقات React Native',
    'mvp-app-development': 'تطوير تطبيقات MVP',
    'business-mobile-app-development': 'تطوير تطبيقات الأعمال للجوال',
    'customer-app-development': 'تطوير تطبيقات العملاء',
    'booking-app-development': 'تطوير تطبيقات الحجز',
    'delivery-order-app-development': 'تطوير تطبيقات الطلبات والتوصيل',
    'app-backend-api-development': 'تطوير خلفيات وواجهات API للتطبيقات',
    'app-store-launch-support': 'دعم إطلاق التطبيقات في المتاجر',
    'mobile-app-maintenance': 'صيانة تطبيقات الجوال',
    'crm-development': 'تطوير أنظمة CRM',
    'inventory-management-systems': 'أنظمة إدارة المخزون',
    'sales-management-systems': 'أنظمة إدارة المبيعات',
    'order-management-systems': 'أنظمة إدارة الطلبات',
    'hr-management-systems': 'أنظمة إدارة الموارد البشرية',
    'accounting-system-integration': 'تكامل أنظمة المحاسبة',
    'workflow-automation': 'أتمتة سير العمل',
    'business-process-automation': 'أتمتة عمليات الأعمال',
    'supply-chain-management-systems': 'أنظمة إدارة سلاسل الإمداد',
    'custom-api-development': 'تطوير وتكامل واجهات API',
    'cloud-hosting-setup': 'إعداد الاستضافة السحابية',
    'cloud-migration': 'الترحيل إلى السحابة',
    'server-deployment': 'نشر الخوادم',
    'devops-support': 'دعم DevOps',
    'database-setup': 'إعداد قواعد البيانات',
    'backup-and-security': 'النسخ الاحتياطي والأمان',
    'performance-optimization': 'تحسين الأداء',
    'scalable-cloud-architecture': 'بنية سحابية قابلة للتوسع',
    'hybrid-cloud-solutions': 'حلول السحابة الهجينة',
    'cloud-cost-optimization': 'تحسين تكاليف السحابة',
    'ai-chatbots': 'روبوتات محادثة بالذكاء الاصطناعي',
    'ai-business-assistants': 'مساعدو أعمال بالذكاء الاصطناعي',
    'ai-automation': 'أتمتة بالذكاء الاصطناعي',
    'ai-content-systems': 'أنظمة محتوى بالذكاء الاصطناعي',
    'ai-crm-assistants': 'مساعدو CRM بالذكاء الاصطناعي',
    'ai-website-analyzer': 'محلل مواقع بالذكاء الاصطناعي',
    'ai-reporting-dashboards': 'لوحات تقارير بالذكاء الاصطناعي',
    'ai-powered-customer-support': 'دعم عملاء مدعوم بالذكاء الاصطناعي',
    'machine-learning-model-development': 'تطوير نماذج تعلم آلي',
    'natural-language-processing-solutions': 'حلول معالجة اللغة الطبيعية',
    'social-media-management': 'إدارة وسائل التواصل الاجتماعي',
    'paid-ads-landing-pages': 'صفحات هبوط للإعلانات المدفوعة',
    'brand-identity': 'الهوية البصرية',
    'seo-optimization': 'تحسين محركات البحث',
    'content-systems': 'أنظمة المحتوى',
    'lead-generation-systems': 'أنظمة توليد العملاء المحتملين',
    'conversion-rate-optimization': 'تحسين معدل التحويل',
    'email-marketing-automation': 'أتمتة التسويق بالبريد الإلكتروني',
}

function makeService(categorySlug: string, slug: string, englishName: string): ServiceDetail {
    const category = categoryCopy[categorySlug]
    const arabicName = arabicServiceNames[slug] || englishName
    const isMobileAppService = categorySlug === 'mobile-app-development'

    const defaultFeatures = isMobileAppService
        ? [
            'Product discovery, app flow, and technical scope before build',
            'Arabic and English mobile UX with RTL-ready screens',
            'Secure authentication, API connection, and cloud-ready backend',
            'App store, analytics, documentation, and launch handoff',
        ]
        : [
            'Discovery, scope, and fixed proposal before build',
            'Arabic and English content structure with RTL-ready interfaces',
            'Responsive user experience across desktop and mobile',
            'Launch support, analytics handoff, and documentation',
        ]

    const defaultOutcomes = isMobileAppService
        ? [
            'A clearer mobile product path',
            'Better customer or staff adoption',
            'Connected app, dashboard, and data flow',
            'A maintainable mobile system your team owns',
        ]
        : [
            'Clearer buyer journey',
            'Less manual follow-up',
            'Better regional search visibility',
            'A maintainable system your team owns',
        ]

    const defaultTechnologies = isMobileAppService
        ? ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Next.js', 'PostgreSQL', 'Firebase', 'Vercel']
        : ['Next.js', 'React', 'Payload CMS', 'PostgreSQL', 'Cloudflare', 'Vercel']

    return {
        slug,
        categorySlug,
        name: t(englishName, arabicName),
        description: t(
            isMobileAppService
                ? `${englishName} from CloudTopia gives companies a premium mobile product path with app UX, backend architecture, Arabic-first experience, integrations, launch support, and long-term ownership.`
                : `${englishName} from CloudTopia gives growing teams a structured, multilingual, ownership-first solution with clear scope, practical delivery, and long-term support.`,
            isMobileAppService
                ? `خدمة ${arabicName} من كلاود توبيا تمنح الشركات مسار تطبيق جوال احترافي يشمل تجربة المستخدم، بنية الخلفية، دعم العربية، التكاملات، الإطلاق، وملكية طويلة الأمد.`
                : `خدمة ${arabicName} من كلاود توبيا تمنح الفرق النامية حلاً منظماً متعدد اللغات مع ملكية واضحة ونطاق محدد ودعم طويل الأمد.`),
        features: defaultFeatures,
        outcomes: defaultOutcomes,
        technologies: defaultTechnologies,
        faqs: [
            {
                question: t(`How does ${englishName} start?`, `كيف تبدأ خدمة ${arabicName}؟`),
                answer: t(
                    isMobileAppService
                        ? 'We start with the app idea, target users, screens, backend needs, integrations, and launch path, then provide a written scope before production begins.'
                        : 'We start with discovery, define scope and priorities, then give you a written fixed proposal before production work begins.',
                    isMobileAppService
                        ? 'نبدأ بفكرة التطبيق، المستخدمين المستهدفين، الشاشات، احتياجات الخلفية، التكاملات، ومسار الإطلاق، ثم نقدم نطاقاً مكتوباً قبل التنفيذ.'
                        : 'نبدأ بالاكتشاف، نحدد النطاق والأولويات، ثم نقدم عرضاً مكتوباً ثابتاً قبل بدء التنفيذ.'),
            },
            {
                question: t(`What business problem does ${englishName} solve?`, `ما المشكلة التجارية التي تحلها خدمة ${arabicName}؟`),
                answer: t(
                    isMobileAppService
                        ? `${englishName} helps teams move a mobile idea into a usable product with clear screens, connected data, secure access, and a launch path that does not depend on scattered tools.`
                        : `${englishName} helps teams replace unclear digital journeys, manual follow-up, disconnected tools, or weak conversion paths with a structured solution your company can operate.`,
                    isMobileAppService
                        ? `تساعد خدمة ${arabicName} الفرق على تحويل فكرة التطبيق إلى منتج قابل للاستخدام عبر شاشات واضحة وبيانات مترابطة وصلاحيات آمنة ومسار إطلاق منظم.`
                        : `تساعد خدمة ${arabicName} الفرق على استبدال الرحلات الرقمية غير الواضحة والمتابعة اليدوية والأدوات المتفرقة بحل منظم يمكن للشركة تشغيله.`),
            },
            {
                question: t(`Can ${englishName} be combined with other services?`, `هل يمكن دمج ${arabicName} مع خدمات أخرى؟`),
                answer: t(
                    `Yes. ${category.name.en} services are modular, so we can combine this with related services without forcing a bloated package.`,
                    `نعم. خدمات ${category.name.ar} معيارية، لذلك يمكن دمج هذه الخدمة مع خدمات مرتبطة دون فرض حزمة ضخمة.`),
            },
            {
                question: t(`Can ${englishName} support Arabic and English?`, `هل تدعم خدمة ${arabicName} العربية والإنجليزية؟`),
                answer: t(
                    'Yes. CloudTopia plans Arabic and English content, RTL-ready interfaces, localized labels, and clear handoff notes so both languages work as first-class experiences.',
                    'نعم. تخطط كلاود توبيا للمحتوى العربي والإنجليزي، وواجهات جاهزة لاتجاه RTL، وتسميات محلية، وملاحظات تسليم واضحة حتى تعمل اللغتان كتجربة أساسية.'),
            },
            {
                question: t(`Which technologies can power ${englishName}?`, `ما التقنيات التي يمكن استخدامها في ${arabicName}؟`),
                answer: t(
                    `Technology depends on the scope, but common choices include ${defaultTechnologies.slice(0, 5).join(', ')} with integrations for CMS, CRM, analytics, cloud hosting, or APIs when needed.`,
                    `تعتمد التقنية على النطاق، لكن الخيارات الشائعة تشمل ${defaultTechnologies.slice(0, 5).join('، ')} مع تكاملات CMS أو CRM أو التحليلات أو الاستضافة السحابية أو API عند الحاجة.`),
            },
            {
                question: t(`How long does ${englishName} take?`, `كم تستغرق خدمة ${arabicName}؟`),
                answer: t(
                    isMobileAppService
                        ? 'Focused app MVPs can start in a few weeks, while larger mobile ecosystems with backend, dashboard, payments, or approvals need a phased plan after discovery.'
                        : 'Small focused scopes can launch in a few weeks, while larger systems, integrations, or multilingual content plans are scheduled in phases after discovery.',
                    isMobileAppService
                        ? 'يمكن أن تبدأ تطبيقات MVP المركزة خلال أسابيع قليلة، أما منظومات الجوال الأكبر مع خلفية ولوحة دفع أو موافقات فتحتاج خطة مرحلية بعد الاكتشاف.'
                        : 'يمكن إطلاق النطاقات الصغيرة خلال أسابيع قليلة، أما الأنظمة الأكبر أو التكاملات أو المحتوى متعدد اللغات فتُجدول على مراحل بعد الاكتشاف.'),
            },
            {
                question: t(`What do we own after ${englishName} is delivered?`, `ماذا نملك بعد تسليم خدمة ${arabicName}؟`),
                answer: t(
                    'You receive the agreed production assets, accounts, documentation, access handoff, and operating notes so your team is not locked into unclear ownership.',
                    'تحصلون على أصول الإنتاج المتفق عليها، الحسابات، التوثيق، تسليم الصلاحيات، وملاحظات التشغيل حتى لا يبقى الفريق عالقاً في ملكية غير واضحة.'),
            },
        ],
    }
}

export const serviceCategories: ServiceCategory[] = Object.entries(serviceGroups).map(([categorySlug, services]) => ({
    slug: categorySlug,
    ...categoryCopy[categorySlug],
    services: services.map(([slug, englishName]) => makeService(categorySlug, slug, englishName)),
}))

export const servicesBySlug: Record<string, ServiceDetail> = Object.fromEntries(
    serviceCategories.flatMap((category) => category.services.map((service) => [service.slug, service])),
)

export const serviceDetailSlugs = Object.keys(servicesBySlug)

export function getService(slug: string): ServiceDetail | null {
    return servicesBySlug[slug] || null
}

export function getServiceCategory(slug: string): ServiceCategory | null {
    return serviceCategories.find((category) => category.slug === slug) || null
}

export function localizedServiceValue(value: LocalizedText, locale: string): string {
    return value[(locale as LocaleKey) || 'en'] || value.en
}

const arabicPackageNames: Record<string, string> = {
    'Basic Web Presence': 'حضور ويب أساسي',
    'E-commerce Pro': 'متجر إلكتروني احترافي',
    'Enterprise Digital Hub': 'مركز رقمي مؤسسي',
    'MVP Launchpad': 'إطلاق MVP',
    'Growth Accelerator': 'تسريع النمو',
    'Enterprise Custom App': 'تطبيق مؤسسي مخصص',
    'Mobile App Starter': 'بداية تطبيق جوال',
    'Cross-Platform Launch': 'إطلاق متعدد المنصات',
    'App Ecosystem': 'منظومة تطبيقات',
    'Core Business Automation': 'أتمتة أعمال أساسية',
    'Integrated Enterprise': 'تكامل مؤسسي',
    'Custom Ecosystem': 'منظومة مخصصة',
    'Cloud Foundation': 'أساس سحابي',
    'Optimized Cloud': 'سحابة محسّنة',
    'Enterprise Cloud': 'سحابة مؤسسية',
    'AI Starter': 'بداية الذكاء الاصطناعي',
    'Intelligent Automation': 'أتمتة ذكية',
    'Custom AI/ML': 'ذكاء اصطناعي وتعلم آلي مخصص',
    'SEO Kickstart': 'انطلاقة SEO',
    'Growth Engine': 'محرك نمو',
    'Full-Stack Digital Marketing': 'تسويق رقمي متكامل',
}

const arabicFeatureSet = [
    'اكتشاف وتحديد نطاق وعرض ثابت قبل بدء التنفيذ',
    'بنية محتوى عربية وإنجليزية مع واجهات جاهزة لاتجاه RTL',
    'تجربة متجاوبة على أجهزة سطح المكتب والجوال',
    'دعم الإطلاق، تسليم التحليلات، وتوثيق واضح للفريق',
]

const arabicOutcomeSet = [
    'رحلة شراء أوضح للعملاء',
    'تقليل المتابعة اليدوية',
    'ظهور أفضل في البحث الإقليمي',
    'نظام قابل للصيانة تملكه شركتك',
]

export function localizedPackageName(packageName: string, locale: string): string {
    return locale === 'ar' ? arabicPackageNames[packageName] || packageName : packageName
}

export function localizedServiceFeatures(service: ServiceDetail, locale: string): string[] {
    return locale === 'ar' ? arabicFeatureSet : service.features
}

export function localizedServiceOutcomes(service: ServiceDetail, locale: string): string[] {
    return locale === 'ar' ? arabicOutcomeSet : service.outcomes
}
