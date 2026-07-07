'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  Cloud,
  Code2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import type { BlogPostSummary as BlogPostMeta } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'
import {
  brand,
  caseStudies,
  enterpriseServiceTracks,
  homeFaqs,
  labsCapabilities,
  menuColumns,
  pricingPackages,
  processSteps,
  proofCards,
  resourceFallbacks,
  seoClusters,
  servicePages,
  servicesOverview,
  techCategories,
  trustStats,
  valueCards,
  versionXAwards,
  versionXCountries,
  versionXFinderSteps,
  versionXOffices,
  versionXProofLogos,
  versionXServiceTabs,
  versionXWorkWith,
  type FaqItem,
  type ServicePageContent,
} from '@/lib/enterprise-content'
import { getEnterpriseIcon } from '@/components/enterprise/icon-map'
import EnterpriseAnimator from '@/components/enterprise/EnterpriseAnimator'

type Locale = 'en' | 'ar' | 'tr'

function l(locale: string, path: string) {
  return localePath((locale || 'en') as Locale, path)
}

function Container({ children, wide = false, className = '' }: { children: React.ReactNode; wide?: boolean; className?: string }) {
  return <div className={`mx-auto w-full ${wide ? 'max-w-[1320px]' : 'max-w-7xl'} ${className}`}>{children}</div>
}

function ButtonLink({ locale, href, children, variant = 'primary' }: { locale: string; href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'light' }) {
  const styles = {
    primary: 'bg-[#f2b233] text-[#07111f] hover:bg-[#ffd15c] shadow-[0_16px_38px_rgba(245,158,11,0.24)]',
    secondary: 'bg-white/72 text-[#07111f] border border-[rgba(15,23,42,0.12)] hover:border-[rgba(2,132,199,0.32)] hover:bg-[#e0f2fe]',
    light: 'bg-white text-[#07111f] hover:bg-[#e0f2fe]',
  }
  return (
    <Link href={l(locale, href)} className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-bold transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:ring-offset-2 ${styles[variant]}`}>
      {children} <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

function SectionHeader({ eyebrow, title, subtitle, dark = false }: { eyebrow?: string; title: string; subtitle?: string; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && <p className={`mb-4 text-xs font-extrabold uppercase tracking-[0.08em] ${dark ? 'text-sky-200' : 'text-[#0284c7]'}`}>{eyebrow}</p>}
      <h2 className={`${dark ? 'text-white' : 'text-[#07111f]'} text-[2.2rem] font-extrabold leading-[1.08] sm:text-5xl`}>{title}</h2>
      {subtitle && <p className={`mt-5 text-base leading-8 sm:text-lg ${dark ? 'text-white/72' : 'text-[#475569]'}`}>{subtitle}</p>}
    </div>
  )
}

function IconBox({ icon, dark = false }: { icon: string | LucideIcon; dark?: boolean }) {
  const Icon = typeof icon === 'string' ? getEnterpriseIcon(icon) : icon
  return <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${dark ? 'bg-white/10 text-sky-200' : 'bg-[#e0f2fe] text-[#0284c7]'}`}><Icon className="h-6 w-6" /></div>
}

function EnterpriseSection({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} dir="ltr" className={`ct-reveal ct-section-anchor relative overflow-hidden px-4 py-16 sm:px-6 md:py-24 lg:px-8 ${className}`}>{children}</section>
}

function DashboardVisual() {
  return (
    <div className="ct-float-slow relative mx-auto w-full max-w-[590px]">
      <div className="ct-blue-glow absolute inset-0 rounded-[38px] blur-2xl" />
      <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/76 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2 rounded-2xl bg-[#07111f] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
          <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
          <span className="h-3 w-3 rounded-full bg-[#16a34a]" />
          <span className="ms-auto text-xs font-bold uppercase tracking-[0.08em] text-white/70">Cloud foundation</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-[150px_1fr]">
          <div className="rounded-3xl border border-[rgba(15,23,42,0.08)] bg-[#faf8ff] p-4">
            <div className="mb-5 h-3 w-20 rounded-full bg-[#0284c7]" />
            {[70, 92, 58, 82].map((width) => <div key={width} className="mb-3 h-8 rounded-full bg-white shadow-sm" style={{ width: `${width}%` }} />)}
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {['Leads', 'Sales', 'Tasks'].map((label, index) => (
                <div key={label} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-4">
                  <p className="text-xs font-bold text-[#64748b]">{label}</p>
                  <p className="mt-2 text-2xl font-extrabold text-[#07111f]">{index === 0 ? '48' : index === 1 ? '$12k' : '17'}</p>
                </div>
              ))}
            </div>
            <div className="ct-card-highlight rounded-3xl border border-[rgba(2,132,199,0.18)] p-5">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-bold text-[#075985]">Revenue and lead flow</p><p className="text-xs text-[#64748b]">Website to CRM to follow-up</p></div>
                <BarChart3 className="h-8 w-8 text-[#0284c7]" />
              </div>
              <div className="mt-6 flex h-28 items-end gap-3">
                {[38, 62, 46, 84, 70, 96].map((height, index) => <span key={index} className="flex-1 rounded-t-xl bg-[#0284c7]" style={{ height: `${height}%`, opacity: 0.35 + index * 0.08 }} />)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#07111f] p-4 text-white"><Bot className="mb-3 h-5 w-5 text-sky-300" /><p className="text-sm font-bold">AI follow-up ready</p></div>
              <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-4"><CheckCircle2 className="mb-3 h-5 w-5 text-[#16a34a]" /><p className="text-sm font-bold text-[#07111f]">New lead captured</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero({ locale }: { locale: string }) {
  return (
    <section dir="ltr" className="ct-x-hero relative min-h-[760px] overflow-hidden px-4 pb-0 pt-32 text-white sm:px-6 md:pt-36 lg:min-h-[860px] lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,12,0)_0%,rgba(5,7,12,0.18)_52%,rgba(5,7,12,0.94)_100%)]" />
      <Container wide className="relative min-h-[540px]">
        <div className="ct-reveal is-visible max-w-[1100px] py-6">
          <p className="mb-4 inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-sky-100 backdrop-blur">Digital, cloud, systems, and AI</p>
          <h1 className="max-w-[1100px] text-balance text-[2.4rem] font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-[3.45rem]">AI-Ready Digital Systems for Smarter, Faster Business Operations</h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-white/78 sm:text-lg">CloudTopia builds premium websites, e-commerce, dashboards, CRM systems, and AI workflows that connect trust, leads, operations, and growth across Arabic, English, and Turkish markets.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink locale={locale} href={`/api/whatsapp?locale=${locale}`}>Request a Quote</ButtonLink>
            <ButtonLink locale={locale} href="/services" variant="light">Book a Strategy Call</ButtonLink>
          </div>
          <p className="mt-4 max-w-2xl text-sm font-semibold text-white/58">Strategy, design, development, automation, launch, and handoff under one technical partner.</p>
          <div className="mt-6 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {['CRM', 'Website', 'AI Agent', 'Analytics'].map((item) => (
              <span key={item} className="ct-shimmer rounded-2xl border border-white/14 bg-white/10 px-4 py-3 text-center text-xs font-extrabold uppercase tracking-[0.08em] text-white shadow-sm backdrop-blur">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute right-0 top-10 hidden w-[330px] xl:block">
          <div className="ct-x-cinematic-card ct-float-slow relative overflow-hidden rounded-[34px] border border-white/12 p-6 backdrop-blur-xl">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#f2b233]/20 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-sky-400/20 blur-2xl" />
            <p className="relative text-xs font-extrabold uppercase tracking-[0.14em] text-sky-100">CloudTopia delivery engine</p>
            <div className="relative mt-8 space-y-4">
              {[
                ['01', 'Strategy and scope', 'Business model, user flows, launch path'],
                ['02', 'Design and build', 'Website, system, CRM, automation'],
                ['03', 'Launch and optimize', 'Analytics, support, growth loops'],
              ].map(([number, title, text]) => (
                <div key={title} className="rounded-[24px] border border-white/12 bg-white/10 p-5">
                  <p className="text-sm font-extrabold text-[#f2b233]">{number}</p>
                  <h2 className="mt-2 text-xl font-extrabold text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/62">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Container wide className="relative border-t border-white/10 bg-black/28 px-5 py-5 backdrop-blur">
        <div className="grid gap-5 text-white sm:grid-cols-[0.48fr_1fr] sm:items-center">
          <p className="text-lg font-extrabold leading-tight">Powering experiences for ambitious businesses</p>
          <div className="overflow-hidden">
            <div className="ct-x-logo-track gap-4">
              {[...versionXProofLogos, ...versionXProofLogos].map((logo, index) => (
                <span key={`${logo}-${index}`} className="min-w-[160px] rounded-full border border-white/10 px-5 py-2 text-center text-sm font-extrabold uppercase tracking-[0.08em] text-white/78">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function CapabilityMarquee() {
  const items = ['Websites', 'Landing Pages', 'E-commerce', 'Dashboards', 'Client Portals', 'CRM', 'ERP', 'Inventory', 'AI Assistants', 'Lead Routing', 'Analytics', 'WhatsApp Flows']
  const loop = [...items, ...items]
  return (
    <section dir="ltr" className="overflow-hidden border-y border-[rgba(15,23,42,0.08)] bg-white py-5">
      <div className="ct-marquee gap-3 px-3">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="rounded-full border border-[rgba(2,132,199,0.18)] bg-[#faf8ff] px-5 py-2 text-sm font-extrabold text-[#075985] shadow-sm">
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}

function TrustStats() {
  return (
    <EnterpriseSection className="bg-white py-12 md:py-16">
      <Container>
        <h2 className="mb-8 text-center text-2xl font-extrabold text-[#07111f]">Intelligent digital solutions without limits.</h2>
        <div className="ct-stagger grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trustStats.map((stat) => (
            <article key={stat.title} className="ct-spotlight rounded-[26px] border border-[rgba(15,23,42,0.08)] border-t-[4px] border-t-[#f2b233] bg-[#fafafa] p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <p className="text-4xl font-extrabold text-[#0284c7]">{stat.number}</p>
              <h3 className="mt-4 text-xl font-extrabold text-[#07111f]">{stat.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#64748b]">{stat.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function RecognitionIntro() {
  return (
    <EnterpriseSection className="bg-white">
      <Container wide>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.08em] text-[#0284c7]">CloudTopia Recognition</p>
            <h2 className="text-[2.35rem] font-extrabold leading-[1.02] text-[#07111f] sm:text-5xl">Built to feel like a serious technology partner, not a template vendor.</h2>
            <p className="mt-6 text-base leading-8 text-[#475569] sm:text-lg">The Version X structure makes CloudTopia read like a full-service digital engineering company: clear proof, premium service depth, interactive guidance, and repeated conversion paths.</p>
          </div>
          <div className="grid gap-4">
            {versionXAwards.map((award) => (
              <article key={award.label} className="ct-spotlight grid gap-4 rounded-[28px] border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:grid-cols-[90px_1fr]">
                <p className="font-serif text-5xl font-black text-[#07111f]">{award.value}</p>
                <div>
                  <h3 className="text-xl font-extrabold text-[#07111f]">{award.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#64748b]">{award.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function ServiceTabs({ locale }: { locale: string }) {
  const [active, setActive] = useState(0)
  const current = versionXServiceTabs[active] || versionXServiceTabs[0]
  return (
    <EnterpriseSection className="ct-x-ice" id="version-x-services">
      <Container wide>
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="ct-x-pin rounded-[32px] border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.08em] text-[#0284c7]">Our Services</p>
            <h2 className="text-4xl font-extrabold leading-tight text-[#07111f]">Next-gen services designed for digital growth.</h2>
            <p className="mt-4 text-sm leading-7 text-[#64748b]">Choose a service layer and see how CloudTopia structures the business outcome, not just the screen.</p>
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2">
              {versionXServiceTabs.map((tab, index) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`ct-x-pill-scroll flex min-h-[48px] w-full min-w-[230px] items-center justify-between rounded-full border px-4 py-2 text-left text-sm font-extrabold transition lg:min-w-0 ${
                    active === index
                      ? 'border-[#5b5ff7] bg-[#5b5ff7] text-white shadow-[0_16px_35px_rgba(91,95,247,0.24)]'
                      : 'border-[rgba(15,23,42,0.10)] bg-[#f8fafc] text-[#334155] hover:border-[#5b5ff7] hover:bg-white'
                  }`}
                >
                  <span><span className="me-2 opacity-70">{tab.kicker}</span>{tab.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
          <div className="ct-x-tab-panel rounded-[32px] border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)]" key={current.label}>
            <div className="grid gap-7 lg:grid-cols-[1fr_0.72fr] lg:items-stretch">
              <div className="p-3 md:p-5">
                <p className="text-sm font-extrabold text-[#5b5ff7]">{current.kicker} {current.label}</p>
                <h3 className="mt-4 text-3xl font-extrabold leading-tight text-[#07111f] md:text-5xl">{current.title}</h3>
                <p className="mt-5 text-base leading-8 text-[#475569]">{current.description}</p>
                <div className="mt-8 space-y-3">
                  {current.bullets.map((bullet) => (
                    <p key={bullet} className="flex items-center gap-3 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#334155]">
                      <Check className="h-4 w-4 text-[#5b5ff7]" /> {bullet}
                    </p>
                  ))}
                </div>
                <Link href={l(locale, current.href)} className="mt-8 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#f2b233] px-6 py-3 text-sm font-extrabold text-[#07111f] transition hover:bg-[#ffd15c]">
                  Explore {current.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-[#07111f]">
                <Image src={current.image} alt={current.title} fill className="object-cover opacity-82" sizes="(min-width:1024px) 38vw, 100vw" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(5,7,12,0.72)_100%)]" />
                <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/12 bg-black/40 p-5 text-white backdrop-blur">
                  <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-sky-200">CloudTopia Build Path</p>
                  <p className="mt-2 text-xl font-extrabold">Plan {'->'} Build {'->'} Launch {'->'} Optimize</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function Services({ locale }: { locale: string }) {
  return (
    <EnterpriseSection className="bg-[#f4f1f8]" id="services-overview">
      <Container>
        <SectionHeader eyebrow="Service Layers" title="One Digital Partner for Every Stage of Growth" subtitle="Whether you need your first professional website or a complete internal business system, CloudTopia builds modular digital solutions that grow with your company." />
        <div className="ct-stagger mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesOverview.map((service) => (
            <article key={service.title} className="ct-spotlight group flex h-full flex-col rounded-3xl border border-[rgba(15,23,42,0.08)] bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition hover:-translate-y-1.5 hover:border-[rgba(2,132,199,0.28)] hover:shadow-[0_24px_70px_rgba(2,132,199,0.16)]">
              <IconBox icon={service.icon} />
              <h3 className="mt-6 text-2xl font-extrabold text-[#07111f]">{service.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-[#475569]">{service.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">{service.chips.map((chip) => <span key={chip} className="rounded-full bg-[#e0f2fe] px-3 py-1 text-xs font-bold text-[#075985]">{chip}</span>)}</div>
              <Link href={l(locale, service.href)} className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#0284c7]">Learn more <ArrowRight className="h-4 w-4" /></Link>
            </article>
          ))}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function ServiceUniverse({ locale }: { locale: string }) {
  return (
    <EnterpriseSection className="bg-white">
      <Container wide>
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
          <div className="sticky top-28 rounded-[32px] bg-[#07111f] p-8 text-white shadow-[0_28px_80px_rgba(7,17,31,0.20)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-sky-200">Capability Map</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight">Everything CloudTopia can connect around your business.</h2>
            <p className="mt-5 text-sm leading-7 text-white/72">
              A complete view of the digital layers your business can launch now, connect next, and automate later.
            </p>
            <div className="mt-8">
              <ButtonLink locale={locale} href={`/api/whatsapp?locale=${locale}`} variant="light">Request a Digital Plan</ButtonLink>
            </div>
          </div>
          <div className="ct-stagger grid gap-5 md:grid-cols-2">
            {menuColumns.map((column) => (
              <article key={column.title} className="ct-spotlight rounded-[28px] border border-[rgba(15,23,42,0.08)] bg-[#faf8ff] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
                <IconBox icon={column.icon} />
                <h3 className="mt-5 text-2xl font-extrabold text-[#07111f]">{column.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#64748b]">{column.description}</p>
                <div className="mt-6 grid gap-2">
                  {column.links.map((item) => (
                    <Link key={item.label} href={l(locale, item.href)} className="flex min-h-[42px] items-center justify-between rounded-2xl bg-white px-4 py-2 text-sm font-bold text-[#334155] transition hover:bg-[#e0f2fe] hover:text-[#075985]">
                      {item.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function EnterpriseServiceDirectory({ locale }: { locale: string }) {
  return (
    <EnterpriseSection className="bg-[#f7f8fb]" id="enterprise-service-directory">
      <Container wide>
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="ct-x-pin rounded-[32px] bg-[#07111f] p-8 text-white shadow-[0_28px_80px_rgba(7,17,31,0.22)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.10em] text-[#f2b233]">Enterprise Service Directory</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">A deeper service architecture without pretending to be another company.</h2>
            <p className="mt-5 text-sm leading-7 text-white/70">
              The structure mirrors an enterprise technology website: broad capability groups, dense internal links, clear routes, and service depth.
              The content remains CloudTopia-specific and focused on web, systems, cloud, and AI delivery.
            </p>
            <div className="mt-8"><ButtonLink locale={locale} href={`/api/whatsapp?locale=${locale}`} variant="light">Plan Your Service Roadmap</ButtonLink></div>
          </div>
          <div className="ct-stagger grid gap-5">
            {enterpriseServiceTracks.map((track, index) => (
              <article key={track.label} className="ct-spotlight grid gap-5 rounded-[30px] border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <p className="text-sm font-extrabold text-[#5b5ff7]">0{index + 1} / {track.label}</p>
                  <h3 className="mt-3 text-2xl font-extrabold leading-tight text-[#07111f] md:text-3xl">{track.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#64748b]">{track.description}</p>
                  <Link href={l(locale, track.href)} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0284c7]">
                    Explore track <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid content-start gap-2 sm:grid-cols-2">
                  {track.items.map((item) => (
                    <span key={item} className="rounded-2xl border border-[rgba(2,132,199,0.14)] bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#334155]">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function SeoArchitecture({ locale }: { locale: string }) {
  return (
    <EnterpriseSection className="bg-white" id="seo-architecture">
      <Container>
        <SectionHeader
          eyebrow="SEO Architecture"
          title="Built as a Searchable Website Ecosystem"
          subtitle="The site is structured around service hubs, industry pages, project proof, pricing clarity, and educational resources so visitors and search engines can understand the business."
        />
        <div className="ct-stagger mt-14 grid gap-6 lg:grid-cols-3">
          {seoClusters.map((cluster) => (
            <article key={cluster.title} className="ct-spotlight rounded-[30px] border border-[rgba(15,23,42,0.08)] bg-[#faf8ff] p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <h3 className="text-2xl font-extrabold text-[#07111f]">{cluster.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#64748b]">{cluster.description}</p>
              <div className="mt-6 grid gap-2">
                {cluster.links.map((link) => (
                  <Link key={link.label} href={l(locale, link.href)} className="flex min-h-[42px] items-center justify-between rounded-2xl bg-white px-4 py-2 text-sm font-bold text-[#334155] transition hover:bg-[#e0f2fe] hover:text-[#075985]">
                    {link.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function SolutionFinder() {
  const [step, setStep] = useState(0)
  const current = versionXFinderSteps[step] || versionXFinderSteps[0]
  const progress = ((step + 1) / versionXFinderSteps.length) * 100
  return (
    <EnterpriseSection id="tech-solution-finder" className="ct-x-ice">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex rounded-full bg-[#07111f] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-white">AI Powered</p>
          <h2 className="text-[2.2rem] font-extrabold leading-[1.08] text-[#07111f] sm:text-5xl">Find Your Perfect Tech Solution in 60 Seconds</h2>
          <p className="mt-5 text-base leading-8 text-[#475569] sm:text-lg">Answer a few quick questions and get a practical first-phase recommendation for your CloudTopia project.</p>
        </div>
        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[34px] border border-[rgba(15,23,42,0.08)] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.10)]">
          <div className="border-b border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-5">
            <div className="flex items-center justify-between gap-4 text-sm font-extrabold text-[#334155]">
              <span>Step {step + 1} of {versionXFinderSteps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-[#5b5ff7] transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="ct-x-step grid gap-8 p-6 md:p-9 lg:grid-cols-[0.75fr_1fr]" key={current.question}>
            <div className="rounded-[28px] bg-[#07111f] p-7 text-white">
              <Sparkles className="h-9 w-9 text-[#f2b233]" />
              <h3 className="mt-5 text-3xl font-extrabold leading-tight">{current.question}</h3>
              <p className="mt-4 text-sm leading-7 text-white/68">The final recommendation points visitors toward the right CloudTopia entry point: website, system, app, or automation.</p>
            </div>
            <div className="grid gap-3">
              {current.options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStep((value) => Math.min(versionXFinderSteps.length - 1, value + 1))}
                  className="group flex min-h-[58px] items-center justify-between rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-3 text-left text-sm font-extrabold text-[#334155] transition hover:border-[#5b5ff7] hover:bg-white hover:text-[#07111f]"
                >
                  <span><span className="me-3 text-[#5b5ff7]">0{index + 1}</span>{option}</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              ))}
              <div className="mt-3 flex flex-wrap gap-3">
                <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} className="rounded-full border border-[rgba(15,23,42,0.12)] px-5 py-2 text-sm font-extrabold text-[#334155]">Back</button>
                <button type="button" onClick={() => setStep(0)} className="rounded-full bg-[#e0f2fe] px-5 py-2 text-sm font-extrabold text-[#075985]">Restart</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function WorkWith() {
  return (
    <EnterpriseSection className="bg-white">
      <Container>
        <SectionHeader eyebrow="We Work With" title="Partnering With Businesses of All Sizes" subtitle="Custom technology solutions designed around each business stage, not one generic package." />
        <div className="ct-stagger mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {versionXWorkWith.map((item) => (
            <article key={item.title} className="ct-spotlight rounded-[28px] border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
              <Building2 className="h-8 w-8 text-[#5b5ff7]" />
              <h3 className="mt-5 text-2xl font-extrabold text-[#07111f]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#64748b]">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function DedicatedTeams({ locale }: { locale: string }) {
  const teams = ['Product strategist', 'UX/UI designer', 'Frontend engineer', 'Backend/API engineer', 'AI workflow builder', 'Launch & analytics support']
  return (
    <EnterpriseSection className="bg-[linear-gradient(0deg,#ffffff,#f2f2f7)]">
      <Container className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.08em] text-[#0284c7]">Dedicated Teams</p>
          <h2 className="text-[2.2rem] font-extrabold leading-[1.08] text-[#07111f] sm:text-5xl">Tailored development teams for every challenge.</h2>
          <p className="mt-5 text-base leading-8 text-[#475569]">Build with the right mix of strategy, design, engineering, automation, and launch support around your timeline.</p>
          <div className="mt-8"><ButtonLink locale={locale} href={`/api/whatsapp?locale=${locale}`}>Get a Dedicated Team</ButtonLink></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {teams.map((team, index) => (
            <article key={team} className="ct-spotlight rounded-[26px] border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-extrabold text-[#5b5ff7]">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-extrabold text-[#07111f]">{team}</h3>
            </article>
          ))}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function ModernTeamCTA({ locale }: { locale: string }) {
  return (
    <section dir="ltr" className="bg-[#f7f8fb] px-4 py-10 sm:px-6 lg:px-8">
      <Container wide>
        <div className="grid gap-6 rounded-[30px] border border-[rgba(15,23,42,0.08)] bg-white p-7 shadow-[0_20px_55px_rgba(15,23,42,0.07)] md:grid-cols-[1fr_auto] md:items-center md:p-9">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.10em] text-[#0284c7]">Need the right team?</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#07111f] md:text-5xl">Struggling to find the right team for your project?</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#64748b]">Bring CloudTopia in for strategy, UX, engineering, automation, launch support, or a complete dedicated delivery squad.</p>
          </div>
          <ButtonLink locale={locale} href={`/api/whatsapp?locale=${locale}`}>Get in Touch Now</ButtonLink>
        </div>
      </Container>
    </section>
  )
}

function TrustedMarkets() {
  return (
    <EnterpriseSection className="bg-white py-14 md:py-16">
      <Container>
        <SectionHeader eyebrow="Market Fit" title="Built for the Business Models CloudTopia Serves" subtitle="A capability proof band based on real target markets and delivery focus, not fabricated client logos." />
        <div className="mt-12 overflow-hidden rounded-[30px] border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-5">
          <div className="ct-x-logo-track gap-4">
            {[...versionXProofLogos, ...versionXProofLogos].map((logo, index) => (
              <span key={`${logo}-trusted-${index}`} className="min-w-[190px] rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white px-6 py-5 text-center text-sm font-extrabold uppercase tracking-[0.08em] text-[#334155] shadow-sm">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function Testimonials() {
  const proofItems = [
    ['Strategy documents', 'Scope, sitemap, page purpose, user journeys, and launch ownership are written before production work starts.'],
    ['Real projects shipped', 'KVAII, RAM Sustainable Development, and ARTUCKY remain the visible proof base until verified case studies expand.'],
    ['System roadmaps', 'CRM, ERP, inventory, booking, dashboard, and automation ideas are mapped into staged delivery paths.'],
    ['Multilingual foundations', 'Arabic, English, and Turkish journeys are planned with routing, layout, metadata, and market-specific clarity.'],
    ['Conversion-focused pages', 'Service pages, landing pages, contact paths, and WhatsApp flows are designed around action, not decoration.'],
    ['Cloud-ready handoff', 'Deployment, SSL, forms, analytics, Search Console, accounts, and ownership are part of the launch conversation.'],
  ]
  return (
    <EnterpriseSection className="bg-[#f6f6f6]">
      <Container>
        <SectionHeader eyebrow="Project Proof" title="Proof Through Real Deliverables" subtitle="A credibility layer based on visible deliverables, real project examples, clear ownership, and launch-ready handoff." />
        <div className="ct-stagger mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proofItems.map(([title, text], index) => (
            <article key={title} className="ct-spotlight rounded-[30px] border border-[rgba(15,23,42,0.08)] bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-extrabold text-[#5b5ff7]">0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-extrabold text-[#07111f]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#64748b]">{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function OfficesAndCountries() {
  return (
    <>
      <EnterpriseSection className="bg-white">
        <Container>
          <SectionHeader eyebrow="Our Offices" title="Delivery Presence Across Key Markets" subtitle="CloudTopia works from Turkey with Gulf-focused digital delivery and remote support for international teams." />
          <div className="ct-stagger mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {versionXOffices.map((office) => (
              <article key={office.city} className="rounded-[28px] border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-6">
                <MapPin className="h-7 w-7 text-[#5b5ff7]" />
                <h3 className="mt-5 text-2xl font-extrabold text-[#07111f]">{office.city}</h3>
                <p className="mt-1 text-sm font-extrabold text-[#0284c7]">{office.region}</p>
                <p className="mt-3 text-sm leading-7 text-[#64748b]">{office.detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </EnterpriseSection>
      <section className="overflow-hidden bg-[#5b5ff7] py-6 text-white">
        <div className="ct-x-ltr-track gap-4">
          {[...versionXCountries, ...versionXCountries].map((country, index) => (
            <span key={`${country}-${index}`} className="rounded-full border border-white/20 px-5 py-2 text-sm font-extrabold uppercase tracking-[0.08em] text-white/86">{country}</span>
          ))}
        </div>
      </section>
    </>
  )
}

function Proof() {
  return (
    <EnterpriseSection className="bg-white">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.08em] text-[#0284c7]">CloudTopia Method</p>
          <h2 className="text-[2.2rem] font-extrabold leading-[1.08] text-[#07111f] sm:text-5xl">Designed for Business Outcomes, Not Just Screens</h2>
          <p className="mt-5 text-base leading-8 text-[#475569] sm:text-lg">A premium website is only useful when it helps the business earn trust, collect better leads, reduce manual work, or launch a scalable system.</p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-3xl border border-[rgba(2,132,199,0.22)] bg-[#e0f2fe] px-5 py-4 text-sm font-extrabold text-[#075985]"><ShieldCheck className="h-5 w-5" />Strategy, UX, systems, automation</div>
        </div>
        <div className="ct-stagger grid gap-5 md:grid-cols-3">
          {proofCards.map((card) => (
            <article key={card.title} className="rounded-3xl border border-[rgba(15,23,42,0.08)] bg-[#faf8ff] p-6">
              <IconBox icon={card.icon} />
              <h3 className="mt-5 text-xl font-extrabold text-[#07111f]">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#64748b]">{card.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function OperatingProof() {
  const rows = [
    ['Scope clarity', 'Requirements, pages, systems, integrations, ownership, and responsibilities are written before development starts.'],
    ['Conversion path', 'Every page and feature has a job: explain, qualify, capture, route, sell, report, or automate.'],
    ['Multilingual structure', 'Arabic, English, and Turkish flows are planned as separate user experiences, not pasted translations.'],
    ['Launch readiness', 'Forms, WhatsApp links, analytics, Search Console, SSL, domain, and deployment checks are part of the launch path.'],
  ]

  return (
    <EnterpriseSection className="bg-[#f4f1f8]">
      <Container>
        <div className="grid overflow-hidden rounded-[32px] border border-[rgba(15,23,42,0.08)] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] lg:grid-cols-[0.86fr_1.14fr]">
          <div className="ct-dark-gradient p-8 text-white md:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-sky-200">Operational Proof</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight">Trust signals built from how the work is delivered.</h2>
            <p className="mt-5 text-sm leading-7 text-white/72">
              Concrete delivery controls a client can verify during the project: scope, ownership, launch readiness, and measurable handoff.
            </p>
          </div>
          <div className="grid divide-y divide-[rgba(15,23,42,0.08)]">
            {rows.map(([title, description], index) => (
              <article key={title} className="grid gap-4 p-6 sm:grid-cols-[80px_1fr] sm:items-start">
                <p className="text-3xl font-extrabold text-[#0284c7]">0{index + 1}</p>
                <div>
                  <h3 className="text-xl font-extrabold text-[#07111f]">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#64748b]">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function Labs({ locale }: { locale: string }) {
  return (
    <EnterpriseSection className="ct-dark-gradient bg-[#07111f]">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[32px] border border-white/12 bg-white/8 p-8 shadow-[0_28px_80px_rgba(7,17,31,0.28)] backdrop-blur">
          <IconBox icon={Bot} dark />
          <h2 className="mt-7 text-4xl font-extrabold leading-tight text-white">CloudTopia Labs: AI Workflows for Real Business Tasks</h2>
          <p className="mt-5 text-base leading-8 text-white/72">Use AI where it actually saves time: lead handling, content operations, customer support, internal search, reporting, and workflow automation.</p>
          <div className="mt-8 rounded-3xl bg-[#07111f]/72 p-5 text-sm font-bold text-white">Lead {'->'} AI Qualification {'->'} CRM {'->'} WhatsApp Follow-up {'->'} Report</div>
          <ButtonLink locale={locale} href="/labs" variant="light">Explore CloudTopia Labs</ButtonLink>
        </div>
        <div className="ct-stagger grid gap-4 sm:grid-cols-2">
          {labsCapabilities.map((capability) => <article key={capability} className="rounded-3xl border border-white/12 bg-white/10 p-5 text-white backdrop-blur"><Sparkles className="mb-4 h-5 w-5 text-sky-200" /><h3 className="text-lg font-extrabold">{capability}</h3></article>)}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function Why() {
  const cards = [
    ['Strategy before design', 'We define the business goal, audience, pages, features, and conversion path before development.'],
    ['Modular service model', 'Start with a website, then add dashboards, systems, automations, or AI when your business is ready.'],
    ['Multilingual by default', 'Arabic, English, and Turkish are treated as real user experiences, not simple translations.'],
    ['Business-first development', 'Every feature must support leads, sales, operations, customer experience, or long-term scalability.'],
    ['Transparent scope', 'Clear deliverables, timelines, pricing, and responsibilities before the project starts.'],
    ['Long-term scalability', 'Built with modern components, SEO structure, clean code, and future expansion in mind.'],
  ]
  return <CardGrid eyebrow="Why CloudTopia" title="Built Like a System, Not Just a Website" subtitle="Most businesses need a digital foundation that connects customers, operations, sales, and future growth." cards={cards} />
}

function IndustriesHome({ locale }: { locale: string }) {
  const cards = [
    ['Real Estate', 'Property websites, lead forms, CRM systems, WhatsApp routing, project showcases, and investor pages.'],
    ['Clinics & Beauty Centers', 'Clinic websites, treatment pages, booking flows, patient inquiry forms, and lead funnels.'],
    ['Restaurants & Cafes', 'QR menus, multilingual menus, product updates, branch pages, and ordering flows.'],
    ['Trading & Import/Export', 'Corporate websites, product catalogs, service pages, inquiry systems, and multilingual trade positioning.'],
    ['E-commerce', 'Product catalogs, checkout, payment integration, inventory-friendly structure, and analytics.'],
    ['Startups', 'MVP landing pages, SaaS dashboards, prototypes, and investor-ready product interfaces.'],
  ]
  return (
    <EnterpriseSection className="bg-[#f4f1f8]">
      <Container>
        <SectionHeader eyebrow="Industries" title="Digital Solutions for Real Business Models" subtitle="We shape websites, systems, and automation around how your business actually operates." />
        <div className="ct-stagger mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(([title, description], index) => (
            <article key={title} className="rounded-3xl border border-[rgba(15,23,42,0.08)] bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-extrabold text-[#0284c7]">0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-extrabold text-[#07111f]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#64748b]">{description}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink locale={locale} href="/industries" variant="secondary">Explore Industries</ButtonLink>
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function CardGrid({ eyebrow, title, subtitle, cards }: { eyebrow: string; title: string; subtitle: string; cards: string[][] }) {
  return (
    <EnterpriseSection className="bg-white">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="ct-stagger mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(([cardTitle, description]) => <article key={cardTitle} className="group rounded-3xl border border-[rgba(15,23,42,0.08)] bg-[#faf8ff] p-7"><div className="mb-5 h-1 w-10 rounded-full bg-[#0284c7] transition-all group-hover:w-20" /><h3 className="text-xl font-extrabold text-[#07111f]">{cardTitle}</h3><p className="mt-3 text-sm leading-7 text-[#64748b]">{description}</p></article>)}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function CaseStudies({ locale }: { locale: string }) {
  return (
    <EnterpriseSection className="bg-white">
      <Container>
        <SectionHeader eyebrow="Projects" title="Recent Work Built for Business Outcomes" subtitle="Every project is presented by the business problem, the digital solution, and the features that support growth." />
        <div className="ct-stagger mt-14 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.title} className="overflow-hidden rounded-3xl border border-[rgba(15,23,42,0.08)] bg-[#faf8ff] shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <div className="relative h-52 bg-[#07111f]">
                <Image src={study.image} alt={study.title} fill className="object-cover opacity-80" sizes="(min-width:1024px) 33vw, 100vw" />
                <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#075985]">{study.category}</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-extrabold text-[#07111f]">{study.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#475569]">{study.description}</p>
                <div className="mt-5 grid gap-3 text-sm md:grid-cols-2"><p><b>Challenge:</b> {study.challenge}</p><p><b>Solution:</b> {study.solution}</p></div>
                <div className="mt-5 flex flex-wrap gap-2">{study.features.map((feature) => <span key={feature} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#334155]">{feature}</span>)}</div>
                <Link href={l(locale, study.href)} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0284c7]">View Project <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function Process() {
  return (
    <EnterpriseSection className="bg-[#f4f1f8]">
      <Container>
        <SectionHeader eyebrow="Process" title="A Clear Process From Idea to Launch" subtitle="No vague development. We move from business understanding to design, development, launch, and growth through clear steps." />
        <div className="ct-stagger mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => <article key={step.title} className="rounded-3xl border border-[rgba(15,23,42,0.08)] bg-white p-7"><p className="text-sm font-extrabold text-[#0284c7]">0{index + 1}</p><h3 className="mt-4 text-xl font-extrabold text-[#07111f]">{step.title}</h3><p className="mt-3 text-sm leading-7 text-[#64748b]">{step.description}</p></article>)}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function EngagementModels({ locale }: { locale: string }) {
  const models = [
    ['Fixed Scope Projects', 'Best for websites, landing pages, catalogs, and clear business systems with defined deliverables.', ['Locked deliverables', 'Clear timeline', 'Milestone payments']],
    ['Growth Retainer', 'Best for businesses that need ongoing pages, campaigns, reporting, optimization, and technical support.', ['Monthly roadmap', 'Priority support', 'Continuous improvements']],
    ['Labs Sprint', 'Best for AI workflow experiments, automation prototypes, internal assistants, and lead handling systems.', ['Fast prototype', 'Workflow testing', 'Scale after validation']],
  ]

  return (
    <EnterpriseSection className="bg-white">
      <Container>
        <SectionHeader
          eyebrow="Engagement Models"
          title="Choose the Delivery Model That Matches Your Stage"
          subtitle="Simple project paths for startups, SMEs, and growing service businesses that need clarity before they commit."
        />
        <div className="ct-stagger mt-14 grid gap-6 lg:grid-cols-3">
          {models.map(([title, description, bullets]) => (
            <article key={title as string} className="ct-spotlight rounded-[28px] border border-[rgba(15,23,42,0.08)] bg-[#faf8ff] p-7 transition hover:-translate-y-1 hover:border-[rgba(2,132,199,0.24)] hover:shadow-[0_24px_70px_rgba(2,132,199,0.12)]">
              <h3 className="text-2xl font-extrabold text-[#07111f]">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#64748b]">{description}</p>
              <div className="mt-6 space-y-3">
                {(bullets as string[]).map((bullet) => (
                  <p key={bullet} className="flex items-center gap-3 text-sm font-bold text-[#334155]">
                    <CheckCircle2 className="h-5 w-5 text-[#16a34a]" />
                    {bullet}
                  </p>
                ))}
              </div>
              <Link href={`/api/whatsapp?locale=${locale}`} className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#0284c7]">
                Discuss this model <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function TechStack() {
  return (
    <EnterpriseSection className="ct-x-dark text-white">
      <Container>
        <SectionHeader dark eyebrow="Technology" title="Tech Stack for Mobile, Web, AI, and Business Systems" subtitle="We choose tools based on the project goal, budget, scalability needs, and maintenance requirements." />
        <div className="ct-stagger mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {techCategories.map((category) => <article key={category.title} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur"><h3 className="text-xl font-extrabold text-white">{category.title}</h3><div className="mt-5 flex flex-wrap gap-2">{category.items.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white/78">{item}</span>)}</div></article>)}
        </div>
      </Container>
    </EnterpriseSection>
  )
}

function Value({ locale }: { locale: string }) {
  return (
    <EnterpriseSection className="ct-dark-gradient bg-[#07111f]">
      <Container>
        <SectionHeader dark eyebrow="Connected Foundation" title="Maximize Business Value Through a Connected Digital Foundation" />
        <div className="ct-stagger mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{valueCards.map((card) => <article key={card.title} className="rounded-3xl border border-white/12 bg-white/10 p-6 text-white"><h3 className="text-xl font-extrabold">{card.title}</h3><p className="mt-3 text-sm leading-7 text-white/70">{card.description}</p></article>)}</div>
        <div className="mt-10 text-center"><ButtonLink locale={locale} href={`/api/whatsapp?locale=${locale}`} variant="light">Talk to CloudTopia</ButtonLink></div>
      </Container>
    </EnterpriseSection>
  )
}

function EnterpriseCTAInline({ locale }: { locale: string }) {
  return (
    <section className="bg-[#f4f1f8] px-4 py-10 sm:px-6 lg:px-8">
      <Container>
        <div className="grid gap-6 rounded-[28px] border border-[rgba(2,132,199,0.18)] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#0284c7]">Digital Plan</p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#07111f]">Not sure whether you need a website, CRM, app, or AI workflow first?</h2>
            <p className="mt-2 text-sm leading-7 text-[#64748b]">Share the business goal and CloudTopia will map the right first phase.</p>
          </div>
          <ButtonLink locale={locale} href={`/api/whatsapp?locale=${locale}`}>Request a Digital Plan</ButtonLink>
        </div>
      </Container>
    </section>
  )
}

function FAQ() {
  return (
    <EnterpriseSection className="ct-x-dark text-white">
      <Container>
        <SectionHeader dark eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Clear answers before starting your project." />
        <FAQList items={homeFaqs} dark />
      </Container>
    </EnterpriseSection>
  )
}

function FAQList({ items, dark = false }: { items: FaqItem[]; dark?: boolean }) {
  return (
    <div className="mx-auto mt-12 max-w-4xl space-y-3">
      {items.map((item, index) => (
        <details key={item.question} open={index === 0} className={`overflow-hidden rounded-2xl border ${dark ? 'border-white/10 bg-white/8' : 'border-[rgba(15,23,42,0.08)] bg-white'}`}>
          <summary className={`cursor-pointer px-5 py-4 font-extrabold marker:text-[#0284c7] ${dark ? 'text-white' : 'text-[#07111f]'}`}>{item.question}</summary>
          <div className={`px-5 pb-5 text-sm leading-7 ${dark ? 'text-white/68' : 'text-[#64748b]'}`}>{item.answer}</div>
        </details>
      ))}
    </div>
  )
}

function ProjectEstimatorStatic() {
  const steps = [
    { title: 'What is the current stage of your business?', options: ['Idea', 'Prototype', 'Existing website', 'Growing operations'] },
    { title: 'Which platform do you need?', options: ['Website', 'E-commerce', 'Web app', 'CRM / ERP', 'AI workflow'] },
    { title: 'What outcome matters most?', options: ['More trust', 'More leads', 'Less manual work', 'Better reporting'] },
  ]
  const [step, setStep] = useState(0)
  const current = steps[step] || steps[0]
  return (
    <section id="estimator" dir="ltr" className="ct-x-dark px-4 py-16 text-white sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/8 p-8 text-white backdrop-blur">
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#f2b233]">Project Journey</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight">Where are you in your app, website, or system journey?</h2>
          <p className="mt-5 leading-8 text-white/72">Move through the guided questions, then send the project note. The pattern mirrors a consultation widget while staying simple and reliable.</p>
          <div className="mt-8 space-y-3 text-sm font-bold text-white/82">
            {['Clear scope before development', 'Frontend-safe contact handoff', 'WhatsApp and email ready'].map((item) => (
              <p key={item} className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-sky-200" /> {item}</p>
            ))}
          </div>
        </div>
        <form action={`mailto:${brand.email}`} method="get" className="ct-spotlight rounded-[32px] border border-white/10 bg-white p-6 text-[#07111f] shadow-[0_28px_80px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-extrabold">{current.title}</h3>
            <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-extrabold text-[#5b5ff7]">Step {step + 1}/3</span>
          </div>
          <div className="ct-x-step mt-6 grid gap-3 sm:grid-cols-2" key={current.title}>
            {current.options.map((option) => (
              <label key={option} className="rounded-2xl border border-[rgba(15,23,42,0.10)] bg-[#f8fafc] px-4 py-3 font-bold text-[#334155] transition hover:border-[#5b5ff7] hover:bg-white">
                <input type="radio" name={`journey-step-${step}`} value={option} className="me-2 accent-[#5b5ff7]" />
                {option}
              </label>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} className="rounded-full border border-[rgba(15,23,42,0.12)] px-5 py-2 text-sm font-extrabold text-[#334155]">Back</button>
            <button type="button" onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))} className="rounded-full bg-[#f2b233] px-5 py-2 text-sm font-extrabold text-[#07111f]">Next</button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {['Name', 'Email', 'WhatsApp'].map((label) => (
              <label key={label}>
                <span className="mb-2 block text-sm font-extrabold text-[#334155]">{label}</span>
                <input name={label.toLowerCase()} required className="min-h-[48px] w-full rounded-2xl border border-[rgba(15,23,42,0.12)] bg-white px-4 py-3 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#bae6fd]" />
              </label>
            ))}
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-extrabold text-[#334155]">Project notes</span>
              <textarea name="body" rows={4} className="w-full rounded-2xl border border-[rgba(15,23,42,0.12)] bg-white px-4 py-3 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#bae6fd]" />
            </label>
          </div>
          <button type="submit" className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0284c7] px-6 py-3 font-bold text-white">Submit Request <ArrowRight className="h-4 w-4" /></button>
        </form>
      </div>
    </section>
  )
}

function Resources({ posts, locale }: { posts?: BlogPostMeta[]; locale: string }) {
  const cards = posts?.length ? posts.map((post) => ({ category: post.category?.name || 'Insight', title: post.title, excerpt: post.excerpt, href: `/blog/${post.slug}` })) : resourceFallbacks
  return (
    <EnterpriseSection className="bg-white">
      <Container>
        <SectionHeader eyebrow="Insights" title="Latest Insights From CloudTopia" />
        <div className="ct-stagger mt-12 grid gap-5 md:grid-cols-3">{cards.slice(0, 3).map((card) => <article key={card.title} className="ct-spotlight rounded-3xl border border-[rgba(15,23,42,0.08)] bg-[#faf8ff] p-6"><p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#0284c7]">{card.category}</p><h3 className="mt-4 text-xl font-extrabold text-[#07111f]">{card.title}</h3><p className="mt-3 text-sm leading-7 text-[#64748b]">{card.excerpt}</p><Link href={l(locale, card.href || '/blog')} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#0284c7]">Read More <ArrowRight className="h-4 w-4" /></Link></article>)}</div>
      </Container>
    </EnterpriseSection>
  )
}

function FinalCTA({ locale }: { locale: string }) {
  return (
    <section dir="ltr" className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <Container className="overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#07111f_0%,#0f2a44_48%,#0284c7_100%)] p-8 text-white shadow-[0_28px_80px_rgba(7,17,31,0.28)] md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><h2 className="text-3xl font-extrabold leading-tight md:text-5xl">Let's Build the Digital System Your Business Actually Needs</h2><p className="mt-5 max-w-3xl text-base leading-8 text-white/76">Start with a website, grow into a business system, and automate the workflows that slow your team down.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row"><ButtonLink locale={locale} href={`/api/whatsapp?locale=${locale}`} variant="light">Start a Project</ButtonLink><ButtonLink locale={locale} href="/pricing" variant="secondary">See Pricing First</ButtonLink></div>
        </div>
      </Container>
    </section>
  )
}

function VisionCTA({ locale, title, subtitle }: { locale: string; title: string; subtitle: string }) {
  return (
    <section dir="ltr" className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <Container wide className="overflow-hidden rounded-[34px] bg-[linear-gradient(135deg,rgba(5,7,12,0.88),rgba(5,7,12,0.72)),url('/images/homepage/clouds-b.webp')] bg-cover bg-center p-8 text-white shadow-[0_28px_80px_rgba(7,17,31,0.22)] md:p-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">{title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/76">{subtitle}</p>
          </div>
          <ButtonLink locale={locale} href={`/api/whatsapp?locale=${locale}`}>Contact with us</ButtonLink>
        </div>
      </Container>
    </section>
  )
}

function BlockchainStyleCapability({ locale }: { locale: string }) {
  return (
    <EnterpriseSection className="ct-x-dark text-white">
      <Container wide>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="ct-x-pin">
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#f2b233]">Decentralized Solutions</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">Comprehensive cloud, systems, and automation capability.</h2>
            <p className="mt-5 text-sm leading-7 text-white/68">A dark, high-density capability zone gives the site enterprise weight while keeping the content CloudTopia-specific.</p>
            <div className="mt-8"><ButtonLink locale={locale} href="/services" variant="light">Explore Capability Map</ButtonLink></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {servicesOverview.slice(0, 6).map((service) => (
              <article key={service.title} className="rounded-[28px] border border-white/10 bg-white/8 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/12">
                <IconBox icon={service.icon} dark />
                <h3 className="mt-5 text-2xl font-extrabold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/64">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </EnterpriseSection>
  )
}

export function EnterpriseHomeLite({ blogPosts, locale }: { blogPosts: BlogPostMeta[]; locale: string }) {
  return (
    <>
      <EnterpriseAnimator />
      <Hero locale={locale} />
      <RecognitionIntro />
      <TrustStats />
      <CapabilityMarquee />
      <ServiceTabs locale={locale} />
      <EnterpriseServiceDirectory locale={locale} />
      <CaseStudies locale={locale} />
      <SolutionFinder />
      <VisionCTA locale={locale} title="Power enterprise growth with intelligent technology" subtitle="Modernize your systems, adopt cloud and AI, and build digitally scalable ecosystems." />
      <WorkWith />
      <IndustriesHome locale={locale} />
      <BlockchainStyleCapability locale={locale} />
      <ModernTeamCTA locale={locale} />
      <DedicatedTeams locale={locale} />
      <TechStack />
      <SeoArchitecture locale={locale} />
      <TrustedMarkets />
      <Value locale={locale} />
      <VisionCTA locale={locale} title="Accelerate your digital journey today" subtitle="Transform your business with a team that delivers tailored digital solutions from first strategy call to launch." />
      <Process />
      <FAQ />
      <ProjectEstimatorStatic />
      <Testimonials />
      <Resources posts={blogPosts} locale={locale} />
      <OfficesAndCountries />
      <FinalCTA locale={locale} />
    </>
  )
}

function PageHero({ locale, eyebrow, title, subtitle, icon }: { locale: string; eyebrow: string; title: string; subtitle: string; icon: string | LucideIcon }) {
  const Icon = typeof icon === 'string' ? getEnterpriseIcon(icon) : icon
  return (
    <section dir="ltr" className="ct-x-hero relative overflow-hidden px-4 pb-20 pt-36 text-white sm:px-6 md:pb-28 md:pt-40 lg:px-8">
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.55fr]">
        <div className="ct-reveal is-visible">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-sky-100 backdrop-blur"><Icon className="h-4 w-4" />{eyebrow}</p>
          <h1 className="max-w-5xl text-balance text-[2.55rem] font-extrabold leading-[1.04] text-white sm:text-6xl lg:text-[4rem]">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-white/76">{subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><ButtonLink locale={locale} href={`/api/whatsapp?locale=${locale}`}>Start a Project</ButtonLink><ButtonLink locale={locale} href="/services" variant="light">Explore Services</ButtonLink></div>
        </div>
        <div className="ct-x-cinematic-card ct-float-medium hidden rounded-[32px] border border-white/12 p-4 backdrop-blur lg:block"><DashboardVisual /></div>
      </Container>
    </section>
  )
}

export function EnterpriseServicesLite({ locale }: { locale: string }) {
  return <><EnterpriseAnimator /><PageHero locale={locale} eyebrow="Services" title="Digital Services Built Around Your Business Growth" subtitle="From your first professional website to custom dashboards, CRM systems, and AI automation, CloudTopia gives your business a clear path into the cloud." icon={Cloud} /><ServiceTabs locale={locale} /><EnterpriseServiceDirectory locale={locale} /><ServiceUniverse locale={locale} /><SolutionFinder /><WorkWith /><BlockchainStyleCapability locale={locale} /><SeoArchitecture locale={locale} /><Process /><FAQ /><FinalCTA locale={locale} /></>
}

export function EnterpriseServiceLite({ locale, content }: { locale: string; content: ServicePageContent }) {
  const blocks = [
    ['What CloudTopia builds', content.builds, CheckCircle2],
    ['Key features', content.features, Code2],
    ['Business benefits', content.benefits, BarChart3],
    ['Technologies / integrations', content.technologies, Cloud],
    ['Relevant industries', content.industries, Globe2],
    ['Use cases', content.useCases, Sparkles],
  ] as const
  return (
    <>
      <EnterpriseAnimator />
      <PageHero locale={locale} eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} icon={content.icon} />
      <EnterpriseSection className="bg-white"><Container><SectionHeader eyebrow="Business Problem" title="The problem this solves" subtitle={content.problem} /></Container></EnterpriseSection>
      <EnterpriseSection className="bg-[#f4f1f8]"><Container><div className="ct-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">{blocks.map(([title, items, Icon]) => <article key={title} className="ct-spotlight rounded-3xl border border-[rgba(15,23,42,0.08)] bg-white p-7"><IconBox icon={Icon} /><h2 className="mt-5 text-2xl font-extrabold text-[#07111f]">{title}</h2><div className="mt-5 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded-full bg-[#e0f2fe] px-3 py-1 text-xs font-bold text-[#075985]">{item}</span>)}</div></article>)}</div></Container></EnterpriseSection>
      <SolutionFinder />
      <VisionCTA locale={locale} title="Need a build path before development starts?" subtitle="CloudTopia maps the right first phase, screens, integrations, and launch checklist before production work begins." />
      <Process />
      <DedicatedTeams locale={locale} />
      <EnterpriseSection className="bg-white"><Container><SectionHeader eyebrow="Service FAQ" title="Questions About This Service" /><FAQList items={content.faqs} /></Container></EnterpriseSection>
      <FinalCTA locale={locale} />
    </>
  )
}

export function EnterpriseLabsLite({ locale }: { locale: string }) {
  return <><EnterpriseAnimator /><PageHero locale={locale} eyebrow="CloudTopia Labs" title="AI Automation That Solves Real Business Bottlenecks" subtitle="CloudTopia Labs builds AI assistants, workflow automations, lead qualification tools, and internal copilots that save time and improve business response speed." icon={Bot} /><Labs locale={locale} /><SolutionFinder /><BlockchainStyleCapability locale={locale} /><Process /><FAQ /><FinalCTA locale={locale} /></>
}

export function EnterprisePricingLite({ locale }: { locale: string }) {
  return (
    <>
      <EnterpriseAnimator />
      <PageHero locale={locale} eyebrow="Pricing" title="Clear Packages for Websites, Systems, and Digital Growth" subtitle="Use these packages as a starting point. Final scope is confirmed before development so deliverables, timeline, and ownership are clear." icon={ShieldCheck} />
      <EnterpriseSection className="bg-white"><Container><div className="grid gap-6 lg:grid-cols-4">{pricingPackages.map((tier) => <article key={tier.name} className={`rounded-3xl border p-7 ${tier.highlighted ? 'border-[#0284c7] bg-[#e0f2fe] shadow-[0_24px_70px_rgba(2,132,199,0.16)]' : 'border-[rgba(15,23,42,0.08)] bg-white'}`}><h2 className="text-2xl font-extrabold text-[#07111f]">{tier.name}</h2><p className="mt-4 text-3xl font-extrabold text-[#0284c7]">{tier.price}</p><p className="mt-4 text-sm leading-7 text-[#475569]">{tier.description}</p><ul className="mt-6 space-y-3">{tier.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm font-bold text-[#334155]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#16a34a]" />{feature}</li>)}</ul><ButtonLink locale={locale} href={`/api/whatsapp?locale=${locale}`} variant={tier.highlighted ? 'primary' : 'secondary'}>Request Scope</ButtonLink></article>)}</div></Container></EnterpriseSection>
      <ProjectEstimatorStatic /><FAQ /><FinalCTA locale={locale} />
    </>
  )
}

export function EnterpriseProjectsLite({ locale }: { locale: string }) {
  return <><EnterpriseAnimator /><PageHero locale={locale} eyebrow="Projects" title="Projects Built With Strategy, Design, and Business Purpose" subtitle="Real CloudTopia work presented by the problem, solution, features, and practical business role." icon={BarChart3} /><CaseStudies locale={locale} /><Testimonials /><FinalCTA locale={locale} /></>
}

export function EnterpriseAboutLite({ locale }: { locale: string }) {
  return <><EnterpriseAnimator /><PageHero locale={locale} eyebrow="About CloudTopia" title="CloudTopia Helps Businesses Move Into the Cloud, Step by Step" subtitle="CloudTopia is a digital and cloud technologies company helping businesses build websites, web applications, business systems, and AI-powered workflows." icon={Cloud} /><RecognitionIntro /><Why /><WorkWith /><Process /><OfficesAndCountries /><FinalCTA locale={locale} /></>
}

export function EnterpriseIndustriesLite({ locale }: { locale: string }) {
  return <><EnterpriseAnimator /><PageHero locale={locale} eyebrow="Industries" title="Digital Solutions for Real Business Models" subtitle="CloudTopia designs websites, systems, and automation around the way your industry sells, serves, books, reports, and grows." icon={Globe2} /><IndustriesHome locale={locale} /><WorkWith /><SolutionFinder /><VisionCTA locale={locale} title="Shape the right digital system for your industry" subtitle="Start with the customer path, then connect the website, forms, CRM, reporting, and automation around it." /><FinalCTA locale={locale} /></>
}

export function EnterpriseContactLite({ locale }: { locale: string }) {
  return (
    <>
      <EnterpriseAnimator />
      <PageHero locale={locale} eyebrow="Contact" title="Tell Us What You Want to Build" subtitle="Share your goal, stage, and the business problem. CloudTopia will help shape the right digital path." icon={Mail} />
      <EnterpriseSection className="bg-white"><Container><div className="grid gap-8 lg:grid-cols-[0.75fr_1fr]"><div className="rounded-[32px] bg-[#07111f] p-8 text-white"><h2 className="text-3xl font-extrabold">Direct contact</h2><div className="mt-7 space-y-4"><a href={`mailto:${brand.email}`} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 font-bold"><Mail className="h-5 w-5 text-sky-200" />{brand.email}</a><a href={brand.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 font-bold"><Phone className="h-5 w-5 text-sky-200" />{brand.whatsapp}</a></div></div><form action={`mailto:${brand.email}`} method="get" className="rounded-[32px] border border-[rgba(15,23,42,0.08)] bg-[#faf8ff] p-7"><div className="grid gap-4 sm:grid-cols-2">{['Name', 'Email', 'WhatsApp', 'Company', 'Service interest'].map((label) => <label key={label} className={label === 'Service interest' ? 'sm:col-span-2' : ''}><span className="mb-2 block text-sm font-extrabold text-[#334155]">{label}</span><input name={label.toLowerCase().replaceAll(' ', '-')} required={label === 'Name' || label === 'Email'} className="min-h-[48px] w-full rounded-2xl border border-[rgba(15,23,42,0.12)] bg-white px-4 py-3 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#bae6fd]" /></label>)}<label className="sm:col-span-2"><span className="mb-2 block text-sm font-extrabold text-[#334155]">Project notes</span><textarea name="body" rows={6} required className="w-full rounded-2xl border border-[rgba(15,23,42,0.12)] bg-white px-4 py-3 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#bae6fd]" /></label></div><button type="submit" className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#0284c7] px-7 py-3 font-extrabold text-white">Send Project Request <Send className="h-4 w-4" /></button></form></div></Container></EnterpriseSection>
      <ProjectEstimatorStatic />
      <OfficesAndCountries />
    </>
  )
}
