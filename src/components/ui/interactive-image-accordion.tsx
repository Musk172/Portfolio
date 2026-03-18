"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

interface AccordionItemData {
  id: number;
  title: string;
  tag: string;
  imageUrl: string;
}

const accordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: 'Voice Assistant',
    tag: 'Voice UX',
    imageUrl: 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'AI Image Generation',
    tag: 'Gen‑AI visuals',
    imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'AI Chatbot + Local RAG',
    tag: 'Product support',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'AI Agent',
    tag: 'Automation',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Visual Understanding',
    tag: 'Computer vision',
    imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
  },
];

interface AccordionItemProps {
  item: AccordionItemData;
  isActive: boolean;
  onActivate: () => void;
}

const AccordionItem = ({ item, isActive, onActivate }: AccordionItemProps) => {
  return (
    <button
      type="button"
      className={cn(
        "relative h-[420px] md:h-[460px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 will-change-[width] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive ? "w-[300px] md:w-[380px] lg:w-[420px] z-20" : "w-[64px] md:w-[72px] z-10"
      )}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onActivate();
      }}
      aria-pressed={isActive}
      aria-label={item.title}
    >
      {/* Background Image */}
      <motion.img
        src={item.imageUrl}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        initial={false}
        animate={{ scale: isActive ? 1.08 : 1.02 }}
        transition={{ duration: 0.7 }}
      />
      
      {/* Dark overlay */}
      <div className={cn(
        "absolute inset-0 bg-black/40 transition-opacity duration-500 pointer-events-none",
        isActive ? "opacity-30" : "opacity-60"
      )} />

      {/* Caption Text */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical tag when collapsed */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex items-center justify-center pl-3 pr-1 md:pl-4 md:pr-2",
            "transition-all duration-500",
            isActive ? "opacity-0 -translate-x-2" : "opacity-100 translate-x-0"
          )}
        >
          <span className="text-white/70 text-xs md:text-sm font-medium tracking-[0.3em] uppercase rotate-90 whitespace-nowrap origin-center">
            {item.tag}
          </span>
        </div>

        {/* Title + meta when expanded */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col gap-2",
            "transition-all duration-500",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
        >
          <p className="text-[11px] font-mono tracking-[0.32em] text-white/60 uppercase">
            Selected work
          </p>
          <h3 className="text-lg md:text-xl font-semibold text-white leading-tight">
            {item.title}
          </h3>
        </div>
      </div>

      {/* Active Indicator Glow */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 border border-primary/40 rounded-3xl pointer-events-none shadow-[0_18px_45px_-30px_hsl(var(--primary))]"
          />
        )}
      </AnimatePresence>
    </button>
  );
};

export function InteractiveAccordion() {
  const [activeIndex, setActiveIndex] = useState(2); // Middle one active by default

  return (
    <div className="flex flex-row items-center justify-center lg:justify-end gap-4 w-full px-2 py-3 overflow-visible">
      <div className="flex flex-row gap-3 md:gap-4 min-w-max">
        {accordionItems.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            isActive={index === activeIndex}
            onActivate={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
