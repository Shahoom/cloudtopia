import { TravelHospitalityIndustryPage } from '@/components/industry/travel-hospitality/TravelHospitalityIndustryPage'
import {
  createIndustryMetadata,
  createIndustryPage,
  industryStaticParams,
} from '../_shared/industry-route'

export const dynamicParams = false
export const generateStaticParams = industryStaticParams
export const generateMetadata = createIndustryMetadata('travel-hospitality')
export default createIndustryPage('travel-hospitality', TravelHospitalityIndustryPage)
