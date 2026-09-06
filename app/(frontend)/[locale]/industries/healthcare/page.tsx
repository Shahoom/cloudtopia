import { HealthcareIndustryPage } from '@/components/industry/healthcare/HealthcareIndustryPage'
import {
  createIndustryMetadata,
  createIndustryPage,
  industryStaticParams,
} from '../_shared/industry-route'

export const dynamicParams = false
export const generateStaticParams = industryStaticParams
export const generateMetadata = createIndustryMetadata('healthcare')
export default createIndustryPage('healthcare', HealthcareIndustryPage)
