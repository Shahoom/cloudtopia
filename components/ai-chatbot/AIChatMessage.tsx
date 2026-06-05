import styles from './AIChatbot.module.css'

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
  whatsappUrl?: string
}

export function AIChatMessage({
  message,
  locale,
  whatsappLabel,
}: {
  message: ChatMessage
  locale: 'ar' | 'en'
  whatsappLabel: string
}) {
  const isAssistant = message.role === 'assistant'

  return (
    <div className={`${styles.messageRow} ${isAssistant ? styles.assistantRow : styles.userRow}`}>
      <div className={`${styles.messageBubble} ${isAssistant ? styles.assistantBubble : styles.userBubble}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <p>{message.content}</p>
        {message.whatsappUrl ? (
          <a className={styles.whatsappLink} href={message.whatsappUrl} target="_blank" rel="noreferrer">
            {whatsappLabel}
          </a>
        ) : null}
      </div>
    </div>
  )
}
