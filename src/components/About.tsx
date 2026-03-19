"use client";

import { motion } from "framer-motion";
import ServicesBanner from "@/components/ServicesBanner";
import { Github, Linkedin, Twitter, LucideIcon, ArrowUpRight, Dribbble } from "lucide-react";
import { HighlighterItem, HighlightGroup, Particles } from "@/components/ui/highlighter";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const XIcon = ({ size = 24, className = "" }: { size?: number | string; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{ marginTop: "2px" }}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const SocialLink = ({ icon: Icon, label, handle, href }: { icon: any; label: string; handle: string; href: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.01, backgroundColor: "hsl(var(--foreground) / 0.03)" }}
    whileTap={{ scale: 0.99 }}
    className="flex items-center justify-between p-4 rounded-2xl border border-border bg-background/40 backdrop-blur-sm group transition-colors hover:border-primary/20"
  >
    <div className="flex items-center gap-4">
      <div className="p-2.5 rounded-full border border-border bg-background flex items-center justify-center text-foreground/60 group-hover:text-primary transition-colors">
        <Icon size={18} />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-sm tracking-tight">{label}</span>
        <span className="text-xs text-foreground/40 font-mono">{handle}</span>
      </div>
    </div>
    <ArrowUpRight size={18} className="text-foreground/20 group-hover:text-primary transition-colors" />
  </motion.a>
);

export default function About() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="about" className="relative flex flex-col bg-background overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-50 z-0 text-primary",
        )}
      />
      <div className="container mx-auto px-6 md:px-12 pt-16 pb-24 md:pt-20 md:pb-32 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center mt-8 md:mt-12 relative z-10">
        <div className="flex flex-col justify-center order-2 md:order-1 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h2 className="text-sm font-mono tracking-widest text-primary mb-4 uppercase">Identity</h2>
            <h3 className="text-4xl md:text-5xl font-semibold font-sans tracking-tight mb-8">
              A Bit About <span className="text-primary italic font-serif">Workshop</span>.
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
          </motion.div>
        </div>

        <div className="relative order-1 md:order-2 h-full flex items-center justify-center lg:justify-end">
          <HighlightGroup className="w-full max-w-[450px] mx-auto lg:ml-auto lg:translate-x-12 xl:translate-x-20">
            <HighlighterItem className="rounded-[3rem] p-px h-full">
              <div className="relative z-20 h-full overflow-hidden rounded-[3rem] border border-border bg-white/50 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-2xl flex flex-col p-8 md:p-10">
                <Particles
                  className="absolute inset-0 -z-10 opacity-30 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                  quantity={100}
                  color={mounted && resolvedTheme === "light" ? "#000000" : "#ffffff"}
                  vy={-0.1}
                />
                
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center space-y-6 mb-10">
                  <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-b from-primary/50 to-transparent">
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-[#0a0a0a]">
                      <Image 
                        src="/remove_the_background_202603181545.png" 
                        alt="Profile" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-3xl font-bold tracking-tight">Pritam V.</h4>
                    <p className="text-xs font-mono tracking-[0.2em] text-foreground/40 uppercase">
                      Product Designer • Full Stack Developer
                    </p>
                  </div>

                  <p className="text-foreground/60 text-sm leading-relaxed max-w-[280px]">
                    Partnering with future-facing teams to choreograph interfaces that feel cinematic yet effortless.
                  </p>
                </div>

                {/* Social Links List */}
                <div className="space-y-3">
                  <SocialLink icon={XIcon} label="X/Twitter" handle="@Reven_172" href="https://x.com/Reven_172" />
                  <SocialLink icon={Linkedin} label="LinkedIn" handle="pritam172" href="https://www.linkedin.com/in/pritam172/" />
                  <SocialLink icon={Dribbble} label="Dribbble" handle="pritam-verma17647" href="https://dribbble.com/pritam-verma17647" />
                  <SocialLink icon={Github} label="GitHub" handle="Musk172" href="https://github.com/Musk172" />
                </div>
              </div>
            </HighlighterItem>
          </HighlightGroup>
        </div>
      </div>
      {/* Services/experience strips — part of this section, no divider */}
      <div className="relative w-full overflow-hidden py-6 md:py-8 flex-shrink-0">
        <ServicesBanner />
      </div>
    </section>
  );
}
