import { EcommerceRetailIndustryPage } from '@/components/industry/ecommerce-retail/EcommerceRetailIndustryPage'
import {
  createIndustryMetadata,
  createIndustryPage,
  industryStaticParams,
} from '../_shared/industry-route'

export const dynamicParams = false
export const generateStaticParams = industryStaticParams
export const generateMetadata = createIndustryMetadata('ecommerce-retail')
export default createIndustryPage('ecommerce-retail', EcommerceRetailIndustryPage)
