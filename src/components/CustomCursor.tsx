"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // If hovering over the SocialSidebar (or anything else with hide-cursor)
      if (target.closest(".hide-cursor")) {
        setIsHidden(true);
        setIsHovered(false);
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
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
      style={{
        backgroundColor: "hsl(var(--primary))",
        opacity: isHidden ? 0 : 1,
      }}
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        scale: isHovered ? 2.5 : 1,
      }}
      transition={{
        type: "spring",
        mass: 0.1,
        stiffness: 800,
        damping: 40,
      }}
    />
  );
}
