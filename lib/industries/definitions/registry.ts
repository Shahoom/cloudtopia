import 'server-only'

import { constructionDefinition } from '@/lib/industries/definitions/construction'
import { ecommerceRetailDefinition } from '@/lib/industries/definitions/ecommerce-retail'
import { educationDefinition } from '@/lib/industries/definitions/education'
import { fintechDefinition } from '@/lib/industries/definitions/fintech'
import { governmentPublicSectorDefinition } from '@/lib/industries/definitions/government-public-sector'
import { healthcareDefinition } from '@/lib/industries/definitions/healthcare'
import { legalFirmsDefinition } from '@/lib/industries/definitions/legal-firms'
import { logisticsSupplyChainDefinition } from '@/lib/industries/definitions/logistics-supply-chain'
import { professionalServicesDefinition } from '@/lib/industries/definitions/professional-services'
import { realEstateDefinition } from '@/lib/industries/definitions/real-estate'
// `retail` is intentionally not a built world: its route 301s to `ecommerce-retail`.
import { retailDefinition } from '@/lib/industries/definitions/remaining-worlds'
import { restaurantsDefinition } from '@/lib/industries/definitions/restaurants'
import { travelHospitalityDefinition } from '@/lib/industries/definitions/travel-hospitality'
import type { IndustryPageRegistry } from '@/lib/industries/types'

export type { IndustryPageRegistry } from '@/lib/industries/types'

export const industryPageRegistry: IndustryPageRegistry = {
  healthcare: healthcareDefinition,
  fintech: fintechDefinition,
  'ecommerce-retail': ecommerceRetailDefinition,
  'real-estate': realEstateDefinition,
  education: educationDefinition,
  'travel-hospitality': travelHospitalityDefinition,
  restaurants: restaurantsDefinition,
  'legal-firms': legalFirmsDefinition,
  construction: constructionDefinition,
  retail: retailDefinition,
  'professional-services': professionalServicesDefinition,
  'logistics-supply-chain': logisticsSupplyChainDefinition,
  'government-public-sector': governmentPublicSectorDefinition,
}
