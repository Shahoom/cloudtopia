'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ContainerScroll,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from '@/components/ui/animated-gallery'
import { useDeferredInteraction } from '@/hooks/useDeferredInteraction'

const MotionImage = motion.create(Image)

// All images combined for mobile carousel - mix of restaurants and digital menus
const ALL_IMAGES = [
  '/images/services/restaurant-qr-menu/1.webp',
  '/images/services/restaurant-qr-menu/2.avif',
  '/images/services/restaurant-qr-menu/3.webp',
  '/images/services/restaurant-qr-menu/4.avif',
  '/images/services/restaurant-qr-menu/5.avif',
  '/images/services/restaurant-qr-menu/6.avif',
  '/images/services/restaurant-qr-menu/7.avif',
  '/images/services/restaurant-qr-menu/8.avif',
  '/images/services/restaurant-qr-menu/9.avif',
]

// Column 1: Mix of restaurant and digital
const IMAGES_1 = [
  '/images/services/restaurant-qr-menu/1.webp',
  '/images/services/restaurant-qr-menu/2.avif',
  '/images/services/restaurant-qr-menu/3.webp',
  '/images/services/restaurant-qr-menu/4.avif',
]

// Column 2: Digital focus
const IMAGES_2 = [
  '/images/services/restaurant-qr-menu/5.avif',
  '/images/services/restaurant-qr-menu/6.avif',
  '/images/services/restaurant-qr-menu/7.avif',
  '/images/services/restaurant-qr-menu/8.avif',
]

// Column 3: Mix of both
const IMAGES_3 = [
  '/images/services/restaurant-qr-menu/9.avif',
  '/images/services/restaurant-qr-menu/1.webp',
  '/images/services/restaurant-qr-menu/2.avif',
  '/images/services/restaurant-qr-menu/3.webp',
]

function MobileImageCarousel({ locale }: { locale: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let intervalId: number | null = null

    const clear = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId)
        intervalId = null
      }
    }

    const schedule = () => {
      clear()
      if (document.visibilityState !== 'visible') return
      intervalId = window.setInterval(() => {
        setCurrentIndex((prev: number) => (prev + 1) % ALL_IMAGES.length)
      }, 3000)
    }

    schedule()
    document.addEventListener('visibilitychange', schedule)
    return () => {
      document.removeEventListener('visibilitychange', schedule)
      clear()
    }
  }, [])

  return (
    <div className="relative w-full h-[50vh] overflow-hidden rounded-2xl mx-auto max-w-[90vw]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-lavender via-transparent to-transparent z-10 pointer-events-none" />

      <AnimatePresence mode="wait">
        <MotionImage
          key={currentIndex}
          src={ALL_IMAGES[currentIndex]}
          alt={locale === 'ar' ? 'مطعم' : 'Restaurant'}
          fill
          sizes="90vw"
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
              ? 'bg-lavender w-6'
              : 'bg-lavender/60'
              }`}
          />
        ))}
      </div>
    </div>
  )
}

function DesktopGallery({ locale }: { locale: string }) {
  return (
    <ContainerScroll className="relative h-[350vh] -mt-12">
      <ContainerSticky className="h-svh">
        <GalleryContainer>
          <GalleryCol yRange={['-10%', '2%']} className="-mt-2">
            {IMAGES_1.map((imageUrl, index) => (
              <img
                key={index}
                loading="lazy"
                decoding="async"
                className="aspect-video block h-auto max-h-full w-full rounded-lg object-cover shadow-lg"
                src={imageUrl}
                alt={locale === 'ar' ? 'تصميم داخلي للمطعم' : 'Restaurant interior'}
              />
            ))}
          </GalleryCol>
          <GalleryCol className="mt-[-50%]" yRange={['15%', '5%']}>
            {IMAGES_2.map((imageUrl, index) => (
              <img
                key={index}
                loading="lazy"
                decoding="async"
                className="aspect-video block h-auto max-h-full w-full rounded-lg object-cover shadow-lg"
                src={imageUrl}
                alt={locale === 'ar' ? 'تجربة القائمة الرقمية' : 'Digital menu experience'}
              />
            ))}
          </GalleryCol>
          <GalleryCol yRange={['-10%', '2%']} className="-mt-2">
            {IMAGES_3.map((imageUrl, index) => (
              <img
                key={index}
                loading="lazy"
                decoding="async"
                className="aspect-video block h-auto max-h-full w-full rounded-lg object-cover shadow-lg"
                src={imageUrl}
                alt={locale === 'ar' ? 'تقنية المطاعم' : 'Restaurant technology'}
              />
            ))}
          </GalleryCol>
        </GalleryContainer>
      </ContainerSticky>
    </ContainerScroll>
  )
}

export function RestaurantQRHeroGallery({ locale }: { locale: string }) {
  const enhancementsActive = useDeferredInteraction()
  const [isMobileViewport, setIsMobileViewport] = useState<boolean | null>(null)

  useEffect(() => {
    if (!enhancementsActive) return
    setIsMobileViewport(window.matchMedia('(max-width: 767px)').matches)
  }, [enhancementsActive])

  if (!enhancementsActive || isMobileViewport === null) {
    return (
      <div className="relative z-20 py-8">
        <div className="relative w-full overflow-hidden rounded-2xl mx-auto max-w-[90vw]">
          <Image
            src="/images/services/restaurant-qr-menu/1.webp"
            alt="Restaurant QR menu"
            width={1275}
            height={800}
            sizes="(max-width: 767px) 90vw, 100vw"
            quality={65}
            fetchPriority="high"
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
      </div>
    )
  }

  return isMobileViewport ? (
    <div className="relative z-20 py-8">
      <MobileImageCarousel locale={locale} />
    </div>
  ) : (
    <DesktopGallery locale={locale} />
  )
}
