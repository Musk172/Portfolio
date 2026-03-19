"use client";

import { motion, useAnimate, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Send, Mail, MapPin, Clock, CheckCircle2, LucideIcon, X, ArrowRight, ChevronDown } from "lucide-react";
import { HighlighterItem, HighlightGroup, Particles } from "@/components/ui/highlighter";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

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

const WhatsappIcon = ({ size = 24, className = "" }: { size?: number | string; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M11.996 0A12.001 12.001 0 0 0 0 12.008c0 2.102.545 4.162 1.583 6.01L.003 24l6.115-1.6c1.815.952 3.84 1.454 5.878 1.455h.005c6.623 0 12.005-5.385 12.005-12.016A12.003 12.003 0 0 0 11.996 0zm0 21.821h-.003c-1.78-.001-3.52-.477-5.044-1.38l-.361-.214-3.75 .982.999-3.655-.235-.374a9.96 9.96 0 0 1-1.528-5.37C2.081 6.195 6.478 1.796 12.004 1.796A9.957 9.957 0 0 1 21.956 11.8c-.001 5.514-4.4 9.923-9.96 10.021zm5.46-7.462c-.299-.15-1.767-.872-2.04-.972-.271-.1-.47-.15-.67.15-.198.298-.771.97-.945 1.171-.173.2-.346.223-.646.074-.3-.15-1.264-.467-2.408-1.488-.89-.792-1.49-1.77-1.664-2.07-.174-.3-.018-.462.132-.612.135-.135.299-.35.45-.525.15-.173.2-.298.298-.498.1-.2.05-.374-.025-.523-.075-.15-.67-1.616-.918-2.214-.242-.582-.487-.502-.67-.512-.172-.008-.37-.01-.569-.01-.199 0-.522.075-.796.374-.275.3-1.047 1.022-1.047 2.492 0 1.47 1.072 2.89 1.221 3.09.15.2 2.11 3.221 5.111 4.516.714.308 1.27.493 1.705.632.716.228 1.368.196 1.884.118.577-.087 1.767-.722 2.016-1.42.25-.699.25-1.296.175-1.42-.075-.125-.275-.2-.575-.35z" />
  </svg>
)

const ContactSocialButton = ({ icon: Icon, href, target, rel, onClick }: { icon: any; href: string; target?: string; rel?: string; onClick?: (e: React.MouseEvent) => void }) => (
  <motion.a
    href={href}
    target={target}
    rel={rel}
    onClick={onClick}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="w-14 h-14 flex items-center justify-center rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-md text-black/70 dark:text-white/70 hover:text-primary dark:hover:text-primary hover:border-black/20 dark:hover:border-white/20 hover:bg-white dark:hover:bg-black/60 shadow-sm hover:shadow-md transition-all duration-300 pointer-events-auto"
  >
    <Icon size={22} />
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
    <div className="text-primary mt-0.5">
      <Icon size={26} strokeWidth={1.5} />
    </div>
    <div>
      <h4 className="text-sm font-mono uppercase tracking-widest text-foreground/50 mb-1">{title}</h4>
      <p className="text-lg font-medium">{content}</p>
    </div>
  </motion.div>
);

export default function Contact() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-background overflow-hidden">
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
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center lg:items-start">

          {/* Left Side: Info */}
          <div className="lg:w-2/5 space-y-12 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
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
                Let&apos;s build <br className="hidden lg:block" />
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
                content="18bcs1134@gmail.com"
              />
              <ContactInfoItem
                icon={MapPin}
                title="Location"
                content="Rajasthan, India. (Remote)"
              />
              <ContactInfoItem
                icon={Clock}
                title="Time Zone"
                content="GMT+5:30 (IST)"
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
                            href="https://calendly.com/18bcs1134/new-meeting"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="h-14 px-8 bg-primary hover:bg-primary/90 text-white dark:text-black font-semibold rounded-2xl flex items-center gap-2 shadow-xl shadow-primary/25 pointer-events-auto transition-all duration-300"
                          >
                            <Mail size={20} />
                            Book a call
                          </motion.a>

                          <motion.div className="flex gap-2">
                            <ContactSocialButton 
                              icon={Send} 
                              href="#" 
                              onClick={(e) => { e.preventDefault(); setIsDrawerOpen(true); }} 
                            />
                            <ContactSocialButton 
                              icon={WhatsappIcon} 
                              href="https://wa.me/918872661269?text=Hi!%20%F0%9F%91%8B%20I%20loved%20your%20portfolio.%20I%20have%20an%20exciting%20project%20in%20mind%20and%20I'm%20interested%20in%20working%20with%20you.%20Can%20we%20discuss%20some%20ideas%20and%20your%20pricing%20packages%3F" 
                              target="_blank"
                              rel="noopener noreferrer"
                            />
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

      {/* Floating Contact Form Drawer/Modal */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-center items-end sm:items-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[420px] bg-white dark:bg-[#111111] border border-black/5 dark:border-white/10 shadow-2xl rounded-[2.5rem] p-6 md:p-8"
            >
              <div className="flex justify-end mb-2">
                <button 
                  onClick={() => setIsDrawerOpen(false)} 
                  className="p-2 text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 md:space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-black/60 dark:text-white/60 ml-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Smith" 
                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-black/30 dark:placeholder:text-white/30 text-black dark:text-white" 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-black/60 dark:text-white/60 ml-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="jane@framer.com" 
                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-black/30 dark:placeholder:text-white/30 text-black dark:text-white" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-black/60 dark:text-white/60 ml-2">Industry</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none text-black/70 dark:text-white/70 cursor-pointer">
                      <option value="" disabled selected className="dark:bg-[#111111]">Select...</option>
                      <option className="dark:bg-[#111111]">Technology</option>
                      <option className="dark:bg-[#111111]">Design</option>
                      <option className="dark:bg-[#111111]">E-Commerce</option>
                      <option className="dark:bg-[#111111]">Other</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-black/60 dark:text-white/60 ml-2">Message</label>
                  <textarea 
                    placeholder="Type your message" 
                    rows={3}
                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-black/30 dark:placeholder:text-white/30 text-black dark:text-white resize-none" 
                  />
                </div>

                <button className="mt-8 w-fit flex items-center gap-3 pr-5 pl-2 py-2 bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-full transition-colors group">
                  <div className="bg-white text-[#0d6efd] rounded-full p-1.5 group-hover:scale-105 transition-transform">
                    <ArrowRight size={16} strokeWidth={3} />
                  </div>
                  <span className="font-medium text-[13px] tracking-wide">Get a Solution</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
