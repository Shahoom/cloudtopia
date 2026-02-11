'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { NavBar } from '@/components/ui/tubelight-navbar'
import { Home, Briefcase, Sparkles, Info, Mail, FolderKanban } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { t, dir, locale } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Use Intersection Observer on all sections marked with data-header-theme="dark"
  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-header-theme="dark"]')
    if (darkSections.length === 0) {
      setIsDarkSection(false)
      return
    }

    // Track which dark sections are intersecting the top of the viewport (where the header is)
    const activeDarkSections = new Set<Element>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeDarkSections.add(entry.target)
          } else {
            activeDarkSections.delete(entry.target)
          }
        })
        setIsDarkSection(activeDarkSections.size > 0)
      },
      {
        // Only observe the top 80px of the viewport (where the header sits)
        rootMargin: '0px 0px -95% 0px',
        threshold: 0,
      }
    )

    darkSections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const l = (path: string) => `/${locale}${path === '/' ? '' : path}`

  const navigation = [
    { name: t.nav.home, href: l('/') },
    { name: t.nav.services, href: l('/services') },
    { name: t.nav.projects, href: l('/projects') },
    { name: t.nav.labs, href: l('/labs') },
    { name: t.nav.about, href: l('/about') },
    { name: t.nav.contact, href: l('/contact') },
  ]

  const navItems = [
    { name: t.nav.home, url: l('/'), icon: Home },
    { name: t.nav.services, url: l('/services'), icon: Briefcase },
    { name: t.nav.projects, url: l('/projects'), icon: FolderKanban },
    { name: t.nav.labs, url: l('/labs'), icon: Sparkles },
    { name: t.nav.about, url: l('/about'), icon: Info },
    { name: t.nav.contact, url: l('/contact'), icon: Mail },
  ]

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-[9999] transition-all duration-500 ${isScrolled
          ? isDarkSection
            ? 'bg-zinc-950/80 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/10'
            : 'bg-white/80 backdrop-blur-md shadow-md border-b border-neutral-200'
          : 'bg-transparent border-b border-transparent'
        }`}
      dir={dir}
    >
      <nav className="container">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'
          }`}>
          {/* Logo */}
          <Link
            href={l('/')}
            className={`flex items-center group relative ${dir === 'rtl' ? 'space-x-reverse space-x-2.5' : 'space-x-2.5'}`}
          >
            {/* Logo with hover effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
              <img
                src="/images/CloudTopia.svg"
                alt="CloudTopia Logo"
                className={`relative z-10 transition-all duration-300 group-hover:scale-110 ${isScrolled ? 'h-9' : 'h-11'
                  }`}
              />
            </div>

            {/* Brand text */}
            <div className="flex flex-col -space-y-0.5">
              <span className={`font-logo font-bold transition-all duration-500 group-hover:tracking-wide ${isScrolled ? 'text-xl' : 'text-2xl'} ${isDarkSection ? 'text-white' : 'text-neutral-900'
                }`}>
                Cloud<span className={`bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient ${isDarkSection
                    ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400'
                    : 'bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600'
                  }`}>Topia</span>
              </span>
              <span className={`text-[11px] font-medium tracking-wider uppercase transition-all duration-500 ${isDarkSection ? 'text-zinc-400' : 'text-neutral-500'
                }`}>
                {t.header.tagline}
              </span>
            </div>
          </Link>

          {/* Centered Navigation with Tubelight Effect */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <NavBar items={navItems} isDark={isDarkSection} />
          </div>

          {/* Right side: Language Switcher + CTA Button */}
          <div className={`hidden md:flex items-center ${dir === 'rtl' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            <LanguageSwitcher isDark={isDarkSection} />
            <Link
              href={l('/contact')}
              className="relative px-6 py-2.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/50 hover:scale-105"
            >
              <span className="relative z-10">{t.nav.getStarted}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20">
                <span className="absolute inset-0 animate-pulse bg-white"></span>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className={`md:hidden flex items-center ${dir === 'rtl' ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            <LanguageSwitcher isDark={isDarkSection} />
            <button
              type="button"
              className={`p-2 rounded-lg transition-all duration-500 relative group ${isDarkSection
                  ? 'text-zinc-300 hover:bg-white/10 hover:text-white'
                  : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}></span>
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''
                  }`}></span>
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className={`py-4 border-t ${isDarkSection ? 'border-white/10' : 'border-neutral-200'}`}>
            <div className="flex flex-col space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-3 font-medium transition-all duration-300 rounded-lg transform ${isDarkSection
                      ? 'text-zinc-300 hover:text-white hover:bg-white/10'
                      : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                    } ${dir === 'rtl' ? 'hover:-translate-x-2' : 'hover:translate-x-2'}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)'
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={l('/contact')}
                className="mt-4 w-full btn btn-primary bg-gradient-to-r from-primary-600 to-secondary-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center text-white font-semibold py-3 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  transitionDelay: mobileMenuOpen ? `${navigation.length * 50}ms` : '0ms',
                  opacity: mobileMenuOpen ? 1 : 0
                }}
              >
                {t.nav.getStarted}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
