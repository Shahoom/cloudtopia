import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import HomePageClient from './HomePageClient'

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
            description: 'CloudTopia helps businesses in Saudi Arabia, UAE, the GCC, and the Arab world build scalable digital products that improve operations, reduce manual work, and accelerate growth.',
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

    return (
        <>
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
            <HomePageClient serverDictionary={homepageDictionary} />
        </>
    )
}
