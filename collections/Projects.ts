import type {
  CollectionAfterChangeHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
  PayloadRequest,
} from 'payload'
import { shouldRunAutoTranslate, translatePayload } from '../lib/cms/auto-translate.ts'
import { revalidateCmsTags } from '../lib/cms/revalidate.ts'
import { adminOnly } from './blogAccess.ts'

const normalizeProjectBeforeValidate: CollectionBeforeValidateHook = async ({ data, req }) => {
  const next = { ...(data || {}) } as Record<string, any>
  const locale = String(next.locale || 'en')
  const publicId = publicProjectId(next)

  if (!next.id) next.id = `${locale}:${publicId}`
  if (!next.cmsKey) next.cmsKey = `${locale}:${publicId}`

  if (next.imageMedia) {
    const mediaId = typeof next.imageMedia === 'object' ? next.imageMedia.id : next.imageMedia
    const media = await getMedia(req, mediaId)
    if (media?.url) {
      // Payload stores URLs as `/api/media/file/X` but files are served from
      // `public/uploads/` → `/uploads/X`. Normalize for the public site.
      const apiPrefix = '/api/media/file/'
      next.image = media.url.startsWith(apiPrefix)
        ? '/uploads/' + decodeURIComponent(media.url.slice(apiPrefix.length))
        : media.url
    }
  }

  return next
}

function cleanFeatures(features: any[]) {
  if (!Array.isArray(features)) return []
  return features.map((f) => ({
    feature: typeof f === 'object' && f !== null ? (f.feature || '') : String(f)
  }))
}

const autoLocalizeProject: CollectionAfterChangeHook = async ({ doc, req }) => {
  await revalidateCmsTags(['cms-projects'])

  if (!shouldRunAutoTranslate(req, doc)) return doc

  const publicId = publicProjectId(doc)
  const source = {
    category: doc.category,
    type: doc.type,
    title: doc.title,
    problem: doc.problem,
    solution: doc.solution,
    features: doc.features || [],
    metrics: {
      label: doc.metrics?.label || '',
    },
  }

  await Promise.all(
    (['ar'] as const).map(async (locale) => {
      const translated = await translatePayload(source, locale)
      const targetId = `${locale}:${publicId}`
      const data = {
        id: targetId,
        locale,
        cmsKey: targetId,
        category: translated.category || doc.category,
        type: translated.type || doc.type,
        featured: doc.featured,
        title: translated.title || doc.title,
        problem: translated.problem || doc.problem,
        solution: translated.solution || doc.solution,
        features: cleanFeatures(translated.features || doc.features || []),
        image: doc.image,
        imageMedia: typeof doc.imageMedia === 'object' ? doc.imageMedia.id : doc.imageMedia,
        metrics: {
          label: translated.metrics?.label || doc.metrics?.label || '',
          value: doc.metrics?.value || '',
        },
        link: doc.link || '',
      }

      const existing = await req.payload.find({
        collection: 'projects',
        depth: 0,
        limit: 1,
        overrideAccess: true,
        req,
        where: {
          cmsKey: {
            equals: targetId,
          },
        },
      })

      if (existing.docs[0]?.id) {
        const { id: _, ...updateData } = data
        await req.payload.update({
          collection: 'projects',
          id: existing.docs[0].id,
          data: updateData,
          overrideAccess: true,
          req,
          context: { skipAutoTranslate: true },
        } as any)
      } else {
        await req.payload.create({
          collection: 'projects',
          data,
          overrideAccess: true,
          req,
          context: { skipAutoTranslate: true },
        } as any)
      }
    }),
  )

  await revalidateCmsTags(['cms-projects'])
  return doc
}

async function getMedia(req: PayloadRequest, id: unknown) {
  if (!id) return null

  try {
    return await req.payload.findByID({
      collection: 'media',
      id: String(id),
      depth: 0,
      overrideAccess: true,
      req,
    })
  } catch {
    return null
  }
}

function publicProjectId(project: Record<string, any>) {
  const cmsKey = typeof project.cmsKey === 'string' ? project.cmsKey : ''
  const id = typeof project.id === 'string' ? project.id : ''
  const title = typeof project.title === 'string' ? project.title : 'project'
  const raw = cmsKey.includes(':') ? cmsKey.split(':').slice(1).join(':') : id.includes(':') ? id.split(':').slice(1).join(':') : id || title
  return slugify(raw || title)
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'project'
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  lockDocuments: false,
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'locale', 'category', 'featured'],
    components: {
      views: {
        list: {
          Component: '@/components/payload/FastCollectionLists#FastProjectsListView',
        },
      },
    },
  },
  hooks: {
    beforeValidate: [normalizeProjectBeforeValidate],
    afterChange: [autoLocalizeProject],
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
      name: 'cmsKey',
      type: 'text',
      required: false,
      unique: true,
      admin: {
        description: 'Auto-generated in the format locale:project-id when left empty.',
      },
    },
    {
      name: 'id',
      type: 'text',
      required: false,
      admin: {
        description: 'Auto-generated from locale and title when left empty.',
      },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
    },
    {
      name: 'relatedServiceSlugs',
      type: 'text',
      required: false,
      admin: {
        description:
          'Comma-separated service/pillar slugs this project showcases (e.g. "website-development, corporate-website-development"). Drives the “Projects we did” section on those service pages.',
      },
    },
    {
      name: 'type',
      type: 'text',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'problem',
      type: 'textarea',
      required: true,
    },
    {
      name: 'solution',
      type: 'textarea',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
    {
      name: 'image',
      type: 'text',
      required: false,
      admin: {
        description: 'Fallback public image URL. Choosing Project Media below fills this automatically.',
      },
    },
    {
      name: 'imageMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload or choose a project image. Payload stores it in Media and the public site uses its URL.',
      },
    },
    {
      name: 'metrics',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'value', type: 'text' },
      ],
    },
    {
      name: 'link',
      type: 'text',
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
