'use client'

import { cn } from "@/lib/utils";
import { useState } from "react";
import { MoveRight, Star } from "lucide-react";

interface BlogPost {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    href: string;
    views: number;
    readTime?: number;
    rating?: number;
    className?: string;
}

interface GridSectionProps {
    title: string;
    description: string;
    backgroundLabel?: string;
    backgroundPosition?: "left" | "right";
    posts?: BlogPost[];
    className?: string;
    onPostClick?: (post: BlogPost) => void;
}

export const Component = ({
    title,
    description,
    backgroundLabel,
    backgroundPosition = "left",
    posts = [],
    className,
    onPostClick,
}: GridSectionProps) => {

    return (
        <section className={cn(
            "container relative my-20 py-10 mx-auto px-4 z-10",
            className
        )}>
            <h1 className="text-center text-4xl font-semibold capitalize !leading-[1.4] md:text-5xl lg:text-6xl mb-2 text-[#0f172a] font-['Poppins']">
                {title}
            </h1>

            {backgroundLabel && (
                <span
                    className={cn(
                        "absolute -top-10 -z-50 select-none text-[180px] font-extrabold leading-[1] md:text-[250px] lg:text-[400px] text-black/[0.02]",
                        backgroundPosition === "left" ? "-left-[18%]" : "-right-[28%]"
                    )}
                >
                    {backgroundLabel}
                </span>
            )}

            <p className="mx-auto max-w-[800px] text-center text-xl !leading-[2] text-[var(--blog-text-muted)] md:text-2xl mb-12 font-['Inter']">
                {description}
            </p>

            <div className="grid h-auto grid-cols-1 gap-5 md:h-[650px] md:grid-cols-2 lg:grid-cols-[1fr_0.5fr] max-w-7xl mx-auto">
                {posts.map((post, index) => {
                    const {
                        id,
                        title: postTitle,
                        category,
                        imageUrl,
                        views,
                        readTime,
                        rating = 4,
                        className: postClassName
                    } = post;

                    const isPrimary = index === 0;

                    return (
                        <div
                            key={id || index}
                            style={{ backgroundImage: `url(${imageUrl})` }}
                            className={cn(
                                "group relative row-span-1 flex size-full cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-cover bg-center bg-no-repeat p-5 text-white max-md:h-[300px] transition-all duration-300 hover:scale-[0.98] hover:rotate-[0.3deg] shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(14,165,233,0.2)]",
                                isPrimary && "col-span-1 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-1",
                                postClassName
                            )}
                            onClick={() => onPostClick?.(post)}
                        >
                            <div className="absolute inset-0 -z-0 h-[130%] w-full bg-gradient-to-t from-black/80 to-transparent transition-all duration-500 group-hover:h-full" />

                            <article className="relative z-0 flex items-end">
                                <div className="flex flex-1 flex-col gap-3 pr-4">
                                    <h1 className="text-3xl font-semibold md:text-4xl leading-tight font-['Poppins']">
                                        {postTitle}
                                    </h1>
                                    <div className="flex flex-col gap-3">
                                        <span className="text-sm font-semibold tracking-wider uppercase py-0.5 px-3 rounded-md bg-[var(--blog-sky)] text-white w-fit shadow-md">
                                            {category}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-0.5">
                                                {Array.from({ length: 5 }).map((_, idx) => (
                                                    <Star
                                                        width={16}
                                                        height={16}
                                                        key={idx}
                                                        stroke={idx < rating ? "#38bdf8" : "rgba(255,255,255,0.4)"}
                                                        fill={idx < rating ? "#38bdf8" : "rgba(255,255,255,0.1)"}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm font-medium text-white/80">
                                                ({views} Views)
                                            </span>
                                        </div>
                                        {readTime && (
                                            <div className="text-sm font-semibold text-white/90">
                                                {readTime} min read
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <MoveRight
                                    className="transition-all duration-300 group-hover:translate-x-2 shrink-0 bg-white/20 p-2 rounded-full backdrop-blur-sm"
                                    color="white"
                                    width={40}
                                    height={40}
                                    strokeWidth={1.5}
                                />
                            </article>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
