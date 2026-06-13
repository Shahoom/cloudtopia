import { ArticlesWorkspace } from './articles/ArticlesWorkspace.tsx'

// Thin server wrapper registered as the `/admin/articles` custom view. Payload
// passes non-serializable server props to the view component, so we render the
// client workspace (which fetches its own data via the REST API) inside it.
export function ArticlesWorkspaceView() {
  return <ArticlesWorkspace />
}
