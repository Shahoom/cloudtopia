import Link from 'next/link'

import type { Locale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/url'
import { getIndustryManifestEntry } from '@/lib/industries/manifest'
import { CANONICAL_SERVICE_TARGETS } from '@/lib/industries/service-targets'
import type {
  IndustryRelatedIndustryAnchor,
  IndustryServiceAnchor,
} from '@/lib/industries/types'

import styles from './industry-detail.module.css'

export type IndustryRelatedLinksProps = {
  locale: Locale
  services: readonly IndustryServiceAnchor[]
  industries: readonly IndustryRelatedIndustryAnchor[]
  className?: string
}

export function IndustryRelatedLinks({
  locale,
  services,
  industries,
  className = '',
}: IndustryRelatedLinksProps) {
  const labels = locale === 'ar'
    ? { services: 'الخدمات المرتبطة', industries: 'قطاعات ذات صلة' }
    : { services: 'Related services', industries: 'Related industries' }

  return (
    <aside className={`${styles.relatedLinks} ${className}`.trim()}>
      <nav aria-label={labels.services}>
        <p className={styles.relatedLabel}>{labels.services}</p>
        <ul className={styles.relatedList}>
          {services.map((service) => (
            <li key={service.serviceId}>
              <Link
                className={styles.relatedLink}
                href={localePath(
                  locale,
                  CANONICAL_SERVICE_TARGETS[service.serviceId],
                )}
                data-service={service.serviceId}
              >
                {service.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label={labels.industries}>
        <p className={styles.relatedLabel}>{labels.industries}</p>
        <ul className={styles.relatedList}>
          {industries.map((industry) => (
            <li key={industry.industryId}>
              <Link
                className={styles.relatedLink}
                href={localePath(
                  locale,
                  getIndustryManifestEntry(industry.industryId).route,
                )}
                data-related-industry={industry.industryId}
              >
                {industry.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
