import { CreateFirstUserView, LoginView } from '@payloadcms/next/views'
import type { AdminViewServerProps } from 'payload'
import type { ReactNode } from 'react'

export function CloudTopiaCreateFirstUserView(props: AdminViewServerProps) {
  return (
    <CloudTopiaAuthShell
      eyebrow="First run"
      headline="Create the command account"
      note="This creates the owner account for CloudTopia CMS. After it succeeds, you will land on the editorial dashboard."
    >
      <CreateFirstUserView {...props} />
    </CloudTopiaAuthShell>
  )
}

export function CloudTopiaLoginView(props: AdminViewServerProps) {
  return (
    <CloudTopiaAuthShell
      eyebrow="Secure CMS"
      headline="Welcome back"
      note="Use the admin account you created to manage live content, design tokens, portfolio projects, and media."
    >
      <LoginView {...props} />
    </CloudTopiaAuthShell>
  )
}

function CloudTopiaAuthShell({
  children,
  eyebrow,
  headline,
  note,
}: {
  children: ReactNode
  eyebrow: string
  headline: string
  note: string
}) {
  return (
    <main className="ct-auth">
      <style>{authStyles}</style>
      <section className="ct-auth__visual" aria-label="CloudTopia CMS">
        <div className="ct-auth__brand">CloudTopia CMS</div>
        <div className="ct-auth__copy">
          <p>{eyebrow}</p>
          <h1>{headline}</h1>
          <span>{note}</span>
        </div>
        <div className="ct-auth__signals">
          <span>Payload 3</span>
          <span>Local Postgres</span>
          <span>EN / AR / TR</span>
        </div>
      </section>
      <section className="ct-auth__form" aria-label="Authentication form">
        <div className="ct-auth__form-heading">
          <p>Admin Access</p>
          <h2>{headline}</h2>
          <span>{eyebrow === 'First run' ? 'Create the first secure editor account.' : 'Sign in to continue editing the website.'}</span>
        </div>
        {children}
      </section>
    </main>
  )
}

const authStyles = `
  /* ── Neutralize Payload wrapper layout during auth views ── */
  .template-default:has(.ct-auth) {
    display: block !important;
    grid-template-columns: none !important;
    background: #f6f9fc !important;
  }

  .template-default:has(.ct-auth) > nav,
  .template-default:has(.ct-auth) .template-default__nav-toggler-wrapper {
    display: none !important;
  }

  .template-default:has(.ct-auth) .template-default__wrap {
    width: 100% !important;
    max-width: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .ct-auth {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    display: grid;
    grid-template-columns: 0.45fr 0.55fr;
    background: #f6f9fc;
    color: #071522;
    font-family: var(--font-cairo), ui-sans-serif, system-ui, sans-serif;
  }

  .ct-auth,
  .ct-auth *,
  .ct-auth *::before,
  .ct-auth *::after {
    box-sizing: border-box;
  }

  .ct-auth__visual {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: clamp(28px, 4vw, 56px);
    color: #f8fbff;
    background:
      linear-gradient(145deg, rgba(255,255,255,0.08), transparent 38%),
      #071522;
    overflow: hidden;
  }

  .ct-auth__brand {
    width: max-content;
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 8px;
    padding: 10px 12px;
    color: #8ee6ff;
    font-size: 13px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0;
  }

  .ct-auth__copy p {
    margin: 0 0 14px;
    color: #8ee6ff;
    font-size: 13px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0;
  }

  .ct-auth__copy h1 {
    margin: 0;
    font-size: clamp(38px, 5vw, 72px);
    line-height: 1.02;
    letter-spacing: -0.01em;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  .ct-auth__copy span {
    display: block;
    max-width: 480px;
    margin-top: 22px;
    color: rgba(248,251,255,0.72);
    font-size: 16px;
    line-height: 1.7;
  }

  .ct-auth__signals {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .ct-auth__signals span {
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 8px;
    padding: 8px 10px;
    background: rgba(255,255,255,0.08);
    color: rgba(248,251,255,0.78);
    font-size: 12px;
    font-weight: 900;
  }

  .ct-auth__form {
    min-height: 100vh;
    display: grid;
    align-content: center;
    gap: 18px;
    padding: clamp(28px, 5vw, 64px);
    overflow-y: auto;
    overflow-x: hidden;
  }

  .ct-auth__form > * {
    width: min(100%, 480px);
    max-width: 100%;
    margin: 0 auto;
  }

  .ct-auth__form-heading {
    display: grid;
    gap: 6px;
  }

  .ct-auth__form-heading p,
  .ct-auth__form-heading h2,
  .ct-auth__form-heading span {
    margin: 0;
  }

  .ct-auth__form-heading p {
    color: #0b75bc;
    font-size: 12px;
    font-weight: 950;
    text-transform: uppercase;
  }

  .ct-auth__form-heading h2 {
    font-size: clamp(28px, 3.5vw, 40px);
    line-height: 1.08;
    letter-spacing: 0;
  }

  .ct-auth__form-heading span {
    color: #607286;
    line-height: 1.5;
  }

  .ct-auth .login__brand,
  .ct-auth .create-first-user > h1,
  .ct-auth .create-first-user > p {
    display: none;
  }

  .ct-auth .login,
  .ct-auth .create-first-user,
  .ct-auth form {
    width: 100%;
    max-width: 100%;
  }

  .ct-auth form {
    display: grid;
    gap: 18px;
    border: 1px solid #dce9f5;
    border-radius: 12px;
    background: #ffffff;
    padding: clamp(22px, 4vw, 34px);
    box-shadow: 0 22px 65px rgba(7, 21, 34, 0.1);
  }

  .ct-auth .field-type,
  .ct-auth .field-type input,
  .ct-auth .field-type label,
  .ct-auth .login__form__inputWrap {
    width: 100%;
  }

  .ct-auth input {
    min-height: 48px;
    border-radius: 8px;
    border: 1px solid #cfddea;
    background: #f8fbff;
    color: #071522;
    box-shadow: none;
  }

  .ct-auth input:focus {
    border-color: #169bd5;
    outline: 3px solid rgba(22, 155, 213, 0.16);
  }

  .ct-auth label {
    color: #26394d;
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0;
  }

  .ct-auth button[type="submit"] {
    width: 100%;
    min-height: 50px;
    border-radius: 10px;
    border: 0;
    background: #071522;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 18px;
    font-weight: 950;
    cursor: pointer;
  }

  .ct-auth button[type="submit"]:hover {
    background: #0d2238;
  }

  .ct-auth button[type="submit"] .btn__content {
    width: 100%;
    justify-content: center;
  }

  .ct-auth a {
    color: #0b75bc;
    font-weight: 900;
  }

  @media (max-width: 900px) {
    .ct-auth {
      grid-template-columns: 1fr;
      position: absolute;
      width: 100%;
      height: auto;
      min-height: 100vh;
      overflow-y: auto;
    }

    .ct-auth__visual {
      min-height: 35vh;
      justify-content: center;
      gap: 20px;
    }

    .ct-auth__form {
      min-height: auto;
      padding: 40px 24px;
    }
  }
`
