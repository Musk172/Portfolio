"use client";

import { motion } from "framer-motion";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUpRight, Cpu, Globe, LayoutGrid } from "lucide-react";

const SERVICES = [
  {
    id: "app-dev",
    title: "App Development",
    subtitle: "Native & Cross-platform iOS/Android",
    description: "I engineer highly performant native and cross-platform mobile applications using React Native and Swift. Focusing on offline-first capabilities, strict state management, and seamless 60fps micro-animations that feel completely fluid.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    tech: ["React Native", "Expo", "Swift", "Zustand"],
    icon: LayoutGrid,
  },
  {
    id: "web-arch",
    title: "Full-Stack Web Architecture",
    subtitle: "Scalable SaaS & Business Portals",
    description: "I build robust, scalable web architectures from the ground up. Leveraging Next.js and React alongside serverless backends and robust ORMs like Prisma. I ensure the underlying database models are scalable and APIs are completely type-safe.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    icon: Globe,
  },
  {
    id: "ai-auto",
    title: "AI Automation",
    subtitle: "AI Agent Automations & Workflows",
    description: "I design and deploy sophisticated AI agent automations using N8n for complex multi-step workflows and OpenAI APIs for intelligent decision-making. My focus is on creating autonomous agents that automate business processes beyond basic LLM wrappers.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    tech: ["N8n", "OpenAI API", "AI Agents", "Python", "Zapier"],
    icon: Cpu,
  },
];

function ServiceCard({
  service,
  featured = false,
}: {
  service: (typeof SERVICES)[number];
  featured?: boolean;
}) {
  const Icon = service.icon;
  return (
    <motion.a
      href="#contact"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      className={cn(
        "group relative isolate rounded-2xl border p-7 md:p-8",
        "transition-colors duration-300",
        featured
          ? "bg-primary text-primary-foreground border-primary/30 shadow-[0_20px_60px_-35px_hsl(var(--primary))]"
          : "bg-background/40 border-border/60 hover:border-primary/40 hover:bg-surface/10"
      )}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className={cn(
            "absolute -inset-px rounded-2xl",
            featured
              ? "bg-[radial-gradient(80%_80%_at_30%_20%,rgba(255,255,255,0.22),transparent_55%)]"
              : "bg-[radial-gradient(70%_70%_at_35%_25%,hsl(var(--primary)/0.16),transparent_55%)]"
          )}
        />
      </div>

      <div className="flex items-start justify-between gap-6">
        <div className="space-y-5">
          <div
            className={cn(
              "inline-flex items-center justify-center rounded-xl border p-2.5",
              featured
                ? "bg-white/10 border-white/20"
                : "bg-primary/10 border-primary/20 text-primary"
            )}
          >
            <Icon size={22} className={featured ? "text-white" : "text-primary"} />
          </div>

          <div className="space-y-2">
            <p
              className={cn(
                "text-[10px] font-mono uppercase tracking-[0.26em]",
                featured ? "text-primary-foreground/75" : "text-primary/70"
              )}
            >
              {service.subtitle}
            </p>
            <h3
              className={cn(
                "text-lg md:text-xl font-bold tracking-tight",
                featured ? "text-primary-foreground" : "text-foreground"
              )}
            >
              {service.title}
            </h3>
          </div>
        </div>

        <div
          className={cn(
            "shrink-0 rounded-full border p-2 transition-colors duration-300",
            featured
              ? "border-white/25 bg-white/10"
              : "border-border/70 bg-background/40 group-hover:border-primary/40"
          )}
        >
          <ArrowUpRight
            size={18}
            className={cn(
              "transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
              featured ? "text-white" : "text-foreground/70 group-hover:text-primary"
            )}
          />
        </div>
      </div>

      <p
        className={cn(
          "mt-5 text-sm md:text-[15px] leading-relaxed font-medium",
          featured ? "text-primary-foreground/80" : "text-foreground/60"
        )}
      >
        {service.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {service.tech.map((tech) => (
          <span
            key={tech}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-[0.12em] border",
              featured
                ? "border-white/20 bg-white/10 text-primary-foreground/85"
                : "border-border/60 bg-background/30 text-foreground/70 group-hover:border-primary/25"
            )}
          >
            {tech}
          </span>
        ))}
      </div>

      <div
        className={cn(
          "mt-7 inline-flex items-center gap-2 text-xs font-bold",
          featured ? "text-primary-foreground" : "text-foreground/80 group-hover:text-primary"
        )}
      >
        <span className="font-mono tracking-[0.22em] uppercase">Read more</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </motion.a>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-background">
      <div className="container mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left editorial column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              {/* Tag + CTA row */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-primary/60" />
                  <p className="text-[10px] font-mono tracking-[0.32em] text-primary/80 uppercase">
                    My services
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="group rounded-full px-5 py-2 border-border/70 bg-background/60 hover:bg-surface/10 hover:border-primary/50 transition-all duration-300"
                >
                  <a
                    href="#contact"
                    className="flex items-center gap-2 text-[11px] font-mono tracking-[0.22em] uppercase"
                  >
                    <span>All services</span>
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      +
                    </span>
                  </a>
                </Button>
              </div>

              {/* Main heading */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95]">
                  WHAT I’M <br /> OFFERING
                </h2>
                <p className="text-foreground/55 text-sm md:text-base font-medium leading-relaxed max-w-md">
                  Opinionated, end‑to‑end services that combine product thinking, crisp UX, and reliable engineering.
                </p>
              </div>

              {/* Vertical scroll cue */}
              <div className="hidden lg:flex items-center gap-6 pt-4">
                <div className="relative h-28 flex items-center">
                  <div className="h-full w-px bg-border/40" />
                  <motion.div
                    className="absolute left-[-4px] h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--primary))]"
                    animate={{ y: [0, 70, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-[10px] font-mono tracking-[0.32em] text-foreground/50 uppercase">
                    Scroll
                  </p>
                  <a
                    href="#projects"
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/60 hover:bg-primary hover:border-primary transition-colors duration-300"
                    aria-label="Scroll to projects"
                  >
                    <ArrowDown
                      size={18}
                      className="text-foreground/70 group-hover:text-primary-foreground transition-colors duration-300"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right cards grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
              <ServiceCard service={SERVICES[0]} featured />
              <ServiceCard service={SERVICES[1]} />
              <ServiceCard service={SERVICES[2]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
