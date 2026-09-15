'use client'

import { useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { AlertTriangle, CheckCircle2, ImageOff, Loader2, Trash2, X } from 'lucide-react'
import type { ArticleRow, Locale, PairInfo, PairSide, Status } from './types.ts'
import { STATUS_LABELS, STATUS_TONE } from './types.ts'
import { avatarTone, categoryColor, cx, fmtFull, initials, localeName, SEO_COLORS, seoBand } from './format.ts'

type BtnMod = 'primary' | 'ghost' | 'danger' | 'sm' | 'xs' | 'icon' | 'grow'

export function btn(...mods: BtnMod[]): string {
  return cx('ct-articles-btn', ...mods.map((m) => `is-${m}`))
}

export function Spinner({ size = 14 }: { size?: number }) {
  return <Loader2 className="ct-articles-spin" size={size} aria-hidden />
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="ct-articles-kbd">{children}</kbd>
}

export type CheckState = 'on' | 'off' | 'mixed'

export function Checkbox({
  state,
  onToggle,
  label,
}: {
  state: CheckState
  onToggle: (e: MouseEvent<HTMLButtonElement>) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={state === 'mixed' ? 'mixed' : state === 'on'}
      aria-label={label}
      className={cx('ct-articles-cb', state === 'on' && 'is-on', state === 'mixed' && 'is-mixed')}
      onClick={(e) => {
        e.stopPropagation()
        onToggle(e)
      }}
    />
  )
}

export function SeoRing({ value, size = 28, showValue = true }: { value: number; size?: number; showValue?: boolean }) {
  const v = Math.max(0, Math.min(100, Math.round(value)))
  const stroke = size >= 28 ? 3 : 2.5
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const mid = size / 2
  return (
    <span className="ct-articles-ring" style={{ width: size, height: size }} role="img" aria-label={`SEO score ${v} of 100`} title={`SEO score ${v}/100`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle cx={mid} cy={mid} r={r} fill="none" stroke="#eceef1" strokeWidth={stroke} />
        {v > 0 && (
          <circle
            cx={mid}
            cy={mid}
            r={r}
            fill="none"
            stroke={SEO_COLORS[seoBand(v)]}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - v / 100)}
            transform={`rotate(-90 ${mid} ${mid})`}
          />
        )}
      </svg>
      {showValue && <span className="ct-articles-ring-v">{v}</span>}
    </span>
  )
}

export function StatusPill({ status, scheduledAt, label, small }: { status: Status; scheduledAt?: string | null; label?: string; small?: boolean }) {
  const title =
    status === 'scheduled' ? (scheduledAt ? `Scheduled for ${fmtFull(scheduledAt)}` : 'Scheduled, but no "Scheduled at" date is set') : undefined
  return (
    <span className={cx('ct-articles-pill', `is-${STATUS_TONE[status]}`, small && 'is-sm')} title={title}>
      <span className="ct-articles-pill-d" aria-hidden />
      {label ?? STATUS_LABELS[status]}
    </span>
  )
}

function LocalePill({ locale, side }: { locale: Locale; side: PairSide }) {
  const code = locale.toUpperCase()
  const name = localeName(locale)
  switch (side.kind) {
    case 'self':
      return (
        <span className="ct-articles-loc is-self" title={`This row is the ${name} version`}>
          {code}
        </span>
      )
    case 'sibling': {
      const live = side.doc.status === 'published'
      return (
        <span className={cx('ct-articles-loc', live ? 'is-ok' : 'is-exists')} title={`${name} version · ${STATUS_LABELS[side.doc.status]}`}>
          {code}
        </span>
      )
    }
    case 'missing':
      return (
        <span className="ct-articles-miss" title={`No ${name} version yet`}>
          <AlertTriangle size={10} aria-hidden />
          {code} missing
        </span>
      )
    case 'trashed':
      return (
        <span className="ct-articles-miss" title={`The ${name} version is in trash`}>
          <Trash2 size={10} aria-hidden />
          {code} in trash
        </span>
      )
    default:
      return (
        <span className="ct-articles-loc is-unknown" aria-hidden>
          {code}
        </span>
      )
  }
}

export function LocalePills({ pair }: { pair: PairInfo }) {
  return (
    <span className="ct-articles-locs">
      <LocalePill locale="en" side={pair.en} />
      <LocalePill locale="ar" side={pair.ar} />
    </span>
  )
}

export function CategoryPill({ category }: { category: ArticleRow['category'] }) {
  if (!category) return <span className="ct-articles-none">No category</span>
  return (
    <span className="ct-articles-cat" title={category.name}>
      <i style={{ background: categoryColor(category.slug || category.id) }} aria-hidden />
      <span className="ct-articles-trunc">{category.name}</span>
    </span>
  )
}

export function Avatar({ id, name, src, size = 24 }: { id: string; name: string; src?: string | null; size?: number }) {
  const [failed, setFailed] = useState<string | null>(null)
  const showImg = Boolean(src) && failed !== src
  return (
    <span
      className={cx('ct-articles-av', `ct-articles-av-${avatarTone(id || name)}`)}
      style={{ width: size, height: size, fontSize: size <= 20 ? 8.5 : size >= 32 ? 11.5 : 9.5 }}
      title={name}
      role="img"
      aria-label={name}
    >
      {showImg ? <img src={src ?? undefined} alt="" loading="lazy" onError={() => setFailed(src ?? null)} /> : initials(name)}
    </span>
  )
}

export function Thumb({ src, alt = '', className }: { src: string | null; alt?: string; className?: string }) {
  const [failed, setFailed] = useState<string | null>(null)
  const broken = !src || failed === src
  return (
    <span className={cx('ct-articles-th', broken && 'is-empty', className)}>
      {broken ? (
        <ImageOff size={14} aria-hidden />
      ) : (
        <img src={src ?? undefined} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(src)} />
      )}
    </span>
  )
}

export function EmptyState({
  icon,
  title,
  children,
  actions,
  tone = 'default',
}: {
  icon: ReactNode
  title: string
  children?: ReactNode
  actions?: ReactNode
  tone?: 'default' | 'error'
}) {
  return (
    <div className={cx('ct-articles-empty', tone === 'error' && 'is-error')} role={tone === 'error' ? 'alert' : undefined}>
      <span className="ct-articles-empty-ic" aria-hidden>
        {icon}
      </span>
      <div className="ct-articles-empty-t">{title}</div>
      {children && <div className="ct-articles-empty-d">{children}</div>}
      {actions && <div className="ct-articles-empty-a">{actions}</div>}
    </div>
  )
}

export type ToastData = {
  id: number
  message: string
  tone?: 'default' | 'error'
  action?: { label: string; onClick?: () => void; href?: string }
}

export function ToastView({ toast, onDismiss }: { toast: ToastData | null; onDismiss: () => void }) {
  if (!toast || typeof document === 'undefined') return null
  const { action } = toast
  return createPortal(
    <div className="ct-articles-layer ct-articles-toast-wrap" role="status" aria-live="polite">
      <div key={toast.id} className={cx('ct-articles-toast', toast.tone === 'error' && 'is-error')}>
        {toast.tone === 'error' ? <AlertTriangle size={15} aria-hidden /> : <CheckCircle2 size={15} aria-hidden />}
        <span className="ct-articles-toast-m">{toast.message}</span>
        {action?.href ? (
          <Link prefetch={false} href={action.href} className="ct-articles-toast-a" onClick={onDismiss}>
            {action.label}
          </Link>
        ) : action ? (
          <button
            type="button"
            className="ct-articles-toast-a"
            onClick={() => {
              action.onClick?.()
              onDismiss()
            }}
          >
            {action.label}
          </button>
        ) : null}
        <button type="button" className="ct-articles-toast-x" aria-label="Dismiss notification" onClick={onDismiss}>
          <X size={14} aria-hidden />
        </button>
      </div>
    </div>,
    document.body,
  )
}
