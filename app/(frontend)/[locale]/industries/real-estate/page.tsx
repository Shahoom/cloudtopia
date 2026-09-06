import { RealEstateIndustryPage } from '@/components/industry/real-estate/RealEstateIndustryPage'
import {
  createIndustryMetadata,
  createIndustryPage,
  industryStaticParams,
} from '../_shared/industry-route'

export const dynamicParams = false
export const generateStaticParams = industryStaticParams
export const generateMetadata = createIndustryMetadata('real-estate')
export default createIndustryPage('real-estate', RealEstateIndustryPage)
