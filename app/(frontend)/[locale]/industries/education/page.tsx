import { EducationIndustryPage } from '@/components/industry/education/EducationIndustryPage'
import {
  createIndustryMetadata,
  createIndustryPage,
  industryStaticParams,
} from '../_shared/industry-route'

export const dynamicParams = false
export const generateStaticParams = industryStaticParams
export const generateMetadata = createIndustryMetadata('education')
export default createIndustryPage('education', EducationIndustryPage)
