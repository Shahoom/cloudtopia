import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import ContactClient from './ContactClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/contact', 'contact')
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'contact')
    const t = dictionary as any
    
    const p = t.contact
    const title = p?.hero?.title || 'Contact Us'
    const desc = p?.hero?.description ?? ''

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <h1>{title}</h1>
                {desc && <p>{desc}</p>}
            </div>
            <ContactClient t={t} />
        </>
    )
}
