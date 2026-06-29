import { test } from 'node:test'
import assert from 'node:assert/strict'
import { digitalPresenceGroups, digitalPresencePillars } from '../lib/services/digital-presence'
import { dpSubServiceContent, getDigitalPresenceSubServicesByPillar } from '../lib/services/digital-presence-content'

const dpSlugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/\([^)]*\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

test('deleted pillars are gone', () => {
  const slugs = digitalPresencePillars.map((p) => p.slug)
  for (const dead of ['local-seo-discoverability', 'customer-support-automations', 'customer-experience-portals', 'review-reputation-management', 'analytics-performance-reporting']) {
    assert.ok(!slugs.includes(dead), `pillar ${dead} should be deleted`)
  }
})

test('groups are the expected three + journey order', () => {
  const groupSlugs = digitalPresenceGroups.map((g) => g.slug)
  assert.deepEqual(groupSlugs, ['core-foundation', 'visibility-discoverability', 'communication-engagement'])
})

test('Growth & Engagement rename applied', () => {
  const g = digitalPresenceGroups.find((x) => x.slug === 'communication-engagement')!
  assert.equal(g.name.en, 'Growth & Engagement')
  assert.ok(g.pillars.some((p) => p.slug === 'social-media-management'))
  assert.ok(g.pillars.some((p) => p.slug === 'content-marketing-authority'))
})

test('AEO & GEO exist with no sub-services', () => {
  for (const slug of ['answer-engine-optimization', 'generative-engine-optimization']) {
    const p = digitalPresencePillars.find((x) => x.slug === slug)
    assert.ok(p, `${slug} pillar must exist`)
    assert.equal(p!.subServices.length, 0, `${slug} must have no sub-services`)
  }
})

test('every kept DP sub-service has generated content (no dangling names)', () => {
  for (const pillar of digitalPresencePillars) {
    for (const name of pillar.subServices) {
      const slug = dpSlugify(name)
      assert.ok(dpSubServiceContent[slug], `missing content for "${name}" (${slug}) in pillar ${pillar.slug}`)
      assert.equal(dpSubServiceContent[slug].pillarSlug, pillar.slug, `${slug} content.pillarSlug should be ${pillar.slug}`)
    }
  }
})

test('no orphan content points at a deleted/unknown pillar', () => {
  const known = new Set(digitalPresencePillars.map((p) => p.slug))
  for (const s of Object.values(dpSubServiceContent)) {
    assert.ok(known.has(s.pillarSlug), `content ${s.slug} references unknown pillar ${s.pillarSlug}`)
  }
})
