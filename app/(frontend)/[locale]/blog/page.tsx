import { redirect } from 'next/navigation'
import { localePath } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function BlogRedirectPage({ params }: PageProps) {
  const { locale = 'en' } = await params
  redirect(localePath(locale, '/insights'))
}
