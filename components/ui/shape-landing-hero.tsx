"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Circle } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Adapted for CloudTopia from the Kokonut UI "shape-landing-hero".
// Light brand base (#f4f1f8) with vivid, interactive sky/indigo/cyan glass
// shapes that drift with the cursor, a keyword-first <h1>, brand CTAs, and full
// RTL support so the same hero renders for every website sub-service.
//
// SEO/LCP note: the decorative shapes use framer-motion + pointer parallax, but
// the text (badge, H1, subtitle, CTAs) animates via pure CSS so the LCP heading
// paints without waiting on hydration — the same fix used on the homepage hero.

function ElegantShape({
    className,
    pillClassName,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    depth = 0.03,
}: {
    className?: string;
    pillClassName?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    /** Parallax strength — how far this shape drifts toward the cursor. */
    depth?: number;
}) {
    return (
        <div
            className={cn("ct-parallax absolute pointer-events-none", className)}
            style={{
                transform: `translate3d(calc(var(--ct-mx, 0px) * ${depth}), calc(var(--ct-my, 0px) * ${depth}), 0)`,
            }}
            aria-hidden="true"
        >
            <motion.div
                initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
                animate={{ opacity: 1, y: 0, rotate }}
                transition={{
                    duration: 2.4,
                    delay,
                    ease: [0.23, 0.86, 0.39, 0.96],
                    opacity: { duration: 1.2 },
                }}
                className="ct-elegant-shape"
            >
                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{
                        duration: 12,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                    style={{ width, height }}
                    className="relative"
                >
                    <div
                        className={cn(
                            "ct-pill absolute inset-0 rounded-full bg-gradient-to-br to-transparent backdrop-blur-[2px] border",
                            "transition-transform duration-500 ease-out group-hover/hero:scale-[1.06]",
                            "after:absolute after:inset-0 after:rounded-full",
                            "after:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),transparent_60%)]",
                            pillClassName
                        )}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}

export type HeroCta = { label: string; href: string };

export interface HeroGeometricProps {
    badge?: string;
    title1: string;
    title2: string;
    subtitle?: string;
    primaryCta?: HeroCta;
    secondaryCta?: HeroCta;
    dir?: "ltr" | "rtl";
    className?: string;
    /**
     * Element rendered for the hero heading. Defaults to "h1" for pages where
     * this is the only hero. Pass "p" when the page already has its own <h1>
     * (e.g. DP sub-service pages lead with SubServiceContactHero's h1) so the
     * page keeps exactly one H1 while the design stays identical.
     */
    headingLevel?: "h1" | "p";
}

function HeroGeometric({
    badge = "CloudTopia",
    title1,
    title2,
    subtitle,
    primaryCta,
    secondaryCta,
    dir = "ltr",
    className,
    headingLevel = "h1",
}: HeroGeometricProps) {
    const HeadingTag = headingLevel;
    const isRTL = dir === "rtl";
    const rootRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    // Cursor parallax: shapes drift toward the pointer (each by its own depth)
    // and a soft brand glow follows the cursor. Pure pointer flourish, so it is
    // skipped under reduced motion and never blocks the CSS text entrance.
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let raf = 0;
        const onMove = (e: MouseEvent) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const rect = root.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                root.style.setProperty("--ct-mx", `${x}px`);
                root.style.setProperty("--ct-my", `${y}px`);
                const glow = glowRef.current;
                if (glow) {
                    glow.style.transform = `translate3d(calc(-50% + ${e.clientX - rect.left}px), calc(-50% + ${e.clientY - rect.top}px), 0)`;
                    glow.style.opacity = "1";
                }
            });
        };
        const onLeave = () => {
            root.style.setProperty("--ct-mx", "0px");
            root.style.setProperty("--ct-my", "0px");
            if (glowRef.current) glowRef.current.style.opacity = "0";
        };

        root.addEventListener("mousemove", onMove);
        root.addEventListener("mouseleave", onLeave);
        return () => {
            root.removeEventListener("mousemove", onMove);
            root.removeEventListener("mouseleave", onLeave);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            ref={rootRef}
            dir={dir}
            className={cn(
                "ct-shape-hero group/hero relative min-h-[88vh] w-full flex items-center justify-center overflow-hidden bg-[#f4f1f8]",
                className
            )}
        >
            <style jsx global>{`
                .ct-shape-hero .ct-parallax {
                    transition: transform 0.35s cubic-bezier(0.23, 0.86, 0.39, 0.96);
                    will-change: transform;
                }
                .ct-shape-hero .ct-hero-rise {
                    opacity: 0;
                    animation: ct-hero-rise 0.85s cubic-bezier(0.25, 0.4, 0.25, 1) both;
                }
                @keyframes ct-hero-rise {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .ct-shape-hero .ct-hero-rise {
                        animation: none;
                        opacity: 1;
                        transform: none;
                    }
                    .ct-shape-hero .ct-elegant-shape {
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>

            {/* colorful base wash */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(14,165,233,0.12),transparent_70%)]" />
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.10] via-transparent to-indigo-500/[0.10]" />

            {/* cursor-following glow */}
            <div
                ref={glowRef}
                className="pointer-events-none absolute left-0 top-0 z-[1] h-80 w-80 rounded-full opacity-0 blur-3xl transition-opacity duration-500"
                style={{
                    background:
                        "radial-gradient(circle, rgba(14,165,233,0.28) 0%, rgba(99,102,241,0.18) 45%, transparent 72%)",
                }}
                aria-hidden="true"
            />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    depth={0.04}
                    pillClassName="from-sky-500/55 via-cyan-400/30 border-sky-300/60 shadow-[0_18px_60px_-8px_rgba(14,165,233,0.55)]"
                    className="left-[-10%] md:left-[-5%] top-[14%] md:top-[18%]"
                />
                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    depth={0.06}
                    pillClassName="from-indigo-500/55 via-violet-400/30 border-indigo-300/60 shadow-[0_18px_60px_-8px_rgba(99,102,241,0.55)]"
                    className="right-[-5%] md:right-[0%] top-[68%] md:top-[72%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={320}
                    height={90}
                    rotate={-8}
                    depth={0.085}
                    pillClassName="from-cyan-500/55 via-teal-300/30 border-cyan-300/60 shadow-[0_18px_60px_-8px_rgba(6,182,212,0.55)]"
                    className="left-[4%] md:left-[9%] bottom-[6%] md:bottom-[12%]"
                />
                <ElegantShape
                    delay={0.6}
                    width={220}
                    height={70}
                    rotate={20}
                    depth={0.11}
                    pillClassName="from-blue-500/55 via-sky-400/30 border-blue-300/60 shadow-[0_18px_60px_-8px_rgba(59,130,246,0.55)]"
                    className="right-[12%] md:right-[18%] top-[9%] md:top-[14%]"
                />
                <ElegantShape
                    delay={0.7}
                    width={160}
                    height={50}
                    rotate={-25}
                    depth={0.14}
                    pillClassName="from-violet-500/55 via-fuchsia-400/25 border-violet-300/60 shadow-[0_18px_60px_-8px_rgba(139,92,246,0.55)]"
                    className="left-[18%] md:left-[24%] top-[6%] md:top-[10%]"
                />
                <ElegantShape
                    delay={0.65}
                    width={180}
                    height={56}
                    rotate={-18}
                    depth={0.1}
                    pillClassName="from-cyan-400/50 via-sky-400/30 border-cyan-200/60 shadow-[0_18px_60px_-8px_rgba(34,211,238,0.5)]"
                    className="right-[20%] md:right-[26%] bottom-[14%] md:bottom-[18%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    {badge ? (
                        <div
                            className="ct-hero-rise inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/75 border border-slate-900/10 shadow-sm backdrop-blur-md mb-8 md:mb-12"
                            style={{ animationDelay: "0.05s" }}
                        >
                            <Circle className="h-2 w-2 fill-sky-500 text-sky-500" aria-hidden="true" />
                            <span className="text-sm font-semibold tracking-wide text-[#0369a1]">
                                {badge}
                            </span>
                        </div>
                    ) : null}

                    <HeadingTag
                        className="ct-hero-rise text-balance text-4xl font-black tracking-tight sm:text-6xl md:text-7xl mb-6 md:mb-8 leading-[1.05]"
                        style={{ animationDelay: "0.15s" }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0f172a] to-[#0f172a]/80">
                            {title1}
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#6366f1]">
                            {title2}
                        </span>
                    </HeadingTag>

                    {subtitle ? (
                        <p
                            className="ct-hero-rise mx-auto max-w-xl px-4 text-base font-medium leading-relaxed tracking-wide text-[#475569] sm:text-lg md:text-xl mb-8"
                            style={{ animationDelay: "0.28s" }}
                        >
                            {subtitle}
                        </p>
                    ) : null}

                    {primaryCta || secondaryCta ? (
                        <div
                            className="ct-hero-rise flex flex-col items-center justify-center gap-3 sm:flex-row"
                            style={{ animationDelay: "0.4s" }}
                        >
                            {primaryCta ? (
                                <Link
                                    href={primaryCta.href}
                                    className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#0f172a] px-7 py-3.5 text-sm font-black text-white shadow-[0_18px_42px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0284c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0284c7]"
                                >
                                    {primaryCta.label}
                                    <ArrowRight
                                        className={cn(
                                            "h-4 w-4 transition-transform",
                                            isRTL
                                                ? "rotate-180 group-hover:-translate-x-1"
                                                : "group-hover:translate-x-1"
                                        )}
                                        aria-hidden="true"
                                    />
                                </Link>
                            ) : null}
                            {secondaryCta ? (
                                <Link
                                    href={secondaryCta.href}
                                    className="inline-flex min-h-12 items-center justify-center border border-slate-900/12 bg-white/70 px-7 py-3.5 text-sm font-black text-[#0f172a] shadow-[0_14px_38px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0284c7]"
                                >
                                    {secondaryCta.label}
                                </Link>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#f4f1f8] via-transparent to-[#f4f1f8]/60 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric };
