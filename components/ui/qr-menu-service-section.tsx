"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface QRMenuServiceSectionProps {
  isRTL?: boolean
  locale?: string
}

const content = {
  en: {
    // Hero
    badge: "QR Menu Solutions for Restaurants",
    heroTitle: "Revolutionize Your",
    heroHighlight: "Restaurant Menu",
    heroDescription: "Transform your traditional paper menus into dynamic, contactless digital experiences. Our QR code menu systems help restaurants in Saudi Arabia, UAE, and across the Middle East reduce printing costs by up to 90%, update menus in real-time, and provide customers with an interactive, multilingual dining experience.",

    // Main Features
    featuresTitle: "Complete QR Menu System Features",
    featuresSubtitle: "Everything Your Restaurant Needs to Go Digital",
    features: [
      {
        title: "Instant QR Code Generation",
        description: "Generate unique, branded QR codes for each table, takeaway counter, or delivery package. Customers simply scan with their smartphone camera - no app download required."
      },
      {
        title: "Real-Time Menu Updates",
        description: "Change prices, add seasonal specials, mark items as sold out, or update descriptions instantly. No more reprinting costs or outdated menus on tables."
      },
      {
        title: "Multilingual Support",
        description: "Full Arabic and English menus with automatic language detection. Perfect for serving diverse customers across Saudi Arabia, UAE, Qatar, and international tourists."
      },
      {
        title: "High-Quality Food Photography",
        description: "Display mouth-watering images and videos for each dish. Visual menus increase average order value by up to 30% compared to text-only menus."
      },
      {
        title: "Allergen & Dietary Information",
        description: "Clearly display allergens, calories, vegetarian/vegan options, and halal certifications. Help customers make informed choices and reduce kitchen inquiries."
      },
      {
        title: "Mobile-First Responsive Design",
        description: "Beautiful menus optimized for all smartphones and tablets. Fast loading times even on slower connections ensure a smooth customer experience."
      },
      {
        title: "Analytics & Insights Dashboard",
        description: "Track which dishes are viewed most, peak ordering times, and customer preferences. Make data-driven decisions to optimize your menu and pricing."
      },
      {
        title: "Seamless POS Integration",
        description: "Connect with popular restaurant POS systems like Foodics, POSRocket, and Square. Sync menu items, prices, and availability automatically."
      },
      {
        title: "Custom Branding & Themes",
        description: "Match your digital menu to your restaurant's brand identity with custom colors, logos, fonts, and layouts. Create a cohesive dining experience."
      }
    ],

    // Benefits
    benefitsTitle: "Why Restaurants Choose Digital QR Menus",
    benefitsSubtitle: "Measurable Impact on Your Business",
    benefits: [
      { metric: "90%", label: "Reduction in Printing Costs", description: "Eliminate recurring menu printing expenses forever" },
      { metric: "30%", label: "Increase in Average Order", description: "Visual menus with photos boost upselling" },
      { metric: "50%", label: "Faster Table Turnover", description: "Customers browse and decide quicker" },
      { metric: "100%", label: "Contactless & Hygienic", description: "Safe dining experience post-pandemic" },
    ],

    // Process
    processTitle: "How It Works",
    processSubtitle: "Get Your Digital Menu Live in 3 Simple Steps",
    process: [
      {
        step: "01",
        title: "Share Your Menu",
        description: "Send us your current menu in any format - PDF, photos, or even your existing website. We handle the digital transformation."
      },
      {
        step: "02",
        title: "We Design & Build",
        description: "Our team creates a beautiful, mobile-optimized digital menu with your branding, photos, and all item details in Arabic and English."
      },
      {
        step: "03",
        title: "Scan & Serve",
        description: "Receive your custom QR codes for tables, tent cards, and marketing materials. Your customers can start scanning immediately."
      }
    ],

    // Use Cases
    useCasesTitle: "Perfect For Every Food Business",
    useCases: ["Fine Dining Restaurants", "Casual Cafes & Bistros", "Fast Food & QSR", "Food Courts & Malls", "Hotel Room Service", "Cloud Kitchens", "Food Trucks", "Catering Services"],

    // CTA
    ctaTitle: "Ready to Digitize Your Menu?",
    ctaDescription: "Join hundreds of restaurants across the GCC who have transformed their dining experience with our QR menu solutions.",
    ctaButton: "Get Free Consultation"
  },
  ar: {
    // Hero
    badge: "حلول قوائم QR للمطاعم",
    heroTitle: "ثورة في",
    heroHighlight: "قائمة مطعمك",
    heroDescription: "حوّل قوائمك الورقية التقليدية إلى تجارب رقمية تفاعلية بدون تلامس. تساعد أنظمة قوائم QR الخاصة بنا المطاعم في السعودية والإمارات وجميع أنحاء الشرق الأوسط على تقليل تكاليف الطباعة بنسبة تصل إلى 90%، وتحديث القوائم في الوقت الفعلي، وتوفير تجربة طعام تفاعلية متعددة اللغات للعملاء.",

    // Main Features
    featuresTitle: "ميزات نظام قائمة QR الكامل",
    featuresSubtitle: "كل ما يحتاجه مطعمك للتحول الرقمي",
    features: [
      {
        title: "إنشاء رمز QR فوري",
        description: "أنشئ رموز QR فريدة ومميزة لكل طاولة أو كاونتر أو طرد توصيل. يمسح العملاء ببساطة بكاميرا هواتفهم - لا حاجة لتحميل تطبيق."
      },
      {
        title: "تحديثات القائمة في الوقت الفعلي",
        description: "غيّر الأسعار، أضف عروضاً موسمية، حدد الأصناف المنتهية، أو حدّث الأوصاف فوراً. لا مزيد من تكاليف إعادة الطباعة أو القوائم القديمة."
      },
      {
        title: "دعم متعدد اللغات",
        description: "قوائم كاملة بالعربية والإنجليزية مع اكتشاف اللغة تلقائياً. مثالي لخدمة العملاء المتنوعين في السعودية والإمارات وقطر والسياح الدوليين."
      },
      {
        title: "تصوير طعام عالي الجودة",
        description: "اعرض صوراً وفيديوهات شهية لكل طبق. القوائم المرئية تزيد متوسط قيمة الطلب بنسبة تصل إلى 30% مقارنة بالقوائم النصية."
      },
      {
        title: "معلومات الحساسية والنظام الغذائي",
        description: "اعرض بوضوح مسببات الحساسية والسعرات الحرارية والخيارات النباتية وشهادات الحلال. ساعد العملاء على اتخاذ قرارات مستنيرة."
      },
      {
        title: "تصميم متجاوب للجوال أولاً",
        description: "قوائم جميلة محسّنة لجميع الهواتف الذكية والأجهزة اللوحية. أوقات تحميل سريعة حتى على الاتصالات البطيئة."
      },
      {
        title: "لوحة تحليلات ورؤى",
        description: "تتبع الأطباق الأكثر مشاهدة وأوقات الذروة وتفضيلات العملاء. اتخذ قرارات مبنية على البيانات لتحسين قائمتك وأسعارك."
      },
      {
        title: "تكامل سلس مع نقاط البيع",
        description: "اتصل بأنظمة نقاط البيع الشهيرة مثل Foodics و POSRocket و Square. مزامنة الأصناف والأسعار والتوفر تلقائياً."
      },
      {
        title: "علامة تجارية وثيمات مخصصة",
        description: "طابق قائمتك الرقمية مع هوية مطعمك بألوان وشعارات وخطوط وتخطيطات مخصصة. اصنع تجربة طعام متكاملة."
      }
    ],

    // Benefits
    benefitsTitle: "لماذا تختار المطاعم قوائم QR الرقمية",
    benefitsSubtitle: "تأثير قابل للقياس على عملك",
    benefits: [
      { metric: "٩٠٪", label: "تخفيض تكاليف الطباعة", description: "تخلص من نفقات طباعة القوائم المتكررة للأبد" },
      { metric: "٣٠٪", label: "زيادة في متوسط الطلب", description: "القوائم المرئية بالصور تعزز البيع الإضافي" },
      { metric: "٥٠٪", label: "دوران طاولات أسرع", description: "العملاء يتصفحون ويقررون بشكل أسرع" },
      { metric: "١٠٠٪", label: "بدون تلامس وصحي", description: "تجربة طعام آمنة بعد الجائحة" },
    ],

    // Process
    processTitle: "كيف يعمل",
    processSubtitle: "احصل على قائمتك الرقمية في 3 خطوات بسيطة",
    process: [
      {
        step: "٠١",
        title: "شارك قائمتك",
        description: "أرسل لنا قائمتك الحالية بأي تنسيق - PDF أو صور أو حتى موقعك الحالي. نحن نتولى التحول الرقمي."
      },
      {
        step: "٠٢",
        title: "نصمم ونبني",
        description: "يصمم فريقنا قائمة رقمية جميلة ومحسّنة للجوال بعلامتك التجارية وصورك وجميع تفاصيل الأصناف بالعربية والإنجليزية."
      },
      {
        step: "٠٣",
        title: "امسح وقدّم",
        description: "استلم رموز QR المخصصة للطاولات وحوامل البطاقات ومواد التسويق. يمكن لعملائك البدء بالمسح فوراً."
      }
    ],

    // Use Cases
    useCasesTitle: "مثالي لكل نشاط غذائي",
    useCases: ["مطاعم الأكل الفاخر", "المقاهي والبيسترو", "الوجبات السريعة", "ساحات الطعام والمولات", "خدمة الغرف الفندقية", "المطابخ السحابية", "عربات الطعام", "خدمات التموين"],

    // CTA
    ctaTitle: "هل أنت مستعد لرقمنة قائمتك؟",
    ctaDescription: "انضم إلى مئات المطاعم في دول الخليج الذين حوّلوا تجربة طعامهم مع حلول قوائم QR الخاصة بنا.",
    ctaButton: "احصل على استشارة مجانية"
  },
  tr: {
    // Hero
    badge: "Restoranlar için QR Menü Çözümleri",
    heroTitle: "Restoran Menünüzü",
    heroHighlight: "Dijitalleştirin",
    heroDescription: "Geleneksel kağıt menülerinizi dinamik, temassız dijital deneyimlere dönüştürün. QR kod menü sistemlerimiz baskı maliyetlerini %90'a kadar azaltmanıza, menüleri gerçek zamanlı güncellemenize ve müşterilerinize etkileşimli, çok dilli bir yemek deneyimi sunmanıza yardımcı olur.",

    // Main Features
    featuresTitle: "Kapsamlı QR Menü Sistemi Özellikleri",
    featuresSubtitle: "Restoranınızın Dijitalleşmesi İçin İhtiyacınız Olan Her Şey",
    features: [
      {
        title: "Anında QR Kod Oluşturma",
        description: "Her masa, paket servis bankosu veya teslimat paketi için benzersiz, markalı QR kodları oluşturun. Müşteriler akıllı telefon kameralarıyla kolayca tarar - uygulama indirmeye gerek yoktur."
      },
      {
        title: "Gerçek Zamanlı Menü Güncellemeleri",
        description: "Fiyatları değiştirin, sezonluk spesiyaller ekleyin, tükenen ürünleri işaretleyin veya açıklamaları anında güncelleyin. Artık yeniden basım maliyeti veya masalarda güncelliğini yitirmiş menüler yok."
      },
      {
        title: "Çok Dilli Destek",
        description: "Otomatik dil algılama özelliği ile tam Arapça, İngilizce ve Türkçe menüler. Yerel müşterilere ve uluslararası turistlere hizmet vermek için mükemmeldir."
      },
      {
        title: "Yüksek Kaliteli Yemek Fotoğrafları",
        description: "Her yemek için iştah açıcı görseller ve videolar sergileyin. Görsel menüler, sadece metinden oluşan menülere kıyasla ortalama sipariş değerini %30'a kadar artırır."
      },
      {
        title: "Alerjen ve Beslenme Bilgileri",
        description: "Alerjenleri, kalorileri, vejetaryen/vegan seçeneklerini ve helal sertifikalarını net bir şekilde belirtin. Müşterilerin bilinçli seçimler yapmasına yardımcı olun."
      },
      {
        title: "Mobil Öncelikli Duyarlı Tasarım",
        description: "Tüm akıllı telefonlar ve tabletler için optimize edilmiş harika menüler. Yavaş bağlantılarda bile hızlı yükleme süreleri ile kusursuz bir müşteri deneyimi."
      },
      {
        title: "Analitik ve Öngörü Panosu",
        description: "En çok hangi yemeklerin görüntülendiğini, yoğun sipariş zamanlarını ve müşteri tercihlerini takip edin. Menünüzü ve fiyatlandırmanızı optimize etmek için veriye dayalı kararlar alın."
      },
      {
        title: "Kusursuz POS Entegrasyonu",
        description: "Popüler restoran POS sistemleriyle bağlantı kurun. Menü öğelerini, fiyatları ve müsaitlik durumunu otomatik olarak senkronize edin."
      },
      {
        title: "Özel Markalama ve Temalar",
        description: "Dijital menünüzü özel renkler, logolar, yazı tipleri ve düzenlerle restoranınızın marka kimliğine uydurun. Uyumlu bir yemek deneyimi yaratın."
      }
    ],

    // Benefits
    benefitsTitle: "Neden Restoranlar Dijital QR Menüleri Seçiyor?",
    benefitsSubtitle: "İşletmeniz Üzerindeki Ölçülebilir Etki",
    benefits: [
      { metric: "%90", label: "Baskı Maliyetlerinde Azalma", description: "Tekrarlayan menü basım masraflarını sonsuza dek ortadan kaldırın" },
      { metric: "%30", label: "Ortalama Siparişte Artış", description: "Fotoğraflı görsel menüler ek satışı teşvik eder" },
      { metric: "%50", label: "Hızlı Masa Sirkülasyonu", description: "Müşteriler daha hızlı inceler ve karar verir" },
      { metric: "%100", label: "Temassız ve Hijyenik", description: "Pandemi sonrası güvenli yemek deneyimi" },
    ],

    // Process
    processTitle: "Nasıl Çalışır?",
    processSubtitle: "Dijital Menünüzü 3 Basit Adımda Yayınlayın",
    process: [
      {
        step: "01",
        title: "Menünüzü Paylaşın",
        description: "Mevcut menünüzü herhangi bir formatta (PDF, fotoğraf veya web sitesi) bize gönderin. Dijital dönüşümü biz halledelim."
      },
      {
        step: "02",
        title: "Tasarlıyoruz ve Kuruyoruz",
        description: "Ekibimiz, markanızla uyumlu, fotoğraflı ve tüm ürün detaylarını içeren, mobil uyumlu bir dijital menü oluşturur."
      },
      {
        step: "03",
        title: "Tara ve Servis Et",
        description: "Masalar ve pazarlama materyalleriniz için özel QR kodlarınızı alın. Müşterileriniz hemen taramaya başlayabilir"
      }
    ],

    // Use Cases
    useCasesTitle: "Her Gıda İşletmesi İçin Mükemmel",
    useCases: ["Restoranlar", "Kafeler ve Bistrolar", "Fast Food", "Yemek Alanları ve AVM'ler", "Otel Oda Servisi", "Bulut Mutfaklar", "Food Truck'lar", "Catering Hizmetleri"],

    // CTA
    ctaTitle: "Menünüzü Dijitalleştirmeye Hazır mısınız?",
    ctaDescription: "QR menü çözümlerimizle yemek deneyimini dönüştüren yüzlerce restorana katılın.",
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
}

const GlowingCard = ({ title, description }: GlowingCardProps) => {
  return (
    <li className="min-h-[11rem] list-none">
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-orange-200 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-xl border-[0.75px] border-orange-100 bg-lavender p-5 sm:p-6 shadow-sm">
          <div className="relative flex flex-1 flex-col gap-2">
            <h3 className="text-base sm:text-lg font-bold leading-tight text-slate-900">
              {title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export function QRMenuServiceSection({ isRTL = false, locale = "en" }: QRMenuServiceSectionProps) {
  const t = (content as any)[locale] || content.en
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <section
      className="w-full bg-lavender text-slate-900"
      dir={isRTL ? "rtl" : "ltr"}
      aria-labelledby="qr-menu-service-title"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-lavender to-lavender py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-2 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 mb-6">
              {t.badge}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 id="qr-menu-service-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4">
              {t.heroTitle}{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
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
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-lavender/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.featuresTitle}
              </h2>
              <p className="text-lg sm:text-xl text-slate-600">
                {t.featuresSubtitle}
              </p>
            </AnimatedSection>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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

      {/* Benefits Section */}
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                {t.benefitsTitle}
              </h2>
              <p className="text-lg sm:text-xl text-orange-100">
                {t.benefitsSubtitle}
              </p>
            </AnimatedSection>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {t.benefits.map((benefit: any, index: number) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-lavender/10 backdrop-blur-sm border border-white/20">
                  <div className="text-5xl sm:text-6xl font-black text-white mb-2">
                    {benefit.metric}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {benefit.label}
                  </h3>
                  <p className="text-orange-100 text-sm">
                    {benefit.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                {t.processTitle}
              </h2>
              <p className="text-lg sm:text-xl text-slate-400">
                {t.processSubtitle}
              </p>
            </AnimatedSection>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
            {t.process.map((step: any, index: number) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <div className="relative text-center">
                  <div className="text-7xl sm:text-8xl font-black text-orange-500/20 mb-4">
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

      {/* Use Cases Section */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 bg-lavender">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8">
              {t.useCasesTitle}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {t.useCases.map((useCase: any, index: number) => (
                <span
                  key={index}
                  className="px-5 py-2.5 bg-lavender rounded-full text-slate-700 font-medium border border-orange-200 hover:border-orange-400 hover:text-orange-600 transition-colors text-sm sm:text-base"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-lavender via-lavender to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              {t.ctaDescription}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-lavender text-orange-600 font-bold text-lg rounded-full hover:bg-lavender transition-colors shadow-xl hover:shadow-2xl"
            >
              {t.ctaButton}
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
            "serviceType": isRTL ? "أنظمة قوائم QR للمطاعم" : "Restaurant QR Menu Systems & Digital Menu Solutions",
            "name": isRTL ? "قوائم QR الرقمية للمطاعم - كلاود توبيا" : "QR Code Digital Menus for Restaurants - CloudTopia",
            "description": t.heroDescription,
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
              "name": isRTL ? "خدمات قوائم QR للمطاعم" : "Restaurant QR Menu Services",
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
              "audienceType": "Restaurants, Cafes, Hotels, Food Courts, Cloud Kitchens, Catering Services, Food Trucks"
            },
            "potentialAction": {
              "@type": "ContactAction",
              "target": "https://cloudtopia.net/contact"
            },
            "additionalType": "https://schema.org/Product",
            "category": "Restaurant Technology",
            "keywords": isRTL
              ? "قائمة QR, قائمة رقمية, قائمة مطعم, قائمة إلكترونية, مطعم ذكي, قائمة بدون تلامس"
              : "QR menu, digital menu, restaurant menu, contactless menu, smart restaurant, touchless ordering, menu QR code"
          })
        }}
      />
    </section>
  )
}

export default QRMenuServiceSection
