'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

interface StarsCanvasProps {
    transparent?: boolean;       // Background transparency
    maxStars?: number;           // Total number of stars
    hue?: number;                // Color hue for the stars
    brightness?: number;         // Overall star brightness (0–1)
    speedMultiplier?: number;    // Global animation speed multiplier
    twinkleIntensity?: number;   // How often stars twinkle
    className?: string;          // Custom class for the canvas
    paused?: boolean;            // Pause animation toggle
    position?: 'fixed' | 'absolute'; // Positioning mode
}

export function StarsCanvas({
    transparent = false,
    maxStars = 400,              // Reduced default for better performance
    hue = 217,
    brightness = 0.8,            // Adjusted default
    speedMultiplier = 0.5,       // Slower default for smoother animation
    twinkleIntensity = 30,       // Less frequent twinkle
    className = '',
    paused = false,
    position = 'absolute',       // Default to absolute for section-scoped use
}: StarsCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const animationRef = useRef<number>();
    const starsRef = useRef<Array<{
        orbitRadius: number;
        radius: number;
        orbitX: number;
        orbitY: number;
        timePassed: number;
        speed: number;
        alpha: number;
    }>>([]);
    const [isVisible, setIsVisible] = useState(false);

    // Debounced resize handler
    const resizeTimeoutRef = useRef<NodeJS.Timeout>();

    // Intersection Observer for lazy loading
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.05,
                rootMargin: '100px' // Start loading earlier
            }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // Only initialize when visible (lazy loading)
        if (!isVisible) return;

        const ctx = canvas.getContext('2d', { alpha: transparent })!;

        // Efficient dimension tracking without forced reflow
        const updateDimensions = () => {
            const rect = container.getBoundingClientRect();
            // Lower DPR for stars to reduce main-thread burden
            const dpr = 0.75;
            const newW = Math.floor(rect.width * dpr);
            const newH = Math.floor(rect.height * dpr);

            if (canvas.width !== newW || canvas.height !== newH) {
                canvas.width = newW;
                canvas.height = newH;
            }
            return { w: rect.width, h: rect.height };
        };

        let { w, h } = updateDimensions();

        // Smaller gradient texture for better performance
        const canvas2 = document.createElement('canvas');
        const ctx2 = canvas2.getContext('2d')!;
        canvas2.width = 64;  // Reduced from 100
        canvas2.height = 64;
        const half = canvas2.width / 2;
        const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#fff');
        gradient2.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
        gradient2.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
        gradient2.addColorStop(1, 'transparent');
        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

        // Utility functions
        const random = (min: number, max?: number) => {
            if (max === undefined) {
                max = min;
                min = 0;
            }
            if (min > max) [min, max] = [max, min];
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const maxOrbit = (x: number, y: number) => {
            const max = Math.max(x, y);
            return Math.round(Math.sqrt(max * max + max * max)) / 2;
        };

        // Initialize stars only once (using ref to persist across effect re-runs)
        if (starsRef.current.length === 0) {
            const starCount = w < 768 ? 50 : maxStars; // Drastically reduced for mobile
            for (let i = 0; i < starCount; i++) {
                const orbitRadius = random(maxOrbit(w, h));
                starsRef.current.push({
                    orbitRadius,
                    radius: random(60, orbitRadius) / 12,
                    orbitX: w / 2,
                    orbitY: h / 2,
                    timePassed: random(0, maxStars),
                    speed: (random(orbitRadius) / 50000) * speedMultiplier,
                    alpha: (random(2, 10) / 10) * brightness,
                });
            }
        }

        const stars = starsRef.current;

        // Optimized animation loop
        let lastTime = 0;
        const targetFPS = 24;
        const frameInterval = 1000 / targetFPS;

        const animate = (currentTime: number) => {
            if (paused || !isVisible) {
                animationRef.current = undefined;
                return;
            }

            const deltaTime = currentTime - lastTime;
            if (deltaTime < frameInterval) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }
            lastTime = currentTime - (deltaTime % frameInterval);

            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = transparent ? 'hsla(217, 64%, 6%, 0)' : 'hsla(217, 64%, 6%, 1)';
            ctx.fillRect(0, 0, w, h);

            ctx.globalCompositeOperation = 'lighter';

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];
                const x = Math.sin(star.timePassed) * star.orbitRadius + star.orbitX;
                const y = Math.cos(star.timePassed) * star.orbitRadius + star.orbitY;

                // Less frequent twinkle check
                if (Math.random() * twinkleIntensity < 1) {
                    star.alpha = Math.max(0, star.alpha - 0.05);
                } else if (Math.random() * twinkleIntensity < 2) {
                    star.alpha = Math.min(1, star.alpha + 0.05);
                }

                ctx.globalAlpha = star.alpha;
                ctx.drawImage(canvas2, x - star.radius / 2, y - star.radius / 2, star.radius, star.radius);
                star.timePassed += star.speed;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        // Debounced resize handling
        const handleResize = () => {
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            resizeTimeoutRef.current = setTimeout(() => {
                const dims = updateDimensions();
                w = dims.w;
                h = dims.h;
                // Update star positions for new dimensions
                stars.forEach(star => {
                    star.orbitX = w / 2;
                    star.orbitY = h / 2;
                });
            }, 150);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [transparent, maxStars, hue, brightness, speedMultiplier, twinkleIntensity, paused, isVisible, position]);

    return (
        <div ref={containerRef} className={`${position} inset-0 w-full h-full ${className}`}>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: 'block' }}
            />
        </div>
    );
}
