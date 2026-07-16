import { NextRequest, NextResponse } from 'next/server'
import { healthcareLandingCopy } from '@/components/industry/healthcare/healthcare-content'
import { canonicalUrl } from '@/lib/i18n/url'
import { healthcareDefinition } from '@/lib/industries/definitions/healthcare'
import { industryPageMarkdown } from '@/lib/industries/industry-markdown'
import { CANONICAL_SERVICE_TARGETS } from '@/lib/industries/service-targets'
import { isIndustrySlug } from '@/lib/industries/slugs'
import {
  BASE_URL,
  COMPANY,
  CONTACTS,
  INDUSTRIES,
  OPERATING_MODEL,
  RESOURCES,
  SERVICES,
} from '@/lib/agent/site-facts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * "Markdown for Agents" content negotiation handler.
 *
 * `proxy.ts` rewrites any non-asset request carrying `Accept: text/markdown`
 * here, passing the original path in `x-md-path`. We return a markdown view of
 * the page with `Content-Type: text/markdown`. HTML stays the default for
 * browsers, which never send that Accept header.
 */
export function GET(request: NextRequest) {
  const rawPath = request.headers.get('x-md-path') || '/'
  const requestPath = rawPath.length > 1 && rawPath.endsWith('/')
    ? rawPath.slice(0, -1)
    : rawPath
  const locale: 'en' | 'ar' = requestPath === '/ar' || requestPath.startsWith('/ar/') ? 'ar' : 'en'
  const normalized = stripLocale(requestPath)
  const isHome = normalized === '/' || normalized === ''
  const canonicalPath = normalized || '/'
  const canonical = canonicalUrl(locale, canonicalPath)

  const industryMatch = normalized.match(/^\/industries\/([a-z0-9-]+)$/)
  const markdown = isHome
    ? homepageMarkdown()
    : normalized === '/industries/healthcare'
      ? healthcarePageMarkdown(locale, canonical)
      : industryMatch && isIndustrySlug(industryMatch[1])
        ? industryPageMarkdown(industryMatch[1], locale, canonical)
        : pageMarkdown(normalized, canonical)

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
      'x-markdown-tokens': String(Math.ceil(markdown.length / 4)),
      'Link': `<${canonical}>; rel="canonical"`,
      'Content-Location': canonical,
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

function healthcarePageMarkdown(locale: 'en' | 'ar', canonical: string): string {
  const page = healthcareDefinition.locales[locale]
  const copy = healthcareLandingCopy[locale]
  const continuity = page.sections.find(
    (section) => section.id === 'continuity-of-care' && section.type === 'journey-map',
  )
  const boundaries = page.sections.find(
    (section) => section.id === 'privacy-role-boundaries' && section.type === 'constraints',
  )
  const services = page.sections.find(
    (section) => section.id === 'healthcare-service-paths' && section.type === 'service-bridge',
  )
  const faq = page.sections.find(
    (section) => section.id === 'healthcare-faq' && section.type === 'faq',
  )

  const labels = locale === 'ar'
    ? {
        canonical: 'الصفحة الأساسية',
        overview: 'ما الذي تحتاجه تجربة الرعاية الصحية',
        capabilities: 'قدرات المنصة المترابطة',
        clinicTopia: 'كلينيك توبيا لإدارة العيادات',
        actor: 'المسؤول',
        services: 'مسارات التنفيذ',
        contact: 'ابدأ مشروعاً في قطاع الرعاية الصحية',
      }
    : {
        canonical: 'Canonical page',
        overview: 'What a dependable healthcare experience needs',
        capabilities: 'Connected platform capabilities',
        clinicTopia: 'ClinicTopia clinic management system',
        actor: 'Owner',
        services: 'Implementation paths',
        contact: 'Start a healthcare systems project',
      }

  const principles = copy.principles
    .map((principle) => `- **${principle.title}:** ${principle.description}`)
    .join('\n')
  const clinicCapabilities = copy.clinicTopiaCapabilities
    .map((capability) => `- ${capability}`)
    .join('\n')
  const journey = continuity?.type === 'journey-map'
    ? continuity.stages
        .map((stage, index) =>
          `${index + 1}. **${stage.label}** — ${stage.description}${stage.actor ? ` *(${labels.actor}: ${stage.actor})*` : ''}`,
        )
        .join('\n')
    : ''
  const trust = boundaries?.type === 'constraints'
    ? boundaries.items
        .map((item) => `- **${item.label}:** ${item.responsibility} ${item.dependency}`)
        .join('\n')
    : ''
  const serviceLinks = services?.type === 'service-bridge'
    ? services.serviceAnchors
        .map((service) =>
          `- [${service.label}](${canonicalUrl(locale, CANONICAL_SERVICE_TARGETS[service.serviceId])})`,
        )
        .join('\n')
    : ''
  const questions = faq?.type === 'faq'
    ? faq.items
        .map((item) => `### ${item.question}\n${item.answer}`)
        .join('\n\n')
    : ''

  return `# ${page.hero.h1}

> ${page.hero.intro}

- **${labels.canonical}:** ${canonical}
- **${locale === 'ar' ? 'اللغة' : 'Language'}:** ${locale === 'ar' ? 'العربية' : 'English'}
- **${locale === 'ar' ? 'آخر تحديث' : 'Last updated'}:** ${healthcareDefinition.updatedAt}

## ${labels.overview}

${copy.principlesIntro}

${principles}

## ${labels.capabilities}

${copy.capabilitiesIntro}

- ${copy.securePortal.label}: ${copy.securePortal.description}
${services?.type === 'service-bridge' ? services.serviceAnchors.map((service) => `- ${service.label}`).join('\n') : ''}

## ${labels.clinicTopia}

${copy.clinicTopiaIntro}

${clinicCapabilities}

- **${locale === 'ar' ? 'الرابط' : 'Product'}:** https://clinic.cloudtopia.net

## ${copy.journeyLabel}

${continuity?.intro ?? ''}

${journey}

## ${copy.trustLabel}

${boundaries?.intro ?? ''}

${trust}

## ${labels.services}

${services?.intro ?? ''}

${serviceLinks}

- [${copy.healthcareWebsiteAction}](${canonicalUrl(locale, '/services/website-development/healthcare-and-medical-website-development')})

## ${copy.faqLabel}

${questions}

## ${labels.contact}

- ${locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}: ${CONTACTS.email}
- ${locale === 'ar' ? 'الموقع' : 'Website'}: ${BASE_URL}
`
}

function stripLocale(path: string): string {
  if (path === '/en' || path === '/ar') return '/'
  if (path.startsWith('/en/')) return path.slice(3)
  if (path.startsWith('/ar/')) return path.slice(3)
  return path
}

function homepageMarkdown(): string {
  const services = SERVICES.map(
    (s) => `### ${s.title} (${s.titleArabic})\n${s.summary}\n\n${s.offerings.map((o) => `- ${o}`).join('\n')}`,
  ).join('\n\n')

  const whatsapp = CONTACTS.whatsapp.map((w) => `- **${w.region}** (${w.covers}): ${w.display} — ${w.link}`).join('\n')

  return `# ${COMPANY.name} — ${COMPANY.legalTagline}

> ${COMPANY.description}

*${COMPANY.philosophy}*

- **Founded:** ${COMPANY.founded}
- **Founder:** ${COMPANY.founder} (${COMPANY.founderArabic}) — ${COMPANY.founderRole}
- **Languages:** ${COMPANY.languages.join(', ')}
- **Website:** ${BASE_URL}

## Where CloudTopia operates

${COMPANY.hubs.map((h) => `- **${h.name}** — ${h.covers}`).join('\n')}
- Also serves ${COMPANY.alsoServes}.

## Services

CloudTopia organizes its work into 7 modular service categories (clients pick what they need — no forced bundles).

${services}

## How we work

${OPERATING_MODEL.map((m) => `- ${m}`).join('\n')}

## Industries served

${INDUSTRIES.map((i) => `- ${i}`).join('\n')}

## Contact

- **Email:** ${CONTACTS.email}
- **Instagram:** ${CONTACTS.instagram}
${whatsapp}

## Machine-readable resources for agents

- LLM context: ${RESOURCES.llms}
- Pricing: ${RESOURCES.pricing} (Arabic: ${RESOURCES.pricingArabic})
- API catalog: ${RESOURCES.apiCatalog}
- OpenAPI: ${RESOURCES.openapi}
- MCP server card: ${RESOURCES.mcpServerCard} (endpoint: ${RESOURCES.mcpEndpoint})
- Agent skills: ${RESOURCES.agentSkills}
- Sitemap: ${RESOURCES.sitemap}
`
}

function pageMarkdown(normalized: string, canonical: string): string {
  const title = titleFromPath(normalized)
  return `# ${title} — ${COMPANY.name}

${COMPANY.description}

- **Canonical HTML page:** ${canonical}
- **Full machine-readable context:** ${RESOURCES.llms}
- **Services overview:** ${SERVICES.map((s) => s.title).join(', ')}

## Contact

- Email: ${CONTACTS.email}
- Website: ${BASE_URL}
- WhatsApp: ${CONTACTS.whatsapp.map((w) => `${w.region} ${w.display}`).join(' · ')}

> This is a markdown rendering for AI agents. For the full page, request it as HTML (the default) at ${canonical}.
`
}

function titleFromPath(path: string): string {
  const seg = path.replace(/^\/+|\/+$/g, '').split('/').pop() || 'Home'
  return seg
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
