'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Clock, CheckCircle, Sparkles, Shield, Users, ArrowRight, Github, Twitter, Linkedin, Instagram } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ProfessionalConnect } from '@/components/ui/get-in-touch'
import { serviceCategories, localizedServiceValue } from '@/lib/seo/services'

interface MousePosition {
  x: number
  y: number
}

const InteractiveBackground = () => {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-lavender pointer-events-none">
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-primary-200/20 blur-3xl"
        animate={{
          x: mousePos.x - 400,
          y: mousePos.y - 400,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 50, restDelta: 0.001 }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-secondary-200/20 blur-3xl"
        animate={{
          x: mousePos.x - 300,
          y: mousePos.y - 300,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 40, restDelta: 0.001, delay: 0.05 }}
      />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
    </div>
  )
}

const TiltCard = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-primary-500/10 ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

const FloatingInput = ({ label, id, value, onChange, type = "text", required = false }: any) => {
  const [isFocused, setIsFocused] = useState(false)
  const { dir } = useLanguage()

  return (
    <div className="relative mb-6 group">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className={`w-full bg-white/30 backdrop-blur-md border border-neutral-200 rounded-2xl px-5 py-4 pt-7 outline-none transition-all duration-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 hover:border-primary-300/50 text-neutral-900 font-medium peer`}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute top-4 ${dir === 'rtl' ? 'right-5' : 'left-5'} text-neutral-500 font-medium transition-all duration-300 pointer-events-none peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs opacity-70 peer-focus:opacity-100`}
      >
        {label} {required && <span className="text-primary-600">*</span>}
      </label>
      <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-b-2xl transition-all duration-500 ease-out ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
    </div>
  )
}

const FloatingTextarea = ({ label, id, value, onChange, required = false }: any) => {
  const [isFocused, setIsFocused] = useState(false)
  const { dir } = useLanguage()

  return (
    <div className="relative mb-6 group">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        rows={6}
        className="w-full bg-white/30 backdrop-blur-md border border-neutral-200 rounded-2xl px-5 py-4 pt-7 outline-none transition-all duration-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 hover:border-primary-300/50 text-neutral-900 font-medium resize-none peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute top-4 ${dir === 'rtl' ? 'right-5' : 'left-5'} text-neutral-500 font-medium transition-all duration-300 pointer-events-none peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs opacity-70 peer-focus:opacity-100`}
      >
        {label} {required && <span className="text-primary-600">*</span>}
      </label>
      <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-b-2xl transition-all duration-500 ease-out ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
    </div>
  )
}

const CustomSelect = ({ label, id, value, onChange, options, required = false }: any) => {
  const [isFocused, setIsFocused] = useState(false)
  const { dir } = useLanguage()

  return (
    <div className="relative mb-6 group">
      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className="w-full bg-white/30 backdrop-blur-md border border-neutral-200 rounded-2xl px-5 py-4 pt-7 outline-none transition-all duration-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 hover:border-primary-300/50 text-neutral-900 font-medium peer appearance-none cursor-pointer"
      >
        <option value="" disabled hidden></option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value} className="bg-white">
            {opt.label}
          </option>
        ))}
      </select>
      <div className={`absolute top-1/2 ${dir === 'rtl' ? 'left-5' : 'right-5'} -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-primary-500 transition-colors`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <label
        htmlFor={id}
        className={`absolute top-4 ${dir === 'rtl' ? 'right-5' : 'left-5'} text-neutral-500 font-medium transition-all duration-300 pointer-events-none peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs opacity-70 peer-focus:opacity-100`}
      >
        {label} {required && <span className="text-primary-600">*</span>}
      </label>
      <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-b-2xl transition-all duration-500 ease-out ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
    </div>
  )
}

const IntroSection = ({ t }: { t: any }) => {
  const sentences = [
    t.contact.intro.line1,
    t.contact.intro.line2,
    t.contact.intro.line3
  ]

  return (
    <div className="max-w-4xl mx-auto text-center mb-24 mt-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3
            }
          }
        }}
        className="space-y-6"
      >
        {sentences.map((sentence, i) => (
          <motion.p
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`text-2xl md:text-3xl font-medium ${i === 1 ? 'text-primary-600 italic' : 'text-neutral-500'
              } leading-relaxed`}
          >
            {sentence}
          </motion.p>
        ))}
        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1 }
          }}
          transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-primary-300 to-transparent mx-auto mt-12"
        />
      </motion.div>
    </div>
  )
}

export default function ContactClient({ t: pageT }: { t?: any }) {
  const { t: contextT, dir, locale } = useLanguage()
  const t = pageT || contextT
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('email')
  const intakeContent = locale === 'ar'
    ? {
      eyebrow: 'مكتب استقبال المشاريع',
      title: 'أرسل التفاصيل التي تجعل أول رد عملياً.',
      description: 'نراجع النطاق والسوق والتكاملات والجدول الزمني قبل الرد، حتى تحصل على مسار واضح بدلاً من رسالة عامة.',
      response: 'رد شخصي خلال يوم عمل واحد.',
      steps: [
        { title: 'مراجعة النطاق', body: 'نحدد نوع المشروع والصفحات أو الوحدات أو سير العمل المطلوب.' },
        { title: 'المسار التقني', body: 'نقترح المنصة والتكاملات وخطة المحتوى ثنائية اللغة المناسبة.' },
        { title: 'عرض ثابت', body: 'تحصل على باقة أو تقدير مخصص مع مراحل تسليم واضحة.' },
      ],
      checklistTitle: 'يساعدنا أن تذكر',
      checklist: ['السوق المستهدف أو الدولة', 'الخدمات أو الباقات التي تقارنها', 'أي تكاملات مطلوبة', 'موعد الإطلاق أو أولوية المشروع'],
      signalsTitle: 'مناسب خصوصاً لـ',
      signals: ['إطلاق عربي + إنجليزي', 'متاجر ومدفوعات إقليمية', 'أنظمة داخلية وCRM', 'تحسين SEO والتحويل'],
      briefTitle: 'مختصر أفضل، رد أسرع',
      briefBody: 'استخدم حقل الرسالة لوصف الهدف التجاري، الجمهور، الصفحات أو الوحدات، الأنظمة الحالية، وأي أمثلة تريد الاقتراب منها أو تجنبها.',
    }
    : {
      eyebrow: 'Project intake desk',
      title: 'Send the details that make the first reply useful.',
      description: 'We review scope, market, integrations, and timeline before replying, so you get a clear path instead of a generic acknowledgement.',
      response: 'Personal response within one business day.',
      steps: [
        { title: 'Scope review', body: 'We map the project type, pages, modules, workflows, and commercial goal.' },
        { title: 'Technical route', body: 'We recommend the platform, integrations, bilingual content structure, and delivery path.' },
        { title: 'Fixed proposal', body: 'You receive a package recommendation or custom estimate with clear delivery milestones.' },
      ],
      checklistTitle: 'Helpful to include',
      checklist: ['Target market or country', 'Services or packages you are comparing', 'Required integrations', 'Launch date or urgency'],
      signalsTitle: 'Especially useful for',
      signals: ['Arabic + English launches', 'Regional commerce and payments', 'Internal systems and CRM', 'SEO and conversion upgrades'],
      briefTitle: 'Better brief, faster reply',
      briefBody: 'Use the message field to describe the business goal, audience, pages or modules, current systems, and any examples you want us to match or avoid.',
    }

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

  const formRef = useRef<HTMLDivElement>(null)

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const message = `${t.contact.form.waMessage}
      
${t.contact.form.name}: ${formData.name || 'N/A'}
${t.contact.form.email}: ${formData.email || 'N/A'}
${t.contact.form.company}: ${formData.company || 'N/A'}
${t.contact.form.service}: ${formData.interest || 'N/A'}
${t.contact.form.message}: ${formData.message || 'N/A'}`

    const encodedMessage = encodeURIComponent(message)
    setTimeout(() => {
      try {
        window.open(`https://wa.me/905011511116?text=${encodedMessage}`, '_blank')
      } finally {
        setIsSubmitting(false)
      }
    }, 1000)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const subject = `${t.contact.form.emailSubject} ${formData.name}`
    const body = `${t.contact.form.name}: ${formData.name}
${t.contact.form.email}: ${formData.email}
${t.contact.form.phone}: ${formData.phone || 'N/A'}
${t.contact.form.company}: ${formData.company || 'N/A'}
${t.contact.form.service}: ${formData.interest}
${t.contact.form.budget}: ${formData.budget || 'N/A'}
${t.contact.form.timeline}: ${formData.timeline || 'N/A'}

${t.contact.form.message}:
${formData.message}`

    setTimeout(() => {
      try {
        window.location.href = `mailto:info@cloudtopia.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      } finally {
        setIsSubmitting(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen relative py-20 px-4 md:px-8 overflow-x-hidden">
      <InteractiveBackground />

      <div className="max-w-7xl mx-auto">
        <IntroSection t={t} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Info & Vision */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-white/50 mb-8">
                <Sparkles className="w-5 h-5 text-primary-500" />
                <span className="font-bold text-primary-600 uppercase tracking-widest text-xs">{t.contact.hero.badge}</span>
              </div>
              <h1 className="text-3xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-neutral-900">
                {t.contact.hero.title}<br />
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                  {t.contact.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 font-medium leading-relaxed max-w-xl">
                {t.contact.hero.description}
              </p>
            </motion.div>

            <div className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary-600/60 ml-2">{t.contact.info.directContact}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TiltCard className="flex flex-col items-center sm:items-start text-center sm:text-start">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 text-primary-600">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-900">{t.contact.info.email}</h3>
                  <a href="mailto:info@cloudtopia.net" className="text-primary-600 font-bold hover:underline">info@cloudtopia.net</a>
                </TiltCard>

                <TiltCard className="flex flex-col items-center sm:items-start text-center sm:text-start">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-900">{locale === 'ar' ? 'استقبال المشاريع' : 'Project Intake'}</h3>
                  <a href="mailto:info@cloudtopia.net" className="text-green-600 font-bold hover:underline" dir="ltr">info@cloudtopia.net</a>
                </TiltCard>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                  href: 'https://wa.me/905011511116',
                  color: 'hover:text-green-600'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
                    </svg>
                  ),
                  href: 'https://x.com/thecloudtopia',
                  color: 'hover:text-neutral-900'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  ),
                  href: 'https://github.com/Shahoom',
                  color: 'hover:text-neutral-900'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                  href: 'https://instagram.com/thecloudtopia',
                  color: 'hover:text-pink-600'
                }
              ].map((platform, i) => (
                <motion.a
                  key={i}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className={`w-12 h-12 bg-white/40 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/50 text-neutral-600 transition-colors ${platform.color}`}
                >
                  {platform.icon}
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[32px] border border-neutral-900 bg-neutral-950 p-7 text-white shadow-2xl"
            >
              <div className="mb-6 flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-primary-200">{intakeContent.eyebrow}</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight">{intakeContent.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{intakeContent.description}</p>
                </div>
                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-primary-100 sm:flex">
                  <Shield className="h-6 w-6" />
                </div>
              </div>

              <div className="grid gap-3">
                {intakeContent.steps.map((step, index) => (
                  <div key={step.title} className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-300 text-sm font-black text-neutral-950">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/70">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white/50">{intakeContent.checklistTitle}</h3>
                  <ul className="mt-3 space-y-2">
                    {intakeContent.checklist.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-white/75">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-200" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white/50">{intakeContent.signalsTitle}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {intakeContent.signals.map((signal) => (
                      <span key={signal} className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-white/80">
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-primary-300 px-4 py-3 text-neutral-950">
                <Clock className="h-5 w-5 shrink-0" />
                <p className="text-sm font-black">{intakeContent.response}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7" ref={formRef}>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Animated corner decorations */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 blur-[100px]" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary-500/10 blur-[100px]" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                  <div>
                    <h2 className="text-4xl font-black text-neutral-900 tracking-tight">{t.contact.form.title}</h2>
                    <p className="text-neutral-500 font-medium mt-2">{t.contact.form.description}</p>
                    <p className="mt-2 text-sm font-semibold text-primary-700">Personal response within one business day.</p>
                  </div>

                  <div className="flex bg-lavender/50 p-1 rounded-2xl border border-neutral-200">
                    <button
                      type="button"
                      onClick={() => setActiveTab('email')}
                      className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'email' ? 'bg-white text-primary-600 shadow-md' : 'text-neutral-500 hover:text-neutral-800'}`}
                    >
                      {t.contact.form.emailTab}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('whatsapp')}
                      className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'whatsapp' ? 'bg-white text-green-600 shadow-md' : 'text-neutral-500 hover:text-neutral-800'}`}
                    >
                      {t.contact.form.whatsappTab}
                    </button>
                  </div>
                </div>

                <form onSubmit={activeTab === 'email' ? handleEmailSubmit : handleWhatsApp} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingInput
                      label={t.contact.form.name}
                      id="name"
                      value={formData.name}
                      onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <FloatingInput
                      label={t.contact.form.email}
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingInput
                      label={t.contact.form.phone}
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <FloatingInput
                      label={t.contact.form.company}
                      id="company"
                      value={formData.company}
                      onChange={(e: any) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CustomSelect
                      label={t.contact.form.service}
                      id="interest"
                      value={formData.interest}
                      onChange={(e: any) => setFormData({ ...formData, interest: e.target.value })}
                      required
                      options={serviceCategories.map((category) => ({
                        value: category.slug,
                        label: localizedServiceValue(category.name, locale),
                      }))}
                    />
                    <CustomSelect
                      label={t.contact.form.budget}
                      id="budget"
                      value={formData.budget}
                      onChange={(e: any) => setFormData({ ...formData, budget: e.target.value })}
                      options={[
                        { value: 'under-1k', label: t.contact.form.budgetOptions.small },
                        { value: '1k-5k', label: t.contact.form.budgetOptions.medium },
                        { value: '5k-10k', label: t.contact.form.budgetOptions.large },
                        { value: '10k-plus', label: t.contact.form.budgetOptions.enterprise },
                        { value: 'discuss', label: t.contact.form.budgetOptions.discuss },
                      ]}
                    />
                    <CustomSelect
                      label={t.contact.form.timeline}
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e: any) => setFormData({ ...formData, timeline: e.target.value })}
                      options={[
                        { value: 'urgent', label: t.contact.form.timelineOptions.urgent },
                        { value: '1-month', label: t.contact.form.timelineOptions.month },
                        { value: '2-3-months', label: t.contact.form.timelineOptions.quarter },
                        { value: 'flexible', label: t.contact.form.timelineOptions.flexible },
                      ]}
                    />
                  </div>

                  <FloatingTextarea
                    label={t.contact.form.message}
                    id="message"
                    value={formData.message}
                    onChange={(e: any) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />

                  <div className="rounded-3xl border border-primary-100 bg-white/45 p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-black text-neutral-950">{intakeContent.briefTitle}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{intakeContent.briefBody}</p>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-2 md:max-w-[260px] md:justify-end">
                        {intakeContent.checklist.map((item) => (
                          <span key={item} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl relative overflow-hidden group ${activeTab === 'email'
                      ? 'bg-neutral-900 text-white hover:bg-black'
                      : 'bg-green-600 text-white hover:bg-green-700 shadow-green-500/30'
                      }`}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{t.contact.form.sending}</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="text"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-3"
                        >
                          {activeTab === 'email' ? <Mail className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                          {activeTab === 'email' ? t.contact.form.sendEmail : t.contact.form.sendWhatsApp}
                          <ArrowRight className={`w-6 h-6 group-hover:translate-x-2 transition-transform ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Professional Connect Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 border-t border-white/20 pt-10"
        >
          <ProfessionalConnect />
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </div>
  )
}
