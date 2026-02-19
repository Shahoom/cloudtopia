'use client'

import { cn } from '@/lib/utils'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { Palette, Video, PenTool, BarChart3, Megaphone, Camera, FileText, Sparkles } from 'lucide-react'

interface ContentBlockProps {
    locale?: string
}

interface ContentData {
    sectionLabel: string
    title: string
    description: string
    feature1Title: string
    feature1Desc: string
    feature1Label: string
    feature2Title: string
    feature2Desc: string
    feature2Label: string
    qualityBadge: string
    services: { icon: React.ReactNode; title: string; desc: string }[]
}

const content: Record<string, ContentData> = {
    en: {
        sectionLabel: "Our Creative Services",
        title: "Elevate Your Brand with Professional Content",
        description: "From concept to execution, we deliver comprehensive content creation solutions that resonate with your audience. Our team of designers, videographers, copywriters, and strategists work together to craft content that not only looks stunning but also drives real business results.",
        feature1Title: "Social Media Content",
        feature1Desc: "Scroll-stopping graphics, reels, and stories designed to maximize engagement across Instagram, TikTok, LinkedIn, and Facebook. We create platform-specific content that speaks your audience's language.",
        feature1Label: "High Engagement",
        feature2Title: "Video Production",
        feature2Desc: "From promotional videos to brand documentaries, our video production team delivers cinematic quality content. We handle everything from scripting and filming to editing and post-production.",
        feature2Label: "Professional Production",
        qualityBadge: "4K Quality",

        services: [
            { icon: <Palette className="size-5" />, title: "Brand Identity", desc: "Logos, colors, and visual guidelines" },
            { icon: <Video className="size-5" />, title: "Video Content", desc: "Reels, ads, and promotional videos" },
            { icon: <PenTool className="size-5" />, title: "Graphic Design", desc: "Posts, banners, and infographics" },
            { icon: <FileText className="size-5" />, title: "Copywriting", desc: "Captions, blogs, and ad copy" },
            { icon: <Camera className="size-5" />, title: "Photography", desc: "Product and lifestyle shoots" },
            { icon: <Megaphone className="size-5" />, title: "Campaigns", desc: "End-to-end marketing campaigns" },
        ],
    },
    ar: {
        sectionLabel: "خدماتنا الإبداعية",
        title: "ارتقِ بعلامتك التجارية مع محتوى احترافي",
        description: "من الفكرة إلى التنفيذ، نقدم حلول إنشاء محتوى شاملة تتواصل مع جمهورك. فريقنا من المصممين ومصوري الفيديو وكتّاب المحتوى والاستراتيجيين يعملون معاً لصناعة محتوى لا يبدو مذهلاً فحسب، بل يحقق نتائج أعمال حقيقية.",
        feature1Title: "محتوى السوشيال ميديا",
        feature1Desc: "رسومات وريلز وستوريز مصممة لتحقيق أقصى تفاعل عبر انستغرام وتيك توك ولينكد إن وفيسبوك. نصنع محتوى مخصص لكل منصة يتحدث بلغة جمهورك.",
        feature1Label: "تفاعل عالي",
        feature2Title: "إنتاج الفيديو",
        feature2Desc: "من الفيديوهات الترويجية إلى الأفلام الوثائقية للعلامات التجارية، فريق الإنتاج لدينا يقدم محتوى بجودة سينمائية. نتولى كل شيء من الكتابة والتصوير إلى المونتاج وما بعد الإنتاج.",
        feature2Label: "إنتاج احترافي",
        qualityBadge: "جودة 4K",

        services: [
            { icon: <Palette className="size-5" />, title: "هوية العلامة", desc: "الشعارات والألوان والإرشادات البصرية" },
            { icon: <Video className="size-5" />, title: "محتوى الفيديو", desc: "ريلز وإعلانات وفيديوهات ترويجية" },
            { icon: <PenTool className="size-5" />, title: "التصميم الجرافيكي", desc: "منشورات وبانرات وإنفوجرافيك" },
            { icon: <FileText className="size-5" />, title: "كتابة المحتوى", desc: "كابشن ومدونات ونصوص إعلانية" },
            { icon: <Camera className="size-5" />, title: "التصوير", desc: "تصوير المنتجات وأسلوب الحياة" },
            { icon: <Megaphone className="size-5" />, title: "الحملات", desc: "حملات تسويقية متكاملة" },
        ],
    },
}

export default function ContentBlock({ locale = 'en' }: ContentBlockProps) {
    const t = locale === 'ar' ? content.ar : content.en
    const isRTL = locale === 'ar'

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-lavender dark:bg-neutral-950">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center mb-12">
                    <span className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium mb-4">
                        <Sparkles className="size-4" />
                        {t.sectionLabel}
                    </span>
                    <h2 className="text-foreground text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-gray-900 dark:text-white">
                        {t.title}
                    </h2>
                    <p className="text-muted-foreground mt-4 text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                        {t.description}
                    </p>
                </div>

                {/* Services Grid with Glowing Cards */}
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-12">
                    {t.services.map((service, index) => (
                        <li key={index} className="min-h-[10rem] list-none">
                            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-zinc-200 dark:border-zinc-700 p-2">
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={3}
                                />
                                <div className="relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border-[0.75px] border-zinc-100 dark:border-zinc-800 bg-lavender dark:bg-zinc-900 p-4 shadow-sm text-center">
                                    <div className="p-3 rounded-full bg-lavender dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {service.desc}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Feature Blocks */}
                <div className="space-y-8 mb-12">
                    {/* Feature 1 */}
                    <div className={cn(
                        "grid gap-8 items-center rounded-2xl bg-gradient-to-br from-lavender to-lavender dark:from-neutral-900 dark:to-neutral-800 p-6 sm:p-8 lg:p-10",
                        "sm:grid-cols-2"
                    )}>
                        <div className={isRTL ? "sm:order-2" : ""}>
                            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-3">
                                <BarChart3 className="size-5" />
                                <span className="text-sm font-medium">{t.feature1Label}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                {t.feature1Title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t.feature1Desc}
                            </p>
                        </div>
                        <div className={cn(
                            "flex items-center justify-center",
                            isRTL ? "sm:order-1" : ""
                        )}>
                            <div className="grid grid-cols-2 gap-3">
                                {['📸', '🎬', '✨', '📊'].map((emoji, i) => (
                                    <div
                                        key={i}
                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-lavender dark:bg-neutral-700 shadow-md flex items-center justify-center text-3xl sm:text-4xl hover:scale-105 transition-transform"
                                    >
                                        {emoji}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className={cn(
                        "grid gap-8 items-center rounded-2xl bg-gradient-to-br from-lavender to-lavender dark:from-neutral-900 dark:to-neutral-800 p-6 sm:p-8 lg:p-10",
                        "sm:grid-cols-2"
                    )}>
                        <div className={cn(
                            "flex items-center justify-center",
                            isRTL ? "sm:order-2" : ""
                        )}>
                            <div className="relative">
                                <div className="w-48 h-32 sm:w-64 sm:h-40 rounded-xl bg-gradient-to-br from-lavender to-lavender shadow-xl flex items-center justify-center">
                                    <Video className="size-12 sm:size-16 text-white" />
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-lavender dark:bg-neutral-800 rounded-lg shadow-lg px-3 py-2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-lavender rounded-full animate-pulse"></span>
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{t.qualityBadge}</span>
                                </div>
                            </div>
                        </div>
                        <div className={isRTL ? "sm:order-1" : ""}>
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-3">
                                <Video className="size-5" />
                                <span className="text-sm font-medium">{t.feature2Label}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                {t.feature2Title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t.feature2Desc}
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}
