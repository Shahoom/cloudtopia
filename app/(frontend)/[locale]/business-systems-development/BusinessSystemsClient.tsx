'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import dynamic from 'next/dynamic'

const HeroParallax = dynamic(() => import('@/components/ui/hero-parallax').then(mod => mod.HeroParallax), { ssr: false })
const HeroModern = dynamic(() => import('@/components/ui/hero-modern').then(mod => mod.HeroModern), { ssr: false })
const HorizontalScrollCards = dynamic(() => import('@/components/ui/horizontal-scroll-cards').then(mod => mod.HorizontalScrollCards), { ssr: false })
import type { ScrollCardItem } from '@/components/ui/horizontal-scroll-cards'
import { SeoH1 } from '@/components/seo/SeoH1'
import DetailedServicesSection from '@/components/services/DetailedServicesSection'
import { ContactLeadForm } from '@/components/services/ContactLeadForm'
import { businessSystemsGroups } from '@/lib/services/business-systems'
import { getLocalizedPillarSubServiceNames } from '@/lib/services/pillar-subservices-localized'

export default function BusinessSystemsClient({ t: pageT }: { t?: any }) {
    const { dir, locale, t: contextT } = useLanguage()
    const t = pageT || contextT
    const p = t?.services?.businessSystemsPage || t?.businessSystemsPage

    const currentContent = {
        title: p?.hero?.title || "Intelligent Business Systems & Automation",
        description: p?.hero?.description || "Custom-built ERP, CRM, and management solutions designed to scale with your business and optimize internal operations through intelligent automation and real-time data analytics.",
    }

    const products = [
        {
            title: "Advanced CRM System - Customer Relationship Management",
            thumbnail: "/images/services/business-systems-development/CRM System.webp",
        },
        {
            title: "Efficient POS System - Point of Sale Solutions",
            thumbnail: "/images/services/business-systems-development/POS System.webp",
        },
        {
            title: "Smart Inventory Management - Real-time Stock Tracking",
            thumbnail: "/images/services/business-systems-development/Inventory Management.webp",
        },
        {
            title: "Automated Booking System - Efficient Scheduling",
            thumbnail: "/images/services/business-systems-development/booking system.webp",
        },
        {
            title: "Enterprise ERP Solutions - Robust Resource Planning",
            thumbnail: "/images/services/business-systems-development/1.webp",
        },
        {
            title: "Strategic Operations Management - Business Optimization",
            thumbnail: "/images/services/business-systems-development/2.webp",
        },
        {
            title: "Financial Planning Portal - Secure Accounting Tools",
            thumbnail: "/images/services/business-systems-development/3.webp",
        },
        {
            title: "Scalable SaaS Architecture - High-Performance Cloud Software",
            thumbnail: "/images/services/business-systems-development/11.avif",
        },
        {
            title: "Intelligent Data Analytics - Business Insights",
            thumbnail: "/images/services/business-systems-development/5.webp",
        },
        {
            title: "Supply Chain Logistics - Optimized Distribution",
            thumbnail: "/images/services/business-systems-development/6.webp",
        },
        {
            title: "Cloud Infrastructure Management - Scalable Systems",
            thumbnail: "/images/services/business-systems-development/9.webp",
        },
        {
            title: "Omnichannel POS Integration - Modern Retail",
            thumbnail: "/images/services/business-systems-development/POS System.webp",
        },
        {
            title: "Global Supply Chain Network - Logistics AI",
            thumbnail: "/images/services/business-systems-development/6.webp",
        },
        {
            title: "Custom CRM Workflows - Sales Automation",
            thumbnail: "/images/services/business-systems-development/CRM System.webp",
        },
        {
            title: "Warehouse Automation - AI-Driven Operations",
            thumbnail: "/images/services/business-systems-development/Inventory Management.webp",
        },
    ]

    const isAr = locale === 'ar'

    // Solution cards = the 5 Business Systems pillars (same structure + content as
    // the /services hub), each showing a few of its sub-services as "what's included".
    const pillarGradients = [
        'bg-gradient-to-br from-purple-500 to-purple-700',
        'bg-gradient-to-br from-blue-600 to-indigo-700',
        'bg-gradient-to-br from-amber-500 to-orange-600',
        'bg-gradient-to-br from-emerald-500 to-teal-600',
        'bg-gradient-to-br from-pink-500 to-rose-600',
    ]
    const businessSystemsCards: ScrollCardItem[] = (businessSystemsGroups[0]?.pillars ?? []).map((pillar, i) => ({
        name: isAr ? pillar.name.ar : pillar.name.en,
        tagline: isAr ? 'الكفاءة التشغيلية' : 'Operational Efficiency',
        icon: <img src={pillar.icon} alt="" width={40} height={40} className="w-10 h-10" />,
        description: isAr ? pillar.description.ar : pillar.description.en,
        gradient: pillarGradients[i % pillarGradients.length],
        glowColor: 'bg-lavender/50',
        features: getLocalizedPillarSubServiceNames(pillar.slug, locale, 4),
        href: localePath(locale, pillar.href),
    }))

    return (
        <div className="min-h-screen bg-lavender" dir={dir}>
            {/* SSR-rendered h1 for SEO */}
            <SeoH1>{currentContent.title} — CloudTopia</SeoH1>

            {/* Section 1: Hero Parallax */}
            <HeroParallax
                products={products}
                title={currentContent.title}
                description={currentContent.description}
                isRTL={locale === 'ar'}
            />

            {/* Section 2: Horizontal Scrolling Service Cards */}
            <HorizontalScrollCards
                cards={businessSystemsCards}
                title={p?.solutionsTitle || 'Our Comprehensive Solutions'}
                subtitle={p?.solutionsSubtitle || 'Explore our integrated business systems designed to transform your operations'}
                whatsIncludedLabel={p?.whatsIncluded || "What's Included:"}
                moreText={p?.more || 'more'}
                isRTL={locale === 'ar'}
                variant="light"
            />

            {/* Section 2b: Full sub-service catalog (pillars → tailored sub-services) */}
            <section className="bg-lavender py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-10 max-w-2xl text-center">
                        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">
                            {locale === 'ar' ? 'استكشف الكتالوج' : 'Explore the catalog'}
                        </p>
                        <h2 className="text-balance text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                            {locale === 'ar' ? 'كل خدمات أنظمة الأعمال' : 'Every Business Systems service'}
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
                            {locale === 'ar'
                                ? 'تصفّح أنظمتنا المحورية والخدمات المخصصة تحت كل نظام — اضغط على أي نظام لعرض ما نبنيه.'
                                : 'Browse our core systems and the tailored services under each — click a system to see what we build.'}
                        </p>
                    </div>
                    <DetailedServicesSection categoryId="business-systems-development" locale={locale === 'ar' ? 'ar' : 'en'} />
                </div>
            </section>

            {/* Section 3: HeroModern - Comprehensive Business Systems Overview */}
            <HeroModern
                badge={p?.badge || 'Business Systems Development'}
                title={p?.modernTitle || 'Enterprise-Grade Business Systems Built for Growth & Efficiency'}
                description={p?.modernDescription || 'Transform your operations with custom CRM, POS, ERP, and inventory management solutions. We build scalable business systems that automate workflows, centralize data, and drive measurable ROI.'}
                metrics={p?.metrics || []}
                modes={p?.modes || {}}
                controlStackTitle={p?.expertiseTitle || 'Our Expertise'}
                controlStackDescription={p?.expertiseDescription || 'We specialize in building business systems that integrate seamlessly with your existing workflows while providing the flexibility to scale with your growth.'}
                controlStackItems={p?.expertiseItems || []}
                protocolsTitle={p?.processTitle || 'Development Process'}
                protocols={p?.processSteps || []}
                showcaseImage={{
                    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
                    alt: p?.showcase?.alt || 'Modern business dashboard interface showing analytics and data visualization',
                    caption: p?.showcase?.caption || 'System Dashboard',
                    captionRight: p?.showcase?.captionRight || 'Real-time Analytics',
                }}
                showThemeToggle={false}
                isRTL={locale === 'ar'}
                modeLabels={locale === 'ar' ? { strategy: 'الاستراتيجية', execution: 'التنفيذ' } : { strategy: 'Strategy', execution: 'Execution' }}
                controlStackBadge={locale === 'ar' ? 'مخصص' : 'Custom'}
                protocolsBadge={locale === 'ar' ? '٣ مراحل' : '3 Phases'}
                labelAvailable={locale === 'ar' ? 'متاح الآن' : 'Available Now'}
                labelCustomSolutions={locale === 'ar' ? 'حلول مخصصة' : 'Custom Solutions'}
                labelApproach={locale === 'ar' ? 'نهجنا' : 'Our Approach'}
            />

            {/* Contact / lead-capture section → CMS (ContactInquiries) */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 py-20 md:py-28">
                <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(251, 191, 36, 0.25) 0%, transparent 50%)',
                    }} />
                </div>
                <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
                    <div className="text-center lg:text-start">
                        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-amber-300">
                            {isAr ? 'لنتحدّث' : "Let's talk"}
                        </p>
                        <h2 className="text-balance text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl">
                            {isAr ? 'ابنِ نظام أعمالك مع كلاودتوبيا' : 'Build your business system with CloudTopia'}
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg lg:mx-0">
                            {isAr
                                ? 'أخبرنا عن عملياتك وسيتواصل معك مختصونا خلال ٢٤ ساعة باستشارة مجانية وخطة واضحة.'
                                : 'Tell us about your operation and our specialists will reach out within 24 hours with a free consultation and a clear plan.'}
                        </p>
                    </div>
                    <div className="mx-auto w-full max-w-md">
                        <ContactLeadForm service={isAr ? 'تطوير أنظمة الأعمال' : 'Business Systems Development'} locale={locale} />
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                    }} />
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        {p?.cta?.title || 'Ready to Transform Your Business Operations?'}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        {p?.cta?.description || "Let's build a custom business system that meets your unique needs and drives your growth."}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href={localePath(locale, '/contact')}
                            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-lavender rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            {p?.cta?.button || 'Start Your Project Today'}
                            <svg className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href={localePath(locale, '/services')}
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-lavender/10 transition-all duration-300"
                        >
                            {p?.cta?.explore || 'Explore All Services'}
                        </Link>
                    </div>

                    <div className="mt-16 pt-10 border-t border-white/10">
                        <p className="text-slate-400 text-sm uppercase tracking-wider mb-6">
                            {p?.whyChoose?.title || 'Why Choose Us'}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                            {(p?.whyChoose?.items || [
                                { icon: '🎯', label: 'Custom Solutions' },
                                { icon: '⚡', label: 'Fast Delivery' },
                                { icon: '🔧', label: 'Ongoing Support' },
                                { icon: '📈', label: 'Scalable' },
                            ]).map((item: any) => (
                                <div key={item.label} className="flex items-center gap-2 text-center">
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-sm text-slate-300">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
