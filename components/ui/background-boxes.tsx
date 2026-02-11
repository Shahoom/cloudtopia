"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
    // Increased grid size for complete desktop coverage
    const rows = new Array(150).fill(1);
    const cols = new Array(100).fill(1);

    // Using direct color values instead of CSS variables
    const colors = [
        "rgb(125 211 252)", // sky-300
        "rgb(249 168 212)", // pink-300
        "rgb(134 239 172)", // green-300
        "rgb(253 224 71)",  // yellow-300
        "rgb(252 165 165)", // red-300
        "rgb(216 180 254)", // purple-300
        "rgb(147 197 253)", // blue-300
        "rgb(165 180 252)", // indigo-300
        "rgb(196 181 253)", // violet-300
    ];

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div
            style={{
                transform: `translate(-50%,-50%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
            }}
            className={cn(
                "absolute left-1/2 top-1/2 flex w-[400%] h-[400%] z-0 items-center justify-center",
                className
            )}
            dir="ltr"
            {...rest}
        >
            {rows.map((_, i) => (
                <motion.div
                    key={`row` + i}
                    className="w-16 h-full border-l border-neutral-400/30 relative"
                >
                    {cols.map((_, j) => (
                        <motion.div
                            whileHover={{
                                backgroundColor: getRandomColor(),
                                transition: { duration: 0 },
                            }}
                            animate={{
                                transition: { duration: 2 },
                            }}
                            key={`col` + j}
                            className="w-16 h-8 border-r border-t border-neutral-400/30 relative"
                        >
                            {j % 2 === 0 && i % 2 === 0 ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="absolute h-6 w-10 -top-[14px] -left-[22px] text-neutral-400/20 stroke-[1px] pointer-events-none"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m6-6H6"
                                    />
                                </svg>
                            ) : null}
                        </motion.div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

export const Boxes = React.memo(BoxesCore);
