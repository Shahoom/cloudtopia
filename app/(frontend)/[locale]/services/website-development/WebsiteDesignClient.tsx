'use client'

import Link from "next/link"
import { LayoutGroup, motion } from "framer-motion"
import { TextRotate } from "@/components/ui/text-rotate"
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"
import { ScrollHeroSection } from "@/components/ui/scroll-hero-section"
import { ServiceExplanationSection } from "@/components/ui/service-explanation-section"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { localePath } from "@/lib/i18n/url"
import DetailedServicesSection from "@/components/services/DetailedServicesSection"

const exampleImages = [
  {
    url: "/images/services/website-design/1.avif",
    title: "Website Design Example 1",
  },
  {
    url: "/images/services/website-design/2.avif",
    title: "Website Design Example 2",
  },
  {
    url: "/images/services/website-design/3.avif",
    title: "Website Design Example 3",
  },
  {
    url: "/images/services/website-design/4.avif",
    title: "Website Design Example 4",
  },
  {
    url: "/images/services/website-design/5.avif",
    title: "Website Design Example 5",
  },
  {
    url: "/images/services/website-design/6.jpg",
    title: "Website Design Example 6",
  },
]

function WebDesignHero({ t }: { t: any }) {
  const { locale, dir } = useLanguage()
  const p = t.services?.websiteDesignPage || t.websiteDesignPage

  const texts = p?.hero?.rotatingTexts || [
    "amazing",
    "modern",
    "professional",
    "stunning",
    "fast",
    "unique",
    "awesome",
    "responsive",
  ]

  const isRTL = dir === 'rtl'

  return (
    <section className="w-full min-h-screen overflow-hidden flex flex-col items-center justify-center relative bg-lavender">
      <Floating sensitivity={-0.5} className="h-full">
        <FloatingElement
          depth={0.5}
          className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
        >
          <motion.img
            src={exampleImages[0].url}
            alt={exampleImages[0].title}
            className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
        >
          <motion.img
            src={exampleImages[1].url}
            alt={exampleImages[1].title}
            className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 transition-transform -rotate-12 shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={4}
          className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
        >
          <motion.img
            src={exampleImages[2].url}
            alt={exampleImages[2].title}
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 transition-transform shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={2}
          className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
        >
          <motion.img
            src={exampleImages[3].url}
            alt={exampleImages[3].title}
            className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 transition-transform shadow-2xl rotate-[6deg] rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
        >
          <motion.img
            src={exampleImages[4].url}
            alt={exampleImages[4].title}
            className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 transition-transform shadow-2xl rotate-[19deg] rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          />
        </FloatingElement>
      </Floating>

      <div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-bold tracking-tight space-y-1 md:space-y-4"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span className="text-slate-900">
            {p?.hero?.prefix || (locale === 'ar' ? "اجعل موقعك" : "Make your")}
          </span>
          <LayoutGroup>
            <motion.span layout className="flex whitespace-pre justify-center" dir={isRTL ? "rtl" : "ltr"}>
              <motion.span
                layout
                className="flex whitespace-pre text-slate-900"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                {p?.hero?.suffix ? `${p.hero.suffix} ` : (locale === 'ar' ? "الويب " : "website ")}
              </motion.span>
              <TextRotate
                texts={texts}
                mainClassName="overflow-hidden px-2 sm:px-3 text-primary-600 py-0 pb-2 md:pb-4 rounded-xl"
                splitBy="words"
                staggerDuration={0.02}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-lg md:text-xl lg:text-2xl text-center text-slate-600 pt-4 sm:pt-8 md:pt-10 lg:pt-12 max-w-2xl"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          {p?.hero?.description || (locale === 'ar'
            ? "نصمم ونطور مواقع إلكترونية احترافية تعكس هويتك التجارية وتحول الزوار إلى عملاء. تصاميم عصرية، سريعة، ومتجاوبة مع جميع الأجهزة."
            : false
              ? "Marka kimliğinizi yansıtan ve ziyaretçileri müşteriye dönüştüren profesyonel web siteleri tasarlıyor ve geliştiriyoruz. Tüm cihazlar için modern, hızlı ve duyarlı tasarımlar."
              : "We design and develop professional websites that reflect your brand identity and convert visitors into customers. Modern, fast, and responsive designs for all devices."
          )}
        </motion.p>

        <div className="flex flex-row justify-center space-x-4 rtl:space-x-reverse items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20">
          <motion.button
            className="text-base sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-white bg-primary-600 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl hover:bg-primary-700 transition-colors"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link href={localePath(locale, '/contact')}>
              {p?.hero?.ctaStart || (isRTL ? "ابدأ مشروعك" : "Start Your Project")} <span className={`font-serif ${isRTL ? 'mr-1' : 'ml-1'}`}>{isRTL ? '←' : '→'}</span>
            </Link>
          </motion.button>
          <motion.button
            className="text-base sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-primary-600 bg-lavender border-2 border-primary-200 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-lg hover:bg-lavender transition-colors"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link href={localePath(locale, '/projects')}>
              {p?.hero?.ctaWork || (isRTL ? "شاهد أعمالنا" : "View Our Work")}
            </Link>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

function WebDesignScrollSection({ t }: { t: any }) {
  const { dir } = useLanguage()
  const p = t.services?.websiteDesignPage || t.websiteDesignPage
  const isRTL = dir === 'rtl'

  return (
    <ScrollHeroSection
      items={p?.scrollSection?.items || (isRTL ? ['نصمم.', 'نطور.', 'نبني.', 'نطلق.', 'ننمي.'] : ['design.', 'develop.', 'build.', 'launch.', 'grow.'])}
      prefixText={p?.scrollSection?.prefix || (isRTL ? 'نحن' : 'We')}
      isRTL={isRTL}
      theme="light"
      animate={true}
      hue={220}
      startVh={25}
    />
  )
}

function WebDesignServiceSection() {
  const { locale, dir } = useLanguage()
  const isRTL = dir === 'rtl'

  return (
    <ServiceExplanationSection
      isRTL={isRTL}
      locale={locale}
    />
  )
}

export default function WebsiteDesignClient({ t: pageT }: { t?: any }) {
  const { t: contextT, locale } = useLanguage()
  const t = pageT || contextT

  return (
    <div className="relative w-full overflow-hidden bg-lavender text-neutral-900">
      {/* Hero Section */}
      <WebDesignHero t={t} />

      {/* Scroll Hero Section */}
      <WebDesignScrollSection t={t} />

      {/* Service Explanation Section */}
      <WebDesignServiceSection />

      <DetailedServicesSection pillarSlug="website-development" locale={locale === 'ar' ? 'ar' : 'en'} />
    </div>
  )
}
