import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
  Field,
} from 'payload'
import {
  EXPERIMENTAL_TableFeature,
  BlocksFeature,
  CodeBlock,
  FixedToolbarFeature,
  InlineToolbarFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
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

const richTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    UploadFeature({
      enabledCollections: ['media'],
      maxDepth: 1,
    }),
    BlocksFeature({
      blocks: [CodeBlock()],
    }),
    EXPERIMENTAL_TableFeature(),
  ],
})

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
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  admin: {
    group: 'Insights',
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'category', 'author', 'featured', 'publishedAt', 'seoScore', 'contentScore'],
    listSearchableFields: ['title', 'slug', 'excerpt', 'shortExcerpt', 'seo.focusKeyword'],
    description: 'CloudTopia Insights editorial dashboard. Drafts stay private; published posts appear on /insights.',
    preview: (doc) => `/insights/${doc?.slug || ''}?preview=1`,
  },
  access: {
    read: publishedOrAdmin,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [normalizePost],
    afterChange: [revalidateBlogPosts],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'locale',
                  type: 'select',
                  required: true,
                  defaultValue: 'en',
                  options: [
                    { label: 'English', value: 'en' },
                    { label: 'Arabic', value: 'ar' },
                    { label: 'Turkish', value: 'tr' },
                  ],
                  admin: {
                    width: '33%',
                    description: 'English posts appear on /insights. Arabic and Turkish use prefixed locale routes.',
                  },
                },
                {
                  name: 'status',
                  type: 'select',
                  required: true,
                  defaultValue: 'draft',
                  options: statusOptions,
                  admin: {
                    width: '33%',
                    description: 'Workflow: idea -> outline -> draft -> in review -> scheduled -> published.',
                  },
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
                  admin: { width: '33%' },
                },
              ],
            },
            { name: 'title', type: 'text', required: true },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description: 'Auto-generated from the title when empty. Editable for SEO-safe URLs.',
              },
            },
            { name: 'subtitle', type: 'text' },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Main summary for cards, article hero, metadata fallbacks, and search results.',
              },
            },
            {
              name: 'shortExcerpt',
              type: 'text',
              admin: {
                description: 'Very short card or featured-strip teaser.',
              },
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
                { name: 'publishedAt', type: 'date', admin: { width: '25%', date: { pickerAppearance: 'dayAndTime' } } },
                { name: 'scheduledAt', type: 'date', admin: { width: '25%', date: { pickerAppearance: 'dayAndTime' } } },
                { name: 'lastReviewedAt', type: 'date', admin: { width: '25%', date: { pickerAppearance: 'dayAndTime' } } },
                {
                  name: 'difficulty',
                  type: 'select',
                  defaultValue: 'beginner',
                  options: [
                    { label: 'Beginner', value: 'beginner' },
                    { label: 'Intermediate', value: 'intermediate' },
                    { label: 'Advanced', value: 'advanced' },
                  ],
                  admin: { width: '25%' },
                },
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
                { name: 'readingTime', type: 'number', defaultValue: 1, admin: { readOnly: true, width: '25%' } },
                { name: 'wordCount', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '25%' } },
                { name: 'contentScore', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '25%' } },
                { name: 'seoScore', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '25%' } },
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
              editor: richTextEditor,
              admin: {
                description: 'Use headings, lists, quotes, images, tables, and code blocks to structure the core article.',
              },
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
              admin: {
                description: 'Structured premium article sections rendered after the rich text body.',
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'coverImage',
              label: 'Featured / cover image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Primary image used across cards, article hero, Open Graph fallbacks, and sitemap images.',
              },
            },
            {
              name: 'featuredImageAlt',
              type: 'text',
              admin: {
                description: 'Accessible image alt text. Required by the content score.',
              },
            },
            { name: 'socialImage', type: 'upload', relationTo: 'media' },
            { name: 'leadMagnetFile', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoPreview',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/payload/BlogSEOPreview#BlogSEOPreview',
                },
              },
            },
            {
              name: 'seo',
              type: 'group',
              fields: [
                { name: 'metaTitle', type: 'text', admin: { description: 'Recommended length: 45-60 characters.' } },
                { name: 'metaDescription', type: 'textarea', admin: { description: 'Recommended length: 140-160 characters.' } },
                { name: 'focusKeyword', type: 'text' },
                { name: 'secondaryKeywords', type: 'text' },
                { name: 'keywords', type: 'text' },
                { name: 'canonicalUrl', type: 'text' },
                { name: 'ogTitle', type: 'text' },
                { name: 'ogDescription', type: 'textarea' },
                { name: 'ogImage', type: 'upload', relationTo: 'media' },
                { name: 'twitterTitle', type: 'text' },
                { name: 'twitterDescription', type: 'textarea' },
                { name: 'twitterImage', type: 'upload', relationTo: 'media' },
                { name: 'noIndex', type: 'checkbox', defaultValue: false },
                { name: 'noFollow', type: 'checkbox', defaultValue: false },
                {
                  name: 'structuredDataType',
                  type: 'select',
                  defaultValue: 'BlogPosting',
                  options: ['BlogPosting', 'Article', 'TechArticle', 'HowTo', 'FAQPage'],
                },
                { name: 'faqSchema', type: 'checkbox', defaultValue: true },
                { name: 'breadcrumbSchema', type: 'checkbox', defaultValue: true },
                { name: 'articleSchema', type: 'checkbox', defaultValue: true },
                { name: 'lastModifiedSchema', type: 'checkbox', defaultValue: true },
              ],
            },
          ],
        },
        {
          label: 'AI Assistant',
          fields: [
            {
              name: 'aiAssistantPanel',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/payload/BlogAIAssistantPanel#BlogAIAssistantPanel',
                },
              },
            },
            {
              name: 'contentScorePanel',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/payload/BlogContentScorePanel#BlogContentScorePanel',
                },
              },
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
                {
                  name: 'searchIntent',
                  type: 'select',
                  options: ['informational', 'commercial', 'transactional', 'navigational'],
                  admin: { width: '50%' },
                },
                {
                  name: 'funnelStage',
                  type: 'select',
                  options: ['awareness', 'consideration', 'conversion', 'retention'],
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'internalLinksSuggestions',
              type: 'array',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'url', type: 'text', required: true },
                { name: 'reason', type: 'text' },
              ],
            },
            {
              name: 'externalSources',
              type: 'array',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'url', type: 'text', required: true },
              ],
            },
            {
              name: 'references',
              type: 'array',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'url', type: 'text' },
                { name: 'note', type: 'text' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'factChecked', type: 'checkbox', defaultValue: false, admin: { width: '33%' } },
                { name: 'factCheckedBy', type: 'relationship', relationTo: 'users', admin: { width: '33%' } },
                { name: 'factCheckedAt', type: 'date', admin: { width: '33%', date: { pickerAppearance: 'dayAndTime' } } },
              ],
            },
          ],
        },
        {
          label: 'Editorial Workflow',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'assignedTo', type: 'relationship', relationTo: 'users', admin: { width: '50%' } },
                { name: 'reviewer', type: 'relationship', relationTo: 'users', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'approvedBy', type: 'relationship', relationTo: 'users', admin: { width: '50%' } },
                { name: 'approvedAt', type: 'date', admin: { width: '50%', date: { pickerAppearance: 'dayAndTime' } } },
              ],
            },
            { name: 'editorNotes', type: 'textarea' },
            { name: 'privateNotes', type: 'textarea' },
            { name: 'revisionNotes', type: 'textarea' },
          ],
        },
        {
          label: 'Social Distribution',
          fields: [
            { name: 'linkedinPost', type: 'textarea' },
            { name: 'instagramCaption', type: 'textarea' },
            { name: 'xPost', type: 'textarea' },
            { name: 'whatsappMessage', type: 'textarea' },
            { name: 'emailNewsletterIntro', type: 'textarea' },
            {
              name: 'socialStatus',
              type: 'select',
              defaultValue: 'not_prepared',
              options: [
                { label: 'Not Prepared', value: 'not_prepared' },
                { label: 'Prepared', value: 'prepared' },
                { label: 'Scheduled', value: 'scheduled' },
                { label: 'Published', value: 'published' },
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
            { name: 'ctaButtonText', type: 'text', defaultValue: 'Talk to CloudTopia' },
            { name: 'ctaButtonUrl', type: 'text', defaultValue: '/contact' },
            { name: 'secondaryCTAButtonText', type: 'text', defaultValue: 'View Services' },
            { name: 'secondaryCTAButtonUrl', type: 'text', defaultValue: '/services' },
            { name: 'leadMagnetTitle', type: 'text' },
            {
              name: 'newsletterPlacement',
              type: 'select',
              defaultValue: 'end',
              options: ['none', 'after_intro', 'middle', 'end', 'sidebar'],
            },
            {
              name: 'primaryCTA',
              type: 'select',
              options: [
                { label: 'Start Project', value: 'start_project' },
                { label: 'Talk to CloudTopia', value: 'talk_to_cloudtopia' },
                { label: 'View Services', value: 'view_services' },
                { label: 'Book Consultation', value: 'book_consultation' },
              ],
            },
            serviceLinksField,
          ],
        },
        {
          label: 'Analytics',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'viewsCount', type: 'number', defaultValue: 0, admin: { width: '25%' } },
                { name: 'uniqueViewsCount', type: 'number', defaultValue: 0, admin: { width: '25%' } },
                { name: 'averageReadTime', type: 'number', admin: { width: '25%' } },
                { name: 'conversionClicks', type: 'number', defaultValue: 0, admin: { width: '25%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'newsletterSignups', type: 'number', defaultValue: 0, admin: { width: '50%' } },
                { name: 'lastViewedAt', type: 'date', admin: { width: '50%', date: { pickerAppearance: 'dayAndTime' } } },
              ],
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'blog-categories' as any,
              required: true,
              admin: {
                description: 'Primary topic for filters, badges, archive pages, and related-post matching.',
              },
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'blog-tags' as any,
              hasMany: true,
              admin: {
                description: 'Optional discovery tags. Keep them focused and reusable.',
              },
            },
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'authors',
              required: true,
              admin: {
                description: 'Primary byline author.',
              },
            },
            { name: 'coAuthors', type: 'relationship', relationTo: 'authors', hasMany: true },
            { name: 'series', type: 'relationship', relationTo: 'blog-series' as any },
            {
              name: 'tableOfContents',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show a sticky article table of contents when headings exist.',
              },
            },
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'blog-posts' as any,
              hasMany: true,
              admin: {
                description: 'Optional manual related posts. Otherwise the frontend uses same-category and same-tag articles.',
              },
            },
          ],
        },
      ],
    },
  ],
}
