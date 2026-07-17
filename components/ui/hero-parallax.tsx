"use client";
import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
    products,
    title,
    description,
    isRTL = false,
    headingLevel = 'h1',
}: {
    headingLevel?: 'h1' | 'p';
    products: {
        title: string;
        link?: string;
        thumbnail: string;
    }[];
    title?: string;
    description?: string;
    isRTL?: boolean;
}) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    // Invert translation direction for RTL to maintain correct parallax effect
    const translateMultiplier = isRTL ? -1 : 1;

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1000 * translateMultiplier]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -1000 * translateMultiplier]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], isRTL ? [-20, 0] : [20, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-400, 300]),
        springConfig
    );
    return (
        <div
            ref={ref}
            className="h-[120vh] md:h-[180vh] py-10 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
        >
            <Header title={title} description={description} isRTL={isRTL} headingLevel={headingLevel} />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className=""
            >
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                    {firstRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row mb-20 space-x-20">
                    {secondRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                    {thirdRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = ({ title, description, isRTL = false, headingLevel = 'h1' }: { title?: string; description?: string; isRTL?: boolean; headingLevel?: 'h1' | 'p' }) => {
    const MotionHeading = headingLevel === 'p' ? motion.p : motion.h1
    return (
        <div className={`max-w-7xl relative mx-auto py-10 md:py-20 px-4 w-full left-0 top-0 ${isRTL ? 'text-right' : 'text-left'}`}>
            <MotionHeading
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 leading-tight"
            >
                {title || (
                    <>
                        The Ultimate <br />development studio
                    </>
                )}
            </MotionHeading>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className={`max-w-2xl text-lg md:text-xl mt-4 md:mt-8 text-slate-700 leading-relaxed ${isRTL ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}
            >
                {description || "We build beautiful products with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing products."}
            </motion.p>
        </div>
    );
};

export const ProductCard = ({
    product,
    translate,
}: {
    product: {
        title: string;
        link?: string;
        thumbnail: string;
    };
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            key={product.title}
            className="group/product h-80 w-[20rem] md:h-96 md:w-[30rem] relative flex-shrink-0 transition-shadow duration-300 hover:shadow-2xl rounded-2xl overflow-hidden"
        >
            <Image
                src={product.thumbnail}
                height="600"
                width="600"
                className="object-cover object-left-top absolute h-full w-full inset-0"
                alt={product.title}
            />
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-40 bg-slate-900 transition-opacity duration-300 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/product:opacity-100 transition-all duration-300 translate-y-2 group-hover/product:translate-y-0 text-left">
                <h2 className="text-white text-lg font-bold drop-shadow-md">
                    {product.title}
                </h2>
            </div>
        </motion.div>
    );
};
