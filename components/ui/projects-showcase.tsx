import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

// Real client work, pulled from the CMS and filtered to the projects relevant to
// each website sub-service. Interactive (image zoom, lift, overlay) but a server
// component — hover is pure CSS, so no client JS and no LCP cost. Each card links
// to the internal /projects/[id] case study (good for users and internal-link SEO).

const COPY: Record<"en" | "ar", { eyebrow: string; heading: string; sub: string; view: string }> = {
    en: { eyebrow: "Our work", heading: "Projects we've delivered", sub: "Real websites we've designed, built, and launched for businesses.", view: "View project" },
    ar: { eyebrow: "أعمالنا", heading: "مشاريع نفّذناها", sub: "مواقع حقيقية صمّمناها وبنيناها وأطلقناها لشركات.", view: "عرض المشروع" },
};

function ProjectCard({ project, href, view, featured = false }: { project: Project; href: string; view: string; featured?: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "group relative flex overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_28px_70px_-30px_rgba(2,132,199,0.45)]",
                featured ? "flex-col md:flex-row" : "flex-col"
            )}
        >
            <div className={cn("relative overflow-hidden bg-neutral-100", featured ? "h-56 w-full md:h-auto md:w-1/2" : "h-52 w-full")}>
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-indigo-100" />
                )}
                {project.type && (
                    <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/85 px-3 py-1 text-xs font-black text-[#0369a1] backdrop-blur-sm">
                        {project.type}
                    </span>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f172a]/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className={cn("flex flex-1 flex-col p-6", featured && "md:justify-center md:p-8")}>
                <h3 className="text-xl font-black text-[#0f172a] transition-colors group-hover:text-[#0284c7]">{project.title}</h3>
                {project.solution && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-600">{project.solution}</p>}

                <div className="mt-5 flex items-end justify-between gap-3">
                    {project.metrics?.value ? (
                        <div>
                            <div className="text-2xl font-black text-[#0284c7]">{project.metrics.value}</div>
                            {project.metrics.label && <div className="text-xs font-semibold text-neutral-500">{project.metrics.label}</div>}
                        </div>
                    ) : (
                        <span />
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm font-black text-[#0f172a] transition-colors group-hover:text-[#0284c7]">
                        {view}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export function ProjectsShowcase({
    projects,
    locale = "en",
    dir = "ltr",
    projectHref,
    eyebrow,
    heading,
    sub,
}: {
    projects: Project[];
    locale?: "en" | "ar";
    dir?: "ltr" | "rtl";
    /** Builds the internal case-study href for a project id. */
    projectHref: (id: string) => string;
    /** Optional copy overrides (e.g. "applications" instead of "websites"). */
    eyebrow?: string;
    heading?: string;
    sub?: string;
}) {
    if (!projects.length) return null;
    const base = COPY[locale] || COPY.en;
    const c = { eyebrow: eyebrow ?? base.eyebrow, heading: heading ?? base.heading, sub: sub ?? base.sub, view: base.view };
    const single = projects.length === 1;

    return (
        <section dir={dir} className="w-full bg-[#f4f1f8] py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">{c.eyebrow}</p>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">{c.heading}</h2>
                    <p className="mt-4 text-base text-neutral-600">{c.sub}</p>
                </div>

                <div className={cn("grid gap-5", single ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3")}>
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} href={projectHref(project.id)} view={c.view} featured={single} />
                    ))}
                </div>
            </div>
        </section>
    );
}
