import {
  createDigitalNestedMetadata,
  createDigitalNestedPage,
  createDigitalNestedStaticParams,
} from '../../_shared/digital-nested-page'

export const generateStaticParams = createDigitalNestedStaticParams('ecommerce-development')
export const generateMetadata = createDigitalNestedMetadata('ecommerce-development')
export default createDigitalNestedPage('ecommerce-development')
