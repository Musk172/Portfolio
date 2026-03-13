"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO at TechFlow",
    initial: "S",
    content: "An absolute pleasure to work with. Delivering not just code, but a complete vision. Our conversion rates increased by 40% after the redesign.",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Founder, Studio X",
    initial: "M",
    content: "Incredible attention to detail and modern aesthetics. They took our vague concept and transformed it into a masterpiece of digital storytelling.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Marketing Director",
    initial: "E",
    content: "Their expertise in animations and performance optimization is unmatched. Our site now feels like a premium app rather than a standard webpage.",
  },
  {
    id: 4,
    name: "James Whitfield",
    role: "CTO, NovaTech",
    initial: "J",
    content: "Shipped our entire backend integration in record time. Clean, well-documented code with a proactive approach to every technical challenge we faced.",
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "Product Lead, Lumiflow",
    initial: "A",
    content: "The AI automation workflows completely changed how our team operates. Hours of manual work reduced to minutes. Absolutely transformative delivery.",
  },
];

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.95,
  }),
};

export default function Testimonials() {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = (dir: number) => {
    setCurrent(([prev]) => [
      (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length,
      dir,
    ]);
  };

  const t = TESTIMONIALS[current];

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 bg-surface/30 border-t border-border z-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12 md:mb-20 text-center md:text-left">
          <h2 className="text-sm font-mono tracking-widest text-primary mb-4 uppercase">
            Testimonials
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold font-sans tracking-tight">
            Client <span className="text-primary italic">Feedback</span>.
          </h3>
        </div>

        {/* ── Desktop Grid ─────────────────────────────── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="bg-background border border-border p-6 md:p-8 rounded-3xl relative group hover:border-primary/50 transition-colors flex flex-col justify-between"
            >
              <div className="absolute top-6 right-8 text-primary/20 text-6xl font-serif leading-none select-none group-hover:text-primary/40 transition-colors">
                &quot;
              </div>
              <p className="text-foreground/80 text-lg mb-8 relative z-10 leading-relaxed italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl uppercase shrink-0">
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="font-bold tracking-tight text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-foreground/50 font-mono">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile Swipeable Slider ───────────────────── */}
        <div className="md:hidden relative">
          {/* Card */}
          <div className="relative overflow-hidden rounded-3xl min-h-[320px]">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={current}
                custom={direction}
                variants={SLIDE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 32, mass: 0.8 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) paginate(1);
                  else if (info.offset.x > 60) paginate(-1);
                }}
                className="w-full bg-background border border-border rounded-3xl p-8 flex flex-col justify-between touch-pan-y cursor-grab active:cursor-grabbing select-none"
                style={{ minHeight: 300 }}
              >
                {/* Quote mark */}
                <div className="text-primary/25 text-7xl font-serif leading-none mb-2 -mt-2">
                  &quot;
                </div>

                <p className="text-foreground/85 text-lg leading-relaxed italic flex-1">
                  &quot;{t.content}&quot;
                </p>

                {/* Author row */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl uppercase shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <h4 className="font-bold tracking-tight text-foreground">
                      {t.name}
                    </h4>
                    <p className="text-xs text-foreground/50 font-mono mt-0.5">
                      {t.role}
                    </p>
                  </div>

                  {/* Swipe hint */}
                  <p className="ml-auto text-[10px] text-foreground/30 font-mono tracking-wide hidden first-card:block">
                    swipe →
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls row: arrows + dots */}
          <div className="mt-6 flex items-center justify-between px-1">
            {/* Prev arrow */}
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-colors active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(([prev]) => [i, i > prev ? 1 : -1])}
                  className="transition-all duration-300"
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 h-2 bg-primary"
                        : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-colors active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Counter */}
          <p className="mt-4 text-center text-xs font-mono text-foreground/30 tracking-widest">
            {String(current + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
