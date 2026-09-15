import { queryDatabase } from '../../../lib/cms/db.ts'
import { CloudTopiaNavClient, type NavCounts, type NavUser } from './NavClient.tsx'
import './admin-nav.css'

type NavServerProps = {
  user?: { email?: string; name?: string | null; role?: string | null } | null
  visibleEntities?: { collections?: string[]; globals?: string[] }
}

async function loadCounts(): Promise<NavCounts> {
  try {
    const [row] = await queryDatabase<{
      articles: string
      scheduled: string
      inquiries_new: string
      media: string
      media_bytes: string
      pages: string
    }>(`
      select
        (select count(*) from blog_posts where deleted_at is null) as articles,
        (select count(*) from blog_posts where deleted_at is null and status = 'scheduled') as scheduled,
        (select count(*) from contact_inquiries where status = 'new') as inquiries_new,
        (select count(*) from media where deleted_at is null) as media,
        (select coalesce(sum(filesize), 0) from media where deleted_at is null) as media_bytes,
        (select count(*) from pages) as pages
    `)
    const n = (v: string | undefined) => (v == null ? null : Number(v))
    return {
      articles: n(row?.articles),
      scheduled: n(row?.scheduled),
      inquiriesNew: n(row?.inquiries_new),
      media: n(row?.media),
      mediaBytes: n(row?.media_bytes),
      pages: n(row?.pages),
    }
  } catch {
    return { articles: null, scheduled: null, inquiriesNew: null, media: null, mediaBytes: null, pages: null }
  }
}

// Registered as admin.components.Nav. Counts come from one SQL round trip on
// the server; everything interactive (collapse, pins, menus) is client-side.
export async function CloudTopiaNav(props: NavServerProps) {
  const counts = await loadCounts()
  const user: NavUser = {
    email: props.user?.email || '',
    name: props.user?.name || null,
    role: props.user?.role || null,
  }
  return <CloudTopiaNavClient counts={counts} user={user} visibleCollections={props.visibleEntities?.collections ?? null} />
}
