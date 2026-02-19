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

// Node class for line points
function Node() {
  // @ts-ignore
  this.x = 0;
  // @ts-ignore
  this.y = 0;
  // @ts-ignore
  this.vy = 0;
  // @ts-ignore
  this.vx = 0;
}

// Configuration
const E = {
  debug: true,
  friction: 0.5,
  trails: 80,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
};

// Global state
let ctx: CanvasRenderingContext2D | null = null;
let f: any = null;
let pos = { x: 0, y: 0 };
let lines: any[] = [];

// @ts-ignore
function Line(e) {
  // @ts-ignore
  this.init(e || {});
}

Line.prototype = {
  // @ts-ignore
  init: function (e) {
    // @ts-ignore
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    // @ts-ignore
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    // @ts-ignore
    this.nodes = [];
    for (let i = 0; i < E.size; i++) {
      // @ts-ignore
      const t = new Node();
      // @ts-ignore
      t.x = pos.x;
      // @ts-ignore
      t.y = pos.y;
      // @ts-ignore
      this.nodes.push(t);
    }
  },
  update: function () {
    // @ts-ignore
    let e = this.spring,
      // @ts-ignore
      t = this.nodes[0];
    // @ts-ignore
    t.vx += (pos.x - t.x) * e;
    // @ts-ignore
    t.vy += (pos.y - t.y) * e;
    // @ts-ignore
    for (let i = 0, a = this.nodes.length; i < a; i++) {
      // @ts-ignore
      t = this.nodes[i];
      if (i > 0) {
        // @ts-ignore
        const n = this.nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * E.dampening;
        t.vy += n.vy * E.dampening;
      }
      // @ts-ignore
      t.vx *= this.friction;
      // @ts-ignore
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= E.tension;
    }
  },
  draw: function () {
    if (!ctx) return;
    let e,
      t,
      // @ts-ignore
      n = this.nodes[0].x,
      // @ts-ignore
      i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    // @ts-ignore
    for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
      // @ts-ignore
      e = this.nodes[a];
      // @ts-ignore
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    // @ts-ignore
    e = this.nodes[this.nodes.length - 2];
    // @ts-ignore
    t = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  },
};

function initLines() {
  lines = [];
  for (let e = 0; e < E.trails; e++) {
    // @ts-ignore
    lines.push(new Line({ spring: 0.45 + (e / E.trails) * 0.025 }));
  }
}

function onMousemove(e: MouseEvent | TouchEvent) {
  function handleMove(e: MouseEvent | TouchEvent) {
    if ("touches" in e) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    } else {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }
    e.preventDefault();
  }

  function handleTouchStart(e: TouchEvent) {
    if (e.touches.length === 1) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    }
  }

  document.removeEventListener("mousemove", onMousemove as any);
  document.removeEventListener("touchstart", onMousemove as any);
  document.addEventListener("mousemove", handleMove as any);
  document.addEventListener("touchmove", handleMove as any);
  document.addEventListener("touchstart", handleTouchStart as any);
  handleMove(e);
  initLines();
  render();
}

function render() {
  if (!ctx || !(ctx as any).running) return;
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",100%,50%,0.025)";
  ctx.lineWidth = 10;
  for (let t = 0; t < E.trails; t++) {
    const e = lines[t];
    e.update();
    e.draw();
  }
  (ctx as any).frame++;
  window.requestAnimationFrame(render);
}

function resizeCanvas() {
  if (!ctx) return;
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

const renderCanvas = function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) return;
  ctx = canvas.getContext("2d");
  if (!ctx) return;
  (ctx as any).running = true;
  (ctx as any).frame = 1;
  f = new (WavePhase as any)({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  document.addEventListener("mousemove", onMousemove as any);
  document.addEventListener("touchstart", onMousemove as any);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("focus", () => {
    if (ctx && !(ctx as any).running) {
      (ctx as any).running = true;
      render();
    }
  });
  window.addEventListener("blur", () => {
    if (ctx) {
      (ctx as any).running = true;
    }
  });
  resizeCanvas();
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
        "relative grid h-full w-full place-items-center rounded-3xl bg-lavender p-3 text-black dark:bg-black dark:text-white",
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
