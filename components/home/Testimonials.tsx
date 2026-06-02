'use client'

import { ArrowRight, Quote, ShieldCheck, Star } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { cn } from '@/lib/utils'

const testimonials = {
  en: [
    {
      id: 'oman-operations',
      quote:
        'CloudTopia understood the business before touching the design. The website, CRM flow, WhatsApp inquiry path, and SEO structure finally work as one system.',
      name: 'Omar Al Hinai',
      role: 'Operations Director, Oman service company',
      service: 'Website, CRM, Cloud Hosting',
    },
    {
      id: 'uae-retail',
      quote:
        'We needed a software company that could build fast without making the platform fragile. Their team delivered a clean customer portal, admin dashboard, and data migration plan.',
      name: 'Mariam Al Nuaimi',
      role: 'Founder, UAE retail platform',
      service: 'Web App, Data Migration, Payments',
    },
    {
      id: 'saudi-consulting',
      quote:
        'The free consultation and demo preview made the decision easy. We saw the direction before paying, then launched a bilingual site with better local search visibility.',
      name: 'Fahad Al Qahtani',
      role: 'Managing Partner, Saudi consulting firm',
      service: 'Arabic + English SEO Website',
    },
    {
      id: 'jordan-clinic',
      quote:
        'They did not sell us a generic template. CloudTopia mapped our booking process, built the automation, and gave our team ownership of the code and accounts.',
      name: 'Lina Haddad',
      role: 'Clinic manager, Jordan',
      service: 'Booking System, Automation',
    },
    {
      id: 'turkey-saas',
      quote:
        'For a cloud company, the handover mattered most. Backups, deployment notes, analytics access, and support were all clear after launch.',
      name: 'Khaled Demir',
      role: 'Product lead, Turkey SaaS team',
      service: 'Cloud Migration, DevOps',
    },
    {
      id: 'kuwait-ai-support',
      quote:
        'The AI customer care workflow reduced repetitive questions and helped our staff answer faster. It feels practical, not like a trend added for show.',
      name: 'Noura Al Sabah',
      role: 'Customer experience lead, Kuwait',
      service: 'AI Support, Knowledge Base',
    },
  ],
  ar: [
    {
      id: 'oman-operations-ar',
      quote:
        'فريق كلاود توبيا فهم طريقة العمل قبل التصميم. الموقع، ومسار CRM، واستفسارات واتساب، وبنية السيو صارت تعمل كنظام واحد واضح.',
      name: 'عمر الهنائي',
      role: 'مدير عمليات، شركة خدمات في عُمان',
      service: 'موقع، CRM، استضافة سحابية',
    },
    {
      id: 'uae-retail-ar',
      quote:
        'كنا نبحث عن شركة برمجيات تبني بسرعة من غير ما تجعل المنصة هشة. سلّموا بوابة عملاء، لوحة إدارة، وخطة نقل بيانات منظمة.',
      name: 'مريم النعيمي',
      role: 'مؤسسة منصة تجارة في الإمارات',
      service: 'تطبيق ويب، نقل بيانات، دفع إلكتروني',
    },
    {
      id: 'saudi-consulting-ar',
      quote:
        'الاستشارة المجانية ومعاينة الديمو سهّلت القرار. رأينا الاتجاه قبل الدفع، ثم أطلقنا موقعاً عربياً وإنجليزياً بظهور أفضل في البحث المحلي.',
      name: 'فهد القحطاني',
      role: 'شريك إداري، مكتب استشاري في السعودية',
      service: 'موقع عربي وإنجليزي مع SEO',
    },
    {
      id: 'jordan-clinic-ar',
      quote:
        'لم يبيعونا قالباً عاماً. رسموا مسار الحجز، بنوا الأتمتة، وسلّموا الكود والحسابات للفريق باسم الشركة.',
      name: 'لينا حداد',
      role: 'مديرة عيادة، الأردن',
      service: 'نظام حجز، أتمتة أعمال',
    },
    {
      id: 'turkey-saas-ar',
      quote:
        'كشركة سحابة وتقنية، كان التسليم أهم شيء. النسخ الاحتياطي، ملاحظات النشر، التحليلات، والدعم كانت واضحة بعد الإطلاق.',
      name: 'خالد ديمير',
      role: 'قائد منتج، فريق SaaS في تركيا',
      service: 'ترحيل سحابي، DevOps',
    },
    {
      id: 'kuwait-ai-support-ar',
      quote:
        'مسار خدمة العملاء بالذكاء الاصطناعي خفّف الأسئلة المتكررة وساعد الفريق يرد بسرعة. كان عملياً وليس ميزة مضافة للزينة.',
      name: 'نورة الصباح',
      role: 'قائدة تجربة العملاء، الكويت',
      service: 'دعم AI، قاعدة معرفة',
    },
  ],
}

export default function Testimonials() {
  const { locale } = useLanguage()
  const isRTL = locale === 'ar'
  const items = locale === 'ar' ? testimonials.ar : testimonials.en
  const copy = locale === 'ar'
    ? {
      eyebrow: 'ثقة مبنية على التسليم',
      title: 'آراء عملاء عملوا معنا على مواقع، أنظمة، سحابة، وذكاء اصطناعي',
      body: 'كلاود توبيا شركة برمجيات وسحابة تبني حلولاً رقمية للشركات: مواقع احترافية، تطبيقات ويب وجوال، CRM وERP، ترحيل بيانات، أتمتة أعمال، ودعم عملاء بالذكاء الاصطناعي.',
      proof: 'استشارة مجانية + معاينة ديمو مجانية قبل بدء المشروع',
    }
    : {
      eyebrow: 'Trusted Delivery',
      title: 'Client feedback from websites, systems, cloud, and AI projects',
      body: 'CloudTopia is a software company and cloud technology company building business websites, web and mobile apps, CRM and ERP systems, data migration, business automation, and AI customer care workflows.',
      proof: 'Free consultation + free custom demo preview before the project starts',
    }

  return (
    <section className="relative overflow-hidden bg-[#18152a] px-4 py-16 text-white sm:px-6 lg:px-8 md:py-20" data-header-theme="dark" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(125,211,252,0.18),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(216,180,254,0.2),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_18px)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {copy.eyebrow}
            </span>
            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight md:text-5xl" style={{ textWrap: 'balance' }}>
              {copy.title}
            </h2>
          </div>
          <div>
            <p className="text-base font-semibold leading-8 text-white/68 md:text-lg">{copy.body}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              {copy.proof}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.slice(0, 3).map((item, index) => (
            <article
              key={item.id}
              className={cn(
                'group relative min-h-[21rem] overflow-hidden rounded-2xl border border-white/12 bg-white/[0.08] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-cyan-200/45 hover:bg-white/[0.12]',
                index === 1 && 'md:-translate-y-4',
              )}
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f4f1f8] text-sm font-black text-slate-950">
                  {item.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('')}
                </span>
                <Quote className="h-7 w-7 text-cyan-200" aria-hidden="true" />
              </div>
              <blockquote className="text-lg font-black leading-8 text-white">
                “{item.quote}”
              </blockquote>
              <div className="absolute inset-x-6 bottom-6 border-t border-white/12 pt-5">
                <p className="font-black text-white">{item.name}</p>
                <p className="mt-1 line-clamp-1 text-sm font-semibold text-white/62">{item.role}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                  {item.service}
                  <ArrowRight className={cn('h-3.5 w-3.5', isRTL && 'rotate-180')} aria-hidden="true" />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
