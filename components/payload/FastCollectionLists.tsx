import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import {
  Brush,
  CheckCircle2,
  FileText,
  FolderKanban,
  HelpCircle,
  Image as ImageIcon,
  Languages,
  Plus,
} from 'lucide-react'
import { isDatabaseConfigured, queryDatabase } from '../../lib/cms/db.ts'

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
    <main className="ct-fast-list" style={styles.page}>
      <style>{listStyles}</style>
      <section className="ct-fast-list-header" style={styles.header}>
        <span style={styles.headerIcon}>
          <Icon size={20} />
        </span>
        <span style={styles.headerCopy}>
          <span style={styles.kicker}>CloudTopia CMS</span>
          <h1 style={styles.title}>{title}</h1>
          <p style={styles.description}>{description}</p>
        </span>
        <span style={styles.headerActions}>
          <span style={styles.count}>{countLabel}</span>
          <Link href={actionHref} style={styles.action}>
            <Plus size={16} />
            {actionLabel}
          </Link>
        </span>
      </section>

      <section style={styles.tableShell}>
        {rows.length > 0 ? (
          <div style={styles.tableScroller}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} style={styles.th}>
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} style={styles.tr}>
                    {columns.map((column) => (
                      <td key={column.key} style={styles.td}>
                        {column.render(row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.empty}>{emptyLabel}</div>
        )}
      </section>
    </main>
  )
}

function editLink(collection: string, id: string | number, label: ReactNode) {
  return (
    <Link href={`/admin/collections/${collection}/${encodeURIComponent(String(id))}`} style={styles.editLink}>
      {label}
    </Link>
  )
}

function value(input: RowValue) {
  return <span style={styles.value}>{String(input || '-')}</span>
}

function small(input: RowValue) {
  return <span style={styles.small}>{String(input || '-')}</span>
}

function mediaPath(input: RowValue) {
  return <span style={styles.path}>{String(input || '-')}</span>
}

function localePill(locale: RowValue) {
  return <span style={styles.pill}>{String(locale || 'en').toUpperCase()}</span>
}

function statusPill(status: RowValue) {
  const active = status === 'published'
  return (
    <span style={{ ...styles.pill, ...(active ? styles.goodPill : styles.warnPill) }}>
      {active ? <CheckCircle2 size={13} /> : null}
      {titleCase(String(status || 'draft'))}
    </span>
  )
}

function countBadge(input: RowValue) {
  return <span style={styles.countBadge}>{String(input || '0')}</span>
}

function yesNo(input: boolean) {
  return <span style={{ ...styles.pill, ...(input ? styles.goodPill : styles.neutralPill) }}>{input ? 'Yes' : 'No'}</span>
}

function colorSwatch(color: RowValue) {
  const token = String(color || '#ffffff')
  return (
    <span style={styles.swatchWrap}>
      <span style={{ ...styles.swatch, background: token }} />
      {token}
    </span>
  )
}

function mediaPreview(row: { alt?: string; filename?: string; url?: string }) {
  return (
    <span style={styles.mediaPreview}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Admin thumbnails use existing public asset URLs and do not affect public LCP. */}
      {row.url ? <img src={row.url} alt="" style={styles.thumb} /> : <span style={styles.thumbFallback} />}
      <span style={styles.mediaName}>{row.filename || row.alt || 'Asset'}</span>
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

const styles: Record<string, CSSProperties> = {
  page: {
    display: 'grid',
    gap: 16,
    padding: '24px clamp(18px, 3vw, 34px) 40px',
    color: '#071522',
    fontFamily: 'var(--font-cairo), ui-sans-serif, system-ui, sans-serif',
  },
  header: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr) auto',
    gap: 16,
    alignItems: 'center',
    border: '1px solid #dce7f1',
    borderRadius: 8,
    background: '#ffffff',
    padding: 18,
    boxShadow: '0 18px 45px rgba(7, 21, 34, 0.06)',
  },
  headerIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 46,
    borderRadius: 8,
    background: '#071522',
    color: '#8ee6ff',
  },
  headerCopy: {
    display: 'grid',
    gap: 4,
    minWidth: 0,
  },
  kicker: {
    color: '#0b75bc',
    fontSize: 12,
    fontWeight: 950,
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    margin: 0,
    color: '#071522',
    fontSize: 'clamp(28px, 4vw, 46px)',
    lineHeight: 1,
    letterSpacing: 0,
  },
  description: {
    maxWidth: 820,
    margin: 0,
    color: '#54677a',
    fontSize: 15,
    lineHeight: 1.5,
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    flexWrap: 'wrap',
  },
  count: {
    border: '1px solid #dce7f1',
    borderRadius: 8,
    padding: '9px 11px',
    color: '#40566a',
    fontSize: 12,
    fontWeight: 900,
    whiteSpace: 'nowrap',
  },
  action: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    minHeight: 40,
    borderRadius: 8,
    background: '#071522',
    color: '#ffffff',
    padding: '0 14px',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 950,
    whiteSpace: 'nowrap',
  },
  tableShell: {
    border: '1px solid #dce7f1',
    borderRadius: 8,
    overflow: 'hidden',
    background: '#ffffff',
    boxShadow: '0 22px 70px rgba(7, 21, 34, 0.07)',
  },
  tableScroller: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    minWidth: 880,
    borderCollapse: 'separate',
    borderSpacing: 0,
  },
  th: {
    padding: '14px 16px',
    borderBottom: '1px solid #dce7f1',
    background: '#f7fbff',
    color: '#40566a',
    fontSize: 12,
    fontWeight: 950,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  tr: {
    background: '#ffffff',
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid #edf3f8',
    color: '#071522',
    fontSize: 14,
    verticalAlign: 'middle',
  },
  editLink: {
    color: '#071522',
    fontWeight: 950,
    textDecoration: 'underline',
    textUnderlineOffset: 4,
  },
  value: {
    color: '#26394d',
    fontWeight: 800,
  },
  small: {
    color: '#63778a',
    fontSize: 12,
    fontWeight: 800,
  },
  path: {
    display: 'inline-block',
    maxWidth: 300,
    overflow: 'hidden',
    color: '#63778a',
    fontSize: 12,
    fontWeight: 800,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    border: '1px solid #dce7f1',
    borderRadius: 8,
    background: '#f7fbff',
    color: '#40566a',
    padding: '5px 8px',
    fontSize: 12,
    fontWeight: 950,
    whiteSpace: 'nowrap',
  },
  goodPill: {
    borderColor: '#c8f0dc',
    background: '#f0fff6',
    color: '#0f8a57',
  },
  warnPill: {
    borderColor: '#fde5bd',
    background: '#fff8ed',
    color: '#b45309',
  },
  neutralPill: {
    borderColor: '#dce7f1',
    background: '#f7fbff',
    color: '#63778a',
  },
  countBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 32,
    height: 28,
    borderRadius: 8,
    background: '#071522',
    color: '#8ee6ff',
    fontSize: 12,
    fontWeight: 950,
  },
  swatchWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    color: '#26394d',
    fontSize: 13,
    fontWeight: 900,
  },
  swatch: {
    width: 22,
    height: 22,
    border: '1px solid #dce7f1',
    borderRadius: 8,
    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.35)',
  },
  mediaPreview: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
  },
  thumb: {
    width: 44,
    height: 44,
    border: '1px solid #dce7f1',
    borderRadius: 8,
    background: '#f7fbff',
    objectFit: 'cover',
  },
  thumbFallback: {
    width: 44,
    height: 44,
    borderRadius: 8,
    background: '#e7f4ff',
  },
  mediaName: {
    display: 'inline-block',
    maxWidth: 220,
    overflow: 'hidden',
    color: '#26394d',
    fontSize: 13,
    fontWeight: 900,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  empty: {
    padding: 32,
    color: '#63778a',
    fontWeight: 900,
  },
}

const listStyles = `
  .ct-fast-list a:hover {
    opacity: 0.84;
  }

  @media (max-width: 980px) {
    .ct-fast-list-header {
      grid-template-columns: 1fr;
    }
  }
`
