import type { CollectionConfig } from 'payload'
import { adminOnly } from './blogAccess.ts'

/**
 * Leads captured from the ClinicTopia demo login (clinic.cloudtopia.net).
 * Visitors submit name / email / phone to enter the demo; the public API route
 * at /api/clinictopia-lead validates the payload and captures the real client
 * IP server-side. Mirrors the ContactInquiries pattern so it lands in the same
 * CRM group in the admin panel.
 */
export const ClinicTopiaLeads: CollectionConfig = {
  slug: 'clinictopia-leads',
  lockDocuments: false,
  admin: {
    group: 'CRM',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'language', 'status', 'ipAddress', 'createdAt'],
    description: 'Leads from the ClinicTopia demo sign-in (clinic.cloudtopia.net).',
  },
  access: {
    read: adminOnly,
    create: () => true, // public endpoint — the API route validates the data
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    {
      name: 'ipAddress',
      type: 'text',
      admin: { readOnly: true, description: 'Visitor IP captured from the request (cf-connecting-ip / x-forwarded-for).' },
    },
    {
      name: 'language',
      type: 'select',
      defaultValue: 'ar',
      options: [
        { label: 'Arabic', value: 'ar' },
        { label: 'English', value: 'en' },
      ],
    },
    { name: 'timezone', type: 'text', admin: { readOnly: true } },
    { name: 'screen', type: 'text', admin: { readOnly: true } },
    { name: 'userAgent', type: 'textarea', admin: { readOnly: true } },
    { name: 'pageUrl', type: 'text', admin: { readOnly: true } },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'clinictopia-demo',
      admin: { description: 'Where the lead came from.' },
    },
    {
      name: 'product',
      type: 'text',
      defaultValue: 'ClinicTopia',
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
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Internal CRM notes — visible only in the admin panel.' },
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}
