"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What is your typical process for a project?",
    answer: "My process usually involves four phases: Discovery (understanding your goals and audience), Design (wireframing and high-fidelity mockups), Development (building the application with modern tech), and Delivery (testing, optimizing, and launch)."
  },
  {
    question: "How do you ensure the final product actually generates ROI?",
    answer: "I don't just write code; I design business solutions. Every project starts with a deep dive into your target audience and objectives. We focus on conversion-optimized design, clear user journeys, and lightning-fast load times to ensure your website actively drives sales and engagement."
  },
  {
    question: "I've had bad experiences with freelancers ghosting me. How do you communicate?",
    answer: "Professional communication is just as critical as the code itself. You will receive weekly progress updates, a dedicated channel (like WhatsApp or email) for quick questions, and transparent timelines upfront. You'll always know exactly where your project stands."
  },
  {
    question: "What happens if I need changes or updates after the website is launched?",
    answer: "A website is a living digital asset. I provide a dedicated 30-day post-launch support period to ensure everything runs perfectly. Beyond that, I offer flexible retainer packages for ongoing updates, fresh content, and new feature additions so you're never left stranded."
  },
  {
    question: "How long does a typical custom project take to build?",
    answer: "A high-converting landing page might take 2-3 weeks, while a full-scale web application can take anywhere from 1 to 3 months depending on complexity. I pride myself on providing you with a clear timeline upfront and hitting those deadlines consistently."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-background z-20">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <div className="lg:col-span-4 flex flex-col items-center justify-start text-center md:items-start md:text-left">
             <h2 className="text-sm font-mono tracking-widest text-primary mb-4 uppercase">Queries</h2>
             <h3 className="text-4xl md:text-5xl font-semibold font-sans tracking-tight mb-6">
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
