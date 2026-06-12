export type FAQ = { q: string; a: string }

type ServiceFAQs = {
    en: FAQ[]
    ar: FAQ[]
}

const baseFAQs: ServiceFAQs = {
    en: [
        {
            q: 'How does a CloudTopia engagement start?',
            a: 'Every engagement starts with discovery, a written scope, a delivery plan, and a fixed commercial proposal before production work begins.',
        },
        {
            q: 'Do you build in Arabic and English?',
            a: 'Yes. CloudTopia builds Arabic and English experiences with RTL-aware interfaces, bilingual content structure, localized metadata, and handoff documentation for both language tracks.',
        },
        {
            q: 'Who owns the code and design after launch?',
            a: 'The client owns the codebase, design files, content, accounts, deployment configuration, and data model at launch. We avoid vendor lock-in and document the system for your team.',
        },
        {
            q: 'Can the solution integrate with our existing tools?',
            a: 'Yes. We integrate websites, portals, stores, and business systems with CRMs, payment gateways, analytics, email platforms, ERPs, internal APIs, and automation tools.',
        },
    ],
    ar: [
        {
            q: 'كيف يبدأ التعاون مع كلاود توبيا؟',
            a: 'يبدأ كل تعاون بمرحلة اكتشاف، ونطاق مكتوب، وخطة تسليم، وعرض تجاري ثابت قبل بدء التنفيذ.',
        },
        {
            q: 'هل تبنون التجارب بالعربية والإنجليزية؟',
            a: 'نعم. نبني تجارب عربية وإنجليزية بواجهات تراعي RTL، وهيكل محتوى ثنائي اللغة، وبيانات وصفية محلية، وتوثيق تسليم لكل مسار لغوي.',
        },
        {
            q: 'من يملك الكود والتصميم بعد الإطلاق؟',
            a: 'يمتلك العميل الكود وملفات التصميم والمحتوى والحسابات وإعدادات النشر ونموذج البيانات عند الإطلاق. نتجنب قفل المورد ونوثق النظام لفريقك.',
        },
        {
            q: 'هل يمكن ربط الحل بأدواتنا الحالية؟',
            a: 'نعم. نربط المواقع والبوابات والمتاجر وأنظمة الأعمال مع CRM وبوابات الدفع والتحليلات والبريد وERP وواجهات API الداخلية وأدوات الأتمتة.',
        },
    ],
}

export const areaServed = {
    '@type': 'Place',
    name: 'Gulf region and worldwide remote delivery',
}

export const serviceFAQs: Record<string, ServiceFAQs> = {
    'website-design': baseFAQs,
    'business-website-development': baseFAQs,
    'landing-page-design': baseFAQs,
    'corporate-website-design': baseFAQs,
    'website-redesign': baseFAQs,
    'website-maintenance': baseFAQs,
    'ecommerce-solutions': baseFAQs,
    'ecommerce-website-development': baseFAQs,
    'restaurant-qr-menu': baseFAQs,
    'business-systems-development': baseFAQs,
    'web-applications': baseFAQs,
    'custom-web-application-development': baseFAQs,
    'client-portals': baseFAQs,
    'admin-dashboards': baseFAQs,
    'booking-platforms': baseFAQs,
    'internal-business-tools': baseFAQs,
    'saas-mvp-development': baseFAQs,
    'progressive-web-app-development': baseFAQs,
    'mobile-app-development': baseFAQs,
    'ios-app-development': baseFAQs,
    'android-app-development': baseFAQs,
    'cross-platform-app-development': baseFAQs,
    'flutter-app-development': baseFAQs,
    'react-native-app-development': baseFAQs,
    'mvp-app-development': baseFAQs,
    'business-mobile-app-development': baseFAQs,
    'customer-app-development': baseFAQs,
    'booking-app-development': baseFAQs,
    'delivery-order-app-development': baseFAQs,
    'app-backend-api-development': baseFAQs,
    'app-store-launch-support': baseFAQs,
    'mobile-app-maintenance': baseFAQs,
    'crm-development': baseFAQs,
    'inventory-management-systems': baseFAQs,
    'sales-management-systems': baseFAQs,
    'order-management-systems': baseFAQs,
    'hr-management-systems': baseFAQs,
    'accounting-system-integration': baseFAQs,
    'workflow-automation': baseFAQs,
    'business-process-automation': baseFAQs,
    'supply-chain-management-systems': baseFAQs,
    'custom-api-development': baseFAQs,
    'social-media-marketing': baseFAQs,
    'content-creation': baseFAQs,
    'seo-optimization': baseFAQs,
    'lead-generation-systems': baseFAQs,
    'conversion-rate-optimization': baseFAQs,
    'email-marketing-automation': baseFAQs,
}

export async function getServiceFAQs(serviceSlug: string, locale: string): Promise<FAQ[] | undefined> {
    const normalizedLocale = locale === 'ar' ? 'ar' : 'en'
    const fallback = serviceFAQs[serviceSlug]?.[normalizedLocale] || baseFAQs[normalizedLocale]
    const { getCMSServiceFAQs } = await import('../cms/content')
    const cmsFAQs = await getCMSServiceFAQs(serviceSlug, normalizedLocale)
    return Array.isArray(cmsFAQs) && cmsFAQs.length > 0 ? cmsFAQs : fallback
}

export async function buildFAQSchema(serviceSlug: string, locale: string) {
    const faqs = await getServiceFAQs(serviceSlug, locale)
    if (!faqs || faqs.length === 0) return null
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    }
}
