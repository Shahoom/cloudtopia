import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
} from 'payload'
import { revalidateCmsTags } from '../lib/cms/revalidate.ts'
import { slugify } from '../lib/blog/utils.ts'
import { adminOnly } from './blogAccess.ts'

const normalizeSeries: CollectionBeforeValidateHook = ({ data }) => {
  const next = { ...(data || {}) } as Record<string, unknown>
  if (!next.slug && typeof next.title === 'string') {
    next.slug = slugify(next.title)
  }
  return next
}

const revalidateBlog: CollectionAfterChangeHook = async ({ doc }) => {
  await revalidateCmsTags(['cms-blog'])
  return doc
}

const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await revalidateCmsTags(['cms-blog'])
  return doc
}

export const BlogSeries: CollectionConfig = {
  slug: 'blog-series',
  lockDocuments: false,
  admin: {
    group: 'Insights',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured', 'order', 'updatedAt'],
    description: 'Multi-part CloudTopia guide series for deep editorial programs.',
  },
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [normalizeSeries],
    afterChange: [revalidateBlog],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used for series URLs and article series boxes.',
      },
    },
    { name: 'description', type: 'textarea' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'blog-posts' as any,
      hasMany: true,
      admin: {
        description: 'Order these manually to create previous/next reading paths.',
      },
    },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
        { name: 'noIndex', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
