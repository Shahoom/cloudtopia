import {
  createDigitalNestedMetadata,
  createDigitalNestedPage,
  createDigitalNestedStaticParams,
} from '../../_shared/digital-nested-page'

export const generateStaticParams = createDigitalNestedStaticParams('social-media-marketing')
export const generateMetadata = createDigitalNestedMetadata('social-media-marketing')
export default createDigitalNestedPage('social-media-marketing')
