"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative min-h-screen flex items-center bg-surface/50 border-y border-border overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
        <div className="flex flex-col justify-center order-2 md:order-1 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-sm font-mono tracking-widest text-primary mb-4 uppercase">Identity</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-sans tracking-tight mb-8">
              A Bit About <span className="text-primary italic">Workshop</span>.
            </h3>
            
            <div className="space-y-6 text-foreground/80 font-inter text-lg">
              <p>
                As a passionate software developer specializing in front-end architecture and modern UI/UX patterns, I focus on performance and aesthetics. I transform complex problems into elegant, <span className="text-primary font-semibold">user-centric solutions</span>.
              </p>
              <p>
                My expertise lies in creating scalable web applications with deep attention to interactive animations, accessibility, and clean code principles. I thrive in environments where creativity meets engineering.
              </p>
              <p>
                Beyond code, I am designing seamless digital experiences heavily inspired by modern typography and grid layouts—merging logic with artistic intent.
              </p>
            </div>
            
            <motion.div
              whileHover={{ x: 10 }}
              className="mt-12 inline-flex items-center gap-2 group cursor-pointer text-primary"
            >
              <span className="font-semibold text-lg">View Resume</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative order-1 md:order-2 h-full min-h-[500px] flex items-center justify-center">
          <motion.div 
            className="absolute z-10 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,theme(colors.primary/0.2),transparent_70%)] blur-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <div className="relative z-20 w-full h-full max-w-sm aspect-[4/5] bg-foreground/5 overflow-hidden rounded-2xl group border border-border">
             {/* Offset modern abstract visual block / placeholder */}
             <motion.div
               className="absolute inset-0 bg-background mix-blend-color-burn transition-opacity opacity-20 group-hover:opacity-40"
             />
             <motion.div
                className="absolute inset-4 rounded-xl border border-primary/40 bg-transparent flex flex-wrap content-between p-4"
                initial={{ opacity: 0, rotateX: 20 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
             >
                <div className="w-12 h-12 bg-primary/20 rounded-full blur-md"></div>
                <div className="w-8 h-8 self-end ml-auto bg-primary/60 mix-blend-overlay"></div>
             </motion.div>
             
             {/* Simple typographic ornament inside the box */}
             <div className="absolute bottom-8 right-8 text-6xl font-sans font-bold text-foreground/20 select-none">
                026
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
