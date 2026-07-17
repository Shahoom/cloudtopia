'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, X } from 'lucide-react'

import styles from './travel-hospitality-industry.module.css'

type WalkStep = {
  id: string
  title: string
  subtitle: string
}

type TravelVideoLightboxProps = {
  posterSrc: string
  posterAlt: string
  posterWidth: number
  posterHeight: number
  watchLabel: string
  modalTitle: string
  modalIntro: string
  closeLabel: string
  steps: readonly WalkStep[]
}

/**
 * Poster + lightbox — a licence-clean re-creation of the template's
 * magnific-popup video lightbox. The play button opens an accessible modal
 * dialog (focus trap, Escape + backdrop close, body scroll lock, focus returned
 * to the trigger). To stay honest there is no fabricated demo reel: the modal
 * presents the captioned guest-journey walkthrough CloudTopia follows.
 */
export function TravelVideoLightbox({
  posterSrc,
  posterAlt,
  posterWidth,
  posterHeight,
  watchLabel,
  modalTitle,
  modalIntro,
  closeLabel,
  steps,
}: TravelVideoLightboxProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    // Capture the element that opened the lightbox so cleanup restores focus to
    // it even if the ref has changed by teardown time.
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [open, close])

  return (
    <div className={styles.videoPoster}>
      <Image
        src={posterSrc}
        alt={posterAlt}
        width={posterWidth}
        height={posterHeight}
        sizes="(max-width: 991px) 92vw, 46vw"
        className={styles.videoPosterImg}
      />
      <button
        type="button"
        className={styles.videoPlay}
        onClick={() => setOpen(true)}
        ref={triggerRef}
      >
        <span className={styles.videoPlayIcon} aria-hidden="true">
          <Play />
        </span>
        <span>{watchLabel}</span>
      </button>

      {open ? (
        <div className={styles.modalOverlay} onClick={close}>
          <div
            className={styles.modalDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="travel-walk-title"
            ref={dialogRef}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={close}
              aria-label={closeLabel}
              ref={closeRef}
            >
              <X aria-hidden="true" />
            </button>
            <h3 id="travel-walk-title" className={styles.modalTitle}>
              {modalTitle}
            </h3>
            <p className={styles.modalIntro}>{modalIntro}</p>
            <ol className={styles.modalSteps}>
              {steps.map((step, index) => (
                <li className={styles.modalStep} key={step.id}>
                  <span className={styles.modalStepNum} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.subtitle}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}
    </div>
  )
}
