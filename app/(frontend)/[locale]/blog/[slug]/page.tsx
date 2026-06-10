import { permanentRedirect } from 'next/navigation'
import { localePath } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function OldBlogPostRedirect({ params }: PageProps) {
  const { locale, slug } = await params
  permanentRedirect(localePath((locale || 'en') as 'en' | 'ar', `/articles/${slug}`))
}
