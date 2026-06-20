"use client";

import React from "react";
import { motion } from "framer-motion";
import { testimonials as siteTestimonials } from "@/components/home/Testimonials";

// Reuses the real client reviews from the homepage (same names + photos) so the
// sub-service proof matches the site's existing, owner-approved testimonials.

type Review = { quote: string; name: string; role: string; imgSrc: string };

function Column({ items, duration = 18, className }: { items: Review[]; duration?: number; className?: string }) {
    return (
        <div className={className}>
            <motion.div
                animate={{ translateY: "-50%" }}
                transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                className="flex flex-col gap-5 pb-5"
            >
                {[...items, ...items].map((t, i) => (
                    <div key={i} className="w-full max-w-xs rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_12px_44px_-22px_rgba(2,132,199,0.3)]">
                        <p className="text-sm leading-relaxed text-neutral-700">{t.quote}</p>
                        <div className="mt-5 flex items-center gap-3">
                            <img src={t.imgSrc} alt={t.name} width={40} height={40} loading="lazy" className="h-10 w-10 shrink-0 rounded-full object-cover" />
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

const COPY: Record<"en" | "ar", { eyebrow: string; heading: string; sub: string }> = {
    en: { eyebrow: "What clients say", heading: "Trusted to build it right", sub: "Feedback from businesses we've designed, built, and launched for." },
    ar: { eyebrow: "ماذا يقول العملاء", heading: "موثوقون لبنائه بإتقان", sub: "آراء من شركات صمّمنا وبنينا وأطلقنا لها." },
};

export function TestimonialsMarquee({ locale = "en", dir = "ltr" }: { locale?: "en" | "ar"; dir?: "ltr" | "rtl" }) {
    const c = COPY[locale] || COPY.en;
    const items = ((locale === "ar" ? siteTestimonials.ar : siteTestimonials.en) as Review[]).slice(0, 9);
    const cols = [items.slice(0, 3), items.slice(3, 6), items.slice(6, 9)];

    return (
        <section dir={dir} className="w-full overflow-hidden bg-[#f4f1f8] py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">{c.eyebrow}</p>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">{c.heading}</h2>
                    <p className="mt-4 text-base text-neutral-600">{c.sub}</p>
                </div>

                <div className="mt-10 flex max-h-[560px] justify-center gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
                    <Column items={cols[0]} duration={20} />
                    <Column items={cols[1]} duration={26} className="hidden md:block" />
                    <Column items={cols[2]} duration={23} className="hidden lg:block" />
                </div>
            </div>
        </section>
    );
}
