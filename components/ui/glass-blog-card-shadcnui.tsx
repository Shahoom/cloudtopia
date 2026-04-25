import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Clock, User } from "lucide-react";
import Link from "next/link";

interface GlassBlogCardProps {
    title?: string;
    excerpt?: string;
    image?: string;
    imageAlt?: string;
    author?: {
        name: string;
        avatar: string;
    };
    date?: string;
    readTime?: string;
    tags?: string[];
    className?: string;
    href?: string;
    readMoreText?: string;
    isRtl?: boolean;
}

export function GlassBlogCard({
    title = "Untitled Post",
    excerpt = "",
    image,
    imageAlt,
    author,
    date,
    readTime,
    tags = [],
    className,
    href = "#",
    readMoreText = "Read more",
    isRtl = false,
}: GlassBlogCardProps) {
    const Arrow = isRtl ? ArrowLeft : ArrowRight

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn("h-full", className)}
        >
            <Link href={href} className="group flex flex-col h-full rounded-3xl bg-white border border-slate-100 hover:border-sky-200/80 overflow-hidden shadow-sm hover:shadow-[0_12px_40px_rgba(14,165,233,0.10)] transition-all duration-400">
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 shrink-0">
                    {image ? (
                        <img
                            src={image}
                            alt={imageAlt || title}
                            className="h-full w-full object-cover transition-transform duration-600 group-hover:scale-[1.06]"
                        />
                    ) : (
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #e0e7ff, #f4f1f8)' }} />
                    )}
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                    {/* Tags overlay bottom-left */}
                    {tags.length > 0 && (
                        <div className={`absolute bottom-3 ${isRtl ? 'right-3' : 'left-3'} flex flex-wrap gap-1.5`}>
                            {tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white/90 bg-black/30 backdrop-blur-sm border border-white/10"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 gap-3" dir={isRtl ? 'rtl' : 'ltr'}>
                    <h3 className={`text-[17px] font-bold leading-snug text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 ${isRtl ? "font-['Scheherazade_New'] text-[19px]" : "font-['Poppins']"}`}>
                        {title}
                    </h3>
                    <p className={`text-[14px] text-slate-500 line-clamp-2 leading-relaxed ${isRtl ? "font-['Noto_Naskh_Arabic']" : "font-['Inter']"}`}>
                        {excerpt}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                            {author && (
                                <User className="w-4 h-4 text-indigo-500 shrink-0" />
                            )}
                            <div className="min-w-0">
                                {author && <p className="text-[12px] font-semibold text-slate-700 truncate">{author.name}</p>}
                                {date && <p className="text-[11px] text-slate-400 truncate">{date}</p>}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            {readTime && (
                                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                                    <Clock className="w-3 h-3" />
                                    {readTime}
                                </span>
                            )}
                            <span className="flex items-center gap-1 text-[12px] font-semibold text-sky-600 group-hover:text-indigo-600 transition-colors">
                                {readMoreText}
                                <Arrow className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
