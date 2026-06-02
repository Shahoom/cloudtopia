import type { CollectionAfterChangeHook, CollectionBeforeValidateHook, CollectionConfig } from 'payload'
import { composeSiteDesignJSON } from '../lib/cms/site-design-structure.ts'
import { revalidateCmsTags } from '../lib/cms/revalidate.ts'

const syncStructuredDesign: CollectionBeforeValidateHook = ({ data }) => {
  const next = data || {}
  const composed = composeSiteDesignJSON(next)

  return {
    ...next,
    theme: composed.theme,
    navigation: composed.navigation,
    editableSections: composed.editableSections,
  }
}

const revalidateSiteDesign: CollectionAfterChangeHook = async ({ doc }) => {
  await revalidateCmsTags(['cms-design', 'cms-dictionary', 'cms-pages'])
  return doc
}

export const SiteDesign: CollectionConfig = {
  slug: 'site-design',
  lockDocuments: false,
  admin: {
    group: 'Design',
    useAsTitle: 'key',
    defaultColumns: ['key', 'brand.name', 'colors.primary', 'updatedAt'],
    description: 'Global design, navigation, footer, and brand controls for the public website.',
    components: {
      views: {
        list: {
          Component: '@/components/payload/FastCollectionLists#FastSiteDesignListView',
        },
      },
    },
  },
  hooks: {
    beforeValidate: [syncStructuredDesign],
    afterChange: [revalidateSiteDesign],
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      defaultValue: 'default',
      admin: {
        description: 'Use "default" for the active public website design settings.',
      },
    },
    {
      name: 'brand',
      type: 'group',
      admin: {
        description: 'Brand identity used by the header, footer, metadata helpers, and admin previews.',
      },
      fields: [
        { name: 'name', type: 'text', defaultValue: 'CloudTopia', required: true },
        { name: 'tagline', type: 'text', defaultValue: 'Digital & Cloud Technologies', required: true },
        { name: 'logo', type: 'text', defaultValue: '/images/CloudTopia.svg', required: true },
      ],
    },
    {
      name: 'colors',
      type: 'group',
      admin: {
        description: 'Public CSS variables and dashboard color tokens.',
      },
      fields: [
        { name: 'dark', type: 'text', defaultValue: '#071522', required: true },
        { name: 'primary', type: 'text', defaultValue: '#0b75bc', required: true },
        { name: 'secondary', type: 'text', defaultValue: '#36c4ff', required: true },
        { name: 'background', type: 'text', defaultValue: '#f8fbff', required: true },
      ],
    },
    {
      name: 'typography',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Cairo', required: true },
        { name: 'body', type: 'text', defaultValue: 'Changa', required: true },
        { name: 'logo', type: 'text', defaultValue: 'AgharaPro', required: true },
      ],
    },
    {
      name: 'radius',
      type: 'group',
      fields: [
        { name: 'card', type: 'number', defaultValue: 8, required: true },
        { name: 'control', type: 'number', defaultValue: 8, required: true },
      ],
    },
    {
      name: 'motion',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'intensity',
          type: 'select',
          defaultValue: 'standard',
          options: [
            { label: 'Quiet', value: 'quiet' },
            { label: 'Standard', value: 'standard' },
            { label: 'Expressive', value: 'expressive' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      admin: {
        description: 'Header CTA button used across locales unless a page overrides it.',
      },
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Get Started', required: true },
        { name: 'href', type: 'text', defaultValue: '/contact', required: true },
      ],
    },
    {
      name: 'navigationLabels',
      type: 'group',
      admin: {
        description: 'Header link labels for the default English navigation model.',
      },
      fields: [
        { name: 'home', type: 'text', defaultValue: 'Home', required: true },
        { name: 'services', type: 'text', defaultValue: 'Services', required: true },
        { name: 'projects', type: 'text', defaultValue: 'Projects', required: true },
        { name: 'labs', type: 'text', defaultValue: 'Labs', required: true },
        { name: 'about', type: 'text', defaultValue: 'About', required: true },
        { name: 'blog', type: 'text', defaultValue: 'Blog', required: true },
        { name: 'contact', type: 'text', defaultValue: 'Contact', required: true },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Transforming businesses with cutting-edge digital and cloud solutions. Your partner in digital excellence.',
          required: true,
        },
        { name: 'copyright', type: 'text', defaultValue: '© {year} CloudTopia. All rights reserved.', required: true },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'email', type: 'email', defaultValue: 'info@cloudtopia.net', required: true },
        { name: 'phone', type: 'text', defaultValue: '', required: false },
        { name: 'whatsapp', type: 'text', defaultValue: 'https://wa.me/905011511116', required: true },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'whatsapp', type: 'text', defaultValue: 'https://wa.me/905011511116' },
        { name: 'x', type: 'text', defaultValue: 'https://x.com/thecloudtopia' },
        { name: 'github', type: 'text', defaultValue: 'https://github.com/Shahoom' },
        { name: 'instagram', type: 'text', defaultValue: 'https://instagram.com/thecloudtopia' },
      ],
    },
    {
      name: 'theme',
      type: 'json',
      required: true,
      admin: {
        condition: () => false,
        description: 'Generated from the structured fields above. Hidden from editors.',
      },
    },
    {
      name: 'navigation',
      type: 'json',
      required: true,
      admin: {
        condition: () => false,
        description: 'Generated from the structured fields above. Hidden from editors.',
      },
    },
    {
      name: 'editableSections',
      type: 'json',
      required: true,
      admin: {
        description: 'Advanced section visibility controls. Keep this JSON unless you are intentionally hiding public sections.',
      },
    },
  ],
}
