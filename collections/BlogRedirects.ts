import type { CollectionConfig } from 'payload'
import { adminOnly } from './blogAccess.ts'

export const BlogRedirects: CollectionConfig = {
  slug: 'blog-redirects',
  lockDocuments: false,
  admin: {
    group: 'Insights',
    useAsTitle: 'fromPath',
    defaultColumns: ['fromPath', 'toPath', 'statusCode', 'active', 'updatedAt'],
    description: 'Managed legacy blog redirects for old URLs and campaign links.',
  },
  access: {
    read: adminOnly,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'fromPath',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Old path, for example /blog/old-post.',
      },
    },
    {
      name: 'toPath',
      type: 'text',
      required: true,
      admin: {
        description: 'New destination, for example /insights/new-post.',
      },
    },
    {
      name: 'statusCode',
      type: 'select',
      required: true,
      defaultValue: '301',
      options: [
        { label: '301 Permanent', value: '301' },
        { label: '302 Temporary', value: '302' },
      ],
    },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'notes', type: 'textarea' },
  ],
}
