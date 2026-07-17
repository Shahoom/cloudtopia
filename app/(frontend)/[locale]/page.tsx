import { getPageBundle } from '@/lib/cms/content'
import { getPublishedBlogPosts } from '@/lib/blog/data'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildOrganizationRef, buildFaqSchema, type FaqItem } from '@/lib/seo/schema'
import { serviceCategories, localizedServiceValue } from '@/lib/seo/services'
import type { TeaserPost } from '@/components/home/ArticlesTeaser'
import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    const meta = await getCMSMetadata(locale, '/', 'home')
    const isArabic = locale === 'ar'
    const title = isArabic
        ? 'كلاود توبيا | شركة برمجيات وحلول سحابية وذكاء اصطناعي عربية'
        : 'CloudTopia | Arabic Software, Cloud & AI Company'
    // 140–165 chars — longer truncates in SERPs (the hero keeps the full line).
    const description = isArabic
        ? 'كلاود توبيا شركة عربية للبرمجيات والسحابة والذكاء الاصطناعي — مواقع SEO ومتاجر إلكترونية وأنظمة CRM/ERP وتطبيقات وأتمتة ذكية لشركات الخليج والعالم العربي.'
        : 'CloudTopia — Arabic software, cloud & AI company building SEO websites, e-commerce, CRM/ERP systems, apps and AI automation for the GCC and Arab world.'
    // The homepage title already contains the brand, so emit it as `absolute` to
    // bypass the layout's "%s | CloudTopia" template (which doubled it to
    // "CloudTopia | … | CloudTopia"). Spreading `meta` keeps the canonical URL and
    // the en/ar/x-default hreflang alternates the home route was otherwise missing.
    return {
        ...meta,
        title: { absolute: title },
        description,
        openGraph: { ...meta.openGraph, title, description },
        twitter: { ...meta.twitter, title, description },
    }
}

type ProjectCardSummary = {
    id: string
    title: string
    featured: boolean
}

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, '/')
    const heroPatch = locale === 'ar'
        ? {
            tags: ['كلاود توبيا | تكنلوجيا رقمية وسحابية', 'أنظمة عربية', 'سحابة وذكاء اصطناعي'],
            title: 'أنظمة برمجية وسحابية وذكاء اصطناعي مصممة للعالم العربي.',
            titleHighlights: ['أنظمة برمجية', 'حلول سحابية', 'ذكاء اصطناعي'],
            description: 'تساعد كلاود توبيا الشركات في السعودية، الإمارات، الخليج، والعالم العربي على بناء منتجات رقمية قابلة للتوسع، تحسّن العمليات، تقلل العمل اليدوي، وتسرّع النمو.',
        }
        : {
            tags: ['CLOUDTOPIA — DIGITAL & CLOUD TECHNOLOGIES', 'Arabic Software Company', 'Cloud AI Systems'],
            title: 'Software, cloud, and AI systems built for the Arab world.',
            titleHighlights: ['Software', 'Cloud', 'AI systems'],
            description: 'CloudTopia helps businesses in Oman, Saudi Arabia, UAE, and the Arab world build scalable digital products that improve operations, reduce manual work, and accelerate growth.',
        }
    const homepageDictionary = {
        ...dictionary,
        home: {
            ...(dictionary as any).home,
            hero: {
                ...((dictionary as any).home?.hero || {}),
                ...heroPatch,
            },
        },
    }
    const t = homepageDictionary as any
    const heroDesc = locale === 'ar'
        ? 'كلاود توبيا شركة عربية للبرمجيات والحلول السحابية والذكاء الاصطناعي، تبني مواقع SEO، متاجر إلكترونية، أنظمة CRM/ERP، بنية سحابية، تطبيقات، وأتمتة ذكية للشركات في الخليج والعالم العربي.'
        : 'CloudTopia is an Arabic software, cloud and AI company building SEO websites, e-commerce platforms, CRM/ERP systems, cloud infrastructure, mobile apps and AI automation for the GCC and Arab world.'
    const featured = ((t.projects?.projectCards || []) as ProjectCardSummary[]).filter(
        (p) => p.featured,
    )

    // DL-4: drive the homepage articles teaser from real, locale-filtered CMS
    // posts (was static English sample content — broke the Arabic homepage and
    // risked 404s from re-slugified titles). Falls back to samples if the DB is
    // empty/unreachable (getPublishedBlogPosts already returns [] in that case).
    const latestPosts = await getPublishedBlogPosts(locale)
    const articlePosts: TeaserPost[] = latestPosts.slice(0, 3).map((post) => ({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        shortExcerpt: post.shortExcerpt,
        category: post.category?.name,
        coverImage: post.coverImage?.url,
        contentType: post.contentType,
        readingMinutes: post.readingTime,
    }))

    // SD-7: CollectionPage for the home route, a top-level Service whose
    // OfferCatalog enumerates the seven service categories, and the home
    // FAQPage (moved here from the client FAQ section so it is always in SSR).
    const homeUrl = canonicalUrl(locale, '/')
    const homeCollectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${homeUrl}#webpage`,
        url: homeUrl,
        name: locale === 'ar' ? 'كلاود توبيا' : 'CloudTopia',
        description: heroDesc,
        inLanguage: locale === 'ar' ? 'ar-SA' : 'en-US',
        isPartOf: { '@type': 'WebSite', '@id': 'https://cloudtopia.net/#website' },
        about: buildOrganizationRef(),
    }
    const serviceCatalogSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${homeUrl}#service`,
        name: locale === 'ar' ? 'خدمات كلاود توبيا الرقمية والسحابية' : 'CloudTopia Digital & Cloud Services',
        provider: buildOrganizationRef(),
        url: canonicalUrl(locale, '/services'),
        areaServed: [
            { '@type': 'Country', name: 'Saudi Arabia' },
            { '@type': 'Country', name: 'United Arab Emirates' },
            { '@type': 'Country', name: 'Kuwait' },
            { '@type': 'Country', name: 'Qatar' },
            { '@type': 'Country', name: 'Bahrain' },
            { '@type': 'Country', name: 'Oman' },
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: locale === 'ar' ? 'فئات خدمات كلاود توبيا' : 'CloudTopia Service Categories',
            itemListElement: serviceCategories.map((category) => ({
                '@type': 'OfferCatalog',
                name: localizedServiceValue(category.name, locale),
                description: localizedServiceValue(category.description, locale),
            })),
        },
    }
    const homeFaqItems = (t.home?.faq?.items as FaqItem[] | undefined) || []
    const homeFaqSchema = buildFaqSchema(homeFaqItems)

    return (
        <>
            <JsonLd schema={[homeCollectionSchema, serviceCatalogSchema, homeFaqSchema]} />
            <div className="sr-only" aria-hidden="false">
                {heroDesc && <p>{heroDesc}</p>}
                {featured.length > 0 && (
                    <ul>
                        {featured.map((p) => (
                            <li key={p.id}>
                                <a href={canonicalUrl(locale, `/projects/${p.id}`)}>{p.title}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <HomePageClient serverDictionary={homepageDictionary} articlePosts={articlePosts} />
        </>
    )
}
