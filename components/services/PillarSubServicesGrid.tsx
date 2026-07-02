import { getStructuredPillarBySlug } from '@/lib/services/structured-catalog'
import { getDigitalPresenceSubServicesByPillar } from '@/lib/services/digital-presence-content'
import { localizedDP } from '@/lib/services/digital-presence'
import { SubServiceGlowCard } from './SubServiceGlowCard'

/**
 * Section that lists a pillar's sub-services as glow cards. Added to the pillar's
 * main page (e.g. /ecommerce-development, /social-media-marketing) so the main
 * page doubles as a hub for its sub-services.
 */
export function PillarSubServicesGrid({ pillarSlug, locale }: { pillarSlug: string; locale: string }) {
    const isAr = locale === 'ar'
    const subs = getDigitalPresenceSubServicesByPillar(pillarSlug, locale)
    if (subs.length === 0) return null
    const pillar = getStructuredPillarBySlug(pillarSlug)
    const icon = pillar?.icon ?? '/icons/services/webapps.png'
    const pillarName = pillar ? localizedDP(pillar.name, locale) : ''

    return (
        <section dir={isAr ? 'rtl' : 'ltr'} className="bg-[#f4f1f8] py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">
                        {isAr ? 'الخدمات الفرعية' : 'Explore the services'}
                    </p>
                    <h2 className="text-balance text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">
                        {isAr ? `كل خدمات ${pillarName}` : `Every ${pillarName} service`}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
                        {isAr
                            ? 'اختر الخدمة التي تناسبك — كل خدمة لها صفحة مخصصة بمحتوى وتفاصيل خاصة بها.'
                            : 'Pick the service you need — each has its own page with tailored details.'}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {subs.map((s) => (
                        <SubServiceGlowCard key={s.slug} href={s.href} name={s.name} desc={s.desc} icon={icon} locale={locale} />
                    ))}
                </div>
            </div>
        </section>
    )
}
