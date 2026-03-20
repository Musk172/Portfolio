"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HoverSlider, HoverSliderImage, HoverSliderImageWrap, TextStaggerHover } from "@/components/ui/animated-slideshow";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const SLIDES = [
  {
    id: "slide-1",
    title: "AI Workflows",
    imageUrl: "/Workflow_mock-up_mobile_202603201142.jpeg",
    content: (
      <div className="space-y-6">
        <p>
          <strong>Overview:</strong> The AI Workflows platform was engineered to eliminate extreme operational bottlenecks by bringing state-of-the-art machine learning directly to mobile and desktop dashboards. The core concept centers on autonomous task processing and rapid scaling.
        </p>
        <div>
          <strong>The Process:</strong> 
          <p className="mt-2 text-black/70 dark:text-white/70">Building this required constructing a robust microservices architecture capable of handling heavy parallel processing. The primary focus was creating an intuitive interface where users could drag and drop nodes to build logical workflow pipelines. Behind the scenes, the engine dynamically provisions cloud resources to run predictive AI models over raw datasets securely.</p>
        </div>
        <div>
          <strong>Technologies Used:</strong>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-black/70 dark:text-white/70">
            <li>Next.js / React (Frontend Architecture)</li>
            <li>Python / FastAPI (AI Execution Engine)</li>
            <li>Tailwind CSS & Framer Motion (Animations)</li>
            <li>PostgreSQL & Supabase (Data Storage)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "slide-2",
    title: "Fintech App",
    imageUrl: "/Screenshot 2025-12-30 140722.png",
    content: (
      <div className="space-y-6">
        <p>
          <strong>Overview:</strong> A stunning, high-performance financial technology mobile application built to redefine modern banking aesthetics. It showcases industry-leading visual paradigms combined with state-of-the-art fluid animations to deliver a premium user experience.
        </p>
        <div>
          <strong>The Process:</strong> 
          <p className="mt-2 text-black/70 dark:text-white/70">The goal was to strip away the clinical coldness of traditional banking apps. Instead, we developed a warm, dark-mode-first interface using React Native and Expo. Complex data like transaction histories and portfolio growths are visualized through natively driven Reanimated charts. Security was integrated silently via biometric OAuth layers without disrupting the seamless navigation flow.</p>
        </div>
        <div>
          <strong>Technologies Used:</strong>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-black/70 dark:text-white/70">
            <li>React Native & Expo (Mobile Framework)</li>
            <li>React Native Reanimated (Fluid Gestures)</li>
            <li>TypeScript (Type Safety)</li>
            <li>Stripe & Plaid APIs (Financial Integrations)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "slide-3",
    title: "E-Commerce",
    imageUrl: "/Screenshot 2026-03-19 151017.png",
    content: (
      <div className="space-y-6">
        <p>
          <strong>Overview:</strong> A visually striking e-commerce landing page built to showcase a premium product through an immersive, interactive cinematic journey, breaking the mold of traditional static storefronts.
        </p>
        <div>
          <strong>The Process:</strong> 
          <p className="mt-2 text-black/70 dark:text-white/70">The defining feature of this build is its buttery-smooth "Scrollytelling" engine. Instead of relying on hardware-intensive real-time 3D, the project uses a highly optimized Canvas API approach. Hundreds of high-resolution frames are asynchronously preloaded. As the user naturally scrolls the page, GSAP calculates exact scroll percentages to draw the corresponding sequence onto an HTML5 canvas—creating a perfect, fluid 60FPS 3D product rotation seamlessly synced to their scroll speed.</p>
        </div>
        <div>
          <strong>Technologies Used:</strong>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-black/70 dark:text-white/70">
            <li>React 19 & Vite (Component Architecture & Build)</li>
            <li>GSAP & ScrollTrigger (Scroll Synchronization)</li>
            <li>Lenis (Frictionless Smooth Scrolling Foundation)</li>
            <li>HTML5 Canvas & Framer Motion (Sequence Rendering & UI Interactions)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "slide-4",
    title: "Creative Site",
    imageUrl: "/Screenshot 2026-03-19 165754.png",
    content: (
      <div className="space-y-6">
        <p>
          <strong>Overview:</strong> A highly interactive, premium landing page designed for G-Shock watches. The goal was to translate their rugged durability and high-tech precision into a digital experience, completely immersing the user in the "Engineered to Endure" mindset.
        </p>
        <div>
          <strong>The Process:</strong> 
          <p className="mt-2 text-black/70 dark:text-white/70">The standout feature is the dynamic "scrollytelling" experience. A robust system was engineered to tie scroll position directly to an image sequence rendered on an HTML5 <code>&lt;canvas&gt;</code>. As the user scrubs through the "Engineering Exposed" section, the component uses linear interpolation (lerp) across preloaded frames. Combined with sticky positioning physics and custom Intersection Observer reveals, it creates the cinematic illusion of a tactile 3D teardown unfolding right before their eyes.</p>
        </div>
        <div>
          <strong>Technologies Used:</strong>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-black/70 dark:text-white/70">
            <li>HTML5, Vanilla CSS & Vanilla JS (Maximum Performance)</li>
            <li>Vite (Blazing-Fast Build Tooling)</li>
            <li>HTML5 Canvas API (Sequence Rendering)</li>
            <li>Custom Linear Interpolation & Observers (Scroll Physics)</li>
          </ul>
        </div>
      </div>
    ),
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof SLIDES[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="projects" className="relative min-h-screen py-24 md:py-32 bg-background z-20 overflow-x-visible">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-50 z-0 text-primary"
          )}
        />
      </div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Modern Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4 mb-12 md:mb-16 text-center md:text-left"
        >
          <span className="hidden md:block h-[1px] w-12 bg-primary/40" />
          <h2 className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Portfolio</h2>
        </motion.div>

        <HoverSlider className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16 lg:gap-24 w-full">

          {/* Left Side: Headings & Slide Texts */}
          <div className="w-full lg:w-[40%] flex flex-col items-center md:items-start text-center md:text-left space-y-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              Selected <br className="hidden md:block" />
              <span className="text-primary italic font-serif z-10 relative">Works</span>.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-foreground/50 text-lg md:text-xl max-w-md font-medium leading-relaxed pb-6"
            >
              A curated showcase of high-performance applications, architectural designs, and engineering experiments.
            </motion.p>

            <div className="flex flex-col items-start space-y-5 md:space-y-6">
              {SLIDES.map((slide, index) => (
                <div key={slide.id} onClick={() => setSelectedProject(slide)} className="cursor-pointer group">
                  <TextStaggerHover
                    index={index}
                    className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold uppercase tracking-tighter group-hover:text-primary transition-colors"
                    text={slide.title}
                  />
                </div>
              ))}
            </div>

          </div>

          {/* Right Side: Large Dynamic Image Wrapper */}
          <HoverSliderImageWrap className="w-full lg:w-[60%] h-[280px] sm:h-[400px] lg:h-[460px] mt-6 lg:mt-12 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 border border-border/40">
            {SLIDES.map((slide, index) => (
              <div key={slide.id} className="size-full bg-black/5 dark:bg-white/5">
                <HoverSliderImage
                  index={index}
                  imageUrl={slide.imageUrl}
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="size-full object-cover object-top scale-[1.02] transition-transform duration-700"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </HoverSliderImageWrap>

        </HoverSlider>

        {/* Stats — glassmorphism cards */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "Performance Score", value: "99/100", suffix: "" },
            { label: "Total Shipments", value: "45", suffix: "+" },
            { label: "Main Stack", value: "Next.js", suffix: "/TS" },
            { label: "Engineering Years", value: "4", suffix: "+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              style={{ position: "relative" }}
              className="rounded-sm border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-md p-3 lg:p-4 overflow-hidden cursor-default shadow-sm dark:shadow-none"
            >
              {/* Animated top accent bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ opacity: 0, scaleX: 0 }}
                whileHover={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-sm pointer-events-none"
                style={{ boxShadow: "0 0 0 1px transparent" }}
                whileHover={{ boxShadow: "0 0 0 1px rgba(59,130,246,0.3), 0 8px 32px -8px rgba(59,130,246,0.12)" }}
                transition={{ duration: 0.25 }}
              />

              <p className="relative text-[8px] font-mono uppercase tracking-[0.2em] text-primary/80 mb-2">
                {stat.label}
              </p>
              <p className="relative text-lg md:text-xl font-medium lg:font-semibold tracking-tight text-foreground/80 leading-none">
                {stat.value}
                <span className="text-primary">{stat.suffix}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal Drawer */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex justify-center items-end sm:items-center p-3 sm:p-6 bg-black/60 backdrop-blur-md pointer-events-auto overflow-hidden"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-6xl bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 shadow-2xl rounded-[2rem] overflow-hidden flex flex-col lg:flex-row max-h-[90vh] lg:h-[80vh]"
              >
                {/* Image Section */}
                <div className="w-full lg:w-[45%] h-[240px] sm:h-[350px] lg:h-full relative bg-black/5 dark:bg-white/5 border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10 shrink-0">
                  <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover object-top" />
                </div>
                
                {/* Content Section */}
                <div className="w-full lg:w-[55%] p-6 md:p-10 lg:p-14 flex flex-col relative overflow-y-auto custom-scrollbar">
                  <button 
                    onClick={() => setSelectedProject(null)} 
                    className="absolute top-4 right-4 md:top-8 md:right-8 p-3 text-black/50 dark:text-white/50 hover:text-black hover:dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors z-10"
                  >
                    <X size={24} />
                  </button>
                  
                  <div className="mt-2 md:mt-4 flex-1">
                    <h4 className="text-sm font-mono tracking-widest text-[#0d6efd] uppercase mb-4">Case Study</h4>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-black dark:text-white">{selectedProject.title}</h2>
                    <div className="text-black/80 dark:text-white/80 leading-relaxed text-base md:text-lg">
                      {selectedProject.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
