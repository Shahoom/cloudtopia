import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import ContentCreationClient from './ContentCreationClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    const metadata = await getCMSMetadata(locale, '/content-creation', 'content-creation')
    const title = locale === 'ar' ? 'أفضل شركة لصناعة المحتوى الاحترافي' : 'Best Company for Professional Content Creation'
    return { ...metadata, title }
}

export default async function ContentCreationPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'content-creation')
    const t = dictionary as any
    
    const p = t.services?.contentCreationPage || t.contentCreationPage
    const title = p?.hero?.title ? `${p.hero.title} ${p.hero.sliderText || ''}` : 'Professional Content Creation Services'
    const desc = p?.hero?.subtitle ?? ''

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <h1>{title}</h1>
                {desc && <p>{desc}</p>}
                <p>
                    <a href={canonicalUrl(locale, '/contact')}>Start Your Project</a>
                </p>
            </div>
            <ContentCreationClient t={t} />
        </>
    )
}
