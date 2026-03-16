 "use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

const LOADER_WORDS = ["Scan", "Create", "Transform", "Build"];

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
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="loader">
        <span>{LOADER_WORDS[index]}</span>
      </p>
    </motion.div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If the tab is already fully loaded when React mounts, skip the loader quickly
    if (typeof document !== "undefined" && document.readyState === "complete") {
      setIsLoading(false);
      return;
    }

    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener("load", handleLoad);

    // Safety timeout in case the load event never fires
    const safetyTimeout = window.setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <AnimatePresence>{isLoading && <PageLoader />}</AnimatePresence>

      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500 delay-200"
        }
      >
        <Hero />
        <About />
        <Services />
        <Projects />
        <Testimonials />
        <FAQ />
        <Contact />
      </div>
    </div>
  );
}
