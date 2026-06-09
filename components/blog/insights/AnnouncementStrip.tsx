import Link from 'next/link'
import { localePath } from '@/lib/i18n/url'

const messagesEn = [
  'Cloud Migration Strategy 2026 — New Guide Available',
  'Kubernetes vs Docker Swarm: Complete Comparison',
  'How Much Does Cloud Infrastructure Cost in 2026?',
  'Building Serverless Apps with AWS Lambda — Free Guide',
  'Multi-Cloud Architecture Best Practices',
  'Cloud Security for Enterprise Applications',
]

const messagesAr = [
  'استراتيجية الترحيل السحابي 2026 — دليل جديد',
  'Kubernetes مقابل Docker Swarm: مقارنة شاملة',
  'كم تكلف البنية التحتية السحابية في 2026؟',
  'بناء تطبيقات Serverless مع AWS Lambda — دليل مجاني',
  'أفضل ممارسات المعمارية متعددة السحب',
  'أمن السحابة لتطبيقات المؤسسات',
]

export function AnnouncementStrip({ locale }: { locale: string }) {
  const messages = locale === 'ar' ? messagesAr : messagesEn
  const text = messages.join('  ·  ')

  return (
    <div className="relative flex h-10 w-full overflow-hidden bg-neutral-950 text-white">
      <div
        className="animate-marquee flex shrink-0 items-center whitespace-nowrap"
        style={{ '--duration': '38s' } as React.CSSProperties}
      >
        <span className="px-4 text-xs font-bold tracking-wide text-white/85">{text}</span>
        <span aria-hidden="true" className="px-4 text-xs font-bold tracking-wide text-white/85">{text}</span>
      </div>
      <div
        className="animate-marquee flex shrink-0 items-center whitespace-nowrap"
        aria-hidden="true"
        style={{ '--duration': '38s' } as React.CSSProperties}
      >
        <span className="px-4 text-xs font-bold tracking-wide text-white/85">{text}</span>
        <span className="px-4 text-xs font-bold tracking-wide text-white/85">{text}</span>
      </div>
      <Link
        href={localePath(locale, '/articles')}
        className="absolute right-4 top-1/2 -translate-y-1/2 shrink-0 text-xs font-black text-primary-400 hover:text-primary-300 transition z-10"
      >
        {locale === 'ar' ? '← اكتشف الآن' : 'Explore Now →'}
      </Link>
    </div>
  )
}
