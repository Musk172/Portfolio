"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, Mail, MapPin, Clock, CheckCircle2, LucideIcon } from "lucide-react";

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

interface FloatingInputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const FloatingInput = ({ label, id, type = "text", required = false, value, onChange, placeholder }: FloatingInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative group">
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          y: (isFocused || value) ? -28 : 0,
          scale: (isFocused || value) ? 0.85 : 1,
          color: isFocused ? "var(--primary)" : "rgba(var(--foreground), 0.5)",
        }}
        className="absolute left-0 top-3 text-foreground/50 pointer-events-none origin-left transition-colors duration-200"
      >
        {label} {required && <span className="text-primary">*</span>}
      </motion.label>
      <input
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-primary transition-all duration-300 placeholder:opacity-0"
        placeholder={placeholder}
      />
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-primary"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API Call
    setTimeout(() => {
      setStatus("success");
      // Reset form after success
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

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
                className="text-5xl md:text-6xl font-bold font-sans tracking-tight mb-8"
              >
                Let&apos;s build <br />
                something <span className="text-primary italic">great</span>.
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
          
          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-3/5"
          >
            <div className="bg-surface/50 backdrop-blur-xl border border-border p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-primary/5">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <FloatingInput 
                    label="FullName" 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <FloatingInput 
                    label="Email Address" 
                    id="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <FloatingInput 
                  label="Subject" 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                />

                <div className="relative group">
                  <motion.label
                    htmlFor="message"
                    initial={false}
                    animate={{
                      y: (formData.message) ? -28 : 0,
                      scale: (formData.message) ? 0.85 : 1,
                      color: "rgba(var(--foreground), 0.5)",
                    }}
                    className="absolute left-0 top-3 text-foreground/50 pointer-events-none origin-left transition-colors duration-200"
                  >
                    Your Message <span className="text-primary">*</span>
                  </motion.label>
                  <textarea 
                    id="message" 
                    required 
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-primary transition-all duration-300 resize-none overflow-hidden"
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] bg-primary w-0 group-focus-within:w-full transition-all duration-500" />
                </div>

                <div className="pt-4">
                  <AnimatePresence mode="wait">
                    {status === "idle" || status === "loading" ? (
                      <motion.button 
                        key="submit-btn"
                        type="submit" 
                        disabled={status === "loading"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full md:w-auto px-10 py-5 bg-primary text-white dark:text-black font-bold rounded-2xl flex items-center justify-center gap-3 overflow-hidden transition-all duration-300"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          {status === "loading" ? "Sending..." : "Send Message"}
                          <Send size={18} className={`transition-transform duration-300 ${status === "loading" ? "translate-x-10 opacity-0" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
                        </span>
                        
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                          animate={{ translateX: ["100%", "-100%"] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />
                      </motion.button>
                    ) : (
                      <motion.div 
                        key="success-msg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-green-500/10 text-green-500 border border-green-500/20 rounded-2xl font-bold"
                      >
                        <CheckCircle2 size={24} />
                        Successfully Sent!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
