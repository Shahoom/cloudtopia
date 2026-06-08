import { redirect } from 'next/navigation'
import { localePath } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function OldInsightsPostRedirect({ params }: PageProps) {
  const { locale, slug } = await params
  redirect(localePath((locale || 'en') as 'en' | 'ar', `/articles/${slug}`))
}
