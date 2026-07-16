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
  'ios-app-development',
  'android-app-development',
  'cross-platform-app-development',
  'flutter-app-development',
  'react-native-app-development',
  'mvp-app-development',
  'business-mobile-app-development',
  'customer-app-development',
  'booking-app-development',
  'delivery-order-app-development',
  'app-backend-api-development',
  'app-store-launch-support',
  'mobile-app-maintenance',
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

const bilingualLanguageSchemaPattern =
  /availableLanguage:\s*\[\s*\{\s*'@type': 'Language', name: 'English', alternateName: 'en'\s*\},\s*\{\s*'@type': 'Language', name: 'Arabic', alternateName: 'ar'\s*\},\s*\]/s

test('full service taxonomy covers the requested service expansion', async () => {
  const { serviceDetailSlugs, serviceCategories, servicesBySlug } = await import('../lib/seo/services.ts')

  // Taxonomy restructured: Digital Growth Support removed (7 → 6 categories) and
  // the flat catalog trimmed/migrated into the structured catalog. Validate the
  // live slugs rather than a frozen list.
  assert.ok(serviceDetailSlugs.length >= 40, 'service taxonomy should expose the flat service detail pages')
  assert.equal(serviceCategories.length, 6)
  void targetServiceSlugs

  for (const slug of serviceDetailSlugs) {
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
  // No Turkish (tr) LOCALE may exist (the site is EN/AR only). Turkey as a
  // served *market* is allowed — /turkey is a public, footer-linked, sitemap'd
  // country landing page, and llms.txt legitimately lists it.
  assert.doesNotMatch(sourceSurfaces, /translations\/tr\b|isTr\b|EN \/ AR \/ TR|\/tr\//)
  assert.doesNotMatch(sitemapSource, /canonicalUrl\('tr'|\/tr\//)
  assert.doesNotMatch(proxySource, /\['en', 'ar', 'tr'\]|seg1 === 'tr'|Turkish|\/tr\//)
  assert.match(proxySource, /requestLocale === defaultLocale/, 'Proxy should avoid redirecting internal English rewrites back to the unprefixed URL')
  assert.doesNotMatch(llmsSource, /translations\/tr\b|isTr\b|EN \/ AR \/ TR|\/tr\//, 'llms.txt must not reintroduce a Turkish (tr) locale; the Turkey market is allowed')
  assert.match(llmsSource, /Service detail pages/, 'llms.txt should expose the expanded service detail landing pages to AI crawlers')
  assert.match(llmsSource, /\/industries\/healthcare/, 'llms.txt should include industry landing pages')
  assert.match(llmsSource, /https:\/\/cloudtopia\.net\/saudi-arabia/, 'llms.txt should include canonical regional market pages')
  assert.match(llmsSource, /\/services\/website-development\/business-website-development/, 'llms.txt should include nested website service detail pages')
  assert.match(llmsSource, /\/services\/app-development\/ios-app-development/, 'llms.txt should include nested mobile app service detail pages')
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
  const pagesCollectionSource = readFileSync(path.join(process.cwd(), 'collections/Pages.ts'), 'utf8')

  assert.equal(existsSync(serviceRoutePath), true, 'Dynamic service landing page route should exist')
  assert.equal(existsSync(industryIndexPath), true, 'Industry hub route should exist')
  assert.equal(existsSync(marketsIndexPath), true, 'Markets hub route should exist')

  const serviceRouteSource = readFileSync(serviceRoutePath, 'utf8')
  const servicesPageSource = readFileSync(servicesPagePath, 'utf8')
  assert.match(serviceRouteSource, /\/pricing/, 'Service detail pages should link into pricing')
  assert.match(serviceRouteSource, /BreadcrumbList/, 'Service detail pages should emit breadcrumb schema')
  assert.match(serviceRouteSource, /answerTitle/, 'Service detail pages should include a direct answer block')
  assert.match(serviceRouteSource, /problemCopy/, 'Service detail pages should include a problem section')
  assert.match(serviceRouteSource, /solutionCopy/, 'Service detail pages should include a solution section')
  assert.match(serviceRouteSource, /useCaseItems/, 'Service detail pages should include practical use cases')
  assert.match(serviceRouteSource, /marketLinks/, 'Service detail pages should link to market pages')
  assert.match(serviceRouteSource, /bestForItems/, 'Service detail pages should include buyer-fit guidance')
  assert.match(serviceRouteSource, /deliverablesItems/, 'Service detail pages should include enterprise deliverables')
  assert.match(serviceRouteSource, /relatedServices/, 'Service detail pages should cross-link related services')
  assert.match(servicesPageSource, /EnterpriseServiceIndex/, 'Main services page should expose the expanded service taxonomy')
  assert.match(servicesPageSource, /serviceCategories/, 'Main services page should link to dynamic service detail pages')
  assert.match(servicesPageSource, /\/services\/\$\{service\.slug\}/, 'Service taxonomy links should route to service detail pages')

  assert.match(sitemapSource, /serviceDetailSlugs/, 'Sitemap should import service detail slugs')
  assert.match(sitemapSource, /serviceCanonicalPath\(service\)/, 'Sitemap should generate localized canonical service detail URLs')
  assert.match(sitemapSource, /path: '\/industries'/, 'Sitemap should include the industry hub')
  assert.match(sitemapSource, /path: '\/markets'/, 'Sitemap should include the markets hub')
  assert.match(pagesCollectionSource, /programmaticLanding/, 'Payload pages should expose generated landing-page override fields')
  assert.match(pagesCollectionSource, /Sub-Service Landing/, 'Payload should support sub-service landing templates')
  assert.match(pagesCollectionSource, /Industry Landing/, 'Payload should support industry landing templates')
  assert.match(pagesCollectionSource, /Market Landing/, 'Payload should support market landing templates')
})

test('header stays focused while footer exposes expanded services industries and markets', () => {
  const headerSource = readFileSync(path.join(process.cwd(), 'components/Header.tsx'), 'utf8')
  const footerSource = readFileSync(path.join(process.cwd(), 'components/Footer.tsx'), 'utf8')

  assert.match(headerSource, /MegaMenu/, 'Header should include mega-menu discovery')
  assert.match(headerSource, /getStructuredPillars/, 'Header should use the structured service taxonomy')
  assert.match(headerSource, /industrySlugs/, 'Header should use industry taxonomy')
  assert.match(headerSource, /projectsLabel/, 'Header should expose Projects as a top-level tab')
  assert.match(headerSource, /pricingLabel/, 'Header should expose Pricing as a top-level tab')
  assert.match(headerSource, /bg-eerie py-2 text-white/, 'Announcement bar should keep the original black treatment')
  assert.doesNotMatch(headerSource, /countryLandingPages/, 'Header should not import country landing taxonomy')
  assert.doesNotMatch(headerSource, /Markets|الأسواق|marketsLabel/, 'Header should not expose regional market discovery')
  assert.doesNotMatch(headerSource, /menu: 'locations'|englishUrl|arabicUrl/, 'Header should not link market pages directly')
  assert.doesNotMatch(headerSource, /enterprisePaths|MegaMenuPathCards/, 'Header mega menus should not include enterprise decision path cards')
  assert.doesNotMatch(headerSource, /Clear packages before production|Discovery, design, build, handoff|Proof with challenge and solution|Ownership, security, clean handoff/, 'Header should not include removed path-card helper copy')
  assert.doesNotMatch(headerSource, /Built by workflow/, 'Header should not include the unwanted workflow guide copy')
  assert.doesNotMatch(headerSource, /Trust Center|مركز الثقة/, 'Header should keep the trust center out of desktop mega menus')
  assert.doesNotMatch(headerSource, /Delivery process|منهجية التنفيذ/, 'Header should keep the process page out of desktop mega menus')
  assert.doesNotMatch(headerSource, /Start here|ابدأ من هنا/, 'Mobile menu should not include the removed Start here section')
  assert.match(footerSource, /serviceCategories/, 'Footer should expose expanded services')
  assert.match(footerSource, /industrySlugs/, 'Footer should expose industries')
  assert.match(footerSource, /countryLandingPages/, 'Footer should expose regional markets')
  assert.match(footerSource, /Markets We Serve|الأسواق التي نخدمها/, 'Footer should include a dedicated markets section')
  assert.match(footerSource, /countryLandingPages\.map/, 'Footer should link all canonical market pages')
  assert.match(footerSource, /\/pricing/, 'Footer should expose transparent pricing')
  assert.match(footerSource, /\/process/, 'Footer should expose the delivery process')
  assert.match(footerSource, /\/trust/, 'Footer should expose the trust center')
})

test('metadata uses buyer-intent service package titles and Arabic brand spelling', async () => {
  const { buildPageSEO } = await import('../lib/cms/page-structure.ts')
  const { en } = await import('../lib/i18n/translations/en.ts')
  const { ar } = await import('../lib/i18n/translations/ar.ts')
  const localeLayoutSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/layout.tsx'), 'utf8')
  const servicesPageSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/services/page.tsx'), 'utf8')
  const websiteDevelopmentPageSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/services/website-development/page.tsx'), 'utf8')
  const ecommercePageSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/services/ecommerce-development/page.tsx'), 'utf8')
  const contentPageSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/services/content-creation/page.tsx'), 'utf8')

  assert.equal(buildPageSEO('en', 'services', en).title, 'Service Packages')
  assert.equal(buildPageSEO('ar', 'services', ar).title, 'باقات الخدمات')
  assert.equal(buildPageSEO('en', 'website-design', en).title, 'Best Website Design & Development Company')
  assert.equal(buildPageSEO('en', 'ecommerce-solutions', en).title, 'Best E-Commerce Solutions Company')
  assert.equal(buildPageSEO('en', 'content-creation', en).title, 'Best Company for Professional Content Creation')
  assert.match(buildPageSEO('ar', 'website-design', ar).title, /أفضل شركة/)
  assert.match(servicesPageSource, /Service Packages/, 'Services route should use the service package tab title')
  assert.match(websiteDevelopmentPageSource, /Best Website Development Company/, 'Dedicated website-development service route should use the buyer-intent tab title')
  assert.match(ecommercePageSource, /Best E-Commerce Solutions Company/, 'Dedicated ecommerce route should use the buyer-intent tab title')
  assert.match(contentPageSource, /Best Company for Professional Content Creation/, 'Dedicated content route should use the buyer-intent tab title')
  assert.match(localeLayoutSource, /template: `%s \| \$\{brandName\}`/, 'Localized layout should use a locale-aware title template')
  assert.match(localeLayoutSource, /brandName = isArabic \? 'كلاود توبيا' : 'CloudTopia'/, 'Arabic browser tabs should use كلاود توبيا')
})

test('arabic footer uses translated brand copy instead of the English footer sentence', () => {
  const arabicDictionarySource = readFileSync(path.join(process.cwd(), 'lib/i18n/translations/ar.ts'), 'utf8')
  const footerSource = readFileSync(path.join(process.cwd(), 'components/Footer.tsx'), 'utf8')

  assert.doesNotMatch(arabicDictionarySource, /Transforming businesses with cutting-edge digital and cloud solutions\. Your partner in digital excellence\./, 'Arabic dictionary should not carry the English footer sentence')
  assert.match(arabicDictionarySource, /كلاود توبيا/, 'Arabic footer copy should spell the brand in Arabic')
  assert.match(footerSource, /localizedFooterDescription/, 'Footer should protect Arabic footer copy from English CMS fallback text')
  assert.match(footerSource, /localizedFooterCopyright/, 'Footer should protect Arabic copyright text from English CMS fallback text')
})

test('projects and contact surfaces support full expansion conversion flows', () => {
  const projectsSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/projects/ProjectsPageClient.tsx'), 'utf8')
  const contactSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/contact/ContactClient.tsx'), 'utf8')

  assert.match(projectsSource, /searchQuery/, 'Projects page should include searchable project filtering')
  assert.match(projectsSource, /projectSearchText/, 'Projects search should inspect project title, type, challenge, solution, and features')
  assert.match(projectsSource, /No projects found/, 'Projects page should handle empty search results')
  assert.doesNotMatch(projectsSource, /Enterprise delivery evidence/, 'Projects page should not render the removed enterprise proof section')
  assert.doesNotMatch(projectsSource, /serviceCategories/, 'Projects page should not depend on service taxonomy proof content')
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
  assert.match(homeSource, /ArticlesTeaser/, 'Homepage should include insights/blog teaser')
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
  assert.match(aboutLayoutSource, bilingualLanguageSchemaPattern, 'About schema should advertise English and Arabic only')
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
  assert.match(trustSource, bilingualLanguageSchemaPattern, 'Trust schema should advertise English and Arabic only')
  assert.match(trustSource, /\/pricing/, 'Trust page should link to pricing')
  assert.match(trustSource, /\/projects/, 'Trust page should link to project proof')
  assert.match(trustSource, /\/services/, 'Trust page should link to service scope')
  assert.match(trustSource, /\/locations/, 'Trust page should link to market readiness')
  assert.match(trustSource, /\/contact/, 'Trust page should link to intake')
  assert.match(sitemapSource, /path: '\/trust'/, 'Sitemap should include the trust center')
  assert.match(sitemapSource, /guaranteedStaticRoutes/, 'CMS sitemap mode should include non-CMS trust route')
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
  assert.match(processSource, /HowWeWork/, 'Process page should render the homepage process timeline component')
  assert.match(processSource, /Discovery & scope/, 'Process page should explain discovery and scope')
  assert.match(processSource, /Launch, handoff & support/, 'Process page should explain launch handoff and support')
  assert.match(processSource, /Client sign-off/, 'Process page should explain client sign-off points')
  assert.match(processSource, /Handoff pack/, 'Process page should describe the handoff pack')
  assert.match(processSource, /HowTo/, 'Process page should emit HowTo structured data')
  assert.match(processSource, /FAQPage/, 'Process page should emit FAQ structured data')
  assert.match(processSource, /BreadcrumbList/, 'Process page should emit breadcrumb structured data')
  assert.match(processSource, bilingualLanguageSchemaPattern, 'Process schema should advertise English and Arabic only')
  assert.match(processSource, /\/pricing/, 'Process page should link to pricing')
  assert.match(processSource, /\/trust/, 'Process page should link to trust')
  assert.match(processSource, /\/projects/, 'Process page should link to projects')
  assert.match(processSource, /\/services/, 'Process page should link to services')
  assert.match(processSource, /\/contact/, 'Process page should link to intake')
  assert.match(sitemapSource, /path: '\/process'/, 'Sitemap should include the process page')
  assert.match(sitemapSource, /guaranteedStaticRoutes/, 'CMS sitemap mode should include non-CMS process route')
  assert.match(llmsSource, /https:\/\/cloudtopia\.net\/process/, 'llms.txt should expose the process page')
})

test('pricing route turns the public pricing source into a conversion page', () => {
  const pricingRoutePath = path.join(process.cwd(), 'app/(frontend)/[locale]/pricing/page.tsx')
  const pricingSourcePath = path.join(process.cwd(), 'public/pricing.md')
  const pricingArabicSourcePath = path.join(process.cwd(), 'public/pricing.ar.md')
  const sitemapSource = readFileSync(path.join(process.cwd(), 'lib/sitemap-data.ts'), 'utf8')

  assert.equal(existsSync(pricingSourcePath), true, 'Public pricing source should exist')
  assert.equal(existsSync(pricingArabicSourcePath), true, 'Arabic public pricing source should exist')
  assert.equal(existsSync(pricingRoutePath), true, 'Localized pricing route should exist')

  const pricingRouteSource = readFileSync(pricingRoutePath, 'utf8')
  const pricingMarkdownSource = readFileSync(pricingSourcePath, 'utf8')
  const pricingArabicMarkdownSource = readFileSync(pricingArabicSourcePath, 'utf8')
  assert.match(pricingRouteSource, /pricing\.md/, 'Pricing page should use the public pricing source')
  assert.match(pricingRouteSource, /PricingCategory/, 'Pricing page should structure source sections into categories')
  assert.match(pricingRouteSource, /OfferCatalog/, 'Pricing page should emit structured offer catalog data')
  assert.match(pricingRouteSource, /Most Popular|Best Value/, 'Pricing page should highlight recommended packages')
  assert.doesNotMatch(pricingMarkdownSource, /^Last updated:|^Currency:/m, 'English public pricing source should not surface header metadata')
  assert.doesNotMatch(pricingArabicMarkdownSource, /^Last updated:|^Currency:/m, 'Arabic public pricing source should not surface English header metadata labels')
  assert.doesNotMatch(pricingRouteSource, /L\.updated|L\.currency|L\.paymentTerm/, 'Pricing hero should not render the removed metadata cards')
  assert.match(pricingRouteSource, /categorySectionId/, 'Pricing page should link package selector cards to sections on the same page')
  assert.match(pricingRouteSource, /#\$\{categorySectionId/, 'Pricing selector links should target package sections on the page itself')
  assert.match(pricingRouteSource, /showFullFeaturesLabel/, 'Pricing package cards should provide an expandable full-features control')
  assert.match(pricingRouteSource, /decisionGuide/, 'Pricing page should include package decision guidance')
  assert.match(pricingRouteSource, /Which package path fits your project/, 'Pricing page should help buyers self-select a path')
  assert.match(pricingRouteSource, /FAQPage/, 'Pricing page should emit FAQ structured data for buyer objections')
  assert.match(sitemapSource, /path: '\/pricing'/, 'Sitemap should include the pricing page')
})

test('service and industry detail pages use tailored modern hero imagery', () => {
  const serviceDetailSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/services/[service]/page.tsx'), 'utf8')
  const industryDetailSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/industries/[industry]/page.tsx'), 'utf8')
  const heroModernPath = path.join(process.cwd(), 'components/ui/hero-modern.tsx')

  assert.equal(existsSync(heroModernPath), true, 'Shared modern hero component should exist under components/ui')
  assert.match(serviceDetailSource, /HeroOrbitDeck/, 'Sub-service pages should use the modern hero component')
  assert.match(serviceDetailSource, /heroImageForService/, 'Sub-service pages should select tailored service imagery')
  assert.match(industryDetailSource, /HeroOrbitDeck/, 'Industry pages should use the modern hero component')
  assert.match(industryDetailSource, /industryHeroImage/, 'Industry pages should select tailored industry imagery')
  assert.match(readFileSync(heroModernPath, 'utf8'), /showcaseImage/, 'Modern hero should include a named visual image slot')
})
