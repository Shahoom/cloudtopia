import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Brush,
  FileText,
  FolderKanban,
  HelpCircle,
  Image as ImageIcon,
  Languages,
  Plus,
} from 'lucide-react'
import { isDatabaseConfigured, queryDatabase } from '../../lib/cms/db.ts'

// Presentation lives in app/(payload)/cloudtopia-admin.css under `.ct-fast-list*`
// (design E). Only the per-row colour swatch keeps an inline style, because its
// value comes from the database.

type RowValue = string | number | boolean | null | undefined

type Column<T> = {
  key: string
  label: string
  render: (row: T) => ReactNode
}

type ListShellProps<T> = {
  actionHref: string
  actionLabel?: string
  columns: Column<T>[]
  countLabel: string
  description: string
  emptyLabel: string
  icon: typeof FileText
  rows: T[]
  title: string
}

type StatusTone = 'success' | 'info' | 'review' | 'danger' | 'neutral'

export async function FastPagesListView() {
  const rows = await safeQuery<{
    id: number
    locale: string
    slug: string
    status: string
    template: string
    title: string
    updated_at: string
  }>(`
    select id, title, locale, slug, template, status, updated_at
    from pages
    order by locale asc, slug asc
  `)

  return (
    <ListShell
      actionHref="/admin/collections/pages/create"
      columns={[
        { key: 'title', label: 'Title', render: (row) => editLink('pages', row.id, row.title) },
        { key: 'locale', label: 'Locale', render: (row) => localePill(row.locale) },
        { key: 'slug', label: 'Slug', render: (row) => value(row.slug) },
        { key: 'template', label: 'Template', render: (row) => value(titleCase(row.template)) },
        { key: 'status', label: 'Status', render: (row) => statusPill(row.status) },
        { key: 'updated', label: 'Updated', render: (row) => small(formatDate(row.updated_at)) },
      ]}
      countLabel={`${rows.length} public page records`}
      description="Structured route content, hero copy, SEO, CTA, and design overrides connected to the live website."
      emptyLabel="No pages found. Run the Payload seed or create the first page."
      icon={FileText}
      rows={rows}
      title="Pages"
    />
  )
}

export async function FastProjectsListView() {
  const rows = await safeQuery<{
    category: string
    featured: boolean
    id: string
    image: string
    locale: string
    title: string
    type: string
    updated_at: string
  }>(`
    select p.id, p.title, p.locale, p.category, p.type, p.featured, coalesce(m.url, p.image) as image, p.updated_at
    from projects p
    left join media m on m.id = p.image_media_id
    order by locale asc, title asc
  `)

  return (
    <ListShell
      actionHref="/admin/collections/projects/create"
      columns={[
        { key: 'title', label: 'Project', render: (row) => editLink('projects', row.id, row.title) },
        { key: 'locale', label: 'Locale', render: (row) => localePill(row.locale) },
        { key: 'category', label: 'Category', render: (row) => value(row.category) },
        { key: 'type', label: 'Type', render: (row) => value(row.type) },
        { key: 'featured', label: 'Featured', render: (row) => yesNo(row.featured) },
        { key: 'image', label: 'Image', render: (row) => mediaPath(row.image) },
      ]}
      countLabel={`${rows.length} project entries`}
      description="Portfolio cards, case study copy, metrics, and image references used by the public Projects page."
      emptyLabel="No projects found. Seed or create portfolio entries."
      icon={FolderKanban}
      rows={rows}
      title="Projects"
    />
  )
}

export async function FastServiceFAQsListView() {
  const rows = await safeQuery<{
    ar_count: string
    en_count: string
    id: number
    service_slug: string
    updated_at: string
  }>(`
    select
      sf.id,
      sf.service_slug,
      sf.updated_at,
      (select count(*)::text from service_faqs_faqs_en where _parent_id = sf.id) as en_count,
      (select count(*)::text from service_faqs_faqs_ar where _parent_id = sf.id) as ar_count
    from service_faqs sf
    order by sf.service_slug asc
  `)

  return (
    <ListShell
      actionHref="/admin/collections/service-faqs/create"
      actionLabel="Create FAQ Set"
      columns={[
        {
          key: 'service',
          label: 'Service',
          render: (row) => editLink('service-faqs', row.id, titleCase(row.service_slug)),
        },
        { key: 'slug', label: 'Slug', render: (row) => value(row.service_slug) },
        { key: 'en', label: 'EN', render: (row) => countBadge(row.en_count) },
        { key: 'ar', label: 'AR', render: (row) => countBadge(row.ar_count) },
        { key: 'updated', label: 'Updated', render: (row) => small(formatDate(row.updated_at)) },
      ]}
      countLabel={`${rows.length} service FAQ sets`}
      description="FAQ content used by service pages and structured data, split cleanly by language."
      emptyLabel="No service FAQs found."
      icon={HelpCircle}
      rows={rows}
      title="Service FAQs"
    />
  )
}

export async function FastSiteContentListView() {
  const rows = await safeQuery<{
    dictionary_bytes: string
    id: number
    locale: string
    updated_at: string
  }>(`
    select id, locale, octet_length(dictionary::text)::text as dictionary_bytes, updated_at
    from site_content
    order by locale asc
  `)

  return (
    <ListShell
      actionHref="/admin/collections/site-content/create"
      actionLabel="Create Locale"
      columns={[
        { key: 'locale', label: 'Locale', render: (row) => editLink('site-content', row.id, localePill(row.locale)) },
        { key: 'status', label: 'Status', render: () => statusPill('published') },
        { key: 'size', label: 'Dictionary', render: (row) => small(formatBytes(row.dictionary_bytes)) },
        { key: 'updated', label: 'Updated', render: (row) => small(formatDate(row.updated_at)) },
      ]}
      countLabel={`${rows.length} locale dictionaries`}
      description="Live multilingual site dictionaries used as a fallback and sync target for page edits."
      emptyLabel="No locale dictionaries found. Run the Payload seed before editing locale content."
      icon={Languages}
      rows={rows}
      title="Locales"
    />
  )
}

export async function FastMediaListView() {
  const rows = await safeQuery<{
    alt: string
    filename: string
    filesize: string
    height: string
    id: number
    mime_type: string
    updated_at: string
    url: string
    width: string
  }>(`
    select id, alt, filename, url, mime_type, filesize, width, height, updated_at
    from media
    where deleted_at is null
    order by id desc
    limit 120
  `)

  return (
    <ListShell
      actionHref="/admin/collections/media/create"
      actionLabel="Upload Media"
      columns={[
        { key: 'asset', label: 'Asset', render: (row) => mediaPreview(row) },
        { key: 'alt', label: 'Alt Text', render: (row) => editLink('media', row.id, row.alt || row.filename) },
        { key: 'type', label: 'Type', render: (row) => value(row.mime_type) },
        { key: 'size', label: 'Size', render: (row) => small(`${row.width || '-'} x ${row.height || '-'} / ${formatBytes(row.filesize)}`) },
        { key: 'path', label: 'Path', render: (row) => mediaPath(row.url) },
      ]}
      countLabel={`${rows.length} media assets shown`}
      description="Existing public site assets are registered here with alt text. New uploads still use Payload media upload."
      emptyLabel="No media found. Existing public assets should be seeded here."
      icon={ImageIcon}
      rows={rows}
      title="Media"
    />
  )
}

export async function FastSiteDesignListView() {
  const rows = await safeQuery<{
    brand_name: string
    colors_background: string
    colors_primary: string
    id: number
    key: string
    updated_at: string
  }>(`
    select id, key, brand_name, colors_primary, colors_background, updated_at
    from site_design
    order by key asc
  `)

  return (
    <ListShell
      actionHref="/admin/collections/site-design/create"
      actionLabel="Create Design"
      columns={[
        { key: 'key', label: 'Design', render: (row) => editLink('site-design', row.id, row.key) },
        { key: 'brand', label: 'Brand', render: (row) => value(row.brand_name) },
        { key: 'primary', label: 'Primary', render: (row) => colorSwatch(row.colors_primary) },
        { key: 'background', label: 'Background', render: (row) => colorSwatch(row.colors_background) },
        { key: 'updated', label: 'Updated', render: (row) => small(formatDate(row.updated_at)) },
      ]}
      countLabel={`${rows.length} active design record`}
      description="Global brand, colors, typography, navigation labels, CTA, footer, contact, and motion settings."
      emptyLabel="No site design record found. Create the default design before publishing."
      icon={Brush}
      rows={rows}
      title="Site Design"
    />
  )
}

async function safeQuery<T extends Record<string, RowValue>>(query: string): Promise<T[]> {
  if (!isDatabaseConfigured()) return []

  try {
    return await queryDatabase<T>(query)
  } catch {
    return []
  }
}

function ListShell<T>({
  actionHref,
  actionLabel = 'Create New',
  columns,
  countLabel,
  description,
  emptyLabel,
  icon: Icon,
  rows,
  title,
}: ListShellProps<T>) {
  return (
    <main className="ct-fast-list">
      <header className="ct-fast-list__header">
        <div className="ct-fast-list__heading">
          <h1 className="ct-fast-list__title">
            {title}
            <span className="ct-fast-list__count">{rows.length}</span>
          </h1>
          <p className="ct-fast-list__description">{description}</p>
        </div>
        <Link className="ct-fast-list__create" href={actionHref}>
          <Plus aria-hidden="true" size={14} strokeWidth={2.2} />
          {actionLabel}
        </Link>
      </header>

      <section className="ct-fast-list__card">
        {rows.length > 0 ? (
          <>
            <div className="ct-fast-list__scroller">
              <table className="ct-fast-list__table">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column.key} scope="col">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      {columns.map((column) => (
                        <td key={column.key}>{column.render(row)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <footer className="ct-fast-list__foot">{countLabel}</footer>
          </>
        ) : (
          <div className="ct-fast-list__empty">
            <span className="ct-fast-list__empty-icon">
              <Icon aria-hidden="true" size={18} />
            </span>
            <p>{emptyLabel}</p>
            <Link className="ct-fast-list__create ct-fast-list__create--secondary" href={actionHref}>
              <Plus aria-hidden="true" size={14} strokeWidth={2.2} />
              {actionLabel}
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}

function editLink(collection: string, id: string | number, label: ReactNode) {
  return (
    <Link className="ct-fast-list__link" href={`/admin/collections/${collection}/${encodeURIComponent(String(id))}`}>
      {label}
    </Link>
  )
}

function value(input: RowValue) {
  return <span className="ct-fast-list__value">{String(input || '-')}</span>
}

function small(input: RowValue) {
  return <span className="ct-fast-list__muted">{String(input || '-')}</span>
}

function mediaPath(input: RowValue) {
  const text = String(input || '-')

  return (
    <span className="ct-fast-list__path" title={text}>
      {text}
    </span>
  )
}

function localePill(locale: RowValue) {
  return <span className="ct-fast-list__locale">{String(locale || 'en').toUpperCase()}</span>
}

function statusPill(status: RowValue) {
  const key = String(status || 'draft')

  return <span className={`ct-fast-list__status ct-fast-list__status--${statusTone(key)}`}>{titleCase(key)}</span>
}

function statusTone(status: string): StatusTone {
  switch (status) {
    case 'published':
    case 'active':
    case 'completed':
      return 'success'
    case 'scheduled':
    case 'pending':
      return 'info'
    case 'review':
    case 'in-review':
      return 'review'
    case 'failed':
    case 'error':
      return 'danger'
    default:
      return 'neutral'
  }
}

function countBadge(input: RowValue) {
  return <span className="ct-fast-list__badge">{String(input || '0')}</span>
}

function yesNo(input: boolean) {
  return (
    <span className={`ct-fast-list__status ct-fast-list__status--${input ? 'success' : 'neutral'}`}>
      {input ? 'Yes' : 'No'}
    </span>
  )
}

function colorSwatch(color: RowValue) {
  const token = String(color || '#ffffff')

  return (
    <span className="ct-fast-list__swatch">
      <span aria-hidden="true" className="ct-fast-list__swatch-chip" style={{ background: token }} />
      <code>{token}</code>
    </span>
  )
}

function mediaPreview(row: { alt?: string; filename?: string; url?: string }) {
  return (
    <span className="ct-fast-list__media">
      {/* eslint-disable-next-line @next/next/no-img-element -- Admin thumbnails use existing public asset URLs and do not affect public LCP. */}
      {row.url ? <img alt="" className="ct-fast-list__thumb" src={row.url} /> : <span className="ct-fast-list__thumb" />}
      <span className="ct-fast-list__media-name">{row.filename || row.alt || 'Asset'}</span>
    </span>
  )
}

function titleCase(input: string) {
  return input
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function formatDate(input: RowValue) {
  if (!input) return '-'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(String(input)))
}

function formatBytes(input: RowValue) {
  const bytes = Number(input || 0)
  if (!Number.isFinite(bytes) || bytes <= 0) return '-'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
