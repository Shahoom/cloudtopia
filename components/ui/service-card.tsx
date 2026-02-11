"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlowingEffect } from "./glowing-effect"

export interface ServiceCardItem {
  name: string
  icon: React.ReactNode
  description: string
  features: string[]
  gradient: string
  glowColor: string
  // Extended properties for detailed modal
  tagline?: string
  detailedDescription?: string
  benefits?: string[]
  useCases?: string[]
  technologies?: string[]
  geographicCoverage?: {
    regions: string[]
    description: string
  }
  pricingApproach?: string
  slug?: string
}

interface ServiceCardProps {
  services: ServiceCardItem[]
  onCtaClick?: (serviceName: string) => void
  onServiceClick?: (service: ServiceCardItem) => void  // NEW: Handler for opening modal or navigating
  ctaText?: string
  learnMoreText?: string  // NEW: Text for learn more button
  whatsIncludedLabel?: string
  perfectForLabel?: string
  moreText?: string  // Translation for "+X more"
  variant?: 'light' | 'dark'
}

export function ServiceCard({
  services,
  onCtaClick,
  onServiceClick,
  ctaText = "Get Quote",
  learnMoreText = "Explore This Service",
  whatsIncludedLabel = "What's Included:",
  perfectForLabel = "Perfect For:",
  moreText = "more",
  variant = 'light'
}: ServiceCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {services.map((service, index) => (
        <motion.div
          key={service.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
          viewport={{ once: true }}
          className="group h-full"
        >
          {/* Card Outer Container */}
          <div className={cn(
            "relative h-full rounded-2xl transition-all duration-300",
            "hover:-translate-y-1.5"
          )}>
            <GlowingEffect
              spread={38}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
            />

            {/* Inner Content Card */}
            <div className={cn(
              "relative h-full flex flex-col p-6 rounded-[1.1rem] border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 z-10",
              variant === 'dark'
                ? "bg-slate-900/60 backdrop-blur-xl border-white/10"
                : "bg-white border-neutral-200"
            )}>
              {/* Icon & Name Row */}
              <div className="flex items-start gap-3.5 mb-5">
                <div className={cn(
                  "w-16 h-16 flex items-center justify-center flex-shrink-0",
                  "transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                )}>
                  <div className="flex items-center justify-center w-12 h-12">
                    {service.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "text-lg font-bold leading-tight",
                    variant === 'dark' ? "text-white" : "text-neutral-900"
                  )}>
                    {service.name}
                  </h3>
                  {service.tagline && (
                    <p className={cn(
                      "text-xs font-medium mt-1",
                      variant === 'dark' ? "text-primary-400" : "text-primary-600"
                    )}>
                      {service.tagline}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className={cn(
                "text-sm mb-5 leading-relaxed",
                variant === 'dark' ? "text-slate-300" : "text-neutral-600"
              )}>
                {service.description}
              </p>

              {/* Features - Show first 2, then +N more (N = actual remaining count) */}
              <div className="flex-grow mb-5">
                <h4 className={cn(
                  "text-[10px] font-bold uppercase tracking-widest mb-2.5",
                  variant === 'dark' ? "text-slate-500" : "text-neutral-400"
                )}>
                  {whatsIncludedLabel}
                </h4>
                <ul className="space-y-2">
                  {(Array.isArray(service.features) ? service.features : []).slice(0, 2).map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle className={cn(
                        "w-3.5 h-3.5 flex-shrink-0 mt-0.5",
                        variant === 'dark' ? "text-primary-400" : "text-primary-600"
                      )} />
                      <span className={cn(
                        "text-sm leading-snug",
                        variant === 'dark' ? "text-slate-300" : "text-neutral-700"
                      )}>
                        {feature}
                      </span>
                    </li>
                  ))}
                  {(() => {
                    const features = Array.isArray(service.features) ? service.features : []
                    const moreCount = features.length - 2
                    if (moreCount <= 0) return null
                    return (
                      <li className="flex items-center gap-2 pt-1">
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          variant === 'dark'
                            ? "bg-primary-500/20 text-primary-300"
                            : "bg-primary-100 text-primary-600"
                        )}>
                          +{moreCount} {moreText}
                        </span>
                      </li>
                    )
                  })()}
                </ul>
              </div>



              {/* Action Buttons */}
              <div className="flex gap-2.5 mt-auto">
                {/* Learn More Button */}
                {onServiceClick && (
                  <button
                    onClick={() => onServiceClick(service)}
                    className={cn(
                      "flex-[3] py-3 px-5 rounded-xl font-bold text-sm",
                      "flex items-center justify-center gap-2",
                      "transform transition-all duration-300",
                      "hover:shadow-lg active:scale-95",
                      "group/btn overflow-hidden relative",
                      variant === 'dark'
                        ? "bg-primary-500 text-white hover:bg-primary-600 shadow-primary-500/20 shadow-xl"
                        : (service.gradient.includes('bg-slate') ? "bg-primary-600 text-white hover:bg-primary-700" : service.gradient),
                      (!service.gradient.includes('bg-slate') && variant === 'light') && "text-white"
                    )}
                  >
                    <span className="relative z-10">{learnMoreText}</span>
                    <ArrowRight className="w-4 h-4 relative z-10 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                )}

                {/* Quick Quote Icon Button */}
                {onCtaClick && (
                  <button
                    onClick={() => onCtaClick(service.name)}
                    title={ctaText}
                    className={cn(
                      "flex-1 py-3 px-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center",
                      variant === 'dark'
                        ? "text-slate-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white"
                        : "text-neutral-500 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 hover:text-neutral-700"
                    )}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

