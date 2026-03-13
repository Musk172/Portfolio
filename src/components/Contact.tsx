"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle, loading, success

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API Call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section id="contact" className="relative pb-24 md:pb-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mt-16 md:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 pb-16 border-b border-border">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
             <h2 className="text-sm font-mono tracking-widest text-primary mb-4 uppercase">Let&apos;s Talk</h2>
             <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-tight mb-8">
               Have an <span className="text-primary italic">Idea</span>?
             </h3>
             <p className="text-foreground/70 text-lg mb-8 max-w-sm">
                I&apos;m currently available for freelance projects. Send me a message and let&apos;s discuss your next digital product.
             </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full bg-surface p-8 rounded-3xl border border-border"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="name" className="text-sm font-mono uppercase tracking-widest text-foreground/50 ml-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  className="bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors hover:border-border/80" 
                  placeholder="John Doe" 
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label htmlFor="email" className="text-sm font-mono uppercase tracking-widest text-foreground/50 ml-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  className="bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors hover:border-border/80" 
                  placeholder="john@example.com" 
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label htmlFor="message" className="text-sm font-mono uppercase tracking-widest text-foreground/50 ml-2">Message</label>
                <textarea 
                  id="message" 
                  required 
                  rows={4} 
                  className="bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none hover:border-border/80" 
                  placeholder="Tell me about your project..." 
                />
              </div>

              <button 
                type="submit" 
                disabled={status !== "idle"}
                className={`w-full py-4 mt-2 rounded-xl border border-primary font-bold transition-all relative overflow-hidden group ${status === 'idle' ? 'bg-primary text-white hover:bg-transparent hover:text-primary dark:text-black dark:hover:text-primary' : status === 'success' ? 'bg-green-500/20 text-green-500 border-green-500/50' : 'bg-primary/50 text-white dark:text-black'}`}
              >
                {status === "idle" && "Send Message"}
                {status === "loading" && "Sending..."}
                {status === "success" && "Message Sent!"}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
