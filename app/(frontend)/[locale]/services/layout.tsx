import { canonicalUrl } from '@/lib/i18n/url'
import { serializeJsonLd } from '@/components/seo/JsonLd'
import { categoryFrontDoor } from '@/lib/seo/services'

export default async function ServicesLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const l = locale ?? 'en'

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

    const i = itemListContent[l] || itemListContent.en

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd({
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
