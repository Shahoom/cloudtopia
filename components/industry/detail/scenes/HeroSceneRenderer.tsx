import type { Locale } from '@/lib/i18n/config'
import type { IndustrySceneId } from '@/lib/industries/types'

import { HealthcarePulseScene } from './HealthcarePulseScene'
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
    default: {
      const exhaustiveScene: never = sceneId
      return exhaustiveScene
    }
  }
}
