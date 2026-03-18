"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const [isHidden, setIsHidden] = useState(false);
  const rafId = useRef<number>(0);
  const targetScale = useRef(1);
  const currentScale = useRef(1);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Direct DOM updates — no React re-renders
    const handleMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX - 12;
      pos.current.y = e.clientY - 12;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest(".hide-cursor")) {
        setIsHidden(true);
        targetScale.current = 1;
        return;
      } else {
        setIsHidden(false);
      }

      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        targetScale.current = 2.5;
      } else {
        targetScale.current = 1;
      }
    };

    // Smooth animation loop via rAF
    function tick() {
      if (cursor) {
        currentScale.current += (targetScale.current - currentScale.current) * 0.15;
        cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${currentScale.current})`;
      }
      rafId.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block will-change-transform"
      style={{
        backgroundColor: "hsl(var(--primary))",
        opacity: isHidden ? 0 : 1,
        transition: "opacity 0.2s ease",
      }}
    />
  );
}
