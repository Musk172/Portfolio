"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useState, useEffect } from "react";
import { Home, User, Briefcase, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
  { name: 'Home', url: '#hero', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Projects', url: '#projects', icon: Briefcase },
  { name: 'Contact', url: '#contact', icon: Mail }
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const { scrollY } = useScroll();
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setIsScrolledDown(true);
    } else {
      setIsScrolledDown(false);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      // Detection for active section
      for (const item of [...navItems].reverse()) {
        const el = document.querySelector(item.url);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveTab(item.name);
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
      <div 
        className={`fixed top-0 inset-x-0 z-[60] pt-6 sm:pt-8 md:pt-12 px-6 sm:px-8 md:px-12 flex items-center justify-between pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolledDown ? "-translate-y-20 opacity-0 md:translate-y-0 md:opacity-100" : "translate-y-0 opacity-100"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="font-mono font-bold text-2xl tracking-tighter pointer-events-auto hover:scale-110 transition-transform active:scale-95">
          PV<span className="text-primary">.</span>
        </Link>
        
        {/* Centered NavBar */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          <NavBar 
            items={navItems} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center pointer-events-auto relative z-[60]">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
