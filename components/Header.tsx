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
  ChevronRight,
  CircleDollarSign,
  Cloud,
  FolderKanban,
  Globe,
  Home,
  Info,
  Layers,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  Smartphone,
  Sparkles,
  X,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { industries, industrySlugs, localizedValue } from '@/lib/seo/industries'
import { getStructuredPillars } from '@/lib/services/structured-catalog'
import { localizedDP } from '@/lib/services/digital-presence'

// The 6 service categories, sourced from the structured catalog (single source of
// truth) so the menu always matches the /services hub + correct pillar URLs
// (incl. web-apps under /web-applications).
const SERVICE_CATEGORY_META = [
  { id: 'digital-presence', en: 'Digital Presence', ar: 'الحضور الرقمي', hub: '/services/digital-presence', Icon: Globe },
  { id: 'business-systems-development', en: 'Business Systems', ar: 'أنظمة الأعمال', hub: '/services/business-systems-development', Icon: Building2 },
  { id: 'interactive-web-applications', en: 'Web Applications', ar: 'تطبيقات الويب', hub: '/services/web-applications', Icon: Layers },
  { id: 'mobile-app-development', en: 'Mobile Apps', ar: 'تطبيقات الجوال', hub: '/services/app-development', Icon: Smartphone },
  { id: 'cloud-infrastructure', en: 'Cloud & Infrastructure', ar: 'السحابة والبنية التحتية', hub: '/services', Icon: Cloud },
  { id: 'ai-powered-solutions', en: 'AI Solutions', ar: 'حلول الذكاء الاصطناعي', hub: '/services', Icon: Sparkles },
] as const

function headerServiceCategories(locale: string) {
  return SERVICE_CATEGORY_META.map((c) => ({
    id: c.id,
    name: locale === 'ar' ? c.ar : c.en,
    hub: c.hub,
    Icon: c.Icon,
    pillars: getStructuredPillars(c.id).map((p) => ({ slug: p.slug, name: localizedDP(p.name, locale), href: p.href })),
  }))
}

type MegaMenuType = 'services' | 'industries'

function MenuPanel({
  children,
  tone = 'light',
  width = 'w-[min(1320px,calc(100vw-2rem))]',
  hidden = false,
}: {
  children: React.ReactNode
  tone?: 'light' | 'dark'
  width?: string
  hidden?: boolean
}) {
  // Solid (non-glass) surface on purpose: a backdrop-filter here would break
  // because the sticky header becomes a backdrop-filter ancestor once scrolled
  // (nested backdrop-filters are unreliable across browsers). A solid card +
  // layered shadow reads as premium and renders correctly in every scroll state.
  const surface =
    tone === 'dark'
      ? 'border-white/10 bg-[#0a0e1a] text-white shadow-[0_28px_80px_rgba(0,0,0,0.55)]'
      : 'border-slate-200 bg-white text-eerie shadow-[0_28px_80px_rgba(27,27,35,0.18)]'
  return (
    <div className={`absolute left-1/2 top-full ${width} -translate-x-1/2 pt-3${hidden ? ' hidden' : ''}`}>
      <div className={`relative flex max-h-[calc(100vh-6rem)] flex-col overflow-hidden rounded-2xl border ${surface}`}>
        <div className="overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

function MegaMenu({ type, locale, active, onClose }: { type: MegaMenuType; locale: string; active: boolean; onClose: () => void }) {
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
    const cats = headerServiceCategories(locale)

    return (
      <MenuPanel hidden={!active}>
        <div className="mb-4 grid gap-4 border-b border-slate-200 pb-4 sm:grid-cols-[1fr_auto] sm:items-end">
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

        {/* 6 structured categories, each with its pillars (correct URLs). */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((cat) => (
            <section key={cat.id} className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3.5 transition-colors duration-200 hover:border-sky-200 hover:bg-sky-50">
              <Link
                href={l(cat.hub)}
                onClick={onClose}
                className="group mb-2.5 flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-white text-sky-700 shadow-sm transition-colors duration-200 group-hover:border-sky-300 group-hover:bg-sky-600 group-hover:text-white">
                  <cat.Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="flex-1 text-sm font-black text-eerie transition-colors group-hover:text-sky-800">{cat.name}</span>
                <span className="shrink-0 rounded-full bg-white px-1.5 text-[10px] font-bold text-slate-500 shadow-sm">{cat.pillars.length}</span>
              </Link>
              <div className="grid gap-0.5">
                {cat.pillars.slice(0, 6).map((p) => (
                  <Link
                    key={p.slug}
                    href={l(p.href)}
                    onClick={onClose}
                    className="group flex min-w-0 items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs font-bold text-slate-600 transition-colors duration-200 hover:bg-white hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    <span className="line-clamp-1">{p.name}</span>
                    <ArrowUpRight className="h-3 w-3 shrink-0 opacity-45 transition-opacity duration-200 group-hover:opacity-100 rtl:-scale-x-100" aria-hidden="true" />
                  </Link>
                ))}
                {cat.pillars.length > 6 && (
                  <Link href={l(cat.hub)} onClick={onClose} className="px-2 py-1 text-[11px] font-black text-sky-700 transition-colors hover:text-sky-900">
                    +{cat.pillars.length - 6} {locale === 'ar' ? 'المزيد' : 'more'}
                  </Link>
                )}
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
      <MenuPanel hidden={!active}>
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
          href: `/api/whatsapp?locale=${locale}`
        },
        {
          text: "مواقع، لوحات تحكم، أنظمة CRM، أتمتة، وحلول ذكاء اصطناعي للشركات النامية — ",
          cta: "استكشف خدماتنا",
          href: "/services"
        },
        {
          text: "مشاريع حقيقية. عائد حقيقي — مواقع ومتاجر وأنظمة مبنية لدفع نمو الأعمال — ",
          cta: "استكشف الآن",
          href: "/projects"
        }
      ]
    : [
        {
          text: "Get a free website audit for your business — ",
          cta: "Talk to CloudTopia today",
          href: `/api/whatsapp?locale=${locale}`
        },
        {
          text: "Websites, dashboards, CRM systems, automation, and AI solutions for growing businesses — ",
          cta: "Explore our services",
          href: "/services"
        },
        {
          text: "Real projects. Real ROI — websites, stores, and systems built to drive business impact — ",
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
        <div className="hidden lg:block flex-1 shrink-0" />
        
        {/* Center: Ticker */}
        <div className="flex min-w-0 flex-1 justify-center text-center lg:mx-auto lg:max-w-2xl lg:shrink-0 lg:flex-none">
          <AnnouncementTicker locale={locale} />
        </div>
        
        {/* Right Side: Quick Brand Logo Links */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-2.5 shrink-0 select-none">
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
            href={localePath(locale, '/contact')}
            onClick={(e) => {
              // Keep the one-tap email UX, but serve a real /contact href in the
              // SSR HTML so Cloudflare Email Obfuscation never rewrites a sitewide
              // mailto: into a /cdn-cgi/l/email-protection link (which crawlers
              // count as a broken internal link on every page).
              e.preventDefault()
              window.location.href = 'mailto:info@cloudtopia.net?subject=Project%20Inquiry%20-%20CloudTopia'
            }}
            className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/95 transition-transform duration-200 hover:scale-110"
            aria-label={locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileOpenCat, setMobileOpenCat] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { t, dir, locale, navigation: cmsNavigation } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      // Close any open mega menu when the page scrolls so an open panel never
      // lingers (and never re-renders its glass while the background moves).
      // Scrolling *inside* the panel uses its own overflow container and does
      // not fire window scroll, so this won't fight in-panel scrolling.
      setActiveMegaMenu((current) => (current ? null : current))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mega menu on Escape for keyboard users.
  useEffect(() => {
    if (!activeMegaMenu) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveMegaMenu(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeMegaMenu])

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
  const articlesLabel = locale === 'ar' ? 'المقالات' : 'Articles'
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
    { name: articlesLabel, href: l('/articles'), icon: BookOpen },
  ]

  const cta = (cmsNavigation?.cta as { label?: string; href?: string } | undefined) || {
    label: t.nav.getStarted,
    href: `/api/whatsapp?locale=${locale}`,
  }
  const ctaLabel = locale === 'ar' && (!cta.label || cta.label === 'Get Started')
    ? t.nav.getStarted
    : cta.label || t.nav.getStarted
  // The primary CTA always opens WhatsApp (geo-selected number) instead of the
  // /contact form — including when CMS navigation still points it at /contact.
  const ctaHref = !cta.href || cta.href === '/contact'
    ? `/api/whatsapp?locale=${locale}`
    : cta.href
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
              <>
                {/* Compact name for narrow phones — the two-line block below is hidden < 390px,
                    which otherwise leaves only a bare icon. Icon-only stays for ≤ ~360px. */}
                <span className={`font-logo-ar hidden whitespace-nowrap text-xl font-black leading-none min-[360px]:inline min-[390px]:hidden ${headerIsDark ? 'text-white' : 'text-eerie'}`}>
                  كلاود<span className="text-sky-600">توبيا</span>
                </span>
                <span className="hidden min-w-0 flex-col leading-none min-[390px]:flex">
                  <span className={`font-logo-ar text-2xl sm:text-3xl ${headerIsDark ? 'text-white' : 'text-eerie'}`}>
                    كلاود<span className="text-sky-600">توبيا</span>
                  </span>
                  <span className={`mt-1 font-tagline-ar text-[11px] sm:text-[12px] ${headerIsDark ? 'text-white/62' : 'text-neutral-600'}`}>
                    تكنولوجيا رقمية وسحابية
                  </span>
                </span>
              </>
            ) : (
              <>
                {/* Compact name for narrow phones — the two-line block below is hidden < 430px,
                    which otherwise leaves only a bare icon. Icon-only stays for ≤ ~360px. */}
                <span className={`font-logo hidden whitespace-nowrap text-base font-black leading-none min-[360px]:inline min-[430px]:hidden ${headerIsDark ? 'text-white' : 'text-eerie'}`}>
                  Cloud<span className="text-sky-600">Topia</span>
                </span>
                <span className="hidden min-w-0 flex-col leading-none min-[430px]:flex">
                  <span className={`font-logo text-xl font-black sm:text-2xl ${headerIsDark ? 'text-white' : 'text-eerie'}`}>
                    <>Cloud<span className="text-sky-600">Topia</span></>
                  </span>
                  <span className={`mt-1 text-[9px] font-black uppercase tracking-[0.08em] sm:text-[10px] ${headerIsDark ? 'text-white/62' : 'text-neutral-600'}`}>
                    Digital & Cloud Technologies
                  </span>
                </span>
              </>
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
                      onMouseEnter={() => { if (menu !== null) setActiveMegaMenu(menu) }}
                      onFocus={() => { if (menu !== null) setActiveMegaMenu(menu) }}
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
              {/* LINK-07: both panels stay mounted so their pillar/industry
                  links exist in the SSR HTML for crawlers. Visibility is CSS-
                  gated (display:none via `hidden`) instead of conditional
                  mounting — a hidden panel receives no pointer events and is
                  out of the a11y tree, so hover/focus/Escape/scroll behavior
                  is unchanged. */}
              <MegaMenu type="services" active={activeMegaMenu === 'services'} locale={locale} onClose={() => setActiveMegaMenu(null)} />
              <MegaMenu type="industries" active={activeMegaMenu === 'industries'} locale={locale} onClose={() => setActiveMegaMenu(null)} />
            </div>
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            <LanguageSwitcher isDark={headerIsDark} />
            <Link
              href={l(ctaHref)}
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
              aria-label={mobileMenuOpen ? (locale === 'ar' ? 'إغلاق القائمة' : 'Close menu') : (locale === 'ar' ? 'فتح القائمة' : 'Open menu')}
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
          <div className="my-4 overflow-hidden rounded-2xl border border-slate-200 bg-white text-eerie shadow-[0_20px_60px_rgba(27,27,35,0.16)]">
            {/* Primary navigation */}
            <nav className="grid gap-0.5 p-2">
              {navigation.map((item) => {
                const isServices = 'menu' in item && item.menu === 'services'
                const MobileIcon = item.icon
                  || (isServices ? Layers : 'menu' in item && item.menu === 'industries' ? Building2 : Home)

                if (isServices) {
                  return (
                    <div key={item.name}>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((o) => !o)}
                        aria-expanded={mobileServicesOpen}
                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-bold text-eerie transition-colors duration-200 hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f7ff] text-sky-700 transition-colors duration-200 group-hover:bg-sky-600 group-hover:text-white">
                          <Layers className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="flex-1 text-start">{item.name}</span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>

                      {mobileServicesOpen && (
                        <div className="mt-1 grid gap-1 pb-1 ps-1">
                          {headerServiceCategories(locale).map((cat) => {
                            const open = mobileOpenCat === cat.id
                            return (
                              <div key={cat.id} className="overflow-hidden rounded-xl border border-slate-200 bg-[#f8fbff]">
                                <button
                                  type="button"
                                  onClick={() => setMobileOpenCat(open ? null : cat.id)}
                                  aria-expanded={open}
                                  className="flex w-full items-center gap-2.5 px-2.5 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                                >
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-sky-700 shadow-sm">
                                    <cat.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                  </span>
                                  <span className="flex-1 text-start text-[13.5px] font-black text-eerie">{cat.name}</span>
                                  <span className="rounded-full bg-white px-1.5 text-[10px] font-bold text-slate-500 shadow-sm">{cat.pillars.length}</span>
                                  <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                                </button>
                                {open && (
                                  <div className="grid gap-0.5 px-2 pb-2">
                                    {cat.pillars.map((p) => (
                                      <Link
                                        key={p.slug}
                                        href={l(p.href)}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between gap-2 rounded-lg bg-white px-2.5 py-2 text-[12.5px] font-bold text-slate-600 shadow-sm transition-colors duration-200 hover:text-sky-800"
                                      >
                                        <span className="line-clamp-1">{p.name}</span>
                                        <ArrowUpRight className="h-3 w-3 shrink-0 opacity-45 rtl:-scale-x-100" aria-hidden="true" />
                                      </Link>
                                    ))}
                                    <Link href={l(cat.hub)} onClick={() => setMobileMenuOpen(false)} className="px-2.5 py-1.5 text-[11px] font-black text-sky-700">
                                      {locale === 'ar' ? 'عرض القسم' : 'View category'} <span aria-hidden="true">→</span>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                          <Link
                            href={l('/services')}
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-0.5 flex items-center justify-center gap-1.5 rounded-xl bg-eerie px-3 py-2.5 text-[13px] font-black !text-white transition-colors duration-200 hover:bg-sky-800"
                          >
                            {locale === 'ar' ? 'عرض كل الخدمات' : 'View all services'}
                            <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden="true" />
                          </Link>
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-bold text-eerie transition-colors duration-200 hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f7ff] text-sky-700 transition-colors duration-200 group-hover:bg-sky-600 group-hover:text-white">
                      <MobileIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="flex-1">{item.name}</span>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-sky-700" aria-hidden="true" />
                  </Link>
                )
              })}
            </nav>

            {/* Contact + CTA */}
            <div className="border-t border-slate-100 p-3">
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://wa.me/96895886393?text=Hi%20CloudTopia,%20I'd%20like%20a%20free%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-3 text-[12px] font-bold text-neutral-700 transition-colors duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  {locale === 'ar' ? 'واتساب' : 'WhatsApp'}
                </a>
                <a
                  href="tel:+96895886393"
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-3 text-[12px] font-bold text-neutral-700 transition-colors duration-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
                >
                  <Phone className="h-4 w-4 text-sky-600" aria-hidden="true" />
                  {locale === 'ar' ? 'اتصال' : 'Call'}
                </a>
                <a
                  href={l('/contact')}
                  onClick={(e) => {
                    // Real /contact href in SSR; mailto on click (see desktop note).
                    e.preventDefault()
                    window.location.href = 'mailto:info@cloudtopia.net?subject=Project%20Inquiry%20-%20CloudTopia'
                  }}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-3 text-[12px] font-bold text-neutral-700 transition-colors duration-200 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800"
                >
                  <Mail className="h-4 w-4 text-violet-600" aria-hidden="true" />
                  {locale === 'ar' ? 'البريد' : 'Email'}
                </a>
              </div>

              <Link
                href={l(ctaHref)}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-eerie px-5 py-3.5 text-sm font-black !text-white shadow-sm transition-colors duration-200 hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                {ctaLabel}
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
