"use client";

import { motion } from "framer-motion";
import { HoverSlider, HoverSliderImage, HoverSliderImageWrap, TextStaggerHover } from "@/components/ui/animated-slideshow";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: "slide-1",
    title: "AI Workflows",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2487&auto=format&fit=crop",
  },
  {
    id: "slide-2",
    title: "Fintech App",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2486&auto=format&fit=crop",
  },
  {
    id: "slide-3",
    title: "E-Commerce",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2487&auto=format&fit=crop",
  },
  {
    id: "slide-4",
    title: "Creative Site",
    imageUrl: "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2487&auto=format&fit=crop",
  },
];

export default function Projects() {
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
          <div className="w-full lg:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-12">
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
                <TextStaggerHover
                  key={slide.id}
                  index={index}
                  className="cursor-pointer text-2xl md:text-3xl lg:text-4xl font-sans font-bold uppercase tracking-tighter"
                  text={slide.title}
                />
              ))}
            </div>

          </div>

          {/* Right Side: Large Dynamic Image Wrapper */}
          <HoverSliderImageWrap className="w-full lg:w-1/2 h-[280px] sm:h-[400px] lg:h-[480px] mt-6 lg:mt-16 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 border border-border/40">
            {SLIDES.map((slide, index) => (
              <div key={slide.id} className="size-full">
                <HoverSliderImage
                  index={index}
                  imageUrl={slide.imageUrl}
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="size-full object-cover object-center scale-105"
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
    </section>
  );
}
