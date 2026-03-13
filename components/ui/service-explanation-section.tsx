"use client"

import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import TextBlockAnimation from "@/components/ui/text-block-animation"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface ServiceExplanationProps {
  isRTL?: boolean
  locale?: string
}

const content = {
  en: {
    heroTitle: "Your Website Should",
    heroHighlight: "Convert.",
    scrollHint: "Discover Our Approach",
    pitchTitle: "Professional Web Design That Drives Results",
    pitchDescription: "We craft high-converting websites that transform visitors into customers. Our expert team combines stunning visual design with strategic user experience to build websites that not only look exceptional but deliver measurable business growth for companies across the Middle East.",
    quote: "A great website isn't just about aesthetics — it's your most powerful sales tool working 24/7.",
    features: [
      {
        title: "High-Performance Web Development",
        description: "Our websites achieve 90+ Google PageSpeed scores through optimized code, modern frameworks like Next.js and React, and advanced caching strategies that boost conversions and search rankings."
      },
      {
        title: "Responsive Mobile-First Design",
        description: "With over 60% of web traffic coming from mobile devices, we design mobile-first responsive websites that deliver flawless experiences on smartphones, tablets, and desktops."
      },
      {
        title: "Search Engine Optimization (SEO)",
        description: "Every website is built with technical SEO best practices: semantic HTML5, structured data markup, optimized meta tags, fast load times, and clean URL structures to help you rank higher on Google."
      },
      {
        title: "Enterprise-Grade Security",
        description: "We implement SSL/TLS encryption, secure authentication, DDoS protection, and regular security audits to protect your business and customer data from cyber threats."
      },
      {
        title: "Arabic & English Bilingual Websites",
        description: "Specialized in RTL (right-to-left) web design with full Arabic and English support, helping businesses connect with audiences across Saudi Arabia, UAE, Qatar, and the entire MENA region."
      },
      {
        title: "Dedicated Support & Maintenance",
        description: "Our partnership doesn't end at launch. We provide ongoing website maintenance, performance monitoring, content updates, and technical support to ensure your site stays secure and up-to-date."
      }
    ],
    ctaText: "Start Your Project Today"
  },
  ar: {
    heroTitle: "موقعك يجب أن",
    heroHighlight: "يُحوّل الزوار.",
    scrollHint: "اكتشف منهجيتنا",
    pitchTitle: "تصميم مواقع احترافي يحقق نتائج ملموسة",
    pitchDescription: "نصمم مواقع إلكترونية عالية التحويل تحوّل الزوار إلى عملاء. يجمع فريقنا المتخصص بين التصميم البصري المذهل وتجربة المستخدم الاستراتيجية لبناء مواقع لا تبدو استثنائية فحسب، بل تحقق نمواً تجارياً قابلاً للقياس للشركات في جميع أنحاء الشرق الأوسط.",
    quote: "الموقع الرائع ليس مجرد جماليات — إنه أقوى أداة مبيعات لديك تعمل على مدار الساعة.",
    features: [
      {
        title: "تطوير مواقع عالية الأداء",
        description: "تحقق مواقعنا درجات +90 في Google PageSpeed من خلال كود محسّن وأطر عمل حديثة مثل Next.js و React واستراتيجيات تخزين مؤقت متقدمة تعزز التحويلات وترتيب البحث."
      },
      {
        title: "تصميم متجاوب للجوال أولاً",
        description: "مع أكثر من 60% من حركة الويب قادمة من الأجهزة المحمولة، نصمم مواقع متجاوبة تقدم تجارب مثالية على الهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر."
      },
      {
        title: "تحسين محركات البحث (SEO)",
        description: "كل موقع مبني وفق أفضل ممارسات SEO التقنية: HTML5 دلالي، بيانات منظمة، وسوم ميتا محسّنة، أوقات تحميل سريعة، وهياكل URL نظيفة لمساعدتك على الترتيب أعلى في جوجل."
      },
      {
        title: "أمان على مستوى المؤسسات",
        description: "نطبق تشفير SSL/TLS، مصادقة آمنة، حماية DDoS، وفحوصات أمنية دورية لحماية عملك وبيانات عملائك من التهديدات الإلكترونية."
      },
      {
        title: "مواقع ثنائية اللغة عربي وإنجليزي",
        description: "متخصصون في تصميم مواقع RTL (من اليمين لليسار) مع دعم كامل للعربية والإنجليزية، لمساعدة الشركات على التواصل مع الجماهير في السعودية والإمارات وقطر ومنطقة الشرق الأوسط بأكملها."
      },
      {
        title: "دعم وصيانة مخصصة",
        description: "شراكتنا لا تنتهي عند الإطلاق. نقدم صيانة مستمرة للموقع، مراقبة الأداء، تحديثات المحتوى، والدعم التقني لضمان بقاء موقعك آمناً ومحدثاً."
      }
    ],
    ctaText: "ابدأ مشروعك اليوم"
  },
  tr: {
    heroTitle: "Web Siteniz",
    heroHighlight: "Dönüştürmeli.",
    scrollHint: "Yaklaşımımızı Keşfedin",
    pitchTitle: "Sonuç Veren Profesyonel Web Tasarımı",
    pitchDescription: "Ziyaretçileri müşteriye dönüştüren, yüksek dönüşümlü web siteleri hazırlıyoruz. Uzman ekibimiz, sadece olağanüstü görünmekle kalmayan, aynı zamanda Orta Doğu'daki şirketler için ölçülebilir iş büyümesi sağlayan web siteleri inşa etmek için çarpıcı görsel tasarımı stratejik kullanıcı deneyimiyle birleştiriyor.",
    quote: "Harika bir web sitesi sadece estetikten ibaret değildir — 7/24 çalışan en güçlü satış aracınızdır.",
    features: [
      {
        title: "Yüksek Performanslı Web Geliştirme",
        description: "Web sitelerimiz; optimize edilmiş kod, Next.js ve React gibi modern framework'ler ve dönüşümleri ve arama sıralamalarını artıran gelişmiş önbellekleme stratejileri sayesinde 90+ Google PageSpeed puanı elde eder."
      },
      {
        title: "Mobil Öncelikli Duyarlı Tasarım",
        description: "Web trafiğinin %60'ından fazlasının mobil cihazlardan gelmesiyle, akıllı telefonlarda, tabletlerde ve masaüstü bilgisayarlarda kusursuz deneyimler sunan mobil öncelikli duyarlı web siteleri tasarlıyoruz."
      },
      {
        title: "Arama Motoru Optimizasyonu (SEO)",
        description: "Her web sitesi teknik SEO en iyi uygulamalarıyla oluşturulur: semantik HTML5, yapılandırılmış veri işaretlemesi, optimize edilmiş meta etiketler, hızlı yükleme süreleri ve Google'da daha üst sıralarda yer almanıza yardımcı olacak temiz URL yapıları."
      },
      {
        title: "Kurumsal Düzeyde Güvenlik",
        description: "İşletmenizi ve müşteri verilerinizi siber tehditlerden korumak için SSL/TLS şifreleme, güvenli kimlik doğrulama, DDoS koruması ve düzenli güvenlik denetimleri uyguluyoruz."
      },
      {
        title: "Çok Dilli Web Siteleri",
        description: "Türkiye, Suudi Arabistan, BAE, Katar ve tüm Orta Doğu bölgesindeki kitlelerle bağlantı kurmanıza yardımcı olan, tam dil desteği ve modern tasarım konusunda uzmanlaşmış bir ekibimiz var."
      },
      {
        title: "Özel Destek ve Bakım",
        description: "Ortaklığımız yayında sona ermez. Sitenizin güvenli ve güncel kalmasını sağlamak için sürekli web sitesi bakımı, performans izleme, içerik güncellemeleri ve teknik destek sağlıyoruz."
      }
    ],
    ctaText: "Projenize Bugün Başlayın"
  }
}

interface GlowingCardProps {
  title: string
  description: string
}

const GlowingCard = ({ title, description }: GlowingCardProps) => {
  return (
    <li className="min-h-[10rem] list-none">
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-zinc-200 dark:border-zinc-700 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-xl border-[0.75px] border-zinc-100 dark:border-zinc-800 bg-lavender dark:bg-zinc-900 p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="relative flex flex-1 flex-col gap-2">
            <h4 className="text-lg sm:text-lg font-bold leading-tight text-zinc-900 dark:text-zinc-50">
              {title}
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export function ServiceExplanationSection({ isRTL = false, locale = "en" }: ServiceExplanationProps) {
  const t = locale === 'ar' ? content.ar : (locale === 'tr' ? content.tr : content.en)

  return (
    <section
      className="w-full bg-lavender text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 flex flex-col"
      dir={isRTL ? "rtl" : "ltr"}
      aria-labelledby="service-title"
    >
      {/* HERO SECTION: The Hook */}
      <div className="min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center relative px-4 sm:px-6 pt-8 sm:pt-12 pb-12 sm:pb-16">
        <div className="max-w-4xl w-full text-center">
          <TextBlockAnimation
            blockColor="#2563eb"
            animateOnScroll={false}
            delay={0.2}
            duration={0.8}
          >
            <h2 id="service-title" className="text-3xl sm:text-3xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight">
              {t.heroTitle}
            </h2>
            <span className="inline-block bg-primary-600 text-white px-3 sm:px-4 pb-1 sm:pb-2 pt-1 rounded-md mt-2 sm:mt-4 text-3xl sm:text-3xl md:text-5xl lg:text-7xl font-black">
              {t.heroHighlight}
            </span>
          </TextBlockAnimation>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-12 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {t.scrollHint}
          </span>
          <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500 dark:text-zinc-400 animate-bounce" />
        </div>
      </div>

      {/* THE PITCH */}
      <div className="min-h-[auto] sm:min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-16 md:py-24 bg-lavender/80 dark:bg-zinc-900/60">
        <div className="max-w-3xl w-full space-y-8 sm:space-y-12 md:space-y-16">
          <TextBlockAnimation blockColor="#10b981" duration={0.7}>
            <h3 className="text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {t.pitchTitle}
            </h3>
          </TextBlockAnimation>

          <TextBlockAnimation blockColor="#f59e0b" stagger={0.03}>
            <p className="text-lg sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
              {t.pitchDescription}
            </p>
          </TextBlockAnimation>

          <div className={cn(
            "border-primary-500 dark:border-primary-400",
            isRTL ? "pr-4 sm:pr-6 border-r-2" : "pl-4 sm:pl-6 border-l-2"
          )}>
            <TextBlockAnimation blockColor="#ffffff" duration={0.6}>
              <p className="text-sm sm:text-base md:text-lg italic text-zinc-500 dark:text-zinc-400">
                "{t.quote}"
              </p>
            </TextBlockAnimation>
          </div>
        </div>
      </div>

      {/* FEATURES GRID with Glowing Cards */}
      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-lavender dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <TextBlockAnimation blockColor="#2563eb" duration={0.6}>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                {isRTL ? "خدمات تصميم المواقع لدينا" : "Our Web Design Services"}
              </h3>
            </TextBlockAnimation>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {t.features.map((feature: any, index: number) => (
              <GlowingCard
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </ul>
        </div>
      </div>

      {/* FOOTER: Call to Action */}
      <footer className="h-[30vh] sm:h-[35vh] md:h-[40vh] flex items-center justify-center px-4 border-t border-slate-200 dark:border-zinc-800 bg-lavender dark:bg-zinc-950">
        <TextBlockAnimation blockColor="#ef4444" duration={0.8}>
          <a
            href={`/${locale}/contact`}
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer text-center"
          >
            {t.ctaText}
          </a>
        </TextBlockAnimation>
      </footer>

      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": isRTL ? "تصميم وتطوير المواقع الإلكترونية" : "Professional Web Design & Development Services",
            "name": isRTL ? "خدمات تصميم المواقع - كلاود توبيا" : "Web Design Services - CloudTopia",
            "description": t.pitchDescription,
            "provider": {
              "@type": "Organization",
              "name": "CloudTopia",
              "url": "https://cloudtopia.net",
              "logo": "https://cloudtopia.net/images/CloudTopia.svg",
              "sameAs": [
                "https://x.com/thecloudtopia",
                "https://instagram.com/thecloudtopia",
                "https://github.com/Shahoom"
              ]
            },
            "areaServed": [
              { "@type": "Country", "name": "Saudi Arabia" },
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "Country", "name": "Qatar" },
              { "@type": "Country", "name": "Kuwait" },
              { "@type": "Country", "name": "Bahrain" },
              { "@type": "Country", "name": "Oman" }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": isRTL ? "خدمات تصميم وتطوير المواقع" : "Web Design & Development Services",
              "itemListElement": t.features.map((feature: any, index: number) => ({
                "@type": "Offer",
                "position": index + 1,
                "itemOffered": {
                  "@type": "Service",
                  "name": feature.title,
                  "description": feature.description
                }
              }))
            },
            "audience": {
              "@type": "BusinessAudience",
              "audienceType": "Small and Medium Businesses, Enterprises, Startups"
            }
          })
        }}
      />
    </section>
  )
}

export default ServiceExplanationSection
