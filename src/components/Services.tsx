"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import NextImage from "next/image";

const SERVICES = [
  {
    id: "app-dev",
    title: "App Development",
    subtitle: "Native & Cross-platform iOS/Android",
    description: "I engineer highly performant native and cross-platform mobile applications using React Native and Swift. Focusing on offline-first capabilities, strict state management, and seamless 60fps micro-animations that feel completely fluid in protected hands.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    tech: ["React Native", "Expo", "Swift", "Zustand"]
  },
  {
    id: "web-arch",
    title: "Full-Stack Web Architecture",
    subtitle: "Scalable SaaS & Business Portals",
    description: "I build robust, scalable web architectures from the ground up. Leveraging Next.js and React alongside serverless backends and robust ORMs like Prisma. I ensure the underlying database models are scalable and APIs are completely type-safe.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"]
  },
  {
    id: "ai-auto",
    title: "AI Automation",
    subtitle: "AI Agent Automations & Workflows",
    description: "I design and deploy sophisticated AI agent automations using N8n for complex multi-step workflows and OpenAI APIs for intelligent decision-making. My focus is on creating integrated workflows and autonomous agents that automate business processes beyond basic LLM wrappers.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    tech: ["N8n", "OpenAI API", "AI Agents", "Python", "Zapier"]
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Map scroll progress to service index
  const index = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 0, 1, 2]);

  useEffect(() => {
    const unsubscribe = index.on("change", (latest) => {
      setActiveIndex(Math.round(latest));
    });
    return () => unsubscribe();
  }, [index]);

  return (
    <section 
      ref={containerRef} 
      id="services" 
      className="relative bg-background"
      style={{ height: `${SERVICES.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 h-full flex flex-col pt-24 pb-12">
          {/* Header */}
          <div className="mb-12 relative z-20">
            <h2 className="text-sm font-mono tracking-widest text-primary mb-4 uppercase">Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-sans tracking-tight">
              What I <span className="text-primary italic">Deliver</span>.
            </h3>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10">
            {/* Left Side: Content */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <span className="text-primary font-mono text-lg mb-4 flex items-center gap-3">
                      <span className="h-[1px] w-8 bg-primary" />
                      {SERVICES[activeIndex].subtitle}
                    </span>
                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold font-sans tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">
                      {SERVICES[activeIndex].title}
                    </h3>
                    <p className="text-foreground/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                      {SERVICES[activeIndex].description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {SERVICES[activeIndex].tech.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-5 py-2.5 text-xs font-mono tracking-wider bg-surface/50 backdrop-blur-sm border border-border rounded-full text-foreground/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Indicators */}
              <div className="mt-12 flex gap-4">
                {SERVICES.map((_, i) => (
                  <div 
                    key={i}
                    className="h-1 flex-1 bg-border rounded-full overflow-hidden"
                  >
                    <motion.div 
                      className="h-full bg-primary"
                      style={{ 
                        width: i === activeIndex ? "100%" : i < activeIndex ? "100%" : "0%"
                      }}
                      initial={false}
                      animate={{ 
                        opacity: i === activeIndex ? 1 : 0.3 
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Image Visualization */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 h-[300px] md:h-[500px] relative">
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden border border-border bg-surface/30 backdrop-blur-xl group shadow-2xl shadow-primary/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.1, rotateY: 15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <NextImage 
                      src={SERVICES[activeIndex].image}
                      alt={SERVICES[activeIndex].title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Floating Decorative Elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 blur-2xl rounded-full"
              />
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 blur-3xl rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
