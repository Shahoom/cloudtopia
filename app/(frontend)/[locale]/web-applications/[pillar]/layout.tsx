import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'
import { localizedDP } from '@/lib/services/digital-presence'
import { getStructuredPillarBySlug } from '@/lib/services/structured-catalog'

/**
 * Service + BreadcrumbList JSON-LD for each web-app pillar page. The FAQPage
 * JSON-LD is emitted inside WebAppPillarPage (so each pillar wins Google
 * "People also ask"), so it is deliberately NOT duplicated here. Modeled on
 * app/(frontend)/[locale]/web-applications/layout.tsx.
 */
export default async function WebAppPillarLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ locale: string; pillar: string }>
}) {
    const { locale = 'en', pillar } = await params
    const p = getStructuredPillarBySlug(pillar)
    const path = `/web-applications/${pillar}`
    const name = p ? localizedDP(p.name, locale) : locale === 'ar' ? 'تطبيقات الويب' : 'Web Applications'
    const description = p
        ? localizedDP(p.description, locale)
        : locale === 'ar'
            ? 'تطبيقات ويب تفاعلية بميزات حية وبوابات ومنصات SaaS.'
            : 'Interactive web applications with real-time features, portals, and SaaS platforms.'

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: locale === 'ar' ? 'الرئيسية' : 'Home', path: '/' },
                        { name: locale === 'ar' ? 'الخدمات' : 'Services', path: '/services' },
                        { name: locale === 'ar' ? 'تطبيقات الويب' : 'Web Applications', path: '/web-applications' },
                        { name, path },
                    ]),
                    buildServiceSchema(locale, {
                        name,
                        description,
                        path,
                        serviceType: 'Web Application Development',
                    }),
                ]}
            />
            {children}
        </>
    )
}
