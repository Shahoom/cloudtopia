import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
  Field,
} from 'payload'
import { blogRichTextEditor } from '../lib/cms/blog-rich-text.ts'
import { ensureBlogPair } from '../lib/cms/blog-pair-endpoint.ts'
import { revalidateCmsTags } from '../lib/cms/revalidate.ts'
import { calculateReadingTime, extractLexicalPlainText, slugify } from '../lib/blog/utils.ts'
import { calculateBlogContentScores } from '../lib/blog/intelligence.ts'
import { adminOnly, publishedOrAdmin } from './blogAccess.ts'
import { blogContentBlocks } from './blogBlocks.ts'

const statusOptions = [
  { label: 'Idea', value: 'idea' },
  { label: 'Outline', value: 'outline' },
  { label: 'Draft', value: 'draft' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
]

const contentTypeOptions = [
  { label: 'Guide', value: 'guide' },
  { label: 'Article', value: 'article' },
  { label: 'Case Study', value: 'case_study' },
  { label: 'Checklist', value: 'checklist' },
  { label: 'Comparison', value: 'comparison' },
  { label: 'Tutorial', value: 'tutorial' },
  { label: 'Opinion', value: 'opinion' },
  { label: 'News', value: 'news' },
]

const targetAudienceOptions = [
  { label: 'Startups', value: 'startups' },
  { label: 'Small Businesses', value: 'small_businesses' },
  { label: 'Medium Businesses', value: 'medium_businesses' },
  { label: 'Real Estate', value: 'real_estate' },
  { label: 'Clinics', value: 'clinics' },
  { label: 'Ecommerce', value: 'ecommerce' },
  { label: 'Service Companies', value: 'service_companies' },
  { label: 'Founders', value: 'founders' },
  { label: 'Developers', value: 'developers' },
]

const serviceFocusOptions = [
  { label: 'Websites', value: 'websites' },
  { label: 'Web Apps', value: 'web_apps' },
  { label: 'CRM', value: 'crm' },
  { label: 'ERP', value: 'erp' },
  { label: 'Automation', value: 'automation' },
  { label: 'AI', value: 'ai' },
  { label: 'Cloud', value: 'cloud' },
  { label: 'Digital Presence', value: 'digital_presence' },
  { label: 'Business Systems', value: 'business_systems' },
]

const normalizePost: CollectionBeforeValidateHook = ({ data, originalDoc }) => {
  const next = { ...(data || {}) } as Record<string, any>

  if (!next.slug && typeof next.title === 'string') {
    next.slug = slugify(next.title)
  }

  const status = next.status || originalDoc?.status
  if (status === 'published' && !next.publishedAt && !originalDoc?.publishedAt) {
    next.publishedAt = new Date().toISOString()
  }

  const content = next.content || originalDoc?.content
  const contentBlocks = next.contentBlocks || originalDoc?.contentBlocks || []
  if (content) {
    next.readingTime = calculateReadingTime(content)
    next.wordCount = extractLexicalPlainText(content).split(/\s+/).filter(Boolean).length

    const scores = calculateBlogContentScores({
      title: next.title || originalDoc?.title,
      excerpt: next.excerpt || originalDoc?.excerpt,
      focusKeyword: next.seo?.focusKeyword || originalDoc?.seo?.focusKeyword,
      metaTitle: next.seo?.metaTitle || originalDoc?.seo?.metaTitle,
      metaDescription: next.seo?.metaDescription || originalDoc?.seo?.metaDescription,
      coverImageAlt: next.featuredImageAlt || originalDoc?.featuredImageAlt,
      category: next.category || originalDoc?.category,
      author: next.author || originalDoc?.author,
      publishedAt: next.publishedAt || originalDoc?.publishedAt,
      showCTA: next.showCTA ?? originalDoc?.showCTA,
      content,
      contentBlocks,
      tags: next.tags || originalDoc?.tags,
      internalLinks: next.internalLinksSuggestions || originalDoc?.internalLinksSuggestions,
    })
    next.contentScore = scores.contentScore
    next.seoScore = scores.seoScore
    next.readabilityScore = scores.readabilityScore
  }

  return next
}

const revalidateBlogPosts: CollectionAfterChangeHook = async ({ doc }) => {
  await revalidateCmsTags(['cms-blog'])
  return doc
}

const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await revalidateCmsTags(['cms-blog'])
  return doc
}

const ensureArabicCounterpart: CollectionAfterChangeHook = async ({ doc, req, context }) => {
  if ((context as Record<string, unknown> | undefined)?.skipBlogPairSync) return doc
  if (doc?.locale !== 'en' || !doc?.slug) return doc

  try {
    await ensureBlogPair({ payload: req.payload, source: doc, req })
  } catch (error) {
    console.error('[blog-pair] automatic Arabic draft creation failed', {
      sourceId: doc.id,
      slug: doc.slug,
      error: error instanceof Error ? error.message : String(error),
    })
  }

  return doc
}

// Articles are two paired documents that share a slug across locales. When the
// cover image (or its alt text) is set/changed on one locale, mirror it to the
// sibling so an editor only uploads once. Runs both directions; guarded by a
// context flag so the sibling's own afterChange doesn't mirror back (infinite
// loop). Mirrors in the same draft/published mode as the doc being saved.
const relId = (v: unknown): number | null => (v && typeof v === 'object' ? ((v as any).id ?? null) : ((v as any) ?? null))

const mirrorCoverImage: CollectionAfterChangeHook = async ({ doc, previousDoc, req, context }) => {
  if ((context as Record<string, unknown> | undefined)?.skipCoverMirror) return doc
  if (!doc?.slug || !doc?.locale) return doc

  const newCover = relId(doc.coverImage)
  const newAlt = (doc.featuredImageAlt as string | null) ?? null
  const changed = newCover !== relId(previousDoc?.coverImage) || newAlt !== ((previousDoc?.featuredImageAlt as string | null) ?? null)
  if (!changed) return doc

  const otherLocale = doc.locale === 'ar' ? 'en' : 'ar'
  try {
    const siblings = await req.payload.find({
      collection: 'blog-posts' as any,
      where: { and: [{ slug: { equals: doc.slug } }, { locale: { equals: otherLocale } }] },
      limit: 1,
      depth: 0,
      draft: true,
      overrideAccess: true,
      req,
    })
    const sibling = siblings.docs[0] as any
    if (!sibling) return doc
    if (relId(sibling.coverImage) === newCover && ((sibling.featuredImageAlt as string | null) ?? null) === newAlt) return doc

    await req.payload.update({
      collection: 'blog-posts' as any,
      id: sibling.id,
      data: { coverImage: newCover, featuredImageAlt: newAlt ?? undefined },
      draft: (doc as any)._status !== 'published',
      overrideAccess: true,
      req,
      context: { skipCoverMirror: true, skipAutoTranslate: true },
    })
  } catch {
    // Non-fatal: never let mirroring block the primary save.
  }
  return doc
}

const serviceLinksField: Field = {
  name: 'relatedServices',
  type: 'array',
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'url', type: 'text', required: true },
  ],
}

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  lockDocuments: false,
  // An article's translations share one slug across locales (the article-page
  // hreflang map is built from a single slug for both en and ar). So slug is
  // unique per-locale, not globally — enforced by this composite index.
  indexes: [{ fields: ['slug', 'locale'], unique: true }],
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  admin: {
    group: 'Insights',
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'category', 'author', 'featured', 'publishedAt', 'seoScore', 'contentScore'],
    listSearchableFields: ['title', 'slug', 'excerpt', 'shortExcerpt', 'seo.focusKeyword'],
    description: 'CloudTopia Articles editorial dashboard. Drafts stay private; published posts appear on /articles.',
    preview: (doc) => `/articles/${doc?.slug || ''}?preview=1`,
  },
  access: {
    read: publishedOrAdmin,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [normalizePost],
    afterChange: [mirrorCoverImage, ensureArabicCounterpart, revalidateBlogPosts],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'languageToggle',
      type: 'ui',
      admin: {
        position: 'default',
        components: {
          Field: '@/components/payload/BlogLanguageToggle#BlogLanguageToggle',
        },
      },
    },
    {
      name: 'importStructure',
      type: 'ui',
      admin: {
        position: 'default',
        components: {
          Field: '@/components/payload/BlogImportStructure#BlogImportStructure',
        },
      },
    },
    {
      name: 'optimizeSeo',
      type: 'ui',
      admin: {
        position: 'default',
        components: {
          Field: '@/components/payload/BlogOptimizeButton#BlogOptimizeButton',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'slug',
              type: 'text',
              required: true,
              // Not globally unique: translations of one article share a slug
              // across locales (see the composite (slug, locale) index above).
              admin: {
                description: 'Auto-generated from the title when empty. Translations of the same article share this slug across locales.',
              },
            },
            { name: 'subtitle', type: 'text' },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
            },
            {
              name: 'shortExcerpt',
              type: 'text',
            },
            {
              type: 'row',
              fields: [
                { name: 'featured', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
                { name: 'pinned', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
                { name: 'editorPick', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
                { name: 'trending', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'contentType', type: 'select', defaultValue: 'article', options: contentTypeOptions, admin: { width: '33%' } },
                { name: 'targetAudience', type: 'select', options: targetAudienceOptions, admin: { width: '33%' } },
                { name: 'serviceFocus', type: 'select', options: serviceFocusOptions, admin: { width: '33%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'difficulty',
                  type: 'select',
                  defaultValue: 'beginner',
                  options: [
                    { label: 'Beginner', value: 'beginner' },
                    { label: 'Intermediate', value: 'intermediate' },
                    { label: 'Advanced', value: 'advanced' },
                  ],
                  admin: { width: '50%' },
                },
                { name: 'readingTime', type: 'number', defaultValue: 1, admin: { readOnly: true, width: '25%' } },
                { name: 'wordCount', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '25%' } },
              ],
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              editor: blogRichTextEditor,
            },
          ],
        },
        {
          label: 'Blocks',
          fields: [
            {
              name: 'contentBlocks',
              type: 'blocks',
              blocks: blogContentBlocks,
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoPreview',
              type: 'ui',
              admin: { components: { Field: '@/components/payload/BlogSEOPreview#BlogSEOPreview' } },
            },
            {
              name: 'seo',
              type: 'group',
              fields: [
                { name: 'metaTitle', type: 'text' },
                { name: 'metaDescription', type: 'textarea' },
                { name: 'focusKeyword', type: 'text' },
                { name: 'canonicalUrl', type: 'text' },
                { name: 'ogImage', type: 'upload', relationTo: 'media' },
                { name: 'noIndex', type: 'checkbox', defaultValue: false },
                { name: 'noFollow', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
        {
          label: 'AI & Performance',
          fields: [
            {
              name: 'aiAssistantPanel',
              type: 'ui',
              admin: { components: { Field: '@/components/payload/BlogAIAssistantPanel#BlogAIAssistantPanel' } },
            },
            {
              name: 'contentScorePanel',
              type: 'ui',
              admin: { components: { Field: '@/components/payload/BlogContentScorePanel#BlogContentScorePanel' } },
            },
            {
              // These are computed in normalizePost. They MUST be declared as
              // fields or Payload strips the hook's values before the DB write
              // (the seo_score/content_score columns already exist) — which is
              // why the SEO score always read 0.
              type: 'row',
              fields: [
                { name: 'seoScore', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '50%' } },
                { name: 'contentScore', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'aiGenerated', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
                { name: 'aiAssisted', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
                { name: 'readabilityScore', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '25%' } },
                { name: 'estimatedRankingDifficulty', type: 'number', admin: { width: '25%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'viewsCount', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '33%' } },
                { name: 'uniqueViewsCount', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '33%' } },
                { name: 'averageReadTime', type: 'number', admin: { readOnly: true, width: '33%' } },
              ],
            },
          ],
        },
        {
          label: 'Conversion',
          fields: [
            { name: 'showCTA', type: 'checkbox', defaultValue: true },
            { name: 'ctaTitle', type: 'text' },
            { name: 'ctaDescription', type: 'textarea' },
            {
              type: 'row',
              fields: [
                { name: 'ctaButtonText', type: 'text', defaultValue: 'Talk to CloudTopia', admin: { width: '50%' } },
                { name: 'ctaButtonUrl', type: 'text', defaultValue: '/contact', admin: { width: '50%' } },
              ],
            },
            { name: 'leadMagnetFile', type: 'upload', relationTo: 'media' },
            serviceLinksField,
          ],
        },
        {
          label: 'Relationships',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'blog-categories' as any,
              required: true,
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'blog-tags' as any,
              hasMany: true,
            },
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'blog-posts' as any,
              hasMany: true,
            },
            { name: 'series', type: 'relationship', relationTo: 'blog-series' as any },
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: statusOptions,
      admin: { position: 'sidebar' },
    },
    {
      name: 'locale',
      type: 'select',
      required: true,
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Arabic', value: 'ar' },
      ],
      // Read-only: the language is set on creation and switched via the
      // EN ⇄ AR toggle at the top of the editor. Editing it by hand could
      // collide with the paired sibling and violate the (slug, locale) index.
      admin: { position: 'sidebar', readOnly: true, description: 'Set by the language toggle at the top of the editor.' },
    },
    {
      name: 'approvalStatus',
      type: 'select',
      defaultValue: 'not_required',
      options: [
        { label: 'Not Required', value: 'not_required' },
        { label: 'Waiting', value: 'waiting' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'scheduledAt', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      admin: { position: 'sidebar' },
    },
    { name: 'coAuthors', type: 'relationship', relationTo: 'authors', hasMany: true, admin: { position: 'sidebar' } },
    {
      name: 'coverImage',
      label: 'Featured / cover image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'featuredImageAlt',
      type: 'text',
      admin: { position: 'sidebar' },
    },
  ],
}
