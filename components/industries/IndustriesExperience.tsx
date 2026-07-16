'use client'

import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { IndustriesPageContent } from '@/lib/seo/industries-page'
import { IndustryAtlasHero } from './IndustryAtlasHero'

type IndustriesExperienceProps = {
  content: IndustriesPageContent
  locale: string
}

export function IndustriesExperience({ content, locale }: IndustriesExperienceProps) {
  const [selectedSlug, setSelectedSlug] = useState('healthcare')
  const shouldReduceMotion = useReducedMotion()
  const selected = content.industries.find((industry) => industry.slug === selectedSlug) || content.industries[0]
  const defaultSlug = content.industries[0]?.slug || 'healthcare'
  const industrySlugs = useMemo(
    () => new Set(content.industries.map((industry) => industry.slug)),
    [content.industries],
  )

  useEffect(() => {
    function selectFromUrl() {
      const query = new URLSearchParams(window.location.search)
      const slug = query.get('industry')
      if (!slug) {
        setSelectedSlug(defaultSlug)
        return
      }
      if (!industrySlugs.has(slug)) {
        const url = new URL(window.location.href)
        url.searchParams.delete('industry')
        window.history.replaceState(window.history.state, '', url)
        setSelectedSlug(defaultSlug)
        return
      }
      setSelectedSlug(slug)
    }

    selectFromUrl()
    window.addEventListener('popstate', selectFromUrl)
    return () => window.removeEventListener('popstate', selectFromUrl)
  }, [defaultSlug, industrySlugs])

  function updateUrl(slug: string) {
    const url = new URL(window.location.href)
    url.searchParams.set('industry', slug)
    window.history.pushState({ industry: slug }, '', url)
  }

  function selectAtlasIndustry(slug: string) {
    if (slug === selectedSlug) return
    setSelectedSlug(slug)
    updateUrl(slug)
  }

  return (
    <>
      <IndustryAtlasHero
        content={content}
        locale={locale}
        selected={selected}
        onSelect={selectAtlasIndustry}
        reducedMotion={shouldReduceMotion}
      />
    </>
  )
}
