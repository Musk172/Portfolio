"use client";

import NextImage from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { CheckCircle2 } from "lucide-react";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-foreground/80 text-xs md:text-sm font-normal mb-8 uppercase tracking-widest">
            Built and launched specialized UI frameworks from scratch
          </p>
          <div className="grid grid-cols-2 gap-4">
            <NextImage
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop"
              alt="Design system"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl border border-border/50"
            />
            <NextImage
              src="https://images.unsplash.com/photo-1581291518062-c9a79e7dfc8b?q=80&w=1200&auto=format&fit=crop"
              alt="UI Design"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl border border-border/50"
            />
            <NextImage
              src="https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop"
              alt="Website template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl border border-border/50"
            />
            <NextImage
              src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop"
              alt="Mobile app"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl border border-border/50"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="text-foreground/80 text-xs md:text-sm font-normal mb-8">
            The foundation of my engineering journey began with focusing on robust site architectures and scalable backends.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <NextImage
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
              alt="Data architecture"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl border border-border/50"
            />
            <NextImage
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
              alt="Analytics dashboard"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl border border-border/50"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Milestones",
      content: (
        <div>
          <p className="text-foreground/80 text-xs md:text-sm font-normal mb-6">
            Key accomplishments and deployments during my tenure.
          </p>
          <div className="space-y-3 mb-10">
            {[
              "Engineered unified design system",
              "Optimized cloud infrastructure by 40%",
              "Launched 15+ production applications",
              "Implemented AI-driven workflow engines",
              "Led cross-functional engineering teams",
            ].map((text) => (
              <div key={text} className="flex gap-2 items-center text-foreground/70 text-xs md:text-sm">
                <CheckCircle2 size={16} className="text-primary" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NextImage
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop"
              alt="Team collab"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl border border-border/50"
            />
            <NextImage
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop"
              alt="Tech lab"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl border border-border/50"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-background min-h-screen">
      <Timeline 
        data={data} 
        title="Engineering Journey" 
        description="A look at the milestones and projects that shaped my career as a full-stack engineer."
      />
    </div>
  );
}
