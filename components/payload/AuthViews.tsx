import './auth/auth.css'
import { CreateFirstUserView, LoginView } from '@payloadcms/next/views'
import type { AdminViewServerProps } from 'payload'
import { AuthShell } from './auth/AuthShell.tsx'

// Sign-in and first-run views. Both wrap Payload's real views, so authentication,
// redirects and validation stay Payload's; CloudTopia owns only the chrome around
// the form (AuthShell) and the form's styling (auth/auth.css).

export function CloudTopiaLoginView(props: AdminViewServerProps) {
  return (
    <AuthShell title="Sign in to CloudTopia Admin" showSso>
      <LoginView {...props} />
    </AuthShell>
  )
}

export function CloudTopiaCreateFirstUserView(props: AdminViewServerProps) {
  return (
    <AuthShell
      title="Create the first admin account"
      intro="This account becomes the admin that owns CloudTopia Admin. You can add the rest of the team afterwards."
    >
      <CreateFirstUserView {...props} />
    </AuthShell>
  )
}
