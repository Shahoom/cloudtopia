import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import { revalidateCmsTags } from '../lib/cms/revalidate.ts'

const revalidateSiteContent: CollectionAfterChangeHook = async ({ doc }) => {
  await revalidateCmsTags(['cms-dictionary', 'cms-pages'])
  return doc
}

export const SiteContent: CollectionConfig = {
  slug: 'site-content',
  lockDocuments: false,
  admin: {
    group: 'Content',
    useAsTitle: 'locale',
    defaultColumns: ['locale', 'updatedAt'],
    components: {
      views: {
        list: {
          Component: '@/components/payload/FastCollectionLists#FastSiteContentListView',
        },
      },
    },
  },
  hooks: {
    afterChange: [revalidateSiteContent],
  },
  fields: [
    {
      name: 'locale',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'English', value: 'en' },
        { label: 'Arabic', value: 'ar' },
        { label: 'Turkish', value: 'tr' },
      ],
    },
    {
      name: 'dictionary',
      type: 'json',
      required: true,
      admin: {
        description: 'Full structured site dictionary for this locale. Seeded from the existing translation files.',
      },
    },
  ],
}
