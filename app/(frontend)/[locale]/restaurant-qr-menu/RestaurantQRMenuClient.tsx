"use client"

import { ConnoisseurStackInteractor } from "@/components/ui/connoisseur-stack-interactor"
import { QRMenuServiceSection } from "@/components/ui/qr-menu-service-section"
import { ContainerAnimated, ContainerStagger } from "@/components/ui/animated-gallery"
import { Button } from "@/components/ui/Button"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { QrCode, Smartphone, ArrowRight } from "lucide-react"
import DetailedServicesSection from "@/components/services/DetailedServicesSection"
import { RestaurantQRHeroGallery } from "./RestaurantQRHeroGallery"

const localContent = {
  en: {
    badge: "Restaurant QR Menu Systems",
    title1: "Transform Your",
    titleHighlight: "Restaurant",
    title2: "Experience",
    description: "Elevate your dining experience with contactless digital menus. Our QR code solutions help restaurants reduce costs, update menus instantly, and provide a modern touch that customers love.",
    cta: "Get Started",
    learnMore: "Learn More",
  },
  ar: {
    badge: "أنظمة قوائم QR للمطاعم",
    title1: "حوّل تجربة",
    titleHighlight: "مطعمك",
    title2: "الرقمية",
    description: "ارتقِ بتجربة تناول الطعام مع قوائم رقمية بدون تلامس. تساعد حلول رمز QR الخاصة بنا المطاعم على تقليل التكاليف وتحديث القوائم فورياً وتوفير لمسة عصرية يحبها العملاء.",
    cta: "ابدأ الآن",
    learnMore: "اعرف المزيد",
  },
}

const localMenuItems = {
  en: [
    {
      num: "01",
      name: "QR Menus",
      clipId: "clip-original",
      image: "/images/services/restaurant-qr-menu/1.webp"
    },
    {
      num: "02",
      name: "Digital Orders",
      clipId: "clip-hexagons",
      image: "/images/services/restaurant-qr-menu/5.avif"
    },
    {
      num: "03",
      name: "Smart Tables",
      clipId: "clip-pixels",
      image: "/images/services/restaurant-qr-menu/8.avif"
    }
  ],
  ar: [
    {
      num: "٠١",
      name: "قوائم QR",
      clipId: "clip-original",
      image: "/images/services/restaurant-qr-menu/1.webp"
    },
    {
      num: "٠٢",
      name: "طلبات رقمية",
      clipId: "clip-hexagons",
      image: "/images/services/restaurant-qr-menu/5.avif"
    },
    {
      num: "٠٣",
      name: "طاولات ذكية",
      clipId: "clip-pixels",
      image: "/images/services/restaurant-qr-menu/8.avif"
    }
  ],
}

export default function RestaurantQRMenuClient({ t: pageT }: { t?: any }) {
  const { locale, dir, t: contextT } = useLanguage()
  const isRTL = dir === 'rtl'
  const t = pageT || contextT
  const p = t?.services?.restaurantPage || t?.restaurantPage || t?.restaurantQRMenuPage

  const currentContent = {
    badge: p?.hero?.badge || (localContent as any)[locale]?.badge || localContent.en.badge,
    title1: p?.hero?.title1 || (localContent as any)[locale]?.title1 || localContent.en.title1,
    titleHighlight: p?.hero?.titleHighlight || (localContent as any)[locale]?.titleHighlight || localContent.en.titleHighlight,
    title2: p?.hero?.title2 || (localContent as any)[locale]?.title2 || localContent.en.title2,
    description: p?.hero?.description || (localContent as any)[locale]?.description || localContent.en.description,
    cta: p?.hero?.cta || (localContent as any)[locale]?.cta || localContent.en.cta,
    learnMore: p?.hero?.learnMore || (localContent as any)[locale]?.learnMore || localContent.en.learnMore,
  }

  const currentItems = p?.menuItems || (localMenuItems as any)[locale] || localMenuItems.en
  

  return (
    <main className="flex-grow" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <div className="relative bg-lavender">
        {/* Header Content */}
        <ContainerStagger className="relative z-[9999] place-self-center px-4 sm:px-6 pt-16 sm:pt-20 md:pt-28 text-center">
          <ContainerAnimated>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 shadow-lg">
              <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="font-bold text-white text-xs sm:text-sm">{currentContent.badge}</span>
            </div>
          </ContainerAnimated>

          <ContainerAnimated>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900">
              {currentContent.title1}{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                {currentContent.titleHighlight}
              </span>
            </h1>
          </ContainerAnimated>

          <ContainerAnimated>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900">
              {currentContent.title2}
            </h2>
          </ContainerAnimated>

          <ContainerAnimated className="my-4 sm:my-6">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto px-2">
              {currentContent.description}
            </p>
          </ContainerAnimated>

          <ContainerAnimated className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8 md:mb-0">
            <a href={`/api/whatsapp?locale=${locale}`}>
              <Button className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                {currentContent.cta} <Smartphone className="w-4 h-4" />
              </Button>
            </a>
            <Button variant="outline" className="gap-2 border-slate-300 text-slate-700 hover:bg-lavender px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
              {currentContent.learnMore} <ArrowRight className="w-4 h-4" />
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        {/* Gradient Blur Background */}
        <div
          className="pointer-events-none absolute z-10 h-[70vh] w-full opacity-30"
          style={{
            background: "linear-gradient(to right, #f97316, #ef4444, #ea580c)",
            filter: "blur(100px)",
            mixBlendMode: "multiply",
          }}
        />

        <RestaurantQRHeroGallery locale={locale} />
      </div>

      {/* Interactive Menu Section */}
      <ConnoisseurStackInteractor items={currentItems} />

      {/* Service Explanation Section - SEO Optimized */}
      <QRMenuServiceSection isRTL={isRTL} locale={locale} />

      <DetailedServicesSection pillarSlug="website-development" locale={locale === 'ar' ? 'ar' : 'en'} />
    </main>
  )
}
