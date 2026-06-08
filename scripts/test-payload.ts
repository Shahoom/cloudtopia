import { getPayload } from 'payload'
import configPromise from '../payload.config.ts'

async function run() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({ collection: 'blog-posts', limit: 1 })
  console.log('Posts count:', posts.totalDocs)
  process.exit(0)
}
run()
