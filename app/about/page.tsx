'use client'

import { PrimaryButton, OutlineButton } from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import Tag from '@/components/ui/Tag'
import Card from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { Globe, Users, Target, Zap, Award, TrendingUp, Heart, Shield, Lightbulb, Code, Rocket, MapPin } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function AboutPage() {
  const { t, locale } = useLanguage()

  const l = (path: string) => `/${locale}${path === '/' ? '' : path}`

  const stats = [
    { number: '50+', label: t.about.stats.projects, icon: <Rocket className="w-6 h-6" /> },
    { number: '30+', label: t.about.stats.clients, icon: <Users className="w-6 h-6" /> },
    { number: '5+', label: t.about.stats.years, icon: <Award className="w-6 h-6" /> },
    { number: '100%', label: t.about.stats.satisfaction, icon: <Heart className="w-6 h-6" /> },
  ]

  const team = [
    {
      role: t.about.team.dev.role,
      description: t.about.team.dev.description,
      icon: <Code className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      role: t.about.team.design.role,
      description: t.about.team.design.description,
      icon: <Lightbulb className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      role: t.about.team.strategy.role,
      description: t.about.team.strategy.description,
      icon: <Target className="w-8 h-8" />,
      color: 'from-green-500 to-green-600'
    },
  ]

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
              <Globe className="w-5 h-5 text-primary-600" />
              <span className="font-bold text-primary-700">{t.about.hero.badge}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t.about.hero.title}{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t.about.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-xl text-neutral-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              {t.about.hero.description}
            </p>
            <p className="text-base text-neutral-500 italic max-w-2xl mx-auto mb-8">
              {t.about.hero.philosophy}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="group"
                >
                  <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-200 bg-white/80 backdrop-blur-sm">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-3 text-white"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <p className="text-3xl font-bold text-neutral-900 mb-1">{stat.number}</p>
                    <p className="text-sm text-neutral-600">{stat.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section background="gray">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-primary-600 transition-colors duration-300">{t.about.mission.title}</h2>
                <p className="text-lg text-neutral-600 mb-4 leading-relaxed">
                  {t.about.mission.description}
                </p>
                <p className="text-base text-neutral-600 leading-relaxed">
                  {t.about.mission.description}
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-secondary-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-transparent to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Target className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-secondary-600 transition-colors duration-300">{t.about.vision.title}</h2>
                <p className="text-lg text-neutral-600 mb-4 leading-relaxed">
                  {t.about.vision.description}
                </p>
                <p className="text-base text-neutral-600 leading-relaxed">
                  {t.about.vision.description}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Our Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 border-0 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary-300 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 text-center py-8">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-4"
              >
                <MapPin className="w-12 h-12 mx-auto drop-shadow-lg" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t.about.worldwide.title}</h3>
              <p className="text-lg text-white/95 max-w-3xl mx-auto leading-relaxed">
                {t.about.worldwide.description}
              </p>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Team Section */}
      <Section>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.about.team.title.split(' ').slice(0, 2).join(' ')}{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t.about.team.title.split(' ').slice(2).join(' ')}
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              {t.about.team.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full text-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {member.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {member.role}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* How We're Different */}
      <Section>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.about.different.title.split(' ').slice(0, 2).join(' ')}{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t.about.different.title.split(' ').slice(2).join(' ')}
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              {t.about.different.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: t.about.different.items[0].title,
              description: t.about.different.items[0].description,
              icon: <Shield className="w-8 h-8" />,
              color: 'from-blue-500 to-blue-600',
              borderColor: 'hover:border-blue-300'
            },
            {
              title: t.about.different.items[1].title,
              description: t.about.different.items[1].description,
              icon: <Award className="w-8 h-8" />,
              color: 'from-purple-500 to-purple-600',
              borderColor: 'hover:border-purple-300'
            },
            {
              title: t.about.different.items[2].title,
              description: t.about.different.items[2].description,
              icon: <TrendingUp className="w-8 h-8" />,
              color: 'from-green-500 to-green-600',
              borderColor: 'hover:border-green-300'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className={`text-center h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent ${item.borderColor} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {/* Corner accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Our Structure */}
      <Section background="gray">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-title mb-4">Our Service Structure</h2>
            <p className="text-subtitle">
              A clear progression to help you move to the cloud at your own pace.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-l-4 border-primary-600">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  1
                </div>
                <div className="flex-grow">
                  <h3 className="text-h4 mb-2">Digital Presence Services</h3>
                  <p className="text-body text-neutral-600 mb-3">
                    Get your business onto the internet. Website development, social media marketing,
                    content creation, and paid advertising—all to establish your online visibility.
                  </p>
                  <OutlineButton href="/services#digital-presence">View Services</OutlineButton>
                </div>
              </div>
            </Card>

            <Card className="border-l-4 border-secondary-600">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  2
                </div>
                <div className="flex-grow">
                  <h3 className="text-h4 mb-2">Business Systems Development</h3>
                  <p className="text-body text-neutral-600 mb-3">
                    Run your business digitally. Custom booking systems, CRM, inventory management,
                    admin dashboards—built to your exact workflow and operations.
                  </p>
                  <OutlineButton href="/services#business-systems">View Services</OutlineButton>
                </div>
              </div>
            </Card>

            <Card className="border-l-4 border-primary-600">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  3
                </div>
                <div className="flex-grow">
                  <h3 className="text-h4 mb-2">Interactive Web Applications</h3>
                  <p className="text-body text-neutral-600 mb-3">
                    Build advanced solutions. Real-time web apps, client portals, dashboards,
                    and SaaS-style applications with sophisticated functionality and data-driven features.
                  </p>
                  <OutlineButton href="/services#web-applications">View Services</OutlineButton>
                </div>
              </div>
            </Card>

            <Card className="border-l-4 border-neutral-600 bg-gradient-to-r from-neutral-50 to-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neutral-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="text-h4 mb-2">CloudTopia Labs (Innovation)</h3>
                  <p className="text-body text-neutral-600 mb-3">
                    Our R&D division exploring AI, automation, and emerging tech. Not a main service offering,
                    but our commitment to innovation and pushing boundaries.
                  </p>
                  <OutlineButton href="/labs" className="border-neutral-400 text-neutral-700">Explore Labs</OutlineButton>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section background="gray">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              The principles that guide everything we build and every decision we make.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: 'Transparency',
              description: 'Clear pricing, honest timelines, no hidden surprises.',
              icon: '🔍',
              color: 'from-blue-100 to-blue-200',
              textColor: 'text-blue-600'
            },
            {
              title: 'Quality',
              description: 'Professional-grade solutions built to last and scale.',
              icon: '⭐',
              color: 'from-purple-100 to-purple-200',
              textColor: 'text-purple-600'
            },
            {
              title: 'Flexibility',
              description: 'Modular approach—choose what you need, when you need it.',
              icon: '🔄',
              color: 'from-green-100 to-green-200',
              textColor: 'text-green-600'
            },
            {
              title: 'Innovation',
              description: 'Always exploring new technologies and better ways to solve problems.',
              icon: '💡',
              color: 'from-orange-100 to-orange-200',
              textColor: 'text-orange-600'
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group"
            >
              <Card className="text-center h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-md`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className={`text-xl font-bold mb-3 ${value.textColor} group-hover:scale-110 transition-transform duration-300`}>
                    {value.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 border-0 text-white relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="text-center py-16 px-6 relative z-10">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="w-20 h-20 mx-auto mb-6 drop-shadow-lg" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                {t.about.cta.title}
              </h2>
              <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow">
                {t.about.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <PrimaryButton
                    size="large"
                    href="/contact"
                    className="bg-white text-primary-600 hover:bg-neutral-50 hover:shadow-2xl transition-all duration-300 font-bold"
                  >
                    {t.about.cta.button}
                  </PrimaryButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <OutlineButton
                    size="large"
                    href="/services"
                    className="border-2 border-white text-white hover:bg-white/20 hover:shadow-xl transition-all duration-300 font-bold"
                  >
                    {t.nav.services}
                  </OutlineButton>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>
    </>
  )
}

