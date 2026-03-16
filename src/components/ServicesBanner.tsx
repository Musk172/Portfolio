"use client";

import { useState } from "react";
import { Marquee } from "@/components/Marquee";
import { Star } from "lucide-react";

type HoveredStrip = "services" | "experience" | null;

const BANNER_SERVICES = [
  "WEB DESIGN",
  "APP DEVELOPMENT",
  "FULL-STACK",
  "AI AUTOMATION",
  "UI/UX",
  "BRANDING",
  "WEB FLOW",
  "DEVELOPMENT",
];

const BANNER_EXPERIENCE = [
  "OVER 100 CUSTOMERS",
  "50+ PROJECTS DELIVERED",
  "5+ YEARS OF EXPERIENCE",
  "FULL-STACK SOLUTIONS",
];

function BannerItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-6 whitespace-nowrap">
      <Star className="w-4 h-4 text-white fill-white shrink-0" aria-hidden />
      <span className="text-white font-semibold text-lg md:text-xl tracking-wide uppercase">
        {label}
      </span>
    </span>
  );
}

function ExperienceItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-6 whitespace-nowrap">
      <Star className="w-4 h-4 text-foreground fill-foreground shrink-0 opacity-80" aria-hidden />
      <span className="text-foreground font-semibold text-base md:text-lg tracking-wide uppercase">
        {label}
      </span>
    </span>
  );
}

const stripBase =
  "absolute left-1/2 top-1/2 w-[140vw] min-w-[140vw] h-20 md:h-24 flex items-center overflow-hidden cursor-default transition-all duration-300 ease-out";
const stripCenter = "translate(-50%, -50%)";

export default function ServicesBanner() {
  const [hovered, setHovered] = useState<HoveredStrip>(null);

  return (
    <>
      {/* Strip 1: experience — transparent, text on page */}
      <div
        className={`${stripBase} z-10`}
        style={{
          transform: `${stripCenter} rotate(-8deg)`,
          background: "transparent",
          filter: hovered === null ? "blur(0px)" : hovered === "experience" ? "blur(0px)" : "blur(6px)",
          opacity: hovered === "experience" || hovered === null ? 1 : 0.85,
        }}
        onMouseEnter={() => setHovered("experience")}
        onMouseLeave={() => setHovered(null)}
        aria-label="Experience and stats"
      >
        <Marquee
          className="!p-0 [--duration:38s] [--gap:2.5rem] w-full flex-1"
          repeat={4}
          pauseOnHover={false}
        >
          {BANNER_EXPERIENCE.map((item) => (
            <ExperienceItem key={item} label={item} />
          ))}
        </Marquee>
      </div>
      {/* Strip 2: services — primary blue gradient */}
      <div
        className={`${stripBase} z-20`}
        style={{
          transform: `${stripCenter} rotate(8deg)`,
          background: "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(200 90% 52%) 50%, hsl(216 100% 45%) 100%)",
          boxShadow: "0 4px 32px hsl(var(--primary) / 0.25)",
          filter: hovered === null ? "blur(0px)" : hovered === "services" ? "blur(0px)" : "blur(6px)",
          opacity: hovered === "services" || hovered === null ? 1 : 0.85,
        }}
        onMouseEnter={() => setHovered("services")}
        onMouseLeave={() => setHovered(null)}
        aria-label="Services"
      >
        <Marquee
          className="!p-0 [--duration:32s] [--gap:2.5rem] w-full flex-1"
          repeat={4}
          pauseOnHover={false}
        >
          {BANNER_SERVICES.map((service) => (
            <BannerItem key={service} label={service} />
          ))}
        </Marquee>
      </div>
      <div className="relative z-0 h-40 md:h-44" aria-hidden />
    </>
  );
}
