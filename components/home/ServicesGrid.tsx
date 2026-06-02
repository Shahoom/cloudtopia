'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import { GlowingEffect } from '@/components/ui/glowing-effect'

type ServiceCard = {
    iconImage: string
    title: string
    description: string
    link: string
    tag?: string
}

export default function ServicesGrid() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const localContent = locale === 'ar'
        ? {
            badge: 'ماذا نبني',
            title: 'خدمات رقمية أساسية',
            titleHighlight: 'للشركات التي تريد نمواً حقيقياً',
            description:
                'كلاود توبيا شركة برمجيات وسحابة تبني مواقع احترافية، متاجر إلكترونية، تطبيقات ويب وجوال، أنظمة CRM وERP، ترحيل سحابي، نقل بيانات، وأتمتة بالذكاء الاصطناعي.',
            viewAll: 'تصفّح كل الخدمات',
            cards: [
                {
                    iconImage: '/icons/services/Website Design & Development.png',
                    title: 'تصميم وتطوير مواقع الشركات',
                    description: 'مواقع عربية وإنجليزية سريعة، واضحة، ومبنية للظهور في Google وتحويل الزوار إلى استفسارات ومبيعات.',
                    link: '/website-design',
                    tag: 'مواقع + SEO',
                },
                {
                    iconImage: '/icons/services/E-commerce Solutions.png',
                    title: 'متاجر إلكترونية وأنظمة بيع',
                    description: 'متاجر مع دفع إلكتروني، إدارة منتجات، مخزون، طلبات، كوبونات، وربط واتساب مناسب للشركات والمتاجر.',
                    link: '/ecommerce-solutions',
                    tag: 'E-commerce',
                },
                {
                    iconImage: '/icons/services/CRM System.png',
                    title: 'CRM وERP وأنظمة أعمال',
                    description: 'أنظمة مبيعات، عملاء، فواتير، مخزون، موارد بشرية، وحجوزات مصممة حول سير عمل شركتك.',
                    link: '/business-systems-development',
                    tag: 'CRM · ERP',
                },
                {
                    iconImage: '/icons/services/Admin Dashboard.png',
                    title: 'تطبيقات ويب وجوال ولوحات إدارة',
                    description: 'بوابات عملاء، منصات SaaS، تطبيقات داخلية، لوحات بيانات، وصلاحيات مستخدمين قابلة للتوسع.',
                    link: '/web-applications',
                    tag: 'Apps · SaaS',
                },
                {
                    iconImage: '/icons/services/systems.png',
                    title: 'ترحيل سحابي ونقل بيانات',
                    description: 'نقل المواقع والأنظمة وقواعد البيانات إلى بنية سحابية مستقرة مع نسخ احتياطي ومراقبة وأمان.',
                    link: '/services/cloud-migration',
                    tag: 'Cloud',
                },
                {
                    iconImage: '/icons/services/Real-time Chat System.png',
                    title: 'حلول AI للدعم والأتمتة',
                    description: 'دعم عملاء بالذكاء الاصطناعي، مساعدون داخليون، أتمتة مهام متكررة، وربط أدوات العمل اليومية.',
                    link: '/services/ai-automation',
                    tag: 'AI Automation',
                },
            ],
        }
        : {
            badge: 'What We Build',
            title: 'Core digital services',
            titleHighlight: 'for companies that need real growth',
            description:
                'CloudTopia is a software company and cloud company building professional websites, online stores, web and mobile apps, CRM and ERP systems, cloud migration, data migration, and AI automation.',
            viewAll: 'Browse All Services',
            cards: [
                {
                    iconImage: '/icons/services/Website Design & Development.png',
                    title: 'Website Design & Development',
                    description: 'Fast Arabic and English business websites built for Google visibility, clear inquiry paths, and measurable conversion.',
                    link: '/website-design',
                    tag: 'Websites + SEO',
                },
                {
                    iconImage: '/icons/services/E-commerce Solutions.png',
                    title: 'E-commerce Stores & Sales Systems',
                    description: 'Online stores with payments, products, inventory, orders, coupons, and WhatsApp flows for serious commerce.',
                    link: '/ecommerce-solutions',
                    tag: 'E-commerce',
                },
                {
                    iconImage: '/icons/services/CRM System.png',
                    title: 'CRM, ERP & Business Systems',
                    description: 'Sales, customer, invoicing, inventory, HR, and booking systems shaped around how your company works.',
                    link: '/business-systems-development',
                    tag: 'CRM · ERP',
                },
                {
                    iconImage: '/icons/services/Admin Dashboard.png',
                    title: 'Web Apps, Mobile Apps & Dashboards',
                    description: 'Customer portals, SaaS platforms, internal applications, data dashboards, and role-based access built to scale.',
                    link: '/web-applications',
                    tag: 'Apps · SaaS',
                },
                {
                    iconImage: '/icons/services/systems.png',
                    title: 'Cloud Migration & Data Migration',
                    description: 'Move websites, systems, and databases to reliable cloud infrastructure with backups, monitoring, and security.',
                    link: '/services/cloud-migration',
                    tag: 'Cloud',
                },
                {
                    iconImage: '/icons/services/Real-time Chat System.png',
                    title: 'AI Customer Care & Automation',
                    description: 'AI customer support, internal assistants, repeated task automation, and tool integrations for faster operations.',
                    link: '/services/ai-automation',
                    tag: 'AI Automation',
                },
            ],
        }

    const badge = localContent.badge
    const title = localContent.title
    const titleHighlight = localContent.titleHighlight
    const description = localContent.description
    const viewAll = localContent.viewAll
    const cards: ServiceCard[] = localContent.cards

    return (
        <section
            className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden"
            data-header-theme="light"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 75%)',
                }}
            />

            <div className="relative max-w-7xl mx-auto">
                <div className="max-w-3xl mb-14 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`flex ${isRTL ? 'justify-end' : 'justify-start'} mb-6`}
                    >
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-50 border border-secondary-100 text-secondary-700 text-xs font-bold uppercase tracking-widest">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.12] mb-6"
                    >
                        {title}{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-500 bg-clip-text text-transparent">
                                {titleHighlight}
                            </span>
                            <span className="absolute inset-x-0 bottom-1 h-3 bg-primary-100/60 -z-0 rounded-sm" />
                        </span>
                    </motion.h2>

                    {description && (
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg md:text-xl text-neutral-600 leading-relaxed"
                        >
                            {description}
                        </motion.p>
                    )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {cards.map((card, i) => {
                        return (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            >
                                <div
                                    className="relative h-full rounded-lg p-[1.5px] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    style={{
                                        background:
                                            'conic-gradient(from 180deg at 50% 50%, rgba(14,165,233,0.35), rgba(139,92,246,0.25), rgba(236,72,153,0.3), rgba(14,165,233,0.35))',
                                    }}
                                >
                                    <GlowingEffect
                                        spread={48}
                                        glow={true}
                                        disabled={false}
                                        proximity={96}
                                        inactiveZone={0.05}
                                        borderWidth={2}
                                    />
                                    <Link
                                        href={localePath(locale, card.link)}
                                        className="group relative flex flex-col h-full overflow-hidden rounded-[7px] bg-white p-7 transition-[background-color,color] duration-300"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative flex items-start justify-between mb-6">
                                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-primary-50 to-secondary-50 border border-neutral-200 flex items-center justify-center p-2.5 group-hover:from-primary-100 group-hover:to-secondary-100 transition-colors">
                                                <Image
                                                    src={card.iconImage}
                                                    alt={card.title}
                                                    width={56}
                                                    height={56}
                                                    quality={90}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            {card.tag && (
                                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md">
                                                    {card.tag}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="relative text-xl md:text-2xl font-bold text-neutral-900 mb-3 leading-tight">
                                            {card.title}
                                        </h3>
                                        <p className="relative text-neutral-600 text-sm md:text-base leading-relaxed flex-1 mb-5">
                                            {card.description}
                                        </p>

                                        <div className="relative flex items-center gap-1.5 text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors">
                                            <span>{t.common?.learnMore || t.home?.common?.learnMore || 'Learn more'}</span>
                                            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-12 md:mt-16 flex justify-center"
                >
                    <Link
                        href={localePath(locale, '/services')}
                        className="group inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-neutral-800"
                    >
                        {viewAll}
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
