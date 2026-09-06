import { ProfessionalServicesIndustryPage } from '@/components/industry/professional-services/ProfessionalServicesIndustryPage'
import {
  createIndustryMetadata,
  createIndustryPage,
  industryStaticParams,
} from '../_shared/industry-route'

export const dynamicParams = false
export const generateStaticParams = industryStaticParams
export const generateMetadata = createIndustryMetadata('professional-services')
export default createIndustryPage('professional-services', ProfessionalServicesIndustryPage)
