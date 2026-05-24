import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import LabsClient from './LabsClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/labs', 'labs')
}

export default async function LabsPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'labs')
    const t = dictionary as any
    
    const p = t.labs
    const title = p?.hero?.scramblePhrases?.[0] || 'Applied AI, Engineered for Impact'
    const desc = p?.hero?.scrambleSubtitle || ''

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <h1>{title}</h1>
                {desc && <p>{desc}</p>}
            </div>
            <LabsClient t={t} />
        </>
    )
}
