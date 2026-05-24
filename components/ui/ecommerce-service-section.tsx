"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { localePath } from "@/lib/i18n/url"

interface EcommerceServiceSectionProps {
  isRTL?: boolean
  locale?: string
  t?: any
}

const content = {
  en: {
    // Hero
    badge: "E-Commerce Development Services",
    heroTitle: "Build Your",
    heroHighlight: "Online Empire",
    heroDescription: "We design and develop powerful e-commerce platforms that transform your business into a 24/7 sales machine. From custom online stores to enterprise marketplaces, we deliver solutions that drive revenue, enhance customer experience, and scale with your growth.",

    // Main Features
    featuresTitle: "Complete E-Commerce Solutions",
    featuresSubtitle: "Everything You Need to Sell Online Successfully",
    features: [
      {
        title: "Custom Online Store Development",
        description: "Fully customized e-commerce websites built with modern technologies like Next.js, React, and headless CMS."
      },
      {
        title: "Secure Payment Gateway Integration",
        description: "Seamless integration with Stripe, PayPal, Apple Pay, Mada, STC Pay, and Tabby for MENA markets."
      },
      {
        title: "Inventory & Order Management",
        description: "Real-time inventory tracking, automated stock alerts, and streamlined order processing systems."
      },
      {
        title: "Shipping & Logistics Integration",
        description: "Connect with Aramex, DHL, FedEx, and local providers with automated tracking and notifications."
      },
      {
        title: "Analytics & Business Intelligence",
        description: "Comprehensive dashboards with real-time sales analytics and conversion tracking insights."
      },
      {
        title: "Mobile Commerce (M-Commerce)",
        description: "Mobile-first responsive design and PWA that deliver native app-like shopping experiences."
      },
      {
        title: "E-Commerce SEO Optimization",
        description: "Technical SEO, schema markup, and content strategies to rank higher on Google Shopping."
      },
      {
        title: "Multi-Language & Multi-Currency",
        description: "Full Arabic and English support with RTL layouts and localized checkout experiences."
      },
      {
        title: "Security & PCI Compliance",
        description: "Enterprise-grade security with SSL encryption, PCI DSS compliance, and fraud detection."
      }
    ],

    // Process
    processTitle: "Our E-Commerce Development Process",
    processSubtitle: "From Concept to Launch in 4 Strategic Phases",
    process: [
      {
        step: "01",
        title: "Discovery & Strategy",
        description: "We analyze your business model, target audience, competitors, and goals to create a comprehensive e-commerce strategy and technical roadmap."
      },
      {
        step: "02",
        title: "Design & UX",
        description: "Our designers create stunning, conversion-optimized interfaces with intuitive navigation, compelling product displays, and seamless checkout flows."
      },
      {
        step: "03",
        title: "Development & Integration",
        description: "Expert developers build your store with clean code, integrate payment gateways, shipping providers, and third-party tools your business needs."
      },
      {
        step: "04",
        title: "Launch & Growth",
        description: "We handle deployment, performance optimization, and provide ongoing support, marketing integration, and scaling strategies for long-term success."
      }
    ],

    // Platforms
    platformsTitle: "Platforms We Work With",
    platforms: ["Shopify", "WooCommerce", "Magento", "Custom Solutions", "Salla", "Zid"],

    // CTA
    ctaTitle: "Ready to Launch Your Online Store?",
    ctaDescription: "Let's discuss your e-commerce project and create a store that converts visitors into loyal customers.",
    ctaButton: "Get Free Consultation"
  },
  ar: {
    // Hero
    badge: "خدمات تطوير التجارة الإلكترونية",
    heroTitle: "ابنِ",
    heroHighlight: "إمبراطوريتك الرقمية",
    heroDescription: "نصمم ونطور منصات تجارة إلكترونية قوية تحول عملك إلى آلة مبيعات تعمل على مدار الساعة. من المتاجر المخصصة إلى الأسواق الإلكترونية للمؤسسات، نقدم حلولاً تزيد الإيرادات وتحسن تجربة العملاء وتنمو مع توسعك.",

    // Main Features
    featuresTitle: "حلول تجارة إلكترونية متكاملة",
    featuresSubtitle: "كل ما تحتاجه للبيع عبر الإنترنت بنجاح",
    features: [
      {
        title: "تطوير متاجر إلكترونية مخصصة",
        description: "مواقع تجارة إلكترونية مخصصة بالكامل مبنية بتقنيات حديثة مثل Next.js و React و Headless CMS."
      },
      {
        title: "تكامل بوابات الدفع الآمنة",
        description: "تكامل سلس مع Stripe و PayPal و Apple Pay ومدى و STC Pay و تابي لأسواق الشرق الأوسط."
      },
      {
        title: "إدارة المخزون والطلبات",
        description: "تتبع المخزون في الوقت الفعلي، تنبيهات المخزون التلقائية، وأنظمة معالجة الطلبات المبسطة."
      },
      {
        title: "تكامل الشحن واللوجستيات",
        description: "الاتصال بأرامكس و DHL و FedEx والمزودين المحليين مع التتبع والإشعارات التلقائية."
      },
      {
        title: "التحليلات وذكاء الأعمال",
        description: "لوحات معلومات شاملة مع تحليلات المبيعات في الوقت الفعلي ورؤى تتبع التحويلات."
      },
      {
        title: "التجارة عبر الجوال (M-Commerce)",
        description: "تصميم متجاوب يركز على الجوال وتطبيقات PWA تقدم تجارب تسوق شبيهة بالتطبيقات."
      },
      {
        title: "تحسين SEO للتجارة الإلكترونية",
        description: "SEO تقني، ترميز Schema، واستراتيجيات المحتوى للترتيب أعلى في Google Shopping."
      },
      {
        title: "متعدد اللغات والعملات",
        description: "دعم كامل للعربية والإنجليزية مع تخطيطات RTL وتجارب دفع محلية."
      },
      {
        title: "الأمان والامتثال لـ PCI",
        description: "أمان على مستوى المؤسسات مع تشفير SSL، امتثال PCI DSS، وكشف الاحتيال."
      }
    ],

    // Process
    processTitle: "عملية تطوير التجارة الإلكترونية لدينا",
    processSubtitle: "من الفكرة إلى الإطلاق في 4 مراحل استراتيجية",
    process: [
      {
        step: "٠١",
        title: "الاكتشاف والاستراتيجية",
        description: "نحلل نموذج عملك والجمهور المستهدف والمنافسين والأهداف لإنشاء استراتيجية تجارة إلكترونية شاملة وخارطة طريق تقنية."
      },
      {
        step: "٠٢",
        title: "التصميم وتجربة المستخدم",
        description: "يصمم مصممونا واجهات مذهلة محسنة للتحويل مع تنقل بديهي وعروض منتجات جذابة وتدفقات دفع سلسة."
      },
      {
        step: "٠٣",
        title: "التطوير والتكامل",
        description: "يبني المطورون الخبراء متجرك بكود نظيف، ويدمجون بوابات الدفع ومزودي الشحن والأدوات التي يحتاجها عملك."
      },
      {
        step: "٠٤",
        title: "الإطلاق والنمو",
        description: "نتولى النشر وتحسين الأداء ونقدم دعماً مستمراً وتكاملاً تسويقياً واستراتيجيات توسع للنجاح طويل المدى."
      }
    ],

    // Platforms
    platformsTitle: "المنصات التي نعمل معها",
    platforms: ["Shopify", "WooCommerce", "Magento", "حلول مخصصة", "سلة", "زد"],

    // CTA
    ctaTitle: "هل أنت مستعد لإطلاق متجرك الإلكتروني؟",
    ctaDescription: "دعنا نناقش مشروع التجارة الإلكترونية الخاص بك وننشئ متجراً يحول الزوار إلى عملاء أوفياء.",
    ctaButton: "احصل على استشارة مجانية"
  },
  tr: {
    // Hero
    badge: "E-Ticaret Geliştirme Hizmetleri",
    heroTitle: "Kendi Çevrimiçi",
    heroHighlight: "İmparatorluğunuzu Kurun",
    heroDescription: "İşletmenizi 7/24 satış yapan bir makineye dönüştüren güçlü e-ticaret platformları tasarlıyor ve geliştiriyoruz. Özel çevrimiçi mağazalardan kurumsal pazaryerlerine kadar, gelir artıran, müşteri deneyimini iyileştiren ve büyümenizle birlikte ölçeklenen çözümler sunuyoruz.",

    // Main Features
    featuresTitle: "Eksiksiz E-Ticaret Çözümleri",
    featuresSubtitle: "Başarılı Bir Şekilde Online Satış Yapmak İçin İhtiyacınız Olan Her Şey",
    features: [
      {
        title: "Özel Online Mağaza Geliştirme",
        description: "Next.js, React ve headless CMS gibi modern teknolojilerle oluşturulmuş, tamamen özelleştirilmiş e-ticaret web siteleri."
      },
      {
        title: "Güvenli Ödeme Geçidi Entegrasyonu",
        description: "Stripe, PayPal, Apple Pay ve yerel ödeme yöntemleri ile kusursuz entegrasyon."
      },
      {
        title: "Envanter ve Sipariş Yönetimi",
        description: "Gerçek zamanlı envanter takibi, otomatik stok uyarıları ve optimize edilmiş sipariş işleme sistemleri."
      },
      {
        title: "Kargo ve Lojistik Entegrasyonu",
        description: "Otomatik takip ve bildirimlerle kargo sağlayıcılarına bağlantı."
      },
      {
        title: "Analitik ve İş Zekası",
        description: "Gerçek zamanlı satış analitiği ve dönüşüm takibi öngörüleri sunan kapsamlı panolar."
      },
      {
        title: "Mobil Ticaret (M-Ticaret)",
        description: "Yerel uygulama benzeri alışveriş deneyimleri sunan mobil öncelikli duyarlı tasarım ve PWA."
      },
      {
        title: "E-Ticaret SEO Optimizasyonu",
        description: "Google Alışveriş'te daha üst sıralarda yer almak için teknik SEO, şema işaretlemesi ve içerik stratejileri."
      },
      {
        title: "Çoklu Dil ve Çoklu Para Birimi",
        description: "Yerelleştirilmiş ödeme deneyimleri ile tam dil ve para birimi desteği."
      },
      {
        title: "Güvenlik ve PCI Uyumluluğu",
        description: "SSL şifreleme, PCI DSS uyumluluğu ve dolandırıcılık tespiti ile kurumsal düzeyde güvenlik."
      }
    ],

    // Process
    processTitle: "E-Ticaret Geliştirme Sürecimiz",
    processSubtitle: "Konseptten Yayına 4 Stratejik Aşamada",
    process: [
      {
        step: "01",
        title: "Keşif ve Strateji",
        description: "Kapsamlı bir e-ticaret stratejisi ve teknik yol haritası oluşturmak için iş modelinizi, hedef kitlenizi ve rakiplerinizi analiz ediyoruz."
      },
      {
        step: "02",
        title: "Tasarım ve Kullanıcı Deneyimi",
        description: "Tasarımcılarımız, sezgisel navigasyon ve kusursuz ödeme akışları ile dönüşüm odaklı arayüzler oluşturur."
      },
      {
        step: "03",
        title: "Geliştirme ve Entegrasyon",
        description: "Uzman geliştiricilerimiz mağazanızı temiz kodla oluşturur, ödeme geçitlerini ve kargo sağlayıcılarını entegre eder."
      },
      {
        step: "04",
        title: "Yayın ve Büyüme",
        description: "Yayına alma, performans optimizasyonu ve uzun vadeli başarı için pazarlama entegrasyonu ve ölçeklendirme stratejileri sağlıyoruz."
      }
    ],

    // Platforms
    platformsTitle: "Çalıştığımız Platformlar",
    platforms: ["Shopify", "WooCommerce", "Magento", "Özel Çözümler", "Salla", "Zid"],

    // CTA
    ctaTitle: "Online Mağazanızı Başlatmaya Hazır mısınız?",
    ctaDescription: "E-ticaret projenizi görüşelim ve ziyaretçileri sadık müşterilere dönüştüren bir mağaza oluşturalım.",
    ctaButton: "Ücretsiz Danışmanlık Alın"
  }
}

function AnimatedSection({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface GlowingCardProps {
  title: string
  description: string
  area?: string
}

const GlowingCard = ({ title, description, area }: GlowingCardProps) => {
  return (
    <li className={cn("min-h-[12rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-200 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border-[0.75px] border-slate-100 bg-lavender p-5 sm:p-6 shadow-sm">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl leading-tight font-semibold tracking-tight text-slate-900">
                {title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export function EcommerceServiceSection({ isRTL = false, locale = "en", t: overrideT }: EcommerceServiceSectionProps) {
  const staticT = content[locale as keyof typeof content] || (isRTL ? content.ar : content.en)
  const t = overrideT || staticT
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  const heroDescriptionVal = t?.heroDescription || staticT.heroDescription
  const featuresTitleVal = t?.featuresTitle || staticT.featuresTitle
  const featuresSubtitleVal = t?.featuresSubtitle || staticT.featuresSubtitle
  const featuresVal = t?.features || staticT.features
  const processTitleVal = t?.processTitle || staticT.processTitle
  const processSubtitleVal = t?.processSubtitle || staticT.processSubtitle
  const processVal = t?.process || staticT.process
  const platformsTitleVal = t?.platformsTitle || staticT.platformsTitle
  const platformsVal = t?.platforms || staticT.platforms
  const ctaTitleVal = t?.ctaTitle || staticT.ctaTitle
  const ctaDescriptionVal = t?.ctaDescription || staticT.ctaDescription
  const ctaButtonVal = t?.ctaButton || staticT.ctaButton

  return (
    <section
      className="w-full bg-lavender text-slate-900"
      dir={isRTL ? "rtl" : "ltr"}
      aria-labelledby="ecommerce-service-title"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-lavender to-lavender py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-2 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 mb-6">
              {t.badge}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {/* Page-level h1 for /ecommerce-solutions. Other section
                titles in the parent page (in the .map() loop) are h2. */}
            <h1 id="ecommerce-service-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4">
              {t.heroTitle}{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                {t.heroHighlight}
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {t.heroDescription}
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Features Section with Glowing Cards */}
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-lavender">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {featuresTitleVal}
              </h2>
              <p className="text-lg sm:text-xl text-slate-600">
                {featuresSubtitleVal}
              </p>
            </AnimatedSection>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {featuresVal.map((feature: any, index: number) => (
              <GlowingCard
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </ul>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                {processTitleVal}
              </h2>
              <p className="text-lg sm:text-xl text-slate-400">
                {processSubtitleVal}
              </p>
            </AnimatedSection>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processVal.map((step: any, index: number) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="relative">
                  <div className="text-6xl sm:text-7xl font-black text-violet-500/20 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Platforms Section */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 bg-lavender">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8">
              {platformsTitleVal}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {platformsVal.map((platform: string, index: number) => (
                <span
                  key={index}
                  className="px-6 py-3 bg-lavender rounded-full text-slate-700 font-medium border border-slate-200 hover:border-violet-300 hover:text-violet-600 transition-colors"
                >
                  {platform}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {ctaTitleVal}
            </h2>
            <p className="text-lg sm:text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
              {ctaDescriptionVal}
            </p>
            <a
              href={localePath(locale, '/contact')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-lavender text-violet-600 font-bold text-lg rounded-full hover:bg-lavender transition-colors shadow-xl hover:shadow-2xl"
            >
              {ctaButtonVal}
              <Arrow className="w-5 h-5" />
            </a>
          </AnimatedSection>
        </div>
      </div>

      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": isRTL ? "تطوير التجارة الإلكترونية والمتاجر الإلكترونية" : "E-Commerce Development & Online Store Solutions",
            "name": isRTL ? "خدمات التجارة الإلكترونية - كلاود توبيا" : "E-Commerce Solutions - CloudTopia",
            "description": heroDescriptionVal,
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
              { "@type": "Country", "name": "Oman" },
              { "@type": "Country", "name": "Egypt" },
              { "@type": "Country", "name": "Jordan" }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": isRTL ? "خدمات تطوير التجارة الإلكترونية" : "E-Commerce Development Services",
              "itemListElement": featuresVal.map((feature: any, index: number) => ({
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
              "audienceType": "Retailers, Wholesalers, D2C Brands, B2B Companies, Startups, SMEs, Enterprises"
            },
            "potentialAction": {
              "@type": "ContactAction",
              "target": "https://cloudtopia.net/contact"
            }
          })
        }}
      />
    </section>
  )
}

export default EcommerceServiceSection
