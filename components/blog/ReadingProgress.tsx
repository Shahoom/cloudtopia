'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function ReadingProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const { dir } = useLanguage()
    const isRtl = dir === 'rtl'

    const bgGradient = 'linear-gradient(90deg, #0ea5e9, #6366f1)'
    const opacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0])

    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 h-[2.5px] z-[9999] ${isRtl ? 'origin-right' : 'origin-left'}`}
            style={{
                scaleX,
                background: bgGradient,
                opacity
            }}
        />
    )
}
