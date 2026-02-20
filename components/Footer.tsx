'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t, dir, locale } = useLanguage()

  const l = (path: string) => `/${locale}${path === '/' ? '' : path}`

  const footerLinks = {
    [t.footer.services]: [
      { name: t.footer.links.digitalPresence, href: l('/services#digital-presence') },
      { name: t.footer.links.businessSystems, href: l('/services#business-systems') },
      { name: t.footer.links.webApplications, href: l('/services#web-applications') },
      { name: t.footer.links.allServices, href: l('/services') },
    ],
    [t.footer.company]: [
      { name: t.footer.links.aboutUs, href: l('/about') },
      { name: t.footer.links.ourLabs, href: l('/labs') },
      { name: t.footer.links.contactUs, href: l('/contact') },
    ],
    [t.footer.legal]: [
      { name: t.footer.links.privacy, href: l('/privacy') },
      { name: t.footer.links.terms, href: l('/terms') },
    ],
  }

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/905011511116',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://x.com/thecloudtopia',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Shahoom',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/thecloudtopia',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5c3.18 0 5.75-2.57 5.75-5.75v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 1.5h8.5c2.35 0 4.25 1.9 4.25 4.25v8.5c0 2.35-1.9 4.25-4.25 4.25h-8.5c-2.35 0-4.25-1.9-4.25-4.25v-8.5c0-2.35 1.9-4.25 4.25-4.25zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 1.5c1.93 0 3.5 1.57 3.5 3.5S13.93 15.5 12 15.5 8.5 13.93 8.5 12 10.07 8.5 12 8.5zm5.25-2.5c-.41 0-.75.34-.75.75s.34.75.75.75.75-.34.75-.75-.34-.75-.75-.75z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-lavender text-neutral-600 border-t border-neutral-100" dir={dir}>
      <div className="container">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href={l('/')} className={`inline-flex items-center mb-4 ${dir === 'rtl' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <Image
                  src="/images/CloudTopia.svg"
                  alt="CloudTopia Logo"
                  width={150}
                  height={40}
                  priority
                  className="h-10 w-auto"
                />
                <span className="text-2xl font-bold font-logo text-neutral-900">
                  Cloud<span className="text-blue-600">Topia</span>
                </span>
              </Link>
              <p className="text-neutral-600 mb-6 max-w-sm font-medium">
                {t.footer.description}
              </p>
              <div className={`flex ${dir === 'rtl' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-lavender border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-neutral-900 font-semibold text-sm uppercase tracking-wider mb-4">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-neutral-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-600 text-sm font-medium">
              {t.footer.copyright.replace('{year}', currentYear.toString())}
            </p>
            <div className={`flex text-sm ${dir === 'rtl' ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
              <Link href={l('/privacy')} className="text-neutral-600 hover:text-blue-600 transition-colors font-medium">
                {t.footer.links.privacy}
              </Link>
              <Link href={l('/terms')} className="text-neutral-600 hover:text-blue-600 transition-colors font-medium">
                {t.footer.links.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
