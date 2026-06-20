"use client";

import React from "react";
import { motion } from "framer-motion";

// Adapted for CloudTopia from "testimonials-columns-1" (motion/react → the
// installed framer-motion). Light/brand, tighter padding, wide, initials
// avatars instead of stock faces.
//
// IMPORTANT: the quotes below are representative SAMPLES written to show tone +
// layout. Replace them with REAL, attributed client testimonials (with the
// person's permission) before this section goes live. Do not present sample
// quotes as real social proof.

type Testimonial = { text: string; name: string; role: string };

function initials(name: string) {
    return name
        .replace(/[^\p{L}\s.]/gu, "")
        .split(/\s+/)
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

const GRADS = ["from-sky-400 to-cyan-500", "from-indigo-400 to-violet-500", "from-blue-400 to-sky-500"];

function Column({ items, duration = 18, offset = 0, className }: { items: Testimonial[]; duration?: number; offset?: number; className?: string }) {
    return (
        <div className={className}>
            <motion.div
                animate={{ translateY: "-50%" }}
                transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                className="flex flex-col gap-5 pb-5"
            >
                {[...items, ...items].map((t, i) => (
                    <div
                        key={i}
                        className="w-full max-w-xs rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_12px_44px_-22px_rgba(2,132,199,0.3)]"
                    >
                        <p className="text-sm leading-relaxed text-neutral-700">{t.text}</p>
                        <div className="mt-5 flex items-center gap-3">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${GRADS[(i + offset) % GRADS.length]} text-xs font-black text-white`}>
                                {initials(t.name)}
                            </div>
                            <div className="leading-5">
                                <div className="font-bold tracking-tight text-[#0f172a]">{t.name}</div>
                                <div className="text-sm tracking-tight text-neutral-500">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

const CONTENT: Record<"en" | "ar", { eyebrow: string; heading: string; sub: string; items: Testimonial[] }> = {
    en: {
        eyebrow: "What clients say",
        heading: "Trusted to build it right",
        sub: "A snapshot of what working with CloudTopia is like.",
        items: [
            { text: "CloudTopia rebuilt our site and enquiries climbed within weeks. It's fast, bilingual, and finally feels like us.", name: "Khalid A.", role: "Operations Manager" },
            { text: "They scoped everything in writing up front, hit the timeline, and handed over every account. No surprises.", name: "Reem S.", role: "Founder" },
            { text: "Our store loads instantly now and checkout just works. Mobile sales noticeably improved.", name: "Yousef M.", role: "E-commerce Lead" },
            { text: "The Arabic and English versions are both flawless — RTL done properly for once.", name: "Layla H.", role: "Marketing Manager" },
            { text: "We own the code and the content. That alone made CloudTopia an easy choice.", name: "Omar T.", role: "Managing Director" },
            { text: "Reservations and the QR menu were live before our reopening. Guests love how easy it is.", name: "Sara K.", role: "Restaurant Owner" },
            { text: "Support is genuinely responsive — a real person, same day, every time.", name: "Faisal R.", role: "Operations" },
            { text: "Our rankings went up after the redesign instead of dropping. They clearly know SEO.", name: "Noura B.", role: "Brand Lead" },
            { text: "Clean design, clear pricing, fast delivery. Exactly what a small team needs.", name: "Hassan D.", role: "Co-founder" },
        ],
    },
    ar: {
        eyebrow: "ماذا يقول العملاء",
        heading: "موثوقون لبنائه بإتقان",
        sub: "لمحة عن تجربة العمل مع كلاود توبيا.",
        items: [
            { text: "أعادت كلاود توبيا بناء موقعنا فارتفعت الاستفسارات خلال أسابيع. سريع، بلغتين، وأخيراً يشبهنا.", name: "خالد ع.", role: "مدير العمليات" },
            { text: "حدّدوا كل شيء كتابياً مسبقاً، التزموا بالموعد، وسلّمونا كل الحسابات. بلا مفاجآت.", name: "ريم س.", role: "مؤسِّسة" },
            { text: "متجرنا يُحمّل فوراً والدفع يعمل بسلاسة. تحسّنت مبيعات الجوال بوضوح.", name: "يوسف م.", role: "مسؤول المتجر" },
            { text: "النسختان العربية والإنجليزية متقنتان — وأخيراً RTL مطبّق كما يجب.", name: "ليلى ح.", role: "مديرة التسويق" },
            { text: "نملك الكود والمحتوى. هذا وحده جعل اختيار كلاود توبيا سهلاً.", name: "عمر ت.", role: "مدير عام" },
            { text: "الحجوزات وقائمة QR كانت جاهزة قبل إعادة الافتتاح. الضيوف أحبّوا سهولتها.", name: "سارة ك.", role: "صاحبة مطعم" },
            { text: "الدعم سريع فعلاً — شخص حقيقي، في نفس اليوم، كل مرة.", name: "فيصل ر.", role: "العمليات" },
            { text: "ترتيبنا ارتفع بعد إعادة التصميم بدل أن ينخفض. واضح أنهم يتقنون الـ SEO.", name: "نورة ب.", role: "مسؤولة العلامة" },
            { text: "تصميم نظيف، تسعير واضح، تسليم سريع. تماماً ما يحتاجه فريق صغير.", name: "حسن د.", role: "شريك مؤسِّس" },
        ],
    },
};

export function TestimonialsMarquee({ locale = "en", dir = "ltr" }: { locale?: "en" | "ar"; dir?: "ltr" | "rtl" }) {
    const c = CONTENT[locale] || CONTENT.en;
    const cols = [c.items.slice(0, 3), c.items.slice(3, 6), c.items.slice(6, 9)];

    return (
        <section dir={dir} className="w-full overflow-hidden bg-[#f4f1f8] py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">{c.eyebrow}</p>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">{c.heading}</h2>
                    <p className="mt-4 text-base text-neutral-600">{c.sub}</p>
                </div>

                <div className="mt-10 flex max-h-[560px] justify-center gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
                    <Column items={cols[0]} duration={20} offset={0} />
                    <Column items={cols[1]} duration={26} offset={1} className="hidden md:block" />
                    <Column items={cols[2]} duration={23} offset={2} className="hidden lg:block" />
                </div>
            </div>
        </section>
    );
}
