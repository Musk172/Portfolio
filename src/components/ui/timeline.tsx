"use client";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ 
  data,
  title = "Changelog from my journey",
  description = "A specialized focus on high-performance digital products and automated architectures."
}: { 
  data: TimelineEntry[],
  title?: string,
  description?: string
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Significantly faster spring (higher stiffness, lower mass/damping ratio)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 1,
    restDelta: 0.001
  });

  const heightTransform = useTransform(smoothProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-background font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-5xl mb-4 text-foreground max-w-4xl font-bold tracking-tight leading-tight">
            {title}
          </h2>
          <div className="h-1 w-16 bg-primary mb-6 rounded-full" />
          <p className="text-foreground/50 text-base md:text-lg max-w-2xl leading-relaxed font-medium">
            {description}
          </p>
        </motion.div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-40 md:pb-60">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-16 md:pt-32 md:gap-10 group"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background flex items-center justify-center border-2 border-border/50 group-hover:border-primary/50 transition-colors duration-500">
                <div className="h-3 w-3 rounded-full bg-surface border border-border group-hover:bg-primary transition-colors duration-500" />
              </div>
              <motion.h3 
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-black text-foreground/5 uppercase tracking-tighter group-hover:text-primary/10 transition-colors duration-700"
              >
                {item.title}
              </motion.h3>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-20 pr-4 md:pl-4 w-full"
            >
              <h3 className="md:hidden block text-3xl mb-4 text-left font-black text-foreground/5 uppercase tracking-tighter">
                {item.title}
              </h3>
              <div className="rounded-2xl border border-border/40 bg-surface/5 backdrop-blur-[2px] p-5 md:p-8 hover:bg-surface/10 transition-colors duration-500">
                {item.content}
              </div>
            </motion.div>
          </div>
        ))}
        
        {/* Progress Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-border/20 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full"
          />
          
          {/* Traveling Glow Point */}
          <motion.div
            style={{
              top: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute left-[-3px] w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_hsl(var(--primary))]"
          />
        </div>
      </div>
    </div>
  );
};
