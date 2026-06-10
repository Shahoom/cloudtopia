import type { CollectionConfig } from 'payload'
import { adminOnly } from './blogAccess.ts'

// Full transcripts of every CloudTopia AI chatbot conversation. Written by the
// client at session end (and via sendBeacon on tab close) through
// /api/ai-chat/conversation, which upserts by sessionId.
export const AIChatConversations: CollectionConfig = {
  slug: 'ai-chat-conversations',
  lockDocuments: false,
  admin: {
    group: 'CRM',
    useAsTitle: 'sessionId',
    defaultColumns: ['sessionId', 'language', 'country', 'messageCount', 'leadCaptured', 'status', 'createdAt'],
    description: 'Full transcripts of every conversation handled by the CloudTopia AI chatbot.',
  },
  access: {
    read: adminOnly,
    // Public creation/updates are allowed — the API route validates and upserts
    // with overrideAccess, mirroring how ai-chat-leads is captured.
    create: () => true,
    update: () => true,
    delete: adminOnly,
  },
  fields: [
    { name: 'sessionId', type: 'text', required: true, index: true },
    {
      name: 'language',
      type: 'select',
      defaultValue: 'unknown',
      options: [
        { label: 'Arabic', value: 'ar' },
        { label: 'English', value: 'en' },
        { label: 'Unknown', value: 'unknown' },
      ],
    },
    { name: 'country', type: 'text' },
    { name: 'pageUrl', type: 'text' },
    {
      name: 'transcriptText',
      type: 'textarea',
      admin: { description: 'Readable, plain-text version of the full conversation.' },
    },
    {
      name: 'messages',
      type: 'json',
      admin: { description: 'Structured transcript: each turn with role and source (user / flow / ai / system).' },
    },
    { name: 'messageCount', type: 'number', defaultValue: 0 },
    {
      name: 'leadCaptured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'True if this conversation produced a captured lead.' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
      ],
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'ai_chatbot',
      admin: { description: 'Conversation source for CRM segmentation.' },
    },
    { name: 'startedAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'endedAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}
