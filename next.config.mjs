import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // RFC 8288 Link headers for agent discovery — advertise the machine-
          // readable entrypoints (API catalog, LLM docs, OpenAPI, sitemap) using
          // IANA-registered relation types so agents can find them from any page.
          {
            key: 'Link',
            value: [
              '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
              '</llms.txt>; rel="service-doc"; type="text/markdown"',
              '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
              '</sitemap.xml>; rel="describedby"; type="application/xml"',
            ].join(', '),
          },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https: blob:;
              font-src 'self' data:;
              connect-src 'self' https:;
              frame-ancestors 'self';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
      // Static brand assets are content-addressed by name and effectively
      // immutable — give them a one-year cache so repeat visits and the
      // directly-fetched hero background don't re-download (Lighthouse:
      // "use efficient cache lifetimes").
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/icons/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ]
  },

  // Map the agent-discovery well-known paths to clean route handlers. Using
  // rewrites (rather than `app/.well-known/.../route.ts`) keeps the handlers in
  // ordinary, dot-free folders while still serving the spec-mandated URLs and
  // letting each handler set its exact Content-Type (e.g. application/linkset+json).
  async rewrites() {
    return [
      { source: '/.well-known/api-catalog', destination: '/api/agent/api-catalog' },
      { source: '/.well-known/mcp/server-card.json', destination: '/api/agent/mcp-server-card' },
      { source: '/.well-known/agent-skills/index.json', destination: '/api/agent/skills-index' },
      { source: '/openapi.json', destination: '/api/agent/openapi' },
    ]
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
    // 60s forced the optimizer to re-encode the same images constantly and is
    // what Lighthouse flags as "inefficient cache lifetimes". Brand imagery is
    // effectively immutable, so cache optimized outputs for 31 days.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      // Supabase Storage (S3-compatible) — Payload Media uploads in production.
      // Covers public object URLs like
      // https://<project-ref>.supabase.co/storage/v1/object/public/<bucket>/<file>
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@react-three/drei',
      '@react-three/fiber',
      'three',
      '@tsparticles/engine',
      '@tsparticles/react',
      '@tsparticles/slim',
    ],
  },

  trailingSlash: false,

  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },
}

export default withPayload(nextConfig)
