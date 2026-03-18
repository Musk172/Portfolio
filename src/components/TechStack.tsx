"use client";

import { LogoCloud } from "@/components/ui/logo-cloud-3";

const logos = [
  {
    src: "/antigravity-color.png",
    alt: "Antigravity Logo",
    name: "Antigravity",
  },
  {
    src: "https://svgl.app/library/gemini.svg",
    alt: "Gemini Logo",
    name: "Gemini",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://svgl.app/library/n8n.svg", 
    alt: "n8n Logo",
    name: "n8n",
  },
];

export default function TechStack() {
  return (
    <div className="w-full bg-background mt-16 md:mt-28 pt-8 pb-16 md:pt-12 md:pb-24 border-t border-border/20 relative z-30">
      <section className="relative mx-auto max-w-5xl px-4 md:px-8">
        <h2 className="mb-8 text-center font-sans tracking-tight text-3xl md:text-5xl">
          <span className="text-foreground/80 font-semibold">
            Built with <span className="text-primary italic font-serif font-medium">modern tools</span>.
          </span>
          <br className="hidden sm:block" />
          <span className="font-semibold ml-2 sm:ml-0 mt-2 sm:mt-4 inline-block">
            Powered by <span className="text-primary italic font-serif font-medium">cutting-edge</span> technology.
          </span>
        </h2>
        
        {/* Subtle separator with fade edges */}
        <div className="mx-auto my-8 h-[1px] w-full max-w-2xl bg-border/50 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

        <LogoCloud logos={logos} />

        {/* Subtle separator with fade edges */}
        <div className="mx-auto mt-8 h-[1px] w-full max-w-2xl bg-border/50 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </section>
    </div>
  );
}
