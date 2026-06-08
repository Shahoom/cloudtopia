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
      imgSrc: '/images/testimonials/omar.jpg',
    },
    {
      id: 'uae-retail',
      quote:
        'We needed a software company that could build fast without making the platform fragile. Their team delivered a clean customer portal, admin dashboard, and data migration plan.',
      name: 'Mariam Al Nuaimi',
      role: 'Founder, UAE retail platform',
      service: 'Web App, Data Migration, Payments',
      imgSrc: '/images/testimonials/mariam.jpeg',
    },
    {
      id: 'saudi-consulting',
      quote:
        'The free consultation and demo preview made the decision easy. We saw the direction before paying, then launched a bilingual site with better local search visibility.',
      name: 'Fahad Al Qahtani',
      role: 'Managing Partner, Saudi consulting firm',
      service: 'Arabic + English SEO Website',
      imgSrc: '/images/testimonials/fahad.jpg',
    },
    {
      id: 'jordan-clinic',
      quote:
        'They did not sell us a generic template. CloudTopia mapped our booking process, built the automation, and gave our team ownership of the code and accounts.',
      name: 'Lina Haddad',
      role: 'Clinic manager, Jordan',
      service: 'Booking System, Automation',
      imgSrc: '/images/testimonials/lina.jpeg',
    },
    {
      id: 'turkey-saas',
      quote:
        'For a cloud company, the handover mattered most. Backups, deployment notes, analytics access, and support were all clear after launch.',
      name: 'Khaled Demir',
      role: 'Product lead, Turkey SaaS team',
      service: 'Cloud Migration, DevOps',
      imgSrc: '/images/testimonials/khaled.webp',
    },
    {
      id: 'kuwait-ai-support',
      quote:
        'The AI customer care workflow reduced repetitive questions and helped our staff answer faster. It feels practical, not like a trend added for show.',
      name: 'Noura Al Sabah',
      role: 'Customer experience lead, Kuwait',
      service: 'AI Support, Knowledge Base',
      imgSrc: '/images/testimonials/noura.webp',
    },
    { id: 'en-6', quote: "Took some convincing, but now that we're on CloudTopia, we're never going back.", name: "Fatima Al Hashimi", role: "CTO at Qatar Tech", service: "Cloud Infrastructure", imgSrc: '/images/testimonials/fatima.jpeg' },
    { id: 'en-7', quote: "I would be lost without CloudTopia's CRM analytics. The ROI is EASILY 100X for us.", name: "Zaid Al Harbi", role: "Sales Director at Arab Business Systems", service: "CRM Analytics", imgSrc: '/images/testimonials/zaid.png' },
    { id: 'en-8', quote: "It's just the best cloud migration team. Period.", name: "Faisal Al Otaibi", role: "Head of Infrastructure at Gulf Trading Co", service: "Cloud Migration", imgSrc: '/images/testimonials/faisal al otaibi.jpg' },
    { id: 'en-9', quote: "I switched our hosting to CloudTopia 3 years ago and never looked back.", name: "Reem Al Dossary", role: "E-commerce Lead at Oman E-com", service: "Hosting", imgSrc: '/images/testimonials/reem.jpeg' },
    { id: 'en-10', quote: "I've been searching for a custom portal like CloudTopia's for YEARS. So glad I finally found one!", name: "Majed Al Subaie", role: "Founder at Jeddah Digital", service: "Custom Portal", imgSrc: '/images/testimonials/majed.jpeg' },
    { id: 'en-11', quote: "It's so simple and intuitive, we got the operations team up to speed in 10 minutes.", name: "Layla Al Fadhli", role: "HR Manager at Dubai Logistics", service: "Operations Systems", imgSrc: '/images/testimonials/layla.webp' },
    { id: 'en-12', quote: "CloudTopia's support is unparalleled. They are always there when we need them.", name: "Sarah Al Jaber", role: "Customer Success at Kuwait Retail", service: "Support Services", imgSrc: '/images/testimonials/sarah.webp' },
    { id: 'en-13', quote: "The efficiency gains we've seen since implementing CloudTopia are off the charts!", name: "Hamad Al Thani", role: "Operations VP at Qatar Group", service: "Efficiency Solutions", imgSrc: '/images/testimonials/hamad.jpeg' },
    { id: 'en-14', quote: "If I could give 11 stars to CloudTopia, I'd give 12.", name: "Tariq Al Saeed", role: "Head of Digital at Bahrain Finance", service: "Digital Services", imgSrc: '/images/testimonials/tariq.jpeg' },
    { id: 'en-15', quote: "The scalability of CloudTopia's app architecture is impressive. It grows with our business.", name: "Faisal Al Saud", role: "Product Lead at Riyadh Estate", service: "App Architecture", imgSrc: '/images/testimonials/faisal.jpeg' },
    { id: 'en-16', quote: "I appreciate how CloudTopia continually innovates. They are always one step ahead.", name: "Youssef Al Mansoori", role: "Tech Director at Dubai SaaS", service: "Innovation Tech", imgSrc: '/images/testimonials/youssef.jpeg' },
    { id: 'en-17', quote: "The ROI we've seen with CloudTopia is incredible. It has paid for itself many times over.", name: "Mona Al Musa", role: "Financial Director at Bahrain Group", service: "Financial Systems", imgSrc: '/images/testimonials/mona.jpg' },
    { id: 'en-18', quote: "CloudTopia's custom ERP platform is so robust, yet easy to use. It is the perfect balance.", name: "Zaid Al Nahyan", role: "General Manager at Abu Dhabi Partners", service: "Custom ERP", imgSrc: '/images/testimonials/zaid.jpeg' },
    { id: 'en-19', quote: "We've tried many solutions, but CloudTopia stands out in terms of reliability and performance.", name: "Huda Al Rasheed", role: "Supply Chain Manager at Sharjah Log", service: "Reliability & Performance", imgSrc: '/images/testimonials/huda.webp' }
  ],
  ar: [
    {
      id: 'oman-operations-ar',
      quote:
        'فريق كلاود توبيا فهم طريقة العمل قبل التصميم. الموقع، ومسار CRM، واستفسارات واتساب، وبنية السيو صارت تعمل كنظام واحد واضح.',
      name: 'عمر الهنائي',
      role: 'مدير عمليات، شركة خدمات في عُمان',
      service: 'موقع، CRM، استضافة سحابية',
      imgSrc: '/images/testimonials/omar.jpg',
    },
    {
      id: 'uae-retail-ar',
      quote:
        'كنا نبحث عن شركة برمجيات تبني بسرعة من غير ما تجعل المنصة هشة. سلّموا بوابة عملاء، لوحة إدارة، وخطة نقل بيانات منظمة.',
      name: 'مريم النعيمي',
      role: 'مؤسسة منصة تجارة في الإمارات',
      service: 'تطبيق ويب، نقل بيانات، دفع إلكتروني',
      imgSrc: '/images/testimonials/mariam.jpeg',
    },
    {
      id: 'saudi-consulting-ar',
      quote:
        'الاستشارة المجانية ومعاينة الديمو سهّلت القرار. رأينا الاتجاه قبل الدفع، ثم أطلقنا موقعاً عربياً وإنجليزياً بظهور أفضل في البحث المحلي.',
      name: 'فهد القحطاني',
      role: 'شريك إداري، مكتب استشاري في السعودية',
      service: 'موقع عربي وإنجليزي مع SEO',
      imgSrc: '/images/testimonials/fahad.jpg',
    },
    {
      id: 'jordan-clinic-ar',
      quote:
        'لم يبيعونا قالباً عاماً. رسموا مسار الحجز، بنوا الأتمتة، وسلّموا الكود والحسابات للفريق باسم الشركة.',
      name: 'لينا حداد',
      role: 'مديرة عيادة، الأردن',
      service: 'نظام حجز، أتمتة أعمال',
      imgSrc: '/images/testimonials/lina.jpeg',
    },
    {
      id: 'turkey-saas-ar',
      quote:
        'كشركة سحابة وتقنية، كان التسليم أهم شيء. النسخ الاحتياطي، ملاحظات النشر، التحليلات، والدعم كانت واضحة بعد الإطلاق.',
      name: 'خالد ديمير',
      role: 'قائد منتج، فريق SaaS في تركيا',
      service: 'ترحيل سحابي، DevOps',
      imgSrc: '/images/testimonials/khaled.webp',
    },
    {
      id: 'kuwait-ai-support-ar',
      quote:
        'مسار خدمة العملاء بالذكاء الاصطناعي خفّف الأسئلة المتكررة وساعد الفريق يرد بسرعة. كان عملياً وليس ميزة مضافة للزينة.',
      name: 'نورة الصباح',
      role: 'قائدة تجربة العملاء، الكويت',
      service: 'دعم AI، قاعدة معرفة',
      imgSrc: '/images/testimonials/noura.webp',
    },
    { id: 'ar-6', quote: "تطلب الأمر بعض الإقناع، ولكن الآن بعد أن انتقلنا إلى كلاود توبيا، لن نعود للوراء أبداً.", name: "فاطمة الهاشمي", role: "المديرة التقنية في قطر تك", service: "البنية التحتية السحابية", imgSrc: '/images/testimonials/fatima.jpeg' },
    { id: 'ar-7', quote: "كنا سنضيع لولا تحليلات نظام CRM من كلاود توبيا. العائد على الاستثمار يتجاوز 100 ضعف بسهولة.", name: "زيد الحربي", role: "مدير المبيعات في الأنظمة العربية", service: "تحليلات إدارة علاقات العملاء", imgSrc: '/images/testimonials/zaid.png' },
    { id: 'ar-8', quote: "إنهم ببساطة أفضل فريق ترحيل سحابي. نقطة انتهى.", name: "فيصل العتيبي", role: "رئيس البنية التحتية في الخليج التجارية", service: "الترحيل السحابي", imgSrc: '/images/testimonials/faisal al otaibi.jpg' },
    { id: 'ar-9', quote: "نقلت استضافتنا إلى كلاود توبيا منذ 3 سنوات ولم أنظر إلى الوراْء أبداً.", name: "ريم الدوسري", role: "قائدة التجارة الإلكترونية في عُمان إيكوم", service: "الاستضافة", imgSrc: '/images/testimonials/reem.jpeg' },
    { id: 'ar-10', quote: "لقد كنت أبحث عن بوابة مخصصة مثل بوابة كلاود توبيا لسنوات. سعيد جداً لأنني وجدتها أخيراً!", name: "ماجد السبيعي", role: "المؤسس في جدة الرقمية", service: "بوابة مخصصة", imgSrc: '/images/testimonials/majed.jpeg' },
    { id: 'ar-11', quote: "إنه بسيط وسهل الاستخدام للغاية، جعلنا فريق العمليات يتقنه في غضون 10 دقائق فقط.", name: "ليلى الفضلي", role: "مديرة الموارد البشرية في دبي للوجستيات", service: "أنظمة العمليات", imgSrc: '/images/testimonials/layla.webp' },
    { id: 'ar-12', quote: "دعم كلاود توبيا لا مثيل له. إنهم متواجدون دائماً عندما نحتاج إليهم.", name: "سارة الجابر", role: "نجاح العملاء في الكويت للتجزئة", service: "خدمات الدعم", imgSrc: '/images/testimonials/sarah.webp' },
    { id: 'ar-13', quote: "مكاسب الكفاءة التي رأيناها منذ تطبيق حلول كلاود توبيا تفوق كل التوقعات!", name: "حمد آل ثاني", role: "نائب رئيس العمليات في مجموعة قطر", service: "حلول الكفاءة", imgSrc: '/images/testimonials/hamad.jpeg' },
    { id: 'ar-14', quote: "لو كان بإمكاني إعطاء 11 نجماً لكلاود توبيا، لأعطيتها 12 نجماً.", name: "طارق السعيد", role: "رئيس القسم الرقمي في مالية البحرين", service: "الخدمات الرقمية", imgSrc: '/images/testimonials/tariq.jpeg' },
    { id: 'ar-15', quote: "قدرة بنية تطبيقات كلاود توبيا على التوسع مبهرة حقاً. إنها تنمو مع أعمالنا بسلاسة.", name: "فيصل آل سعود", role: "قائد المنتج في الرياض العقارية", service: "بنية التطبيقات", imgSrc: '/images/testimonials/faisal.jpeg' },
    { id: 'ar-16', quote: "أقدر كيف تبتكر كلاود توبيا باستمرار. إنهم دائماً خطوة إلى الأمام.", name: "يوسف المنصوري", role: "المدير التقني في دبي SaaS", service: "التكنولوجيا المبتكرة", imgSrc: '/images/testimonials/youssef.jpeg' },
    { id: 'ar-17', quote: "العائد على الاستثمار الذي رأيناه مع كلاود توبيا لا يصدق. لقد استرددنا التكلفة أضعافاً مضاعفة.", name: "منى الموسى", role: "المديرة المالية في مجموعة البحرين", service: "الأنظمة المالية", imgSrc: '/images/testimonials/mona.jpg' },
    { id: 'ar-18', quote: "نظام ERP المخصص من كلاود توبيا قوي للغاية ولكنه سهل الاستخدام. التوازن المثالي.", name: "زيد آل نهيان", role: "المدير العام في شركاء أبوظبي", service: "نظام تخطيط موارد المؤسسات المخصص", imgSrc: '/images/testimonials/zaid.jpeg' },
    { id: 'ar-19', quote: "لقد جربنا العديد من الحلول، ولكن كلاود توبيا تبرز بشكل لافت من حيث الموثوقية والأداء.", name: "هدى الرشيد", role: "مديرة سلاسل الإمداد في الشارقة للخدمات اللوجستية", service: "الموثوقية والأداء", imgSrc: '/images/testimonials/huda.webp' }
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
          <StaggerTestimonials testimonials={items} />
        </div>
      </div>
    </section>
  )
}
