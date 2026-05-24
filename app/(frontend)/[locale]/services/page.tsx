import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import ServicesPageClient from './ServicesPageClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/services', 'services')
}

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'services')
    const t = dictionary as any
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
            <ServicesPageClient t={t} />
        </>
    )
}
