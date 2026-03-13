"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO at TechFlow",
    content: "An absolute pleasure to work with. Delivering not just code, but a complete vision. Our conversion rates increased by 40% after the redesign.",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Founder, Studio X",
    content: "Incredible attention to detail and modern aesthetics. They took our vague concept and transformed it into a masterpiece of digital storytelling.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Marketing Director",
    content: "Their expertise in animations and performance optimization is unmatched. Our site now feels like a premium app rather than a standard webpage.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-surface/30 border-t border-border z-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-20 text-center md:text-left">
           <h2 className="text-sm font-mono tracking-widest text-primary mb-4 uppercase">Testimonials</h2>
           <h3 className="text-4xl md:text-5xl font-bold font-sans tracking-tight">
             Client <span className="text-primary italic">Feedback</span>.
           </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-background border border-border p-6 md:p-8 rounded-3xl relative group hover:border-primary/50 transition-colors flex flex-col justify-between"
            >
              <div className="absolute top-6 right-8 text-primary/20 text-6xl font-serif leading-none select-none group-hover:text-primary/40 transition-colors">&quot;</div>
              <p className="text-foreground/80 text-lg mb-8 relative z-10 leading-relaxed italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl uppercase shrink-0">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="font-bold tracking-tight text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-foreground/50 font-mono">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
