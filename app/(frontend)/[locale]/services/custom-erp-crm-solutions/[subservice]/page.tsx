import {
  createBusinessNestedMetadata,
  createBusinessNestedPage,
  createBusinessNestedStaticParams,
} from '../../_shared/business-nested-page'

export const generateStaticParams = createBusinessNestedStaticParams('custom-erp-crm-solutions')
export const generateMetadata = createBusinessNestedMetadata('custom-erp-crm-solutions')
export default createBusinessNestedPage('custom-erp-crm-solutions')
