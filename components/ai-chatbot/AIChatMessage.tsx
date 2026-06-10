import type { ChatTurnSource } from '@/lib/ai-chatbot/types.ts'
import styles from './AIChatbot.module.css'

export type ChatChip = { id: string; label: string }

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
  whatsappUrl?: string
  options?: ChatChip[]
  source?: ChatTurnSource
}

export function AIChatMessage({
  message,
  locale,
  whatsappLabel,
  interactive,
  onChip,
}: {
  message: ChatMessage
  locale: 'ar' | 'en'
  whatsappLabel: string
  interactive?: boolean
  onChip?: (chip: ChatChip) => void
}) {
  const isAssistant = message.role === 'assistant'
  const showChips = isAssistant && interactive && Boolean(message.options?.length)

  return (
    <div className={`${styles.messageRow} ${isAssistant ? styles.assistantRow : styles.userRow}`}>
      <div className={styles.messageColumn}>
        <div
          className={`${styles.messageBubble} ${isAssistant ? styles.assistantBubble : styles.userBubble}`}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
          <p>{message.content}</p>
          {message.whatsappUrl ? (
            <a className={styles.whatsappLink} href={message.whatsappUrl} target="_blank" rel="noreferrer">
              {whatsappLabel}
            </a>
          ) : null}
        </div>

        {showChips ? (
          <div className={styles.chips} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            {message.options!.map((chip) => (
              <button key={chip.id} type="button" className={styles.chip} onClick={() => onChip?.(chip)}>
                {chip.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
