import { getSearchKeywords } from '@/lib/seo/search-keywords'

type SearchKeywordsSectionProps = {
    /** EN route path of the page, e.g. '/services/website-development' or '/industries/healthcare'. */
    path: string
    /** Route params deliver plain strings; anything other than 'ar' renders English. */
    locale: string
    /** Match the surrounding page: 'light' for white/pale pages, 'dark' for dark-themed worlds. */
    tone?: 'light' | 'dark'
    /** Optional accent (any CSS color) used for group labels and chip hover borders. */
    accent?: string
    className?: string
}

/**
 * "What people search for" — the closing SEO section rendered on every service
 * and industry page. Phrases are curated per page in lib/seo/search-keywords
 * (natural search queries, NOT a keyword dump: answer engines penalise
 * stuffing, so each entry reads as genuine "people look for" content).
 * Renders nothing when a page has no curated entry, so wiring it into a
 * template is always safe.
 */
export function SearchKeywordsSection({
    path,
    locale,
    tone = 'light',
    accent,
    className,
}: SearchKeywordsSectionProps) {
    const entry = getSearchKeywords(path, locale)
    if (!entry) return null

    const dark = tone === 'dark'
    const headingId = `search-keywords-${path.replace(/[^a-z0-9]+/gi, '-')}`

    return (
        <section
            aria-labelledby={headingId}
            className={`${dark ? 'border-t border-white/10' : 'border-t border-slate-200 bg-slate-50'} ${className ?? ''}`}
            style={accent ? ({ '--kw-accent': accent } as React.CSSProperties) : undefined}
        >
            <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8">
                <h2
                    id={headingId}
                    className={`text-xl font-bold sm:text-2xl ${dark ? 'text-white' : 'text-slate-900'}`}
                >
                    {entry.heading}
                </h2>
                <p
                    className={`mt-3 max-w-3xl text-[15px] leading-relaxed ${dark ? 'text-white/70' : 'text-slate-600'}`}
                >
                    {entry.intro}
                </p>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    {entry.groups.map((group) => (
                        <div key={group.label}>
                            <h3
                                className={`text-[13px] font-semibold uppercase tracking-wider ${dark ? 'text-white/60' : 'text-slate-500'}`}
                                style={accent ? { color: 'var(--kw-accent)' } : undefined}
                            >
                                {group.label}
                            </h3>
                            <ul className="mt-3 flex flex-wrap gap-2">
                                {group.phrases.map((phrase) => (
                                    <li
                                        key={phrase}
                                        className={`rounded-full border px-3.5 py-1.5 text-[13.5px] leading-snug ${
                                            dark
                                                ? 'border-white/15 bg-white/5 text-white/85'
                                                : 'border-slate-200 bg-white text-slate-700'
                                        }`}
                                    >
                                        {phrase}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
