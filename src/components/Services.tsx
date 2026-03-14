"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import NextImage from "next/image";
import { LayoutGrid, Cpu, Globe, Rocket, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    id: "app-dev",
    title: "App Development",
    subtitle: "Native & Cross-platform iOS/Android",
    description: "I engineer highly performant native and cross-platform mobile applications using React Native and Swift. Focusing on offline-first capabilities, strict state management, and seamless 60fps micro-animations that feel completely fluid.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    tech: ["React Native", "Expo", "Swift", "Zustand"],
    icon: LayoutGrid,
    accent: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "web-arch",
    title: "Full-Stack Web Architecture",
    subtitle: "Scalable SaaS & Business Portals",
    description: "I build robust, scalable web architectures from the ground up. Leveraging Next.js and React alongside serverless backends and robust ORMs like Prisma. I ensure the underlying database models are scalable and APIs are completely type-safe.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    icon: Globe,
    accent: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "ai-auto",
    title: "AI Automation",
    subtitle: "AI Agent Automations & Workflows",
    description: "I design and deploy sophisticated AI agent automations using N8n for complex multi-step workflows and OpenAI APIs for intelligent decision-making. My focus is on creating autonomous agents that automate business processes beyond basic LLM wrappers.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    tech: ["N8n", "OpenAI API", "AI Agents", "Python", "Zapier"],
    icon: Cpu,
    accent: "from-emerald-500/20 to-teal-500/20"
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
        {/* Animated Background Grain/Noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-50" />
        
        {/* Dynamic Accent Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className={BigAccentBlobStyle}
        />
        
        <div className="container mx-auto px-6 md:px-12 h-full flex flex-col pt-24 pb-12 relative z-10">
          {/* Section Heading with Animated Line */}
          <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="h-[1px] w-12 bg-primary/40" />
              <h2 className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Expertise</h2>
              <span className="h-[1px] w-12 bg-primary/40" />
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-black font-sans tracking-tight"
            >
              What I <span className="text-primary italic font-serif">Deliver</span>.
            </motion.h3>
          </div>

          <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 items-center gap-12 lg:gap-20">
            
            {/* Left Column: Numbering & Vertical Progress */}
            <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center gap-8 border-r border-border/50 h-full py-20">
              {SERVICES.map((service, i) => (
                <div key={service.id} className="relative flex items-center justify-center w-full">
                  <motion.span 
                    animate={{ 
                      color: activeIndex === i ? "var(--primary)" : "rgba(var(--foreground), 0.2)",
                      scale: activeIndex === i ? 1.2 : 1
                    }}
                    className="text-lg font-mono font-bold rotate-90"
                  >
                    0{i + 1}
                  </motion.span>
                </div>
              ))}
              <div className="h-40 w-[1px] bg-border relative overflow-hidden">
                <motion.div 
                   style={{ height: "100%", originY: 0, scaleY: scrollYProgress }}
                   className="w-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                />
              </div>
            </div>

            {/* Middle Column: Content */}
            <div className="lg:col-span-5 h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="space-y-10"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20">
                        {React.createElement(SERVICES[activeIndex].icon, { size: 24 })}
                      </div>
                      <span className="text-sm font-mono tracking-widest text-primary/70 uppercase">
                        {SERVICES[activeIndex].subtitle}
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight leading-[1.1]">
                      {SERVICES[activeIndex].title}
                    </h3>
                  </div>

                  <p className="text-foreground/60 text-lg lg:text-xl leading-relaxed max-w-lg font-medium">
                    {SERVICES[activeIndex].description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2.5">
                    {SERVICES[activeIndex].tech.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-5 py-2 text-[10px] font-mono font-bold tracking-[0.1em] bg-surface/40 hover:bg-primary/10 hover:border-primary/30 transition-all border border-border/50 rounded-full text-foreground/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ gap: "1.5rem" }}
                    className="flex items-center gap-4 text-primary font-bold group"
                  >
                    View Case Study
                    <ArrowUpRight size={20} className="transition-transform group-hover:rotate-45" />
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Visual Case */}
            <div className="lg:col-span-6 w-full h-[400px] lg:h-[600px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotateY: -20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-border/50 bg-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
                >
                  {/* Glass Card Overlay */}
                  <div className="absolute inset-x-6 top-6 h-12 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 z-20 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5 px-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex-1 bg-white/5 h-6 rounded-lg border border-white/5 mx-4 flex items-center px-3">
                       <span className="text-[10px] text-white/30 font-mono">technical_manifest.json</span>
                    </div>
                  </div>

                  <NextImage 
                    src={SERVICES[activeIndex].image}
                    alt={SERVICES[activeIndex].title}
                    fill
                    className="object-cover transition-transform duration-[2s] hover:scale-110 opacity-70"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  
                  {/* Gradient Accents over Image */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-colors duration-1000 mix-blend-color-dodge opacity-40",
                    SERVICES[activeIndex].accent
                  )} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

                  {/* Tech Floating Label */}
                  <div className="absolute bottom-8 right-8 p-4 glass rounded-2xl border border-white/10 z-20">
                     <Rocket className="text-primary mb-2" size={20} />
                     <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Performance</p>
                     <p className="text-lg font-bold">99/100</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

const BigAccentBlobStyle = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none";
