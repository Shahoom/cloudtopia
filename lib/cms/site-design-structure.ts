import { en } from '../i18n/translations/en.ts'
import { buildNavigation, buildSiteSettings } from './page-structure.ts'

type AnyRecord = Record<string, any>

export const defaultEditableSections = {
  home: ['hero', 'philosophy', 'services', 'whyCloudTopia', 'howWeWork', 'faq', 'featuredProjects', 'cta'],
  services: ['hero', 'serviceGrid', 'process', 'faq', 'cta'],
  projects: ['hero', 'filters', 'projectGrid'],
}

export function buildStructuredSiteDesign(dictionary: AnyRecord = en) {
  const navigation = buildNavigation('en', dictionary)
  const settings = buildSiteSettings(dictionary)

  return {
    key: 'default',
    brand: {
      name: settings.brand?.name || 'CloudTopia',
      tagline: settings.brand?.tagline || 'Digital & Cloud Technologies',
      logo: settings.brand?.logo || '/images/CloudTopia.svg',
    },
    colors: {
      dark: '#071522',
      primary: '#0b75bc',
      secondary: '#36c4ff',
      background: '#f8fbff',
    },
    typography: {
      heading: 'Cairo',
      body: 'Changa',
      logo: 'AgharaPro',
    },
    radius: {
      card: 8,
      control: 8,
    },
    motion: {
      enabled: true,
      intensity: 'standard',
    },
    cta: {
      label: navigation.cta?.label || 'Get Started',
      href: navigation.cta?.href || '/contact',
    },
    contact: {
      email: settings.contact?.email || 'info@cloudtopia.net',
      phone: settings.contact?.phone || '',
      whatsapp: settings.contact?.whatsapp || 'https://wa.me/905011511116',
    },
    social: {
      whatsapp: settings.social?.find((item: AnyRecord) => item.label === 'WhatsApp')?.href || 'https://wa.me/905011511116',
      x: settings.social?.find((item: AnyRecord) => item.label === 'X')?.href || 'https://x.com/thecloudtopia',
      github: settings.social?.find((item: AnyRecord) => item.label === 'GitHub')?.href || 'https://github.com/Shahoom',
      instagram: settings.social?.find((item: AnyRecord) => item.label === 'Instagram')?.href || 'https://instagram.com/thecloudtopia',
    },
    navigationLabels: {
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      labs: 'Labs',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
    },
    footer: {
      description: navigation.footer?.description || settings.brand?.tagline || '',
      copyright: navigation.footer?.copyright || '© {year} CloudTopia. All rights reserved.',
    },
    theme: {},
    navigation: {},
    editableSections: defaultEditableSections,
  }
}

export function composeSiteDesignJSON(input: AnyRecord = {}, dictionary: AnyRecord = en) {
  const defaults = buildStructuredSiteDesign(dictionary)
  const existingTheme = input.theme || {}
  const existingNavigation = input.navigation || {}
  const existingSettings = existingNavigation.settings || {}
  const existingFooter = existingNavigation.footer || {}
  const existingCta = existingNavigation.cta || {}
  const existingColors = existingTheme.colors || {}
  const existingTypography = existingTheme.typography || {}
  const existingRadius = existingTheme.radius || {}
  const existingMotion = existingTheme.motion || {}

  const brand = { ...defaults.brand, ...(existingSettings.brand || {}), ...(input.brand || {}) }
  const colors = { ...defaults.colors, ...existingColors, ...(input.colors || {}) }
  const typography = { ...defaults.typography, ...existingTypography, ...(input.typography || {}) }
  const radius = { ...defaults.radius, ...existingRadius, ...(input.radius || {}) }
  const motion = { ...defaults.motion, ...existingMotion, ...(input.motion || {}) }
  const cta = { ...defaults.cta, ...existingCta, ...(input.cta || {}) }
  const contact = { ...defaults.contact, ...(existingSettings.contact || {}), ...(input.contact || {}) }
  const social = { ...defaults.social, ...(input.social || {}) }
  const navigationLabels = { ...defaults.navigationLabels, ...(input.navigationLabels || {}) }
  const footer = { ...defaults.footer, ...existingFooter, ...(input.footer || {}) }

  const header = [
    { label: navigationLabels.home, href: '/' },
    { label: navigationLabels.services, href: '/services' },
    { label: navigationLabels.projects, href: '/projects' },
    { label: navigationLabels.about, href: '/about' },
    { label: navigationLabels.blog === 'Blog' ? 'Articles' : navigationLabels.blog, href: '/articles' },
    { label: navigationLabels.contact, href: '/contact' },
  ]

  return {
    theme: {
      ...existingTheme,
      colors,
      typography,
      radius,
      motion,
    },
    navigation: {
      ...existingNavigation,
      header,
      cta,
      footer: {
        ...footer,
        columns: existingFooter.columns || buildNavigation('en', dictionary).footer?.columns || [],
      },
      settings: {
        ...existingSettings,
        brand,
        contact,
        social: [
          { label: 'WhatsApp', href: social.whatsapp },
          { label: 'X', href: social.x },
          { label: 'GitHub', href: social.github },
          { label: 'Instagram', href: social.instagram },
        ].filter((item) => Boolean(item.href)),
      },
    },
    editableSections: input.editableSections || input.editable_sections || defaultEditableSections,
  }
}

export function flattenSiteDesignRow(row: AnyRecord | null | undefined) {
  if (!row) return null

  return {
    key: row.key,
    brand: {
      name: row.brand_name,
      tagline: row.brand_tagline,
      logo: row.brand_logo,
    },
    colors: {
      dark: row.colors_dark,
      primary: row.colors_primary,
      secondary: row.colors_secondary,
      background: row.colors_background,
    },
    typography: {
      heading: row.typography_heading,
      body: row.typography_body,
      logo: row.typography_logo,
    },
    radius: {
      card: row.radius_card,
      control: row.radius_control,
    },
    motion: {
      enabled: row.motion_enabled,
      intensity: row.motion_intensity,
    },
    cta: {
      label: row.cta_label,
      href: row.cta_href,
    },
    contact: {
      email: row.contact_email,
      phone: row.contact_phone,
      whatsapp: row.contact_whatsapp,
    },
    social: {
      whatsapp: row.social_whatsapp,
      x: row.social_x,
      github: row.social_github,
      instagram: row.social_instagram,
    },
    navigationLabels: {
      home: row.navigation_labels_home || row.nav_home_label,
      services: row.navigation_labels_services || row.nav_services_label,
      projects: row.navigation_labels_projects || row.nav_projects_label,
      labs: row.navigation_labels_labs || row.nav_labs_label,
      about: row.navigation_labels_about || row.nav_about_label,
      blog: row.navigation_labels_blog || row.nav_blog_label,
      contact: row.navigation_labels_contact || row.nav_contact_label,
    },
    footer: {
      description: row.footer_description,
      copyright: row.footer_copyright,
    },
    theme: row.theme || {},
    navigation: row.navigation || {},
    editableSections: row.editable_sections || defaultEditableSections,
  }
}
