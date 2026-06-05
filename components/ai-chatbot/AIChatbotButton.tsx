import { MessageCircle } from 'lucide-react'
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
      <MessageCircle size={22} aria-hidden="true" />
      <span>{locale === 'ar' ? 'اسأل CloudTopia' : 'Ask CloudTopia'}</span>
    </button>
  )
}
