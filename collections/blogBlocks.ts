import type { Block } from 'payload'

const richTextarea = {
  type: 'textarea' as const,
  admin: {
    rows: 4,
  },
}

export const CalloutBlock: Block = {
  slug: 'calloutBlock',
  labels: {
    singular: 'Callout',
    plural: 'Callouts',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Success', value: 'success' },
        { label: 'Tip', value: 'tip' },
        { label: 'CloudTopia Note', value: 'cloudtopia-note' },
      ],
    },
    { name: 'title', type: 'text' },
    { name: 'content', ...richTextarea },
    { name: 'icon', type: 'text' },
  ],
}

export const CTAInlineBlock: Block = {
  slug: 'ctaInlineBlock',
  labels: {
    singular: 'Inline CTA',
    plural: 'Inline CTAs',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', ...richTextarea },
    { name: 'buttonText', type: 'text', defaultValue: 'Talk to CloudTopia' },
    { name: 'buttonUrl', type: 'text', defaultValue: '/contact' },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'azure',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Azure', value: 'azure' },
        { label: 'Dark', value: 'dark' },
        { label: 'Gradient', value: 'gradient' },
      ],
    },
  ],
}

export const FAQBlock: Block = {
  slug: 'faqBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', ...richTextarea, required: true },
    {
      name: 'includeInSchema',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Include this question in FAQPage JSON-LD when the article enables FAQ schema.',
      },
    },
  ],
}

export const ComparisonTableBlock: Block = {
  slug: 'comparisonTableBlock',
  labels: {
    singular: 'Comparison Table',
    plural: 'Comparison Tables',
  },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'rows',
      type: 'array',
      fields: [
        { name: 'feature', type: 'text', required: true },
        { name: 'optionA', type: 'text' },
        { name: 'optionB', type: 'text' },
        { name: 'winner', type: 'text' },
      ],
    },
  ],
}

export const ProsConsBlock: Block = {
  slug: 'prosConsBlock',
  labels: {
    singular: 'Pros and Cons',
    plural: 'Pros and Cons',
  },
  fields: [
    {
      name: 'pros',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'cons',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
  ],
}

export const StepProcessBlock: Block = {
  slug: 'stepProcessBlock',
  labels: {
    singular: 'Step Process',
    plural: 'Step Processes',
  },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', ...richTextarea },
        { name: 'icon', type: 'text' },
      ],
    },
  ],
}

export const ServicePromoBlock: Block = {
  slug: 'servicePromoBlock',
  labels: {
    singular: 'Service Promo',
    plural: 'Service Promos',
  },
  fields: [
    { name: 'service', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'description', ...richTextarea },
    { name: 'buttonText', type: 'text', defaultValue: 'Explore service' },
    { name: 'buttonUrl', type: 'text', defaultValue: '/services' },
  ],
}

export const RelatedPostsManualBlock: Block = {
  slug: 'relatedPostsManualBlock',
  labels: {
    singular: 'Related Articles',
    plural: 'Related Articles',
  },
  fields: [
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'blog-posts' as any,
      hasMany: true,
    },
  ],
}

export const StatBlock: Block = {
  slug: 'statBlock',
  labels: {
    singular: 'Stat Highlight',
    plural: 'Stat Highlights',
  },
  fields: [
    { name: 'statNumber', type: 'text', required: true },
    { name: 'statLabel', type: 'text', required: true },
    { name: 'description', ...richTextarea },
  ],
}

export const ImageWithCaptionBlock: Block = {
  slug: 'imageWithCaptionBlock',
  labels: {
    singular: 'Image With Caption',
    plural: 'Images With Captions',
  },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Full', value: 'full' },
        { label: 'Wide', value: 'wide' },
        { label: 'Normal', value: 'normal' },
      ],
    },
  ],
}

export const CodeSnippetBlock: Block = {
  slug: 'codeSnippetBlock',
  labels: {
    singular: 'Code Snippet',
    plural: 'Code Snippets',
  },
  fields: [
    { name: 'language', type: 'text', defaultValue: 'typescript' },
    { name: 'filename', type: 'text' },
    { name: 'code', type: 'code', required: true },
    { name: 'explanation', ...richTextarea },
  ],
}

export const LeadMagnetBlock: Block = {
  slug: 'leadMagnetBlock',
  labels: {
    singular: 'Lead Magnet',
    plural: 'Lead Magnets',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', ...richTextarea },
    { name: 'file', type: 'upload', relationTo: 'media' },
    { name: 'buttonText', type: 'text', defaultValue: 'Get the resource' },
    { name: 'emailRequired', type: 'checkbox', defaultValue: true },
  ],
}

export const blogContentBlocks: Block[] = [
  CalloutBlock,
  CTAInlineBlock,
  FAQBlock,
  ComparisonTableBlock,
  ProsConsBlock,
  StepProcessBlock,
  ServicePromoBlock,
  RelatedPostsManualBlock,
  StatBlock,
  ImageWithCaptionBlock,
  CodeSnippetBlock,
  LeadMagnetBlock,
]
