// Server component — no client JS needed; pure CSS animations + Tailwind hover

export type WebAppCardMetric = { label: string; value: string }

export type WebAppHeroContent = {
    badge: string
    titleLine1: string
    titleLine2: string
    subtitle: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
    card: {
        windowTitle: string
        metrics: WebAppCardMetric[]
        chartBars: number[]
    }
    techStack: string[]
}

export function WebAppHero({
    content,
    dir = 'ltr',
}: {
    content: WebAppHeroContent
    dir?: 'ltr' | 'rtl'
}) {
    const isRTL = dir === 'rtl'

    return (
        <section
            dir={dir}
            className="relative overflow-hidden bg-[#f4f1f8] py-16 sm:py-20 lg:py-28"
        >
            {/* CSS entrance animations — runs before JS hydration (LCP-safe) */}
            <style>{`
                @keyframes ct-wh-rise {
                    from { opacity: 0; transform: translateY(22px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .ct-wh-t1   { animation: ct-wh-rise 0.5s ease-out 0.05s both; }
                .ct-wh-t2   { animation: ct-wh-rise 0.5s ease-out 0.15s both; }
                .ct-wh-sub  { animation: ct-wh-rise 0.5s ease-out 0.25s both; }
                .ct-wh-ctas { animation: ct-wh-rise 0.5s ease-out 0.35s both; }
                .ct-wh-bar  { animation: ct-wh-rise 0.5s ease-out 0.45s both; }
                @media (prefers-reduced-motion: reduce) {
                    .ct-wh-t1, .ct-wh-t2, .ct-wh-sub, .ct-wh-ctas, .ct-wh-bar { animation: none; }
                }
            `}</style>

            {/* Decorative floating dots — brand sky/indigo/cyan */}
            <div className={`hidden sm:block absolute top-16 ${isRTL ? 'left-16' : 'right-16'} w-4 h-4 bg-[#0ea5e9] rounded-full opacity-55`} />
            <div className={`hidden sm:block absolute top-28 ${isRTL ? 'left-28' : 'right-28'} w-3 h-3 bg-[#6366f1] rounded-sm rotate-45 opacity-45`} />
            <div className={`hidden sm:block absolute top-36 ${isRTL ? 'left-12' : 'right-12'} w-2 h-9 bg-[#0ea5e9] opacity-35`} />
            <div className={`hidden sm:block absolute top-44 ${isRTL ? 'left-20' : 'right-20'} w-9 h-2 bg-[#06b6d4] opacity-45`} />
            <div className={`hidden sm:block absolute bottom-32 ${isRTL ? 'right-20' : 'left-20'} w-3 h-3 bg-[#6366f1] rounded-full opacity-35`} />
            <div className={`hidden sm:block absolute bottom-20 ${isRTL ? 'right-36' : 'left-36'} w-2 h-2 bg-[#0ea5e9] rounded-sm rotate-45 opacity-45`} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* ── Text column ── */}
                    <div className="text-center lg:text-start">
                        {/* Badge pill */}
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 px-4 py-1.5 mb-6">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0ea5e9]" />
                            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#0369a1]">
                                {content.badge}
                            </span>
                        </div>

                        {/* H1 — animated for LCP safety */}
                        <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tight text-[#0f172a] leading-[1.08]">
                            <span className="ct-wh-t1 block">{content.titleLine1}</span>
                            <span className="ct-wh-t2 block text-[#0284c7]">{content.titleLine2}</span>
                        </h1>

                        <p className="ct-wh-sub mt-5 text-lg text-neutral-600 max-w-lg mx-auto lg:ms-0 lg:me-auto leading-relaxed">
                            {content.subtitle}
                        </p>

                        <div className="ct-wh-ctas mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <a
                                href={content.primaryCta.href}
                                className="inline-flex items-center justify-center rounded-xl bg-[#0284c7] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/20 hover:bg-[#0369a1] transition-colors"
                            >
                                {content.primaryCta.label}
                            </a>
                            <a
                                href={content.secondaryCta.href}
                                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-7 py-3.5 text-sm font-bold text-[#0f172a] hover:border-[#0ea5e9] hover:text-[#0284c7] transition-colors"
                            >
                                {content.secondaryCta.label}
                            </a>
                        </div>
                    </div>

                    {/* ── Dashboard card column ── */}
                    <div className="relative mt-10 lg:mt-0">
                        {/* Tilted card — straightens on hover */}
                        <div className="relative bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-2xl transform rotate-3 sm:rotate-6 hover:rotate-0 transition-transform duration-500 max-w-sm mx-auto lg:max-w-none">

                            {/* macOS-style window bar */}
                            <div className="flex items-center gap-1.5 mb-5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                <span className={`${isRTL ? 'mr-auto' : 'ml-auto'} text-[11px] text-gray-500 font-mono truncate max-w-[145px]`}>
                                    {content.card.windowTitle}
                                </span>
                            </div>

                            {/* 2×2 metric tiles */}
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                {content.card.metrics.map((m, i) => (
                                    <div key={i} className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/40">
                                        <div className="text-[#38bdf8] font-black text-base sm:text-lg leading-tight tracking-tight">
                                            {m.value}
                                        </div>
                                        <div className="text-gray-500 text-[11px] mt-0.5 truncate">{m.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Mini bar chart */}
                            <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/40">
                                <div className="text-gray-600 text-[10px] mb-2 font-mono uppercase tracking-widest">
                                    activity
                                </div>
                                <div className="flex items-end gap-1 h-10">
                                    {content.card.chartBars.map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-t-sm"
                                            style={{
                                                height: `${h}%`,
                                                backgroundColor:
                                                    i === content.card.chartBars.length - 2
                                                        ? '#0ea5e9'
                                                        : '#374151',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Floating accent shapes around card */}
                        <div className={`absolute -top-4 ${isRTL ? '-right-4' : '-left-4'} sm:-top-5 ${isRTL ? 'sm:-right-5' : 'sm:-left-5'} w-8 h-8 bg-[#6366f1] rounded-lg rotate-45 opacity-80`} />
                        <div className={`absolute -bottom-4 ${isRTL ? '-left-4' : '-right-4'} sm:-bottom-5 ${isRTL ? 'sm:-left-5' : 'sm:-right-5'} w-6 h-6 bg-[#0ea5e9] rounded-full opacity-80`} />
                        <div className={`hidden sm:block absolute top-1/2 ${isRTL ? '-left-5' : '-right-5'} w-3 h-16 bg-[#06b6d4] rounded-full opacity-35`} />

                        {/* Scattered micro pixels */}
                        <div className={`hidden sm:block absolute top-8 ${isRTL ? 'left-8' : 'right-8'} w-2 h-2 bg-[#6366f1] opacity-55`} />
                        <div className={`hidden sm:block absolute bottom-12 ${isRTL ? 'right-8' : 'left-8'} w-3 h-3 bg-[#0ea5e9] rounded-full opacity-45`} />
                        <div className={`hidden sm:block absolute top-16 ${isRTL ? 'right-12' : 'left-12'} w-2 h-6 bg-[#06b6d4] opacity-35`} />
                    </div>
                </div>

                {/* ── Tech stack trust bar ── */}
                <div className="mt-14 sm:mt-16 pt-8 border-t border-neutral-200/60">
                    <p className="ct-wh-bar text-[11px] font-black uppercase tracking-[0.18em] text-neutral-400 mb-4 text-center">
                        {isRTL ? 'المكدس التقني' : 'Built with'}
                    </p>
                    <div className="ct-wh-bar flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        {content.techStack.map((tech, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-bold text-neutral-600 shadow-sm"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" />
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
