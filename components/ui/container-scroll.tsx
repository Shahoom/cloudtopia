"use client"

import React, { useRef, useState, useEffect } from "react"
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface HeaderProps {
  translate: MotionValue<number>
  titleComponent: React.ReactNode
}

/**
 * Header wraps a title and moves it vertically on scroll.
 */
export function Header({ translate, titleComponent }: HeaderProps) {
  return (
    <motion.div
      role="banner"
      aria-live="polite"
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center px-4 sm:px-6"
    >
      {titleComponent}
    </motion.div>
  )
}

interface CardProps {
  rotateX: MotionValue<number>
  scale: MotionValue<number>
  children: React.ReactNode
}

/**
 * Card applies 3D rotate and scale transforms to its children on scroll.
 */
export function Card({ rotateX, scale, children }: CardProps) {
  return (
    <motion.div
      role="region"
      aria-label="Scroll-animated content card"
      tabIndex={0}
      style={{
        rotateX,
        scale,
        boxShadow:
          "0 9px 20px rgba(0,0,0,0.2), 0 37px 37px rgba(0,0,0,0.15), 0 84px 50px rgba(0,0,0,0.1)",
      }}
      className="max-w-5xl mt-4 sm:mt-6 md:mt-8 mx-auto h-[25rem] sm:h-[30rem] md:h-[40rem] w-full border-4 border-slate-200 p-2 md:p-4 bg-white rounded-[20px] sm:rounded-[30px]"
    >
      <div className="h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-zinc-900 p-1 sm:p-2 md:p-3">
        {children}
      </div>
    </motion.div>
  )
}

interface ContainerScrollProps {
  titleComponent: React.ReactNode
  children: React.ReactNode
  className?: string
}

/**
 * ContainerScroll sets up a scroll container with perspective and provides
 * header and card animations based on scroll progress.
 */
export default function ContainerScroll({ 
  titleComponent, 
  children,
  className 
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)

  // Update breakpoint flag on resize
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Compute scale stops based on device width
  const scaleRange: [number, number] = isMobile ? [0.7, 0.9] : [1.05, 1]
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange)
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-[50rem] sm:h-[55rem] md:h-[70rem] flex items-center justify-center relative p-2 md:p-20",
        className
      )}
    >
      <div className="w-full relative py-6 sm:py-10 md:py-40" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotateX={rotateX} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

export { ContainerScroll }
