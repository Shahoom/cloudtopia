import { X } from 'lucide-react'
import styles from './AIChatbot.module.css'

export function AIChatbotButton({
  locale,
  open,
  attention,
  onClick,
}: {
  locale: 'ar' | 'en'
  open: boolean
  attention?: boolean
  onClick: () => void
}) {
  return (
    <button
      className={`${styles.floatingButton} ${open ? styles.floatingButtonOpen : ''} ${attention ? styles.floatingButtonAttention : ''}`}
      type="button"
      aria-label={locale === 'ar' ? 'افتح محادثة CloudTopia' : 'Open CloudTopia chat'}
      aria-expanded={open}
      onClick={onClick}
    >
      <span className={styles.buttonAura} aria-hidden="true" />
      <span className={`${styles.buttonIcon} ${open ? styles.buttonIconOpen : ''}`} aria-hidden="true">
        {open ? (
          <X size={20} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/images/CloudTopia.svg" alt="" className={styles.buttonLogo} />
        )}
      </span>
      {!open ? <span className={styles.buttonLabel}>{locale === 'ar' ? 'اسأل CloudTopia' : 'Ask CloudTopia'}</span> : null}
    </button>
  )
}
