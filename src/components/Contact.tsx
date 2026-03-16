"use client";

import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, Mail, MapPin, Clock, CheckCircle2, LucideIcon } from "lucide-react";
import { HighlighterItem, HighlightGroup, Particles } from "@/components/ui/highlighter";

const PointerAnimation = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      [
        ["#pointer", { left: "60%", top: "20%" }, { duration: 0 }],
        ["#ux", { opacity: 1, scale: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: "20%", top: "40%" },
          { at: "+0.5", duration: 0.8, ease: "easeInOut" },
        ],
        ["#ux", { opacity: 0.4, scale: 0.9 }, { at: "-0.5", duration: 0.2 }],
        ["#dev", { opacity: 1, scale: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: "70%", top: "60%" },
          { at: "+0.5", duration: 0.8, ease: "easeInOut" },
        ],
        ["#dev", { opacity: 0.4, scale: 0.9 }, { at: "-0.5", duration: 0.2 }],
        ["#brand", { opacity: 1, scale: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: "40%", top: "70%" },
          { at: "+0.5", duration: 0.8, ease: "easeInOut" },
        ],
        ["#brand", { opacity: 0.4, scale: 0.9 }, { at: "-0.5", duration: 0.2 }],
        ["#strat", { opacity: 1, scale: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: "60%", top: "20%" },
          { at: "+0.5", duration: 0.8, ease: "easeInOut" },
        ],
        ["#strat", { opacity: 0.4, scale: 0.9 }, { at: "-0.5", duration: 0.2 }],
      ],
      {
        repeat: Number.POSITIVE_INFINITY,
      }
    );
  }, [animate]);

  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden" ref={scope}>
      <div
        id="ux"
        className="absolute top-[20%] right-[20%] px-4 py-2 rounded-full border border-border bg-background/80 backdrop-blur-sm text-sm font-medium opacity-40"
      >
        UI/UX Design
      </div>
      <div
        id="dev"
        className="absolute top-[40%] left-[10%] px-4 py-2 rounded-full border border-border bg-background/80 backdrop-blur-sm text-sm font-medium opacity-40"
      >
        Web Development
      </div>
      <div
        id="brand"
        className="absolute bottom-[20%] right-[10%] px-4 py-2 rounded-full border border-border bg-background/80 backdrop-blur-sm text-sm font-medium opacity-40"
      >
        Branding
      </div>
      <div
        id="strat"
        className="absolute bottom-[10%] left-[30%] px-4 py-2 rounded-full border border-border bg-background/80 backdrop-blur-sm text-sm font-medium opacity-40"
      >
        Digital Strategy
      </div>

      <motion.div id="pointer" className="absolute z-30 pointer-events-none">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary fill-primary"
        >
          <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        </svg>
        <span className="ml-4 mt-2 px-2 py-1 bg-primary text-white dark:text-black text-xs font-bold rounded-md shadow-lg block w-fit whitespace-nowrap">
          You are here
        </span>
      </motion.div>
    </div>
  );
};

const ContactSocialButton = ({ icon: Icon, href }: { icon: LucideIcon; href: string }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.1)" }}
    whileTap={{ scale: 0.9 }}
    className="p-4 rounded-2xl border border-border bg-background/50 backdrop-blur-sm text-foreground/70 hover:text-primary transition-colors"
  >
    <Icon size={20} />
  </motion.a>
);

interface ContactInfoItemProps {
  icon: LucideIcon;
  title: string;
  content: string;
}

const ContactInfoItem = ({ icon: Icon, title, content }: ContactInfoItemProps) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-start gap-4"
  >
    <div className="p-3 bg-primary/10 rounded-xl text-primary mt-1">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="text-sm font-mono uppercase tracking-widest text-foreground/50 mb-1">{title}</h4>
      <p className="text-lg font-medium">{content}</p>
    </div>
  </motion.div>
);

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          
          {/* Left Side: Info */}
          <div className="lg:w-2/5 space-y-12">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-mono tracking-widest text-primary mb-4 uppercase"
              >
                Get In Touch
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-semibold font-sans tracking-tight mb-8"
              >
                Let&apos;s build <br />
                something <span className="text-primary italic font-serif">great</span>.
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-foreground/70 text-lg max-w-md leading-relaxed"
              >
                I&apos;m always open to new opportunities and interesting projects. 
                Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </motion.p>
            </div>

            <div className="space-y-8 pt-4">
              <ContactInfoItem 
                icon={Mail} 
                title="Email Me" 
                content="hello@example.com" 
              />
              <ContactInfoItem 
                icon={MapPin} 
                title="Location" 
                content="San Francisco, CA (Remote)" 
              />
              <ContactInfoItem 
                icon={Clock} 
                title="Time Zone" 
                content="GMT-7 (PST)" 
              />
            </div>
          </div>
          
          {/* Right Side: Interactive Connect Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-3/5"
          >
            <HighlightGroup className="group h-full">
              <div className="group/item h-full" data-aos="fade-down">
                <HighlighterItem className="rounded-[2.5rem] p-px">
                  <div className="relative z-20 h-full overflow-hidden rounded-[2.5rem] border border-border bg-background/50 backdrop-blur-xl shadow-2xl shadow-primary/5">
                    <Particles
                      className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                      quantity={150}
                      color={"#0d6efd"}
                      vy={-0.2}
                    />
                    
                    <div className="flex flex-col items-center justify-center p-8 md:p-12 min-h-[500px]">
                      {/* Animated Pointer Section */}
                      <PointerAnimation />

                      <div className="text-center mt-8 space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                            Ready to <span className="text-primary italic font-serif">collaborate?</span>
                          </h3>
                          <p className="text-foreground/50 text-lg">
                            I&apos;m currently available for new projects and speaking engagements.
                          </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                          <motion.a
                            href="mailto:hello@example.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-primary text-white dark:text-black font-bold rounded-2xl flex items-center gap-2 shadow-lg shadow-primary/20"
                          >
                            <Mail size={20} />
                            Book a call
                          </motion.a>
                          
                          <motion.div className="flex gap-2">
                            <ContactSocialButton icon={Send} href="#" />
                            <ContactSocialButton icon={CheckCircle2} href="#" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
              </div>
            </HighlightGroup>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
