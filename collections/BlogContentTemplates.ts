import type {
  CollectionBeforeValidateHook,
  CollectionConfig,
} from 'payload'
import { slugify } from '../lib/blog/utils.ts'
import { adminOnly } from './blogAccess.ts'

const normalizeTemplate: CollectionBeforeValidateHook = ({ data }) => {
  const next = { ...(data || {}) } as Record<string, unknown>
  if (!next.slug && typeof next.name === 'string') {
    next.slug = slugify(next.name)
  }
  return next
}

export const BlogContentTemplates: CollectionConfig = {
  slug: 'blog-content-templates',
  lockDocuments: false,
  admin: {
    group: 'Insights',
    useAsTitle: 'name',
    defaultColumns: ['name', 'contentType', 'targetAudience', 'updatedAt'],
    // NOT YET WIRED: no consumer reads these templates (not the AI generator,
    // not the editorial dashboard). Hidden from nav to avoid wasted editor
    // effort. The table/migration is intentionally kept for future wiring.
    hidden: true,
    description:
      'NOT YET WIRED — these templates are not read by the AI generator or dashboard yet. Hidden until wired.',
  },
  access: {
    read: adminOnly,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [normalizeTemplate],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'contentType',
      type: 'select',
      options: [
        { label: 'Guide', value: 'guide' },
        { label: 'Article', value: 'article' },
        { label: 'Case Study', value: 'case_study' },
        { label: 'Checklist', value: 'checklist' },
        { label: 'Comparison', value: 'comparison' },
        { label: 'Tutorial', value: 'tutorial' },
        { label: 'Opinion', value: 'opinion' },
        { label: 'News', value: 'news' },
      ],
    },
    { name: 'defaultOutline', type: 'textarea' },
    {
      name: 'recommendedBlocks',
      type: 'array',
      fields: [
        {
          name: 'blockType',
          type: 'text',
          required: true,
        },
        { name: 'notes', type: 'text' },
      ],
    },
    {
      name: 'defaultCTA',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'buttonText', type: 'text' },
        { name: 'buttonUrl', type: 'text' },
      ],
    },
    {
      name: 'seoChecklist',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'targetAudience',
      type: 'select',
      options: [
        { label: 'Startups', value: 'startups' },
        { label: 'Small Businesses', value: 'small_businesses' },
        { label: 'Medium Businesses', value: 'medium_businesses' },
        { label: 'Real Estate', value: 'real_estate' },
        { label: 'Clinics', value: 'clinics' },
        { label: 'Ecommerce', value: 'ecommerce' },
        { label: 'Service Companies', value: 'service_companies' },
        { label: 'Founders', value: 'founders' },
        { label: 'Developers', value: 'developers' },
      ],
    },
  ],
}
