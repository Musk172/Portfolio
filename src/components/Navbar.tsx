"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Home, Layers, Mail, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { label: "Home",     href: "#hero",     icon: Home },
  { label: "About",    href: "#about",    icon: BookOpen },
  { label: "Work",     href: "#projects", icon: Layers },
  { label: "Contact",  href: "#contact",  icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = links.map(l => l.href);
      for (const section of [...sections].reverse()) {
        const el = document.querySelector(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveTab(section);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Desktop Top Bar ─────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-500 pointer-events-none",
          scrolled ? "py-4" : "py-8"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between pointer-events-auto">
          <Link href="/" className="font-mono font-bold text-xl tracking-tighter z-50">
            V<span className="text-primary">.</span>26
          </Link>

          {/* Desktop links */}
          <nav
            className={cn(
              "hidden md:flex items-center gap-8 px-7 py-2.5 rounded-full border transition-all duration-500",
              scrolled
                ? "bg-background/70 backdrop-blur-xl border-border shadow-lg"
                : "bg-transparent border-transparent"
            )}
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setActiveTab(link.href)}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-200 py-1",
                  activeTab === link.href
                    ? "text-foreground"
                    : "text-foreground/50 hover:text-foreground"
                )}
              >
                {link.label}
                {activeTab === link.href && (
                  <motion.span
                    layoutId="desktop-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center z-50 pointer-events-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Mobile Bottom Navigation (App-style) ─────────── */}

      {/* Blur overlay strip — blurs only the page content behind the nav */}
      <div
        className="md:hidden fixed bottom-0 inset-x-0 h-36 z-40 pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to top, black 60%, transparent 100%)",
          maskImage: "linear-gradient(to top, black 60%, transparent 100%)",
          backdropFilter: "blur(16px)",
        }}
      />

      <nav className="md:hidden fixed bottom-5 inset-x-0 z-50 flex justify-center pointer-events-none">
        <div
          className="pointer-events-auto flex items-center gap-1.5 rounded-3xl p-2"
          style={{
            background: "hsl(var(--background))",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.07)",
            border: "1px solid hsl(var(--border))",
          }}
        >
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActiveTab(link.href)}
                className="relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-pill"
                    className="absolute inset-0 bg-primary rounded-2xl"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <div
                  className={cn(
                    "relative z-10 flex flex-col items-center justify-center gap-1 w-[72px] h-[54px] rounded-2xl transition-colors duration-200",
                    isActive ? "text-white" : "text-foreground/40 hover:text-foreground/70"
                  )}
                >
                  <Icon size={19} strokeWidth={isActive ? 2.2 : 1.6} />
                  <span className="text-[10px] font-semibold tracking-wide leading-none">
                    {link.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
