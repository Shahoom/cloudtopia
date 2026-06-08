'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  ChevronDown,
  CircleDollarSign,
  FolderKanban,
  Info,
  Layers,
  Menu,
  MessageSquare,
  X,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { serviceCategories, localizedServiceValue } from '@/lib/seo/services'
import { industries, industrySlugs, localizedValue } from '@/lib/seo/industries'

type MegaMenuType = 'services' | 'industries'

function MenuPanel({
  children,
  width = 'w-[min(1320px,calc(100vw-2rem))]',
}: {
  children: React.ReactNode
  width?: string
}) {
  return (
    <div className={`absolute left-1/2 top-full ${width} -translate-x-1/2 pt-3`}>
      <div className="relative flex flex-col max-h-[calc(100vh-6rem)] rounded-lg border border-slate-200 bg-white/97 shadow-[0_28px_80px_rgba(27,27,35,0.18)] backdrop-blur-xl overflow-hidden">
        <div className="overflow-y-auto p-4 text-eerie">
          {children}
        </div>
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
      <MenuPanel>
        <div className="mb-3 grid gap-4 border-b border-slate-200 pb-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-2xl font-black leading-none text-eerie">{copy.title}</p>
            <p className="mt-2 max-w-xl text-sm font-bold leading-6 text-slate-600">{copy.subtitle}</p>
          </div>
          <Link
            href={l('/services')}
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-eerie px-4 py-2 text-sm font-black text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            {copy.viewAll}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
          {serviceCategories.map((category) => (
            <section key={category.slug} className="rounded-lg border border-slate-200 bg-[#f8fbff] p-3 transition-colors duration-200 hover:border-sky-200 hover:bg-sky-50">
              <Link
                href={l(`/services#${category.slug}`)}
                onClick={onClose}
                className="group flex items-center gap-2 text-sm font-black text-eerie hover:text-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-sky-700 shadow-sm">
                  <Layers className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="line-clamp-1">{localizedServiceValue(category.name, locale)}</span>
              </Link>
              <div className="mt-2 grid gap-1">
                {category.services.slice(0, 2).map((service) => (
                  <Link
                    key={service.slug}
                    href={l(`/services/${service.slug}`)}
                    onClick={onClose}
                    className="group flex min-w-0 items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs font-bold text-slate-600 transition-colors duration-200 hover:bg-white hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
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
      <MenuPanel>
        <div className="mb-3 grid gap-4 border-b border-slate-200 pb-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-2xl font-black leading-none text-eerie">{copy.title}</p>
            <p className="mt-2 max-w-xl text-sm font-bold leading-6 text-slate-600">{copy.subtitle}</p>
          </div>
          <Link
            href={l('/industries')}
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-eerie px-4 py-2 text-sm font-black text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            {copy.viewAll}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {industrySlugs.map((slug) => {
            const industry = industries[slug]
            return (
              <Link
                key={slug}
                href={l(`/industries/${slug}`)}
                onClick={onClose}
                className="group flex min-w-0 items-start gap-3 rounded-lg border border-slate-200 bg-[#f8fbff] p-3 transition-colors duration-200 hover:border-sky-200 hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-sky-800 shadow-sm">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black leading-tight text-eerie">{localizedValue(industry.name, locale)}</span>
                  <span className="mt-1 block line-clamp-1 text-xs leading-relaxed text-slate-500">{localizedValue(industry.description, locale)}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </MenuPanel>
    )
  }

  return null
}

function AnnouncementTicker({ locale }: { locale: string }) {
  const [index, setIndex] = useState(0)
  
  const messages = locale === 'ar'
    ? [
        {
          text: "احصل على تدقيق مجاني لموقعك الإلكتروني — ",
          cta: "تواصل مع كلاود توبيا اليوم",
          href: "/contact"
        },
        {
          text: "مواقع، لوحات تحكم، أنظمة CRM، أتمتة، وحلول ذكاء اصطناعي للشركات النامية — ",
          cta: "استكشف خدماتنا",
          href: "/services"
        },
        {
          text: "مشاريع حقيقية. عائد حقيقي — أكثر من 2000 مشروع يدفع نمو الأعمال في 50+ دولة — ",
          cta: "استكشف الآن",
          href: "/projects"
        }
      ]
    : [
        {
          text: "Get a free website audit for your business — ",
          cta: "Talk to CloudTopia today",
          href: "/contact"
        },
        {
          text: "Websites, dashboards, CRM systems, automation, and AI solutions for growing businesses — ",
          cta: "Explore our services",
          href: "/services"
        },
        {
          text: "Real projects. Real ROI — 2,000+ deliveries driving business impact across 50+ Countries — ",
          cta: "Explore Now",
          href: "/projects"
        }
      ]

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [messages.length])

  return (
    <div className="relative flex h-8 w-full min-w-0 items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex w-full min-w-0 items-center justify-center gap-2 px-2 text-center text-[12px] leading-none sm:text-sm"
        >
          <span className="text-sky-400 font-bold shrink-0">✦</span>
          <span className="inline-flex min-w-0 max-w-full items-center justify-center gap-1 whitespace-nowrap font-semibold text-white/90">
            <span className="truncate">{messages[index].text}</span>
            <Link
              href={localePath(locale, messages[index].href)}
              className="inline-flex shrink-0 items-center gap-0.5 font-black text-cyan-300 underline decoration-cyan-300/30 underline-offset-2 transition-colors hover:text-white"
            >
              {messages[index].cta}
              <ArrowUpRight className="h-3.5 w-3.5 inline-block shrink-0 align-middle" />
            </Link>
          </span>
          <span className="text-sky-400 font-bold shrink-0">✦</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function AnnouncementBar({ locale, dir }: { locale: string; dir: 'ltr' | 'rtl' }) {
  return (
    <div className="border-b border-white/10 bg-eerie py-2 text-white shadow-sm" dir={dir}>
      <div className="container mx-auto flex items-center justify-between gap-3 px-4">
        {/* Left Spacer to Center Ticker on Desktop */}
        <div className="hidden sm:block flex-1 shrink-0" />
        
        {/* Center: Ticker */}
        <div className="flex min-w-0 flex-1 justify-center text-center sm:mx-auto sm:max-w-2xl sm:shrink-0 sm:flex-none">
          <AnnouncementTicker locale={locale} />
        </div>
        
        {/* Right Side: Quick Brand Logo Links */}
        <div className="hidden sm:flex flex-1 items-center justify-end gap-2.5 shrink-0 select-none">
          {/* Instagram Logo */}
          <a 
            href="https://instagram.com/thecloudtopia" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/95 transition-transform duration-200 hover:scale-110"
            aria-label="Instagram"
          >
            <Image 
              src="/icons/instagram-icon.svg" 
              alt="Instagram" 
              width={24} 
              height={24}
              priority
              className="h-6 w-6 object-contain drop-shadow-sm transition-opacity duration-200 group-hover:opacity-100"
            />
          </a>

          {/* Email Logo (Gmail) */}
          <a 
            href="mailto:info@cloudtopia.net?subject=Project%20Inquiry%20-%20CloudTopia" 
            className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/95 transition-transform duration-200 hover:scale-110"
            aria-label="Email"
          >
            <Image 
              src="/icons/gmail.svg" 
              alt="Gmail" 
              width={24} 
              height={24}
              priority
              className="h-6 w-6 object-contain drop-shadow-sm transition-opacity duration-200 group-hover:opacity-100"
            />
          </a>

          {/* WhatsApp Logo */}
          <a 
            href="https://wa.me/96895886393?text=Hi%20CloudTopia,%20I'd%20like%20a%20free%20consultation." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/95 transition-transform duration-200 hover:scale-110"
            aria-label="WhatsApp"
          >
            <Image 
              src="/icons/whatsapp-icon.svg" 
              alt="WhatsApp" 
              width={24} 
              height={24}
              priority
              className="h-6 w-6 object-contain drop-shadow-sm transition-opacity duration-200 group-hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </div>
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
  const insightsLabel = locale === 'ar' ? 'المقالات' : 'Articles'
  const servicesLabel = locale === 'ar' ? 'الخدمات' : t.nav.services
  const industriesLabel = locale === 'ar' ? 'القطاعات' : 'Industries'
  const projectsLabel = locale === 'ar' ? t.nav.projects : 'Projects'
  const pricingLabel = locale === 'ar' ? t.nav.pricing : 'Pricing'

  const navigation = [
    { name: t.nav.home, href: l('/') },
    { name: servicesLabel, href: l('/services'), menu: 'services' as const },
    { name: industriesLabel, href: l('/industries'), menu: 'industries' as const },
    { name: projectsLabel, href: l('/projects'), icon: FolderKanban },
    { name: pricingLabel, href: l('/pricing'), icon: CircleDollarSign },
    { name: t.nav.about, href: l('/about'), icon: Info },
    { name: insightsLabel, href: l('/articles'), icon: BookOpen },
  ]

  const cta = (cmsNavigation?.cta as { label?: string; href?: string } | undefined) || {
    label: t.nav.getStarted,
    href: '/contact',
  }
  const ctaLabel = locale === 'ar' && (!cta.label || cta.label === 'Get Started')
    ? t.nav.getStarted
    : cta.label || t.nav.getStarted
  const headerIsDark = isDarkSection

  const headerTone = isScrolled || mobileMenuOpen
    ? headerIsDark
      ? 'border-white/10 bg-eerie/92 text-white shadow-lg shadow-eerie/20 backdrop-blur-xl'
      : 'border-eerie/10 bg-[#f4f1f8]/94 text-eerie shadow-[0_10px_40px_rgba(27,27,35,0.08)] backdrop-blur-xl'
    : headerIsDark
      ? 'border-transparent bg-transparent text-white'
      : 'border-transparent bg-transparent text-eerie'

  return (
    <header ref={headerRef} className={`sticky top-0 z-[9999] border-b transition-[background-color,border-color,box-shadow] duration-300 ${headerTone}`} dir={dir}>
      <AnnouncementBar locale={locale} dir={dir} />
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
              width={56}
              height={56}
              priority
              className={`w-auto transition-[height,transform] duration-300 group-hover:scale-[1.03] ${isScrolled ? 'h-10 sm:h-11' : 'h-12 sm:h-14'}`}
            />
            {locale === 'ar' ? (
              <span className="hidden min-w-0 flex-col leading-none min-[390px]:flex">
                <span className={`font-logo-ar text-2xl sm:text-3xl ${headerIsDark ? 'text-white' : 'text-eerie'}`}>
                  كلاود<span className="text-sky-600">توبيا</span>
                </span>
                <span className={`mt-1 font-tagline-ar text-[11px] sm:text-[12px] ${headerIsDark ? 'text-white/62' : 'text-neutral-600'}`}>
                  تكنولوجيا رقمية وسحابية
                </span>
              </span>
            ) : (
              <span className="hidden min-w-0 flex-col leading-none min-[390px]:flex">
                <span className={`font-logo text-xl font-black sm:text-2xl ${headerIsDark ? 'text-white' : 'text-eerie'}`}>
                  <>Cloud<span className="text-sky-600">Topia</span></>
                </span>
                <span className={`mt-1 text-[9px] font-black uppercase tracking-[0.08em] sm:text-[10px] ${headerIsDark ? 'text-white/62' : 'text-neutral-600'}`}>
                  Digital & Cloud Technologies
                </span>
              </span>
            )}
          </Link>

          <div className="hidden xl:flex">
            <div className="relative" onMouseLeave={() => setActiveMegaMenu(null)}>
              <div className={`flex items-center gap-1 rounded-full border px-2 py-1 shadow-sm ${headerIsDark ? 'border-white/15 bg-white/8' : 'border-slate-950/10 bg-white/75'}`}>
                {navigation.slice(1).map((item) => {
                  const Icon = item.icon
                  const menu: MegaMenuType | null = 'menu' in item && item.menu ? item.menu : null
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onMouseEnter={() => setActiveMegaMenu(menu)}
                      onFocus={() => setActiveMegaMenu(menu)}
                      className={`group relative inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-black transition-[background-color,color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${headerIsDark
                        ? 'text-white/82 hover:bg-white/10 hover:text-white'
                        : 'text-slate-700 hover:bg-sky-50 hover:text-slate-950'
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
            <LanguageSwitcher isDark={headerIsDark} />
            <Link
              href={l(cta.href || '/contact')}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-black !text-white shadow-sm transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              {ctaLabel}
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <LanguageSwitcher isDark={headerIsDark} />
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className={`flex h-11 w-11 items-center justify-center rounded-md border transition-[background-color,color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${headerIsDark
                ? 'border-white/30 text-white hover:bg-white/12'
                : 'border-eerie/20 bg-white text-eerie shadow-sm hover:-translate-y-0.5 hover:bg-sky-50'
                }`}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div className={`xl:hidden transition-[max-height,opacity] duration-300 ${mobileMenuOpen ? 'max-h-[86vh] overflow-y-auto opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}>
          <div className="grid gap-5 border-t border-slate-950/10 py-5">
            <div className="grid gap-2 rounded-lg border border-slate-200 bg-white/70 p-2 shadow-sm">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg bg-white px-4 py-4 text-sm font-black text-eerie transition-colors duration-200 hover:bg-[#eef7ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  {item.name}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>

            <section className="rounded-lg border border-slate-200 bg-[#f4f1f8] p-3 shadow-sm">
              <p className="mb-2 px-1 text-xs font-black uppercase tracking-[0.16em] text-neutral-500">{servicesLabel}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {serviceCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={l(`/services#${category.slug}`)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-bold text-neutral-800 transition-colors duration-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    {localizedServiceValue(category.name, locale)}
                  </Link>
                ))}
              </div>
            </section>

            <Link
              href={l(cta.href || '/contact')}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-eerie px-5 py-3 text-sm font-black !text-white shadow-sm transition-colors duration-200 hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              {ctaLabel}
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
