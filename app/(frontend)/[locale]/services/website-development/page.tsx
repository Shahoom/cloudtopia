import { getPageBundle } from '@/lib/cms/content'
import { SearchKeywordsSection } from '@/components/seo/SearchKeywordsSection'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import WebsiteDesignClient from './WebsiteDesignClient'
import { ServiceFAQSection } from '@/components/services/ServiceFAQSection'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { websiteDesignSeoFallback } from '@/lib/services/service-page-seo-fallbacks'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    const metadata = await getCMSMetadata(locale, '/services/website-development', 'website-design', {
        title: websiteDesignSeoFallback.titles[locale] || websiteDesignSeoFallback.titles.en,
        description: websiteDesignSeoFallback.descriptions[locale] || websiteDesignSeoFallback.descriptions.en,
    })
    const title = locale === 'ar' ? 'أفضل شركة تطوير مواقع' : 'Best Website Development Company'
    return { ...metadata, title }
}

export default async function WebsiteDesignPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'website-design')
    const t = dictionary as any
    
    const p = t.services?.websiteDesignPage || t.websiteDesignPage
    const title = p?.hero?.prefix ? `${p.hero.prefix} ${p.hero.suffix || ''}` : 'Website Design'
    const desc = p?.hero?.description ?? ''

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                {/* Single page H1: clean server-rendered text. The visible animated
                    heading (WebDesignHero) is intentionally NOT an h1 — its rotating
                    words crawl as garbled concatenated text. */}
                <h1>{title}</h1>
                {desc && <p>{desc}</p>}
                <p>
                    <a href={canonicalUrl(locale, '/contact')}>Start Your Project</a>
                </p>
            </div>
            <WebsiteDesignClient t={t} />
            <ServiceFAQSection slug="website-design" locale={locale} />
            <SearchKeywordsSection path="/services/website-development" locale={locale} />
        </>
    )
}
