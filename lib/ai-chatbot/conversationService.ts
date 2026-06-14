import 'server-only'

import type { ConversationInput } from './types.ts'
import { isPayloadConfigured } from '@/lib/cms/env.ts'
import { getPayloadClient } from '@/lib/cms/payload.ts'

export type ConversationSaveResult =
  | { saved: true; id: string; updated: boolean }
  | { saved: false; reason: string }

function buildTranscriptText(input: ConversationInput): string {
  return input.messages
    .map((turn) => `${turn.role === 'user' ? 'Visitor' : 'CloudTopia'}: ${turn.content}`)
    .join('\n')
}

/**
 * Upsert a conversation transcript by sessionId. Repeated flushes (e.g. an
 * inactivity save followed by a tab-close beacon) update the same row, so a
 * conversation is never duplicated and the latest transcript always wins.
 */
export async function saveConversation(input: ConversationInput): Promise<ConversationSaveResult> {
  if (!isPayloadConfigured()) {
    return { saved: false, reason: 'Payload is not configured.' }
  }

  const data = {
    sessionId: input.sessionId,
    language: input.language,
    country: input.country,
    pageUrl: input.pageUrl,
    transcriptText: buildTranscriptText(input),
    messages: input.messages,
    messageCount: input.messages.length,
    leadCaptured: input.leadCaptured,
    status: input.status,
    source: input.source,
    ipAddress: input.ipAddress,
    startedAt: input.startedAt,
    endedAt: input.endedAt,
  }

  try {
    const payload = await getPayloadClient()
    const existing = await payload.find({
      collection: 'ai-chat-conversations' as never,
      where: { sessionId: { equals: input.sessionId } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    const current = (existing as { docs?: Array<{ id: string | number }> }).docs?.[0]
    if (current) {
      const updated = await payload.update({
        collection: 'ai-chat-conversations' as never,
        id: current.id,
        data: data as never,
        overrideAccess: true,
      })
      return { saved: true, id: String((updated as { id?: string | number }).id ?? current.id), updated: true }
    }

    const created = await payload.create({
      collection: 'ai-chat-conversations' as never,
      data: data as never,
      overrideAccess: true,
    })
    return { saved: true, id: String((created as { id?: string | number }).id ?? ''), updated: false }
  } catch (error) {
    console.error('[ai-chatbot] Failed to save conversation to Payload', error)
    return { saved: false, reason: 'Conversation could not be persisted. Ensure migrations are applied.' }
  }
}
