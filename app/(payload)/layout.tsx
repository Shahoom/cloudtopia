import config from '@payload-config'
import '@payloadcms/next/css'
import './cloudtopia-admin.css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import { IBM_Plex_Sans_Arabic, Inter } from 'next/font/google'
import type { ServerFunctionClient } from 'payload'
import type { ReactNode } from 'react'
import { importMap } from './admin/importMap'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600', '700'], display: 'swap' })

// Payload's RootLayout renders <html>/<body> itself, so the font families are
// exposed as root CSS variables instead of classNames; popovers and drawers
// that portal to <body> still inherit them.
const fontVariables = `:root{--font-inter:${inter.style.fontFamily};--font-plex-arabic:${plexArabic.style.fontFamily}}`

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      <style>{fontVariables}</style>
      {children}
    </RootLayout>
  )
}
