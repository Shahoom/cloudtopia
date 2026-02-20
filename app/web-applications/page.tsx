'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ArrowRight, Globe, Layers, Code2, Shield, Rocket } from 'lucide-react'
import dynamic from 'next/dynamic'

const DotGlobeHero = dynamic(() => import('@/components/ui/globe-hero').then(mod => mod.DotGlobeHero), { ssr: false })
const HorizontalScrollCards = dynamic(() => import('@/components/ui/horizontal-scroll-cards').then(mod => mod.HorizontalScrollCards), { ssr: false })
import type { ScrollCardItem } from '@/components/ui/horizontal-scroll-cards'
const WebAppFeatures = dynamic(() => import('@/components/ui/features-8').then(mod => mod.WebAppFeatures), { ssr: false })
const StickyFeatureSection = dynamic(() => import('@/components/ui/sticky-scroll-cards-section').then(mod => mod.StickyFeatureSection), { ssr: false })



export default function WebApplicationsPage() {
    const { dir, locale } = useLanguage()

    const content = {
        en: {
            badge: 'WEB APPLICATIONS',
            title: 'Build Powerful',
            titleHighlight: 'Web Applications',
            description: 'From SaaS platforms to enterprise portals, we create scalable web applications that power your business growth with cutting-edge technology.',
            ctaExplore: 'Start Your Project',
            ctaDemo: 'View Live Demo',
        },
        ar: {
            badge: 'تطبيقات الويب',
            title: 'بناء تطبيقات',
            titleHighlight: 'ويب قوية',
            description: 'من منصات SaaS إلى بوابات المؤسسات، نقوم بإنشاء تطبيقات ويب قابلة للتوسع تدعم نمو عملك بأحدث التقنيات.',
            ctaExplore: 'ابدأ مشروعك',
            ctaDemo: 'عرض حي',
        }
    }

    const currentContent = locale === 'ar' ? content.ar : content.en

    // Web Applications Cards with icons matching the services
    const webAppsCards: ScrollCardItem[] = [
        {
            name: locale === 'ar' ? 'منصات الوسائط والبث' : 'Media & Streaming Platforms',
            tagline: locale === 'ar' ? 'منصات محتوى احترافية للبث والتفاعل المباشر' : 'Professional content delivery and live engagement',
            icon: <img src="/icons/services/Mobile-Responsive Apps.png" alt="Media Platforms" width={40} height={40} className="w-10 h-10" />,
            description: locale === 'ar'
                ? 'منصات مخصصة لبث المحتوى المرئي والصوتي مع تفاعل فوري وإدارة شاملة'
                : 'Custom platforms for video and audio streaming with live interaction and content management',
            gradient: "bg-gradient-to-br from-pink-500 to-pink-600",
            glowColor: "bg-lavender/50",
            features: locale === 'ar'
                ? ['بث مباشر عالي الجودة', 'إدارة المحتوى والمكتبات', 'نظام اشتراكات ومدفوعات', 'تحليلات المشاهدة والتفاعل']
                : ['HD live streaming infrastructure', 'Content libraries and management', 'Subscription and monetization', 'Viewer analytics and engagement'],
        },
        {
            name: locale === 'ar' ? 'منصات التجارة والأسواق' : 'Commerce & Marketplace Platforms',
            tagline: locale === 'ar' ? 'أسواق متعددة البائعين ومنصات تجارة متكاملة' : 'Multi-vendor marketplaces and complete commerce systems',
            icon: <img src="/icons/services/Booking Platform.png" alt="Commerce" width={40} height={40} className="w-10 h-10" />,
            description: locale === 'ar'
                ? 'منصات تجارة متكاملة تربط البائعين بالمشترين مع أنظمة دفع وشحن'
                : 'Complete commerce platforms connecting buyers and sellers with integrated payments and logistics',
            gradient: "bg-gradient-to-br from-teal-500 to-teal-600",
            glowColor: "bg-lavender/50",
            features: locale === 'ar'
                ? ['إدارة البائعين والمنتجات', 'نظام عربات التسوق والدفع', 'لوحات تحكم للبائعين', 'تتبع الطلبات والشحن']
                : ['Vendor and product management', 'Shopping cart and checkout', 'Seller dashboards and tools', 'Order tracking and fulfillment'],
        },
        {
            name: locale === 'ar' ? 'منتجات SaaS والاشتراكات' : 'SaaS & Subscription Products',
            tagline: locale === 'ar' ? 'برمجيات سحابية قابلة للتوسع مع نماذج اشتراك مرنة' : 'Scalable cloud software with flexible subscription models',
            icon: <img src="/icons/services/Admin Dashboard.png" alt="SaaS" width={40} height={40} className="w-10 h-10" />,
            description: locale === 'ar'
                ? 'تطبيقات سحابية للشركات مع إدارة مستخدمين وفواتير اشتراكات'
                : 'Cloud-based business applications with user management and subscription billing',
            gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
            glowColor: "bg-lavender/50",
            features: locale === 'ar'
                ? ['بنية متعددة المستأجرين', 'إدارة الفواتير والاشتراكات', 'لوحات تحكم تحليلية', 'واجهات برمجية API للتكامل']
                : ['Multi-tenant architecture', 'Billing and subscription management', 'Analytics dashboards', 'API access for integrations'],
        },
        {
            name: locale === 'ar' ? 'بوابات العملاء والمستخدمين' : 'Client & User Portals',
            tagline: locale === 'ar' ? 'بوابات آمنة للعملاء للوصول للخدمات والبيانات' : 'Secure client portals for service access and data management',
            icon: <img src="/icons/services/Customer Portal.png" alt="Portals" width={40} height={40} className="w-10 h-10" />,
            description: locale === 'ar'
                ? 'بوابات مخصصة للعملاء لإدارة الحسابات والطلبات والوثائق'
                : 'Custom client portals for account management, orders, and document access',
            gradient: "bg-gradient-to-br from-cyan-500 to-cyan-600",
            glowColor: "bg-lavender/50",
            features: locale === 'ar'
                ? ['تسجيل دخول آمن للعملاء', 'إدارة الحسابات والملفات', 'تتبع الطلبات والخدمات', 'تواصل مباشر ودعم فني']
                : ['Secure client authentication', 'Account and profile management', 'Service and order tracking', 'Direct messaging and support'],
        },
        {
            name: locale === 'ar' ? 'أنظمة الأعمال الداخلية' : 'Internal Business Systems',
            tagline: locale === 'ar' ? 'أنظمة داخلية مخصصة لتحسين العمليات التشغيلية' : 'Custom internal tools to streamline operations',
            icon: <img src="/icons/services/Payment Integration.png" alt="Internal Systems" width={40} height={40} className="w-10 h-10" />,
            description: locale === 'ar'
                ? 'تطبيقات داخلية مخصصة لإدارة العمليات والموظفين والموارد'
                : 'Tailored internal applications for operations, team, and resource management',
            gradient: "bg-gradient-to-br from-gray-500 to-gray-600",
            glowColor: "bg-lavender/50",
            features: locale === 'ar'
                ? ['أتمتة سير العمل الداخلي', 'لوحات تحكم إدارية', 'إدارة الموظفين والمهام', 'تقارير وتحليلات أداء']
                : ['Workflow automation', 'Admin dashboards and controls', 'Team and task management', 'Performance reporting'],
        },
        {
            name: locale === 'ar' ? 'تطبيقات الذكاء الاصطناعي' : 'AI-Powered Applications',
            tagline: locale === 'ar' ? 'تطبيقات ذكية مدعومة بالذكاء الاصطناعي' : 'Smart applications powered by artificial intelligence',
            icon: <img src="/icons/services/Analytics Dashboard.png" alt="AI Apps" width={40} height={40} className="w-10 h-10" />,
            description: locale === 'ar'
                ? 'تطبيقات متقدمة تستخدم الذكاء الاصطناعي لتحسين العمليات والتنبؤات'
                : 'Advanced applications leveraging AI for process optimization and predictions',
            gradient: "bg-gradient-to-br from-orange-500 to-orange-600",
            glowColor: "bg-lavender/50",
            features: locale === 'ar'
                ? ['معالجة اللغة الطبيعية', 'التعلم الآلي والتنبؤات', 'أتمتة ذكية للمهام', 'تحليلات متقدمة']
                : ['Natural language processing', 'Machine learning & predictions', 'Intelligent task automation', 'Advanced analytics'],
        },
    ]

    return (
        <div className="min-h-screen bg-lavender" dir={dir}>
            {/* Section 1: Globe Hero */}
            <DotGlobeHero
                rotationSpeed={0.004}
                className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lavender/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-lavender/10 rounded-full blur-3xl animate-pulse" />

                <div className="relative z-10 text-center space-y-12 max-w-5xl mx-auto px-6 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-lavender/20 via-lavender/10 to-lavender/20 border border-emerald-400/30 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lavender/10 via-transparent to-lavender/10 animate-pulse" />
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                            <span className="relative z-10 text-sm font-bold text-emerald-400 tracking-wider uppercase">{currentContent.badge}</span>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '500ms' }} />
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85] select-none"
                                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                            >
                                <span className="block font-light text-white/70 mb-3 text-4xl md:text-6xl lg:text-7xl">
                                    {currentContent.title}
                                </span>
                                <span className="block relative">
                                    <span className="bg-gradient-to-br from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent font-black relative z-10">
                                        {currentContent.titleHighlight}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent font-black blur-2xl opacity-50 scale-105"
                                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                                        {currentContent.titleHighlight}
                                    </div>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                                        className="absolute -bottom-6 left-0 h-3 bg-gradient-to-r from-emerald-400 via-cyan-400/80 to-transparent rounded-full shadow-lg shadow-emerald-500/50"
                                    />
                                </span>
                            </motion.h1>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="max-w-3xl mx-auto space-y-4"
                        >
                            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium"
                                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                                {currentContent.description}
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex justify-center items-center pt-4"
                    >
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.2), 0 0 25px rgba(16, 185, 129, 0.3)",
                                y: -2
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.location.href = '/contact'}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-emerald-500/30 transition-all duration-500 overflow-hidden border border-emerald-400/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-lavender/20 via-lavender/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-lavender/30 to-transparent"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.8 }}
                            />
                            <span className="relative z-10 tracking-wide">{currentContent.ctaExplore}</span>
                            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300 rtl:rotate-180" />
                        </motion.button>
                    </motion.div>
                </div>
            </DotGlobeHero>

            {/* Section 2: Horizontal Scrolling Service Cards */}
            <HorizontalScrollCards
                cards={webAppsCards}
                title={locale === 'ar' ? 'حلول تطبيقات الويب' : 'Web Application Solutions'}
                subtitle={locale === 'ar'
                    ? 'استعرض مجموعة تطبيقات الويب المتكاملة التي نقدمها لتحويل أفكارك إلى واقع رقمي'
                    : 'Explore our comprehensive web application solutions designed to bring your ideas to life'}
                whatsIncludedLabel={locale === 'ar' ? 'المميزات:' : "What's Included:"}
                moreText={locale === 'ar' ? 'المزيد' : 'more'}
                isRTL={locale === 'ar'}
                variant="light"
            />

            {/* Section 3: Features */}
            <WebAppFeatures locale={locale} />

            {/* Section 4: Sticky Scroll Cards */}
            <StickyFeatureSection locale={locale} />

            {/* Final CTA Section */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
                    }} />
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        {locale === 'ar'
                            ? 'جاهز لبناء تطبيق الويب الخاص بك؟'
                            : 'Ready to Build Your Web Application?'
                        }
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        {locale === 'ar'
                            ? 'دعنا نحول فكرتك إلى تطبيق ويب قوي يدعم نمو عملك.'
                            : "Let's transform your idea into a powerful web application that drives your business growth."
                        }
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-lavender rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            {locale === 'ar' ? 'ابدأ مشروعك اليوم' : 'Start Your Project Today'}
                            <svg className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-lavender/10 transition-all duration-300"
                        >
                            {locale === 'ar' ? 'استكشف خدماتنا' : 'Explore All Services'}
                        </Link>
                    </div>

                    {/* Value Propositions */}
                    <div className="mt-16 pt-10 border-t border-white/10">
                        <p className="text-slate-400 text-sm uppercase tracking-wider mb-6">
                            {locale === 'ar' ? 'لماذا تختارنا' : 'Why Choose Us'}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                            {[
                                {
                                    icon: <Globe className="w-5 h-5" />,
                                    label: locale === 'ar' ? 'تطبيقات عالمية' : 'Global Scale Apps'
                                },
                                {
                                    icon: <Shield className="w-5 h-5" />,
                                    label: locale === 'ar' ? 'أمان متقدم' : 'Advanced Security'
                                },
                                {
                                    icon: <Rocket className="w-5 h-5" />,
                                    label: locale === 'ar' ? 'أداء فائق' : 'High Performance'
                                },
                                {
                                    icon: <Code2 className="w-5 h-5" />,
                                    label: locale === 'ar' ? 'كود نظيف' : 'Clean Code'
                                },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-2 text-center">
                                    <span className="text-emerald-400">{item.icon}</span>
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
