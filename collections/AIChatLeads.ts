import type { CollectionConfig } from 'payload'
import { adminOnly } from './blogAccess.ts'

export const AIChatLeads: CollectionConfig = {
  slug: 'ai-chat-leads',
  lockDocuments: false,
  admin: {
    group: 'CRM',
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'country', 'ipAddress', 'serviceNeeded', 'budgetRange', 'status', 'createdAt'],
    description: 'Qualified sales/support inquiries captured by the CloudTopia AI chatbot.',
  },
  access: {
    read: adminOnly,
    // NOT public: lib/ai-chatbot/leadService.ts writes with `overrideAccess:
    // true`, so REST create was never needed — it only let anyone inject
    // unvalidated leads straight into the table.
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'ipAddress', type: 'text', admin: { readOnly: true, description: 'Visitor IP captured from the request (x-forwarded-for).' } },
    { name: 'businessType', type: 'text' },
    { name: 'serviceNeeded', type: 'text' },
    { name: 'budgetRange', type: 'text' },
    { name: 'timeline', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    { name: 'pageUrl', type: 'text' },
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
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal CRM notes — visible only in the admin panel.',
      },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'ai_chatbot',
      admin: {
        description: 'Lead source for CRM segmentation.',
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
