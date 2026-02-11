import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { FileText } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - CloudTopia',
  description: 'CloudTopia\'s Terms of Service. Review our terms and conditions for using our services.',
  robots: 'index, follow',
}

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
            <FileText className="w-5 h-5 text-primary-600" />
            <span className="font-bold text-primary-700">Terms of Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Terms of{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          <p className="text-lg text-neutral-600 mb-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-neutral-600">
            Please read these terms carefully before using CloudTopia's services.
          </p>
        </div>
      </Section>

      {/* Content */}
      <Section background="gray">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                By accessing or using CloudTopia's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">2. Services Description</h2>
            <div className="space-y-4 text-neutral-700">
              <p>CloudTopia provides the following services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Digital Presence Services:</strong> Website development, social media marketing, and content creation</li>
                <li><strong>Business Systems Development:</strong> Custom software solutions, CRM systems, and business management tools</li>
                <li><strong>Web Applications:</strong> Interactive web applications, dashboards, and SaaS solutions</li>
                <li><strong>AI Tools:</strong> Artificial intelligence powered tools and automation services</li>
              </ul>
              <p className="mt-4">
                All services are provided on a project basis with terms defined in individual project agreements.
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">3. Client Responsibilities</h2>
            <div className="space-y-4 text-neutral-700">
              <p>As a client, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information for your projects</li>
                <li>Respond to requests for information in a timely manner</li>
                <li>Review and approve deliverables within agreed timeframes</li>
                <li>Make payments according to the agreed schedule</li>
                <li>Provide necessary access to systems and platforms as required</li>
                <li>Use our services only for lawful purposes</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">4. Payment Terms</h2>
            <div className="space-y-4 text-neutral-700">
              <p>Payment terms for our services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Project Quotes:</strong> All projects begin with a detailed quote</li>
                <li><strong>Payment Schedule:</strong> Typically includes initial deposit and milestone payments</li>
                <li><strong>Payment Methods:</strong> Bank transfer, credit card, or other agreed methods</li>
                <li><strong>Late Payments:</strong> May result in project delays or suspension of services</li>
                <li><strong>Refunds:</strong> Subject to project stage and agreement terms</li>
              </ul>
              <p className="mt-4">
                Specific payment terms will be outlined in your project agreement.
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">5. Intellectual Property</h2>
            <div className="space-y-4 text-neutral-700">
              <p><strong>Client Ownership:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Upon full payment, you own the final deliverables created specifically for your project</li>
                <li>This includes custom designs, content, and code developed exclusively for you</li>
              </ul>
              <p><strong>CloudTopia Ownership:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>We retain ownership of our tools, frameworks, methodologies, and reusable components</li>
                <li>We reserve the right to use projects as portfolio examples unless otherwise agreed</li>
              </ul>
              <p><strong>Third-Party Assets:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Some projects may include third-party software, libraries, or assets</li>
                <li>These remain subject to their original licenses</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">6. Project Timeline and Delivery</h2>
            <div className="space-y-4 text-neutral-700">
              <p>Regarding project timelines:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Estimated timelines are provided in good faith but are not guaranteed</li>
                <li>Delays caused by client feedback or information delays may extend timelines</li>
                <li>Force majeure events may affect delivery schedules</li>
                <li>We will communicate any expected delays promptly</li>
                <li>Changes to project scope may require timeline adjustments</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">7. Revisions and Changes</h2>
            <div className="space-y-4 text-neutral-700">
              <p>Project revisions and changes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Each project includes a specified number of revision rounds</li>
                <li>Additional revisions beyond the agreed scope may incur extra fees</li>
                <li>Major scope changes require a new agreement and pricing</li>
                <li>Change requests should be submitted in writing</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">8. Warranties and Disclaimers</h2>
            <div className="space-y-4 text-neutral-700">
              <p><strong>We Warrant:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Services will be performed with professional care and skill</li>
                <li>We have the right to provide the services</li>
                <li>Deliverables will match agreed specifications</li>
              </ul>
              <p><strong>Disclaimer:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Services are provided "as is" except as specifically warranted</li>
                <li>We do not guarantee specific business results or outcomes</li>
                <li>We are not liable for third-party service failures</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">9. Limitation of Liability</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                CloudTopia's total liability for any claims arising from our services shall not exceed the amount paid for the specific service giving rise to the claim. We are not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Data loss (unless caused by our gross negligence)</li>
                <li>Third-party actions or services</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">10. Confidentiality</h2>
            <div className="space-y-4 text-neutral-700">
              <p>Both parties agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Keep confidential information private and secure</li>
                <li>Use confidential information only for the project purpose</li>
                <li>Not disclose confidential information to third parties without consent</li>
                <li>Return or destroy confidential information upon request</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">11. Termination</h2>
            <div className="space-y-4 text-neutral-700">
              <p>Either party may terminate a project agreement:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With written notice as specified in the project agreement</li>
                <li>Immediately if the other party breaches these terms</li>
                <li>Upon mutual agreement</li>
              </ul>
              <p className="mt-4">
                Upon termination, you will pay for all work completed up to the termination date.
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">12. Governing Law</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                These terms are governed by international business law and the laws of the jurisdiction where services are provided. Any disputes will be resolved through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Good faith negotiation between parties</li>
                <li>Mediation if negotiation fails</li>
                <li>Jurisdiction of Turkish courts if necessary</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">13. Changes to Terms</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </Card>

          <Card className="bg-primary-50 border-primary-200">
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">14. Contact Information</h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                For questions about these Terms of Service, please contact us:
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

