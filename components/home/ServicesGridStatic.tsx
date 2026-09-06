import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Globe } from 'lucide-react'

import { localePath } from '@/lib/i18n/url'
import { getStructuredPillars } from '@/lib/services/structured-catalog'

type Locale = 'en' | 'ar'

type LocalizedText = {
  en: string
  ar: string
}

const tabs: Array<{
  id: string
  label: LocalizedText
}> = [
  { id: 'digital-presence', label: { en: 'Digital Presence', ar: 'الحضور الرقمي' } },
  { id: 'interactive-web-applications', label: { en: 'Web Applications', ar: 'تطبيقات الويب' } },
  { id: 'business-systems-development', label: { en: 'Business Systems', ar: 'أنظمة الأعمال' } },
  { id: 'mobile-app-development', label: { en: 'Mobile Apps', ar: 'تطبيقات الجوال' } },
  { id: 'cloud-infrastructure', label: { en: 'Cloud & Infrastructure', ar: 'السحابة والبنية التحتية' } },
  { id: 'ai-powered-solutions', label: { en: 'AI Solutions', ar: 'حلول الذكاء الاصطناعي' } },
]

const activeTab = {
  id: 'digital-presence',
  label: tabs[0].label,
  description: {
    en: 'Websites, e-commerce, branding, SEO, social, and content.',
    ar: 'مواقع ومتاجر وهوية وSEO وتواصل اجتماعي ومحتوى.',
  },
  image: '/images/homepage/digital presence.png',
  services: getStructuredPillars('digital-presence').slice(0, 8),
}

const copy = {
  en: {
    badge: 'What We Deliver',
    title: 'Next-Gen IT Services Designed for',
    titleHighlight: 'Digital Growth',
    subtitle:
      'CloudTopia is a premium technology solutions provider that helps businesses to innovate at a quicker rate, become more intelligent in their operations, and grow in a more productive manner.',
    learnMore: 'Learn more',
    viewAll: 'Browse All Services',
  },
  ar: {
    badge: 'ماذا نقدم',
    title: 'خدمات تقنية متكاملة مصممة',
    titleHighlight: 'للنمو الرقمي الفعلي',
    subtitle:
      'كلاود توبيا هي شريكك التقني الموثوق لبناء مواقع وتطبيقات وأنظمة متكاملة تدعم توسع أعمالك في الخليج والشرق الأوسط.',
    learnMore: 'اقرأ المزيد',
    viewAll: 'تصفح كل الخدمات',
  },
} satisfies Record<Locale, Record<string, string>>

export function ServicesGridStatic({ locale }: { locale: Locale }) {
  const isRTL = locale === 'ar'
  const localCopy = copy[locale]
  const leftColumnServices = activeTab.services.slice(0, 4)
  const rightColumnServices = activeTab.services.slice(4, 8)

  return (
    <section
      id="services-section"
      className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f4f1f8] text-neutral-900 overflow-hidden"
      data-header-theme="light"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 80%)',
        }}
      />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center justify-center mb-5">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs font-bold uppercase tracking-widest">
              ✦ {localCopy.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5 text-neutral-900">
            {localCopy.title}{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {localCopy.titleHighlight}
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {localCopy.subtitle}
          </p>
        </div>

        <div className="mb-12">
          <div className="flex justify-center">
            <div
              className="flex items-center gap-1.5 p-1.5 bg-white/80 border border-neutral-200/60 rounded-full max-w-full overflow-x-auto scrollbar-none shadow-md backdrop-blur-md"
              role="tablist"
            >
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={isActive ? `panel-${activeTab.id}` : undefined}
                    aria-disabled="true"
                    tabIndex={-1}
                    className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-[0_3px_10px_rgba(37,99,235,0.25)]"
                      />
                    ) : null}
                    <span className="relative z-10">{tab.label[locale]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_540px_1fr] gap-6 items-center">
          <div className="space-y-4 order-2 lg:order-1">
            {leftColumnServices.map((service) => (
              <ServiceCardStatic
                key={service.slug}
                title={service.name[locale]}
                description={service.description[locale]}
                link={service.href}
                locale={locale}
                learnMoreText={localCopy.learnMore}
              />
            ))}
          </div>

          <div className="flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-full max-w-[540px] aspect-[3.5/4] rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(27,27,35,0.08)] border border-neutral-200">
              <Image
                src={activeTab.image}
                alt={activeTab.label[locale]}
                fill
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover transition-transform duration-700 hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">{activeTab.label[locale]}</h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed line-clamp-4">
                  {activeTab.description[locale]}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 order-3">
            {rightColumnServices.map((service) => (
              <ServiceCardStatic
                key={service.slug}
                title={service.name[locale]}
                description={service.description[locale]}
                link={service.href}
                locale={locale}
                learnMoreText={localCopy.learnMore}
              />
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href={localePath(locale, '/services')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-neutral-500 hover:text-neutral-900 transition-colors duration-300 group border-b border-transparent hover:border-neutral-900/20 pb-0.5"
          >
            {localCopy.viewAll}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

function ServiceCardStatic({
  title,
  description,
  link,
  locale,
  learnMoreText,
}: {
  title: string
  description: string
  link: string
  locale: Locale
  learnMoreText: string
}) {
  const isRTL = locale === 'ar'

  return (
    <div
      className="relative rounded-xl p-[0.75px] transition-transform duration-200 hover:-translate-y-0.5"
      style={{ background: 'rgba(0,0,0,0.06)' }}
    >
      <a
        href={localePath(locale, link)}
        className="group relative flex items-start gap-4 bg-white/95 p-4 rounded-[11px] overflow-hidden shadow-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-50/80 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
          <Globe className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-black text-neutral-900 mb-1.5 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-2.5">{description}</p>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 group-hover:text-blue-700 transition-colors">
            <span>{learnMoreText}</span>
            <ArrowRight
              className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''
              }`}
            />
          </div>
        </div>
      </a>
    </div>
  )
}
