import type { Metadata } from 'next'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'
import { EnterpriseIndustriesLite } from '@/components/enterprise/EnterpriseLite'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale ?? 'en'
  const titles: Record<string, string> = {
    en: 'Industries — Digital Solutions by Business Model',
    ar: 'القطاعات — حلول رقمية حسب نموذج العمل',
    tr: 'Sektörler — İş Modeline Göre Dijital Çözümler',
  }
  const descriptions: Record<string, string> = {
    en: 'CloudTopia builds websites, business systems, e-commerce, and AI automation for real estate, clinics, restaurants, trading, e-commerce, and startups.',
    ar: 'كلاود توبيا تبني مواقع وأنظمة أعمال ومتاجر وأتمتة ذكاء اصطناعي للعقارات والعيادات والمطاعم والتجارة والشركات الناشئة.',
    tr: 'CloudTopia emlak, klinik, restoran, ticaret, e-ticaret ve girişimler için web siteleri, iş sistemleri ve AI otomasyon geliştirir.',
  }

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: canonicalUrl(locale, '/industries'),
    },
    twitter: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    alternates: {
      canonical: canonicalUrl(locale, '/industries'),
      languages: buildHreflangMap('/industries'),
    },
  }
}

export default function IndustriesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale ?? 'en'
  return <EnterpriseIndustriesLite locale={locale} />
}
