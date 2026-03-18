 "use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { SocialSidebar } from "@/components/SocialSidebar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";

// Lazy-load below-the-fold sections — keeps initial JS bundle small
const About = dynamic(() => import("@/components/About"), { ssr: false });
const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });

const LOADER_WORDS = ["Scan", "Create", "Transform", "Build"];
const MIN_LOADER_MS = 1800; // minimum time to show the loader so it doesn't flash
const MAX_LOADER_MS = 3500; // maximum time before we force-dismiss

function PageLoader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOADER_WORDS.length);
    }, 650);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--background, #0a0a0a)"
      }}
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <p 
        className="loader font-mono tracking-widest uppercase"
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "var(--foreground, #fff)",
          fontFamily: "monospace",
          letterSpacing: "0.1em"
        }}
      >
        <span>{LOADER_WORDS[index]}</span>
      </p>
    </motion.div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mountTime = Date.now();

    // If the document is already interactive/complete, dismiss after minimum display
    if (typeof document !== "undefined" && document.readyState !== "loading") {
      const elapsed = Date.now() - mountTime;
      const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
      const timeout = window.setTimeout(() => setIsLoading(false), remaining);
      return () => window.clearTimeout(timeout);
    }

    // Listen for DOMContentLoaded (fires much earlier than `load`)
    const dismiss = () => {
      const elapsed = Date.now() - mountTime;
      const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
      window.setTimeout(() => setIsLoading(false), remaining);
    };

    // Use 'DOMContentLoaded' if not yet fired, otherwise 'load'
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", dismiss, { once: true });
    } else {
      dismiss();
    }

    // Safety timeout — never wait longer than MAX_LOADER_MS
    const safetyTimeout = window.setTimeout(() => {
      setIsLoading(false);
    }, MAX_LOADER_MS);

    return () => {
      document.removeEventListener("DOMContentLoaded", dismiss);
      window.clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <AnimatePresence>{isLoading && <PageLoader />}</AnimatePresence>

      <div
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          visibility: isLoading ? "hidden" : "visible" // Failsafe to prevent interaction/FOUC completely
        }}
        className="will-change-opacity"
      >
        <Navbar />
        <CustomCursor />
        <SocialSidebar />
        <main className="relative z-10 w-full">
          <Hero />
          <TechStack />
          <About />
          <Services />
          <Projects />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
