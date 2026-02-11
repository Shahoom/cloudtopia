'use client'

import { PrimaryButton, OutlineButton } from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import Tag from '@/components/ui/Tag'
import Card from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { Sparkles, Brain, Image, FileText, BarChart3, Globe, ShoppingCart, Calendar, Briefcase } from 'lucide-react'
import OrbitingSkills from '@/components/ui/orbiting-skills'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function LabsPage() {
  const { t, locale } = useLanguage()

  const l = (path: string) => `/${locale}${path === '/' ? '' : path}`

  // AI Tools we've created
  const aiTools = [
    {
      ...t.labs.aiTools.items[0],
      icon: <FileText className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      ...t.labs.aiTools.items[1],
      icon: <Image className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      ...t.labs.aiTools.items[2],
      icon: <Brain className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
    },
  ]

  // Real projects we've built for clients
  const clientProjects = [
    {
      ...t.labs.projects.items[0],
      icon: <Globe className="w-6 h-6" />,
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      ...t.labs.projects.items[1],
      icon: <Calendar className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      ...t.labs.projects.items[2],
      icon: <ShoppingCart className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      ...t.labs.projects.items[3],
      icon: <BarChart3 className="w-6 h-6" />,
      gradient: 'from-violet-500 to-purple-600',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section className="text-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden relative">
        {/* Orbiting Skills Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-50 pointer-events-none">
          <OrbitingSkills />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <span className="font-bold text-primary-700">{t.labs.hero.badge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.labs.hero.title}{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t.labs.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              {t.labs.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton href={l('/contact')}>
                {t.labs.cta.button}
              </PrimaryButton>
              <OutlineButton href={l('/services')}>
                {t.nav.services}
              </OutlineButton>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* AI Tools Section */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-600 px-6 py-2 rounded-full mb-6 shadow-lg relative overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-5 h-5 text-white relative z-10" />
              </motion.div>
              <span className="font-bold text-white relative z-10">{t.labs.aiTools.badge}</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.labs.aiTools.title}{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t.labs.aiTools.title}
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              {t.labs.aiTools.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {aiTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-300 relative overflow-hidden">
                  {/* Animated gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center text-white shadow-lg relative overflow-hidden`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        {tool.icon}
                      </motion.div>
                      <motion.span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${tool.status === 'Live'
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : 'bg-blue-100 text-blue-700 border border-blue-300'
                          }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tool.status}
                      </motion.span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-neutral-900 group-hover:text-primary-600 transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="pt-3 border-t border-neutral-200 group-hover:border-primary-200 transition-colors duration-300">
                      <p className="text-sm text-neutral-500 group-hover:text-neutral-700 transition-colors duration-300">
                        <span className="font-semibold text-primary-600">{tool.useLabel}</span> {tool.use}
                      </p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-200/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-neutral-600 mb-6">
              {t.labs.aiTools.description}
            </p>
            <PrimaryButton href={l('/contact')}>
              {t.labs.cta.button}
            </PrimaryButton>
          </div>
        </div>
      </Section>

      {/* Client Projects Section */}
      <Section background="gray">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-500 to-purple-600 px-6 py-2 rounded-full mb-6 shadow-lg relative overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Briefcase className="w-5 h-5 text-white relative z-10" />
              </motion.div>
              <span className="font-bold text-white relative z-10">{t.labs.projects.badge}</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.labs.projects.title}{' '}
              <span className="bg-gradient-to-r from-secondary-600 to-purple-700 bg-clip-text text-transparent">
                {t.labs.projects.title}
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              {t.labs.projects.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {clientProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.01 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 bg-white border-2 border-transparent hover:border-secondary-300 relative overflow-hidden">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-transparent to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`w-14 h-14 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center text-white shadow-lg relative`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
                        {project.icon}
                      </motion.div>
                      <motion.span
                        className="px-3 py-1 bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-700 rounded-full text-xs font-semibold border border-neutral-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {project.industry}
                      </motion.span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1 text-neutral-900 group-hover:text-secondary-600 transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-sm text-primary-600 font-semibold mb-3 group-hover:text-primary-700 transition-colors duration-300">
                      {project.type}
                    </p>
                    <p className="text-neutral-600 mb-4 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
                      {project.description}
                    </p>
                    <div className="pt-4 border-t border-neutral-200 group-hover:border-secondary-200 transition-colors duration-300">
                      <p className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></span>
                        {t.labs.projects.keyFeaturesLabel}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {project.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="w-1.5 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                              whileHover={{ scale: 1.5 }}
                            ></motion.div>
                            <span className="text-sm text-neutral-600 group-hover:text-neutral-700 transition-colors duration-300">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-neutral-600 mb-6">
              {t.labs.cta.customRequest}
            </p>
            <PrimaryButton href={l('/services')}>
              {t.labs.cta.secondaryButton}
            </PrimaryButton>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 border-0 text-white relative overflow-hidden group">
              {/* Animated background particles */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>

              <div className="text-center py-12 px-6 relative z-10">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-90 drop-shadow-lg" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
                  {t.labs.cta.title}
                </h2>
                <p className="text-lg text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow">
                  {t.labs.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <OutlineButton
                      href={l('/contact')}
                      className="bg-white text-primary-600 border-white hover:bg-white/95 hover:shadow-2xl transition-all duration-300 font-bold relative overflow-hidden group"
                    >
                      <span className="relative z-10">{t.labs.cta.button}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </OutlineButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <OutlineButton
                      href={l('/services')}
                      className="border-2 border-white text-white hover:bg-white/20 hover:shadow-xl transition-all duration-300 font-bold backdrop-blur-sm"
                    >
                      {t.nav.services}
                    </OutlineButton>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  )
}

