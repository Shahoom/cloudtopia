import {
  createWebappNestedMetadata,
  createWebappNestedPage,
  createWebappNestedStaticParams,
} from '../../_shared/webapp-nested-page'

export const generateStaticParams = createWebappNestedStaticParams()
export const generateMetadata = createWebappNestedMetadata()
export default createWebappNestedPage()
