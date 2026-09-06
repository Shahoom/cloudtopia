import {
  createBusinessNestedMetadata,
  createBusinessNestedPage,
  createBusinessNestedStaticParams,
} from '../../_shared/business-nested-page'

export const generateStaticParams = createBusinessNestedStaticParams('business-management-systems')
export const generateMetadata = createBusinessNestedMetadata('business-management-systems')
export default createBusinessNestedPage('business-management-systems')
