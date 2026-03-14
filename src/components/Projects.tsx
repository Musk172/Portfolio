"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "Project Zero",
    category: "Full Stack",
    devTech: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageColor: "bg-blue-900/40",
    desc: "A scalable full stack commerce solution with headless architecture.",
  },
  {
    id: 2,
    title: "Neon Nexus",
    category: "WebGL",
    devTech: ["Three.js", "React Three Fiber", "GSAP"],
    imageColor: "bg-emerald-900/40",
    desc: "Interactive 3D experience exploring modern web storytelling.",
  },
  {
    id: 3,
    title: "Dashboard UI",
    category: "Frontend",
    devTech: ["React", "Framer Motion", "Recharts"],
    imageColor: "bg-purple-900/40",
    desc: "Extremely fast, analytics-heavy admin dashboard.",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  
  const categories = ["All", "Full Stack", "Frontend", "WebGL"];
  
  const filteredProjects = filter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="relative min-h-screen py-24 md:py-32 bg-background z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
             <h2 className="text-sm font-mono tracking-widest text-primary mb-4 uppercase">Lab</h2>
             <h3 className="text-4xl md:text-5xl font-black font-sans tracking-tight">
               Selected <span className="text-primary italic font-serif">Works</span>.
             </h3>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 font-mono text-sm border rounded-full transition-colors duration-300 ${
                  filter === c 
                    ? "bg-primary border-primary text-white dark:text-black" 
                    : "border-border text-foreground hover:border-primary/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative flex flex-col gap-4 border border-border p-4 rounded-3xl bg-surface/30 hover:bg-surface/60 transition-colors"
            >
              <div className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden ${project.imageColor}`}>
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-transparent flex items-center justify-center opacity-30 mix-blend-overlay group-hover:scale-110 group-hover:opacity-60 transition-all duration-700">
                  <div className="w-1/2 h-1/2 border border-white/20 rotate-45"></div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap z-10">
                  {project.devTech.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs font-mono bg-white/10 backdrop-blur-md border border-white/20 rounded text-white shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="px-2 pb-2">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-2xl font-bold tracking-tight">{project.title}</h4>
                  <div className="w-10 h-10 rounded-full border border-border flex flex-col justify-center items-center group-hover:bg-primary group-hover:border-primary transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-white dark:group-hover:text-black transition-colors rotate-45 group-hover:rotate-0">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                    </svg>
                  </div>
                </div>
                <p className="text-foreground/70 text-sm">{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
