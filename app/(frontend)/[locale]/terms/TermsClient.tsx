'use client'

import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { FileText } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function TermsClient({ t: pageT }: { t?: any }) {
  const { t: contextT, locale } = useLanguage()
  const t = pageT || contextT
  const terms = t.terms

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-lavender via-lavender to-lavender">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-lavender/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
            <FileText className="w-5 h-5 text-primary-600" />
            <span className="font-bold text-primary-700">{terms.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {locale === 'ar' ? (
              <>
                شروط{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  الخدمة
                </span>
              </>
            ) : (
              <>
                Terms of{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Service
                </span>
              </>
            )}
          </h1>
          <p className="text-lg text-neutral-600 mb-4">
            {terms.lastUpdated} {new Date().toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-neutral-600">
            {terms.description}
          </p>
        </div>
      </Section>

      {/* Content */}
      <Section background="gray">
        <div className="max-w-4xl mx-auto space-y-8">
          {terms.sections.map((section: any, idx: number) => (
            <Card key={idx}>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">{section.title}</h2>
              <div className="space-y-4 text-neutral-700">
                <p>{section.content}</p>
                {section.items && (
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    {section.items.map((item: string, i: number) => {
                      if (item.includes(':')) {
                        const [label, ...rest] = item.split(':')
                        return (
                          <li key={i}>
                            <strong>{label}:</strong> {rest.join(':')}
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
    </>
  )
}
