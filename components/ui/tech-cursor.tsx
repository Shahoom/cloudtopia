"use client";
import React, { useEffect, useRef } from "react";

interface TechImage {
  name: string;
  src: string;
  image: HTMLImageElement;
}

interface Particle {
  x: number;
  y: number;
  alpha: number;
  image: HTMLImageElement;
  size: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const icons: { name: string; src: string }[] = [
  {
    name: "JavaScript",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012752/js_nocitj.png",
  },
  {
    name: "TypeScript",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012632/ts_elsqw8.png",
  },
  {
    name: "React",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012941/react_ogt6ny.svg",
  },
  {
    name: "Next.js",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012973/next_hrodnb.svg",
  },
  {
    name: "HTML",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012812/html_xbcdkj.png",
  },
  {
    name: "CSS",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012862/css_1_irojyc.png",
  },
];

const TechCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const techImagesRef = useRef<TechImage[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // The frame ID and mounted flag live in the effect scope so the cleanup
    // below can always cancel the loop, even while images are still loading.
    let frameId: number | null = null;
    let mounted = true;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const particles = particlesRef.current;

    const animate = () => {
      frameId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }
      // Idle when nothing is on screen; onMove restarts the loop.
      if (particles.length > 0) {
        frameId = requestAnimationFrame(animate);
      }
    };

    let frameCount = 0;

    const onMove = (e: MouseEvent) => {
      if (techImagesRef.current.length === 0) return;

      // Balanced spawn rate (every 3rd move)
      frameCount++;
      if (frameCount % 3 !== 0) return;

      const randomIcon =
        techImagesRef.current[
        Math.floor(Math.random() * techImagesRef.current.length)
        ];

      const size = 22 + Math.random() * 8;

      const particle: Particle = {
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
        image: randomIcon.image,
        size,
        update() {
          this.y -= 0.4;  // Slightly slower upward movement
          this.alpha -= 0.01;  // Slightly slower fade out
        },
        draw(ctx: CanvasRenderingContext2D) {
          ctx.globalAlpha = this.alpha;
          ctx.drawImage(
            this.image,
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size,
          );
          ctx.globalAlpha = 1;
        },
      };

      particles.push(particle);
      if (frameId === null) {
        frameId = requestAnimationFrame(animate);
      }
    };

    Promise.all(
      icons.map(({ name, src }) => {
        return new Promise<TechImage>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve({ name, src, image: img });
        });
      }),
    ).then((images) => {
      if (!mounted) return;
      techImagesRef.current = images;
    });

    window.addEventListener("mousemove", onMove);
    return () => {
      mounted = false;
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default TechCursor;
