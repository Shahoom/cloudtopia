import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
} from 'payload'
import { revalidateCmsTags } from '../lib/cms/revalidate.ts'
import { slugify } from '../lib/blog/utils.ts'
import { adminOnly } from './blogAccess.ts'

const normalizeCategory: CollectionBeforeValidateHook = ({ data }) => {
  const next = { ...(data || {}) } as Record<string, unknown>
  if (!next.slug && typeof next.name === 'string') {
    next.slug = slugify(next.name)
  }
  return next
}

const revalidateBlogTaxonomy: CollectionAfterChangeHook = async ({ doc }) => {
  await revalidateCmsTags(['cms-blog'])
  return doc
}

const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await revalidateCmsTags(['cms-blog'])
  return doc
}

export const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  lockDocuments: false,
  admin: {
    group: 'Insights',
    useAsTitle: 'name',
    defaultColumns: ['name', 'locale', 'slug', 'featured', 'order'],
    description: 'Editorial topics for CloudTopia Articles. Categories power filters, archive pages, and article badges.',
  },
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [normalizeCategory],
    afterChange: [revalidateBlogTaxonomy],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
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
                description: 'Use English for the main /articles route. Arabic powers localized archive pages.',
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
                description: 'Auto-generated from the name when empty. Used in /articles/category/[slug].',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'Short archive-page description and SEO fallback.',
              },
            },
            {
              name: 'shortDescription',
              type: 'text',
              admin: {
                description: 'Compact category-card copy.',
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Optional category visual for archive and category cards.',
              },
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Optional icon keyword, for example "cloud", "automation", or "ai".',
              },
            },
            {
              name: 'color',
              type: 'text',
              defaultValue: '#0284c7',
              admin: {
                description: 'Optional accent color used for subtle UI details.',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              admin: {
                description: 'Optional flat SEO title for editors who prefer quick fields. The SEO group below remains the canonical metadata source.',
              },
            },
            { name: 'seoDescription', type: 'textarea' },
            {
              name: 'seo',
              type: 'group',
              fields: [
                { name: 'metaTitle', type: 'text' },
                { name: 'metaDescription', type: 'textarea' },
                { name: 'keywords', type: 'text' },
                { name: 'canonicalUrl', type: 'text' },
                { name: 'ogImage', type: 'upload', relationTo: 'media' },
                { name: 'noIndex', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            {
              name: 'parentCategory',
              type: 'relationship',
              relationTo: 'blog-categories' as any,
              admin: {
                description: 'Optional parent topic for future nested navigation.',
              },
            },
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Lower numbers appear first in category lists.',
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Featured categories appear in the Articles hub topic section.',
              },
            },
            {
              name: 'showInNavigation',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show this topic in Articles filters and topic navigation.',
              },
            },
            {
              name: 'categoryCTA',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'buttonText', type: 'text' },
                { name: 'buttonUrl', type: 'text' },
              ],
            },
            {
              name: 'relatedServices',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
