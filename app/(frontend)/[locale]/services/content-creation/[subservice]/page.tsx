import {
  createDigitalNestedMetadata,
  createDigitalNestedPage,
  createDigitalNestedStaticParams,
} from '../../_shared/digital-nested-page'

export const generateStaticParams = createDigitalNestedStaticParams('content-creation')
export const generateMetadata = createDigitalNestedMetadata('content-creation')
export default createDigitalNestedPage('content-creation')
