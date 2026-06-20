import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Bespoke delivery-process section for the interactive-web-app sub-services.
// Distinct from the website ProcessOverview: a horizontal numbered timeline with
// a connecting brand line (vertical on mobile). Server component — pure-CSS
// hover, no client JS, no LCP cost. Steps are hand-written per service.

export type WebAppProcessStep = { title: string; description: string; duration: string };

export type WebAppProcessContent = {
    eyebrow: string;
    heading: string;
    subheading: string;
    steps: WebAppProcessStep[];
    ctaLabel: string;
};

export function WebAppProcess({
    content,
    dir = "ltr",
    ctaHref = "/contact",
}: {
    content: WebAppProcessContent;
    dir?: "ltr" | "rtl";
    ctaHref?: string;
}) {
    const isRTL = dir === "rtl";

    return (
        <section dir={dir} className="w-full bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">{content.eyebrow}</p>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">{content.heading}</h2>
                    <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">{content.subheading}</p>
                </div>

                {/* Timeline */}
                <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                    {/* Connecting line (desktop) */}
                    <div
                        className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px lg:block"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(2,132,199,0.35) 12%, rgba(2,132,199,0.35) 88%, transparent)" }}
                        aria-hidden="true"
                    />
                    {content.steps.map((step, i) => (
                        <div key={i} className="group relative">
                            {/* Number node */}
                            <div className="relative z-10 mb-5 flex items-center gap-3">
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white font-mono text-lg font-black tabular-nums text-[#0284c7] shadow-[0_8px_24px_-12px_rgba(2,132,199,0.5)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-sky-300 group-hover:bg-[#0284c7] group-hover:text-white">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="rounded-full border border-[#0ea5e9]/20 bg-[#0ea5e9]/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0369a1]">
                                    {step.duration}
                                </span>
                            </div>

                            <div className="rounded-2xl border border-neutral-200 bg-[#f8fbff] p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-sky-300 group-hover:shadow-[0_18px_50px_-24px_rgba(2,132,199,0.45)]">
                                <h3 className="mb-2 text-lg font-bold text-[#0f172a]">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-neutral-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href={ctaHref}
                        className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0f172a] px-7 py-3.5 text-sm font-black text-white shadow-[0_14px_34px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0284c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0284c7]"
                    >
                        {content.ctaLabel}
                        <ArrowUpRight
                            className={cn("h-5 w-5 transition-transform group-hover:-translate-y-0.5", isRTL ? "-scale-x-100 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5")}
                            aria-hidden="true"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default WebAppProcess;
