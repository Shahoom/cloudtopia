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

    const s = t?.serviceCards?.businessSystems

    // Business Systems Cards with same icons as services page
    const businessSystemsCards: ScrollCardItem[] = [
        {
            name: s?.crm?.name || 'CRM System',
            tagline: s?.crm?.tagline || 'Smart Customer Management',
            icon: <img src="/icons/services/CRM System.png" alt="CRM" width={40} height={40} className="w-10 h-10" />,
            description: s?.crm?.description || 'Complete CRM solution for customer relationship management, sales tracking, and marketing automation.',
            gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
            glowColor: "bg-lavender/50",
            features: s?.crm?.features?.slice(0, 4) || [],
        },
        {
            name: s?.inventory?.name || 'Inventory Management',
            tagline: s?.inventory?.tagline || 'Precise Stock Tracking',
            icon: <img src="/icons/services/Inventory Management.png" alt="Inventory" width={40} height={40} className="w-10 h-10" />,
            description: s?.inventory?.description || 'Comprehensive inventory and warehouse management system with real-time product tracking.',
            gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
            glowColor: "bg-lavender/50",
            features: s?.inventory?.features?.slice(0, 4) || [],
        },
        {
            name: s?.pos?.name || 'POS System',
            tagline: s?.pos?.tagline || 'Advanced Point of Sale',
            icon: <img src="/icons/services/POS System.png" alt="POS" width={40} height={40} className="w-10 h-10" />,
            description: s?.pos?.description || 'Cloud-based POS system integrated with inventory, customer management, and financial reporting.',
            gradient: "bg-gradient-to-br from-indigo-500 to-indigo-600",
            glowColor: "bg-lavender/50",
            features: s?.pos?.features?.slice(0, 4) || [],
        },
        {
            name: s?.hr?.name || 'HR Management',
            tagline: s?.hr?.tagline || 'Efficient Team Management',
            icon: <img src="/icons/services/HR Management.png" alt="HR" width={40} height={40} className="w-10 h-10" />,
            description: s?.hr?.description || 'Complete HR system from recruitment to payroll and performance management.',
            gradient: "bg-gradient-to-br from-green-500 to-green-600",
            glowColor: "bg-lavender/50",
            features: s?.hr?.features?.slice(0, 4) || [],
        },
        {
            name: s?.booking?.name || 'Booking System',
            tagline: s?.booking?.tagline || 'Smart & Flexible Booking',
            icon: <img src="/icons/services/Booking System.png" alt="Booking" width={40} height={40} className="w-10 h-10" />,
            description: s?.booking?.description || 'Integrated booking system for services and appointments with calendar integration.',
            gradient: "bg-gradient-to-br from-pink-500 to-pink-600",
            glowColor: "bg-lavender/50",
            features: s?.booking?.features?.slice(0, 4) || [],
        },
        {
            name: s?.analytics?.name || 'Analytics Dashboard',
            tagline: s?.analytics?.tagline || 'Advanced Business Insights',
            icon: <img src="/icons/services/Analytics Dashboard.png" alt="Analytics" width={40} height={40} className="w-10 h-10" />,
            description: s?.analytics?.description || 'Advanced analytics dashboards to monitor business performance and make data-driven decisions.',
            gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
            glowColor: "bg-lavender/50",
            features: s?.analytics?.features?.slice(0, 4) || [],
        },
    ]

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
                modeLabels={locale === 'ar' ? { strategy: 'الاستراتيجية', execution: 'التنفيذ' } : locale === 'tr' ? { strategy: 'Strateji', execution: 'Uygulama' } : { strategy: 'Strategy', execution: 'Execution' }}
                controlStackBadge={locale === 'ar' ? 'مخصص' : locale === 'tr' ? 'Özel' : 'Custom'}
                protocolsBadge={locale === 'ar' ? '٣ مراحل' : locale === 'tr' ? '3 Aşama' : '3 Phases'}
                labelAvailable={locale === 'ar' ? 'متاح الآن' : locale === 'tr' ? 'Mevcut' : 'Available Now'}
                labelCustomSolutions={locale === 'ar' ? 'حلول مخصصة' : locale === 'tr' ? 'Özel Çözümler' : 'Custom Solutions'}
                labelApproach={locale === 'ar' ? 'نهجنا' : locale === 'tr' ? 'Yaklaşımımız' : 'Our Approach'}
            />

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
