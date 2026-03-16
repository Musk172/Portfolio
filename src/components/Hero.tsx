"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { LocationMap } from "@/components/ui/location-map";
import { LocationTag } from "@/components/ui/location-tag";
import { cn } from "@/lib/utils";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-background pointer-events-auto"
    >
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-50 z-10",
        )}
      />

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 md:px-12 flex flex-col justify-center items-start lg:items-center lg:text-center z-20"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex w-full justify-center lg:justify-center pointer-events-auto"
        >
          <LocationTag city="Rajasthan" country="India" timezone="IST" />
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-[8vw] leading-[1.1] font-semibold font-sans tracking-tighter mb-6 pointer-events-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Crafting <span className="text-primary italic font-serif">Digital</span><br />
          Experiences.
        </motion.h1>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="mt-12 flex gap-4 pointer-events-auto"
        >
          <a 
            href="#projects" 
            className="px-8 py-4 bg-primary text-white dark:text-black font-semibold rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(13,110,253,0.3)] hover:shadow-[0_0_60px_rgba(13,110,253,0.5)] pointer-events-auto"
          >
            Start Something Great →
          </a>
        </motion.div>

      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-12 z-30 hidden lg:block"
      >
        <LocationMap
          location="Rajasthan, India"
          coordinates="27.0238° N, 74.2179° E"
        />
      </motion.div>


      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="font-mono text-xs uppercase tracking-widest mb-2 opacity-50">Scroll</span>
        <div className="w-[1px] h-12 bg-foreground/30 relative overflow-hidden">
           <motion.div 
             className="absolute top-0 left-0 w-full h-[50%] bg-primary"
             animate={{ top: ["-50%", "100%"] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
           />
        </div>
      </div>
    </section>
  );
}
