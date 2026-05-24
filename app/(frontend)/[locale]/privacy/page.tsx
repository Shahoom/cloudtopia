import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import PrivacyClient from './PrivacyClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/privacy', 'privacy')
}

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'privacy')
    const t = dictionary as any
    
    const p = t.privacy
    const title = p?.title || 'Privacy Policy'
    const desc = p?.description ?? ''

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <h1>{title}</h1>
                {desc && <p>{desc}</p>}
            </div>
            <PrivacyClient t={t} />
        </>
    )
}
