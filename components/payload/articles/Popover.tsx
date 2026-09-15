'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode, RefObject } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { cx } from './format.ts'

// Menus render in a portal with fixed positioning: the table lives inside a
// scroll container (sticky header) and a rounded card, both of which would
// clip an absolutely positioned popover.

type PopoverProps = {
  open: boolean
  anchorRef: RefObject<HTMLElement | null>
  onClose: () => void
  align?: 'start' | 'end'
  width?: number
  role?: 'menu' | 'dialog'
  label?: string
  className?: string
  children: ReactNode
}

export function Popover({ open, anchorRef, onClose, align = 'start', width, role = 'menu', label, className, children }: PopoverProps) {
  const popRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useLayoutEffect(() => {
    if (!open) {
      setPos(null)
      return
    }
    const place = () => {
      const anchor = anchorRef.current
      const pop = popRef.current
      if (!anchor || !pop) return
      const a = anchor.getBoundingClientRect()
      const pw = pop.offsetWidth
      const ph = pop.offsetHeight
      let left = align === 'end' ? a.right - pw : a.left
      left = Math.max(8, Math.min(left, window.innerWidth - pw - 8))
      let top = a.bottom + 6
      if (top + ph > window.innerHeight - 8 && a.top - ph - 6 >= 8) top = a.top - ph - 6
      setPos((p) => (p && p.top === top && p.left === left ? p : { top, left }))
    }
    place()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(place) : null
    if (popRef.current) ro?.observe(popRef.current)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open, align, anchorRef])

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node | null
      if (!t || popRef.current?.contains(t) || anchorRef.current?.contains(t)) return
      onCloseRef.current()
    }
    // Capture phase + stopPropagation: Esc closes the menu without also
    // clearing the selection / closing the quick peek underneath.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      onCloseRef.current()
      anchorRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointer, true)
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('pointerdown', onPointer, true)
      document.removeEventListener('keydown', onKey, true)
    }
  }, [open, anchorRef])

  useEffect(() => {
    if (!open) return
    const raf = requestAnimationFrame(() => {
      const root = popRef.current
      const target =
        root?.querySelector<HTMLElement>('[data-autofocus]') ?? root?.querySelector<HTMLElement>('[data-menuitem]:not([disabled])')
      target?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(raf)
  }, [open])

  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    const key = e.key
    if (key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Home' && key !== 'End') return
    if ((key === 'Home' || key === 'End') && (e.target as HTMLElement).tagName === 'INPUT') return
    const items = Array.from(popRef.current?.querySelectorAll<HTMLElement>('[data-menuitem]:not([disabled])') ?? [])
    if (!items.length) return
    e.preventDefault()
    const i = items.indexOf(document.activeElement as HTMLElement)
    let next = 0
    if (key === 'ArrowDown') next = i < 0 ? 0 : (i + 1) % items.length
    else if (key === 'ArrowUp') next = i < 0 ? items.length - 1 : (i - 1 + items.length) % items.length
    else if (key === 'End') next = items.length - 1
    items[next]?.focus()
  }

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      ref={popRef}
      role={role}
      aria-label={label}
      className={cx('ct-articles-layer', 'ct-articles-pop', className)}
      style={{ top: pos?.top ?? 0, left: pos?.left ?? 0, width, visibility: pos ? 'visible' : 'hidden' }}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>,
    document.body,
  )
}

type MenuItemProps = {
  children: ReactNode
  icon?: ReactNode
  hint?: ReactNode
  onSelect?: () => void
  danger?: boolean
  disabled?: boolean
  role?: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox'
  checked?: boolean
  /** Admin paths render a next/link (no prefetch); anything else a plain anchor. */
  href?: string
  newTab?: boolean
}

export function MenuItem({ children, icon, hint, onSelect, danger, disabled, role = 'menuitem', checked, href, newTab }: MenuItemProps) {
  const cls = cx('ct-articles-mi', danger && 'is-danger', checked && 'is-checked')
  const content = (
    <>
      {role === 'menuitemcheckbox' ? (
        <span className={cx('ct-articles-cb', 'is-static', checked && 'is-on')} aria-hidden />
      ) : icon ? (
        <span className="ct-articles-mi-ic" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="ct-articles-mi-t">{children}</span>
      {role === 'menuitemradio' && checked ? (
        <Check className="ct-articles-mi-check" size={14} aria-hidden />
      ) : hint ? (
        <span className="ct-articles-mi-hint">{hint}</span>
      ) : null}
    </>
  )

  if (href && !disabled) {
    if (href.startsWith('/admin') && !newTab) {
      return (
        <Link prefetch={false} href={href} className={cls} role={role} data-menuitem onClick={onSelect}>
          {content}
        </Link>
      )
    }
    return (
      <a
        href={href}
        className={cls}
        role={role}
        data-menuitem
        onClick={onSelect}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={cls}
      role={role}
      aria-checked={role === 'menuitem' ? undefined : Boolean(checked)}
      disabled={disabled}
      data-menuitem
      onClick={onSelect}
    >
      {content}
    </button>
  )
}

export function MenuSep() {
  return <div className="ct-articles-mi-sep" role="separator" />
}

export function MenuLabel({ children }: { children: ReactNode }) {
  return <div className="ct-articles-mi-h">{children}</div>
}
