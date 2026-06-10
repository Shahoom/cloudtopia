import { permanentRedirect } from 'next/navigation'
import { localePath } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function InsightsRedirectPage({ params }: PageProps) {
  const { locale = 'en' } = await params
  permanentRedirect(localePath(locale, '/articles'))
}
