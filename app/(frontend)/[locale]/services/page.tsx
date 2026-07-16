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
    const metadata = await getCMSMetadata(locale, '/services', 'services')
    const title = locale === 'ar' ? 'باقات الخدمات' : 'Service Packages'
    return { ...metadata, title }
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
        { path: '/services/website-development', key: 'Website Development' },
        { path: '/services/ecommerce-development', key: 'Ecommerce Solutions' },
        { path: '/services/business-systems-development', key: 'Business Systems Development' },
        { path: '/restaurant-qr-menu', key: 'Restaurant QR Menu' },
        { path: '/services/content-creation', key: 'Content Creation' },
        { path: '/services/social-media-marketing', key: 'Social Media Marketing' },
        { path: '/services/web-applications', key: 'Web Applications' },
        { path: '/services/app-development', key: 'Mobile App Development' },
        { path: '/services/app-development/ios-app-development', key: 'iOS App Development' },
        { path: '/services/app-development/android-app-development', key: 'Android App Development' },
        { path: '/services/app-development/cross-platform-app-development', key: 'Cross-Platform App Development' },
        { path: '/services/app-development/app-backend-api-development', key: 'App Backend & API Development' },
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
