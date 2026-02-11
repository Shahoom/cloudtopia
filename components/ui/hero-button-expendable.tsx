"use client"

import { useState, useEffect } from "react"
import { X, Check, ArrowRight, BarChart3, Globe2, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { MeshGradient } from "@paper-design/shaders-react"
import { AuroraFlux } from "@/components/ui/aurora-flux"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export default function Hero() {
    const { locale, t } = useLanguage()
    const [isExpanded, setIsExpanded] = useState(false)
    const [formStep, setFormStep] = useState<"idle" | "submitting" | "success">("idle")
    const [currentWordIndex, setCurrentWordIndex] = useState(0)

    const cyclingWords = (t.home?.hero?.titleHighlights as string[]) ||
        (locale === 'ar' ? ['السحابة', 'الإنترنت', 'العالم الرقمي'] : ['Cloud', 'Internet', 'Digital World'])

    const gradientColors = [
        'from-blue-400 via-cyan-400 to-teal-400',
        'from-purple-400 via-pink-400 to-rose-400',
        'from-emerald-400 via-teal-400 to-cyan-400',
    ]

    // Cycle through words
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % cyclingWords.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [cyclingWords.length])

    const handleExpand = () => setIsExpanded(true)

    const handleClose = () => {
        setIsExpanded(false)
        // Reset form after a brief delay so the user doesn't see it reset while closing
        setTimeout(() => setFormStep("idle"), 500)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormStep("submitting")
        // Simulate API call
        setTimeout(() => {
            setFormStep("success")
        }, 1500)
    }

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => { document.body.style.overflow = "unset" }
    }, [isExpanded])

    const isRTL = locale === 'ar'

    return (
        <>
            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 sm:px-6 py-12 sm:py-20 transition-colors duration-300">

                {/* AuroraFlux Background - Dynamic flowing aurora effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <AuroraFlux
                        fullScreen={false}
                        pauseWhenHidden={true}
                        pauseOnHover={false}
                        mix={0.5}
                        className="absolute inset-0 opacity-60"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        }}
                        ariaLabel="Dynamic aurora background effect"
                    />
                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950/70" />
                </div>

                <div className={`relative z-10 flex flex-col items-center gap-6 sm:gap-8 text-center ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-sm font-medium text-zinc-200 backdrop-blur-sm"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                        {t.header?.tagline || 'Digital & Cloud Technologies'}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-50 max-w-5xl"
                    >
                        {isRTL ? 'ارتقِ بأعمالك' : 'Elevate Your Business'} <br className="hidden sm:block" />
                        <span className="inline-flex items-baseline gap-3">
                            <span className="text-zinc-50">{isRTL ? 'إلى' : 'Into the'}</span>
                            <span className="relative inline-block min-w-[180px] sm:min-w-[240px] md:min-w-[300px] h-[1.15em] overflow-hidden align-bottom">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={currentWordIndex}
                                        initial={{ y: 40, opacity: 0, scale: 0.95 }}
                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                        exit={{ y: -40, opacity: 0, scale: 0.95 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                        className={`absolute ${isRTL ? 'right-0' : 'left-0'} bottom-0 text-transparent bg-clip-text bg-gradient-to-br ${gradientColors[currentWordIndex]} whitespace-nowrap`}
                                    >
                                        {cyclingWords[currentWordIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl px-4 leading-relaxed"
                    >
                        {t.home?.hero?.description || 'CloudTopia empowers businesses to thrive in the digital era — from crafting stunning online presence, to building powerful systems and web applications, to pioneering innovation through cutting-edge technology.'}
                    </motion.p>

                    <AnimatePresence initial={false}>
                        {!isExpanded && (
                            <motion.div className="inline-block relative mt-4">
                                {/* The expanding background element */}
                                <motion.div
                                    style={{ borderRadius: "100px" }}
                                    layout
                                    layoutId="cta-card"
                                    className="absolute inset-0 bg-blue-600 dark:bg-blue-600"
                                />
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    layout={false}
                                    onClick={handleExpand}
                                    className="relative flex items-center gap-2 h-14 px-8 py-3 text-lg font-medium text-white tracking-wide hover:opacity-90 transition-opacity"
                                >
                                    {t.home?.hero?.getStarted || 'Get Started'}
                                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* 
        Expanded Modal Overlay 
      */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
                        <motion.div
                            layoutId="cta-card"
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            style={{ borderRadius: "24px" }}
                            layout
                            className="relative flex h-full w-full overflow-hidden bg-blue-700 sm:rounded-[24px] shadow-2xl"
                        >
                            {/* Mesh Gradient Background inside Modal */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 pointer-events-none"
                            >
                                <MeshGradient
                                    speed={0.6}
                                    colors={["#1d4ed8", "#1e40af", "#172554", "#1e3a8a"]} // Blue palette
                                    distortion={0.8}
                                    swirl={0.1}
                                    grainMixer={0.15}
                                    grainOverlay={0}
                                    style={{ height: "100%", width: "100%" }}
                                />
                            </motion.div>

                            {/* Close Button */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={handleClose}
                                className={`absolute ${isRTL ? 'left-4 sm:left-8' : 'right-4 sm:right-8'} top-4 sm:top-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20`}
                            >
                                <X className="h-5 w-5" />
                            </motion.button>

                            {/* Modal Content */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className={`relative z-10 flex flex-col lg:flex-row h-full w-full max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden ${isRTL ? 'font-arabic' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                {/* Left Side: Testimonials & Info */}
                                <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-16 gap-8 text-white">
                                    <div className="space-y-4">
                                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                                            {t.home?.hero?.modal?.title || 'Ready to scale?'}
                                        </h2>
                                        <p className="text-blue-100 text-lg max-w-md">
                                            {t.home?.hero?.modal?.description || 'Join forward-thinking companies building their digital future with CloudTopia.'}
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex gap-4 items-start">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                                                <BarChart3 className="w-6 h-6 text-blue-200" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{t.home?.hero?.modal?.feature1?.title || 'Strategic Growth'}</h3>
                                                <p className="text-blue-100/80 text-sm leading-relaxed mt-1">
                                                    {t.home?.hero?.modal?.feature1?.description || 'Custom digital strategies tailored to your business goals and market needs.'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                                                <Globe2 className="w-6 h-6 text-blue-200" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{t.home?.hero?.modal?.feature2?.title || 'Global Reach'}</h3>
                                                <p className="text-blue-100/80 text-sm leading-relaxed mt-1">
                                                    {t.home?.hero?.modal?.feature2?.description || 'Deploy your presence globally with local expertise in the Middle East and beyond.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-8 border-t border-white/20">
                                        <figure>
                                            <blockquote className="text-xl font-medium leading-relaxed mb-6 italic">
                                                {t.home?.hero?.modal?.testimonial || '"CloudTopia transformed how we operate. Our digital presence saw a 300% growth in engagement within months."'}
                                            </blockquote>
                                            <figcaption className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-500 flex items-center justify-center text-lg font-bold text-white uppercase">
                                                    {(t.home?.hero?.modal?.testimonialAuthor as string)?.charAt(0) || 'A'}
                                                </div>
                                                <div>
                                                    <div className="font-semibold">{t.home?.hero?.modal?.testimonialAuthor || 'Ahmed Al-Saud'}</div>
                                                    <div className="text-sm text-blue-200">{t.home?.hero?.modal?.testimonialRole || 'Founder, Riyadh Tech Solutions'}</div>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>

                                {/* Right Side: Form */}
                                <div className="flex-1 flex items-center justify-center p-4 sm:p-12 lg:p-16 bg-black/10 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
                                    <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">

                                        {formStep === "success" ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center justify-center text-center h-[400px] space-y-6"
                                            >
                                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                                                    <Check className="w-10 h-10 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-2">{t.home?.hero?.modal?.form?.successTitle || 'Request Received!'}</h3>
                                                    <p className="text-blue-100">{t.home?.hero?.modal?.form?.successMessage || 'Our team will be in touch shortly to schedule your personalized demo.'}</p>
                                                </div>
                                                <button
                                                    onClick={handleClose}
                                                    className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors text-sm font-medium"
                                                >
                                                    {t.home?.hero?.modal?.form?.returnHome || 'Return to Homepage'}
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-5">
                                                <div className="space-y-1">
                                                    <h3 className="text-xl font-semibold text-white">{t.home?.hero?.modal?.form?.title || 'Get a Demo'}</h3>
                                                    <p className="text-sm text-blue-200">{t.home?.hero?.modal?.form?.subtitle || 'Fill out the form below and we\'ll contact you shortly.'}</p>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <label htmlFor="name" className="block text-xs font-medium text-blue-200 mb-1.5 uppercase tracking-wider">
                                                            {t.home?.hero?.modal?.form?.fullName || 'Full Name'}
                                                        </label>
                                                        <input
                                                            required
                                                            type="text"
                                                            id="name"
                                                            placeholder={isRTL ? "الاسم هنا..." : "Jane Doe"}
                                                            className="w-full px-4 py-3 rounded-lg bg-blue-950/40 border border-blue-300/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor="email" className="block text-xs font-medium text-blue-200 mb-1.5 uppercase tracking-wider">
                                                            {t.home?.hero?.modal?.form?.email || 'Work Email'}
                                                        </label>
                                                        <input
                                                            required
                                                            type="email"
                                                            id="email"
                                                            placeholder="jane@company.com"
                                                            className="w-full px-4 py-3 rounded-lg bg-blue-950/40 border border-blue-300/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label htmlFor="company" className="block text-xs font-medium text-blue-200 mb-1.5 uppercase tracking-wider">
                                                                {t.home?.hero?.modal?.form?.company || 'Company'}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="company"
                                                                placeholder={isRTL ? "اسم الشركة..." : "Acme Inc"}
                                                                className="w-full px-4 py-3 rounded-lg bg-blue-950/40 border border-blue-300/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="size" className="block text-xs font-medium text-blue-200 mb-1.5 uppercase tracking-wider">
                                                                {t.home?.hero?.modal?.form?.companySize || 'Size'}
                                                            </label>
                                                            <select
                                                                id="size"
                                                                className="w-full px-4 py-3 rounded-lg bg-blue-950/40 border border-blue-300/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
                                                            >
                                                                <option className="bg-blue-900">1-50</option>
                                                                <option className="bg-blue-900">51-200</option>
                                                                <option className="bg-blue-900">201-1000</option>
                                                                <option className="bg-blue-900">1000+</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="message" className="block text-xs font-medium text-blue-200 mb-1.5 uppercase tracking-wider">
                                                            {t.home?.hero?.modal?.form?.needs || 'Project Needs'}
                                                        </label>
                                                        <textarea
                                                            id="message"
                                                            rows={3}
                                                            placeholder={isRTL ? "أخبرنا عن مشروعك..." : "Tell us about your project..."}
                                                            className="w-full px-4 py-3 rounded-lg bg-blue-950/40 border border-blue-300/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    disabled={formStep === "submitting"}
                                                    type="submit"
                                                    className="w-full flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50 focus:ring-4 focus:ring-blue-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                                >
                                                    {formStep === "submitting" ? (
                                                        <span className="flex items-center gap-2">
                                                            <span className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                                                            {t.home?.hero?.modal?.form?.submitting || 'Sending...'}
                                                        </span>
                                                    ) : (t.home?.hero?.modal?.form?.submit || "Submit Request")}
                                                </button>

                                                <p className="text-xs text-center text-blue-200/60 mt-4">
                                                    {t.home?.hero?.modal?.form?.terms || 'By submitting, you agree to our Terms of Service and Privacy Policy.'}
                                                </p>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

