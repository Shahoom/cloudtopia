'use client'

import { ArrowRight, Quote, ShieldCheck, Star } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { cn } from '@/lib/utils'
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials'

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

  const [featured, ...supporting] = items

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
        <div className="mt-12 relative z-30">
          <StaggerTestimonials />
        </div>
      </div>
    </section>
  )
}
