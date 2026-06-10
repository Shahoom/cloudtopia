import Link from 'next/link'
import { ArrowRight, Bot, Briefcase, Gauge, Globe2, Workflow } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'

const problems = [
  {
    title: 'I need a professional website',
    text: 'Build trust, explain services, capture leads, and support search visibility.',
    href: '/website-design',
    icon: Globe2,
  },
  {
    title: 'I need a client portal or dashboard',
    text: 'Give clients or teams a secure workspace for data, requests, and reporting.',
    href: '/web-applications',
    icon: Gauge,
  },
  {
    title: 'I need CRM or ERP system',
    text: 'Centralize leads, customers, operations, approvals, finance, and inventory flows.',
    href: '/business-systems-development',
    icon: Briefcase,
  },
  {
    title: 'I want to automate business operations',
    text: 'Connect repetitive workflows so teams spend less time moving information by hand.',
    href: '/services',
    icon: Workflow,
  },
  {
    title: 'I want to use AI in my business',
    text: 'Turn support, intake, reporting, and knowledge workflows into practical AI systems.',
    href: '/web-applications',
    icon: Bot,
  },
]

export function BusinessProblemSection({ locale }: { locale: string }) {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-normal text-primary-700">Find your path</p>
          <h2 className="mt-2 text-3xl font-black tracking-normal text-neutral-950 md:text-5xl">
            Not sure what your business needs?
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {problems.map(({ title, text, href, icon: Icon }) => (
            <Link
              key={title}
              href={localePath(locale, href)}
              className="group rounded-3xl border border-sky-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-500 hover:shadow-xl hover:shadow-sky-950/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4f1f8] text-primary-700 transition group-hover:bg-primary-600 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-black leading-tight text-neutral-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-primary-700">
                Explore
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
