import type { Metadata } from 'next'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Our Projects — Real Work, Real Impact',
        ar: 'مشاريعنا — أعمال حقيقية، تأثير حقيقي',
        tr: 'Projelerimiz — Gerçek İş, Gerçek Etki',
    }
    const descs: Record<string, string> = {
        en: 'Explore our portfolio of websites, web applications, and digital solutions.',
        ar: 'استكشف محفظتنا من المواقع وتطبيقات الويب والحلول الرقمية.',
        tr: 'Web siteleri, web uygulamaları ve dijital çözümler portföyümüzü keşfedin.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Projects — CloudTopia',
        ar: 'المشاريع — كلاود توبيا',
        tr: 'Projeler — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Our portfolio of real-world digital projects and success stories.',
        ar: 'محفظة مشاريعنا الرقمية وقصص النجاح.',
        tr: 'Gerçek dünya dijital projeleri ve başarı hikayelerimizin portföyü.',
    }
    const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' }
    const title = titles[locale] || titles.en
    const desc = descs[locale] || descs.en
    const ogTitle = ogTitles[locale] || ogTitles.en
    const ogDesc = ogDescs[locale] || ogDescs.en

    return {
        title,
        description: desc,
        openGraph: {
            title: ogTitle,
            description: ogDesc,
            url: canonicalUrl(locale, '/projects'),
            locale: ogLocales[locale] || 'en_US',
            images: ogImagesFor({ page: 'projects', locale }),
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: canonicalUrl(locale, '/projects'),
            languages: buildHreflangMap('/projects'),
        },
    }
}

export default function ProjectsLayout({ children, params }: { children: React.ReactNode; params?: { locale?: string } }) {
    const locale = params?.locale ?? 'en'
    const breadcrumbNames: Record<string, { home: string; projects: string }> = {
        en: { home: 'Home', projects: 'Projects' },
        ar: { home: 'الرئيسية', projects: 'المشاريع' },
        tr: { home: 'Ana Sayfa', projects: 'Projeler' },
    }
    const names = breadcrumbNames[locale] || breadcrumbNames.en

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: names.home, item: canonicalUrl(locale, '/') },
                            { '@type': 'ListItem', position: 2, name: names.projects, item: canonicalUrl(locale, '/projects') },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: 'CloudTopia Projects Portfolio',
                        description: 'Explore our portfolio of successful digital transformation projects.',
                        url: canonicalUrl(locale, '/projects'),
                        inLanguage: locale === 'ar' ? 'ar' : locale === 'tr' ? 'tr' : 'en',
                        mainEntity: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
