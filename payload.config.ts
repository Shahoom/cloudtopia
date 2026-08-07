import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import { buildConfig, type Plugin } from 'payload'
import { Authors } from './collections/Authors.ts'
import { AIChatLeads } from './collections/AIChatLeads.ts'
import { AIChatConversations } from './collections/AIChatConversations.ts'
import { BlogAIGenerationLogs } from './collections/BlogAIGenerationLogs.ts'
import { ContactInquiries } from './collections/ContactInquiries.ts'
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
import { SeoOverrides } from './collections/SeoOverrides.ts'
import { SolutionFinderLeads } from './collections/SolutionFinderLeads.ts'
import { ClinicTopiaLeads } from './collections/ClinicTopiaLeads.ts'
import { HasmERPLeads } from './collections/HasmERPLeads.ts'
import { Users } from './collections/Users.ts'
import { databaseRequiresSsl, getDatabaseUrl, getPayloadSecret, getS3StorageConfig } from './lib/cms/env.ts'
import { handleBlogAIEndpoint } from './lib/cms/blog-ai-endpoint.ts'
import { handleTranslateEndpoint } from './lib/cms/translate-endpoint.ts'
import { handleBlogPairEndpoint } from './lib/cms/blog-pair-endpoint.ts'
import { handleBlogImportEndpoint } from './lib/cms/blog-import-endpoint.ts'
import { handleBlogViewEndpoint } from './lib/cms/blog-view-endpoint.ts'
import { handleArticlesBulkEndpoint } from './lib/cms/admin/articles-bulk-endpoint.ts'
import { handleArticleOptimizeEndpoint } from './lib/cms/admin/article-optimize-endpoint.ts'
import { handleRouteManifestEndpoint } from './lib/cms/admin/route-manifest-endpoint.ts'

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

// ── Media storage ──────────────────────────────────────────────────────────
// Vercel's filesystem is read-only at runtime, so the local `staticDir` in
// collections/Media.ts cannot persist uploads in production. When the Supabase
// Storage (S3-compatible) env vars are present we mount the s3Storage adapter
// for the `media` collection; otherwise we leave `plugins` empty and Media
// falls back to local disk so dev/build/CI keep working without cloud storage.
const s3Config = getS3StorageConfig()

const plugins: Plugin[] = []

if (s3Config) {
  plugins.push(
    s3Storage({
      collections: {
        media: true,
      },
      bucket: s3Config.bucket,
      // Upload straight from the browser to Supabase Storage using a
      // short-lived presigned URL, instead of POSTing the bytes through
      // /api/media.
      //
      // Vercel caps a serverless function's REQUEST BODY at 4.5 MB and rejects
      // anything larger at the edge with a 413 — the function never runs, so
      // nothing appears in the runtime logs and the CMS just shows an upload
      // error. Every image uploaded while this worked was 0.8–1.6 MB; the first
      // photo over the cap silently became "I can't add photos to articles".
      //
      // Access defaults to `({ req }) => Boolean(req.user)`, which is exactly
      // the `adminOnly` rule already guarding Media.create, so a presigned URL
      // is still only ever issued to a logged-in CMS user.
      clientUploads: true,
      config: {
        region: s3Config.region,
        endpoint: s3Config.endpoint,
        // Supabase Storage's S3 endpoint requires path-style addressing.
        forcePathStyle: true,
        credentials: {
          accessKeyId: s3Config.accessKeyId,
          secretAccessKey: s3Config.secretAccessKey,
        },
      },
    }),
  )
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
          Component: '@/components/payload/CommandCenter#CommandCenter',
        },
        articlesWorkspace: {
          Component: '@/components/payload/ArticlesWorkspaceView#ArticlesWorkspaceView',
          path: '/articles',
          exact: true,
        },
        seoCenter: {
          Component: '@/components/payload/SeoControlCenterView#SeoControlCenterView',
          path: '/seo',
          exact: true,
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
    AIChatConversations,
    SolutionFinderLeads,
    ContactInquiries,
    ClinicTopiaLeads,
    HasmERPLeads,
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
    SeoOverrides,
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
    {
      path: '/blog-pair',
      method: 'post',
      handler: handleBlogPairEndpoint,
    },
    {
      path: '/blog-import',
      method: 'post',
      handler: handleBlogImportEndpoint,
    },
    {
      path: '/blog-view',
      method: 'post',
      handler: handleBlogViewEndpoint,
    },
    {
      path: '/admin/articles-bulk',
      method: 'post',
      handler: handleArticlesBulkEndpoint,
    },
    {
      path: '/admin/article-optimize',
      method: 'post',
      handler: handleArticleOptimizeEndpoint,
    },
    {
      path: '/admin/route-manifest',
      method: 'post',
      handler: handleRouteManifestEndpoint,
    },
  ],
  db: postgresAdapter({
    blocksAsJSON: true,
    pool: {
      // Supabase topology:
      //   • Runtime (this app/admin) → transaction pooler on port 6543 (PgBouncer).
      //     Keep `max` small; the pooler manages real connections. Append
      //     `?pgbouncer=true&sslmode=require` to DATABASE_URL in production.
      //   • Migrate / seed → DIRECT connection on port 5432 (supports DDL and
      //     prepared statements PgBouncer transaction mode cannot).
      max: 3,
      connectionString: databaseUrl,
      idleTimeoutMillis: 15_000,
      connectionTimeoutMillis: 30_000,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10_000,
      // Remote Postgres (Supabase) requires TLS; local dev (localhost) does not.
      ...(databaseRequiresSsl() ? { ssl: { rejectUnauthorized: false } } : {}),
    },
    // Dev push is bypassed to avoid introspection overhead on every local boot;
    // this prevents hanging against the database and keeps /admin startup fast.
    push: false,
  }),
  plugins,
  secret: payloadSecret,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
