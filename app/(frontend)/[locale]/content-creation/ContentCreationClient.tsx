'use client'

import React from "react"
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { DynamicTextSlider } from "@/components/ui/dynamic-text-slider"
import { MagicText } from "@/components/ui/magic-text"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import ContentBlock from "@/components/ui/content-block"
import { ParticleTextEffect } from "@/components/ui/interactive-text-particle"
import { ServicePricingSection } from "@/components/services/ServicePricingSection"

const localContent = {
  en: {
    title: "Professional",
    sliderText: "Content Creation",
    subtitle: "We craft compelling visuals, videos, and copy that captivate your audience. From social media graphics to brand storytelling, we bring your ideas to life with creativity and precision.",
    magicText: "Transform your brand with premium content creation services. We design stunning social media graphics, produce engaging video content, write compelling copy, and develop strategic content marketing that drives traffic, boosts engagement, and converts visitors into loyal customers. Your story deserves to be told beautifully.",
    generateTitle: "Why Choose Our Content Creation?",
    generateText: "Every piece of content we create is strategically designed to resonate with your target audience. From eye-catching Instagram posts to professional LinkedIn articles, from viral TikTok videos to SEO-optimized blog content — we deliver creative solutions that amplify your brand voice and drive measurable results.",
    particleText: "world of creativity",
  },
  ar: {
    title: "إنشاء محتوى",
    sliderText: "احترافي",
    subtitle: "نصنع محتوى بصري وفيديوهات ونصوص جذابة تأسر جمهورك. من تصاميم السوشيال ميديا إلى قصص العلامة التجارية، نحول أفكارك إلى واقع بإبداع ودقة.",
    magicText: "حوّل علامتك التجارية مع خدمات إنشاء المحتوى الاحترافية. نصمم رسومات سوشيال ميديا مذهلة، وننتج محتوى فيديو جذاب، ونكتب نصوصاً مقنعة، ونطور استراتيجيات تسويق محتوى تجذب الزوار، وتعزز التفاعل، وتحول الزائرين إلى عملاء دائمين. قصتك تستحق أن تُروى بجمال.",
    generateTitle: "لماذا تختار خدمات إنشاء المحتوى لدينا؟",
    generateText: "كل قطعة محتوى نصنعها مصممة استراتيجياً لتتواصل مع جمهورك المستهدف. من منشورات انستغرام الجذابة إلى مقالات لينكد إن الاحترافية، ومن فيديوهات تيك توك الفيروسية إلى محتوى المدونات المحسّن لمحركات البحث — نقدم حلولاً إبداعية تعزز صوت علامتك التجارية وتحقق نتائج ملموسة.",
    particleText: "عالم من الإبداع",
  },
}

export default function ContentCreationClient({ t: pageT }: { t?: any }) {
  const { locale, dir, t: contextT } = useLanguage()
  const t = pageT || contextT
  const p = t?.services?.contentCreationPage || t?.contentCreationPage

  const currentContent = {
    title: p?.hero?.title || (localContent as any)[locale]?.title || localContent.en.title,
    sliderText: p?.hero?.sliderText || (localContent as any)[locale]?.sliderText || localContent.en.sliderText,
    subtitle: p?.hero?.subtitle || (localContent as any)[locale]?.subtitle || localContent.en.subtitle,
    magicText: p?.magicText || (localContent as any)[locale]?.magicText || localContent.en.magicText,
    generateTitle: p?.generateTitle || (localContent as any)[locale]?.generateTitle || localContent.en.generateTitle,
    generateText: p?.generateText || (localContent as any)[locale]?.generateText || localContent.en.generateText,
    particleText: p?.particleText || (localContent as any)[locale]?.particleText || localContent.en.particleText,
  }

  // Vibrant gradient colors for the particle effect
  const particleColors = ['a855f7', 'd946ef', 'ec4899', 'f472b6', 'f9a8d4', 'fce7f3']

  return (
    <main className="min-h-screen bg-lavender dark:bg-neutral-950" dir={dir} lang={locale}>
      {/* Section 1: Hero with Dynamic Text Slider */}
      <DynamicTextSlider
        title={currentContent.title}
        sliderText={currentContent.sliderText}
        subtitle={currentContent.subtitle}
        locale={locale}
      />

      {/* Section 2: Magic Text - Scroll Reveal Content */}
      <section className="relative w-full min-h-[50vh] bg-gradient-to-b from-lavender to-lavender dark:from-neutral-950 dark:to-neutral-900 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <MagicText
            text={currentContent.magicText}
            className="text-gray-900 dark:text-white"
          />
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <span className="text-sm">{p?.common?.scrollDown || (locale === 'ar' ? 'مرر للأسفل' : 'Scroll Down')}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Section 3: Text Generate Effect */}
      <section className="relative w-full bg-lavender dark:bg-neutral-900 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {currentContent.generateTitle}
          </h2>
          <TextGenerateEffect
            words={currentContent.generateText}
            className="text-gray-700 dark:text-gray-300"
            duration={0.8}
            filter={true}
          />
        </div>
      </section>

      {/* Section 4: Content Block - Services & Features */}
      <ContentBlock locale={locale} />

      {/* Section 5: Interactive Particle Text Effect (Final Section) */}
      <section className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] bg-lavender dark:bg-lavender">
        <ParticleTextEffect
          text={currentContent.particleText}
          className="absolute inset-0"
          colors={particleColors}
          animationForce={70}
          particleDensity={4}
          fontFamily={locale === 'ar' ? 'Changa, sans-serif' : 'Verdana, sans-serif'}
        />
      </section>

      <ServicePricingSection service="content-creation" locale={locale === 'ar' ? 'ar' : 'en'} />
    </main>
  )
}
