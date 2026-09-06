import { LegalFirmsIndustryPage } from '@/components/industry/legal-firms/LegalFirmsIndustryPage'
import {
  createIndustryMetadata,
  createIndustryPage,
  industryStaticParams,
} from '../_shared/industry-route'

export const dynamicParams = false
export const generateStaticParams = industryStaticParams
export const generateMetadata = createIndustryMetadata('legal-firms')
export default createIndustryPage('legal-firms', LegalFirmsIndustryPage)
