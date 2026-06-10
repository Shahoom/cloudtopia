import { permanentRedirect } from 'next/navigation'
import { localePath } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function OldAuthorRedirect({ params }: PageProps) {
  const { locale = 'en', slug } = await params
  permanentRedirect(localePath((locale || 'en') as 'en' | 'ar', `/articles/author/${slug}`))
}
