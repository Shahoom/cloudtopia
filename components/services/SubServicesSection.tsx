import { SubServiceGlowCard } from './SubServiceGlowCard'

/**
 * Grid of a pillar's sub-services, rendered with the same GlowingEffect cards
 * used on the /services hub — so a pillar page (e.g. /website-development) shows
 * the exact same cards as the hub. `href` is where each card links (these
 * sub-services have no individual page, so they point at the pillar/contact).
 */
export function SubServicesSection({
    heading,
    subServices,
    locale,
    icon = '/icons/services/Website Design & Development.png',
    href = '/contact',
}: {
    heading: string
    subServices: string[]
    locale: string
    icon?: string
    href?: string
}) {
    const isAr = locale === 'ar'
    return (
        <section className="bg-[#f4f1f8] px-4 py-16 sm:px-6 lg:px-8 md:py-20" dir={isAr ? 'rtl' : 'ltr'} aria-label={heading}>
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex items-end gap-3">
                    <div className="h-9 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-blue-400 to-cyan-400" aria-hidden="true" />
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                        {heading} <span className="text-slate-400">· {subServices.length} {isAr ? 'خدمة' : 'services'}</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {subServices.map((sub) => (
                        <SubServiceGlowCard key={sub} href={href} name={sub} icon={icon} locale={locale} />
                    ))}
                </div>
            </div>
        </section>
    )
}
