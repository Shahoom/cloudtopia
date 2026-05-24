import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import { isAutoTranslationConfigured, translatePayload } from '../lib/cms/auto-translate.ts'
import { revalidateCmsTags } from '../lib/cms/revalidate.ts'

const autoLocalizeFAQs: CollectionAfterChangeHook = async ({ doc, req }) => {
  await revalidateCmsTags(['cms-service-faqs'])

  if ((req.context as Record<string, unknown> | undefined)?.skipAutoTranslate) return doc
  if (!isAutoTranslationConfigured()) return doc
  if (!Array.isArray(doc?.faqs?.en) || doc.faqs.en.length === 0) return doc

  const [ar, tr] = await Promise.all([
    translatePayload(doc.faqs.en, 'ar'),
    translatePayload(doc.faqs.en, 'tr'),
  ])

  await req.payload.update({
    collection: 'service-faqs',
    id: doc.id,
    data: {
      faqs: {
        en: doc.faqs.en,
        ar,
        tr,
      },
    },
    overrideAccess: true,
    req,
    context: { skipAutoTranslate: true },
  } as any)

  await revalidateCmsTags(['cms-service-faqs'])
  return doc
}

export const ServiceFAQs: CollectionConfig = {
  slug: 'service-faqs',
  lockDocuments: false,
  admin: {
    group: 'Content',
    useAsTitle: 'serviceSlug',
    components: {
      views: {
        list: {
          Component: '@/components/payload/FastCollectionLists#FastServiceFAQsListView',
        },
      },
    },
  },
  hooks: {
    afterChange: [autoLocalizeFAQs],
  },
  fields: [
    {
      name: 'serviceSlug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'faqs',
      type: 'group',
      fields: [
        {
          name: 'en',
          type: 'array',
          fields: [
            { name: 'q', type: 'text', required: true },
            { name: 'a', type: 'textarea', required: true },
          ],
        },
        {
          name: 'ar',
          type: 'array',
          fields: [
            { name: 'q', type: 'text', required: true },
            { name: 'a', type: 'textarea', required: true },
          ],
        },
        {
          name: 'tr',
          type: 'array',
          fields: [
            { name: 'q', type: 'text', required: true },
            { name: 'a', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'translateAction',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/payload/TranslateButton#TranslateButton',
        },
      },
    },
  ],
}
