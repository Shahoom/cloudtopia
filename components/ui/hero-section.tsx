"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localePath } from "@/lib/i18n/url";

const colors = {
    azure: "#0284c7",
    navy: "#0f172a",
};

type HeroCopy = {
    eyebrow: string;
    headline: string;
    subline: string;
    description: string;
    primary: string;
    secondary: string;
    process: string;
    trust: string[];
};

const techStackIcons = [
    { label: "Next.js", src: "/icons/homepage/nextjs_logo_light.svg" },
    { label: "Vercel", src: "/icons/homepage/vercel_wordmark.svg" },
    { label: "AWS", src: "/icons/homepage/aws_light.svg" },
    { label: "Azure", src: "/icons/homepage/azure.svg" },
    { label: "Cloudflare", src: "/icons/homepage/cloudflare.svg" },
    { label: "Firebase", src: "/icons/homepage/firebase-wordmark.svg" },
    { label: "Payload CMS", src: "/icons/homepage/payload.svg" },
    { label: "PostgreSQL", src: "/icons/homepage/postgresql-wordmark-light.svg" },
    { label: "Shopify", src: "/icons/homepage/shopify-wordmark-light.svg" },
    { label: "WordPress", src: "/icons/homepage/wordpress.svg" },
    { label: "OpenAI", src: "/icons/homepage/openai_wordmark_light.svg" },
    { label: "Claude", src: "/icons/homepage/claude-ai-wordmark-icon_light.svg" },
    { label: "DeepSeek", src: "/icons/homepage/deepseek_wordmark.svg" },
    { label: "TypeScript", src: "/icons/homepage/typescript.svg" },
    { label: "JavaScript", src: "/icons/homepage/javascript.svg" },
    { label: "Flutter", src: "/icons/homepage/flutter.svg" },
    { label: "Swift", src: "/icons/homepage/swift.svg" },
    { label: "Kotlin", src: "/icons/homepage/kotlin.svg" },
];

function WordLine({ text, start = 0 }: { text: string; start?: number }) {
    return (
        <>
            {text.split(" ").map((word, index) => (
                <span
                    key={`${word}-${index}`}
                    className="word inline-block"
                    data-delay={String(start + index * 95)}
                >
                    {word}
                    {index < text.split(" ").length - 1 ? "\u00a0" : ""}
                </span>
            ))}
        </>
    );
}

function TechIconCard({ label, src }: { label: string; src: string }) {
    return (
        <span
            className="group mx-4 inline-flex h-12 w-[6.8rem] shrink-0 items-center justify-center opacity-72 transition duration-300 hover:-translate-y-0.5 hover:opacity-100 sm:mx-7 sm:h-[3.75rem] sm:w-[8.4rem]"
            aria-label={label}
            title={label}
        >
            <Image
                src={src}
                alt=""
                width={112}
                height={32}
                unoptimized
                className="max-h-7 w-auto max-w-[5.9rem] object-contain drop-shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition duration-300 group-hover:scale-[1.04] sm:max-h-9 sm:max-w-[7.4rem]"
                aria-hidden="true"
            />
        </span>
    );
}

export function Component() {
    const { locale, t } = useLanguage();
    const isArabic = locale === "ar";
    const rootRef = useRef<HTMLElement>(null);
    const gradientRef = useRef<HTMLDivElement>(null);

    const copy: HeroCopy = useMemo(
        () =>
            isArabic
                ? {
                    eyebrow: "كلاود توبيا | تكنلوجيا رقمية وسحابية",
                    headline: "أنظمة برمجية وسحابية وذكاء اصطناعي مصممة للعالم العربي.",
                    subline: "مواقع إلكترونية، متاجر رقمية، تطبيقات ويب، أنظمة CRM/ERP، بنية سحابية، وتدفقات عمل مدعومة بالذكاء الاصطناعي — بتجربة عربية أصلية ودعم كامل لاتجاه RTL.",
                    description:
                        "تساعد كلاود توبيا الشركات في السعودية، الإمارات، الخليج، والعالم العربي على بناء منتجات رقمية قابلة للتوسع، تحسّن العمليات، تقلل العمل اليدوي، وتسرّع النمو.",
                    primary: t.home?.hero?.freeConsultation || "استشارة مجانية",
                    secondary: t.home?.hero?.exploreServices || "استكشف الخدمات",
                    process: "اكتشاف | استراتيجية | تصميم | برمجة | إطلاق | تحسين SEO",
                    trust: ["محتوى عربي أصلي", "بنية سريعة وآمنة", "ملكية واضحة للكود"],
                }
                : {
                    eyebrow: "CLOUDTOPIA — DIGITAL & CLOUD TECHNOLOGIES",
                    headline: "Software, cloud, and AI systems built for the Arab world.",
                    subline: "Websites, e-commerce platforms, web apps, CRM/ERP systems, cloud infrastructure, and AI workflows — built with Arabic-first UX and native RTL support.",
                    description:
                        "CloudTopia helps businesses in Saudi Arabia, UAE, the GCC, and the Arab world build scalable digital products that improve operations, reduce manual work, and accelerate growth.",
                    primary: t.home?.hero?.freeConsultation || "Free Consultation",
                    secondary: t.home?.hero?.exploreServices || "Explore Services",
                    process: "Discovery → Strategy → Design → Build → Launch → SEO Growth",
                    trust: ["Arabic-first content", "Fast secure architecture", "Clear code ownership"],
                },
        [isArabic, t.home?.hero?.exploreServices, t.home?.hero?.freeConsultation]
    );

    const contactHref = `/api/whatsapp?locale=${locale}`;
    const servicesHref = localePath(locale, "/services");

    useEffect(() => {
        const root = rootRef.current;
        const gradient = gradientRef.current;
        if (!root) return;
        const rootEl = root;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const words = Array.from(rootEl.querySelectorAll<HTMLElement>(".word"));
        const floatingElements = Array.from(rootEl.querySelectorAll<HTMLElement>(".floating-element"));
        const timeouts: ReturnType<typeof setTimeout>[] = [];

        words.forEach((word) => {
            const delay = reducedMotion ? 0 : parseInt(word.getAttribute("data-delay") || "0", 10);
            timeouts.push(
                setTimeout(() => {
                    word.style.animation = reducedMotion ? "none" : "word-appear 0.82s ease-out forwards";
                    word.style.opacity = "1";
                    word.style.transform = "translateY(0) scale(1)";
                    word.style.filter = "blur(0)";
                }, delay)
            );
        });

        function onMouseMove(e: MouseEvent) {
            if (!gradient || reducedMotion) return;
            const rect = rootEl.getBoundingClientRect();
            const half = gradient.offsetWidth / 2;
            gradient.style.left = `${e.clientX - rect.left - half}px`;
            gradient.style.top = `${e.clientY - rect.top - half}px`;
            gradient.style.opacity = "1";
        }

        function onMouseLeave() {
            if (gradient) gradient.style.opacity = "0";
        }

        function onClick(e: MouseEvent) {
            if (reducedMotion) return;
            const ripple = document.createElement("div");
            const rect = rootEl.getBoundingClientRect();
            ripple.className = "ct-hero-ripple";
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            rootEl.appendChild(ripple);
            setTimeout(() => ripple.remove(), 900);
        }

        let scrolled = false;
        function onScroll() {
            if (scrolled || reducedMotion) return;
            scrolled = true;
            floatingElements.forEach((el, index) => {
                timeouts.push(
                    setTimeout(() => {
                        el.style.animationPlayState = "running";
                    }, index * 180)
                );
            });
        }

        rootEl.addEventListener("mousemove", onMouseMove);
        rootEl.addEventListener("mouseleave", onMouseLeave);
        rootEl.addEventListener("click", onClick);
        window.addEventListener("scroll", onScroll);

        return () => {
            timeouts.forEach(clearTimeout);
            rootEl.removeEventListener("mousemove", onMouseMove);
            rootEl.removeEventListener("mouseleave", onMouseLeave);
            rootEl.removeEventListener("click", onClick);
            window.removeEventListener("scroll", onScroll);
        };
    }, [copy]);

    return (
        <section
            ref={rootRef}
            dir={isArabic ? "rtl" : "ltr"}
            aria-labelledby="cloudtopia-home-hero-title"
            className={`cloudtopia-hero relative isolate w-full overflow-hidden bg-[#f4f1f8] text-[#0f172a] ${isArabic ? "font-[var(--font-poppins)]" : ""}`}
            style={{
                backgroundImage: `
                    linear-gradient(180deg, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.5) 42%, rgba(244,241,248,0.72) 100%),
                    radial-gradient(circle at 50% 22%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.45) 31%, rgba(2,132,199,0.1) 58%, transparent 74%),
                    url('/images/homepage/clouds.webp')
                `,
                backgroundSize: "cover, cover, cover",
                backgroundPosition: "center, center, center 58%",
            }}
        >
            <style jsx global>{`
                .cloudtopia-hero .word {
                    opacity: 0;
                    transform: translateY(30px) scale(0.86);
                    filter: blur(10px);
                    transition: text-shadow 260ms ease;
                    will-change: transform, opacity, filter;
                }

                .cloudtopia-hero .word:hover {
                    text-shadow: 0 0 22px rgba(2, 132, 199, 0.18);
                }

                .cloudtopia-hero .grid-line {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    opacity: 0;
                    animation: grid-draw 1.8s ease-out forwards;
                }

                .cloudtopia-hero .detail-dot {
                    opacity: 0;
                    animation: pulse-glow 4.8s ease-in-out infinite;
                }

                .cloudtopia-hero .corner-element {
                    position: absolute;
                    z-index: 2;
                    width: 3rem;
                    height: 3rem;
                    opacity: 0;
                    animation: word-appear 0.9s ease-out forwards;
                }

                .cloudtopia-hero .corner-element::before,
                .cloudtopia-hero .corner-element::after {
                    content: "";
                    position: absolute;
                    background: rgba(2, 132, 199, 0.36);
                }

                .cloudtopia-hero .corner-element::before {
                    width: 100%;
                    height: 1px;
                }

                .cloudtopia-hero .corner-element::after {
                    width: 1px;
                    height: 100%;
                }

                .cloudtopia-hero .corner-element.top-left {
                    top: 1.5rem;
                    left: 1.5rem;
                }

                .cloudtopia-hero .corner-element.top-right {
                    top: 1.5rem;
                    right: 1.5rem;
                    transform: scaleX(-1);
                }

                .cloudtopia-hero .corner-element.bottom-left {
                    bottom: 1.5rem;
                    left: 1.5rem;
                    transform: scaleY(-1);
                }

                .cloudtopia-hero .corner-element.bottom-right {
                    right: 1.5rem;
                    bottom: 1.5rem;
                    transform: scale(-1);
                }

                .cloudtopia-hero .floating-element {
                    position: absolute;
                    z-index: 1;
                    width: 0.38rem;
                    height: 0.38rem;
                    border-radius: 999px;
                    background: rgba(2, 132, 199, 0.36);
                    box-shadow: 0 0 30px rgba(2, 132, 199, 0.16);
                    animation: float 12s ease-in-out infinite;
                    animation-play-state: paused;
                }

                .cloudtopia-hero .cloud-veil {
                    position: absolute;
                    inset: auto 0 -18% 0;
                    height: 48%;
                    background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.62) 52%, #fff 100%);
                    filter: blur(0.2px);
                    pointer-events: none;
                }

                .ct-hero-ripple {
                    position: absolute;
                    z-index: 4;
                    width: 4px;
                    height: 4px;
                    border-radius: 999px;
                    background: rgba(2, 132, 199, 0.42);
                    pointer-events: none;
                    transform: translate(-50%, -50%);
                    animation: ripple-glow 0.9s ease-out forwards;
                }

                @keyframes word-appear {
                    0% {
                        opacity: 0;
                        transform: translateY(30px) scale(0.86);
                        filter: blur(10px);
                    }
                    50% {
                        opacity: 0.82;
                        transform: translateY(10px) scale(0.97);
                        filter: blur(2px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                        filter: blur(0);
                    }
                }

                @keyframes grid-draw {
                    0% {
                        stroke-dashoffset: 1000;
                        opacity: 0;
                    }
                    50% {
                        opacity: 0.28;
                    }
                    100% {
                        stroke-dashoffset: 0;
                        opacity: 0.16;
                    }
                }

                @keyframes pulse-glow {
                    0%,
                    100% {
                        opacity: 0.16;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.48;
                        transform: scale(1.22);
                    }
                }

                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.18;
                    }
                    25% {
                        transform: translateY(-10px) translateX(5px);
                        opacity: 0.48;
                    }
                    50% {
                        transform: translateY(-5px) translateX(-3px);
                        opacity: 0.34;
                    }
                    75% {
                        transform: translateY(-15px) translateX(7px);
                        opacity: 0.58;
                    }
                }

                @keyframes ripple-glow {
                    0% {
                        opacity: 0.32;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(90);
                    }
                }

                @media (max-width: 640px) {
                    .cloudtopia-hero .corner-element {
                        display: none;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .cloudtopia-hero .word,
                    .cloudtopia-hero .grid-line,
                    .cloudtopia-hero .detail-dot,
                    .cloudtopia-hero .corner-element,
                    .cloudtopia-hero .floating-element,
                    .ct-hero-ripple {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                        filter: none !important;
                    }
                }
            `}</style>

            <svg className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                    <pattern id="cloudtopia-hero-grid" width="64" height="64" patternUnits="userSpaceOnUse">
                        <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(15,23,42,0.065)" strokeWidth="0.6" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cloudtopia-hero-grid)" />
                <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" stroke={colors.azure} strokeWidth="0.8" />
                <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" stroke={colors.navy} strokeWidth="0.6" style={{ animationDelay: "0.18s" }} />
                <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" stroke={colors.navy} strokeWidth="0.6" style={{ animationDelay: "0.32s" }} />
                <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" stroke={colors.navy} strokeWidth="0.6" style={{ animationDelay: "0.48s" }} />
                <line x1="50%" y1="0" x2="50%" y2="100%" className="grid-line" stroke={colors.azure} strokeWidth="0.5" style={{ animationDelay: "0.64s", opacity: 0.08 }} />
                <circle cx="20%" cy="20%" r="2" className="detail-dot" fill={colors.azure} style={{ animationDelay: "1s" }} />
                <circle cx="80%" cy="20%" r="2" className="detail-dot" fill={colors.azure} style={{ animationDelay: "1.18s" }} />
                <circle cx="20%" cy="80%" r="2" className="detail-dot" fill={colors.azure} style={{ animationDelay: "1.36s" }} />
                <circle cx="80%" cy="80%" r="2" className="detail-dot" fill={colors.azure} style={{ animationDelay: "1.54s" }} />
                <circle cx="50%" cy="50%" r="1.7" className="detail-dot" fill={colors.azure} style={{ animationDelay: "1.72s" }} />
            </svg>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.7),rgba(255,255,255,0.22)_36%,rgba(244,241,248,0.42)_70%)]" aria-hidden="true" />
            <div className="cloud-veil" aria-hidden="true" />
            <div className="corner-element top-left" style={{ animationDelay: "1.6s" }} aria-hidden="true" />
            <div className="corner-element top-right" style={{ animationDelay: "1.78s" }} aria-hidden="true" />
            <div className="corner-element bottom-left" style={{ animationDelay: "1.96s" }} aria-hidden="true" />
            <div className="corner-element bottom-right" style={{ animationDelay: "2.14s" }} aria-hidden="true" />
            <div className="floating-element" style={{ top: "25%", left: "15%", animationDelay: "2.4s" }} aria-hidden="true" />
            <div className="floating-element" style={{ top: "58%", left: "86%", animationDelay: "2.9s" }} aria-hidden="true" />
            <div className="floating-element" style={{ top: "42%", left: "9%", animationDelay: "3.4s" }} aria-hidden="true" />
            <div className="floating-element" style={{ top: "76%", left: "90%", animationDelay: "3.9s" }} aria-hidden="true" />

            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center gap-4 px-5 pb-12 pt-7 sm:gap-5 sm:px-8 sm:pb-14 sm:pt-10 lg:gap-6 lg:px-10 lg:pb-16 lg:pt-12">
                <div className="text-center">
                    <p className="font-mono text-xs font-black uppercase leading-5 tracking-[0.2em] text-[#0284c7] sm:text-sm md:text-[0.92rem]">
                        <WordLine text={copy.eyebrow} />
                    </p>
                    <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#0284c7]/45 to-transparent" />
                </div>

                <div className="mx-auto grid max-w-6xl gap-5 pb-1 pt-7 text-center sm:gap-7 sm:pb-2 sm:pt-10 lg:pb-2 lg:pt-12">
                    <h1
                        id="cloudtopia-home-hero-title"
                        className="mx-auto max-w-6xl text-balance text-[1.8rem] font-black leading-[1.08] tracking-tight text-[#0f172a] sm:text-5xl lg:text-6xl xl:text-[4.85rem]"
                    >
                        <WordLine text={copy.headline} start={420} />
                    </h1>

                    <p className="mx-auto max-w-5xl text-balance text-base font-extrabold leading-7 text-[#0284c7] sm:text-xl lg:text-2xl lg:leading-9">
                        <WordLine text={copy.subline} start={1500} />
                    </p>

                    <p className="mx-auto max-w-4xl text-pretty text-sm font-bold leading-7 text-[#475569] sm:text-base sm:leading-8">
                        {copy.description}
                    </p>

                    <div className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href={contactHref}
                            className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#0f172a] px-6 py-3.5 text-sm font-black text-white shadow-[0_18px_42px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0284c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0284c7]"
                        >
                            {copy.primary}
                            <ArrowRight className={`h-4 w-4 transition-transform ${isArabic ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} aria-hidden="true" />
                        </Link>
                        <Link
                            href={servicesHref}
                            className="inline-flex min-h-12 items-center justify-center border border-slate-900/12 bg-white/58 px-6 py-3.5 text-sm font-black text-[#0f172a] shadow-[0_14px_38px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/82 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0284c7]"
                        >
                            {copy.secondary}
                        </Link>
                    </div>

                    <Marquee
                        pauseOnHover
                        direction="left"
                        speed={34}
                        dir="ltr"
                        className="mx-auto mt-0 max-w-5xl py-0 sm:mt-0 [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]"
                    >
                        {techStackIcons.map((icon) => (
                            <TechIconCard key={icon.src} label={icon.label} src={icon.src} />
                        ))}
                    </Marquee>
                </div>

                <div className="mx-auto grid w-full max-w-6xl gap-3 text-center">
                    <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#0284c7]/40 to-transparent" />
                    <p className="text-[0.68rem] font-black uppercase leading-5 tracking-[0.14em] text-[#475569] sm:text-sm">
                        {copy.process}
                    </p>
                    <div className="mx-auto hidden max-w-4xl flex-wrap justify-center gap-2 text-xs font-bold text-[#475569] sm:flex">
                        {copy.trust.map((item) => (
                            <span key={item} className="inline-flex items-center gap-1.5 bg-white/45 px-3 py-1.5 backdrop-blur-md">
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#0284c7]" aria-hidden="true" />
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div
                ref={gradientRef}
                className="pointer-events-none absolute left-1/2 top-1/2 z-[3] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 ease-out sm:h-96 sm:w-96"
                style={{
                    background: "radial-gradient(circle, rgba(2,132,199,0.12) 0%, rgba(244,241,248,0.08) 40%, transparent 72%)",
                }}
                aria-hidden="true"
            />
        </section>
    );
}
