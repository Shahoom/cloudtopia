'use client'

import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Layers, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const STYLE_ID = 'hero3-animations'

export type HeroModernMetric = {
  label: string
  value: string
}

export type HeroModernMode = {
  label: string
  title: string
  description: string
  items: string[]
}

export type HeroModernProtocol = {
  name: string
  detail: string
  status: string
}

export type HeroModernImage = {
  src: string
  alt: string
  caption?: string
  captionRight?: string
}

export type HeroOrbitDeckProps = {
  eyebrow: string
  title: string
  description: string
  image: HeroModernImage
  metrics: HeroModernMetric[]
  modes: HeroModernMode[]
  protocols: HeroModernProtocol[]
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  visualCaption?: string
  visualCaptionRight?: string
  controlStackTitle?: string
  controlStackDescription?: string
  controlStackItems?: string[]
  protocolsTitle?: string
  protocolsBadge?: string
  dir?: 'ltr' | 'rtl'
  className?: string
}

type HeroModernLegacyProps = {
  badge?: string
  title?: string
  description?: string
  metrics?: Array<HeroModernMetric | string>
  modes?: Record<string, Partial<HeroModernMode> & { items?: string[]; points?: string[] }> | HeroModernMode[]
  controlStackTitle?: string
  controlStackDescription?: string
  controlStackItems?: string[]
  protocolsTitle?: string
  protocols?: Array<Partial<HeroModernProtocol> | string>
  showcaseImage?: HeroModernImage
  isRTL?: boolean
  modeLabels?: Record<string, string>
  controlStackBadge?: string
  protocolsBadge?: string
  labelAvailable?: string
  labelCustomSolutions?: string
  labelApproach?: string
  showThemeToggle?: boolean
}

const DeckGlyph = () => (
  <svg viewBox="0 0 120 120" className="h-16 w-16" aria-hidden="true">
    <circle
      cx="60"
      cy="60"
      r="46"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className="motion-safe:animate-[hero3-orbit_8.5s_linear_infinite] motion-reduce:animate-none"
      style={{ strokeDasharray: '18 14' }}
    />
    <rect
      x="34"
      y="34"
      width="52"
      height="52"
      rx="14"
      fill="rgba(255,255,255,0.08)"
      stroke="currentColor"
      strokeWidth="1.2"
      className="motion-safe:animate-[hero3-grid_5.4s_ease-in-out_infinite] motion-reduce:animate-none"
    />
    <circle cx="60" cy="60" r="7" fill="currentColor" />
    <path
      d="M60 30v10M60 80v10M30 60h10M80 60h10"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className="motion-safe:animate-[hero3-pulse_6s_ease-in-out_infinite] motion-reduce:animate-none"
    />
  </svg>
)

function installAnimations() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.innerHTML = `
    @keyframes hero3-intro {
      0% { opacity: 0; transform: translate3d(0, 44px, 0) scale(0.98); filter: blur(10px); }
      60% { filter: blur(0); }
      100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0); }
    }
    @keyframes hero3-card {
      0% { opacity: 0; transform: translate3d(0, 26px, 0) scale(0.96); }
      100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
    }
    @keyframes hero3-orbit {
      0% { stroke-dashoffset: 0; transform: rotate(0deg); transform-origin: center; }
      100% { stroke-dashoffset: -64; transform: rotate(360deg); transform-origin: center; }
    }
    @keyframes hero3-grid {
      0%, 100% { transform: rotate(-2deg); transform-origin: center; opacity: 0.7; }
      50% { transform: rotate(2deg); transform-origin: center; opacity: 1; }
    }
    @keyframes hero3-pulse {
      0%, 100% { stroke-dasharray: 0 200; opacity: 0.2; }
      45%, 60% { stroke-dasharray: 200 0; opacity: 1; }
    }
    @keyframes hero3-glow {
      0%, 100% { opacity: 0.45; transform: translate3d(0,0,0); }
      50% { opacity: 0.9; transform: translate3d(0,-8px,0); }
    }
  `
  document.head.appendChild(style)
}

export default function HeroOrbitDeck({
  eyebrow,
  title,
  description,
  image,
  metrics,
  modes,
  protocols,
  primaryCta,
  secondaryCta,
  visualCaption,
  visualCaptionRight,
  controlStackTitle = 'Control stack',
  controlStackDescription = 'Each page uses its own service or industry context, proof points, and visual evidence so the hero feels specific instead of cloned.',
  controlStackItems = [],
  protocolsTitle = 'Launch protocols',
  protocolsBadge = 'Indexed',
  dir = 'ltr',
  className,
}: HeroOrbitDeckProps) {
  const [visible, setVisible] = useState(false)
  const [modeIndex, setModeIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isRTL = dir === 'rtl'

  useEffect(() => {
    installAnimations()
  }, [])

  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const node = sectionRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.16 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const activeMode = modes[modeIndex] || modes[0]
  const showcaseImage = image
  const safeMetrics = metrics.slice(0, 3)

  const background = useMemo(
    () => ({
      layers: [
        'radial-gradient(ellipse 80% 60% at 10% -10%, rgba(255,255,255,0.16), transparent 60%)',
        'radial-gradient(ellipse 90% 70% at 90% -20%, rgba(14,165,233,0.13), transparent 70%)',
        'radial-gradient(ellipse 70% 55% at 50% 100%, rgba(216,180,254,0.13), transparent 68%)',
      ].join(', '),
      dots: 'radial-gradient(circle at 25% 25%, rgba(250,250,250,0.09) 0.7px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(250,250,250,0.08) 0.7px, transparent 1px)',
    }),
    [],
  )

  const setSpotlight = (event: MouseEvent<HTMLElement>) => {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    target.style.setProperty('--hero3-x', `${event.clientX - rect.left}px`)
    target.style.setProperty('--hero3-y', `${event.clientY - rect.top}px`)
  }

  const clearSpotlight = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty('--hero3-x')
    event.currentTarget.style.removeProperty('--hero3-y')
  }

  return (
    <section
      ref={sectionRef}
      className={cn('relative isolate overflow-hidden bg-eerie text-white', className)}
      data-header-theme="dark"
      dir={dir}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-30"
        style={{ backgroundColor: '#1B1B23', backgroundImage: background.layers, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-70" style={{ backgroundImage: background.dots, backgroundSize: '12px 12px' }} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_10%,rgba(255,255,255,0.16),transparent_70%)] blur-[22px]" />

      <div
        className={cn(
          'mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col gap-12 px-4 pb-16 pt-32 transition-opacity duration-700 sm:px-6 lg:px-8 lg:pt-36',
          visible ? 'motion-safe:animate-[hero3-intro_1s_cubic-bezier(.22,.68,0,1)_forwards]' : 'opacity-0',
        )}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end">
          <div className="min-w-0">
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white/82">
                <Sparkles className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                {eyebrow}
              </span>
            </div>
            <h1 className="max-w-5xl text-4xl font-black leading-[1.04] tracking-normal text-white text-balance md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-white/70 md:text-xl">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {primaryCta && (
                  <Link href={primaryCta.href} className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-4 text-sm font-black text-eerie transition-colors hover:bg-cyan-100">
                    {primaryCta.label}
                    <ArrowRight className={cn('h-4 w-4', isRTL && 'rotate-180')} aria-hidden="true" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.href} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-4 text-sm font-black text-white transition-colors hover:border-cyan-200 hover:bg-white/10">
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="relative overflow-hidden rounded-lg border border-white/12 bg-white/[0.06] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{activeMode?.label}</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-white">{activeMode?.title}</h2>
              </div>
              <div className="text-white/82">
                <DeckGlyph />
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/66">{activeMode?.description}</p>
            <div className="mt-5 flex gap-2">
              {modes.map((mode, index) => (
                <button
                  key={mode.label}
                  type="button"
                  onClick={() => setModeIndex(index)}
                  className={cn(
                    'min-w-0 flex-1 rounded-md border px-3 py-2 text-xs font-black uppercase tracking-[0.18em] transition-colors',
                    modeIndex === index ? 'border-white bg-white text-eerie' : 'border-white/12 bg-white/8 text-white/72 hover:bg-white/12 hover:text-white',
                  )}
                >
                  {mode.label}
                </button>
              ))}
            </div>
            <ul className="mt-5 grid gap-2">
              {(activeMode?.items || []).slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-white/72">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.18fr)_minmax(0,0.82fr)] xl:items-stretch">
          <div className="order-2 flex flex-col justify-between rounded-lg border border-white/12 bg-white/[0.06] p-6 xl:order-1">
            <div>
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-xs font-black uppercase tracking-[0.24em] text-white/80">{controlStackTitle}</h3>
                <Layers className="h-5 w-5 text-cyan-200" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold leading-7 text-white/62">
                {controlStackDescription}
              </p>
            </div>
            <div className="mt-8 grid gap-3">
              {controlStackItems.slice(0, 3).map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm font-black leading-6 text-white/72">
                  {item}
                </div>
              ))}
              {safeMetrics.map((metric) => (
                <div key={metric.label} className="rounded-md border border-white/10 bg-white/8 px-4 py-3">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/45">{metric.label}</p>
                  <p className="mt-1 text-2xl font-black text-white">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <figure className="order-1 overflow-hidden rounded-lg border border-white/12 bg-black/20 xl:order-2">
            <div className="relative aspect-[1.05/1] min-h-[24rem]">
              <Image
                src={showcaseImage.src}
                alt={showcaseImage.alt}
                fill
                priority
                sizes="(min-width: 1280px) 44vw, (min-width: 768px) 90vw, 100vw"
                className="object-cover grayscale-[0.12] transition duration-700 ease-out hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55 mix-blend-multiply" />
              <span className="pointer-events-none absolute -left-16 top-16 h-40 w-40 rounded-full border border-white/15 opacity-70 motion-safe:animate-[hero3-glow_9s_ease-in-out_infinite]" />
            </div>
            <figcaption className="flex items-center justify-between gap-4 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-white/56">
              <span>{visualCaption || eyebrow}</span>
              <span className="hidden items-center gap-2 sm:flex">
                <span className="h-px w-8 bg-current" />
                {visualCaptionRight || showcaseImage.captionRight || 'Tailored visual'}
              </span>
            </figcaption>
          </figure>

          <aside className="order-3 flex flex-col gap-4 rounded-lg border border-white/12 bg-white/[0.06] p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xs font-black uppercase tracking-[0.24em] text-white/80">{protocolsTitle}</h3>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40">{protocolsBadge}</span>
            </div>
            <ul className="space-y-3">
              {protocols.slice(0, 4).map((protocol, index) => (
                <li
                  key={protocol.name}
                  onMouseMove={setSpotlight}
                  onMouseLeave={clearSpotlight}
                  className="group relative overflow-hidden rounded-md border border-white/10 bg-white/7 px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(190px circle at var(--hero3-x, 50%) var(--hero3-y, 50%), rgba(255,255,255,0.16), transparent 72%)' }}
                  />
                  <div className="relative flex items-center justify-between gap-3">
                    <h4 className="text-sm font-black uppercase tracking-[0.16em] text-white">{protocol.name}</h4>
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-200/80">{protocol.status}</span>
                  </div>
                  <p className="relative mt-3 text-sm font-semibold leading-6 text-white/60">{protocol.detail}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

function normalizeMetrics(metrics: HeroModernLegacyProps['metrics'], labelAvailable?: string, labelCustomSolutions?: string): HeroModernMetric[] {
  const fallback = [
    { label: labelAvailable || 'Available', value: 'Now' },
    { label: labelCustomSolutions || 'Custom solutions', value: '100%' },
    { label: 'Ownership', value: 'Full' },
  ]

  if (!metrics?.length) return fallback

  return metrics.slice(0, 3).map((metric, index) => {
    if (typeof metric === 'string') return { label: fallback[index]?.label || `Metric ${index + 1}`, value: metric }
    return {
      label: metric.label || fallback[index]?.label || `Metric ${index + 1}`,
      value: metric.value || fallback[index]?.value || 'Ready',
    }
  })
}

function normalizeModes(
  modes: HeroModernLegacyProps['modes'],
  modeLabels: HeroModernLegacyProps['modeLabels'],
  labelApproach?: string,
): HeroModernMode[] {
  if (Array.isArray(modes) && modes.length > 0) {
    return modes.map((mode, index) => ({
      label: mode.label || Object.values(modeLabels || {})[index] || `${labelApproach || 'Mode'} ${index + 1}`,
      title: mode.title || `${labelApproach || 'Approach'} ${index + 1}`,
      description: mode.description || '',
      items: mode.items || [],
    }))
  }

  if (modes && typeof modes === 'object') {
    const entries = Object.entries(modes)
    if (entries.length > 0) {
      return entries.map(([key, mode]) => ({
        label: modeLabels?.[key] || mode.label || key,
        title: mode.title || modeLabels?.[key] || key,
        description: mode.description || '',
        items: mode.items || mode.points || [],
      }))
    }
  }

  return [
    {
      label: modeLabels?.strategy || 'Strategy',
      title: labelApproach || 'Structured approach',
      description: 'Clarify the scope, map the operating workflow, and define the build path before production starts.',
      items: ['Scope discovery', 'Workflow mapping', 'Launch priorities'],
    },
    {
      label: modeLabels?.execution || 'Execution',
      title: 'Delivery loop',
      description: 'Build in focused phases with review gates, QA, documentation, and ownership handoff.',
      items: ['Phased production', 'Quality reviews', 'Handoff support'],
    },
  ]
}

function normalizeProtocols(protocols: HeroModernLegacyProps['protocols']): HeroModernProtocol[] {
  if (!protocols?.length) {
    return [
      { name: 'Discovery', detail: 'Audit needs, define scope, and align priorities.', status: 'Ready' },
      { name: 'Build', detail: 'Design, develop, integrate, and review in focused phases.', status: 'Active' },
      { name: 'Launch', detail: 'QA, publish, document, and hand over ownership.', status: 'Handoff' },
    ]
  }

  return protocols.slice(0, 4).map((protocol, index) => {
    if (typeof protocol === 'string') {
      return { name: protocol, detail: 'Defined as part of the delivery workflow.', status: String(index + 1).padStart(2, '0') }
    }

    const raw = protocol as Partial<HeroModernProtocol> & { title?: string; description?: string; label?: string }
    return {
      name: raw.name || raw.title || raw.label || `Step ${index + 1}`,
      detail: raw.detail || raw.description || 'Defined as part of the delivery workflow.',
      status: raw.status || String(index + 1).padStart(2, '0'),
    }
  })
}

function HeroModern({
  badge = 'CloudTopia deck',
  title = 'Modern digital delivery, built around your operating model.',
  description = 'A focused hero for service and industry pages with tailored imagery, decision points, and delivery proof.',
  metrics,
  modes,
  controlStackTitle,
  controlStackDescription,
  controlStackItems,
  protocolsTitle,
  protocols,
  showcaseImage,
  isRTL = false,
  modeLabels,
  protocolsBadge,
  labelAvailable,
  labelCustomSolutions,
  labelApproach,
}: HeroModernLegacyProps) {
  return (
    <HeroOrbitDeck
      eyebrow={badge}
      title={title}
      description={description}
      image={{
        src: showcaseImage?.src || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
        alt: showcaseImage?.alt || title,
        caption: showcaseImage?.caption,
        captionRight: showcaseImage?.captionRight,
      }}
      metrics={normalizeMetrics(metrics, labelAvailable, labelCustomSolutions)}
      modes={normalizeModes(modes, modeLabels, labelApproach)}
      protocols={normalizeProtocols(protocols)}
      visualCaption={showcaseImage?.caption || badge}
      visualCaptionRight={showcaseImage?.captionRight}
      controlStackTitle={controlStackTitle}
      controlStackDescription={controlStackDescription}
      controlStackItems={controlStackItems}
      protocolsTitle={protocolsTitle}
      protocolsBadge={protocolsBadge}
      dir={isRTL ? 'rtl' : 'ltr'}
    />
  )
}

export { HeroOrbitDeck, HeroModern }
