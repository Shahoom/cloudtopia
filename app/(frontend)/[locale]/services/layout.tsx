import { canonicalUrl } from '@/lib/i18n/url'
import { categoryFrontDoor } from '@/lib/seo/services'

export default async function ServicesLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const l = locale ?? 'en'

    const breadcrumbNames: Record<string, { home: string, services: string }> = {
        en: { home: 'Home', services: 'Services' },
        ar: { home: 'الرئيسية', services: 'خدماتنا' },
    }

    const itemListContent: Record<string, { name: string, desc: string, items: string[] }> = {
        en: {
            name: 'CloudTopia Digital Services',
            desc: 'Comprehensive digital services: websites, e-commerce, business systems, web applications, mobile apps, cloud infrastructure, AI automation, and growth support.',
            items: ['Digital Presence', 'Business Systems', 'Web Applications', 'Mobile App Development', 'Cloud & Infrastructure', 'AI-Powered Solutions']
        },
        ar: {
            name: 'خدمات كلاود توبيا الرقمية',
            desc: 'خدمات رقمية شاملة: مواقع، متاجر إلكترونية، أنظمة أعمال، تطبيقات ويب وجوال، بنية سحابية، أتمتة بالذكاء الاصطناعي، ودعم نمو رقمي.',
            items: ['الحضور الرقمي', 'أنظمة الأعمال', 'تطبيقات الويب', 'تطوير تطبيقات الجوال', 'السحابة والبنية التحتية', 'حلول الذكاء الاصطناعي']
        },
    }

    const b = breadcrumbNames[l] || breadcrumbNames.en
    const i = itemListContent[l] || itemListContent.en

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: b.home, item: canonicalUrl(l, '/') },
                            { '@type': 'ListItem', position: 2, name: b.services, item: canonicalUrl(l, '/services') },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        name: i.name,
                        description: i.desc,
                        url: canonicalUrl(l, '/services'),
                        numberOfItems: i.items.length,
                        itemListElement: [
                            'digital-presence',
                            'business-systems-development',
                            'interactive-web-applications',
                            'mobile-app-development',
                            'cloud-infrastructure',
                            'ai-powered-solutions',
                        ].map((id, index) => ({
                            '@type': 'ListItem',
                            position: index + 1,
                            name: i.items[index],
                            url: canonicalUrl(l, categoryFrontDoor(id)),
                        })),
                    }),
                }}
            />
            {children}
        </>
    )
}
