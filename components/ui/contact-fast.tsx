"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Clock, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// CloudTopia fast contact section — designed in-house. Minimal friction:
// 3 fields, big tap targets (16px inputs → no iOS zoom), and a single primary
// action that opens WhatsApp pre-filled (no backend round-trip, instant for the
// user). Email is the secondary fallback. Dark closing section for contrast.

const WHATSAPP_NUMBER = "96895886393";

const CONTENT: Record<
    "en" | "ar",
    {
        eyebrow: string;
        heading: (s: string) => string;
        sub: string;
        trust: string[];
        panelTitle: string;
        nameLabel: string;
        namePh: string;
        contactLabel: string;
        contactPh: string;
        needLabel: string;
        needPh: (s: string) => string;
        send: string;
        note: string;
        emailLabel: string;
        waLine: (s: string) => string;
    }
> = {
    en: {
        eyebrow: "Start the conversation",
        heading: (s) => `Tell us about your ${s}`,
        sub: "Two minutes now saves weeks later. Send a few details and a real person replies within one business day — with a clear next step, not a sales pitch.",
        trust: ["Free consultation & custom demo preview", "A fixed, written quote before anything starts", "You own 100% of the code, design, and data"],
        panelTitle: "Quick request",
        nameLabel: "Your name",
        namePh: "e.g. Mohammed Al-Saud",
        contactLabel: "WhatsApp or email",
        contactPh: "+968 … or you@company.com",
        needLabel: "What do you need?",
        needPh: (s) => `e.g. A new ${s.toLowerCase()} for my business`,
        send: "Send on WhatsApp",
        note: "Replies within one business day — a real person, not a bot.",
        emailLabel: "Or email us",
        waLine: (s) => `Hi CloudTopia! I'm interested in ${s}.`,
    },
    ar: {
        eyebrow: "لنبدأ المحادثة",
        heading: (s) => `أخبرنا عن ${s}`,
        sub: "دقيقتان الآن توفّر أسابيع لاحقاً. أرسل بعض التفاصيل ويرد عليك شخص حقيقي خلال يوم عمل واحد — بخطوة تالية واضحة، لا عرض مبيعات.",
        trust: ["استشارة مجانية ومعاينة ديمو مخصصة", "عرض سعر مكتوب وثابت قبل أي بدء", "تملك 100% من الكود والتصميم والبيانات"],
        panelTitle: "طلب سريع",
        nameLabel: "اسمك",
        namePh: "مثال: محمد آل سعود",
        contactLabel: "واتساب أو بريد إلكتروني",
        contactPh: "+968 … أو you@company.com",
        needLabel: "ما الذي تحتاجه؟",
        needPh: (s) => `مثال: ${s} جديد لأعمالي`,
        send: "أرسل عبر واتساب",
        note: "رد خلال يوم عمل واحد — شخص حقيقي، لا روبوت.",
        emailLabel: "أو راسلنا بريدياً",
        waLine: (s) => `مرحباً كلاود توبيا! أنا مهتم بـ ${s}.`,
    },
};

export function ContactFast({
    serviceName,
    locale = "en",
    dir = "ltr",
    email = "info@cloudtopia.net",
}: {
    serviceName: string;
    locale?: "en" | "ar";
    dir?: "ltr" | "rtl";
    email?: string;
}) {
    const c = CONTENT[locale] || CONTENT.en;
    const isRTL = dir === "rtl";

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [need, setNeed] = useState("");

    const valid = name.trim() && contact.trim() && need.trim();
    const message =
        locale === "ar"
            ? `${c.waLine(serviceName)}\n\nالاسم: ${name}\nالتواصل: ${contact}\nما أحتاجه: ${need}`
            : `${c.waLine(serviceName)}\n\nName: ${name}\nContact: ${contact}\nWhat I need: ${need}`;
    const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    const inputCls =
        "h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-base text-[#0f172a] placeholder:text-neutral-400 outline-none transition focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200";

    return (
        <section dir={dir} data-header-theme="dark" className="relative w-full overflow-hidden bg-eerie py-16 md:py-24">
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(14,165,233,0.18), transparent 60%), radial-gradient(ellipse 50% 50% at 15% 20%, rgba(99,102,241,0.16), transparent 60%)",
                }}
            />

            <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:gap-14">
                {/* Left: message + trust */}
                <div className={cn("text-center", isRTL ? "lg:text-right" : "lg:text-left")}>
                    <span className="mb-3 inline-block text-sm font-black uppercase tracking-[0.18em] text-cyan-300">{c.eyebrow}</span>
                    <h2 className="text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">{c.heading(serviceName)}</h2>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 lg:mx-0">{c.sub}</p>
                    <ul className={cn("mx-auto mt-8 grid max-w-xl gap-3 lg:mx-0", isRTL ? "text-right" : "text-left")}>
                        {c.trust.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-white/85 md:text-base">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">
                                    <Check className="h-3 w-3" aria-hidden="true" />
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: fast form */}
                <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-xl sm:p-7">
                    <div className="rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
                        <p className="mb-5 text-xs font-black uppercase tracking-[0.16em] text-[#0369a1]">{c.panelTitle}</p>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-bold text-[#0f172a]">{c.nameLabel}</label>
                                <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder={c.namePh} autoComplete="name" />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-bold text-[#0f172a]">{c.contactLabel}</label>
                                <input className={inputCls} value={contact} onChange={(e) => setContact(e.target.value)} placeholder={c.contactPh} inputMode="text" />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-bold text-[#0f172a]">{c.needLabel}</label>
                                <textarea
                                    className={cn(inputCls, "h-24 resize-none py-3 leading-relaxed")}
                                    value={need}
                                    onChange={(e) => setNeed(e.target.value)}
                                    placeholder={c.needPh(serviceName)}
                                />
                            </div>

                            <a
                                href={valid ? waHref : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-disabled={!valid}
                                className={cn(
                                    "group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-black text-white transition",
                                    valid
                                        ? "bg-[#25D366] shadow-[0_14px_34px_rgba(37,211,102,0.35)] hover:-translate-y-0.5"
                                        : "pointer-events-none cursor-not-allowed bg-neutral-300"
                                )}
                            >
                                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                                {c.send}
                                <ArrowUpRight className={cn("h-4 w-4 opacity-80 transition-transform", isRTL ? "-scale-x-100" : "", "group-hover:-translate-y-0.5")} aria-hidden="true" />
                            </a>

                            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
                                <Clock className="h-3.5 w-3.5 text-[#0284c7]" aria-hidden="true" />
                                <span>{c.note}</span>
                            </div>

                            <a href={`mailto:${email}`} className="flex items-center justify-center gap-2 border-t border-neutral-100 pt-4 text-sm font-semibold text-neutral-500 transition hover:text-[#0284c7]">
                                <Mail className="h-4 w-4" aria-hidden="true" />
                                {c.emailLabel}: {email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
