import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import ServicesPageClient from './ServicesPageClient'

export default async function ServicesPage({
    params,
}: {
    params: { locale: string }
}) {
    const locale = (params.locale ?? 'en') as Locale
    const t = await getDictionary(locale)
    const heroTitle = t.services?.hero?.title ?? 'Services'
    const heroDesc = t.services?.hero?.description ?? ''

    const detailRoutes: Array<{ path: string; key: string }> = [
        { path: '/website-design', key: 'Website Design' },
        { path: '/ecommerce-solutions', key: 'Ecommerce Solutions' },
        { path: '/business-systems-development', key: 'Business Systems Development' },
        { path: '/restaurant-qr-menu', key: 'Restaurant QR Menu' },
        { path: '/content-creation', key: 'Content Creation' },
        { path: '/social-media-marketing', key: 'Social Media Marketing' },
        { path: '/web-applications', key: 'Web Applications' },
    ]

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <h1>{heroTitle}</h1>
                <p>{heroDesc}</p>
                <ul>
                    {detailRoutes.map((r) => (
                        <li key={r.path}>
                            <a href={canonicalUrl(locale, r.path)}>{r.key}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <ServicesPageClient />
        </>
    )
}
