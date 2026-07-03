'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Floating WhatsApp button — present on every frontend page.
 *  - Draggable by touch or mouse (pointer events + touch-action:none so a drag
 *    never scrolls the page). Position is clamped to the viewport and remembered
 *    across visits (localStorage).
 *  - A genuine tap/click opens WhatsApp; a drag does not (movement threshold).
 *  - `href` is the regionally-correct wa.me link, resolved server-side from the
 *    visitor's country (GCC → Oman number, elsewhere → Türkiye number).
 */
export function FloatingWhatsApp({ href, locale }: { href: string; locale: string }) {
    const isAr = locale === 'ar'
    const ref = useRef<HTMLAnchorElement>(null)
    const drag = useRef({ active: false, moved: false, offX: 0, offY: 0, startX: 0, startY: 0 })
    const [pos, setPos] = useState<{ left: number; top: number } | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        try {
            const raw = localStorage.getItem('ct-wa-pos')
            if (raw) {
                const p = JSON.parse(raw)
                if (typeof p?.left === 'number' && typeof p?.top === 'number') setPos(p)
            }
        } catch { /* ignore */ }
    }, [])

    const onPointerDown = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        drag.current = { active: true, moved: false, offX: e.clientX - r.left, offY: e.clientY - r.top, startX: e.clientX, startY: e.clientY }
        try { el.setPointerCapture(e.pointerId) } catch { /* ignore */ }
    }, [])

    const onPointerMove = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
        const d = drag.current
        if (!d.active) return
        const el = ref.current
        if (!el) return
        if (Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 6) d.moved = true
        const w = el.offsetWidth
        const h = el.offsetHeight
        const left = Math.max(8, Math.min(e.clientX - d.offX, window.innerWidth - w - 8))
        const top = Math.max(8, Math.min(e.clientY - d.offY, window.innerHeight - h - 8))
        setPos({ left, top })
    }, [])

    const endDrag = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
        const d = drag.current
        if (!d.active) return
        d.active = false
        try { ref.current?.releasePointerCapture(e.pointerId) } catch { /* ignore */ }
        setPos((p) => {
            if (p) { try { localStorage.setItem('ct-wa-pos', JSON.stringify(p)) } catch { /* ignore */ } }
            return p
        })
    }, [])

    const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        // A drag should never navigate.
        if (drag.current.moved) {
            e.preventDefault()
            drag.current.moved = false
        }
    }, [])

    return (
        <a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isAr ? 'تواصل معنا عبر واتساب' : 'Contact us on WhatsApp'}
            title={isAr ? 'تواصل معنا عبر واتساب' : 'Chat on WhatsApp'}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClick={onClick}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            style={pos ? { left: pos.left, top: pos.top, right: 'auto', bottom: 'auto' } : undefined}
            className={`group fixed bottom-24 z-[55] flex h-14 w-14 touch-none cursor-grab select-none items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_34px_-8px_rgba(37,211,102,0.7)] ring-2 ring-white/80 transition-transform duration-200 hover:scale-105 active:scale-95 active:cursor-grabbing md:h-[60px] md:w-[60px] ${isAr ? 'right-4' : 'left-4'}`}
        >
            {/* idle pulse ring */}
            {mounted && !pos && (
                <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" aria-hidden="true" />
            )}
            <svg viewBox="0 0 32 32" className="relative h-7 w-7 md:h-8 md:w-8" fill="currentColor" aria-hidden="true">
                <path d="M16 3.2C9.03 3.2 3.4 8.83 3.4 15.8c0 2.23.6 4.4 1.73 6.31L3.2 28.8l6.86-1.8a12.55 12.55 0 0 0 5.94 1.51h.01c6.96 0 12.6-5.63 12.6-12.6 0-3.37-1.31-6.53-3.69-8.91A12.5 12.5 0 0 0 16 3.2Zm0 22.99h-.01a10.44 10.44 0 0 1-5.32-1.46l-.38-.23-3.95 1.04 1.05-3.85-.25-.4a10.42 10.42 0 0 1-1.6-5.55c0-5.78 4.7-10.48 10.47-10.48 2.8 0 5.42 1.09 7.4 3.07a10.4 10.4 0 0 1 3.06 7.42c0 5.78-4.7 10.47-10.48 10.47Zm5.75-7.84c-.31-.16-1.86-.92-2.15-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.19.21-.37.24-.68.08-.31-.16-1.33-.49-2.53-1.56-.94-.83-1.57-1.86-1.75-2.18-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.19.21-.32.31-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54l-.6-.01c-.21 0-.55.08-.84.4-.29.31-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.6-.09 1.86-.76 2.12-1.5.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37Z" />
            </svg>
        </a>
    )
}
