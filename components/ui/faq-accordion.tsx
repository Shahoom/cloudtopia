"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Adapted for CloudTopia from "faq-monochrome" — stripped of the full-screen
// theme-toggle / aurora chrome, rebuilt as a light, brand, prop-driven SEO FAQ.
// Keeps the plus→x accordion, smooth grid-rows expand, and a soft brand glow.
// Heading is an <h2> (the page H1 lives in the hero); questions are <h3>.
// The matching FAQPage JSON-LD is emitted server-side by the page.

export type FaqQA = { q: string; a: string };

export function FaqAccordion({
    eyebrow,
    heading,
    subheading,
    items,
    dir = "ltr",
}: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    items: FaqQA[];
    dir?: "ltr" | "rtl";
}) {
    const [open, setOpen] = useState<number>(0);
    const isRTL = dir === "rtl";

    return (
        <section dir={dir} className="w-full bg-white py-14 md:py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center md:mb-10">
                    {eyebrow && <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">{eyebrow}</p>}
                    <h2 className="text-balance text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">{heading}</h2>
                    {subheading && <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">{subheading}</p>}
                </div>

                <ul className="space-y-3">
                    {items.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <li
                                key={i}
                                className={cn(
                                    "group overflow-hidden rounded-2xl border bg-white transition-all duration-300",
                                    isOpen
                                        ? "border-sky-300 shadow-[0_14px_50px_-18px_rgba(2,132,199,0.3)]"
                                        : "border-neutral-200 hover:border-neutral-300"
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpen(isOpen ? -1 : i)}
                                    aria-expanded={isOpen}
                                    className={cn("flex w-full items-center gap-4 px-5 py-5 sm:px-6", isRTL ? "text-right" : "text-left")}
                                >
                                    <span
                                        className={cn(
                                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                                            isOpen ? "rotate-45 border-sky-300 bg-[#0284c7] text-white" : "border-neutral-200 bg-[#f4f1f8] text-[#0284c7]"
                                        )}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </span>
                                    <h3 className="flex-1 text-base font-bold leading-snug text-[#0f172a] md:text-lg">{item.q}</h3>
                                </button>
                                <div className={cn("grid transition-all duration-300 ease-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                                    <div className="overflow-hidden">
                                        <p className={cn("pb-6 text-sm leading-relaxed text-neutral-600 md:text-base", isRTL ? "pl-5 pr-[3.75rem] sm:pr-[4.75rem]" : "pr-5 pl-[3.75rem] sm:pl-[4.75rem]")}>
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
