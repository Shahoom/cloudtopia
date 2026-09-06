import {
  createBusinessNestedMetadata,
  createBusinessNestedPage,
  createBusinessNestedStaticParams,
} from '../../_shared/business-nested-page'

export const generateStaticParams = createBusinessNestedStaticParams('business-process-automation')
export const generateMetadata = createBusinessNestedMetadata('business-process-automation')
export default createBusinessNestedPage('business-process-automation')
