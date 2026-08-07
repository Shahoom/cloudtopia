import type { CollectionConfig } from 'payload'
import { adminOnly } from './blogAccess.ts'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  lockDocuments: false,
  admin: {
    group: 'Insights',
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'status', 'source', 'subscribedAt'],
    description: 'Subscribers captured from the Insights newsletter form.',
  },
  access: {
    read: adminOnly,
    // NOT public: app/(frontend)/api/newsletter/route.ts writes with
    // `overrideAccess: true`, so REST create was never needed — it only let
    // anyone bulk-inject subscriber rows without going through that route.
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'insights',
      admin: {
        description: 'Where the subscriber came from. The Insights form sends "insights".',
      },
    },
    {
      name: 'interests',
      type: 'array',
      fields: [{ name: 'interest', type: 'text', required: true }],
      admin: {
        description: 'Optional topics selected from the Insights form.',
      },
    },
    {
      name: 'consent',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Tracks that the subscriber consented to receive CloudTopia insights.',
      },
    },
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Arabic', value: 'ar' },
      ],
    },
    { name: 'utmSource', type: 'text' },
    { name: 'utmCampaign', type: 'text' },
    {
      name: 'subscribedAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
        { label: 'Bounced', value: 'bounced' },
      ],
    },
  ],
}
