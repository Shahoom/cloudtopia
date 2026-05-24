"use client"

import { useRef, useState, useEffect } from "react"
import { ConnoisseurStackInteractor } from "@/components/ui/connoisseur-stack-interactor"
import { QRMenuServiceSection } from "@/components/ui/qr-menu-service-section"
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from "@/components/ui/animated-gallery"
import { Button } from "@/components/ui/Button"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { localePath } from "@/lib/i18n/url"
import { QrCode, Smartphone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// All images combined for mobile carousel - mix of restaurants and digital menus
const ALL_IMAGES = [
  "/images/services/restaurant-qr-menu/1.webp",
  "/images/services/restaurant-qr-menu/2.avif",
  "/images/services/restaurant-qr-menu/3.webp",
  "/images/services/restaurant-qr-menu/4.avif",
  "/images/services/restaurant-qr-menu/5.avif",
  "/images/services/restaurant-qr-menu/6.avif",
  "/images/services/restaurant-qr-menu/7.avif",
  "/images/services/restaurant-qr-menu/8.avif",
  "/images/services/restaurant-qr-menu/9.avif",
]

// Column 1: Mix of restaurant and digital
const IMAGES_1 = [
  "/images/services/restaurant-qr-menu/1.webp",
  "/images/services/restaurant-qr-menu/2.avif",
  "/images/services/restaurant-qr-menu/3.webp",
  "/images/services/restaurant-qr-menu/4.avif",
]

// Column 2: Digital focus
const IMAGES_2 = [
  "/images/services/restaurant-qr-menu/5.avif",
  "/images/services/restaurant-qr-menu/6.avif",
  "/images/services/restaurant-qr-menu/7.avif",
  "/images/services/restaurant-qr-menu/8.avif",
]

// Column 3: Mix of both
const IMAGES_3 = [
  "/images/services/restaurant-qr-menu/9.avif",
  "/images/services/restaurant-qr-menu/1.webp",
  "/images/services/restaurant-qr-menu/2.avif",
  "/images/services/restaurant-qr-menu/3.webp",
]

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
  tr: {
    badge: "Restoran QR Menü Sistemleri",
    title1: "Restoran",
    titleHighlight: "Deneyiminizi",
    title2: "Dijitalle Dönüştürün",
    description: "Temassız dijital menülerle yemek deneyiminizi bir üst seviyeye taşıyın. QR kod çözümlerimiz restoranların maliyetlerini düşürmesine, menülerini anında güncellemesine ve müşterilerin sevdiği modern bir dokunuş sunmasına yardımcı olur.",
    cta: "Hemen Başlayın",
    learnMore: "Daha Fazla Bilgi",
  }
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
  tr: [
    {
      num: "01",
      name: "QR Menüler",
      clipId: "clip-original",
      image: "/images/services/restaurant-qr-menu/1.webp"
    },
    {
      num: "02",
      name: "Dijital Sipariş",
      clipId: "clip-hexagons",
      image: "/images/services/restaurant-qr-menu/5.avif"
    },
    {
      num: "03",
      name: "Akıllı Masalar",
      clipId: "clip-pixels",
      image: "/images/services/restaurant-qr-menu/8.avif"
    }
  ]
}

// Mobile Image Carousel Component
function MobileImageCarousel() {
  const { locale } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % ALL_IMAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[50vh] overflow-hidden rounded-2xl mx-auto max-w-[90vw]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-lavender via-transparent to-transparent z-10 pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={ALL_IMAGES[currentIndex]}
          alt={locale === 'ar' ? 'مطعم' : (locale === 'tr' ? 'Restoran' : 'Restaurant')}
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
        />
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {ALL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
              ? "bg-lavender w-6"
              : "bg-lavender/60"
              }`}
          />
        ))}
      </div>
    </div>
  )
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
  
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
            <Link href={localePath(locale, '/contact')}>
              <Button className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                {currentContent.cta} <Smartphone className="w-4 h-4" />
              </Button>
            </Link>
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

        {/* Mobile: Auto-sliding Carousel */}
        {isMobile && (
          <div className="relative z-20 py-8">
            <MobileImageCarousel />
          </div>
        )}

        {/* Desktop: 3D Scrolling Gallery */}
        {!isMobile && (
          <ContainerScroll className="relative h-[350vh] -mt-12">
            <ContainerSticky className="h-svh">
              <GalleryContainer>
                <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
                  {IMAGES_1.map((imageUrl, index) => (
                    <img
                      key={index}
                      className="aspect-video block h-auto max-h-full w-full rounded-lg object-cover shadow-lg"
                      src={imageUrl}
                      alt={locale === 'ar' ? 'تصميم داخلي للمطعم' : (locale === 'tr' ? 'Restoran iç mekanı' : 'Restaurant interior')}
                    />
                  ))}
                </GalleryCol>
                <GalleryCol className="mt-[-50%]" yRange={["15%", "5%"]}>
                  {IMAGES_2.map((imageUrl, index) => (
                    <img
                      key={index}
                      className="aspect-video block h-auto max-h-full w-full rounded-lg object-cover shadow-lg"
                      src={imageUrl}
                      alt={locale === 'ar' ? 'تجربة القائمة الرقمية' : (locale === 'tr' ? 'Dijital menü deneyimi' : 'Digital menu experience')}
                    />
                  ))}
                </GalleryCol>
                <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
                  {IMAGES_3.map((imageUrl, index) => (
                    <img
                      key={index}
                      className="aspect-video block h-auto max-h-full w-full rounded-lg object-cover shadow-lg"
                      src={imageUrl}
                      alt={locale === 'ar' ? 'تقنية المطاعم' : (locale === 'tr' ? 'Restoran teknolojisi' : 'Restaurant technology')}
                    />
                  ))}
                </GalleryCol>
              </GalleryContainer>
            </ContainerSticky>
          </ContainerScroll>
        )}
      </div>

      {/* Interactive Menu Section */}
      <ConnoisseurStackInteractor items={currentItems} />

      {/* Service Explanation Section - SEO Optimized */}
      <QRMenuServiceSection isRTL={isRTL} locale={locale} />
    </main>
  )
}
