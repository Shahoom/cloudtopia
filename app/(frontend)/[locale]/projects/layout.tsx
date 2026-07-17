import type { Metadata } from 'next'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    const titles: Record<string, string> = {
        en: 'Projects',
        ar: 'المشاريع',
    }
    const descs: Record<string, string> = {
        en: 'Explore our portfolio of websites, web applications, and digital solutions.',
        ar: 'استكشف محفظتنا من المواقع وتطبيقات الويب والحلول الرقمية.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Projects | CloudTopia',
        ar: 'المشاريع | كلاود توبيا',
    }
    const ogDescs: Record<string, string> = {
        en: 'Our portfolio of real-world digital projects and success stories.',
        ar: 'محفظة مشاريعنا الرقمية وقصص النجاح.',
    }
    const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA' }
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

// JSONLD-6: this layout wraps the 16 project detail pages too, so the 2-item
// BreadcrumbList and listing CollectionPage that used to render here leaked
// onto every detail page. The breadcrumb moved to projects/page.tsx (the
// listing already emits its own localized CollectionPage there).
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
