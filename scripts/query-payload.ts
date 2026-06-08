import { getPayload } from 'payload';
import config from '../payload.config';

async function run() {
  const payload = await getPayload({ config });
  const authors = await payload.find({ collection: 'authors', limit: 1 });
  const categories = await payload.find({ collection: 'blog-categories', limit: 1 });
  console.log('Authors:', authors.docs.map(a => a.id));
  console.log('Categories:', categories.docs.map(c => c.id));
  process.exit(0);
}

run();
