/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],

  // Explicit 308 redirects for common non-canonical URL variants.
  // Order matters: the first matching rule wins, so the most specific
  // rule (www root) sits above the generic www rule. This collapses
  // what was a 3-hop chain (www/ → non-www/ → /en) into a single hop
  // for both www and non-www visitors. Google flags chains as
  // "Page with redirect" status in Search Console; single hops keep
  // crawl budget tight and indexing clean.
  async redirects() {
    return [
      // www root → /en directly (single hop, skips the intermediate
      // non-www root that itself redirects).
      {
        source: '/',
        has: [{ type: 'host', value: 'www.cloudtopia.net' }],
        destination: 'https://cloudtopia.net/en',
        permanent: true,
      },
      // www any other path → non-www same path (preserves /en/blog,
      // /ar/pricing, etc. with one hop).
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.cloudtopia.net' }],
        destination: 'https://cloudtopia.net/:path*',
        permanent: true,
      },
      // non-www bare root → /en
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  },

  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
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
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ],
      },
    ]
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // Enable SWC minification
  swcMinify: true,

  // Experimental optimizations
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

  // Trailing slash redirect
  trailingSlash: false,

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
}

module.exports = nextConfig
