import Link from "next/link";
import { type ComponentType } from "react";
import { ArrowUpRight, Compass, PenTool, Code2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

// Adapted for CloudTopia from "how-we-do-it-process-overview".
// Light/brand, tighter padding, wide (max-w-7xl). The delivery process is the
// same for every website service, so the steps are shared here and the heading
// is personalized with the service name.

type Step = { icon: ComponentType<{ className?: string }>; title: string; description: string };

const CONTENT: Record<
    "en" | "ar",
    { eyebrow: string; title: (s: string) => string; description: string; cta: string; steps: Step[] }
> = {
    en: {
        eyebrow: "Our process",
        title: (s) => `How we build your ${s}`,
        description:
            "A clear, fixed-scope process — no surprises, and you always know exactly where things stand at every step.",
        cta: "Start your project",
        steps: [
            { icon: Compass, title: "Discovery & scope", description: "We learn your goals, audience, and must-haves, then agree a fixed written scope before any work starts." },
            { icon: PenTool, title: "Design", description: "We design the structure and look — bilingual and mobile-first — and you approve it before we build." },
            { icon: Code2, title: "Build & QA", description: "We develop fast, clean, SEO-ready pages and test on real devices before launch." },
            { icon: Rocket, title: "Launch & own it", description: "We launch, hand over every account and the code, and stay available for support." },
        ],
    },
    ar: {
        eyebrow: "آلية عملنا",
        title: (s) => `كيف نبني ${s}`,
        description:
            "عملية واضحة بنطاق ثابت — بلا مفاجآت، وتعرف موقع كل خطوة بدقة في كل مرحلة.",
        cta: "ابدأ مشروعك",
        steps: [
            { icon: Compass, title: "الاكتشاف والنطاق", description: "نفهم أهدافك وجمهورك ومتطلباتك، ثم نتفق على نطاق مكتوب وثابت قبل بدء أي عمل." },
            { icon: PenTool, title: "التصميم", description: "نصمّم البنية والمظهر — بلغتين وبواجهة جوال أولاً — وتعتمده قبل أن نبني." },
            { icon: Code2, title: "البناء والاختبار", description: "نطوّر صفحات سريعة ونظيفة ومهيأة للـ SEO ونختبر على أجهزة حقيقية قبل الإطلاق." },
            { icon: Rocket, title: "الإطلاق والملكية", description: "نطلق ونسلّمك كل الحسابات والكود ونبقى متاحين للدعم." },
        ],
    },
};

export function ProcessOverview({
    serviceName,
    locale = "en",
    dir = "ltr",
    ctaHref = "/api/whatsapp",
}: {
    serviceName: string;
    locale?: "en" | "ar";
    dir?: "ltr" | "rtl";
    ctaHref?: string;
}) {
    const c = CONTENT[locale] || CONTENT.en;
    const isRTL = dir === "rtl";

    return (
        <section dir={dir} className="w-full bg-white py-14 md:py-20">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:px-8 md:grid-cols-3 md:gap-8 lg:gap-14">
                <div className={cn("flex flex-col justify-center text-center", isRTL ? "md:text-right" : "md:text-left")}>
                    <span className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">{c.eyebrow}</span>
                    <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">{c.title(serviceName)}</h2>
                    <p className="mb-6 text-base leading-relaxed text-neutral-600">{c.description}</p>
                    <Link
                        href={ctaHref}
                        className={cn(
                            "group inline-flex min-h-12 w-fit items-center justify-center gap-2 bg-[#0f172a] px-6 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0284c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0284c7]",
                            isRTL ? "mx-auto md:ml-auto md:mr-0" : "mx-auto md:mx-0"
                        )}
                    >
                        {c.cta}
                        <ArrowUpRight className={cn("h-5 w-5 transition-transform group-hover:-translate-y-0.5", isRTL ? "group-hover:-translate-x-0.5 -scale-x-100" : "group-hover:translate-x-0.5")} aria-hidden="true" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2">
                    {c.steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={i}
                                className="group relative w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_18px_50px_-20px_rgba(2,132,199,0.4)]"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-[#f4f1f8] text-[#0284c7] transition-colors duration-300 group-hover:bg-[#0284c7] group-hover:text-white">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <span className="mt-0.5 font-mono text-sm font-black tabular-nums text-sky-600/60">{String(i + 1).padStart(2, "0")}</span>
                                    <div>
                                        <h3 className="mb-1 text-lg font-bold text-[#0f172a]">{step.title}</h3>
                                        <p className="text-sm leading-relaxed text-neutral-600">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
