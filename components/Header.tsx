'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  FolderKanban,
  Info,
  Layers,
  MapPin,
  Menu,
  MessageSquare,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { serviceCategories, localizedServiceValue } from '@/lib/seo/services'
import { industries, industrySlugs, localizedValue } from '@/lib/seo/industries'
import { countryLandingPages } from '@/lib/seo/country-landing-pages'

type MegaMenuType = 'services' | 'industries' | 'locations'

function localizedLocationName(slug: string, locale: string) {
  const location = countryLandingPages.find((country) => country.slug === slug)
  return locale === 'ar' ? location?.countryNameArabic : location?.countryNameEnglish
}

function enterprisePaths(locale: string) {
  return locale === 'ar'
    ? [
      { label: 'الأسعار', body: 'باقات واضحة قبل بدء التنفيذ.', href: '/pricing', icon: CircleDollarSign },
      { label: 'منهجية التنفيذ', body: 'اكتشاف، تصميم، بناء، وتسليم.', href: '/process', icon: ClipboardCheck },
      { label: 'الأعمال السابقة', body: 'مشاريع توضّح المشكلة والحل.', href: '/projects', icon: FolderKanban },
      { label: 'مركز الثقة', body: 'ملكية، أمان، وتسليم منظم.', href: '/trust', icon: ShieldCheck },
    ]
    : [
      { label: 'Pricing', body: 'Clear packages before production.', href: '/pricing', icon: CircleDollarSign },
      { label: 'Delivery process', body: 'Discovery, design, build, handoff.', href: '/process', icon: ClipboardCheck },
      { label: 'Projects', body: 'Proof with challenge and solution.', href: '/projects', icon: FolderKanban },
      { label: 'Trust Center', body: 'Ownership, security, clean handoff.', href: '/trust', icon: ShieldCheck },
    ]
}

function MegaMenuPathCards({ locale, onClose }: { locale: string; onClose: () => void }) {
  const l = (path: string) => localePath(locale, path)

  return (
    <div className="grid gap-2">
      {enterprisePaths(locale).map((path) => {
        const Icon = path.icon
        return (
          <Link
            key={path.href}
            href={l(path.href)}
            onClick={onClose}
            className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 border border-neutral-950 bg-white px-3 py-3 text-neutral-950 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#f5f7ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            <span className="flex h-9 w-9 items-center justify-center bg-neutral-950 text-white">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
              <span className="min-w-0">
                <span className="block text-sm font-black leading-tight">{path.label}</span>
              <span className="mt-0.5 block line-clamp-2 text-xs leading-relaxed text-neutral-600">{path.body}</span>
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        )
      })}
    </div>
  )
}

function MenuPanel({
  children,
  width = 'w-[1040px]',
}: {
  children: React.ReactNode
  width?: string
}) {
  return (
    <div className={`absolute left-1/2 top-full ${width} -translate-x-1/2 pt-3`}>
      <div className="max-h-[calc(100vh-6rem)] overflow-y-auto border-2 border-slate-950 bg-[#fbfaf7] p-4 text-slate-950 shadow-[10px_10px_0px_rgba(15,23,42,0.18)]">
        {children}
      </div>
    </div>
  )
}

function MegaMenu({ type, locale, onClose }: { type: MegaMenuType; locale: string; onClose: () => void }) {
  const l = (path: string) => localePath(locale, path)

  if (type === 'services') {
    const copy = locale === 'ar'
      ? {
        title: 'الخدمات',
        subtitle: 'مواقع، تطبيقات، أنظمة، سحابة، ذكاء اصطناعي، ونمو رقمي.',
        viewAll: 'عرض كل الخدمات',
      }
      : {
        title: 'Services',
        subtitle: 'Websites, apps, systems, cloud, AI, and digital growth.',
        viewAll: 'View All Services',
      }

    return (
      <MenuPanel width="w-[920px]">
        <div className="mb-4 grid gap-4 border-b-2 border-slate-950 pb-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-2xl font-black leading-none text-slate-950">{copy.title}</p>
            <p className="mt-2 max-w-xl text-sm font-bold leading-6 text-slate-600">{copy.subtitle}</p>
          </div>
          <Link
            href={l('/services')}
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-2 border-2 border-slate-950 bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-[3px_3px_0px_rgba(14,165,233,0.35)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            {copy.viewAll}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-px bg-slate-950/15 md:grid-cols-3">
          {serviceCategories.map((category) => (
            <section key={category.slug} className="bg-white p-4 transition-colors duration-200 hover:bg-sky-50">
              <Link
                href={l(`/services#${category.slug}`)}
                onClick={onClose}
                className="group flex items-center gap-2 text-sm font-black text-slate-950 hover:text-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <Layers className="h-4 w-4 text-sky-600" aria-hidden="true" />
                <span className="line-clamp-1">{localizedServiceValue(category.name, locale)}</span>
              </Link>
              <div className="mt-3 grid gap-1">
                {category.services.slice(0, 2).map((service) => (
                  <Link
                    key={service.slug}
                    href={l(`/services/${service.slug}`)}
                    onClick={onClose}
                    className="group flex min-w-0 items-center justify-between gap-2 border-t border-slate-100 py-2 text-xs font-bold text-slate-600 transition-colors duration-200 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    <span className="line-clamp-1">{localizedServiceValue(service.name, locale)}</span>
                    <ArrowUpRight className="h-3 w-3 shrink-0 opacity-45 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </MenuPanel>
    )
  }

  if (type === 'industries') {
    const copy = locale === 'ar'
      ? {
        title: 'القطاعات',
        subtitle: 'حلول رقمية حسب طريقة عمل كل قطاع.',
        viewAll: 'عرض كل القطاعات',
      }
      : {
        title: 'Industries',
        subtitle: 'Digital systems shaped around real industry workflows.',
        viewAll: 'View All Industries',
      }

    return (
      <MenuPanel width="w-[820px]">
        <div className="mb-4 grid gap-4 border-b-2 border-slate-950 pb-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-2xl font-black leading-none text-slate-950">{copy.title}</p>
            <p className="mt-2 max-w-xl text-sm font-bold leading-6 text-slate-600">{copy.subtitle}</p>
          </div>
          <Link
            href={l('/industries')}
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-2 border-2 border-slate-950 bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-[3px_3px_0px_rgba(14,165,233,0.35)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            {copy.viewAll}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-px bg-slate-950/15 sm:grid-cols-2">
          {industrySlugs.map((slug) => {
            const industry = industries[slug]
            return (
              <Link
                key={slug}
                href={l(`/industries/${slug}`)}
                onClick={onClose}
                className="group flex min-w-0 items-start gap-3 bg-white p-4 transition-colors duration-200 hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-slate-950 bg-[#eef7ff] text-sky-800">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black leading-tight text-slate-950">{localizedValue(industry.name, locale)}</span>
                  <span className="mt-1 block line-clamp-2 text-xs leading-relaxed text-slate-500">{localizedValue(industry.description, locale)}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </MenuPanel>
    )
  }

  const copy = locale === 'ar'
    ? {
      title: 'الأسواق',
      subtitle: 'صفحات الدول التي نخدمها مع أرقام التواصل والأسعار المحلية.',
      viewAll: 'عرض كل الأسواق',
    }
    : {
      title: 'Markets',
      subtitle: 'Country pages for the markets we serve, with local contact and pricing context.',
      viewAll: 'View All Markets',
    }

  return (
    <MenuPanel width="w-[920px]">
      <div className="mb-4 grid gap-4 border-b-2 border-slate-950 pb-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-2xl font-black leading-none text-slate-950">{copy.title}</p>
          <p className="mt-2 max-w-xl text-sm font-bold leading-6 text-slate-600">{copy.subtitle}</p>
        </div>
        <Link
          href={l('/markets')}
          onClick={onClose}
          className="inline-flex shrink-0 items-center gap-2 border-2 border-slate-950 bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-[3px_3px_0px_rgba(16,185,129,0.35)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          {copy.viewAll}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid gap-px bg-slate-950/15 sm:grid-cols-3">
        {countryLandingPages.map((location) => (
          <Link
            key={location.slug}
            href={locale === 'ar' ? location.arabicUrl : location.englishUrl}
            onClick={onClose}
            className="group bg-white p-4 transition-colors duration-200 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            style={{ borderInlineStartColor: location.theme.primaryAccent, borderInlineStartWidth: 3 }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-2 text-sm font-black text-slate-950">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                <span className="truncate">{localizedLocationName(location.slug, locale)}</span>
              </span>
              <span className="rounded bg-white px-2 py-0.5 text-[10px] font-black text-slate-500 ring-1 ring-slate-200">{location.currency}</span>
            </div>
          </Link>
        ))}
      </div>
    </MenuPanel>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuType | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { t, dir, locale, navigation: cmsNavigation } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-header-theme="dark"]')
    if (darkSections.length === 0) {
      setIsDarkSection(false)
      return
    }

    const activeDarkSections = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activeDarkSections.add(entry.target)
          else activeDarkSections.delete(entry.target)
        })
        setIsDarkSection(activeDarkSections.size > 0)
      },
      { rootMargin: '0px 0px -95% 0px', threshold: 0 },
    )

    darkSections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const l = (path: string) => localePath(locale, path)
  const insightsLabel = locale === 'ar' ? 'الرؤى' : 'Insights'
  const servicesLabel = locale === 'ar' ? 'الخدمات' : t.nav.services
  const industriesLabel = locale === 'ar' ? 'القطاعات' : 'Industries'
  const marketsLabel = locale === 'ar' ? 'الأسواق' : 'Markets'
  const pricingLabel = locale === 'ar' ? 'الأسعار' : 'Pricing'

  const navigation = [
    { name: t.nav.home, href: l('/') },
    { name: servicesLabel, href: l('/services'), menu: 'services' as const },
    { name: industriesLabel, href: l('/industries'), menu: 'industries' as const },
    { name: marketsLabel, href: l('/markets'), menu: 'locations' as const },
    { name: t.nav.projects, href: l('/projects'), icon: FolderKanban },
    { name: pricingLabel, href: l('/pricing'), icon: CircleDollarSign },
    { name: t.nav.about, href: l('/about'), icon: Info },
    { name: insightsLabel, href: l('/insights'), icon: BookOpen },
  ]

  const cta = (cmsNavigation?.cta as { label?: string; href?: string } | undefined) || {
    label: t.nav.getStarted,
    href: '/contact',
  }

  const headerTone = isScrolled || mobileMenuOpen
    ? isDarkSection
      ? 'border-white/10 bg-[#07111f]/92 text-white shadow-lg shadow-black/20 backdrop-blur-xl'
      : 'border-slate-950/10 bg-[#fbfbf8]/94 text-slate-950 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl'
    : 'border-transparent bg-transparent text-neutral-950'

  return (
    <header ref={headerRef} className={`sticky top-0 z-[9999] border-b transition-[background-color,border-color,box-shadow] duration-300 ${headerTone}`} dir={dir}>
      <nav className="container">
        <div className={`flex items-center justify-between gap-4 transition-[height] duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          <Link
            href={l('/')}
            className="group flex min-w-0 shrink-0 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            translate="no"
          >
            <Image
              src="/images/CloudTopia.svg"
              alt="CloudTopia"
              width={150}
              height={44}
              priority
              className={`w-auto transition-[height,transform] duration-300 group-hover:scale-[1.03] ${isScrolled ? 'h-8 sm:h-9' : 'h-10 sm:h-11'}`}
            />
            <span className="hidden min-w-0 flex-col leading-none min-[390px]:flex">
              <span className={`font-logo text-xl font-black sm:text-2xl ${isDarkSection && (isScrolled || mobileMenuOpen) ? 'text-white' : 'text-neutral-950'}`}>
                Cloud<span className="text-sky-600">Topia</span>
              </span>
              <span className={`mt-1 text-[9px] font-black uppercase tracking-[0.08em] sm:text-[10px] ${isDarkSection && (isScrolled || mobileMenuOpen) ? 'text-white/62' : 'text-neutral-600'}`}>
                Digital & Cloud Technologies
              </span>
            </span>
          </Link>

          <div className="hidden xl:flex">
            <div className="relative" onMouseLeave={() => setActiveMegaMenu(null)}>
              <div className={`flex items-center gap-0 border-y px-1 ${isDarkSection && (isScrolled || mobileMenuOpen) ? 'border-white/15 bg-white/8' : 'border-slate-950/10 bg-white/70'}`}>
                {navigation.slice(1).map((item) => {
                  const Icon = item.icon
                  const menu = 'menu' in item ? item.menu : null
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onMouseEnter={() => menu && setActiveMegaMenu(menu)}
                      onFocus={() => menu && setActiveMegaMenu(menu)}
                      className={`group relative inline-flex h-11 items-center gap-1.5 px-3 text-sm font-black transition-[background-color,color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-sky-500 after:transition-transform after:duration-200 hover:after:scale-x-100 ${isDarkSection && (isScrolled || mobileMenuOpen)
                        ? 'text-white/82 hover:bg-white/8 hover:text-white'
                        : 'text-slate-700 hover:bg-slate-950/[0.03] hover:text-slate-950'
                        }`}
                    >
                      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                      {item.name}
                      {menu && <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />}
                    </Link>
                  )
                })}
              </div>
              {activeMegaMenu && <MegaMenu type={activeMegaMenu} locale={locale} onClose={() => setActiveMegaMenu(null)} />}
            </div>
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            <LanguageSwitcher isDark={isDarkSection && (isScrolled || mobileMenuOpen)} />
            <Link
              href={l(cta.href || '/contact')}
              className="inline-flex h-11 items-center gap-2 border-2 border-slate-950 bg-slate-950 px-5 text-sm font-black text-white shadow-[4px_4px_0px_rgba(14,165,233,0.35)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-[6px_6px_0px_rgba(15,23,42,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              {cta.label || t.nav.getStarted}
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <LanguageSwitcher isDark={isDarkSection && (isScrolled || mobileMenuOpen)} />
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className={`flex h-11 w-11 items-center justify-center border-2 transition-[background-color,color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${isDarkSection && (isScrolled || mobileMenuOpen)
                ? 'border-white/30 text-white hover:bg-white/12'
                : 'border-slate-950 bg-white text-slate-950 shadow-[3px_3px_0px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:bg-sky-50'
                }`}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div className={`xl:hidden transition-[max-height,opacity] duration-300 ${mobileMenuOpen ? 'max-h-[86vh] overflow-y-auto opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}>
          <div className="grid gap-5 border-t border-slate-950/10 py-5">
            <div className="grid gap-px bg-slate-950/12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between bg-white px-4 py-4 text-sm font-black text-slate-950 transition-colors duration-200 hover:bg-[#eef7ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  {item.name}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>

            <section className="border-2 border-slate-950 bg-[#fbfaf7] p-3 shadow-[5px_5px_0px_rgba(15,23,42,0.1)]">
              <p className="mb-2 px-1 text-xs font-black uppercase tracking-[0.16em] text-neutral-500">{servicesLabel}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {serviceCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={l(`/services#${category.slug}`)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="border border-neutral-200 bg-white px-3 py-2 text-sm font-bold text-neutral-800 transition-colors duration-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    {localizedServiceValue(category.name, locale)}
                  </Link>
                ))}
              </div>
            </section>

            <Link
              href={l(cta.href || '/contact')}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 border-2 border-slate-950 bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0px_rgba(14,165,233,0.35)] transition-colors duration-200 hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              {cta.label || t.nav.getStarted}
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
