import { LogisticsSupplyChainIndustryPage } from '@/components/industry/logistics-supply-chain/LogisticsSupplyChainIndustryPage'
import {
  createIndustryMetadata,
  createIndustryPage,
  industryStaticParams,
} from '../_shared/industry-route'

export const dynamicParams = false
export const generateStaticParams = industryStaticParams
export const generateMetadata = createIndustryMetadata('logistics-supply-chain')
export default createIndustryPage('logistics-supply-chain', LogisticsSupplyChainIndustryPage)
