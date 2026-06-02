'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CheckIcon, ArrowUpRight, Zap } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface BentoCell {
  badge: string
  title: string
  price: string
  priceSuffix: string
  desc: string
  features: string[]
  cta: string
  href: string
  featured?: boolean
  colSpan?: string
  rowSpan?: string
}

interface BentoPricingProps {
  locale: string
  dir: string
}

// ─── Localised data ───────────────────────────────────────────────────────────
function getData(locale: string, href: (p: string) => string): BentoCell[] {
  const isAr = locale === 'ar'

  return [
    {
      badge: isAr ? 'الأكثر طلباً' : 'Most Popular',
      title: isAr ? 'موقع احترافي' : 'Professional Website',
      price: '$999',
      priceSuffix: isAr ? 'دفعة واحدة' : 'one-time',
      desc: isAr
        ? 'موقع يحوّل الزوار إلى عملاء — SEO متكامل، واتساب، وتحليلات متقدمة.'
        : 'A site built to convert — advanced SEO, WhatsApp integration & analytics.',
      features: isAr
        ? ['حتى 15 صفحة', 'SEO متقدم + خريطة الموقع', 'نموذج تواصل + زر واتساب', 'Google Analytics + خرائط الحرارة', 'مدونة + نظام إدارة محتوى', 'عدد اللغات حسب الحاجة']
        : ['Up to 15 pages', 'Advanced SEO + sitemap', 'Smart forms + WhatsApp button', 'Google Analytics + heatmap', 'Blog / news CMS included', 'Multi-language support'],
      cta: isAr ? 'ابنِ موقعي' : 'Build My Website',
      href: href('/pricing#website'),
      featured: true,
      colSpan: 'lg:col-span-4',
    },
    {
      badge: isAr ? 'متجر إلكتروني' : 'E-Commerce',
      title: isAr ? 'متجر النمو' : 'Growth Store',
      price: '$1,299',
      priceSuffix: isAr ? 'دفعة واحدة' : 'one-time',
      desc: isAr
        ? 'متجر متكامل مع بوابة دفع، مخزون، وكوبونات ترويجية.'
        : 'Full store with payment gateway, inventory management & coupons.',
      features: isAr
        ? ['حتى 1,000 منتج', 'بوابة دفع (Stripe/Tap)', 'استرداد السلة المتروكة', 'إشعارات واتساب والبريد']
        : ['Up to 1,000 products', 'Payment gateway (Stripe/Tap)', 'Abandoned cart recovery', 'WhatsApp & email notifications'],
      cta: isAr ? 'طوّر متجري' : 'Launch My Store',
      href: href('/pricing#ecommerce'),
      colSpan: 'lg:col-span-4',
    },
    {
      badge: isAr ? 'نظام إدارة' : 'CRM System',
      title: isAr ? 'نظام CRM' : 'CRM Foundation',
      price: '$1,999',
      priceSuffix: isAr ? 'دفعة واحدة' : 'one-time',
      desc: isAr
        ? 'CRM مخصص مع واتساب والبريد الإلكتروني وتقارير متقدمة.'
        : 'Custom CRM with WhatsApp & email automation plus reports.',
      features: isAr
        ? ['حتى 5 مستخدمين', 'إدارة العملاء المحتملين', 'تكامل واتساب + بريد', 'تقارير ولوحات تحكم']
        : ['Up to 5 users', 'Lead & contact management', 'WhatsApp & email integration', 'Reports & dashboards'],
      cta: isAr ? 'ابنِ نظامي' : 'Build My CRM',
      href: href('/pricing#systems'),
      colSpan: 'lg:col-span-4',
    },
    {
      badge: isAr ? 'قائمة QR' : 'QR Menu',
      title: isAr ? 'القائمة الأساسية' : 'Essential QR Menu',
      price: '$249',
      priceSuffix: isAr ? 'دفعة واحدة' : 'one-time',
      desc: isAr
        ? 'قائمة رقمية فورية للمطاعم مع تحديثات مجانية دائمة.'
        : 'Instant digital menu for restaurants & cafes — free updates.',
      features: isAr
        ? ['حتى 100 عنصر', 'عربي + إنجليزي', 'رمز QR', 'رابط طلب واتساب']
        : ['Up to 100 menu items', 'Arabic + English', 'QR code generation', 'WhatsApp order link'],
      cta: isAr ? 'احصل على قائمتي' : 'Get My Menu',
      href: href('/pricing#qrmenu'),
      colSpan: 'lg:col-span-4',
    },
  ]
}

// ─── Featured card ────────────────────────────────────────────────────────────
function FeaturedCard({ cell, dir }: { cell: BentoCell; dir: string }) {
  const isRtl = dir === 'rtl'
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl flex flex-col',
        'bg-gradient-to-br from-[#2a0e5e] via-[#3b1080] to-[#1a0842]',
        'shadow-xl shadow-primary-900/25 col-span-1',
        cell.colSpan,
      )}
    >
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Glow blob */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-violet-500/20 blur-3xl" />

      {/* Badge row */}
      <div className={cn('relative flex items-center gap-2 px-6 pt-6 pb-0', isRtl && 'flex-row-reverse')}>
        <span className="inline-flex items-center gap-1.5 bg-amber-400/15 border border-amber-400/25 text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-full">
          <Zap className="size-3 fill-amber-300" />
          {cell.badge}
        </span>
      </div>

      {/* Title + price */}
      <div className={cn('relative px-6 pt-4', isRtl && 'text-right')}>
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-1">{cell.badge}</p>
        <h3 className="text-white text-2xl font-bold leading-tight mb-3">{cell.title}</h3>
        <div className={cn('flex items-baseline gap-2', isRtl && 'flex-row-reverse')}>
          <span className="text-5xl font-black tracking-tight text-white">{cell.price}</span>
          <span className="text-white/35 text-sm">{cell.priceSuffix}</span>
        </div>
        <p className="text-white/50 text-sm leading-relaxed mt-3">{cell.desc}</p>
      </div>

      {/* Features */}
      <ul className={cn('relative grid gap-2.5 px-6 pt-5 pb-2 mt-auto', isRtl && 'text-right')}>
        {cell.features.map((f, i) => (
          <li key={i} className={cn('flex items-center gap-2.5 text-white/75 text-sm', isRtl && 'flex-row-reverse')}>
            <div className="shrink-0 size-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <CheckIcon className="size-2.5 text-white" strokeWidth={3} />
            </div>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="relative px-6 pb-6 pt-5">
        <Link
          href={cell.href}
          className={cn(
            'flex items-center justify-center gap-2 w-full rounded-xl py-3 px-5',
            'bg-white text-primary-800 font-bold text-sm',
            'hover:bg-primary-50 transition-colors duration-200 shadow-md',
            isRtl && 'flex-row-reverse',
          )}
        >
          {cell.cta}
          <ArrowUpRight className={cn('size-4', isRtl && 'scale-x-[-1]')} />
        </Link>
      </div>
    </div>
  )
}

// ─── Small card ───────────────────────────────────────────────────────────────
function SmallCard({ cell, dir }: { cell: BentoCell; dir: string }) {
  const isRtl = dir === 'rtl'
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl flex flex-col',
        'bg-white border border-white/90 shadow-sm',
        'hover:shadow-md hover:border-primary-100 transition-all duration-300',
        'col-span-1',
        cell.colSpan,
      )}
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary-300/0 via-primary-400/60 to-primary-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Badge */}
      <div className={cn('px-5 pt-5', isRtl && 'text-right')}>
        <span className="inline-block bg-primary-50 border border-primary-100 text-primary-600 text-[11px] font-semibold px-2.5 py-1 rounded-full">
          {cell.badge}
        </span>
      </div>

      {/* Title + price */}
      <div className={cn('px-5 pt-3', isRtl && 'text-right')}>
        <h3 className="text-neutral-800 font-bold text-base mb-2">{cell.title}</h3>
        <div className={cn('flex items-baseline gap-1.5', isRtl && 'flex-row-reverse')}>
          <span className="text-3xl font-black tracking-tight text-neutral-900">{cell.price}</span>
          <span className="text-neutral-400 text-xs">{cell.priceSuffix}</span>
        </div>
        <p className="text-neutral-400 text-xs leading-relaxed mt-2">{cell.desc}</p>
      </div>

      {/* Divider */}
      <div className="mx-5 mt-4 border-t border-neutral-100" />

      {/* Features */}
      <ul className={cn('grid gap-2 px-5 py-4 mt-auto', isRtl && 'text-right')}>
        {cell.features.map((f, i) => (
          <li key={i} className={cn('flex items-center gap-2 text-neutral-600 text-xs', isRtl && 'flex-row-reverse')}>
            <div className="shrink-0 size-4 rounded-full bg-primary-600 flex items-center justify-center">
              <CheckIcon className="size-2.5 text-white" strokeWidth={3} />
            </div>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="px-5 pb-5 pt-1">
        <Link
          href={cell.href}
          className={cn(
            'flex items-center justify-center gap-1.5 w-full rounded-xl py-2.5 px-4',
            'bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-xs',
            'hover:shadow-md hover:shadow-primary-400/30 transition-all duration-200',
            isRtl && 'flex-row-reverse',
          )}
        >
          {cell.cta}
          <ArrowUpRight className={cn('size-3.5', isRtl && 'scale-x-[-1]')} />
        </Link>
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function BentoPricing({ locale, dir }: BentoPricingProps) {
  const l = (path: string) => `/${locale}${path}`
  const cells = getData(locale, l)
  const [featured, ...rest] = cells

  const isAr = locale === 'ar'
  const isRtl = dir === 'rtl'

  return (
    <div className="space-y-6">
      {/* Section heading */}
      <div className={cn('text-center', isRtl && 'text-right lg:text-center')}>
        <span className="inline-block bg-white border border-primary-100 text-primary-600 text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-sm">
          {isAr ? '✦ أبرز الباقات' : '✦ Popular Packages'}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-1.5">
          {isAr ? 'ابدأ بالخيار المناسب لك' : 'Start with the right plan'}
        </h2>
        <p className="text-neutral-500 text-sm">
          {isAr
            ? 'اختر الباقة المثالية وانطلق — يمكنك التوسع لاحقاً'
            : 'Pick your package and get started — scale anytime'}
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-3 auto-rows-fr">
        {/* Featured */}
        <FeaturedCard cell={featured} dir={dir} />

        {/* E-Commerce — right of featured */}
        <SmallCard cell={rest[0]} dir={dir} />

        {/* CRM */}
        <SmallCard cell={rest[1]} dir={dir} />

        {/* QR Menu */}
        <SmallCard cell={rest[2]} dir={dir} />
      </div>
    </div>
  )
}
