import { cookies } from 'next/headers'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const locale = cookies().get('NEXT_LOCALE')?.value ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'من نحن — مهمتنا، رؤيتنا وقيمنا'
            : 'About Us — Our Mission, Vision & Values',
        description: isAr
            ? 'تعرّف على مهمة كلاود توبيا لتمكين الشركات بالتقنيات الرقمية والسحابية. اكتشف رؤيتنا وقيمنا وفريقنا المتخصص الذي يخدم العملاء حول العالم.'
            : 'Learn about CloudTopia\'s mission to empower businesses with digital and cloud technologies. Discover our vision, values, and expert team serving clients worldwide.',
        openGraph: {
            title: isAr ? 'من نحن — كلاود توبيا | تقنيات رقمية وسحابية' : 'About CloudTopia — Digital & Cloud Technologies',
            description: isAr
                ? 'تعرّف على مهمتنا لتمكين الشركات بالتقنيات الرقمية والسحابية. اكتشف رؤيتنا وقيمنا وفريقنا.'
                : 'Learn about our mission to empower businesses with digital and cloud technologies. Discover our vision, values, and expert team.',
            url: isAr ? 'https://cloudtopia.net/ar/about' : 'https://cloudtopia.net/en/about',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'من نحن — كلاود توبيا' : 'About CloudTopia' }],
        },
        twitter: {
            title: isAr ? 'من نحن — كلاود توبيا' : 'About CloudTopia',
            description: isAr
                ? 'تعرّف على مهمتنا لتمكين الشركات بالتقنيات الرقمية والسحابية.'
                : 'Learn about our mission to empower businesses with digital and cloud technologies.',
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/about' : 'https://cloudtopia.net/en/about',
            languages: { 'en': 'https://cloudtopia.net/en/about', 'ar': 'https://cloudtopia.net/ar/about', 'x-default': 'https://cloudtopia.net/en/about' },
        },
    }
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
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
                            { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://cloudtopia.net/about' },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'AboutPage',
                        name: 'About CloudTopia',
                        description: 'Learn about CloudTopia\'s mission to empower businesses with digital and cloud technologies.',
                        url: 'https://cloudtopia.net/about',
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
