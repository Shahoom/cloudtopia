'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const Icon = ({ className, ...rest }: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );
};

export function FeatureCard({
    title,
    description,
    icon,
    children,
    className
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}) {
    const [hovered, setHovered] = React.useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                "border border-neutral-200 group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem] rounded-2xl overflow-hidden transition-all duration-300 bg-white",
                className
            )}
        >
            <Icon className="absolute h-6 w-6 -top-3 -left-3 text-neutral-400" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-neutral-400" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 text-neutral-400" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-neutral-400" />

            {/* Static Layer */}
            <div className="relative z-10 transition-all duration-300">
                <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-300 w-full mx-auto flex items-center justify-center mb-4">
                    {icon}
                </div>
                <div className="text-center opacity-100 group-hover/canvas-card:opacity-0 transition duration-300">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">{title}</h3>
                    <p className="text-neutral-600 px-4">{description}</p>
                </div>
            </div>

            {/* Interactive Layer */}
            <div className="absolute inset-0 h-full w-full pointer-events-none">
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full w-full absolute inset-0 z-20 pointer-events-auto"
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-30 pointer-events-none">
                    <h2 className="text-white text-3xl opacity-0 group-hover/canvas-card:opacity-100 relative mt-4 font-bold group-hover/canvas-card:-translate-y-2 transition duration-300 text-center px-4">
                        {title}
                    </h2>
                    <p className="text-white/80 text-lg opacity-0 group-hover/canvas-card:opacity-100 relative mt-2 transition duration-300 text-center px-6">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
