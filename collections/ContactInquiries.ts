import type { CollectionConfig } from 'payload'
import { adminOnly } from './blogAccess.ts'

export const ContactInquiries: CollectionConfig = {
  slug: 'contact-inquiries',
  lockDocuments: false,
  admin: {
    group: 'CRM',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service', 'status', 'source', 'locale', 'createdAt'],
    description: 'Inquiries submitted through the contact form and article sidebar consultation widget.',
  },
  access: {
    read: adminOnly,
    create: () => true,   // public endpoint — API route validates the data
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'ipAddress', type: 'text', admin: { readOnly: true, description: 'Visitor IP captured from the request (x-forwarded-for).' } },
    {
      name: 'service',
      type: 'text',
      admin: { description: 'Service or area of interest selected by the visitor.' },
    },
    { name: 'budget', type: 'text' },
    { name: 'timeline', type: 'text' },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'contact-form',
      options: [
        { label: 'Contact Form', value: 'contact-form' },
        { label: 'Article Sidebar', value: 'article-sidebar' },
        { label: 'Pricing Page', value: 'pricing-page' },
        { label: 'Other', value: 'other' },
      ],
      admin: { description: 'Which widget or page captured this inquiry.' },
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
    { name: 'pageUrl', type: 'text' },
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
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal CRM notes — visible only in the admin panel.',
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
  ],
}
