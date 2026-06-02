import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Client } from 'pg'
import sharp from 'sharp'
import { authors } from '../lib/authors.ts'
import { ar } from '../lib/i18n/translations/ar.ts'
import { en } from '../lib/i18n/translations/en.ts'
import { serviceFAQs } from '../lib/seo/service-faqs.ts'
import {
  buildPageCTA,
  buildPageHero,
  buildPageSEO,
  buildPageSections,
  templateForSlug,
} from '../lib/cms/page-structure.ts'
import { buildStructuredSiteDesign, composeSiteDesignJSON } from '../lib/cms/site-design-structure.ts'
import { getDatabaseUrl } from '../lib/cms/env.ts'
import {
  createLexicalArticle,
  createContentBlocks,
  sampleBlogCategories,
  sampleBlogPosts,
  sampleBlogTags,
  sampleSlug,
} from '../lib/blog/sample-content.ts'
import { calculateReadingTime } from '../lib/blog/utils.ts'

type Locale = 'en' | 'ar'

const dictionaries = { en, ar }
const locales: Locale[] = ['en', 'ar']

export function loadLocalEnv() {
  if (!fs.existsSync('.env.local')) return
  const env = fs.readFileSync('.env.local', 'utf8')
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (!match) continue
    const [, key, rawValue] = match
    if (process.env[key]) continue
    process.env[key] = rawValue.replace(/^"|"$/g, '')
  }
}

function pageTitle(locale: Locale, slug: string, dictionary: any) {
  if (slug === '/') return dictionary.home?.hero?.title || 'CloudTopia'
  const key = slug.replace(/-/g, '')
  return dictionary[key]?.title || dictionary.nav?.[slug] || slug.split('-').map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ')
}

const pageSlugs = [
  '/',
  'services',
  'projects',
  'labs',
  'about',
  'contact',
  'blog',
  'website-design',
  'ecommerce-solutions',
  'business-systems-development',
  'restaurant-qr-menu',
  'content-creation',
  'social-media-marketing',
  'web-applications',
  'privacy',
  'terms',
]

const defaultDesign = {
  colors: {
    primary: '#0ea5e9',
    secondary: '#6366f1',
    background: '#f4f1f8',
    dark: '#0a0a1a',
  },
  typography: {
    body: 'Changa',
    heading: 'Cairo',
    logo: 'AgharaPro',
  },
  radius: {
    control: 8,
    card: 16,
  },
  motion: {
    enabled: true,
    intensity: 'standard',
  },
}

async function upsertSiteContent(client: Client) {
  for (const locale of locales) {
    await client.query(
      `insert into site_content (locale, dictionary, updated_at, created_at)
       values ($1, $2::jsonb, now(), now())
       on conflict (locale)
       do update set dictionary = excluded.dictionary, updated_at = now()`,
      [locale, JSON.stringify(dictionaries[locale])],
    )
  }
}

async function upsertProjects(client: Client) {
  const staticProjectKeys: string[] = []
  for (const locale of locales) {
    const projects = (dictionaries[locale] as any).projects?.projectCards || []
    for (const project of projects) {
      staticProjectKeys.push(`${locale}:${project.id}`)
    }
  }

  if (staticProjectKeys.length > 0) {
    await client.query('delete from projects_features where _parent_id = any($1::text[])', [staticProjectKeys])
    await client.query('delete from projects where id = any($1::text[])', [staticProjectKeys])
  }

  // Fetch all media items to build url -> id map
  const mediaResult = await client.query<{ id: number; url: string }>('select id, url from media')
  const mediaMap = new Map<string, number>()
  for (const row of mediaResult.rows) {
    mediaMap.set(row.url, row.id)
  }

  for (const locale of locales) {
    const projects = (dictionaries[locale] as any).projects?.projectCards || []
    for (const project of projects) {
      const cmsKey = `${locale}:${project.id}`
      const mediaId = project.image ? mediaMap.get(project.image) || null : null

      await client.query(
        `insert into projects (
          id, locale, cms_key, category, type, featured, title, problem, solution,
          image, image_media_id, metrics_label, metrics_value, link, updated_at, created_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, now(), now())
        on conflict (id) do update set
          locale = excluded.locale,
          cms_key = excluded.cms_key,
          category = excluded.category,
          type = excluded.type,
          featured = excluded.featured,
          title = excluded.title,
          problem = excluded.problem,
          solution = excluded.solution,
          image = excluded.image,
          image_media_id = excluded.image_media_id,
          metrics_label = excluded.metrics_label,
          metrics_value = excluded.metrics_value,
          link = excluded.link,
          updated_at = now()`,
        [
          cmsKey,
          locale,
          cmsKey,
          project.category,
          project.type,
          Boolean(project.featured),
          project.title,
          project.problem,
          project.solution,
          project.image,
          mediaId,
          project.metrics?.label || '',
          project.metrics?.value || '',
          project.link || null,
        ],
      )

      for (const [index, feature] of (project.features || []).entries()) {
        await client.query(
          `insert into projects_features (_order, _parent_id, id, feature)
           values ($1, $2, $3, $4)
           on conflict (id) do update set _order = excluded._order, feature = excluded.feature`,
          [index, cmsKey, `${cmsKey}:feature:${index}`, feature],
        )
      }
    }
  }
}

export async function upsertAuthors(client: Client) {
  for (const author of Object.values(authors)) {
    const result = await client.query<{ id: number }>(
      `insert into authors (slug, name, role_en, role_ar, role_tr, bio_en, bio_ar, bio_tr, updated_at, created_at)
       values ($1, $2, $3, $4, $5, $6, $7, $8, now(), now())
       on conflict (slug) do update set
         name = excluded.name,
         role_en = excluded.role_en,
         role_ar = excluded.role_ar,
         role_tr = excluded.role_tr,
         bio_en = excluded.bio_en,
         bio_ar = excluded.bio_ar,
         bio_tr = excluded.bio_tr,
         updated_at = now()
       returning id`,
      [author.slug, author.name, author.role.en, author.role.ar, '', author.bio.en, author.bio.ar, ''],
    )
    const parentId = result.rows[0].id

    await client.query('delete from authors_knows_about where _parent_id = $1', [parentId])
    for (const [index, topic] of (author.knowsAbout || []).entries()) {
      await client.query(
        `insert into authors_knows_about (_order, _parent_id, id, topic) values ($1, $2, $3, $4)`,
        [index, parentId, `${author.slug}:topic:${index}`, topic],
      )
    }

    await client.query('delete from authors_same_as where _parent_id = $1', [parentId])
    for (const [index, url] of (author.sameAs || []).entries()) {
      await client.query(
        `insert into authors_same_as (_order, _parent_id, id, url) values ($1, $2, $3, $4)`,
        [index, parentId, `${author.slug}:url:${index}`, url],
      )
    }
  }
}

async function upsertFAQs(client: Client) {
  for (const [serviceSlug, faqs] of Object.entries(serviceFAQs)) {
    const result = await client.query<{ id: number }>(
      `insert into service_faqs (service_slug, updated_at, created_at)
       values ($1, now(), now())
       on conflict (service_slug) do update set updated_at = now()
       returning id`,
      [serviceSlug],
    )
    const parentId = result.rows[0].id

    for (const locale of locales) {
      const table = `service_faqs_faqs_${locale}`
      await client.query(`delete from ${table} where _parent_id = $1`, [parentId])
      for (const [index, faq] of (faqs as any)[locale].entries()) {
        await client.query(
          `insert into ${table} (_order, _parent_id, id, q, a) values ($1, $2, $3, $4, $5)`,
          [index, parentId, `${serviceSlug}:${locale}:${index}`, faq.q, faq.a],
        )
      }
    }
  }
}

export async function upsertBlogSeeds(client: Client) {
  const categories = new Map<string, number>()
  const tags = new Map<string, number>()

  for (const category of sampleBlogCategories) {
    const slug = sampleSlug(category.name)
    const result = await client.query<{ id: number }>(
      `insert into blog_categories (
        locale, name, slug, description, short_description, icon, color, "order", featured,
        show_in_navigation, seo_meta_title, seo_meta_description, updated_at, created_at
      )
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, $10, $11, now(), now())
       on conflict (slug) do update set
         locale = excluded.locale,
         name = excluded.name,
         description = excluded.description,
         short_description = excluded.short_description,
         icon = excluded.icon,
         color = excluded.color,
         "order" = excluded."order",
         featured = excluded.featured,
         show_in_navigation = excluded.show_in_navigation,
         seo_meta_title = excluded.seo_meta_title,
         seo_meta_description = excluded.seo_meta_description,
         updated_at = now()
       returning id`,
      [
        'en',
        category.name,
        slug,
        category.description,
        category.description.slice(0, 140),
        category.icon,
        category.color,
        category.order,
        category.featured,
        `${category.name} Insights`,
        category.description,
      ],
    )
    categories.set(category.name, result.rows[0].id)
  }

  for (const tag of sampleBlogTags) {
    const slug = sampleSlug(tag.name)
    const result = await client.query<{ id: number }>(
      `insert into blog_tags (locale, name, slug, description, color, featured, seo_title, seo_description, updated_at, created_at)
       values ($1, $2, $3, $4, '#0284c7', false, $5, $6, now(), now())
       on conflict (slug) do update set
         locale = excluded.locale,
         name = excluded.name,
         description = excluded.description,
         color = excluded.color,
         seo_title = excluded.seo_title,
         seo_description = excluded.seo_description,
         updated_at = now()
       returning id`,
      ['en', tag.name, slug, `CloudTopia articles about ${tag.name}.`, `${tag.name} Insights`, `CloudTopia articles about ${tag.name}.`],
    )
    tags.set(tag.name, result.rows[0].id)
  }

  const author = await client.query<{ id: number }>(
    `select id from authors where slug = $1 limit 1`,
    ['editorial-team'],
  )
  const authorId = author.rows[0]?.id
  if (!authorId) return

  for (const post of sampleBlogPosts) {
    const slug = sampleSlug(post.title)
    const categoryId = categories.get(post.category)
    const media = await client.query<{ id: number }>(
      `select id from media where url = $1 limit 1`,
      [post.coverImage],
    )
    const coverImageId = media.rows[0]?.id || null
    const content = createLexicalArticle(post)
    const contentBlocks = createContentBlocks(post)

    const result = await client.query<{ id: number }>(
      `insert into blog_posts (
        locale, title, slug, subtitle, excerpt, short_excerpt, content, content_blocks,
        cover_image_id, featured_image_alt, category_id, author_id,
        seo_meta_title, seo_meta_description, seo_focus_keyword, seo_keywords,
        status, featured, pinned, editor_pick, trending,
        published_at, reading_time, word_count, views_count, table_of_contents,
        content_type, difficulty, target_audience, service_focus,
        show_c_t_a, cta_title, cta_description, cta_button_text, cta_button_url,
        updated_at, created_at
      )
       values (
        $1, $2, $3, $4, $5, $6, $7::jsonb, $8::jsonb,
        $9, $10, $11, $12,
        $13, $14, $15, $16,
        'published', $17, $18, $19, $20,
        $21, $22, $23, 0, true,
        $24::enum_blog_posts_content_type, $25::enum_blog_posts_difficulty,
        $26::enum_blog_posts_target_audience, $27::enum_blog_posts_service_focus,
        true, $28, $29, 'Start Your Project', '/contact',
        now(), now()
       )
       on conflict (slug) do update set
         locale = excluded.locale,
         title = excluded.title,
         subtitle = excluded.subtitle,
         excerpt = excluded.excerpt,
         short_excerpt = excluded.short_excerpt,
         content = excluded.content,
         content_blocks = excluded.content_blocks,
         cover_image_id = excluded.cover_image_id,
         featured_image_alt = excluded.featured_image_alt,
         category_id = excluded.category_id,
         author_id = excluded.author_id,
         seo_meta_title = excluded.seo_meta_title,
         seo_meta_description = excluded.seo_meta_description,
         seo_focus_keyword = excluded.seo_focus_keyword,
         seo_keywords = excluded.seo_keywords,
         status = excluded.status,
         featured = excluded.featured,
         pinned = excluded.pinned,
         editor_pick = excluded.editor_pick,
         trending = excluded.trending,
         published_at = excluded.published_at,
         reading_time = excluded.reading_time,
         word_count = excluded.word_count,
         table_of_contents = excluded.table_of_contents,
         content_type = excluded.content_type,
         difficulty = excluded.difficulty,
         target_audience = excluded.target_audience,
         service_focus = excluded.service_focus,
         show_c_t_a = excluded.show_c_t_a,
         cta_title = excluded.cta_title,
         cta_description = excluded.cta_description,
         cta_button_text = excluded.cta_button_text,
         cta_button_url = excluded.cta_button_url,
         updated_at = now()
       returning id`,
      [
        'en',
        post.title,
        slug,
        post.sections[0]?.heading || '',
        post.excerpt,
        post.shortExcerpt || post.excerpt.slice(0, 120),
        JSON.stringify(content),
        JSON.stringify(contentBlocks),
        coverImageId,
        `${post.title} CloudTopia insight cover`,
        categoryId || null,
        authorId,
        `${post.title} | CloudTopia Insights`,
        post.excerpt,
        post.tags[0] || post.category,
        post.tags.join(', '),
        Boolean(post.featured),
        Boolean(post.pinned),
        Boolean(post.editorPick),
        Boolean(post.trending),
        post.publishedAt,
        calculateReadingTime(content),
        post.sections.flatMap((section) => [section.heading, section.body, ...(section.bullets || [])]).join(' ').split(/\s+/).filter(Boolean).length,
        post.contentType || 'article',
        post.difficulty || 'beginner',
        post.targetAudience || 'small_businesses',
        post.serviceFocus || 'websites',
        `Need a ${post.category.toLowerCase()} solution built for growth?`,
        'CloudTopia helps businesses turn digital ideas into scalable web solutions with clean design, reliable systems, and practical automation.',
      ],
    )

    const postId = result.rows[0].id
    await client.query(`delete from blog_posts_rels where parent_id = $1 and path in ('tags', 'relatedPosts')`, [postId])

    for (const [index, tagName] of post.tags.entries()) {
      const tagId = tags.get(tagName)
      if (!tagId) continue
      await client.query(
        `insert into blog_posts_rels ("order", parent_id, path, blog_tags_id)
         values ($1, $2, 'tags', $3)`,
        [index, postId, tagId],
      )
    }
  }
}

async function upsertDesignAndPages(client: Client) {
  const structuredDesign = buildStructuredSiteDesign(en)
  const composedDesign = composeSiteDesignJSON(structuredDesign, en)

  await client.query(
    `insert into site_design (
      key,
      brand_name, brand_tagline, brand_logo,
      colors_dark, colors_primary, colors_secondary, colors_background,
      typography_heading, typography_body, typography_logo,
      radius_card, radius_control, motion_enabled, motion_intensity,
      cta_label, cta_href,
      contact_email, contact_phone, contact_whatsapp,
      social_whatsapp, social_x, social_github, social_instagram,
      nav_home_label, nav_services_label, nav_projects_label, nav_labs_label,
      nav_about_label, nav_blog_label, nav_contact_label,
      navigation_labels_home, navigation_labels_services, navigation_labels_projects, navigation_labels_labs,
      navigation_labels_about, navigation_labels_blog, navigation_labels_contact,
      footer_description, footer_copyright,
      theme, navigation, editable_sections, updated_at, created_at
    )
     values (
      $1,
      $2, $3, $4,
      $5, $6, $7, $8,
      $9, $10, $11,
      $12, $13, $14, $15,
      $16, $17,
      $18, $19, $20,
      $21, $22, $23, $24,
      $25, $26, $27, $28,
      $29, $30, $31,
      $32, $33, $34, $35,
      $36, $37, $38,
      $39, $40,
      $41::jsonb, $42::jsonb, $43::jsonb, now(), now()
    )
     on conflict (key) do update set
       brand_name = excluded.brand_name,
       brand_tagline = excluded.brand_tagline,
       brand_logo = excluded.brand_logo,
       colors_dark = excluded.colors_dark,
       colors_primary = excluded.colors_primary,
       colors_secondary = excluded.colors_secondary,
       colors_background = excluded.colors_background,
       typography_heading = excluded.typography_heading,
       typography_body = excluded.typography_body,
       typography_logo = excluded.typography_logo,
       radius_card = excluded.radius_card,
       radius_control = excluded.radius_control,
       motion_enabled = excluded.motion_enabled,
       motion_intensity = excluded.motion_intensity,
       cta_label = excluded.cta_label,
       cta_href = excluded.cta_href,
       contact_email = excluded.contact_email,
       contact_phone = excluded.contact_phone,
       contact_whatsapp = excluded.contact_whatsapp,
       social_whatsapp = excluded.social_whatsapp,
       social_x = excluded.social_x,
       social_github = excluded.social_github,
       social_instagram = excluded.social_instagram,
       nav_home_label = excluded.nav_home_label,
       nav_services_label = excluded.nav_services_label,
       nav_projects_label = excluded.nav_projects_label,
       nav_labs_label = excluded.nav_labs_label,
       nav_about_label = excluded.nav_about_label,
       nav_blog_label = excluded.nav_blog_label,
       nav_contact_label = excluded.nav_contact_label,
       navigation_labels_home = excluded.navigation_labels_home,
       navigation_labels_services = excluded.navigation_labels_services,
       navigation_labels_projects = excluded.navigation_labels_projects,
       navigation_labels_labs = excluded.navigation_labels_labs,
       navigation_labels_about = excluded.navigation_labels_about,
       navigation_labels_blog = excluded.navigation_labels_blog,
       navigation_labels_contact = excluded.navigation_labels_contact,
       footer_description = excluded.footer_description,
       footer_copyright = excluded.footer_copyright,
       theme = excluded.theme,
       navigation = excluded.navigation,
       editable_sections = excluded.editable_sections,
       updated_at = now()`,
    [
      'default',
      structuredDesign.brand.name,
      structuredDesign.brand.tagline,
      structuredDesign.brand.logo,
      structuredDesign.colors.dark,
      structuredDesign.colors.primary,
      structuredDesign.colors.secondary,
      structuredDesign.colors.background,
      structuredDesign.typography.heading,
      structuredDesign.typography.body,
      structuredDesign.typography.logo,
      structuredDesign.radius.card,
      structuredDesign.radius.control,
      structuredDesign.motion.enabled,
      structuredDesign.motion.intensity,
      structuredDesign.cta.label,
      structuredDesign.cta.href,
      structuredDesign.contact.email,
      structuredDesign.contact.phone,
      structuredDesign.contact.whatsapp,
      structuredDesign.social.whatsapp,
      structuredDesign.social.x,
      structuredDesign.social.github,
      structuredDesign.social.instagram,
      structuredDesign.navigationLabels.home,
      structuredDesign.navigationLabels.services,
      structuredDesign.navigationLabels.projects,
      structuredDesign.navigationLabels.labs,
      structuredDesign.navigationLabels.about,
      structuredDesign.navigationLabels.blog,
      structuredDesign.navigationLabels.contact,
      structuredDesign.navigationLabels.home,
      structuredDesign.navigationLabels.services,
      structuredDesign.navigationLabels.projects,
      structuredDesign.navigationLabels.labs,
      structuredDesign.navigationLabels.about,
      structuredDesign.navigationLabels.blog,
      structuredDesign.navigationLabels.contact,
      structuredDesign.footer.description,
      structuredDesign.footer.copyright,
      JSON.stringify({ ...defaultDesign, ...composedDesign.theme }),
      JSON.stringify(composedDesign.navigation),
      JSON.stringify(composedDesign.editableSections),
    ],
  )

  for (const locale of locales) {
    const dictionary = dictionaries[locale] as any
    const projects = dictionary.projects?.projectCards || []
    for (const slug of pageSlugs) {
      const hero = buildPageHero(locale, slug, dictionary)
      const cta = buildPageCTA(locale, slug, dictionary)
      const seo = buildPageSEO(locale, slug, dictionary)
      const sections = buildPageSections(locale, slug, dictionary, projects)
      const template = templateForSlug(slug)

      await client.query(
        `insert into pages (
          locale, slug, title, template, public_path, status,
          hero_badge, hero_title, hero_title_highlight, hero_description,
          hero_primary_label, hero_primary_href, hero_secondary_label, hero_secondary_href,
          cta_label, cta_href, cta_secondary_label, cta_secondary_href,
          seo, sections, design, editor_notes, updated_at, created_at
        )
         values (
          $1, $2, $3, $4, $5, 'published',
          $6, $7, $8, $9,
          $10, $11, $12, $13,
          $14, $15, $16, $17,
          $18::jsonb, $19::jsonb, $20::jsonb, $21, now(), now()
         )
         on conflict (locale, slug) do update set
           title = excluded.title,
           template = excluded.template,
           public_path = excluded.public_path,
           hero_badge = excluded.hero_badge,
           hero_title = excluded.hero_title,
           hero_title_highlight = excluded.hero_title_highlight,
           hero_description = excluded.hero_description,
           hero_primary_label = excluded.hero_primary_label,
           hero_primary_href = excluded.hero_primary_href,
           hero_secondary_label = excluded.hero_secondary_label,
           hero_secondary_href = excluded.hero_secondary_href,
           cta_label = excluded.cta_label,
           cta_href = excluded.cta_href,
           cta_secondary_label = excluded.cta_secondary_label,
           cta_secondary_href = excluded.cta_secondary_href,
           seo = excluded.seo,
           sections = excluded.sections,
           design = excluded.design,
           editor_notes = excluded.editor_notes,
           status = excluded.status,
           updated_at = now()`,
        [
          locale,
          slug,
          pageTitle(locale, slug, dictionary),
          template,
          locale === 'en' ? (slug === '/' ? '/' : `/${slug}`) : `/${locale}${slug === '/' ? '' : `/${slug}`}`,
          hero.badge || null,
          hero.title || null,
          hero.titleHighlight || null,
          hero.description || null,
          hero.primaryLabel || null,
          hero.primaryHref || null,
          hero.secondaryLabel || null,
          hero.secondaryHref || null,
          cta.label || null,
          cta.href || null,
          cta.secondaryLabel || null,
          cta.secondaryHref || null,
          JSON.stringify(seo),
          JSON.stringify(sections),
          JSON.stringify({ editable: true, inherits: 'site-design/default' }),
          'Seeded from existing CloudTopia public content. Edit structured hero/CTA fields first; sections JSON contains the full route payload.',
        ],
      )
    }
  }
}

function mimeTypeFor(filePath: string) {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.svg') return 'image/svg+xml'
  if (ext === '.png') return 'image/png'
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.webp') return 'image/webp'
  return 'application/octet-stream'
}

function titleFromFilename(filePath: string) {
  return path.basename(filePath, path.extname(filePath))
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function cmsFilename(filePath: string) {
  return filePath.replace(/^public[\\/]/, '').split(path.sep).join('__')
}

function collectSiteMedia() {
  const roots = ['public/images', 'public/icons', 'public/og']
  const media: string[] = []

  for (const root of roots) {
    if (!fs.existsSync(root)) continue
    const stack = [root]
    while (stack.length) {
      const current = stack.pop()!
      const stat = fs.statSync(current)
      if (stat.isDirectory()) {
        for (const entry of fs.readdirSync(current)) {
          stack.push(path.join(current, entry))
        }
        continue
      }

      if (/\.(svg|png|jpe?g|webp)$/i.test(current)) {
        media.push(current)
      }
    }
  }

  return media.sort()
}

export async function upsertMedia(client: Client) {
  const rows: Array<{
    alt: string
    caption: string
    filename: string
    filesize: number
    height: number | null
    mimeType: string
    url: string
    width: number | null
  }> = []

  for (const filePath of collectSiteMedia()) {
    const stat = fs.statSync(filePath)
    const url = `/${filePath.replace(/^public\//, '').split(path.sep).join('/')}`
    let width: number | null = null
    let height: number | null = null

    try {
      const metadata = await sharp(filePath).metadata()
      width = metadata.width || null
      height = metadata.height || null
    } catch {
      // SVG or unusual assets may not expose dimensions. Payload can still list them.
    }

    rows.push({
      alt: titleFromFilename(filePath),
      caption: 'Seeded from the existing public site assets.',
      filename: cmsFilename(filePath),
      filesize: stat.size,
      height,
      mimeType: mimeTypeFor(filePath),
      url,
      width,
    })
  }

  if (rows.length === 0) return

  await client.query(
    `delete from media where url = any($1::text[]) and caption = $2`,
    [rows.map((row) => row.url), 'Seeded from the existing public site assets.'],
  )

  const values: unknown[] = []
  const placeholders = rows.map((row, index) => {
    const offset = index * 8
    values.push(row.alt, row.caption, row.url, row.filename, row.mimeType, row.filesize, row.width, row.height)
    return `($${offset + 1}, $${offset + 2}, $${offset + 3}, null, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8}, 50, 50, now(), now())`
  })

  await client.query(
    `insert into media (
      alt, caption, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y, updated_at, created_at
    )
    values ${placeholders.join(', ')}`,
    values,
  )

  const sequence = await client.query<{ max_id: number | null }>('select max(id) as max_id from media')
  if (sequence.rows[0]?.max_id) {
    await client.query(`select setval(pg_get_serial_sequence('media', 'id'), $1, true)`, [sequence.rows[0].max_id])
  }
}

async function main() {
  loadLocalEnv()
  const databaseUrl = getDatabaseUrl()

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is missing. Set it before running seed:payload in production.')
  }

  const client = new Client({ connectionString: databaseUrl })
  await client.connect()
  try {
    await client.query('begin')
    await upsertMedia(client)
    await upsertSiteContent(client)
    await upsertProjects(client)
    await upsertAuthors(client)
    await upsertBlogSeeds(client)
    await upsertFAQs(client)
    await upsertDesignAndPages(client)
    await client.query('commit')
    console.log('Direct Payload seed complete.')
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    await client.end()
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
