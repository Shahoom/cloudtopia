import { cookies } from 'next/headers'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const locale = cookies().get('NEXT_LOCALE')?.value ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'المختبر — الابتكار والنماذج التجريبية'
            : 'Labs — Innovation & Experimental Prototypes',
        description: isAr
            ? 'استكشف مختبر كلاود توبيا — مركز الابتكار للذكاء الاصطناعي والسحابة الأصلية والنماذج التجريبية المتطورة. بحث وتطوير يتخطى الحدود.'
            : 'Explore CloudTopia Labs — our innovation hub for AI, cloud-native, and cutting-edge experimental prototypes. Research and development that pushes boundaries.',
        openGraph: {
            title: isAr ? 'مختبر كلاود توبيا — مركز الابتكار' : 'CloudTopia Labs — Innovation Hub',
            description: isAr
                ? 'مركز الابتكار للذكاء الاصطناعي والسحابة الأصلية والنماذج التجريبية المتطورة.'
                : 'Our innovation hub for AI, cloud-native, and cutting-edge experimental prototypes.',
            url: isAr ? 'https://cloudtopia.net/ar/labs' : 'https://cloudtopia.net/en/labs',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'مختبر كلاود توبيا' : 'CloudTopia Labs' }],
        },
        twitter: {
            title: isAr ? 'مختبر كلاود توبيا — مركز الابتكار' : 'CloudTopia Labs — Innovation Hub',
            description: isAr
                ? 'مركز الابتكار للذكاء الاصطناعي والسحابة الأصلية والنماذج التجريبية المتطورة.'
                : 'Our innovation hub for AI, cloud-native, and cutting-edge experimental prototypes.',
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/labs' : 'https://cloudtopia.net/en/labs',
            languages: { 'en': 'https://cloudtopia.net/en/labs', 'ar': 'https://cloudtopia.net/ar/labs', 'x-default': 'https://cloudtopia.net/en/labs' },
        },
    }
}

export default function LabsLayout({ children }: { children: React.ReactNode }) {
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
                            { '@type': 'ListItem', position: 2, name: 'Labs', item: 'https://cloudtopia.net/labs' },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        name: 'CloudTopia Labs — Innovation Hub',
                        description: 'Our innovation hub for AI, cloud-native, and cutting-edge experimental prototypes.',
                        url: 'https://cloudtopia.net/labs',
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
