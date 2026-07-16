import type { CSSProperties } from 'react'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageBreadcrumbs } from '@/components/ui/PageBreadcrumbs'
import { localeDirection, type Locale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/url'
import type { EffectiveIndustrySeo } from '@/lib/industries/resolve-industry-seo'
import type { IndustryPageDefinition, IndustryTheme } from '@/lib/industries/types'

import { IndustryHero } from './IndustryHero'
import {
  IndustrySectionRenderer,
  shouldRenderIndustrySection,
} from './IndustrySectionRenderer'
import styles from './industry-detail.module.css'

type IndustryThemeStyle = CSSProperties & Record<`--iw-${string}`, string>

export function industryThemeStyle(theme: IndustryTheme): IndustryThemeStyle {
  return {
    '--iw-canvas': theme.canvas,
    '--iw-surface': theme.surface,
    '--iw-surface-raised': theme.elevatedSurface,
    '--iw-ink': theme.ink,
    '--iw-ink-muted': theme.mutedInk,
    '--iw-accent': theme.accent,
    '--iw-accent-ink': theme.accentInk,
    '--iw-signal': theme.signal,
    '--iw-line': theme.line,
    '--iw-focus': theme.focus,
  }
}

export type IndustryPageShellProps = {
  locale: Locale
  definition: IndustryPageDefinition
  seo: EffectiveIndustrySeo
  schema: unknown | unknown[]
}

type Coordinate = {
  id: string
  label: string
}

function isDarkColor(color: string): boolean {
  const normalized = color.trim().replace(/^#/, '')
  const expanded = normalized.length === 3
    ? normalized.split('').map((part) => `${part}${part}`).join('')
    : normalized

  if (!/^[0-9a-f]{6}$/iu.test(expanded)) return false

  const red = Number.parseInt(expanded.slice(0, 2), 16)
  const green = Number.parseInt(expanded.slice(2, 4), 16)
  const blue = Number.parseInt(expanded.slice(4, 6), 16)
  return (red * 299 + green * 587 + blue * 114) / 1000 < 128
}

function WorldCoordinates({
  coordinates,
  label,
  className,
}: {
  coordinates: readonly Coordinate[]
  label: string
  className: string
}) {
  return (
    <nav className={className} aria-label={label}>
      <p className={styles.coordinateLabel}>{label}</p>
      <ol className={styles.coordinateList}>
        {coordinates.map((coordinate, index) => (
          <li key={coordinate.id}>
            <a
              className={styles.coordinateLink}
              href={`#${coordinate.id}`}
              data-coordinate={coordinate.id}
            >
              <span className={styles.coordinateNumber} aria-hidden="true">
                <bdi dir="ltr">{String(index + 1).padStart(2, '0')}</bdi>
              </span>
              <span>{coordinate.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function IndustryPageShell({
  locale,
  definition,
  seo,
  schema,
}: IndustryPageShellProps) {
  const page = definition.locales[locale]
  const theme = definition.world.theme
  const visibleSections = page.sections.filter(shouldRenderIndustrySection)
  const coordinates = visibleSections.map(({ id, title }) => ({ id, label: title }))
  const labels = locale === 'ar'
    ? {
        skip: 'تخطَّ إلى محتوى القطاع',
        industries: 'القطاعات',
        coordinates: 'إحداثيات عالم القطاع',
        breadcrumb: 'مسار التنقل',
      }
    : {
        skip: 'Skip to industry content',
        industries: 'Industries',
        coordinates: 'World coordinates',
        breadcrumb: 'Breadcrumb',
      }
  const headerTheme = isDarkColor(theme.surface) ? 'dark' : 'light'

  return (
    <div
      className={styles.world}
      dir={localeDirection[locale]}
      data-industry={definition.slug}
      data-locale={locale}
      data-world={definition.world.id}
      data-display-treatment={theme.displayTreatment}
      data-radius-mode={theme.radiusMode}
      data-motif-density={theme.motifDensity}
      data-scene-treatment={theme.sceneTreatment}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
      style={industryThemeStyle(theme)}
    >
      <a className={styles.skipLink} href="#industry-world-content">
        {labels.skip}
      </a>

      <JsonLd schema={schema} />

      <div className={styles.breadcrumbFrame}>
        <PageBreadcrumbs
          locale={locale}
          ariaLabel={labels.breadcrumb}
          className={styles.breadcrumb}
          items={[
            {
              label: labels.industries,
              href: localePath(locale, '/industries'),
            },
            { label: page.breadcrumbLabel },
          ]}
        />
      </div>

      <IndustryHero
        locale={locale}
        slug={definition.slug}
        hero={page.hero}
        sceneId={definition.world.heroScene}
        headerTheme={headerTheme}
      />

      <WorldCoordinates
        coordinates={coordinates}
        label={labels.coordinates}
        className={styles.coordinateInline}
      />

      <div className={styles.worldBody}>
        <WorldCoordinates
          coordinates={coordinates}
          label={labels.coordinates}
          className={styles.coordinateRail}
        />
        <div id="industry-world-content" className={styles.worldContent} tabIndex={-1}>
          {visibleSections.map((section) => (
            <IndustrySectionRenderer
              key={section.id}
              section={section}
              locale={locale}
              industrySlug={definition.slug}
              primaryCta={page.hero.primaryCta}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
