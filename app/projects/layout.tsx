import { headers } from 'next/headers'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const locale = headers().get('x-locale') ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'مشاريعنا — أعمالنا ودراسات الحالة'
            : 'Projects — Our Work & Case Studies',
        description: isAr
            ? 'استكشف محفظة مشاريع كلاود توبيا الناجحة. من حلول التواجد الرقمي إلى تطبيقات الويب المعقدة وأنظمة الأعمال — شاهد كيف نحوّل الأعمال.'
            : 'Explore CloudTopia\'s portfolio of successful projects. From digital presence solutions to complex web applications and business systems — see how we transform businesses.',
        openGraph: {
            title: isAr ? 'مشاريعنا — محفظة كلاود توبيا' : 'Our Projects — CloudTopia Portfolio',
            description: isAr
                ? 'استكشف محفظة مشاريعنا الناجحة. من التواجد الرقمي إلى تطبيقات الويب المعقدة وأنظمة الأعمال.'
                : 'Explore our portfolio of successful projects. From digital presence to complex web applications and business systems.',
            url: isAr ? 'https://cloudtopia.net/ar/projects' : 'https://cloudtopia.net/en/projects',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'محفظة مشاريع كلاود توبيا' : 'CloudTopia Projects Portfolio' }],
        },
        twitter: {
            title: isAr ? 'مشاريعنا — محفظة كلاود توبيا' : 'Our Projects — CloudTopia Portfolio',
            description: isAr
                ? 'استكشف محفظة مشاريعنا في التحول الرقمي.'
                : 'Explore our portfolio of successful digital transformation projects.',
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/projects' : 'https://cloudtopia.net/en/projects',
            languages: { 'en': 'https://cloudtopia.net/en/projects', 'ar': 'https://cloudtopia.net/ar/projects', 'x-default': 'https://cloudtopia.net/en/projects' },
        },
    }
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cloudtopia.net' },
                            { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://cloudtopia.net/projects' },
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
                        url: 'https://cloudtopia.net/projects',
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
