"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Identity", href: "#hero" },
    { label: "Workshop", href: "#about" },
    { label: "Lab", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300 pointer-events-none",
        scrolled ? "py-4" : "py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between pointer-events-auto">
        <Link href="/" className="group relative z-50">
          <span className="font-mono font-bold text-xl tracking-tighter">
            V<span className="text-primary">.</span>26
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 glass px-6 py-2 rounded-full border border-border">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 z-50 pointer-events-auto">
          <ThemeToggle />
          
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={cn(
                "block w-6 h-0.5 bg-foreground transition-transform duration-300",
                menuOpen ? "rotate-45 translate-y-2" : ""
              )}
            ></span>
            <span
              className={cn(
                "block w-6 h-0.5 bg-foreground transition-opacity duration-300",
                menuOpen ? "opacity-0" : "opacity-100"
              )}
            ></span>
            <span
              className={cn(
                "block w-6 h-0.5 bg-foreground transition-transform duration-300",
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              )}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 pointer-events-auto z-40"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMenuOpen(false)}
              >
                <Link
                  href={link.href}
                  className="text-4xl font-bold font-sans tracking-tight hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
