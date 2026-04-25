import { Info, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react'

// Public tones — `warning` is an alias of `warn`, `note` aliases `info`,
// and unknown tones fall back to `info` so authors can never crash a post.
type Tone =
    | 'info'
    | 'note'
    | 'tip'
    | 'warn'
    | 'warning'
    | 'success'

type MDXCalloutProps = {
    tone?: string
    title?: string
    children: React.ReactNode
}

type ToneStyle = {
    bg: string
    border: string
    icon: typeof Info
    iconClass: string
    titleClass: string
}

const TONES: Record<Tone, ToneStyle> = {
    info: { bg: 'bg-primary-50/60', border: 'border-primary-200', icon: Info, iconClass: 'text-primary-600', titleClass: 'text-primary-900' },
    note: { bg: 'bg-primary-50/60', border: 'border-primary-200', icon: Info, iconClass: 'text-primary-600', titleClass: 'text-primary-900' },
    tip: { bg: 'bg-amber-50/60', border: 'border-amber-200', icon: Lightbulb, iconClass: 'text-amber-600', titleClass: 'text-amber-900' },
    warn: { bg: 'bg-rose-50/60', border: 'border-rose-200', icon: AlertTriangle, iconClass: 'text-rose-600', titleClass: 'text-rose-900' },
    warning: { bg: 'bg-rose-50/60', border: 'border-rose-200', icon: AlertTriangle, iconClass: 'text-rose-600', titleClass: 'text-rose-900' },
    success: { bg: 'bg-emerald-50/60', border: 'border-emerald-200', icon: CheckCircle2, iconClass: 'text-emerald-600', titleClass: 'text-emerald-900' },
}

export default function MDXCallout({ tone = 'info', title, children }: MDXCalloutProps) {
    // Defensive lookup: unknown / typo'd tones (e.g. "warining", "info1") fall back
    // to `info` instead of crashing the page render.
    const t = TONES[tone as Tone] ?? TONES.info
    const Icon = t.icon
    return (
        <aside className={`not-prose my-8 rounded-2xl border ${t.border} ${t.bg} p-5 md:p-6 flex gap-4`}>
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${t.iconClass}`} strokeWidth={2} />
            <div className="flex-1">
                {title && <div className={`font-bold mb-2 ${t.titleClass}`}>{title}</div>}
                <div className="text-neutral-800 leading-relaxed text-sm md:text-base [&>p]:mb-2 [&>p:last-child]:mb-0">
                    {children}
                </div>
            </div>
        </aside>
    )
}
