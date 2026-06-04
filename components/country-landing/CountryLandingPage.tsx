import Link from 'next/link'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import {
    ArrowRight,
    Bot,
    Building2,
    Check,
    CircleDollarSign,
    Cloud,
    Code2,
    ExternalLink,
    Factory,
    Globe2,
    LayoutDashboard,
    MessageCircle,
    Search,
    ShieldCheck,
    Sparkles,
    Workflow,
} from 'lucide-react'
import {
    countryLandingPages,
    countryWhatsappUrl,
    type CountryLandingPageData,
    type CountryLocale,
} from '@/lib/seo/country-landing-pages'

type Props = {
    country: CountryLandingPageData
    locale: CountryLocale
}

const services = [
    { slug: 'business-website-development', icon: Globe2, ar: ['تصميم وتطوير مواقع الشركات', 'مواقع احترافية سريعة تعكس الثقة وتحوّل الزوار إلى طلبات.'], en: ['Company website design & development', 'Fast, professional websites that build trust and turn visitors into inquiries.'] },
    { slug: 'landing-page-design', icon: Sparkles, ar: ['صفحات هبوط وحملات تسويقية', 'صفحات مركزة للعروض والإعلانات وقياس نتائج الحملات.'], en: ['Landing pages & campaign funnels', 'Focused pages for offers, ads, and campaign performance tracking.'] },
    { slug: 'custom-web-application-development', icon: LayoutDashboard, ar: ['تطبيقات ويب ولوحات تحكم', 'تجارب تفاعلية لإدارة البيانات والطلبات والفِرق.'], en: ['Web applications & dashboards', 'Interactive tools for managing data, orders, and teams.'] },
    { slug: 'mobile-app-development', icon: Code2, ar: ['تطوير تطبيقات الجوال', 'تطبيقات مخصصة للجوال وتجارب ويب تقدمية تناسب العملاء والفرق.'], en: ['Mobile app development', 'Custom mobile apps and progressive web app experiences for customers and teams.'] },
    { slug: 'crm-development', icon: MessageCircle, ar: ['أنظمة CRM لإدارة العملاء والمبيعات', 'تنظيم العملاء المحتملين، المتابعات، ومراحل البيع بوضوح.'], en: ['CRM systems for customers & sales', 'Organize leads, follow-ups, and sales stages with clarity.'] },
    { slug: 'order-management-systems', icon: Factory, ar: ['أنظمة ERP وإدارة العمليات', 'وحدات مخصصة للعمليات، الصلاحيات، والتقارير الإدارية.'], en: ['ERP & operations systems', 'Custom modules for operations, permissions, and management reports.'] },
    { slug: 'inventory-management-systems', icon: CircleDollarSign, ar: ['أنظمة مخزون وفواتير', 'إدارة المنتجات، الطلبات، الفواتير، والتنبيهات حسب سير العمل.'], en: ['Inventory & invoicing systems', 'Manage products, orders, invoices, and alerts around your workflow.'] },
    { slug: 'cloud-migration', icon: Cloud, ar: ['ترحيل سحابي ونقل بيانات', 'نقل المواقع والأنظمة وقواعد البيانات إلى بيئة سحابية أكثر استقراراً.'], en: ['Cloud migration & data migration', 'Move websites, systems, and databases into a more stable cloud environment.'] },
    { slug: 'database-setup', icon: LayoutDashboard, ar: ['إعداد قواعد البيانات وترحيلها', 'تنظيم البيانات، تنظيف الجداول، وربطها بلوحات وأنظمة الشركة.'], en: ['Database setup & migration', 'Structure data, clean tables, and connect them to company systems and dashboards.'] },
    { slug: 'ai-powered-customer-support', icon: MessageCircle, ar: ['خدمة عملاء بالذكاء الاصطناعي', 'ردود أولية، تصنيف استفسارات، وتحويل المحادثات المهمة للفريق.'], en: ['AI customer care', 'First replies, inquiry classification, and handoff for important conversations.'] },
    { slug: 'ai-automation', icon: Bot, ar: ['حلول ذكاء اصطناعي وأتمتة', 'أتمتة المهام المتكررة وربط الأدوات وتحسين سرعة التشغيل.'], en: ['AI automation solutions', 'Automate repetitive tasks, connect tools, and improve operating speed.'] },
    { slug: 'seo-optimization', icon: Search, ar: ['تحسين الظهور في البحث', 'بنية صفحات ومحتوى وأسئلة شائعة تساعد العملاء على العثور عليك.'], en: ['Local SEO optimization', 'Content structure and schema designed for local market search intent.'] },
]

const advancedServices = [
    { slug: 'ai-automation', icon: Bot, ar: ['أتمتة بالذكاء الاصطناعي', 'نماذج عمل تربط الموقع، النماذج، واتساب، البريد، ولوحات الإدارة.'], en: ['AI workflow automation', 'Workflows that connect forms, WhatsApp, email, websites, and dashboards.'] },
    { slug: 'ai-powered-customer-support', icon: MessageCircle, ar: ['خدمة عملاء ذكية', 'ردود أولية، تصنيف استفسارات، وتحويل الطلبات المهمة للفريق.'], en: ['AI customer care', 'First replies, inquiry classification, and handoff for important requests.'] },
    { slug: 'ai-business-assistants', icon: Sparkles, ar: ['مساعد أعمال ذكي', 'مساعد داخلي للإدارة، المبيعات، خدمة العملاء، أو متابعة الطلبات.'], en: ['AI business assistant', 'Internal assistants for operations, sales, customer care, or order follow-up.'] },
    { slug: 'ai-reporting-dashboards', icon: LayoutDashboard, ar: ['تقارير ذكية ولوحات AI', 'لوحات تجمع الأرقام وتساعد الإدارة على قراءة الأداء والطلبات والعملاء.'], en: ['AI reporting dashboards', 'Dashboards that collect numbers and help management read performance, orders, and customers.'] },
    { slug: 'seo-optimization', icon: Search, ar: ['تحسين الظهور في إجابات AI', 'صفحات منظمة بأسئلة وأجوبة واضحة تساعد محركات البحث والذكاء الاصطناعي على فهم خدماتك.'], en: ['AI answer visibility', 'Structured pages with clear answers for search engines and AI assistants.'] },
    { slug: 'custom-api-development', icon: Workflow, ar: ['ربط الأنظمة والتطبيقات', 'ربط CRM، ERP، نماذج الموقع، المدفوعات، والتنبيهات حسب سير العمل.'], en: ['System integrations', 'Connect CRM, ERP, website forms, payments, and notifications around your workflow.'] },
    { slug: 'cloud-migration', icon: Cloud, ar: ['ترحيل إلى السحابة', 'نقل المواقع، التطبيقات، الملفات، وقواعد البيانات مع تقليل التعطّل.'], en: ['Cloud migration', 'Move websites, apps, files, and databases while reducing downtime.'] },
    { slug: 'database-setup', icon: Factory, ar: ['ترحيل وتنظيم البيانات', 'تنظيف البيانات، إعادة ترتيب الجداول، وربطها بالأنظمة والتقارير.'], en: ['Data migration and structuring', 'Clean data, restructure tables, and connect them to systems and reports.'] },
    { slug: 'mobile-app-development', icon: Code2, ar: ['تطبيقات جوال وPWA', 'تطبيقات للعملاء أو الفرق مع تجربة مناسبة للجوال والويب.'], en: ['Mobile apps and PWA', 'Apps for customers or teams with a mobile-ready web experience.'] },
    { slug: 'backup-and-security', icon: ShieldCheck, ar: ['صلاحيات وحماية بيانات', 'مستويات دخول، سجلات نشاط، نسخ احتياطي، وطرق استخدام تناسب الفرق.'], en: ['Permissions and data controls', 'Access levels, activity logs, backups, and usage patterns for teams.'] },
]

const industries = [
    { icon: Building2, ar: ['العقارات والمقاولات', 'مواقع مشاريع، نماذج استفسار، CRM للمتابعات، ولوحات لحركة العملاء.'], en: ['Real estate & contracting', 'Project websites, inquiry forms, CRM follow-up, and lead dashboards.'] },
    { icon: ShieldCheck, ar: ['العيادات والمراكز الطبية', 'حجز، صفحات خدمات، إدارة استفسارات، ومحتوى يشرح الثقة بوضوح.'], en: ['Clinics & medical centers', 'Bookings, service pages, inquiry management, and trust-building content.'] },
    { icon: Sparkles, ar: ['المطاعم والكافيهات', 'قوائم رقمية، طلبات، عروض، وربط سريع مع واتساب.'], en: ['Restaurants & cafes', 'Digital menus, orders, promotions, and fast WhatsApp contact.'] },
    { icon: Workflow, ar: ['شركات الاستيراد والتصدير', 'كتالوجات، طلبات عروض، مخزون، وفواتير حسب دورة العمل.'], en: ['Import & export companies', 'Catalogs, quote requests, inventory, and invoicing workflows.'] },
    { icon: Code2, ar: ['مكاتب المحاماة والاستشارات', 'مواقع خدمات، نماذج تأهيل، ومتابعة فرص بطريقة منظمة.'], en: ['Legal & consulting firms', 'Service websites, qualification forms, and organized opportunity tracking.'] },
    { icon: CircleDollarSign, ar: ['المتاجر الإلكترونية', 'واجهات بيع، دفع، محتوى منتجات، وتحليلات قابلة للتطوير.'], en: ['E-commerce stores', 'Sales interfaces, payments, product content, and scalable analytics.'] },
    { icon: Cloud, ar: ['الشركات الناشئة', 'MVP، صفحات إطلاق، لوحات أولية، وربط أدوات النمو.'], en: ['Startups', 'MVPs, launch pages, early dashboards, and growth tool integrations.'] },
    { icon: Factory, ar: ['شركات الخدمات واللوجستيات', 'إدارة طلبات، تتبع، تقارير، ولوحات تشغيل للفرق.'], en: ['Services & logistics companies', 'Order management, tracking, reports, and operating dashboards.'] },
]

const useCases = {
    ar: ['موقع شركة تعريفي احترافي', 'نظام CRM للمبيعات والمتابعات', 'لوحة تحكم لإدارة الطلبات', 'نظام مخزون وفواتير', 'منصة حجز واستفسارات', 'نظام محتوى ومدونة SEO'],
    en: ['Professional company website', 'CRM for sales and follow-up', 'Order management dashboard', 'Inventory and invoicing system', 'Booking and inquiry platform', 'SEO content and blog system'],
}

const processSteps = {
    ar: ['نفهم احتياجك', 'نضع خطة واضحة', 'نصمم تجربة المستخدم', 'نطور النظام أو الموقع', 'نختبر ونطلق', 'نتابع ونحسن'],
    en: ['Understand your need', 'Create a clear plan', 'Design the user experience', 'Develop the site or system', 'Test and launch', 'Support and improve'],
}

const solutionCards = [
    { icon: Globe2, ar: ['مواقع وصفحات هبوط', 'مواقع شركات وصفحات خدمات وحملات تشرح العرض بوضوح.'], en: ['Digital Presence', 'Websites, landing pages, and content that communicate value clearly.'] },
    { icon: LayoutDashboard, ar: ['تطبيقات ويب ولوحات تحكم', 'لوحات وتطبيقات تفاعلية مصممة حول طريقة عمل الفريق.'], en: ['Interactive Web Applications', 'Dashboards and web apps shaped around team workflows.'] },
    { icon: Factory, ar: ['أنظمة أعمال مخصصة', 'CRM، ERP، مخزون، فواتير، وتقارير حسب احتياج الشركة.'], en: ['Business Systems Development', 'Custom CRM, ERP, inventory, invoicing, and reporting.'] },
    { icon: Bot, ar: ['أتمتة وذكاء اصطناعي', 'ربط أدوات وأتمتة مهام عندما تكون مفيدة فعلاً للعمل.'], en: ['CloudTopia Labs', 'Automation and AI where they create practical value.'] },
]

const linkBase = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--country-secondary)]'

const countryVisuals: Record<string, { pattern: string; marker: string }> = {
    sa: {
        pattern: 'bg-[radial-gradient(circle_at_20%_12%,rgba(11,122,59,0.12),transparent_28%),linear-gradient(90deg,rgba(184,148,77,0.12)_1px,transparent_1px),linear-gradient(180deg,rgba(16,32,21,0.08)_1px,transparent_1px)] bg-[size:auto,64px_64px,64px_64px]',
        marker: 'Riyadh Systems Desk',
    },
    ae: {
        pattern: 'bg-[linear-gradient(115deg,rgba(0,115,47,0.12),transparent_34%),linear-gradient(90deg,rgba(206,17,38,0.10)_1px,transparent_1px),linear-gradient(180deg,rgba(17,17,17,0.07)_1px,transparent_1px)] bg-[size:auto,46px_46px,46px_46px]',
        marker: 'UAE Growth Desk',
    },
    om: {
        pattern: 'bg-[radial-gradient(ellipse_at_18%_24%,rgba(200,16,46,0.11),transparent_34%),radial-gradient(ellipse_at_84%_18%,rgba(0,122,61,0.10),transparent_30%),linear-gradient(135deg,rgba(32,26,20,0.08)_1px,transparent_1px)] bg-[size:auto,auto,52px_52px]',
        marker: 'Muscat Delivery Desk',
    },
    qa: {
        pattern: 'bg-[radial-gradient(circle_at_80%_12%,rgba(138,21,56,0.13),transparent_30%),linear-gradient(120deg,rgba(14,165,183,0.10)_1px,transparent_1px)] bg-[size:auto,48px_48px]',
        marker: 'Doha Systems Desk',
    },
    kw: {
        pattern: 'bg-[linear-gradient(90deg,rgba(0,122,61,0.10),transparent_30%),linear-gradient(180deg,rgba(206,17,38,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.07)_1px,transparent_1px)] bg-[size:auto,56px_56px,56px_56px]',
        marker: 'Kuwait Operations Desk',
    },
    bh: {
        pattern: 'bg-[radial-gradient(circle_at_16%_18%,rgba(206,17,38,0.12),transparent_28%),linear-gradient(135deg,rgba(15,118,110,0.10)_1px,transparent_1px)] bg-[size:auto,44px_44px]',
        marker: 'Manama Digital Desk',
    },
    iq: {
        pattern: 'bg-[radial-gradient(ellipse_at_78%_20%,rgba(206,17,38,0.11),transparent_32%),linear-gradient(90deg,rgba(0,122,61,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(30,23,18,0.08)_1px,transparent_1px)] bg-[size:auto,58px_58px,58px_58px]',
        marker: 'Baghdad Systems Desk',
    },
    tr: {
        pattern: 'bg-[linear-gradient(120deg,rgba(227,10,23,0.12),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(3,105,161,0.10),transparent_26%),linear-gradient(90deg,rgba(28,22,21,0.07)_1px,transparent_1px)] bg-[size:auto,auto,48px_48px]',
        marker: 'Istanbul Product Desk',
    },
    sy: {
        pattern: 'bg-[radial-gradient(circle_at_18%_18%,rgba(206,17,38,0.10),transparent_30%),linear-gradient(135deg,rgba(0,122,61,0.08)_1px,transparent_1px)] bg-[size:auto,54px_54px]',
        marker: 'Damascus Business Desk',
    },
    jo: {
        pattern: 'bg-[linear-gradient(125deg,rgba(206,17,38,0.11),transparent_35%),radial-gradient(circle_at_82%_18%,rgba(0,122,61,0.09),transparent_28%),linear-gradient(180deg,rgba(30,23,18,0.07)_1px,transparent_1px)] bg-[size:auto,auto,50px_50px]',
        marker: 'Amman Delivery Desk',
    },
    lb: {
        pattern: 'bg-[radial-gradient(circle_at_18%_16%,rgba(0,122,61,0.12),transparent_30%),linear-gradient(90deg,rgba(206,17,38,0.08)_1px,transparent_1px)] bg-[size:auto,46px_46px]',
        marker: 'Beirut Digital Desk',
    },
}

function landingPath(locale: CountryLocale, path: string) {
    if (locale === 'ar') return path === '/' ? '/ar' : `/ar${path}`
    return path
}

function servicePath(locale: CountryLocale, slug: string) {
    return landingPath(locale, `/services/${slug}`)
}

function JsonLd({ data }: { data: unknown }) {
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

function Eyebrow({ children, tone = 'dark' }: { children: React.ReactNode; tone?: 'dark' | 'light' }) {
    return (
        <p className={`mb-4 inline-flex border-b-2 pb-1 text-xs font-black uppercase tracking-[0.18em] ${tone === 'light' ? 'border-white text-white' : 'border-[var(--country-primary)] text-neutral-700'}`}>
            {children}
        </p>
    )
}

function serviceTitle(slug: string, countryName: string, locale: CountryLocale) {
    const ar: Record<string, string> = {
        'business-website-development': `تصميم مواقع شركات في ${countryName}`,
        'landing-page-design': `تصميم صفحات هبوط في ${countryName}`,
        'custom-web-application-development': `تطوير تطبيقات ويب في ${countryName}`,
        'mobile-app-development': `تطوير تطبيقات جوال في ${countryName}`,
        'crm-development': `تطوير نظام CRM في ${countryName}`,
        'order-management-systems': `تطوير ERP وأنظمة تشغيل في ${countryName}`,
        'inventory-management-systems': `نظام مخزون وفواتير في ${countryName}`,
        'cloud-migration': `ترحيل سحابي ونقل بيانات في ${countryName}`,
        'database-setup': `إعداد قواعد بيانات للشركات في ${countryName}`,
        'ai-powered-customer-support': `خدمة عملاء بالذكاء الاصطناعي في ${countryName}`,
        'ai-automation': `أتمتة أعمال بالذكاء الاصطناعي في ${countryName}`,
        'seo-optimization': `تحسين ظهور الشركات في Google وAI في ${countryName}`,
    }
    const en: Record<string, string> = {
        'business-website-development': `Business Website Development In ${countryName}`,
        'landing-page-design': `Landing Page Design In ${countryName}`,
        'custom-web-application-development': `Web App Development In ${countryName}`,
        'mobile-app-development': `Mobile App Development In ${countryName}`,
        'crm-development': `CRM Development In ${countryName}`,
        'order-management-systems': `ERP & Operations Systems In ${countryName}`,
        'inventory-management-systems': `Inventory & Invoicing Systems In ${countryName}`,
        'cloud-migration': `Cloud & Data Migration In ${countryName}`,
        'database-setup': `Database Setup For Companies In ${countryName}`,
        'ai-powered-customer-support': `AI Customer Care In ${countryName}`,
        'ai-automation': `AI Business Automation In ${countryName}`,
        'seo-optimization': `Google & AI Search Visibility In ${countryName}`,
    }
    return (locale === 'ar' ? ar[slug] : en[slug]) || ''
}

export default function CountryLandingPage({ country, locale }: Props) {
    const isArabic = locale === 'ar'
    const content = country.content[locale]
    const dir = isArabic ? 'rtl' : 'ltr'
    const whatsapp = countryWhatsappUrl(country, locale)
    const countryName = isArabic ? country.countryNameArabic : country.countryNameEnglish
    const marketName = isArabic ? country.marketNameArabic : country.marketNameEnglish
    const homeHref = landingPath(locale, '/')
    const marketsHref = landingPath(locale, '/markets')
    const alternateHref = isArabic ? country.englishUrl : country.arabicUrl
    const alternateLabel = isArabic ? 'English' : 'العربية'
    const arrowClass = isArabic ? 'rotate-180' : ''
    const schemaUrl = `https://cloudtopia.net${isArabic ? country.arabicUrl : country.englishUrl}`
    const countryPhoto = country.theme.photo
    const countryPhotoAlt = isArabic ? countryPhoto.altArabic : countryPhoto.altEnglish
    const countryPhotoCaption = isArabic ? countryPhoto.captionArabic : countryPhoto.captionEnglish
    const visual = countryVisuals[country.code] || countryVisuals.sa
    const proofPoints = isArabic
        ? [
            { label: 'استشارة مجانية ومعاينة ديمو قبل الاتفاق' },
            { label: 'مواقع، تطبيقات، أنظمة، سحابة، بيانات، وذكاء اصطناعي' },
            { label: 'تواصل واتساب', value: country.phone },
        ]
        : [
            { label: 'Free consultation and demo preview before commitment' },
            { label: 'Websites, apps, systems, cloud, data, and AI' },
            { label: 'WhatsApp', value: country.phone },
        ]
    const freeOfferItems = isArabic
        ? [
            'استشارة مجانية لفهم احتياج الشركة قبل أي عرض سعر',
            'معاينة ديمو مجانية مخصصة حسب نوع الاستفسار',
            'اقتراح نطاق عملي يشمل الموقع، CRM، ERP، الأتمتة، السحابة، أو التطبيق',
        ]
        : [
            'Free consultation to understand the company need before any quote',
            'Free custom demo preview based on the inquiry type',
            'A practical scope covering website, CRM, ERP, automation, cloud, or app work',
        ]
    const keywordPhrases = Array.from(new Set(isArabic
        ? [
            content.primaryKeyword,
            ...content.secondaryKeywords,
            `تطوير تطبيقات في ${countryName}`,
            `ترحيل سحابي في ${countryName}`,
            `نقل بيانات للشركات في ${countryName}`,
            `أتمتة بالذكاء الاصطناعي في ${countryName}`,
            `خدمة عملاء ذكية في ${countryName}`,
            `تطوير تطبيقات جوال في ${countryName}`,
            `شركة تطوير CRM وERP في ${countryName}`,
        ]
        : [
            content.primaryKeyword,
            ...content.secondaryKeywords,
            `app development in ${countryName}`,
            `cloud migration in ${countryName}`,
            `data migration for companies in ${countryName}`,
            `AI automation in ${countryName}`,
            `AI customer care in ${countryName}`,
            `mobile app development in ${countryName}`,
            `CRM and ERP development company in ${countryName}`,
        ]))

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: country.faqs[locale].map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
    }
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CloudTopia',
        url: 'https://cloudtopia.net',
        sameAs: ['https://instagram.com/thecloudtopia'],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: country.phone,
            contactType: 'sales',
            areaServed: countryName,
            availableLanguage: isArabic ? ['Arabic', 'English'] : ['English', 'Arabic'],
        },
    }
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: content.primaryKeyword,
        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
        areaServed: { '@type': 'Country', name: countryName },
        serviceType: ['Website development', 'CRM', 'ERP', 'AI automation', 'Cloud migration', 'Data migration', 'Mobile app development'],
        url: schemaUrl,
    }
    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: content.seoTitle,
        description: content.seoDescription,
        url: schemaUrl,
        inLanguage: isArabic ? country.hreflangArabic : country.hreflangEnglish,
    }

    return (
        <main
            id="main-content"
            dir={dir}
            className="min-h-screen overflow-x-hidden bg-[var(--country-surface)] text-neutral-950 [text-wrap:pretty]"
            style={{
                '--country-primary': country.theme.primaryAccent,
                '--country-secondary': country.theme.secondaryAccent,
                '--country-dark': country.theme.darkAccent || '#171717',
                '--country-surface': country.theme.surface,
                '--country-soft': country.theme.softAccent,
                '--paper': country.theme.surface,
                '--ink': country.theme.ink,
            } as CSSProperties}
        >
            <JsonLd data={organizationSchema} />
            <JsonLd data={webPageSchema} />
            <JsonLd data={serviceSchema} />
            <JsonLd data={faqSchema} />

            <a href="#country-story" className={`sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-black ${linkBase}`}>
                {isArabic ? 'تجاوز إلى المحتوى' : 'Skip to content'}
            </a>

            <header className="sticky top-0 z-50 border-b border-neutral-950 bg-[var(--paper)]/94 backdrop-blur-md">
                <div className="h-1 bg-[linear-gradient(90deg,var(--country-primary),var(--country-secondary),var(--country-dark))]" aria-hidden="true" />
                <div className="mx-auto grid max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 sm:grid-cols-[auto_1fr_auto] sm:px-6 lg:px-8">
                    <Link href={homeHref} className={`flex min-w-0 items-center gap-2.5 ${linkBase}`} aria-label="CloudTopia">
                        <Image src="/images/CloudTopia.svg" alt="" width={40} height={40} priority className="h-10 w-10 shrink-0" />
                        <span className="flex min-w-0 flex-col leading-none" translate="no">
                            <span className="font-logo text-[1.05rem] font-black text-neutral-950 sm:text-xl">
                                Cloud<span className="text-sky-600">Topia</span>
                            </span>
                            <span className="mt-1 whitespace-nowrap text-[0.46rem] font-black tracking-[0.06em] text-neutral-600 min-[390px]:text-[0.52rem] sm:text-[0.62rem]">
                                Digital & Cloud Technologies
                            </span>
                        </span>
                    </Link>
                    <nav className="mx-auto hidden items-center gap-1 border border-neutral-950 bg-white px-1 py-1 text-xs font-black lg:flex" aria-label={isArabic ? 'أقسام الصفحة' : 'Page sections'}>
                        {[
                            ['#services', isArabic ? 'الخدمات' : 'Services'],
                            ['#industries', isArabic ? 'القطاعات' : 'Industries'],
                            ['#projects', isArabic ? 'النماذج' : 'Use Cases'],
                            ['#pricing', isArabic ? 'الباقات' : 'Pricing'],
                            ['#faq', isArabic ? 'الأسئلة' : 'FAQ'],
                        ].map(([href, label]) => (
                            <a key={href} href={href} className={`px-4 py-2 text-neutral-700 transition-colors duration-200 hover:bg-neutral-950 hover:text-white ${linkBase}`}>
                                {label}
                            </a>
                        ))}
                    </nav>
                    <div className="flex min-w-0 items-center justify-end gap-2">
                        <span className="hidden border border-neutral-950 bg-[var(--country-soft)] px-3 py-2 text-xs font-black text-neutral-950 xl:inline-flex">
                            {countryName}
                        </span>
                        <Link href={alternateHref} className={`hidden border border-neutral-950 bg-white px-3 py-2 text-xs font-black text-neutral-900 transition-colors duration-200 hover:bg-neutral-950 hover:text-white sm:inline-flex ${linkBase}`}>
                            {alternateLabel}
                        </Link>
                        <Link href={homeHref} className={`hidden text-xs font-black text-neutral-500 transition-colors duration-200 hover:text-neutral-950 md:inline ${linkBase}`}>
                            {isArabic ? 'الموقع الرئيسي' : 'Main Site'}
                        </Link>
                        <Link href={whatsapp} className={`inline-flex shrink-0 items-center gap-2 bg-[var(--ink)] px-3 py-3 text-sm font-black text-white transition-colors duration-200 hover:bg-[var(--country-primary)] sm:px-4 ${linkBase}`}>
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            <span className="hidden min-[390px]:inline">{isArabic ? 'واتساب' : 'WhatsApp'}</span>
                        </Link>
                    </div>
                </div>
            </header>

            <section id="country-story" className="relative min-h-[calc(100vh-64px)] border-b border-neutral-950">
                <div className={`absolute inset-0 ${visual.pattern}`} aria-hidden="true" />
                <div className="relative mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
                    <div className="flex flex-col justify-between lg:min-h-[72vh]">
                        <div>
                            <div className="mb-8 grid max-w-2xl grid-cols-3 border border-neutral-950 bg-white text-center text-xs font-black uppercase tracking-[0.16em] text-neutral-700">
                                <span className="border-e border-neutral-950 px-3 py-3">{country.code}</span>
                                <span className="border-e border-neutral-950 px-3 py-3">{country.currency}</span>
                                <span className="px-3 py-3">{marketName}</span>
                            </div>
                            <div className="mb-7 overflow-hidden border border-neutral-950 bg-[var(--ink)] text-white lg:hidden" aria-hidden="true">
                                <div className="relative h-56 min-[390px]:h-64">
                                    <Image
                                        src={countryPhoto.src}
                                        alt=""
                                        fill
                                        priority
                                        sizes="100vw"
                                        className="object-cover opacity-86 saturate-[0.98]"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.7))]" />
                                    <p className="absolute bottom-4 left-4 right-4 text-base font-black leading-7">{countryPhotoCaption}</p>
                                </div>
                            </div>
                            <h1 className="max-w-5xl text-[clamp(2.35rem,4.4vw,4.65rem)] font-black leading-[1.04] tracking-normal text-neutral-950 [text-wrap:balance]">
                                {content.h1}
                            </h1>
                            <p className="mt-7 max-w-3xl border-s-4 border-[var(--country-primary)] bg-white/84 px-5 py-4 text-base font-semibold leading-8 text-neutral-700 md:text-lg">
                                {content.heroSubtitle}
                            </p>
                        </div>
                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <Link href={whatsapp} className={`inline-flex items-center justify-center gap-2 bg-[var(--country-primary)] px-6 py-4 text-sm font-black text-white shadow-[6px_6px_0_var(--ink)] transition-transform duration-200 hover:-translate-y-0.5 ${linkBase}`}>
                                {isArabic ? 'اطلب الاستشارة المجانية' : 'Get The Free Consultation'}
                                <ArrowRight className={`h-4 w-4 ${arrowClass}`} aria-hidden="true" />
                            </Link>
                            <a href="#services" className={`inline-flex items-center justify-center gap-2 border border-neutral-950 bg-white px-6 py-4 text-sm font-black text-neutral-950 transition-colors duration-200 hover:bg-neutral-950 hover:text-white ${linkBase}`}>
                                {isArabic ? 'شاهد الخدمات' : 'Explore Services'}
                            </a>
                        </div>
                    </div>

                    <aside className="relative lg:pt-10" aria-label={isArabic ? 'ملف السوق' : 'Market dossier'}>
                        <div className="relative overflow-hidden border border-neutral-950 bg-neutral-950 text-white transition-transform duration-200 hover:-translate-y-1">
                            <div className="relative h-72 border-b border-white/20 md:h-[31rem]">
                                <Image
                                    src={countryPhoto.src}
                                    alt={countryPhotoAlt}
                                    fill
                                    priority
                                    sizes="(min-width: 1024px) 42vw, 100vw"
                                    className="object-cover opacity-84 saturate-[0.96]"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.78))]" aria-hidden="true" />
                                <div className="absolute left-5 top-5 border border-white/35 bg-eerie/35 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                                    {isArabic ? 'مشهد محلي' : 'Local Market'}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-white/72" translate="no">{visual.marker}</p>
                                    <p className="mt-2 text-3xl font-black">{countryName}</p>
                                    <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-white/78">{countryPhotoCaption}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 divide-x divide-white/20 text-center rtl:divide-x-reverse">
                                {[
                                    [isArabic ? 'البداية' : 'Start', isArabic ? 'استشارة' : 'Consult'],
                                    [isArabic ? 'التصور' : 'Preview', isArabic ? 'ديمو' : 'Demo'],
                                    [isArabic ? 'التنفيذ' : 'Build', isArabic ? 'نطاق واضح' : 'Clear Scope'],
                                ].map(([label, value]) => (
                                    <div key={label} className="p-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{label}</p>
                                        <p className="mt-1 text-sm font-black text-white">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 grid gap-2">
                            {proofPoints.map((point) => (
                                <div key={point.label} className="flex items-center gap-3 border border-neutral-950 bg-white px-4 py-3 text-sm font-black transition-transform duration-200 hover:-translate-x-1 rtl:hover:translate-x-1">
                                    <Check className="h-4 w-4 text-[var(--country-primary)]" aria-hidden="true" />
                                    <span className="min-w-0">
                                        {point.label}
                                        {point.value ? (
                                            <>
                                                {': '}
                                                <bdi dir="ltr" className="font-mono">{point.value}</bdi>
                                            </>
                                        ) : null}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </section>

            <section className="border-b border-neutral-950 bg-white px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-[1500px] gap-6 border border-neutral-950 bg-[var(--country-surface)] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
                    <div>
                        <Eyebrow>{isArabic ? 'عرض مجاني' : 'Free Offer'}</Eyebrow>
                        <h2 className="text-3xl font-black leading-tight md:text-4xl [text-wrap:balance]">
                            {isArabic ? 'استشارة مجانية ومعاينة ديمو قبل الاتفاق.' : 'Free Consultation And Demo Preview Before You Commit.'}
                        </h2>
                        <p className="mt-5 text-base font-semibold leading-8 text-neutral-700">
                            {isArabic
                                ? `هذه هي طريقة عملنا مع الشركات في ${countryName}: ترسل لنا احتياجك، ونراجع الفكرة، ثم نجهز تصوراً أولياً أو ديمو مبسطاً يناسب شركتك قبل أن تدفع أي مبلغ.`
                                : `This is how we work with companies in ${countryName}: send the inquiry, we review the idea, then prepare an initial direction or simple demo preview before you pay anything.`}
                        </p>
                    </div>
                    <div className="grid gap-3">
                        {freeOfferItems.map((item) => (
                            <div key={item} className="flex items-start gap-3 border border-neutral-950 bg-white p-4 text-sm font-black leading-7 transition-transform duration-200 hover:-translate-y-1">
                                <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--country-primary)]" aria-hidden="true" />
                                <span>{item}</span>
                            </div>
                        ))}
                        <Link href={whatsapp} className={`inline-flex items-center justify-center gap-2 bg-[var(--ink)] px-5 py-4 text-sm font-black text-white transition-colors duration-200 hover:bg-[var(--country-primary)] ${linkBase}`}>
                            {isArabic ? 'احصل على ديمو مجاني مخصص' : 'Get A Free Custom Demo'}
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-neutral-950 bg-white px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.52fr_1fr]">
                    <div>
                        <Eyebrow>{isArabic ? 'قراءة السوق' : 'Market Read'}</Eyebrow>
                        <h2 className="text-3xl font-black leading-tight md:text-4xl xl:text-5xl [text-wrap:balance]">
                            {isArabic ? `ما الذي تحتاجه الشركات في ${countryName}؟` : `What Companies In ${countryName} Need`}
                        </h2>
                    </div>
                    <div className="grid gap-4">
                        <p className="border border-neutral-950 bg-[var(--country-surface)] p-6 text-lg font-semibold leading-9 text-neutral-700 md:p-8">
                            {content.marketProblem}
                        </p>
                        <div className="border border-neutral-950 bg-white p-5">
                            <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-neutral-500">{isArabic ? 'كلمات البحث' : 'Keywords'}</p>
                            <div className="flex flex-wrap gap-2">
                                {keywordPhrases.map((keyword) => (
                                    <span key={keyword} className="border border-neutral-300 bg-[var(--country-surface)] px-3 py-2 text-sm font-black leading-6 text-neutral-900 transition-colors duration-200 hover:border-[var(--country-primary)] hover:bg-white">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-neutral-950 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1500px]">
                    <div className="mb-10 max-w-4xl">
                        <Eyebrow>{isArabic ? 'نموذج CloudTopia' : 'CloudTopia Model'}</Eyebrow>
                        <h2 className="text-3xl font-black leading-tight md:text-4xl xl:text-5xl [text-wrap:balance]">
                            {isArabic ? 'من الموقع إلى نظام العمل.' : 'From Website To Operating System.'}
                        </h2>
                        <p className="mt-5 text-lg font-semibold leading-8 text-neutral-700">{content.solutionIntro}</p>
                    </div>
                    <div className="grid border border-neutral-950 bg-white lg:grid-cols-4">
                        {solutionCards.map((card, index) => {
                            const Icon = card.icon
                            const copy = card[locale]
                            return (
                                <article key={copy[0]} className="min-h-64 border-b border-neutral-950 p-6 transition-colors duration-200 hover:bg-[var(--country-surface)] lg:border-b-0 lg:border-e last:border-b-0 lg:last:border-e-0">
                                    <div className="flex items-center justify-between">
                                        <Icon className="h-7 w-7 text-[var(--country-primary)]" aria-hidden="true" />
                                        <span className="font-mono text-xs font-black text-neutral-400">{String(index + 1).padStart(2, '0')}</span>
                                    </div>
                                    <h3 className="mt-10 text-2xl font-black leading-tight">{copy[0]}</h3>
                                    <p className="mt-4 text-sm font-semibold leading-7 text-neutral-600">{copy[1]}</p>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section id="services" className="scroll-mt-24 border-b border-neutral-950 bg-white px-4 py-16 text-neutral-950 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1500px]">
                    <div className="mb-10 grid gap-6 lg:grid-cols-[0.45fr_1fr]">
                        <div>
                            <p className="mb-4 inline-flex border-b-2 border-[var(--country-primary)] pb-1 text-xs font-black uppercase tracking-[0.18em] text-neutral-600">
                                {isArabic ? 'الخدمات' : 'Services'}
                            </p>
                            <h2 className="text-3xl font-black leading-tight md:text-4xl xl:text-5xl [text-wrap:balance]">
                                {isArabic ? `خدماتنا للشركات في ${countryName}` : `Services For Companies In ${countryName}`}
                            </h2>
                        </div>
                        <p className="max-w-3xl border-s-4 border-[var(--country-primary)] bg-[var(--country-surface)] px-5 py-4 text-lg font-semibold leading-8 text-neutral-700">
                            {isArabic ? 'خدمات واضحة للشركات: موقع، نظام، CRM، ERP، أتمتة، وتحسين ظهور في البحث.' : 'Clear services for companies: website, system, CRM, ERP, automation, and search visibility.'}
                        </p>
                    </div>
                    <div className="grid gap-px border border-neutral-950 bg-neutral-950 md:grid-cols-2 xl:grid-cols-3">
                        {services.map((service, index) => {
                            const Icon = service.icon
                            const copy = service[locale]
                            const title = serviceTitle(service.slug, countryName, locale) || copy[0]
                            return (
                                <article key={copy[0]} className="group min-h-64 bg-[var(--country-surface)] p-5 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[8px_8px_0_rgba(11,13,18,0.14)]">
                                    <div className="mb-12 flex items-start justify-between gap-4">
                                        <Icon className="h-6 w-6 text-[var(--country-primary)]" aria-hidden="true" />
                                        <span className="font-mono text-xs font-black text-neutral-500">{String(index + 1).padStart(2, '0')}</span>
                                    </div>
                                    <h3 className="text-xl font-black leading-tight text-neutral-950">{title}</h3>
                                    <p className="mt-4 text-sm font-semibold leading-7 text-neutral-600">{copy[1]}</p>
                                    <p className="mt-5 text-xs font-black text-[var(--country-primary)]">
                                        {isArabic ? `مخصص لسوق ${countryName}` : `Calibrated For ${countryName}`}
                                    </p>
                                    <Link href={servicePath(locale, service.slug)} className={`mt-6 inline-flex items-center gap-2 text-sm font-black text-neutral-950 transition-colors duration-200 hover:text-[var(--country-primary)] ${linkBase}`}>
                                        {isArabic ? 'تفاصيل الخدمة' : 'Service Details'}
                                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="border-b border-neutral-950 bg-white px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1500px]">
                    <div className="mb-10 grid gap-6 lg:grid-cols-[0.42fr_1fr]">
                        <div>
                            <Eyebrow>{isArabic ? 'خدمات إضافية' : 'More Services'}</Eyebrow>
                            <h2 className="text-3xl font-black leading-tight md:text-4xl xl:text-5xl [text-wrap:balance]">
                                {isArabic ? 'أوسع من موقع فقط.' : 'More Than A Website.'}
                            </h2>
                        </div>
                        <p className="max-w-3xl text-lg font-semibold leading-8 text-neutral-700">
                            {isArabic ? 'نضيف خدمات حديثة حسب الحاجة: أتمتة، خدمة عملاء ذكية، ربط أنظمة، ولوحات متابعة تساعدك على تشغيل العمل يومياً.' : 'Add modern services when needed: automation, AI customer care, integrations, and dashboards for daily operations.'}
                        </p>
                    </div>
                    <div className="grid gap-px bg-neutral-950 md:grid-cols-2 xl:grid-cols-3">
                        {advancedServices.map((service) => {
                            const Icon = service.icon
                            const copy = service[locale]
                            return (
                                <details key={copy[0]} className="group bg-[var(--country-surface)] p-5 open:bg-white">
                                    <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-black leading-7 ${linkBase}`}>
                                        <span className="flex items-center gap-3">
                                            <Icon className="h-5 w-5 text-[var(--country-primary)]" aria-hidden="true" />
                                            {copy[0]}
                                        </span>
                                        <span className="text-2xl leading-none text-[var(--country-primary)] transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span>
                                    </summary>
                                    <p className="mt-5 text-sm font-semibold leading-7 text-neutral-600">{copy[1]}</p>
                                    <Link href={servicePath(locale, service.slug)} className={`mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--country-primary)] transition-colors duration-200 hover:text-neutral-950 ${linkBase}`}>
                                        {isArabic ? 'افتح صفحة الخدمة' : 'Open Service Page'}
                                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                </details>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section id="industries" className="scroll-mt-24 border-b border-neutral-950 bg-white px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1500px]">
                    <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr]">
                        <div>
                            <Eyebrow>{isArabic ? 'القطاعات' : 'Industries'}</Eyebrow>
                            <h2 className="text-3xl font-black leading-tight md:text-4xl xl:text-5xl [text-wrap:balance]">
                                {isArabic ? `قطاعات نخدمها في ${countryName}` : `Industries We Serve In ${countryName}`}
                            </h2>
                        </div>
                        <div className="grid gap-px bg-neutral-950 md:grid-cols-2">
                            {industries.map((industry) => {
                                const Icon = industry.icon
                                const copy = industry[locale]
                                return (
                                    <article key={copy[0]} className="bg-white p-5 transition-colors duration-200 hover:bg-[var(--country-surface)]">
                                        <div className="mb-5 flex items-center gap-3">
                                            <Icon className="h-5 w-5 text-[var(--country-primary)]" aria-hidden="true" />
                                            <h3 className="font-black">{copy[0]}</h3>
                                        </div>
                                        <p className="text-sm font-semibold leading-7 text-neutral-600">{copy[1]}</p>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section id="projects" className="scroll-mt-24 border-b border-neutral-950 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="border border-neutral-950 bg-white p-7 text-neutral-950 shadow-[inset_0_8px_0_var(--country-primary)]">
                        <Eyebrow>{isArabic ? 'حلول' : 'Solutions'}</Eyebrow>
                        <h2 className="text-3xl font-black leading-tight md:text-4xl xl:text-5xl [text-wrap:balance]">
                            {isArabic ? `حلول للشركات في ${countryName}` : `Practical Solutions For Companies In ${countryName}`}
                        </h2>
                        <p className="mt-5 text-base font-semibold leading-8 text-neutral-700">
                            {isArabic ? 'أمثلة واضحة لما يمكن بناؤه حسب احتياج الشركة وحجم المشروع.' : `Solution patterns for the ${countryName} market without claiming local clients or invented case studies.`}
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {useCases[locale].map((item, index) => (
                            <div key={item} className="border border-neutral-950 bg-white p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(11,13,18,0.12)]">
                                <p className="font-mono text-xs font-black text-neutral-400">{String(index + 1).padStart(2, '0')}</p>
                                <p className="mt-8 text-xl font-black leading-tight">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b border-neutral-950 bg-white px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1500px]">
                    <Eyebrow>{isArabic ? 'طريقة العمل' : 'Process'}</Eyebrow>
                    <h2 className="max-w-4xl text-3xl font-black leading-tight md:text-4xl xl:text-5xl [text-wrap:balance]">
                        {isArabic ? 'طريقة عمل واضحة.' : 'Clear Milestone Delivery.'}
                    </h2>
                    <div className="mt-10 grid gap-px bg-neutral-950 lg:grid-cols-6">
                        {processSteps[locale].map((step, index) => (
                            <div key={step} className="bg-white p-5 transition-colors duration-200 hover:bg-[var(--country-surface)]">
                                <p className="font-mono text-xs font-black text-[var(--country-primary)]">{String(index + 1).padStart(2, '0')}</p>
                                <p className="mt-10 text-lg font-black leading-7">{step}</p>
                            </div>
                        ))}
                    </div>
                        <p className="mt-6 border border-neutral-950 bg-[var(--country-surface)] p-5 text-base font-semibold leading-8 text-neutral-700">
                        {isArabic ? 'ننجز المشروع عن بُعد من خلال اجتماعات أونلاين، واتساب، وتسليمات مرحلية واضحة.' : 'We deliver remotely through online meetings, WhatsApp communication, and clear milestone handoffs.'}
                    </p>
                </div>
            </section>

            <section id="pricing" className="scroll-mt-24 border-b border-neutral-950 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1500px]">
                    <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div>
                            <Eyebrow>{isArabic ? 'الباقات' : 'Pricing'}</Eyebrow>
                            <h2 className="text-3xl font-black leading-tight md:text-4xl xl:text-5xl [text-wrap:balance]">
                                {isArabic ? `باقات حسب المشروع` : `Flexible Packages In ${country.currency}`}
                            </h2>
                        </div>
                        <p className="max-w-md text-sm font-black uppercase tracking-[0.16em] text-neutral-500">
                            {isArabic ? 'السعر النهائي بعد فهم المتطلبات' : 'Final quote after requirements discovery'}
                        </p>
                    </div>
                    <div className="grid gap-5 lg:grid-cols-3">
                        {country.pricingPackages.map((pack, index) => (
                            <article key={pack.key} className="flex min-h-[520px] flex-col border border-neutral-950 bg-white p-6 shadow-[8px_8px_0_rgba(11,13,18,0.16)] transition-transform duration-200 hover:-translate-y-1">
                                <p className="font-mono text-xs font-black text-neutral-400">{String(index + 1).padStart(2, '0')}</p>
                                <h3 className="mt-8 text-3xl font-black leading-tight">{pack.title[locale]}</h3>
                                <p className="mt-4 text-sm font-semibold leading-7 text-neutral-600">{pack.description[locale]}</p>
                                <p className="mt-6 border border-neutral-950 bg-[var(--country-soft)] p-4 text-sm font-black text-neutral-950">{pack.priceNote[locale]}</p>
                                <ul className="mt-6 space-y-3">
                                    {pack.features[locale].map((feature) => (
                                        <li key={feature} className="flex gap-3 text-sm font-semibold leading-7 text-neutral-700">
                                            <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--country-primary)]" aria-hidden="true" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={whatsapp} className={`mt-auto inline-flex items-center justify-center gap-2 bg-neutral-950 px-5 py-4 text-sm font-black text-white transition-colors duration-200 hover:bg-[var(--country-primary)] ${linkBase}`}>
                                    {isArabic ? 'اطلب عرض سعر عبر واتساب' : 'Request A Quote On WhatsApp'}
                                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b border-neutral-950 bg-[var(--country-surface)] px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1500px]">
                    <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                        <div>
                            <Eyebrow>{isArabic ? 'آراء العملاء' : 'Client Voice'}</Eyebrow>
                            <h2 className="text-3xl font-black leading-tight md:text-4xl xl:text-5xl [text-wrap:balance]">
                                {isArabic ? `ما الذي يهم عملاء ${countryName}؟` : `What Clients In ${countryName} Care About`}
                            </h2>
                        </div>
                        <p className="max-w-xl text-sm font-black leading-7 text-neutral-600">
                            {isArabic ? 'ملاحظات مختصرة من أنواع العملاء الذين نخدمهم، بدون ادعاء أسماء شركات أو قصص غير موثقة.' : 'Short feedback patterns from the types of clients we serve, without fake company claims.'}
                        </p>
                    </div>
                    <div className="grid gap-5 lg:grid-cols-3">
                        {country.testimonials.map((testimonial) => (
                            <figure key={testimonial.name} className="border border-neutral-950 bg-white p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(11,13,18,0.12)]">
                                <blockquote className="text-lg font-black leading-9 text-neutral-950">
                                    “{isArabic ? testimonial.quoteArabic : testimonial.quoteEnglish}”
                                </blockquote>
                                <figcaption className="mt-8 border-t border-neutral-200 pt-4">
                                    <p className="font-black">{testimonial.name}</p>
                                    <p className="mt-1 text-sm font-semibold leading-6 text-neutral-600">{isArabic ? testimonial.roleArabic : testimonial.roleEnglish}</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b border-neutral-950 bg-white px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.48fr_1fr]">
                    <h2 className="text-3xl font-black leading-tight md:text-4xl xl:text-5xl [text-wrap:balance]">
                        {isArabic ? `لماذا CloudTopia؟` : `Why Choose CloudTopia For ${countryName}?`}
                    </h2>
                    <div>
                        <p className="border border-neutral-950 bg-[var(--country-surface)] p-6 text-lg font-semibold leading-9 text-neutral-700">{content.whyCloudTopia}</p>
                        <div className="mt-4 grid gap-px bg-neutral-950 sm:grid-cols-2">
                            {(isArabic
                                ? ['نفهم احتياجات الشركات العربية', 'نبني حلولاً قابلة للتوسع', 'نجمع بين الموقع، النظام، التسويق، والأتمتة', 'تسليم مرحلي واضح', 'دعم وتواصل عبر واتساب', 'مناسب للشركات الناشئة والمتوسطة']
                                : ['We understand regional business needs', 'We build scalable systems', 'We connect site, system, marketing, and automation', 'Clear phased delivery', 'WhatsApp-based support and communication', 'Fit for startups and growing companies']
                            ).map((item) => (
                                <div key={item} className="flex gap-3 bg-white p-4 text-sm font-black">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--country-primary)]" aria-hidden="true" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="faq" className="scroll-mt-24 border-b border-neutral-950 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.38fr_1fr]">
                    <div>
                        <Eyebrow>{isArabic ? 'الأسئلة' : 'FAQ'}</Eyebrow>
                        <h2 className="text-3xl font-black leading-tight md:text-4xl xl:text-5xl [text-wrap:balance]">
                            {isArabic ? 'أسئلة مهمة.' : 'Questions Before You Start.'}
                        </h2>
                    </div>
                    <div className="border border-neutral-950 bg-white">
                        {country.faqs[locale].map((faq) => (
                            <details key={faq.question} className="group border-b border-neutral-950 p-5 last:border-b-0">
                                <summary className={`cursor-pointer list-none text-lg font-black leading-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--country-secondary)]`}>
                                    {faq.question}
                                </summary>
                                <p className="mt-4 text-sm font-semibold leading-8 text-neutral-600">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-[1500px] gap-6 border border-neutral-950 bg-white p-7 text-neutral-950 shadow-[inset_0_10px_0_var(--country-primary)] md:grid-cols-[1fr_auto] md:items-center md:p-10">
                    <div>
                        <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-neutral-500">CloudTopia · {countryName}</p>
                        <h2 className="max-w-4xl text-3xl font-black leading-tight text-neutral-950 md:text-4xl xl:text-5xl [text-wrap:balance]">{content.finalCta}</h2>
                        <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-neutral-700">
                            {isArabic ? 'تواصل معنا الآن لتحصل على استشارة مجانية ومعاينة ديمو مخصصة لاحتياج شركتك.' : 'Contact us now for a free consultation and a custom demo preview for your company need.'}
                        </p>
                    </div>
                    <Link href={whatsapp} className={`inline-flex items-center justify-center gap-2 bg-[var(--country-primary)] px-6 py-4 text-sm font-black text-white transition-colors duration-200 hover:bg-[var(--ink)] ${linkBase}`}>
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        {isArabic ? 'اطلب الديمو المجاني' : 'Request Free Demo'}
                    </Link>
                </div>
            </section>

            <footer className="border-t border-neutral-950 bg-white px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-[1500px] flex-col gap-4 text-sm font-black text-neutral-600 md:flex-row md:items-center md:justify-between">
                    <p translate="no">CloudTopia · {countryName}</p>
                    <div className="flex flex-wrap gap-4">
                        <Link className={`${linkBase} transition-colors duration-200 hover:text-neutral-950`} href={marketsHref}>
                            {isArabic ? 'الأسواق التي نخدمها' : 'Markets We Serve'}
                        </Link>
                        {countryLandingPages.filter((item) => item.slug !== country.slug).slice(0, 4).map((item) => (
                            <Link className={`${linkBase} transition-colors duration-200 hover:text-neutral-950`} key={item.slug} href={locale === 'ar' ? item.arabicUrl : item.englishUrl}>
                                {locale === 'ar' ? item.countryNameArabic : item.countryNameEnglish}
                            </Link>
                        ))}
                    </div>
                </div>
            </footer>
        </main>
    )
}
