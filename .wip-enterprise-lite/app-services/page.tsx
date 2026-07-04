import type { Metadata } from 'next'
import { EnterpriseServicesLite } from '@/components/enterprise/EnterpriseLite'

export const metadata: Metadata = {
  title: 'Services — Digital Services Built Around Your Business Growth',
  description:
    'Explore CloudTopia services for websites, e-commerce, web applications, CRM and ERP systems, AI automation, cloud integrations, and digital growth.',
  alternates: {
    canonical: 'https://cloudtopia.net/services',
  },
}

export default function ServicesPage() {
  return <EnterpriseServicesLite locale="en" />
}
