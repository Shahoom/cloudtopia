import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const targetServiceSlugs = [
  'business-website-development',
  'landing-page-design',
  'corporate-website-design',
  'ecommerce-website-development',
  'portfolio-websites',
  'real-estate-website-development',
  'restaurant-website-development',
  'educational-website-development',
  'website-redesign',
  'website-maintenance',
  'custom-web-application-development',
  'client-portals',
  'admin-dashboards',
  'booking-platforms',
  'internal-business-tools',
  'saas-mvp-development',
  'progressive-web-app-development',
  'mobile-app-development',
  'crm-development',
  'inventory-management-systems',
  'sales-management-systems',
  'order-management-systems',
  'hr-management-systems',
  'accounting-system-integration',
  'workflow-automation',
  'business-process-automation',
  'supply-chain-management-systems',
  'custom-api-development',
  'cloud-hosting-setup',
  'cloud-migration',
  'server-deployment',
  'devops-support',
  'database-setup',
  'backup-and-security',
  'performance-optimization',
  'scalable-cloud-architecture',
  'hybrid-cloud-solutions',
  'cloud-cost-optimization',
  'ai-chatbots',
  'ai-business-assistants',
  'ai-automation',
  'ai-content-systems',
  'ai-crm-assistants',
  'ai-website-analyzer',
  'ai-reporting-dashboards',
  'ai-powered-customer-support',
  'machine-learning-model-development',
  'natural-language-processing-solutions',
  'social-media-management',
  'paid-ads-landing-pages',
  'brand-identity',
  'seo-optimization',
  'content-systems',
  'lead-generation-systems',
  'conversion-rate-optimization',
  'email-marketing-automation',
]

test('full service taxonomy covers the requested service expansion', async () => {
  const { serviceDetailSlugs, serviceCategories, servicesBySlug } = await import('../lib/seo/services.ts')

  assert.deepEqual([...serviceDetailSlugs].sort(), [...targetServiceSlugs].sort())
  assert.equal(serviceCategories.length, 6)

  for (const slug of targetServiceSlugs) {
    const service = servicesBySlug[slug]

    assert.equal(service.slug, slug)
    assert.ok(service.name.en.length > 4, `${slug} should include an English name`)
    assert.ok(service.name.ar.length > 4, `${slug} should include an Arabic name`)
    assert.doesNotMatch(service.name.ar, /بالعربية$/, `${slug} should use a real Arabic service name`)
    assert.equal('tr' in service.name, false, `${slug} should not include Turkish locale data`)
    assert.ok(service.description.en.length > 50, `${slug} should include useful English description`)
    assert.ok(service.features.length >= 4, `${slug} should include features`)
    assert.ok(service.faqs.length >= 2, `${slug} should include FAQs`)
  }
})

test('active site locale model is English and Arabic only', async () => {
  const { locales, localeNames, localeDirection } = await import('../lib/i18n/config.ts')
  const languageContextSource = readFileSync(path.join(process.cwd(), 'lib/i18n/LanguageContext.tsx'), 'utf8')
  const i18nIndexSource = readFileSync(path.join(process.cwd(), 'lib/i18n/index.ts'), 'utf8')
  const englishDictionarySource = readFileSync(path.join(process.cwd(), 'lib/i18n/translations/en.ts'), 'utf8')
  const arabicDictionarySource = readFileSync(path.join(process.cwd(), 'lib/i18n/translations/ar.ts'), 'utf8')
  const sitemapSource = readFileSync(path.join(process.cwd(), 'lib/sitemap-data.ts'), 'utf8')
  const proxySource = readFileSync(path.join(process.cwd(), 'proxy.ts'), 'utf8')
  const llmsSource = readFileSync(path.join(process.cwd(), 'public/llms.txt'), 'utf8')
  const ogImageSource = readFileSync(path.join(process.cwd(), 'lib/og/og-image.ts'), 'utf8')
  const bentoPricingSource = readFileSync(path.join(process.cwd(), 'components/ui/bento-pricing.tsx'), 'utf8')
  const aboutClientSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/about/AboutPageClient.tsx'), 'utf8')
  const aboutLayoutSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/about/layout.tsx'), 'utf8')
  const processPageSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/process/page.tsx'), 'utf8')
  const trustPageSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/trust/page.tsx'), 'utf8')
  const adminAuthSource = readFileSync(path.join(process.cwd(), 'components/payload/AuthViews.tsx'), 'utf8')
  const editorialDashboardSource = readFileSync(path.join(process.cwd(), 'components/payload/EditorialDashboard.tsx'), 'utf8')
  const sourceSurfaces = [
    languageContextSource,
    i18nIndexSource,
    englishDictionarySource,
    arabicDictionarySource,
    proxySource,
    llmsSource,
    ogImageSource,
    bentoPricingSource,
    aboutClientSource,
    aboutLayoutSource,
    processPageSource,
    trustPageSource,
    adminAuthSource,
    editorialDashboardSource,
  ].join('\n')

  assert.deepEqual(locales, ['en', 'ar'])
  assert.deepEqual(Object.keys(localeNames), ['en', 'ar'])
  assert.deepEqual(Object.keys(localeDirection), ['en', 'ar'])
  assert.doesNotMatch(sourceSurfaces, /translations\/tr|\\btr\\b|isTr|Turkish|Turkey|Turkiye|Türkiye|EN \/ AR \/ TR|\/tr\//)
  assert.doesNotMatch(sitemapSource, /canonicalUrl\('tr'|\/tr\//)
  assert.doesNotMatch(proxySource, /\['en', 'ar', 'tr'\]|seg1 === 'tr'|Turkish|\/tr\//)
  assert.match(proxySource, /requestLocale === defaultLocale/, 'Proxy should avoid redirecting internal English rewrites back to the unprefixed URL')
  assert.doesNotMatch(llmsSource, /Turkish|Turkey|Turkiye|Türkiye|\/tr\//)
  assert.match(llmsSource, /Phase 2\/3 SEO landing pages/, 'llms.txt should expose expanded SEO landing pages to AI crawlers')
  assert.match(llmsSource, /\/industries\/healthcare/, 'llms.txt should include industry landing pages')
  assert.match(llmsSource, /\/locations\/saudi-arabia/, 'llms.txt should include regional market pages')
  assert.match(llmsSource, /\/services\/website-design-development/, 'llms.txt should include service detail pages')
  assert.doesNotMatch(ogImageSource, /services\/tr\.jpg|Turkish|Turkey|Turkiye|Türkiye/, 'OG image examples should not reference Turkish assets')
  assert.match(englishDictionarySource, /value: '6', label: 'Countries served'/, 'English dictionary should reflect the six active Gulf markets')
  assert.match(arabicDictionarySource, /value: '6', label: 'دول نخدمها'/, 'Arabic dictionary should reflect the six active Gulf markets')
})

test('service detail pages and sitemap are wired for expanded service routes', () => {
  const serviceRoutePath = path.join(process.cwd(), 'app/(frontend)/[locale]/services/[service]/page.tsx')
  const servicesPagePath = path.join(process.cwd(), 'app/(frontend)/[locale]/services/ServicesPageClient.tsx')
  const industryIndexPath = path.join(process.cwd(), 'app/(frontend)/[locale]/industries/page.tsx')
  const marketsIndexPath = path.join(process.cwd(), 'app/(country-landing)/[locale]/markets/page.tsx')
  const sitemapSource = readFileSync(path.join(process.cwd(), 'lib/sitemap-data.ts'), 'utf8')

  assert.equal(existsSync(serviceRoutePath), true, 'Dynamic service landing page route should exist')
  assert.equal(existsSync(industryIndexPath), true, 'Industry hub route should exist')
  assert.equal(existsSync(marketsIndexPath), true, 'Markets hub route should exist')

  const serviceRouteSource = readFileSync(serviceRoutePath, 'utf8')
  const servicesPageSource = readFileSync(servicesPagePath, 'utf8')
  assert.match(serviceRouteSource, /\/pricing/, 'Service detail pages should link into pricing')
  assert.match(serviceRouteSource, /BreadcrumbList/, 'Service detail pages should emit breadcrumb schema')
  assert.match(serviceRouteSource, /answerTitle/, 'Service detail pages should include a direct answer block')
  assert.match(serviceRouteSource, /bestForItems/, 'Service detail pages should include buyer-fit guidance')
  assert.match(serviceRouteSource, /deliverablesItems/, 'Service detail pages should include enterprise deliverables')
  assert.match(serviceRouteSource, /relatedServices/, 'Service detail pages should cross-link related services')
  assert.match(servicesPageSource, /EnterpriseServiceIndex/, 'Main services page should expose the expanded service taxonomy')
  assert.match(servicesPageSource, /serviceCategories/, 'Main services page should link to dynamic service detail pages')
  assert.match(servicesPageSource, /\/services\/\$\{service\.slug\}/, 'Service taxonomy links should route to service detail pages')

  assert.match(sitemapSource, /serviceDetailSlugs/, 'Sitemap should import service detail slugs')
  assert.match(sitemapSource, /\/services\/\$\{service\}/, 'Sitemap should generate localized service detail URLs')
  assert.match(sitemapSource, /path: '\/industries'/, 'Sitemap should include the industry hub')
  assert.match(sitemapSource, /path: '\/markets'/, 'Sitemap should include the markets hub')
})

test('header and footer expose expanded services industries and locations discovery', () => {
  const headerSource = readFileSync(path.join(process.cwd(), 'components/Header.tsx'), 'utf8')
  const footerSource = readFileSync(path.join(process.cwd(), 'components/Footer.tsx'), 'utf8')

  assert.match(headerSource, /MegaMenu/, 'Header should include mega-menu discovery')
  assert.match(headerSource, /serviceCategories/, 'Header should use service taxonomy')
  assert.match(headerSource, /industrySlugs/, 'Header should use industry taxonomy')
  assert.match(headerSource, /countryLandingPages/, 'Header should use country landing taxonomy')
  assert.match(headerSource, /Markets|الأسواق/, 'Header should expose regional market discovery')
  assert.match(headerSource, /englishUrl|arabicUrl/, 'Header should link canonical market pages')
  assert.match(headerSource, /enterprisePaths/, 'Header should guide buyers to pricing proof and intake paths')
  assert.match(headerSource, /MegaMenuPathCards/, 'Header mega menus should include enterprise decision path cards')
  assert.match(headerSource, /Trust center|مركز الثقة/, 'Header decision paths should expose the enterprise trust center')
  assert.match(headerSource, /Delivery process|منهجية التنفيذ/, 'Header decision paths should expose the delivery process')
  assert.doesNotMatch(headerSource, /Start here|ابدأ من هنا/, 'Mobile menu should not include the removed Start here section')
  assert.match(footerSource, /serviceCategories/, 'Footer should expose expanded services')
  assert.match(footerSource, /industrySlugs/, 'Footer should expose industries')
  assert.match(footerSource, /countryLandingPages/, 'Footer should expose regional markets')
  assert.match(headerSource, /\/pricing/, 'Header should expose transparent pricing')
  assert.match(footerSource, /\/pricing/, 'Footer should expose transparent pricing')
  assert.match(footerSource, /\/process/, 'Footer should expose the delivery process')
  assert.match(footerSource, /\/trust/, 'Footer should expose the trust center')
})

test('projects and contact surfaces support full expansion conversion flows', () => {
  const projectsSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/projects/ProjectsPageClient.tsx'), 'utf8')
  const contactSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/contact/ContactClient.tsx'), 'utf8')

  assert.match(projectsSource, /searchQuery/, 'Projects page should include searchable project filtering')
  assert.match(projectsSource, /projectSearchText/, 'Projects search should inspect project title, type, challenge, solution, and features')
  assert.match(projectsSource, /No projects found/, 'Projects page should handle empty search results')
  assert.match(projectsSource, /Enterprise delivery evidence/, 'Projects page should add enterprise proof before the portfolio grid')
  assert.match(projectsSource, /serviceCategories/, 'Projects proof should connect case studies to the expanded service taxonomy')
  assert.match(readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/projects/page.tsx'), 'utf8'), /CollectionPage/, 'Projects route should emit collection structured data')
  assert.match(contactSource, /serviceCategories/, 'Contact form should use the expanded service taxonomy')
  assert.match(contactSource, /localizedServiceValue/, 'Contact form service options should localize taxonomy labels')
  assert.match(contactSource, /within one business day/, 'Contact page should state the human response promise')
  assert.match(contactSource, /Project intake desk/, 'Contact page should guide enterprise buyers through intake')
  assert.match(contactSource, /Better brief, faster reply/, 'Contact form should prompt for decision-useful project details')
  assert.match(readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/contact/page.tsx'), 'utf8'), /ContactPage/, 'Contact route should emit contact structured data')
})

test('homepage includes full-expansion trust industry and insights sections', () => {
  const homeSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/HomePageClient.tsx'), 'utf8')

  assert.match(homeSource, /Testimonials/, 'Homepage should include the trust/testimonials section')
  assert.match(homeSource, /IndustriesPreview/, 'Homepage should include industry discovery')
  assert.match(homeSource, /EnterpriseProof/, 'Homepage should include enterprise proof content')
  assert.match(homeSource, /InsightsTeaser/, 'Homepage should include insights/blog teaser')
})

test('about page explains the enterprise operating model and buyer proof paths', () => {
  const aboutClientSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/about/AboutPageClient.tsx'), 'utf8')
  const aboutLayoutSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/about/layout.tsx'), 'utf8')

  assert.match(aboutClientSource, /Operating model/, 'About page should include a buyer-facing operating model section')
  assert.match(aboutClientSource, /Built for buyers who need clarity before production starts/, 'About page should answer how CloudTopia reduces project ambiguity')
  assert.match(aboutClientSource, /What buyers can verify/, 'About page should expose verifiable decision paths')
  assert.match(aboutClientSource, /\/pricing/, 'About proof paths should link to pricing')
  assert.match(aboutClientSource, /\/projects/, 'About proof paths should link to projects')
  assert.match(aboutClientSource, /\/services/, 'About proof paths should link to services')
  assert.match(aboutClientSource, /\/locations/, 'About proof paths should link to regional market pages')
  assert.match(aboutClientSource, /\/contact/, 'About proof paths should link to intake')
  assert.match(aboutClientSource, /نموذج التشغيل/, 'About proof section should be localized for Arabic')
  assert.match(aboutLayoutSource, /AboutPage/, 'About route should emit AboutPage structured data')
  assert.match(aboutLayoutSource, /hasPart/, 'About schema should expose key buyer proof page relationships')
  assert.match(aboutLayoutSource, /makesOffer/, 'About schema should connect the organization to service offers')
  assert.match(aboutLayoutSource, /availableLanguage: \['English', 'Arabic'\]/, 'About schema should advertise English and Arabic only')
})

test('trust center gives enterprise buyers security ownership and procurement proof', () => {
  const trustRoutePath = path.join(process.cwd(), 'app/(frontend)/[locale]/trust/page.tsx')
  const trustSource = readFileSync(trustRoutePath, 'utf8')
  const sitemapSource = readFileSync(path.join(process.cwd(), 'lib/sitemap-data.ts'), 'utf8')
  const llmsSource = readFileSync(path.join(process.cwd(), 'public/llms.txt'), 'utf8')

  assert.equal(existsSync(trustRoutePath), true, 'Localized trust center route should exist')
  assert.match(trustSource, /Trust center/, 'Trust page should include English trust center positioning')
  assert.match(trustSource, /مركز الثقة/, 'Trust page should include Arabic trust center positioning')
  assert.match(trustSource, /Security-minded implementation/, 'Trust page should address enterprise security and handoff')
  assert.match(trustSource, /Client-owned handoff/, 'Trust page should explain ownership handoff')
  assert.match(trustSource, /FAQPage/, 'Trust page should emit FAQ structured data')
  assert.match(trustSource, /ItemList/, 'Trust page should emit verification path structured data')
  assert.match(trustSource, /availableLanguage: \['English', 'Arabic'\]/, 'Trust schema should advertise English and Arabic only')
  assert.match(trustSource, /\/pricing/, 'Trust page should link to pricing')
  assert.match(trustSource, /\/projects/, 'Trust page should link to project proof')
  assert.match(trustSource, /\/services/, 'Trust page should link to service scope')
  assert.match(trustSource, /\/locations/, 'Trust page should link to market readiness')
  assert.match(trustSource, /\/contact/, 'Trust page should link to intake')
  assert.match(sitemapSource, /path: '\/trust'/, 'Sitemap should include the trust center')
  assert.match(sitemapSource, /staticNonCmsRoutes/, 'CMS sitemap mode should include non-CMS trust route')
  assert.match(llmsSource, /https:\/\/cloudtopia\.net\/trust/, 'llms.txt should expose the trust center')
})

test('process page explains delivery governance sign-off and handoff', () => {
  const processRoutePath = path.join(process.cwd(), 'app/(frontend)/[locale]/process/page.tsx')
  const processSource = readFileSync(processRoutePath, 'utf8')
  const sitemapSource = readFileSync(path.join(process.cwd(), 'lib/sitemap-data.ts'), 'utf8')
  const llmsSource = readFileSync(path.join(process.cwd(), 'public/llms.txt'), 'utf8')

  assert.equal(existsSync(processRoutePath), true, 'Localized process route should exist')
  assert.match(processSource, /Delivery process/, 'Process page should include English process positioning')
  assert.match(processSource, /منهجية التنفيذ/, 'Process page should include Arabic process positioning')
  assert.match(processSource, /Discovery & scope/, 'Process page should explain discovery and scope')
  assert.match(processSource, /Launch, handoff & support/, 'Process page should explain launch handoff and support')
  assert.match(processSource, /Client sign-off/, 'Process page should explain client sign-off points')
  assert.match(processSource, /Handoff pack/, 'Process page should describe the handoff pack')
  assert.match(processSource, /HowTo/, 'Process page should emit HowTo structured data')
  assert.match(processSource, /FAQPage/, 'Process page should emit FAQ structured data')
  assert.match(processSource, /BreadcrumbList/, 'Process page should emit breadcrumb structured data')
  assert.match(processSource, /availableLanguage: \['English', 'Arabic'\]/, 'Process schema should advertise English and Arabic only')
  assert.match(processSource, /\/pricing/, 'Process page should link to pricing')
  assert.match(processSource, /\/trust/, 'Process page should link to trust')
  assert.match(processSource, /\/projects/, 'Process page should link to projects')
  assert.match(processSource, /\/services/, 'Process page should link to services')
  assert.match(processSource, /\/contact/, 'Process page should link to intake')
  assert.match(sitemapSource, /path: '\/process'/, 'Sitemap should include the process page')
  assert.match(sitemapSource, /staticNonCmsRoutes/, 'CMS sitemap mode should include non-CMS process route')
  assert.match(llmsSource, /https:\/\/cloudtopia\.net\/process/, 'llms.txt should expose the process page')
})

test('pricing route turns the public pricing source into a conversion page', () => {
  const pricingRoutePath = path.join(process.cwd(), 'app/(frontend)/[locale]/pricing/page.tsx')
  const pricingSourcePath = path.join(process.cwd(), 'public/pricing.md')
  const sitemapSource = readFileSync(path.join(process.cwd(), 'lib/sitemap-data.ts'), 'utf8')

  assert.equal(existsSync(pricingSourcePath), true, 'Public pricing source should exist')
  assert.equal(existsSync(pricingRoutePath), true, 'Localized pricing route should exist')

  const pricingRouteSource = readFileSync(pricingRoutePath, 'utf8')
  assert.match(pricingRouteSource, /pricing\.md/, 'Pricing page should use the public pricing source')
  assert.match(pricingRouteSource, /PricingCategory/, 'Pricing page should structure source sections into categories')
  assert.match(pricingRouteSource, /OfferCatalog/, 'Pricing page should emit structured offer catalog data')
  assert.match(pricingRouteSource, /Most Popular|Best Value/, 'Pricing page should highlight recommended packages')
  assert.match(pricingRouteSource, /Payment: 50% upfront, 50% on delivery/, 'Pricing page should surface payment terms')
  assert.match(pricingRouteSource, /decisionGuide/, 'Pricing page should include package decision guidance')
  assert.match(pricingRouteSource, /Which package path fits your project/, 'Pricing page should help buyers self-select a path')
  assert.match(pricingRouteSource, /FAQPage/, 'Pricing page should emit FAQ structured data for buyer objections')
  assert.match(sitemapSource, /path: '\/pricing'/, 'Sitemap should include the pricing page')
})
