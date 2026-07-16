import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import test from 'node:test'

const ROOT = path.resolve(import.meta.dirname, '..')
const filePath = (file: string) => path.join(ROOT, file)
const read = (file: string) => {
  const absolute = filePath(file)
  return fs.existsSync(absolute) ? fs.readFileSync(absolute, 'utf8') : ''
}

test('industries hub content is complete in English and Arabic', async () => {
  const modulePath = filePath('lib/seo/industries-page.ts')
  assert.ok(fs.existsSync(modulePath), 'industries page content module should exist')

  const { getIndustriesPageContent } = await import(pathToFileURL(modulePath).href)
  for (const locale of ['en', 'ar'] as const) {
    const content = getIndustriesPageContent(locale)
    assert.equal(content.locale, locale)
    assert.equal(content.industries.length, 13)
    assert.equal(content.featuredStories.length, 6)
    assert.ok(content.guide.length >= 3)
    assert.ok(content.faqs.length >= 6)
    assert.ok(content.hero.description.length > 120)
  }

  const arabicContent = getIndustriesPageContent('ar')
  assert.match(arabicContent.hero.description, /نحوّل تحديات قطاعك إلى تجربة رقمية/)
  assert.doesNotMatch(arabicContent.hero.description, /ضغط القطاع|القطاع النشط/)
})

test('industries route owns localized metadata and structured data', () => {
  const source = read('app/(frontend)/[locale]/industries/page.tsx')

  assert.match(source, /getIndustriesPageContent/)
  assert.match(source, /canonicalUrl\(locale, ['"]\/industries['"]\)/)
  assert.match(source, /['"]x-default['"]/)
  assert.match(source, /openGraph/)
  assert.match(source, /twitter/)
  for (const type of ['CollectionPage', 'BreadcrumbList', 'ItemList', 'FAQPage']) {
    assert.match(source, new RegExp(`['"]@type['"]:\\s*['"]${type}`))
  }
})

test('industry atlas hero uses semantic controls, URL state, and localized routes', () => {
  const source = read('components/industries/IndustryAtlasHero.tsx')
  const experience = read('components/industries/IndustriesExperience.tsx')

  assert.match(experience, /IndustryAtlasHero/)
  assert.match(experience, /window\.location\.search/)
  assert.match(experience, /window\.history\.pushState/)
  assert.match(experience, /popstate/)
  assert.match(source, /<(?:motion\.)?button/)
  assert.match(source, /aria-pressed=/)
  assert.match(source, /localePath\(locale, `\/industries\/\$\{selected\.slug\}`\)/)
  assert.match(source, /atlasSectorIndex/)
  assert.doesNotMatch(source, /atlasBrief|atlasField|atlasContours|atlasRoute|CSSProperties/)
  assert.doesNotMatch(source, /LIVE SIGNAL|CT \/ INDUSTRIES/)
  assert.doesNotMatch(source, /next\/image|<Image/)
  assert.doesNotMatch(source, /<div[^>]+onClick=/)
})

test('the landing page keeps one explorer and a compact crawlable industry directory', () => {
  const experience = read('components/industries/IndustriesExperience.tsx')
  const index = read('components/industries/IndustriesIndex.tsx')
  const workbenchPath = filePath('components/industries/IndustryWorkbench.tsx')

  assert.equal(fs.existsSync(workbenchPath), false)
  assert.doesNotMatch(experience, /IndustryWorkbench|ticker|featuredSlugs|workbenchSlug/)
  assert.match(index, /industries\.map/)
  assert.match(index, /industryDirectory/)
  assert.match(index, /serviceLinks\.slice\(0, 2\)\.map/)
  assert.doesNotMatch(index, /problemList|industryRowColumns/)
  assert.doesNotMatch(index, /atlasRowVisual|data-variant=|<i \/>|<b \/>/)
  assert.doesNotMatch(index, /next\/image|<Image/)
  assert.match(index, /localePath\(locale, `\/industries\/\$\{industry\.slug\}`\)/)
})

test('industries route follows a focused landing-page sequence without the long guide', () => {
  const source = read('app/(frontend)/[locale]/industries/page.tsx')
  const experience = source.indexOf('<IndustriesExperience')
  const capability = source.indexOf('content.capabilities.map')
  const directory = source.indexOf('<IndustriesIndex')

  assert.ok(experience >= 0, 'route should render IndustriesExperience')
  assert.ok(capability > experience, 'service paths should follow the explorer')
  assert.ok(directory > capability, 'industry directory should follow service paths')
  assert.doesNotMatch(source, /content\.guide\.map/)
  assert.match(source, /content\.proof\.slice\(0, 4\)/)
  assert.match(source, /content\.faqs\.slice\(0, 5\)/)
})

test('industries styling implements the CloudTopia palette, RTL leading, and reduced motion', () => {
  const styles = read('components/industries/industries-page.module.css')

  for (const color of ['#1b1b23', '#ffffff', '#5170ff', '#0ea5e9', '#f04438']) {
    assert.match(styles.toLowerCase(), new RegExp(color))
  }
  assert.match(styles, /--signal-brand:/)
  assert.match(styles, /--signal-sky:/)
  assert.match(styles, /\.atlasSectorIndex/)
  assert.match(styles, /\.industryDirectory/)
  assert.doesNotMatch(styles, /\.atlasContours|\.atlasRoute|\.atlasRowVisual/)
  assert.match(styles, /safe-area-inset/)
  assert.match(styles, /\.page\[dir='rtl'\]/)
  assert.match(styles, /prefers-reduced-motion/)
  assert.match(styles, /focus-visible/)
  assert.match(styles, /min-height:\s*44px/)
  assert.match(styles, /\[class\*='AIChatbot-module'\]\[class\*='__root'\]/)
  assert.match(styles, /\[class\*='AIChatbot-module'\]\[class\*='__floatingButton'\]/)
  assert.match(styles, /\[class\*='AIChatbot-module'\]\[class\*='__buttonLabel'\]/)
  assert.doesNotMatch(styles, /AIChatbot_root/)
  assert.match(styles, /wa\.me/)
  assert.doesNotMatch(styles, /linear-gradient|radial-gradient/)
})

test('mobile typography keeps the headline above section headings and uses one Arabic display family', () => {
  const styles = read('components/industries/industries-page.module.css')

  assert.match(styles, /--industry-mobile-h1:\s*42px/)
  assert.match(styles, /--industry-mobile-h2:\s*32px/)
  assert.match(styles, /--industry-mobile-h3:\s*22px/)
  assert.match(styles, /\.page \.atlasSectorButton\s*\{[\s\S]*?min-height:\s*78px/)
  assert.match(styles, /\.page\[dir='rtl'\] \.atlasHeroTitle strong[\s\S]*var\(--font-cairo\)/)
  assert.doesNotMatch(styles, /\.page\[dir='rtl'\] \.atlasHeroTitle strong[\s\S]{0,180}var\(--font-amiri\)/)
})

test('selected industry and capability paths use a readable light hierarchy', () => {
  const styles = read('components/industries/industries-page.module.css')

  assert.match(styles, /--industry-selection-surface:\s*#ffffff/)
  assert.match(styles, /--industry-capability-surface:\s*#f7f9fc/)
  assert.match(styles, /--industry-section-title-desktop:\s*48px/)
  assert.match(styles, /\.atlasSelection\s*\{[\s\S]*?background:\s*var\(--industry-selection-surface\)/)
  assert.match(styles, /\.capabilitySection\s*\{[\s\S]*?background:\s*var\(--industry-capability-surface\)/)
})

test('editorial atlas replaces the signal wall with thirteen direct sector controls', async () => {
  const atlas = read('components/industries/IndustryAtlasHero.tsx')
  const oldSignalWall = filePath('components/industries/IndustrySignalWall.tsx')
  const { getIndustriesPageContent } = await import(pathToFileURL(filePath('lib/seo/industries-page.ts')).href)

  assert.equal(getIndustriesPageContent('en').industries.length, 13)
  assert.match(atlas, /content\.industries\.map/)
  assert.doesNotMatch(atlas, /signal wall|orbit|Radius|Math\.cos|Math\.sin/i)
  assert.equal(fs.existsSync(oldSignalWall), false, 'the old signal wall component should be removed')
})

test('final polish keeps atlas state visible, announced, and aligned with the URL', () => {
  const atlas = read('components/industries/IndustryAtlasHero.tsx')
  const experience = read('components/industries/IndustriesExperience.tsx')
  const index = read('components/industries/IndustriesIndex.tsx')
  const route = read('app/(frontend)/[locale]/industries/page.tsx')
  const styles = read('components/industries/industries-page.module.css')
  const header = read('components/Header.tsx')

  assert.match(atlas, /aria-controls="industry-atlas-selection"/)
  assert.match(atlas, /id="industry-atlas-selection"/)
  assert.match(atlas, /aria-live="polite"/)
  assert.match(atlas, /aria-labelledby="industry-atlas-selection-title"/)
  assert.match(atlas, /<AnimatePresence initial=\{false\} mode="wait">/)
  assert.match(experience, /window\.history\.replaceState/)
  assert.match(experience, /if \(slug === selectedSlug\) return/)
  assert.match(atlas, /ArrowUpLeft/)
  assert.match(index, /ArrowUpLeft/)
  assert.match(index, /data-header-theme="light"/)
  assert.match(index, /aria-label=\{`\$\{content\.index\.exploreLabel\} — \$\{industry\.name\}`\}/)
  assert.match(route, /ArrowUpLeft/)
  assert.match(route, /faqChevron/)
  assert.match(route, /<div id="industry-main"/)
  assert.doesNotMatch(route, /<main id="industry-main"/)
  assert.match(route, /className=\{styles\.ctaSection\} data-header-theme="dark"/)
  assert.match(styles, /--signal-focus:\s*#175cd3/)
  assert.match(styles, /--signal-sky-text:\s*#026aa2/)
  assert.match(styles, /--signal-coral-text:\s*#b42318/)
  assert.match(styles, /\.atlasSectorItem:last-child\s*\{[\s\S]*?grid-column:\s*span 2/)
  assert.match(styles, /scroll-snap-type:\s*inline proximity/)
  assert.match(styles, /scroll-snap-align:\s*start/)
  assert.match(styles, /\.faqItem\[open\] \.faqChevron/)
  assert.match(header, /hidden lg:block flex-1 shrink-0/)
  assert.match(header, /lg:mx-auto lg:max-w-2xl lg:shrink-0 lg:flex-none/)
  assert.match(header, /hidden lg:flex flex-1 items-center justify-end/)
})
