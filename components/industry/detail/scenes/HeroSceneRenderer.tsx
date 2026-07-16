import type { Locale } from '@/lib/i18n/config'
import type { IndustrySceneId } from '@/lib/industries/types'

import { HealthcarePulseScene } from './HealthcarePulseScene'
import { IndustryWorldScene } from './IndustryWorldScene'
import { LogisticsFlowScene } from './LogisticsFlowScene'
import { RestaurantPassScene } from './RestaurantPassScene'

export type IndustrySceneProps = {
  locale: Locale
  summary: string
  stages: readonly { id: string; label: string; state?: string }[]
}

export type HeroSceneRendererProps = IndustrySceneProps & {
  sceneId: IndustrySceneId
}

export function HeroSceneRenderer({
  sceneId,
  locale,
  summary,
  stages,
}: HeroSceneRendererProps) {
  const sceneProps = { locale, summary, stages }

  switch (sceneId) {
    case 'healthcare-pulse':
      return <HealthcarePulseScene {...sceneProps} />
    case 'logistics-flow':
      return <LogisticsFlowScene {...sceneProps} />
    case 'restaurant-pass':
      return <RestaurantPassScene {...sceneProps} />
    case 'fintech-ledger':
    case 'ecommerce-catalog':
    case 'real-estate-registry':
    case 'education-constellation':
    case 'travel-itinerary':
    case 'legal-docket':
    case 'construction-sequence':
    case 'retail-pulse':
    case 'expertise-architecture':
    case 'public-service-standard':
      return <IndustryWorldScene sceneId={sceneId} {...sceneProps} />
    default: {
      const exhaustiveScene: never = sceneId
      return exhaustiveScene
    }
  }
}
