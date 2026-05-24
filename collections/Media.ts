import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  lockDocuments: false,
  upload: {
    staticDir: 'public/uploads',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  admin: {
    group: 'Content',
    useAsTitle: 'alt',
    components: {
      views: {
        list: {
          Component: '@/components/payload/FastCollectionLists#FastMediaListView',
        },
      },
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
