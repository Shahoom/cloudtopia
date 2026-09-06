import { GovernmentPublicSectorIndustryPage } from '@/components/industry/government-public-sector/GovernmentPublicSectorIndustryPage'
import {
  createIndustryMetadata,
  createIndustryPage,
  industryStaticParams,
} from '../_shared/industry-route'

export const dynamicParams = false
export const generateStaticParams = industryStaticParams
export const generateMetadata = createIndustryMetadata('government-public-sector')
export default createIndustryPage('government-public-sector', GovernmentPublicSectorIndustryPage)
