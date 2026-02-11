'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Globe, Zap, MapPin, TrendingUp, ArrowRight, Star } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

export interface ServiceDetailContent {
    name: string
    tagline?: string
    detailedDescription?: string
    benefits?: string[]
    features: string[]
    useCases?: string[]
    technologies?: string[]
    geographicCoverage?: {
        regions: string[]
        description: string
    }
    pricingApproach?: string
    icon: React.ReactNode
    gradient: string
}

interface ServiceDetailModalProps {
    isOpen: boolean
    onClose: () => void
    service: ServiceDetailContent
}

export function ServiceDetailModal({ isOpen, onClose, service }: ServiceDetailModalProps) {
    const { locale } = useLanguage()
    const isRTL = locale === 'ar'

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Close on ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="min-h-screen px-4 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className={cn(
                                    "relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden",
                                    isRTL && "text-right"
                                )}
                                onClick={(e) => e.stopPropagation()}
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-title"
                            >
                                {/* Header with gradient */}
                                <div className={cn("relative overflow-hidden", service.gradient, "p-8 pb-12")}>
                                    {/* Close button */}
                                    <button
                                        onClick={onClose}
                                        className={cn(
                                            "absolute top-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 text-white z-10",
                                            isRTL ? "left-4" : "right-4"
                                        )}
                                        aria-label="Close modal"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    {/* Icon and title */}
                                    <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-lg">
                                            {service.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h2 id="modal-title" className="text-3xl md:text-4xl font-bold text-white mb-2">
                                                {service.name}
                                            </h2>
                                            {service.tagline && <p className="text-lg text-white/90 font-medium">{service.tagline}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-8 space-y-8">

                                    {/* Detailed Description */}
                                    {service.detailedDescription && (
                                        <section>
                                            <p className="text-lg text-neutral-700 leading-relaxed">
                                                {service.detailedDescription}
                                            </p>
                                        </section>
                                    )}

                                    {/* Key Benefits */}
                                    {service.benefits && service.benefits.length > 0 && (
                                        <section>
                                            <div className={cn("flex items-center gap-2 mb-4", isRTL && "flex-row-reverse")}>
                                                <Star className="w-6 h-6 text-primary-600" />
                                                <h3 className="text-2xl font-bold text-neutral-900">
                                                    {isRTL ? 'الفوائد الرئيسية' : 'Key Benefits'}
                                                </h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {service.benefits.map((benefit, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                                        className="flex items-start gap-3 bg-gradient-to-br from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-100"
                                                    >
                                                        <TrendingUp className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                                        <span className="text-neutral-700 leading-relaxed">{benefit}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Features */}
                                    <section>
                                        <div className={cn("flex items-center gap-2 mb-4", isRTL && "flex-row-reverse")}>
                                            <Zap className="w-6 h-6 text-primary-600" />
                                            <h3 className="text-2xl font-bold text-neutral-900">
                                                {isRTL ? 'المميزات' : 'Features'}
                                            </h3>
                                        </div>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {service.features.map((feature, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                                                    className={cn("flex items-start gap-3", isRTL && "flex-row-reverse")}
                                                >
                                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-neutral-700">{feature}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </section>

                                    {/* Use Cases */}
                                    {service.useCases && service.useCases.length > 0 && (
                                        <section>
                                            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                                                {isRTL ? 'حالات الاستخدام' : 'Perfect For'}
                                            </h3>
                                            <div className="flex flex-wrap gap-3">
                                                {service.useCases.map((useCase, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-4 py-2 bg-white border-2 border-primary-200 text-neutral-800 rounded-full font-medium text-sm hover:border-primary-400 hover:shadow-md transition-all duration-200"
                                                    >
                                                        {useCase}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Technologies (if applicable) */}
                                    {service.technologies && service.technologies.length > 0 && (
                                        <section>
                                            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                                                {isRTL ? 'التقنيات المستخدمة' : 'Technologies We Use'}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {service.technologies.map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 rounded-lg text-sm font-semibold border border-blue-200"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Geographic Coverage */}
                                    {service.geographicCoverage && (
                                        <section className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-100">
                                            <div className={cn("flex items-center gap-2 mb-3", isRTL && "flex-row-reverse")}>
                                                <MapPin className="w-6 h-6 text-blue-600" />
                                                <h3 className="text-2xl font-bold text-neutral-900">
                                                    {isRTL ? 'التغطية الجغرافية' : 'Service Availability'}
                                                </h3>
                                            </div>
                                            <p className="text-neutral-700 mb-3 leading-relaxed">
                                                {service.geographicCoverage.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {service.geographicCoverage.regions.map((region, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 bg-white text-blue-800 rounded-full text-sm font-medium shadow-sm"
                                                    >
                                                        {region}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Pricing Approach */}
                                    {service.pricingApproach && (
                                        <section>
                                            <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                                                {isRTL ? 'نموذج التسعير' : 'Pricing Approach'}
                                            </h3>
                                            <p className="text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                                                {service.pricingApproach}
                                            </p>
                                        </section>
                                    )}

                                    {/* CTA Buttons */}
                                    <section className="pt-4 border-t-2 border-neutral-100">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <a
                                                href="/contact"
                                                className={cn(
                                                    "flex-1 py-4 px-6 rounded-xl font-semibold text-white text-center",
                                                    "flex items-center justify-center gap-2",
                                                    "transform transition-all duration-300",
                                                    "hover:shadow-xl hover:scale-105 active:scale-95",
                                                    service.gradient
                                                )}
                                            >
                                                <span>{isRTL ? 'احصل على عرض أسعار' : 'Request Quote'}</span>
                                                <ArrowRight className={cn("w-5 h-5", isRTL && "rotate-180")} />
                                            </a>
                                            <a
                                                href="/contact"
                                                className="flex-1 py-4 px-6 rounded-xl font-semibold text-primary-700 bg-primary-50 border-2 border-primary-200 text-center hover:bg-primary-100 hover:border-primary-300 transition-all duration-300"
                                            >
                                                {isRTL ? 'استشارة مجانية' : 'Free Consultation'}
                                            </a>
                                        </div>
                                    </section>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
