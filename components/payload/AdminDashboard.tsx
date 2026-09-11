import type { Payload } from 'payload'

/**
 * Custom admin dashboard panel (Payload redesign plan, Phase 3): the numbers
 * an operator actually needs on login — draft backlog, unpaired AR/EN posts,
 * and fresh leads — instead of a bare collection list.
 * Registered via admin.components.beforeDashboard.
 */
export async function AdminDashboard({ payload }: { payload: Payload }) {
  let drafts = 0
  let published = 0
  let unpaired: { slug: string; locale: string; title: string }[] = []
  let leads7d = 0

  try {
    const [draftRes, pubRes, allPosts, leadsRes] = await Promise.all([
      payload.count({ collection: 'blog-posts', where: { _status: { equals: 'draft' } } }),
      payload.count({ collection: 'blog-posts', where: { _status: { equals: 'published' } } }),
      payload.find({
        collection: 'blog-posts',
        limit: 1000,
        depth: 0,
        draft: true,
        select: { slug: true, locale: true, title: true },
      }),
      payload.count({
        collection: 'contact-inquiries',
        where: { createdAt: { greater_than: new Date(Date.now() - 7 * 86400_000).toISOString() } },
      }),
    ])
    drafts = draftRes.totalDocs
    published = pubRes.totalDocs
    leads7d = leadsRes.totalDocs

    const byLocale = new Map<string, Set<string>>([['en', new Set()], ['ar', new Set()]])
    const titleOf = new Map<string, string>()
    for (const p of allPosts.docs as { slug?: string; locale?: string; title?: string }[]) {
      if (!p.slug || !p.locale) continue
      byLocale.get(p.locale)?.add(p.slug)
      titleOf.set(`${p.locale}:${p.slug}`, p.title ?? p.slug)
    }
    for (const [locale, slugs] of byLocale) {
      const other = locale === 'en' ? 'ar' : 'en'
      for (const slug of slugs) {
        if (!byLocale.get(other)?.has(slug)) {
          unpaired.push({ slug, locale, title: titleOf.get(`${locale}:${slug}`) ?? slug })
        }
      }
    }
    unpaired = unpaired.slice(0, 12)
  } catch {
    // A dashboard panel must never break the admin — render what we have.
  }

  const card: React.CSSProperties = {
    border: '1px solid var(--theme-elevation-150)',
    borderRadius: 8,
    padding: '14px 18px',
    minWidth: 150,
  }
  const num: React.CSSProperties = { fontSize: 28, fontWeight: 700, lineHeight: 1.2 }
  const label: React.CSSProperties = { fontSize: 12, opacity: 0.7 }

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={card}>
          <div style={num}>{published}</div>
          <div style={label}>Published articles</div>
        </div>
        <div style={card}>
          <div style={num}>{drafts}</div>
          <div style={label}>Drafts waiting</div>
        </div>
        <div style={card}>
          <div style={num}>{unpaired.length}</div>
          <div style={label}>Unpaired AR/EN posts</div>
        </div>
        <div style={card}>
          <div style={num}>{leads7d}</div>
          <div style={label}>Contact leads · 7 days</div>
        </div>
      </div>
      {unpaired.length > 0 && (
        <details style={{ ...card, minWidth: 0 }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
            Posts missing their sibling locale ({unpaired.length})
          </summary>
          <ul style={{ margin: '10px 0 0', paddingInlineStart: 18, fontSize: 13 }}>
            {unpaired.map((u) => (
              <li key={`${u.locale}:${u.slug}`}>
                <a href={`/admin/collections/blog-posts?where[slug][equals]=${encodeURIComponent(u.slug)}`}>
                  [{u.locale}] {u.title}
                </a>{' '}
                — missing {u.locale === 'en' ? 'ar' : 'en'}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}
