import type { CollectionConfig } from 'payload'
import { adminOnly } from './blogAccess.ts'

export const SolutionFinderLeads: CollectionConfig = {
  slug: 'solution-finder-leads',
  lockDocuments: false,
  admin: {
    group: 'CRM',
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'country', 'recommendedPackage', 'status', 'createdAt'],
    description: 'Qualified project inquiries captured by the AI-powered recommendation flow.',
  },
  access: {
    read: adminOnly,
    // Public creation is allowed — the API route validates data before saving.
    create: () => true,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'company', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'industry', type: 'text' },
    { name: 'projectType', type: 'text' },
    { name: 'businessGoal', type: 'text' },
    { name: 'budget', type: 'text' },
    { name: 'timeline', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'contactMethod', type: 'text' },
    {
      name: 'wantContact',
      type: 'checkbox',
      defaultValue: true,
    },
    { name: 'recommendedPackage', type: 'text' },
    { name: 'recommendedRoute', type: 'text' },
    {
      name: 'selectedAnswerSummary',
      type: 'textarea',
      admin: {
        description: 'Readable summary of selected recommendation answers for CRM review.',
      },
    },
    {
      name: 'aiSource',
      type: 'select',
      options: [
        { label: 'OpenAI', value: 'openai' },
        { label: 'Fallback', value: 'fallback' },
      ],
    },
    { name: 'aiSummary', type: 'textarea' },
    { name: 'aiCountryAdvice', type: 'textarea' },
    { name: 'aiBudgetAdvice', type: 'textarea' },
    { name: 'aiWhatsappOpening', type: 'textarea' },
    {
      name: 'aiRoadmap',
      type: 'array',
      fields: [{ name: 'step', type: 'text', required: true }],
    },
    {
      name: 'aiNextQuestions',
      type: 'array',
      fields: [{ name: 'question', type: 'text', required: true }],
    },
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Arabic', value: 'ar' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
      ],
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'solution-finder',
      admin: {
        description: 'Lead source for CRM segmentation.',
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
