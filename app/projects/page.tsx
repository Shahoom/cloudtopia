'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import {
  Sparkles,
  Globe,
  Database,
  Zap,
  Beaker,
  ArrowRight,
  TrendingUp,
  Award,
  Target,
  Play,
  ExternalLink,
  ChevronRight,
  Star,
  CheckCircle2,
  Rocket,
  X,
  Lightbulb,
  Wrench
} from 'lucide-react'
import TechCursor from '@/components/ui/tech-cursor'
import VaporizeTextCycle, { Tag } from '@/components/ui/vapour-text-effect'
import dynamic from 'next/dynamic'

const Particles = dynamic(() => import('@/components/ui/particles').then(mod => mod.Particles), { ssr: false })
const SparklesCore = dynamic(() => import('@/components/ui/sparkles').then(mod => mod.SparklesCore), { ssr: false })

type ProjectCategory = 'all' | 'digitalPresence' | 'businessSystems' | 'webApps' | 'labs'

interface Project {
  id: string
  category: string
  type: string
  featured: boolean
  title: string
  problem: string
  solution: string
  features: string[]
  image: string
  metrics: {
    label: string
    value: string
  }
  link?: string
}

// Magnetic Button Component
const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  const { x, y } = position

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

// Project Details Modal
const ProjectModal = ({
  project,
  isOpen,
  onClose,
  getCategoryIcon,
  getCategoryColor,
  t
}: {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  getCategoryIcon: (category: string) => React.ReactNode
  getCategoryColor: (category: string) => string
  t: any
}) => {
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

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-5 inset-y-[10vh] md:inset-10 lg:inset-20 bg-lavender rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 md:p-10 relative">
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-2 right-2 w-8 h-8 md:w-10 md:h-10 bg-lavender rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 transition-colors z-10"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
              {/* Type & Metric badges */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-wrap items-center gap-4 mb-4"
              >
                <div className="flex items-center gap-2 bg-lavender px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-primary-100">
                  <span className="text-primary-600">{getCategoryIcon(project.category)}</span>
                  <span className="text-xs md:text-sm font-semibold text-primary-700">
                    {project.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-lavender px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-emerald-100">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
                  <span className="text-xs md:text-sm text-neutral-500">{project.metrics.label}:</span>
                  <span className="text-xs md:text-sm font-bold text-emerald-600">{project.metrics.value}</span>
                </div>
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-4xl font-bold text-neutral-900 mb-6 pr-10"
              >
                {project.title}
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Challenge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-orange-50 to-orange-100/20 rounded-2xl p-6 border border-orange-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                      <img src="/icons/projects/challenge.png" alt="Challenge" width={40} height={40} className="w-10 h-10 object-contain" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">{t.projects.modal.challenge}</h3>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">{project.problem}</p>
                </motion.div>

                {/* Solution */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-emerald-50 to-emerald-100/20 rounded-2xl p-6 border border-emerald-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                      <img src="/icons/projects/solution.png" alt="Solution" width={40} height={40} className="w-10 h-10 object-contain" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">{t.projects.modal.solution}</h3>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">{project.solution}</p>
                </motion.div>
              </div>

              {/* Features */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-neutral-900 mb-4">{t.projects.modal.features}</h3>
                <div className="flex flex-wrap gap-3">
                  {project.features.map((feature, i) => (
                    <motion.span
                      key={feature}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100/20 text-primary-700 rounded-full font-medium text-sm border border-primary-100 hover:border-primary-200 transition-colors cursor-default"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Visit Project Button */}
              {project.link && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-primary-500/25 transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>{t.projects.modal.visitProject}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={onClose}
                    className="px-8 py-4 bg-lavender text-neutral-700 font-semibold rounded-2xl hover:bg-neutral-200 transition-colors"
                  >
                    {t.projects.modal.close}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Floating Card with 3D Effect
const FloatingProjectCard = ({ project, index, getCategoryIcon, getCategoryColor, t, isActive, onClick }: any) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    setRotateX(-mouseY / 20)
    setRotateY(mouseX / 20)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }
      } : {}}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="group cursor-pointer"
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative bg-lavender/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/50 shadow-xl hover:shadow-2xl transition-shadow duration-500"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-lavender/50 via-transparent to-lavender/50 pointer-events-none" />

        {/* Glow effect on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 0.5 : 0 }}
          className={`absolute -inset-4 bg-gradient-to-br ${getCategoryColor(project.category)} blur-3xl rounded-full -z-10`}
        />

        {/* Image/Gradient Header */}
        <div className={`relative h-56 bg-gradient-to-br ${getCategoryColor(project.category)} overflow-hidden`}>
          {/* Project Image (if available) */}
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          )}

          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`} />

          {/* Animated mesh gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />

          {/* Category icon badge */}
          <motion.div
            animate={{
              y: isHovered ? -5 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-4 right-4"
            style={{ transform: 'translateZ(50px)' }}
          >
            <div className="w-12 h-12 bg-lavender/90 backdrop-blur-xl rounded-xl shadow-xl flex items-center justify-center border border-white/50">
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                className="text-neutral-700"
              >
                {React.cloneElement(getCategoryIcon(project.category), { className: "w-6 h-6" })}
              </motion.div>
            </div>
          </motion.div>

          {/* Type badge */}
          <motion.div
            animate={{ y: isHovered ? -5 : 0 }}
            className="absolute top-5 left-5"
            style={{ transform: 'translateZ(30px)' }}
          >
            <div className="flex items-center gap-2 bg-lavender/90 backdrop-blur-xl px-4 py-2 rounded-full shadow-xl">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 animate-pulse" />
              <span className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                {project.type}
              </span>
            </div>
          </motion.div>

          {/* Metric badge */}
          <motion.div
            animate={{ y: isHovered ? -5 : 0, x: isHovered ? 5 : 0 }}
            transition={{ delay: 0.05 }}
            className="absolute top-5 right-5"
            style={{ transform: 'translateZ(40px)' }}
          >
            <div className="bg-lavender/90 backdrop-blur-xl px-4 py-2 rounded-full shadow-xl">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-lg font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  {project.metrics.value}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-7" style={{ transform: 'translateZ(20px)' }}>
          <motion.h3
            animate={{ color: isHovered ? '#0ea5e9' : '#171717' }}
            className="text-lg md:text-xl font-bold mb-3 leading-tight line-clamp-2"
          >
            {project.title}
          </motion.h3>

          <p className="text-sm text-neutral-600 mb-5 line-clamp-2 leading-relaxed">
            {project.solution}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.features.slice(0, 3).map((feature: string) => (
              <span
                key={feature}
                className="px-3 py-1 text-xs font-semibold bg-lavender text-primary-600 rounded-full"
              >
                {feature}
              </span>
            ))}
            {project.features.length > 3 && (
              <span className="px-3 py-1 text-xs font-semibold bg-lavender text-neutral-600 rounded-full">
                +{project.features.length - 3}
              </span>
            )}
          </div>

          {/* View button */}
          <div className="flex items-center justify-between">
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0.7, x: isHovered ? 5 : 0 }}
              className="flex items-center gap-2 text-sm font-semibold text-primary-600"
            >
              <span>{t.projects.card.viewDetails}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>

            {/* Live link for real projects */}
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                animate={{ opacity: isHovered ? 1 : 0.5 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Live</span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Animated Counter
const AnimatedCounter = ({ value, suffix = '', prefix = '' }: { value: string, suffix?: string, prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const numValue = parseInt(value.replace(/[^0-9]/g, ''))

  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView && numValue) {
      let start = 0
      const duration = 2000
      const increment = numValue / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= numValue) {
          setCount(numValue)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, numValue])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

export default function ProjectsPage() {
  const { t, locale } = useLanguage()
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Smooth scroll progress for Apple-like parallax
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Use state for parallax values to disable them on mobile
  const [useParallax, setUseParallax] = useState(false)

  useEffect(() => {
    setUseParallax(window.innerWidth >= 768)
  }, [isMobile])

  // Parallax transforms for background elements
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, useParallax ? -300 : 0])
  const orbScale = useTransform(smoothProgress, [0, 0.3], [1, useParallax ? 1.5 : 1])
  const orbOpacity = useTransform(smoothProgress, [0, 0.3], [0.2, useParallax ? 0 : 0.2])

  // Parallax transforms moved to top level to avoid hook violations
  const featuredParallax1 = useTransform(smoothProgress, [0.1, 0.5], [0, -100])
  const featuredParallax2 = useTransform(smoothProgress, [0.1, 0.5], [0, -80])
  const featuredParallax3 = useTransform(smoothProgress, [0.2, 0.6], [0, -60])
  const footerParallax = useTransform(smoothProgress, [0.5, 0.8], [100, -100])
  const gradientParallax = useTransform(smoothProgress, [0.3, 0.6], [50, -50])
  const orbScaleParallax = useTransform(smoothProgress, [0.5, 0.7], [0.8, 1.2])

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const projects = t.projects.projectCards as Project[]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  const featuredProjects = projects.filter(p => p.featured)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'digitalPresence': return <Globe className="w-5 h-5" />
      case 'businessSystems': return <Database className="w-5 h-5" />
      case 'webApps': return <Zap className="w-5 h-5" />
      case 'labs': return <Beaker className="w-5 h-5" />
      default: return <Sparkles className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'digitalPresence': return 'from-blue-500 via-cyan-500 to-blue-600'
      case 'businessSystems': return 'from-indigo-500 via-purple-500 to-indigo-600'
      case 'webApps': return 'from-violet-500 via-pink-500 to-violet-600'
      case 'labs': return 'from-emerald-500 via-teal-500 to-emerald-600'
      default: return 'from-blue-500 to-indigo-600'
    }
  }

  return (
    <>
      {/* Tech Cursor Effect - Only on Desktop */}
      {!isMobile && <TechCursor />}

      {/* HERO SECTION */}
      <section
        className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950"
      >
        {/* Animated background grid with parallax */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        />

        {/* Gradient orbs with scroll animations */}
        <motion.div
          style={{ scale: orbScale, opacity: orbOpacity }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-lavender/20 rounded-full blur-[150px]"
        />
        <motion.div
          style={{ scale: orbScale, opacity: orbOpacity }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-lavender/20 rounded-full blur-[150px]"
        />

        {/* Particles */}
        <Particles
          className="absolute inset-0 opacity-50"
          quantity={isMobile ? 20 : 80}
          ease={100}
          color="#ffffff"
          refresh
          size={0.5}
          staticity={30}
        />

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-3 bg-lavender/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full mb-8"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-white/80">{t.projects.hero.badge}</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
              >
                {t.projects.hero.title}
                <br />
                <span className="relative">
                  <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-primary-400 to-secondary-400 opacity-50" />
                  <span className="relative bg-gradient-to-r from-primary-400 via-secondary-400 to-purple-400 bg-clip-text text-transparent">
                    {t.projects.hero.titleHighlight}
                  </span>
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-2xl mx-auto"
              >
                {t.projects.hero.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <MagneticButton
                  onClick={() => router.push(`/${locale}/contact`)}
                  className="group relative px-8 py-4 bg-lavender text-neutral-900 font-bold rounded-2xl overflow-hidden shadow-2xl hover:shadow-white/25 transition-shadow"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t.projects.cta.primaryButton}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </MagneticButton>

                <MagneticButton
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-8 py-4 bg-lavender/5 backdrop-blur-xl text-white font-semibold rounded-2xl border border-white/10 hover:bg-lavender/10 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    {t.projects.hero.viewProjects}
                  </span>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* FEATURED PROJECTS - Apple-like reveal */}
      <section id="projects" className="pt-16 pb-32 relative overflow-hidden bg-gradient-to-b from-lavender via-lavender to-lavender">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

        {/* Interactive Particles */}
        <Particles
          className="absolute inset-0"
          quantity={isMobile ? 20 : 80}
          ease={80}
          color="#000000"
          refresh
          size={0.5}
          staticity={50}
        />

        {/* Gradient orbs with parallax */}
        {useParallax && (
          <>
            <motion.div
              style={{ y: featuredParallax1 }}
              className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-neutral-200/50 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
              style={{ y: featuredParallax2 }}
              className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-neutral-300/40 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
              style={{ y: featuredParallax3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-neutral-200/30 to-transparent rounded-full blur-[80px] pointer-events-none"
            />
          </>
        )}

        {/* Subtle noise texture */}
        {!isMobile && <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />}

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          {/* Section Header with Vaporize Effect */}
          <div className="text-center mb-16">
            {/* Vaporize Text Title */}
            <div className="h-[80px] md:h-[100px] mb-4">
              <VaporizeTextCycle
                texts={[
                  t.projects.featured.title,
                  t.projects.featured.titleHighlight
                ]}
                font={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: isMobile ? "28px" : "56px",
                  fontWeight: 700
                }}
                color="rgb(23, 23, 23)"
                spread={3}
                density={6}
                animation={{
                  vaporizeDuration: 1.2,
                  fadeInDuration: 0.5,
                  waitDuration: 1.5
                }}
                direction="left-to-right"
                alignment="center"
                tag={Tag.H2}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-lg text-neutral-600 max-w-2xl mx-auto"
            >
              {t.projects.featured.description}
            </motion.p>
          </div>

          {/* Featured Cards - Staggered reveal */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <FloatingProjectCard
                key={project.id}
                project={project}
                index={index}
                getCategoryIcon={getCategoryIcon}
                getCategoryColor={getCategoryColor}
                t={t}
                isActive={hoveredProject === project.id}
                onClick={() => openProjectModal(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ALL PROJECTS WITH FILTERS - Smooth Apple-like transitions */}
      <section className="py-32 bg-lavender relative overflow-hidden">
        {/* Subtle animated gradient */}
        <motion.div
          style={{ y: gradientParallax }}
          className="absolute inset-0 bg-gradient-to-b from-lavender via-lavender to-lavender"
        />

        <div className="container max-w-7xl mx-auto px-4 relative">
          {/* Filter Pills - Smooth reveal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {(['all', 'digitalPresence', 'businessSystems', 'webApps', 'labs'] as ProjectCategory[]).map((filter, i) => (
              <motion.button
                key={filter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0, 1] }}
                viewport={{ once: true }}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative px-6 py-3 rounded-full font-semibold transition-all duration-500
                  ${activeFilter === filter
                    ? 'bg-neutral-900 text-white shadow-xl shadow-neutral-900/20'
                    : 'bg-lavender text-neutral-600 hover:bg-lavender shadow-md hover:shadow-lg'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  {filter !== 'all' && getCategoryIcon(filter)}
                  {t.projects.filters[filter]}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid - Smooth layout animations */}
          <motion.div
            layout={!isMobile}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            transition={{ layout: { duration: 0.6, ease: [0.25, 0.1, 0, 1] } }}
          >
            <AnimatePresence mode={isMobile ? "sync" : "popLayout"}>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout={!isMobile}
                  initial={{ opacity: 0, y: isMobile ? 10 : 30, scale: isMobile ? 1 : 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.03,
                    ease: [0.25, 0.1, 0, 1],
                    layout: { duration: 0.5, ease: [0.25, 0.1, 0, 1] }
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  onClick={() => openProjectModal(project)}
                  className="group bg-lavender rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-neutral-100 cursor-pointer"
                >
                  <div className={`h-32 bg-gradient-to-br ${getCategoryColor(project.category)} relative overflow-hidden`}>
                    {/* Project Image */}
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 right-2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 bg-lavender/90 rounded-lg flex items-center justify-center shadow-lg"
                      >
                        {getCategoryIcon(project.category)}
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {project.solution}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500">{project.metrics.label}</span>
                      <span className="text-lg font-bold text-emerald-600">{project.metrics.value}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LABS SECTION - Cinematic reveal */}
      <section className="py-32 bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 relative overflow-hidden">
        {/* Animated background with parallax */}
        <motion.div
          style={{ y: useParallax ? footerParallax : 0 }}
          className="absolute inset-0"
        >
          <SparklesCore
            id="labs-sparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={isMobile ? 5 : 30}
            className="w-full h-full"
            particleColor="#ffffff"
            speed={0.5}
          />
        </motion.div>

        {/* Gradient orbs */}
        <motion.div
          style={{ scale: orbScaleParallax }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-lavender/20 rounded-full blur-[150px]"
        />

        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="inline-flex items-center gap-2 bg-lavender/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full mb-8"
            >
              <Beaker className="w-5 h-5 text-purple-300" />
              <span className="font-semibold text-white">{t.projects.labsSection.badge}</span>
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.1, 0, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            {t.projects.labsSection.title}{' '}
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              {t.projects.labsSection.titleHighlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl text-white/70 mb-10 max-w-2xl mx-auto"
          >
            {t.projects.labsSection.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <MagneticButton
              onClick={() => router.push(`/${locale}/labs`)}
              className="group px-8 py-4 bg-lavender text-purple-900 font-bold rounded-2xl shadow-2xl hover:shadow-white/25 transition-all"
            >
              <span className="flex items-center gap-2">
                {t.projects.labsSection.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </section>


      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
        getCategoryIcon={getCategoryIcon}
        getCategoryColor={getCategoryColor}
        t={t}
      />
    </>
  )
}
