import 'server-only'

import type { AILeadInput } from './types.ts'
import { isPayloadConfigured } from '@/lib/cms/env.ts'
import { getPayloadClient } from '@/lib/cms/payload.ts'

export type LeadSaveResult =
  | {
      saved: true
      id: string
      destination: 'payload'
    }
  | {
      saved: false
      destination: 'fallback'
      reason: string
    }

export async function saveAIChatLead(lead: AILeadInput): Promise<LeadSaveResult> {
  if (!isPayloadConfigured()) {
    return {
      saved: false,
      destination: 'fallback',
      reason: 'Payload is not configured. Connect this service to your CRM or database when ready.',
    }
  }

  try {
    const payload = await getPayloadClient()
    const saved = await payload.create({
      collection: 'ai-chat-leads' as never,
      data: lead as never,
      overrideAccess: true,
    })

    return {
      saved: true,
      id: String((saved as { id?: string | number }).id ?? ''),
      destination: 'payload',
    }
  } catch (error) {
    // Log unconditionally so a missing column / schema drift can never silently
    // hide a qualified lead. We deliberately do NOT write to a separate
    // ai_chatbot_leads table — leads must land in the CRM-visible collection.
    console.error('[ai-chatbot] Failed to save lead to Payload', error)

    return {
      saved: false,
      destination: 'fallback',
      reason:
        'Lead could not be persisted to the CRM. If Payload migrations are not applied yet, run payload:migrate so the ai_chat_leads table exists.',
    }
  }
}
