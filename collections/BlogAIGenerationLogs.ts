import type { CollectionConfig } from 'payload'
import { adminOnly } from './blogAccess.ts'

export const BlogAIGenerationLogs: CollectionConfig = {
  slug: 'blog-ai-generation-logs',
  lockDocuments: false,
  admin: {
    group: 'Insights',
    useAsTitle: 'promptType',
    defaultColumns: ['promptType', 'sourcePost', 'userEmail', 'createdAt'],
    description: 'Audit log for AI writing assistant requests. Outputs are stored as previews only.',
  },
  access: {
    read: adminOnly,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'promptType',
      type: 'select',
      required: true,
      options: [
        { label: 'Generate Idea', value: 'idea' },
        { label: 'Generate Outline', value: 'outline' },
        { label: 'Improve Title', value: 'title' },
        { label: 'Generate Excerpt', value: 'excerpt' },
        { label: 'Generate Intro', value: 'intro' },
        { label: 'Rewrite Section', value: 'rewrite' },
        { label: 'Generate FAQ', value: 'faq' },
        { label: 'Generate SEO', value: 'seo' },
        { label: 'Generate Social Posts', value: 'social' },
        { label: 'Generate CTA', value: 'cta' },
        { label: 'Analyze Content', value: 'analyze' },
        { label: 'Translate Content', value: 'translate' },
      ],
    },
    { name: 'sourcePost', type: 'relationship', relationTo: 'blog-posts' as any },
    { name: 'user', type: 'relationship', relationTo: 'users' },
    { name: 'userEmail', type: 'email' },
    { name: 'provider', type: 'text', defaultValue: 'openai' },
    { name: 'model', type: 'text' },
    { name: 'inputPreview', type: 'textarea' },
    { name: 'outputPreview', type: 'textarea' },
    { name: 'status', type: 'select', defaultValue: 'success', options: ['success', 'error'] },
    { name: 'errorMessage', type: 'textarea' },
  ],
}
