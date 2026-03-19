"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "./Marquee";
import { motion } from "framer-motion";
import NextImage from "next/image";

const REVIEWS = [
  {
    name: "Sarah Jenkins",
    username: "@sarahj",
    body: "An absolute pleasure to work with. Delivering not just code, but a complete vision. Our conversion rates increased by 40%.",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "Marcus Chen",
    username: "@marcusc",
    body: "Incredible attention to detail and modern aesthetics. They took our vague concept and transformed it into a digital masterpiece.",
    img: "https://avatar.vercel.sh/marcus",
  },
  {
    name: "Emma Rodriguez",
    username: "@emmar",
    body: "The performance optimization is unmatched. Our site now feels like a premium app rather than a standard webpage.",
    img: "https://avatar.vercel.sh/emma",
  },
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love the fluidity and the attention to detail.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is exactly what our brand needed to stand out.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. The animations, the layout, the speed—it's all world-class.",
    img: "https://avatar.vercel.sh/john",
  },
];

const firstRow = REVIEWS.slice(0, REVIEWS.length / 2);
const secondRow = REVIEWS.slice(REVIEWS.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 md:w-72 cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border p-4 md:p-6",
        "bg-surface/50 backdrop-blur-xl border-border hover:border-primary/50 transition-all duration-300",
        "shadow-lg shadow-black/5"
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/20">
          <NextImage
            className="rounded-full bg-primary/10 object-cover"
            alt={name}
            src={img}
            fill
            sizes="40px"
          />
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-bold tracking-tight text-foreground">
            {name}
          </figcaption>
          <p className="text-xs font-mono text-foreground/40">{username}</p>
        </div>
      </div>
      <blockquote className="text-sm leading-relaxed text-foreground/80 italic">
        &quot;{body}&quot;
      </blockquote>
    </figure>
  );
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Decorative center light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono tracking-widest text-primary mb-4 uppercase"
          >
            Testimonials
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-semibold font-sans tracking-tight"
          >
            Client <span className="text-primary italic font-serif">Feedback</span>.
          </motion.h3>
        </div>

        {/* Marquee Container */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:40s] [--gap:1rem] md:[--gap:1.5rem] py-2 md:py-4">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover className="[--duration:35s] [--gap:1rem] md:[--gap:1.5rem] py-2 md:py-4">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>

          {/* Gradients to fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-20"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-20"></div>
        </div>
      </div>
    </section>
  );
}
