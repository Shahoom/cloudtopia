import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getAuthor } from '@/lib/authors'
import { getOgImage } from '@/lib/og/og-image'
import { BASE_URL, canonicalUrl, localePath } from '@/lib/i18n/url'

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en', slug } = await params
    const author = getAuthor(slug)
    if (!author) return { title: 'Author Not Found' }

    const lang = (locale as 'en' | 'ar') ?? 'en'
    const bio = author.bio[lang] || author.bio.en
    const role = author.role[lang] || author.role.en
    const title = `${author.name} — ${role} | CloudTopia`

    return {
        title,
        description: bio.slice(0, 160),
        openGraph: {
            title,
            description: bio.slice(0, 200),
            type: 'profile',
            url: canonicalUrl(locale, `/authors/${author.slug}`),
            // Per-author OG override: /public/images/og/authors/{slug}-{locale}.jpg
            // Falls back to author profile image, then brand default.
            images: [
                {
                    url: getOgImage({
                        page: `authors/${author.slug}`,
                        locale,
                        override: author.image || undefined,
                    })!.url,
                    width: 1200,
                    height: 630,
                    alt: author.name,
                },
            ],
        },
        alternates: {
            canonical: canonicalUrl(locale, `/authors/${author.slug}`),
            languages: {
                en: canonicalUrl('en', `/authors/${author.slug}`),
                ar: canonicalUrl('ar', `/authors/${author.slug}`),
                'x-default': canonicalUrl('en', `/authors/${author.slug}`),
            },
        },
    }
}

export default async function AuthorPage({ params }: PageProps) {
    const { locale = 'en', slug } = await params
    const author = getAuthor(slug)
    if (!author) notFound()

    const lang = (locale as 'en' | 'ar') ?? 'en'
    const isRTL = locale === 'ar'
    const role = author.role[lang] || author.role.en
    const bio = author.bio[lang] || author.bio.en

    const labels = {
        en: { backToBlog: 'CloudTopia Insights', noPosts: 'Published author articles appear in the Insights hub.', knowsAbout: 'Topics' },
        ar: { backToBlog: 'رؤى كلاود توبيا', noPosts: 'تظهر مقالات الكاتب المنشورة في مركز الرؤى.', knowsAbout: 'المواضيع' },
    }[lang]

    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${canonicalUrl(locale, `/authors/${author.slug}`)}#person`,
        name: author.name,
        jobTitle: role,
        description: bio,
        url: canonicalUrl(locale, `/authors/${author.slug}`),
        ...(author.image && { image: `${BASE_URL}${author.image}` }),
        ...(author.knowsAbout && { knowsAbout: author.knowsAbout }),
        ...(author.sameAs && { sameAs: author.sameAs }),
        worksFor: {
            '@type': 'Organization',
            name: 'CloudTopia',
            url: BASE_URL,
        },
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: lang === 'ar' ? 'الرئيسية' : 'Home', item: canonicalUrl(locale, '/') },
            { '@type': 'ListItem', position: 2, name: lang === 'ar' ? 'الرؤى' : 'Insights', item: canonicalUrl(locale, '/insights') },
            { '@type': 'ListItem', position: 3, name: author.name, item: canonicalUrl(locale, `/authors/${author.slug}`) },
        ],
    }

    return (
        <div className="min-h-screen bg-lavender" dir={isRTL ? 'rtl' : 'ltr'}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 border-4 border-white shadow-lg shrink-0">
                            {author.image ? (
                                <Image src={author.image} alt={author.name} fill sizes="128px" className="object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-3xl font-bold text-primary-700">
                                    {author.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold uppercase tracking-widest mb-3">
                                {role}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-3">
                                {author.name}
                            </h1>
                            <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-3xl">
                                {bio}
                            </p>
                            {author.sameAs && author.sameAs.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {author.sameAs.map((url) => {
                                        const host = new URL(url).hostname.replace('www.', '').replace('.com', '')
                                        return (
                                            <a
                                                key={url}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-colors"
                                            >
                                                {host}
                                                <ArrowUpRight className="w-3 h-3" />
                                            </a>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {author.knowsAbout && author.knowsAbout.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-neutral-200">
                            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">
                                {labels.knowsAbout}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {author.knowsAbout.map((topic) => (
                                    <span
                                        key={topic}
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700 text-xs font-semibold"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <p className="text-neutral-500">{labels.noPosts}</p>

                    <div className="mt-12">
                        <Link
                            href={localePath(locale, '/insights')}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 hover:border-neutral-900 text-neutral-900 font-semibold text-sm transition-colors"
                        >
                            {labels.backToBlog}
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
