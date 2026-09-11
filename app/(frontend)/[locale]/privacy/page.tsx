import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import PrivacyClient from './PrivacyClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { en as enDict } from '@/lib/i18n/translations/en'
import { ar as arDict } from '@/lib/i18n/translations/ar'
import { privacySeoFallback } from './layout'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/privacy', 'privacy', {
        title: privacySeoFallback.titles[locale] || privacySeoFallback.titles.en,
        description: privacySeoFallback.descriptions[locale] || privacySeoFallback.descriptions.en,
    })
}

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'privacy')
    // Legal text is code-authored and versioned: always take the privacy sections
    // from the code dictionary so a stale CMS copy can never shadow a policy
    // update. Other dictionary keys still come from the CMS bundle.
    const t = { ...(dictionary as any), privacy: (locale === 'ar' ? arDict : enDict).privacy } as any
    
    const p = t.privacy
    const title = p?.title || 'Privacy Policy'
    const desc = p?.description ?? ''

    // Compute the "Last updated" date string once on the server so SSR and CSR
    // render the same markup (no hydration mismatch). Do NOT construct the
    // current date during client render.
    // The date this policy text was last actually revised — not "today".
    const lastUpdatedDate = new Date('2026-09-11T00:00:00Z').toLocaleDateString(
        locale === 'ar' ? 'ar-EG' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' },
    )

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <p>{title}</p>
                {desc && <p>{desc}</p>}
            </div>
            <PrivacyClient t={t} lastUpdatedDate={lastUpdatedDate} />
        </>
    )
}
