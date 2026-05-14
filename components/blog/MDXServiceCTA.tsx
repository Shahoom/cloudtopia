import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'

type MDXServiceCTAProps = {
    title: string
    description: string
    href: string
    label?: string
    locale?: string
}

/**
 * In-post CTA card linking to a CloudTopia service page.
 * Use at the end of relevant sections to pass internal link equity
 * from the blog to money pages.
 */
export default function MDXServiceCTA({
    title,
    description,
    href,
    label,
    locale = 'en',
}: MDXServiceCTAProps) {
    const resolvedHref = href.startsWith('http') ? href : localePath(locale, href)
    const ctaLabel = label || (locale === 'ar' ? 'اقرأ أكثر' : locale === 'tr' ? 'Daha fazla bilgi' : 'Learn more')
    return (
        <aside className="not-prose my-10 rounded-3xl border border-primary-200 bg-gradient-to-br from-primary-50/80 via-white to-secondary-50/60 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-primary-200 text-primary-700 text-[10px] font-bold uppercase tracking-widest mb-3">
                        CloudTopia
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2 leading-tight">
                        {title}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                        {description}
                    </p>
                </div>
                <Link
                    href={resolvedHref}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white font-semibold text-sm hover:bg-neutral-800 transition-colors shrink-0"
                >
                    {ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </aside>
    )
}
