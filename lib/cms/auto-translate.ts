import type { PayloadRequest } from 'payload'

type TargetLocale = 'ar'
type TranslationPayload = Record<string, unknown> | unknown[]

const targetNames: Record<TargetLocale, string> = {
  ar: 'Arabic',
}

const skipKeys = new Set([
  'canonical',
  'cmsKey',
  'createdAt',
  'created_at',
  'email',
  'href',
  'icon',
  'id',
  'image',
  'imageMedia',
  'key',
  'link',
  'locale',
  'ogImage',
  'path',
  'primaryHref',
  'publicPath',
  'secondaryHref',
  'slug',
  'src',
  'status',
  'template',
  'updatedAt',
  'updated_at',
  'url',
  'whatsapp',
])

export function shouldRunAutoTranslate(req: PayloadRequest, doc: Record<string, unknown>) {
  return Boolean(
    doc &&
      doc.locale === 'en' &&
      isAutoTranslationConfigured() &&
      doc.autoTranslate !== false &&
      !(req.context as Record<string, unknown> | undefined)?.skipAutoTranslate,
  )
}

export function isAutoTranslationConfigured() {
  return Boolean(process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY)
}

export async function translatePayload<T extends TranslationPayload>(
  payload: T,
  targetLocale: TargetLocale,
): Promise<T> {
  const entries: Array<{ path: string; text: string }> = []
  collectTranslatableStrings(payload, [], entries)

  if (entries.length === 0) return payload

  const translated = await translateStrings(entries, targetLocale)
  if (!translated) return payload

  return applyTranslations(payload, translated) as T
}

async function translateStrings(entries: Array<{ path: string; text: string }>, targetLocale: TargetLocale) {
  const openaiKey = process.env.OPENAI_API_KEY
  const geminiKey = process.env.GEMINI_API_KEY

  if (!openaiKey && !geminiKey) {
    console.warn('[auto-translate] No OPENAI_API_KEY or GEMINI_API_KEY set. Skipped.')
    return null
  }

  const systemPrompt =
    'You are translating website CMS fields for CloudTopia. Return JSON only. Preserve brand names, code, URLs, placeholders, numbers, punctuation, emojis, line breaks, and HTML/Markdown tokens. Do not add explanations.'
  const userPayload = JSON.stringify({
    targetLanguage: targetNames[targetLocale],
    strings: Object.fromEntries(entries.map((entry) => [entry.path, entry.text])),
  })

  try {
    debugLog('translateStrings input payload', { targetLocale, userPayload })

    const outputText = openaiKey
      ? await callOpenAI(openaiKey, systemPrompt, userPayload)
      : await callGemini(geminiKey!, systemPrompt, userPayload)

    debugLog('translateStrings raw response from API', { outputText })

    if (!outputText) {
      debugLog('translateStrings error: outputText is empty')
      return null
    }
    const parsed = JSON.parse(outputText) as any
    debugLog('translateStrings parsed response', { parsed })
    const strings = parsed?.strings || parsed
    return strings && typeof strings === 'object' ? strings : null
  } catch (error: any) {
    console.warn('[auto-translate] Translation failed.', error)
    debugLog('Error', { message: error?.message || String(error) })
    return null
  }
}

// Debug logging writes to a temp-dir file ONLY in development. In production
// (e.g. Vercel's read-only filesystem) it is a no-op, so it can never throw an
// EROFS error that would silently abort the translation flow.
function debugLog(msg: string, data?: unknown) {
  if (process.env.NODE_ENV !== 'development') return
  try {
    const fs = require('node:fs')
    const path = require('node:path')
    const os = require('node:os')
    const logDir = path.join(os.tmpdir(), 'cloudtopia-auto-translate')
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })
    const logPath = path.join(logDir, 'translate-debug.log')
    const timestamp = new Date().toISOString()
    fs.appendFileSync(logPath, `[${timestamp}] [auto-translate] ${msg} ${data ? JSON.stringify(data) : ''}\n`, 'utf8')
  } catch {
    // Never let debug logging break translation.
  }
}

async function callOpenAI(apiKey: string, systemPrompt: string, userContent: string): Promise<string | null> {
  const model = process.env.OPENAI_TRANSLATION_MODEL || 'gpt-4o-mini'

  // Try Responses API first
  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        input: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        text: { format: { type: 'json_object' } },
      }),
    })

    if (response.ok) {
      const json = await response.json()
      const text = extractOutputText(json)
      if (text) return text
    }
  } catch {
    // Fall through to Chat Completions
  }

  // Fallback: Chat Completions API
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
      }),
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      console.warn(`[auto-translate] OpenAI Chat Completions failed: ${response.status}`, errText)
      debugLog(`OpenAI HTTP ${response.status} failed`, { errText })
      return null
    }

    const json = await response.json()
    return json?.choices?.[0]?.message?.content?.trim() || null
  } catch (error: any) {
    console.warn('[auto-translate] OpenAI request failed.', error)
    debugLog('OpenAI request threw exception', { message: error?.message || String(error) })
    return null
  }
}

async function callGemini(apiKey: string, systemPrompt: string, userContent: string): Promise<string | null> {
  const model = process.env.GEMINI_TRANSLATION_MODEL || 'gemini-2.5-flash'

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\n${userContent}` }] }],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        }),
      },
    )

    if (!response.ok) {
      console.warn(`[auto-translate] Gemini request failed: ${response.status}`)
      return null
    }

    const json = await response.json()
    return json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null
  } catch (error) {
    console.warn('[auto-translate] Gemini request failed.', error)
    return null
  }
}

function collectTranslatableStrings(value: unknown, path: string[], entries: Array<{ path: string; text: string }>) {
  if (typeof value === 'string') {
    if (shouldTranslateString(value, path)) {
      entries.push({ path: path.join('.'), text: value })
    }
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectTranslatableStrings(item, [...path, String(index)], entries))
    return
  }

  if (value && typeof value === 'object') {
    Object.entries(value as Record<string, unknown>).forEach(([key, item]) => {
      collectTranslatableStrings(item, [...path, key], entries)
    })
  }
}

function shouldTranslateString(value: string, path: string[]) {
  const text = value.trim()
  if (text.length < 2) return false
  if (!/[A-Za-z]/.test(text)) return false

  const key = path[path.length - 1] || ''
  if (skipKeys.has(key)) return false
  if (/(^|_)(href|url|slug|path|id|key|icon|image|src)$/i.test(key)) return false
  if (/^(https?:|mailto:|tel:|#|\/)/.test(text)) return false
  if (/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(text)) return false
  if (/^#[0-9A-Fa-f]{3,8}$/.test(text)) return false
  if (/\.(png|jpe?g|webp|svg|gif|pdf)(\?.*)?$/i.test(text)) return false
  if (/^[a-z0-9]+(?:[-_:][a-z0-9]+)+$/i.test(text)) return false

  return true
}

function applyTranslations(value: unknown, translations: Record<string, string>, path: string[] = []): unknown {
  if (typeof value === 'string') {
    const key = path.join('.')
    return typeof translations[key] === 'string' && translations[key].trim() ? translations[key] : value
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => applyTranslations(item, translations, [...path, String(index)]))
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        applyTranslations(item, translations, [...path, key]),
      ]),
    )
  }

  return value
}

function extractOutputText(response: any) {
  if (typeof response?.output_text === 'string') return response.output_text

  const chunks: string[] = []
  for (const output of response?.output || []) {
    for (const content of output?.content || []) {
      if (content?.type === 'output_text' && typeof content.text === 'string') {
        chunks.push(content.text)
      }
    }
  }
  return chunks.join('').trim()
}
