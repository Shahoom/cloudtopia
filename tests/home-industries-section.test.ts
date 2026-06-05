import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { homeIndustrySlides } from '../components/home/industryData.ts'

test('home industry slider exposes the required bilingual categories', () => {
  assert.equal(homeIndustrySlides.length, 10)
  assert.deepEqual(
    homeIndustrySlides.map((industry) => industry.id),
    ['finance', 'healthcare', 'education', 'logistics', 'travel', 'real-estate', 'entertainment', 'ecommerce', 'restaurants', 'startups'],
  )

  for (const industry of homeIndustrySlides) {
    assert.ok(industry.name.en)
    assert.ok(industry.name.ar)
    assert.ok(industry.description.en)
    assert.ok(industry.description.ar)
    assert.ok(industry.features.length >= 4)
    assert.ok(industry.features.length <= 6)
    assert.ok(industry.exploreHref.startsWith('/industries'))
    assert.equal(industry.caseStudiesHref, '/projects')
    assert.ok(industry.visual.alt.en)
    assert.ok(industry.visual.alt.ar)
    assert.ok(industry.visual.badge.en)
    assert.ok(industry.visual.badge.ar)
    assert.ok(!/AI \+ CRM/i.test(industry.visual.badge.en))
    assert.ok(['contain', 'cover'].includes(industry.visual.desktopFit || 'contain'))
    assert.ok(['contain', 'cover'].includes(industry.visual.mobileFit || 'contain'))
    assert.ok(industry.visual.desktopImage)
    assert.ok(industry.visual.mobileImage)
    assert.ok(
      existsSync(join(process.cwd(), 'public', industry.visual.desktopImage.replace(/^\//, ''))),
      `${industry.id} desktop image is missing`,
    )
    assert.ok(
      existsSync(join(process.cwd(), 'public', industry.visual.mobileImage.replace(/^\//, ''))),
      `${industry.id} mobile image is missing`,
    )
  }
})
