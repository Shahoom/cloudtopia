import type { CollectionAfterChangeHook, CollectionBeforeValidateHook, CollectionConfig } from 'payload'
import { isAutoTranslationConfigured, translatePayload } from '../lib/cms/auto-translate.ts'
import { revalidateCmsTags } from '../lib/cms/revalidate.ts'
import { slugify } from '../lib/blog/utils.ts'
import { adminOnly } from './blogAccess.ts'

const normalizeAuthor: CollectionBeforeValidateHook = ({ data }) => {
  const next = { ...(data || {}) } as Record<string, unknown>
  if (!next.slug && typeof next.name === 'string') {
    next.slug = slugify(next.name)
  }
  return next
}

const autoLocalizeAuthor: CollectionAfterChangeHook = async ({ doc, req }) => {
  await revalidateCmsTags(['cms-dictionary'])

  if ((req.context as Record<string, unknown> | undefined)?.skipAutoTranslate) return doc
  if (!isAutoTranslationConfigured()) return doc

  const roleEn = doc?.role?.en
  const bioEn = doc?.bio?.en
  if (!roleEn && !bioEn) return doc

  const source = {
    ...(roleEn ? { role: roleEn } : {}),
    ...(bioEn ? { bio: bioEn } : {}),
  }

  const ar = await translatePayload(source, 'ar')

  await req.payload.update({
    collection: 'authors',
    id: doc.id,
    data: {
      role: {
        en: roleEn || '',
        ar: (ar as any).role || doc?.role?.ar || '',
      },
      bio: {
        en: bioEn || '',
        ar: (ar as any).bio || doc?.bio?.ar || '',
      },
    },
    overrideAccess: true,
    req,
    context: { skipAutoTranslate: true },
  } as any)

  return doc
}

export const Authors: CollectionConfig = {
  slug: 'authors',
  lockDocuments: false,
  admin: {
    group: 'Insights',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role.en', 'showProfile', 'updatedAt'],
    description: 'CloudTopia authors and editorial profiles for article bylines and author archive pages.',
  },
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [normalizeAuthor],
    afterChange: [autoLocalizeAuthor],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description: 'Auto-generated from the name when empty. Used in /articles/author/[slug].',
              },
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              label: 'Avatar',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'role',
              type: 'group',
              fields: [
                { name: 'en', type: 'text' },
                { name: 'ar', type: 'text' },
              ],
            },
            {
              name: 'shortBio',
              type: 'textarea',
              admin: {
                description: 'Compact author card biography.',
              },
            },
            {
              name: 'bio',
              type: 'group',
              fields: [
                { name: 'en', type: 'textarea' },
                { name: 'ar', type: 'textarea' },
              ],
            },
            { name: 'email', type: 'email' },
            {
              name: 'showProfile',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show this author on public article and author archive pages.',
              },
            },
          ],
        },
        {
          label: 'Expertise & Social',
          fields: [
            {
              name: 'expertise',
              type: 'array',
              labels: {
                singular: 'Expertise Area',
                plural: 'Expertise Areas',
              },
              fields: [{ name: 'area', type: 'text', required: true }],
            },
            {
              name: 'knowsAbout',
              type: 'array',
              fields: [{ name: 'topic', type: 'text', required: true }],
            },
            { name: 'linkedinUrl', type: 'text', label: 'LinkedIn URL' },
            { name: 'xUrl', type: 'text', label: 'X / Twitter URL' },
            { name: 'websiteUrl', type: 'text', label: 'Website URL' },
            {
              name: 'sameAs',
              type: 'array',
              fields: [{ name: 'url', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'authorSEO',
              type: 'group',
              fields: [
                { name: 'metaTitle', type: 'text' },
                { name: 'metaDescription', type: 'textarea' },
                { name: 'ogImage', type: 'upload', relationTo: 'media' },
                { name: 'noIndex', type: 'checkbox', defaultValue: false },
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
        },
      ],
    },
  ],
}
