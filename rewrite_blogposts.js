const fs = require('fs');

let content = fs.readFileSync('collections/BlogPosts.ts', 'utf-8');

// The prefix is everything before `fields: [`
const prefixIndex = content.indexOf('  fields: [');
const prefix = content.substring(0, prefixIndex);

const newFields = `  fields: [
    {
      name: 'aiGenerator',
      type: 'ui',
      admin: {
        position: 'default',
        components: {
          Field: '@/components/payload/AIPostGenerator#AIPostGenerator',
        },
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'slug', type: 'text', required: true, unique: true, admin: { width: '50%', description: 'Auto-generated from the title when empty. Editable for SEO-safe URLs.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'subtitle', type: 'text', admin: { width: '50%' } },
        { name: 'shortExcerpt', type: 'text', admin: { width: '50%', description: 'Very short card or featured-strip teaser.' } },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: 'Main summary for cards, article hero, metadata fallbacks, and search results.' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: richTextEditor,
      admin: { description: 'Use headings, lists, quotes, images, tables, and code blocks to structure the core article.' },
    },
    {
      type: 'collapsible',
      label: 'Taxonomy & Organization',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'category', type: 'relationship', relationTo: 'blog-categories' as any, required: true, admin: { width: '50%' } },
            { name: 'tags', type: 'relationship', relationTo: 'blog-tags' as any, hasMany: true, admin: { width: '50%' } },
          ]
        },
        {
          type: 'row',
          fields: [
            { name: 'series', type: 'relationship', relationTo: 'blog-series' as any, admin: { width: '50%' } },
            { name: 'contentType', type: 'select', defaultValue: 'article', options: contentTypeOptions, admin: { width: '50%' } },
          ]
        },
        {
          type: 'row',
          fields: [
            { name: 'targetAudience', type: 'select', options: targetAudienceOptions, admin: { width: '50%' } },
            { name: 'serviceFocus', type: 'select', options: serviceFocusOptions, admin: { width: '50%' } },
          ]
        },
        {
          type: 'row',
          fields: [
            { name: 'difficulty', type: 'select', defaultValue: 'beginner', options: [
              { label: 'Beginner', value: 'beginner' },
              { label: 'Intermediate', value: 'intermediate' },
              { label: 'Advanced', value: 'advanced' },
            ], admin: { width: '50%' } },
          ]
        },
      ]
    },
    {
      type: 'collapsible',
      label: 'Featured Flags',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'featured', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
            { name: 'pinned', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
            { name: 'editorPick', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
            { name: 'trending', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
          ]
        }
      ]
    },
    {
      type: 'collapsible',
      label: 'Authorship & Media',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'author', type: 'relationship', relationTo: 'authors', required: true, admin: { width: '50%' } },
            { name: 'coAuthors', type: 'relationship', relationTo: 'authors', hasMany: true, admin: { width: '50%' } },
          ]
        },
        { name: 'featuredImageAlt', label: 'Alt text for accessibility', type: 'text' },
      ]
    },
    {
      type: 'collapsible',
      label: 'Page Layout & Blocks',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'contentBlocks',
          type: 'blocks',
          blocks: blogContentBlocks,
          admin: { description: 'Structured premium article sections rendered after the rich text body.' },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'tableOfContents',
              type: 'checkbox',
              defaultValue: true,
              admin: { width: '50%', description: 'Show a sticky article table of contents when headings exist.' },
            },
            { name: 'readingTime', type: 'number', defaultValue: 1, admin: { readOnly: true, width: '25%' } },
            { name: 'wordCount', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '25%' } },
          ],
        },
        {
          name: 'relatedPosts',
          type: 'relationship',
          relationTo: 'blog-posts' as any,
          hasMany: true,
          admin: { description: 'Optional manual related posts.' },
        },
      ]
    },
    {
      type: 'collapsible',
      label: 'SEO',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'seoPreview',
          type: 'ui',
          admin: { components: { Field: '@/components/payload/BlogSEOPreview#BlogSEOPreview' } },
        },
        {
          type: 'row',
          fields: [
            { name: 'searchIntent', type: 'select', options: ['informational', 'commercial', 'transactional', 'navigational'], admin: { width: '50%' } },
            { name: 'funnelStage', type: 'select', options: ['awareness', 'consideration', 'conversion', 'retention'], admin: { width: '50%' } },
          ],
        },
        {
          name: 'seo',
          type: 'group',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
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
            {
              type: 'row',
              fields: [
                { name: 'noIndex', type: 'checkbox', defaultValue: false, admin: { width: '50%' } },
                { name: 'noFollow', type: 'checkbox', defaultValue: false, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'faqSchema', type: 'checkbox', defaultValue: true, admin: { width: '33%' } },
                { name: 'breadcrumbSchema', type: 'checkbox', defaultValue: true, admin: { width: '33%' } },
                { name: 'articleSchema', type: 'checkbox', defaultValue: true, admin: { width: '33%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'lastModifiedSchema', type: 'checkbox', defaultValue: true, admin: { width: '50%' } },
                {
                  name: 'structuredDataType',
                  type: 'select',
                  defaultValue: 'BlogPosting',
                  options: ['BlogPosting', 'Article', 'TechArticle', 'HowTo', 'FAQPage'],
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
      ]
    },
    {
      type: 'collapsible',
      label: 'Social Distribution',
      admin: { initCollapsed: true },
      fields: [
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
        { name: 'linkedinPost', type: 'textarea' },
        { name: 'instagramCaption', type: 'textarea' },
        { name: 'xPost', type: 'textarea' },
        { name: 'whatsappMessage', type: 'textarea' },
        { name: 'emailNewsletterIntro', type: 'textarea' },
        { name: 'socialImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Analytics & Performance',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'contentScorePanel',
          type: 'ui',
          admin: { components: { Field: '@/components/payload/BlogContentScorePanel#BlogContentScorePanel' } },
        },
        {
          type: 'row',
          fields: [
            { name: 'aiGenerated', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
            { name: 'aiAssisted', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
            { name: 'estimatedRankingDifficulty', type: 'number', admin: { width: '25%' } },
            { name: 'readabilityScore', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '25%' } },
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
            { name: 'contentScore', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '25%' } },
            { name: 'seoScore', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '25%' } },
            { name: 'viewsCount', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '25%' } },
            { name: 'uniqueViewsCount', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '25%' } },
          ]
        },
        {
          type: 'row',
          fields: [
            { name: 'averageReadTime', type: 'number', admin: { readOnly: true, width: '33%' } },
            { name: 'conversionClicks', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '33%' } },
            { name: 'newsletterSignups', type: 'number', defaultValue: 0, admin: { readOnly: true, width: '33%' } },
          ]
        },
        {
          type: 'row',
          fields: [
            { name: 'lastViewedAt', type: 'date', admin: { readOnly: true, width: '100%', date: { pickerAppearance: 'dayAndTime' } } },
          ]
        }
      ],
    },
    {
      type: 'collapsible',
      label: 'Conversion & CTAs',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'showCTA', type: 'checkbox', defaultValue: true, admin: { width: '50%' } },
            {
              name: 'newsletterPlacement',
              type: 'select',
              defaultValue: 'end',
              options: ['none', 'after_intro', 'middle', 'end', 'sidebar'],
              admin: { width: '50%' },
            },
          ],
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
        {
          type: 'row',
          fields: [
            { name: 'ctaTitle', type: 'text', admin: { width: '50%' } },
            { name: 'leadMagnetTitle', type: 'text', admin: { width: '50%' } },
          ],
        },
        { name: 'ctaDescription', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'ctaButtonText', type: 'text', defaultValue: 'Talk to CloudTopia', admin: { width: '50%' } },
            { name: 'ctaButtonUrl', type: 'text', defaultValue: '/contact', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'secondaryCTAButtonText', type: 'text', defaultValue: 'View Services', admin: { width: '50%' } },
            { name: 'secondaryCTAButtonUrl', type: 'text', defaultValue: '/services', admin: { width: '50%' } },
          ],
        },
        { name: 'leadMagnetFile', type: 'upload', relationTo: 'media' },
        serviceLinksField,
      ],
    },
    {
      type: 'collapsible',
      label: 'Editorial Workflow',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
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
              admin: { width: '33%' }
            },
            { name: 'scheduledAt', type: 'date', admin: { width: '33%', date: { pickerAppearance: 'dayAndTime' } } },
            { name: 'lastReviewedAt', type: 'date', admin: { width: '33%', date: { pickerAppearance: 'dayAndTime' } } },
          ]
        },
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
      admin: { position: 'sidebar' },
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'coverImage', label: 'Featured / cover image', type: 'upload', relationTo: 'media', required: true, admin: { position: 'sidebar' } },
  ],
};
`

fs.writeFileSync('collections/BlogPosts.ts', prefix + newFields);
