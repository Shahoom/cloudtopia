import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from 'payload'
import { revalidateCmsTags } from '../lib/cms/revalidate.ts'
import { adminOnly } from './blogAccess.ts'

const revalidate: CollectionAfterChangeHook = async ({ doc }) => {
  await revalidateCmsTags(['cms-pages'])
  return doc
}

const revalidateOnDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await revalidateCmsTags(['cms-pages'])
  return doc
}

// Per-route SEO overrides. Keyed by (routePath, locale). The resolver in
// lib/cms/route-seo.ts reads these and lets them win over the page's computed
// metadata, so editors can set the browser-tab title + meta description for any
// public route — including the programmatic industry/service/location pages.
export const SeoOverrides: CollectionConfig = {
  slug: 'seo-overrides',
  lockDocuments: false,
  indexes: [{ fields: ['routePath', 'locale'], unique: true }],
  admin: {
    group: 'Settings',
    useAsTitle: 'routePath',
    defaultColumns: ['routePath', 'locale', 'metaTitle', 'noIndex', 'updatedAt'],
    description: 'Per-page SEO overrides (tab title + meta description) for every public route. Edited from the SEO control center.',
  },
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    afterChange: [revalidate],
    afterDelete: [revalidateOnDelete],
  },
  fields: [
    {
      name: 'routePath',
      type: 'text',
      required: true,
      admin: { description: 'Route path without locale, e.g. "/", "services", "industries/real-estate".' },
    },
    {
      name: 'locale',
      type: 'select',
      required: true,
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Arabic', value: 'ar' },
      ],
    },
    { name: 'metaTitle', type: 'text', admin: { description: 'Browser-tab title for this route.' } },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'canonicalUrl', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'noIndex', type: 'checkbox', defaultValue: false, admin: { width: '50%' } },
        { name: 'noFollow', type: 'checkbox', defaultValue: false, admin: { width: '50%' } },
      ],
    },
  ],
}
