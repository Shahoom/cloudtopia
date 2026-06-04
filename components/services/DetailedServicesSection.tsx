'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'
import { getServiceCategory, localizedServiceOutcomes, localizedServiceValue } from '@/lib/seo/services'
import { cn } from '@/lib/utils'

const mainServiceCategoryMap: Record<string, string[]> = {
  'website-design': ['digital-presence'],
  'ecommerce-solutions': ['digital-presence', 'digital-growth-support'],
  'business-systems-development': ['business-systems-development'],
  'web-applications': ['interactive-web-applications'],
  'content-creation': ['digital-growth-support'],
  'social-media-marketing': ['digital-growth-support'],
  'restaurant-qr-menu': ['digital-presence', 'interactive-web-applications'],
}

const serviceIcons: Record<string, string> = {
  'digital-presence': '/icons/services/Website Design & Development.png',
  'interactive-web-applications': '/icons/services/webapps.png',
  'business-systems-development': '/icons/services/systems.png',
  'cloud-infrastructure': '/icons/services/systems.png',
  'ai-powered-solutions': '/icons/services/Real-time Chat System.png',
  'digital-growth-support': '/icons/services/Analytics Dashboard.png',
}

type DetailedServicesSectionProps = {
  mainService: keyof typeof mainServiceCategoryMap
  locale: string
  className?: string
}

export default function DetailedServicesSection({
  mainService,
  locale,
  className,
}: DetailedServicesSectionProps) {
  const isRTL = locale === 'ar'
  const categorySlugs = mainServiceCategoryMap[mainService] || []
  const categories = categorySlugs.map(getServiceCategory).filter(Boolean)
  const services = categories.flatMap((category) => category?.services || [])
  if (services.length === 0) return null

  const copy = isRTL
    ? {
        eyebrow: 'الخدمات التفصيلية',
        title: 'اختر المسار الأدق داخل هذه الخدمة',
        body: 'هذه البطاقات تربط الخدمة الرئيسية بالحلول المتخصصة الجديدة، حتى تصل مباشرة إلى النطاق المناسب دون تغيير تصميم صفحة الخدمة الأساسية.',
        cta: 'تفاصيل الخدمة',
      }
    : {
        eyebrow: 'Detailed services',
        title: 'Choose the more specific delivery path',
        body: 'These cards connect the main service page to the newer specialized services, so visitors can move from the broad offer into a precise scope.',
        cta: 'View details',
      }

  return (
    <section className={cn('relative bg-[#f4f1f8] px-4 py-16 sm:px-6 lg:px-8 md:py-20', className)} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(125,211,252,0.22),transparent_30%),radial-gradient(circle_at_86%_8%,rgba(216,180,254,0.28),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-9 grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-eerie/10 bg-white/80 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-eerie shadow-sm">
              <Layers className="h-3.5 w-3.5 text-primary-700" aria-hidden="true" />
              {copy.eyebrow}
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-eerie md:text-5xl" style={{ textWrap: 'balance' }}>
              {copy.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base font-semibold leading-8 text-neutral-600 md:text-lg">{copy.body}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const name = localizedServiceValue(service.name, locale)
            const categoryIcon = serviceIcons[service.categorySlug] || '/icons/services/Admin Dashboard.png'
            return (
              <Link
                key={service.slug}
                href={localePath(locale, `/services/${service.slug}`)}
                className="group flex min-h-[17rem] flex-col rounded-lg border border-eerie/10 bg-white/86 p-5 shadow-sm backdrop-blur transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-100"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 bg-[#f4f1f8] p-2">
                    <Image src={categoryIcon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                  </span>
                  <span className="text-xs font-black tracking-[0.18em] text-neutral-300">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-xl font-black leading-tight text-eerie">{name}</h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-neutral-600">
                  {localizedServiceValue(service.description, locale)}
                </p>
                <div className="mt-5 grid gap-2">
                  {localizedServiceOutcomes(service, locale).slice(0, 2).map((outcome) => (
                    <span key={outcome} className="inline-flex items-start gap-2 text-xs font-bold leading-5 text-neutral-600">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-primary-600" aria-hidden="true" />
                      {outcome}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-primary-700">
                  {copy.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
