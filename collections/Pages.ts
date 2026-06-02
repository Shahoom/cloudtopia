import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import { shouldRunAutoTranslate, translatePayload } from '../lib/cms/auto-translate.ts'
import { publicPathForSlug, syncDictionaryWithPage, templateForSlug } from '../lib/cms/page-structure.ts'
import { revalidateCmsTags } from '../lib/cms/revalidate.ts'

const syncPageToSiteContent: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (!doc?.locale) return doc

  const result = await req.payload.find({
    collection: 'site-content',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    req,
    where: {
      locale: {
        equals: doc.locale,
      },
    },
  })

  const siteContent = result.docs[0]
  if (!siteContent?.id || !siteContent.dictionary) return doc

  await req.payload.update({
    collection: 'site-content',
    id: siteContent.id,
    data: {
      dictionary: syncDictionaryWithPage(siteContent.dictionary as Record<string, unknown>, doc),
    },
    overrideAccess: true,
    req,
  })

  return doc
}

const autoLocalizePage: CollectionAfterChangeHook = async ({ doc, req }) => {
  await revalidateCmsTags(['cms-pages', 'cms-dictionary'])

  if (!shouldRunAutoTranslate(req, doc)) return doc

  const source = {
    title: doc.title,
    hero: doc.hero || {},
    cta: doc.cta || {},
    seo: doc.seo || {},
    sections: doc.sections || {},
  }

  await Promise.all(
    (['ar'] as const).map(async (locale) => {
      const translated = await translatePayload(source, locale)
      const data = {
        locale,
        slug: doc.slug,
        title: translated.title || doc.title,
        template: doc.template,
        publicPath: publicPathForSlug(locale, doc.slug),
        status: doc.status,
        hero: translated.hero || doc.hero || {},
        cta: translated.cta || doc.cta || {},
        seo: translated.seo || doc.seo || {},
        sections: translated.sections || doc.sections || {},
        design: doc.design || {},
        editorNotes: doc.editorNotes || '',
      }

      const existing = await req.payload.find({
        collection: 'pages',
        depth: 0,
        limit: 1,
        overrideAccess: true,
        req,
        where: {
          and: [
            { locale: { equals: locale } },
            { slug: { equals: doc.slug } },
          ],
        },
      })

      if (existing.docs[0]?.id) {
        await req.payload.update({
          collection: 'pages',
          id: existing.docs[0].id,
          data,
          overrideAccess: true,
          req,
          context: { skipAutoTranslate: true },
        } as any)
      } else {
        await req.payload.create({
          collection: 'pages',
          data,
          overrideAccess: true,
          req,
          context: { skipAutoTranslate: true },
        } as any)
      }
    }),
  )

  await revalidateCmsTags(['cms-pages', 'cms-dictionary'])
  return doc
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  lockDocuments: false,
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'locale', 'slug', 'template', 'status'],
    description: 'Structured public page controls. Hero and CTA fields sync back into the live locale dictionary on save.',
    components: {
      views: {
        list: {
          Component: '@/components/payload/FastCollectionLists#FastPagesListView',
        },
      },
    },
  },
  hooks: {
    afterChange: [syncPageToSiteContent, autoLocalizePage],
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
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        description: 'Route path without locale, for example "/", "services", or "website-design".',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'template',
      type: 'select',
      required: true,
      defaultValue: 'content',
      hooks: {
        beforeValidate: [
          ({ data, value }) => value || templateForSlug(String(data?.slug || '/')),
        ],
      },
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Services Overview', value: 'services' },
        { label: 'Service Detail', value: 'service-detail' },
        { label: 'Projects', value: 'projects' },
        { label: 'About', value: 'about' },
        { label: 'Contact', value: 'contact' },
        { label: 'Labs', value: 'labs' },
        { label: 'Legal', value: 'legal' },
        { label: 'Blog Coming Soon', value: 'blog-coming-soon' },
        { label: 'Content', value: 'content' },
      ],
      admin: {
        description: 'Controls how the public route interprets the structured sections below.',
      },
    },
    {
      name: 'publicPath',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Preview path generated from locale and slug.',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) =>
            value || publicPathForSlug(String(data?.locale || 'en'), String(data?.slug || '/')),
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      admin: {
        description: 'Primary visible hero copy for this route. Saving this page updates the live locale dictionary.',
      },
      fields: [
        { name: 'badge', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'titleHighlight', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'primaryLabel', type: 'text' },
        { name: 'primaryHref', type: 'text' },
        { name: 'secondaryLabel', type: 'text' },
        { name: 'secondaryHref', type: 'text' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      admin: {
        description: 'Default call-to-action used by the route and editorial previews.',
      },
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
        { name: 'secondaryLabel', type: 'text' },
        { name: 'secondaryHref', type: 'text' },
      ],
    },
    {
      name: 'seo',
      type: 'json',
      required: true,
      admin: {
        description: 'SEO title, description, OG settings, schema notes, and canonical controls.',
      },
    },
    {
      name: 'sections',
      type: 'json',
      required: true,
      admin: {
        description: 'Structured section payload for this route. This must contain real section data, never placeholder instructions.',
      },
    },
    {
      name: 'design',
      type: 'json',
      required: true,
      admin: {
        description: 'Per-page layout and visual overrides.',
      },
    },
    {
      name: 'editorNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes for editors. Not rendered publicly.',
      },
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
