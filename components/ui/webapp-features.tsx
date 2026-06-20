"use client";

import React, { useEffect, useRef, useState } from "react";

// Feature bento adapted from a monochrome template → locked to CloudTopia's
// light brand palette (no theme toggle, no demo chrome). Fully prop-driven so
// each interactive-web-app sub-service gets bespoke cards + metrics.

export type WebAppFeatureCard = {
    id: string;
    variant: "orbit" | "relay" | "wave" | "spark" | "loop";
    meta: string;
    title: string;
    description: string;
    statLabel: string;
    statValue: string;
};

export type WebAppFeatureMetric = { label: string; value: string };

export type WebAppFeaturesContent = {
    eyebrow: string;
    heading: string;
    subheading: string;
    cards: WebAppFeatureCard[];
    metrics: WebAppFeatureMetric[];
};

const ICON_CSS = `
@keyframes ctf-card-in {
    0%   { opacity: 0; transform: translate3d(0, 26px, 0) scale(0.97); }
    100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
/* Default = visible (resilient to no-JS / failed observer). JS "arms" the
   reveal on mount, then the observer plays it once the section scrolls in. */
.ctf-card { opacity: 1; transform: none; }
.ctf-section[data-armed="true"] .ctf-card { opacity: 0; transform: translate3d(0, 28px, 0); }
.ctf-section[data-armed="true"][data-visible="true"] .ctf-card {
    animation: ctf-card-in 0.7s cubic-bezier(0.22,0.68,0,1) forwards;
    animation-delay: var(--ctf-delay, 0ms);
}
@keyframes ctf-flare { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes ctf-dash  { 0% { transform: translateX(-25%); opacity: 0; } 30%,70% { opacity: 1; } 100% { transform: translateX(25%); opacity: 0; } }
@keyframes ctf-wave  { 0% { transform: translateX(-45%); } 100% { transform: translateX(45%); } }
@keyframes ctf-pulse { 0% { transform: scale(0.8); opacity: 0.6; } 70% { opacity: 0.05; } 100% { transform: scale(1.35); opacity: 0; } }
.ctf-icon {
    position: relative; display: inline-flex; align-items: center; justify-content: center;
    height: 100%; width: 100%; border-radius: 9999px; overflow: hidden; isolation: isolate;
    --ctf-stroke: #0284c7; --ctf-trail: rgba(2,132,199,0.35);
}
.ctf-icon::before, .ctf-icon::after {
    content: ""; position: absolute; inset: 5px; border-radius: inherit;
    border: 1px solid var(--ctf-trail); opacity: 0.5;
}
.ctf-icon::after { inset: 11px; opacity: 0.25; }
.ctf-icon[data-variant="orbit"] span {
    position: absolute; height: 140%; width: 3px;
    background: linear-gradient(180deg, transparent, var(--ctf-stroke) 55%, transparent);
    transform-origin: center; animation: ctf-flare 8s linear infinite;
}
.ctf-icon[data-variant="relay"] span {
    position: absolute; inset: 16px; border-top: 1px solid var(--ctf-stroke);
    border-bottom: 1px solid var(--ctf-stroke); transform: skewX(-15deg);
}
.ctf-icon[data-variant="relay"] span::before, .ctf-icon[data-variant="relay"] span::after {
    content: ""; position: absolute; height: 1px; width: 120%; left: -10%;
    background: linear-gradient(90deg, transparent, var(--ctf-stroke), transparent);
    animation: ctf-dash 2.6s ease-in-out infinite;
}
.ctf-icon[data-variant="relay"] span::after { top: 70%; animation-delay: 0.9s; }
.ctf-icon[data-variant="wave"] span { position: absolute; inset: 11px; border-radius: 999px; overflow: hidden; }
.ctf-icon[data-variant="wave"] span::before {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 5%, var(--ctf-stroke) 50%, transparent 95%);
    transform: translateX(-45%); animation: ctf-wave 2.8s ease-in-out infinite alternate;
}
.ctf-icon[data-variant="spark"] span { position: absolute; inset: 0; }
.ctf-icon[data-variant="spark"] span::before, .ctf-icon[data-variant="spark"] span::after {
    content: ""; position: absolute; inset: 11px; border-radius: 9999px;
    border: 1px solid var(--ctf-stroke); opacity: 0.3; animation: ctf-pulse 2.8s ease-out infinite;
}
.ctf-icon[data-variant="spark"] span::after { animation-delay: 0.9s; }
.ctf-icon[data-variant="loop"] span { position: absolute; inset: 11px; }
.ctf-icon[data-variant="loop"] span::before, .ctf-icon[data-variant="loop"] span::after {
    content: ""; position: absolute; height: 1px; width: 100%; top: 50%; left: 0;
    background: linear-gradient(90deg, transparent, var(--ctf-stroke), transparent);
}
.ctf-icon[data-variant="loop"] span::before { transform: rotate(90deg); }
.ctf-icon[data-variant="loop"] span::after { opacity: 0.4; }
@media (prefers-reduced-motion: reduce) {
    .ctf-section[data-armed="true"] .ctf-card { opacity: 1; transform: none; }
    .ctf-section[data-armed="true"][data-visible="true"] .ctf-card { animation: none; }
    .ctf-icon span, .ctf-icon span::before, .ctf-icon span::after { animation: none !important; }
}
`;

function AnimatedIcon({ variant }: { variant: WebAppFeatureCard["variant"] }) {
    return (
        <span className="ctf-icon" data-variant={variant}>
            <span />
        </span>
    );
}

function FeatureCard({ card, index }: { card: WebAppFeatureCard; index: number }) {
    const ref = useRef<HTMLElement>(null);

    const setGlow = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--ctf-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--ctf-y", `${e.clientY - rect.top}px`);
    };
    const clearGlow = () => {
        const el = ref.current;
        if (!el) return;
        el.style.removeProperty("--ctf-x");
        el.style.removeProperty("--ctf-y");
    };

    return (
        <article
            ref={ref}
            className="ctf-card group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_14px_50px_-30px_rgba(2,132,199,0.4)] transition-colors duration-500 sm:p-7"
            style={{ ["--ctf-delay" as string]: `${index * 90}ms` }}
            onMouseMove={setGlow}
            onMouseLeave={clearGlow}
        >
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center font-mono text-xs tracking-[0.3em] text-[#0284c7] opacity-70">
                    {card.id}
                </div>
                <div className="flex flex-col gap-4 lg:flex-1">
                    <span className="inline-flex w-fit items-center rounded-full border border-[#0ea5e9]/20 bg-[#0ea5e9]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#0369a1]">
                        {card.meta}
                    </span>
                    <h3 className="text-xl font-black leading-tight tracking-tight text-[#0f172a] sm:text-2xl">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600 sm:text-[0.95rem]">{card.description}</p>
                </div>
                <div className="mt-2 h-14 w-14 shrink-0 rounded-full border border-neutral-200 bg-[#f8fbff] sm:h-16 sm:w-16 lg:ml-auto lg:mt-0">
                    <AnimatedIcon variant={card.variant} />
                </div>
            </div>
            <div className="mt-7 flex flex-col gap-2 border-t border-neutral-100 pt-5 text-xs uppercase tracking-[0.18em] sm:flex-row sm:items-center sm:justify-between">
                <span className="text-neutral-400">{card.statLabel}</span>
                <span className="font-black tracking-tight text-[#0284c7] text-base normal-case">{card.statValue}</span>
            </div>
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background:
                        "radial-gradient(220px circle at var(--ctf-x, 50%) var(--ctf-y, 50%), rgba(2,132,199,0.12), transparent 70%)",
                }}
            />
        </article>
    );
}

export function WebAppFeatures({
    content,
    dir = "ltr",
}: {
    content: WebAppFeaturesContent;
    dir?: "ltr" | "rtl";
}) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [armed, setArmed] = useState(false);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node || typeof window === "undefined") return;
        setArmed(true);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.15 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <section dir={dir} className="relative w-full overflow-hidden bg-[#f4f1f8] py-16 sm:py-20">
            <style>{ICON_CSS}</style>

            {/* Subtle brand dotted grid */}
            <div
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(2,132,199,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(2,132,199,0.06) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                    maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
                }}
            />

            <div
                ref={sectionRef}
                className="ctf-section mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8"
                data-armed={armed}
                data-visible={visible}
            >
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0ea5e9]/20 bg-[#0ea5e9]/10 px-4 py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0ea5e9]" />
                        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#0369a1]">{content.eyebrow}</span>
                    </div>
                    <h2 className="text-3xl font-black leading-tight tracking-tight text-[#0f172a] sm:text-4xl">{content.heading}</h2>
                    <p className="mt-4 text-base text-neutral-600 sm:text-lg">{content.subheading}</p>
                </div>

                {/* Cards bento */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:gap-7">
                    {content.cards.map((card, index) => (
                        <FeatureCard key={card.id} card={card} index={index} />
                    ))}
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-1 gap-4 rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_18px_60px_-40px_rgba(2,132,199,0.5)] sm:grid-cols-3">
                    {content.metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="rounded-2xl border border-neutral-100 bg-[#f8fbff] px-5 py-6 text-center"
                        >
                            <span className="block text-3xl font-black tracking-tight text-[#0284c7]">{metric.value}</span>
                            <span className="mt-2 block text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">{metric.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WebAppFeatures;
