import {
  createDigitalNestedMetadata,
  createDigitalNestedPage,
  createDigitalNestedStaticParams,
} from '../../_shared/digital-nested-page'

export const generateStaticParams = createDigitalNestedStaticParams('search-engine-optimization')
export const generateMetadata = createDigitalNestedMetadata('search-engine-optimization')
export default createDigitalNestedPage('search-engine-optimization')
