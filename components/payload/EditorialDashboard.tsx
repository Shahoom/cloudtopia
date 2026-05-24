import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  Brush,
  CheckCircle2,
  Clock,
  Database,
  FileText,
  FolderKanban,
  Globe2,
  HelpCircle,
  Image,
  Layers,
  LayoutDashboard,
} from 'lucide-react'
import { isDatabaseConfigured, queryDatabase } from '../../lib/cms/db.ts'
import { cmsPageSlugs } from '../../lib/cms/page-structure.ts'

type DashboardData = {
  editableSurfaces: number
  stats: Array<{
    label: string
    value: string
    hint: string
    icon: typeof Globe2
  }>
  highlights: Array<{
    label: string
    value: string
  }>
  health: Array<{
    label: string
    value: string
    detail: string
    ok: boolean
  }>
  designId: string | number
}

const workflow = ['Edit in Payload', 'Preview public route', 'Publish when ready']

const editCards = [
  {
    key: 'homepage',
    href: '/admin/collections/pages?where[slug][equals]=%2F',
    label: 'Homepage',
    detail: 'Hero copy, sections, SEO, and page CTA.',
    icon: Layers,
  },
  {
    key: 'site-design',
    href: '/admin/collections/site-design/1',
    label: 'Site Design',
    detail: 'Colors, typography, motion, brand, CTA, and contact settings.',
    icon: Brush,
  },
  {
    key: 'service-pages',
    href: '/admin/collections/pages?where[template][equals]=service-detail',
    label: 'Service Pages',
    detail: 'Structured service heroes, sections, and SEO.',
    icon: HelpCircle,
  },
  {
    key: 'projects',
    href: '/admin/collections/projects',
    label: 'Projects',
    detail: 'Portfolio cards, project details, images, and metrics.',
    icon: FolderKanban,
  },
  {
    key: 'blog-posts',
    href: '/admin/collections/blog-posts',
    label: 'Insights',
    detail: 'Blog posts, SEO fields, topics, tags, and publishing workflow.',
    icon: FileText,
  },
  {
    key: 'media',
    href: '/admin/collections/media',
    label: 'Media',
    detail: 'Upload assets with required alt text.',
    icon: Image,
  },
  {
    key: 'preview',
    href: '/',
    label: 'Preview Website',
    detail: 'Open the public website using the latest CMS content.',
    icon: ArrowUpRight,
  },
]

export async function EditorialDashboard() {
  const data = await getDashboardData()
  const cards = editCards.map((card) =>
    card.key === 'site-design' ? { ...card, href: `/admin/collections/site-design/${data.designId}` } : card,
  )

  return (
    <main style={styles.page}>
      <style>{dashboardShellStyles}</style>
      <section style={styles.shell}>
        <header className="ct-dashboard-header" style={styles.header}>
          <div>
            <div style={styles.kicker}>
              <LayoutDashboard size={15} />
              Local Payload Workspace
            </div>
            <h1 style={styles.title}>CloudTopia control room</h1>
            <p style={styles.lede}>
              A connected view of content, design, publishing health, and the local Postgres data powering the public site.
            </p>
            <div style={styles.headerHighlights} aria-label="Workspace highlights">
              {data.highlights.map((item) => (
                <span key={item.label} style={styles.headerHighlight}>
                  <strong>{item.value}</strong>
                  {item.label}
                </span>
              ))}
            </div>
          </div>
          <div style={styles.headerActions}>
            <Link className="ct-admin-primary-btn" href="/admin/collections/pages" style={styles.primaryAction}>
              Edit Content <ArrowUpRight size={16} />
            </Link>
            <Link className="ct-admin-secondary-btn" href="/" style={styles.secondaryAction}>
              View Site
            </Link>
          </div>
        </header>

        <section style={styles.statusBar} aria-label="CMS status">
          <span style={styles.statusPill}>
            <span style={styles.pulse} />
            {isDatabaseConfigured() ? 'Local database online' : 'Static fallback mode'}
          </span>
          <strong>{data.editableSurfaces}</strong>
          <span>editable records connected to the website</span>
          <div style={styles.workflow}>
            {workflow.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section style={styles.statsGrid} aria-label="Content overview">
          {data.stats.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.label} style={styles.statCard}>
                <span style={styles.statIcon}>
                  <Icon size={18} />
                </span>
                <span style={styles.statCopy}>
                  <span style={styles.statLabel}>{item.label}</span>
                  <strong style={styles.statValue}>{item.value}</strong>
                  <span style={styles.statHint}>{item.hint}</span>
                </span>
              </article>
            )
          })}
        </section>

        <section className="ct-dashboard-two-column" style={styles.twoColumn}>
          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <div>
                <p style={styles.panelKicker}>Edit Surfaces</p>
                <h2 style={styles.panelTitle}>Go straight to the right system</h2>
              </div>
            </div>
            <div style={styles.cardGrid}>
              {cards.map((card) => {
                const Icon = card.icon
                return (
                  <Link className="ct-admin-edit-card" key={card.key} href={card.href} style={styles.editCard}>
                    <span style={styles.editIcon}>
                      <Icon size={19} />
                    </span>
                    <span style={styles.editCopy}>
                      <span style={styles.editTitle}>
                        {card.label}
                        <ArrowUpRight size={15} />
                      </span>
                      <span style={styles.editDetail}>{card.detail}</span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          <aside style={styles.panel}>
            <div style={styles.panelHeader}>
              <div>
                <p style={styles.panelKicker}>Data Health</p>
                <h2 style={styles.panelTitle}>Publishing checks</h2>
              </div>
            </div>
            <div style={styles.healthList}>
              {data.health.map((item) => {
                const Icon = item.ok ? CheckCircle2 : AlertTriangle
                return (
                  <article key={item.label} style={styles.healthItem}>
                    <span style={{ ...styles.healthIcon, color: item.ok ? '#34d399' : '#fbbf24' }}>
                      <Icon size={18} />
                    </span>
                    <span>
                      <span style={styles.healthTopline}>
                        <strong>{item.value}</strong>
                        {item.label}
                      </span>
                      <span style={styles.healthDetail}>{item.detail}</span>
                    </span>
                  </article>
                )
              })}
            </div>
          </aside>
        </section>

        <section style={styles.aiPanel}>
          <span style={styles.aiIcon}>
            <Bot size={19} />
          </span>
          <span>
            <strong style={styles.aiTitle}>Draft studio is staged for the next layer</strong>
            <span style={styles.aiCopy}>
              The blog is reset. When you are ready, AI can create draft-only posts with editor approval, SEO fields, and multilingual outlines.
            </span>
          </span>
        </section>
      </section>
    </main>
  )
}

async function getDashboardData(): Promise<DashboardData> {
  const fallback: DashboardData = {
    editableSurfaces: 0,
    designId: 1,
    highlights: [
      { label: 'database', value: isDatabaseConfigured() ? 'Local' : 'Offline' },
      { label: 'CMS', value: 'Payload 3' },
      { label: 'Supabase', value: 'Removed' },
    ],
    stats: [
      { label: 'Locales', value: '3', hint: 'EN / AR / TR', icon: Globe2 },
      { label: 'Published Pages', value: '0', hint: 'Connect DATABASE_URL to load live counts', icon: FileText },
      { label: 'Projects', value: '0', hint: 'Portfolio entries in Payload', icon: FolderKanban },
      { label: 'Insights', value: '0', hint: 'Blog posts in Payload', icon: FileText },
      { label: 'Database', value: isDatabaseConfigured() ? 'Local' : 'Static', hint: 'Public site fallback is safe', icon: Database },
    ],
    health: [
      { label: 'Database', value: isDatabaseConfigured() ? 'Checking' : 'Offline', detail: 'Dashboard needs DATABASE_URL.', ok: isDatabaseConfigured() },
    ],
  }

  if (!isDatabaseConfigured()) return fallback

  try {
    const [counts, pages, mediaMissingAlt, designRows] = await Promise.all([
      queryDatabase<{
        published_pages: string
        draft_pages: string
        projects: string
        blog_posts: string
        faqs: string
        media: string
        users: string
      }>(`
        select
          (select count(*) from pages where status = 'published')::text as published_pages,
          (select count(*) from pages where status = 'draft')::text as draft_pages,
          (select count(*) from projects)::text as projects,
          (select count(*) from blog_posts)::text as blog_posts,
          (select count(*) from service_faqs)::text as faqs,
          (select count(*) from media)::text as media,
          (select count(*) from users)::text as users
      `),
      queryDatabase<{
        locale: string
        slug: string
        status: string
        seo: Record<string, unknown> | null
        sections: Record<string, unknown> | null
      }>('select locale, slug, status, seo, sections from pages'),
      queryDatabase<{ count: string }>("select count(*)::text as count from media where nullif(trim(coalesce(alt, '')), '') is null"),
      queryDatabase<{ id: string | number }>("select id from site_design where key = 'default' limit 1"),
    ])

    const countRow = counts[0]
    const publishedPages = Number(countRow?.published_pages || 0)
    const draftPages = Number(countRow?.draft_pages || 0)
    const projects = Number(countRow?.projects || 0)
    const blogPosts = Number(countRow?.blog_posts || 0)
    const faqs = Number(countRow?.faqs || 0)
    const media = Number(countRow?.media || 0)
    const users = Number(countRow?.users || 0)
    const missingMediaAlt = Number(mediaMissingAlt[0]?.count || 0)
    const requiredLocales = ['en', 'ar', 'tr']
    const pageKeys = new Set(pages.map((page) => `${page.locale}:${page.slug}`))
    const missingLocalePages = requiredLocales.flatMap((locale) =>
      cmsPageSlugs
        .filter((slug) => !pageKeys.has(`${locale}:${slug}`))
        .map((slug) => `${locale}/${slug}`),
    )
    const placeholderPages = pages.filter((page) => JSON.stringify(page.sections || {}).includes('Use site-content dictionary keys'))
    const publishedMissingSEO = pages.filter((page) => {
      const description = typeof page.seo?.description === 'string' ? page.seo.description.trim() : ''
      return page.status === 'published' && description.length === 0
    })
    const localesComplete = requiredLocales.filter((locale) =>
      cmsPageSlugs.every((slug) => pageKeys.has(`${locale}:${slug}`)),
    ).length

    return {
      editableSurfaces: publishedPages + projects + blogPosts + faqs + media,
      designId: designRows[0]?.id || 1,
      highlights: [
        { label: 'database', value: 'Local' },
        { label: 'CMS', value: 'Payload 3' },
        { label: 'Supabase', value: 'Removed' },
      ],
      stats: [
        { label: 'Locales', value: String(localesComplete), hint: 'Complete locale sets out of 3', icon: Globe2 },
        { label: 'Published Pages', value: String(publishedPages), hint: `${draftPages} drafts waiting`, icon: FileText },
        { label: 'Projects', value: String(projects), hint: 'Portfolio entries in Payload', icon: FolderKanban },
        { label: 'Insights', value: String(blogPosts), hint: 'CMS-powered published and draft articles', icon: FileText },
        { label: 'Media', value: String(media), hint: 'Local upload/library records', icon: Image },
        { label: 'FAQs', value: String(faqs), hint: 'Structured service answers', icon: HelpCircle },
        { label: 'Updated', value: 'Live', hint: 'Counts read from Postgres', icon: Clock },
      ],
      health: [
        {
          label: 'Database',
          value: 'Online',
          detail: 'Payload tables are readable from local Postgres.',
          ok: true,
        },
        {
          label: 'Missing locale pages',
          value: String(missingLocalePages.length),
          detail: missingLocalePages.length ? missingLocalePages.slice(0, 3).join(', ') : 'All required routes exist in EN / AR / TR.',
          ok: missingLocalePages.length === 0,
        },
        {
          label: 'Placeholder sections',
          value: String(placeholderPages.length),
          detail: placeholderPages.length ? 'Replace old placeholder JSON before publishing.' : 'No placeholder page sections found.',
          ok: placeholderPages.length === 0,
        },
        {
          label: 'Missing SEO descriptions',
          value: String(publishedMissingSEO.length),
          detail: publishedMissingSEO.length ? 'Published pages need descriptions.' : 'Every published page has an SEO description.',
          ok: publishedMissingSEO.length === 0,
        },
        {
          label: 'Media without alt text',
          value: String(missingMediaAlt),
          detail: missingMediaAlt ? 'Add alt text before using these assets publicly.' : 'Media accessibility metadata is clean.',
          ok: missingMediaAlt === 0,
        },
        {
          label: 'Admin users',
          value: String(users),
          detail: users ? 'Admin access is configured.' : 'Create the first Payload user before handing the CMS to editors.',
          ok: users > 0,
        },
      ],
    }
  } catch {
    return {
      ...fallback,
      health: [
        {
          label: 'Database',
          value: 'Error',
          detail: 'Could not read live Payload tables. Check DATABASE_URL and migrations.',
          ok: false,
        },
      ],
    }
  }
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    background:
      'linear-gradient(135deg, rgba(199, 163, 92, 0.12), transparent 32%), linear-gradient(180deg, #f6f1e8 0%, #ece6da 100%)',
    color: '#1b1712',
    padding: '24px clamp(16px, 4vw, 42px) 42px',
    fontFamily: 'var(--font-cairo), ui-sans-serif, system-ui, sans-serif',
  },
  shell: {
    display: 'grid',
    gap: 16,
    maxWidth: 1280,
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 18,
    alignItems: 'flex-end',
    borderRadius: 12,
    background: 'linear-gradient(135deg, #171411 0%, #272016 58%, #101412 100%)',
    color: '#fff8ea',
    padding: '28px clamp(20px, 4vw, 34px)',
    border: '1px solid rgba(199, 163, 92, 0.28)',
    boxShadow: '0 26px 70px rgba(50, 38, 20, 0.18)',
  },
  kicker: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    color: '#d8b86e',
    fontSize: 12,
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: 0,
  },
  title: {
    margin: '10px 0 0',
    fontSize: 'clamp(32px, 4.5vw, 52px)',
    lineHeight: 1,
    letterSpacing: 0,
    fontWeight: 950,
    color: '#fff8ea',
  },
  lede: {
    maxWidth: 720,
    margin: '12px 0 0',
    color: '#cfc3ad',
    lineHeight: 1.6,
  },
  headerHighlights: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 18,
  },
  headerHighlight: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    minHeight: 34,
    borderRadius: 8,
    border: '1px solid rgba(255, 248, 234, 0.12)',
    background: 'rgba(255, 248, 234, 0.07)',
    color: '#cfc3ad',
    padding: '0 10px',
    fontSize: 12,
    fontWeight: 850,
  },
  headerActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'flex-end',
  },
  primaryAction: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 44,
    padding: '0 18px',
    borderRadius: 8,
    background: '#d8b86e',
    color: '#171411',
    textDecoration: 'none',
    fontWeight: 950,
    boxShadow: '0 15px 32px rgba(216, 184, 110, 0.22)',
  },
  secondaryAction: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    padding: '0 18px',
    borderRadius: 8,
    border: '1px solid rgba(255, 248, 234, 0.14)',
    background: 'rgba(255, 248, 234, 0.06)',
    color: '#fff8ea',
    textDecoration: 'none',
    fontWeight: 900,
  },
  statusBar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    border: '1px solid rgba(54, 45, 33, 0.1)',
    borderRadius: 10,
    background: 'rgba(255, 252, 246, 0.78)',
    padding: '12px 16px',
    color: '#655844',
    boxShadow: '0 16px 42px rgba(50, 38, 20, 0.07)',
  },
  statusPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    color: '#0f7a55',
    fontWeight: 950,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  pulse: {
    width: 9,
    height: 9,
    borderRadius: 999,
    background: '#28b17f',
    boxShadow: '0 0 12px rgba(40, 177, 127, 0.7)',
  },
  workflow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginLeft: 'auto',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 12,
  },
  statCard: {
    display: 'grid',
    gridTemplateColumns: '44px minmax(0, 1fr)',
    gap: 12,
    alignItems: 'center',
    borderRadius: 10,
    background: '#fffaf1',
    padding: 18,
    border: '1px solid rgba(54, 45, 33, 0.09)',
    boxShadow: '0 18px 50px rgba(50, 38, 20, 0.07)',
  },
  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#201b14',
    color: '#d8b86e',
    border: '1px solid rgba(216, 184, 110, 0.22)',
  },
  statCopy: {
    display: 'grid',
    gap: 4,
  },
  statLabel: {
    color: '#756752',
    fontSize: 11,
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: 0,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 800,
    lineHeight: 1,
    color: '#1b1712',
  },
  statHint: {
    color: '#8a7b65',
    fontSize: 12,
  },
  twoColumn: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.35fr) minmax(320px, 0.65fr)',
    gap: 14,
    alignItems: 'start',
  },
  panel: {
    borderRadius: 12,
    background: '#fffaf1',
    border: '1px solid rgba(54, 45, 33, 0.09)',
    padding: 22,
    boxShadow: '0 22px 60px rgba(50, 38, 20, 0.08)',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  panelKicker: {
    margin: 0,
    color: '#9b7337',
    fontSize: 11,
    fontWeight: 950,
    textTransform: 'uppercase',
    letterSpacing: 0,
  },
  panelTitle: {
    margin: '5px 0 0',
    fontSize: 22,
    lineHeight: 1.15,
    fontWeight: 800,
    color: '#1b1712',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 10,
  },
  editCard: {
    display: 'grid',
    gridTemplateColumns: '40px minmax(0, 1fr)',
    gap: 12,
    minHeight: 128,
    borderRadius: 10,
    border: '1px solid rgba(54, 45, 33, 0.08)',
    background: '#f8f1e4',
    padding: 16,
    color: '#1b1712',
    textDecoration: 'none',
  },
  editIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#201b14',
    color: '#d8b86e',
    border: '1px solid rgba(216, 184, 110, 0.22)',
  },
  editCopy: {
    display: 'grid',
    gap: 7,
  },
  editTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    fontWeight: 950,
    fontSize: 16,
    color: '#1b1712',
  },
  editDetail: {
    color: '#6d604e',
    lineHeight: 1.45,
    fontSize: 13,
  },
  healthList: {
    display: 'grid',
    gap: 10,
  },
  healthItem: {
    display: 'grid',
    gridTemplateColumns: '28px minmax(0, 1fr)',
    gap: 10,
    borderTop: '1px solid rgba(54, 45, 33, 0.09)',
    paddingTop: 12,
  },
  healthIcon: {
    display: 'inline-flex',
    paddingTop: 2,
  },
  healthTopline: {
    display: 'flex',
    gap: 8,
    alignItems: 'baseline',
    color: '#2b251d',
    fontWeight: 900,
  },
  healthDetail: {
    display: 'block',
    marginTop: 4,
    color: '#6d604e',
    fontSize: 13,
    lineHeight: 1.45,
  },
  aiPanel: {
    display: 'grid',
    gridTemplateColumns: '42px minmax(0, 1fr)',
    gap: 12,
    borderRadius: 12,
    border: '1px solid rgba(54, 45, 33, 0.09)',
    background: '#201b14',
    padding: 18,
    boxShadow: '0 20px 58px rgba(50, 38, 20, 0.12)',
  },
  aiIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(216, 184, 110, 0.12)',
    color: '#d8b86e',
    border: '1px solid rgba(216, 184, 110, 0.22)',
  },
  aiTitle: {
    display: 'block',
    fontSize: 16,
    color: '#fff8ea',
    fontWeight: 800,
  },
  aiCopy: {
    display: 'block',
    marginTop: 4,
    color: '#cfc3ad',
    lineHeight: 1.5,
  },
}

const dashboardShellStyles = `
  .template-default__nav-toggler-wrapper,
  .template-default__nav-toggler-container,
  .template-default__nav-toggler,
  .app-header {
    display: none !important;
  }

  .template-default,
  .template-default__wrap,
  .template-default__wrap > main,
  .dashboard {
    width: 100% !important;
    max-width: none !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #f6f1e8 !important;
  }

  .template-default .gutter {
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .ct-admin-edit-card {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  .ct-admin-edit-card:hover {
    transform: translateY(-3px) !important;
    border-color: rgba(155, 115, 55, 0.28) !important;
    background: #fffaf1 !important;
    box-shadow: 0 18px 38px rgba(50, 38, 20, 0.11) !important;
  }
  .ct-admin-primary-btn {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  .ct-admin-primary-btn:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 18px 38px rgba(216, 184, 110, 0.28) !important;
  }
  .ct-admin-secondary-btn {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  .ct-admin-secondary-btn:hover {
    background: rgba(255, 248, 234, 0.1) !important;
    border-color: rgba(255, 248, 234, 0.24) !important;
  }

  @media (max-width: 860px) {
    .ct-dashboard-header {
      display: grid !important;
      align-items: start !important;
    }

    .ct-dashboard-two-column {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 620px) {
    .ct-dashboard-header {
      padding: 22px 18px !important;
    }
  }
`
