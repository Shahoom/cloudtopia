import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { Authors } from './collections/Authors.ts'
import { AIChatLeads } from './collections/AIChatLeads.ts'
import { BlogAIGenerationLogs } from './collections/BlogAIGenerationLogs.ts'
import { BlogCategories } from './collections/BlogCategories.ts'
import { BlogContentTemplates } from './collections/BlogContentTemplates.ts'
import { BlogPosts } from './collections/BlogPosts.ts'
import { BlogRedirects } from './collections/BlogRedirects.ts'
import { BlogSeries } from './collections/BlogSeries.ts'
import { BlogTags } from './collections/BlogTags.ts'
import { Media } from './collections/Media.ts'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers.ts'
import { Projects } from './collections/Projects.ts'
import { ServiceFAQs } from './collections/ServiceFAQs.ts'
import { Pages } from './collections/Pages.ts'
import { SiteDesign } from './collections/SiteDesign.ts'
import { SiteContent } from './collections/SiteContent.ts'
import { SolutionFinderLeads } from './collections/SolutionFinderLeads.ts'
import { Users } from './collections/Users.ts'
import { getDatabaseUrl, getPayloadSecret } from './lib/cms/env.ts'
import { handleBlogAIEndpoint } from './lib/cms/blog-ai-endpoint.ts'
import { handleTranslateEndpoint } from './lib/cms/translate-endpoint.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl = getDatabaseUrl()
const payloadSecret = getPayloadSecret()

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required in production. Set it to your Payload Postgres connection string.')
}

if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET is required in production. Set it to a strong random secret.')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- CloudTopia CMS',
      icons: [{ rel: 'icon', url: '/favicon.svg' }],
    },
    components: {
      Nav: '@/components/payload/AdminChrome#CloudTopiaAdminNav',
      graphics: {
        Icon: '@/components/payload/AdminChrome#CloudTopiaIcon',
        Logo: '@/components/payload/AdminChrome#CloudTopiaLogo',
      },
      views: {
        createFirstUser: {
          Component: '@/components/payload/AuthViews#CloudTopiaCreateFirstUserView',
        },
        dashboard: {
          Component: '@/components/payload/EditorialDashboard#EditorialDashboard',
        },
        login: {
          Component: '@/components/payload/AuthViews#CloudTopiaLoginView',
        },
      },
    },
  },
  collections: [
    Users,
    AIChatLeads,
    SolutionFinderLeads,
    Media,
    Authors,
    BlogCategories,
    BlogTags,
    BlogSeries,
    BlogPosts,
    BlogRedirects,
    BlogAIGenerationLogs,
    BlogContentTemplates,
    NewsletterSubscribers,
    Projects,
    ServiceFAQs,
    SiteContent,
    Pages,
    SiteDesign,
  ],
  endpoints: [
    {
      path: '/translate',
      method: 'post',
      handler: handleTranslateEndpoint,
    },
    {
      path: '/blog-ai',
      method: 'post',
      handler: handleBlogAIEndpoint,
    },
  ],
  db: postgresAdapter({
    blocksAsJSON: true,
    pool: {
      max: 3,
      connectionString: databaseUrl,
      idleTimeoutMillis: 15_000,
      connectionTimeoutMillis: 30_000,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10_000,
    },
    // Dev push is bypassed to avoid introspection overhead on every local boot;
    // this prevents hanging against the database and keeps /admin startup fast.
    push: false,
  }),
  secret: payloadSecret,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
