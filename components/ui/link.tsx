import NextLink from 'next/link'
import type { ComponentProps } from 'react'

// Viewport prefetching sent an RSC request to Vercel for every visible link on
// every page view — most of the ISR reads and origin transfer that pushed the
// Hobby plan over its limits (Cloudflare can't safely cache RSC responses). Links
// fetch on click instead; pass `prefetch` explicitly to opt a link back in.
export default function Link({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...props} />
}
