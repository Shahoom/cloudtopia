'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ShieldCheck, Star } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { cn } from '@/lib/utils'

// Certified technology partners shown as a marquee below the reviews.
const PARTNERS = [
  { name: 'AWS Advanced Tier Services Partner', src: '/partners/aws-partner.png' },
  { name: 'Microsoft Partner', src: '/partners/microsoft-partner.webp' },
  { name: 'Salesforce Partner', src: '/partners/salesforce-partner.png' },
  { name: 'Stripe Partner', src: '/partners/stripe-partner.png' },
  { name: 'Shopify Certified Partner', src: '/partners/shopify-partner.png' },
]


export default function Testimonials() {
  const { locale } = useLanguage()
  const isRTL = locale === 'ar'
  const clutchHostRef = useRef<HTMLDivElement | null>(null)
  const [clutchNear, setClutchNear] = useState(false)

  // Load Clutch only when the testimonial section approaches the viewport.
  useEffect(() => {
    const host = clutchHostRef.current
    if (!host) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setClutchNear(true)
      },
      { rootMargin: '600px' },
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  // Clutch's widget.js only auto-renders `.clutch-widget` elements that exist
  // while the document is still loading. This section is dynamically imported,
  // so we inject the script ourselves and poll for window.CLUTCHCO.Init, then
  // call it once the API is ready — reliable regardless of mount/load order.
  useEffect(() => {
    if (!clutchNear) return
    const SRC = 'https://widget.clutch.co/static/js/widget.js'
    let inserted: HTMLScriptElement | null = null
    let initialized = false
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      inserted = document.createElement('script')
      inserted.src = SRC
      inserted.async = true
      document.body.appendChild(inserted)
    }
    let tries = 0
    const id = window.setInterval(() => {
      const C = (window as unknown as { CLUTCHCO?: { Init?: () => void } }).CLUTCHCO
      if ((C && typeof C.Init === 'function' && ((initialized = true), C.Init(), true)) || ++tries > 40) {
        window.clearInterval(id)
      }
    }, 250)
    return () => {
      window.clearInterval(id)
      // If this component inserted the script and unmounts before Clutch ever
      // initialized, remove it again so navigation doesn't accumulate scripts.
      if (inserted && !initialized) inserted.remove()
    }
  }, [clutchNear])

  const copy = locale === 'ar'
    ? {
      eyebrow: 'ثقة مبنية على التسليم',
      title: 'شركاء تقنيون معتمدون وتقييمات موثقة عبر Clutch',
      body: 'كلاود توبيا شركة برمجيات وسحابة تبني حلولاً رقمية للشركات: مواقع احترافية، تطبيقات ويب وجوال، CRM وERP، ترحيل بيانات، أتمتة أعمال، ودعم عملاء بالذكاء الاصطناعي.',
      proof: 'استشارة مجانية + معاينة ديمو مجانية قبل بدء المشروع',
      clutchLabel: 'ملفنا على Clutch',
      partnersLabel: 'شركاء تقنيون معتمدون',
    }
    : {
      eyebrow: 'Trusted Delivery',
      title: 'Certified technology partners and verified reviews on Clutch',
      body: 'CloudTopia is a software company and cloud technology company building business websites, web and mobile apps, CRM and ERP systems, data migration, business automation, and AI customer care workflows.',
      proof: 'Free consultation + free custom demo preview before the project starts',
      clutchLabel: 'View our Clutch profile',
      partnersLabel: 'Certified Technology Partners',
    }

  // Repeat the partner badges so the marquee track fills wide screens; the
  // track is rendered twice in the marquee for a seamless -50% loop.
  const marqueeRow = [...PARTNERS, ...PARTNERS]

  return (
    <section className="relative overflow-hidden bg-[#f4f1f8] px-4 py-16 text-eerie sm:px-6 lg:px-8 md:py-24" data-header-theme="light" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(125,211,252,0.22),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(216,180,254,0.28),transparent_30%),linear-gradient(135deg,rgba(27,27,35,0.035)_0_1px,transparent_1px_18px)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-eerie/10 bg-white/80 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-primary-700 shadow-sm">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {copy.eyebrow}
            </span>
            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-eerie md:text-5xl" style={{ textWrap: 'balance' }}>
              {copy.title}
            </h2>
          </div>
          <div>
            <p className="text-base font-semibold leading-8 text-neutral-600 md:text-lg">{copy.body}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-eerie/10 bg-white px-4 py-2 text-sm font-black text-eerie shadow-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              {copy.proof}
            </p>
          </div>
        </div>
        {/* ── Certified Partners + Clutch reviews ─────────────────────────── */}
        <div className="relative z-30 mt-16 md:mt-24">
          <div className="overflow-hidden rounded-3xl border border-eerie/10 bg-white/70 shadow-sm backdrop-blur-sm">
            {/* Clutch verified reviews */}
            <div className="flex flex-col items-center gap-4 px-6 py-7 text-center md:flex-row md:justify-center md:gap-6 md:py-8">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-primary-700">
                {copy.clutchLabel}
              </span>
              <div ref={clutchHostRef} className="flex min-h-[52px] items-center justify-center">
                {/* The Clutch iframe is width:100% — the container needs an
                    explicit width or it collapses to 0 inside the flex row. */}
                <div
                  className="clutch-widget w-[300px] max-w-full"
                  style={{ minHeight: 45 }}
                  data-url="https://widget.clutch.co"
                  data-widget-type="2"
                  data-height="45"
                  data-nofollow="false"
                  data-expandifr="false"
                  data-clutchcompany-id="2639853"
                />
              </div>
            </div>

            {/* Certified technology partners marquee — full width */}
            <div className="border-t border-eerie/10 bg-white/50 py-8 md:py-10">
              <span className="mb-7 block text-center text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                {copy.partnersLabel}
              </span>
              <div
                className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]"
                dir="ltr"
              >
                <div className="flex w-max animate-marquee items-center" style={{ '--duration': '34s' } as CSSProperties}>
                  {[marqueeRow, marqueeRow].map((row, rowIdx) => (
                    <div key={rowIdx} aria-hidden={rowIdx === 1} className="flex shrink-0 items-center">
                      {row.map((partner, i) => (
                        <div
                          key={`${rowIdx}-${i}`}
                          className="mx-8 flex shrink-0 items-center justify-center sm:mx-12"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={partner.src}
                            alt={partner.name}
                            loading="lazy"
                            className="h-14 w-auto max-w-[230px] object-contain sm:h-16 md:h-20"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
