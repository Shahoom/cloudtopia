import 'server-only'

import { fintechDefinition } from '@/lib/industries/definitions/fintech'
import { healthcareDefinition } from '@/lib/industries/definitions/healthcare'
import { logisticsSupplyChainDefinition } from '@/lib/industries/definitions/logistics-supply-chain'
import {
  constructionDefinition,
  ecommerceRetailDefinition,
  educationDefinition,
  governmentPublicSectorDefinition,
  legalFirmsDefinition,
  professionalServicesDefinition,
  realEstateDefinition,
  retailDefinition,
  travelHospitalityDefinition,
} from '@/lib/industries/definitions/remaining-worlds'
import { restaurantsDefinition } from '@/lib/industries/definitions/restaurants'
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
