import {
  createDigitalNestedMetadata,
  createDigitalNestedPage,
  createDigitalNestedStaticParams,
} from '../../_shared/digital-nested-page'

export const generateStaticParams = createDigitalNestedStaticParams('website-development')
export const generateMetadata = createDigitalNestedMetadata('website-development')
export default createDigitalNestedPage('website-development')
