import { ConstructionIndustryPage } from '@/components/industry/construction/ConstructionIndustryPage'
import {
  createIndustryMetadata,
  createIndustryPage,
  industryStaticParams,
} from '../_shared/industry-route'

export const dynamicParams = false
export const generateStaticParams = industryStaticParams
export const generateMetadata = createIndustryMetadata('construction')
export default createIndustryPage('construction', ConstructionIndustryPage)
