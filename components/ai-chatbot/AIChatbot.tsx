'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AIChatbotButton } from './AIChatbotButton'
import { AIChatbotWindow } from './AIChatbotWindow'
import type { ChatChip, ChatMessage } from './AIChatMessage'
import { getEntryChips, getFlowNode, getWelcomeText, matchFlow, type FlowResult } from '@/lib/ai-chatbot/flows/index.ts'
import { buildWhatsappHandoff } from '@/lib/ai-chatbot/whatsapp.ts'
import type { ConversationTurn } from '@/lib/ai-chatbot/types.ts'
import styles from './AIChatbot.module.css'

const sessionKey = 'cloudtopia-ai-chat-session'
// Rotating id for the CURRENT conversation. Distinct from sessionKey (a stable
// per-visitor id used only for rate limiting): this rotates after each session
// ends so a returning visitor's new conversation becomes a NEW CMS row instead
// of overwriting the previous transcript.
const conversationKey = 'cloudtopia-ai-chat-conversation-id'
const proactiveKey = 'cloudtopia-ai-chat-proactive-at'

// Flows answer the common questions with zero API. The OpenAI fallback only runs
// for free-typed questions no flow matches — and can be switched off entirely with
// NEXT_PUBLIC_AI_CHAT_FALLBACK=false, making the bot 100% flow-driven.
const aiFallbackEnabled = process.env.NEXT_PUBLIC_AI_CHAT_FALLBACK !== 'false'
const INACTIVITY_MS = 3 * 60 * 1000

const fallback = {
  ar: 'حدث خطأ مؤقت. يمكنك التواصل معنا مباشرة عبر واتساب وسنساعدك.',
  en: 'Something went wrong. You can contact us directly on WhatsApp and we’ll help you.',
}

const proactive = {
  ar: 'أهلًا، لاحظت أنك تتصفح الموقع. هل تحتاج مساعدة في اختيار موقع، تطبيق ويب، CRM، أو حل AI مناسب لشركتك؟',
  en: 'Hi, I noticed you’re exploring CloudTopia. Need help choosing the right website, web app, CRM, or AI solution for your business?',
}

const guidedMenu = {
  ar: 'لم ألتقط ذلك تمامًا، لكن يمكنني مساعدتك في أحد هذه المواضيع، أو توصيلك بفريقنا مباشرة:',
  en: 'I didn’t quite catch that, but I can help with one of these — or connect you with our team directly:',
}

export function AIChatbot() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [locale, setLocale] = useState<'ar' | 'en'>('en')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [latestWhatsappUrl, setLatestWhatsappUrl] = useState<string | null>(null)
  const [attention, setAttention] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Refs mirror state so window/unload event handlers always flush the latest
  // transcript rather than a stale closure.
  const messagesRef = useRef<ChatMessage[]>([])
  const localeRef = useRef<'ar' | 'en'>('en')
  const leadCapturedRef = useRef(false)
  // True once the AI agent has started collecting the visitor's details, so subsequent
  // turns route straight to the AI instead of being intercepted by a deterministic flow.
  const leadCaptureActiveRef = useRef(false)
  const lastSigRef = useRef('')
  const inactivityRef = useRef<number | null>(null)
  // Set after a session-end flush so the next user turn starts a fresh conversation id.
  const pendingRotateRef = useRef(false)

  const shouldHide = useMemo(() => {
    if (!mounted) return false
    return /\/(admin|cms|dashboard|login|crm)(\/|$)/i.test(pathname || window.location.pathname)
  }, [mounted, pathname])

  useEffect(() => {
    const detectedLocale = detectPageLocale()
    setLocale(detectedLocale)
    setMessages(readStoredMessages(detectedLocale))
    ensureSessionId()
    setMounted(true)
  }, [])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])
  useEffect(() => {
    localeRef.current = locale
  }, [locale])
  useEffect(() => {
    leadCapturedRef.current = leadCaptured
  }, [leadCaptured])

  useEffect(() => {
    if (!mounted) return

    function syncLocaleFromPage() {
      const nextLocale = detectPageLocale()
      setLocale((currentLocale) => {
        if (currentLocale === nextLocale) return currentLocale
        setMessages(readStoredMessages(nextLocale))
        setInput('')
        leadCaptureActiveRef.current = false
        setLatestWhatsappUrl(null)
        return nextLocale
      })
    }

    syncLocaleFromPage()

    const observer = new MutationObserver(syncLocaleFromPage)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] })
    window.addEventListener('popstate', syncLocaleFromPage)

    return () => {
      observer.disconnect()
      window.removeEventListener('popstate', syncLocaleFromPage)
    }
  }, [mounted, pathname])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(storageKeyForLocale(locale), JSON.stringify(messages.slice(-20)))
  }, [messages, mounted, locale])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 160)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Flush the transcript to the CMS at session end: when the tab is hidden or
  // closed (via sendBeacon so it survives unload) and after a long idle gap.
  useEffect(() => {
    if (!mounted || shouldHide) return

    function onVisibility() {
      if (document.visibilityState === 'hidden') flushConversation({ status: 'completed', useBeacon: true })
    }
    function onPageHide() {
      flushConversation({ status: 'completed', useBeacon: true })
    }

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)
      if (inactivityRef.current) window.clearTimeout(inactivityRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, shouldHide])

  useEffect(() => {
    if (!mounted || shouldHide) return
    if (!shouldShowProactivePrompt()) return

    const ringTimer = window.setTimeout(() => setAttention(true), 55_000)
    const openTimer = window.setTimeout(() => {
      const nextLocale = detectPageLocale()
      setLocale(nextLocale)
      setOpen(true)
      setAttention(false)
      setMessages((current) => {
        if (current.some((message) => message.content === proactive[nextLocale])) return current
        const proactiveMessage = createMessage('assistant', proactive[nextLocale], { source: 'system', options: getEntryChips(nextLocale) })
        // If the visitor hasn't said anything yet, the only message is the canned
        // welcome — replace it so we show a single greeting instead of stacking two.
        const hasUserTurn = current.some((message) => message.role === 'user')
        if (!hasUserTurn) return [proactiveMessage]
        return [...current, proactiveMessage].slice(-20)
      })
      localStorage.setItem(proactiveKey, new Date().toISOString())
    }, 60_000)

    return () => {
      window.clearTimeout(ringTimer)
      window.clearTimeout(openTimer)
    }
  }, [mounted, shouldHide])

  if (!mounted || shouldHide) return null

  function bumpInactivity() {
    if (inactivityRef.current) window.clearTimeout(inactivityRef.current)
    inactivityRef.current = window.setTimeout(() => {
      flushConversation({ status: 'completed' })
    }, INACTIVITY_MS)
  }

  function buildConversationBody(status: 'active' | 'completed', leadOverride?: boolean) {
    const msgs = messagesRef.current
    const turns: ConversationTurn[] = msgs.map((m) => ({
      role: m.role,
      content: m.content,
      source: m.source ?? (m.role === 'user' ? 'user' : 'flow'),
      at: m.createdAt,
    }))

    return {
      sessionId: ensureConversationId(),
      language: localeRef.current,
      pageUrl: window.location.href,
      country: null,
      startedAt: msgs[0]?.createdAt ?? null,
      endedAt: new Date().toISOString(),
      messages: turns,
      leadCaptured: leadOverride ?? leadCapturedRef.current,
      status,
      source: 'ai_chatbot',
    }
  }

  function flushConversation({
    status,
    useBeacon = false,
    leadCaptured: leadOverride,
  }: {
    status: 'active' | 'completed'
    useBeacon?: boolean
    leadCaptured?: boolean
  }) {
    if (typeof window === 'undefined') return
    const msgs = messagesRef.current
    if (!msgs.some((m) => m.role === 'user')) return // nothing real to log yet

    const body = buildConversationBody(status, leadOverride)
    const payload = JSON.stringify(body)
    const signature = `${status}:${body.messages.length}:${msgs[msgs.length - 1]?.id ?? ''}:${body.leadCaptured}`
    // Always allow the final "completed" save through; dedupe interim saves.
    if (status !== 'completed' && signature === lastSigRef.current) return
    lastSigRef.current = signature

    try {
      if (useBeacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
        navigator.sendBeacon('/api/ai-chat/conversation', new Blob([payload], { type: 'application/json' }))
      } else {
        void fetch('/api/ai-chat/conversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-ai-chat-session': ensureSessionId() },
          body: payload,
          keepalive: true,
        }).catch(() => {})
      }
    } catch {
      // Logging must never break the chat experience.
    }

    // After a session-end save, the next message should open a new conversation.
    if (status === 'completed') pendingRotateRef.current = true
  }

  function maybeRotateConversation() {
    if (!pendingRotateRef.current) return
    rotateConversationId()
    pendingRotateRef.current = false
    lastSigRef.current = ''
  }

  function applyFlowResult(flow: FlowResult, summaryText: string) {
    let whatsappUrl: string | undefined
    if (flow.action === 'whatsapp') {
      const handoff = buildWhatsappHandoff({
        language: locale,
        country: null,
        businessType: null,
        serviceNeeded: null,
        budgetRange: null,
        timeline: null,
        summary: summaryText || ' ',
        pageUrl: window.location.href,
      })
      whatsappUrl = handoff.url
      setLatestWhatsappUrl(handoff.url)
    }

    setMessages((current) => [
      ...current,
      createMessage('assistant', flow.answer, { source: 'flow', options: flow.chips, whatsappUrl }),
    ])
  }

  function pushGuidedMenu() {
    const handoff = buildWhatsappHandoff({
      language: locale,
      country: null,
      businessType: null,
      serviceNeeded: null,
      budgetRange: null,
      timeline: null,
      summary: ' ',
      pageUrl: window.location.href,
    })
    setLatestWhatsappUrl(handoff.url)
    const chips: ChatChip[] = [...getEntryChips(locale), { id: 'whatsapp', label: locale === 'ar' ? 'واتساب' : 'WhatsApp' }]
    setMessages((current) => [
      ...current,
      createMessage('assistant', guidedMenu[locale], { source: 'system', options: chips, whatsappUrl: handoff.url }),
    ])
  }

  function startLeadCapture() {
    leadCaptureActiveRef.current = true
  }

  // Hand the conversation to the AI agent. `history` already includes the latest user turn.
  // The agent answers and, when it has enough, calls submit_lead server-side; the response
  // then carries leadSaved + a WhatsApp handoff URL.
  async function runAssistantAI(history: ChatMessage[]) {
    if (!aiFallbackEnabled) {
      pushGuidedMenu()
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ai-chat-session': ensureSessionId(),
        },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
          pageUrl: window.location.href,
          locale,
          leadCaptured: leadCapturedRef.current,
        }),
      })
      const data = (await response.json().catch(() => ({}))) as {
        reply?: string
        leadSaved?: boolean
        whatsappUrl?: string | null
        lead?: { whatsappUrl?: string | null }
      }
      const whatsappUrl = data.whatsappUrl ?? data.lead?.whatsappUrl ?? null

      if (whatsappUrl) setLatestWhatsappUrl(whatsappUrl)

      setMessages((current) => [
        ...current,
        createMessage('assistant', data.reply || fallback[locale], {
          source: 'ai',
          whatsappUrl: whatsappUrl || undefined,
          // After a lead is captured, keep it clean (just the WhatsApp handoff); otherwise
          // offer the entry chips so the visitor can keep exploring.
          options: data.leadSaved ? undefined : getEntryChips(locale),
        }),
      ])

      if (data.leadSaved) {
        setLeadCaptured(true)
        leadCaptureActiveRef.current = false
        flushConversation({ status: 'active', leadCaptured: true })
      }
    } catch {
      setMessages((current) => [...current, createMessage('assistant', fallback[locale], { source: 'system' })])
    } finally {
      setLoading(false)
    }
  }

  async function submitMessage(content: string, options: { forceAI?: boolean } = {}) {
    const trimmed = content.trim()
    if (!trimmed || loading) return

    maybeRotateConversation()
    const userMessage = createMessage('user', trimmed, { source: 'user' })
    const next = [...messages, userMessage]
    setMessages(next)
    setInput('')
    setAttention(false)
    localStorage.setItem(proactiveKey, new Date().toISOString())
    bumpInactivity()

    const captureActive = options.forceAI || leadCaptureActiveRef.current

    if (captureActive) {
      startLeadCapture()
    } else if (looksLikeLeadIntent(trimmed)) {
      // Buying intent or contact info → hand to the AI agent even if a flow would match,
      // so a greeting/info flow can't intercept an interested visitor.
      startLeadCapture()
    } else {
      // Pure info question → answer instantly with the flow engine (no API).
      // Flows whose action is to capture a lead are handed to the AI agent instead.
      const flow = matchFlow(trimmed, locale)
      if (flow && flow.action !== 'lead-form') {
        applyFlowResult(flow, trimmed)
        return
      }
      if (flow && flow.action === 'lead-form') {
        startLeadCapture()
      }
    }

    await runAssistantAI(next)
  }

  function handleChip(chip: ChatChip) {
    if (loading) return

    maybeRotateConversation()
    const userMessage = createMessage('user', chip.label, { source: 'user' })
    const next = [...messages, userMessage]
    setMessages(next)
    setAttention(false)
    bumpInactivity()

    // Mid-capture: every tap continues the AI conversation.
    if (leadCaptureActiveRef.current) {
      void runAssistantAI(next)
      return
    }

    const flow = getFlowNode(chip.id, locale)
    if (flow && flow.action !== 'lead-form') {
      applyFlowResult(flow, chip.label)
      return
    }

    // Consultation / quote chips (and any unmapped chip) begin AI-driven lead capture.
    startLeadCapture()
    void runAssistantAI(next)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void submitMessage(input)
  }

  function clearChat() {
    const reset = [welcomeMessage(locale)]
    setMessages(reset)
    setLatestWhatsappUrl(null)
    leadCaptureActiveRef.current = false
    setLeadCaptured(false)
    rotateConversationId()
    pendingRotateRef.current = false
    lastSigRef.current = ''
    localStorage.setItem(storageKeyForLocale(locale), JSON.stringify(reset))
  }

  function handleClose() {
    setOpen(false)
    flushConversation({ status: 'active' })
  }

  return (
    <div className={`${styles.root} ${locale === 'ar' ? styles.rootRtl : ''}`}>
      {open ? (
        <AIChatbotWindow
          locale={locale}
          messages={messages}
          input={input}
          loading={loading}
          latestWhatsappUrl={latestWhatsappUrl}
          inputRef={inputRef}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onChip={handleChip}
          onClear={clearChat}
          onClose={handleClose}
        />
      ) : null}
      <AIChatbotButton
        locale={locale}
        open={open}
        attention={attention}
        onClick={() => {
          setAttention(false)
          localStorage.setItem(proactiveKey, new Date().toISOString())
          setOpen((value) => !value)
        }}
      />
    </div>
  )
}

// Strong buying-intent / contact signals. When present, route to the AI agent (which can
// answer AND start collecting a lead) instead of letting a flow answer deterministically.
const leadIntentEn =
  /\b(i want|i need|i'?d like|i would like|looking for|interested in|build me|can you (build|make|do)|how much|price|pricing|quote|get started|hire|work with|i have a (business|company|shop|store|restaurant|startup))\b/i
const leadIntentAr =
  /(أريد|اريد|أحتاج|احتاج|ابغى|أبغى|أبي|ابي|عايز|عاوز|بدي|مهتم|كم سعر|كم تكلفة|كم السعر|عرض سعر|عرض مخصص|عندي مشروع|عندي محل|عندي متجر|عندي مطعم|عندي شركة|أبغي|أرغب)/

function looksLikeLeadIntent(text: string) {
  if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(text)) return true // email
  if (text.replace(/[^\d]/g, '').length >= 8) return true // phone-like
  return leadIntentEn.test(text) || leadIntentAr.test(text)
}

function detectPageLocale(): 'ar' | 'en' {
  if (document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl') return 'ar'
  // NOT startsWith('/ar') — that also matches '/articles', so every English
  // article page was served the Arabic chatbot. Match the locale segment only.
  const path = window.location.pathname
  if (path === '/ar' || path.startsWith('/ar/')) return 'ar'
  return 'en'
}

function welcomeMessage(locale: 'ar' | 'en'): ChatMessage {
  return createMessage('assistant', getWelcomeText(locale), { source: 'system', options: getEntryChips(locale) })
}

function readStoredMessages(locale: 'ar' | 'en') {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKeyForLocale(locale)) || '[]') as ChatMessage[]
    if (Array.isArray(stored) && stored.length > 0) return stored.slice(-20)
  } catch {
    localStorage.removeItem(storageKeyForLocale(locale))
  }

  return [welcomeMessage(locale)]
}

function storageKeyForLocale(locale: 'ar' | 'en') {
  return `cloudtopia-ai-chat-${locale}`
}

function shouldShowProactivePrompt() {
  try {
    const stored = localStorage.getItem(proactiveKey)
    if (!stored) return true
    const lastShown = new Date(stored).getTime()
    if (!Number.isFinite(lastShown)) return true
    return Date.now() - lastShown > 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

type CreateMessageOptions = {
  whatsappUrl?: string
  options?: ChatChip[]
  source?: ChatMessage['source']
}

function createMessage(role: ChatMessage['role'], content: string, opts: CreateMessageOptions = {}): ChatMessage {
  return {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    role,
    content,
    createdAt: new Date().toISOString(),
    whatsappUrl: opts.whatsappUrl,
    options: opts.options,
    source: opts.source,
  }
}

function ensureSessionId() {
  const existing = localStorage.getItem(sessionKey)
  if (existing) return existing
  const created = newId()
  localStorage.setItem(sessionKey, created)
  return created
}

function ensureConversationId() {
  const existing = localStorage.getItem(conversationKey)
  if (existing) return existing
  return rotateConversationId()
}

function rotateConversationId() {
  const created = newId()
  localStorage.setItem(conversationKey, created)
  return created
}

function newId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
}
