import { BASE_URL, CONTACTS } from '@/lib/agent/site-facts'
import { canonicalUrl } from '@/lib/i18n/url'
import { getIndustryPage } from '@/lib/industries/get-industry-page'
import { CANONICAL_SERVICE_TARGETS } from '@/lib/industries/service-targets'
import type { IndustrySlug } from '@/lib/industries/slugs'
import type { IndustrySection } from '@/lib/industries/types'

type MdLocale = 'en' | 'ar'

/**
 * Generic "Markdown for Agents" renderer for any published Industry World.
 * Drives entirely off the definition's typed sections, so every graduated world
 * gets an AI-readable representation automatically. Healthcare keeps its own
 * hand-tuned generator (see app/api/markdown/route.ts).
 */
function renderSection(section: IndustrySection, locale: MdLocale): string {
  const ownerLabel = locale === 'ar' ? 'المسؤول' : 'Owner'
  const head = `## ${section.title}\n\n${section.intro}\n`

  switch (section.type) {
    case 'pressure-field':
      return `${head}\n${section.signals
        .map((s) => `- **${s.label}:** ${s.description}`)
        .join('\n')}\n`
    case 'journey-map':
      return `${head}\n${section.stages
        .map(
          (s, i) =>
            `${i + 1}. **${s.label}** — ${s.description}${s.actor ? ` *(${ownerLabel}: ${s.actor})*` : ''}`,
        )
        .join('\n')}\n`
    case 'system-blueprint':
      return `${head}\n${section.layers
        .map((l) => `- **${l.label}:** ${l.description}`)
        .join('\n')}\n`
    case 'service-bridge':
      return `${head}\n${section.serviceAnchors
        .map(
          (a) =>
            `- [${a.label}](${canonicalUrl(locale, CANONICAL_SERVICE_TARGETS[a.serviceId])})`,
        )
        .join('\n')}\n`
    case 'constraints':
      return `${head}\n${section.items
        .map(
          (it) =>
            `- **${it.label}:** ${it.responsibility}${it.dependency ? ` (${it.dependency})` : ''}`,
        )
        .join('\n')}\n`
    case 'regional-fit':
      return `${head}\n${section.items
        .map((it) => `- **${it.label}:** ${it.description}`)
        .join('\n')}\n`
    case 'faq':
      return `${head}\n${section.items
        .map((it) => `### ${it.question}\n${it.answer}`)
        .join('\n\n')}\n`
    case 'closing-cta':
      return `${head}${section.decisionCopy ? `\n${section.decisionCopy}\n` : ''}`
    default:
      return head
  }
}

export function industryPageMarkdown(
  slug: IndustrySlug,
  locale: MdLocale,
  canonical: string,
): string {
  const resolution = getIndustryPage(slug, locale)
  if (resolution.kind !== 'world') {
    return `# ${slug}\n\n- Canonical: ${canonical}\n- Website: ${BASE_URL}\n`
  }

  const page = resolution.definition.locales[locale]
  const labels =
    locale === 'ar'
      ? {
          canonical: 'الصفحة الأساسية',
          langLabel: 'اللغة',
          lang: 'العربية',
          updated: 'آخر تحديث',
          contact: 'التواصل',
          email: 'البريد الإلكتروني',
          website: 'الموقع',
        }
      : {
          canonical: 'Canonical page',
          langLabel: 'Language',
          lang: 'English',
          updated: 'Last updated',
          contact: 'Contact',
          email: 'Email',
          website: 'Website',
        }

  const body = page.sections
    .map((section) => renderSection(section, locale))
    .join('\n')

  return `# ${page.hero.h1}

> ${page.hero.intro}

- **${labels.canonical}:** ${canonical}
- **${labels.langLabel}:** ${labels.lang}
- **${labels.updated}:** ${resolution.definition.updatedAt}

${body}

## ${labels.contact}

- ${labels.email}: ${CONTACTS.email}
- ${labels.website}: ${BASE_URL}
`
}
