import { RestaurantsIndustryPage } from '@/components/industry/restaurants/RestaurantsIndustryPage'
import {
  createIndustryMetadata,
  createIndustryPage,
  industryStaticParams,
} from '../_shared/industry-route'

export const dynamicParams = false
export const generateStaticParams = industryStaticParams
export const generateMetadata = createIndustryMetadata('restaurants')
export default createIndustryPage('restaurants', RestaurantsIndustryPage)
