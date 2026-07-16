import { DigitalPresenceLanding } from '@/components/services/digital-presence/DigitalPresenceLanding'
import { getDigitalPresenceLanding } from '@/lib/services/digital-presence-landing'

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function DigitalPresencePage({ params }: PageProps) {
  const { locale = 'en' } = await params
  return <DigitalPresenceLanding content={getDigitalPresenceLanding(locale)} />
}
