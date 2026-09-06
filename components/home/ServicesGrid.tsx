'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Globe, 
  AppWindow, 
  Layers, 
  ShoppingBag, 
  Monitor, 
  Home, 
  Utensils, 
  RefreshCw,
  Smartphone, 
  Laptop, 
  Code2, 
  Zap, 
  Briefcase, 
  PenTool, 
  Wrench,
  Users, 
  BarChart3, 
  Calendar, 
  Rocket, 
  Database,
  Server, 
  Cloud, 
  Settings, 
  Workflow, 
  Shield, 
  DollarSign,
  MessageSquare, 
  Brain, 
  Search, 
  TrendingUp, 
  Share2, 
  Mail,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { getStructuredPillars } from '@/lib/services/structured-catalog'
import { getSubserviceNavItems } from '@/lib/services/subservice-nav-index'

// Map of Icon strings to Lucide components for type safety
const IconMap: Record<string, React.ComponentType<any>> = {
  Globe, AppWindow, Layers, ShoppingBag, Monitor, Home, Utensils, RefreshCw,
  Smartphone, Laptop, Code2, Zap, Briefcase, PenTool, Wrench,
  Users, BarChart3, Calendar, Rocket, Database,
  Server, Cloud, Settings, Workflow, Shield, DollarSign,
  MessageSquare, Brain, Search, TrendingUp, Share2, Mail
}

type LocalizedText = {
  en: string
  ar: string
}

type ServiceItem = {
  title: LocalizedText
  description: LocalizedText
  link: string
  iconName: string
}

type TabData = {
  id: string
  label: LocalizedText
  description: LocalizedText
  image: string
  services: ServiceItem[]
}

// Per-category display meta (label/image/icon). One tab per structured-catalog
// category; the legacy standalone "Digital Growth" tab is folded into Digital
// Presence, matching the restructured taxonomy.
const SERVICE_TABS_META: { id: string; label: LocalizedText; description: LocalizedText; image: string; iconName: string }[] = [
  { id: 'digital-presence', label: { en: 'Digital Presence', ar: 'الحضور الرقمي' }, description: { en: 'Websites, e-commerce, branding, SEO, social, and content.', ar: 'مواقع ومتاجر وهوية وSEO وتواصل اجتماعي ومحتوى.' }, image: '/images/homepage/digital presence.png', iconName: 'Globe' },
  { id: 'interactive-web-applications', label: { en: 'Web Applications', ar: 'تطبيقات الويب' }, description: { en: 'SaaS platforms, portals, dashboards, and custom web apps.', ar: 'منصات SaaS وبوابات ولوحات تحكم وتطبيقات ويب مخصصة.' }, image: '/images/homepage/web application.jpeg', iconName: 'Layers' },
  { id: 'business-systems-development', label: { en: 'Business Systems', ar: 'أنظمة الأعمال' }, description: { en: 'ERP, CRM, automation, and management systems.', ar: 'أنظمة ERP وCRM وأتمتة وإدارة الأعمال.' }, image: '/images/homepage/business systems.jpeg', iconName: 'Briefcase' },
  { id: 'mobile-app-development', label: { en: 'Mobile Apps', ar: 'تطبيقات الجوال' }, description: { en: 'iOS, Android, and cross-platform apps built to scale.', ar: 'تطبيقات iOS وأندرويد ومتعددة المنصات مبنية للتوسّع.' }, image: '/images/homepage/app development.jpg', iconName: 'Smartphone' },
  { id: 'cloud-infrastructure', label: { en: 'Cloud & Infrastructure', ar: 'السحابة والبنية التحتية' }, description: { en: 'Migration, hosting, DevOps, security, and monitoring.', ar: 'ترحيل واستضافة وDevOps وأمان ومراقبة.' }, image: '/images/homepage/cloud & infrastructure.webp', iconName: 'Cloud' },
  { id: 'ai-powered-solutions', label: { en: 'AI Solutions', ar: 'حلول الذكاء الاصطناعي' }, description: { en: 'Chatbots, automation, assistants, and AI reporting.', ar: 'روبوتات محادثة وأتمتة ومساعدون وتقارير بالذكاء الاصطناعي.' }, image: '/images/homepage/ai automation.webp', iconName: 'Brain' },
]

// Data-driven from the structured catalog: every card links to that pillar's
// canonical href, so links stay correct as the taxonomy / URLs evolve (no more
// hand-maintained, mismatched links).
// Sub-service teaser cards fill sparse category tabs (Business Systems has 3
// pillars, Web Applications 5) up to a full 8-card grid. Bilingual: web-app subs
// link to their parent pillar (they have no standalone page); BS subs link to
// their nested sub-service page.
function fillerSubCards(p: { slug: string; href: string; description: LocalizedText }, categoryId: string, iconName: string): ServiceItem[] {
  if (categoryId !== 'interactive-web-applications' && categoryId !== 'business-systems-development') {
    return []
  }
  const en = getSubserviceNavItems(p.slug, 'en')
  const ar = getSubserviceNavItems(p.slug, 'ar')
  return en.map((s, i) => ({
    title: { en: s.name, ar: ar[i]?.name ?? s.name },
    description:
      categoryId === 'interactive-web-applications' && s.description
        ? { en: s.description, ar: ar[i]?.description ?? s.description }
        : p.description,
    link: s.href,
    iconName,
  }))
}

const TABS_DATA: TabData[] = SERVICE_TABS_META.map((meta) => {
  const pillars = getStructuredPillars(meta.id)
  const cards: ServiceItem[] = pillars.slice(0, 8).map((p) => ({
    title: p.name,
    description: p.description,
    link: p.href,
    iconName: meta.iconName,
  }))
  // Pad sparse tabs so every category shows a full grid of cards.
  for (const p of pillars) {
    if (cards.length >= 8) break
    for (const sub of fillerSubCards(p, meta.id, meta.iconName)) {
      if (cards.length >= 8) break
      cards.push(sub)
    }
  }
  return { id: meta.id, label: meta.label, description: meta.description, image: meta.image, services: cards }
})

export default function ServicesGrid() {
  const { t, locale } = useLanguage()
  const isRTL = locale === 'ar'
  const [activeTab, setActiveTab] = useState('digital-presence')

  // Static Localized Text
  const localCopy = useMemo(() => {
    return locale === 'ar'
      ? {
          badge: 'ماذا نقدم',
          title: 'خدمات تقنية متكاملة مصممة',
          titleHighlight: 'للنمو الرقمي الفعلي',
          subtitle: 'كلاود توبيا هي شريكك التقني الموثوق لبناء مواقع وتطبيقات وأنظمة متكاملة تدعم توسع أعمالك في الخليج والشرق الأوسط.',
          learnMore: 'اقرأ المزيد',
          viewAll: 'تصفح كل الخدمات'
        }
      : {
          badge: 'What We Deliver',
          title: 'Next-Gen IT Services Designed for',
          titleHighlight: 'Digital Growth',
          subtitle: 'CloudTopia is a premium technology solutions provider that helps businesses to innovate at a quicker rate, become more intelligent in their operations, and grow in a more productive manner.',
          learnMore: 'Learn more',
          viewAll: 'Browse All Services'
        }
  }, [locale])

  const activeTabData = useMemo(() => {
    return TABS_DATA.find((tab) => tab.id === activeTab) || TABS_DATA[0]
  }, [activeTab])

  // Split active tab services: 4 for left column, 4 for right column
  const leftColumnServices = useMemo(() => {
    return activeTabData.services.slice(0, 4)
  }, [activeTabData])

  const rightColumnServices = useMemo(() => {
    return activeTabData.services.slice(4, 8)
  }, [activeTabData])

  return (
    <section
      id="services-section"
      className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f4f1f8] text-neutral-900 overflow-hidden"
      data-header-theme="light"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Premium Subdued Background Accents for Light Theme */}
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
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center mb-5"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs font-bold uppercase tracking-widest">
              ✦ {localCopy.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5 text-neutral-900"
          >
            {localCopy.title}{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {localCopy.titleHighlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto"
          >
            {localCopy.subtitle}
          </motion.p>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="flex items-center gap-1.5 p-1.5 bg-white/80 border border-neutral-200/60 rounded-full max-w-full overflow-x-auto scrollbar-none shadow-md backdrop-blur-md">
              {TABS_DATA.map((tab) => {
                const isActive = tab.id === activeTab
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBubble"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-[0_3px_10px_rgba(37,99,235,0.25)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{locale === 'ar' ? tab.label.ar : tab.label.en}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tab Content Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_540px_1fr] gap-6 items-center"
          >
            
            {/* Left Column - 4 Cards */}
            <div className="space-y-4 order-2 lg:order-1">
              {leftColumnServices.map((service, index) => {
                const IconComponent = IconMap[service.iconName] || Globe
                return (
                  <ServiceCard 
                    key={index} 
                    title={locale === 'ar' ? service.title.ar : service.title.en}
                    description={locale === 'ar' ? service.description.ar : service.description.en}
                    link={service.link}
                    Icon={IconComponent}
                    locale={locale}
                    learnMoreText={localCopy.learnMore}
                  />
                )
              })}
            </div>

            {/* Center Column - 1 Visual Portrait Image (Made Bigger) */}
            <div className="flex justify-center items-center order-1 lg:order-2">
              <motion.div 
                className="relative w-full max-w-[540px] aspect-[3.5/4] rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(27,27,35,0.08)] border border-neutral-200"
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={activeTabData.image}
                  alt={locale === 'ar' ? activeTabData.label.ar : activeTabData.label.en}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1000px"
                  quality={90}
                  className="object-cover transition-transform duration-700 hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                    {locale === 'ar' ? activeTabData.label.ar : activeTabData.label.en}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed line-clamp-4">
                    {locale === 'ar' ? activeTabData.description.ar : activeTabData.description.en}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - 4 Cards */}
            <div className="space-y-4 order-3">
              {rightColumnServices.map((service, index) => {
                const IconComponent = IconMap[service.iconName] || Globe
                return (
                  <ServiceCard 
                    key={index} 
                    title={locale === 'ar' ? service.title.ar : service.title.en}
                    description={locale === 'ar' ? service.description.ar : service.description.en}
                    link={service.link}
                    Icon={IconComponent}
                    locale={locale}
                    learnMoreText={localCopy.learnMore}
                  />
                )
              })}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* View All Services Link */}
        <div className="mt-14 flex justify-center">
          <Link
            href={localePath(locale, '/services')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-neutral-500 hover:text-neutral-900 transition-colors duration-300 group border-b border-transparent hover:border-neutral-900/20 pb-0.5"
          >
            {localCopy.viewAll}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </section>
  )
}

interface ServiceCardProps {
  title: string
  description: string
  link: string
  Icon: React.ComponentType<any>
  locale: string
  learnMoreText: string
}

function ServiceCard({ title, description, link, Icon, locale, learnMoreText }: ServiceCardProps) {
  const isRTL = locale === 'ar'
  
  return (
    <motion.div
      className="relative rounded-xl p-[0.75px] transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        background: 'rgba(0,0,0,0.06)'
      }}
      whileHover={{ background: 'conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.25), rgba(139,92,246,0.15), rgba(59,130,246,0.25))' }}
    >
      <GlowingEffect
        spread={36}
        glow={true}
        disabled={false}
        proximity={72}
        inactiveZone={0.05}
        borderWidth={1}
      />
      <Link
        href={localePath(locale, link)}
        className="group relative flex items-start gap-4 bg-white/95 p-4 rounded-[11px] overflow-hidden shadow-sm"
      >
        {/* Card Background Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Service Icon Box */}
        <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-50/80 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
        </div>

        {/* Service Details */}
        <div className="min-w-0 flex-1">
          {/* h3 (not h4): these service cards render before the active-tab
              category label in the DOM, so an h4 here produced an h2->h4 skip.
              Explicit text-base/lg classes keep the visual size unchanged. */}
          <h3 className="text-base sm:text-lg font-black text-neutral-900 mb-1.5 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-2.5">
            {description}
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 group-hover:text-blue-700 transition-colors">
            <span>{learnMoreText}</span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
