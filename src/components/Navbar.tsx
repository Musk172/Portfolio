"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { User, Briefcase, Grid, MessageSquare } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Basic scroll spy for active tab
      const sections = ["#hero", "#about", "#projects", "#contact"];
      for (const section of sections.reverse()) {
        const el = document.querySelector(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveTab(section);
            break;
          }
        }
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Identity", href: "#hero", icon: <User size={20} /> },
    { label: "Workshop", href: "#about", icon: <Briefcase size={20} /> },
    { label: "Lab", href: "#projects", icon: <Grid size={20} /> },
    { label: "Contact", href: "#contact", icon: <MessageSquare size={20} /> },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300 pointer-events-none",
          scrolled ? "py-4 md:bg-background/80 md:backdrop-blur-md" : "py-8"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between pointer-events-auto">
          <Link href="/" className="group relative z-50">
            <span className="font-mono font-bold text-xl tracking-tighter">
              V<span className="text-primary">.</span>26
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 glass px-6 py-2 rounded-full border border-border shadow-sm">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 py-1",
                  activeTab === link.href ? "text-primary" : "text-foreground hover:text-primary"
                )}
                onClick={() => setActiveTab(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 z-50 pointer-events-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation - App Style */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-background/80 backdrop-blur-xl rounded-full border border-border p-2 z-50 shadow-2xl safe-area-bottom">
        <div className="flex justify-around items-center">
          {links.map((link) => {
            const isActive = activeTab === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setActiveTab(link.href)}
                className={cn(
                  "flex flex-col items-center justify-center w-16 h-14 rounded-full transition-all duration-300 relative group",
                  isActive ? "text-primary" : "text-foreground/50 hover:text-foreground"
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-primary/10 rounded-full transition-all duration-300" />
                )}
                <div className={cn("transition-transform duration-300", isActive ? "-translate-y-2" : "")}>
                  {link.icon}
                </div>
                <span className={cn(
                  "text-[10px] font-medium absolute bottom-1 opacity-0 transition-all duration-300 translate-y-2",
                  isActive && "opacity-100 translate-y-0"
                )}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
