import Image from 'next/image'
import { Check, ChevronLeft, ChevronRight, CornerDownRight } from 'lucide-react'

type Locale = 'en' | 'ar'

type LocalizedText = Record<Locale, string>

const tabs: Array<{ id: string; label: LocalizedText }> = [
  { id: 'ai-consulting', label: { en: 'AI Consulting & Strategy', ar: 'استشارات الـ AI والاستراتيجية' } },
  { id: 'ai-product-dev', label: { en: 'AI Product Development', ar: 'تطوير منتجات الذكاء الاصطناعي' } },
  { id: 'generative-ai', label: { en: 'Generative AI Development', ar: 'تطوير الـ AI التوليدي' } },
  { id: 'ai-agents', label: { en: 'AI Agent / Copilot', ar: 'الوكلاء والمساعدين' } },
  { id: 'chatbot-conversational', label: { en: 'Chatbot & Conversational', ar: 'روبوتات الدردشة' } },
  { id: 'smart-assistants', label: { en: 'Smart Business Assistants', ar: 'مساعدو الأعمال' } },
  { id: 'machine-learning', label: { en: 'Machine Learning & DL', ar: 'التعلم الآلي والعميق' } },
  { id: 'custom-ai-systems', label: { en: 'Enterprise Systems', ar: 'الأنظمة المؤسسية' } },
  { id: 'data-engineering', label: { en: 'Data Engineering', ar: 'هندسة البيانات' } },
  { id: 'ai-automation', label: { en: 'AI Automation & RPA', ar: 'أتمتة الـ AI والـ RPA' } },
]

const activeTab = {
  id: tabs[0].id,
  label: tabs[0].label,
  heading: {
    en: 'AI Consulting & Strategy',
    ar: 'استشارات واستراتيجيات الذكاء الاصطناعي',
  },
  description: {
    en: 'Our AI consulting services aim to enable businesses to harness the power of AI through strategic advisory. We take a deep dive into your current business ecosystem, identify AI potential areas, and chart out a detailed action plan that is most suitable for your needs.',
    ar: 'تهدف خدمات استشارات الذكاء الاصطناعي لدينا إلى تمكين الشركات من تسخير قوة الذكاء الاصطناعي من خلال الاستشارات الاستراتيجية. نحن نتعمق في منظومة عملك الحالية، ونحدد مجالات إمكانات الذكاء الاصطناعي، ونرسم خطة عمل مفصلة.',
  },
  image: '/images/homepage/AI Consulting & Strategy.jpg',
  bullets: [
    {
      en: 'Conduct comprehensive workflow audits to identify operational gaps and AI opportunities.',
      ar: 'إجراء عمليات تدقيق شاملة لسير العمل لتحديد الثغرات التشغيلية وفرص الذكاء الاصطناعي.',
    },
    {
      en: 'Create actionable AI roadmaps tailored to scalability and business objectives.',
      ar: 'إنشاء خرائط طريق قابلة للتنفيذ للذكاء الاصطناعي مصممة خصيصًا لقابلية التوسع وأهداف العمل.',
    },
    {
      en: 'Recommend the right technology stack and AI models for your industry.',
      ar: 'التوصية بمجموعة التقنيات المناسبة ونماذج الذكاء الاصطناعي لمجال عملك.',
    },
    {
      en: 'Measure success with clear KPIs and evaluation frameworks for implementation.',
      ar: 'قياس النجاح باستخدام مؤشرات أداء رئيسية واضحة وأطر تقييم للتنفيذ.',
    },
  ] satisfies LocalizedText[],
}

const copy = {
  en: {
    title: 'Our Complete AI Development Services',
    subtitle:
      'CloudTopia leverages AI development services and business to craft solutions that revolutionize your business operations, increase your capacity for new ideas, and achieve desired outcomes. We not only strategize but also implement and monitor the whole AI chain to help organizations embrace innovation, automate, and be competitive in a digitally changing world.',
    tabsHeading: 'Our AI Services',
    scrollLeft: 'Scroll left',
    scrollRight: 'Scroll right',
  },
  ar: {
    title: 'خدماتنا الكاملة لتطوير الذكاء الاصطناعي',
    subtitle:
      'تستفيد كلاود توبيا من خدمات تطوير الذكاء الاصطناعي والأعمال لصياغة حلول تحدث ثورة في عملياتك التجارية، وتزيد من قدرتك على الأفكار الجديدة، وتحقق النتائج المرجوة. نحن لا نضع استراتيجيات فحسب، بل ننفذ ونراقب سلسلة الذكاء الاصطناعي بأكملها لمساعدة المؤسسات على تبني الابتكار والأتمتة والمنافسة في عالم متغير رقمياً.',
    tabsHeading: 'خدماتنا في الذكاء الاصطناعي',
    scrollLeft: 'التمرير لليسار',
    scrollRight: 'التمرير لليمين',
  },
} satisfies Record<Locale, Record<string, string>>

export function AiDigitalServicesStatic({ locale }: { locale: Locale }) {
  const isRTL = locale === 'ar'
  const localCopy = copy[locale]

  return (
    <section
      id="ai-digital-services-section"
      className="relative bg-[#050505] text-white overflow-hidden"
      data-header-theme="dark"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="relative flex flex-col h-full min-h-screen items-center justify-center bg-lavender dark:bg-zinc-900 text-slate-950 transition-bg w-full !min-h-0 py-10 lg:py-12 px-4 sm:px-6 lg:px-8 !items-start !justify-start !bg-[#050505]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [background-image:var(--white-gradient),var(--aurora)] dark:[background-image:var(--dark-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] filter blur-[4px] pointer-events-none absolute -inset-[10px] opacity-40 [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]">
            <div
              className="md:block hidden absolute inset-0 opacity-50 mix-blend-soft-light animate-aurora-transform will-change-transform"
              style={{
                backgroundImage: 'var(--aurora)',
                backgroundSize: '200% 200%',
                width: '200%',
                height: '200%',
                left: '-50%',
                top: '-50%',
              }}
            />
          </div>
        </div>

        <div className="relative z-10 w-full">
          <div className="relative max-w-7xl mx-auto w-full z-10">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight lg:w-1/2 tracking-tight">
                {localCopy.title}
              </h2>
              <p className="text-base sm:text-lg text-neutral-400 leading-relaxed lg:w-1/2">{localCopy.subtitle}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 mb-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-1/2 bg-indigo-500/10 blur-[80px] pointer-events-none" />
              <div className="flex items-center justify-between mb-6 px-2 relative z-10">
                <div className="flex items-center gap-3">
                  <CornerDownRight className={`w-6 h-6 text-indigo-400 ${isRTL ? '-scale-x-100' : ''}`} />
                  <h3 className="text-xl font-bold text-white">{localCopy.tabsHeading}</h3>
                </div>
                <div className="w-8" />
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <button
                  type="button"
                  aria-label={localCopy.scrollLeft}
                  aria-disabled="true"
                  tabIndex={-1}
                  className="hidden sm:flex shrink-0 items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-indigo-400/50 transition-all"
                >
                  <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>

                <div
                  role="tablist"
                  className="flex items-center gap-3 overflow-x-auto flex-1 py-2 px-1 mask-linear-edges [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing select-none"
                >
                  {tabs.map((tab, index) => {
                    const isActive = tab.id === activeTab.id
                    return (
                      <button
                        key={tab.id}
                        id={`tab-${tab.id}`}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={isActive ? `panel-${activeTab.id}` : undefined}
                        aria-disabled="true"
                        tabIndex={-1}
                        className={`relative shrink-0 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 ${
                          isActive ? 'text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {isActive ? (
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full shadow-lg shadow-indigo-500/25 border border-indigo-400/50"
                          />
                        ) : null}
                        <span className="relative z-10 opacity-60 text-xs font-mono">[{index + 1}]</span>
                        <span className="relative z-10">{tab.label[locale]}</span>
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  aria-label={localCopy.scrollRight}
                  aria-disabled="true"
                  tabIndex={-1}
                  className="hidden sm:flex shrink-0 items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-indigo-400/50 transition-all"
                >
                  <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                <div className="h-full bg-blue-500" style={{ width: `${100 / tabs.length}%` }} />
              </div>
            </div>

            <div className="min-h-[350px]">
              <div className="relative rounded-[2rem] border-[0.75px] border-white/10 p-2 md:rounded-[2.5rem] md:p-3 mt-4">
                <div
                  id={`panel-${activeTab.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeTab.id}`}
                  className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border-[0.75px] border-white/5 bg-[#1b1b23]/90 p-5 sm:p-8 shadow-sm backdrop-blur-md z-10 group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative z-10">
                    <div className="space-y-6 flex flex-col justify-center">
                      <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {activeTab.heading[locale]}
                      </h3>
                      <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                        {activeTab.description[locale]}
                      </p>
                      <div className="space-y-4 pt-4">
                        {activeTab.bullets.map((bullet) => (
                          <div
                            key={bullet.en}
                            className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all cursor-default group/item"
                          >
                            <span className="shrink-0 mt-0.5 text-indigo-400 group-hover/item:text-indigo-300 group-hover/item:scale-110 transition-transform">
                              <Check className="w-5 h-5" />
                            </span>
                            <span className="text-neutral-300 group-hover/item:text-white leading-relaxed transition-colors">
                              {bullet[locale]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative w-full min-h-[250px] lg:min-h-[350px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10">
                      <div className="w-full h-full relative">
                        <Image
                          src={activeTab.image}
                          alt={activeTab.heading[locale]}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b23]/80 via-transparent to-transparent opacity-80" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
