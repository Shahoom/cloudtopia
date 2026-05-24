'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { renderCanvas, TypeWriter } from "@/components/ui/hero-designali"
import { Plus, CheckCircle } from "lucide-react"
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

const RevealWaveImage = dynamic(
  () => import("@/components/ui/reveal-wave-image").then((m) => m.RevealWaveImage),
  { ssr: false }
)

const Hero = ({ t: pageT }: { t?: any }) => {
  const { locale, dir, t: contextT } = useLanguage()
  const t = pageT || contextT
  const p = t?.services?.socialMediaPage || t?.socialMediaPage

  const talkAboutEn = [
    "Instagram Growth",
    "Facebook Ads",
    "TikTok Marketing",
    "Content Strategy",
    "Brand Awareness",
    "Social Analytics",
    "Community Management",
    "Influencer Outreach",
  ]

  const talkAboutAr = [
    "نمو إنستغرام",
    "إعلانات فيسبوك",
    "تسويق تيك توك",
    "استراتيجية المحتوى",
    "الوعي بالعلامة التجارية",
    "تحليلات اجتماعية",
    "إدارة المجتمع",
    "التواصل مع المؤثرين",
  ]

  const talkAboutTr = [
    "Instagram Büyümesi",
    "Facebook Reklamları",
    "TikTok Pazarlaması",
    "İçerik Stratejisi",
    "Marka Farkındalığı",
    "Sosyal Analitik",
    "Topluluk Yönetimi",
    "Influencer İletişimi",
  ]

  const talkAbout = p?.hero?.talkAbout || (locale === 'ar' ? talkAboutAr : (locale === 'tr' ? talkAboutTr : talkAboutEn))

  useEffect(() => {
    renderCanvas()
  }, [])

  const content = {
    en: {
      badge: "Social Media Excellence",
      badgeLink: "Learn More",
      headline: "Your complete platform for",
      highlight: "Social Media.",
      available: "Available Now",
      welcome: "Welcome to the future of social marketing! We're",
      brand: "CloudTopia",
      description: "We craft powerful social media strategies for brands, and create engaging content to drive growth. We are experts in",
    },
    ar: {
      badge: "التميز في وسائل التواصل",
      badgeLink: "اكتشف المزيد",
      headline: "منصتك الشاملة لـ",
      highlight: "التسويق الاجتماعي.",
      available: "متاح الآن",
      welcome: "مرحباً بك في مستقبل التسويق الاجتماعي! نحن",
      brand: "كلاود توبيا",
      description: "نصنع استراتيجيات قوية للتواصل الاجتماعي للعلامات التجارية، ونبتكر محتوى جذاباً لدفع النمو. نحن خبراء في",
    },
    tr: {
      badge: "Sosyal Medya Mükemmeliyeti",
      badgeLink: "Daha Fazla Bilgi",
      headline: "Şunun için eksiksiz platformunuz:",
      highlight: "Sosyal Medya",
      available: "Şimdi Müsait",
      welcome: "Sosyal pazarlamanın geleceğine hoş geldiniz! Biz",
      brand: "CloudTopia",
      description: "Markalar için güçlü sosyal medya stratejileri kurguluyor ve büyümeyi teşvik edecek etkileyici içerikler üretiyoruz. Biz şu konularda uzmanız:",
    },
  }

  const currentT = {
    badge: p?.hero?.badge || (content as any)[locale]?.badge || content.en.badge,
    badgeLink: p?.hero?.badgeLink || (content as any)[locale]?.badgeLink || content.en.badgeLink,
    headline: p?.hero?.headline || (content as any)[locale]?.headline || content.en.headline,
    highlight: p?.hero?.highlight || (content as any)[locale]?.highlight || content.en.highlight,
    available: p?.hero?.available || (content as any)[locale]?.available || content.en.available,
    welcome: p?.hero?.welcome || (content as any)[locale]?.welcome || content.en.welcome,
    brand: p?.hero?.brand || (content as any)[locale]?.brand || content.en.brand,
    description: p?.hero?.description || (content as any)[locale]?.description || content.en.description,
  }

  return (
    <main className="overflow-hidden" dir={dir} lang={locale}>
      <section id="home">
        <div className="absolute inset-0 max-md:hidden top-[400px] -z-10 h-[400px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#a8a29e_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e_1px,transparent_1px)]"></div>
        <div className="flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 mt-10 sm:justify-center md:mb-4 md:mt-40">
            <div className="relative flex items-center rounded-full border bg-popover px-3 py-1 text-xs text-primary/60">
              {currentT.badge}
              <Link
                href={localePath(locale, '/services')}
                className={`${locale === 'ar' ? 'mr-1' : 'ml-1'} flex items-center font-semibold`}
              >
                <div
                  className="absolute inset-0 hover:font-semibold hover:text-pink-500 flex"
                  aria-hidden="true"
                />
                {currentT.badgeLink} <span aria-hidden="true"></span>
              </Link>
            </div>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="border-pink-500/20 relative mx-auto h-full bg-background border py-12 p-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)]">
              <h1 className="flex flex-col text-center text-5xl font-semibold leading-none tracking-tight md:flex-col md:text-8xl lg:flex-row lg:text-8xl">
                <Plus
                  strokeWidth={4}
                  className="text-pink-500 absolute -left-5 -top-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-pink-500 absolute -bottom-5 -left-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-pink-500 absolute -right-5 -top-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-pink-500 absolute -bottom-5 -right-5 h-10 w-10"
                />
                <span>
                  {currentT.headline}{" "}
                  <span className="text-pink-500">{currentT.highlight}</span>
                </span>
              </h1>
              <div className="flex items-center mt-4 justify-center gap-1">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500"></span>
                </span>
                <p className="text-xs text-green-500">{currentT.available}</p>
              </div>
            </div>

            <h2 className="mt-8 text-2xl md:text-2xl">
              {currentT.welcome}{" "}
              <span className="text-pink-500 font-bold">{currentT.brand}</span>
            </h2>

            <div className="text-primary/60 py-4">
              {currentT.description}{" "}
              <span className="text-purple-500 font-semibold">
                <TypeWriter strings={talkAbout} />
              </span>.
            </div>
          </div>
        </div>
        <canvas
          className="pointer-events-none absolute inset-0 mx-auto"
          id="canvas"
        ></canvas>
      </section>
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 h-[400px] w-full max-w-[1200px] opacity-30"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(236, 72, 153, 0.3) 0%, rgba(168, 85, 247, 0.2) 40%, transparent 70%)",
        }}
      />

      <ServicesSlideshow locale={locale} t={t} />

      <CreativeShowcase locale={locale} t={t} />

      <ServiceExplainer locale={locale} t={t} />
    </main>
  )
}

const SLIDES_EN = [
  {
    id: "slide-1",
    title: "Brand Identity",
    description: "Custom logos, color palettes, and visual guidelines that make your brand unforgettable.",
    imageUrl: "/images/services/social-media-marketing/brand-identity.avif",
  },
  {
    id: "slide-2",
    title: "Content Creation",
    description: "Professional photos, graphics, and copy tailored to engage your target audience.",
    imageUrl: "/images/services/social-media-marketing/content-creration.avif",
  },
  {
    id: "slide-3",
    title: "Instagram Marketing",
    description: "Grow your followers, boost engagement, and turn your feed into a sales machine.",
    imageUrl: "/images/services/social-media-marketing/instagram-marketing.webp",
  },
  {
    id: "slide-4",
    title: "TikTok & Reels",
    description: "Viral short-form videos that capture attention and drive massive reach.",
    imageUrl: "/images/services/social-media-marketing/tiktok-reels.webp",
  },
  {
    id: "slide-5",
    title: "Paid Ads",
    description: "Expert Meta Business Suite management and high-conversion ad campaigns across Facebook, Instagram, Google & TikTok.",
    imageUrl: "/images/services/social-media-marketing/paid-ads.avif",
  },
  {
    id: "slide-6",
    title: "Social Analytics",
    description: "Data-driven insights and reports to track growth and optimize performance.",
    imageUrl: "/images/services/social-media-marketing/social-analytics.avif",
  },
]

const SLIDES_AR = [
  {
    id: "slide-1",
    title: "الهوية البصرية",
    description: "شعارات مخصصة وألوان وإرشادات بصرية تجعل علامتك لا تُنسى.",
    imageUrl: "/images/services/social-media-marketing/brand-identity.avif",
  },
  {
    id: "slide-2",
    title: "صناعة المحتوى",
    description: "صور احترافية ورسومات ونصوص مصممة لجذب جمهورك المستهدف.",
    imageUrl: "/images/services/social-media-marketing/content-creration.avif",
  },
  {
    id: "slide-3",
    title: "تسويق إنستغرام",
    description: "زيادة متابعيك وتعزيز التفاعل وتحويل حسابك إلى آلة مبيعات.",
    imageUrl: "/images/services/social-media-marketing/instagram-marketing.webp",
  },
  {
    id: "slide-4",
    title: "تيك توك وريلز",
    description: "فيديوهات قصيرة فيروسية تجذب الانتباه وتحقق انتشاراً واسعاً.",
    imageUrl: "/images/services/social-media-marketing/tiktok-reels.webp",
  },
  {
    id: "slide-5",
    title: "الإعلانات المدفوعة",
    description: "إدارة احترافية لـ Meta Business Suite وحملات إعلانية عالية التحويل على فيسبوك، إنستغرام، جوجل وتيك توك.",
    imageUrl: "/images/services/social-media-marketing/paid-ads.avif",
  },
  {
    id: "slide-6",
    title: "تحليلات اجتماعية",
    description: "رؤى وتقارير مبنية على البيانات لتتبع النمو وتحسين الأداء.",
    imageUrl: "/images/services/social-media-marketing/social-analytics.avif",
  },
]

const SLIDES_TR = [
  {
    id: "slide-1",
    title: "Marka Kimliği",
    description: "Markanızı unutulmaz kılan özel logolar, renk paletleri ve görsel kılavuzlar.",
    imageUrl: "/images/services/social-media-marketing/brand-identity.avif",
  },
  {
    id: "slide-2",
    title: "İçerik Üretimi",
    description: "Hedef kitlenizin ilgisini çekmek için tasarlanmış profesyonel fotoğraflar ve grafikler.",
    imageUrl: "/images/services/social-media-marketing/content-creration.avif",
  },
  {
    id: "slide-3",
    title: "Instagram Pazarlama",
    description: "Takipçilerinizi artırın, etkileşimi güçlendirin ve profilinizi bir satış makinesine dönüştürün.",
    imageUrl: "/images/services/social-media-marketing/instagram-marketing.webp",
  },
  {
    id: "slide-4",
    title: "TikTok & Reels",
    description: "Dikkat çeken ve geniş kitlelere ulaşan viral kısa formatlı videolar.",
    imageUrl: "/images/services/social-media-marketing/tiktok-reels.webp",
  },
  {
    id: "slide-5",
    title: "Ücretli Reklamlar",
    description: "Profesyonel Meta Business Suite yönetimi ve yüksek dönüşümlü reklam kampanyaları.",
    imageUrl: "/images/services/social-media-marketing/paid-ads.avif",
  },
  {
    id: "slide-6",
    title: "Sosyal Analitik",
    description: "Büyümeyi izlemek ve performansı optimize etmek için veri odaklı içgörüler ve raporlar.",
    imageUrl: "/images/services/social-media-marketing/social-analytics.avif",
  },
]

const ServicesSlideshow = ({ locale, t: pageT }: { locale: string, t?: any }) => {
  const isRTL = locale === 'ar'
  const p = pageT?.services?.socialMediaPage || pageT?.socialMediaPage

  const SLIDES = p?.slides || (locale === 'ar' ? SLIDES_AR : (locale === 'tr' ? SLIDES_TR : SLIDES_EN))
  const sectionLabel = p?.slideshowLabel || (locale === 'ar' ? "/ خدماتنا" : (locale === 'tr' ? "/ hizmetlerimiz" : "/ our services"))
  const sectionTitle = p?.slideshowTitle || (locale === 'ar' ? "ماذا نقدم لك" : (locale === 'tr' ? "Neler Sunuyoruz?" : "What We Offer"))
  const sectionDesc = p?.slideshowDesc || (locale === 'ar'
    ? "حلول تسويق رقمي شاملة لتنمية حضورك على وسائل التواصل الاجتماعي"
    : (locale === 'tr'
      ? "Sosyal medya varlığınızı büyütmek için kapsamlı dijital pazarlama çözümleri"
      : "Comprehensive digital marketing solutions to grow your social media presence"))

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="services" className="relative">
      <HoverSlider className="min-h-screen place-content-center p-6 md:px-12 lg:px-24 bg-gradient-to-b from-lavender via-lavender/20 to-lavender dark:from-neutral-950 dark:via-pink-950/10 dark:to-neutral-950 text-neutral-800 dark:text-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h3 className="mb-2 text-xs font-medium capitalize tracking-wide text-pink-500">
              {sectionLabel}
            </h3>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">{sectionTitle}</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-xl text-sm md:text-base">{sectionDesc}</p>
          </div>

          <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex flex-col space-y-1 md:space-y-2">
              {SLIDES.map((slide: any, index: number) => (
                <div
                  key={slide.id}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <TextStaggerHover
                    index={index}
                    className="cursor-pointer text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter leading-tight"
                    text={slide.title}
                  />
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/2 max-w-lg">
              <HoverSliderImageWrap className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-pink-500/10">
                {SLIDES.map((slide: any, index: number) => (
                  <div key={slide.id}>
                    <HoverSliderImage
                      index={index}
                      imageUrl={slide.imageUrl}
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="size-full aspect-[4/3] object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </HoverSliderImageWrap>
              <div className="mt-4 p-4 bg-lavender/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl border border-pink-100 dark:border-pink-900/30 shadow-lg">
                <h4 className="font-bold text-lg text-pink-500 mb-1">
                  {SLIDES[activeIndex]?.title}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {SLIDES[activeIndex]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </HoverSlider>
    </section>
  )
}

const CreativeShowcase = ({ locale, t: pageT }: { locale: string, t?: any }) => {
  const p = pageT?.services?.socialMediaPage || pageT?.socialMediaPage

  const content = {
    en: {
      label: "/ our work",
      title: "We Bring Light & Beauty",
      subtitle: "To Many Things",
      description: "Explore our creative work - hover over the images to reveal the magic",
      quote1: "Turning ideas into viral content",
      quote2: "Building communities that engage",
      quote3: "Making brands unforgettable",
    },
    ar: {
      label: "/ أعمالنا",
      title: "نُعطي الضوء والجمال",
      subtitle: "للعديد من الأشياء",
      description: "استكشف أعمالنا الإبداعية - مرر الماوس فوق الصور لاكتشاف السحر",
      quote1: "نحوّل الأفكار إلى محتوى فيروسي",
      quote2: "نبني مجتمعات تتفاعل",
      quote3: "نجعل العلامات التجارية لا تُنسى",
    },
    tr: {
      label: "/ işlerimiz",
      title: "Birçok Şeye Işık ve",
      subtitle: "Güzellik Katıyoruz",
      description: "Yaratıcı çalışmalarımızı keşfedin - sihirli dokunuşları görmek için görsellerin üzerine gelin",
      quote1: "Fikirleri viral içeriklere dönüştürüyoruz",
      quote2: "Etkileşim kuran topluluklar inşa ediyoruz",
      quote3: "Markaları unutulmaz kılıyoruz",
    },
  }

  const currentT = {
    label: p?.showcase?.label || (content as any)[locale]?.label || content.en.label,
    title: p?.showcase?.title || (content as any)[locale]?.title || content.en.title,
    subtitle: p?.showcase?.subtitle || (content as any)[locale]?.subtitle || content.en.subtitle,
    description: p?.showcase?.description || (content as any)[locale]?.description || content.en.description,
    quote1: p?.showcase?.quote1 || (content as any)[locale]?.quote1 || content.en.quote1,
    quote2: p?.showcase?.quote2 || (content as any)[locale]?.quote2 || content.en.quote2,
    quote3: p?.showcase?.quote3 || (content as any)[locale]?.quote3 || content.en.quote3,
  }

  const imageData = [
    {
      src: "/images/services/social-media-marketing/Social Media Strategy.jpg",
      captionEn: "Social Media Strategy",
      captionAr: "استراتيجية التواصل الاجتماعي",
      captionTr: "Sosyal Medya Stratejisi",
    },
    {
      src: "/images/services/social-media-marketing/Creative Campaigns.avif",
      captionEn: "Creative Campaigns",
      captionAr: "حملات إبداعية",
      captionTr: "Yaratıcı Kampanyalar",
    },
    {
      src: "/images/services/social-media-marketing/Brand Storytelling.webp",
      captionEn: "Brand Storytelling",
      captionAr: "سرد قصة العلامة",
      captionTr: "Marka Hikayeleştirme",
    },
    {
      src: "/images/services/social-media-marketing/Visual Design.webp",
      captionEn: "Visual Design",
      captionAr: "التصميم البصري",
      captionTr: "Görsel Tasarım",
    },
    {
      src: "/images/services/social-media-marketing/content production.avif",
      captionEn: "Content Production",
      captionAr: "إنتاج المحتوى",
      captionTr: "İçerik Üretimi",
    },
    {
      src: "/images/services/social-media-marketing/Digital Marketing Success.webp",
      captionEn: "Digital Marketing Success",
      captionAr: "نجاح التسويق الرقمي",
      captionTr: "Dijital Pazarlama Başarısı",
    },
  ]

  return (
    <section id="creative" className="relative bg-lavender dark:bg-neutral-950 text-neutral-900 dark:text-white py-20 overflow-hidden">
      <div className="text-center mb-12 px-6">
        <h3 className="mb-2 text-xs font-medium capitalize tracking-wide text-pink-500">
          {currentT.label}
        </h3>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
          {currentT.title}
        </h2>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-pink-500 mb-4">
          {currentT.subtitle}
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto text-sm md:text-base">
          {currentT.description}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative group">
            <div className="h-[280px] md:h-[350px] rounded-3xl overflow-hidden">
              <RevealWaveImage
                src={imageData[0].src}
                waveSpeed={0.3}
                waveFrequency={1.5}
                waveAmplitude={0.3}
                revealRadius={0.4}
                revealSoftness={0.8}
                pixelSize={2}
                mouseRadius={0.3}
              />
            </div>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">
              {locale === 'ar' ? imageData[0].captionAr : (locale === 'tr' ? (imageData[0] as any).captionTr : imageData[0].captionEn)}
            </p>
          </div>
          <div className="relative group">
            <div className="h-[280px] md:h-[350px] rounded-3xl overflow-hidden">
              <RevealWaveImage
                src={imageData[1].src}
                waveSpeed={0.25}
                waveFrequency={2.0}
                waveAmplitude={0.4}
                revealRadius={0.5}
                revealSoftness={0.9}
                pixelSize={3}
                mouseRadius={0.35}
              />
            </div>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">
              {locale === 'ar' ? imageData[1].captionAr : (locale === 'tr' ? (imageData[1] as any).captionTr : imageData[1].captionEn)}
            </p>
          </div>
        </div>

        <div className="text-center py-8 md:py-12">
          <p className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-white/90 italic">
            "{currentT.quote1}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="relative group">
            <div className="h-[250px] md:h-[300px] rounded-3xl overflow-hidden">
              <RevealWaveImage
                src={imageData[2].src}
                waveSpeed={0.35}
                waveFrequency={1.8}
                waveAmplitude={0.35}
                revealRadius={0.45}
                revealSoftness={0.85}
                pixelSize={2}
                mouseRadius={0.3}
              />
            </div>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">
              {locale === 'ar' ? imageData[2].captionAr : (locale === 'tr' ? (imageData[2] as any).captionTr : imageData[2].captionEn)}
            </p>
          </div>
          <div className="relative group">
            <div className="h-[250px] md:h-[300px] rounded-3xl overflow-hidden">
              <RevealWaveImage
                src={imageData[3].src}
                waveSpeed={0.2}
                waveFrequency={1.2}
                waveAmplitude={0.5}
                revealRadius={0.5}
                revealSoftness={1}
                pixelSize={2}
                mouseRadius={0.4}
              />
            </div>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">
              {locale === 'ar' ? imageData[3].captionAr : (locale === 'tr' ? (imageData[3] as any).captionTr : imageData[3].captionEn)}
            </p>
          </div>
          <div className="relative group">
            <div className="h-[250px] md:h-[300px] rounded-3xl overflow-hidden">
              <RevealWaveImage
                src={imageData[4].src}
                waveSpeed={0.28}
                waveFrequency={1.6}
                waveAmplitude={0.4}
                revealRadius={0.45}
                revealSoftness={0.9}
                pixelSize={2}
                mouseRadius={0.35}
              />
            </div>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">
              {locale === 'ar' ? imageData[4].captionAr : (locale === 'tr' ? (imageData[4] as any).captionTr : imageData[4].captionEn)}
            </p>
          </div>
        </div>

        <div className="text-center py-8 md:py-12">
          <p className="text-xl md:text-3xl font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">
            "{currentT.quote2}"
          </p>
        </div>

        <div className="relative group mb-6">
          <div className="h-[300px] md:h-[450px] rounded-3xl overflow-hidden">
            <RevealWaveImage
              src={imageData[5].src}
              waveSpeed={0.22}
              waveFrequency={1.4}
              waveAmplitude={0.45}
              revealRadius={0.55}
              revealSoftness={0.95}
              pixelSize={2}
              mouseRadius={0.4}
            />
          </div>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">
            {locale === 'ar' ? imageData[5].captionAr : (locale === 'tr' ? (imageData[5] as any).captionTr : imageData[5].captionEn)}
          </p>
        </div>

        <div className="text-center py-8 md:py-12">
          <p className="text-xl md:text-3xl font-semibold text-neutral-800 dark:text-white/90 italic">
            "{currentT.quote3}"
          </p>
        </div>
      </div>
    </section>
  )
}

const ServiceExplainer = ({ locale, t: pageT }: { locale: string, t?: any }) => {
  const p = pageT?.services?.socialMediaPage || pageT?.socialMediaPage

  const content = {
    en: {
      mainTitle: "Social Media Marketing Services",
      mainSubtitle: "Grow Your Business with Professional Social Media Management",
      introParagraph: "At CloudTopia, we provide comprehensive social media marketing services designed to help businesses of all sizes build their online presence, engage with their target audience, and drive measurable results. Our team of social media experts combines creative content strategies with data-driven insights to maximize your brand's impact across all major platforms.",
      whatWeOfferTitle: "What We Offer",
      services: [
        {
          title: "Social Media Strategy Development",
          description: "We create customized social media strategies tailored to your business goals, target audience, and industry. Our strategic approach ensures every post, campaign, and interaction contributes to your overall marketing objectives.",
        },
        {
          title: "Content Creation & Management",
          description: "Our creative team produces high-quality content including graphics, videos, stories, and reels that resonate with your audience. We handle everything from content planning to publishing and community management.",
        },
        {
          title: "Paid Social Media Advertising",
          description: "Maximize your ROI with advanced advertising campaigns. We possess deep expertise in Meta Business Suite (Facebook & Instagram), Google Ads, and TikTok Ads. We handle technical setup, pixel integration, audience narrowing, and continuous A/B testing to ensure the lowest cost per acquisition.",
        },
        {
          title: "Analytics & Reporting",
          description: "Track your social media performance with detailed analytics and monthly reports. We provide actionable insights on engagement rates, follower growth, reach, and conversion metrics.",
        },
        {
          title: "Community Management",
          description: "Build and nurture your online community with responsive engagement. We handle comments, messages, and interactions to maintain a positive brand image and foster customer loyalty.",
        }
      ],
      whyChooseTitle: "Why Choose CloudTopia for Social Media Marketing?",
      whyChoosePoints: [
        "Expertise in Meta Business Suite & Advanced Advertising Tools",
        "Experienced team with proven track record across multiple industries",
        "Customized strategies that align with your unique business goals",
        "Transparent reporting and regular performance updates",
        "Creative content that stands out in crowded social feeds",
        "Data-driven approach to maximize engagement and conversions",
        "Full-service management from strategy to execution"
      ],
      platformsTitle: "Platforms We Specialize In",
      platforms: [
        { name: "Instagram", desc: "Visual storytelling and engagement" },
        { name: "Facebook", desc: "Community building and advertising" },
        { name: "TikTok", desc: "Viral content and Gen-Z reach" },
        { name: "LinkedIn", desc: "B2B marketing and thought leadership" },
        { name: "Twitter/X", desc: "Real-time engagement and brand voice" },
        { name: "YouTube", desc: "Video marketing and SEO" }
      ],
      ctaTitle: "Ready to Transform Your Social Media Presence?",
      ctaDescription: "Let's discuss how our social media marketing services can help your business grow. Get a free consultation and custom strategy tailored to your goals.",
      ctaButton: "Get Started Today",
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          question: "How much do social media marketing services cost?",
          answer: "Our social media marketing packages are customized based on your needs, platforms, and goals. We offer flexible pricing starting from basic management to comprehensive full-service solutions. Contact us for a personalized quote."
        },
        {
          question: "How long does it take to see results from social media marketing?",
          answer: "While some improvements can be seen within the first month, sustainable growth typically takes 3-6 months of consistent effort. We focus on building genuine engagement and long-term brand awareness rather than quick fixes."
        },
        {
          question: "Which social media platforms should my business be on?",
          answer: "The right platforms depend on your target audience and business type. We analyze your industry and customer demographics to recommend the most effective platforms for your specific goals."
        },
        {
          question: "Do you create content or do we need to provide it?",
          answer: "We handle all content creation including graphics, videos, captions, and hashtag research. We work with you to understand your brand voice and create content that authentically represents your business."
        }
      ]
    },
    ar: {
      mainTitle: "خدمات التسويق عبر وسائل التواصل الاجتماعي",
      mainSubtitle: "طوّر أعمالك مع إدارة احترافية لوسائل التواصل الاجتماعي",
      introParagraph: "في كلاود توبيا، نقدم خدمات تسويق شاملة عبر وسائل التواصل الاجتماعي مصممة لمساعدة الشركات من جميع الأحجام على بناء حضورها الرقمي والتفاعل مع جمهورها المستهدف وتحقيق نتائج قابلة للقياس. يجمع فريقنا من خبراء التواصل الاجتماعي بين استراتيجيات المحتوى الإبداعي والرؤى المبنية على البيانات لتعظيم تأثير علامتك التجارية.",
      whatWeOfferTitle: "ماذا نقدم",
      services: [
        {
          title: "تطوير استراتيجية التواصل الاجتماعي",
          description: "نصمم استراتيجيات مخصصة لوسائل التواصل الاجتماعي تناسب أهداف عملك وجمهورك المستهدف وصناعتك. نهجنا الاستراتيجي يضمن أن كل منشور وحملة يساهم في أهدافك التسويقية.",
        },
        {
          title: "إنشاء وإدارة المحتوى",
          description: "ينتج فريقنا الإبداعي محتوى عالي الجودة يشمل الرسومات والفيديوهات والقصص والريلز التي تتفاعل مع جمهورك. نتولى كل شيء من تخطيط المحتوى إلى النشر وإدارة المجتمع.",
        },
        {
          title: "الإعلانات المدفوعة",
          description: "حقق أقصى عائد على استثمارك مع حملات إعلانية متقدمة. نمتلك خبرة عميقة في Meta Business Suite (فيسبوك وإنستغرام)، وإعلانات جوجل، وتيك توك. نتولى الإعداد الفني، وربط البكسل، وتحديد الجمهور بدقة، واختبارات A/B المستمرة لضمان أقل تكلفة لكل عميل.",
        },
        {
          title: "التحليلات والتقارير",
          description: "تابع أداء وسائل التواصل الاجتماعي مع تحليلات مفصلة وتقارير شهرية. نقدم رؤى قابلة للتنفيذ حول معدلات التفاعل ونمو المتابعين والوصول.",
        },
        {
          title: "إدارة المجتمع",
          description: "ابنِ ورعَ مجتمعك الرقمي مع تفاعل سريع الاستجابة. نتعامل مع التعليقات والرسائل والتفاعلات للحفاظ على صورة إيجابية للعلامة التجارية.",
        }
      ],
      whyChooseTitle: "لماذا تختار كلاود توبيا للتسويق عبر وسائل التواصل؟",
      whyChoosePoints: [
        "خبرة عميقة في Meta Business Suite وأدوات الإعلانات المتقدمة",
        "فريق خبير مع سجل حافل عبر صناعات متعددة",
        "استراتيجيات مخصصة تتوافق مع أهداف عملك الفريدة",
        "تقارير شفافة وتحديثات منتظمة للأداء",
        "محتوى إبداعي يبرز في وسط الزحام",
        "نهج مبني على البيانات لتحقيق أقصى تفاعل",
        "إدارة شاملة من الاستراتيجية إلى التنفيذ"
      ],
      platformsTitle: "المنصات التي نتخصص فيها",
      platforms: [
        { name: "إنستغرام", desc: "السرد البصري والتفاعل" },
        { name: "فيسبوك", desc: "بناء المجتمع والإعلانات" },
        { name: "تيك توك", desc: "المحتوى الفيروسي والوصول للشباب" },
        { name: "لينكد إن", desc: "التسويق B2B والقيادة الفكرية" },
        { name: "تويتر/إكس", desc: "التفاعل الفوري وصوت العلامة" },
        { name: "يوتيوب", desc: "التسويق بالفيديو" }
      ],
      ctaTitle: "مستعد لتحويل حضورك على وسائل التواصل الاجتماعي؟",
      ctaDescription: "دعنا نناقش كيف يمكن لخدمات التسويق عبر وسائل التواصل الاجتماعي أن تساعد عملك على النمو. احصل على استشارة مجانية واستراتيجية مخصصة.",
      ctaButton: "ابدأ اليوم",
      faqTitle: "الأسئلة الشائعة",
      faqs: [
        {
          question: "كم تكلف خدمات التسويق عبر وسائل التواصل الاجتماعي؟",
          answer: "باقاتنا مخصصة بناءً على احتياجاتك والمنصات وأهدافك. نقدم أسعاراً مرنة تبدأ من الإدارة الأساسية إلى الحلول الشاملة. تواصل معنا للحصول على عرض سعر مخصص."
        },
        {
          question: "كم من الوقت يستغرق رؤية النتائج؟",
          answer: "بينما يمكن رؤية بعض التحسينات خلال الشهر الأول، النمو المستدام يستغرق عادةً 3-6 أشهر من الجهد المستمر. نركز على بناء تفاعل حقيقي ووعي طويل المدى بالعلامة."
        },
        {
          question: "ما هي المنصات التي يجب أن يكون عملي عليها؟",
          answer: "المنصات المناسبة تعتمد على جمهورك المستهدف ونوع عملك. نحلل صناعتك وديموغرافية عملائك لنوصي بأكثر المنصات فعالية لأهدافك."
        },
        {
          question: "هل تنشئون المحتوى أم نحتاج لتوفيره؟",
          answer: "نتولى إنشاء كل المحتوى بما في ذلك الرسومات والفيديوهات والنصوص والهاشتاقات. نعمل معك لفهم صوت علامتك وإنشاء محتوى يمثل عملك بشكل أصيل."
        }
      ]
    },
    tr: {
      mainTitle: "Sosyal Medya Pazarlama Hizmetleri",
      mainSubtitle: "Profesyonel Sosyal Medya Yönetimi ile İşinizi Büyütün",
      introParagraph: "CloudTopia olarak, her ölçekten işletmenin online varlığını oluşturmasına, hedef kitlesiyle etkileşim kurmasına ve ölçülebilir sonuçlar elde etmesine yardımcı olmak için kapsamlı sosyal medya pazarlama hizmetleri sunuyoruz. Sosyal medya uzmanlarından oluşan ekibimiz, markanızın tüm ana platformlardaki etkisini maksimize etmek için yaratıcı içerik stratejilerini veri odaklı içgörülerle birleştirir.",
      whatWeOfferTitle: "Neler Sunuyoruz?",
      services: [
        {
          title: "Sosyal Medya Strateji Geliştirme",
          description: "İş hedeflerinize, hedef kitlenize ve sektöre özel olarak tasarlanmış özelleştirilmiş sosyal medya stratejileri oluşturuyoruz. Stratejik yaklaşımımız, her paylaşımın, kampanyanın ve etkileşimin genel pazarlama hedeflerinize katkıda bulunmasını sağlar.",
        },
        {
          title: "İçerik Üretimi ve Yönetimi",
          description: "Yaratıcı ekibimiz, hedef kitlenizde yankı uyandıran grafikler, videolar, hikayeler ve reels videoları dahil olmak üzere yüksek kaliteli içerikler üretir. İçerik planlamasından yayına ve topluluk yönetimine kadar her şeyi biz hallediyoruz.",
        },
        {
          title: "Ücretli Sosyal Medya Reklamcılığı",
          description: "Gelişmiş reklam kampanyaları ile yatırım getirinizi (ROI) maksimize edin. Meta Business Suite (Facebook ve Instagram), Google Ads ve TikTok Ads konularında derin uzmanlığa sahibiz. En düşük edinim maliyetini sağlamak için teknik kurulum, piksel entegrasyonu, hedef kitle daraltma ve sürekli A/B testlerini yönetiyoruz.",
        },
        {
          title: "Analitik ve Raporlama",
          description: "Ayrıntılı analitikler ve aylık raporlarla sosyal medya performansınızı takip edin. Etkileşim oranları, takipçi artışı, erişim ve dönüşüm metrikleri hakkında eyleme dönüştürülebilir içgörüler sunuyoruz.",
        },
        {
          title: "Topluluk Yönetimi",
          description: "Duyarlı etkileşimlerle online topluluğunuzu inşa edin ve besleyin. Pozitif bir marka imajını korumak ve müşteri sadakatini artırmak için yorumları, mesajları ve etkileşimleri yönetiyoruz.",
        }
      ],
      whyChooseTitle: "Sosyal Medya Pazarlaması İçin Neden CloudTopia?",
      whyChoosePoints: [
        "Meta Business Suite ve Gelişmiş Reklam Araçlarında Uzmanlık",
        "Birden fazla sektörde kanıtlanmış başarıya sahip deneyimli ekip",
        "Benzersiz iş hedeflerinizle uyumlu kişiselleştirilmiş stratejiler",
        "Şeffaf raporlama ve düzenli performans güncellemeleri",
        "Kalabalık sosyal akışlarda öne çıkan yaratıcı içerikler",
        "Etkileşimi ve dönüşümleri maksimize etmek için veri odaklı yaklaşım",
        "Stratejiden uygulamaya kadar tam kapsamlı yönetim"
      ],
      platformsTitle: "Uzmanlaştığımız Platformlar",
      platforms: [
        { name: "Instagram", desc: "Görsel hikayeleştirme ve etkileşim" },
        { name: "Facebook", desc: "Topluluk oluşturma ve reklamcılık" },
        { name: "TikTok", desc: "Viral içerik ve Gen-Z erişimi" },
        { name: "LinkedIn", desc: "B2B pazarlama ve düşünce liderliği" },
        { name: "Twitter/X", desc: "Gerçek zamanlı etkileşim ve marka sesi" },
        { name: "YouTube", desc: "Video pazarlaması ve SEO" }
      ],
      ctaTitle: "Sosyal Medya Varlığınızı Dönüştürmeye Hazır mısınız?",
      ctaDescription: "Sosyal medya pazarlama hizmetlerimizin işinizi büyütmenize nasıl yardımcı olabileceğini tartışalım. Ücretsiz danışmanlık ve hedeflerinize özel strateji alın.",
      ctaButton: "Bugün Başlayın",
      faqTitle: "Sıkça Sorulan Sorular",
      faqs: [
        {
          question: "Sosyal medya pazarlama hizmetlerinin maliyeti nedir?",
          answer: "Sosyal medya pazarlama paketlerimiz ihtiyaçlarınıza, platformlara ve hedeflerinize göre özelleştirilir. Temel yönetimden kapsamlı tam hizmet çözümlerine kadar esnek fiyatlandırma sunuyoruz. Kişiselleştirilmiş teklif için bizimle iletişime geçin."
        },
        {
          question: "Sosyal medya pazarlamasından sonuç almak ne kadar sürer?",
          answer: "İlk ay içinde bazı iyileşmeler görülebilse de, sürdürülebilir büyüme genellikle 3-6 aylık tutarlı bir çalışma gerektirir. Hızlı çözümler yerine gerçek etkileşim ve uzun vadeli marka farkındalığı oluşturmaya odaklanıyoruz."
        },
        {
          question: "İşletmem hangi sosyal medya platformlarında yer almalı?",
          answer: "Doğru platformlar hedef kitlenize ve işletme türünüze bağlıdır. Özel hedefleriniz için en etkili platformları önermek amacıyla sektörünüzü ve müşteri demografinizi analiz ediyoruz."
        },
        {
          question: "İçeriği siz mi üretiyorsunuz yoksa bizim mi sağlamamız gerekiyor?",
          answer: "Grafikler, videolar, açıklamalar ve hashtag araştırması dahil olmak üzere tüm içerik üretimini biz üstleniyoruz. Marka sesinizi anlamak ve işletmenizi özgün bir şekilde temsil eden içerikler oluşturmak için sizinle birlikte çalışıyoruz."
        }
      ]
    },
  }

  const currentT = {
    mainTitle: p?.explainer?.mainTitle || (content as any)[locale]?.mainTitle || content.en.mainTitle,
    mainSubtitle: p?.explainer?.mainSubtitle || (content as any)[locale]?.mainSubtitle || content.en.mainSubtitle,
    introParagraph: p?.explainer?.introParagraph || (content as any)[locale]?.introParagraph || content.en.introParagraph,
    whatWeOfferTitle: p?.explainer?.whatWeOfferTitle || (content as any)[locale]?.whatWeOfferTitle || content.en.whatWeOfferTitle,
    services: p?.explainer?.services || (content as any)[locale]?.services || content.en.services,
    whyChooseTitle: p?.explainer?.whyChooseTitle || (content as any)[locale]?.whyChooseTitle || content.en.whyChooseTitle,
    whyChoosePoints: p?.explainer?.whyChoosePoints || (content as any)[locale]?.whyChoosePoints || content.en.whyChoosePoints,
    platformsTitle: p?.explainer?.platformsTitle || (content as any)[locale]?.platformsTitle || content.en.platformsTitle,
    platforms: p?.explainer?.platforms || (content as any)[locale]?.platforms || content.en.platforms,
    ctaTitle: p?.explainer?.ctaTitle || (content as any)[locale]?.ctaTitle || content.en.ctaTitle,
    ctaDescription: p?.explainer?.ctaDescription || (content as any)[locale]?.ctaDescription || content.en.ctaDescription,
    ctaButton: p?.explainer?.ctaButton || (content as any)[locale]?.ctaButton || content.en.ctaButton,
    faqTitle: p?.explainer?.faqTitle || (content as any)[locale]?.faqTitle || content.en.faqTitle,
    faqs: p?.explainer?.faqs || (content as any)[locale]?.faqs || content.en.faqs,
  }

  return (
    <section id="about-service" className="relative bg-gradient-to-b from-lavender via-lavender/30 to-lavender dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
            {currentT.mainTitle}
          </h2>
          <p className="text-lg md:text-xl text-pink-500 font-medium">
            {currentT.mainSubtitle}
          </p>
        </header>

        <article className="mb-16">
          <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-4xl mx-auto text-center">
            {currentT.introParagraph}
          </p>
        </article>

        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-10 text-center">
            {currentT.whatWeOfferTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentT.services.map((service: any, index: number) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <div className="relative h-full rounded-2xl transition-all duration-300 hover:-translate-y-2">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <div className="relative h-full flex flex-col p-6 rounded-[1.1rem] border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 z-10 bg-lavender dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                    <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-pink-500 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-pink-500/20"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {currentT.whyChooseTitle}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {currentT.whyChoosePoints.map((point: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 group"
              >
                <CheckCircle className="w-5 h-5 text-white/90 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-white/90">{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-10 text-center">
            {currentT.platformsTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {currentT.platforms.map((platform: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative rounded-xl transition-all duration-300 hover:-translate-y-1">
                  <GlowingEffect
                    spread={30}
                    glow={true}
                    disabled={false}
                    proximity={50}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <div className="relative p-4 text-center rounded-[0.7rem] border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 z-10 bg-lavender dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                    <h4 className="font-bold text-neutral-900 dark:text-white text-sm mb-1 group-hover:text-pink-500 transition-colors">
                      {platform.name}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {platform.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-10 text-center">
            {currentT.faqTitle}
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {currentT.faqs.map((faq: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group/faq"
              >
                <div className="relative rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <GlowingEffect
                    spread={35}
                    glow={true}
                    disabled={false}
                    proximity={60}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <details className="relative bg-lavender dark:bg-neutral-900 rounded-[1rem] shadow-md border border-neutral-100 dark:border-neutral-800 z-10 overflow-hidden">
                    <summary className="p-6 cursor-pointer font-semibold text-neutral-900 dark:text-white flex items-center justify-between list-none hover:text-pink-500 transition-colors">
                      {faq.question}
                      <span className="text-pink-500 group-open/faq:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-6 pb-6 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center bg-neutral-900 dark:bg-lavender/5 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {currentT.ctaTitle}
          </h3>
          <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
            {currentT.ctaDescription}
          </p>
          <Link
            href={localePath(locale, '/contact')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
          >
            {currentT.ctaButton}
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default function SocialMediaClient({ t }: { t?: any }) {
  return (
    <>
      <Hero t={t} />
    </>
  )
}
