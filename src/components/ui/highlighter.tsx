"use client";

import type { PropsWithChildren } from "react";
import React, { useEffect, useRef } from "react";

// ─── Ref-based mouse position (no re-renders!) ──────────────────
const globalMouse = { x: 0, y: 0 };
let globalMouseListenerAttached = false;

function attachGlobalMouseListener() {
  if (globalMouseListenerAttached || typeof window === "undefined") return;
  globalMouseListenerAttached = true;
  window.addEventListener(
    "mousemove",
    (e) => {
      globalMouse.x = e.clientX;
      globalMouse.y = e.clientY;
    },
    { passive: true }
  );
}

interface HighlightGroupProps {
  children: React.ReactNode;
  className?: string;
  refresh?: boolean;
}

export const HighlightGroup: React.FC<HighlightGroupProps> = ({
  children,
  className = "",
  refresh = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const boxesRef = useRef<HTMLElement[]>([]);
  const rafId = useRef<number>(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    attachGlobalMouseListener();

    const container = containerRef.current;
    if (!container) return;

    boxesRef.current = Array.from(container.children).map(
      (el) => el as HTMLElement
    );

    const initContainer = () => {
      if (container) {
        containerSize.current.w = container.offsetWidth;
        containerSize.current.h = container.offsetHeight;
      }
    };

    initContainer();
    window.addEventListener("resize", initContainer);

    // Only track mouse when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) tick();
      },
      { threshold: 0 }
    );
    observer.observe(container);

    function tick() {
      if (!isVisibleRef.current || !container) return;

      const rect = container.getBoundingClientRect();
      const { w, h } = containerSize.current;
      const x = globalMouse.x - rect.left;
      const y = globalMouse.y - rect.top;
      const inside = x < w && x > 0 && y < h && y > 0;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
        boxesRef.current.forEach((box) => {
          const boxX =
            -(box.getBoundingClientRect().left - rect.left) + mouse.current.x;
          const boxY =
            -(box.getBoundingClientRect().top - rect.top) + mouse.current.y;
          box.style.setProperty("--mouse-x", `${boxX}px`);
          box.style.setProperty("--mouse-y", `${boxY}px`);
        });
      }

      rafId.current = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", initContainer);
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, [refresh]);

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
};

interface HighlighterItemProps {
  children: React.ReactNode;
  className?: string;
}

export const HighlighterItem: React.FC<
  PropsWithChildren<HighlighterItemProps>
> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative overflow-hidden p-px before:pointer-events-none before:absolute before:-left-48 before:-top-48 before:z-30 before:h-96 before:w-96 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-lime-500 before:opacity-0 before:blur-[100px] before:transition-opacity before:duration-500 after:absolute after:inset-0 after:z-10 after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-500  before:hover:opacity-20 after:group-hover:opacity-100 dark:before:bg-white/50  ${className}`}
    >
      {children}
    </div>
  );
};

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");
  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) => {
  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const rafId = useRef<number>(0);
  const isVisibleRef = useRef(false);
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  // Reduce particle count on mobile for better perf
  const effectiveQuantity =
    typeof window !== "undefined" && window.innerWidth < 768
      ? Math.min(quantity, 20)
      : quantity;

  useEffect(() => {
    attachGlobalMouseListener();

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }

    const container = canvasContainerRef.current;

    const resizeCanvas = () => {
      if (container && canvasRef.current && context.current) {
        circles.current.length = 0;
        canvasSize.current.w = container.offsetWidth;
        canvasSize.current.h = container.offsetHeight;
        canvasRef.current.width = canvasSize.current.w * dpr;
        canvasRef.current.height = canvasSize.current.h * dpr;
        canvasRef.current.style.width = `${canvasSize.current.w}px`;
        canvasRef.current.style.height = `${canvasSize.current.h}px`;
        context.current.scale(dpr, dpr);
      }
    };

    const circleParams = (): Circle => {
      const x = Math.floor(Math.random() * canvasSize.current.w);
      const y = Math.floor(Math.random() * canvasSize.current.h);
      return {
        x,
        y,
        translateX: 0,
        translateY: 0,
        size: Math.floor(Math.random() * 2) + 1,
        alpha: 0,
        targetAlpha: parseFloat((Math.random() * 0.3 + 0.1).toFixed(1)),
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        magnetism: 0.1 + Math.random() * 4,
      };
    };

    const rgb = hexToRgb(color);

    const drawCircle = (circle: Circle, update = false) => {
      if (context.current) {
        const { x, y, translateX, translateY, size, alpha } = circle;
        context.current.translate(translateX, translateY);
        context.current.beginPath();
        context.current.arc(x, y, size, 0, 2 * Math.PI);
        context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
        context.current.fill();
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (!update) circles.current.push(circle);
      }
    };

    const clearContext = () => {
      if (context.current) {
        context.current.clearRect(
          0,
          0,
          canvasSize.current.w,
          canvasSize.current.h
        );
      }
    };

    const drawParticles = () => {
      clearContext();
      for (let i = 0; i < effectiveQuantity; i++) {
        drawCircle(circleParams());
      }
    };

    const remapValue = (
      value: number,
      start1: number,
      end1: number,
      start2: number,
      end2: number
    ): number => {
      const remapped =
        ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
      return remapped > 0 ? remapped : 0;
    };

    const animate = () => {
      if (!isVisibleRef.current) return; // Stop loop when offscreen

      // Update mouse position from global ref (no React re-renders)
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const { w, h } = canvasSize.current;
        const mx = globalMouse.x - rect.left - w / 2;
        const my = globalMouse.y - rect.top - h / 2;
        if (mx < w / 2 && mx > -w / 2 && my < h / 2 && my > -h / 2) {
          mouse.current.x = mx;
          mouse.current.y = my;
        }
      }

      clearContext();
      circles.current.forEach((circle: Circle, i: number) => {
        const edge = [
          circle.x + circle.translateX - circle.size,
          canvasSize.current.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          canvasSize.current.h - circle.y - circle.translateY - circle.size,
        ];
        const closestEdge = edge.reduce((a, b) => Math.min(a, b));
        const remapClosestEdge = parseFloat(
          remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
        );
        if (remapClosestEdge > 1) {
          circle.alpha += 0.02;
          if (circle.alpha > circle.targetAlpha) {
            circle.alpha = circle.targetAlpha;
          }
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge;
        }
        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;
        circle.translateX +=
          (mouse.current.x / (staticity / circle.magnetism) -
            circle.translateX) /
          ease;
        circle.translateY +=
          (mouse.current.y / (staticity / circle.magnetism) -
            circle.translateY) /
          ease;

        if (
          circle.x < -circle.size ||
          circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.current.h + circle.size
        ) {
          circles.current.splice(i, 1);
          drawCircle(circleParams());
        } else {
          drawCircle(
            {
              ...circle,
              x: circle.x,
              y: circle.y,
              translateX: circle.translateX,
              translateY: circle.translateY,
              alpha: circle.alpha,
            },
            true
          );
        }
      });
      rafId.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    drawParticles();

    // IntersectionObserver: animate only when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          rafId.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );
    if (container) observer.observe(container);

    window.addEventListener("resize", () => {
      resizeCanvas();
      drawParticles();
    });

    return () => {
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};
