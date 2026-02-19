"use client"

import React, { useState, useEffect } from 'react';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export const ProfessionalConnect = () => {
    const [, setHoveredIndex] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);
    const { t, dir, locale } = useLanguage();

    useEffect(() => {
        setIsLoaded(true);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const socialPlatforms = [
        {
            name: t.contact.social.whatsappLabels.name,
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
            ),
            gradient: 'from-green-600 to-emerald-400',
            shadowColor: 'rgba(16, 185, 129, 0.5)',
            link: 'https://wa.me/905011511116',
            description: t.contact.social.whatsappLabels.desc
        },
        {
            name: t.contact.social.xLabels.name,
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
                </svg>
            ),
            gradient: 'from-slate-800 to-slate-600',
            shadowColor: 'rgba(51, 65, 85, 0.5)',
            link: 'https://x.com/thecloudtopia',
            description: t.contact.social.xLabels.desc
        },
        {
            name: t.contact.social.githubLabels.name,
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
            ),
            gradient: 'from-gray-700 to-gray-500',
            shadowColor: 'rgba(75, 85, 99, 0.5)',
            link: 'https://github.com/Shahoom',
            description: t.contact.social.githubLabels.desc
        },
        {
            name: t.contact.social.instagramLabels.name,
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
            ),
            gradient: 'from-purple-600 via-pink-600 to-orange-500',
            shadowColor: 'rgba(219, 39, 119, 0.5)',
            link: 'https://instagram.com/thecloudtopia',
            description: t.contact.social.instagramLabels.desc
        },
    ];

    return (
        <div className="py-24 relative w-full bg-transparent" dir={dir}>
            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-8">
                {/* Header Section */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-block mb-4 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                        <span className="text-sm font-medium bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                            {t.contact.social.badge}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-500 bg-clip-text text-transparent">
                            {t.contact.social.title}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed font-medium">
                        {t.contact.social.description}
                    </p>
                </div>

                {/* Social Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {socialPlatforms.map((platform, index) => (
                        <a
                            key={platform.name}
                            href={platform.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Card Container */}
                            <div className="relative bg-white/40 backdrop-blur-xl rounded-2xl p-8 border border-white/50 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/80">
                                {/* Hover Gradient Effect */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                ></div>

                                {/* Glow Effect */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle at 50% 50%, ${platform.shadowColor}, transparent 70%)`,
                                        filter: 'blur(40px)'
                                    }}
                                ></div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Icon Container */}
                                    <div className={`mb-4 inline-flex p-4 rounded-2xl bg-gradient-to-br ${platform.gradient} text-white shadow-lg transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                                        {platform.icon}
                                    </div>

                                    {/* Text */}
                                    <h3 className="text-neutral-900 font-bold text-xl mb-1 transition-colors duration-300">
                                        {platform.name}
                                    </h3>
                                    <p className="text-neutral-500 text-sm font-medium transition-colors duration-300 group-hover:text-neutral-700">
                                        {platform.description}
                                    </p>

                                    {/* Arrow Icon */}
                                    <div className="mt-6 flex items-center justify-center gap-2 text-neutral-400 group-hover:text-primary-600 transition-all duration-300">
                                        <span className="text-sm font-bold transition-all duration-300">
                                            {t.contact.social.connect}
                                        </span>
                                        <svg
                                            className={`w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
