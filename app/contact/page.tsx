'use client'

import { PrimaryButton, OutlineButton } from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import Tag from '@/components/ui/Tag'
import Card from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Clock, CheckCircle, Sparkles, Shield, Users } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function ContactPage() {
  const { t, dir, locale } = useLanguage()

  const l = (path: string) => `/${locale}${path === '/' ? '' : path}`

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const handleWhatsApp = () => {
    const message = `Hi CloudTopia! I'm interested in your services.

Name: ${formData.name || 'N/A'}
Email: ${formData.email || 'N/A'}
Company: ${formData.company || 'N/A'}
Interest: ${formData.interest || 'N/A'}

Message: ${formData.message || 'N/A'}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/905011511116?text=${encodedMessage}`, '_blank')
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `New Contact Form Submission from ${formData.name}`
    const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'N/A'}
Company: ${formData.company || 'N/A'}
Interest: ${formData.interest}
Budget: ${formData.budget || 'N/A'}
Timeline: ${formData.timeline || 'N/A'}

Message:
${formData.message}`

    window.location.href = `mailto:info@cloudtopia.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="text-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
              <MessageSquare className="w-5 h-5 text-primary-600" />
              <span className="font-bold text-primary-700">{t.contact.hero.badge}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t.contact.hero.title}{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t.contact.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t.contact.hero.description}
            </p>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="group"
              >
                <Card className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-200 bg-white/80 backdrop-blur-sm">
                  <Mail className="w-10 h-10 mx-auto mb-3 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-semibold text-neutral-900 mb-1">{t.contact.info.email}</p>
                  <a href="mailto:info@cloudtopia.net" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    info@cloudtopia.net
                  </a>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="group"
              >
                <Card className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-secondary-200 bg-white/80 backdrop-blur-sm">
                  <Phone className="w-10 h-10 mx-auto mb-3 text-secondary-600 group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-semibold text-neutral-900 mb-1">{t.contact.info.phone}</p>
                  <a href="tel:+905011511116" className="text-sm text-secondary-600 hover:text-secondary-700 font-medium">
                    +90 501 151 11 16
                  </a>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="group"
              >
                <Card className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200 bg-white/80 backdrop-blur-sm">
                  <MapPin className="w-10 h-10 mx-auto mb-3 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-semibold text-neutral-900 mb-1">{t.contact.info.location}</p>
                  <p className="text-sm text-green-600 font-medium">
                    {t.contact.info.worldwide}
                  </p>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Contact Form Section */}
      <Section background="gray">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden border-2 border-primary-100">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary-100/50 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold">{t.contact.form.title}</h2>
                  </div>
                  <p className="text-neutral-600 mb-6">{t.contact.form.description}</p>

                  <form onSubmit={handleEmailSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                          {t.contact.form.name} *
                          <span className="text-primary-600">●</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all hover:border-primary-300"
                          placeholder={t.contact.form.namePlaceholder}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                          {t.contact.form.email} *
                          <span className="text-primary-600">●</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all hover:border-primary-300"
                          placeholder={t.contact.form.emailPlaceholder}
                        />
                      </div>
                    </div>

                    {/* Phone & Company Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900 mb-2">
                          {t.contact.form.phone}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all hover:border-primary-300"
                          placeholder={t.contact.form.phonePlaceholder}
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-neutral-900 mb-2">
                          {t.contact.form.company}
                        </label>
                        <input
                          type="text"
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all hover:border-primary-300"
                          placeholder={t.contact.form.companyPlaceholder}
                        />
                      </div>
                    </div>

                    {/* Interest */}
                    <div>
                      <label htmlFor="interest" className="block text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                        {t.contact.form.service} *
                        <span className="text-primary-600">●</span>
                      </label>
                      <select
                        id="interest"
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        required
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all hover:border-primary-300 bg-white"
                      >
                        <option value="">{t.contact.form.servicePlaceholder}</option>
                        <option value="digital-presence">{t.contact.form.serviceOptions.website}</option>
                        <option value="business-systems">{t.contact.form.serviceOptions.systems}</option>
                        <option value="web-apps">{t.contact.form.serviceOptions.webApp}</option>
                        <option value="marketing">{t.contact.form.serviceOptions.marketing}</option>
                        <option value="other">{t.contact.form.serviceOptions.other}</option>
                      </select>
                    </div>

                    {/* Budget & Timeline Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="budget" className="block text-sm font-semibold text-neutral-900 mb-2">
                          {t.contact.form.budget}
                        </label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all hover:border-primary-300 bg-white"
                        >
                          <option value="">{t.contact.form.budgetPlaceholder}</option>
                          <option value="under-5k">{t.contact.form.budgetOptions.small}</option>
                          <option value="5k-15k">{t.contact.form.budgetOptions.medium}</option>
                          <option value="15k-50k">{t.contact.form.budgetOptions.large}</option>
                          <option value="50k-plus">{t.contact.form.budgetOptions.enterprise}</option>
                          <option value="discuss">{t.contact.form.budgetOptions.discuss}</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="timeline" className="block text-sm font-semibold text-neutral-900 mb-2">
                          {t.contact.form.timeline}
                        </label>
                        <select
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all hover:border-primary-300 bg-white"
                        >
                          <option value="">{t.contact.form.timelinePlaceholder}</option>
                          <option value="urgent">{t.contact.form.timelineOptions.urgent}</option>
                          <option value="1-month">{t.contact.form.timelineOptions.month}</option>
                          <option value="2-3-months">{t.contact.form.timelineOptions.quarter}</option>
                          <option value="3-6-months">{t.contact.form.timelineOptions.quarter}</option>
                          <option value="flexible">{t.contact.form.timelineOptions.flexible}</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                        {t.contact.form.message} *
                        <span className="text-primary-600">●</span>
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none hover:border-primary-300"
                        placeholder={t.contact.form.messagePlaceholder}
                      ></textarea>
                    </div>

                    {/* Submit Buttons */}
                    <div className="space-y-4">
                      <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-4">
                        <p className="text-sm font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary-600" />
                          {t.contact.form.chooseMethod}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
                          >
                            <Mail className="w-5 h-5" />
                            {t.contact.form.sendEmail}
                          </motion.button>

                          <motion.button
                            type="button"
                            onClick={handleWhatsApp}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
                          >
                            <MessageSquare className="w-5 h-5" />
                            {t.contact.form.sendWhatsApp}
                          </motion.button>
                        </div>
                      </div>

                      <p className="text-sm text-neutral-500 text-center flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        {t.contact.info.responseValue}
                      </p>
                    </div>
                  </form>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-primary-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  {t.contact.info.detailsTitle}
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-neutral-900 mb-1">{t.contact.info.email}</p>
                        <a href="mailto:info@cloudtopia.net" className="text-sm text-primary-600 hover:text-primary-700 font-medium break-all">
                          info@cloudtopia.net
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-neutral-900 mb-1">{t.contact.info.phone}</p>
                        <a href="tel:+905011511116" className="text-sm text-green-600 hover:text-green-700 font-medium">
                          +90 501 151 11 16
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors duration-200">
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-neutral-900 mb-1">{t.contact.info.location}</p>
                        <p className="text-sm text-secondary-600 font-medium">
                          {t.contact.info.worldwide}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-neutral-900 mb-1">{t.contact.info.responseTime}</p>
                        <p className="text-sm text-blue-600 font-medium">
                          {t.contact.info.responseValue}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* What to Expect */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 border-2 border-primary-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600" />
                  {t.contact.nextSteps.title}
                </h3>
                <ol className="space-y-3">
                  {t.contact.nextSteps.steps.map((step, index) => (
                    <motion.li
                      key={index}
                      className="flex gap-3 items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-6 h-6 bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-md">
                        {index + 1}
                      </span>
                      <span className="text-sm text-neutral-700 leading-relaxed">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </Card>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-neutral-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-bold mb-3">{t.contact.quickLinks.title}</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  {t.contact.quickLinks.description}
                </p>
                <div className="space-y-2">
                  {t.contact.quickLinks.links.map((link, index) => (
                    <motion.a
                      key={index}
                      href={l(link.href)}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                    >
                      <span>{link.icon}</span>
                      {link.label}
                      <span className={dir === 'rtl' ? 'mr-auto rotate-180' : 'ml-auto'}>→</span>
                    </motion.a>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.contact.whyUs.title.split(' ').slice(0, 2).join(' ')}{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t.contact.whyUs.title.split(' ').slice(2).join(' ')}
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              {t.contact.whyUs.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: t.contact.whyUs.items[0].title,
                description: t.contact.whyUs.items[0].description,
                color: 'from-green-500 to-green-600'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: t.contact.whyUs.items[1].title,
                description: t.contact.whyUs.items[1].description,
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: t.contact.whyUs.items[2].title,
                description: t.contact.whyUs.items[2].description,
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: t.contact.whyUs.items[3].title,
                description: t.contact.whyUs.items[3].description,
                color: 'from-orange-500 to-orange-600'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-200">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}

