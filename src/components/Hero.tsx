"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 md:px-12 flex flex-col justify-center items-start lg:items-center lg:text-center z-20"
      >
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="inline-block py-1 px-3 mb-6 font-mono text-sm tracking-wider border border-primary/30 rounded-full bg-primary/10 text-primary"
        >
          CREATIVE DEVELOPER
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-[8vw] leading-[1.1] font-bold font-sans tracking-tighter mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Crafting <span className="text-primary italic">Digital</span><br />
          Experiences.
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-foreground/70 max-w-2xl font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          I build intuitive, dynamic, and future-ready web applications that elevate user engagement through modern architecture.
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="mt-12 flex gap-4"
        >
          <a 
            href="#projects" 
            className="px-8 py-4 bg-primary text-white dark:text-black font-semibold rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(13,110,253,0.3)] hover:shadow-[0_0_60px_rgba(13,110,253,0.5)]"
          >
            Explore Lab
          </a>
        </motion.div>
      </motion.div>

      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-10 opacity-30 pointer-events-none mix-blend-screen">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] border-2 border-primary/30 rounded-full blur-[2px] animate-[spin_20s_linear_infinite]"></div>
      </div>

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
