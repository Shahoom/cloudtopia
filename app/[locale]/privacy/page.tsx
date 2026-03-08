import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { Shield } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - CloudTopia',
  description: 'CloudTopia\'s Privacy Policy. Learn how we collect, use, and protect your personal information.',
  robots: 'index, follow',
}

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-lavender via-lavender to-lavender">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-lavender/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
            <Shield className="w-5 h-5 text-primary-600" />
            <span className="font-bold text-primary-700">Privacy Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Privacy Matters
            </span>
          </h1>
          <p className="text-lg text-neutral-600 mb-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-neutral-600">
            At CloudTopia, we take your privacy seriously. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </Section>

      {/* Content */}
      <Section background="gray">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">1. Information We Collect</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Contact Information:</strong> Name, email address, phone number, and company details</li>
                <li><strong>Project Information:</strong> Details about your project requirements, budget, and timeline</li>
                <li><strong>Communication Records:</strong> Messages you send us through our contact forms or email</li>
                <li><strong>Technical Information:</strong> IP address, browser type, device information, and usage data</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">2. How We Use Your Information</h2>
            <div className="space-y-4 text-neutral-700">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Deliver our services and fulfill your project requirements</li>
                <li>Send you updates about your projects and our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">3. Information Sharing</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> With trusted partners who assist in delivering our services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly agree to share your information</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">4. Data Security</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure servers and infrastructure</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">5. Your Rights</h2>
            <div className="space-y-4 text-neutral-700">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Data Portability:</strong> Request your data in a portable format</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:info@cloudtopia.net" className="text-primary-600 hover:text-primary-700 font-medium">
                  info@cloudtopia.net
                </a>
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">6. Cookies and Tracking</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                We use cookies and similar tracking technologies to improve your experience on our website. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">7. International Data Transfers</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                CloudTopia operates globally and serves clients worldwide. Your information may be transferred to and processed in various regions as needed to provide our services. We ensure appropriate safeguards are in place for all international data transfers in compliance with applicable data protection laws.
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">8. Children's Privacy</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">9. Changes to This Policy</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </div>
          </Card>

          <Card className="bg-lavender border-primary-200">
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">10. Contact Us</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                If you have any questions about this Privacy Policy or how we handle your information, please contact us:
              </p>
              <div className="space-y-2 mt-4">
                <p><strong>Email:</strong>{' '}
                  <a href="mailto:info@cloudtopia.net" className="text-primary-600 hover:text-primary-700 font-medium">
                    info@cloudtopia.net
                  </a>
                </p>
                <p><strong>Phone:</strong>{' '}
                  <a href="tel:+905011511116" className="text-primary-600 hover:text-primary-700 font-medium">
                    +90 501 151 11 16
                  </a>
                </p>
                <p><strong>Service Areas:</strong> Worldwide</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  )
}

