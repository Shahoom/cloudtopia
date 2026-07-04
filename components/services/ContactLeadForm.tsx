'use client'

import { useState } from 'react'
import { Mail, Phone, Loader2, Check, ShieldCheck, Sparkles, Clock } from 'lucide-react'

const WHATSAPP_NUMBER = '96895886393'
const CONTACT_EMAIL = 'info@cloudtopia.net'
const CALL_NUMBER = '+96895886393'

/**
 * Quick lead capture used in the sub-service contact hero.
 * Collects name / email / phone, saves the lead to the CMS (ContactInquiries,
 * source = 'service-page', tagged with the service), then routes the visitor to
 * WhatsApp (pre-filled with their details), email, or a phone call.
 */
export function ContactLeadForm({ service, locale = 'en' }: { service: string; locale?: string }) {
    const isAr = locale === 'ar'
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [busy, setBusy] = useState<null | 'whatsapp' | 'email' | 'call'>(null)
    const [saved, setSaved] = useState(false)

    const t = isAr
        ? {
            eyebrow: 'استشارة مجانية',
            title: 'احجز استشارة مجانية',
            sub: 'املأ النموذج وسيتواصل معك مختصونا خلال ٢٤ ساعة.',
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            phone: 'رقم الهاتف',
            whatsapp: 'تواصل عبر واتساب',
            emailBtn: 'راسلنا بالبريد',
            call: 'اتصل بنا',
            nda: 'أفكارك محمية بالكامل باتفاقية عدم إفصاح (NDA).',
            reply: 'نرد عادةً خلال ساعة عمل واحدة.',
        }
        : {
            eyebrow: 'Free consultation',
            title: 'Book a Free Consultation',
            sub: 'Fill the form and our specialists will contact you within 24 hrs.',
            name: 'Enter your name',
            email: 'Enter your email address',
            phone: 'Enter your phone number',
            whatsapp: 'Continue on WhatsApp',
            emailBtn: 'Email us',
            call: 'Call us',
            nda: 'Your ideas are fully protected under our NDA.',
            reply: 'We usually reply within one business hour.',
        }

    async function saveLead(channel: string) {
        if (!name && !email && !phone) return
        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    service,
                    source: 'service-page',
                    locale,
                    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                    message: `Quick inquiry via ${channel} — ${service}.`,
                }),
            })
            setSaved(true)
        } catch {
            /* best-effort — never block the visitor's chosen channel */
        }
    }

    function waLink() {
        const lines = [
            isAr ? 'مرحباً، أنا مهتم بـ:' : "Hi CloudTopia, I'm interested in:",
            service,
            '',
            `${isAr ? 'الاسم' : 'Name'}: ${name || '-'}`,
            `${isAr ? 'البريد' : 'Email'}: ${email || '-'}`,
            `${isAr ? 'الهاتف' : 'Phone'}: ${phone || '-'}`,
        ]
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
    }

    async function onWhatsApp() {
        setBusy('whatsapp')
        await saveLead('WhatsApp')
        setBusy(null)
        window.open(waLink(), '_blank', 'noopener,noreferrer')
    }
    async function onEmail() {
        setBusy('email')
        await saveLead('Email')
        setBusy(null)
        const subject = encodeURIComponent(`Inquiry: ${service}`)
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}`)
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    }
    async function onCall() {
        setBusy('call')
        await saveLead('Call')
        setBusy(null)
        window.location.href = `tel:${CALL_NUMBER}`
    }

    const inputCls =
        'w-full rounded-xl border border-white/10 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50'

    return (
        <div
            dir={isAr ? 'rtl' : 'ltr'}
            className="relative w-full overflow-hidden rounded-[28px] p-[1.5px] shadow-2xl shadow-sky-950/40"
        >
            {/* CloudTopia gradient ring: amber → sky */}
            <div
                className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-amber-400/80 via-sky-400/25 to-sky-500/70"
                aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[27px] bg-[#0a1222]/95 p-6 backdrop-blur-xl sm:p-8">
                {/* soft brand glows */}
                <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-amber-500/20 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" aria-hidden="true" />

                <div className="relative">
                    <span className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-amber-300">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        {t.eyebrow}
                    </span>
                    <h2 className="mt-4 text-center text-2xl font-black tracking-tight text-white md:text-3xl">{t.title}</h2>
                    <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-relaxed text-slate-300">{t.sub}</p>

                    <div className="mt-6 grid gap-3">
                        <input className={inputCls} placeholder={t.name} value={name} onChange={(e) => setName(e.target.value)} aria-label={t.name} />
                        <input className={inputCls} placeholder={t.phone} value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" aria-label={t.phone} />
                        <input className={inputCls} placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} type="email" aria-label={t.email} />
                    </div>

                    {/* Big WhatsApp button */}
                    <button
                        type="button"
                        onClick={onWhatsApp}
                        className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-base font-black text-white shadow-lg shadow-emerald-900/30 transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#1ebe5a] active:scale-[0.99]"
                    >
                        {busy === 'whatsapp' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <WhatsAppIcon />}
                        {t.whatsapp}
                        {saved && <Check className="h-4 w-4" aria-hidden="true" />}
                    </button>

                    {/* Email + Call */}
                    <div className="mt-3 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={onEmail}
                            className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-sm font-bold text-white transition hover:border-amber-400/50 hover:bg-white/[0.1]"
                        >
                            {busy === 'email' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Mail className="h-4 w-4 text-amber-400" aria-hidden="true" />}
                            {t.emailBtn}
                        </button>
                        <button
                            type="button"
                            onClick={onCall}
                            className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-sm font-bold text-white transition hover:border-amber-400/50 hover:bg-white/[0.1]"
                        >
                            {busy === 'call' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Phone className="h-4 w-4 text-amber-400" aria-hidden="true" />}
                            {t.call}
                        </button>
                    </div>

                    {/* trust row */}
                    <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                        <span className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                            {t.nda}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
                            {t.reply}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function WhatsAppIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.873-1.017zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
    )
}
