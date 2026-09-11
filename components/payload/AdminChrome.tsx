import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
  BarChart3,
  Bot,
  Brush,
  FileText,
  FolderKanban,
  Globe2,
  HelpCircle,
  Image,
  Inbox,
  Library,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Search,
  Send,
  Settings,
  Tags,
  Users,
} from 'lucide-react'

// ── SaaS design system (design E): #fbfbfb rail, workspace switcher,
// count badges, user card. Shares tokens with CommandCenter. ──
const ACCENT = '#4f46e5'
const TEXT = '#111827'
const TEXT_SOFT = '#374151'
const TEXT_FAINT = '#9ca3af'

type NavLink = { href: string; label: string; icon: typeof LayoutDashboard; badge?: string }
type NavGroup = { title: string; items: NavLink[] }

async function safeCount(payload: any, collection: string): Promise<number | null> {
  try {
    const res = await payload.count({ collection, overrideAccess: true })
    return res.totalDocs ?? null
  } catch {
    return null
  }
}

export async function CloudTopiaAdminNav(props: { payload?: any; user?: any }) {
  const payload = props?.payload
  let articleCount: number | null = null
  let pageCount: number | null = null
  let inquiryCount: number | null = null
  if (payload) {
    ;[articleCount, pageCount, inquiryCount] = await Promise.all([
      safeCount(payload, 'blog-posts'),
      safeCount(payload, 'pages'),
      safeCount(payload, 'contact-inquiries'),
    ])
  }
  const badge = (n: number | null) => (n === null ? undefined : String(n))

  const navGroups: NavGroup[] = [
    {
      title: 'General',
      items: [
        { href: '/admin', label: 'Overview', icon: LayoutDashboard },
        { href: '/admin/seo', label: 'SEO center', icon: BarChart3 },
      ],
    },
    {
      title: 'Content',
      items: [
        { href: '/admin/articles', label: 'Articles', icon: Newspaper, badge: badge(articleCount) },
        { href: '/admin/collections/authors', label: 'Authors', icon: Users },
        { href: '/admin/collections/blog-categories', label: 'Categories', icon: Tags },
        { href: '/admin/collections/blog-tags', label: 'Tags', icon: Tags },
        { href: '/admin/collections/blog-series', label: 'Series', icon: Library },
        { href: '/admin/collections/pages', label: 'Pages', icon: FileText, badge: badge(pageCount) },
        { href: '/admin/collections/projects', label: 'Projects', icon: FolderKanban },
        { href: '/admin/collections/service-faqs', label: 'Service FAQs', icon: HelpCircle },
        { href: '/admin/collections/media', label: 'Media', icon: Image },
      ],
    },
    {
      title: 'Customers',
      items: [
        { href: '/admin/collections/contact-inquiries', label: 'Inquiries', icon: Mail, badge: badge(inquiryCount) },
        { href: '/admin/collections/solution-finder-leads', label: 'Solution finder', icon: Send },
        { href: '/admin/collections/ai-chat-leads', label: 'Chatbot leads', icon: Send },
        { href: '/admin/collections/clinictopia-leads', label: 'ClinicTopia leads', icon: Send },
        { href: '/admin/collections/hasm-erp-leads', label: 'Hasm ERP leads', icon: Send },
        { href: '/admin/collections/newsletter-subscribers', label: 'Newsletter', icon: Inbox },
        { href: '/admin/collections/ai-chat-conversations', label: 'Conversations', icon: Bot },
      ],
    },
    {
      title: 'Workspace',
      items: [
        { href: '/admin/collections/site-content', label: 'Locales / dictionary', icon: Globe2 },
        { href: '/admin/collections/site-design', label: 'Design', icon: Brush },
        { href: '/admin/collections/blog-ai-generation-logs', label: 'Editor AI log', icon: Bot },
        { href: '/admin/collections/users', label: 'Team', icon: Settings },
      ],
    },
  ]

  const email: string = props?.user?.email || ''
  const name = email ? email.split('@')[0] : 'Admin'
  const initials = name.slice(0, 2).toUpperCase()

  return (
    <nav className="ct-admin-nav" style={styles.nav} aria-label="CloudTopia CMS navigation">
      <style>{chromeStyles}</style>

      <Link className="ct-admin-nav__ws" href="/admin" style={styles.ws} aria-label="CloudTopia CMS dashboard">
        <CloudTopiaMark />
        <span style={styles.wsCopy}>
          <strong style={styles.wsName}>CloudTopia</strong>
          <span style={styles.wsMeta}>Production · cloudtopia.net</span>
        </span>
        <span style={styles.wsChevron}>▾</span>
      </Link>

      <Link className="ct-admin-nav__search" href="/admin/articles" style={styles.search}>
        <Search size={14} strokeWidth={2} />
        <span>Search</span>
        <kbd style={styles.kbd}>⌘K</kbd>
      </Link>

      <div className="ct-admin-nav__links" style={styles.links}>
        {navGroups.map((group) => (
          <div key={group.title} className="ct-admin-nav__group" style={styles.group}>
            <p className="ct-admin-nav__group-title" style={styles.groupTitle}>
              {group.title}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <Link className="ct-admin-nav__link" key={item.href} href={item.href} style={styles.link}>
                  <Icon size={15} strokeWidth={2} style={{ opacity: 0.75, flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                  {item.badge && <span style={styles.badge}>{item.badge}</span>}
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      <div className="ct-admin-nav__actions" style={styles.actions}>
        <Link className="ct-admin-nav__site-link" href="/" style={styles.siteLink}>
          View site
        </Link>
        <div style={styles.user}>
          <span style={styles.avatar}>
            {initials}
            <i style={styles.presence} />
          </span>
          <span style={{ minWidth: 0 }}>
            <span style={styles.userName}>{name}</span>
            {email && <span style={styles.userMail}>{email}</span>}
          </span>
          {/* prefetch={false}: Next prefetches every in-viewport Link, so the
              default would fetch /admin/logout on every admin page load. */}
          <Link className="ct-admin-nav__logout" href="/admin/logout" prefetch={false} style={styles.logout} aria-label="Log out">
            <LogOut size={15} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export function CloudTopiaLogo() {
  return (
    <span style={styles.logo}>
      <CloudTopiaMark />
      <span>CloudTopia CMS</span>
    </span>
  )
}

export function CloudTopiaIcon() {
  return <CloudTopiaMark />
}

function CloudTopiaMark() {
  return (
    <span style={styles.mark} aria-hidden="true">
      CT
    </span>
  )
}

const styles: Record<string, CSSProperties> = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 60,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'stretch',
    width: '100%',
    minHeight: '100vh',
    height: '100vh',
    padding: 10,
    borderRight: '1px solid #e9eaec',
    background: '#fbfbfb',
    fontFamily: 'var(--font-cairo), "Inter", ui-sans-serif, system-ui, sans-serif',
    fontSize: 13,
  },
  ws: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: 8,
    borderRadius: 9,
    border: '1px solid #e9eaec',
    background: '#ffffff',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
    color: TEXT,
    textDecoration: 'none',
    minWidth: 0,
  },
  wsCopy: { display: 'grid', gap: 1, minWidth: 0 },
  wsName: { fontSize: 13, fontWeight: 600, lineHeight: 1.15, color: TEXT },
  wsMeta: { fontSize: 10.5, color: TEXT_FAINT, fontWeight: 500, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  wsChevron: { marginInlineStart: 'auto', color: TEXT_FAINT, fontSize: 10 },
  search: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    padding: '7px 10px',
    borderRadius: 8,
    border: '1px solid #e9eaec',
    background: '#ffffff',
    color: TEXT_FAINT,
    textDecoration: 'none',
    fontSize: 12.5,
  },
  kbd: {
    marginInlineStart: 'auto',
    fontSize: 10,
    fontFamily: 'inherit',
    border: '1px solid #e5e7eb',
    borderRadius: 4,
    padding: '1px 5px',
    color: TEXT_FAINT,
    background: '#f9fafb',
  },
  links: {
    display: 'grid',
    gap: 1,
    minWidth: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    marginTop: 2,
  },
  group: { marginBottom: 6 },
  groupTitle: {
    margin: '10px 0 3px',
    padding: '0 10px',
    fontSize: 10.5,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: TEXT_FAINT,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    width: '100%',
    minHeight: 31,
    padding: '0 10px',
    borderRadius: 7,
    color: TEXT_SOFT,
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    transition: 'background 0.12s ease, color 0.12s ease',
  },
  badge: {
    marginInlineStart: 'auto',
    fontSize: 11,
    fontWeight: 600,
    color: '#6b7280',
    background: '#f3f4f6',
    borderRadius: 999,
    padding: '1px 7px',
  },
  actions: { marginTop: 'auto', display: 'grid', gap: 8 },
  siteLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 36,
    padding: '0 14px',
    borderRadius: 8,
    background: ACCENT,
    border: `1px solid ${ACCENT}`,
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    boxShadow: '0 1px 2px rgba(79, 70, 229, 0.4)',
    transition: 'opacity 0.15s ease',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: '9px 4px 4px',
    borderTop: '1px solid #e9eaec',
    minWidth: 0,
  },
  avatar: {
    position: 'relative',
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: `linear-gradient(135deg, #0ea5e9, ${ACCENT})`,
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  presence: {
    position: 'absolute',
    insetInlineEnd: -1,
    bottom: -1,
    width: 9,
    height: 9,
    borderRadius: '50%',
    background: '#22c55e',
    border: '2px solid #fbfbfb',
  },
  userName: { display: 'block', fontSize: 12.5, fontWeight: 600, color: TEXT, lineHeight: 1.2 },
  userMail: { display: 'block', fontSize: 10.5, color: TEXT_FAINT, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 130 },
  logout: {
    marginInlineStart: 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 8,
    color: TEXT_FAINT,
    textDecoration: 'none',
    transition: 'background 0.15s ease',
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    color: TEXT,
    fontWeight: 700,
    fontFamily: 'var(--font-cairo), ui-sans-serif, system-ui, sans-serif',
  },
  mark: {
    flex: '0 0 auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 8,
    background: `linear-gradient(135deg, ${ACCENT}, #8b5cf6)`,
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '0.02em',
  },
}

const chromeStyles = `
  nav[aria-label="CloudTopia CMS navigation"],
  nav[aria-label="CloudTopia CMS navigation"] * {
    box-sizing: border-box;
  }

  .template-default__nav-toggler-wrapper,
  .template-default__nav-toggler-container,
  .template-default__nav-toggler,
  .app-header {
    display: none !important;
  }

  .template-default {
    min-height: 100vh !important;
    display: grid !important;
    grid-template-columns: minmax(228px, 248px) minmax(0, 1fr) !important;
    background: #fafafa !important;
  }

  .template-default > nav[aria-label="CloudTopia CMS navigation"] {
    width: 100% !important;
    min-width: 0 !important;
  }

  .template-default__wrap {
    width: 100% !important;
    max-width: none !important;
    min-width: 0 !important;
    background: #fafafa !important;
  }

  .ct-admin-nav__link:hover {
    background: #f3f4f6 !important;
    color: #111827 !important;
  }

  .ct-admin-nav__ws:hover,
  .ct-admin-nav__search:hover {
    border-color: #d7d9de !important;
  }

  .ct-admin-nav__site-link:hover {
    opacity: 0.9 !important;
  }

  .ct-admin-nav__logout:hover {
    background: #f3f4f6 !important;
    color: #111827 !important;
  }

  .template-default input:focus,
  .template-default textarea:focus,
  .template-default select:focus {
    outline: 3px solid rgba(79, 70, 229, 0.18) !important;
  }

  .template-default .btn--style-primary {
    background: ${ACCENT} !important;
    border-color: ${ACCENT} !important;
    color: #ffffff !important;
    border-radius: 8px !important;
  }

  .template-default .table {
    background: #ffffff;
    border-radius: 12px;
  }

  @media (max-width: 760px) {
    .template-default {
      display: block !important;
    }

    nav[aria-label="CloudTopia CMS navigation"] {
      position: relative !important;
      min-height: auto !important;
      height: auto !important;
      border-right: 0 !important;
      border-bottom: 1px solid #e9eaec !important;
    }
  }
`
