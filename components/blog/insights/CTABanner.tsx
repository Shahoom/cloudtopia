import Link from 'next/link'
import { ArrowRight, Cloud } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'

export function CTABanner({
  locale,
  title = 'Ready to move your business to the cloud?',
  subtitle = 'CloudTopia designs and builds cloud infrastructure, web applications, and AI-powered systems for growth-focused businesses.',
}: {
  locale: string
  title?: string
  subtitle?: string
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-neutral-950 shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.25),transparent_55%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-8 py-10 sm:flex-row sm:items-center sm:py-12">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-black leading-tight text-white md:text-3xl">{title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">{subtitle}</p>
          <Link
            href={localePath(locale, '/contact')}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-neutral-950 transition hover:bg-sky-100"
          >
            Start Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="hidden shrink-0 sm:block">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
            <Cloud className="h-12 w-12 text-sky-300" />
          </div>
        </div>
      </div>
    </section>
  )
}
