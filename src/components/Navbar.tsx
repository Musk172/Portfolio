"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Home, User, Briefcase, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const navItems = [
  { name: 'Home', url: '#hero', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Projects', url: '#projects', icon: Briefcase },
  { name: 'Contact', url: '#contact', icon: Mail }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
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
      <div className="fixed top-0 inset-x-0 z-[60] py-6 px-8 md:px-12 flex items-center justify-between pointer-events-none">
        {/* Logo */}
        <Link href="/" className="font-mono font-bold text-2xl tracking-tighter pointer-events-auto hover:scale-110 transition-transform active:scale-95">
          PV<span className="text-primary">.</span>
        </Link>

        {/* Theme Toggle */}
        <div className="flex items-center pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>

      <NavBar items={navItems} activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
}
