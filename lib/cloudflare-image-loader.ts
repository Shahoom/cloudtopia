// Custom next/image loader: images are resized and re-encoded by Cloudflare Image
// Transformations (zone setting image_resizing=on) instead of Vercel's optimizer.
// onerror=redirect makes Cloudflare serve the original file when a transformation
// fails — e.g. past the free tier's 5,000 unique transformations a month — so a
// quota problem costs bytes instead of blanking every image.

const SITE_ORIGIN = 'https://cloudtopia.net'
const MEDIA_ORIGIN = 'https://media.cloudtopia.net'
const SITE_HOSTS = new Set(['cloudtopia.net', 'www.cloudtopia.net'])
const MEDIA_FILE_PREFIX = '/api/media/file/'

type ImageLoaderArgs = { src: string; width: number; quality?: number }

// Paths arrive both raw ("/images/homepage/digital presence.png") and pre-encoded
// ("Gemini%20(1).png"); a raw space or comma would split the srcset entry.
function encodePath(pathname: string): string {
  return pathname
    .split('/')
    .map((segment) => {
      try {
        return encodeURIComponent(decodeURIComponent(segment))
      } catch {
        return encodeURIComponent(segment)
      }
    })
    .join('/')
}

function transform(origin: string, pathname: string, width: number, quality?: number): string {
  return `${origin}/cdn-cgi/image/width=${width},quality=${quality || 75},format=auto,onerror=redirect${encodePath(pathname)}`
}

// Stored /api/media/file/<name> paths point at the same R2 object the media CDN
// serves; transforming there skips a serverless hop through Payload.
function siteOrMedia(pathname: string, width: number, quality?: number): string {
  return pathname.startsWith(MEDIA_FILE_PREFIX)
    ? transform(MEDIA_ORIGIN, `/${pathname.slice(MEDIA_FILE_PREFIX.length)}`, width, quality)
    : transform(SITE_ORIGIN, pathname, width, quality)
}

export default function cloudflareImageLoader({ src, width, quality }: ImageLoaderArgs): string {
  // /cdn-cgi/image only exists behind Cloudflare, not on localhost.
  if (process.env.NODE_ENV === 'development') return `${src}${src.includes('?') ? '&' : '?'}w=${width}`
  if (/\.svg(?:[?#]|$)/i.test(src)) return src

  if (src.startsWith('/') && !src.startsWith('//')) return siteOrMedia(src.split(/[?#]/)[0], width, quality)

  let url: URL
  try {
    url = new URL(src)
  } catch {
    return src
  }
  if (url.origin === MEDIA_ORIGIN) return transform(MEDIA_ORIGIN, url.pathname, width, quality)
  if (SITE_HOSTS.has(url.hostname)) return siteOrMedia(url.pathname, width, quality)
  // Third-party hosts (Unsplash, Wikimedia) aren't in the zone and can't be transformed.
  return src
}
