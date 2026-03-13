"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "App Development",
    subtitle: "Native & Cross-Platform iOS/Android",
    description: "I engineer highly performant native and cross-platform mobile applications using React Native and Swift. Focusing on offline-first capabilities, strict state management, and seamless 60fps micro-animations that feel completely fluid in the user's hands. Ready for App Store deployment with high-quality CI/CD automation built-in.",
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1200&auto=format&fit=crop", 
    tech: ["React Native", "Expo", "Swift", "Zustand"]
  },
  {
    title: "Full-Stack Web Architecture",
    subtitle: "Scalable SaaS & Business Portals",
    description: "I build robust, scalable web architectures from the ground up. Leveraging Next.js and React alongside serverless backends and robust ORMs like Prisma. Whether it's a headless eCommerce implementation or a complex B2B dashboard, I ensure the underlying database models are scalable and APIs are completely type-safe.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"]
  },
  {
    title: "AI Automation",
    subtitle: "LLM Pipelines & Intelligent Workflows",
    description: "Moving beyond basic wrapper applications, I integrate intelligent systems directly into existing CRMs and workflows. I deploy custom LLM pipelines, RAG (Retrieval-Augmented Generation) databases, and autonomous agents that process real-time data to dramatically reduce manual overhead and scale operations autonomously.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop",
    tech: ["Python", "LangChain", "Vector DBs", "OpenAI APIs"]
  }
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-background border-t border-border z-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 max-w-2xl">
           <h2 className="text-sm font-mono tracking-widest text-primary mb-4 uppercase">Capabilities</h2>
           <h3 className="text-4xl md:text-5xl font-bold font-sans tracking-tight mb-6">
             What I <span className="text-primary italic">Deliver</span>.
           </h3>
           <p className="text-foreground/70 font-mono text-base leading-relaxed">
             I bridge the gap between heavy engineering and stunning visual design. Providing end-to-end technical leadership to transform complex requirements into production-ready platforms.
           </p>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {SERVICES.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={idx} 
                className={`flex flex-col gap-12 lg:gap-20 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50, rotateY: isEven ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full md:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden group border border-border bg-surface"
                >
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700 z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={service.image} 
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                </motion.div>
                
                {/* Text Side */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:w-1/2 flex flex-col justify-center"
                >
                  <h4 className="text-lg font-mono text-primary mb-2">— {service.subtitle}</h4>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans tracking-tight mb-6">
                    {service.title}
                  </h3>
                  <p className="text-foreground/70 text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {service.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-4 py-2 text-sm font-mono tracking-wide bg-surface border border-border rounded-full text-foreground/90 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
