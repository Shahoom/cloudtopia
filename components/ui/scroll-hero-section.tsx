'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Theme = 'system' | 'light' | 'dark';

export type ScrollHeroSectionProps = {
  /** Words that cycle */
  items?: string[];
  /** Prefix text before the cycling words */
  prefixText?: string;
  /** UI theme */
  theme?: Theme;
  /** Enable view-timeline animations if supported */
  animate?: boolean;
  /** Accent hue (0–359) */
  hue?: number;
  /** Where the highlight band starts (vh) */
  startVh?: number;
  /** RTL mode */
  isRTL?: boolean;
  /** Custom class name */
  className?: string;
};

function ScrollHeroSection({
  items = ['design.', 'develop.', 'launch.', 'grow.'],
  prefixText = 'We',
  theme = 'light',
  animate = true,
  hue = 220,
  startVh = 35,
  isRTL = false,
  className,
}: ScrollHeroSectionProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile: cycle through words automatically
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [isMobile, items.length]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--scroll-hue', String(hue));
    root.style.setProperty('--scroll-start', `${startVh}vh`);
    
    return () => {
      root.style.removeProperty('--scroll-hue');
      root.style.removeProperty('--scroll-start');
    };
  }, [hue, startVh]);

  const accentColor = `hsl(${hue} 80% 50%)`;

  // Don't render until we know if it's mobile or not
  if (isMobile === null) {
    return (
      <div className="min-h-[40vh] bg-slate-50" />
    );
  }

  return (
    <div
      className={cn("scroll-hero-container", className)}
      style={{
        ['--scroll-count' as string]: items.length,
        ['--scroll-accent' as string]: accentColor,
      } as React.CSSProperties}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Desktop Version */}
      {!isMobile && (
        <header className="scroll-hero-header">
          <section className="scroll-hero-content">
            <h2 className="sr-only">
              <span>{prefixText}</span>
              <span>{items[items.length - 1]}</span>
            </h2>

            {/* Visible prefix */}
            <span className="scroll-hero-prefix" aria-hidden="true">
              {prefixText}
            </span>

            {/* Visible cycling words */}
            <ul aria-hidden="true" className="scroll-hero-list">
              {items.map((word, i) => (
                <li key={i} style={{ ['--i' as string]: i } as React.CSSProperties}>
                  {word}
                </li>
              ))}
            </ul>
          </section>
        </header>
      )}

      {/* Mobile Version */}
      {isMobile && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] py-8 px-4">
          <h2 className="sr-only">
            <span>{prefixText}</span>
            <span>{items[items.length - 1]}</span>
          </h2>
          
          <div className="text-center" aria-hidden="true">
            <span className="block text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
              {prefixText}
            </span>
            
            <div className="space-y-1">
              {items.map((word, i) => (
                <motion.div
                  key={i}
                  className="text-2xl sm:text-3xl font-bold"
                  animate={{
                    color: i === activeIndex ? accentColor : 'rgba(30, 41, 59, 0.3)',
                    scale: i === activeIndex ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {word}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scroll-hero-container {
          --scroll-start: 25vh;
          --scroll-hue: 220;
          width: 100%;
          position: relative;
          background: #f8fafc;
          padding-top: 2rem;
        }

        .scroll-hero-header {
          position: sticky;
          top: calc((var(--scroll-count) - 1) * -1lh);
          line-height: 1.2;
          display: flex;
          align-items: start;
          width: 100%;
          margin-bottom: 0;
          padding-bottom: 1rem;
          font-size: clamp(2rem, 7vw, 5rem);
        }

        .scroll-hero-content {
          display: flex;
          width: 100%;
          align-items: start;
          justify-content: center;
          padding-top: calc(var(--scroll-start) - 0.5lh);
          gap: 0.3em;
        }

        .scroll-hero-prefix {
          position: sticky;
          top: calc(var(--scroll-start) - 0.5lh);
          font-weight: 700;
          color: #1e293b;
        }

        .scroll-hero-list {
          font-weight: 700;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .scroll-hero-list li {
          --dimmed: color-mix(in oklch, #1e293b, transparent 70%);
          background: linear-gradient(
            180deg,
            var(--dimmed) 0 calc(var(--scroll-start) - 0.5lh),
            var(--scroll-accent) calc(var(--scroll-start) - 0.55lh) calc(var(--scroll-start) + 0.55lh),
            var(--dimmed) calc(var(--scroll-start) + 0.5lh)
          );
          background-attachment: fixed;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }
      `}</style>
    </div>
  );
}

export { ScrollHeroSection };
