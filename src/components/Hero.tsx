"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { LocationMap } from "@/components/ui/location-map";
import { LocationTag } from "@/components/ui/location-tag";
import { AvailabilityTag } from "@/components/ui/availability-tag";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollYTransform = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Subtle Mouse Parallax Effect hook
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 75, damping: 100 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 75, damping: 100 });

  // Map normalized mouse values to pixel offsets (subtle 20px shift)
  const parallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const parallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);

  // 3D Tilt like the LocationMap
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);

  // Combine percentage-based scroll with pixel-based parallax
  const finalImageY = useMotionTemplate`calc(${scrollYTransform} + ${parallaxY}px)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Convert to range -0.5 to 0.5
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pointer-events-auto p-3 sm:p-4 md:p-6"
    >
      {/* Thick rounded frame covering the edge */}
      <div className="absolute inset-3 sm:inset-4 md:inset-6 rounded-[2rem] border-[4px] border-foreground/90 pointer-events-none z-40" />

      {/* Main framed container */}
      <div className="relative w-full h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] rounded-[2rem] overflow-hidden flex flex-col justify-end pb-8 sm:pb-12 px-6 lg:px-12 z-20">

        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-50 z-0 text-primary",
          )}
        />

        {/* Center Portrait Image */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden rounded-[2rem]"
          style={{ perspective: 1000 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-[800px] h-[80vh] md:h-[100vh] mt-12 md:mt-20 lg:mt-28"
            style={{
              y: finalImageY,
              x: parallaxX,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            <Image
              src="/hero-portrait.png"
              alt="Portrait"
              fill
              className="object-contain md:object-cover object-bottom opacity-100 dark:opacity-80 mix-blend-darken dark:mix-blend-normal"
              style={{
                maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)"
              }}
              priority
            />
          </motion.div>
        </div>

        {/* Location Map moved higher so it doesn't overlap the big text */}
        <motion.div
          style={{ opacity }}
          className="absolute top-[30%] lg:top-[35%] right-8 lg:right-auto lg:left-12 z-10 hidden md:block opacity-60 pointer-events-auto"
        >
          <LocationMap
            location="Rajasthan, India"
            coordinates="27.0238° N, 74.2179° E"
          />
        </motion.div>



        <motion.div
          style={{ y: scrollYTransform, opacity }}
          className="relative z-30 flex flex-col lg:flex-row justify-between items-start lg:items-end w-full gap-8 lg:gap-16 mt-auto pointer-events-auto"
        >
          {/* Left Block: Tag & Huge Title — non-interactive, pointer-events-none */}
          <div className="flex flex-col items-start gap-4 lg:gap-6 w-full lg:w-auto pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="scale-90 sm:scale-100 origin-left flex flex-wrap items-center gap-2 sm:gap-3"
            >
              <LocationTag city="Rajasthan" country="India" timezone="IST" />
              <AvailabilityTag />
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-[5.5vw] lg:text-[6vw] xl:text-[6.5vw] leading-[0.95] md:leading-[1] font-black font-sans uppercase tracking-tighter flex flex-col items-start"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="whitespace-nowrap flex items-center w-full">
                BUILDING
                <GooeyText
                  texts={["IMMERSIVE", "DIGITAL", "SEAMLESS", "BETTER"]}
                  morphTime={1}
                  cooldownTime={1.5}
                  className="w-[5.8em] h-[1.1em] ml-2 md:ml-4 -mt-[0.05em]"
                  textClassName="text-primary text-left left-0 origin-left"
                />
              </span>
              <span>EXPERIENCES</span>
            </motion.h1>
          </div>

          {/* Right Block: CTA and Description */}
          <div className="flex flex-col items-start lg:items-end gap-6 max-w-[340px] md:max-w-md lg:mb-2 lg:text-right pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:mb-2 md:mr-6 lg:mr-8"
            >
              <MagneticButton>
                <a
                  href="#projects"
                  className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm md:text-base bg-primary text-primary-foreground font-semibold rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_30px_rgba(13,110,253,0.3)] hover:shadow-[0_0_50px_rgba(13,110,253,0.5)] whitespace-nowrap cursor-pointer"
                >
                  Start Something Great →
                </a>
              </MagneticButton>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm md:text-base text-foreground/80 font-medium leading-relaxed max-w-[280px] lg:max-w-none"
            >
              From wireframes to polished products, I design experiences that balance creativity, usability, and trust.
            </motion.p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
