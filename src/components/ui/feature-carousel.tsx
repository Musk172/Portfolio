"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Cpu,
  Shield,
  Smartphone,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  id: string;
  label: string;
  icon: React.ElementType;
  image: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    id: "saas",
    label: "SaaS Platform",
    icon: LayoutGrid,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    description: "Built a scalable multi-tenant platform for enterprise resource planning.",
  },
  {
    id: "ai",
    label: "AI Automation",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200",
    description: "Deep learning models integrated into real-time workflow automations.",
  },
  {
    id: "mobile",
    label: "Mobile Hub",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
    description: "High-performance cross-platform application with native feel.",
  },
  {
    id: "growth",
    label: "Analytics Engine",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=1200",
    description: "Processing millions of data points for predictive user behavior analysis.",
  },
  {
    id: "security",
    label: "FinTech Security",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    description: "Implementation of bank-grade encryption and zero-knowledge protocols.",
  },
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 60;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 md:py-24 px-4 md:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3.5rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-border/40 bg-surface/5 backdrop-blur-sm">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-[35%] min-h-[300px] md:min-h-[400px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-6 md:px-12 lg:pl-12 bg-primary/20 backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-primary/10 to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary/10 to-transparent z-40 pointer-events-none" />
          
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "100%",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.4,
                    scale: isActive ? 1 : 0.9,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 24,
                  }}
                  className="absolute flex items-center justify-start max-w-full"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 py-3 rounded-2xl transition-all duration-500 text-left group border w-full lg:w-[280px]",
                      isActive
                        ? "bg-background text-primary border-primary shadow-lg z-10"
                        : "bg-transparent text-foreground/40 border-transparent hover:text-foreground/70"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive ? "text-primary" : "text-foreground/30"
                      )}
                    >
                      {React.createElement(feature.icon, { size: 18, strokeWidth: 2 })}
                    </div>

                    <span className="font-bold text-xs md:text-sm tracking-widest uppercase truncate">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Visual Content Area */}
        <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-border/20">
          <div className="relative w-full max-w-[440px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -120 : isNext ? 120 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.6,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.3 : 0,
                    rotate: isPrev ? -5 : isNext ? 5 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    filter: isActive ? "blur(0px)" : "blur(4px)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                  }}
                  className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-8 border-background bg-background shadow-2xl origin-center"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-1000",
                      isActive
                        ? "scale-100 grayscale-0"
                        : "scale-110 grayscale brightness-50"
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-x-0 bottom-0 p-8 md:p-10 pt-32 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-primary text-background px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg border border-primary/20">
                            Project {index + 1}
                          </div>
                          <span className="text-white/40 text-[10px] uppercase tracking-widest font-mono">
                            {feature.label}
                          </span>
                        </div>
                        
                        <p className="text-white font-bold text-xl md:text-3xl leading-tight tracking-tight">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-8 right-8 flex items-center gap-3 transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_15px_hsl(var(--primary))]" />
                    <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] font-mono">
                      Selected Case Study
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
