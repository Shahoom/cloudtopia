import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import TermsClient from './TermsClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { termsSeoFallback } from './layout'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/terms', 'terms', {
        title: termsSeoFallback.titles[locale] || termsSeoFallback.titles.en,
        description: termsSeoFallback.descriptions[locale] || termsSeoFallback.descriptions.en,
    })
}

export default async function TermsPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'terms')
    const t = dictionary as any
    
    const p = t.terms
    const title = p?.title || 'Terms of Service'
    const desc = p?.description ?? ''

    // Compute the "Last updated" date string once on the server so SSR and CSR
    // render the same markup (no hydration mismatch). Do NOT construct the
    // current date during client render.
    const lastUpdatedDate = new Date().toLocaleDateString(
        locale === 'ar' ? 'ar-EG' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' },
    )

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <h1>{title}</h1>
                {desc && <p>{desc}</p>}
            </div>
            <TermsClient t={t} lastUpdatedDate={lastUpdatedDate} />
        </>
    )
}
