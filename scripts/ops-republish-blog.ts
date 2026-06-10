/**
 * One-off operations script: re-publish every blog post THROUGH Payload so that
 * a version record is created in `_blog_posts_v` and `_status` is set to
 * 'published'. The posts were originally bulk-inserted via raw SQL, which
 * bypassed Payload's version system — so the drafts-aware admin list (which
 * reads the versions table) showed nothing even though the rows exist.
 *
 * Run:
 *   DATABASE_URL="<supabase direct 5432>" PAYLOAD_SECRET="<secret>" \
 *     npx payload --use-swc run scripts/ops-republish-blog.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'

async function main() {
  const payload = await getPayload({ config })

  const res = await payload.find({
    collection: 'blog-posts',
    limit: 1000,
    pagination: false,
    depth: 0,
    overrideAccess: true,
    draft: false,
  })

  console.log(`Found ${res.docs.length} blog posts to re-publish.`)

  let ok = 0
  let fail = 0
  for (const doc of res.docs) {
    const id = (doc as { id: number | string }).id
    const slug = (doc as { slug?: string }).slug
    try {
      await payload.update({
        collection: 'blog-posts',
        id,
        data: { status: 'published' },
        draft: false,
        overrideAccess: true,
      })
      ok++
      process.stdout.write('.')
    } catch (err) {
      fail++
      console.log(`\nFAIL id=${id} slug=${slug}: ${String((err as Error)?.message).slice(0, 200)}`)
    }
  }

  console.log(`\nDone. published=${ok} failed=${fail}`)
  process.exit(fail > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
