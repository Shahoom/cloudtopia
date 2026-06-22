'use client'

import { FormEvent, RefObject } from 'react'
import { Send, Trash2, X } from 'lucide-react'
import { AIChatMessage, type ChatChip, type ChatMessage } from './AIChatMessage'
import styles from './AIChatbot.module.css'

const copy = {
  ar: {
    title: 'CloudTopia AI',
    subtitle: 'مبيعات ودعم · متصل',
    placeholder: 'اكتب رسالتك هنا...',
    clear: 'مسح المحادثة',
    close: 'إغلاق المحادثة',
    whatsapp: 'تواصل عبر واتساب',
    send: 'إرسال',
  },
  en: {
    title: 'CloudTopia AI',
    subtitle: 'Sales & support · online',
    placeholder: 'Type your message...',
    clear: 'Clear chat',
    close: 'Close chat',
    whatsapp: 'Contact on WhatsApp',
    send: 'Send',
  },
}

export function AIChatbotWindow({
  locale,
  messages,
  input,
  loading,
  latestWhatsappUrl,
  inputRef,
  onInputChange,
  onSubmit,
  onChip,
  onClear,
  onClose,
}: {
  locale: 'ar' | 'en'
  messages: ChatMessage[]
  input: string
  loading: boolean
  latestWhatsappUrl: string | null
  inputRef: RefObject<HTMLInputElement | null>
  onInputChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onChip: (chip: ChatChip) => void
  onClear: () => void
  onClose: () => void
}) {
  const L = copy[locale]
  const lastIndex = messages.length - 1

  return (
    <section className={styles.window} dir={locale === 'ar' ? 'rtl' : 'ltr'} aria-label={L.title}>
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.identity}>
          <span className={styles.avatar} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/CloudTopia.svg" alt="" className={styles.avatarImg} />
            <span className={styles.statusDot} />
          </span>
          <div>
            <h2>{L.title}</h2>
            <p className={styles.kicker}>{L.subtitle}</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button type="button" aria-label={L.clear} onClick={onClear}>
            <Trash2 size={17} aria-hidden="true" />
          </button>
          <button type="button" aria-label={L.close} onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className={styles.messages} aria-live="polite">
        {messages.map((message, index) => (
          <AIChatMessage
            key={message.id}
            message={message}
            locale={locale}
            whatsappLabel={L.whatsapp}
            interactive={!loading && index === lastIndex && message.role === 'assistant'}
            onChip={onChip}
          />
        ))}
        {loading ? (
          <div className={`${styles.messageRow} ${styles.assistantRow}`}>
            <span className={styles.messageAvatar} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/CloudTopia.svg" alt="" className={styles.messageAvatarImg} />
            </span>
            <div className={`${styles.messageBubble} ${styles.assistantBubble} ${styles.loadingBubble}`}>
              <span className={styles.typingDots} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>
        ) : null}
      </div>

      {latestWhatsappUrl ? (
        <a className={styles.whatsappCta} href={latestWhatsappUrl} target="_blank" rel="noreferrer">
          {L.whatsapp}
        </a>
      ) : null}

      <form className={styles.inputBar} onSubmit={onSubmit}>
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          placeholder={L.placeholder}
          aria-label={L.placeholder}
          maxLength={2000}
          disabled={loading}
        />
        <button type="submit" aria-label={L.send} disabled={loading || !input.trim()}>
          <Send size={18} aria-hidden="true" />
        </button>
      </form>
    </section>
  )
}
