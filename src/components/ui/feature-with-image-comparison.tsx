"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";
import { motion } from "framer-motion";

function Feature() {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }
    
    const percentage = (x / rect.width) * 100;
    setInset(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className="w-full py-20 lg:py-40 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div>
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-[10px] py-1 px-3">
                Selected Work
              </Badge>
            </div>
            <div className="flex gap-4 flex-col lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Modernizing <span className="text-primary italic font-serif">Legacy</span>.
                </h2>
                <p className="text-lg md:text-xl text-foreground/50 max-w-xl leading-relaxed">
                  A side-by-side comparison showing a full architectural overhaul of a vintage workstation platform into a modern developer ecosystem.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-foreground/40 uppercase">Before</span>
                  <span className="text-sm font-bold">Retro Stack</span>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-foreground/40 uppercase">After</span>
                  <span className="text-sm font-bold text-primary">Modern Edge</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="pt-12 w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="relative aspect-video w-full h-full overflow-hidden rounded-[2rem] select-none border border-border shadow-2xl shadow-primary/5 group"
              onMouseMove={onMouseMove}
              onMouseUp={() => setOnMouseDown(false)}
              onMouseLeave={() => setOnMouseDown(false)}
              onTouchMove={onMouseMove}
              onTouchEnd={() => setOnMouseDown(false)}
            >
              <div
                className="bg-primary/50 h-full w-0.5 absolute z-20 top-0 select-none pointer-events-none group-hover:bg-primary transition-colors"
                style={{
                  left: inset + "%",
                }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -left-5 w-10 h-10 rounded-full bg-background border border-primary/50 shadow-xl flex items-center justify-center cursor-ew-resize hover:scale-110 active:scale-95 transition-all pointer-events-auto shadow-primary/20"
                   onMouseDown={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onTouchStart={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                >
                  <GripVertical className="h-4 w-4 text-primary" />
                </div>
              </div>

              {/* After Image (Modern) */}
              <div 
                className="absolute inset-0 z-10 w-full h-full overflow-hidden"
                style={{ clipPath: `inset(0 0 0 ${inset}%)` }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                  alt="Modern Technology"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute bottom-8 right-8 px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30 text-white text-xs font-bold tracking-widest uppercase">
                  Modernized
                </div>
              </div>

              {/* Before Image (Retro) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
                  alt="Legacy Technology"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute bottom-8 left-8 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white text-xs font-bold tracking-widest uppercase">
                  Legacy Original
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
