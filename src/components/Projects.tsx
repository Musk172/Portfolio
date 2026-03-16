"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InteractiveAccordion } from "@/components/ui/interactive-image-accordion";

export default function Projects() {
  return (
    <section id="projects" className="relative min-h-screen py-24 md:py-32 bg-background z-20 overflow-x-visible">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Side: Original Text Content */}
          <div className="w-full lg:w-2/5 space-y-8">
            <div className="flex flex-col space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <span className="h-[1px] w-12 bg-primary/40" />
                <h2 className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Portfolio</h2>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
              >
                Selected <br />
                <span className="text-primary italic font-serif">Works</span>.
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-foreground/50 text-lg md:text-xl max-w-xl font-medium leading-relaxed"
              >
                A curated showcase of high-performance applications, architectural designs, and engineering experiments.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button asChild size="lg" className="rounded-2xl font-bold shadow-lg shadow-primary/20">
                <a href="#contact">
                  Let&apos;s talk
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right Side: New Image Accordion Design */}
          <motion.div 
            className="w-full lg:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <InteractiveAccordion />
          </motion.div>
        </div>

        {/* Additional Labeling/Stats */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border/40 pt-12">
          {[
            { label: "Performance Score", value: "99/100" },
            { label: "Total Shipments", value: "45+" },
            { label: "Main Stack", value: "Next.js/TS" },
            { label: "Engineering years", value: "6+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-1"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary/60">{stat.label}</p>
              <p className="text-2xl font-bold tracking-tighter">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
