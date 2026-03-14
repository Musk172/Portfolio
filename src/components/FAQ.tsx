"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "What is your typical process for a project?",
    answer: "My process usually involves four phases: Discovery (understanding your goals and audience), Design (wireframing and high-fidelity mockups), Development (building the application with modern tech), and Delivery (testing, optimizing, and launch)."
  },
  {
    question: "Do you only work with Next.js and React?",
    answer: "While Next.js, React, and TypeScript are my primary stack for scalable applications, I am also experienced with vanilla JS, HTML/CSS, and various other frontend frameworks. I choose the right tool for the specific project requirements."
  },
  {
    question: "Do you offer ongoing maintenance after launch?",
    answer: "Yes, I offer custom retainer packages for ongoing maintenance, updates, and performance monitoring to ensure your digital product continues to run smoothly and scales with your business."
  },
  {
    question: "How long does a typical project take?",
    answer: "A standard landing page might take 2-3 weeks, while a full-stack web application can take anywhere from 1 to 3 months depending on complexity, features, and feedback cycles."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-background border-t border-border z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <div className="lg:col-span-4 flex flex-col justify-start text-center md:text-left">
             <h2 className="text-sm font-mono tracking-widest text-primary mb-4 uppercase">Queries</h2>
             <h3 className="text-4xl md:text-5xl font-black font-sans tracking-tight mb-6">
               Frequent <span className="text-primary italic font-serif">Questions</span>.
             </h3>
             <p className="text-foreground/60 font-mono text-sm max-w-sm mx-auto md:mx-0">
                Can&apos;t find the answer you&apos;re looking for? Feel free to reach out via the contact form.
             </p>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            {FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="border border-border rounded-2xl overflow-hidden bg-surface/20"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex justify-between items-center p-4 md:p-6 text-left hover:bg-surface/50 transition-colors"
                >
                  <span className="font-semibold text-base md:text-lg pr-4 md:pr-8">{faq.question}</span>
                  <div className={`p-2 rounded-full border border-border transition-colors shrink-0 ${activeIndex === idx ? 'bg-primary border-primary text-white dark:text-black' : 'bg-background'}`}>
                    {activeIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4 md:p-6 pt-0 text-foreground/70 leading-relaxed border-t border-border/50 text-sm md:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
