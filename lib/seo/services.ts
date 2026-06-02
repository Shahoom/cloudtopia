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
    return {
        slug,
        categorySlug,
        name: t(englishName, arabicName),
        description: t(
            `${englishName} from CloudTopia gives growing teams a structured, multilingual, ownership-first solution with clear scope, practical delivery, and long-term support.`,
            `خدمة ${arabicName} من كلاود توبيا تمنح الفرق النامية حلاً منظماً متعدد اللغات مع ملكية واضحة ونطاق محدد ودعم طويل الأمد.`),
        features: [
            'Discovery, scope, and fixed proposal before build',
            'Arabic and English content structure with RTL-ready interfaces',
            'Responsive user experience across desktop and mobile',
            'Launch support, analytics handoff, and documentation',
        ],
        outcomes: [
            'Clearer buyer journey',
            'Less manual follow-up',
            'Better regional search visibility',
            'A maintainable system your team owns',
        ],
        technologies: ['Next.js', 'React', 'Payload CMS', 'PostgreSQL', 'Cloudflare', 'Vercel'],
        faqs: [
            {
                question: t(`How does ${englishName} start?`, `كيف تبدأ خدمة ${arabicName}؟`),
                answer: t(
                    `We start with discovery, define scope and priorities, then give you a written fixed proposal before production work begins.`,
                    'نبدأ بالاكتشاف، نحدد النطاق والأولويات، ثم نقدم عرضاً مكتوباً ثابتاً قبل بدء التنفيذ.'),
            },
            {
                question: t(`Can ${englishName} be combined with other services?`, `هل يمكن دمج ${arabicName} مع خدمات أخرى؟`),
                answer: t(
                    `Yes. ${category.name.en} services are modular, so we can combine this with related services without forcing a bloated package.`,
                    `نعم. خدمات ${category.name.ar} معيارية، لذلك يمكن دمج هذه الخدمة مع خدمات مرتبطة دون فرض حزمة ضخمة.`),
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
