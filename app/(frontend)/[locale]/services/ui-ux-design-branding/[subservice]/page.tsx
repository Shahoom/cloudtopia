import {
  createDigitalNestedMetadata,
  createDigitalNestedPage,
  createDigitalNestedStaticParams,
} from '../../_shared/digital-nested-page'

export const generateStaticParams = createDigitalNestedStaticParams('ui-ux-design-branding')
export const generateMetadata = createDigitalNestedMetadata('ui-ux-design-branding')
export default createDigitalNestedPage('ui-ux-design-branding')
