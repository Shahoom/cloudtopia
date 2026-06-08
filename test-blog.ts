import { getPublishedBlogPosts } from './lib/blog/data'

async function test() {
  const data = await getPublishedBlogPosts('en')
  console.log('Result length:', data.length)
}
test()
