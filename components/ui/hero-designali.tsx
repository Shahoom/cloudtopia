"use client";

import { cn } from "@/lib/utils";
import { ReactTyped } from "react-typed";

// Wave animation class
// @ts-ignore
function WavePhase(e) {
  // @ts-ignore
  this.init(e || {});
}
WavePhase.prototype = {
  // @ts-ignore
  init: function (e) {
    // @ts-ignore
    this.phase = e.phase || 0;
    // @ts-ignore
    this.offset = e.offset || 0;
    // @ts-ignore
    this.frequency = e.frequency || 0.001;
    // @ts-ignore
    this.amplitude = e.amplitude || 1;
  },
  update: function () {
    // @ts-ignore
    this.phase += this.frequency;
    // @ts-ignore
    return this.offset + Math.sin(this.phase) * this.amplitude;
  },
};

// Configuration
const E = {
  debug: true,
  friction: 0.5,
  trails: 80,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
};

type TrailNode = { x: number; y: number; vx: number; vy: number }
type TrailLine = { spring: number; friction: number; nodes: TrailNode[] }

/**
 * Mouse-trail canvas with instance-owned state: context, lines, pointer
 * position, and the animation frame all live inside this call, and the
 * returned cleanup cancels the frame and removes every listener — so repeated
 * navigation cannot multiply listeners or frames.
 */
const renderCanvas = function (
  canvas: HTMLCanvasElement,
  isActive: () => boolean = () => true,
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => undefined;

  const pos = { x: 0, y: 0 };
  let lines: TrailLine[] = [];
  let frameId: number | null = null;
  let running = true;
  const hue = new (WavePhase as any)({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });

  const makeLine = (spring: number): TrailLine => ({
    spring: spring + 0.1 * Math.random() - 0.05,
    friction: E.friction + 0.01 * Math.random() - 0.005,
    nodes: Array.from({ length: E.size }, () => ({ x: pos.x, y: pos.y, vx: 0, vy: 0 })),
  });

  const initLines = () => {
    lines = [];
    for (let e = 0; e < E.trails; e++) {
      lines.push(makeLine(0.45 + (e / E.trails) * 0.025));
    }
  };

  const updateLine = (line: TrailLine) => {
    let e = line.spring;
    let t = line.nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;
    for (let i = 0, a = line.nodes.length; i < a; i++) {
      t = line.nodes[i];
      if (i > 0) {
        const n = line.nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * E.dampening;
        t.vy += n.vy * E.dampening;
      }
      t.vx *= line.friction;
      t.vy *= line.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= E.tension;
    }
  };

  const drawLine = (line: TrailLine) => {
    let e: TrailNode;
    let t: TrailNode;
    let n = line.nodes[0].x;
    let i = line.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    for (let a = 1, o = line.nodes.length - 2; a < o; a++) {
      e = line.nodes[a];
      t = line.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    e = line.nodes[line.nodes.length - 2];
    t = line.nodes[line.nodes.length - 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  };

  const render = () => {
    frameId = null;
    if (!running || !isActive()) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "hsla(" + Math.round(hue.update()) + ",100%,50%,0.025)";
    ctx.lineWidth = 10;
    for (let t = 0; t < E.trails; t++) {
      const line = lines[t];
      updateLine(line);
      drawLine(line);
    }
    frameId = window.requestAnimationFrame(render);
  };

  const startRender = () => {
    if (frameId === null && running) {
      frameId = window.requestAnimationFrame(render);
    }
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    } else {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }
    if (lines.length === 0) initLines();
    startRender();
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    }
  };

  const resizeCanvas = () => {
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
  };

  const handleFocus = () => startRender();
  const handleBlur = () => {
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }
  };

  document.addEventListener("mousemove", handleMove);
  document.addEventListener("touchmove", handleMove);
  document.addEventListener("touchstart", handleTouchStart);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("focus", handleFocus);
  window.addEventListener("blur", handleBlur);
  resizeCanvas();

  return () => {
    running = false;
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("touchstart", handleTouchStart);
    document.body.removeEventListener("orientationchange", resizeCanvas);
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("focus", handleFocus);
    window.removeEventListener("blur", handleBlur);
  };
};

// TypeWriter component
interface TypeWriterProps {
  strings: string[];
}

const TypeWriter = ({ strings }: TypeWriterProps) => {
  return (
    <ReactTyped
      loop
      typeSpeed={80}
      backSpeed={20}
      strings={strings}
      smartBackspace
      backDelay={1000}
      loopCount={0}
      showCursor
      cursorChar="|"
    />
  );
};

// ShineBorder component
type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: React.ReactNode;
}

function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative grid h-full w-full place-items-center rounded-3xl bg-lavender p-3 text-eerie dark:bg-eerie dark:text-white",
        className
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--shine-pulse-duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${color instanceof Array ? color.join(",") : color},transparent,transparent)`,
          } as React.CSSProperties
        }
        className={`before:bg-shine-size before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-3xl before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:![mask-composite:exclude] before:[mask:--mask-linear-gradient] motion-safe:before:animate-[shine-pulse_var(--shine-pulse-duration)_infinite_linear]`}
      ></div>
      {children}
    </div>
  );
}

export { renderCanvas, TypeWriter, ShineBorder };
