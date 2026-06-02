import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface StickyFeatureSectionProps {
    locale?: string;
}

// --- Custom Hook for Scroll Animation ---
const useScrollAnimation = () => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return [ref, inView] as const;
};

// --- Header Component ---
const AnimatedHeader: React.FC<{ locale?: string }> = ({ locale = 'en' }) => {
    const [headerRef, headerInView] = useScrollAnimation();
    const [pRef, pInView] = useScrollAnimation();
    const isArabic = locale === 'ar';

    return (
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
                ref={headerRef}
                className={`text-4xl md:text-5xl font-black transition-all duration-700 ease-out text-gray-900 dark:text-white ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {isArabic ? 'تطبيقات ويب متطورة وآمنة' : 'Advanced & Secure Web Applications'}
            </h2>
            <p
                ref={pRef}
                className={`text-lg text-gray-600 dark:text-gray-300 mt-4 transition-all duration-700 ease-out delay-200 ${pInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {isArabic
                    ? 'نبني حلول ويب حديثة تجمع بين الأداء العالي والأمان المؤسسي'
                    : 'We build modern web solutions that combine high performance with enterprise-grade security'
                }
            </p>
        </div>
    );
};

// This is the main component that orchestrates everything.
export function StickyFeatureSection({ locale = 'en' }: StickyFeatureSectionProps) {
    const isArabic = locale === 'ar';

    // --- Data for the feature cards ---
    const features = [
        {
            title: isArabic ? 'مزامنة البيانات في الوقت الفعلي' : 'Real-Time Data Sync',
            description: isArabic
                ? 'تطبيقاتنا تتزامن تلقائياً عبر جميع الأجهزة والمستخدمين. كل تحديث يظهر فوراً، مع ضمان تناسق البيانات وموثوقيتها في جميع الأوقات.'
                : 'Our applications automatically sync across all devices and users. Every update appears instantly, ensuring data consistency and reliability at all times.',
            imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
            bgColor: "bg-lavender dark:bg-emerald-900/30",
            textColor: "text-gray-700 dark:text-gray-200"
        },
        {
            title: isArabic ? 'تكامل API شامل' : 'Comprehensive API Integration',
            description: isArabic
                ? 'نوفر واجهات برمجية قوية ومرنة تتيح التكامل السلس مع الأنظمة الخارجية. ربط تطبيقك بأي خدمة أو منصة بسهولة تامة.'
                : 'We provide robust and flexible APIs that enable seamless integration with external systems. Connect your application to any service or platform effortlessly.',
            imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
            bgColor: "bg-lavender dark:bg-cyan-900/30",
            textColor: "text-gray-700 dark:text-gray-200"
        },
        {
            title: isArabic ? 'بنية قابلة للتوسع' : 'Scalable Architecture',
            description: isArabic
                ? 'مبنية على بنية سحابية حديثة تدعم النمو من عشرات إلى ملايين المستخدمين. تطبيقاتنا تتوسع تلقائياً حسب الطلب دون أي تدخل يدوي.'
                : 'Built on modern cloud architecture that supports growth from dozens to millions of users. Our applications scale automatically based on demand without manual intervention.',
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            bgColor: "bg-lavender dark:bg-blue-900/30",
            textColor: "text-gray-700 dark:text-gray-200"
        },
        {
            title: isArabic ? 'دعم متعدد المنصات' : 'Cross-Platform Support',
            description: isArabic
                ? 'تطبيق واحد يعمل بسلاسة على الويب، الهاتف، والتابلت. تجربة مستخدم متسقة عبر جميع الأجهزة والمتصفحات مع أداء محسّن لكل منصة.'
                : 'One application that works seamlessly on web, mobile, and tablet. Consistent user experience across all devices and browsers with optimized performance for each platform.',
            imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
            bgColor: "bg-lavender dark:bg-teal-900/30",
            textColor: "text-gray-800 dark:text-gray-100"
        },
    ];

    return (
        <div className="bg-lavender dark:bg-slate-950 font-sans border-y border-gray-200/10">
            <div className="px-[5%]">
                <div className="max-w-7xl mx-auto">
                    <section className="py-24 md:py-48 flex flex-col items-center">

                        <AnimatedHeader locale={locale} />

                        {/* The container for the sticky cards */}
                        <div className="w-full">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95, y: 50 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className={`${feature.bgColor} grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-12 p-8 md:p-16 rounded-[2.5rem] mb-16 sticky border border-white/5 backdrop-blur-md`}
                                    style={{ top: '150px' }}
                                >
                                    {/* Card Content */}
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-3xl md:text-4xl font-black mb-6 text-gray-900 dark:text-white leading-tight">
                                            {feature.title}
                                        </h3>
                                        <p className={`${feature.textColor} text-base md:text-lg leading-relaxed`}>
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Card Image */}
                                    <div className="image-wrapper mt-8 md:mt-0 relative group">
                                        <div className="absolute inset-0 bg-lavender/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <img
                                            src={feature.imageUrl}
                                            alt={feature.title}
                                            loading="lazy"
                                            width={600}
                                            height={400}
                                            className="relative z-10 w-full h-auto rounded-2xl shadow-2xl object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found";
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
