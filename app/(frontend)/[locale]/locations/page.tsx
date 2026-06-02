import { permanentRedirect } from 'next/navigation'

type PageProps = {
    params: Promise<{ locale: string }>
}

export default async function LegacyLocationsPage({ params }: PageProps) {
    const { locale = 'en' } = await params
    permanentRedirect(locale === 'ar' ? '/ar/markets' : '/markets')
}
