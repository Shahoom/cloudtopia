import type { LucideIcon } from 'lucide-react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'

export type LegalSection = {
  title: string
  content?: string
  items?: string[]
  footer?: string
}

/**
 * Shared server-rendered shell for legal pages (cookie policy, refund policy),
 * matching the existing Privacy/Terms visual design.
 */
export function LegalPage({
  icon: Icon,
  badge,
  heading,
  headingHighlight,
  lastUpdated,
  description,
  sections,
  dir,
}: {
  icon: LucideIcon
  badge: string
  heading: string
  headingHighlight: string
  lastUpdated: string
  description: string
  sections: LegalSection[]
  dir: 'ltr' | 'rtl'
}) {
  return (
    <div dir={dir}>
      <Section className="bg-gradient-to-br from-lavender via-lavender to-lavender">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-lavender/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
            <Icon className="w-5 h-5 text-primary-600" aria-hidden="true" />
            <span className="font-bold text-primary-700">{badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {heading}{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {headingHighlight}
            </span>
          </h1>
          <p className="text-lg text-neutral-600 mb-4">{lastUpdated}</p>
          <p className="text-neutral-600">{description}</p>
        </div>
      </Section>

      <Section background="gray">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, idx) => (
            <Card key={idx}>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">{section.title}</h2>
              <div className="space-y-4 text-neutral-700">
                {section.content && <p>{section.content}</p>}
                {section.items && (
                  <ul className="list-disc list-inside space-y-2 ms-4">
                    {section.items.map((item, i) => {
                      const sep = item.indexOf(': ')
                      if (sep > 0 && sep < 60) {
                        return (
                          <li key={i}>
                            <strong>{item.slice(0, sep)}:</strong> {item.slice(sep + 1)}
                          </li>
                        )
                      }
                      return <li key={i}>{item}</li>
                    })}
                  </ul>
                )}
                {section.footer && <p className="mt-4">{section.footer}</p>}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
