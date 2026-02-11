"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextBlockAnimationProps {
  children: React.ReactNode
  animateOnScroll?: boolean
  delay?: number
  blockColor?: string
  stagger?: number
  duration?: number
  className?: string
}

export default function TextBlockAnimation({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = "#000",
  stagger = 0.1,
  duration = 0.6,
  className,
}: TextBlockAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { 
    once: true, 
    margin: "-15% 0px",
    amount: 0.3
  })

  const shouldAnimate = animateOnScroll ? isInView : true

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Block Revealer */}
      <motion.div
        className="absolute inset-0 z-10 origin-left"
        style={{ backgroundColor: blockColor }}
        initial={{ scaleX: 0 }}
        animate={shouldAnimate ? {
          scaleX: [0, 1, 1, 0],
          originX: [0, 0, 1, 1],
        } : { scaleX: 0 }}
        transition={{
          duration: duration * 2,
          delay: delay,
          ease: [0.87, 0, 0.13, 1], // expo.inOut equivalent
          times: [0, 0.4, 0.6, 1],
        }}
      />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.01,
          delay: delay + (duration * 0.8),
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export { TextBlockAnimation }
