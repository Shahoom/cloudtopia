import { FintechIndustryPage } from '@/components/industry/fintech/FintechIndustryPage'
import {
  createIndustryMetadata,
  createIndustryPage,
  industryStaticParams,
} from '../_shared/industry-route'

export const dynamicParams = false
export const generateStaticParams = industryStaticParams
export const generateMetadata = createIndustryMetadata('fintech')
export default createIndustryPage('fintech', FintechIndustryPage)
