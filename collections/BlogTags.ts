import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
} from 'payload'
import { revalidateCmsTags } from '../lib/cms/revalidate.ts'
import { slugify } from '../lib/blog/utils.ts'
import { adminOnly } from './blogAccess.ts'

const normalizeTag: CollectionBeforeValidateHook = ({ data }) => {
  const next = { ...(data || {}) } as Record<string, unknown>
  if (!next.slug && typeof next.name === 'string') {
    next.slug = slugify(next.name)
  }
  return next
}

const revalidateTags: CollectionAfterChangeHook = async ({ doc }) => {
  await revalidateCmsTags(['cms-blog'])
  return doc
}

const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await revalidateCmsTags(['cms-blog'])
  return doc
}

export const BlogTags: CollectionConfig = {
  slug: 'blog-tags',
  lockDocuments: false,
  admin: {
    group: 'Insights',
    useAsTitle: 'name',
    defaultColumns: ['name', 'locale', 'slug'],
    description: 'Small topical labels used for article discovery and tag archive pages.',
  },
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [normalizeTag],
    afterChange: [revalidateTags],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'locale',
      type: 'select',
      required: true,
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Arabic', value: 'ar' },
      ],
      admin: {
        description: 'Match the post locale that should use this tag.',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Auto-generated from the name when empty. Used in /articles/tag/[slug].',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional tag archive description and SEO fallback.',
      },
    },
    {
      name: 'color',
      type: 'text',
      defaultValue: '#0284c7',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'seoTitle',
      type: 'text',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
    },
  ],
}
