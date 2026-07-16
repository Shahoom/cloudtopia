import 'server-only'

import { healthcareDefinition } from '@/lib/industries/definitions/healthcare'
import { logisticsSupplyChainDefinition } from '@/lib/industries/definitions/logistics-supply-chain'
import { restaurantsDefinition } from '@/lib/industries/definitions/restaurants'
import type { IndustryPageRegistry } from '@/lib/industries/types'

export type { IndustryPageRegistry } from '@/lib/industries/types'

export const industryPageRegistry: IndustryPageRegistry = {
  healthcare: healthcareDefinition,
  fintech: null,
  'ecommerce-retail': null,
  'real-estate': null,
  education: null,
  'travel-hospitality': null,
  restaurants: restaurantsDefinition,
  'legal-firms': null,
  construction: null,
  retail: null,
  'professional-services': null,
  'logistics-supply-chain': logisticsSupplyChainDefinition,
  'government-public-sector': null,
}
